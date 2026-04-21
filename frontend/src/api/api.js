// src/api/api.js
// ─────────────────────────────────────────────────────────────────
// Central API helper.
// The base URL is read from the .env file (VITE_API_BASE_URL).
//
// Local dev:   .env  →  VITE_API_BASE_URL=http://localhost:8080
// Production:  Set VITE_API_BASE_URL in your Netlify environment
//              variables → https://your-app.onrender.com
// ─────────────────────────────────────────────────────────────────

export const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

/**
 * Generic fetch wrapper. Automatically attaches the JWT token
 * from localStorage and sets Content-Type to JSON.
 *
 * @param {string} endpoint  - e.g. '/api/auth/login'
 * @param {object} options   - standard fetch options (method, body, etc.)
 */
export const apiFetch = async (endpoint, options = {}) => {
  const token = localStorage.getItem('token');

  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `HTTP error ${response.status}`);
  }

  // Return null for 204 No Content responses
  if (response.status === 204) return null;

  return response.json();
};

// ─── Convenience wrappers ──────────────────────────────────────────

export const apiGet    = (endpoint)       => apiFetch(endpoint, { method: 'GET' });
export const apiPost   = (endpoint, body) => apiFetch(endpoint, { method: 'POST',   body: JSON.stringify(body) });
export const apiPut    = (endpoint, body) => apiFetch(endpoint, { method: 'PUT',    body: JSON.stringify(body) });
export const apiDelete = (endpoint)       => apiFetch(endpoint, { method: 'DELETE' });
