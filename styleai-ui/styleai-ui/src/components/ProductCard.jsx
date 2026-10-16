import { Heart, Star } from 'lucide-react';
import { useApp } from '../app-context';
import Link from './Link';

export default function ProductCard({ p, wide = false }) {
  const { favIds, toggleFav } = useApp();
  const fav = favIds.has(p.id);

  return (
    <article className={`relative overflow-hidden rounded-2xl bg-surface-container-lowest shadow-sm shadow-secondary/10
                         ${wide ? 'w-[78%] shrink-0 snap-start' : ''}`}>
      <Link to={`/product/${p.id}`} className="relative block aspect-[3/4] bg-surface-container-high">
        <img src={p.imageUrl} alt={p.name} loading="lazy" className="size-full object-cover" />
        {p.discountPercent > 0 && (
          <span className="label absolute top-3 left-3 rounded-md bg-primary px-2 py-1 text-white">-{p.discountPercent}%</span>
        )}
        {p.aiPick && (
          <span className="label absolute top-3 left-3 rounded-md bg-secondary px-2 py-1 text-white">AI Pick</span>
        )}
        <span className="absolute bottom-3 left-3 flex items-center gap-1 rounded-full bg-white/90 px-2 py-1 text-xs font-semibold backdrop-blur">
          <Star size={12} className="fill-on-tertiary-container text-on-tertiary-container" />{p.rating.toFixed(1)}
        </span>
      </Link>

      <button onClick={() => toggleFav(p.id)} aria-label="Save"
              className={`absolute top-3 right-3 grid size-9 place-items-center rounded-full bg-white/90 backdrop-blur ${fav ? 'text-error' : 'text-primary'}`}>
        <Heart size={18} className={fav ? 'fill-current' : ''} />
      </button>

      <div className="p-3">
        <div className="label text-on-surface-variant">{p.brand}</div>
        <Link to={`/product/${p.id}`} className="mt-0.5 block text-[15px] leading-snug font-semibold">{p.name}</Link>
        <div className="mt-1 flex items-baseline gap-2">
          <b className="text-base">${p.discountPrice ?? p.price}</b>
          {p.discountPrice && <s className="text-xs text-outline">${p.price}</s>}
        </div>
      </div>
    </article>
  );
}
