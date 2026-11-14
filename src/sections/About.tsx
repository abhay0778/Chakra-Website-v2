import { Cpu, Wrench, Eye, Rocket, Target, Lightbulb, TrendingUp, Brain, CircuitBoard, Bot } from 'lucide-react';
import { Reveal, SplitText, StaggerGroup, StaggerItem } from '@/components/Reveal';

const pillars = [
  {
    icon: Lightbulb,
    title: 'Who We Are',
    text: 'TEAM CHAKRA ROBOTICS is a Robotics and AI Club focused on interdisciplinary engineering, robotics development, research and innovation. We bring together different engineering disciplines to explore, design and develop intelligent robotic systems.',
  },
  {
    icon: Target,
    title: 'Our Vision',
    text: 'To create an environment where innovation, engineering and intelligent technologies come together to solve real-world challenges.',
  },
  {
    icon: TrendingUp,
    title: 'Our Mission',
    text: 'Encourage interdisciplinary robotics development. Build practical engineering solutions. Explore artificial intelligence and automation. Develop competitive robotics systems. Transform innovative ideas into working prototypes and products.',
  },
];

const buildCategories = [
  { icon: Bot, label: 'Robotics & Autonomous Systems', desc: 'Intelligent platforms' },
  { icon: Trophy, label: 'Competitive Robotics', desc: 'Competition-ready robots' },
  { icon: Brain, label: 'Artificial Intelligence', desc: 'AI & machine learning' },
  { icon: CircuitBoard, label: 'Embedded Systems', desc: 'Firmware & hardware' },
  { icon: Wrench, label: 'Mechanical Design', desc: 'CAD & fabrication' },
  { icon: Cpu, label: 'Robotics Software', desc: 'Control & perception' },
  { icon: Rocket, label: 'Research & Product Dev', desc: 'Innovation to product' },
  { icon: Eye, label: 'Computer Vision', desc: 'Visual intelligence' },
];

import { Trophy } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-chakra-black" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-chakra-crimson/30 to-transparent" />
      <div className="absolute top-1/2 -left-32 w-96 h-96 rounded-full bg-chakra-crimson/5 blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 lg:px-8">
        {/* Section header */}
        <Reveal className="mb-16">
          <span className="section-label">
            <span className="text-chakra-crimson">01</span> / About Us
          </span>
          <h2 className="heading-xl mt-6">
            <SplitText text="Engineering" />
            <br />
            <SplitText text="Beyond Boundaries" delay={0.15} className="text-chakra-crimson" />
          </h2>
        </Reveal>

        {/* Main content with image */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-20">
          {/* Image */}
          <Reveal className="relative" y={60}>
            <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
              <img
                src="https://images.pexels.com/photos/9242856/pexels-photo-9242856.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Robotics engineering workspace"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-chakra-black via-transparent to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-chakra-black/40 to-transparent" />
              {/* HUD overlay */}
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-chakra-crimson animate-pulse" />
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-chakra-silver-2">
                  R&amp;D Active
                </span>
              </div>
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <span className="font-mono text-[10px] text-chakra-silver-2/60">
                  Jyothy Institute of Technology
                </span>
                <span className="font-mono text-[10px] text-chakra-silver-2/60">
                  Bengaluru, IN
                </span>
              </div>
            </div>
            {/* Accent border */}
            <div className="absolute -bottom-3 -right-3 w-24 h-24 border-b-2 border-r-2 border-chakra-crimson/40 pointer-events-none" />
            <div className="absolute -top-3 -left-3 w-24 h-24 border-t-2 border-l-2 border-chakra-electric/30 pointer-events-none" />
          </Reveal>

          {/* Text content */}
          <div className="flex flex-col gap-8">
            {pillars.map((pillar, i) => (
              <Reveal key={pillar.title} delay={i * 0.1}>
                <div className="flex gap-5">
                  <div className="flex-shrink-0 w-12 h-12 rounded-sm border border-chakra-grey-2 flex items-center justify-center text-chakra-crimson bg-chakra-charcoal/50">
                    <pillar.icon size={20} />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-chakra-white mb-2">
                      {pillar.title}
                    </h3>
                    <p className="text-body-lg">{pillar.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* What We Build */}
        <Reveal>
          <div className="flex items-center gap-4 mb-8">
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-chakra-silver">
              What We Build
            </span>
            <div className="flex-1 h-px bg-gradient-to-r from-chakra-grey-2 to-transparent" />
          </div>
          <StaggerGroup className="grid grid-cols-2 lg:grid-cols-4 gap-4" stagger={0.08}>
            {buildCategories.map((cat) => (
              <StaggerItem key={cat.label}>
                <div className="glass-panel-light p-6 rounded-sm hover:border-chakra-crimson/30 transition-all duration-300 group hover:-translate-y-1 h-full">
                  <cat.icon size={24} className="text-chakra-silver group-hover:text-chakra-crimson transition-colors mb-4" />
                  <p className="font-display text-sm font-semibold text-chakra-white mb-1">
                    {cat.label}
                  </p>
                  <p className="text-xs text-chakra-silver">{cat.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </Reveal>
      </div>
    </section>
  );
}
