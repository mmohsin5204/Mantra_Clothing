import { useNavigate } from 'react-router-dom';

export const ShippingReturns = () => {
  const navigate = useNavigate();
  
  return (
    <div className="bg-white min-h-screen pb-24 pt-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-6 transition-colors"
        >
          <span>←</span>
          <span className="text-sm font-medium">Back</span>
        </button>
        <h1 className="text-4xl font-serif font-bold text-slate-900 mb-6">Shipping & Returns</h1>
        <div className="space-y-10 text-gray-600">
          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">Shipping Timelines</h2>
            <p className="leading-relaxed">Orders typically ship within 1-2 business days. Standard delivery takes 3-6 business days depending on your location.</p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">Shipping Costs</h2>
            <p className="leading-relaxed">Shipping is free for orders over $150. For orders under $150, a standard shipping fee is applied at checkout.</p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">Return Policy</h2>
            <p className="leading-relaxed">Returns are accepted within 30 days of delivery. Items must be unworn, unwashed, and in original condition with tags attached.</p>
          </section>
        </div>
      </div>
    </div>
  );
};
