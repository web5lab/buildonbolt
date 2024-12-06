import React from 'react';

export function ThinkingDots() {
  return (
    <div className="flex justify-start">
      <div className="bg-gray-100 dark:bg-dark-300 rounded-2xl p-3 rounded-bl-none">
        <div className="flex gap-1">
          <div className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500 animate-bounce [animation-delay:-0.3s]" />
          <div className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500 animate-bounce [animation-delay:-0.15s]" />
          <div className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500 animate-bounce" />
        </div>
      </div>
    </div>
  );
}