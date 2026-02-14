import React from 'react';
import { Project, StudioSection } from '../types'; // Importa StudioSection
import { ChevronRight } from 'lucide-react'; // Importa ChevronRight

interface ProjectCardProps {
  project: Project;
  onClick: (project: Project) => void;
  currentSectionName: string; // Nueva prop para el nombre de la sección actual
}

// Helper function to capitalize title words, excluding articles/conjunctions
const capitalizeTitle = (title: string): string => {
  const words = title.toLowerCase().split(' ');
  const articlesAndConjunctions = ['el', 'la', 'los', 'las', 'un', 'una', 'unos', 'unas', 'de', 'y'];

  return words.map((word, index) => {
    // Keep articles/conjunctions lowercase if they are not the first word
    if (index > 0 && articlesAndConjunctions.includes(word)) {
      return word;
    }
    // Capitalize the first letter of other words
    return word.charAt(0).toUpperCase() + word.slice(1);
  }).join(' ');
};

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick, currentSectionName }) => {
  // Check if titles should be hidden for this section (Design section visual purely)
  const isDesignSection = currentSectionName === StudioSection.DESIGN;
  const isStaticVisualSection = currentSectionName === StudioSection.STRUCTURE;

  return (
    <div 
      className="group cursor-pointer mb-16"
      onClick={() => onClick(project)}
    >
      <div className="project-image-container relative aspect-[4/5] w-full bg-gray-100 overflow-hidden">
        <img 
          src={project.imageUrl} 
          alt={project.title}
          className={`object-cover w-full h-full transition-all ease-in-out ${
            (isStaticVisualSection || isDesignSection) // Aplica estilos estáticos si es una sección de visualización estática
              ? '' 
              : 'project-card-image-effects' // Aplica la nueva clase CSS para efectos de hover
          }`}
          style={{ transitionDuration: '1400ms' }} // Movido desde className
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200';
          }}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/0 transition-colors duration-500"></div>
        
        {/* Project Title Overlay on Hover (Conditional) */}
        {(!isStaticVisualSection && !isDesignSection) && ( // Renderiza el título como overlay solo si NO es una sección estática/design
          <div className="absolute top-8 left-8 right-8 text-black opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out">
            <h3 className="text-xl font-normal tracking-[0.15em]">
              {capitalizeTitle(project.title)}
            </h3>
          </div>
        )}
      </div>

      {/* Project Title Below Image (Conditional for static visual sections) */}
      {isStaticVisualSection && ( // Renderiza el título debajo de la imagen si es una sección estática (e.g. Structure)
        <h3 className="text-xl font-normal tracking-[0.15em] mt-8 text-black">
          {capitalizeTitle(project.title)}
        </h3>
      )}
      {/* Design section specifically requested to remove footer text */}
    </div>
  );
};

export default ProjectCard;