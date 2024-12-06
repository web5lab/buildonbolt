import React from 'react';
import { Github, Twitter, Code2Icon } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-white dark:bg-dark-200 border-t border-primary-100 dark:border-dark-300">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Code2Icon className="w-5 h-5 text-primary-500 " />
              <span className="text-sm text-primary-600 dark:text-primary-400">
                Built with{' '}
                <span className="text-red-500 animate-pulse">❤</span>
                {' '}using{' '}
                <a 
                  href="https://bolt.new"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium bg-gradient-to-r from-primary-500 to-primary-600 bg-clip-text text-transparent hover:from-primary-600 hover:to-primary-700 transition-all"
                >
                  Bolt
                </a>
              </span>
            </div>
            <div className="flex items-center gap-4">
              <a 
                href="#" 
                className="text-primary-400 hover:text-primary-600 dark:text-primary-500 dark:hover:text-primary-400 transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="text-primary-400 hover:text-primary-600 dark:text-primary-500 dark:hover:text-primary-400 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div className="flex items-center gap-6 text-sm text-primary-600 dark:text-primary-400">
            <span className="text-sm">© {new Date().getFullYear()} BuildOnBolt</span>
            <a href="#" className="hover:text-primary-800 dark:hover:text-primary-300 transition-colors">Privacy</a>
            <a href="#" className="hover:text-primary-800 dark:hover:text-primary-300 transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}