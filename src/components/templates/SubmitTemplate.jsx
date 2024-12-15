import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2, Upload, HelpCircle } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { createTemplate } from '../../lib/api';

import { useAuth } from '../../hooks/useAuth';

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
  
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(templateSchema),
  });

  const onDrop = React.useCallback((acceptedFiles) => {
    if (acceptedFiles[0]) {
      setPreviewImage(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif']
    },
    maxFiles: 1,
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
        techStack: ['React', 'TypeScript', 'Tailwind CSS'], // Default tech stack
        stars: 0,
        status: 'pending'
      });
      
      onClose();
      // Show success message
      const event = new CustomEvent('templateCreated');
      window.dispatchEvent(event);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to submit template. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-dark-200 rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto text-gray-900 dark:text-white">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Submit Your Template</h2>
          <button
            onClick={() => setShowHelp(!showHelp)}
            className="p-2 text-primary-500 hover:text-primary-600 rounded-full hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors"
            title="Show help"
          >
            <HelpCircle className="w-5 h-5" />
          </button>
        </div>

        {showHelp && (
          <div className="mb-6 p-4 bg-primary-50 dark:bg-primary-900/20 rounded-xl">
            <h3 className="font-semibold mb-2">How to Submit Your Template</h3>
            <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <li>Host your template code on GitHub</li>
              <li>Deploy a live preview (e.g., using Vercel, Netlify)</li>
              <li>Fill out this form with your template details</li>
              <li>Add a preview image showing your template in action</li>
            </ol>
            <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <p className="text-sm text-yellow-800 dark:text-yellow-200">
                Make sure your repository includes:
              </p>
              <ul className="list-disc list-inside text-sm mt-2 text-yellow-700 dark:text-yellow-300">
                <li>Clear documentation in README.md</li>
                <li>Installation instructions</li>
                <li>Required environment variables</li>
                <li>License information</li>
              </ul>
            </div>
          </div>
        )}
        
        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-1">Category</label>
              <select
                {...register('category')}
                className="w-full px-3 py-2 bg-white dark:bg-dark-300 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary-500"
              >
                <option value="">Select a category</option>
                <option value="frontend">Frontend</option>
                <option value="fullstack">Full Stack</option>
                <option value="enterprise">Enterprise</option>
                <option value="ai">AI Templates</option>
                <option value="design">Design System</option>
              </select>
              {errors.category && (
                <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Template Title</label>
              <input
                {...register('title')}
                type="text"
                className="w-full px-3 py-2 bg-white dark:bg-dark-300 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary-500"
                placeholder="Amazing Template"
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              {...register('description')}
              className="w-full px-3 py-2 bg-white dark:bg-dark-300 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary-500"
              rows={3}
              placeholder="Describe your template..."
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-1">GitHub Repository URL</label>
              <input
                {...register('repoUrl')}
                type="url"
                className="w-full px-3 py-2 bg-white dark:bg-dark-300 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary-500"
                placeholder="https://github.com/username/repo"
              />
              {errors.repoUrl && (
                <p className="text-red-500 text-sm mt-1">{errors.repoUrl.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Live Preview URL</label>
              <input
                {...register('previewUrl')}
                type="url"
                className="w-full px-3 py-2 bg-white dark:bg-dark-300 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary-500"
                placeholder="https://your-template-demo.vercel.app"
              />
              {errors.previewUrl && (
                <p className="text-red-500 text-sm mt-1">{errors.previewUrl.message}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Preview Image</label>
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer
                ${isDragActive ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20' : 'border-gray-300 dark:border-gray-600 hover:border-primary-500'}
              `}
            >
              <input {...getInputProps()} />
              {previewImage ? (
                <div className="space-y-2">
                  <img
                    src={URL.createObjectURL(previewImage)}
                    alt="Preview"
                    className="max-h-32 mx-auto rounded"
                  />
                  <p className="text-sm text-gray-600 dark:text-gray-400">Click or drag to replace</p>
                </div>
              ) : (
                <div className="space-y-2">
                  <Upload className="w-8 h-8 mx-auto text-gray-400" />
                  <p className="text-gray-600 dark:text-gray-400">
                    Drop an image here, or click to select
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-500">
                    PNG, JPG, GIF up to 5MB
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-dark-300 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !previewImage}
              className="flex-1 bg-primary-500 hover:bg-primary-600 disabled:bg-primary-400 text-white px-6 py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Upload className="w-5 h-5" />
                  Submit Template
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}