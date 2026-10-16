import { useEffect, useState } from 'react';
import { LogOut } from 'lucide-react';
import { api } from '../api';
import { useApp } from '../app-context';

const field = 'w-full rounded-xl border border-outline-variant bg-white px-4 py-3.5 outline-none focus:border-secondary';

export default function Profile() {
  const { logout } = useApp();
  const [me, setMe] = useState(null);
  const [form, setForm] = useState({ aesthetic: '', preferredColors: '', size: '', budget: '' });
  const [msg, setMsg] = useState('');

  useEffect(() => {
    api('/api/users/me').then(u => {
      setMe(u);
      if (u.styleProfile) setForm({
        aesthetic: u.styleProfile.aesthetic || '', preferredColors: u.styleProfile.preferredColors || '',
        size: u.styleProfile.size || '', budget: u.styleProfile.budget ?? '',
      });
    }).catch(console.error);
  }, []);

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const save = async (e) => {
    e.preventDefault();
    setMsg('');
    try {
      await api('/api/users/me/style-profile', { method: 'PUT', body: { ...form, budget: form.budget === '' ? null : Number(form.budget) } });
      setMsg('Style profile saved ✓');
    } catch (err) { setMsg(err.message); }
  };

  if (!me) return <p className="py-10 text-center text-outline">Loading…</p>;

  return (
    <>
      <div>
        <div className="label text-secondary">Your Atelier</div>
        <h1 className="mt-1 font-headline text-[34px] font-semibold tracking-tight">Profile</h1>
      </div>

      <div className="-mt-3 flex items-center gap-4">
        <span className="grid size-16 place-items-center rounded-full bg-primary font-headline text-2xl text-white">{me.name[0]}</span>
        <div><div className="font-semibold">{me.name}</div><div className="text-sm text-on-surface-variant">{me.email}</div></div>
      </div>

      <form onSubmit={save} className="flex flex-col gap-3">
        <h2 className="font-headline text-xl font-medium">My style profile</h2>
        <input className={field} placeholder="Aesthetic (e.g. Minimal Chic)" value={form.aesthetic} onChange={set('aesthetic')} />
        <input className={field} placeholder="Preferred colors (black, beige…)" value={form.preferredColors} onChange={set('preferredColors')} />
        <input className={field} placeholder="Size (S, M, L…)" value={form.size} onChange={set('size')} />
        <input className={field} type="number" placeholder="Budget per item ($)" value={form.budget} onChange={set('budget')} />
        {msg && <p className="text-sm text-on-surface-variant">{msg}</p>}
        <button className="rounded-full bg-primary py-3.5 font-semibold text-white">Save profile</button>
      </form>

      <button onClick={logout} className="flex items-center justify-center gap-2 rounded-full border border-outline-variant py-3.5 font-semibold">
        <LogOut size={17} /> Sign out
      </button>
    </>
  );
}
