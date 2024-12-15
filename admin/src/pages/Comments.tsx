import React, { useState, useEffect } from 'react';
import { getComments, deleteComment } from '../lib/api';
import { CommentList } from '../components/comments/CommentList';
import { CommentFilters } from '../components/comments/CommentFilters';
import { MessageSquare } from 'lucide-react';

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

export function Comments() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadComments();
  }, []);

  const loadComments = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getComments();
      setComments(data);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to load comments');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (commentId: string) => {
    if (!window.confirm('Are you sure you want to delete this comment?')) {
      return;
    }

    try {
      await deleteComment(commentId);
      setComments(comments.filter(comment => comment.id !== commentId));
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to delete comment');
    }
  };

  const filteredComments = comments.filter(comment =>
    comment.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    comment.author.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    comment.templateTitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4 rounded-xl">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Comments</h1>
        <div className="flex items-center gap-4">
          <div className="bg-primary-50 dark:bg-primary-900/20 px-4 py-2 rounded-lg">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-primary-500" />
              <span className="text-sm font-medium text-primary-600 dark:text-primary-400">
                {comments.length} Comments
              </span>
            </div>
          </div>
        </div>
      </div>

      <CommentFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <CommentList
        comments={filteredComments}
        onDelete={handleDelete}
      />
    </div>
  );
}