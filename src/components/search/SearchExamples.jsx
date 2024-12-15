import React from 'react';



export function SearchExamples({ examples, onSelect }) {
  return (
    <div className="flex flex-wrap gap-2">
      {examples.map((example, index) => (
        <button
          key={index}
          type="button"
          onClick={() => onSelect(example)}
          className="text-sm px-4 py-2 rounded-xl bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-all duration-300 border border-primary-100/50 dark:border-primary-800/50 hover:scale-105"
        >
          {example}
        </button>
      ))}
    </div>
  );
}