import { DivisionId } from './divisions';

export interface Project {
  id: string;
  name: string;
  division: DivisionId;
  category: string;
  tagline: string;
  overview: string;
  problemStatement: string;
  approach: string;
  technologies: string[];
  specs: { label: string; value: string }[];
  heroImage: string;
  gallery: string[];
  status: 'In Development' | 'Competition Ready' | 'Active Deployment' | 'Prototype';
  year: string;
}

// Project placeholders — replace with real project information when available.
// Do not fabricate project specifications, performance figures or completion claims.
// Specs shown here are illustrative placeholders for the showcase structure.
export const projects: Project[] = [
  // ===== CRD Projects =====
  {
    id: 'crd-project-1',
    name: '[ CRD Project 1 ]',
    division: 'CRD',
    category: 'Competitive Robotics',
    tagline: 'Competition Robot Platform',
    overview: '[ Project overview will be added when verified information is available. This placeholder demonstrates the Robotics Arena showcase structure for the Competitive Robotics Division. ]',
    problemStatement: '[ Problem statement to be documented. ]',
    approach: '[ Development approach to be documented. ]',
    technologies: ['[ Technology 1 ]', '[ Technology 2 ]', '[ Technology 3 ]'],
    specs: [
      { label: 'Category', value: '[ To be verified ]' },
      { label: 'Status', value: '[ To be verified ]' },
      { label: 'Weight Class', value: '[ To be verified ]' },
      { label: 'Drive System', value: '[ To be verified ]' },
    ],
    heroImage: 'https://images.pexels.com/photos/8438865/pexels-photo-8438865.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    gallery: [
      'https://images.pexels.com/photos/8438976/pexels-photo-8438976.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    ],
    status: 'In Development',
    year: '[ Year ]',
  },
  {
    id: 'crd-project-2',
    name: '[ CRD Project 2 ]',
    division: 'CRD',
    category: 'Mechanical Modelling',
    tagline: 'High-Performance Robot Design',
    overview: '[ Project overview will be added when verified information is available. ]',
    problemStatement: '[ Problem statement to be documented. ]',
    approach: '[ Development approach to be documented. ]',
    technologies: ['[ Technology 1 ]', '[ Technology 2 ]'],
    specs: [
      { label: 'Category', value: '[ To be verified ]' },
      { label: 'Status', value: '[ To be verified ]' },
    ],
    heroImage: 'https://images.pexels.com/photos/8439084/pexels-photo-8439084.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    gallery: [
      'https://images.pexels.com/photos/8294627/pexels-photo-8294627.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    ],
    status: 'Prototype',
    year: '[ Year ]',
  },
  {
    id: 'crd-project-3',
    name: '[ CRD Project 3 ]',
    division: 'CRD',
    category: 'Robot Development',
    tagline: 'Competition-Ready Platform',
    overview: '[ Project overview will be added when verified information is available. ]',
    problemStatement: '[ Problem statement to be documented. ]',
    approach: '[ Development approach to be documented. ]',
    technologies: ['[ Technology 1 ]', '[ Technology 2 ]', '[ Technology 3 ]'],
    specs: [
      { label: 'Category', value: '[ To be verified ]' },
      { label: 'Status', value: '[ To be verified ]' },
    ],
    heroImage: 'https://images.pexels.com/photos/8438880/pexels-photo-8438880.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    gallery: [
      'https://images.pexels.com/photos/8438974/pexels-photo-8438974.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    ],
    status: 'In Development',
    year: '[ Year ]',
  },

  // ===== IPD Products =====
  {
    id: 'ipd-product-1',
    name: '[ IPD Product 1 ]',
    division: 'IPD',
    category: 'Research & Development',
    tagline: 'Innovation Prototype',
    overview: '[ Product overview will be added when verified information is available. This placeholder demonstrates the Robotics Arena showcase structure for the Innovation and Patent Division. ]',
    problemStatement: '[ Real-world problem being addressed to be documented. ]',
    approach: '[ R&D approach to be documented. ]',
    technologies: ['[ Technology 1 ]', '[ Technology 2 ]'],
    specs: [
      { label: 'Category', value: '[ To be verified ]' },
      { label: 'Status', value: '[ To be verified ]' },
      { label: 'Patent Status', value: '[ To be verified ]' },
    ],
    heroImage: 'https://images.pexels.com/photos/17483871/pexels-photo-17483871.png?auto=compress&cs=tinysrgb&h=650&w=940',
    gallery: [
      'https://images.pexels.com/photos/17483873/pexels-photo-17483873.png?auto=compress&cs=tinysrgb&h=650&w=940',
    ],
    status: 'Prototype',
    year: '[ Year ]',
  },
  {
    id: 'ipd-product-2',
    name: '[ IPD Product 2 ]',
    division: 'IPD',
    category: 'Product Development',
    tagline: 'Prototype to Product',
    overview: '[ Product overview will be added when verified information is available. ]',
    problemStatement: '[ Real-world problem being addressed to be documented. ]',
    approach: '[ R&D approach to be documented. ]',
    technologies: ['[ Technology 1 ]', '[ Technology 2 ]'],
    specs: [
      { label: 'Category', value: '[ To be verified ]' },
      { label: 'Status', value: '[ To be verified ]' },
    ],
    heroImage: 'https://images.pexels.com/photos/17483873/pexels-photo-17483873.png?auto=compress&cs=tinysrgb&h=650&w=940',
    gallery: [
      'https://images.pexels.com/photos/17485657/pexels-photo-17485657.png?auto=compress&cs=tinysrgb&h=650&w=940',
    ],
    status: 'In Development',
    year: '[ Year ]',
  },
  {
    id: 'ipd-product-3',
    name: '[ IPD Product 3 ]',
    division: 'IPD',
    category: 'Innovation & Prototyping',
    tagline: 'Patent-Ready Solution',
    overview: '[ Product overview will be added when verified information is available. ]',
    problemStatement: '[ Real-world problem being addressed to be documented. ]',
    approach: '[ R&D approach to be documented. ]',
    technologies: ['[ Technology 1 ]', '[ Technology 2 ]'],
    specs: [
      { label: 'Category', value: '[ To be verified ]' },
      { label: 'Status', value: '[ To be verified ]' },
    ],
    heroImage: 'https://images.pexels.com/photos/17483874/pexels-photo-17483874.png?auto=compress&cs=tinysrgb&h=650&w=940',
    gallery: [
      'https://images.pexels.com/photos/17484975/pexels-photo-17484975.png?auto=compress&cs=tinysrgb&h=650&w=940',
    ],
    status: 'In Development',
    year: '[ Year ]',
  },

  // ===== ASD Projects =====
  {
    id: 'asd-project-1',
    name: '[ ASD Project 1 ]',
    division: 'ASD',
    category: 'Artificial Intelligence',
    tagline: 'AI-Powered Robotics System',
    overview: '[ Project overview will be added when verified information is available. This placeholder demonstrates the Robotics Arena showcase structure for the Applied AI and Software Division. ]',
    problemStatement: '[ Problem statement to be documented. ]',
    approach: '[ Development approach to be documented. ]',
    technologies: ['[ Technology 1 ]', '[ Technology 2 ]', '[ Technology 3 ]'],
    specs: [
      { label: 'Category', value: '[ To be verified ]' },
      { label: 'Status', value: '[ To be verified ]' },
      { label: 'AI Framework', value: '[ To be verified ]' },
    ],
    heroImage: 'https://images.pexels.com/photos/3823555/pexels-photo-3823555.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    gallery: [
      'https://images.pexels.com/photos/5555813/pexels-photo-5555813.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    ],
    status: 'In Development',
    year: '[ Year ]',
  },
  {
    id: 'asd-project-2',
    name: '[ ASD Project 2 ]',
    division: 'ASD',
    category: 'Robotics Software',
    tagline: 'Software Backbone Platform',
    overview: '[ Project overview will be added when verified information is available. ]',
    problemStatement: '[ Problem statement to be documented. ]',
    approach: '[ Development approach to be documented. ]',
    technologies: ['[ Technology 1 ]', '[ Technology 2 ]'],
    specs: [
      { label: 'Category', value: '[ To be verified ]' },
      { label: 'Status', value: '[ To be verified ]' },
    ],
    heroImage: 'https://images.pexels.com/photos/8566538/pexels-photo-8566538.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    gallery: [
      'https://images.pexels.com/photos/8566628/pexels-photo-8566628.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    ],
    status: 'Prototype',
    year: '[ Year ]',
  },
  {
    id: 'asd-project-3',
    name: '[ ASD Project 3 ]',
    division: 'ASD',
    category: 'Autonomous Systems',
    tagline: 'Perception & Decision-Making',
    overview: '[ Project overview will be added when verified information is available. ]',
    problemStatement: '[ Problem statement to be documented. ]',
    approach: '[ Development approach to be documented. ]',
    technologies: ['[ Technology 1 ]', '[ Technology 2 ]'],
    specs: [
      { label: 'Category', value: '[ To be verified ]' },
      { label: 'Status', value: '[ To be verified ]' },
    ],
    heroImage: 'https://images.pexels.com/photos/8566636/pexels-photo-8566636.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    gallery: [
      'https://images.pexels.com/photos/8566566/pexels-photo-8566566.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    ],
    status: 'In Development',
    year: '[ Year ]',
  },
];

export const getProjectsByDivision = (division: DivisionId): Project[] =>
  projects.filter((p) => p.division === division);

export const getProject = (id: string): Project | undefined =>
  projects.find((p) => p.id === id);
