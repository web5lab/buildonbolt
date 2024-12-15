import React, { useState, useEffect } from 'react';
import { getReports, resolveReport } from '../lib/api';
import { ReportList } from '../components/reports/ReportList';
import { ReportFilters } from '../components/reports/ReportFilters';
import { Flag } from 'lucide-react';

interface Report {
  id: string;
  type: 'template' | 'comment' | 'user';
  reason: string;
  description: string;
  reportedBy: {
    id: string;
    name: string;
    email: string;
  };
  targetId: string;
  targetTitle: string;
  status: 'pending' | 'resolved' | 'dismissed';
  createdAt: string;
}

export function Reports() {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('pending');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadReports();
  }, []);

  const loadReports = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getReports();
      setReports(data);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to load reports');
    } finally {
      setLoading(false);
    }
  };

  const handleResolve = async (reportId: string, action: 'dismiss' | 'remove') => {
    try {
      await resolveReport(reportId, action);
      setReports(reports.map(report =>
        report.id === reportId
          ? { ...report, status: action === 'dismiss' ? 'dismissed' : 'resolved' }
          : report
      ));
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to resolve report');
    }
  };

  const filteredReports = reports.filter(report => {
    const matchesStatus = statusFilter === 'all' || report.status === statusFilter;
    const matchesSearch = 
      report.targetTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.reason.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.description.toLowerCase().includes(searchQuery.toLowerCase());
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
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Reports</h1>
        <div className="flex items-center gap-4">
          <div className="bg-primary-50 dark:bg-primary-900/20 px-4 py-2 rounded-lg">
            <div className="flex items-center gap-2">
              <Flag className="w-5 h-5 text-primary-500" />
              <span className="text-sm font-medium text-primary-600 dark:text-primary-400">
                {reports.filter(r => r.status === 'pending').length} Pending Reports
              </span>
            </div>
          </div>
        </div>
      </div>

      <ReportFilters
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <ReportList
        reports={filteredReports}
        onResolve={handleResolve}
      />
    </div>
  );
}