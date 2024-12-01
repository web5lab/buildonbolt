import React from 'react';

interface TechStackProps {
  technologies: string[];
}

export function TechStack({ technologies }: TechStackProps) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {technologies.map((tech, index) => (
        <span
          key={index}
          className="text-xs px-2 py-1 rounded-md bg-primary-50 text-primary-600 border border-primary-100"
        >
          {tech}
        </span>
      ))}
    </div>
  );
}