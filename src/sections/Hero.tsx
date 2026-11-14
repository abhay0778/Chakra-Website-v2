import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ChevronDown, Cpu, Layers } from 'lucide-react';
import ParticleField from '@/components/ParticleField';

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const yText = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const yImage = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section ref={ref} id="home" className="relative min-h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Background layers */}
      <div className="absolute inset-0 bg-chakra-black" />
      <motion.div
        style={{ scale, y: yImage }}
        className="absolute inset-0"
      >
        <img
          src="https://images.pexels.com/photos/8294662/pexels-photo-8294662.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt="Futuristic robot in dark studio"
          className="w-full h-full object-cover opacity-40"
          loading="eager"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-chakra-black/60 via-chakra-black/70 to-chakra-black" />
      <div className="absolute inset-0 bg-gradient-to-r from-chakra-black/80 via-transparent to-chakra-black/50" />
      <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-20" />

      {/* Particles */}
      <ParticleField density={70} color="#0ea5e9" speed={0.25} className="opacity-60" />

      {/* Crimson glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-chakra-crimson/10 blur-[120px] pointer-events-none animate-glow-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-chakra-electric/8 blur-[100px] pointer-events-none" />

      {/* Content */}
      <motion.div
        style={{ y: yText, opacity }}
        className="relative z-10 max-w-7xl mx-auto px-4 lg:px-8 text-center pt-20"
      >
        {/* Top label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex items-center justify-center gap-3 mb-6"
        >
          <span className="w-8 h-px bg-chakra-crimson" />
          <span className="font-mono text-xs uppercase tracking-[0.4em] text-chakra-silver-2">
            Robotics &amp; AI Club
          </span>
          <span className="w-8 h-px bg-chakra-crimson" />
        </motion.div>

        {/* Main title */}
        <h1 className="font-display font-bold text-chakra-white">
          <span className="block overflow-hidden">
            <motion.span
              className="block text-mega"
              initial={{ y: '110%' }}
              animate={{ y: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              TEAM
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span
              className="block text-mega text-glow-crimson"
              style={{ color: '#dc1f2e' }}
              initial={{ y: '110%' }}
              animate={{ y: 0 }}
              transition={{ duration: 1, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
            >
              CHAKRA
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span
              className="block text-mega"
              initial={{ y: '110%' }}
              animate={{ y: 0 }}
              transition={{ duration: 1, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              ROBOTICS
            </motion.span>
          </span>
        </h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="font-display text-sm lg:text-lg uppercase tracking-[0.3em] text-chakra-silver-2 mt-8 mb-6"
        >
          Engineering Beyond Boundaries
        </motion.p>

        {/* Supporting text */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="font-body text-base lg:text-lg text-chakra-silver-2 max-w-2xl mx-auto mb-10"
        >
          Engineering intelligent systems, building advanced robotics and transforming innovative ideas into real-world solutions.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button onClick={() => scrollTo('#our-work')} className="btn-primary w-full sm:w-auto">
            <Cpu size={16} />
            <span>Explore Our Work</span>
          </button>
          <button onClick={() => scrollTo('#divisions')} className="btn-secondary w-full sm:w-auto">
            <Layers size={16} />
            <span>Discover Our Divisions</span>
          </button>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        style={{ opacity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-chakra-silver/60">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={18} className="text-chakra-silver/60" />
        </motion.div>
      </motion.div>

      {/* HUD corner accents */}
      <div className="absolute top-24 left-6 w-6 h-6 border-t border-l border-chakra-crimson/40 pointer-events-none hidden lg:block" />
      <div className="absolute top-24 right-6 w-6 h-6 border-t border-r border-chakra-crimson/40 pointer-events-none hidden lg:block" />
      <div className="absolute bottom-6 left-6 w-6 h-6 border-b border-l border-chakra-electric/30 pointer-events-none hidden lg:block" />
      <div className="absolute bottom-6 right-6 w-6 h-6 border-b border-r border-chakra-electric/30 pointer-events-none hidden lg:block" />
    </section>
  );
}
