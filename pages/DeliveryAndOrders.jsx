import { Link } from 'react-router-dom';

export const DeliveryAndOrders = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

      {/* Page Header */}
      <div className="mb-14 text-center">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-4">Delivery & Orders</h1>
        <p className="text-gray-500 text-lg max-w-2xl mx-auto">
          Everything you need to know about how we get your order to your door.
        </p>
      </div>

      {/* Section 1: Domestic Delivery Times */}
      <section className="mb-14">
        <h2 className="text-2xl font-serif font-bold text-slate-900 mb-6 border-b border-gray-200 pb-3">
          Domestic Delivery Times
        </h2>
        <div className="space-y-4 text-gray-500 text-sm leading-relaxed">
          <p>For major cities, orders typically arrive within 2-4 working days after dispatch. Delivery may take longer for remote areas, sometimes up to 7-10 working days depending on your location.</p>
          <p>Please ensure you're reachable on the contact number provided at checkout, as our courier partners may need to coordinate delivery timing with you directly.</p>
          <p>Delivery timelines depend on stock availability and successful order confirmation. During sale periods, processing and delivery may take longer than our standard estimates due to higher order volumes.</p>
          <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-xl mt-6">
            <p className="font-semibold text-amber-800">Note:</p>
            <p className="text-amber-700 text-sm mt-1">We strongly recommend delivering to your own personal address instead of a third-party courier pickup point. We cannot be held responsible for any loss, damage, or delays that occur at an external pickup location.</p>
          </div>
        </div>
      </section>

      {/* Section 2: International Delivery */}
      <section className="mb-14">
        <h2 className="text-2xl font-serif font-bold text-slate-900 mb-6 border-b border-gray-200 pb-3">
          International Delivery
        </h2>
        <div className="space-y-4 text-gray-500 text-sm leading-relaxed">
          <p>International orders are typically dispatched within 5-7 working days after order confirmation.</p>
          <p>Final delivery time varies by destination country and local customs processing. Please allow additional time for your order to clear customs once it arrives in your country.</p>
          <p>No refunds are available if you cancel your order after it has been marked as "in process."</p>
          <p>You are responsible for any duties, taxes, or customs charges imposed by your local government. If you refuse delivery of an international order, you will be responsible for all shipping costs (both to and from your location).</p>
          <p>During sale periods, international order processing and delivery may take longer than usual due to increased demand.</p>
        </div>
      </section>

      {/* Section 3: Order Tracking */}
      <section className="mb-14">
        <h2 className="text-2xl font-serif font-bold text-slate-900 mb-6 border-b border-gray-200 pb-3">
          Order Tracking
        </h2>
        <div className="space-y-4 text-gray-500 text-sm leading-relaxed">
          <p>Once your order has been dispatched, you will receive an email and/or SMS with a unique tracking number.</p>
          <p>You can track your order directly on the courier's website using this tracking number. The tracking link will be provided in your dispatch confirmation.</p>
          <p>If you haven't received a tracking update within a reasonable timeframe, please contact our support team for assistance.</p>
          <p>We work with trusted third-party logistics and courier partners to deliver your orders. While we do our best to ensure timely delivery, we are not liable for any delays caused by our courier partners, customs processing, or unforeseen circumstances.</p>
        </div>
      </section>

      {/* Section 4: Order Revisions & Cancellations */}
      <section className="mb-14">
        <h2 className="text-2xl font-serif font-bold text-slate-900 mb-6 border-b border-gray-200 pb-3">
          Order Revisions & Cancellations
        </h2>
        <div className="space-y-4 text-gray-500 text-sm leading-relaxed">
          <p>Need to revise your order? You can request changes to your size, delivery address, or other order details by contacting our customer support team before your order is processed or dispatched.</p>
          <p>To cancel a prepaid order, please contact us within 6 hours of placing your order. Once your order has been processed, it can no longer be cancelled.</p>
          <p>Refunds for cancelled prepaid orders are issued as store credit or vouchers that can be used on future purchases on our website.</p>
          <p>Once an order is marked as "in process," it cannot be cancelled, revised, or refunded. Please double-check your order details before confirming your purchase.</p>
        </div>
      </section>

      {/* Section 5: Payment & Card Verification */}
      <section className="mb-14">
        <h2 className="text-2xl font-serif font-bold text-slate-900 mb-6 border-b border-gray-200 pb-3">
          Payment & Card Verification
        </h2>
        <div className="space-y-4 text-gray-500 text-sm leading-relaxed">
          <p>To keep your transactions secure, we may occasionally request additional payment verification before processing a card order. This may involve a short phone call or email from our team, and is required by your bank or payment provider to prevent fraud.</p>
          <p>We reserve the right to cancel any order if payment is declined by your bank or payment provider, or if we are unable to successfully verify your payment details.</p>
        </div>
      </section>

      {/* Section 6: Delivery Charges */}
      <section className="mb-14">
        <h2 className="text-2xl font-serif font-bold text-slate-900 mb-6 border-b border-gray-200 pb-3">
          Delivery Charges
        </h2>
        <div className="space-y-4 text-gray-500 text-sm leading-relaxed">
          <p>Domestic orders are subject to a flat shipping fee of Rs. 150. {/* Editable value: Update this flat rate as needed */}</p>
          <p>International delivery charges vary by destination (country, city, and locality) and are calculated at checkout based on your delivery address.</p>
          <p>International orders may also be subject to import duties, taxes, or customs fees, which are collected by the courier at the time of delivery. These charges are your responsibility and are not included in your order total.</p>
        </div>
      </section>

      {/* Section 7: Returns & Exchanges */}
      <section className="mb-14">
        <h2 className="text-2xl font-serif font-bold text-slate-900 mb-6 border-b border-gray-200 pb-3">
          Returns & Exchanges
        </h2>
        <div className="space-y-4 text-gray-500 text-sm leading-relaxed">
          <p>Need a different size? You can request an exchange by contacting our support team within 7 days of delivery, provided the item is unused, with all original tags and packaging intact.</p>
          <p>Returns and exchanges are not available for international orders. All international orders are thoroughly quality-checked before dispatch to ensure you receive a perfect product.</p>
          <p>Certain categories are non-returnable and non-exchangeable for hygiene or product-nature reasons, including: inner-wear and undergarments, accessories, fragrances, and cosmetics.</p>
          <p>If you receive a damaged or defective item, please report it to us with clear photo and/or video evidence within 3 days of delivery. We will resolve this with an exchange, replacement, or store credit as appropriate.</p>
          <p>Refunds (when applicable) are generally issued as store credit usable on our website. Store credit typically takes 5-10 working days to process and reflect in your account.</p>
          <p>Sale and discounted items may have different return eligibility. Please check the product details page or contact support for specific information about sale items.</p>
        </div>
      </section>

      {/* Section 8: Frequently Asked Questions */}
      <section className="mb-14">
        <h2 className="text-2xl font-serif font-bold text-slate-900 mb-6 border-b border-gray-200 pb-3">
          Frequently Asked Questions
        </h2>
        <div className="space-y-5">
          {[
            { q: 'How long will my order take to arrive?', a: 'Domestic orders typically arrive within 2-4 working days after dispatch for major cities, and up to 7-10 working days for remote areas. International orders depend on destination and customs processing, but usually take 10-21 working days after dispatch.' },
            { q: 'Can I change my delivery address after placing an order?', a: 'You can request a delivery address change by contacting our support team before your order is processed or dispatched. Once your order is in process, we cannot guarantee address changes will be possible.' },
            { q: 'What happens if I\'m not available to receive my order?', a: 'Our courier partners will typically attempt delivery 2-3 times before returning the order to us. If you know you won\'t be available, we recommend arranging for someone else to receive it on your behalf, or contacting the courier to reschedule delivery.' },
            { q: 'Can I return or exchange a sale item?', a: 'Sale and discounted items may have different return and exchange eligibility. Please check the specific product details page or contact our support team for more information about a particular sale item.' },
            { q: 'What if my order arrives damaged?', a: 'If your order arrives damaged or defective, please report it to us within 3 days of delivery with clear photo and/or video evidence. We will work with you to resolve this with an exchange, replacement, or store credit as appropriate.' },
          ].map((item) => (
            <div key={item.q} className="border border-gray-200 rounded-2xl p-6">
              <h3 className="font-semibold text-slate-900 mb-2">{item.q}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA — Contact Support */}
      <section className="bg-slate-950 text-white rounded-3xl p-10 text-center">
        <h2 className="text-2xl font-serif font-bold mb-3">Still have questions about your order?</h2>
        <p className="text-slate-400 mb-8 max-w-lg mx-auto text-sm leading-relaxed">
          Our support team is here to help with any questions or concerns about your delivery or order.
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
