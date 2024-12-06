import React from 'react';
import { categories } from './data/categories';

export function CategoryNav() {
  return (
    <div className="bg-white dark:bg-dark-200 sticky top-0 z-10 border-b border-blue-100 dark:border-dark-300 shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-8 overflow-x-auto py-4 scrollbar-hide">
          {categories.map(({ id, label, icon: Icon, count }) => (
            <button
              key={id}
              className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors whitespace-nowrap group"
            >
              <Icon className="w-5 h-5 group-hover:text-blue-500 dark:group-hover:text-blue-300 transition-colors" />
              <span>{label}</span>
              <span className="text-xs bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded-full">
                {count}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}