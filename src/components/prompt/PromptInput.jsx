import React, { useState } from 'react';
import { Sparkles, ArrowRight, Loader2 } from 'lucide-react';



export function PromptInput({ onSubmit }) {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    try {
      setIsLoading(true);
      await onSubmit(prompt);
      setPrompt('');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl blur-xl opacity-20 animate-pulse-slow" />
        <div className="relative glass-effect dark:bg-dark-200/80 rounded-2xl border border-primary-200/50 dark:border-dark-300 shadow-lg overflow-hidden">
          <div className="flex items-center gap-3 p-4">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 rounded-xl bg-primary-500 flex items-center justify-center animate-float">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
            </div>
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe what you want to build..."
              className="flex-1 bg-transparent border-none focus:outline-none focus:ring-0 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 text-lg"
            />
            <button
              type="submit"
              disabled={isLoading || !prompt.trim()}
              className="flex-shrink-0 bg-primary-500 hover:bg-primary-600 disabled:bg-primary-400 text-white px-6 py-3 rounded-xl font-medium flex items-center gap-2 transition-all duration-300 hover:scale-105"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  Generate
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </div>
          <div className="px-4 pb-4">
            <div className="flex flex-wrap gap-2 text-sm">
              <span className="text-gray-500 dark:text-gray-400">Try:</span>
              <button
                type="button"
                onClick={() => setPrompt("Create a modern e-commerce site with Next.js and Stripe")}
                className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300"
              >
                "Create a modern e-commerce site"
              </button>
              <button
                type="button"
                onClick={() => setPrompt("Build a real-time chat application with WebSocket")}
                className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300"
              >
                "Build a real-time chat app"
              </button>
              <button
                type="button"
                onClick={() => setPrompt("Design a portfolio website with animations")}
                className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300"
              >
                "Design a portfolio website"
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}