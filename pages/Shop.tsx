import React, { useState, useMemo } from 'react';
import { useStore } from '../contexts/StoreContext';
import { ProductCard } from '../components/ProductCard';
import { Category, SortOption } from '../types';

export const Shop: React.FC = () => {
  const { products } = useStore();
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [sortOption, setSortOption] = useState<SortOption>('newest');

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
    <div className="bg-white min-h-screen pt-12 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12">
          <h1 className="text-4xl font-serif font-bold text-slate-900 mb-6 md:mb-0">Shop All</h1>
          
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Sort Dropdown */}
            <select 
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value as SortOption)}
              className="border border-gray-300 rounded-none px-4 py-2 text-sm focus:outline-none focus:border-slate-900 bg-white"
            >
              <option value="newest">Newest Arrivals</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar Filters */}
          <div className="w-full lg:w-64 flex-shrink-0">
            <h3 className="font-bold text-lg mb-6 uppercase tracking-wider text-slate-900">Categories</h3>
            <ul className="space-y-3">
              {categories.map(cat => (
                <li key={cat}>
                  <button
                    onClick={() => setActiveCategory(cat)}
                    className={`text-sm ${activeCategory === cat ? 'font-bold text-slate-900 underline underline-offset-4' : 'text-gray-500 hover:text-slate-900'} transition-colors`}
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
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
    </div>
  );
};
