import React, { createContext, useContext, useEffect, useState } from 'react';
import { wishlistApi } from '../services/api';
import { useAuth } from './AuthContext';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  // Fetch wishlist when user is logged in
  useEffect(() => {
    const fetchWishlist = async () => {
      if (!user) {
        setWishlist([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const data = await wishlistApi.get();
        setWishlist(data.data.map(product => product.id));
      } catch (err) {
        console.error('Failed to fetch wishlist:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, [user]);

  const toggleWishlist = async (productId) => {
    if (!user) {
      alert('Please login to add items to wishlist');
      return;
    }

    try {
      const isInWishlist = wishlist.includes(productId);
      
      if (isInWishlist) {
        await wishlistApi.remove(productId);
        setWishlist(prev => prev.filter(id => id !== productId));
      } else {
        await wishlistApi.add(productId);
        setWishlist(prev => [...prev, productId]);
      }
    } catch (err) {
      console.error('Failed to update wishlist:', err);
      alert('Failed to update wishlist');
    }
  };

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist, loading, error }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist must be used within WishlistProvider');
  return ctx;
};

export default WishlistContext;
