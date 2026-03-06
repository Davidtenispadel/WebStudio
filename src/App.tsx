import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import ProjectModal from './components/ProjectModal';
import SectionView from './components/SectionView';
import VideoBackground from './components/VideoBackground';
import { CATEGORIES } from './constants';
import { Project, CategoryGroup, StudioSection } from './types';

const App: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState<CategoryGroup>(CATEGORIES[0]);
  const [videoUrl, setVideoUrl] = useState<string | null>(
    "https://res.cloudinary.com/dwealmbfi/video/upload/v1771095957/Gen-3_Alpha_Turbo_1476360428_usando_el_sketch_de_Cropped_-_scketch_1_M_5_jjwom8.mp4"
  );

  const isHome = activeCategory.name === StudioSection.HOME;

  useEffect(() => {
    setActiveCategory(CATEGORIES[currentCategoryIndex]);
  }, [currentCategoryIndex]);

  useEffect(() => {
    const isTouchDevice = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
    if (isTouchDevice) return;

    const cursor = document.getElementById('custom-cursor');
    if (!cursor) return;

    const moveCursor = (e: MouseEvent) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;

      const target = e.target as HTMLElement;
      const isInteractive = target.closest('button') ||
        target.closest('a') ||
        target.closest('input') ||
        target.closest('textarea') ||
        target.closest('select') ||
        target.closest('.cursor-pointer');

      if (isInteractive) {
        cursor.classList.add('active');
      } else {
        cursor.classList.remove('active');
      }
    };

    window.addEventListener('mousemove', moveCursor, { passive: true });
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  const handleNavClick = useCallback((sectionName: string) => {
    const index = CATEGORIES.findIndex(cat => cat.name === sectionName);
    if (index !== -1) {
      setCurrentCategoryIndex(index);
      setSelectedProject(null); // evitar modales residuales
    }
  }, []);

  const handleGoHome = useCallback(() => {
    setCurrentCategoryIndex(0);
    setSelectedProject(null);
  }, []);

  const handleProjectCardClick = useCallback((project: Project) => {
    if (activeCategory.name !== StudioSection.STRUCTURE) {
      setSelectedProject(project);
    }
  }, [activeCategory.name]);

  return (
    <div
      className={`min-h-screen w-screen transition-colors duration-700 
      ${activeCategory.name === StudioSection.ENQUIRY 
        ? 'bg-black' 
        : isHome 
          ? 'bg-transparent' 
          : 'bg-white'}
      text-black overflow-hidden relative z-0`}
    >
      <h1 className="sr-only">
        DB+ Architecture Corby | Expert Design, BIM & Planning Services NN18 NN17
      </h1>

      {isHome && (
        <VideoBackground videoUrl={videoUrl} onVideoLoaded={setVideoUrl} />
      )}

      <div className="relative z-10">
        <Header onNavClick={handleNavClick} onGoHomeClick={handleGoHome} />

        <SectionView
          category={activeCategory}
          onProjectClick={handleProjectCardClick}
          isActive={true}
          currentSectionName={activeCategory.name}
        />

        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      </div>
    </div>
  );
};

export default App;
