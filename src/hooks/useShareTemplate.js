import { useState } from 'react';



export function useShareTemplate() {
  const [isSharing, setIsSharing] = useState(false);

  const getTemplateUrl = (template) => {
    const baseUrl = window.location.origin;
    return `${baseUrl}/template/${template.id}`;
  };

  const shareTemplate = async (template)=> {
    setIsSharing(true);
    try {
      const shareUrl = getTemplateUrl(template);
      const shareData = {
        title: template.title,
        text: template.description,
        url: shareUrl,
      };

      if (navigator.share) {
        await navigator.share(shareData);
        return { success: true };
      }
      
      await navigator.clipboard.writeText(shareUrl);
      return { success: true };
    } catch (error) {
      console.error('Error sharing template:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to share template'
      };
    } finally {
      setIsSharing(false);
    }
  };

  const shareViaEmail = (template) => {
    const shareUrl = getTemplateUrl(template);
    const subject = encodeURIComponent(`Check out this template: ${template.title}`);
    const body = encodeURIComponent(
      `I found this amazing template:\n\n${template.title}\n${template.description}\n\nCheck it out here: ${shareUrl}`
    );
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  const shareViaSocialMedia = (platform, template) => {
    const shareUrl = encodeURIComponent(getTemplateUrl(template));
    const text = encodeURIComponent(`Check out this amazing template: ${template.title}`);
    
    let shareLink = '';
    switch (platform) {
      case 'twitter':
        shareLink = `https://twitter.com/intent/tweet?text=${text}&url=${shareUrl}`;
        break;
      case 'facebook':
        shareLink = `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`;
        break;
      case 'linkedin':
        shareLink = `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`;
        break;
      case 'message':
        shareLink = `sms:?body=${text}%20${shareUrl}`;
        break;
    }

    if (shareLink) {
      window.open(shareLink, '_blank', 'width=600,height=400,resizable=yes,scrollbars=yes');
    }
  };

  return {
    shareTemplate,
    shareViaEmail,
    shareViaSocialMedia,
    isSharing
  };
}