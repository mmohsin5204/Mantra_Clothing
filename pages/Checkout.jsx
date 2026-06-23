import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../contexts/StoreContext';
import { ordersApi } from '../services/api';

// City options for Pakistan
const CITIES = [
  'Karachi', 'Lahore', 'Islamabad', 'Rawalpindi', 'Faisalabad', 'Multan', 
  'Hyderabad', 'Gujranwala', 'Peshawar', 'Quetta', 'Sialkot', 'Bahawalpur'
];

// Shipping methods
const SHIPPING_METHODS = [
  { id: 'flat', label: 'FLAT SHIPPING 298 $ + FBR POS FEE 1 $', price: 50, paymentMethod: 'cod' },
  { id: 'free', label: 'FREE SHIPPING + FBR POS FEE 1 $', price: 1, paymentMethod: 'card' }
];

// Payment methods
const PAYMENT_METHODS = [
  { id: 'cod', label: 'Cash on Delivery (COD)', icons: [] },
  { id: 'card', label: 'Debit - Credit Card', icons: ['visa', 'mastercard'] },
  { id: 'baadmay', label: 'BaadMay | Buy Now. Pay Later', icons: ['visa', 'mastercard'] }
];

export const Checkout = () => {
  const { cart, cartTotal, clearCart } = useStore();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Form state
  const [formData, setFormData] = useState({
    email: '',
    email_offers: false,
    first_name: '',
    last_name: '',
    address: '',
    city: '',
    postal_code: '',
    phone: '',
    country: 'Pakistan',
    save_info: false,
    shipping_method: 'flat',
    payment_method: 'cod',
    billing_same_as_shipping: true,
    billing_first_name: '',
    billing_last_name: '',
    billing_address: '',
    billing_city: '',
    billing_postal_code: '',
    billing_phone: '',
    billing_country: 'Pakistan',
  });

  // Calculate fees
  const shippingFee = SHIPPING_METHODS.find(m => m.id === formData.shipping_method)?.price || 0;
  const subtotal = cartTotal;
  const totalAmount = subtotal + shippingFee;

  // Handle input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Handle form submit
  const handleConfirmOrder = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const orderData = {
        items: cart.map(item => ({
          product_id: item.id,
          name: item.name,
          price: item.price,
          size: item.selectedSize,
          color: item.selectedColor || null,
          quantity: item.quantity,
        })),
        total: totalAmount,
        email: formData.email,
        first_name: formData.first_name,
        last_name: formData.last_name,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        postal_code: formData.postal_code,
        country: formData.country,
        shipping_method: formData.shipping_method,
        payment_method: formData.payment_method,
        shipping_fee: shippingFee,
        cart_items: cart,
        email_offers: formData.email_offers,
        billing_same_as_shipping: formData.billing_same_as_shipping,
      };

      const response = await ordersApi.create(orderData);
      clearCart();
      navigate(`/order-confirmation?orderId=${response.order.id}`);
    } catch (err) {
      setError(err.message || 'Failed to place order. Please try again.');
      console.error('Order error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 py-16">
        <h2 className="text-3xl font-serif font-bold text-slate-900 mb-4">Nothing to checkout</h2>
        <p className="text-gray-500 mb-8">Add items to your cart before completing your purchase.</p>
        <Link to="/shop" className="bg-slate-900 text-white px-8 py-3 font-bold uppercase text-sm hover:bg-slate-800">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-6 transition-colors"
      >
        <span>←</span>
        <span className="text-sm font-medium">Back</span>
      </button>
      <h1 className="text-3xl font-serif font-bold text-slate-900 mb-8">Checkout</h1>
      <form onSubmit={handleConfirmOrder} className="grid gap-8 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-6">
          {/* Contact Section */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold text-slate-900 mb-6">Contact</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-slate-900"
                  placeholder="email@example.com"
                />
              </div>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="email_offers"
                  checked={formData.email_offers}
                  onChange={handleChange}
                  className="w-4 h-4 text-slate-900 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-600">Email me with news and offers</span>
              </label>
            </div>
          </div>

          {/* Delivery Section */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold text-slate-900 mb-6">Delivery</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Country/Region</label>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-slate-900"
                >
                  <option value="Pakistan">Pakistan</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">City</label>
                <select
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-slate-900"
                >
                  <option value="">Select city</option>
                  {CITIES.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">First name</label>
                <input
                  type="text"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-slate-900"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Last name</label>
                <input
                  type="text"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-slate-900"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-2">Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-slate-900"
                  placeholder="Street address"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Postal code (optional)</label>
                <input
                  type="text"
                  name="postal_code"
                  value={formData.postal_code}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-slate-900"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-slate-900"
                  placeholder="03XX XXXXXXX"
                />
              </div>
            </div>
            <label className="flex items-center gap-3 cursor-pointer mt-4">
              <input
                type="checkbox"
                name="save_info"
                checked={formData.save_info}
                onChange={handleChange}
                className="w-4 h-4 text-slate-900 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-600">Save this information for next time</span>
            </label>
          </div>

          {/* Shipping Method Section */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold text-slate-900 mb-6">Shipping Method</h2>
            <div className="space-y-3">
              {SHIPPING_METHODS.map(method => (
                <label
                  key={method.id}
                  className={`flex items-center justify-between p-4 border rounded-2xl cursor-pointer transition-all ${
                    formData.shipping_method === method.id
                      ? 'border-slate-900 bg-slate-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="shipping_method"
                      value={method.id}
                      checked={formData.shipping_method === method.id}
                      onChange={handleChange}
                      className="w-4 h-4 text-slate-900"
                    />
                    <span className="font-medium text-slate-900">{method.label}</span>
                  </div>
                  <span className="font-semibold text-slate-900">${method.price.toFixed(2)}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Payment Section */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold text-slate-900 mb-6">Payment</h2>
            <div className="space-y-3">
              {PAYMENT_METHODS.map(method => (
                <label
                  key={method.id}
                  className={`flex items-center justify-between p-4 border rounded-2xl cursor-pointer transition-all ${
                    formData.payment_method === method.id
                      ? 'border-slate-900 bg-slate-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment_method"
                      value={method.id}
                      checked={formData.payment_method === method.id}
                      onChange={handleChange}
                      className="w-4 h-4 text-slate-900"
                    />
                    <span className="font-medium text-slate-900">{method.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {method.icons.includes('visa') && (
                      <div className="px-2 py-1 bg-gray-100 rounded text-xs font-bold text-gray-700">VISA</div>
                    )}
                    {method.icons.includes('mastercard') && (
                      <div className="px-2 py-1 bg-gray-100 rounded text-xs font-bold text-gray-700">MC</div>
                    )}
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Billing Address Section */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold text-slate-900 mb-6">Billing Address</h2>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="billing_same_as_shipping"
                  value="true"
                  checked={formData.billing_same_as_shipping === true}
                  onChange={() => setFormData(prev => ({ ...prev, billing_same_as_shipping: true }))}
                  className="w-4 h-4 text-slate-900"
                />
                <span className="font-medium text-slate-900">Same as shipping address</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="billing_same_as_shipping"
                  value="false"
                  checked={formData.billing_same_as_shipping === false}
                  onChange={() => setFormData(prev => ({ ...prev, billing_same_as_shipping: false }))}
                  className="w-4 h-4 text-slate-900"
                />
                <span className="font-medium text-slate-900">Use a different billing address</span>
              </label>

              {!formData.billing_same_as_shipping && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 pt-6 border-t border-gray-200">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">First name</label>
                    <input
                      type="text"
                      name="billing_first_name"
                      value={formData.billing_first_name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Last name</label>
                    <input
                      type="text"
                      name="billing_last_name"
                      value={formData.billing_last_name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-slate-900"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-2">Address</label>
                    <input
                      type="text"
                      name="billing_address"
                      value={formData.billing_address}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-slate-900"
                      placeholder="Street address"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">City</label>
                    <select
                      name="billing_city"
                      value={formData.billing_city}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-slate-900"
                    >
                      <option value="">Select city</option>
                      {CITIES.map(city => (
                        <option key={city} value={city}>{city}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Postal code</label>
                    <input
                      type="text"
                      name="billing_postal_code"
                      value={formData.billing_postal_code}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-slate-900"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div>
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-200 sticky top-8">
            <h2 className="text-xl font-semibold text-slate-900 mb-6">Order summary</h2>
            <div className="space-y-4">
              {cart.map((item) => (
                <div key={`${item.id}-${item.selectedSize}-${item.selectedColor || ''}`} className="flex justify-between">
                  <div>
                    <p className="font-medium text-slate-900">{item.name}</p>
                    <p className="text-sm text-gray-500">
                      Size: {item.selectedSize} · Qty: {item.quantity}{item.selectedColor ? ` · Color: ${item.selectedColor}` : ''}
                    </p>
                  </div>
                  <p className="font-semibold text-slate-900">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 border-t border-gray-200 pt-6">
              <div className="flex justify-between text-sm text-gray-500 mb-3">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-500 mb-6">
                <span>Shipping</span>
                <span>{shippingFee === 0 ? 'Free' : `$${shippingFee.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between text-lg font-semibold text-slate-900 mb-6">
                <span>Total</span>
                <span>${totalAmount.toFixed(2)}</span>
              </div>
              {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-slate-900 text-white py-4 font-bold uppercase hover:bg-slate-800 transition-colors rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Placing order...' : 'Complete order'}
              </button>
            </div>
            <div className="mt-8 space-y-4">
              <Link
                to="/payment-guide"
                className="block rounded-2xl bg-slate-800 border border-slate-700 p-4 hover:bg-slate-700 transition"
              >
                <p className="text-sm text-slate-400">Need payment help?</p>
                <p className="font-medium text-white">View Payment Guide →</p>
              </Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
