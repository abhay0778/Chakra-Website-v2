import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Instagram, Linkedin, MapPin, Send, CheckCircle2 } from 'lucide-react';
import { Reveal, SplitText } from '@/components/Reveal';
import { contactInfo } from '@/data/sponsors';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="relative py-24 lg:py-32 overflow-hidden bg-chakra-black-2">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-chakra-crimson/30 to-transparent" />
      <div className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full bg-chakra-crimson/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-chakra-electric/5 blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 lg:px-8">
        {/* Header */}
        <Reveal className="mb-16 text-center">
          <span className="section-label justify-center">
            <span className="text-chakra-crimson">05</span> / Contact
          </span>
          <h2 className="heading-xl mt-6">
            <SplitText text="Get In Touch" />
          </h2>
          <p className="text-body-lg mt-6 max-w-2xl mx-auto">
            Have a question, partnership idea, or want to connect with Team Chakra Robotics? We would love to hear from you.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left: Contact info */}
          <Reveal>
            <div className="flex flex-col gap-6">
              {/* Brand block */}
              <div className="glass-panel p-8 rounded-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="relative w-12 h-12 flex items-center justify-center">
                    <div className="absolute inset-0 rounded-full border-2 border-chakra-crimson" />
                    <div className="absolute inset-2 rounded-full border border-chakra-electric/60" />
                    <div className="w-2 h-2 rounded-full bg-chakra-white" />
                  </div>
                  <div>
                    <p className="font-display font-bold text-base tracking-wider text-chakra-white">
                      TEAM CHAKRA ROBOTICS
                    </p>
                    <p className="font-mono text-[10px] tracking-[0.25em] text-chakra-silver uppercase mt-0.5">
                      Engineering Beyond Boundaries
                    </p>
                  </div>
                </div>
                <p className="text-body mb-6">
                  The Robotics and AI Club of Jyothy Institute of Technology, Bengaluru.
                </p>

                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-9 h-9 rounded-sm border border-chakra-grey-2 flex items-center justify-center text-chakra-silver">
                      <MapPin size={16} />
                    </div>
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-wider text-chakra-grey-3">Location</p>
                      <p className="text-chakra-silver-2">{contactInfo.location}</p>
                    </div>
                  </div>

                  <a href={`mailto:${contactInfo.email}`} className="flex items-center gap-3 text-sm group">
                    <div className="w-9 h-9 rounded-sm border border-chakra-grey-2 flex items-center justify-center text-chakra-silver group-hover:text-chakra-crimson group-hover:border-chakra-crimson/40 transition-colors">
                      <Mail size={16} />
                    </div>
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-wider text-chakra-grey-3">Email</p>
                      <p className="text-chakra-silver-2 group-hover:text-chakra-white transition-colors">{contactInfo.email}</p>
                    </div>
                  </a>

                  <a href={contactInfo.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm group">
                    <div className="w-9 h-9 rounded-sm border border-chakra-grey-2 flex items-center justify-center text-chakra-silver group-hover:text-chakra-crimson group-hover:border-chakra-crimson/40 transition-colors">
                      <Instagram size={16} />
                    </div>
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-wider text-chakra-grey-3">Instagram</p>
                      <p className="text-chakra-silver-2 group-hover:text-chakra-white transition-colors">@chakra.robotics</p>
                    </div>
                  </a>

                  <a href={contactInfo.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm group">
                    <div className="w-9 h-9 rounded-sm border border-chakra-grey-2 flex items-center justify-center text-chakra-silver group-hover:text-chakra-electric group-hover:border-chakra-electric/40 transition-colors">
                      <Linkedin size={16} />
                    </div>
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-wider text-chakra-grey-3">LinkedIn</p>
                      <p className="text-chakra-silver-2 group-hover:text-chakra-white transition-colors">Team Chakra Robotics</p>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Right: Contact form */}
          <Reveal delay={0.1}>
            <form onSubmit={handleSubmit} className="glass-panel p-8 rounded-sm">
              <h3 className="font-display text-lg font-semibold text-chakra-white mb-6">
                Send a Message
              </h3>
              <div className="flex flex-col gap-5">
                <div>
                  <label className="font-mono text-[10px] uppercase tracking-wider text-chakra-silver block mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-chakra-charcoal/50 border border-chakra-grey-2 rounded-sm text-chakra-white text-sm focus:outline-none focus:border-chakra-crimson/50 focus:shadow-[0_0_15px_rgba(220,31,46,0.1)] transition-all"
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label className="font-mono text-[10px] uppercase tracking-wider text-chakra-silver block mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-chakra-charcoal/50 border border-chakra-grey-2 rounded-sm text-chakra-white text-sm focus:outline-none focus:border-chakra-crimson/50 focus:shadow-[0_0_15px_rgba(220,31,46,0.1)] transition-all"
                    placeholder="Enter your email"
                  />
                </div>
                <div>
                  <label className="font-mono text-[10px] uppercase tracking-wider text-chakra-silver block mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-chakra-charcoal/50 border border-chakra-grey-2 rounded-sm text-chakra-white text-sm focus:outline-none focus:border-chakra-crimson/50 focus:shadow-[0_0_15px_rgba(220,31,46,0.1)] transition-all"
                    placeholder="What is this about?"
                  />
                </div>
                <div>
                  <label className="font-mono text-[10px] uppercase tracking-wider text-chakra-silver block mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 bg-chakra-charcoal/50 border border-chakra-grey-2 rounded-sm text-chakra-white text-sm focus:outline-none focus:border-chakra-crimson/50 focus:shadow-[0_0_15px_rgba(220,31,46,0.1)] transition-all resize-none"
                    placeholder="Tell us more..."
                  />
                </div>
                <p className="font-mono text-[10px] text-chakra-grey-3 mb-4 tracking-wide">
                  This form is ready for backend integration. Messages are not yet sent to a server.
                </p>
                <button
                  type="submit"
                  disabled={sent}
                  className="btn-primary w-full disabled:opacity-70"
                >
                  {sent ? (
                    <>
                      <CheckCircle2 size={16} />
                      <span>Message Sent</span>
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </Reveal>
        </div>

        {/* Closing tagline */}
        <Reveal delay={0.2}>
          <div className="mt-20 text-center relative">
            <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-chakra-crimson/20 to-transparent" />
            <div className="relative inline-block bg-chakra-black-2 px-8">
              <p className="font-display font-bold text-2xl lg:text-4xl text-chakra-white tracking-wide">
                ENGINEERING BEYOND BOUNDARIES
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
