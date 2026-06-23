import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white pt-12 pb-8">
      <div className="w-full px-8 sm:px-12 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-[24px] md:text-[42px] font-serif font-bold mb-4">MANTRA</h3>
            <p
              className="text-gray-400 text-[13px] md:text-[18px]"
              dangerouslySetInnerHTML={{ __html: "Redefining modern masculinity through premium fashion.<br/>Quality materials, timeless cuts, and effortless style." }}
            />
          </div>
          <div>
            <h4 className="font-bold text-[15px] md:text-[22px] mb-6">Shop</h4>
            <ul className="space-y-4 text-gray-400">
              <li>
                <Link to="/shop?sort=newest" className="text-[13px] md:text-[18px] hover:text-white transition">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link to="/returns-exchanges" className="text-[13px] md:text-[18px] hover:text-white transition">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link to="/payment-guide" className="text-[13px] md:text-[18px] hover:text-white transition">
                  Payment Guide
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-[15px] md:text-[22px] mb-6">Support</h4>
            <ul className="space-y-4 text-gray-400">
              <li>
                <Link to="/contact" className="text-gray-400 text-[13px] md:text-[18px] hover:text-white transition">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/delivery-and-orders" className="text-gray-400 text-[13px] md:text-[18px] hover:text-white transition">
                  Delivery & Orders
                </Link>
              </li>
              <li>
                <Link to="/size-guide" className="text-gray-400 text-[13px] md:text-[18px] hover:text-white transition">
                  Size Guide
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-800 mt-12 pt-8 text-center text-gray-500 text-[11px] md:text-[16px]">
          <p>&copy; {new Date().getFullYear()} MANTRA Fashion. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
