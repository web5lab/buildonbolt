import { useState, useCallback } from 'react';

export function useTemplateSearch(templates) {
  const [searchResults, setSearchResults] = useState([]);

  const search = useCallback((query) => {
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