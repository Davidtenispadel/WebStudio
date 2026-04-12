/*
 * SECTIONVIEW.TSX — Versión corregida: Project Journey con scroll snapping y parallax funcional.
 * El scroll se produce en el contenedor con clase "custom-scroll", no en window.
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
  Link2,
  File as FileIcon,
  AlertCircle,
} from "lucide-react";

import {
  urbanMasterplanningHeaderDescription,
  isoContent,
} from "../constants";

import { sendProjectEnquiry } from "../services/emailService";

// ============================
// COMPONENTE PROJECT JOURNEY SLIDES (corregido: parallax con scroll interno)
// ============================
interface ProjectJourneySlidesProps {
  onStartProject: () => void;
  scrollContainerRef: React.RefObject<HTMLDivElement>; // referencia al div que tiene el scroll
}

const ProjectJourneySlides: React.FC<ProjectJourneySlidesProps> = ({ onStartProject, scrollContainerRef }) => {
  const slides = [
    {
      id: 1,
      image: "https://res.cloudinary.com/dwealmbfi/image/upload/v1775930330/1._Family_Country_xehkff.png",
      text: "Architecture begins with you — not with drawings, not with plans. With your life, your needs, your history. Start your project.",
    },
    {
      id: 2,
      image: "https://res.cloudinary.com/dwealmbfi/image/upload/v1775929794/2._table_drawings_mdzbk2.png",
      text: "You're searching for the right space. A new home, an extension, a workspace that finally feels right. You've collected ideas, references, screenshots... But the more you look, the more doubts appear. Is it the right style? Will it fit my life? How will it feel to live or work there?",
    },
    {
      id: 3,
      image: "https://res.cloudinary.com/dwealmbfi/image/upload/v1775929804/3._Model_kuhihd.png",
      text: "Doubt is not a problem — it's the beginning. Great architecture doesn't start with answers. It starts with the right questions. Your routines, your taste, your ambitions, your way of living. We listen, we translate, we shape a concept that feels unmistakably yours.",
    },
    {
      id: 4,
      image: "https://res.cloudinary.com/dwealmbfi/image/upload/v1775929824/4._Panoramic_Livingroom_hi9uhv.png",
      text: "Your ideal project begins here. Stop overthinking, start imagining with us. Tell us what you need, what you love, how you live. We'll turn it into a space that feels right from day one.",
      isLast: true,
    },
  ];

  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Parallax: escucha el scroll del contenedor padre (custom-scroll)
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollTop = container.scrollTop;
      imageRefs.current.forEach((ref, idx) => {
        if (ref) {
          const offset = ref.offsetTop - container.offsetTop;
          const speed = 0.25;
          const yPos = -(scrollTop - offset) * speed;
          ref.style.transform = `translateY(${yPos}px)`;
        }
      });
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [scrollContainerRef]);

  return (
    <div className="relative w-full h-full">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className="relative w-full h-screen snap-start flex flex-col md:flex-row items-center justify-center px-6 md:px-12 py-20 overflow-hidden"
          style={{ scrollSnapAlign: "start" }}
        >
          {/* Imagen con efecto parallax */}
          <div
            ref={(el) => (imageRefs.current[index] = el)}
            className="w-full md:w-1/2 h-64 md:h-[80vh] rounded-2xl overflow-hidden shadow-2xl will-change-transform"
          >
            <img
              src={slide.image}
              alt={`Journey ${slide.id}`}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>

          {/* Texto lateral */}
          <div className="w-full md:w-1/2 mt-10 md:mt-0 md:pl-12 lg:pl-20 text-white">
            <p className="text-xl md:text-2xl lg:text-3xl font-light leading-relaxed tracking-wide">
              {slide.text}
            </p>
            {slide.isLast && (
              <div className="mt-12">
                <button
                  onClick={onStartProject}
                  className="group relative inline-flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full text-sm font-semibold uppercase tracking-wider shadow-xl hover:bg-red-600 hover:text-white transition-all duration-300"
                >
                  Start your Project
                  <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

// ============================
// TIPOS PARA EL UPLOADER (sin cambios)
// ============================
type UploadStatus = "uploading" | "uploaded" | "error";
interface UploadedItem {
  id: string;
  name: string;
  size: number;
  type?: string;
  progress: number;
  status: UploadStatus;
  url?: string;
  error?: string;
}
interface SectionViewProps {
  category: CategoryGroup;
  onProjectClick: (project: Project) => void;
  isActive: boolean;
  currentSectionName: string;
  onNavigateToEnquiry?: () => void;
}

const UPLOAD_ENDPOINT = "https://dbsdesigner.com/api/upload.php";
const formatBytes = (bytes: number) => { /* ... */ };
const fileId = (f: File) => `${f.name}-${f.size}-${f.lastModified}-${Math.random().toString(36).slice(2, 8)}`;

const SectionView: React.FC<SectionViewProps> = ({
  category,
  onProjectClick,
  isActive,
  currentSectionName,
  onNavigateToEnquiry,
}) => {
  // Estados (sin cambios importantes)
  const [displayedCategory, setDisplayedCategory] = useState<CategoryGroup>(category);
  const [showDB, setShowDB] = useState(false);
  const [showPlus, setShowPlus] = useState(false);
  const [showName, setShowName] = useState(false);
  const [showDesc, setShowDesc] = useState(false);
  const [showGalleryItems, setShowGalleryItems] = useState(false);
  const [stage, setStage] = useState<"intro" | "gallery">("intro");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const isFirstRender = useRef(true);

  // Enquiry states
  const [enquiryStep, setEnquiryStep] = useState(1);
  const [isSending, setIsSending] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [items, setItems] = useState<UploadedItem[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Referencia al contenedor de scroll (para el parallax)
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Animaciones (sin cambios)
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
    const timer = setTimeout(() => { if (!showName) setShowName(true); }, 2000);
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
        setTimeout(() => startSequence(), 100);
      }, 500);
      return () => clearTimeout(tOut);
    }
  }, [category, displayedCategory.id]);

  useEffect(() => {
    if (displayedCategory.name === StudioSection.ENQUIRY) setStage("gallery");
  }, [displayedCategory.name]);

  useEffect(() => {
    if (displayedCategory.name === StudioSection.PROJECT_JOURNEY) {
      setShowGalleryItems(true);
      setStage("gallery");
    }
  }, [displayedCategory.name]);

  if (!isActive) return null;

  // Flags
  const isEnquiry = displayedCategory.name === StudioSection.ENQUIRY;
  const isHomeSection = displayedCategory.name === StudioSection.HOME;
  const isUrbanSection = displayedCategory.name === StudioSection.URBANISM;
  const isDesignSection = displayedCategory.name === StudioSection.DESIGN;
  const isArchitectureSection = displayedCategory.name === StudioSection.ARCHITECTURE;
  const isProjectSupportSection = displayedCategory.name === StudioSection.PROJECT_SUPPORT;
  const isStructureSection = displayedCategory.name === StudioSection.STRUCTURE;
  const isBehindDBSection = displayedCategory.name === StudioSection.BEHIND_DB;
  const isProjectJourney = displayedCategory.name === StudioSection.PROJECT_JOURNEY;
  const scaleTarget = typeof window !== "undefined" && window.innerWidth >= 768 ? 0.5 : 0.4;

  // Uploader logic (omitido por brevedad, igual que antes)
  const uploadFiles = (files: File[]) => { /* ... */ };
  const onDropFiles = (e: React.DragEvent<HTMLDivElement>) => { /* ... */ };
  const onSelectFiles = (e: React.ChangeEvent<HTMLInputElement>) => { /* ... */ };
  const removeItem = (id: string) => setItems((prev) => prev.filter((it) => it.id !== id));
  const clearErrored = () => setItems((prev) => prev.filter((it) => it.status !== "error"));
  const fileUrls = items.filter((it) => it.status === "uploaded" && it.url).map((it) => it.url!);
  const handleEnquirySubmit = async (e: React.FormEvent) => { /* ... */ };

  // ============================
  // RENDER
  // ============================
  return (
    <div
      className={`fixed inset-0 w-full transition-opacity duration-500 ${
        isTransitioning ? "opacity-0" : "opacity-100"
      } bg-transparent`}
    >
      {isEnquiry && (
        <div className="absolute inset-0 z-20 overflow-hidden">
          <img src="https://res.cloudinary.com/dwealmbfi/image/upload/v1769967857/make_the_background_2_xwqmiu.png" alt="Enquiry Background" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/60" />
        </div>
      )}

      {/* HEADER (sin cambios) */}
      <div
        className={`fixed z-[40] flex items-center transition-all ${
          stage === "intro"
            ? "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-7xl px-10 justify-center"
            : "top-24 left-10 translate-x-0 translate-y-0 pointer-events-none opacity-0 justify-start"
        }`}
        style={{
          transitionTimingFunction: "cubic-bezier(0.77, 0, 0.175, 1)",
          transitionDuration: "1000ms",
          width: stage === "intro" ? "100%" : "calc(100% - 80px)",
        }}
      >
        <div
          className="flex items-center gap-16 md:gap-24 lg:gap-40 transition-all shrink-0"
          style={{
            transitionTimingFunction: "cubic-bezier(0.77, 0, 0.175, 1)",
            transitionDuration: "1000ms",
            transform: stage === "gallery" ? `scale(${scaleTarget})` : "scale(1)",
            transformOrigin: "left",
          }}
        >
          <div className="flex items-center gap-3 shrink-0">
            <h2 className={`text-9xl font-light tracking-tighter transition-all ${isEnquiry ? "text-white" : "text-black"} ${showDB ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"}`} style={{ fontSize: typeof window !== "undefined" && window.innerWidth >= 768 ? "12rem" : "9rem", transitionTimingFunction: "cubic-bezier(0.23, 1, 0.32, 1)", transitionDuration: "1000ms" }}>DB</h2>
            <span className={`text-6xl md:text-8xl font-thin transition-all ${isEnquiry ? "text-gray-300" : "text-gray-400"} ${showPlus ? "opacity-100 scale-100 rotate-0" : "opacity-0 scale-0 rotate-45"}`} style={{ transitionDuration: "700ms" }}>+</span>
          </div>
          <div className="transition-all ease-out overflow-hidden flex-1" style={{ transitionDuration: "700ms", transform: showName ? "translateX(0)" : "translateX(-48px)", opacity: showName ? 1 : 0 }}>
            {isUrbanSection ? (
              <div className="flex flex-col items-start justify-center">
                <span className={`text-4xl md:text-6xl tracking-[0.15em] font-light leading-none block ${isEnquiry ? "text-white" : "text-black"}`}>Masterplanning +</span>
                <span className="text-3xl md:text-5xl tracking-[0.15em] font-light text-gray-400 mt-4 leading-none block">Urban</span>
              </div>
            ) : isDesignSection ? (
              <div className="flex flex-col items-start justify-center">
                <span className={`text-4xl md:text-6xl tracking-[0.15em] font-light leading-none block ${isEnquiry ? "text-white" : "text-black"}`}>Design</span>
                <span className="text-3xl md:text-5xl tracking-[0.15em] font-light text-gray-400 mt-4 leading-none block">&amp; Management</span>
              </div>
            ) : (
              <span className={`text-4xl md:text-6xl tracking-[0.15em] font-light block leading-none ${isEnquiry ? "text-white" : "text-black"}`}>{isHomeSection ? "" : displayedCategory.name}</span>
            )}
          </div>
        </div>
        {/* Descripción (omitida por brevedad, igual que antes) */}
      </div>

      {/* MAIN CONTENT - contenedor con scroll snapping */}
      <div
        ref={scrollContainerRef}
        className={`h-full w-full overflow-y-auto custom-scroll px-10 pb-48 transition-opacity duration-1000 ${
          stage === "gallery" ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        style={{ paddingTop: "120px", scrollSnapType: isProjectJourney ? "y mandatory" : "auto" }}
      >
        <div className="max-w-7xl mx-auto">
          {isEnquiry ? (
            // ... formulario enquiry (sin cambios)
            <div>Enquiry form (sin cambios)</div>
          ) : isBehindDBSection ? (
            <div>Behind DB (sin cambios)</div>
          ) : (
            <div className={`transition-opacity duration-1000 ${showGalleryItems ? "opacity-100" : "opacity-0"}`}>
              {(isUrbanSection || isStructureSection || isDesignSection || isProjectSupportSection || isArchitectureSection || isProjectJourney) && (
                <div className="flex flex-col gap-12">
                  {isArchitectureSection && <div>Architecture block</div>}
                  {isProjectJourney && (
                    <ProjectJourneySlides
                      onStartProject={() => {
                        if (onNavigateToEnquiry) onNavigateToEnquiry();
                        else console.warn("No onNavigateToEnquiry prop");
                      }}
                      scrollContainerRef={scrollContainerRef}
                    />
                  )}
                  <div className="text-white font-normal text-lg md:text-xl leading-tight" dangerouslySetInnerHTML={{ __html: displayedCategory.description }} />
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24">
                {displayedCategory.projects.map((project) => (
                  <ProjectCard key={project.id} project={project} onClick={onProjectClick} currentSectionName={currentSectionName} />
                ))}
              </div>
              {isDesignSection && <div>Design special block</div>}
              {isUrbanSection && <div>Urban special block</div>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SectionView;
