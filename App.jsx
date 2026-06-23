import React from 'react';
import { HashRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { StoreProvider } from './contexts/StoreContext';
import { WishlistProvider } from './contexts/WishlistContext';
import { AuthProvider } from './contexts/AuthContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { Wishlist } from './pages/Wishlist';
import { ProductDetails } from './pages/ProductDetails';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { OrderConfirmation } from './pages/OrderConfirmation';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Admin } from './pages/Admin';
import { Contact } from './pages/Contact';
import { ShippingReturns } from './pages/ShippingReturns';
import { SizeGuide } from './pages/SizeGuide';
import { PaymentGuide } from './pages/PaymentGuide';
import { DeliveryAndOrders } from './pages/DeliveryAndOrders';
import { ProtectedRoute } from './components/ProtectedRoute';
import { ReturnsExchanges } from './pages/ReturnsExchanges';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// React Router wrapper to allow ScrollToTop to use useLocation
const AppContent = () => {
    return (
        <div className="flex flex-col min-h-screen">
          <ScrollToTop />
          <Navbar />
          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/cart" element={
                <ProtectedRoute>
                  <Cart />
                </ProtectedRoute>
              } />
              <Route path="/contact" element={<Contact />} />
              <Route path="/shipping-returns" element={<ShippingReturns />} />
              <Route path="/returns-exchanges" element={<ReturnsExchanges />} />
              <Route path="/size-guide" element={<SizeGuide />} />
              <Route path="/payment-guide" element={<PaymentGuide />} />
              <Route path="/delivery-and-orders" element={<DeliveryAndOrders />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/checkout" element={
                <ProtectedRoute>
                  <Checkout />
                </ProtectedRoute>
              } />
              <Route path="/order-confirmation" element={<OrderConfirmation />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
          <Footer />
        </div>
    )
}

function App() {
  return (
    <AuthProvider>
      <StoreProvider>
        <WishlistProvider>
          <HashRouter>
            <AppContent />
          </HashRouter>
        </WishlistProvider>
      </StoreProvider>
    </AuthProvider>
  );
}

export default App;
