import { useEffect } from 'react';
import { useApp } from './app-context';
import { useRoute, go } from './router';
import BottomNav from './components/BottomNav';
import Auth from './pages/Auth';
import Home from './pages/Home';
import Explore from './pages/Explore';
import ProductDetail from './pages/ProductDetail';
import Saved from './pages/Saved';
import Stylist from './pages/Stylist';
import Profile from './pages/Profile';

export default function App() {
  const { user } = useApp();
  const { path, query } = useRoute();

  // logged-in users should never sit on the login/register pages
  useEffect(() => {
    if (user && (path === '/login' || path === '/register')) go('/');
  }, [user, path]);

  if (!user) return <Auth mode={path === '/register' ? 'register' : 'login'} />;

  let page;
  if (path === '/explore') page = <Explore key={query.toString()} query={query} />;
  else if (path.startsWith('/product/')) page = <ProductDetail key={path} id={path.split('/')[2]} />;
  else if (path === '/saved') page = <Saved />;
  else if (path === '/stylist') page = <Stylist />;
  else if (path === '/profile') page = <Profile />;
  else page = <Home />;

  return (
    <div className="mx-auto min-h-screen w-full max-w-[480px] bg-surface shadow-[0_0_60px_rgba(0,0,0,.06)]">
      <main className="flex flex-col gap-8 px-5 pt-5 pb-32">{page}</main>
      <BottomNav path={path} />
    </div>
  );
}
