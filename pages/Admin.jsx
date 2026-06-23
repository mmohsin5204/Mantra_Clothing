import { useState } from 'react';
import { useStore } from '../contexts/StoreContext';
import { useAuth } from '../contexts/AuthContext';
import { Category } from '../types';
import { generateProductDescription } from '../services/geminiService';
import { Navigate } from 'react-router-dom';

export const Admin = () => {
  const { user } = useAuth();
  const { products, addProduct, deleteProduct } = useStore();
  const [isGenerating, setIsGenerating] = useState(false);
  
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: Category.SHIRTS,
    price: 0,
    image: 'https://picsum.photos/id/200/800/1000',
    description: '',
    sizes: ['S', 'M', 'L', 'XL'],
  });

  if (!user || !user.isAdmin) return <Navigate to="/login" replace />;

  const handleGenerateDescription = async () => {
    if (!newProduct.name || !newProduct.category) {
        alert("Please enter a name and category first.");
        return;
    }
    setIsGenerating(true);
    const desc = await generateProductDescription(newProduct.name, newProduct.category);
    setNewProduct({ ...newProduct, description: desc });
    setIsGenerating(false);
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (newProduct.name && newProduct.price !== undefined && newProduct.category) {
      addProduct({
        ...newProduct,
        id: Date.now().toString(),
        sizes: newProduct.sizes || ['S', 'M', 'L', 'XL']
      });
      setNewProduct({
        name: '',
        category: Category.SHIRTS,
        price: 0,
        image: 'https://picsum.photos/id/200/800/1000',
        description: '',
        sizes: ['S', 'M', 'L', 'XL'],
      });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-serif font-bold text-slate-900">Admin Dashboard</h1>
        <span className="text-gray-500">Welcome, {user.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Add Product Form */}
        <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-bold mb-6">Add New Product</h2>
          <form onSubmit={handleAddProduct} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Product Name</label>
              <input
                type="text"
                required
                value={newProduct.name}
                onChange={e => setNewProduct({...newProduct, name: e.target.value})}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Category</label>
                    <select
                        value={newProduct.category}
                        onChange={e => setNewProduct({...newProduct, category: e.target.value})}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    >
                        {Object.values(Category).map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Price ($)</label>
                    <input
                        type="number"
                        required
                        value={newProduct.price}
                        onChange={e => setNewProduct({...newProduct, price: Number(e.target.value)})}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    />
                </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Image URL</label>
              <input
                type="text"
                value={newProduct.image}
                onChange={e => setNewProduct({...newProduct, image: e.target.value})}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                value={newProduct.description}
                onChange={e => setNewProduct({...newProduct, description: e.target.value})}
                rows={4}
                className="block w-full border border-gray-300 rounded-md shadow-sm p-2 text-sm"
              ></textarea>
              <button
                type="button"
                onClick={handleGenerateDescription}
                disabled={isGenerating}
                className="mt-2 text-xs flex items-center text-indigo-600 hover:text-indigo-800 font-medium"
              >
                 {isGenerating ? (
                    <span>Generating...</span>
                 ) : (
                    <>
                        <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                        Generate with AI
                    </>
                 )}
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-slate-900 text-white py-2 px-4 rounded-md font-bold hover:bg-slate-800 transition-colors"
            >
              Add Product
            </button>
          </form>
        </div>

        {/* Product List */}
        <div className="lg:col-span-2">
            <h2 className="text-xl font-bold mb-6">Inventory</h2>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {products.map(product => (
                            <tr key={product.id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="h-10 w-10 flex-shrink-0">
                                            <img className="h-10 w-10 rounded-full object-cover" src={product.image} alt={product.name} />
                                        </div>
                                        <div className="ml-4">
                                            <div className="text-sm font-medium text-gray-900">{product.name}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-slate-100 text-slate-800">
                                        {product.category}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    ${product.price}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button onClick={() => deleteProduct(product.id)} className="text-red-600 hover:text-red-900">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
      </div>
    </div>
  );
};
