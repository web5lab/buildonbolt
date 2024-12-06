import React from 'react';
import { Search } from 'lucide-react';

export function SearchBar() {
  return (
    <div className="flex items-center justify-between max-w-7xl mx-auto px-4 py-6">
      <div className="relative flex-1 max-w-3xl">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search templates..."
          className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="flex items-center gap-4 ml-4">
        <select className="px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option>Name</option>
          <option>Date</option>
          <option>Popular</option>
        </select>
      </div>
    </div>
  );
}