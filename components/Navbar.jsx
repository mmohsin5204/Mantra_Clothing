import { useState, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useStore } from '../contexts/StoreContext';

export const Navbar = () => {
  const { cart, user, logout } = useStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef(null);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
  ];

  if (user?.isAdmin) {
    navLinks.push({ name: 'Admin', path: '/admin' });
  }

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
      <div className="relative flex items-center justify-between h-20 w-full px-4 sm:px-6 lg:px-8">
        
        {/* Left: Nav Links */}
        <div className="hidden md:flex space-x-8 items-center">
          {navLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-[20px] ${location.pathname === link.path ? 'text-slate-900 font-semibold' : 'text-slate-500 hover:text-slate-900'} transition-colors`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Center: Logo (absolute) */}
        <Link to="/" className="absolute left-1/2 transform -translate-x-1/2 text-[36px] font-serif font-bold tracking-[0.3em] text-slate-900">
          MANTRA
        </Link>

        {/* Right: Actions */}
        <div className="flex items-center space-x-6">
            {/* Search */}
            <div className="relative flex items-center justify-center">
              {!isSearchOpen ? (
                <button
                  onClick={() => { setIsSearchOpen(true); setTimeout(() => searchInputRef.current?.focus(), 0); }}
                  className="flex items-center justify-center text-slate-500 hover:text-slate-900"
                  aria-label="Open search"
                >
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                </button>
              ) : (
                <input
                  ref={searchInputRef}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      navigate(`/shop?search=${encodeURIComponent(searchQuery)}`);
                      setIsSearchOpen(false);
                    }
                  }}
                  onBlur={() => setIsSearchOpen(false)}
                  placeholder="Search products"
                  className="bg-transparent border-0 border-b border-black focus:outline-none w-48 text-sm"
                />
              )}
            </div>

            {/* Cart */}
            <Link to="/cart" className="relative flex items-center justify-center text-slate-500 hover:text-slate-900 group">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-slate-900 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>


            {/* Mobile Menu Button */}
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-slate-500">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-100">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className="block px-3 py-2 rounded-md text-[16px] font-medium text-slate-700 hover:text-slate-900 hover:bg-gray-50"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};
