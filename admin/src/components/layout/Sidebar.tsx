import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  FileCode, 
  MessageSquare, 
  Flag,
  Settings,
  LogOut
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

const menuItems = [
  { path: '/', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/users', label: 'Users', icon: Users },
  { path: '/templates', label: 'Templates', icon: FileCode },
  { path: '/comments', label: 'Comments', icon: MessageSquare },
  { path: '/reports', label: 'Reports', icon: Flag },
  { path: '/settings', label: 'Settings', icon: Settings },
];

export function Sidebar() {
  const location = useLocation();
  const { logout } = useAuth();

  return (
    <aside className="w-64 bg-white dark:bg-dark-200 min-h-screen border-r border-gray-200 dark:border-dark-300">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-primary-600 dark:text-primary-400">
          Admin Panel
        </h1>
      </div>

      <nav className="mt-6">
        {menuItems.map(({ path, label, icon: Icon }) => (
          <Link
            key={path}
            to={path}
            className={`flex items-center gap-3 px-6 py-3 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-300 transition-colors ${
              location.pathname === path
                ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 border-r-4 border-primary-500'
                : ''
            }`}
          >
            <Icon className="w-5 h-5" />
            <span>{label}</span>
          </Link>
        ))}

        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-6 py-3 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors mt-auto"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </nav>
    </aside>
  );
}