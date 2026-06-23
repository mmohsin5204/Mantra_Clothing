const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

// Helper to get token from localStorage
const getToken = () => localStorage.getItem('mantra_token');

// Fetch wrapper
export const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const token = getToken();
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  const response = await fetch(url, {
    ...options,
    headers,
  });
  
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong');
  }
  
  return data;
};

// Auth API
export const authApi = {
  register: (data) => apiRequest('/auth/register', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  login: (data) => apiRequest('/auth/login', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  getMe: () => apiRequest('/auth/me'),
};

// Products API
export const productsApi = {
  getAll: (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiRequest(`/products${queryString ? `?${queryString}` : ''}`);
  },
  getById: (id) => apiRequest(`/products/${id}`),
  getCategories: () => apiRequest('/products/categories'),
  create: (data) => apiRequest('/products', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id, data) => apiRequest(`/products/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (id) => apiRequest(`/products/${id}`, {
    method: 'DELETE',
  }),
};

// Orders API
export const ordersApi = {
  create: (data) => apiRequest('/orders', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  getMyOrders: () => apiRequest('/orders/my'),
  getById: (id) => apiRequest(`/orders/${id}`),
};

// Reviews API
export const reviewsApi = {
  getByProductId: (productId) => apiRequest(`/reviews/product/${productId}`),
  create: (data) => apiRequest('/reviews', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  delete: (id) => apiRequest(`/reviews/${id}`, {
    method: 'DELETE',
  }),
};

// Wishlist API
export const wishlistApi = {
  get: () => apiRequest('/wishlist'),
  add: (productId) => apiRequest('/wishlist', {
    method: 'POST',
    body: JSON.stringify({ product_id: productId }),
  }),
  remove: (productId) => apiRequest(`/wishlist/${productId}`, {
    method: 'DELETE',
  }),
};

// Payment API
export const paymentApi = {
  createCheckoutSession: (data) => apiRequest('/payment/create-checkout-session', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  getSession: (sessionId) => apiRequest(`/payment/session/${sessionId}`),
};

// Admin API
export const adminApi = {
  getAllOrders: (params) => {
    const queryString = params ? `?${new URLSearchParams(params).toString()}` : '';
    return apiRequest(`/admin/orders${queryString}`);
  },
  updateOrderStatus: (id, status) => apiRequest(`/admin/orders/${id}/status`, {
    method: 'PUT',
    body: JSON.stringify({ status }),
  }),
  getAllUsers: () => apiRequest('/admin/users'),
  getStats: () => apiRequest('/admin/stats'),
};
