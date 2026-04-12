import React, { useState } from 'react';
import { Project, StudioSection } from '../types';

interface ProjectCardProps {
  project: Project;
  onClick: (project: Project) => void;
  currentSectionName: string;
}

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200";

const capitalizeTitle = (title: string): string => {
  if (!title) return '';
  const words = title.toLowerCase().split(' ');
  const articles = ['el', 'la', 'los', 'las', 'un', 'una', 'unos', 'unas', 'de', 'y'];

  return words
    .map((word, index) => {
      if (index > 0 && articles.includes(word)) return word;
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ');
};

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onClick,
  currentSectionName,
}) => {
  const [imgSrc, setImgSrc] = useState(project.imageUrl || FALLBACK_IMAGE);
  const [loaded, setLoaded] = useState(false);

  const isStaticVisualSection =
    currentSectionName === StudioSection.STRUCTURE;

  return (
    <div
      className="group cursor-pointer mb-16"
      onClick={() => onClick(project)}
    >
      <div className="relative aspect-[4/5] w-full bg-black/5 overflow-hidden">

        {/* 🔥 IMAGE */}
        <img
          src={imgSrc}
          alt={project.title || "Project Image"}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          onError={() => setImgSrc(FALLBACK_IMAGE)}
          className={`w-full h-full object-cover transition-all duration-[1400ms] ${
            isStaticVisualSection ? "" : "project-card-image-effects"
          } ${
            loaded ? "opacity-100 scale-100" : "opacity-0 scale-105"
          }`}
        />

        {/* 🔥 LOADING PLACEHOLDER (APPLE STYLE) */}
        {!loaded && (
          <div className="absolute inset-0 bg-black/10 animate-pulse" />
        )}

        {/* 🔥 OVERLAY */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500" />

        {/* 🔥 HOVER TITLE (FLOATING) */}
        {!isStaticVisualSection && project.title && (
          <div className="absolute top-8 left-8 right-8 text-white opacity-0 group-hover:opacity-100 transition-all duration-500">
            <h3 className="text-xl tracking-[0.15em] font-light">
              {capitalizeTitle(project.title)}
            </h3>
          </div>
        )}
      </div>

      {/* 🔥 STATIC TITLE (STRUCTURE SECTION) */}
      {isStaticVisualSection && project.title && (
        <h3 className="text-xl tracking-[0.15em] mt-8 text-black group-hover:text-red-600 transition-colors">
          {capitalizeTitle(project.title)}
        </h3>
      )}
    </div>
  );
};

export default ProjectCard;
