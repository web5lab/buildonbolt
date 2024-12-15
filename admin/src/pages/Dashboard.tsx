import React from 'react';
import { Users, FileCode, MessageSquare, Flag } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', users: 400, templates: 240, comments: 140 },
  { name: 'Feb', users: 300, templates: 139, comments: 221 },
  { name: 'Mar', users: 200, templates: 980, comments: 229 },
  { name: 'Apr', users: 278, templates: 390, comments: 200 },
  { name: 'May', users: 189, templates: 480, comments: 218 },
  { name: 'Jun', users: 239, templates: 380, comments: 250 },
];

const stats = [
  { label: 'Total Users', value: '1,234', icon: Users, color: 'blue' },
  { label: 'Templates', value: '56', icon: FileCode, color: 'green' },
  { label: 'Comments', value: '2,845', icon: MessageSquare, color: 'purple' },
  { label: 'Reports', value: '12', icon: Flag, color: 'red' },
];

export function Dashboard() {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <div
            key={label}
            className="bg-white dark:bg-dark-200 p-6 rounded-xl border border-gray-200 dark:border-dark-300"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  {value}
                </p>
              </div>
              <div className={`p-3 bg-${color}-100 dark:bg-${color}-900/20 rounded-lg`}>
                <Icon className={`w-6 h-6 text-${color}-500`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-dark-200 p-6 rounded-xl border border-gray-200 dark:border-dark-300">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
          Activity Overview
        </h2>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="users" stroke="#3B82F6" />
              <Line type="monotone" dataKey="templates" stroke="#10B981" />
              <Line type="monotone" dataKey="comments" stroke="#8B5CF6" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}