/*
 * SECTIONVIEW.TSX — AHORA 100% CORREGIDO
 * - DB+ flotante funcionando en TODAS las secciones
 * - Project Journey correctamente aislado
 * - Architecture con Hero desde App
 * - Animaciones reiniciadas SIEMPRE al cambiar de categoría
 */

import React, { useEffect, useRef, useState } from "react";
import { CategoryGroup, Project, StudioSection } from "../types";
import ProjectCard from "./ProjectCard";
import SceneOne from "./SceneOne";

// ICONS
import {
  CheckCircle,
  Upload,
  X as CloseIcon,
  Loader2,
  File as FileIcon,
} from "lucide-react";

// CONSTANTS
import { isoContent } from "../constants";

interface SectionViewProps {
  category: CategoryGroup;
  onProjectClick: (project: Project) => void;
  isActive: boolean;
  currentSectionName: string;
}

const ENQUIRY_ENDPOINT = "/api/send-enquiry";

const formatBytes = (bytes: number) => {
  if (!bytes && bytes !== 0) return "";
  const sizes = ["B", "KB", "MB", "GB", "TB"];
  if (bytes === 0) return "0 B";
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  const val = bytes / Math.pow(1024, i);
  return `${val.toFixed(val >= 100 || i === 0 ? 0 : 1)} ${sizes[i]}`;
};

const SectionView: React.FC<SectionViewProps> = ({
  category,
  onProjectClick,
  isActive,
  currentSectionName,
}) => {
  const [displayedCategory, setDisplayedCategory] =
    useState<CategoryGroup>(category);

  const [showDB, setShowDB] = useState(false);
  const [showPlus, setShowPlus] = useState(false);
  const [showName, setShowName] = useState(false);
  const [showDesc, setShowDesc] = useState(false);
  const [showGalleryItems, setShowGalleryItems] = useState(false);
  const [stage, setStage] = useState<"intro" | "gallery">("intro");

  const [isTransitioning, setIsTransitioning] = useState(false);
  const isFirstRender = useRef(true);

  // ----------------------
  // ENQUIRY FORM
  // ----------------------
  const [enquiryStep, setEnquiryStep] = useState(1);
  const [isSending, setIsSending] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ----------------------
  // ANIMATION CONTROL
  // ----------------------
  const resetSequence = () => {
    setShowDB(false);
    setShowPlus(false);
    setShowName(false);
    setShowDesc(false);
    setShowGalleryItems(false);
    setStage("intro");
    setEnquiryStep(1);
  };

  const startSequence = () => {
    setShowDB(true);
    const t1 = setTimeout(() => setShowPlus(true), 200);
    const t2 = setTimeout(() => setShowName(true), 500);
    const t3 = setTimeout(() => setStage("gallery"), 1500);
    const t4 = setTimeout(() => setShowDesc(true), 900);
    const t5 = setTimeout(() => setShowGalleryItems(true), 2100);
    return [t1, t2, t3, t4, t5];
  };

  // ⭐ SOLUCIÓN DEFINITIVA ⭐  
  // 👉 Reiniciar animaciones SIEMPRE que category cambie.
  useEffect(() => {
    if (!isActive) return;

    setIsTransitioning(true);
    resetSequence();

    const tOut = setTimeout(() => {
      setDisplayedCategory(category);
      setIsTransitioning(false);

      const timers = startSequence();
      return () => timers.forEach(clearTimeout);
    }, 200);

    return () => clearTimeout(tOut);
  }, [category.id, isActive]);

  useEffect(() => {
    if (displayedCategory.name === StudioSection.ENQUIRY) {
      setStage("gallery");
    }
  }, [displayedCategory.name]);

  if (!isActive) return null;

  // SECTION FLAGS
  const isProjectJourney =
    displayedCategory.name === StudioSection.PROJECT_JOURNEY;
  const isEnquiry = displayedCategory.name === StudioSection.ENQUIRY;
  const isArchitectureSection =
    displayedCategory.name === StudioSection.ARCHITECTURE;
  const isBehindDBSection =
    displayedCategory.name === StudioSection.BEHIND_DB;

  return (
    <div
      className={`fixed inset-0 w-full transition-opacity duration-500 ${
        isTransitioning ? "opacity-0" : "opacity-100"
      } bg-transparent`}
    >
      {/* -------------------------
          ENQUIRY BACKGROUND
      -------------------------- */}
      {isEnquiry && (
        <div className="absolute inset-0 z-20 overflow-hidden">
          <img
            src="https://res.cloudinary.com/dwealmbfi/image/upload/v1769967857/make_the_background_2_xwqmiu.png"
            alt="Enquiry Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
      )}

      {/* -------------------------
          DB+ FLOATING HEADER
      -------------------------- */}
      <div className="fixed top-8 left-0 right-0 z-[999] pointer-events-none flex justify-between items-start px-8 md:px-12">
        <div className="pointer-events-auto flex items-center gap-1">
          {showDB && (
            <span className="text-5xl md:text-7xl font-black tracking-tighter transition-all duration-700 text-black">
              DB
            </span>
          )}
          {showPlus && (
            <span className="text-5xl md:text-7xl font-black transition-all duration-700 text-black">
              +
            </span>
          )}
          {showName && (
            <div className="ml-3 overflow-hidden">
              <div className="text-sm uppercase tracking-wider font-medium text-black/80 transition-all duration-700">
                Architecture Practice
              </div>
            </div>
          )}
        </div>
      </div>

      {/* -------------------------
          MAIN SCROLL AREA
      -------------------------- */}
      <div
        className={`h-full w-full overflow-y-auto custom-scroll px-10 pb-48 transition-opacity duration-1000 ${
          stage === "gallery"
            ? "opacity-100"
            : "opacity-0 pointer-events-none"
        }`}
        style={{ paddingTop: "120px" }}
      >
        <div className="max-w-7xl mx-auto">

          {/* -------------------------
              PROJECT JOURNEY STORYTELLING
          -------------------------- */}
          {isProjectJourney && (
            <div className="w-full">
              <SceneOne />
            </div>
          )}

          {/* -------------------------
              ARCHITECTURE LAYOUT
          -------------------------- */}
          {isArchitectureSection && !isProjectJourney && (
            <div className="w-full">
              <div
                className={`max-w-6xl mx-auto relative z-10 text-black pt-20 transition-opacity duration-1000 ${
                  showGalleryItems ? "opacity-100" : "opacity-0"
                }`}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
                  <div className="p-8 bg-white/50 backdrop-blur-md rounded-2xl border border-white/60 shadow-xl">
                    <div
                      className="text-base md:text-lg lg:text-xl font-light text-justify"
                      dangerouslySetInnerHTML={{
                        __html: displayedCategory.description,
                      }}
                    />
                  </div>

                  <div className="w-full overflow-hidden shadow-2xl rounded-2xl border border-white/20">
                    {displayedCategory.imageUrl && (
                      <img
                        src={displayedCategory.imageUrl}
                        className="w-full h-auto object-cover"
                        alt={displayedCategory.name}
                        loading="lazy"
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* -------------------------
              OTHER SECTIONS (TEXT + IMAGE)
          -------------------------- */}
          {!isProjectJourney &&
            !isEnquiry &&
            !isBehindDBSection &&
            !isArchitectureSection && (
              <div
                className={`max-w-6xl mx-auto pt-20 transition-opacity duration-1000 ${
                  showGalleryItems ? 
"opacity-100" : "opacity-0"
                }`}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">

                  <div className="p-8 bg-white/50 backdrop-blur-md rounded-2xl border border-white/60 shadow-xl">
                    <div
                      className="text-base md:text-lg lg:text-xl font-light leading-tight text-justify"
                      dangerouslySetInnerHTML={{
                        __html: displayedCategory.description,
                      }}
                    />
                  </div>

                  <div className="w-full overflow-hidden shadow-2xl rounded-2xl border border-white/20">
                    {displayedCategory.imageUrl && (
                      <img
                        src={displayedCategory.imageUrl}
                        alt={displayedCategory.name}
                        className="w-full h-auto object-cover"
                        loading="lazy"
                      />
                    )}
                  </div>
                </div>
              </div>
            )}

          {/* -------------------------
              PROJECT GRID
          -------------------------- */}
          {!isProjectJourney &&
            !isArchitectureSection &&
            !isEnquiry &&
            !isBehindDBSection && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24 mt-20">
                {displayedCategory.projects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    onClick={onProjectClick}
                    currentSectionName={currentSectionName}
                  />
                ))}
              </div>
            )}

        </div>
      </div>
    </div>
  );
};

export default SectionView;
