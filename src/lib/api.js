const API_URL = import.meta.env.VITE_API_URL;

export async function fetchTemplates() {
  const response = await fetch(`${API_URL}/templates`);
  if (!response.ok) {
    throw new Error('Failed to fetch templates');
  }
  return response.json();
}

export async function fetchTemplateById(id) {
  const response = await fetch(`${API_URL}/templates/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch template');
  }
  return response.json();
}

export async function createTemplate(templateData) {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_URL}/templates`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(templateData),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to create template');
  }
  return response.json();
}

export async function sendOTP(email) {
  const response = await fetch(`${API_URL}/auth/send-otp`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to send OTP');
  }
  
  return response.json();
}

export async function verifyOTP(email, otp) {
  const response = await fetch(`${API_URL}/auth/verify-otp`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, otp }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Invalid OTP');
  }

  return response.json();
}

export async function updateUserProfile(profileData) {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_URL}/users/profile`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(profileData),
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to update profile');
  }
  
  return response.json();
}

export async function addComment(templateId, content, parentId) {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_URL}/comments/${templateId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ content, parentId }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to add comment');
  }

  return response.json();
}

export async function toggleFavorite(templateId) {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_URL}/favorites/${templateId}/toggle`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to toggle favorite');
  }

  return response.json();
}

export async function getFavorites() {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_URL}/favorites`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to fetch favorites');
  }

  return response.json();
}