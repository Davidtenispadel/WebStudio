/* SECTIONVIEW.TSX — FIXED
 * - Header is no longer covered
 * - DB+ floating spacing refined
 * - Intro timing shortened
 * - No other systems modified
 */

import React, { useEffect, useRef, useState } from "react";
import { CategoryGroup, Project, StudioSection } from "../types";
import ProjectCard from "./ProjectCard";
import {
  X as CloseIcon,
} from "lucide-react";

import {
  isoContent,
} from "../constants";

interface SectionViewProps {
  category: CategoryGroup;
  onProjectClick: (project: Project) => void;
  isActive: boolean;
  currentSectionName: string;
}

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
  const [showDesc, setShowDesc] = useState(false);
  const [showGalleryItems, setShowGalleryItems] = useState(false);
  const [stage, setStage] = useState<"intro" | "gallery">("intro");

  const isFirstRender = useRef(true);

  /* ============================
     Animation sequence
     ============================ */

  const resetSequence = () => {
    setShowDB(false);
    setShowPlus(false);
    setShowDesc(false);
    setShowGalleryItems(false);
    setStage("intro");
  };

  const startSequence = () => {
    setShowDB(true);
    setTimeout(() => setShowPlus(true), 300);
    setTimeout(() => setShowDesc(true), 1400);
    setTimeout(() => setShowGalleryItems(true), 1700);
    setTimeout(() => setStage("gallery"), 2200); // ⬅ shorter static pause
  };

  useEffect(() => {
    if (isActive && isFirstRender.current) {
      isFirstRender.current = false;
      startSequence();
    }
  }, [isActive]);

  useEffect(() => {
    if (category.id !== displayedCategory.id) {
      resetSequence();
      setTimeout(() => {
        setDisplayedCategory(category);
        startSequence();
      }, 400);
    }
  }, [category, displayedCategory.id]);

  if (!isActive) return null;

  const scaleTarget =
    typeof window !== "undefined" && window.innerWidth >= 768 ? 0.52 : 0.42;

  /* ============================
     RENDER
     ============================ */

  return (
    <div
      className="fixed inset-0 w-full bg-transparent"
      style={{
        zIndex: 1,               // ✅ below Header
        pointerEvents: "none",   // ✅ does not block header
      }}
    >
      {/* DB+ INTRO / FLOATING */}
      <div
        className={`fixed z-[20] flex items-center transition-all ${
          stage === "intro"
            ? "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 justify-center"
            : "top-24 left-10 opacity-0 pointer-events-none"
        }`}
        style={{
          width: stage === "intro" ? "100%" : "auto",
          transitionDuration: "1200ms",
          transitionTimingFunction: "cubic-bezier(0.77, 0, 0.175, 1)",
        }}
      >
        <div
          className={`flex items-center transition-all ${
            stage === "gallery" ? "gap-6" : "gap-24"
          }`}
          style={{
            transform:
              stage === "gallery" ? `scale(${scaleTarget})` : "scale(1)",
            transitionDuration: "1200ms",
          }}
        >
          <h2
            className="font-light tracking-tighter"
            style={{
              fontSize:
                typeof window !== "undefined" && window.innerWidth >= 768
                  ? "12rem"
                  : "9rem",
              opacity: showDB ? 1 : 0,
              transform: showDB ? "translateY(0)" : "translateY(20px)",
              transition: "all 900ms cubic-bezier(0.23, 1, 0.32, 1)",
            }}
          >
            DB
          </h2>

          <span
            className="font-thin"
            style={{
              fontSize: "6.5rem",
              opacity: showPlus ? 1 : 0,
              transform: showPlus ? "scale(1)" : "scale(0.8)",
              transition: "all 700ms ease",
            }}
          >
            +
          </span>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div
        className={`absolute inset-0 w-full overflow-y-auto px-10 pb-48 transition-opacity duration-700 ${
          stage === "gallery" ? "opacity-100" : "opacity-0"
        }`}
        style={{
          paddingTop: "140px",
          pointerEvents: stage === "gallery" ? "auto" : "none",
        }}
      >
        <div className="max-w-7xl mx-auto">
          {/* DESCRIPTION */}
          {showDesc && (
            <div className="mb-24">
              <div className="w-full max-w-5xl p-12 bg-white rounded-2xl shadow-xl mx-auto">
                <div
                  className="text-black text-lg md:text-xl leading-relaxed text-center"
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
          {displayedCategory.name === StudioSection.DESIGN && (
            <div className="mt-32 max-w-5xl mx-auto">
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
