import React from 'react';
import { Heart } from 'lucide-react';


export function FavoriteButton({ isFavorited, onToggle, count }) {
  return (
    <button
      onClick={onToggle}
      className={`
        flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium
        transition-all duration-300 group
        ${
          isFavorited
            ? 'bg-red-50 dark:bg-red-900/20 text-red-500'
            : 'bg-gray-100 dark:bg-dark-300 text-gray-600 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-500'
        }
      `}
    >
      <Heart
        className={`w-4 h-4 transition-transform duration-300 ${
          isFavorited ? 'fill-current scale-110' : 'group-hover:scale-110'
        }`}
      />
      <span>{count}</span>
    </button>
  );
}