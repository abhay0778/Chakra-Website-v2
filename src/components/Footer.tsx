import { ArrowUpRight, Instagram, Linkedin, Mail, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { contactInfo } from '@/data/sponsors';

const quickLinks = [
  { label: 'Home', to: '/' }, { label: 'About Us', to: '/about' },
  { label: 'Divisions', to: '/divisions' }, { label: 'Projects & Products', to: '/projects' },
  { label: 'Recognition', to: '/recognition' }, { label: 'Achievements', to: '/achievements' },
  { label: 'Sponsors', to: '/sponsors' },
  { label: 'Contact', to: '/contact' },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/[0.07] bg-[#08090c]">
      <div className="absolute inset-0 grid-pattern opacity-15" />
      <div className="relative mx-auto max-w-7xl px-4 pb-8 pt-14 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_.8fr_.8fr_1fr]">
          <div>
            <Link to="/" aria-label="TEAM CHAKRA ROBOTICS home"><img src="/assets/branding/chakra-logo.png" alt="TEAM CHAKRA ROBOTICS" className="h-20 w-20 object-contain" /></Link>
            <p className="mt-4 max-w-xs font-mono text-xs uppercase leading-6 tracking-[.16em] text-chakra-silver">Engineering Beyond Boundaries.</p>
          </div>
          <div><h2 className="font-mono text-[10px] uppercase tracking-[.25em] text-chakra-silver">Explore</h2><ul className="mt-4 space-y-3">{quickLinks.map((item) => <li key={item.to}><Link className="text-sm text-chakra-silver-2 transition hover:text-white" to={item.to}>{item.label}</Link></li>)}</ul></div>
          <div><h2 className="font-mono text-[10px] uppercase tracking-[.25em] text-chakra-silver">Divisions</h2><ul className="mt-4 space-y-3">{[['IPD','/divisions/ipd'],['CRD','/divisions/crd'],['ASD','/divisions/asd']].map(([label,to]) => <li key={to}><Link className="text-sm text-chakra-silver-2 transition hover:text-white" to={to}>{label}</Link></li>)}</ul><Link to="/projects" className="mt-5 inline-flex items-center gap-1 text-sm text-chakra-silver-2 hover:text-white">Projects &amp; Products <ArrowUpRight size={13} /></Link></div>
          <div><h2 className="font-mono text-[10px] uppercase tracking-[.25em] text-chakra-silver">Connect</h2><div className="mt-4 space-y-4 text-sm text-chakra-silver-2"><a className="flex gap-3 hover:text-white" href={`mailto:${contactInfo.email}`}><Mail size={16} className="shrink-0" />{contactInfo.email}</a><p className="flex gap-3"><MapPin size={16} className="shrink-0" />{contactInfo.institution}, {contactInfo.location}</p><div className="flex gap-4"><a aria-label="Instagram" href={contactInfo.instagram} target="_blank" rel="noreferrer"><Instagram size={17} /></a><a aria-label="LinkedIn" href={contactInfo.linkedin} target="_blank" rel="noreferrer"><Linkedin size={17} /></a></div></div></div>
        </div>
        <div className="mt-12 flex flex-col gap-3 border-t border-white/[0.07] pt-5 font-mono text-[9px] uppercase tracking-[.15em] text-chakra-silver/60 sm:flex-row sm:justify-between"><span>© {new Date().getFullYear()} TEAM CHAKRA ROBOTICS</span><span>Engineering Beyond Boundaries.</span></div>
      </div>
    </footer>
  );
}
