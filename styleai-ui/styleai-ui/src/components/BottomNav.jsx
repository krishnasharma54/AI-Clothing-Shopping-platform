import { House, Search, Sparkles, Heart, User } from 'lucide-react';
import Link from './Link';

const side = (to, Icon, label) => ({ to, Icon, label });
const left = [side('/', House, 'Home'), side('/explore', Search, 'Explore')];
const right = [side('/saved', Heart, 'Saved'), side('/profile', User, 'Atelier')];

function Item({ to, Icon, label, path }) {
  const active = path === to;
  return (
    <Link to={to} className={`flex w-16 flex-col items-center gap-1 ${active ? 'text-primary' : 'text-outline'}`}>
      <Icon size={22} strokeWidth={active ? 2.4 : 1.8} />
      <span className="label !text-[9px]">{label}</span>
    </Link>
  );
}

export default function BottomNav({ path }) {
  return (
    <nav className="fixed bottom-0 left-1/2 z-20 flex w-full max-w-[480px] -translate-x-1/2 items-end justify-around
                    rounded-t-3xl border-t border-outline-variant/50 bg-surface/90 px-2 pt-3 pb-[max(12px,env(safe-area-inset-bottom))] backdrop-blur-xl">
      {left.map(i => <Item key={i.to} {...i} path={path} />)}
      <Link to="/stylist" className="-mt-8 flex w-16 flex-col items-center gap-1">
        <span className={`grid size-14 place-items-center rounded-full bg-primary text-white shadow-lg shadow-black/25
                          ring-4 ring-surface ${path === '/stylist' ? 'bg-secondary' : ''}`}>
          <Sparkles size={24} />
        </span>
        <span className="label !text-[9px] text-primary">Stylist</span>
      </Link>
      {right.map(i => <Item key={i.to} {...i} path={path} />)}
    </nav>
  );
}
