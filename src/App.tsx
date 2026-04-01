import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import ProjectModal from './components/ProjectModal';
import SectionView from './components/SectionView';
import VideoBackground from './components/VideoBackground';
import Hero from './components/Hero';
import { CATEGORIES } from './constants';
import { Project, CategoryGroup, StudioSection } from './types';

const App: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  /*  
  |------------------------------------------------------------------
  | CATEGORY MANAGEMENT
  |------------------------------------------------------------------
  */

  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState<CategoryGroup>(CATEGORIES[0]);

  useEffect(() => {
    setActiveCategory(CATEGORIES[currentCategoryIndex]);
  }, [currentCategoryIndex]);

  /*  
  |------------------------------------------------------------------
  | LOGGING FOR DEBUG (UTIL TO VERIFY CATEGORY SWITCHING)
  |------------------------------------------------------------------
  */

  useEffect(() => {
    console.log('ACTIVE CATEGORY:', activeCategory.name);
    console.log('INDEX:', currentCategoryIndex);
  }, [activeCategory]);

  /*  
  |------------------------------------------------------------------
  | CUSTOM CURSOR
  |------------------------------------------------------------------
  */

  useEffect(() => {
    const isTouchDevice = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
    if (isTouchDevice) return;

    const cursor = document.getElementById('custom-cursor');
    if (!cursor) return;

    const moveCursor = (e: MouseEvent) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;

      const target = e.target as HTMLElement;
      const isInteractive =
        target.closest('button') ||
        target.closest('a') ||
        target.closest('input') ||
        target.closest('textarea') ||
        target.closest('select') ||
        target.closest('.cursor-pointer');

      if (isInteractive) cursor.classList.add('active');
      else cursor.classList.remove('active');
    };

    window.addEventListener('mousemove', moveCursor, { passive: true });
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  /*  
  |------------------------------------------------------------------
  | NAVIGATION HANDLERS
  |------------------------------------------------------------------
  */

  const handleNavClick = useCallback((sectionName: string) => {
    // log para confirmar match exacto
    console.log("NAV CLICK:", sectionName);
    console.log("CATEGORIES:", CATEGORIES.map(c => c.name));

    const index = CATEGORIES.findIndex(cat => cat.name.trim() === sectionName.trim());

    console.log("INDEX FOUND:", index);

    if (index !== -1) {
      setCurrentCategoryIndex(index);
      setSelectedProject(null);
    }
  }, []);

  const handleGoHome = useCallback(() => {
    setCurrentCategoryIndex(0);
    setSelectedProject(null);
  }, []);

  const handleProjectCardClick = useCallback(
    (project: Project) => {
      if (activeCategory.name !== StudioSection.STRUCTURE) {
        setSelectedProject(project);
      }
    },
    [activeCategory.name]
  );

  /*  
  |------------------------------------------------------------------
  | BACKGROUND MODE
  |------------------------------------------------------------------
  */

  const isHome = activeCategory.name === StudioSection.HOME;
  const isArchitecture = activeCategory.name === StudioSection.ARCHITECTURE;
  const isDarkBackground =
    activeCategory.name === StudioSection.ENQUIRY ||
    activeCategory.name === StudioSection.HOME;

  /*  
  |------------------------------------------------------------------
  | RETURN (UI RENDER)
  |------------------------------------------------------------------
  */

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
        DB+ Architecture Corby | Expert Design, BIM & Planning Services
      </h1>

      {/* HOME VIDEO BACKGROUND */}
      {isHome && (
        <VideoBackground
          videoUrl="https://res.cloudinary.com/dwealmbfi/video/upload/v1771095957/Gen-3_Alpha_Turbo_1476360428_usando_el_sketch_de_Cropped_-_scketch_1_M_5_jjwom8.mp4"
          onVideoLoaded={() => {}}
        />
      )}

      {/* HERO only in ARCHITECTURE (never in Project Journey) */}
      {isArchitecture && <Hero data-testid="hero-from-app" />}

      {/* MAIN LAYOUT */}
      <div className="relative z-10">
        <Header
          onNavClick={handleNavClick}
          onGoHomeClick={handleGoHome}
          isDarkBackground={isDarkBackground}
        />

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
