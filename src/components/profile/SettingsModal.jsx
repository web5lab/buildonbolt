import React, { useState } from 'react';
import { X, Moon, Sun, Bell, Shield, Key, Trash2, LogOut, Upload, Camera } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { updateUserProfile } from '../../lib/api';
import { useAuth } from '../../hooks/useAuth';



export function SettingsModal({ onClose }) {
  const { user } = useAuth();
  const [darkMode, setDarkMode] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [profileData, setProfileData] = useState({
    avatar: user?.avatar || '',
    website: user?.website || '',
    github: user?.github || '',
    twitter: user?.twitter || '',
    linkedin: user?.linkedin || ''
  });

  const onDrop = React.useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (!file) return;

    // Convert to base64
    const reader = new FileReader();
    reader.onload = async (e) => {
      const base64 = e.target?.result 
      setProfileData(prev => ({ ...prev, avatar: base64 }));
    };
    reader.readAsDataURL(file);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg']
    },
    maxFiles: 1,
    maxSize: 5 * 1024 * 1024 // 5MB
  });

  const handleSave = async () => {
    try {
      setLoading(true);
      setError(null);
      await updateUserProfile(profileData);
      onClose();
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-[100] backdrop-blur-sm">
      <div className="bg-white dark:bg-dark-200 rounded-2xl w-full max-w-md overflow-hidden">
        {error && (
          <div className="m-6 p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl">
            {error}
          </div>
        )}

        <div className="p-6 border-b border-gray-200 dark:border-dark-300">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h2>
            <button 
              type="button"
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-300 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Profile Picture */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Profile Picture</h3>
            <div {...getRootProps()} className="cursor-pointer">
              <input {...getInputProps()} />
              <div className="relative w-24 h-24 mx-auto">
                {profileData.avatar ? (
                  <img
                    src={profileData.avatar}
                    alt="Profile"
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
                    <Camera className="w-8 h-8 text-primary-500" />
                  </div>
                )}
                <div className="absolute -bottom-2 -right-2 bg-primary-500 text-white p-1.5 rounded-full shadow-lg">
                  <Upload className="w-4 h-4" />
                </div>
              </div>
              <p className="text-sm text-center text-gray-500 dark:text-gray-400 mt-2">
                Click or drag to upload
              </p>
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Social Links</h3>
            <div className="space-y-4">
              <input
                type="url"
                value={profileData.website}
                onChange={(e) => setProfileData(prev => ({ ...prev, website: e.target.value }))}
                placeholder="Website URL"
                className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-primary-500"
              />
              <input
                type="url"
                value={profileData.github}
                onChange={(e) => setProfileData(prev => ({ ...prev, github: e.target.value }))}
                placeholder="GitHub URL"
                className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-primary-500"
              />
              <input
                type="url"
                value={profileData.twitter}
                onChange={(e) => setProfileData(prev => ({ ...prev, twitter: e.target.value }))}
                placeholder="Twitter URL"
                className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-primary-500"
              />
              <input
                type="url"
                value={profileData.linkedin}
                onChange={(e) => setProfileData(prev => ({ ...prev, linkedin: e.target.value }))}
                placeholder="LinkedIn URL"
                className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>

          {/* Appearance */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Appearance</h3>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {darkMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                <span className="text-gray-700 dark:text-gray-300">Dark Mode</span>
              </div>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  darkMode ? 'bg-primary-500' : 'bg-gray-200 dark:bg-dark-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    darkMode ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Notifications */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Notifications</h3>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5" />
                <span className="text-gray-700 dark:text-gray-300">Email Notifications</span>
              </div>
              <button
                onClick={() => setEmailNotifications(!emailNotifications)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  emailNotifications ? 'bg-primary-500' : 'bg-gray-200 dark:bg-dark-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    emailNotifications ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Security */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Security</h3>
            <div className="space-y-4">
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-dark-300 transition-colors">
                <Shield className="w-5 h-5 text-gray-500" />
                <span className="text-gray-700 dark:text-gray-300">Two-Factor Authentication</span>
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-dark-300 transition-colors">
                <Key className="w-5 h-5 text-gray-500" />
                <span className="text-gray-700 dark:text-gray-300">Change Password</span>
              </button>
            </div>
          </div>

          {/* Danger Zone */}
          <div>
            <h3 className="text-lg font-semibold text-red-600 dark:text-red-400 mb-4">Danger Zone</h3>
            <div className="space-y-4">
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                <Trash2 className="w-5 h-5" />
                <span>Delete Account</span>
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                <LogOut className="w-5 h-5" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
        
        <div className="p-6 border-t border-gray-200 dark:border-gray-300">
          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-300 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={loading}
              className="px-4 py-2 bg-primary-500 hover:bg-primary-600 disabled:bg-primary-400 text-white rounded-xl transition-colors flex items-center gap-2"
            >
              {loading ? (
                <>
                  <span className="animate-spin">⌛</span>
                  Saving...
                </>
              ) : (
                'Save Changes'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}