import { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_PRODUCTS } from '../constants';

const StoreContext = createContext(undefined);

export const StoreProvider = ({ children }) => {
  // Products State
  const [products, setProducts] = useState(() => {
    try {
      return INITIAL_PRODUCTS;
    } catch (e) {
      console.error("Failed to load products from constants", e);
      return [];
    }
  });

  // Cart State
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('cart');
      if (!saved) return [];
      const parsed = JSON.parse(saved);
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      console.error("Failed to load cart from localStorage", e);
      return [];
    }
  });

  // Persistence
  useEffect(() => localStorage.setItem('cart', JSON.stringify(cart)), [cart]);

  // Actions
  const addToCart = (product, size, color = '', qty = 1) => {
    setCart(prev => {
      const existing = prev.find(
        item => item.id === product.id && item.selectedSize === size && item.selectedColor === color
      );
      if (existing) {
        return prev.map(item => 
          item.id === product.id && item.selectedSize === size && item.selectedColor === color
            ? { ...item, quantity: item.quantity + qty } 
            : item
        );
      }
      return [...prev, { ...product, selectedSize: size, selectedColor: color, quantity: qty }];
    });
  };

  const removeFromCart = (productId, size, color = '') => {
    setCart(prev => prev.filter(item => !(item.id === productId && item.selectedSize === size && item.selectedColor === color)));
  };

  const updateQuantity = (productId, size, delta, color = '') => {
    setCart(prev => prev.map(item => {
      if (item.id === productId && item.selectedSize === size && item.selectedColor === color) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const clearCart = () => {
    setCart([]);
  };

  const addProduct = (product) => {
    setProducts(prev => [product, ...prev]);
  };

  const deleteProduct = (id) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <StoreContext.Provider value={{ 
      products, cart,
      addToCart, removeFromCart, updateQuantity, clearCart,
      addProduct, deleteProduct,
      cartTotal 
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) throw new Error("useStore must be used within StoreProvider");
  return context;
};
