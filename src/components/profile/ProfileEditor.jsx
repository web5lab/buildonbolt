import React from 'react';
import { Link2, Github, Twitter, Linkedin } from 'lucide-react';
import { SocialInput } from './SocialInput';



export function ProfileEditor({
  profileData,
  setProfileData,
  onSave,
  onCancel,
  loading = false
}) {
  return (
    <div className="space-y-4 mb-6">
      <textarea
        value={profileData.bio}
        onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
        className="w-full px-4 py-2 rounded-xl border border-primary-100 dark:border-dark-300 bg-white dark:bg-dark-300 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:text-white resize-none"
        rows={3}
        placeholder="Tell us about yourself..."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SocialInput
          icon={Link2}
          placeholder="Website URL"
          value={profileData.website}
          onChange={(value) => setProfileData(prev => ({ ...prev, website: value }))}
        />
        <SocialInput
          icon={Github}
          placeholder="GitHub URL"
          value={profileData.github}
          onChange={(value) => setProfileData(prev => ({ ...prev, github: value }))}
        />
        <SocialInput
          icon={Twitter}
          placeholder="Twitter URL"
          value={profileData.twitter}
          onChange={(value) => setProfileData(prev => ({ ...prev, twitter: value }))}
        />
        <SocialInput
          icon={Linkedin}
          placeholder="LinkedIn URL"
          value={profileData.linkedin}
          onChange={(value) => setProfileData(prev => ({ ...prev, linkedin: value }))}
        />
      </div>
      <div className="flex justify-end gap-2">
        <button
          onClick={onCancel}
          className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-300 rounded-xl transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={onSave}
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
  );
}