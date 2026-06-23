import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useStore } from '../contexts/StoreContext';
import { ProductCard } from '../components/ProductCard';

export const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { products, addToCart, wishlist, toggleWishlist } = useStore();
  
  const product = products.find(p => p.id === id);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Set default color if product has colors
  useEffect(() => {
    if (product?.colors && product.colors.length > 0) {
      setSelectedColor(product.colors[0]);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
        <h2 className="text-2xl font-serif font-bold mb-4">Product not found</h2>
        <button
          onClick={() => navigate(-1)}
          className="text-slate-900 underline hover:text-slate-600"
        >
          Go back
        </button>
      </div>
    );
  }

  const isInWishlist = wishlist.includes(product.id);

  const handleAddToCart = () => {
    if (!selectedSize) {
      setError('Please select a size');
      return;
    }
    setError('');
    addToCart(product, selectedSize, selectedColor, quantity);
    setSuccessMessage(`${product.name} added to cart!`);
    setTimeout(() => setSuccessMessage(''), 3000);
    // Reset form
    setQuantity(1);
  };

  const handleQuantityChange = (delta: number) => {
    setQuantity(prev => Math.max(1, prev + delta));
  };

  // Get related products (same category, max 4)
  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="bg-white min-h-screen">
      {/* Back Button */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-slate-900 hover:text-slate-600 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="font-medium">Back</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
            {/* Image */}
            <div className="aspect-[3/4] bg-gray-100 overflow-hidden rounded-sm">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover"
              />
            </div>

            {/* Details */}
            <div className="flex flex-col">
              {/* Success Message */}
              {successMessage && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-sm">
                  <p className="text-green-700 font-medium text-sm">{successMessage}</p>
                </div>
              )}

              {/* Header */}
              <span className="text-sm text-gray-500 uppercase tracking-widest mb-2">{product.category}</span>
              <div className="flex justify-between items-start mb-4">
                <h1 className="text-4xl font-serif font-bold text-slate-900 flex-1">{product.name}</h1>
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className="ml-4 transition-colors"
                  title={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
                >
                  <svg 
                    className={`w-8 h-8 ${isInWishlist ? 'fill-red-500 text-red-500' : 'text-slate-900'}`}
                    fill={isInWishlist ? 'currentColor' : 'none'}
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
              </div>
              <p className="text-2xl font-medium text-slate-900 mb-8">${product.price}</p>
              
              <p className="text-gray-600 mb-10 leading-relaxed">
                {product.description}
              </p>

              {/* Color Selector */}
              {product.colors && product.colors.length > 0 && (
                <div className="mb-8">
                  <div className="mb-3">
                    <span className="font-semibold text-slate-900">Select Color</span>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {product.colors.map(color => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-5 py-2 border rounded-sm transition-all font-medium text-sm
                          ${selectedColor === color 
                            ? 'bg-slate-900 text-white border-slate-900' 
                            : 'bg-white text-slate-900 border-gray-200 hover:border-slate-900'
                          }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selector */}
              <div className="mb-8">
                <div className="flex justify-between mb-3">
                  <span className="font-semibold text-slate-900">Select Size</span>
                  <button className="text-sm text-gray-500 underline hover:text-gray-700">Size Guide</button>
                </div>
                <div className="flex flex-wrap gap-3">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => { setSelectedSize(size); setError(''); }}
                      className={`w-14 h-14 flex items-center justify-center border transition-all font-medium
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

              {/* Quantity Selector */}
              <div className="mb-8">
                <span className="font-semibold text-slate-900 block mb-3">Quantity</span>
                <div className="flex items-center border border-gray-300 w-fit">
                  <button 
                    onClick={() => handleQuantityChange(-1)}
                    className="px-4 py-3 hover:bg-gray-100 text-slate-600 transition-colors"
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <span className="px-6 py-3 text-center font-medium w-16 text-slate-900">{quantity}</span>
                  <button 
                    onClick={() => handleQuantityChange(1)}
                    className="px-4 py-3 hover:bg-gray-100 text-slate-600 transition-colors"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Actions */}
              <button 
                onClick={handleAddToCart}
                className="w-full bg-slate-900 text-white py-4 font-bold tracking-widest hover:bg-slate-800 transition-all uppercase mb-4 rounded-sm"
              >
                Add to Cart
              </button>
              
              <div className="border-t border-gray-200 pt-6 space-y-3 text-sm text-gray-600">
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

          {/* Related Products Section */}
          {relatedProducts.length > 0 && (
            <div className="mt-24 pt-12 border-t border-gray-100">
              <div className="mb-12">
                <h2 className="text-3xl font-serif font-bold text-slate-900">Related Products</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {relatedProducts.map(relatedProduct => (
                  <ProductCard key={relatedProduct.id} product={relatedProduct} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
