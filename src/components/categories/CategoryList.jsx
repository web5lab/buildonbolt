import React from 'react';
import { categories } from './data';



export function CategoryList({ onSelect, selectedCategory }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onSelect(category.id)}
          className={`
            p-4 rounded-xl border transition-all
            ${selectedCategory === category.id
              ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
              : 'border-gray-200 dark:border-dark-300 hover:border-primary-300 dark:hover:border-primary-700'
            }
          `}
        >
          <div className="flex items-center gap-3">
            <div className={`
              p-2 rounded-lg
              ${selectedCategory === category.id
                ? 'bg-primary-500 text-white'
                : 'bg-gray-100 dark:bg-dark-300 text-gray-600 dark:text-gray-400'
              }
            `}>
              <category.icon className="w-5 h-5" />
            </div>
            <div className="flex-1 text-left">
              <h3 className="font-medium text-gray-900 dark:text-white">
                {category.label}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {category.description}
              </p>
            </div>
            <span className="text-sm text-primary-600 dark:text-primary-400">
              {category.count}
            </span>
          </div>
        </button>
      ))}
    </div>
  );
}