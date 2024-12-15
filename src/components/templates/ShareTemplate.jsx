import React, { useState } from 'react';
import { Share2, Link2, Twitter, Facebook, Copy, Check, Mail, Linkedin, MessageCircle, X } from 'lucide-react';
import { useShareTemplate } from '../../hooks/useShareTemplate';



export function ShareTemplate({ template, onClose }) {
  const { shareTemplate, shareViaEmail, shareViaSocialMedia, isSharing } = useShareTemplate();
  const [copied, setCopied] = useState(false);
  const [shareError, setShareError] = useState(null);

  const handleCopyLink = async () => {
    try {
      const result = await shareTemplate(template);
      if (result.success) {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } else {
        setShareError(result.error || 'Failed to copy link');
        setTimeout(() => setShareError(null), 3000);
      }
    } catch (error) {
      setShareError('Failed to copy link to clipboard');
      setTimeout(() => setShareError(null), 3000);
    }
  };

  const handleShare = (platform) => {
    if (platform === 'email') {
      shareViaEmail(template);
    } else {
      shareViaSocialMedia(platform, template);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center p-4 z-50 animate-fadeIn backdrop-blur-sm">
      <div className="bg-white dark:bg-dark-200 rounded-2xl p-6 w-full max-w-md transform transition-all duration-300 scale-100 animate-scaleIn">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Share2 className="w-5 h-5 text-primary-500" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Share Template</h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {shareError && (
          <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg text-sm">
            {shareError}
          </div>
        )}

        <div className="space-y-6">
          <div className="flex items-center gap-3 p-3 bg-primary-50 dark:bg-primary-900/20 rounded-xl">
            <img
              src={template.image}
              alt={template.title}
              className="w-16 h-16 rounded-lg object-cover"
            />
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">{template.title}</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">{template.description}</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <ShareButton
              icon={Twitter}
              label="Twitter"
              onClick={() => handleShare('twitter')}
              className="bg-[#1DA1F2]/10 hover:bg-[#1DA1F2]/20 text-[#1DA1F2] dark:text-[#1DA1F2]/90"
            />
            <ShareButton
              icon={Facebook}
              label="Facebook"
              onClick={() => handleShare('facebook')}
              className="bg-[#4267B2]/10 hover:bg-[#4267B2]/20 text-[#4267B2] dark:text-[#4267B2]/90"
            />
            <ShareButton
              icon={Linkedin}
              label="LinkedIn"
              onClick={() => handleShare('linkedin')}
              className="bg-[#0077B5]/10 hover:bg-[#0077B5]/20 text-[#0077B5] dark:text-[#0077B5]/90"
            />
            <ShareButton
              icon={MessageCircle}
              label="Message"
              onClick={() => handleShare('message')}
              className="bg-green-500/10 hover:bg-green-500/20 text-green-500 dark:text-green-400"
            />
            <ShareButton
              icon={Mail}
              label="Email"
              onClick={() => handleShare('email')}
              className="bg-gray-100 hover:bg-gray-200 dark:bg-dark-300 dark:hover:bg-dark-400 text-gray-600 dark:text-gray-300"
            />
          </div>

          <div className="relative">
            <input
              type="text"
              value={`${window.location.origin}/template/${template.id}`}
              readOnly
              className="w-full px-4 py-3 pr-12 rounded-xl border border-primary-100 dark:border-dark-300 bg-primary-50 dark:bg-dark-300 text-gray-900 dark:text-white text-sm"
            />
            <button
              onClick={handleCopyLink}
              disabled={isSharing}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-primary-500 hover:text-primary-600 dark:text-primary-400 transition-colors disabled:opacity-50"
              title={copied ? 'Copied!' : 'Copy link'}
            >
              {copied ? (
                <Check className="w-5 h-5" />
              ) : (
                <Copy className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}



function ShareButton({ icon: Icon, label, onClick, className = '' }) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center gap-2 p-3 rounded-xl transition-all group ${className}`}
    >
      <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
      <span className="text-sm font-medium text-gray-900 dark:text-white">{label}</span>
    </button>
  );
}