import { useNavigate } from 'react-router-dom';

export const SizeGuide = () => {
  const navigate = useNavigate();
  
  return (
    <div className="bg-white min-h-screen pb-24 pt-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-6 transition-colors"
        >
          <span>←</span>
          <span className="text-sm font-medium">Back</span>
        </button>
        <h1 className="text-4xl font-serif font-bold text-slate-900 mb-6">Size Guide</h1>
        <div className="overflow-hidden rounded-sm border border-gray-200 bg-gray-50">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-white">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Size</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Chest</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Waist</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              <tr>
                <td className="px-6 py-4 text-sm text-gray-700">S</td>
                <td className="px-6 py-4 text-sm text-gray-700">34-36"</td>
                <td className="px-6 py-4 text-sm text-gray-700">28-30"</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm text-gray-700">M</td>
                <td className="px-6 py-4 text-sm text-gray-700">38-40"</td>
                <td className="px-6 py-4 text-sm text-gray-700">32-34"</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm text-gray-700">L</td>
                <td className="px-6 py-4 text-sm text-gray-700">42-44"</td>
                <td className="px-6 py-4 text-sm text-gray-700">36-38"</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm text-gray-700">XL</td>
                <td className="px-6 py-4 text-sm text-gray-700">46-48"</td>
                <td className="px-6 py-4 text-sm text-gray-700">40-42"</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm text-gray-700">XXL</td>
                <td className="px-6 py-4 text-sm text-gray-700">50-52"</td>
                <td className="px-6 py-4 text-sm text-gray-700">44-46"</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
