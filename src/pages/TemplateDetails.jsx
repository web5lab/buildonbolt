import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Share2, Flag, Rocket, User } from 'lucide-react';
import { templates } from '../components/templates/data/templates';
import { TechStack } from '../components/templates/TechStack';
import { ShareTemplate } from '../components/templates/ShareTemplate';
import { ReportTemplate } from '../components/templates/ReportTemplate';

export function TemplateDetails() {
  const { id } = useParams();
  const navigate = useNavigate()
  const [showShareModal, setShowShareModal] = React.useState(false);
  const [showReportModal, setShowReportModal] = React.useState(false);

  const template = templates.find(t => t.id === id);

  if (!template) {
    return (
      <div className="min-h-screen bg-blue-50/50 dark:bg-dark-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Template not found
          </h1>
          <div
            onClick={() => {

              navigate('/')
            }}
            className="text-primary-600 z-30 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to templates
          </div>
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

        <div className="bg-white dark:bg-dark-200 rounded-2xl overflow-hidden border border-primary-100 max-w-[480px] dark:border-dark-300">
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

            <button
              onClick={() => window.open('https://bolt.new', '_blank')}
              className="w-full bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white px-6 py-3 rounded-xl font-medium flex items-center justify-center gap-2 group transform transition-all duration-300 hover:scale-[1.02]"
            >
              <Rocket className="w-5 h-5 group-hover:animate-bounce" />
              <span>Launch in Bolt.new</span>
            </button>
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