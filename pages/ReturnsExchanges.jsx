import { Link } from 'react-router-dom';

export const ReturnsExchanges = () => {
  return (
    <div className="bg-white min-h-screen pb-24 pt-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Page Header */}
        <h1 className="text-4xl font-serif font-bold text-slate-900 mb-3">Returns & Exchanges</h1>
        <p className="text-gray-500 text-base mb-12">Everything you need to know about returning or exchanging your MANTRA order.</p>

        <div className="space-y-12 text-gray-600">

          {/* Section 1 — Return Policy */}
          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">Return Policy</h2>
            <p className="leading-relaxed mb-4">
              At MANTRA, we want you to love every purchase. If you are not completely satisfied, we accept returns within <strong>30 days</strong> of the delivery date. Items must meet the following conditions to be eligible for a return:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>Item must be unworn and unwashed</li>
              <li>All original tags must be attached</li>
              <li>Item must be in its original packaging</li>
              <li>Item must not be a sale or clearance item (final sale items are non-returnable)</li>
              <li>Accessories and undergarments are not eligible for return due to hygiene reasons</li>
            </ul>
          </section>

          {/* Section 2 — How to Apply */}
          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">How to Initiate a Return</h2>
            <p className="leading-relaxed mb-4">Follow these steps to submit a return request:</p>
            <ol className="list-decimal list-inside space-y-3 ml-2">
              <li>Email us at <strong>support@mantrafashion.com</strong> with your order number and reason for return</li>
              <li>Our team will review your request within <strong>2 business days</strong> and send you a Return Authorization (RA) number</li>
              <li>Pack the item securely and write your RA number clearly on the outside of the package</li>
              <li>Ship the item to the return address provided in our email</li>
              <li>Once received, we will inspect the item and process your refund or exchange within <strong>5–7 business days</strong></li>
            </ol>
            <p className="mt-4 text-sm text-gray-500">
              Note: Returns submitted without an RA number will not be accepted and will be returned to the sender.
            </p>
          </section>

          {/* Section 3 — Exchange Policy */}
          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">Exchange Policy</h2>
            <p className="leading-relaxed mb-4">
              We offer exchanges for a different size or color of the same item, subject to availability. If the item you want is out of stock, we will issue store credit instead.
            </p>
            <div className="overflow-hidden rounded-sm border border-gray-200 bg-gray-50">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-white">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Exchange Type</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Eligible?</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Processing Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  <tr>
                    <td className="px-6 py-4 text-sm text-gray-700">Size Exchange (same item)</td>
                    <td className="px-6 py-4 text-sm text-gray-700">✅ Yes</td>
                    <td className="px-6 py-4 text-sm text-gray-700">5–7 business days</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm text-gray-700">Color Exchange (same item)</td>
                    <td className="px-6 py-4 text-sm text-gray-700">✅ Yes</td>
                    <td className="px-6 py-4 text-sm text-gray-700">5–7 business days</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm text-gray-700">Different Item Exchange</td>
                    <td className="px-6 py-4 text-sm text-gray-700">❌ No</td>
                    <td className="px-6 py-4 text-sm text-gray-700">Return + New Order</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm text-gray-700">Sale / Clearance Items</td>
                    <td className="px-6 py-4 text-sm text-gray-700">❌ No</td>
                    <td className="px-6 py-4 text-sm text-gray-700">Final Sale</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm text-gray-700">Accessories / Undergarments</td>
                    <td className="px-6 py-4 text-sm text-gray-700">❌ No</td>
                    <td className="px-6 py-4 text-sm text-gray-700">Non-returnable</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 4 — Refunds */}
          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">Refunds</h2>
            <p className="leading-relaxed mb-4">
              Once your return is received and inspected, we will notify you by email. If approved, your refund will be processed to your original payment method within <strong>7–10 business days</strong>.
            </p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>Credit/Debit card refunds may take 3–5 additional business days depending on your bank</li>
              <li>Original shipping charges are non-refundable</li>
              <li>Return shipping costs are the responsibility of the customer unless the item was defective or incorrect</li>
              <li>If your refund is not received within 10 business days, contact us at <strong>support@mantrafashion.com</strong></li>
            </ul>
          </section>

          {/* Section 5 — Damaged or Incorrect Items */}
          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">Damaged or Incorrect Items</h2>
            <p className="leading-relaxed mb-4">
              If you received a damaged, defective, or incorrect item, we sincerely apologize. Please contact us within <strong>48 hours</strong> of delivery with:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>Your order number</li>
              <li>A clear photo of the damaged or incorrect item</li>
              <li>A brief description of the issue</li>
            </ul>
            <p className="mt-4 leading-relaxed">
              We will arrange a free return and ship you a replacement at no extra cost, or issue a full refund — whichever you prefer.
            </p>
          </section>

          {/* Section 6 — International Returns */}
          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">International Returns</h2>
            <p className="leading-relaxed mb-4">
              International customers are welcome to return items under the same 30-day policy. However, please note:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>International return shipping costs are fully the customer's responsibility</li>
              <li>We recommend using a tracked shipping service — MANTRA is not responsible for lost return parcels</li>
              <li>Customs duties and import taxes paid on the original order are non-refundable</li>
              <li>Refunds will be issued in USD at the exchange rate at the time of original purchase</li>
            </ul>
          </section>

          {/* Section 7 — Store Credit & Vouchers */}
          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">Store Credit & Vouchers</h2>
            <p className="leading-relaxed">
              In certain cases — such as when your requested exchange item is out of stock — we may offer store credit instead of a refund. Store credit is valid for <strong>12 months</strong> from the date of issue and can be used on any full-price item on our website. Store credit is non-transferable and cannot be exchanged for cash.
            </p>
          </section>

          {/* Section 8 — FAQs */}
          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div className="border-b border-gray-100 pb-5">
                <h3 className="font-semibold text-slate-900 mb-2">Can I return a gift?</h3>
                <p className="text-gray-600 leading-relaxed">Yes. Gift returns are accepted within 30 days of the original order date. Refunds will be issued as store credit to the gift recipient.</p>
              </div>
              <div className="border-b border-gray-100 pb-5">
                <h3 className="font-semibold text-slate-900 mb-2">What if my item was purchased during a sale?</h3>
                <p className="text-gray-600 leading-relaxed">Sale and clearance items are final sale and cannot be returned or exchanged unless they arrive damaged or defective.</p>
              </div>
              <div className="border-b border-gray-100 pb-5">
                <h3 className="font-semibold text-slate-900 mb-2">How long does it take to process my refund?</h3>
                <p className="text-gray-600 leading-relaxed">Once we receive your return, inspection takes 2–3 business days. After approval, refunds are processed within 7–10 business days to your original payment method.</p>
              </div>
              <div className="border-b border-gray-100 pb-5">
                <h3 className="font-semibold text-slate-900 mb-2">Do I have to pay for return shipping?</h3>
                <p className="text-gray-600 leading-relaxed">For standard returns, the customer covers return shipping. For damaged, defective, or incorrect items, MANTRA covers the full return shipping cost.</p>
              </div>
              <div className="pb-5">
                <h3 className="font-semibold text-slate-900 mb-2">Can I exchange an item I bought in store?</h3>
                <p className="text-gray-600 leading-relaxed">Currently, our online returns and exchanges policy applies only to orders placed through our website. For in-store purchases, please contact the store directly.</p>
              </div>
            </div>
          </section>

          {/* Section 9 — Contact CTA */}
          <section className="bg-slate-900 rounded-2xl p-8 text-white text-center">
            <h2 className="text-2xl font-semibold mb-3">Still have questions?</h2>
            <p className="text-slate-300 mb-6 leading-relaxed">
              Our support team is here to help you Monday to Saturday, 9am – 6pm.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="inline-block bg-white text-slate-900 font-semibold px-8 py-3 rounded-sm hover:bg-gray-100 transition"
              >
                Contact Us
              </Link>
              <Link
                to="/delivery-and-orders"
                className="inline-block border border-white text-white font-semibold px-8 py-3 rounded-sm hover:bg-white hover:text-slate-900 transition"
              >
                Delivery & Orders
              </Link>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};
