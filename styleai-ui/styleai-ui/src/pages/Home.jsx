import { useEffect, useState } from 'react';
import { Bell, Camera, SlidersHorizontal, Search, Sparkles, ScanLine, ArrowRight, Sparkle } from 'lucide-react';
import { api } from '../api';
import { useApp } from '../app-context';
import { go } from '../router';
import { getRecent, clearRecent } from '../recent';
import Link from '../components/Link';
import ProductCard from '../components/ProductCard';
import CompleteTheLook from '../components/CompleteTheLook';

export default function Home() {
  const { user } = useApp();
  const [q, setQ] = useState('');
  const [rec, setRec] = useState([]);
  const [trend, setTrend] = useState([]);
  const [cats, setCats] = useState([]);
  const [aesthetic, setAesthetic] = useState('Minimal Chic');
  const [recent, setRecent] = useState(getRecent);

  useEffect(() => {
    Promise.all([api('/api/products/recommended'), api('/api/products/trending'), api('/api/categories'), api('/api/users/me')])
      .then(([a, b, c, me]) => {
        setRec(a); setTrend(b); setCats(c);
        if (me.styleProfile?.aesthetic) setAesthetic(me.styleProfile.aesthetic);
      })
      .catch(console.error);
  }, []);

  const h = new Date().getHours();
  const greeting = h < 12 ? 'Good morning' : h < 18 ? 'Good afternoon' : 'Good evening';

  return (
    <>
      {/* top bar */}
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="grid size-9 place-items-center rounded-xl bg-primary text-white"><Sparkle size={16} /></span>
          <span className="font-headline text-xl font-semibold">StyleAI</span>
        </div>
        <div className="flex items-center gap-3">
          <button className="relative text-primary" aria-label="Notifications">
            <Bell size={22} /><span className="absolute -top-0.5 -right-0.5 size-2 rounded-full bg-secondary" />
          </button>
          <Link to="/profile" className="grid size-9 place-items-center rounded-full bg-secondary-fixed font-semibold text-on-secondary-fixed-variant">
            {user.name[0]}
          </Link>
        </div>
      </header>

      {/* greeting */}
      <div className="-mt-3">
        <div className="label text-secondary">Atelier Wardrobe</div>
        <h1 className="mt-1 font-headline text-[34px] leading-[1.1] font-semibold tracking-tight">{greeting}, {user.name.split(' ')[0]}</h1>
        <p className="mt-2 text-sm text-on-surface-variant">Curated for your <b className="text-on-surface">{aesthetic}</b> aesthetic &amp; seasonal palette.</p>
      </div>

      {/* search */}
      <form onSubmit={e => { e.preventDefault(); go(`/explore?q=${encodeURIComponent(q)}`); }}
            className="-mt-3 flex items-center gap-3 rounded-full border border-outline-variant/70 bg-white px-4 py-3 shadow-sm">
        <Search size={18} className="text-outline" />
        <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search couture, fabrics, designers…"
               className="min-w-0 flex-1 bg-transparent text-sm outline-none" />
        <Camera size={18} className="text-primary" />
        <Link to="/explore" aria-label="Filters" className="grid size-8 place-items-center rounded-full bg-surface-container"><SlidersHorizontal size={15} /></Link>
      </form>

      {/* AI concierge */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-container via-inverse-surface to-secondary-container/70 p-5 text-white">
        <div className="flex items-center justify-between">
          <span className="label flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5"><Sparkles size={12} /> AI Concierge Ready</span>
        </div>
        <h2 className="mt-5 font-headline text-2xl font-medium">Generate today's outfit</h2>
        <p className="mt-1 max-w-[88%] text-sm text-primary-fixed-dim">Styled around the weather, your schedule and your personal taste.</p>
        <div className="mt-5 flex gap-3">
          <Link to="/stylist" className="flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-primary"><Sparkles size={15} /> Consult Stylist</Link>
          <Link to="/stylist" className="flex items-center gap-2 rounded-full bg-white/15 px-5 py-3 text-sm font-semibold">Drape 3D <ScanLine size={15} /></Link>
        </div>
      </section>

      {/* recommended */}
      <section>
        <div className="label text-secondary">Handpicked</div>
        <div className="mt-1 flex items-end justify-between">
          <h2 className="font-headline text-[26px] font-semibold">Recommended For You</h2>
          <Link to="/explore" className="flex items-center gap-1 pb-1 text-xs font-semibold">Curated ({rec.length}) <ArrowRight size={13} /></Link>
        </div>
        <div className="hide-scroll -mx-5 mt-4 flex snap-x gap-4 overflow-x-auto px-5">
          {rec.map(p => <ProductCard key={p.id} p={p} wide />)}
        </div>
      </section>

      {/* collections */}
      <section>
        <div className="label text-on-surface-variant">Collections</div>
        <div className="hide-scroll -mx-5 mt-3 flex gap-2 overflow-x-auto px-5">
          <Link to="/explore" className="rounded-full bg-primary px-5 py-2.5 text-sm font-medium whitespace-nowrap text-white">All</Link>
          {cats.map(c => (
            <Link key={c.id} to={`/explore?category=${c.id}`}
                  className="rounded-full bg-surface-container-high px-5 py-2.5 text-sm font-medium whitespace-nowrap text-on-surface-variant">{c.name}</Link>
          ))}
        </div>
      </section>

      <CompleteTheLook items={rec.slice(0, 3)} />

      {/* trending */}
      <section>
        <div className="label text-secondary">Current Mood</div>
        <div className="mt-1 flex items-end justify-between">
          <h2 className="font-headline text-[26px] font-semibold">Trending Now</h2>
          <span className="pb-1 text-xs text-on-surface-variant">{trend.length} Items</span>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3">
          {trend.slice(0, 6).map(p => <ProductCard key={p.id} p={p} />)}
        </div>
      </section>

      {/* recently viewed */}
      {recent.length > 0 && (
        <section>
          <div className="flex items-center justify-between">
            <div className="label text-on-surface-variant">Recently Viewed</div>
            <button onClick={() => { clearRecent(); setRecent([]); }} className="label text-on-surface-variant">Clear</button>
          </div>
          <div className="hide-scroll mt-3 flex gap-3 overflow-x-auto">
            {recent.map(r => (
              <Link key={r.id} to={`/product/${r.id}`} className="size-14 shrink-0 overflow-hidden rounded-xl bg-surface-container-high">
                <img src={r.imageUrl} alt={r.name} className="size-full object-cover" />
              </Link>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
