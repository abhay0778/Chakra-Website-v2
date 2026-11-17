export interface Achievement {
  id: string;
  category?: string;
  competition: string;
  title: string;
  position?: string;
  date?: string;
  organiser?: string;
  project?: string;
  description: string;
  image?: string;
  images?: string[];
  featured?: boolean;
}

// Add verified competition results only; event dates and media are omitted until supplied.
export const achievements: Achievement[] = [
  {
    id: 'international-programmers-day-robotics-iot-first-prize',
    category: 'Competition Achievement',
    competition: 'International Programmers’ Day, Robotics & IoT',
    title: 'ROBOTICS & IoT',
    position: 'FIRST PRIZE',
    organiser: 'Computer Society of India (CSI)',
    description: 'TEAM CHAKRA ROBOTICS secured First Prize in the Robotics and IoT Category at the International Programmers’ Day event, organized by the Computer Society of India (CSI).\n\nThis achievement reflects the team\'s engineering capabilities, technical innovation and commitment to developing practical robotics solutions.',
    images: [
      '/assets/achievements/csi-robotics-iot-team.png',
      '/assets/achievements/csi-robotics-iot-robot.png',
    ],
    featured: true,
  },
];
