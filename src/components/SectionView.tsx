/* SECTIONVIEW.TSX — STABILITY FIX
 * - DB+ is decorative only and never overlaps content
 * - Section text always renders correctly
 * - Enquiry is excluded from generic section layout
 * - No pointer-events or opacity traps
 */

import React, { useEffect, useState } from "react";
import { CategoryGroup, Project, StudioSection } from "../types";
import ProjectCard from "./ProjectCard";
import { isoContent } from "../constants";

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

  // DB+ decorative animation only
  const [showDB, setShowDB] = useState(false);
  const [showPlus, setShowPlus] = useState(false);

  useEffect(() => {
    if (!isActive) return;

    setShowDB(false);
    setShowPlus(false);

    const t1 = setTimeout(() => setShowDB(true), 200);
    const t2 = setTimeout(() => setShowPlus(true), 350);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [isActive, category.id]);

  useEffect(() => {
    setDisplayedCategory(category);
  }, [category]);

  if (!isActive) return null;

  const isEnquiry = displayedCategory.name === StudioSection.ENQUIRY;

  return (
    <>
      {/* DB+ FLOAT — PURELY DECORATIVE */}
      {!isEnquiry && (
        <div
          className="fixed top-24 left-10 z-20 select-none pointer-events-none"
        >
          <div className="flex items-center">
            <h2
              className="font-light tracking-tighter text-black"
              style={{
                fontSize: "5.5rem",
                opacity: showDB ? 1 : 0,
                transform: showDB
                  ? "translateY(0)"
                  : "translateY(12px)",
                transition: "all 600ms ease",
              }}
            >
              DB
            </h2>

            <span
              className="font-thin text-black"
              style={{
                fontSize: "4rem",
                marginLeft: "-0.4rem",
                opacity: showPlus ? 1 : 0,
                transition: "all 600ms ease",
              }}
            >
              +
            </span>
          </div>
        </div>
      )}

      {/* MAIN CONTENT — CLEAN, NO GLOBAL EFFECTS */}
      <div
        className="relative w-full overflow-y-auto px-10 pb-48"
        style={{ paddingTop: "140px" }}
      >
        <div className="max-w-7xl mx-auto">

          {/* SECTION DESCRIPTION */}
          {!isEnquiry && displayedCategory.description && (
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
          {!isEnquiry && (
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

          {/* ENQUIRY — LEFT UNTOUCHED */}
          {isEnquiry && (
            <div className="w-full">
              {/* Enquiry form renders exactly as defined elsewhere */}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SectionView;
``
