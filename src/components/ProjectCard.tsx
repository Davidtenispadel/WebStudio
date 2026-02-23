
import React from 'react';
import { Project, StudioSection } from '../types';
import { ChevronRight } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  onClick: (project: Project) => void;
  currentSectionName: string;
}

const capitalizeTitle = (title: string): string => {
  if (!title) return '';
  const words = title.toLowerCase().split(' ');
  const articlesAndConjunctions = ['el', 'la', 'los', 'las', 'un', 'una', 'unos', 'unas', 'de', 'y'];

  return words.map((word, index) => {
    if (index > 0 && articlesAndConjunctions.includes(word)) {
      return word;
    }
    return word.charAt(0).toUpperCase() + word.slice(1);
  }).join(' ');
};

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick, currentSectionName }) => {
  const isStaticVisualSection = currentSectionName === StudioSection.STRUCTURE;

  return (
    <div 
      className="group cursor-pointer mb-16"
      onClick={() => onClick(project)}
    >
      <div className="project-image-container relative aspect-[4/5] w-full bg-gray-100 overflow-hidden">
        <img 
          src={project.imageUrl} 
          alt={project.title || 'Project Image'}
          className={`object-cover w-full h-full transition-all ease-in-out ${
            isStaticVisualSection 
              ? '' 
              : 'project-card-image-effects'
          }`}
          style={{ transitionDuration: '1400ms' }}
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200';
          }}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/0 transition-colors duration-500"></div>
        
        {(!isStaticVisualSection && project.title) && (
          <div className="absolute top-8 left-8 right-8 text-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out">
            <h3 className="text-xl font-normal tracking-[0.15em]">
              {capitalizeTitle(project.title)}
            </h3>
          </div>
        )}
      </div>

      {isStaticVisualSection && project.title && (
        <h3 className="text-xl font-normal tracking-[0.15em] mt-8 text-black group-hover:text-red-600 transition-colors">
          {capitalizeTitle(project.title)}
        </h3>
      )}
    </div>
  );
};

export default ProjectCard;
