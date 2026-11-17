import { useEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence, MotionConfig, motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollProgress from '@/components/ScrollProgress';
import AchievementsPage from '@/pages/AchievementsPage';
import RecognitionPage from '@/pages/RecognitionPage';
import {
  AboutPage,
  ContactPage,
  DivisionDetailPage,
  DivisionsPage,
  HomePage,
  NotFoundPage,
  ProjectDetailPage,
  ProjectsPage,
  RecruitmentPage,
  SponsorsPage,
} from '@/pages';

function SiteApp() {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    const titles: Record<string, string> = {
      '/': 'Home', '/about': 'About Us', '/divisions': 'Divisions', '/projects': 'Projects & Products',
      '/recognition': 'Recognition', '/achievements': 'Achievements', '/sponsors': 'Sponsors', '/contact': 'Contact',
      '/recruitment': 'Recruitment 2026', '/divisions/ipd': 'Innovation and Patent Division', '/divisions/crd': 'Competitive Robotics Division',
      '/divisions/asd': 'Applied AI and Software Division',
    };
    document.title = `${titles[location.pathname] ?? (location.pathname.startsWith('/projects/') ? 'Project Details' : 'Not Found')} | TEAM CHAKRA ROBOTICS`;
  }, [location.pathname]);

  return (
    <div className="relative min-h-screen bg-chakra-black">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-chakra-black focus:p-3 focus:text-white">Skip to content</a>
      <ScrollProgress />
      <Navbar />
      <AnimatePresence mode="wait" initial={false}>
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
          id="main-content"
          className="min-h-[70vh]"
        >
          <Routes location={location}>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/divisions" element={<DivisionsPage />} />
            <Route path="/divisions/:divisionId" element={<DivisionDetailPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/projects/:projectId" element={<ProjectDetailPage />} />
            <Route path="/recognition" element={<RecognitionPage />} />
            <Route path="/achievements" element={<AchievementsPage />} />
            <Route path="/sponsors" element={<SponsorsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/recruitment" element={<RecruitmentPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </motion.main>
      </AnimatePresence>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <MotionConfig reducedMotion="user">
        <SiteApp />
      </MotionConfig>
    </BrowserRouter>
  );
}
