import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import ProjectModal from './components/ProjectModal';
import SectionView from './components/SectionView';
import VideoBackground from './components/VideoBackground';
import { CATEGORIES } from './constants';
import { Project, CategoryGroup, StudioSection } from './types';
import { PATH_TO_SECTION, SECTION_TO_PATH } from './routes';

const Studio: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  // La categoría activa se deriva de la URL, no de un estado interno
  const activeCategory: CategoryGroup = React.useMemo(() => {
    const sectionName = PATH_TO_SECTION[location.pathname] ?? CATEGORIES[0].name;
    return CATEGORIES.find(cat => cat.name === sectionName) ?? CATEGORIES[0];
  }, [location.pathname]);

  useEffect(() => {
    console.log("ACTIVE CATEGORY:", activeCategory.name);
  }, [activeCategory]);

  /* ------------------------
     CUSTOM CURSOR (sin cambios)
  ------------------------ */
  useEffect(() => {
    const isTouch = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
    if (isTouch) return;

    const cursor = document.getElementById('custom-cursor');
    if (!cursor) return;

    const move = (e: MouseEvent) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;

      const target = e.target as HTMLElement;
      const interactive =
        target.closest('button') ||
        target.closest('a') ||
        target.closest('input') ||
        target.closest('textarea') ||
        target.closest('select') ||
        target.closest('.cursor-pointer');

      cursor.classList.toggle('active', Boolean(interactive));
    };

    window.addEventListener('mousemove', move, { passive: true });
    return () => window.removeEventListener('mousemove', move);
  }, []);

  /* ------------------------
     NAVIGATION HANDLERS (ahora navegan de verdad)
  ------------------------ */
  const handleNavClick = useCallback((sectionName: string) => {
    const path = SECTION_TO_PATH[sectionName] ?? '/';
    navigate(path);
    setSelectedProject(null);
  }, [navigate]);

  const handleGoHome = useCallback(() => {
    navigate('/');
    setSelectedProject(null);
  }, [navigate]);

  const handleProjectCardClick = useCallback(
    (project: Project) => {
      if (activeCategory.name !== StudioSection.STRUCTURE) {
        setSelectedProject(project);
      }
    },
    [activeCategory.name]
  );

  const isHome = location.pathname === '/';
  const isDarkBackground =
    activeCategory.name === StudioSection.ENQUIRY || isHome;

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
        DB+ Architecture | Expert Design, BIM & Planning Services
      </h1>

      {isHome && (
        <VideoBackground
          videoUrl="https://res.cloudinary.com/dwealmbfi/video/upload/v1771095957/Gen-3_Alpha_Turbo_1476360428_usando_el_sketch_de_Cropped_-_scketch_1_M_5_jjwom8.mp4"
          onVideoLoaded={() => {}}
        />
      )}

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

export default Studio;

export default App;
