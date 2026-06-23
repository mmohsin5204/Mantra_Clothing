/*
  How to test Stripe webhooks locally:
  1. Install Stripe CLI: https://stripe.com/docs/stripe-cli
  2. Run: stripe listen --forward-to localhost:5000/api/payment/webhook
  3. Use the printed webhook secret for STRIPE_WEBHOOK_SECRET in .env
*/

const db = require('../config/db');
const asyncHandler = require('../utils/asyncHandler');
const Stripe = require('stripe');
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

exports.createCheckoutSession = asyncHandler(async (req, res) => {
  const { items } = req.body;
  const userId = req.user.id;

  const lineItems = items.map(item => ({
    price_data: {
      currency: 'usd',
      product_data: {
        name: item.name,
      },
      unit_amount: Math.round(item.price * 100),
    },
    quantity: item.quantity,
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: lineItems,
    mode: 'payment',
    success_url: `${process.env.CLIENT_URL}/order-confirmation?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.CLIENT_URL}/checkout`,
    metadata: {
      user_id: userId.toString(),
      items: JSON.stringify(items),
    },
  });

  res.json({ success: true, url: session.url });
});

exports.handleWebhook = asyncHandler(async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const userId = parseInt(session.metadata.user_id);
    const items = JSON.parse(session.metadata.items);
    const total = session.amount_total / 100;

    const connection = await db.getConnection();
    try {
      await connection.beginTransaction();

      const [orderResult] = await connection.query(
        'INSERT INTO orders (user_id, total, status) VALUES (?, ?, ?)',
        [userId, total, 'paid']
      );
      const orderId = orderResult.insertId;

      for (const item of items) {
        await connection.query(
          'INSERT INTO order_items (order_id, product_id, name, price, size, color, quantity) VALUES (?, ?, ?, ?, ?, ?, ?)',
          [orderId, item.product_id, item.name, item.price, item.size, item.color, item.quantity]
        );
      }

      await connection.commit();
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }

  res.json({ received: true });
});

exports.getSession = asyncHandler(async (req, res) => {
  const { sessionId } = req.params;
  const session = await stripe.checkout.sessions.retrieve(sessionId);
  res.json({ success: true, data: session });
});
