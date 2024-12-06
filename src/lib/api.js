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
  const response = await fetch(`${API_URL}/templates`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(templateData),
  });
  if (!response.ok) {
    throw new Error('Failed to create template');
  }
  return response.json();
}