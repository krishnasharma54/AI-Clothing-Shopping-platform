import { ShoppingBag } from 'lucide-react';
import { useApp } from '../app-context';
import Link from './Link';

const eff = (p) => p.discountPrice ?? p.price;

// A bundle of 3 products. "Bundle & Save" saves all of them to your favorites.
export default function CompleteTheLook({ items }) {
  const { favIds, toggleFav } = useApp();
  if (items.length < 3) return null;

  const total = items.reduce((s, p) => s + eff(p), 0);
  const bundle = Math.round(total * 0.85);

  const saveAll = () => items.filter(p => !favIds.has(p.id)).forEach(p => toggleFav(p.id));

  return (
    <section className="rounded-3xl bg-surface-container-lowest p-5 shadow-sm shadow-secondary/10">
      <div className="flex items-start justify-between">
        <div>
          <div className="label text-secondary">Complete the look</div>
          <h2 className="mt-1 font-headline text-xl leading-tight font-semibold">The Minimalist Trio</h2>
        </div>
        <span className="label rounded-full bg-secondary-fixed px-3 py-1 text-on-secondary-fixed-variant">Save 15%</span>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2 rounded-2xl bg-surface-container-low p-2">
        {items.map(p => (
          <Link key={p.id} to={`/product/${p.id}`} className="text-center">
            <div className="aspect-square overflow-hidden rounded-xl bg-surface-container-high">
              <img src={p.imageUrl} alt={p.name} className="size-full object-cover" />
            </div>
            <div className="mt-1 truncate text-[11px] font-medium">{p.name}</div>
            <div className="text-[11px] text-on-surface-variant">${eff(p)}</div>
          </Link>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between gap-3">
        <div>
          <div className="text-xs text-on-surface-variant">Combined value</div>
          <div className="flex items-baseline gap-2"><b className="font-headline text-2xl">${bundle}</b><s className="text-xs text-outline">${total}</s></div>
        </div>
        <button onClick={saveAll} className="flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white">
          <ShoppingBag size={16} /> Bundle &amp; Save 15%
        </button>
      </div>
    </section>
  );
}
