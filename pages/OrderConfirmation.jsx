import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

export const OrderConfirmation = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const orderId = searchParams.get('orderId');
    if (!orderId) {
      navigate('/shop');
      return;
    }

    try {
      const saved = localStorage.getItem('mantra_orders');
      const orders = saved ? JSON.parse(saved) : [];
      const found = orders.find((item) => item.id === orderId);
      if (!found) {
        navigate('/shop');
        return;
      }
      setOrder(found);
    } catch (e) {
      console.error('Failed to load order', e);
      navigate('/shop');
    }
  }, [navigate, searchParams]);

  if (!order) {
    return null;
  }

  return (
    <div className="bg-white min-h-screen py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-6 transition-colors"
        >
          <span>←</span>
          <span className="text-sm font-medium">Back</span>
        </button>
        <div className="bg-slate-900 text-white rounded-3xl p-12 shadow-xl shadow-slate-950/20 border border-slate-800">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">Thank you, your order has been placed.</h1>
          <p className="text-lg text-slate-300 mb-8">We've received your order and are preparing it for shipment. You will receive an email confirmation shortly.</p>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800">
              <h2 className="text-sm text-gray-400 uppercase tracking-[0.3em] mb-3">Order Number</h2>
              <p className="text-2xl font-semibold text-white">{order.id}</p>
            </div>
            <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800">
              <h2 className="text-sm text-gray-400 uppercase tracking-[0.3em] mb-3">Total Paid</h2>
              <p className="text-2xl font-semibold text-white">${order.total.toFixed(2)}</p>
            </div>
          </div>
          <div className="mt-10">
            <button
              onClick={() => navigate('/shop')}
              className="bg-white text-slate-900 px-8 py-4 font-bold uppercase rounded-2xl hover:bg-gray-100 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
