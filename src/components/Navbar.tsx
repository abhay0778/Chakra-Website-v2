import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronRight } from 'lucide-react';

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Divisions', href: '#divisions' },
  { label: 'Projects & Products', href: '#our-work' },
  { label: 'Sponsors', href: '#sponsors' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);

      const sections = navItems.map((item) => item.href.replace('#', ''));
      const scrollPos = window.scrollY + 120;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'glass-panel py-3 border-b border-white/[0.06]'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => handleNavClick('#home')}
            className="flex items-center gap-3 group"
            aria-label="TEAM CHAKRA ROBOTICS home"
          >
            <div className="relative w-9 h-9 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-2 border-chakra-crimson transition-transform duration-700 group-hover:rotate-180" />
              <div className="absolute inset-1.5 rounded-full border border-chakra-electric/60" />
              <div className="w-1.5 h-1.5 rounded-full bg-chakra-white" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-display font-bold text-sm tracking-wider text-chakra-white">
                CHAKRA
              </span>
              <span className="font-mono text-[9px] tracking-[0.25em] text-chakra-silver uppercase mt-0.5">
                Robotics
              </span>
            </div>
          </button>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.replace('#', '');
              return (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.href)}
                  className="relative px-4 py-2 group"
                >
                  <span
                    className={`font-display text-sm font-medium transition-colors duration-300 ${
                      isActive
                        ? 'text-chakra-white'
                        : 'text-chakra-silver hover:text-chakra-white'
                    }`}
                  >
                    {item.label}
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="nav-active"
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-chakra-crimson"
                      style={{ boxShadow: '0 0 8px rgba(220, 31, 46, 0.6)' }}
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden relative w-10 h-10 flex items-center justify-center text-chakra-white"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div
              className="absolute inset-0 bg-chakra-black/80 backdrop-blur-xl"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="absolute right-0 top-0 bottom-0 w-72 glass-panel border-l border-white/[0.06] flex flex-col pt-24 pb-8 px-6"
            >
              <div className="flex flex-col gap-1">
                {navItems.map((item, i) => {
                  const isActive = activeSection === item.href.replace('#', '');
                  return (
                    <motion.button
                      key={item.label}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 * i + 0.1 }}
                      onClick={() => handleNavClick(item.href)}
                      className={`flex items-center justify-between py-3.5 px-4 rounded-lg transition-all duration-300 ${
                        isActive
                          ? 'bg-chakra-crimson/10 text-chakra-white'
                          : 'text-chakra-silver hover:text-chakra-white hover:bg-white/[0.03]'
                      }`}
                    >
                      <span className="font-display text-sm font-medium">{item.label}</span>
                      <ChevronRight
                        size={16}
                        className={isActive ? 'text-chakra-crimson' : 'text-chakra-grey-3'}
                      />
                    </motion.button>
                  );
                })}
              </div>
              <div className="mt-auto pt-6 border-t border-white/[0.06]">
                <p className="font-mono text-[10px] tracking-[0.3em] text-chakra-silver uppercase">
                  Team Chakra Robotics
                </p>
                <p className="font-display text-xs text-chakra-grey-3 mt-1">
                  Engineering Beyond Boundaries
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
