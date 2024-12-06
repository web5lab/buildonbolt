import { useState } from 'react';
import { Search, Plus, Moon, Sun, Code2Icon } from 'lucide-react';
import { SubmitTemplate } from '../templates/SubmitTemplate';
import { useTheme } from '../../hooks/useTheme';

export function Header() {
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="relative">
      <div className="absolute inset-0 bg-gradient-to-b from-primary-500/5 to-transparent dark:from-primary-900/10" />
      <nav className="relative border-b border-primary-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-primary-500 dark:bg-primary-600 p-2 rounded-xl ">
                <Code2Icon className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-gradient dark:text-white">
                BuildOnBolt
              </span>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg text-primary-500 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-gray-800 transition-colors"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </button>
              <button
                onClick={() => setShowSubmitModal(true)}
                className="bg-primary-500 text-white hover:bg-primary-600 px-4 py-2 rounded-xl transition-all duration-300 flex items-center gap-2 shadow-lg shadow-primary-500/20 hover:shadow-primary-500/30"
              >
                <Plus className="w-4 h-4" />
                Submit Template
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-20 text-center relative">
        <h1 className="text-5xl font-bold mb-6 text-gradient dark:text-white">
          Build Something Amazing
        </h1>
        <p className="text-xl text-primary-900/80 dark:text-primary-100/80 mb-12 max-w-2xl mx-auto">
          Build your next Bolt.new project in no time with pre-configured starter templates.
        </p>
        <div className="relative max-w-2xl mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl blur-xl opacity-20 animate-pulse-slow" />
          <div className="relative glass-effect dark:bg-gray-800/80 rounded-2xl border border-primary-200/50 dark:border-gray-700 shadow-lg">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary-500 dark:text-primary-400" />
            <input
              type="text"
              placeholder="Search templates..."
              className="w-full pl-12 pr-4 py-4 bg-transparent focus:outline-none focus:ring-2 focus:ring-primary-500/50 rounded-2xl placeholder-primary-400 dark:placeholder-primary-500 text-primary-900 dark:text-primary-100"
            />
          </div>
        </div>
      </div>

      {showSubmitModal && <SubmitTemplate onClose={() => setShowSubmitModal(false)} />}
    </header>
  );
}