/*
 * SECTIONVIEW.TSX — AHORA CON Project Journey + DB+ FIX
 * - HERO solo va en App.tsx si es Architecture
 * - Project Journey renderiza storytelling (SceneOne, SceneTwo, etc.)
 */

import React, { useEffect, useRef, useState } from "react";
import { CategoryGroup, Project, StudioSection } from "../types";
import ProjectCard from "./ProjectCard";
import SceneOne from "./SceneOne";        

import {
  ChevronRight,
  CheckCircle,
  Upload,
  X as CloseIcon,
  Loader2,
  File as FileIcon,
} from "lucide-react";

import {
  urbanMasterplanningHeaderDescription,
  isoContent,
} from "../constants";

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

  /* -----------------------------
   * ANIMATION RESET + START  💥
   * ----------------------------- */
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
    const t1 = setTimeout(() => setShowPlus(true), 300);
    const t2 = setTimeout(() => setShowName(true), 600);
    const t3 = setTimeout(() => setStage("gallery"), 1600);
    const t4 = setTimeout(() => setShowDesc(true), 1000);
    const t5 = setTimeout(() => setShowGalleryItems(true), 2200);
    return [t1, t2, t3, t4, t5];
  };

  /* -----------------------------
   * FIX: REINICIAR SIEMPRE AL CAMBIAR CATEGORÍA  ⭐⭐⭐
   * ----------------------------- */
  useEffect(() => {
    if (!isActive) return;

    resetSequence();          // reinicia siempre
    const timers = startSequence();  // arranca la animación

    return () => timers.forEach(clearTimeout);
  }, [displayedCategory.id, isActive]);
  

  /* -----------------------------
   * UPDATE displayedCategory
   * ----------------------------- */
  useEffect(() => {
    if (category.id !== displayedCategory.id) {
      setDisplayedCategory(category);
    }
  }, [category, displayedCategory.id]);

  /* -----------------------------
   * SPECIAL CASE: ENQUIRY → skip intro
   * ----------------------------- */
  useEffect(() => {
    if (displayedCategory.name === StudioSection.ENQUIRY) {
      setStage("gallery");
    }
  }, [displayedCategory.name]);

  if (!isActive) return null;

  /* SECTION FLAGS */
  const isProjectJourney =
    displayedCategory.name === StudioSection.PROJECT_JOURNEY;
  const isEnquiry = displayedCategory.name === StudioSection.ENQUIRY;
  const isHomeSection = displayedCategory.name === StudioSection.HOME;
  const isUrbanSection = displayedCategory.name === StudioSection.URBANISM;
  const isDesignSection = displayedCategory.name === StudioSection.DESIGN;
  const isArchitectureSection =
    displayedCategory.name === StudioSection.ARCHITECTURE;
  const isProjectSupportSection =
    displayedCategory.name === StudioSection.PROJECT_SUPPORT;
  const isStructureSection =
    displayedCategory.name === StudioSection.STRUCTURE;
  const isBehindDBSection =
    displayedCategory.name === StudioSection.BEHIND_DB;

  return (
    <div
      className={`fixed inset-0 w-full transition-opacity duration-500 ${
        isTransitioning ? "opacity-0" : "opacity-100"
      } bg-transparent`}
    >
      {/* ENQUIRY BACKGROUND */}
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

      {/* FLOATING DB+ ANIMATION */}
      <div className="fixed top-8 left-0 right-0 z-30 pointer-events-none flex justify-between items-start px-8 md:px-12">
        <div className="pointer-events-auto flex items-center gap-1">
          {showDB && (
            <span
              className={`text-5xl md:text-7xl font-black tracking-tighter transition-all duration-700 ${
                isEnquiry ? "text-white" : "text-black"
              }`}
            >
              DB
            </span>
          )}
          {showPlus && (
            <span
              className={`text-5xl md:text-7xl font-black transition-all duration-700 ${
                isEnquiry ? "text-white" : "text-black"
              }`}
            >
              +
            </span>
          )}
          {showName && (
            <div className="ml-3 overflow-hidden">
              <div
                className={`text-sm uppercase tracking-wider font-medium transition-all duration-700 ${
                  isEnquiry ? "text-white/80" : "text-black/80"
                }`}
              >
                Architecture Practice
              </div>
            </div>
          )}
        </div>
      </div>

      {/* SCROLL AREA */}
      <div
        className={`h-full w-full overflow-y-auto custom-scroll px-10 pb-48 transition-opacity duration-1000 ${
          stage === "gallery"
            ? "opacity-100"
            : "opacity-0 pointer-events-none"
        }`}
        style={{ paddingTop: "120px" }}
      >
        <div className="max-w-7xl mx-auto">

          {/* PROJECT JOURNEY */}
          {isProjectJourney && (
            <div className="w-full">
              <SceneOne />
            </div>
          )}

          {/* ARCHITECTURE SECTION */}
          {isArchitectureSection && !isProjectJourney && (
            <div className="w-full">
              <div
                className={`max-w-6xl mx-auto relative z-10 text-black pt-20 transition-opacity duration-1000 ${
                  showGalleryItems ? "opacity-100" : "opacity-0"
                }`}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start w-full">
                  <div className="md:col-span-1 p-8 bg-white/50 backdrop-blur-md rounded-2xl border border-white/60 shadow-xl">
                    <div
                      className="text-base md:text-lg lg:text-xl font-light leading-tight text-justify"
                      dangerouslySetInnerHTML={{
                        __html: displayedCategory.description,
                      }}
                    />
                  </div>
                  <div className="md:col-span-1 w-full overflow-hidden shadow-2xl rounded-2xl border border-white/20">
                    <img
                      src={displayedCategory.imageUrl}
                      alt={displayedCategory.name}
                      className="w-full h-auto object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* OTHER SECTIONS */}
          {!isProjectJourney &&
            !isEnquiry &&
            !isBehindDBSection &&
            !isArchitectureSection && (
              <div
                className={`max-w-6xl mx-auto relative z-10 text-black pt-20 transition-opacity duration-1000 ${
                  showGalleryItems ? "opacity-100" : "opacity-0"
                }`}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start w-full">
                  <div className="md:col-span-1 p-offset:px-8 p-8 bg-white/50 backdrop-blur-md rounded-2xl border border-white/60 shadow-xl">
                    <div
                      className="text-base md:text-lg lg:text-xl font-light leading-tight text-justify"
                      dangerouslySetInnerHTML={{
                        __html: displayedCategory.description,
                      }}
                    />
                  </div>
                  <div className="md:col-span-1 w-full overflow-hidden shadow-2xl rounded-2xl border border-white/20">
                    <img
                      src={displayedCategory.imageUrl}
                      alt={displayedCategory.name}
                      className="w-full h-auto object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            )}

          {/* PROJECT GRID */}
          {!isProjectJourney &&
            !isArchitectureSection &&
            !isEnquiry &&
            !isBehindDBSection && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:bg-cols-3 gap-x-12 gap-y-24">
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
