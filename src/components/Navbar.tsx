import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const navItems = [
  { label: 'Home', to: '/', end: true },
  { label: 'About Us', to: '/about' },
  { label: 'Divisions', to: '/divisions' },
  { label: 'Projects & Products', to: '/projects' },
  { label: 'Recognition', to: '/recognition' },
  { label: 'Achievements', to: '/achievements' },
  { label: 'Sponsors', to: '/sponsors' },
  { label: 'Contact', to: '/contact' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <motion.header initial={{ y: -24, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.45 }} className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.07] bg-[#08090c]/90 backdrop-blur-xl">
      <nav aria-label="Main navigation" className="mx-auto flex min-h-[76px] max-w-7xl items-center justify-between gap-5 px-4 lg:px-8">
        <Link to="/" aria-label="TEAM CHAKRA ROBOTICS home" onClick={() => setMobileOpen(false)} className="shrink-0">
          <img src="/assets/branding/chakra-logo.png" alt="TEAM CHAKRA ROBOTICS" className="h-14 w-14 object-contain" />
        </Link>
        <div className="hidden items-center gap-1 xl:flex">
          {navItems.map(({ label, to, end }) => <NavLink key={to} to={to} end={end} className={({ isActive }) => `relative px-3 py-3 font-display text-xs font-medium transition-colors ${isActive ? 'text-white' : 'text-chakra-silver hover:text-white'}`}>
            {({ isActive }) => <><span>{label}</span>{isActive && <motion.span layoutId="active-nav" className="absolute inset-x-3 bottom-1 h-px bg-chakra-crimson" />}</>}
          </NavLink>)}
        </div>
        <button type="button" className="flex h-11 w-11 items-center justify-center border border-white/10 text-white xl:hidden" aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={mobileOpen} onClick={() => setMobileOpen((open) => !open)}>
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>
      <AnimatePresence>
        {mobileOpen && <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden border-t border-white/10 bg-[#08090c] xl:hidden">
          <nav aria-label="Mobile navigation" className="mx-auto grid max-w-7xl gap-1 px-4 py-4 sm:grid-cols-2 lg:px-8">
            {navItems.map(({ label, to, end }, index) => <motion.div key={to} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.025 }}>
              <NavLink to={to} end={end} onClick={() => setMobileOpen(false)} className={({ isActive }) => `flex min-h-12 items-center justify-between border-b border-white/[0.06] px-3 font-display text-sm ${isActive ? 'text-white' : 'text-chakra-silver'}`}>
                {label}<span aria-hidden="true" className="font-mono text-[10px] text-chakra-electric">↗</span>
              </NavLink>
            </motion.div>)}
          </nav>
        </motion.div>}
      </AnimatePresence>
    </motion.header>
  );
}
