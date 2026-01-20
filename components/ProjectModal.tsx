
import React, { useEffect, useState } from 'react';
import { Project } from '../types';
import { generateStudioInsight } from '../services/geminiService';
import { X, MapPin, Calendar, Sparkles } from 'lucide-react';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const [insight, setInsight] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [imageAnimPlayed, setImageAnimPlayed] = useState(false); // Estado para controlar la animación de la imagen

  useEffect(() => {
    if (project) {
      setLoading(true);
      generateStudioInsight(project.category, project.title).then(res => {
        setInsight(res || '');
        setLoading(false);
      });
      document.body.style.overflow = 'hidden';
      // Inicia la animación de la imagen después de un pequeño retraso para asegurar el montaje
      const animTimer = setTimeout(() => setImageAnimPlayed(true), 100);
      return () => {
        clearTimeout(animTimer);
        document.body.style.overflow = 'unset';
        setImageAnimPlayed(false); // Reinicia el estado de animación al cerrar
      };
    } else {
      document.body.style.overflow = 'unset';
      setImageAnimPlayed(false); // Asegura que el estado se reinicie si project es nulo
    }
  }, [project]);

  if (!project) return null;

  // Usa imágenes adicionales si están disponibles, de lo contrario solo la principal
  const images = [project.imageUrl, ...(project.additionalImages || [])];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
      <div className="absolute inset-0 bg-white/98 backdrop-blur-xl" onClick={onClose}></div>
      <div className="relative bg-white w-full max-w-7xl h-full md:h-auto md:max-h-[90vh] overflow-hidden shadow-2xl border border-black/5 flex flex-col md:flex-row">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-10 p-2 bg-white/50 hover:bg-black/5 rounded-full transition-colors backdrop-blur-sm"
          aria-label="Cerrar proyecto"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Cinematic Image Gallery */}
        <div className="w-full md:w-3/5 overflow-y-auto custom-scroll bg-gray-50 flex flex-col gap-1 p-0">
          {images.map((img, idx) => (
            <img 
              key={idx}
              src={img} 
              alt={`${project.title} - view ${idx + 1}`}
              className={`
                w-full object-cover object-bottom-right min-h-[400px] md:min-h-0
                transition-all duration-[1500ms] ease-out
                ${imageAnimPlayed
                  ? 'opacity-100 scale-100' // Estado final: Opacidad y escala completas (color original)
                  : 'opacity-0 scale-95'    // Estado inicial: Opaco y ligeramente reducido
                }
              `}
              style={{ maxHeight: 'none' }}
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200';
              }}
              loading="lazy"
            />
          ))}
        </div>

        {/* Info Sidebar */}
        <div className="w-full md:w-2/5 p-8 md:p-16 flex flex-col justify-start bg-white overflow-y-auto custom-scroll">
          <div className="mb-12">
            <span className="text-[12px] tracking-[0.4em] font-bold text-gray-400 block mb-4 uppercase">DB + {project.category}</span>
            <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tighter leading-none">{project.title}</h2>
            
            {(project.location || project.year) && (
              <div className="flex flex-col gap-3 text-xs font-bold uppercase tracking-widest text-gray-500 border-t border-black/10 pt-8 mt-4">
                {project.location && (
                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-black" /> {project.location}
                  </div>
                )}
                {project.year && (
                  <div className="flex items-center gap-3">
                    <Calendar className="w-4 h-4 text-black" /> {project.year}
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="text-sm font-medium text-gray-600 leading-relaxed mb-12">
            {loading ? (
              <div className="animate-pulse space-y-3">
                <div className="h-3 bg-gray-100 rounded w-full"></div>
                <div className="h-3 bg-gray-100 rounded w-full"></div>
                <div className="h-3 bg-gray-100 rounded w-3/4"></div>
              </div>
            ) : (
              <div className="relative pl-6 border-l-2 border-black py-2 italic">
                <Sparkles className="w-4 h-4 absolute -left-[9px] top-0 text-black bg-white" />
                {insight || project.description}
              </div>
            )}
          </div>

          <button 
            className="mt-auto bg-black text-white px-10 py-4 text-xs font-bold tracking-[0.3em] uppercase hover:bg-neutral-800 transition-all rounded-sm sticky bottom-0"
            onClick={onClose}
            aria-label="Volver a la vista de proyectos"
          >
            Return to Projects
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;