/* SECTIONVIEW.TSX — Updated
 * - DB+ flight slowed for more elegant motion
 * - Section description block set to WHITE background & centered text
 * - No other logic or visual systems modified
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
  architectureDescription,
} from "../constants";

import { sendProjectEnquiry } from "../services/emailService";

/* ============================ */
/* Types */
/* ============================ */
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
}

const UPLOAD_ENDPOINT = "https://dbsdesigner.com/api/upload.php";

/* ============================ */
/* Helpers */
/* ============================ */
const formatBytes = (bytes: number) => {
  if (!bytes && bytes !== 0) return "";
  const sizes = ["B", "KB", "MB", "GB", "TB"];
  if (bytes === 0) return "0 B";
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  const val = bytes / Math.pow(1024, i);
  return `${val.toFixed(val >= 100 || i === 0 ? 0 : 1)} ${sizes[i]}`;
};

const fileId = (f: File) =>
  `${f.name}-${f.size}-${f.lastModified}-${Math.random()
    .toString(36)
    .slice(2, 8)}`;

/* ============================ */
/* Component */
/* ============================ */
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

  /* ============================ */
  /* Animation sequencing */
  /* ============================ */
  const resetSequence = () => {
    setShowDB(false);
    setShowPlus(false);
    setShowName(false);
    setShowDesc(false);
    setShowGalleryItems(false);
    setStage("intro");
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
        setTimeout(() => startSequence(), 100);
      }, 500);
      return () => clearTimeout(tOut);
    }
  }, [category, displayedCategory.id]);

  if (!isActive) return null;

  const isEnquiry = displayedCategory.name === StudioSection.ENQUIRY;
  const isStructureSection =
    displayedCategory.name === StudioSection.STRUCTURE;
  const isUrbanSection = displayedCategory.name === StudioSection.URBANISM;
  const isDesignSection = displayedCategory.name === StudioSection.DESIGN;
  const isArchitectureSection =
    displayedCategory.name === StudioSection.ARCHITECTURE;
  const isProjectSupportSection =
    displayedCategory.name === StudioSection.PROJECT_SUPPORT;

  const scaleTarget =
    typeof window !== "undefined" && window.innerWidth >= 768 ? 0.5 : 0.4;

  /* ============================ */
  /* RENDER */
  /* ============================ */
  return (
    <div className="fixed inset-0 w-full bg-transparent">
      {/* HEADER / DB+ */}
      <div
        className={`fixed z-[40] flex items-center transition-all ${
          stage === "intro"
            ? "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-7xl px-10 justify-center"
            : "top-24 left-10 translate-x-0 translate-y-0 pointer-events-none opacity-0 justify-start"
        }`}
        style={{
          transitionTimingFunction: "cubic-bezier(0.77, 0, 0.175, 1)",
          transitionDuration: "1300ms",
          width: stage === "intro" ? "100%" : "calc(100% - 80px)",
        }}
      >
        <div
          className="flex items-center gap-24"
          style={{
            transform:
              stage === "gallery" ? `scale(${scaleTarget})` : "scale(1)",
            transitionDuration: "1300ms",
          }}
        >
          <h2
            className="text-9xl font-light tracking-tighter transition-all"
            style={{
              fontSize:
                typeof window !== "undefined" && window.innerWidth >= 768
                  ? "12rem"
                  : "9rem",
              transitionTimingFunction: "cubic-bezier(0.23, 1, 0.32, 1)",
              transitionDuration: "1300ms",
              opacity: showDB ? 1 : 0,
              transform: showDB ? "translateY(0)" : "translateY(20px)",
            }}
          >
            DB
          </h2>

          <span
            className={`text-7xl font-thin transition-all ${
              showPlus ? "opacity-100 scale-100" : "opacity-0 scale-0"
            }`}
            style={{ transitionDuration: "900ms" }}
          >
            +
          </span>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div
        className={`h-full w-full overflow-y-auto px-10 pb-48 transition-opacity duration-1000 ${
          stage === "gallery"
            ? "opacity-100"
            : "opacity-0 pointer-events-none"
        }`}
        style={{ paddingTop: "140px" }}
      >
        <div className="max-w-7xl mx-auto">

          {/* DESCRIPTION BLOCK — WHITE & CENTERED */}
          {(isUrbanSection ||
            isStructureSection ||
            isDesignSection ||
            isProjectSupportSection ||
            isArchitectureSection) && (
            <div className="mb-24">
              <div className="w-full max-w-5xl p-12 bg-white rounded-2xl shadow-xl mx-auto">
                <div
                  className="text-black font-normal text-lg md:text-xl leading-relaxed text-center"
                  dangerouslySetInnerHTML={{
                    __html: displayedCategory.description,
                  }}
                />
              </div>
            </div>
          )}

          {/* PROJECT GRID */}
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

          {/* DESIGN EXTRA */}
          {isDesignSection && (
            <div className="flex flex-col gap-24 mt-32 max-w-5xl mx-auto">
              <div className="p-10 bg-black/40 backdrop-blur-md rounded-2xl border border-white/10 shadow-xl">
                <div
                  className="text-white leading-tight"
                  dangerouslySetInnerHTML={{ __html: isoContent }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SectionView;
