import React from 'react';
import { User, Package, Plus, Edit2, Camera } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { SocialLinks } from './SocialLinks';
import { ProfileStats } from './ProfileStats';
import { ProfileEditor } from './ProfileEditor';


export function ProfileHeader({
  user,
  stats,
  isEditing,
  profileData,
  onEdit,
  onSave,
  onCancel,
  onSubmitTemplate,
  setProfileData,
  onUpdateAvatar
}) {
  const onDrop = React.useCallback(
    async (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (!file) return;
      try {
        await onUpdateAvatar(file);
      } catch (error) {
        console.error('Failed to update avatar:', error);
      }
    },
    [onUpdateAvatar]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg']
    },
    maxFiles: 1,
    maxSize: 5 * 1024 * 1024, // 5MB
    multiple: false
  });

  return (
    <div className="bg-white dark:bg-dark-200 rounded-2xl p-8 mb-8 border border-primary-100 dark:border-dark-300">
      {isEditing && (
        <div className="absolute top-4 right-4 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 px-4 py-2 rounded-lg text-sm flex items-center gap-2">
          <Edit2 className="w-4 h-4" />
          Editing Profile
        </div>
      )}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
        <div {...getRootProps()} className="relative group cursor-pointer">
          <input {...getInputProps()} />
          {user?.avatar ? (
            <img
              src={user.avatar}
              alt={user.name}
              className="w-32 h-32 rounded-2xl object-cover ring-4 ring-primary-500/20 group-hover:ring-primary-500/40 transition-all duration-300"
            />
          ) : (
            <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center ring-4 ring-primary-500/20 group-hover:ring-primary-500/40 transition-all duration-300">
              <User className="w-12 h-12 text-white" />
            </div>
          )}
          <div className="absolute -bottom-2 -right-2 bg-primary-500 text-white p-2 rounded-xl shadow-lg transform group-hover:scale-110 transition-transform">
            <Camera className="w-4 h-4" />
          </div>
          <div className="absolute -bottom-3 -right-3 bg-primary-500 text-white p-2 rounded-xl shadow-lg transform group-hover:scale-110 transition-transform">
            <Package className="w-5 h-5" />
          </div>
        </div>

        <div className="flex-1 text-center md:text-left">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {user?.name || user?.email || 'Anonymous User'}
            {!isEditing && (
              <button
                onClick={onEdit}
                className="ml-3 p-1.5 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-300 transition-colors"
              >
                <Edit2 className="w-4 h-4" />
              </button>
            )}
          </h1>

          {isEditing ? (
            <ProfileEditor
              profileData={profileData}
              setProfileData={setProfileData}
              onSave={onSave}
              onCancel={onCancel}
            />
          ) : (
            <>
              <p className="text-gray-600 dark:text-gray-300 mb-4 max-w-2xl">
                {profileData.bio}
              </p>
              <SocialLinks profileData={profileData} />
            </>
          )}
          
          <ProfileStats stats={stats} />
        </div>

        <div className="flex flex-col gap-3">
          <button
            onClick={onSubmitTemplate}
            className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-2.5 rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" />
            New Template
          </button>
        </div>
      </div>
    </div>
  );
}