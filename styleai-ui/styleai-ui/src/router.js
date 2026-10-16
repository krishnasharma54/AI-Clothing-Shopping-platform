import { useEffect, useState } from 'react';

const parse = () => {
  const h = window.location.hash.slice(1) || '/';
  const [path, qs = ''] = h.split('?');
  return { path, query: new URLSearchParams(qs) };
};

export function useRoute() {
  const [route, setRoute] = useState(parse);
  useEffect(() => {
    const onChange = () => setRoute(parse());
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);
  return route;
}

export const go = (to) => { window.location.hash = to; };
