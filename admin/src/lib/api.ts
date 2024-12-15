import { API_URL } from './config';

interface LoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
    role: string;
  };
}

export async function loginAdmin(email: string, password: string) {
  const response = await fetch(`${API_URL}/admin/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to login');
  }

  return response.json() as Promise<LoginResponse>;
}

export async function getUsers() {
  const response = await fetch(`${API_URL}/admin/users`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to fetch users');
  }

  return response.json();
}

export async function deleteUser(userId: string) {
  const response = await fetch(`${API_URL}/admin/users/${userId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to delete user');
  }
}

export async function getTemplates() {
  const response = await fetch(`${API_URL}/admin/templates`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to fetch templates');
  }

  return response.json();
}

export async function updateTemplateStatus(templateId: string, status: 'approved' | 'rejected') {
  const response = await fetch(`${API_URL}/admin/templates/${templateId}/status`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
    },
    body: JSON.stringify({ status }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to update template status');
  }

  return response.json();
}

export async function deleteTemplate(templateId: string) {
  const response = await fetch(`${API_URL}/admin/templates/${templateId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to delete template');
  }
}

export async function getComments() {
  const response = await fetch(`${API_URL}/admin/comments`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to fetch comments');
  }

  return response.json();
}

export async function deleteComment(commentId: string) {
  const response = await fetch(`${API_URL}/admin/comments/${commentId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to delete comment');
  }
}

export async function getReports() {
  const response = await fetch(`${API_URL}/admin/reports`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to fetch reports');
  }

  return response.json();
}

export async function resolveReport(reportId: string, action: 'dismiss' | 'remove') {
  const response = await fetch(`${API_URL}/admin/reports/${reportId}/resolve`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
    },
    body: JSON.stringify({ action }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to resolve report');
  }

  return response.json();
}