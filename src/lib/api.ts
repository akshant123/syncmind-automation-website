const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export async function postForm<T>(endpoint: string, body: unknown): Promise<{ data: T | null; error: string | null }> {
  try {
    const response = await fetch(`${API_URL}/api/${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const json = await response.json();
    if (!response.ok) {
      return { data: null, error: (json as { error?: string }).error || `Request failed (${response.status})` };
    }
    return { data: json as T, error: null };
  } catch {
    return { data: null, error: 'Network error. Please check your connection and try again.' };
  }
}
