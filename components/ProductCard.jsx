import { Link } from 'react-router-dom';

export const ProductCard = ({ product }) => {
  return (
    <Link to={`/product/${product.id}`} className="group block">
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-200 rounded-sm mb-4">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />
        {/* Quick Add Overlay (Desktop) */}
        <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 hidden md:block">
          <button className="w-full bg-white text-slate-900 py-3 font-semibold text-[17px] hover:bg-slate-900 hover:text-white transition-colors">
            VIEW DETAILS
          </button>
        </div>
      </div>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-[20px] font-medium text-slate-900 group-hover:text-slate-600 transition-colors">
            {product.name}
          </h3>
          <p className="mt-1 text-[17px] text-gray-500">{product.category}</p>
        </div>
        <p className="text-[20px] font-semibold text-slate-900">${product.price}</p>
      </div>
    </Link>
  );
};

