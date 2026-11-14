import { Instagram, Linkedin, Mail, MapPin, ArrowUp } from 'lucide-react';
import { contactInfo } from '@/data/sponsors';

const footerNav = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Divisions', href: '#divisions' },
  { label: 'Projects & Products', href: '#our-work' },
  { label: 'Sponsors', href: '#sponsors' },
  { label: 'Contact', href: '#contact' },
];

export default function Footer() {
  const handleNav = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <footer className="relative bg-chakra-black-2 border-t border-white/[0.04] overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-30 pointer-events-none" />

      {/* Glow accents */}
      <div className="absolute -top-32 left-1/4 w-64 h-64 rounded-full bg-chakra-crimson/5 blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-32 right-1/4 w-64 h-64 rounded-full bg-chakra-electric/5 blur-[100px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 lg:px-8 pt-16 pb-8">
        {/* Top section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative w-10 h-10 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border-2 border-chakra-crimson" />
                <div className="absolute inset-1.5 rounded-full border border-chakra-electric/60" />
                <div className="w-1.5 h-1.5 rounded-full bg-chakra-white" />
              </div>
              <div>
                <p className="font-display font-bold text-sm tracking-wider text-chakra-white">
                  CHAKRA
                </p>
                <p className="font-mono text-[9px] tracking-[0.25em] text-chakra-silver uppercase">
                  Robotics
                </p>
              </div>
            </div>
            <p className="text-body mb-4">
              The Robotics and AI Club of Jyothy Institute of Technology, Bengaluru.
            </p>
            <p className="font-display text-lg font-bold text-chakra-crimson tracking-wide">
              {contactInfo.tagline}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-[0.25em] text-chakra-silver mb-4">
              Navigate
            </h4>
            <div className="grid grid-cols-1 gap-y-2">
              {footerNav.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleNav(item.href)}
                  className="text-left text-sm text-chakra-silver-2 hover:text-chakra-white transition-colors duration-200"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Divisions */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-[0.25em] text-chakra-silver mb-4">
              Divisions
            </h4>
            <div className="flex flex-col gap-2">
              {['IPD', 'CRD', 'ASD'].map((d) => (
                <button
                  key={d}
                  onClick={() => handleNav('#divisions')}
                  className="text-left group"
                >
                  <span className="font-display text-sm font-medium text-chakra-silver-2 group-hover:text-chakra-white transition-colors">
                    {d}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-[0.25em] text-chakra-silver mb-4">
              Connect
            </h4>
            <div className="flex flex-col gap-3">
              <a
                href={contactInfo.email ? `mailto:${contactInfo.email}` : '#'}
                className="flex items-center gap-3 text-sm text-chakra-silver-2 hover:text-chakra-white transition-colors group"
              >
                <Mail size={16} className="text-chakra-grey-3 group-hover:text-chakra-crimson transition-colors" />
                <span className="truncate">{contactInfo.email || '[ Email ]'}</span>
              </a>
              <a
                href={contactInfo.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-chakra-silver-2 hover:text-chakra-white transition-colors group"
              >
                <Instagram size={16} className="text-chakra-grey-3 group-hover:text-chakra-crimson transition-colors" />
                <span>Instagram</span>
              </a>
              <a
                href={contactInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-chakra-silver-2 hover:text-chakra-white transition-colors group"
              >
                <Linkedin size={16} className="text-chakra-grey-3 group-hover:text-chakra-electric transition-colors" />
                <span>LinkedIn</span>
              </a>
              <div className="flex items-center gap-3 text-sm text-chakra-silver-2">
                <MapPin size={16} className="text-chakra-grey-3" />
                <span>{contactInfo.location}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="divider-line mb-6" />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-mono text-xs text-chakra-grey-3 tracking-wide">
            © {new Date().getFullYear()} TEAM CHAKRA ROBOTICS. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <p className="font-mono text-xs text-chakra-grey-3 tracking-wide">
              Jyothy Institute of Technology
            </p>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="w-9 h-9 rounded-full border border-chakra-grey-2 flex items-center justify-center text-chakra-silver hover:text-chakra-white hover:border-chakra-crimson transition-all duration-300 group"
              aria-label="Scroll to top"
            >
              <ArrowUp size={16} className="group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
