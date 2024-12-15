import React from 'react';
import { CheckCircle, XCircle, Clock, Trash2, Eye, FileCode } from 'lucide-react';

interface Template {
  id: string;
  title: string;
  description: string;
  author: string;
  category: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  image: string;
}

interface TemplateListProps {
  templates: Template[];
  onUpdateStatus: (templateId: string, status: 'approved' | 'rejected') => void;
  onDelete: (templateId: string) => void;
}

export function TemplateList({ templates, onUpdateStatus, onDelete }: TemplateListProps) {
  if (templates.length === 0) {
    return (
      <div className="text-center py-12 bg-white dark:bg-dark-200 rounded-xl border border-gray-200 dark:border-dark-300">
        <FileCode className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No templates found</h3>
        <p className="text-gray-500 dark:text-gray-400">
          No templates match your current filters
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-dark-200 rounded-xl border border-gray-200 dark:border-dark-300 overflow-hidden">
      <div className="grid gap-6 p-6">
        {templates.map((template) => (
          <div
            key={template.id}
            className="flex gap-6 p-4 bg-gray-50 dark:bg-dark-300 rounded-xl relative group"
          >
            <img
              src={template.image}
              alt={template.title}
              className="w-48 h-32 object-cover rounded-lg"
            />
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  {template.title}
                </h3>
                <StatusBadge status={template.status} />
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                {template.description}
              </p>
              <div className="flex items-center gap-6 text-sm">
                <div className="text-gray-500 dark:text-gray-400">
                  By <span className="text-gray-900 dark:text-white">{template.author}</span>
                </div>
                <div className="text-gray-500 dark:text-gray-400">
                  {new Date(template.createdAt).toLocaleDateString()}
                </div>
                <div className="px-2 py-1 rounded-full bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400">
                  {template.category}
                </div>
              </div>
            </div>
            <div className="absolute right-4 top-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => window.open(`/template/${template.id}`, '_blank')}
                className="p-2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 hover:bg-white dark:hover:bg-dark-200 rounded-lg transition-colors"
              >
                <Eye className="w-4 h-4" />
              </button>
              {template.status === 'pending' && (
                <>
                  <button
                    onClick={() => onUpdateStatus(template.id, 'approved')}
                    className="p-2 text-green-500 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors"
                  >
                    <CheckCircle className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onUpdateStatus(template.id, 'rejected')}
                    className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                  >
                    <XCircle className="w-4 h-4" />
                  </button>
                </>
              )}
              <button
                onClick={() => onDelete(template.id)}
                className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: Template['status'] }) {
  const config = {
    pending: {
      icon: Clock,
      className: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400',
      text: 'Pending Review'
    },
    approved: {
      icon: CheckCircle,
      className: 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400',
      text: 'Approved'
    },
    rejected: {
      icon: XCircle,
      className: 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400',
      text: 'Rejected'
    }
  };

  const { icon: Icon, className, text } = config[status];

  return (
    <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${className}`}>
      <Icon className="w-3.5 h-3.5" />
      {text}
    </div>
  );
}