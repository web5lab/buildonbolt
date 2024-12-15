import { API_URL } from './config';



export async function registerUser(data) {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to register');
  }

  return response.json();
}
export async function loginWithPassword(email, password) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Invalid credentials');
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