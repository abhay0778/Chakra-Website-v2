import type { DivisionId } from './divisions';

export interface Project {
  id: string;
  slug: string;
  name: string;
  division: DivisionId;
  description: string;
  problem?: string;
  approach?: string;
  technologies?: string[];
  specifications?: { label: string; value: string }[];
  status?: string;
  images?: string[];
}

// Add only verified project information here. No authentic project entries have been supplied yet.
export const projects: Project[] = [];

export const getProjectsByDivision = (division: DivisionId): Project[] =>
  projects.filter((project) => project.division === division);

export const getProject = (slug: string): Project | undefined =>
  projects.find((project) => project.slug === slug);
