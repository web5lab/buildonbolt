import { useState, useCallback } from 'react';
import { Template } from '../components/templates/data/templates';

export function useTemplateSearch(templates: Template[]) {
  const [searchResults, setSearchResults] = useState<Template[]>([]);

  const search = useCallback((query: string) => {
    const normalizedQuery = query.toLowerCase();
    const results = templates.filter(template => 
      template.title.toLowerCase().includes(normalizedQuery) ||
      template.description.toLowerCase().includes(normalizedQuery) ||
      template.category.toLowerCase().includes(normalizedQuery)
    );
    setSearchResults(results);
  }, [templates]);

  return { searchResults, search };
}