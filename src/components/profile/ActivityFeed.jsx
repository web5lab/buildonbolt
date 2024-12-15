import React from 'react';

export function ActivityFeed() {
  const activities = [
    {
      id: '1',
      type: 'comment',
      template: 'Next.js Enterprise Starter',
      date: '2 hours ago',
      content: 'Left a comment on'
    },
    {
      id: '2',
      type: 'favorite',
      template: 'AI-Powered Dashboard',
      date: '1 day ago',
      content: 'Added to favorites'
    },
    {
      id: '3',
      type: 'template',
      template: 'E-commerce Platform',
      date: '3 days ago',
      content: 'Created new template'
    }
  ];

  return (
    <div className="space-y-4">
      {activities.map(activity => (
        <div
          key={activity.id}
          className="bg-white dark:bg-dark-200 p-4 rounded-xl border border-primary-100 dark:border-dark-300"
        >
          <div className="flex items-center justify-between">
            <div>
              <span className="text-gray-600 dark:text-gray-300">
                {activity.content}{' '}
              </span>
              <span className="font-medium text-gray-900 dark:text-white">
                {activity.template}
              </span>
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {activity.date}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}