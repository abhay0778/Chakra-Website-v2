export interface Recognition {
  id: string;
  title: string;
  category: 'Institutional recognition' | 'Certificate' | 'Acknowledgement' | 'Media coverage' | 'Invitation' | 'Project milestone' | 'Industry recognition';
  description: string;
  date?: string;
  organisation?: string;
  image?: string;
  images?: string[];
  featured?: boolean;
}

// Recognition entries are distinct from competitive results; add verified records only.
export const recognitions: Recognition[] = [
  {
    id: 'jit-chakra-robotics-at-hal',
    title: "JIT'S CHAKRA ROBOTICS IMPRESSES UNION MINISTER AT HAL",
    category: 'Institutional recognition',
    description: 'TEAM CHAKRA ROBOTICS of Jyothy Institute of Technology showcased its student-developed combat robotics systems and engineering prototypes at Hindustan Aeronautics Limited (HAL), Bengaluru.\n\nThe team had the opportunity to present its innovations to Union Minister Dr. Jitendra Singh, who interacted with the students, examined their robotic systems and appreciated their engineering work.',
    images: [
      '/assets/recognition/jit-hal-chakra-showcase.png',
      '/assets/recognition/jit-hal-minister-interaction.png',
    ],
    featured: true,
  },
];
