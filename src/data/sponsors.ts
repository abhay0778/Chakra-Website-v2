export interface Sponsor {
  id: string;
  name: string;
  type: 'Sponsor';
  description: string;
  logo: string;
  website?: string;
  accent: 'cyan' | 'red';
}

export const sponsors: Sponsor[] = [
  {
    id: 'technobotix',
    name: 'TechnoBotix',
    type: 'Sponsor',
    description: 'Technology and robotics-related sponsor.',
    logo: '/assets/sponsors/technobotix.png',
    accent: 'cyan',
  },
  {
    id: 'solidworks',
    name: 'SOLIDWORKS',
    type: 'Sponsor',
    description: '3D CAD and engineering design software sponsor.',
    logo: '/assets/sponsors/solidworks.png',
    accent: 'red',
  },
];

export const getSponsorsByType = (type: Sponsor['type']): Sponsor[] =>
  sponsors.filter((s) => s.type === type);

export const contactInfo = {
  organisation: 'TEAM CHAKRA ROBOTICS',
  institution: 'Jyothy Institute of Technology',
  location: 'Bengaluru, Karnataka, India',
  email: 'chakrarobotics@gmail.com',
  instagram: 'https://www.instagram.com/teamchakra.jit',
  linkedin: 'https://www.linkedin.com/company/chakra-robotics',
  tagline: 'ENGINEERING BEYOND BOUNDARIES.',
};
