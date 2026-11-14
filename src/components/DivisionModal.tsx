import { motion, AnimatePresence } from 'framer-motion';
import { X, Lightbulb, Trophy, Cpu, CheckCircle2, ArrowRight } from 'lucide-react';
import { Division, divisions } from '@/data/divisions';
import { projects } from '@/data/projects';

interface DivisionModalProps {
  division: Division | null;
  onClose: () => void;
  onSelectDivision: (division: Division) => void;
}

const iconMap: Record<string, typeof Cpu> = {
  Lightbulb,
  Trophy,
  Cpu,
};

const sectionIcons = [Lightbulb, Trophy, Cpu];

export default function DivisionModal({ division, onClose, onSelectDivision }: DivisionModalProps) {
  if (!division) return null;

  const Icon = iconMap[division.icon] || Cpu;
  const divisionProjects = projects.filter((p) => p.division === division.id);
  const otherDivisions = divisions.filter((d) => d.id !== division.id);

  return (
    <AnimatePresence>
      {division && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] overflow-y-auto"
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-chakra-black/90 backdrop-blur-md" />

          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-5xl mx-auto my-8 glass-panel rounded-sm overflow-hidden"
          >
            {/* Hero banner */}
            <div className="relative h-64 lg:h-80">
              <img src={division.image} alt={division.fullName} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-chakra-black via-chakra-black/40 to-transparent" />
              <div
                className="absolute inset-0"
                style={{ background: `linear-gradient(to top, ${division.glowRgba}, transparent 60%)` }}
              />
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-10 h-10 rounded-full glass-panel flex items-center justify-center text-chakra-white hover:bg-chakra-crimson/20 transition-colors z-10"
                aria-label="Close"
              >
                <X size={18} />
              </button>

              {/* Division badge */}
              <div className="absolute bottom-6 left-8">
                <div
                  className="inline-flex items-center justify-center w-16 h-16 rounded-sm font-display font-bold text-xl mb-4"
                  style={{
                    color: division.accentColorHex,
                    background: division.glowRgba,
                    border: `1px solid ${division.accentColorHex}50`,
                    boxShadow: `0 0 25px ${division.glowRgba}`,
                  }}
                >
                  {division.abbreviation}
                </div>
                <p className="font-mono text-xs uppercase tracking-[0.3em] text-chakra-silver-2 mb-2">
                  {division.tagline}
                </p>
                <h2 className="font-display font-bold text-2xl lg:text-3xl text-chakra-white">
                  {division.fullName}
                </h2>
              </div>
            </div>

            {/* Content */}
            <div className="p-8 lg:p-10">
              {/* Short description */}
              <p className="text-body-lg mb-10">{division.shortDescription}</p>

              {/* Three sections: What It Is / What We'll Do / What You'll Gain */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-10">
                {division.sections.map((section, i) => {
                  const SectionIcon = sectionIcons[i] || Lightbulb;
                  return (
                    <motion.div
                      key={section.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + i * 0.1 }}
                      className="glass-panel-light p-6 rounded-sm relative overflow-hidden"
                    >
                      {/* Accent top border */}
                      <div
                        className="absolute top-0 left-0 right-0 h-0.5"
                        style={{ background: division.accentColorHex }}
                      />
                      <div
                        className="w-10 h-10 rounded-sm flex items-center justify-center mb-4"
                        style={{
                          color: division.accentColorHex,
                          background: division.glowRgba,
                          border: `1px solid ${division.accentColorHex}30`,
                        }}
                      >
                        <SectionIcon size={18} />
                      </div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.25em] mb-2" style={{ color: division.accentColorHex }}>
                        {section.label}
                      </p>
                      <h3 className="font-display text-base font-semibold text-chakra-white mb-3">
                        {section.title}
                      </h3>
                      <p className="text-sm text-chakra-silver-2 leading-relaxed">
                        {section.text}
                      </p>
                    </motion.div>
                  );
                })}
              </div>

              {/* Areas of focus */}
              <div className="mb-10">
                <h3 className="font-display text-lg font-semibold text-chakra-white mb-5 flex items-center gap-3">
                  <Icon size={20} style={{ color: division.accentColorHex }} />
                  Areas of Focus
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {division.focusAreas.map((area, i) => (
                    <motion.div
                      key={area}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.05 }}
                      className="flex items-center gap-3 p-3 glass-panel-light rounded-sm"
                    >
                      <CheckCircle2 size={16} style={{ color: division.accentColorHex }} className="flex-shrink-0" />
                      <span className="text-sm text-chakra-silver-2">{area}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Related projects */}
              {divisionProjects.length > 0 && (
                <div className="mb-10">
                  <h3 className="font-display text-lg font-semibold text-chakra-white mb-5">
                    Related Projects &amp; Products
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {divisionProjects.map((project, i) => (
                      <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 + i * 0.06 }}
                        className="group relative overflow-hidden rounded-sm h-48"
                        onClick={() => {
                          const el = document.getElementById('our-work');
                          if (el) {
                            onClose();
                            setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 300);
                          }
                        }}
                      >
                        <img src={project.heroImage} alt={project.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
                        <div className="absolute inset-0 bg-gradient-to-t from-chakra-black via-chakra-black/40 to-transparent" />
                        <div className="absolute inset-0 border border-white/[0.06] group-hover:border-white/[0.15] transition-colors" />
                        <div className="absolute bottom-0 p-4">
                          <p className="font-mono text-[10px] uppercase tracking-wider mb-1" style={{ color: division.accentColorHex }}>
                            {project.category}
                          </p>
                          <p className="font-display font-bold text-base text-chakra-white">{project.name}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Explore other divisions */}
              <div>
                <div className="flex items-center gap-4 mb-5">
                  <h3 className="font-display text-lg font-semibold text-chakra-white">
                    Explore Other Divisions
                  </h3>
                  <div className="flex-1 h-px bg-gradient-to-r from-chakra-grey-2 to-transparent" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {otherDivisions.map((other) => (
                    <button
                      key={other.id}
                      onClick={() => onSelectDivision(other)}
                      className="group flex items-center gap-4 p-5 glass-panel-light rounded-sm hover:border-white/[0.15] transition-all text-left"
                    >
                      <div
                        className="flex-shrink-0 w-12 h-12 rounded-sm flex items-center justify-center font-display font-bold text-sm"
                        style={{
                          color: other.accentColorHex,
                          background: other.glowRgba,
                          border: `1px solid ${other.accentColorHex}40`,
                        }}
                      >
                        {other.abbreviation}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-display text-sm font-semibold text-chakra-white truncate">
                          {other.fullName}
                        </p>
                        <p className="font-mono text-[10px] uppercase tracking-wider text-chakra-silver truncate">
                          {other.tagline}
                        </p>
                      </div>
                      <ArrowRight size={16} className="text-chakra-silver group-hover:text-chakra-white group-hover:translate-x-1 transition-all flex-shrink-0" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
