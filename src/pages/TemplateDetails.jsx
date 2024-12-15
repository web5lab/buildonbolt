import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Share2, Flag, Rocket, User, MessageSquare } from 'lucide-react';
import { templates } from '../components/templates/data/templates';
import { TechStack } from '../components/templates/TechStack';
import { ShareTemplate } from '../components/templates/ShareTemplate';
import { ReportTemplate } from '../components/templates/ReportTemplate';
import { CommentList } from '../components/comments/CommentList.jsx';
import { FavoriteButton } from '../components/favorites/FavoriteButton';

export function TemplateDetails() {
  const { id } = useParams();
  const [showShareModal, setShowShareModal] = React.useState(false);
  const [showReportModal, setShowReportModal] = React.useState(false);
  const [isFavorited, setIsFavorited] = React.useState(false);
  const [comments, setComments] = React.useState([]);

  const template = templates.find(t => t.id === id);

  const handleAddComment = async (content, parentId) => {
    // TODO: Implement comment submission
    console.log('Adding comment:', { content, parentId });
  };

  const handleToggleFavorite = async () => {
    // TODO: Implement favorite toggle
    setIsFavorited(!isFavorited);
  };

  if (!template) {
    return (
      <div className="min-h-screen bg-blue-50/50 dark:bg-dark-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Template not found
          </h1>
          <Link
            to="/"
            className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to templates
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-blue-50/50 dark:bg-dark-100">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to templates
        </Link>

        <div className="bg-white dark:bg-dark-200 rounded-2xl overflow-hidden border border-primary-100 dark:border-dark-300">
          <div className="relative aspect-video">
            <img
              src={template.image}
              alt={template.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            
            <div className="absolute top-4 right-4 flex gap-2">
              <button
                onClick={() => setShowReportModal(true)}
                className="bg-white/90 dark:bg-dark-200/90 hover:bg-white dark:hover:bg-dark-200 p-2 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
              >
                <Flag className="w-4 h-4 text-red-500" />
              </button>
              <button
                onClick={() => setShowShareModal(true)}
                className="bg-white/90 dark:bg-dark-200/90 hover:bg-white dark:hover:bg-dark-200 p-2 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
              >
                <Share2 className="w-4 h-4 text-primary-500" />
              </button>
            </div>
          </div>

          <div className="p-8">
            <div className="flex items-center justify-between mb-6">
              <span className="text-sm font-medium px-3 py-1 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400">
                {template.category}
              </span>
              <div className="flex items-center gap-2">
                <div className="bg-gradient-to-r from-primary-100 to-primary-50 dark:from-primary-900/20 dark:to-primary-800/10 p-2 rounded-xl flex items-center gap-2">
                  <div className="bg-primary-500/10 dark:bg-primary-400/10 p-1.5 rounded-full">
                    <User className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                  </div>
                  <span className="text-sm font-medium text-primary-700 dark:text-primary-300">
                    {template.author}
                  </span>
                </div>
              </div>
            </div>

            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {template.title}
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              {template.description}
            </p>

            <div className="mb-8">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Tech Stack
              </h2>
              <TechStack technologies={template.techStack} />
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <FavoriteButton
                  isFavorited={isFavorited}
                  onToggle={handleToggleFavorite}
                  count={template.stars}
                />
                <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-gray-100 dark:bg-dark-300 text-gray-600 dark:text-gray-300">
                  <MessageSquare className="w-4 h-4" />
                  {comments.length} Comments
                </button>
              </div>

              <button
                onClick={() => window.open('https://bolt.new', '_blank')}
                className="w-full bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white px-6 py-3 rounded-xl font-medium flex items-center justify-center gap-2 group transform transition-all duration-300 hover:scale-[1.02]"
              >
                <Rocket className="w-5 h-5 group-hover:animate-bounce" />
                <span>Launch in Bolt.new</span>
              </button>
            </div>
          </div>

          <div className="mt-8 p-8 bg-white dark:bg-dark-200 rounded-2xl border border-primary-100 dark:border-dark-300">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Comments</h2>
            <CommentList comments={comments} onAddComment={handleAddComment} />
          </div>
        </div>
      </div>

      {showShareModal && (
        <ShareTemplate
          template={template}
          onClose={() => setShowShareModal(false)}
        />
      )}

      {showReportModal && (
        <ReportTemplate
          templateTitle={template.title}
          onClose={() => setShowReportModal(false)}
          onSubmit={async (data) => {
            console.log('Report submitted:', data);
          }}
        />
      )}
    </div>
  );
}