import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useStore } from '../contexts/StoreContext';

export const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { products, addToCart } = useStore();
  
  const product = products.find(p => p.id === id);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [error, setError] = useState('');

  if (!product) return <div className="p-20 text-center">Product not found</div>;

  const handleAddToCart = () => {
    if (!selectedSize) {
      setError('Please select a size');
      return;
    }
    addToCart(product, selectedSize);
    navigate('/cart');
  };

  return (
    <div className="bg-white min-h-screen py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
          {/* Image */}
          <div className="aspect-[3/4] bg-gray-100 overflow-hidden">
             <img 
               src={product.image} 
               alt={product.name} 
               className="w-full h-full object-cover"
             />
          </div>

          {/* Details */}
          <div className="flex flex-col justify-center">
            <span className="text-sm text-gray-500 uppercase tracking-widest mb-2">{product.category}</span>
            <h1 className="text-4xl font-serif font-bold text-slate-900 mb-4">{product.name}</h1>
            <p className="text-2xl font-medium text-slate-900 mb-8">${product.price}</p>
            
            <p className="text-gray-600 mb-10 leading-relaxed">
              {product.description}
            </p>

            {/* Size Selector */}
            <div className="mb-8">
              <div className="flex justify-between mb-3">
                <span className="font-semibold text-slate-900">Select Size</span>
                <button className="text-sm text-gray-500 underline">Size Guide</button>
              </div>
              <div className="flex flex-wrap gap-3">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => { setSelectedSize(size); setError(''); }}
                    className={`w-14 h-14 flex items-center justify-center border transition-all
                      ${selectedSize === size 
                        ? 'bg-slate-900 text-white border-slate-900' 
                        : 'bg-white text-slate-900 border-gray-200 hover:border-slate-900'
                      }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </div>

            {/* Actions */}
            <button 
              onClick={handleAddToCart}
              className="w-full bg-slate-900 text-white py-4 font-bold tracking-widest hover:bg-slate-800 transition-all uppercase mb-4"
            >
              Add to Cart
            </button>
            
            <div className="border-t border-gray-200 pt-6 mt-6 space-y-3 text-sm text-gray-600">
               <div className="flex items-center gap-2">
                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                 <span>Free shipping on orders over $150</span>
               </div>
               <div className="flex items-center gap-2">
                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                 <span>30-day return policy</span>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
