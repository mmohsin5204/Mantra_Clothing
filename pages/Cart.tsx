import React from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../contexts/StoreContext';

export const Cart: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useStore();

  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <h2 className="text-2xl font-serif font-bold mb-4">Your cart is empty</h2>
        <p className="text-gray-500 mb-8">Looks like you haven't found your style yet.</p>
        <Link to="/shop" className="bg-slate-900 text-white px-8 py-3 font-bold uppercase text-sm hover:bg-slate-800">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-serif font-bold mb-12">Shopping Bag</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-8">
          {cart.map((item) => (
            <div key={`${item.id}-${item.selectedSize}`} className="flex gap-6 py-6 border-b border-gray-100 last:border-0">
              <div className="w-24 h-32 flex-shrink-0 bg-gray-100 overflow-hidden">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-medium text-slate-900">{item.name}</h3>
                    <p className="font-semibold text-slate-900">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                  <p className="text-sm text-gray-500 mb-1">{item.category}</p>
                  <p className="text-sm text-gray-500">Size: {item.selectedSize}</p>
                </div>
                
                <div className="flex justify-between items-end">
                   <div className="flex items-center border border-gray-300">
                     <button 
                       onClick={() => updateQuantity(item.id, item.selectedSize, -1)}
                       className="px-3 py-1 hover:bg-gray-100 text-slate-600"
                     >-</button>
                     <span className="px-3 py-1 text-sm font-medium">{item.quantity}</span>
                     <button 
                       onClick={() => updateQuantity(item.id, item.selectedSize, 1)}
                       className="px-3 py-1 hover:bg-gray-100 text-slate-600"
                     >+</button>
                   </div>
                   <button 
                     onClick={() => removeFromCart(item.id, item.selectedSize)}
                     className="text-sm text-red-500 hover:text-red-700 underline"
                   >
                     Remove
                   </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
           <div className="bg-gray-50 p-8 rounded-sm">
             <h2 className="font-serif font-bold text-xl mb-6">Order Summary</h2>
             <div className="space-y-4 mb-6 pb-6 border-b border-gray-200">
               <div className="flex justify-between text-gray-600">
                 <span>Subtotal</span>
                 <span>${cartTotal.toFixed(2)}</span>
               </div>
               <div className="flex justify-between text-gray-600">
                 <span>Shipping</span>
                 <span>Free</span>
               </div>
             </div>
             <div className="flex justify-between font-bold text-lg text-slate-900 mb-8">
               <span>Total</span>
               <span>${cartTotal.toFixed(2)}</span>
             </div>
             <button className="w-full bg-slate-900 text-white py-4 font-bold uppercase hover:bg-slate-800 transition-colors">
               Checkout
             </button>
             <p className="text-xs text-gray-500 mt-4 text-center">
               Taxes and shipping calculated at checkout.
             </p>
           </div>
        </div>
      </div>
    </div>
  );
};
