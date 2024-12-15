import React from 'react';



export function Tabs({ tabs, activeTab, onChange }) {
  return (
    <div className="border-b border-primary-100/50 dark:border-dark-300/50">
      <div className="flex gap-8">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`
              pb-4 text-sm font-medium transition-all relative px-2
              ${
                activeTab === tab.id
                  ? 'text-primary-600 dark:text-primary-400 scale-105'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
              }
            `}
          >
            {tab.label}
            {activeTab === tab.id && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}