import { useState, useMemo } from 'react';
import { useStore } from '../contexts/StoreContext';
import { ProductCard } from '../components/ProductCard';
import { Category } from '../types';

export const Shop = () => {
  const { products } = useStore();
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortOption, setSortOption] = useState('newest');

  const categories = ['All', ...Object.values(Category)];

  const filteredProducts = useMemo(() => {
    let result = [...products];
    
    // Filter
    if (activeCategory !== 'All') {
      result = result.filter(p => p.category === activeCategory);
    }

    // Sort
    if (sortOption === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    }
    // newest is default order in array for this mock
    
    return result;
  }, [products, activeCategory, sortOption]);

  return (
    <div className="bg-white min-h-screen pb-24">
      {/* Page Heading */}
      <h1 className="text-[36px] md:text-[42px] font-serif font-bold text-slate-900 px-6 pt-8 pb-4">Shop All</h1>

      {/* Main Content Area */}
      <div className="flex flex-col md:flex-row w-full">
        {/* Left: Categories */}
        <div className="w-full md:w-[30%] md:min-h-screen md:border-r md:border-gray-100 px-4 md:px-6 pt-4 mb-6 md:mb-0">
          <ul className="flex flex-row flex-wrap gap-x-4 gap-y-2 pb-2 md:flex-col md:flex-nowrap md:space-y-4">
            {categories.map(cat => (
              <li key={cat} className="flex-shrink-0 md:flex-shrink">
                <button
                  onClick={() => setActiveCategory(cat)}
                  className={`flex-shrink-0 uppercase tracking-widest text-[10px] md:text-[16px] pb-1 whitespace-nowrap
                    ${activeCategory === cat ? 'border-b-2 border-black text-black font-semibold' : 'text-gray-400 hover:text-black hover:border-b-2 hover:border-gray-400'} transition-all duration-200`}
                >
                  {cat}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Right: Product Grid */}
        <div className="w-full md:w-[70%] px-4 pt-4">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 gap-2 md:gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-gray-50 rounded-lg">
              <p className="text-gray-500">No products found in this category.</p>
              <button 
                onClick={() => setActiveCategory('All')}
                className="mt-4 text-slate-900 font-medium hover:underline"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

