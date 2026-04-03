/* 
 * SECTIONVIEW.TSX — VERSIÓN COMPLETA Y CORREGIDA
 * - Header con animación "DB+" visible en todas las secciones.
 * - Formulario Enquiry completo (envía archivos a /api/send-enquiry).
 * - Nueva sección Project Journey (solo Hero).
 * - Resto de secciones sin cambios.
 */

import React, { useEffect, useRef, useState } from "react";
import { CategoryGroup, Project, StudioSection } from "../types";
import ProjectCard from "./ProjectCard";
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

import Hero from "./Hero";

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
    const t1 = setTimeout(() => setShowPlus(true), 400);
    const t2 = setTimeout(() => setShowName(true), 700);
    const t3 = setTimeout(() => setStage("gallery"), 3000);
    const t4 = setTimeout(() => setShowDesc(true), 2300);
    const t5 = setTimeout(() => setShowGalleryItems(true), 2600);
    return [t1, t2, t3, t4, t5];
  };

  useEffect(() => {
    if (!isActive || isTransitioning) return;
    const timer = setTimeout(() => {
      if (!showName) setShowName(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, [isActive, isTransitioning, showName]);

  useEffect(() => {
    if (isActive && isFirstRender.current) {
      isFirstRender.current = false;
      const timers = startSequence();
      return () => timers.forEach(clearTimeout);
    }
  }, [isActive]);

  useEffect(() => {
    if (isFirstRender.current) return;

    if (category.id !== displayedCategory.id) {
      setIsTransitioning(true);

      const tOut = setTimeout(() => {
        resetSequence();
        setDisplayedCategory(category);
        setIsTransitioning(false);

        setTimeout(() => {
          startSequence();
        }, 100);
      }, 500);

      return () => clearTimeout(tOut);
    }
  }, [category, displayedCategory.id]);

  useEffect(() => {
    if (displayedCategory.name === StudioSection.ENQUIRY) {
      setStage("gallery");
    }
  }, [displayedCategory.name]);

  if (!isActive) return null;

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
  const isProjectJourney =
    displayedCategory.name === StudioSection.PROJECT_JOURNEY;

  const scaleTarget =
    typeof window !== "undefined" && window.innerWidth >= 768 ? 0.5 : 0.4;          <div
            className="transition-all ease-out overflow-hidden flex-1"
            style={{
              transitionDuration: "700ms",
              transform: showName ? "translateX(0)" : "translateX(-48px)",
              opacity: showName ? 1 : 0,
            }}
          >
            {isUrbanSection ? (
              <div className="flex flex-col items-start justify-center">
                <span
                  className={`text-4xl md:text-6xl tracking-[0.15em] font-light leading-none block ${
                    isEnquiry ? "text-white" : "text-black"
                  }`}
                >
                  Masterplanning +
                </span>
                <span className="text-3xl md:text-5xl tracking-[0.15em] font-light text-gray-400 mt-4 leading-none block">
                  Urban
                </span>
              </div>
            ) : isDesignSection ? (
              <div className="flex flex-col items-start justify-center">
                <span
                  className={`text-4xl md:text-6xl tracking-[0.15em] font-light leading-none block ${
                    isEnquiry ? "text-white" : "text-black"
                  }`}
                >
                  Design
                </span>
                <span className="text-3xl md:text-5xl tracking-[0.15em] font-light text-gray-400 mt-4 leading-none block">
                  &amp; Management
                </span>
              </div>
            ) : (
              <span
                className={`text-4xl md:text-6xl tracking-[0.15em] font-light block leading-none ${
                  isEnquiry ? "text-white" : "text-black"
                }`}
              >
                {isHomeSection ? "" : displayedCategory.name}
              </span>
            )}
          </div>
        </div>

        {displayedCategory.description &&
          !isHomeSection &&
          !isDesignSection &&
          !isEnquiry &&
          !isProjectSupportSection &&
          !isStructureSection &&
          !isBehindDBSection &&
          !isArchitectureSection && (
            <div
              className={`transition-all ease-out overflow-hidden flex-1 ${
                stage === "gallery"
                  ? "ml-6 md:ml-10 border-l border-black/20 pl-6 md:pl-10 max-w-3xl"
                  : "pointer-events-none w-0 h-0"
              }`}
              style={{
                transitionDuration: "1000ms",
                opacity: stage === "gallery" && showDesc ? 1 : 0,
                transform:
                  stage === "gallery" && showDesc
                    ? "translateX(0)"
                    : "translateX(-40px)",
              }}
            >
              {isUrbanSection ? (
                <span className="font-light text-gray-400 leading-tight tracking-tight italic text-sm md:text-base lg:text-lg whitespace-pre-line">
                  {urbanMasterplanningHeaderDescription}
                </span>
              ) : (
                <div
                  className="font-light text-gray-400 leading-tight tracking-tight italic text-sm md:text-base lg:text-lg whitespace-pre-line"
                  dangerouslySetInnerHTML={{
                    __html: displayedCategory.description,
                  }}
                />
              )}
            </div>
          )}
      </div>

      {/* MAIN CONTENT */}
      <div
        className={`h-full w-full overflow-y-auto custom-scroll px-10 pb-48 transition-opacity duration-1000 ${
          stage === "gallery"
            ? "opacity-100"
            : "opacity-0 pointer-events-none"
        }`}
        style={{ paddingTop: "120px" }}
      >
        <div className="max-w-7xl mx-auto">

          {/* ⭐ ARCHITECTURE — INSERT HERO AT TOP ⭐ */}
          {isArchitectureSection && (
            <div className="w-full mb-20">
              <Hero />
            </div>
          )}

          {/* PROJECT JOURNEY */}
          {isProjectJourney && (
            <div className="w-full">
              <Hero />
            </div>
          )}

          {!isProjectJourney && (
            <>
              {/* Bloque descriptivo para secciones con descripción */}
{(isUrbanSection ||
  isStructureSection ||
  isDesignSection ||
  isProjectSupportSection ||
  isArchitectureSection) && (
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

      {displayedCategory.imageUrl && (
        <div className="md:col-span-1 w-full overflow-hidden shadow-2xl rounded-2xl border border-white/20">
          <img
            src={displayedCategory.imageUrl}
            alt={displayedCategory.name}
            className="w-full h-auto object-cover"
            loading="lazy"
          />
        </div>
      )}
    </div>
  </div>
)}

{/* Project Grid */}
{!isHomeSection && !isEnquiry && !isBehindDBSection && (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24">
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

{/* Bloques especiales */}
{isDesignSection && (
  <div className="flex flex-col gap-24 mt-32 mb-16 max-w-5xl mx-auto">
    <div className="p-10 bg-white/60 backdrop-blur-md rounded-2xl border border-white/50 shadow-xl">
      <div
        className="text-black leading-tight"
        dangerouslySetInnerHTML={{ __html: isoContent }}
      />
    </div>

    <div className="w-full overflow-hidden rounded-2xl shadow-2xl border border-white/20 bg-white">
      <img
        src="https://res.cloudinary.com/dwealmbfi/image/upload/v1771155566/Gemini_Generated_Image_867rii867rii867r_czfvu7.png"
        alt="Design & Management Vision"
        className="w-full h-auto object-cover"
        loading="lazy"
      />
    </div>
  </div>
)}

{isUrbanSection && (
  <div className="mt-32 mb-16 max-w-5xl mx-auto">
    <div className="w-full overflow-hidden rounded-2xl shadow-2xl border border-white/20 bg-white">
      <img
        src="https://res.cloudinary.com/dwealmbfi/image/upload/v1770138676/dibujo_limpio_profesional_1_i078jd.png"
        alt="Urban Masterplanning Drawing"
        className="w-full h-auto object-cover"
        loading="lazy"
      />
    </div>
  </div>
)}

</>
)}
</div>
</div>
</div>
);
};

export default SectionView;
