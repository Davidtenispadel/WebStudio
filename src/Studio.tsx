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

  const isHome = location.pathname === '/';

  // En Home (/) no hay categoría de contenido — solo vídeo + header.
  const activeCategory: CategoryGroup | null = React.useMemo(() => {
    if (isHome) return null;
    const sectionName = PATH_TO_SECTION[location.pathname];
    if (!sectionName) return null;
    return CATEGORIES.find(cat => cat.name === sectionName) ?? null;
  }, [location.pathname, isHome]);

  useEffect(() => {
    console.log("ACTIVE CATEGORY:", activeCategory?.name ?? 'Home (video)');
  }, [activeCategory]);

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
      if (activeCategory?.name !== StudioSection.STRUCTURE) {
        setSelectedProject(project);
      }
    },
    [activeCategory]
  );

  const isEnquiry = activeCategory?.name === StudioSection.ENQUIRY;
  const isDarkBackground = isEnquiry || isHome;

  return (
    <div
      className={`min-h-screen w-screen transition-colors duration-700 
        ${isEnquiry ? 'bg-black' : 'bg-white'}
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

        {activeCategory && (
          <SectionView
            category={activeCategory}
            onProjectClick={handleProjectCardClick}
            isActive={true}
            currentSectionName={activeCategory.name}
            onNavigateToEnquiry={() => navigate('/enquiry')}
          />
        )}

        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      </div>
    </div>
  );
};

export default Studio;
