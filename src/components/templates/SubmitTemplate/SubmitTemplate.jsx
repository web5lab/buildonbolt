import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X } from 'lucide-react';
import { TemplateForm } from './TemplateForm';
import { PreviewSection } from './PreviewSection';
import { SubmitHeader } from './SubmitHeader';
import { HelpSection } from './HelpSection';
import { createTemplate } from '../../../lib/api';
import { useAuth } from '../../../hooks/useAuth';

const templateSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  category: z.string().min(1, 'Please select a category'),
  previewUrl: z.string().url('Please enter a valid URL'),
  repoUrl: z.string().url('Please enter a valid GitHub repository URL'),
});


export function SubmitTemplate({ onClose }) {
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [showHelp, setShowHelp] = useState(false);
  const [error, setError] = useState(null);
  
  const form = useForm({
    resolver: zodResolver(templateSchema),
  });

  const onSubmit = async (data) => {
    if (!previewImage) return;
    setIsSubmitting(true);
    setError(null);
    
    // Convert image to base64
    const reader = new FileReader();
    const base64Promise = new Promise((resolve) => {
      reader.onload = () => resolve(reader.result);
      reader.readAsDataURL(previewImage);
    });

    try {
      const base64Image = await base64Promise;
      
      await createTemplate({
        ...data,
        image: base64Image,
        author: user?.name || user?.email || 'Anonymous User',
        techStack: ['React', 'TypeScript', 'Tailwind CSS'],
        stars: 0,
        status: 'pending'
      });
      
      onClose();
      window.dispatchEvent(new CustomEvent('templateCreated'));
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to submit template');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-dark-200 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <SubmitHeader 
          showHelp={showHelp} 
          onToggleHelp={() => setShowHelp(!showHelp)} 
          onClose={onClose}
        />

        {error && (
          <div className="mx-6 mt-6 p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl">
            {error}
          </div>
        )}

        <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            {showHelp && <HelpSection />}
            <TemplateForm 
              form={form}
              isSubmitting={isSubmitting}
              onSubmit={onSubmit}
              onClose={onClose}
            />
          </div>

          <PreviewSection
            previewImage={previewImage}
            setPreviewImage={setPreviewImage}
            formData={form.watch()}
          />
        </div>
      </div>
    </div>
  );
}