import React from 'react';
import { User, Heart, MessageSquare, Package } from 'lucide-react';
import { Link } from 'react-router-dom';


export function UserProfile({ user }) {
  return (
    <div className="bg-white dark:bg-dark-200 rounded-2xl p-6 border border-primary-100 dark:border-dark-300 sticky top-4">
      <div className="flex items-center gap-4 mb-6">
        <div className="relative">
          {user.avatar ? (
            <img
              src={user.avatar}
              alt={user.name}
              className="w-20 h-20 rounded-full object-cover ring-2 ring-primary-500 ring-offset-2 dark:ring-offset-dark-200"
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center ring-2 ring-primary-500 ring-offset-2 dark:ring-offset-dark-200">
              <User className="w-8 h-8 text-primary-500" />
            </div>
          )}
          <div className="absolute -bottom-2 -right-2 bg-primary-500 text-white p-1.5 rounded-full shadow-lg">
            <Package className="w-4 h-4" />
          </div>
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">{user.name}</h2>
          {user.bio && (
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{user.bio}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <StatsCard icon={Package} label="Templates" value={user.templates} />
        <StatsCard icon={Heart} label="Favorites" value={user.favorites} />
        <StatsCard icon={MessageSquare} label="Comments" value={user.comments} />
      </div>

      <div className="flex gap-2">
        <Link
          to="/profile/templates"
          className="flex-1 bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors"
        >
          My Templates
        </Link>
        <Link
          to="/profile/favorites"
          className="flex-1 bg-primary-100 dark:bg-primary-900/30 hover:bg-primary-200 dark:hover:bg-primary-900/50 text-primary-600 dark:text-primary-400 px-4 py-2 rounded-xl text-sm font-medium transition-colors"
        >
          Favorites
        </Link>
      </div>
    </div>
  );
}

function StatsCard({ icon: Icon, label, value }) {
  return (
    <div className="bg-primary-50 dark:bg-primary-900/20 rounded-xl p-4 text-center">
      <Icon className="w-5 h-5 text-primary-500 mx-auto mb-2" />
      <div className="text-lg font-bold text-primary-600 dark:text-primary-400">{value}</div>
      <div className="text-xs text-primary-500 dark:text-primary-500">{label}</div>
    </div>
  );
}