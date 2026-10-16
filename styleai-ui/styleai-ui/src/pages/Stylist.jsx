import { Sparkles } from 'lucide-react';

// Placeholder until the backend AI endpoints exist:
//   POST /api/outfits/generate   and   POST /api/stylist/chat
export default function Stylist() {
  return (
    <>
      <h1 className="font-headline text-[34px] font-semibold tracking-tight">Stylist</h1>
      <section className="rounded-3xl bg-gradient-to-br from-primary-container via-inverse-surface to-secondary-container/70 p-6 text-white">
        <span className="label flex w-fit items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5"><Sparkles size={12} /> Coming next</span>
        <h2 className="mt-5 font-headline text-2xl font-medium">Your AI stylist</h2>
        <p className="mt-2 text-sm text-primary-fixed-dim">Outfit generation and stylist chat will appear here once the AI endpoints are added to the backend.</p>
      </section>
    </>
  );
}
