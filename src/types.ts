export enum StudioSection {
  HOME = "Home",
  TECHNOLOGY = "Technology",
  PROJECT_JOURNEY = "Project Journey",
  ARCHITECTURE = "Architecture",
  DESIGN = "Design & Management",
  URBANISM = "Masterplanning + Urban",
  STRUCTURE = "MEP & Structure",
  PROJECT_SUPPORT = "Project Support",
  BEHIND_DB = "Behind DB+",
  ENQUIRY = "Enquiry"
}

export interface Project {
  id: string;
  title: string;
  location?: string;
  year?: string;
  imageUrl: string;
  category: StudioSection;
  description?: string;
  additionalImages?: string[];
  useAiInsight?: boolean;
}

export interface CategoryGroup {
  id: string;
  name: StudioSection;
  description: string;
  imageUrl?: string;
  projects: Project[];
}
