import React from 'react';
import { categories } from './data';
import { motion } from '@motionone/solid';
import { Code, Layers, Briefcase, Cpu, Palette, Rocket } from 'lucide-react';
import { useLocation } from 'react-router-dom';

export function CategoryTab() {
  const [activeCategory, setActiveCategory] = React.useState('all');
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  if (!isHomePage) {
    return null
  }
  return (
    <div className="bg-white dark:bg-dark-200 sticky top-0 z-10 border-b border-blue-100 dark:border-dark-300 shadow-sm">
      <div className="relative max-w-7xl mx-auto px-4">
        <div className="flex md:flex-wrap items-center gap-6 py-4 overflow-x-auto scrollbar-hide">
          <CategoryButton
            id="all"
            label="All Templates"
            icon={Rocket}
            count={42}
            isActive={activeCategory === 'all'}
            onClick={() => setActiveCategory('all')}
          />
          {categories.map((category) => (
            <CategoryButton
              key={category.id}
              {...category}
              isActive={activeCategory === category.id}
              onClick={() => setActiveCategory(category.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}


export function CategoryButton({ label, icon: Icon, count, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`
        relative group flex items-center gap-2 px-4 py-2 rounded-xl transition-all
        ${isActive 
          ? 'bg-gradient-to-r from-primary-500 via-primary-600 to-primary-500 text-white shadow-lg animate-gradient bg-[length:200%_100%]'
          : 'text-gray-600 dark:text-gray-400 hover:bg-primary-50 dark:hover:bg-primary-900/20'
        }
      `}
    >
      <Icon className={`w-4 h-4 ${isActive ? 'animate-pulse' : 'group-hover:text-primary-500'}`} />
      <span className="whitespace-nowrap">{label}</span>
      <span className={`
        inline-flex items-center px-2 py-0.5 rounded-full text-xs
        ${isActive 
          ? 'bg-white/20 text-white'
          : 'bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400'
        }
      `}>
        {count}
      </span>
      {isActive && (
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-12 h-0.5 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full" />
      )}
    </button>
  );
}