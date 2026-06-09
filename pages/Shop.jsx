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
      <div className="flex flex-row w-full">
        {/* Left: Categories */}
        <div className="w-[30%] min-h-screen border-r border-gray-100 px-6 pt-4">
          <h3 className="font-serif font-bold text-[22px] mb-6 uppercase tracking-widest text-slate-900">Categories</h3>
          <ul className="space-y-3">
            {categories.map(cat => (
              <li key={cat}>
                <button
                  onClick={() => setActiveCategory(cat)}
                  className={`text-[22px] ${activeCategory === cat ? 'font-bold text-slate-900 underline underline-offset-4' : 'text-gray-500 hover:text-slate-900'} transition-colors`}
                >
                  {cat}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Right: Product Grid */}
        <div className="w-[70%] px-4 pt-4">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
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

