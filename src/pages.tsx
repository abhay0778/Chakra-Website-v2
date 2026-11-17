import { useEffect, useState, type ChangeEvent, type FormEvent, type PointerEvent as ReactPointerEvent } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowDownRight, ArrowLeft, ArrowRight, Bot, BrainCircuit, Check, CheckCircle2, Cpu, DraftingCompass, Loader2, Mail, MapPin, Send, Sparkles, Wrench } from 'lucide-react';
import { ActionLink, BlueprintPanel, InfoBlock, PageIntro, PageSection } from '@/components/PageElements';
import { divisions, getDivision, type DivisionId } from '@/data/divisions';
import { getProject, getProjectsByDivision } from '@/data/projects';
import { contactInfo, sponsors } from '@/data/sponsors';
import ProjectArena from '@/components/ProjectArena';
import RobotArmPanel from '@/components/RobotArmPanel';
import {
  recruitmentConfig,
  submitRegistration,
  validateRegistration,
  type RegistrationFormErrors,
  type RegistrationFormValues,
} from '@/lib/recruitment';

const buildAreas = [
  { id: 'CRD', title: 'Competitive Robotics', description: 'Designing, modelling and competing with high-performance robots.', to: '/divisions/crd', icon: Wrench, number: '01' },
  { id: 'IPD', title: 'Innovation & Product Development', description: 'Turning real-world problems into original ideas and prototypes.', to: '/divisions/ipd', icon: DraftingCompass, number: '02' },
  { id: 'ASD', title: 'Applied AI & Robotics Software', description: 'Building the intelligence and software backbone of robotic systems.', to: '/divisions/asd', icon: BrainCircuit, number: '03' },
];

function CountdownDisplay() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0, expired: false });

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const nowIST = new Date(now.getTime() + 5.5 * 60 * 60 * 1000);
      let target = new Date(nowIST);
      const dayOfWeek = target.getUTCDay();

      if (dayOfWeek === 1) {
        target.setUTCHours(23, 59, 59, 999);
        if (target.getTime() <= now.getTime() + 5.5 * 60 * 60 * 1000) {
          target = new Date(target.getTime() + 7 * 24 * 60 * 60 * 1000);
        }
      } else {
        const daysToMonday = dayOfWeek === 0 ? 1 : (8 - dayOfWeek) % 7 || 7;
        target.setUTCDate(target.getUTCDate() + daysToMonday);
        target.setUTCHours(23, 59, 59, 999);
      }

      const diff = target.getTime() - Date.now();
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, expired: true });
        return;
      }

      const totalSeconds = Math.floor(diff / 1000);
      const days = Math.floor(totalSeconds / 86400);
      const hours = Math.floor((totalSeconds % 86400) / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;

      setTimeLeft({ days, hours, minutes, seconds, expired: false });
    };

    updateCountdown();
    const timer = window.setInterval(updateCountdown, 1000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="mt-8 flex flex-wrap justify-center gap-3 sm:gap-4">
      {[
        ['Days', timeLeft.days],
        ['Hours', timeLeft.hours],
        ['Minutes', timeLeft.minutes],
        ['Seconds', timeLeft.seconds],
      ].map(([label, value]) => (
        <div key={label} className="min-w-[88px] border border-white/10 bg-white/[0.02] px-3 py-4 shadow-[0_0_25px_rgba(14,165,233,0.12)] backdrop-blur-sm sm:min-w-[110px]">
          <div className="font-display text-3xl font-bold tracking-[-0.06em] text-chakra-white sm:text-4xl">
            {String(value).padStart(2, '0')}
          </div>
          <div className="mt-2 font-mono text-[9px] uppercase tracking-[0.28em] text-chakra-silver/70">{label}</div>
        </div>
      ))}
    </div>
  );
}

export function HomePage() {
  return (
    <div>
      <section className="relative flex min-h-[88svh] items-center overflow-hidden border-b border-white/[0.06] pt-28">
        <div className="absolute inset-0 bg-chakra-black" />
        <div className="absolute inset-0 grid-pattern opacity-40" />
        <div className="absolute -right-36 top-1/4 h-[28rem] w-[28rem] rounded-full border border-chakra-electric/10" />
        <div className="absolute -right-20 top-[30%] h-80 w-80 rounded-full border border-chakra-crimson/10" />
        <div className="absolute right-[15%] top-[39%] h-32 w-32 rounded-full bg-chakra-electric/[0.06] blur-3xl" />
        <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-4 py-20 lg:grid-cols-[1.4fr_.6fr] lg:px-8">
          <div>
            <p className="section-label"><span className="text-chakra-crimson">01</span> Robotics &amp; AI community</p>
            <h1 className="mt-8 font-display text-[clamp(3.2rem,10vw,8rem)] font-bold leading-[.82] tracking-[-.07em] text-chakra-white">
              TEAM<br /><span className="text-chakra-crimson">CHAKRA</span><br />ROBOTICS
            </h1>
            <p className="mt-8 font-mono text-xs uppercase tracking-[.34em] text-chakra-silver-2 sm:text-sm">Engineering Beyond Boundaries.</p>
            <p className="mt-5 max-w-2xl text-body-lg">Engineering intelligent systems, building advanced robotics and transforming innovative ideas into real-world solutions.</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <ActionLink to="/projects">Explore Our Work</ActionLink>
            </div>
          </div>
          <div className="hidden justify-center lg:flex">
            <div className="relative flex aspect-square w-full max-w-[330px] items-center justify-center border border-white/10 bg-white/[0.015] p-8">
              <span className="absolute left-0 top-0 h-8 w-8 border-l border-t border-chakra-crimson" />
              <span className="absolute bottom-0 right-0 h-8 w-8 border-b border-r border-chakra-electric" />
              <img src="/assets/branding/chakra-logo.png" alt="TEAM CHAKRA ROBOTICS official logo" className="h-full w-full object-contain" />
              <span className="absolute bottom-4 right-4 font-mono text-[9px] tracking-[.2em] text-chakra-silver/50">CH / 2026</span>
            </div>
          </div>
        </div>
        <div className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 items-center gap-3 font-mono text-[9px] uppercase tracking-[.25em] text-chakra-silver/50 md:flex"><ArrowDownRight size={14} /> Explore the work</div>
      </section>

      <section className="winter-recruitment-title" aria-label="Winter Recruitment 2026">
        <div className="winter-title-atmosphere" aria-hidden="true">
          <div className="winter-title-grid" />
          <div className="winter-title-streak winter-title-streak-cyan" />
          <div className="winter-title-streak winter-title-streak-red" />
          <div className="winter-title-particles"><i /><i /><i /><i /><i /><i /><i /><i /></div>
        </div>
        <motion.h2
          initial={{ opacity: 0, y: 22, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, amount: 0.65 }}
          transition={{ duration: 0.85, ease: [0.2, 0.75, 0.25, 1] }}
        >
          <span className="winter-title-words">WINTER RECRUITMENT</span>
          <span className="winter-title-year">2026</span>
        </motion.h2>
      </section>

      <section className="recruitment-showcase relative overflow-hidden border-b border-white/[0.06] bg-[#05070c] py-20 lg:py-28">
        <div className="recruitment-glow" />
        <div className="recruitment-grid" />
        <div className="recruitment-shape recruitment-shape-1" />
        <div className="recruitment-shape recruitment-shape-2" />
        <div className="recruitment-shape recruitment-shape-3" />
        <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.7 }} className="mx-auto max-w-5xl text-center">
            <p className="section-label justify-center"><span className="text-chakra-crimson">/</span>RECRUITMENT 2026</p>
            <h2 className="mt-8 font-display text-4xl font-bold tracking-[-0.06em] text-white sm:text-5xl lg:text-7xl">BE PART OF TEAM CHAKRA.</h2>
            <p className="mt-5 text-lg font-medium uppercase tracking-[0.22em] text-chakra-electric sm:text-xl">Build. Innovate. Compete. Engineer the Future.</p>
            <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.35em] text-chakra-silver/80">PRE-RECRUITMENT REGISTRATION CLOSES IN</p>
            <CountdownDisplay />
            <div className="mt-10 flex justify-center">
              <Link to="/recruitment" className="btn-primary">REGISTER NOW <ArrowRight size={16} /></Link>
            </div>
          </motion.div>
        </div>
      </section>

      <PageSection className="grid gap-8 border-b border-white/[0.06] py-20 lg:grid-cols-[.65fr_1.35fr] lg:py-28">
        <p className="section-label">02 / Who we are</p>
        <div>
          <h2 className="heading-lg max-w-3xl">An interdisciplinary Robotics and AI community.</h2>
          <p className="text-body-lg mt-5 max-w-3xl">TEAM CHAKRA ROBOTICS is focused on research, engineering, innovation and the development of intelligent robotic systems.</p>
          <ActionLink to="/about" secondary className="mt-7">Explore About Us</ActionLink>
        </div>
      </PageSection>

      <PageSection className="border-b border-white/[0.06] py-20 lg:py-28">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <div><p className="section-label">03 / What we build</p><h2 className="heading-lg mt-5">Three divisions. One mission.</h2></div>
          <Link to="/projects" className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[.15em] text-chakra-silver-2 hover:text-chakra-white">Explore our work <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" /></Link>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {buildAreas.map(({ id, title, description, to, icon: Icon, number }) => (
            <motion.article key={id} whileHover={{ y: -4 }} className="group border border-white/10 bg-white/[0.02] p-6 transition-colors hover:border-white/20 sm:p-8">
              <div className="flex items-center justify-between"><span className="font-mono text-xs text-chakra-silver/60">{number} / {id}</span><Icon className="text-chakra-electric" size={22} strokeWidth={1.5} /></div>
              <h3 className="mt-12 font-display text-xl font-semibold text-chakra-white">{title}</h3>
              <p className="mt-3 min-h-12 text-sm leading-6 text-chakra-silver-2">{description}</p>
              <Link to={to} className="mt-6 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[.2em] text-chakra-silver group-hover:text-chakra-white">Explore <ArrowRight size={14} /></Link>
            </motion.article>
          ))}
        </div>
      </PageSection>

      <PageSection className="py-20 lg:py-28">
        <div className="relative overflow-hidden border border-white/10 bg-[#0b0c10] px-6 py-14 text-center sm:px-12">
          <div className="absolute inset-0 grid-pattern opacity-20" />
          <div className="relative"><p className="section-label justify-center">04 / Build with us</p><h2 className="heading-lg mt-5">Become a sponsor.</h2><p className="text-body-lg mx-auto mt-4 max-w-2xl">Be part of our journey in building innovative technologies and advancing robotics.</p><ActionLink to="/contact" className="mt-7">Contact Us</ActionLink></div>
        </div>
      </PageSection>
    </div>
  );
}

export function AboutPage() {
  const mission = ['Encourage interdisciplinary robotics development.', 'Build practical engineering solutions.', 'Explore artificial intelligence and automation.', 'Develop competitive robotics systems.', 'Transform innovative ideas into working prototypes and products.'];
  const disciplines = ['Robotics and autonomous systems', 'Competitive robotics', 'Artificial intelligence', 'Embedded systems', 'Mechanical design', 'Robotics software', 'Research and product development'];
  return <div><PageIntro eyebrow="About Us" title="Engineering, together." description="An interdisciplinary Robotics and AI community focused on research, engineering, innovation and the development of intelligent robotic systems." />
    <PageSection className="grid gap-12 border-y border-white/[0.06] py-16 lg:grid-cols-2 lg:py-20"><InfoBlock label="01 / Who we are" title="A community for building intelligent systems"><p>TEAM CHAKRA ROBOTICS is a Robotics and AI Club focused on interdisciplinary engineering, robotics development, research and innovation. We bring together different engineering disciplines to explore, design and develop intelligent robotic systems.</p></InfoBlock><BlueprintPanel index="01" label="Interdisciplinary engineering" icon={Cpu} /></PageSection>
    <PageSection className="grid gap-12 py-16 md:grid-cols-2 lg:py-24"><InfoBlock label="02 / Our vision" title="Solve real-world challenges"><p>To create an environment where innovation, engineering and intelligent technologies come together to solve real-world challenges.</p></InfoBlock><InfoBlock label="03 / Our mission" title="Make ideas practical"><ul className="space-y-3">{mission.map((item) => <li key={item} className="flex gap-3"><Check size={16} className="mt-1 shrink-0 text-chakra-electric" />{item}</li>)}</ul></InfoBlock></PageSection>
    <PageSection className="border-y border-white/[0.06] py-16 lg:py-20"><p className="section-label">04 / What we do</p><h2 className="heading-lg mt-5">A connected engineering practice.</h2><div className="mt-8 grid gap-px border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">{disciplines.map((item, index) => <div key={item} className="bg-chakra-black-2 p-5"><span className="font-mono text-[10px] text-chakra-crimson">0{index + 1}</span><h3 className="mt-3 font-display text-base text-chakra-white">{item}</h3></div>)}</div></PageSection>
    <PageSection className="grid gap-12 py-16 lg:grid-cols-[.8fr_1.2fr] lg:py-24"><div><p className="section-label">05 / Our approach</p><h2 className="heading-lg mt-5">From disciplines to systems.</h2></div><p className="text-body-lg">Our work brings engineering areas together across the design, development and testing of robotic systems. Mechanical design, embedded systems, software and AI contribute to a shared engineering process, from early concepts and prototypes through evaluation and refinement.</p></PageSection>
  </div>;
}

export function DivisionsPage() {
  return <div><PageIntro eyebrow="Divisions" title="Three divisions. Shared curiosity." description="Explore the three official engineering divisions of TEAM CHAKRA ROBOTICS." /><PageSection className="grid gap-4 pb-24 md:grid-cols-3">{divisions.map((division, index) => <Link key={division.id} to={`/divisions/${division.slug}`} className="group"><article className="division-card h-full border border-white/10 bg-white/[0.02] p-6 transition-all hover:-translate-y-1 hover:border-chakra-electric/40 sm:p-8"><div className="flex items-center justify-between"><span className="font-mono text-[10px] uppercase tracking-[.25em] text-chakra-silver">Division / 0{index + 1}</span><span className={`h-2 w-2 rounded-full ${division.accent === 'red' ? 'bg-chakra-crimson' : 'bg-chakra-electric'}`} /></div><div className="my-12 flex h-36 items-center justify-center border-y border-white/[0.06] bg-grid-pattern"><span className="font-display text-6xl font-bold tracking-[-.06em] text-white/10 transition-colors group-hover:text-white/20">{division.id}</span></div><h2 className="font-display text-xl font-semibold text-chakra-white">{division.name}</h2><p className="mt-3 text-sm leading-6 text-chakra-silver-2">{division.summary}</p><span className="mt-7 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[.2em] text-chakra-electric">Explore division <ArrowRight size={14} /></span></article></Link>)}</PageSection></div>;
}

export function DivisionDetailPage() {
  const { divisionId = '' } = useParams();
  const division = getDivision(divisionId);
  if (!division) return <NotFoundPage />;
  const related = getProjectsByDivision(division.id);
  const leftPanel = division.id === 'IPD'
    ? <RobotArmPanel />
    : <BlueprintPanel index={division.id} label={division.name} icon={division.id === 'CRD' ? Bot : BrainCircuit} />;

  return <div><PageIntro eyebrow={`Division / ${division.id}`} title={division.name} description={division.summary} /><PageSection className="grid gap-10 border-y border-white/[0.06] py-16 lg:grid-cols-[.8fr_1.2fr]"><div>{leftPanel}</div><div className="space-y-8"><InfoBlock label="01 / What it is" title="The focus"><p>{division.whatItIs}</p></InfoBlock><InfoBlock label="02 / What we'll do" title="The work"><p>{division.whatWeDo}</p></InfoBlock><InfoBlock label="03 / What you'll gain" title="The experience"><ul className="space-y-3">{division.whatYouGain.map((item) => <li key={item} className="flex gap-3"><Check size={16} className="mt-1 shrink-0 text-chakra-electric" />{item}</li>)}</ul></InfoBlock></div></PageSection><PageSection className="py-16"><p className="section-label">Focus areas</p><div className="mt-6 flex flex-wrap gap-2">{division.focusAreas.map((area) => <span key={area} className="border border-white/10 px-4 py-3 font-mono text-xs text-chakra-silver-2">{area}</span>)}</div><h2 className="heading-md mt-16">Related projects and products</h2>{related.length ? <div className="mt-6 grid gap-4 md:grid-cols-2">{related.map((project) => <Link key={project.id} to={`/projects/${project.slug}`} className="border border-white/10 p-6 hover:border-chakra-electric/40">{project.name}<ArrowRight size={16} className="inline ml-3" /></Link>)}</div> : <p className="mt-4 max-w-2xl text-body">Project details will appear here when verified project information is available.</p>}<Link to="/divisions" className="mt-12 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-chakra-silver hover:text-white"><ArrowLeft size={15} /> All divisions</Link></PageSection></div>;
}

export function ProjectsPage() {
  const [active, setActive] = useState<DivisionId>('CRD');
  const current = getProjectsByDivision(active);

  return (
    <div>
      <PageIntro eyebrow="Robotics Arena" title="Projects & Products" description="Explore engineering work across competitive robotics, product development, applied AI and robotics software." />
      <PageSection className="pb-24">
        <div className="flex flex-wrap gap-2 border-b border-white/10 pb-4" role="group" aria-label="Project division">
          {(['CRD', 'IPD', 'ASD'] as DivisionId[]).map((id) => (
            <button key={id} type="button" aria-pressed={active === id} onClick={() => setActive(id)} className={`min-w-20 border px-6 py-3 font-mono text-xs tracking-[.2em] transition-colors ${active === id ? 'border-chakra-electric/60 bg-chakra-electric/10 text-white' : 'border-transparent text-chakra-silver hover:text-white'}`}>
              {id}
            </button>
          ))}
        </div>
        <div className="mt-8 grid gap-10 lg:grid-cols-[.8fr_1.2fr]">
          <div>
            <p className="section-label">{active} / {divisions.find((division) => division.id === active)?.name}</p>
            <h2 className="heading-lg mt-5">Verified entries only.</h2>
            <p className="text-body-lg mt-4">This showcase is ready for verified {active} projects and products. No unverified project claims or imagery are displayed.</p>
          </div>
          {current.length ? <ProjectArena key={active} projects={current} /> : (
            <div className="relative flex min-h-[320px] flex-col items-center justify-center overflow-hidden border border-white/10 bg-[#0b0c10] p-8 text-center">
              <div className="absolute inset-0 grid-pattern opacity-30" />
              <span className="relative flex h-16 w-16 items-center justify-center border border-chakra-electric/30 text-chakra-electric"><Cpu size={24} /></span>
              <p className="relative mt-6 font-mono text-[10px] uppercase tracking-[.25em] text-chakra-silver">{active} / Arena archive</p>
              <h3 className="relative mt-3 font-display text-xl text-chakra-white">Verified project entries will appear here.</h3>
              <p className="relative mt-2 max-w-md text-sm text-chakra-silver-2">Authentic project details and images can be added when supplied.</p>
            </div>
          )}
        </div>
      </PageSection>
    </div>
  );
}

export function ProjectDetailPage() {
  const { projectId = '' } = useParams();
  const project = getProject(projectId);
  if (!project) return <div><PageIntro eyebrow="Project details" title="Project information pending" description="This route is ready for an individual project page. Verified project details have not been added yet." /><PageSection><ActionLink to="/projects" secondary><ArrowLeft size={15} />Back to projects</ActionLink></PageSection></div>;
  return <div>
    <PageIntro eyebrow={`${project.division} / Project`} title={project.name} description={project.description} />
    {project.images?.length ? <PageSection className="grid gap-4 sm:grid-cols-2">{project.images.map((image) => <img key={image} src={image} alt={`${project.name} development`} loading="lazy" className="max-h-[34rem] w-full border border-white/10 object-contain" />)}</PageSection> : <PageSection><BlueprintPanel index={project.division} label="Authentic project imagery pending" /></PageSection>}
    <PageSection className="grid gap-8 border-y border-white/10 py-16 md:grid-cols-2">
      <InfoBlock label="Overview" title="Project overview"><p>{project.description}</p></InfoBlock>
      {project.problem && <InfoBlock label="Problem" title="Problem being addressed"><p>{project.problem}</p></InfoBlock>}
      {project.approach && <InfoBlock label="Approach" title="Our approach"><p>{project.approach}</p></InfoBlock>}
      {project.status && <InfoBlock label="Development" title="Current status"><p>{project.status}</p></InfoBlock>}
      {project.technologies?.length ? <InfoBlock label="Technologies" title="Technologies used"><div className="flex flex-wrap gap-2">{project.technologies.map((technology) => <span key={technology} className="border border-white/10 px-3 py-2 font-mono text-xs">{technology}</span>)}</div></InfoBlock> : null}
      {project.specifications?.length ? <InfoBlock label="Specifications" title="Technical specifications"><dl className="space-y-3">{project.specifications.map((spec) => <div key={spec.label} className="flex justify-between gap-4 border-b border-white/10 pb-2"><dt>{spec.label}</dt><dd className="text-right text-white">{spec.value}</dd></div>)}</dl></InfoBlock> : null}
    </PageSection>
  </div>;
}

export function SponsorsPage() {
  return <div><PageIntro eyebrow="Supporters" title="OUR SPONSORS" description="We recognise the organisations that support our journey in engineering, innovation and robotics." /><PageSection className="grid gap-5 pb-12 md:grid-cols-2">{sponsors.map((sponsor, index) => <motion.article key={sponsor.id} whileHover={{ y: -4 }} className="border border-white/10 bg-[#111317] p-5 sm:p-7"><div className="mb-6 flex min-h-56 items-center justify-center border border-black/5 bg-white p-6"><img src={sponsor.logo} alt={`${sponsor.name} logo`} className="max-h-40 max-w-full object-contain" /></div><p className="font-mono text-[10px] uppercase tracking-[.2em] text-chakra-silver">Sponsor / 0{index + 1}</p><h2 className="mt-2 font-display text-2xl font-semibold text-chakra-white">{sponsor.name}</h2><p className="mt-3 text-body">{sponsor.description}</p></motion.article>)}</PageSection><PageSection className="pb-24"><div className="border border-white/10 bg-white/[0.02] px-6 py-12 text-center sm:px-10"><p className="section-label justify-center">Support the work</p><h2 className="heading-lg mt-5">BECOME A SPONSOR</h2><p className="text-body-lg mx-auto mt-4 max-w-2xl">Be part of our journey in building innovative technologies and advancing robotics.</p><ActionLink to="/contact" className="mt-7">Contact Us</ActionLink></div></PageSection></div>;
}

export function ContactPage() {
  const [notice, setNotice] = useState('');
  const submit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); setNotice('The form is not connected to a message service yet. Please use the contact details provided.'); };
  return <div><PageIntro eyebrow="Contact" title="Let's connect." description="Have a question or want to get in touch with TEAM CHAKRA ROBOTICS?" /><PageSection className="grid gap-10 pb-24 lg:grid-cols-[.8fr_1.2fr]"><div className="space-y-5"><div className="border border-white/10 p-6"><Mail className="text-chakra-electric" size={20} /><p className="mt-5 font-mono text-[10px] uppercase tracking-[.2em] text-chakra-silver">Email</p><a className="mt-2 block break-all text-chakra-white hover:text-chakra-electric" href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a></div><div className="border border-white/10 p-6"><MapPin className="text-chakra-crimson" size={20} /><p className="mt-5 font-mono text-[10px] uppercase tracking-[.2em] text-chakra-silver">Location</p><p className="mt-2 text-chakra-white">{contactInfo.institution}<br />{contactInfo.location}</p></div><div className="border border-white/10 p-6"><Sparkles className="text-chakra-electric" size={20} /><p className="mt-5 font-mono text-[10px] uppercase tracking-[.2em] text-chakra-silver">Social</p><div className="mt-3 flex gap-5"><a href={contactInfo.instagram} target="_blank" rel="noreferrer" className="text-sm text-chakra-silver-2 hover:text-white">Instagram</a><a href={contactInfo.linkedin} target="_blank" rel="noreferrer" className="text-sm text-chakra-silver-2 hover:text-white">LinkedIn</a></div></div></div><form onSubmit={submit} className="border border-white/10 bg-white/[0.02] p-6 sm:p-8"><h2 className="font-display text-xl font-semibold text-chakra-white">Send a message</h2><p className="mt-2 text-sm text-chakra-silver">The form is prepared for future backend integration; it does not send messages yet.</p><div className="mt-7 grid gap-5 sm:grid-cols-2">{[['name','Name','text'],['email','Email','email'],['subject','Subject','text']].map(([name,label,type]) => <label key={name} className={`block ${name === 'subject' ? 'sm:col-span-2' : ''}`}><span className="font-mono text-[10px] uppercase tracking-wider text-chakra-silver">{label}</span><input name={name} type={type} required className="mt-2 w-full border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none focus:border-chakra-electric" /></label>)}<label className="block sm:col-span-2"><span className="font-mono text-[10px] uppercase tracking-wider text-chakra-silver">Message</span><textarea name="message" required rows={5} className="mt-2 w-full resize-y border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none focus:border-chakra-electric" /></label></div>{notice && <p role="status" className="mt-5 border-l border-chakra-electric pl-3 text-sm text-chakra-silver-2">{notice}</p>}<button type="submit" className="btn-primary mt-6"><Send size={15} />Submit</button></form></PageSection></div>;
}

const initialRegistrationForm: RegistrationFormValues = {
  fullName: '',
  email: '',
  phone: '',
  usn: '',
  consent: false,
};

export function RecruitmentPage() {
  const [formData, setFormData] = useState<RegistrationFormValues>(initialRegistrationForm);
  const [errors, setErrors] = useState<RegistrationFormErrors>({});
  const [notice, setNotice] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleScenePointerMove = (event: ReactPointerEvent<HTMLElement>) => {
    if (event.pointerType === 'touch') return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    const depths: Array<[string, number]> = [['back', 7], ['far', 13], ['mid', 20], ['near', 31]];
    depths.forEach(([depth, factor]) => {
      event.currentTarget.style.setProperty(`--parallax-${depth}-x`, `${(x * factor).toFixed(2)}px`);
      event.currentTarget.style.setProperty(`--parallax-${depth}-y`, `${(y * factor).toFixed(2)}px`);
    });
  };

  const handleFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, type, value, checked } = event.target;
    const nextValue = type === 'checkbox' ? checked : value;

    setFormData((previous) => ({ ...previous, [name]: nextValue }));
    setErrors((previous) => ({ ...previous, [name]: '' }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    const nextErrors = validateRegistration(formData);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setNotice('Please correct the highlighted fields before submitting.');
      return;
    }

    const duplicateKey = `${formData.email.trim().toLowerCase()}::${formData.phone.replace(/\D/g, '')}`;
    let parsedAttempts: Record<string, string> = {};
    try {
      const savedAttempts = sessionStorage.getItem('chakra-recruitment-attempts');
      parsedAttempts = savedAttempts ? JSON.parse(savedAttempts) as Record<string, string> : {};
    } catch {
      // Storage can be disabled or stale; allow the backend to remain authoritative.
    }

    if (parsedAttempts[duplicateKey]) {
      setNotice('This registration has already been submitted for this email and phone number. Please contact the team if you need to update your details.');
      return;
    }

    setIsSubmitting(true);
    setNotice('');

    try {
      await submitRegistration(formData);

      parsedAttempts[duplicateKey] = new Date().toISOString();
      try {
        sessionStorage.setItem('chakra-recruitment-attempts', JSON.stringify(parsedAttempts));
      } catch {
        // A successful backend save must still be confirmed if browser storage is unavailable.
      }
      setErrors({});
      setIsSuccess(true);
      setNotice('');

      window.setTimeout(() => {
        window.location.href = recruitmentConfig.whatsappLink;
      }, recruitmentConfig.redirectDelayMs);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unable to save your registration right now. Please try again.';
      setNotice(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <section className="portal-scene" onPointerMove={handleScenePointerMove}>
        <PortalBackdrop />
          <motion.div className="portal-card portal-success" initial={{ opacity: 0, scale: 0.96, y: 18 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.55 }}>
          <div className="portal-card-topline"><span>TEAM CHAKRA <i>/</i> ROBOTICS</span><span className="portal-cycle">2026</span></div>
          <div className="portal-success-icon"><CheckCircle2 size={30} /></div>
          <p className="portal-kicker">REGISTRATION CONFIRMED</p>
          <h1>YOU’RE IN.</h1>
          <p className="portal-success-copy">Your details have been saved successfully. Redirecting you to the CHAKRA Robotics community.</p>
          <div className="portal-redirect-track"><span /></div>
          <a className="portal-submit portal-success-link" href={recruitmentConfig.whatsappLink} target="_blank" rel="noreferrer">JOIN WHATSAPP COMMUNITY <span>↗</span></a>
          </motion.div>
      </section>
    );
  }

  return (
    <section className="portal-scene" onPointerMove={handleScenePointerMove} aria-labelledby="recruitment-title">
      <PortalBackdrop />
        <motion.div className="portal-card" initial={{ opacity: 0, y: 24, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.72, ease: [0.2, 0.75, 0.25, 1] }}>
        <div className="portal-card-topline">
          <div className="portal-brand"><span>TEAM CHAKRA <i>/</i> ROBOTICS</span></div>
          <span className="portal-cycle"><i /> RECRUITMENT 2026</span>
        </div>

        <div className="portal-heading">
          <p className="portal-kicker">APPLICATIONS OPEN <span /></p>
          <h1 id="recruitment-title">JOIN TEAM<br /><em>CHAKRA ROBOTICS</em></h1>
          <p>Take the first step towards building, innovating and engineering the future.</p>
        </div>

        <form onSubmit={handleSubmit} className="portal-form" noValidate>
          <div className="portal-fields">
            <motion.label className="portal-field" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.4 }}>
              <span>Full Name</span>
              <input autoComplete="name" name="fullName" value={formData.fullName} onChange={handleFieldChange} placeholder="Your full name" aria-invalid={Boolean(errors.fullName)} />
              {errors.fullName && <small>{errors.fullName}</small>}
            </motion.label>
            <motion.label className="portal-field" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.22, duration: 0.4 }}>
              <span>Email Address</span>
              <input autoComplete="email" type="email" name="email" value={formData.email} onChange={handleFieldChange} placeholder="name@example.com" aria-invalid={Boolean(errors.email)} />
              {errors.email && <small>{errors.email}</small>}
            </motion.label>
            <motion.label className="portal-field" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.29, duration: 0.4 }}>
              <span>Phone Number</span>
              <input autoComplete="tel" type="tel" name="phone" value={formData.phone} onChange={handleFieldChange} placeholder="+91 98765 43210" aria-invalid={Boolean(errors.phone)} />
              {errors.phone && <small>{errors.phone}</small>}
            </motion.label>
            <motion.label className="portal-field" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.36, duration: 0.4 }}>
              <span>USN</span>
              <input autoComplete="off" name="usn" value={formData.usn} onChange={handleFieldChange} placeholder="University seat number" aria-invalid={Boolean(errors.usn)} />
              {errors.usn && <small>{errors.usn}</small>}
            </motion.label>
          </div>

          <motion.div className="portal-consent-wrap" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.43, duration: 0.35 }}>
            <label className="portal-consent">
              <input type="checkbox" name="consent" checked={formData.consent} onChange={handleFieldChange} aria-invalid={Boolean(errors.consent)} />
              <span>I confirm that my information is accurate and agree to be contacted about recruitment.</span>
            </label>
            {errors.consent && <small>{errors.consent}</small>}
          </motion.div>

          {notice && <motion.div className="portal-notice" role="alert" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>{notice}</motion.div>}

          <motion.button type="submit" disabled={isSubmitting} className="portal-submit" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.35 }}>
            <span>{isSubmitting ? 'SAVING REGISTRATION' : 'SUBMIT REGISTRATION'}</span>
            {isSubmitting ? <Loader2 className="portal-spinner" size={18} /> : <span className="portal-submit-arrow">↗</span>}
          </motion.button>
        </form>

        <div className="portal-card-footer"><span><i /> SECURE REGISTRATION</span><span>CH / 2026</span></div>
        </motion.div>
    </section>
  );
}

function PortalBackdrop() {
  return (
    <div className="portal-backdrop" aria-hidden="true">
      <div className="portal-grid portal-parallax portal-depth-back" />
      <div className="portal-glow portal-glow-cyan portal-parallax portal-depth-near" />
      <div className="portal-glow portal-glow-red portal-parallax portal-depth-far" />
      <div className="portal-orbit portal-orbit-a portal-parallax portal-depth-back"><span /></div>
      <div className="portal-orbit portal-orbit-b portal-parallax portal-depth-far"><span /></div>
      <div className="portal-shape portal-square portal-square-a portal-parallax portal-depth-near"><i /></div>
      <div className="portal-shape portal-square portal-square-b portal-parallax portal-depth-back"><i /></div>
      <div className="portal-shape portal-hex portal-hex-a portal-parallax portal-depth-near"><i /></div>
      <div className="portal-shape portal-diamond portal-diamond-a portal-parallax portal-depth-far"><i /></div>
      <div className="portal-shape portal-ring-shape portal-ring-a portal-parallax portal-depth-back" />
      <div className="portal-shape portal-ring-shape portal-ring-b portal-parallax portal-depth-near" />
      <svg className="portal-circuit portal-parallax portal-depth-back" viewBox="0 0 1600 1000" preserveAspectRatio="none">
        <path d="M-30 255h180l54 54h160l52 52v86h132l66 66h182" />
        <path d="M1630 215h-160l-64 64h-128l-55 55v132h-160l-82 82h-130" />
        <path d="M-30 764h235l64-64h125l51-51v-96h125" />
        <path d="M1630 730h-205l-54-54h-148l-58-58v-96h-140" />
        <path className="portal-circuit-pulse portal-pulse-cyan" d="M-30 255h180l54 54h160l52 52v86h132l66 66h182" />
        <path className="portal-circuit-pulse portal-pulse-red" d="M1630 215h-160l-64 64h-128l-55 55v132h-160l-82 82h-130" />
        <g><circle cx="150" cy="255" r="4" /><circle cx="466" cy="361" r="4" /><circle cx="1220" cy="466" r="4" /><circle cx="1425" cy="730" r="4" /></g>
      </svg>
      <div className="portal-trails"><i /><i /><i /></div>
      <div className="portal-particles">
        <i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i />
      </div>
      <div className="portal-vignette" />
    </div>
  );
}

export function NotFoundPage() {
  return <div><PageIntro eyebrow="404 / Not found" title="This route is not in the map." description="The page may have moved or the address may be incorrect." /><PageSection><ActionLink to="/" secondary><ArrowLeft size={15} />Return home</ActionLink></PageSection></div>;
}
