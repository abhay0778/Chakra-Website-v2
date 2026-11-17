import { Trophy } from 'lucide-react';
import type { Achievement } from '@/data/achievements';

export default function AchievementCard({ entry }: { entry: Achievement }) {
  const featured = entry.featured || /winner|victory|1st|1st place|first place|champion|podium/i.test(`${entry.position ?? ''} ${entry.title}`);
  const images = entry.images ?? (entry.image ? [entry.image] : []);
  return (
    <article className={`relative overflow-hidden border bg-white/[0.02] p-5 transition-colors sm:p-7 ${featured ? 'border-chakra-crimson/40 md:col-span-2' : 'border-white/10 hover:border-chakra-crimson/30'}`}>
      {featured && <div className="absolute inset-y-0 left-0 w-1 bg-chakra-crimson" />}
      <div className="flex items-start justify-between gap-5">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[.2em] text-chakra-crimson">{entry.category ?? 'Competition Achievement'}</p>
          <h2 className="mt-3 font-display text-xl font-semibold text-chakra-white sm:text-2xl">{entry.title}</h2>
          <p className="mt-2 text-sm text-chakra-silver-2">{entry.competition}</p>
        </div>
        <Trophy aria-hidden="true" size={featured ? 26 : 20} className="shrink-0 text-chakra-crimson" />
      </div>
      {entry.position && <p className={`mt-5 font-display font-bold uppercase tracking-wide text-white ${featured ? 'text-4xl text-chakra-crimson sm:text-6xl' : 'text-xl'}`}>{entry.position}</p>}
      <dl className="mt-5 grid gap-3 border-t border-white/10 pt-4 text-xs sm:grid-cols-2">
        {entry.date && <div><dt className="font-mono uppercase tracking-wider text-chakra-silver">Date / Year</dt><dd className="mt-1 text-chakra-silver-2">{entry.date}</dd></div>}
        {entry.organiser && <div><dt className="font-mono uppercase tracking-wider text-chakra-silver">Organiser</dt><dd className="mt-1 text-chakra-silver-2">{entry.organiser}</dd></div>}
        {entry.project && <div><dt className="font-mono uppercase tracking-wider text-chakra-silver">Project / Robot</dt><dd className="mt-1 text-chakra-silver-2">{entry.project}</dd></div>}
      </dl>
      <p className="mt-4 text-sm leading-6 text-chakra-silver-2">{entry.description}</p>
      {images.length > 0 && <div className={`mt-6 grid gap-3 ${images.length > 1 ? 'sm:grid-cols-2' : 'grid-cols-1'}`}>
        {images.map((image, index) => <a key={image} href={image} target="_blank" rel="noreferrer" className="group relative flex min-h-56 items-center justify-center overflow-hidden border border-white/10 bg-black/30 p-2 sm:min-h-72" aria-label={`View achievement photo ${index + 1} for ${entry.competition}`}>
          <img src={image} alt={`${entry.competition}, achievement photo ${index + 1}`} loading="lazy" className="absolute inset-0 h-full w-full object-contain transition-transform duration-500 group-hover:scale-[1.02]" />
          <span className="pointer-events-none absolute inset-2 border border-white/10 transition-colors group-hover:border-white/30" />
        </a>)}
      </div>}
    </article>
  );
}
