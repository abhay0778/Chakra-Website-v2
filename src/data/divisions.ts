export type DivisionId = 'IPD' | 'CRD' | 'ASD';

export interface DivisionSection {
  label: string;
  title: string;
  text: string;
}

export interface Division {
  id: DivisionId;
  abbreviation: string;
  fullName: string;
  tagline: string;
  shortDescription: string;
  sections: DivisionSection[];
  focusAreas: string[];
  accentColor: string;
  accentColorHex: string;
  glowRgba: string;
  image: string;
  icon: string;
}

export const divisions: Division[] = [
  {
    id: 'IPD',
    abbreviation: 'IPD',
    fullName: 'Innovation and Patent Division',
    tagline: 'Turning Ideas Into Products',
    shortDescription: 'The research and invention wing that turns ideas into products — transforming real-world problems into original ideas, prototypes, and patent-ready solutions through R&D and structured documentation.',
    sections: [
      {
        label: 'What It Is',
        title: 'The Research and Invention Wing',
        text: 'The Innovation and Patent Division is the research and invention wing that turns ideas into products. It is where concepts are born, evaluated, and developed into tangible solutions with real-world impact.',
      },
      {
        label: "What We'll Do",
        title: 'From Problem To Patent-Ready Solution',
        text: 'Transforming real-world problems into original ideas, prototypes, and patent-ready solutions through R&D and structured documentation. Every idea is evaluated for feasibility, developed through iterative prototyping, and documented for potential patent filing.',
      },
      {
        label: "What You'll Gain",
        title: 'Build For Real-World Adoption',
        text: 'Ability to build solutions for real-world adoption. Evaluating feasibility and practical impact. Members develop the skills to take an idea from concept to a documented, tested, and potentially patentable product.',
      },
    ],
    focusAreas: [
      'Research & Development',
      'Product Development',
      'Innovation & Prototyping',
      'Patent-Ready Documentation',
      'Feasibility Analysis',
      'Structured R&D Process',
    ],
    accentColor: 'electric',
    accentColorHex: '#0ea5e9',
    glowRgba: 'rgba(14, 165, 233, 0.3)',
    image: 'https://images.pexels.com/photos/17483870/pexels-photo-17483870.png?auto=compress&cs=tinysrgb&h=650&w=940',
    icon: 'Lightbulb',
  },
  {
    id: 'CRD',
    abbreviation: 'CRD',
    fullName: 'Competitive Robotics Division',
    tagline: 'Built To Compete',
    shortDescription: 'The high-intensity division focused on global robotics competitions — dedicated to designing, modelling, and competing with high-performance robots, giving exposure to world-class competitions.',
    sections: [
      {
        label: 'What It Is',
        title: 'The Competition Division',
        text: 'The Competitive Robotics Division is the high-intensity division focused on global robotics competitions. It is where engineering meets the pressure of competitive performance at the highest level.',
      },
      {
        label: "What We'll Do",
        title: 'Design, Model & Compete',
        text: 'Dedicated to designing, modelling, and competing with high-performance robots, giving exposure to world-class competitions. Members build robots that are not just functional but optimized for the specific demands of competitive arenas.',
      },
      {
        label: "What You'll Gain",
        title: 'Fast-Paced Team Experience',
        text: 'Experience working in fast-paced team environments. Recognition through competitions and achievements. Members gain the pressure-tested skills that only competitive engineering can provide.',
      },
    ],
    focusAreas: [
      'Competitive Robot Design',
      'Mechanical Modelling',
      'Robot Development',
      'Testing & Optimisation',
      'High-Performance Systems',
      'Competition Strategy',
    ],
    accentColor: 'crimson',
    accentColorHex: '#dc1f2e',
    glowRgba: 'rgba(220, 31, 46, 0.35)',
    image: 'https://images.pexels.com/photos/8438865/pexels-photo-8438865.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    icon: 'Trophy',
  },
  {
    id: 'ASD',
    abbreviation: 'ASD',
    fullName: 'Applied AI and Software Division',
    tagline: 'Intelligence That Powers Robotics',
    shortDescription: 'Builds AI and automation that power robotic systems — focusing on building the intelligence and software backbone of robotic systems, including perception, decision-making and automation.',
    sections: [
      {
        label: 'What It Is',
        title: 'The AI & Software Backbone',
        text: 'The Applied AI and Software Division builds AI and automation that power robotic systems. It is the division that gives robots the ability to perceive, decide and act autonomously.',
      },
      {
        label: "What We'll Do",
        title: 'Perception, Decision-Making & Automation',
        text: 'Focuses on building the intelligence and software backbone of robotic systems, including perception, decision-making and automation. From computer vision pipelines to autonomous control algorithms, ASD creates the software layer that makes robotics intelligent.',
      },
      {
        label: "What You'll Gain",
        title: 'System-Level Software & Physical AI',
        text: 'Experience working on system-level software. Ability to build Software solutions and Physical AI. Members develop expertise in the full software stack that powers modern robotic systems.',
      },
    ],
    focusAreas: [
      'Artificial Intelligence',
      'Robotics Software',
      'Computer Vision',
      'Autonomous Systems',
      'Perception & Decision-Making',
      'Automation',
    ],
    accentColor: 'electric',
    accentColorHex: '#0284c7',
    glowRgba: 'rgba(2, 132, 199, 0.3)',
    image: 'https://images.pexels.com/photos/3823555/pexels-photo-3823555.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    icon: 'Cpu',
  },
];

export const getDivision = (id: string): Division | undefined =>
  divisions.find((d) => d.id.toLowerCase() === id.toLowerCase());
