import React from 'react';
import { AlertTriangle } from 'lucide-react';

export function HelpSection() {
  return (
    <div className="space-y-4">
      <div className="bg-primary-50 dark:bg-primary-900/20 rounded-xl p-4">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
          How to Submit Your Template
        </h3>
        <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700 dark:text-gray-300">
          <li>Host your template code on GitHub</li>
          <li>Deploy a live preview (e.g., using Vercel, Netlify)</li>
          <li>Fill out this form with your template details</li>
          <li>Add a preview image showing your template in action</li>
        </ol>
      </div>

      <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-4">
        <div className="flex items-center gap-2 mb-2">
          <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
          <h4 className="font-medium text-yellow-800 dark:text-yellow-200">
            Repository Requirements
          </h4>
        </div>
        <ul className="list-disc list-inside text-sm space-y-1 text-yellow-700 dark:text-yellow-300">
          <li>Clear documentation in README.md</li>
          <li>Installation instructions</li>
          <li>Required environment variables</li>
          <li>License information</li>
        </ul>
      </div>
    </div>
  );
}