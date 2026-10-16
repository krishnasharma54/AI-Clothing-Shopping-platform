import { useEffect, useState, useCallback } from 'react';
import { api } from './api';
import { AppContext } from './app-context';

export default function AppProvider({ children }) {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user') || 'null'));
  const [favIds, setFavIds] = useState(new Set());

  useEffect(() => {
    if (!user) return;
    api('/api/favorites').then(list => setFavIds(new Set(list.map(p => p.id)))).catch(() => {});
  }, [user]);

  const saveSession = (res) => {
    localStorage.setItem('token', res.token);
    localStorage.setItem('user', JSON.stringify(res));
    setUser(res);
  };

  const login = async (email, password) =>
    saveSession(await api('/api/auth/login', { method: 'POST', body: { email, password } }));

  const register = async (name, email, password) =>
    saveSession(await api('/api/auth/register', { method: 'POST', body: { name, email, password } }));

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setFavIds(new Set());
    setUser(null);
  };

  const toggleFav = useCallback(async (id) => {
    const isFav = favIds.has(id);
    await api(`/api/favorites/${id}`, { method: isFav ? 'DELETE' : 'POST' });
    setFavIds(prev => {
      const next = new Set(prev);
      if (isFav) next.delete(id); else next.add(id);
      return next;
    });
  }, [favIds]);

  return (
    <AppContext.Provider value={{ user, login, register, logout, favIds, toggleFav }}>
      {children}
    </AppContext.Provider>
  );
}
