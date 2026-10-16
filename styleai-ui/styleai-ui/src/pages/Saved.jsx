import { useEffect, useState } from 'react';
import { api } from '../api';
import { useApp } from '../app-context';
import ProductCard from '../components/ProductCard';

export default function Saved() {
  const { favIds } = useApp();
  const [items, setItems] = useState(null);

  useEffect(() => { api('/api/favorites').then(setItems).catch(console.error); }, [favIds]);

  return (
    <>
      <div>
        <div className="label text-secondary">Your Collection</div>
        <h1 className="mt-1 font-headline text-[34px] font-semibold tracking-tight">Saved</h1>
      </div>
      {!items ? <p className="py-10 text-center text-outline">Loading…</p>
        : items.length === 0 ? <p className="py-10 text-center text-outline">Nothing saved yet. Tap the heart on any piece.</p>
        : <div className="grid grid-cols-2 gap-3">{items.map(p => <ProductCard key={p.id} p={p} />)}</div>}
    </>
  );
}
