import { useState, useEffect, useCallback } from 'react';
import { fetchTemplates } from '../../lib/api';
import { TemplateCard } from './TemplateCard';
export function TemplateGrid() {
  const [sortBy, setSortBy] = useState('newest');
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadTemplates = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchTemplates();
      setTemplates(data);
    } catch (err) {
      setError('Failed to load templates');
      console.error(err);
    } finally {
      setLoading(false);
    };
  }, []);

  useEffect(() => {
    loadTemplates();
  }, []);

  const sortedTemplates = [...templates].sort((a, b) => {
    if (sortBy === 'newest') {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
    return b.stars - a.stars;
  });

  return (
    <div className="bg-blue-50/50 dark:bg-dark-100 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4">
        {loading ? (
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-500 py-8">{error}</div>
        ) : templates.length === 0 ? (
          <div className="text-center text-gray-600 py-8">
            <div className="bg-gradient-to-r from-primary-500 to-primary-600 p-6 rounded-xl shadow-lg">
              <h2 className="text-3xl font-semibold text-white mb-4">No Templates Found</h2>
              <p className="text-lg text-gray-200">It looks like there are no templates available right now. Check back later!</p>
              <div className="mt-4">
                <Link 
                  to="/create-template" 
                  className="inline-block bg-primary-500 text-white px-6 py-2 rounded-full text-lg font-medium hover:bg-primary-600 transition duration-300"
                >
                  Create a New Template
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sortedTemplates.map((template) => (
                <TemplateCard key={template.id} {...template} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
