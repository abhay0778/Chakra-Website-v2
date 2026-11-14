import { motion } from 'framer-motion';
import { Handshake, Mail, Building2, Wrench } from 'lucide-react';
import { Reveal, SplitText } from '@/components/Reveal';
import { sponsors, getSponsorsByType, contactInfo } from '@/data/sponsors';

const typeIcons = {
  Sponsor: Handshake,
  'Technical Partner': Wrench,
  'Institutional Support': Building2,
};

const typeLabels = {
  Sponsor: 'Sponsors',
  'Technical Partner': 'Technical Partners',
  'Institutional Support': 'Institutional Support',
};

export default function Sponsors() {
  return (
    <section id="sponsors" className="relative py-24 lg:py-32 overflow-hidden bg-chakra-black">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-chakra-electric/30 to-transparent" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-chakra-electric/5 blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 lg:px-8">
        {/* Header */}
        <Reveal className="mb-16">
          <span className="section-label">
            <span className="text-chakra-crimson">04</span> / Partners
          </span>
          <h2 className="heading-xl mt-6">
            <SplitText text="Sponsors &" />
            <br />
            <SplitText text="Partners" delay={0.15} className="text-chakra-electric" />
          </h2>
          <p className="text-body-lg mt-6 max-w-2xl">
            We collaborate with organisations that believe in the power of student-driven engineering.
            Our sponsors and partners provide the resources, tools and support that make our work possible.
          </p>
        </Reveal>

        {/* Sponsor groups */}
        <div className="space-y-12">
          {(['Institutional Support', 'Sponsor', 'Technical Partner'] as const).map((type) => {
            const typeSponsors = getSponsorsByType(type);
            if (typeSponsors.length === 0) {
              // Show placeholder slot for empty categories
              return (
                <Reveal key={type}>
                  <div>
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-10 h-10 rounded-sm border border-chakra-grey-2 flex items-center justify-center text-chakra-silver">
                        {(() => {
                          const Icon = typeIcons[type];
                          return <Icon size={18} />;
                        })()}
                      </div>
                      <h3 className="font-display text-lg font-semibold text-chakra-white">
                        {typeLabels[type]}
                      </h3>
                      <div className="flex-1 h-px bg-gradient-to-r from-chakra-grey-2 to-transparent" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {[1, 2, 3].map((i) => (
                        <div
                          key={i}
                          className="h-28 rounded-sm border border-dashed border-chakra-grey-2/50 flex items-center justify-center bg-chakra-charcoal/20"
                        >
                          <span className="font-mono text-xs text-chakra-grey-3 uppercase tracking-wider">
                            [ Available Slot ]
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </Reveal>
              );
            }

            const Icon = typeIcons[type];
            return (
              <Reveal key={type}>
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-10 h-10 rounded-sm border border-chakra-grey-2 flex items-center justify-center text-chakra-silver">
                      <Icon size={18} />
                    </div>
                    <h3 className="font-display text-lg font-semibold text-chakra-white">
                      {typeLabels[type]}
                    </h3>
                    <div className="flex-1 h-px bg-gradient-to-r from-chakra-grey-2 to-transparent" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {typeSponsors.map((sponsor) => (
                      <motion.div
                        key={sponsor.id}
                        whileHover={{ y: -4 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                        className="glass-panel-light p-8 rounded-sm hover:border-chakra-electric/30 transition-all group"
                      >
                        <div className="flex items-center justify-center h-16 mb-4">
                          <span className="font-display font-bold text-lg text-chakra-white text-center">
                            {sponsor.name}
                          </span>
                        </div>
                        <p className="text-xs text-chakra-silver text-center leading-relaxed">
                          {sponsor.description}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Sponsorship enquiry CTA */}
        <Reveal delay={0.15}>
          <div className="mt-16 glass-panel rounded-sm p-8 lg:p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-10" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full bg-chakra-crimson/5 blur-[80px] pointer-events-none" />
            <div className="relative">
              <Mail size={32} className="text-chakra-crimson mx-auto mb-4" />
              <h3 className="font-display font-bold text-2xl text-chakra-white mb-3">
                Interested in Sponsoring?
              </h3>
              <p className="text-body-lg max-w-xl mx-auto mb-6">
                Support the next generation of robotics engineers. Partner with Team Chakra Robotics
                to help us build, compete and innovate. Reach out to discuss sponsorship opportunities.
              </p>
              <a
                href={`mailto:${contactInfo.email}`}
                className="btn-primary inline-flex"
              >
                <Mail size={16} />
                <span>Get in Touch</span>
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
