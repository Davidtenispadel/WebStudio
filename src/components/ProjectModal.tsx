import React, { useEffect, useState } from "react";
import { Project } from "../types";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;
  if (project.category === "ENQUIRY") return null;

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageFade, setImageFade] = useState(true);

  useEffect(() => {
    // Prevent background page scroll
    document.body.style.overflow = "hidden";
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

  const FALLBACK_IMG = "/fallbacks/project-fallback.jpg";

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      {/* BACKDROP */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* MODAL CONTAINER */}
      <div className="relative z-20 max-w-5xl w-full mx-auto px-6">
        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-red-500 transition"
          aria-label="Close project"
        >
          <X size={32} />
        </button>

        {/* IMAGE CAROUSEL */}
        <div className="relative w-full aspect-[4/3] overflow-hidden rounded-lg bg-black">
          <img
            key={currentImageIndex}
            src={images[currentImageIndex]}
            alt={project.title || "Project image"}
            className={`w-full h-full object-contain transition-opacity duration-300 ${
              imageFade ? "opacity-100" : "opacity-0"
            }`}
            onError={(e) => {
              const img = e.target as HTMLImageElement;
              img.src = FALLBACK_IMG;
            }}
            loading="lazy"
          />

          {/* PREVIOUS */}
          {images.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrevImage();
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white bg-black/40 p-3 rounded-full hover:bg-black/60 transition"
              aria-label="Previous image"
            >
              <ChevronLeft size={28} />
            </button>
          )}

          {/* NEXT */}
          {images.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNextImage();
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white bg-black/40 p-3 rounded-full hover:bg-black/60 transition"
              aria-label="Next image"
            >
              <ChevronRight size={28} />
            </button>
          )}
        </div>

        {/* PROJECT INFORMATION */}
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
``
