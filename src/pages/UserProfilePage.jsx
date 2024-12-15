import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { UserProfile } from '../components/user/UserProfile';
import { TemplateCard } from '../components/templates/TemplateCard';
import { Tabs } from '../components/shared/Tabs';
import { Shield, Clock, CheckCircle, XCircle, User, Package, Plus, Settings, Activity, Heart, MessageSquare, Github, Twitter, Linkedin, Link2, Edit2 } from 'lucide-react';
import { SubmitTemplate } from '../components/templates/SubmitTemplate';
import { ProfileHeader } from '../components/profile/ProfileHeader';
import { ActivityFeed } from '../components/profile/ActivityFeed';
import { updateUserProfile } from '../lib/api';



function EmptyState({ title, description, action }) {
  return (
    <div className="text-center py-12">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        {description}
      </p>
      <button
        onClick={action.onClick}
        className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-2 rounded-xl text-sm font-medium transition-colors"
      >
        {action.label}
      </button>
    </div>
  );
}

export function UserProfilePage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('templates');
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [userStats] = useState({
    name: user?.name || user?.email || 'Anonymous User',
    avatar: user?.avatar,
    templates: 3,
    favorites: 12,
    comments: 45
  });
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [avatarLoading, setAvatarLoading] = useState(false);
  const [profileData, setProfileData] = useState({
    bio: 'Passionate developer building amazing templates',
    website: 'https://example.com',
    github: 'https://github.com',
    twitter: 'https://twitter.com',
    linkedin: 'https://linkedin.com'
  });

  const handleSaveProfile = async () => {
    try {
      setError(null);
      setSuccessMessage(null);
      setLoading(true);
      await updateUserProfile(profileData);
      setIsEditing(false);
      setSuccessMessage('Profile updated successfully!');
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateAvatar = async (file) => {
    try {
      setAvatarLoading(true);
      setError(null);

      const formData = new FormData();
      formData.append('avatar', file);
      formData.append('userId', user?.id);

      const response = await fetch(`${import.meta.env.VITE_API_URL}/users/avatar`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: formData
      });

      if (!response.ok) {
        throw new Error('Failed to update profile picture');
      }

      const data = await response.json();
      const updatedUser = { ...user, avatar: data.avatarUrl };
      localStorage.setItem('user', JSON.stringify(updatedUser));

      setSuccessMessage('Profile picture updated successfully!');
      setTimeout(() => setSuccessMessage(null), 3000);

      // Force a re-render by updating the state
      setUserStats(prev => ({ ...prev }));
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to update profile picture');
    } finally {
      setAvatarLoading(false);
    }
  };

  // Mock templates with status
  const userTemplates = [
    {
      id: '1',
      title: 'Next.js Enterprise Starter',
      description: 'Production-ready template with authentication, database, and deployment configurations',
      image: 'https://images.unsplash.com/photo-1618477388954-7852f32655ec?auto=format&fit=crop&w=800&q=80',
      category: 'Full Stack',
      author: user?.name || user?.email || 'Anonymous User',
      techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Prisma', 'NextAuth.js'],
      status: 'approved',
      createdAt: '2024-03-10T10:00:00Z',
      stars: 128,
      previewUrl: 'https://nextjs-enterprise-starter.vercel.app'
    },
    {
      id: '2',
      title: 'AI Dashboard Template',
      description: 'Modern analytics dashboard with AI-powered insights',
      image: 'https://images.unsplash.com/photo-1535868463750-c78d9543614f?auto=format&fit=crop&w=800&q=80',
      category: 'AI Templates',
      author: user?.name || user?.email || 'Anonymous User',
      techStack: ['React', 'TensorFlow.js', 'Chart.js'],
      status: 'pending',
      createdAt: '2024-03-11T10:00:00Z',
      stars: 45,
      previewUrl: 'https://ai-dashboard.demo.com'
    },
    {
      id: '3',
      title: 'E-commerce Starter',
      description: 'Complete e-commerce solution with cart and payments',
      image: 'https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&w=800&q=80',
      category: 'Enterprise',
      author: user?.name || user?.email || 'Anonymous User',
      techStack: ['Next.js', 'Stripe', 'Tailwind CSS'],
      status: 'rejected',
      createdAt: '2024-03-12T10:00:00Z',
      stars: 0,
      previewUrl: 'https://ecommerce-starter.demo.com'
    }
  ];

  const tabs = [
    { id: 'templates', label: 'My Templates' },
    { id: 'favorites', label: 'Favorites' },
    { id: 'activity', label: 'Recent Activity' }
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-primary-50 to-white dark:from-dark-100 dark:to-dark-200">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {error && (
          <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl">
            {error}
          </div>
        )}
        {successMessage && (
          <div className="mb-4 p-4 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-xl">
            {successMessage}
          </div>
        )}
        <ProfileHeader
          user={user}
          stats={userStats}
          isEditing={isEditing}
          profileData={profileData}
          onEdit={() => setIsEditing(true)}
          onSave={handleSaveProfile}
          onCancel={() => {
            setIsEditing(false);
            setProfileData({
              bio: 'Passionate developer building amazing templates',
              website: 'https://example.com',
              github: 'https://github.com',
              twitter: 'https://twitter.com',
              linkedin: 'https://linkedin.com'
            });
          }}
          onSubmitTemplate={() => setShowSubmitModal(true)}
          setProfileData={setProfileData}
          onUpdateAvatar={handleUpdateAvatar}
        />
      </div>

      {/* Content */}
     

        {/* Main Content */}
        <div className="lg:col-span-3 max-w-7xl mx-auto order-2 lg:order-2">
          <div className="bg-white dark:bg-dark-200 rounded-2xl p-6 border border-primary-100 dark:border-dark-300">
            <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

            <div className="mt-6">
              {activeTab === 'templates' && (
                <div className="space-y-8">
                  {userTemplates.length > 0 ? (
                    <div className="grid grid-cols-3 gap-6">
                      {userTemplates.map(template => (
                        <div key={template.id} className="relative group">
                          <div className="absolute -top-3 -right-3 z-10">
                            {template.status === 'approved' && (
                              <div className="bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 px-4 py-1.5 rounded-xl text-sm font-medium flex items-center gap-2 shadow-lg">
                                <CheckCircle className="w-4 h-4" />
                                Approved
                              </div>
                            )}
                            {template.status === 'pending' && (
                              <div className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 px-4 py-1.5 rounded-xl text-sm font-medium flex items-center gap-2 shadow-lg">
                                <Clock className="w-4 h-4" />
                                Pending Review
                              </div>
                            )}
                            {template.status === 'rejected' && (
                              <div className="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 px-4 py-1.5 rounded-xl text-sm font-medium flex items-center gap-2 shadow-lg">
                                <XCircle className="w-4 h-4" />
                                Rejected
                              </div>
                            )}
                            {template.status === 'draft' && (
                              <div className="bg-gray-100 dark:bg-gray-900/30 text-gray-600 dark:text-gray-400 px-4 py-1.5 rounded-xl text-sm font-medium flex items-center gap-2 shadow-lg">
                                <Shield className="w-4 h-4" />
                                Draft
                              </div>
                            )}
                          </div>
                          <div className="transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                            <TemplateCard {...template} />
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <EmptyState
                      title="No templates yet"
                      description="Start creating your first template"
                      action={{
                        label: 'Create Template',
                        onClick: () => {} // Handle template creation
                      }}
                    />
                  )}
                </div>
              )}

              {activeTab === 'favorites' && (
                <div className="space-y-8">
                  {userTemplates.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {userTemplates.map(template => (
                        <TemplateCard key={template.id} {...template} />
                      ))}
                    </div>
                  ) : (
                    <EmptyState
                      title="No favorites yet"
                      description="Browse templates and add them to your favorites"
                      action={{
                        label: 'Browse Templates',
                        onClick: () => {} // Handle navigation
                      }}
                    />
                  )}
                </div>
              )}

              {activeTab === 'activity' && (
                <ActivityFeed />
              )}
            </div>
          </div>
        </div>
     
      {showSubmitModal && (
        <div className="relative z-[100]">
          <SubmitTemplate onClose={() => setShowSubmitModal(false)} />
        </div>
      )}
    </div>
  );
}