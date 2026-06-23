import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWishlist } from '../contexts/WishlistContext';
import { useStore } from '../contexts/StoreContext';
import { useAuth } from '../contexts/AuthContext';
import { ProductCard } from '../components/ProductCard';

export const Wishlist = () => {
  const { wishlist, toggleWishlist } = useWishlist();
  const { products, addToCart } = useStore();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate('/login');
  }, [user, navigate]);

  if (!user) return null;

  const wishlistProducts = products.filter(p => wishlist.includes(p.id));

  return (
    <div className="bg-white min-h-screen pt-12 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex items-center justify-between">
          <h1 className="text-4xl font-serif font-bold text-slate-900">Your Wishlist</h1>
        </div>

        {wishlistProducts.length === 0 ? (
          <div className="min-h-[40vh] flex flex-col items-center justify-center">
            <h2 className="text-2xl font-serif font-bold mb-4">Your wishlist is empty</h2>
            <p className="text-gray-500 mb-8">Save products you love and find them here.</p>
            <button onClick={() => navigate('/shop')} className="bg-slate-900 text-white px-8 py-3 font-bold uppercase hover:bg-slate-800">
              Continue Shopping
            </button>
          </div>
        ) : (
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {wishlistProducts.map(product => (
                <div key={product.id} className="relative">
                  <ProductCard product={product} />
                  <div className="mt-2 flex gap-3">
                    <button onClick={() => toggleWishlist(product.id)} className="text-sm text-red-500 hover:text-red-700">
                      Remove
                    </button>
                    <button onClick={() => addToCart(product, product.sizes[0] ?? '')} className="text-sm text-slate-900 font-medium hover:underline">
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
