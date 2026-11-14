import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Reveal, SplitText } from '@/components/Reveal';
import { divisions, Division } from '@/data/divisions';

interface DivisionsProps {
  onSelectDivision: (division: Division) => void;
}

export default function Divisions({ onSelectDivision }: DivisionsProps) {
  return (
    <section id="divisions" className="relative py-24 lg:py-32 overflow-hidden bg-chakra-black-2">
      {/* Background effects */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-chakra-electric/30 to-transparent" />
      <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-10" />
      <div className="absolute top-1/2 right-0 w-96 h-96 rounded-full bg-chakra-electric/5 blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 lg:px-8">
        {/* Header */}
        <Reveal className="mb-16">
          <span className="section-label">
            <span className="text-chakra-crimson">02</span> / Divisions
          </span>
          <h2 className="heading-xl mt-6">
            <SplitText text="Three Divisions," />
            <br />
            <SplitText text="One Mission" delay={0.15} className="text-chakra-electric" />
          </h2>
          <p className="text-body-lg mt-6 max-w-2xl">
            Team Chakra Robotics operates through three specialised engineering divisions, each focused
            on a distinct domain of robotics and AI. Together, they cover the full spectrum — from
            research and invention to competitive robotics and applied AI.
          </p>
        </Reveal>

        {/* Division cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {divisions.map((div, i) => (
            <Reveal key={div.id} delay={i * 0.15} y={60}>
              <motion.button
                onClick={() => onSelectDivision(div)}
                className="group relative w-full text-left overflow-hidden rounded-sm h-[480px] lg:h-[520px]"
                whileHover={{ y: -6 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              >
                {/* Background image */}
                <div className="absolute inset-0">
                  <img
                    src={div.image}
                    alt={div.fullName}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                </div>

                {/* Gradient overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-chakra-black via-chakra-black/60 to-chakra-black/20" />
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `linear-gradient(to top, ${div.glowRgba}, transparent 70%)` }}
                />

                {/* Border */}
                <div className="absolute inset-0 border border-white/[0.06] group-hover:border-white/[0.15] transition-colors duration-500" />

                {/* HUD corner */}
                <div
                  className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 opacity-40 group-hover:opacity-80 transition-opacity"
                  style={{ borderColor: div.accentColorHex }}
                />

                {/* Content */}
                <div className="relative h-full flex flex-col justify-end p-8">
                  {/* Abbreviation badge */}
                  <div className="mb-auto">
                    <div
                      className="inline-flex items-center justify-center w-14 h-14 rounded-sm font-display font-bold text-lg"
                      style={{
                        color: div.accentColorHex,
                        background: `${div.glowRgba}`,
                        border: `1px solid ${div.accentColorHex}40`,
                        boxShadow: `0 0 20px ${div.glowRgba}`,
                      }}
                    >
                      {div.abbreviation}
                    </div>
                  </div>

                  {/* Title block */}
                  <div className="mb-4">
                    <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-chakra-silver mb-2">
                      Division {String(i + 1).padStart(2, '0')}
                    </p>
                    <h3 className="font-display font-bold text-2xl lg:text-3xl text-chakra-white mb-1">
                      {div.abbreviation}
                    </h3>
                    <p className="font-display text-sm text-chakra-silver-2 mb-3">
                      {div.fullName}
                    </p>
                  </div>

                  <p className="text-sm text-chakra-silver leading-relaxed mb-5 line-clamp-3">
                    {div.shortDescription}
                  </p>

                  {/* CTA */}
                  <div
                    className="flex items-center gap-2 font-display text-sm font-medium uppercase tracking-wider transition-colors"
                    style={{ color: div.accentColorHex }}
                  >
                    <span>Explore Division</span>
                    <ArrowRight
                      size={16}
                      className="group-hover:translate-x-2 transition-transform duration-300"
                    />
                  </div>
                </div>
              </motion.button>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
