import React, { useEffect, useState } from "react";
import { Project } from "../types";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  // No mostrar modal cuando no hay proyecto o cuando pertenece a ENQUIRY
  if (!project) return null;
  if (project.category === "ENQUIRY") return null;

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageFade, setImageFade] = useState(true);

  useEffect(() => {
    document.body.style.overflow = "hidden";   // Evitar scroll de la página debajo
    setCurrentImageIndex(0);
    setImageFade(true);

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [project]);

  const images = [project.imageUrl, ...(project.additionalImages || [])];

  const handleNextImage = () => {
    setImageFade(false);
    setTimeout(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
      setImageFade(true);
    }, 300);
  };

  const handlePrevImage = () => {
    setImageFade(false);
    setTimeout(() => {
      setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
      setImageFade(true);
    }, 300);
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      {/* BACKDROP OSCURO (NO BLANCO) */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* CONTENEDOR PRINCIPAL */}
      <div className="relative z-20 max-w-5xl w-full mx-auto px-6">
        {/* BOTÓN CERRAR */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-red-500 transition"
        >
          <X size={32} />
        </button>

        {/* IMAGEN PRINCIPAL */}
        <div className="relative w-full aspect-[4/3] overflow-hidden rounded-lg bg-black">
          <img
            key={currentImageIndex}
            src={images[currentImageIndex]}
            alt={project.title}
            className={`w-full h-full object-cover transition-opacity duration-300 ${
              imageFade ? "opacity-100" : "opacity-0"
            }`}
          />

          {/* FLECHA IZQUIERDA */}
          {images.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrevImage();
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white bg-black/40 p-3 rounded-full hover:bg-black/60 transition"
            >
              <ChevronLeft size={28} />
            </button>
          )}

          {/* FLECHA DERECHA */}
          {images.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNextImage();
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white bg-black/40 p-3 rounded-full hover:bg-black/60 transition"
            >
              <ChevronRight size={28} />
            </button>
          )}
        </div>

        {/* INFORMACIÓN DEL PROYECTO */}
        <div className="mt-6 text-center">
          <h2 className="text-3xl font-light text-white tracking-wide">
            {project.title}
          </h2>

          {project.description && (
            <p className="mt-4 text-white/80 leading-relaxed text-lg">
              {project.description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
