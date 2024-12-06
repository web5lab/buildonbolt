import React, { useEffect } from 'react';
import { X, ExternalLink, Rocket } from 'lucide-react';



export function PreviewModal({ url, onClose }) {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-dark-200 w-full max-w-6xl h-[80vh] rounded-2xl overflow-hidden flex flex-col">
        <div className="p-4 border-b border-gray-200 dark:border-dark-300 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
              Template Preview
            </span>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => window.open('https://bolt.new', '_blank')}
              className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 group"
            >
              <Rocket className="w-4 h-4 group-hover:animate-bounce" />
              Open in Bolt.new
            </button>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="flex-1 bg-white dark:bg-dark-300">
          <iframe
            src={url}
            className="w-full h-full border-0"
            title="Template Preview"
            sandbox="allow-scripts allow-same-origin"
          />
        </div>
      </div>
    </div>
  );
}