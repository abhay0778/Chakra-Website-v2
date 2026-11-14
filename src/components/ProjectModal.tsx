import { motion, AnimatePresence } from 'framer-motion';
import { X, Cpu, Wrench, Eye, Rocket, Layers, Zap, CircleDot } from 'lucide-react';
import { Project } from '@/data/projects';
import { divisions } from '@/data/divisions';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

const categoryIcons: Record<string, typeof Cpu> = {
  'Combat Robot': Wrench,
  'All-Terrain Rover': Rocket,
  'Robotic Manipulator Arm': Wrench,
  'Computer Vision Module': Eye,
  'SLAM Navigation System': Eye,
  'Visual Tracking System': Eye,
  'Autonomous UAV': Rocket,
  'Autonomous Ground Vehicle': Cpu,
  'Drone Swarm System': Layers,
};

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  if (!project) return null;

  const division = divisions.find((d) => d.id === project.division);
  const accentHex = division?.accentColorHex || '#dc1f2e';
  const accentGlow = division?.glowRgba || 'rgba(220, 31, 46, 0.35)';
  const CategoryIcon = categoryIcons[project.category] || Cpu;

  return (
    <AnimatePresence>
      {project && (
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
            className="relative max-w-4xl mx-auto my-8 glass-panel rounded-sm overflow-hidden"
          >
            {/* Hero image */}
            <div className="relative h-64 lg:h-80">
              <img src={project.heroImage} alt={project.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-chakra-black via-chakra-black/40 to-transparent" />
              <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${accentGlow}, transparent 60%)` }} />
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-10 h-10 rounded-full glass-panel flex items-center justify-center text-chakra-white hover:bg-chakra-crimson/20 transition-colors z-10"
                aria-label="Close"
              >
                <X size={18} />
              </button>

              {/* Info bar */}
              <div className="absolute bottom-6 left-8 right-8">
                <div className="flex items-center gap-3 mb-3">
                  <span className="font-mono text-xs uppercase tracking-[0.25em]" style={{ color: accentHex }}>
                    {project.division}
                  </span>
                  <span className="w-8 h-px" style={{ background: `${accentHex}60` }} />
                  <span className="font-mono text-xs uppercase tracking-wider text-chakra-silver-2 flex items-center gap-1.5">
                    <CategoryIcon size={12} />
                    {project.category}
                  </span>
                </div>
                <h2 className="font-display font-bold text-3xl lg:text-4xl text-chakra-white mb-2">
                  {project.name}
                </h2>
                <p className="font-mono text-sm text-chakra-silver-2">{project.tagline}</p>
              </div>
            </div>

            {/* Content */}
            <div className="p-8 lg:p-10">
              {/* Status & year */}
              <div className="flex items-center gap-3 mb-8">
                <div
                  className="flex items-center gap-2 px-3 py-1.5 rounded-sm border"
                  style={{ borderColor: `${accentHex}30`, background: accentGlow }}
                >
                  <CircleDot size={12} style={{ color: accentHex }} />
                  <span className="font-mono text-xs uppercase tracking-wider text-chakra-white">
                    {project.status}
                  </span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-sm border border-chakra-grey-2 bg-chakra-charcoal/50">
                  <Zap size={12} className="text-chakra-silver" />
                  <span className="font-mono text-xs text-chakra-silver-2">{project.year}</span>
                </div>
              </div>

              {/* Overview */}
              <div className="mb-8">
                <h3 className="font-display text-lg font-semibold text-chakra-white mb-3">Overview</h3>
                <p className="text-body-lg">{project.overview}</p>
              </div>

              {/* Problem & Approach */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="glass-panel-light p-6 rounded-sm">
                  <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-chakra-crimson mb-3">
                    Problem Statement
                  </h3>
                  <p className="text-sm text-chakra-silver-2 leading-relaxed">{project.problemStatement}</p>
                </div>
                <div className="glass-panel-light p-6 rounded-sm">
                  <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-chakra-electric mb-3">
                    Our Approach
                  </h3>
                  <p className="text-sm text-chakra-silver-2 leading-relaxed">{project.approach}</p>
                </div>
              </div>

              {/* Technologies */}
              <div className="mb-8">
                <h3 className="font-display text-lg font-semibold text-chakra-white mb-4">Technologies Used</h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="font-mono text-xs px-3 py-2 rounded-sm border border-chakra-grey-2 bg-chakra-charcoal/40 text-chakra-silver-2"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Specifications */}
              <div className="mb-8">
                <h3 className="font-display text-lg font-semibold text-chakra-white mb-4">Technical Specifications</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-0">
                  {project.specs.map((spec) => (
                    <div key={spec.label} className="flex items-center justify-between py-3 border-b border-white/[0.04]">
                      <span className="text-sm text-chakra-silver">{spec.label}</span>
                      <span className="font-mono text-sm text-chakra-white font-medium">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Gallery */}
              {project.gallery.length > 0 && (
                <div className="mb-4">
                  <h3 className="font-display text-lg font-semibold text-chakra-white mb-4">Development Gallery</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {project.gallery.map((img, i) => (
                      <div key={i} className="relative aspect-video overflow-hidden rounded-sm group">
                        <img src={img} alt={`${project.name} gallery ${i + 1}`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                        <div className="absolute inset-0 border border-white/[0.06] group-hover:border-white/[0.15] transition-colors" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
