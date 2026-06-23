import { useEffect, useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useStore } from '../contexts/StoreContext';
import { useWishlist } from '../contexts/WishlistContext';
import { ProductCard } from '../components/ProductCard';

export const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, addToCart } = useStore();
  
  const product = products.find(p => p.id === id);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState('');
  const { wishlist, toggleWishlist } = useWishlist();
  const isInWishlist = product && wishlist.includes(product.id);

  useEffect(() => {
    if (product?.colors?.length) {
      setSelectedColor(product.colors[0]);
    }
  }, [product]);

  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
  }, [product, products]);

  if (!product) return <div className="p-20 text-center">Product not found</div>;

  const handleAddToCart = () => {
    if (!selectedSize) {
      setError('Please select a size');
      return;
    }
    addToCart(product, selectedSize, selectedColor, quantity);
    navigate('/cart');
  };

  const handleQuantityChange = (delta) => {
    setQuantity(prev => Math.max(1, prev + delta));
  };

  return (
    <div className="bg-white min-h-screen py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
          {/* Image */}
          <div>
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-6 transition-colors"
            >
              <span>←</span>
              <span className="text-sm font-medium">Back</span>
            </button>
            <div className="aspect-[3/4] bg-gray-100 overflow-hidden rounded-sm">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Details */}
          <div className="flex flex-col justify-center">
            <span className="text-sm text-gray-500 uppercase tracking-widest mb-2">{product.category}</span>
            <h1 className="text-4xl font-serif font-bold text-slate-900 mb-4">{product.name}</h1>
            <p className="text-2xl font-medium text-slate-900 mb-8">${product.price}</p>
            
            <p className="text-gray-600 mb-10 leading-relaxed">
              {product.description}
            </p>

            {product.colors?.length > 0 && (
              <div className="mb-8">
                <div className="flex justify-between mb-3">
                  <span className="font-semibold text-slate-900">Select Color</span>
                </div>
                <div className="flex flex-wrap gap-3">
                  {product.colors.map(color => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-5 py-3 border transition-all text-sm font-medium rounded-sm
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
                <button 
                  type="button" 
                  onClick={() => navigate('/size-guide')} 
                  className="text-sm text-gray-500 underline"
                >
                  Size Guide
                </button>
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

            <div className="mb-8">
              <span className="font-semibold text-slate-900 block mb-3">Quantity</span>
              <div className="flex items-center border border-gray-300 w-fit rounded-sm overflow-hidden">
                <button 
                  onClick={() => handleQuantityChange(-1)}
                  className="px-4 py-3 hover:bg-gray-100 text-slate-600"
                >
                  −
                </button>
                <span className="px-6 py-3 text-center font-medium w-16 text-slate-900">{quantity}</span>
                <button 
                  onClick={() => handleQuantityChange(1)}
                  className="px-4 py-3 hover:bg-gray-100 text-slate-600"
                >
                  +
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4 mb-4">
              <button 
                onClick={handleAddToCart}
                className="flex-1 bg-slate-900 text-white py-4 font-bold tracking-widest hover:bg-slate-800 transition-all uppercase rounded-sm"
              >
                Add to Cart
              </button>
              <button
                onClick={() => product && toggleWishlist(product.id)}
                aria-label={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
                className="p-3 bg-white border border-gray-200 rounded-sm"
              >
                <svg className={`w-5 h-5 ${isInWishlist ? 'fill-red-500 text-red-500' : 'text-slate-900'}`} fill={isInWishlist ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            </div>
            
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

        {relatedProducts.length > 0 && (
          <div className="mt-20">
            <h2 className="text-3xl font-serif font-bold text-slate-900 mb-8">You may also like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
