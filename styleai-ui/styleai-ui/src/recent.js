// "Recently viewed" is kept in the browser (localStorage) - no backend needed.
const KEY = 'recent';
export const getRecent = () => JSON.parse(localStorage.getItem(KEY) || '[]');
export function addRecent(p) {
  const list = [{ id: p.id, name: p.name, imageUrl: p.imageUrl }, ...getRecent().filter(x => x.id !== p.id)];
  localStorage.setItem(KEY, JSON.stringify(list.slice(0, 10)));
}
export const clearRecent = () => localStorage.removeItem(KEY);
