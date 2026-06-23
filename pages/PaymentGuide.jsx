import { Link } from 'react-router-dom';

export const PaymentGuide = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

      {/* Page Header */}
      <div className="mb-14 text-center">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-4">Payment Guide</h1>
        <p className="text-gray-500 text-lg max-w-2xl mx-auto">
          Everything you need to know about payments at MANTRA — accepted methods, security, billing, and more.
        </p>
      </div>

      {/* Section 1: Accepted Payment Methods */}
      <section className="mb-14">
        <h2 className="text-2xl font-serif font-bold text-slate-900 mb-6 border-b border-gray-200 pb-3">
          Accepted Payment Methods
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {[
            { title: 'Credit & Debit Cards', desc: 'We accept all major credit and debit cards including Visa, MasterCard, American Express, and Discover. Your card is charged only at the time of order confirmation.' },
            { title: 'PayPal', desc: 'Pay securely using your PayPal account. You will be redirected to PayPal to complete the transaction and then returned to MANTRA.' },
            { title: 'Apple Pay & Google Pay', desc: 'For a fast, one-tap checkout experience on mobile devices, we support Apple Pay and Google Pay.' },
            { title: 'Bank Transfer', desc: 'Bank transfers are accepted for orders above $500. Please contact support@mantrafashion.com to arrange a bank transfer order.' },
          ].map((method) => (
            <div key={method.title} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <h3 className="font-semibold text-slate-900 text-lg mb-2">{method.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{method.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 2: How to Pay — Step by Step */}
      <section className="mb-14">
        <h2 className="text-2xl font-serif font-bold text-slate-900 mb-6 border-b border-gray-200 pb-3">
          How to Complete Your Payment
        </h2>
        <ol className="space-y-6">
          {[
            { step: '01', title: 'Add Items to Cart', desc: 'Browse our collection, select your size and color, and click "Add to Cart" on the product page.' },
            { step: '02', title: 'Review Your Cart', desc: 'Go to the Cart page to review your selected items, update quantities, or remove items you no longer want.' },
            { step: '03', title: 'Proceed to Checkout', desc: 'Click "Proceed to Checkout". You must be logged in to continue. If you don\'t have an account, register in under a minute.' },
            { step: '04', title: 'Enter Billing Details', desc: 'Fill in your full name, email address, phone number, billing address, city, country, and postal code in the checkout form.' },
            { step: '05', title: 'Select Payment Method', desc: 'Choose your preferred payment method — credit/debit card, PayPal, Apple Pay, or Google Pay.' },
            { step: '06', title: 'Enter Card Information', desc: 'If paying by card, enter your 16-digit card number, expiry date (MM/YY), and the CVV/CVC security code found on the back of your card.' },
            { step: '07', title: 'Confirm Your Order', desc: 'Review your order summary one last time. Click "Confirm Order" to place your order. You will receive an email confirmation immediately.' },
          ].map((item) => (
            <li key={item.step} className="flex gap-6 items-start">
              <span className="text-3xl font-serif font-bold text-slate-200 min-w-[48px]">{item.step}</span>
              <div>
                <h3 className="font-semibold text-slate-900 mb-1">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* Section 3: Payment Security */}
      <section className="mb-14 bg-slate-900 text-white rounded-3xl p-10">
        <h2 className="text-2xl font-serif font-bold mb-6">Your Payment is 100% Secure</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { title: 'SSL Encryption', desc: 'All transactions are protected by 256-bit SSL encryption. Your data is never stored on our servers.' },
            { title: 'PCI Compliant', desc: 'MANTRA is fully PCI-DSS compliant, meaning your card data is handled to the highest security standards.' },
            { title: '3D Secure', desc: 'We use 3D Secure authentication (Verified by Visa / Mastercard SecureCode) for additional card verification.' },
          ].map((item) => (
            <div key={item.title} className="bg-slate-800 rounded-2xl p-6">
              <h3 className="font-semibold text-white mb-2">{item.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 4: Billing Information Fields */}
      <section className="mb-14">
        <h2 className="text-2xl font-serif font-bold text-slate-900 mb-6 border-b border-gray-200 pb-3">
          Required Billing Information
        </h2>
        <p className="text-gray-500 mb-6 text-sm leading-relaxed">
          When completing your purchase, you will need to provide the following information. Make sure all details match your card or payment account exactly.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-900 text-white">
              <tr>
                <th className="px-6 py-4 rounded-tl-xl">Field</th>
                <th className="px-6 py-4">Required</th>
                <th className="px-6 py-4 rounded-tr-xl">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                { field: 'Full Name', required: 'Yes', desc: 'Your legal first and last name as it appears on your card' },
                { field: 'Email Address', required: 'Yes', desc: 'A valid email to receive your order confirmation and receipt' },
                { field: 'Phone Number', required: 'Yes', desc: 'Used for delivery updates and in case of payment issues' },
                { field: 'Street Address', required: 'Yes', desc: 'Your complete billing street address including apartment/unit number' },
                { field: 'City', required: 'Yes', desc: 'The city your billing address is registered in' },
                { field: 'Country', required: 'Yes', desc: 'Select your country from the dropdown list' },
                { field: 'Postal / ZIP Code', required: 'Yes', desc: 'Your area postal or ZIP code for address verification' },
                { field: 'Card Number', required: 'Yes (card only)', desc: '16-digit number printed on the front of your credit/debit card' },
                { field: 'Expiry Date', required: 'Yes (card only)', desc: 'Month and year your card expires, in MM/YY format' },
                { field: 'CVV / CVC', required: 'Yes (card only)', desc: '3-digit security code on the back of your card (4 digits for Amex on front)' },
                { field: 'Promo / Discount Code', required: 'No', desc: 'Optional. Enter any discount or promotional code at checkout' },
              ].map((row, i) => (
                <tr key={row.field} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-6 py-4 font-medium text-slate-900">{row.field}</td>
                  <td className="px-6 py-4 text-gray-500">{row.required}</td>
                  <td className="px-6 py-4 text-gray-500">{row.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Section 5: Currency & Pricing */}
      <section className="mb-14">
        <h2 className="text-2xl font-serif font-bold text-slate-900 mb-6 border-b border-gray-200 pb-3">
          Currency & Pricing
        </h2>
        <div className="space-y-4 text-gray-500 text-sm leading-relaxed">
          <p>All prices on MANTRA are displayed in <strong className="text-slate-900">US Dollars (USD)</strong>. If your card or account is in a different currency, your bank will apply the applicable exchange rate at the time of the transaction.</p>
          <p>MANTRA does not add any currency conversion fees. However, your bank may charge a foreign transaction fee — please check with your bank if you are unsure.</p>
          <p>The final charged amount will always match the order total shown at checkout, with no hidden fees.</p>
        </div>
      </section>

      {/* Section 6: Failed Payments & Troubleshooting */}
      <section className="mb-14">
        <h2 className="text-2xl font-serif font-bold text-slate-900 mb-6 border-b border-gray-200 pb-3">
          Failed Payments & Troubleshooting
        </h2>
        <div className="space-y-5">
          {[
            { q: 'My card was declined — what should I do?', a: 'Double-check that your card details (number, expiry, CVV) are correct. Ensure you have sufficient funds. If the problem persists, contact your bank as they may have blocked the transaction, or try a different payment method.' },
            { q: 'I was charged but did not receive an order confirmation.', a: 'Please wait up to 15 minutes for the confirmation email. Check your spam/junk folder. If you still have not received it, contact us at support@mantrafashion.com with your payment reference number.' },
            { q: 'My payment is pending — is my order placed?', a: 'A pending status means the payment is being processed by your bank. Your order is reserved. Once the payment clears (usually within 24 hours), your order will be confirmed.' },
            { q: 'Can I pay with multiple payment methods?', a: 'Currently we do not support split payments. You must complete the full order total with one payment method.' },
            { q: 'Is it safe to save my card for future orders?', a: 'Card details are never stored on MANTRA\'s servers. If you choose to save a card, it is stored securely with our certified payment provider and never accessible to us.' },
          ].map((item) => (
            <div key={item.q} className="border border-gray-200 rounded-2xl p-6">
              <h3 className="font-semibold text-slate-900 mb-2">{item.q}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 7: Refunds */}
      <section className="mb-14">
        <h2 className="text-2xl font-serif font-bold text-slate-900 mb-6 border-b border-gray-200 pb-3">
          Refunds & Cancellations
        </h2>
        <div className="space-y-4 text-gray-500 text-sm leading-relaxed">
          <p>If your order is eligible for a return, the refund will be issued to the <strong className="text-slate-900">original payment method</strong> used at checkout.</p>
          <p>Refunds typically take <strong className="text-slate-900">5–10 business days</strong> to appear on your statement, depending on your bank or card provider.</p>
          <p>To cancel an order, please contact us within <strong className="text-slate-900">2 hours</strong> of placing it at support@mantrafashion.com. Once the order is dispatched, it cannot be cancelled.</p>
          <p>For full details on returns and refunds, please visit our <Link to="/delivery-and-orders" className="text-slate-900 font-semibold underline underline-offset-2 hover:text-gray-600 transition">Delivery & Orders</Link> page.</p>
        </div>
      </section>

      {/* CTA — Contact Support */}
      <section className="bg-slate-950 text-white rounded-3xl p-10 text-center">
        <h2 className="text-2xl font-serif font-bold mb-3">Still have questions?</h2>
        <p className="text-slate-400 mb-8 max-w-lg mx-auto text-sm leading-relaxed">
          Our support team is available 7 days a week to help with any payment questions or issues you may have.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/contact"
            className="bg-white text-slate-900 px-8 py-3 font-bold uppercase text-sm hover:bg-gray-100 transition rounded-xl"
          >
            Contact Us
          </Link>
          <Link
            to="/shop"
            className="border border-slate-700 text-white px-8 py-3 font-bold uppercase text-sm hover:border-slate-500 transition rounded-xl"
          >
            Continue Shopping
          </Link>
        </div>
      </section>

    </div>
  );
};
