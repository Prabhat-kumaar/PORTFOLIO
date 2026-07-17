import { API_URL } from '../config/api';

export const adminFetch = async (
  endpoint: string,
  options: RequestInit = {}
) => {
  const token = localStorage.getItem('adminToken');
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers || {}),
  };

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (response.status === 401) {
    localStorage.removeItem('adminToken');
    window.dispatchEvent(new Event('admin-logout'));
    throw new Error('Unauthorized');
  }

  return response;
};
