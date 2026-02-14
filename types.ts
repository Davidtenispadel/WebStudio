export interface Project {
  id: string;
  title: string;
  location: string;
  year: string;
  imageUrl: string;
  category: string;
  description?: string;
  additionalImages?: string[];
  useAiInsight?: boolean; 
}

export interface CategoryGroup {
  id: string;
  name: string;
  description: string;
  imageUrl?: string; 
  projects: Project[];
}

export enum StudioSection {
  HOME = 'Home', 
  ARCHITECTURE = 'Architecture',
  DESIGN = 'Design',
  URBANISM = 'Masterplanning + Urban Design',
  STRUCTURE = 'MEP & Structure',
  PROJECT_SUPPORT = 'Project Support',
  BEHIND_DB = 'Behind DB+', // New section
  ENQUIRY = 'Enquiry'
}