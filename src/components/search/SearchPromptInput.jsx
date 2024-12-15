import React, { useState } from 'react';
import { Search, Wand2, Loader2, Command } from 'lucide-react';



const searchExamples = [
  "Next.js authentication",
  "React admin dashboard",
  "E-commerce templates",
  "Portfolio website"
];

const promptExamples = [
  "Build a modern blog with dark mode",
  "Create a SaaS dashboard with analytics",
  "Design a portfolio with animations"
];

export function SearchPromptInput({ onSearch, onPrompt }) {
  const [input, setInput] = useState('');
  const [mode, setMode] = useState('search');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    setIsLoading(true);
    try {
      if (mode === 'search') {
        onSearch(input.trim());
      } else {
        await onPrompt(input.trim());
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 via-primary-400/20 to-primary-600/20 rounded-2xl blur-xl animate-gradient bg-[length:200%_100%]" />
        <div className="relative bg-white/80 dark:bg-dark-200/80 backdrop-blur-lg rounded-2xl shadow-lg border border-primary-100 dark:border-dark-300">
        {/* Toggle Buttons */}
        <div className="flex p-3 gap-2 border-b border-primary-100/50 dark:border-dark-300">
          <button
            type="button"
            onClick={() => setMode('search')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl flex-1 transition-all ${
              mode === 'search'
                ? 'bg-gradient-to-r from-primary-500 via-primary-600 to-primary-500 bg-[length:200%_100%] animate-gradient text-white shadow-lg'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-dark-300'
            }`}
          >
            <Search className={`w-4 h-4 ${mode === 'search' ? 'animate-pulse' : ''}`} />
            <span>Search Templates</span>
          </button>
          <button
            type="button"
            onClick={() => setMode('prompt')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl flex-1 transition-all ${
              mode === 'prompt'
                ? 'bg-gradient-to-r from-primary-500 via-primary-600 to-primary-500 bg-[length:200%_100%] animate-gradient text-white shadow-lg'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-dark-300'
            }`}
          >
            <Wand2 className={`w-4 h-4 ${mode === 'prompt' ? 'animate-pulse' : ''}`} />
            <span>AI Prompt</span>
          </button>
        </div>

        {/* Search Input */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={mode === 'search' ? 'Search templates...' : 'Describe what you want to build...'}
              className="w-full pl-12 pr-24 py-4 bg-white dark:bg-dark-300 rounded-xl border border-primary-100 dark:border-dark-300 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:text-white text-lg shadow-sm transition-all duration-300 placeholder:text-gray-400"
            />
            {mode === 'search' ? (
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-primary-500 animate-pulse" />
            ) : (
              <Wand2 className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-primary-500 animate-pulse" />
            )}
            <kbd className="absolute right-4 top-1/2 -translate-y-1/2 hidden sm:flex items-center gap-1 px-3 py-1.5 text-xs text-primary-500 bg-primary-50 dark:bg-primary-900/20 rounded-lg border border-primary-100 dark:border-primary-800">
              <Command className="w-3 h-3" />
              {mode === 'search' ? '/' : 'P'}
            </kbd>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {(mode === 'search' ? searchExamples : promptExamples).map((example, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setInput(example)}
                className="text-sm px-4 py-2 rounded-xl bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-all duration-300 border border-primary-100/50 dark:border-primary-800/50"
              >
                {example}
              </button>
            ))}
          </div>

          <div className="mt-6 flex justify-end">
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="bg-gradient-to-r from-primary-500 via-primary-600 to-primary-500 bg-[length:200%_100%] hover:from-primary-600 hover:via-primary-700 hover:to-primary-600 disabled:from-primary-400 disabled:via-primary-500 disabled:to-primary-400 text-white px-8 py-3 rounded-xl font-medium flex items-center gap-3 transition-all duration-300 hover:shadow-lg disabled:hover:shadow-none animate-gradient"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>{mode === 'search' ? 'Searching...' : 'Generating...'}</span>
                </>
              ) : (
                <>
                  {mode === 'search' ? (
                    <>
                      <Search className="w-4 h-4" />
                      <span>Search</span>
                    </>
                  ) : (
                    <>
                      <Wand2 className="w-4 h-4" />
                      <span>Generate</span>
                    </>
                  )}
                </>
              )}
            </button>
          </div>
        </form>
        </div>
      </div>
    </div>
  );
}