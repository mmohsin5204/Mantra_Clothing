import React, { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useStore } from '../contexts/StoreContext';
import { ProductCard } from '../components/ProductCard';

export const Search: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q')?.trim() ?? '';
  const { products } = useStore();

  const filteredProducts = useMemo(() => {
    if (!query) return [];
    const lowerQuery = query.toLowerCase();
    return products.filter(product => {
      return [product.name, product.category, product.description]
        .some(value => value.toLowerCase().includes(lowerQuery));
    });
  }, [products, query]);

  return (
    <div className="bg-white min-h-screen pt-12 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h1 className="text-4xl font-serif font-bold text-slate-900 mb-4">Search Results</h1>
          {query ? (
            <p className="text-sm text-gray-500">
              {filteredProducts.length > 0 ? (
                <span>{filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found for "{query}".</span>
              ) : (
                <span>No products found for "{query}".</span>
              )}
            </p>
          ) : (
            <p className="text-sm text-gray-500">Type in the search bar to find products by name, category, or description.</p>
          )}
        </div>

        {query ? (
          filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center border border-dashed border-gray-200 rounded-sm">
              <p className="text-slate-900 font-medium mb-3">No products found</p>
              <p className="text-gray-500">Try another search term or browse the shop for inspiration.</p>
            </div>
          )
        ) : (
          <div className="py-20 text-center border border-dashed border-gray-200 rounded-sm">
            <p className="text-slate-900 font-medium mb-3">Ready to search?</p>
            <p className="text-gray-500">Enter a product name, category, or description in the navbar search bar.</p>
          </div>
        )}
      </div>
    </div>
  );
};