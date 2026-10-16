import { useEffect, useState } from 'react';
import { ArrowLeft, Heart, Sparkles, Star } from 'lucide-react';
import { api } from '../api';
import { useApp } from '../app-context';
import { addRecent } from '../recent';

export default function ProductDetail({ id }) {
  const { favIds, toggleFav } = useApp();
  const [p, setP] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    api(`/api/products/${id}`).then(data => { setP(data); addRecent(data); }).catch(e => setError(e.message));
  }, [id]);

  if (error) return <p className="py-10 text-center text-error">{error}</p>;
  if (!p) return <p className="py-10 text-center text-outline">Loading…</p>;
  const fav = favIds.has(p.id);

  return (
    <>
      <button onClick={() => history.back()} className="flex items-center gap-1 self-start text-sm text-on-surface-variant">
        <ArrowLeft size={18} /> Back
      </button>

      <div className="-mt-3 aspect-[3/4] overflow-hidden rounded-3xl bg-surface-container-high">
        <img src={p.imageUrl} alt={p.name} className="size-full object-cover" />
      </div>

      <div className="-mt-3">
        <div className="label text-secondary">{p.brand} · {p.category}</div>
        <h1 className="mt-1 font-headline text-3xl leading-tight font-semibold">{p.name}</h1>
        <div className="mt-3 flex items-center gap-3">
          <b className="text-2xl">${p.discountPrice ?? p.price}</b>
          {p.discountPrice && <s className="text-outline">${p.price}</s>}
          {p.discountPercent > 0 && <span className="label rounded-md bg-error-container px-2 py-1 text-on-error-container">-{p.discountPercent}%</span>}
          <span className="ml-auto flex items-center gap-1 text-sm"><Star size={15} className="fill-on-tertiary-container text-on-tertiary-container" />{p.rating.toFixed(1)}</span>
        </div>
      </div>

      {p.aiPick && (
        <div className="-mt-3 flex items-center gap-2 rounded-2xl bg-secondary-fixed px-4 py-3 text-sm font-semibold text-on-secondary-fixed-variant">
          <Sparkles size={16} /> Picked by your AI stylist
        </div>
      )}
      <p className="-mt-3 text-on-surface-variant">{p.description}</p>

      <button onClick={() => toggleFav(p.id)}
              className="flex items-center justify-center gap-2 rounded-full bg-primary py-4 font-semibold text-white">
        <Heart size={18} className={fav ? 'fill-current' : ''} /> {fav ? 'Saved to your collection' : 'Save to collection'}
      </button>
    </>
  );
}
