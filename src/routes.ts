import { StudioSection } from './types';

// Mapa: nombre de sección -> URL
export const SECTION_TO_PATH: Record<string, string> = {
  'Home Insight': '/home-insight',
  [StudioSection.PROJECT_JOURNEY]: '/project-journey',
  [StudioSection.ARCHITECTURE]: '/architecture',
  [StudioSection.DESIGN]: '/design-management',
  [StudioSection.URBANISM]: '/masterplanning-urban',
  [StudioSection.STRUCTURE]: '/mep-structure',
  [StudioSection.PROJECT_SUPPORT]: '/project-support',
  [StudioSection.BEHIND_DB]: '/behind-db',
  [StudioSection.ENQUIRY]: '/enquiry',
};

// Mapa inverso: URL -> nombre de sección
export const PATH_TO_SECTION: Record<string, string> = Object.fromEntries(
  Object.entries(SECTION_TO_PATH).map(([name, path]) => [path, name])
);

// Todas las rutas "de estudio" (para vite-react-ssg)
export const STUDIO_PATHS = ['/', ...Object.values(SECTION_TO_PATH)];
