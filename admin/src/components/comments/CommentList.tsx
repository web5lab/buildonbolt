import React from 'react';
import { Trash2, Eye, MessageSquare, ThumbsUp, User } from 'lucide-react';

interface Comment {
  id: string;
  content: string;
  author: {
    id: string;
    name: string;
    avatar?: string;
  };
  templateId: string;
  templateTitle: string;
  createdAt: string;
  likes: number;
}

interface CommentListProps {
  comments: Comment[];
  onDelete: (commentId: string) => void;
}

export function CommentList({ comments, onDelete }: CommentListProps) {
  if (comments.length === 0) {
    return (
      <div className="text-center py-12 bg-white dark:bg-dark-200 rounded-xl border border-gray-200 dark:border-dark-300">
        <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No comments found</h3>
        <p className="text-gray-500 dark:text-gray-400">
          No comments match your current filters
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-dark-200 rounded-xl border border-gray-200 dark:border-dark-300 overflow-hidden">
      <div className="grid gap-6 p-6">
        {comments.map((comment) => (
          <div
            key={comment.id}
            className="p-4 bg-gray-50 dark:bg-dark-300 rounded-xl relative group"
          >
            <div className="flex items-start gap-4">
              {comment.author.avatar ? (
                <img
                  src={comment.author.avatar}
                  alt={comment.author.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
                  <User className="w-5 h-5 text-primary-500" />
                </div>
              )}
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {comment.author.name}
                    </span>
                    <span className="text-gray-500 dark:text-gray-400 text-sm ml-2">
                      commented on
                    </span>
                    <button
                      onClick={() => window.open(`/template/${comment.templateId}`, '_blank')}
                      className="text-primary-500 hover:text-primary-600 text-sm ml-1"
                    >
                      {comment.templateTitle}
                    </button>
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-3">
                  {comment.content}
                </p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                    <ThumbsUp className="w-4 h-4" />
                    <span className="text-sm">{comment.likes}</span>
                  </div>
                </div>
              </div>
              <div className="absolute right-4 top-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => window.open(`/template/${comment.templateId}`, '_blank')}
                  className="p-2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 hover:bg-white dark:hover:bg-dark-200 rounded-lg transition-colors"
                >
                  <Eye className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onDelete(comment.id)}
                  className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}