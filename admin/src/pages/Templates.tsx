import React, { useState, useEffect } from 'react';
import { getTemplates, updateTemplateStatus, deleteTemplate } from '../lib/api';
import { TemplateList } from '../components/templates/TemplateList';
import { TemplateFilters } from '../components/templates/TemplateFilters';
import { FileCode } from 'lucide-react';

interface Template {
  id: string;
  title: string;
  description: string;
  author: string;
  category: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  image: string;
}

export function Templates() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadTemplates();
  }, []);

  const loadTemplates = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getTemplates();
      setTemplates(data);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to load templates');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (templateId: string, status: 'approved' | 'rejected') => {
    try {
      await updateTemplateStatus(templateId, status);
      setTemplates(templates.map(template =>
        template.id === templateId ? { ...template, status } : template
      ));
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to update template status');
    }
  };

  const handleDelete = async (templateId: string) => {
    if (!window.confirm('Are you sure you want to delete this template?')) {
      return;
    }

    try {
      await deleteTemplate(templateId);
      setTemplates(templates.filter(template => template.id !== templateId));
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to delete template');
    }
  };

  const filteredTemplates = templates.filter(template => {
    const matchesStatus = statusFilter === 'all' || template.status === statusFilter;
    const matchesSearch = template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

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
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Templates</h1>
        <div className="flex items-center gap-4">
          <div className="bg-primary-50 dark:bg-primary-900/20 px-4 py-2 rounded-lg">
            <div className="flex items-center gap-2">
              <FileCode className="w-5 h-5 text-primary-500" />
              <span className="text-sm font-medium text-primary-600 dark:text-primary-400">
                {templates.length} Templates
              </span>
            </div>
          </div>
        </div>
      </div>

      <TemplateFilters
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <TemplateList
        templates={filteredTemplates}
        onUpdateStatus={handleUpdateStatus}
        onDelete={handleDelete}
      />
    </div>
  );
}