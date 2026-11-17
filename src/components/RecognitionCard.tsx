import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { BadgeCheck } from 'lucide-react';
import type { Recognition } from '@/data/recognition';

export default function RecognitionCard({ entry }: { entry: Recognition }) {
  const imageArea = useRef<HTMLDivElement>(null);
  const imagesInView = useInView(imageArea, { once: true, margin: '-60px' });
  const images = entry.images ?? (entry.image ? [entry.image] : []);
  const paragraphs = entry.description.split('\n\n');

  return (
    <article className={`relative w-full overflow-hidden border bg-white/[0.02] ${entry.featured ? 'border-chakra-electric/25 md:col-span-full' : 'border-white/10'}`}>
      {entry.featured && <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-chakra-electric/70 to-transparent" />}
      <div>
        <div className="flex flex-col justify-center p-6 sm:p-9 lg:p-12">
          <div className="flex items-center gap-3">
            <BadgeCheck aria-hidden="true" size={17} className="shrink-0 text-chakra-electric" />
            <span className="font-mono text-[10px] uppercase tracking-[.2em] text-chakra-electric">{entry.category}</span>
          </div>
          <h2 className={`mt-6 font-display font-semibold leading-tight text-chakra-white ${entry.featured ? 'text-2xl sm:text-3xl lg:text-4xl' : 'text-xl'}`}>
            {entry.title}
          </h2>
          {entry.organisation && <p className="mt-3 font-mono text-[10px] uppercase tracking-[.12em] text-chakra-silver">{entry.organisation}</p>}
          {entry.date && <p className="mt-2 text-xs text-chakra-silver/70">{entry.date}</p>}
          <div className="mt-6 max-w-4xl space-y-4 text-sm leading-7 text-chakra-silver-2 sm:text-base">
            {paragraphs.map((paragraph, index) => <p key={`${entry.id}-paragraph-${index}`}>{paragraph}</p>)}
          </div>
        </div>
        {images.length > 0 && <div ref={imageArea} className={`grid gap-px bg-white/10 ${images.length > 1 ? 'sm:grid-cols-2' : 'grid-cols-1'}`}>
          {images.map((image, index) => (
            <motion.figure
              key={image}
              initial={{ opacity: 0, y: 18 }}
              animate={imagesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
              transition={{ duration: 0.55, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="group relative flex min-h-[300px] items-center justify-center overflow-hidden bg-[#08090c] sm:min-h-[380px] lg:min-h-[440px]"
            >
              <img
                src={image}
                alt={`${entry.title}, photograph ${index + 1}`}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-contain transition-transform duration-700 group-hover:scale-[1.015]"
              />
              <span className="pointer-events-none absolute inset-3 border border-white/10 transition-colors group-hover:border-white/25" />
            </motion.figure>
          ))}
        </div>}
      </div>
    </article>
  );
}
