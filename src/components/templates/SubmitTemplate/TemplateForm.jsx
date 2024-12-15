import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Upload, Loader2 } from 'lucide-react';


export function TemplateForm({ form, isSubmitting, onSubmit, onClose }) {
  const { register, handleSubmit, formState: { errors } } = form;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Category
        </label>
        <select
          {...register('category')}
          className="w-full px-4 py-2.5 bg-white dark:bg-dark-300 rounded-xl border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary-500 dark:text-white transition-all"
        >
          <option value="">Select a category</option>
          <option value="frontend">Frontend</option>
          <option value="fullstack">Full Stack</option>
          <option value="enterprise">Enterprise</option>
          <option value="ai">AI Templates</option>
          <option value="design">Design System</option>
        </select>
        {errors.category && (
          <p className="mt-1 text-sm text-red-500">{errors.category.message }</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Template Title
        </label>
        <input
          {...register('title')}
          type="text"
          className="w-full px-4 py-2.5 bg-white dark:bg-dark-300 rounded-xl border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary-500 dark:text-white transition-all"
          placeholder="Amazing Template"
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-500">{errors.title.message }</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Description
        </label>
        <textarea
          {...register('description')}
          className="w-full px-4 py-2.5 bg-white dark:bg-dark-300 rounded-xl border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary-500 dark:text-white transition-all resize-none"
          rows={3}
          placeholder="Describe your template..."
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-500">{errors.description.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          GitHub Repository URL
        </label>
        <input
          {...register('repoUrl')}
          type="url"
          className="w-full px-4 py-2.5 bg-white dark:bg-dark-300 rounded-xl border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary-500 dark:text-white transition-all"
          placeholder="https://github.com/username/repo"
        />
        {errors.repoUrl && (
          <p className="mt-1 text-sm text-red-500">{errors.repoUrl.message }</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Live Preview URL
        </label>
        <input
          {...register('previewUrl')}
          type="url"
          className="w-full px-4 py-2.5 bg-white dark:bg-dark-300 rounded-xl border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary-500 dark:text-white transition-all"
          placeholder="https://your-template-demo.vercel.app"
        />
        {errors.previewUrl && (
          <p className="mt-1 text-sm text-red-500">{errors.previewUrl.message }</p>
        )}
      </div>

      <div className="flex gap-4 pt-4">
        <button
          type="button"
          onClick={onClose}
          className="flex-1 px-6 py-2.5 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-dark-300 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 bg-gradient-to-r from-primary-500 via-primary-600 to-primary-500 bg-[length:200%_100%] hover:from-primary-600 hover:via-primary-700 hover:to-primary-600 disabled:from-primary-400 disabled:to-primary-500 text-white px-6 py-2.5 rounded-xl font-medium flex items-center justify-center gap-2 transition-all animate-gradient"
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
  );
}