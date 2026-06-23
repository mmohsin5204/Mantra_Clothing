import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to send');
      setSubmitted(true);
    } catch (err) {
      setError(err.message || 'Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white min-h-screen pb-24 pt-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-6 transition-colors"
        >
          <span>←</span>
          <span className="text-sm font-medium">Back</span>
        </button>
        <h1 className="text-4xl font-serif font-bold text-slate-900 mb-6">Contact Us</h1>
        <div className="bg-gray-50 rounded-sm border border-gray-200 p-8">
          {submitted ? (
            <div className="text-center py-12">
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">Thanks!</h2>
              <p className="text-gray-600">We'll get back to you soon.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-900 mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full rounded-none border border-gray-300 px-4 py-3 text-slate-900 focus:border-slate-900 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-900 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full rounded-none border border-gray-300 px-4 py-3 text-slate-900 focus:border-slate-900 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-900 mb-2">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  required
                  className="w-full rounded-none border border-gray-300 px-4 py-3 text-slate-900 focus:border-slate-900 focus:outline-none"
                />
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <button
                type="submit"
                disabled={loading}
                className="bg-slate-900 text-white uppercase tracking-widest px-6 py-3 text-sm font-bold hover:bg-slate-800 transition-colors disabled:opacity-50"
              >
                {loading ? 'Sending...' : 'Send'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};