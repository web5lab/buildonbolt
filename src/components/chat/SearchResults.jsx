import React from 'react';
import { ArrowRight } from 'lucide-react';



export function SearchResults({ results }) {
  if (results.length === 0) return null;

  return (
    <div className="space-y-2">
      {results.map((template, index) => (
        <div
          key={index}
          className="bg-white rounded-lg p-3 border border-blue-100 hover:border-blue-300 transition-all cursor-pointer group"
        >
          <div className="flex items-center gap-3">
            <img
              src={template.image}
              alt={template.title}
              className="w-12 h-12 rounded-lg object-cover"
            />
            <div className="flex-1">
              <h4 className="text-sm font-medium text-blue-900">{template.title}</h4>
              <p className="text-xs text-blue-600 truncate">{template.description}</p>
            </div>
            <ArrowRight className="w-4 h-4 text-blue-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" />
          </div>
        </div>
      ))}
    </div>
  );
}