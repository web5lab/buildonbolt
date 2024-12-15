import React from 'react';
import { Search } from 'lucide-react';

interface CommentFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function CommentFilters({ searchQuery, onSearchChange }: CommentFiltersProps) {
  return (
    <div className="flex items-center gap-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search comments..."
          className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-dark-300 bg-white dark:bg-dark-300 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:text-white"
        />
      </div>
    </div>
  );
}