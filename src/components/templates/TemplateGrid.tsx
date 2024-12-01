import React, { useState } from 'react';
import { TemplateCard } from './TemplateCard';
import { TemplateSort } from './TemplateSort';
import { templates } from './data/templates';
import { SortOption } from './types';

export function TemplateGrid() {
  const [sortBy, setSortBy] = useState<SortOption>('newest');

  const sortedTemplates = [...templates].sort((a, b) => {
    if (sortBy === 'newest') {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
    return b.stars - a.stars;
  });

  return (
    <div className="bg-blue-50/50 dark:bg-dark-100 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4">
       
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedTemplates.map((template) => (
            <TemplateCard key={template.id} {...template} />
          ))}
        </div>
      </div>
    </div>
  );
}