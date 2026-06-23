import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../contexts/StoreContext';

export const Cart = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useStore();
  const navigate = useNavigate();

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
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-6 transition-colors"
      >
        <span>←</span>
        <span className="text-sm font-medium">Back</span>
      </button>
      <h1 className="text-3xl font-serif font-bold mb-12">Shopping Bag</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-8">
          {cart.map((item) => (
            <div key={`${item.id}-${item.selectedSize}-${item.selectedColor || ''}`} className="rounded-sm border border-gray-100 overflow-hidden bg-white shadow-sm">
              <div className="flex flex-col gap-6 p-6 md:flex-row md:items-start">
                <div className="w-full md:w-[220px] flex-shrink-0 mx-auto md:mx-0">
                  <div className="aspect-[3/4] bg-gray-100 overflow-hidden rounded-sm">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                </div>

                <div className="flex-1 flex flex-col justify-between gap-6">
                  <div>
                    <h3 className="font-medium text-slate-900 mb-2">{item.name}</h3>
                    <p className="text-sm text-gray-500 mb-1">{item.category}</p>
                    <p className="text-sm text-gray-500">Size: {item.selectedSize} {item.selectedColor && `· Color: ${item.selectedColor}`}</p>
                  </div>

                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center border border-gray-300 rounded-sm overflow-hidden">
                      <button
                        onClick={() => updateQuantity(item.id, item.selectedSize, -1, item.selectedColor)}
                        className="px-3 py-2 hover:bg-gray-100 text-slate-600"
                      >
                        -
                      </button>
                      <span className="px-4 py-2 text-sm font-medium text-slate-900">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.selectedSize, 1, item.selectedColor)}
                        className="px-3 py-2 hover:bg-gray-100 text-slate-600"
                      >
                        +
                      </button>
                    </div>

                    <div className="flex flex-col items-start gap-3 sm:items-end">
                      <p className="font-semibold text-slate-900">${(item.price * item.quantity).toFixed(2)}</p>
                      <button
                        onClick={() => removeFromCart(item.id, item.selectedSize, item.selectedColor)}
                        className="text-sm text-red-500 hover:text-red-700 underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
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
             <Link to="/checkout" className="w-full block text-center bg-slate-900 text-white py-4 font-bold uppercase hover:bg-slate-800 transition-colors">
               Checkout
             </Link>
             <p className="text-xs text-gray-500 mt-4 text-center">
               Taxes and shipping calculated at checkout.
             </p>
           </div>
        </div>
      </div>
    </div>
  );
};
