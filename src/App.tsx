import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollProgress from '@/components/ScrollProgress';
import DivisionModal from '@/components/DivisionModal';
import ProjectModal from '@/components/ProjectModal';
import Hero from '@/sections/Hero';
import About from '@/sections/About';
import Divisions from '@/sections/Divisions';
import OurWork from '@/sections/OurWork';
import Sponsors from '@/sections/Sponsors';
import Contact from '@/sections/Contact';
import { Division } from '@/data/divisions';
import { Project } from '@/data/projects';

export default function App() {
  const [selectedDivision, setSelectedDivision] = useState<Division | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Lock body scroll when modal is open
  useEffect(() => {
    const modalOpen = selectedDivision || selectedProject;
    document.body.style.overflow = modalOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedDivision, selectedProject]);

  return (
    <div className="relative min-h-screen bg-chakra-black">
      <ScrollProgress />
      <Navbar />

      <main>
        <Hero />
        <About />
        <Divisions onSelectDivision={setSelectedDivision} />
        <OurWork onSelectProject={setSelectedProject} />
        <Sponsors />
        <Contact />
      </main>

      <Footer />

      {/* Division Modal with ability to switch between divisions */}
      <AnimatePresence>
        {selectedDivision && (
          <DivisionModal
            division={selectedDivision}
            onClose={() => setSelectedDivision(null)}
            onSelectDivision={(div) => setSelectedDivision(div)}
          />
        )}
      </AnimatePresence>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>

      {/* Page transition overlay on initial load */}
      <motion.div
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        style={{ transformOrigin: 'top' }}
        className="fixed inset-0 z-[300] bg-chakra-black pointer-events-none"
      />
    </div>
  );
}
