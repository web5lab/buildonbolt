import React from 'react';



export function EmptyState({ title, description, action }) {
  return (
    <div className="text-center py-12">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        {description}
      </p>
      <button
        onClick={action.onClick}
        className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-2 rounded-xl text-sm font-medium transition-colors"
      >
        {action.label}
      </button>
    </div>
  );
}