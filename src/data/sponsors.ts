export interface Sponsor {
  id: string;
  name: string;
  type: 'Sponsor' | 'Technical Partner' | 'Institutional Support';
  description: string;
  website?: string;
}

// Sponsor and partner placeholders — replace with real information when available.
// Do not fabricate sponsor names or logos.
export const sponsors: Sponsor[] = [
  {
    id: 'institution-jyothy',
    name: 'Jyothy Institute of Technology',
    type: 'Institutional Support',
    description: 'Our host institution provides lab space, infrastructure and academic support for all Team Chakra Robotics activities.',
  },
];

export const getSponsorsByType = (type: Sponsor['type']): Sponsor[] =>
  sponsors.filter((s) => s.type === type);

export const contactInfo = {
  organisation: 'TEAM CHAKRA ROBOTICS',
  institution: 'Jyothy Institute of Technology',
  location: 'Bengaluru, Karnataka, India',
  email: 'teamchakrarobotics@gmail.com',
  instagram: 'https://instagram.com/chakra.robotics',
  linkedin: 'https://linkedin.com/company/team-chakra-robotics',
  tagline: 'ENGINEERING BEYOND BOUNDARIES.',
};
