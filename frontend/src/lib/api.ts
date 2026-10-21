const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8081/api';

export async function fetchJson<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const url = `${API_BASE}${endpoint}`;
  try {
    const res = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(options?.headers || {}),
      },
    });

    if (!res.ok) {
      const errBody = await res.json().catch(() => ({ error: res.statusText }));
      throw new Error(errBody.error || `Request failed with status ${res.status}`);
    }

    return await res.json();
  } catch (error: any) {
    console.error(`API Error on ${endpoint}:`, error);
    throw error;
  }
}

// User Profile helpers
export const getCurrentUser = () => {
  if (typeof window === 'undefined') return null;
  const raw = localStorage.getItem('unscripted_user');
  return raw ? JSON.parse(raw) : null;
};

export const setCurrentUser = (user: any) => {
  if (typeof window === 'undefined') return;
  if (user) {
    localStorage.setItem('unscripted_user', JSON.stringify(user));
  } else {
    localStorage.removeItem('unscripted_user');
  }
};
