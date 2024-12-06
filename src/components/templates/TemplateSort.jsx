import React from 'react';
import { SortAsc } from 'lucide-react';




export function TemplateSort({ sortBy, onSortChange }) {
  return (
    <div className="flex items-center gap-4 mb-8">
      <div className="flex items-center gap-2 text-primary-600 dark:text-primary-400">
        <SortAsc className="w-5 h-5" />
        <span className="text-sm font-medium">Sort by:</span>
      </div>
      <div className="flex gap-2">
        <SortButton
          active={sortBy === 'newest'}
          onClick={() => onSortChange('newest')}
        >
          Newest
        </SortButton>
        <SortButton
          active={sortBy === 'popular'}
          onClick={() => onSortChange('popular')}
        >
          Popular
        </SortButton>
      </div>
    </div>
  );
}



function SortButton({ active, children, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
        active
          ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400'
          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-dark-300'
      }`}
    >
      {children}
    </button>
  );
}