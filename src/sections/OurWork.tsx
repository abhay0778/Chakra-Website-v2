import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
  Cpu,
  Wrench,
  Eye,
  Rocket,
  Layers,
  Zap,
  Lightbulb,
  Brain,
} from 'lucide-react';
import { Reveal, SplitText } from '@/components/Reveal';
import { divisions, DivisionId } from '@/data/divisions';
import { projects, Project } from '@/data/projects';

interface OurWorkProps {
  onSelectProject: (project: Project) => void;
}

const divisionAccents: Record<DivisionId, { hex: string; glow: string }> = {
  IPD: { hex: '#0ea5e9', glow: 'rgba(14, 165, 233, 0.3)' },
  CRD: { hex: '#dc1f2e', glow: 'rgba(220, 31, 46, 0.35)' },
  ASD: { hex: '#0284c7', glow: 'rgba(2, 132, 199, 0.3)' },
};

const categoryIcons: Record<string, typeof Cpu> = {
  'Competitive Robotics': Wrench,
  'Mechanical Modelling': Wrench,
  'Robot Development': Cpu,
  'Research & Development': Lightbulb,
  'Product Development': Rocket,
  'Innovation & Prototyping': Lightbulb,
  'Artificial Intelligence': Brain,
  'Robotics Software': Cpu,
  'Autonomous Systems': Rocket,
};

export default function OurWork({ onSelectProject }: OurWorkProps) {
  const [activeDivision, setActiveDivision] = useState<DivisionId>('IPD');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const divisionProjects = projects.filter((p) => p.division === activeDivision);
  const currentProject = divisionProjects[currentIndex];
  const accent = divisionAccents[activeDivision];

  // Reset index when division changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [activeDivision]);

  const next = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % divisionProjects.length);
  }, [divisionProjects.length]);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + divisionProjects.length) % divisionProjects.length);
  }, [divisionProjects.length]);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const section = document.getElementById('our-work');
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;
      if (!inView) return;
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [next, prev]);

  if (!currentProject) return null;

  const CategoryIcon = categoryIcons[currentProject.category] || Cpu;

  return (
    <section id="our-work" className="relative py-24 lg:py-32 overflow-hidden bg-chakra-black">
      {/* Background */}
      <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-[0.07]" />
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full blur-[150px] pointer-events-none transition-colors duration-700"
        style={{ background: `${accent.glow}` }}
      />

      <div className="relative max-w-7xl mx-auto px-4 lg:px-8">
        {/* Header */}
        <Reveal className="mb-12">
          <span className="section-label">
            <span className="text-chakra-crimson">03</span> / Robotics Arena
          </span>
          <h2 className="heading-xl mt-6">
            <SplitText text="The Robotics Arena" />
          </h2>
          <p className="text-body-lg mt-6 max-w-2xl">
            Step into the arena. Explore the platforms, systems and products built across our three
            divisions — from competitive robots to research prototypes and AI-powered software.
          </p>
        </Reveal>

        {/* Division Selectors */}
        <Reveal delay={0.1}>
          <div className="flex items-center gap-1 mb-8 p-1.5 glass-panel-light rounded-sm w-fit">
            {divisions.map((div) => {
              const isActive = activeDivision === div.id;
              return (
                <button
                  key={div.id}
                  onClick={() => setActiveDivision(div.id)}
                  className="relative px-5 py-2.5 font-display text-sm font-medium uppercase tracking-wider transition-colors duration-300"
                >
                  <span className={isActive ? 'text-chakra-white' : 'text-chakra-silver hover:text-chakra-silver-2'}>
                    {div.abbreviation}
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="division-active"
                      className="absolute inset-0 rounded-sm"
                      style={{
                        background: divisionAccents[div.id].glow,
                        border: `1px solid ${divisionAccents[div.id].hex}50`,
                      }}
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Arena Display */}
        <div className="relative">
          {/* TOP: Info bar */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span
                  className="font-mono text-xs uppercase tracking-[0.25em]"
                  style={{ color: accent.hex }}
                >
                  {activeDivision}
                </span>
                <span className="w-12 h-px" style={{ background: `${accent.hex}60` }} />
                <span className="font-mono text-xs uppercase tracking-[0.25em] text-chakra-silver">
                  {divisionProjects.length} {divisionProjects.length === 1 ? 'Project' : 'Projects'}
                </span>
              </div>
              <AnimatePresence mode="wait">
                <motion.h3
                  key={currentProject.id + '-name'}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="font-display font-bold text-3xl lg:text-4xl text-chakra-white"
                >
                  {currentProject.name}
                </motion.h3>
              </AnimatePresence>
            </div>

            {/* Category indicator */}
            <div className="flex items-center gap-3">
              <div
                className="flex items-center gap-2 px-3 py-2 rounded-sm border"
                style={{ borderColor: `${accent.hex}30`, background: `${accent.glow}` }}
              >
                <CategoryIcon size={14} style={{ color: accent.hex }} />
                <span className="font-mono text-xs uppercase tracking-wider text-chakra-silver-2">
                  {currentProject.category}
                </span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 rounded-sm border border-chakra-grey-2 bg-chakra-charcoal/50">
                <span className="w-2 h-2 rounded-full" style={{ background: accent.hex }} />
                <span className="font-mono text-xs uppercase tracking-wider text-chakra-silver">
                  {currentProject.status}
                </span>
              </div>
            </div>
          </div>

          {/* CENTER: Robot display */}
          <div className="relative">
            <div
              className="relative aspect-[16/10] lg:aspect-[16/9] overflow-hidden rounded-sm border"
              style={{ borderColor: `${accent.hex}20` }}
            >
              {/* Image with transition */}
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={currentProject.id}
                  custom={direction}
                  initial={{ opacity: 0, scale: 1.05, x: direction * 60 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.98, x: direction * -60 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0"
                >
                  <img
                    src={currentProject.heroImage}
                    alt={currentProject.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Arena environment overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-chakra-black via-chakra-black/20 to-transparent pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-r from-chakra-black/50 via-transparent to-chakra-black/30 pointer-events-none" />
              <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-10 pointer-events-none" />

              {/* Dramatic lighting */}
              <div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-1/2 blur-[60px] pointer-events-none opacity-40"
                style={{ background: `radial-gradient(ellipse at top, ${accent.glow}, transparent)` }}
              />

              {/* HUD elements */}
              {/* Top bar */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: accent.hex }} />
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-chakra-silver-2/80">
                    Arena View — Live
                  </span>
                </div>
                <div className="font-mono text-[10px] tracking-wider text-chakra-silver-2/60">
                  {String(currentIndex + 1).padStart(2, '0')} / {String(divisionProjects.length).padStart(2, '0')}
                </div>
              </div>

              {/* Side HUD - Left */}
              <div className="absolute left-4 top-1/2 -translate-y-1/2 hidden md:flex flex-col gap-2 pointer-events-none">
                <div className="glass-panel-light px-2 py-1.5 rounded-sm">
                  <span className="font-mono text-[9px] text-chakra-silver/80 tracking-wider">SYS</span>
                  <div className="flex items-center gap-1 mt-0.5">
                    <Zap size={10} style={{ color: accent.hex }} />
                    <span className="font-mono text-[9px] text-chakra-silver-2">ONLINE</span>
                  </div>
                </div>
              </div>

              {/* Corner brackets */}
              <div className="absolute top-12 left-2 w-4 h-4 border-t border-l pointer-events-none" style={{ borderColor: `${accent.hex}50` }} />
              <div className="absolute top-12 right-2 w-4 h-4 border-t border-r pointer-events-none" style={{ borderColor: `${accent.hex}50` }} />
              <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l pointer-events-none" style={{ borderColor: `${accent.hex}50` }} />
              <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r pointer-events-none" style={{ borderColor: `${accent.hex}50` }} />

              {/* Navigation controls */}
              <button
                onClick={prev}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full glass-panel flex items-center justify-center text-chakra-white hover:bg-chakra-charcoal-2 transition-all duration-300 group z-10"
                aria-label="Previous project"
              >
                <ChevronLeft size={20} className="group-hover:-translate-x-0.5 transition-transform" />
              </button>
              <button
                onClick={next}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full glass-panel flex items-center justify-center text-chakra-white hover:bg-chakra-charcoal-2 transition-all duration-300 group z-10"
                aria-label="Next project"
              >
                <ChevronRight size={20} className="group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>

            {/* Progress indicators */}
            <div className="flex items-center gap-2 mt-4">
              {divisionProjects.map((p, i) => (
                <button
                  key={p.id}
                  onClick={() => {
                    setDirection(i > currentIndex ? 1 : -1);
                    setCurrentIndex(i);
                  }}
                  className="group relative h-1 rounded-full transition-all duration-300"
                  style={{
                    width: i === currentIndex ? '40px' : '20px',
                    background: i === currentIndex ? accent.hex : 'rgba(255,255,255,0.1)',
                  }}
                  aria-label={`Go to ${p.name}`}
                >
                  {i === currentIndex && (
                    <div
                      className="absolute inset-0 rounded-full"
                      style={{ boxShadow: `0 0 8px ${accent.glow}` }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* BOTTOM: Description and details */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
            {/* Description */}
            <div className="lg:col-span-2">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentProject.id + '-desc'}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                >
                  <p className="font-mono text-xs uppercase tracking-[0.25em] mb-3" style={{ color: accent.hex }}>
                    {currentProject.tagline}
                  </p>
                  <p className="text-body-lg mb-6">{currentProject.overview}</p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {currentProject.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="font-mono text-[11px] px-3 py-1.5 rounded-sm border border-chakra-grey-2 bg-chakra-charcoal/40 text-chakra-silver-2"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => onSelectProject(currentProject)}
                    className="inline-flex items-center gap-2 font-display text-sm font-medium uppercase tracking-wider text-chakra-white group"
                  >
                    <span>View Details</span>
                    <ArrowUpRight
                      size={16}
                      className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                      style={{ color: accent.hex }}
                    />
                  </button>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Specifications */}
            <div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentProject.id + '-specs'}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4, delay: 0.15 }}
                >
                  <p className="font-mono text-xs uppercase tracking-[0.25em] text-chakra-silver mb-4">
                    Technical Specs
                  </p>
                  <div className="flex flex-col gap-3">
                    {currentProject.specs.map((spec) => (
                      <div key={spec.label} className="flex items-center justify-between py-2 border-b border-white/[0.04]">
                        <span className="text-xs text-chakra-silver">{spec.label}</span>
                        <span className="font-mono text-xs text-chakra-white font-medium">
                          {spec.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
