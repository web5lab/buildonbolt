import React, { useState } from 'react';
import { Share2, User, Flag, Rocket, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ShareTemplate } from './ShareTemplate';
import { ReportTemplate } from './ReportTemplate';
import { PreviewModal } from './PreviewModal';
import { TechStack } from './TechStack';



export function TemplateCard({ 
  id,
  title, 
  description, 
  image, 
  category, 
  author, 
  techStack,
  previewUrl,
}) {
  const [showShareModal, setShowShareModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const handleReport = async (data) => {
    console.log('Report submitted:', data);
  };

  const handleLaunchInBolt = () => {
    window.open('https://bolt.new/~/github.com/web5lab/buildonbolt', '_blank');
  };

  return (
    <>
      <div className="group relative bg-white dark:bg-dark-200 rounded-xl overflow-hidden border border-primary-100 dark:border-dark-300 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:shadow-dark-300/20">
        <Link to={`/template/${id}`} className="block">
          <div className="relative aspect-[16/9] overflow-hidden">
            <img
              src={image}
              alt={title}
              className="object-cover w-full h-full transform transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </Link>
        
        <div className="absolute top-4 right-4 flex gap-2">
          <button 
            onClick={() => setShowPreview(true)}
            className="bg-white/90 dark:bg-dark-200/90 hover:bg-white dark:hover:bg-dark-200 p-2 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
            title="Preview Template"
          >
            <Eye className="w-4 h-4 text-primary-500" />
          </button>
          <button 
            onClick={() => setShowReportModal(true)}
            className="bg-white/90 dark:bg-dark-200/90 hover:bg-white dark:hover:bg-dark-200 p-2 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
            title="Report Template"
          >
            <Flag className="w-4 h-4 text-red-500" />
          </button>
          <button 
            onClick={() => setShowShareModal(true)}
            className="bg-white/90 dark:bg-dark-200/90 hover:bg-white dark:hover:bg-dark-200 p-2 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
            title="Share Template"
          >
            <Share2 className="w-4 h-4 text-primary-500" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <Link to={`/template/${id}`} className="block space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400">
                {category}
              </span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
              {title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">{description}</p>
          </Link>

          <TechStack technologies={techStack} />

          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-r from-primary-100 to-primary-50 dark:from-primary-900/20 dark:to-primary-800/10 p-2 rounded-xl flex items-center gap-2 group-hover:scale-105 transition-transform">
              <div className="bg-primary-500/10 dark:bg-primary-400/10 p-1.5 rounded-full">
                <User className="w-4 h-4 text-primary-600 dark:text-primary-400" />
              </div>
              <span className="text-sm font-medium text-primary-700 dark:text-primary-300">{author}</span>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-100 dark:border-dark-300">
            <button
              onClick={handleLaunchInBolt}
              className="w-full bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white px-4 py-2.5 rounded-lg font-medium flex items-center justify-center gap-2 group/button transform transition-all duration-300 hover:scale-[1.02]"
            >
              <Rocket className="w-4 h-4 group-hover/button:animate-bounce" />
              <span>Launch in Bolt.new</span>
            </button>
          </div>
        </div>
      </div>

      {showShareModal && (
        <ShareTemplate
          template={{ id, title, description, image, category, author, techStack, previewUrl }}
          onClose={() => setShowShareModal(false)}
        />
      )}

      {showReportModal && (
        <ReportTemplate
          templateTitle={title}
          onClose={() => setShowReportModal(false)}
          onSubmit={handleReport}
        />
      )}

      {showPreview && previewUrl && (
        <PreviewModal
          url={previewUrl}
          onClose={() => setShowPreview(false)}
        />
      )}
    </>
  );
}