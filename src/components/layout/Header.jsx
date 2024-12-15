import React, { useState } from 'react';
import { Sparkles, Search, Plus, Moon, Sun, LogIn, User, LogOut } from 'lucide-react';
import { SubmitTemplate } from '../templates/SubmitTemplate';
import { LoginModal } from '../auth/LoginModal';
import { useTheme } from '../../hooks/useTheme';
import { useAuth } from '../../hooks/useAuth';
import { Link, useNavigate, useNavigation } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { SearchPromptInput } from '../search/SearchPromptInput';

export function Header() {
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigation = useNavigate()
  const isHomePage = location.pathname === '/';

  return (
    <header className="relative">
      <div className="absolute inset-0 bg-gradient-to-b from-primary-500/5 to-transparent dark:from-primary-900/10" />
      <nav className={`relative border-b border-primary-100 dark:border-gray-800 ${!isHomePage && 'shadow-sm'}`}>
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-primary-500 dark:bg-primary-600 p-2 rounded-xl rotate-3 ">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-gradient dark:text-white" onClick={() => {
                navigation('/')
              }}>
                BuildOnBolt
              </span>
            </div>
            <div className="flex items-center gap-4">
              {user ? (
                <div className="flex items-center gap-4">
                  <Link
                    to="/profile"
                    className="flex items-center gap-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300"
                  >
                    {user.avatar ? (
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-8 h-8 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-primary-500" />
                      </div>
                    )}
                    <span className="text-sm font-medium">{user.name || user.email}</span>
                  </Link>
                  <button
                    onClick={logout}
                    className="p-2 rounded-lg text-primary-500 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-gray-800 transition-colors"
                    aria-label="Logout"
                  >
                    <LogOut className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowLoginModal(true)}
                  className="flex items-center gap-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300"
                >
                  <LogIn className="w-5 h-5" />
                  <span>Sign In</span>
                </button>
              )}
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
            </div>
          </div>
        </div>
      </nav>

      {isHomePage && <div className="max-w-7xl mx-auto px-4 py-20 text-center relative">
        <h1 className="text-5xl font-bold mb-6 text-gradient dark:text-white">
          Build Something Amazing
        </h1>
        <p className="text-xl text-primary-900/80 dark:text-primary-100/80 mb-12 max-w-2xl mx-auto">
          Build your next Bolt.new project in no time with pre-configured starter templates.
        </p>
        <SearchPromptInput
          onSearch={(query) => {
            // TODO: Implement search
            console.log('Search query:', query);
          }}
          onPrompt={async (prompt) => {
            // TODO: Implement prompt handling
            console.log('Prompt submitted:', prompt);
            const url = `https://bolt.new/?prompt=${prompt}`; // Replace with your desired URL
            window.open(url, '_blank');
          }}
        />
      </div>}
      {/* {isHomePage &&  <CategoryNav/>} */}
      {showSubmitModal && <SubmitTemplate onClose={() => setShowSubmitModal(false)} />}
      {showLoginModal && <LoginModal onClose={() => setShowLoginModal(false)} />}
    </header>
  );
}