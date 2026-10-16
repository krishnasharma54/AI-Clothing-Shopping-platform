import { useEffect, useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { api } from '../api';
import ProductCard from '../components/ProductCard';

export default function Explore({ query }) {
  const [q, setQ] = useState(query.get('q') || '');
  const [category, setCategory] = useState(query.get('category') || '');
  const [maxPrice, setMaxPrice] = useState(400);       // 400 = "any"
  const [result, setResult] = useState({ key: null, data: [] });
  const [cats, setCats] = useState([]);

  useEffect(() => { api('/api/categories').then(setCats).catch(console.error); }, []);

  const key = useMemo(() => {
    const qs = new URLSearchParams();
    if (q) qs.set('q', q);
    if (category) qs.set('category', category);
    if (maxPrice < 400) qs.set('maxPrice', maxPrice);
    return qs.toString();
  }, [q, category, maxPrice]);

  useEffect(() => {
    api('/api/products?' + key).then(data => setResult({ key, data })).catch(console.error);
  }, [key]);

  const loading = result.key !== key;
  const products = result.data;

  const chip = (active) => `rounded-full px-5 py-2.5 text-sm font-medium whitespace-nowrap ${active ? 'bg-primary text-white' : 'bg-surface-container-high text-on-surface-variant'}`;

  return (
    <>
      <h1 className="font-headline text-[34px] font-semibold tracking-tight">Explore</h1>

      <div className="-mt-3 flex items-center gap-3 rounded-full border border-outline-variant/70 bg-white px-4 py-3 shadow-sm">
        <Search size={18} className="text-outline" />
        <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search…" className="flex-1 bg-transparent text-sm outline-none" />
      </div>

      <div className="hide-scroll -mx-5 -mt-3 flex gap-2 overflow-x-auto px-5">
        <button onClick={() => setCategory('')} className={chip(!category)}>All</button>
        {cats.map(c => (
          <button key={c.id} onClick={() => setCategory(String(c.id))} className={chip(String(c.id) === category)}>{c.name}</button>
        ))}
      </div>

      <label className="-mt-3 flex flex-col gap-2 text-sm">
        <span>Max price: <b>{maxPrice >= 400 ? 'Any' : `$${maxPrice}`}</b></span>
        <input type="range" min="100" max="400" step="10" value={maxPrice} onChange={e => setMaxPrice(Number(e.target.value))}
               className="accent-secondary" />
      </label>

      {loading ? <p className="py-10 text-center text-outline">Loading…</p>
        : products.length === 0 ? <p className="py-10 text-center text-outline">No pieces found.</p>
        : <div className="grid grid-cols-2 gap-3">{products.map(p => <ProductCard key={p.id} p={p} />)}</div>}
    </>
  );
}
