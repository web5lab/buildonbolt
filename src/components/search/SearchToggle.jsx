import React from 'react';
import { Search, Wand2 } from 'lucide-react';



export function SearchToggle({ mode, onModeChange }) {
  return (
    <div className="flex p-3 gap-2 border-b border-primary-100/50 dark:border-dark-300">
      <ToggleButton
        active={mode === 'search'}
        onClick={() => onModeChange('search')}
        icon={Search}
        label="Search Templates"
      />
      <ToggleButton
        active={mode === 'prompt'}
        onClick={() => onModeChange('prompt')}
        icon={Wand2}
        label="AI Prompt"
      />
    </div>
  );
}


function ToggleButton({ active, onClick, icon: Icon, label }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-xl flex-1 transition-all ${
        active
          ? 'bg-gradient-to-r from-primary-500 via-primary-600 to-primary-500 bg-[length:200%_100%] animate-gradient text-white shadow-lg'
          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-dark-300'
      }`}
    >
      <Icon className={`w-4 h-4 ${active ? 'animate-pulse' : ''}`} />
      <span>{label}</span>
    </button>
  );
}