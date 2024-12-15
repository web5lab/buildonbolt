import React from 'react';
import { CheckCircle, XCircle, AlertTriangle, Eye, User, FileCode, MessageSquare } from 'lucide-react';

interface Report {
  id: string;
  type: 'template' | 'comment' | 'user';
  reason: string;
  description: string;
  reportedBy: {
    id: string;
    name: string;
    email: string;
  };
  targetId: string;
  targetTitle: string;
  status: 'pending' | 'resolved' | 'dismissed';
  createdAt: string;
}

interface ReportListProps {
  reports: Report[];
  onResolve: (reportId: string, action: 'dismiss' | 'remove') => void;
}

export function ReportList({ reports, onResolve }: ReportListProps) {
  if (reports.length === 0) {
    return (
      <div className="text-center py-12 bg-white dark:bg-dark-200 rounded-xl border border-gray-200 dark:border-dark-300">
        <AlertTriangle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No reports found</h3>
        <p className="text-gray-500 dark:text-gray-400">
          No reports match your current filters
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-dark-200 rounded-xl border border-gray-200 dark:border-dark-300 overflow-hidden">
      <div className="grid gap-6 p-6">
        {reports.map((report) => (
          <div
            key={report.id}
            className="p-4 bg-gray-50 dark:bg-dark-300 rounded-xl relative group"
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                {report.type === 'template' && (
                  <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                    <FileCode className="w-5 h-5 text-blue-500" />
                  </div>
                )}
                {report.type === 'comment' && (
                  <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-green-500" />
                  </div>
                )}
                {report.type === 'user' && (
                  <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                    <User className="w-5 h-5 text-purple-500" />
                  </div>
                )}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      {report.targetTitle}
                    </h3>
                    <StatusBadge status={report.status} />
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(report.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <div className="mb-3">
                  <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                    Reason: <span className="text-gray-900 dark:text-white">{report.reason}</span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">{report.description}</p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <User className="w-4 h-4" />
                    Reported by {report.reportedBy.name}
                  </div>
                  
                  {report.status === 'pending' && (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onResolve(report.id, 'dismiss')}
                        className="px-3 py-1.5 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-400 rounded-lg transition-colors"
                      >
                        Dismiss
                      </button>
                      <button
                        onClick={() => onResolve(report.id, 'remove')}
                        className="px-3 py-1.5 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                      >
                        Remove Content
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <button
                onClick={() => {
                  const baseUrl = window.location.origin;
                  const url = report.type === 'template'
                    ? `${baseUrl}/template/${report.targetId}`
                    : report.type === 'user'
                    ? `${baseUrl}/user/${report.targetId}`
                    : `${baseUrl}/template/${report.targetId}#comment-${report.targetId}`;
                  window.open(url, '_blank');
                }}
                className="absolute right-4 top-4 p-2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 hover:bg-white dark:hover:bg-dark-200 rounded-lg transition-colors"
              >
                <Eye className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: Report['status'] }) {
  const config = {
    pending: {
      icon: AlertTriangle,
      className: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400',
      text: 'Pending'
    },
    resolved: {
      icon: CheckCircle,
      className: 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400',
      text: 'Resolved'
    },
    dismissed: {
      icon: XCircle,
      className: 'bg-gray-100 dark:bg-gray-900/30 text-gray-600 dark:text-gray-400',
      text: 'Dismissed'
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