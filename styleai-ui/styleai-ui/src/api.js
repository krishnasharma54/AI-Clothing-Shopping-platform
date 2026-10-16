// Vite proxies /api -> http://localhost:8080 (see vite.config.js), so paths stay relative.
export async function api(path, { method = 'GET', body } = {}) {
  const token = localStorage.getItem('token');
  const res = await fetch(path, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const text = await res.text();
  const data = text ? JSON.parse(text) : null;

  if (!res.ok) {
    if (res.status === 401 && token) {       // expired token -> back to login
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.hash = '/';
      window.location.reload();
    }
    const msg = data?.errors ? Object.values(data.errors).join(', ') : data?.message;
    throw new Error(msg || 'Request failed');
  }
  return data;
}
