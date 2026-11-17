import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ArrowUpRight, Cpu } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Project } from '@/data/projects';

export default function ProjectArena({ projects }: { projects: Project[] }) {
  const [index, setIndex] = useState(0);
  const touchStart = useRef<number | null>(null);
  const project = projects[index];
  const previous = useCallback(() => setIndex((current) => (current - 1 + projects.length) % projects.length), [projects.length]);
  const next = useCallback(() => setIndex((current) => (current + 1) % projects.length), [projects.length]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.target instanceof HTMLElement && ['INPUT', 'TEXTAREA', 'SELECT'].includes(event.target.tagName)) return;
      if (event.key === 'ArrowLeft') previous();
      if (event.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [next, previous]);

  if (!project) return null;

  return (
    <div>
      <div className="relative overflow-hidden border border-white/10 bg-[#090a0d]" onTouchStart={(event) => { touchStart.current = event.touches[0]?.clientX ?? null; }} onTouchEnd={(event) => {
        const end = event.changedTouches[0]?.clientX;
        if (touchStart.current !== null && end !== undefined && Math.abs(end - touchStart.current) > 48) {
          if (end < touchStart.current) next();
          else previous();
        }
        touchStart.current = null;
      }}>
        <AnimatePresence mode="wait">
          <motion.div key={project.id} initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -18 }} transition={{ duration: 0.24 }} className="grid min-h-[360px] lg:min-h-[470px] lg:grid-cols-[1.15fr_.85fr]">
            <div className="relative flex min-h-[250px] items-center justify-center overflow-hidden border-b border-white/10 lg:border-b-0 lg:border-r">
              {project.images?.[0] ? <img src={project.images[0]} alt={`${project.name} authentic project view`} className="absolute inset-0 h-full w-full object-contain" loading="lazy" /> : <div className="absolute inset-0 grid-pattern" />}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(14,165,233,.12),transparent_58%)]" />
              {!project.images?.[0] && <Cpu className="relative text-white/20" size={72} strokeWidth={0.8} aria-hidden="true" />}
              <span className="absolute left-4 top-4 font-mono text-[9px] uppercase tracking-[.2em] text-chakra-silver">Arena / {project.division}</span>
              <span className="absolute bottom-4 right-4 font-mono text-[9px] text-chakra-silver/70">{String(index + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}</span>
            </div>
            <div className="flex flex-col justify-center p-6 sm:p-9 lg:p-12">
              <p className="font-mono text-[10px] uppercase tracking-[.25em] text-chakra-electric">{project.division} / Project</p>
              <h2 className="mt-4 font-display text-3xl font-semibold leading-tight text-chakra-white">{project.name}</h2>
              <p className="mt-4 text-sm leading-6 text-chakra-silver-2">{project.description}</p>
              {project.technologies?.length ? <div className="mt-6 flex flex-wrap gap-2">{project.technologies.map((technology) => <span key={technology} className="border border-white/10 px-2.5 py-1.5 font-mono text-[9px] text-chakra-silver-2">{technology}</span>)}</div> : null}
              <Link to={`/projects/${project.slug}`} className="mt-8 inline-flex w-fit items-center gap-2 font-mono text-[10px] uppercase tracking-[.18em] text-white hover:text-chakra-electric">View project details <ArrowUpRight size={14} /></Link>
            </div>
          </motion.div>
        </AnimatePresence>
        {projects.length > 1 && <>
          <button type="button" onClick={previous} aria-label="Previous project" className="absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center border border-white/15 bg-black/70 text-white hover:border-chakra-electric"><ArrowLeft size={17} /></button>
          <button type="button" onClick={next} aria-label="Next project" className="absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center border border-white/15 bg-black/70 text-white hover:border-chakra-electric"><ArrowRight size={17} /></button>
        </>}
      </div>
      {projects.length > 1 && <div className="mt-5 flex items-center gap-2" aria-label="Project navigation indicators">{projects.map((entry, dot) => <button key={entry.id} type="button" onClick={() => setIndex(dot)} aria-label={`Show project ${dot + 1}: ${entry.name}`} aria-current={index === dot ? 'true' : undefined} className={`h-1 transition-all ${index === dot ? 'w-10 bg-chakra-electric' : 'w-5 bg-white/20 hover:bg-white/50'}`} />)}</div>}
      {projects.length > 1 && <div className="mt-4 h-px bg-white/10"><motion.div className="h-px bg-chakra-electric" animate={{ width: `${((index + 1) / projects.length) * 100}%` }} /></div>}
    </div>
  );
}
