import React, { useState, useEffect } from 'react';
import { Trash2, MoreVertical, Search, UserX } from 'lucide-react';
import { getUsers, deleteUser } from '../lib/api';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  createdAt: string;
}

export function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getUsers();
      setUsers(data);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (!window.confirm('Are you sure you want to delete this user?')) {
      return;
    }

    try {
      await deleteUser(userId);
      setUsers(users.filter(user => user.id !== userId));
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to delete user');
    }
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4 rounded-xl">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Users</h1>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search users..."
            className="pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-dark-300 bg-white dark:bg-dark-300 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:text-white"
          />
        </div>
      </div>

      {filteredUsers.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-dark-200 rounded-xl border border-gray-200 dark:border-dark-300">
          <UserX className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No users found</h3>
          <p className="text-gray-500 dark:text-gray-400">
            {searchQuery ? 'Try a different search term' : 'No users have registered yet'}
          </p>
        </div>
      ) : (
        <div className="bg-white dark:bg-dark-200 rounded-xl border border-gray-200 dark:border-dark-300 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-dark-300">
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-500 dark:text-gray-400">User</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-500 dark:text-gray-400">Email</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-500 dark:text-gray-400">Joined</th>
                <th className="text-right px-6 py-4 text-sm font-medium text-gray-500 dark:text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr
                  key={user.id}
                  className="border-b border-gray-200 dark:border-dark-300 last:border-0"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {user.avatar ? (
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
                          <span className="text-sm font-medium text-primary-600 dark:text-primary-400">
                            {user.name[0]}
                          </span>
                        </div>
                      )}
                      <span className="font-medium text-gray-900 dark:text-white">{user.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-500 dark:text-gray-400">{user.email}</td>
                  <td className="px-6 py-4 text-gray-500 dark:text-gray-400">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <div className="relative">
                        <button
                          onClick={() => setSelectedUser(selectedUser === user.id ? null : user.id)}
                          className="p-2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-300 rounded-lg transition-colors"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </button>
                        {selectedUser === user.id && (
                          <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-dark-200 rounded-lg shadow-lg border border-gray-200 dark:border-dark-300 py-1 z-10">
                            <button
                              onClick={() => {
                                // TODO: Implement view profile
                                setSelectedUser(null);
                              }}
                              className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-300"
                            >
                              View Profile
                            </button>
                            <button
                              onClick={() => {
                                handleDeleteUser(user.id);
                                setSelectedUser(null);
                              }}
                              className="w-full px-4 py-2 text-left text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                            >
                              Delete User
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}