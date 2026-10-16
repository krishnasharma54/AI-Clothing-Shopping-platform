import { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { useApp } from '../app-context';
import Link from '../components/Link';

const field = 'w-full rounded-xl border border-outline-variant bg-white px-4 py-3.5 outline-none focus:border-secondary';

export default function Auth({ mode }) {
  const isLogin = mode === 'login';
  const { login, register } = useApp();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setError(''); setBusy(true);
    try {
      if (isLogin) await login(form.email, form.password);
      else await register(form.name, form.email, form.password);
    } catch (err) { setError(err.message); }
    finally { setBusy(false); }
  };

  return (
    <div className="grid min-h-screen place-items-center bg-gradient-to-b from-surface to-secondary-fixed/50 p-5">
      <div className="w-full max-w-sm rounded-3xl bg-surface-container-lowest p-8 shadow-xl shadow-secondary/10">
        <div className="mb-6 flex items-center gap-3">
          <span className="grid size-11 place-items-center rounded-xl bg-primary text-white"><Sparkles size={20} /></span>
          <span className="font-headline text-3xl font-semibold tracking-tight">StyleAI</span>
        </div>
        <p className="mb-6 text-on-surface-variant">{isLogin ? 'Welcome back to your atelier.' : 'Create your personal style profile.'}</p>

        <form onSubmit={submit} className="flex flex-col gap-3">
          {!isLogin && <input className={field} placeholder="Full name" value={form.name} onChange={set('name')} required />}
          <input className={field} type="email" placeholder="Email" value={form.email} onChange={set('email')} required />
          <input className={field} type="password" placeholder="Password" value={form.password} onChange={set('password')} required minLength={6} />
          {error && <p className="text-sm text-error">{error}</p>}
          <button disabled={busy} className="mt-1 rounded-full bg-primary py-3.5 font-semibold text-white disabled:opacity-60">
            {busy ? 'Please wait…' : isLogin ? 'Sign in' : 'Create account'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-on-surface-variant">
          {isLogin ? <>New here? <Link to="/register" className="font-semibold text-secondary">Create an account</Link></>
                   : <>Already a member? <Link to="/login" className="font-semibold text-secondary">Sign in</Link></>}
        </p>
      </div>
    </div>
  );
}
