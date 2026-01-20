
export interface Project {
  id: string;
  title: string;
  location: string;
  year: string;
  imageUrl: string;
  category: string;
  description?: string;
  additionalImages?: string[];
}

export interface CategoryGroup {
  id: string;
  name: string;
  description: string;
  imageUrl?: string; // Add optional imageUrl for category hero shots (e.g., Home)
  projects: Project[];
}

export enum StudioSection {
  HOME = 'Home', // Nuevo: Representa la página principal/introductoria del estudio
  ABOUT_US = 'About Us', // Nuevo: Página explicativa de los tipos de trabajos del estudio
  ARCHITECTURE = 'Architecture',
  DESIGN = 'Design',
  URBANISM = 'Urbanism',
  STRUCTURE = 'Structure',
  PROJECT_SUPPORT = 'Project Support',
  ENQUIRY = 'Enquiry'
}