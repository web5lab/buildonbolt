import React from 'react';
import { HelpCircle, X } from 'lucide-react';



export function SubmitHeader({ showHelp, onToggleHelp, onClose }) {
  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 via-primary-400/20 to-primary-600/20 animate-gradient bg-[length:200%_100%]" />
      <div className="relative px-6 py-4 flex items-center justify-between border-b border-primary-100/50 dark:border-dark-300">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-bold text-gradient">Submit Template</h2>
          <button
            onClick={onToggleHelp}
            className={`p-2 rounded-xl transition-all ${
              showHelp 
                ? 'bg-primary-500 text-white'
                : 'text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20'
            }`}
            title={showHelp ? 'Hide help' : 'Show help'}
          >
            <HelpCircle className="w-5 h-5" />
          </button>
        </div>
        <button 
          onClick={onClose}
          className="p-2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-300 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}