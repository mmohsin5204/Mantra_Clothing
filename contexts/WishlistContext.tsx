import React, { createContext, useContext, ReactNode } from 'react';
import { useStore } from './StoreContext';

interface WishlistContextType {
  wishlist: string[];
  toggleWishlist: (id: string) => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const { wishlist, toggleWishlist } = useStore();

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist }}>
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
