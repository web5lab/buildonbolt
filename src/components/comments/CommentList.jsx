import React, { useState } from 'react';
import { User, Heart, Reply, MoreVertical } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { LoginModal } from '../auth/LoginModal';


export function CommentList({ comments, onAddComment }) {
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { user } = useAuth();

  const handleSubmit = async (e, parentId) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    if (!user) {
      setShowLoginModal(true);
      return;
    }

    await onAddComment(newComment, parentId);
    setNewComment('');
    setReplyingTo(null);
  };

  return (
    <div className="space-y-6">
      {user ? (
        <form onSubmit={(e) => handleSubmit(e)} className="mb-8">
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center flex-shrink-0">
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <User className="w-5 h-5 text-primary-500" />
              )}
            </div>
            <div className="flex-1">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
                className="w-full px-4 py-3 rounded-xl border border-primary-100 dark:border-dark-300 bg-white dark:bg-dark-300 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:text-white resize-none"
                rows={3}
              />
              <div className="flex justify-end mt-2">
                <button
                  type="submit"
                  className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors"
                >
                  Comment
                </button>
              </div>
            </div>
          </div>
        </form>
      ) : (
        <div className="text-center py-6 bg-primary-50 dark:bg-primary-900/20 rounded-xl">
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Please sign in to leave a comment
          </p>
          <button
            onClick={() => setShowLoginModal(true)}
            className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-2 rounded-xl text-sm font-medium transition-colors"
          >
            Sign In
          </button>
        </div>
      )}
      
      {showLoginModal && (
        <LoginModal onClose={() => setShowLoginModal(false)} />
      )}

      <div className="space-y-6">
        {comments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            onReply={() => setReplyingTo(comment.id)}
            onAddComment={onAddComment}
          />
        ))}
      </div>
    </div>
  );
}


function CommentItem({ comment, onReply, onAddComment }) {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyContent, setReplyContent] = useState('');

  const handleReplySubmit = async (e) => {
    e.preventDefault();
    if (!replyContent.trim()) return;

    await onAddComment(replyContent, comment.id);
    setReplyContent('');
    setShowReplyForm(false);
  };

  return (
    <div className="group">
      <div className="flex gap-4">
        <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center flex-shrink-0">
          {comment.author.avatar ? (
            <img
              src={comment.author.avatar}
              alt={comment.author.name}
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <User className="w-5 h-5 text-primary-500" />
          )}
        </div>
        <div className="flex-1">
          <div className="bg-white dark:bg-dark-300 rounded-xl p-4 border border-primary-100 dark:border-dark-300">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="font-medium text-gray-900 dark:text-white">
                  {comment.author.name}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {new Date(comment.createdAt).toLocaleDateString()}
                </span>
              </div>
              <button className="opacity-0 group-hover:opacity-100 transition-opacity">
                <MoreVertical className="w-4 h-4 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300" />
              </button>
            </div>
            <p className="text-gray-600 dark:text-gray-300">{comment.content}</p>
          </div>
          <div className="flex items-center gap-4 mt-2 ml-4">
            <button
              className="flex items-center gap-1 text-sm text-gray-500 hover:text-primary-500 dark:text-gray-400 dark:hover:text-primary-400 transition-colors"
              onClick={() => setShowReplyForm(!showReplyForm)}
            >
              <Reply className="w-4 h-4" />
              Reply
            </button>
            <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 transition-colors">
              <Heart className="w-4 h-4" />
              {comment.likes}
            </button>
          </div>

          {showReplyForm && (
            <form onSubmit={handleReplySubmit} className="mt-4 ml-4">
              <textarea
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                placeholder="Write a reply..."
                className="w-full px-4 py-3 rounded-xl border border-primary-100 dark:border-dark-300 bg-white dark:bg-dark-300 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:text-white resize-none"
                rows={2}
              />
              <div className="flex justify-end gap-2 mt-2">
                <button
                  type="button"
                  onClick={() => setShowReplyForm(false)}
                  className="px-4 py-2 rounded-xl text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-400 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors"
                >
                  Reply
                </button>
              </div>
            </form>
          )}

          {comment.replies && comment.replies.length > 0 && (
            <div className="mt-4 ml-4 space-y-4">
              {comment.replies.map((reply) => (
                <CommentItem
                  key={reply.id}
                  comment={reply}
                  onReply={onReply}
                  onAddComment={onAddComment}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}