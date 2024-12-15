import React from 'react';
import { Search, Wand2, Command } from 'lucide-react';


export function SearchInput({ value, onChange, placeholder, mode }) {
  return (
    <div className="relative">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-12 pr-24 py-4 bg-white dark:bg-dark-300 rounded-xl border border-primary-100 dark:border-dark-300 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:text-white text-lg shadow-sm transition-all duration-300 placeholder:text-gray-400"
      />
      {mode === 'search' ? (
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-primary-500 animate-pulse" />
      ) : (
        <Wand2 className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-primary-500 animate-pulse" />
      )}
      <kbd className="absolute right-4 top-1/2 -translate-y-1/2 hidden sm:flex items-center gap-1 px-3 py-1.5 text-xs text-primary-500 bg-primary-50 dark:bg-primary-900/20 rounded-lg border border-primary-100 dark:border-primary-800">
        <Command className="w-3 h-3" />
        {mode === 'search' ? '/' : 'P'}
      </kbd>
    </div>
  );
}