import React from 'react';
import { Bell, Moon, Sun, Search } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { useAuth } from '../../hooks/useAuth';

export function TopBar() {
  const { theme, toggleTheme } = useTheme();
  const { user } = useAuth();

  return (
    <header className="bg-white dark:bg-dark-200 border-b border-gray-200 dark:border-dark-300">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4 flex-1">
          <div className="relative max-w-md w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-dark-300 bg-gray-50 dark:bg-dark-300 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:text-white"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-300 rounded-lg relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
          </button>

          <button
            onClick={toggleTheme}
            className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-300 rounded-lg"
          >
            {theme === 'dark' ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button>

          <div className="flex items-center gap-3 pl-4 border-l border-gray-200 dark:border-dark-300">
            <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
              <span className="text-sm font-medium text-primary-600 dark:text-primary-400">
                {user?.name?.[0] || 'A'}
              </span>
            </div>
            <div className="text-sm">
              <p className="font-medium text-gray-900 dark:text-white">
                {user?.name || 'Admin User'}
              </p>
              <p className="text-gray-500 dark:text-gray-400">
                {user?.email || 'admin@example.com'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}