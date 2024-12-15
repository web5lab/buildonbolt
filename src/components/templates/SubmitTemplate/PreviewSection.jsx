import React from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, User, Package } from 'lucide-react';
import { TechStack } from '../TechStack';



export function PreviewSection({ previewImage, setPreviewImage, formData }) {
  const onDrop = React.useCallback((acceptedFiles) => {
    if (acceptedFiles[0]) {
      setPreviewImage(acceptedFiles[0]);
    }
  }, [setPreviewImage]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif']
    },
    maxFiles: 1,
    maxSize: 5 * 1024 * 1024 // 5MB
  });

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Preview</h3>
      
      <div className="bg-white dark:bg-dark-300 rounded-xl overflow-hidden border border-primary-100 dark:border-dark-300 transition-all hover:shadow-lg">
        <div {...getRootProps()} className="relative">
          <input {...getInputProps()} />
          {previewImage ? (
            <div className="relative aspect-video group cursor-pointer">
              <img
                src={URL.createObjectURL(previewImage)}
                alt="Preview"
                className="w-full h-full object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                <div className="text-white text-center">
                  <Upload className="w-8 h-8 mx-auto mb-2" />
                  <p>Click or drag to replace</p>
                </div>
              </div>
            </div>
          ) : (
            <div className={`aspect-video flex items-center justify-center border-2 border-dashed transition-colors ${
              isDragActive 
                ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20' 
                : 'border-gray-300 dark:border-gray-600'
            }`}>
              <div className="text-center p-6">
                <Upload className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-600 dark:text-gray-400 mb-2">
                  Drop an image here, or click to select
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-500">
                  PNG, JPG, GIF up to 5MB
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-medium px-3 py-1 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400">
              {formData.category || 'Category'}
            </span>
            <div className="flex items-center gap-2">
              <div className="bg-primary-50 dark:bg-primary-900/20 p-2 rounded-lg">
                <User className="w-4 h-4 text-primary-500" />
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Preview Author
              </span>
            </div>
          </div>

          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            {formData.title || 'Template Title'}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
            {formData.description || 'Template description will appear here...'}
          </p>

          <TechStack technologies={['React', 'TypeScript', 'Tailwind CSS']} />
        </div>
      </div>
    </div>
  );
}