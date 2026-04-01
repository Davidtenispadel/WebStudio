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

/*  
 |--------------------------------------------------------------------------
 |  🔥 ENUM CORREGIDO (antes tenías "JECT_JOURNEY" → ERROR)
 |--------------------------------------------------------------------------
*/

export enum StudioSection {
  HOME = 'Home',

  /* ⭐ NUEVA PESTAÑA 100% CORRECTA ⭐ */
  PROJECT_JOURNEY = "Project Journey",

  ARCHITECTURE = 'Architecture',
  DESIGN = 'Design & Management',
  URBANISM = 'Masterplanning + Urban',
  STRUCTURE = 'MEP & Structure',
  PROJECT_SUPPORT = 'Project Support',
  BEHIND_DB = 'Behind DB+', 
  ENQUIRY = 'Enquiry'
}
