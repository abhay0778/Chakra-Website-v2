export type DivisionId = 'IPD' | 'CRD' | 'ASD';

export interface Division {
  id: DivisionId;
  slug: string;
  name: string;
  summary: string;
  whatItIs: string;
  whatWeDo: string;
  whatYouGain: string[];
  focusAreas: string[];
  accent: 'red' | 'blue';
}

export const divisions: Division[] = [
  {
    id: 'IPD',
    slug: 'ipd',
    name: 'Innovation and Patent Division',
    summary: 'The research and invention wing that turns ideas into products.',
    whatItIs: 'The research and invention wing that turns ideas into products.',
    whatWeDo: 'Transforming real-world problems into original ideas, prototypes, and patent-ready solutions through R&D and structured documentation.',
    whatYouGain: [
      'Ability to build solutions for real-world adoption.',
      'Evaluating feasibility and practical impact.',
    ],
    focusAreas: ['Research and development', 'Product development', 'Innovation and prototyping'],
    accent: 'blue',
  },
  {
    id: 'CRD',
    slug: 'crd',
    name: 'Competitive Robotics Division',
    summary: 'The high-intensity division focused on global robotics competitions.',
    whatItIs: 'The high-intensity division focused on global robotics competitions.',
    whatWeDo: 'Dedicated to designing, modelling, and competing with high-performance robots, giving exposure to world-class competitions.',
    whatYouGain: [
      'Experience working in fast-paced team environments.',
      'Recognition through competitions and achievements.',
    ],
    focusAreas: ['Competitive robot design', 'Mechanical modelling', 'Robot development', 'Testing and optimisation'],
    accent: 'red',
  },
  {
    id: 'ASD',
    slug: 'asd',
    name: 'Applied AI and Software Division',
    summary: 'Builds AI and automation that power robotic systems.',
    whatItIs: 'Builds AI and automation that power robotic systems.',
    whatWeDo: 'Focuses on building the intelligence and software backbone of robotic systems, including perception, decision-making and automation.',
    whatYouGain: [
      'Experience working on system-level software.',
      'Ability to build software solutions and Physical AI.',
    ],
    focusAreas: ['Artificial intelligence', 'Robotics software', 'Computer vision', 'Autonomous systems', 'Perception and decision-making', 'Automation'],
    accent: 'blue',
  },
];

export const getDivision = (slug: string): Division | undefined =>
  divisions.find((division) => division.slug === slug.toLowerCase());
