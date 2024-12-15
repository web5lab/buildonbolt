import React from 'react';
import { Search, Filter } from 'lucide-react';

interface TemplateFiltersProps {
  statusFilter: string;
  onStatusChange: (status: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function TemplateFilters({
  statusFilter,
  onStatusChange,
  searchQuery,
  onSearchChange
}: TemplateFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search templates..."
          className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-dark-300 bg-white dark:bg-dark-300 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:text-white"
        />
      </div>
      <div className="flex items-center gap-2">
        <Filter className="w-5 h-5 text-gray-400" />
        <select
          value={statusFilter}
          onChange={(e) => onStatusChange(e.target.value)}
          className="px-4 py-2 rounded-lg border border-gray-200 dark:border-dark-300 bg-white dark:bg-dark-300 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:text-white"
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>
    </div>
  );
}