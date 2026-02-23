
import React, { useEffect, useState } from 'react';
import { Project } from '../types';
import { X, ChevronLeft, ChevronRight } from 'lucide-react'; // Removed MapPin, Calendar, generateStudioInsight

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  // Removed insight and loading states
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageFade, setImageFade] = useState(true);

  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
      setCurrentImageIndex(0);
      setImageFade(true);
      return () => {
        document.body.style.overflow = 'unset';
      };
    }
  }, [project]);

  if (!project) return null;

  const images = [project.imageUrl, ...(project.additionalImages || [])];

  const handleNextImage = () => {
    setImageFade(false);
    setTimeout(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
      setImageFade(true);
    }, 300);
  };

  const handlePrevImage = () => {
    setImageFade(false);
    setTimeout(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
      setImageFade(true);
    }, 300);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 md:p-8" style={{ zIndex: 100 }}>
      {/* Light backdrop to keep the website behind looking white */}
      <div className="absolute inset-0 bg-white/80 backdrop-blur-md" onClick={onClose}></div>
      
      <div className="relative bg-black w-full max-w-7xl h-full md:h-auto md:max-h-[90vh] overflow-hidden shadow-2xl border border-white/10 flex flex-col">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-20 p-2 bg-black/50 hover:bg-white/10 rounded-full transition-colors backdrop-blur-sm text-white"
          aria-label="Cerrar proyecto"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Cinematic Image Gallery / Carousel with Black Bands (now full width) */}
        <div className="w-full relative overflow-hidden bg-black flex items-center justify-center flex-1">
          <img 
            src={images[currentImageIndex]} 
            alt={`${project.title} - view ${currentImageIndex + 1}`}
            className={`
              w-full h-full object-contain
              transition-opacity duration-300 ease-in-out
              ${imageFade ? 'opacity-100' : 'opacity-0'}
            `}
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200';
            }}
            loading="lazy"
          />
          
          {/* Project Category and Title Overlay */}
          <div className="absolute top-8 left-8 p-3 bg-white/70 backdrop-blur-sm rounded-md flex flex-col items-start space-y-2">
            <span className="text-[10px] tracking-[0.4em] font-bold text-black block uppercase">
              DB + {project.category}
            </span>
            <h2 className="text-xl md:text-2xl font-normal tracking-tight leading-none text-black">
              {project.title}
            </h2>
          </div>

          {images.length > 1 && (
            <>
              <button 
                onClick={handlePrevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/50 text-black p-2 rounded-full hover:bg-white/80 transition-colors"
                aria-label="Imagen anterior"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button 
                onClick={handleNextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/50 text-black p-2 rounded-full hover:bg-white/80 transition-colors"
                aria-label="Siguiente imagen"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {images.map((_, idx) => (
                  <span 
                    key={idx} 
                    className={`block w-2 h-2 rounded-full ${idx === currentImageIndex ? 'bg-white' : 'bg-white/30'}`}
                    aria-label={`Ir a la imagen ${idx + 1}`}
                  ></span>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
