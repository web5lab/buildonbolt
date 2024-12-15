import React from 'react';
import { Package, Heart, MessageSquare } from 'lucide-react';



export function ProfileStats({ stats }) {
  return (
    <div className="flex flex-wrap items-center gap-6 justify-center md:justify-start">
      <StatBadge icon={Package} label="Templates" value={stats.templates} />
      <StatBadge icon={Heart} label="Favorites" value={stats.favorites} />
      <StatBadge icon={MessageSquare} label="Comments" value={stats.comments} />
    </div>
  );
}


function StatBadge({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-2 bg-primary-50 dark:bg-primary-900/20 px-4 py-2 rounded-xl">
      <Icon className="w-4 h-4 text-primary-500 dark:text-primary-400" />
      <span className="font-medium text-primary-600 dark:text-primary-400">{value}</span>
      <span className="text-primary-500 dark:text-primary-500">{label}</span>
    </div>
  );
}