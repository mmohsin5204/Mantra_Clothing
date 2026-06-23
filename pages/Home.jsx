import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useStore } from '../contexts/StoreContext';
import { ProductCard } from '../components/ProductCard';

export const Home = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterMsg, setNewsletterMsg] = useState('');
  const [newsletterLoading, setNewsletterLoading] = useState(false);

  const handleNewsletterSubscribe = async () => {
    if (!newsletterEmail.trim()) return;
    setNewsletterLoading(true);
    setNewsletterMsg('');
    try {
      const res = await fetch('http://localhost:5000/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: newsletterEmail.trim() }),
      });
      const data = await res.json();
      setNewsletterMsg(data.message);
      if (res.ok) setNewsletterEmail('');
    } catch {
      setNewsletterMsg('Something went wrong. Please try again.');
    } finally {
      setNewsletterLoading(false);
    }
  };

  const { products } = useStore();
  const featuredProducts = products.filter(p => p.featured).slice(0, 4);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://i.pinimg.com/1200x/e2/02/cc/e202cc42f69f6b2512d2d24f3dd93aed.jpg" 
            alt="Hero Background" 
            className="w-full h-full object-cover filter brightness-[0.6]"
          />
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-6 leading-tight">
            Elevate Your <br/>Everyday Style.
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl mx-auto font-light">
            MANTRA offers a curated collection of premium menswear designed for the modern gentleman. 
            Quality that speaks for itself.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
            <Link to="/shop" className="bg-white text-slate-900 px-6 sm:px-8 py-3 sm:py-4 font-bold tracking-widest hover:bg-gray-100 transition-colors uppercase text-sm text-center">
              Shop Now
            </Link>
            <Link to="/shop" className="border border-white text-white px-6 sm:px-8 py-3 sm:py-4 font-bold tracking-widest hover:bg-white hover:text-slate-900 transition-colors uppercase text-sm text-center">
              New Arrivals
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Collection */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-serif font-bold text-slate-900">Featured Collection</h2>
              <p className="mt-2 text-gray-500">Handpicked essentials for this season.</p>
            </div>
            <Link to="/shop" className="hidden md:block text-slate-900 font-medium hover:underline decoration-1 underline-offset-4">
              View all products &rarr;
            </Link>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-8">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          <div className="mt-12 text-center md:hidden">
            <Link to="/shop" className="text-slate-900 font-medium hover:underline decoration-1 underline-offset-4">
              View all products &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Promo Banner */}
      <section className="bg-slate-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">Join the Inner Circle</h2>
          <p className="text-gray-400 max-w-xl mx-auto mb-8">
            Sign up for our newsletter to receive exclusive offers, style tips, and early access to new drops.
          </p>
          <div className="flex flex-col sm:flex-row justify-center max-w-md mx-auto gap-3 px-4 sm:px-0">
            <input 
              type="email" 
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleNewsletterSubscribe()}
              placeholder="Enter your email" 
              disabled={newsletterLoading}
              className="px-4 py-3 bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-white w-full disabled:opacity-50"
            />
            <button 
              onClick={handleNewsletterSubscribe}
              disabled={newsletterLoading}
              className="bg-white text-slate-900 px-8 py-3 font-bold hover:bg-gray-100 transition-colors uppercase text-sm whitespace-nowrap w-full sm:w-auto disabled:opacity-50"
            >
              {newsletterLoading ? 'Subscribing...' : 'Subscribe'}
            </button>
          </div>
          {newsletterMsg && (
            <p className={`mt-4 text-sm font-medium ${newsletterMsg.includes('already') || newsletterMsg.includes('wrong') || newsletterMsg.includes('Something') ? 'text-red-400' : 'text-green-400'}`}>
              {newsletterMsg}
            </p>
          )}
        </div>
      </section>
    </div>
  );
};
