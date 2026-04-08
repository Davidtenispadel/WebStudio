/* SECTIONVIEW.TSX — FINAL STRUCTURAL FIX
 * Handles Architecture / Behind DB / Project Journey / Enquiry correctly
 */

import React from "react";
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
  if (!isActive) return null;

  /* ============================
     SECTION TYPES
     ============================ */

  const isEnquiry = category.name === StudioSection.ENQUIRY;
  const isBehindDB = category.name === StudioSection.BEHIND_DB;
  const isProjectJourney = category.name === StudioSection.PROJECT_JOURNEY;

  /* ============================
     ENQUIRY — DO NOT RENDER HERE
     ============================ */
  if (isEnquiry) {
    return null; // Enquiry is handled by its own component
  }

  return (
    <div className="relative w-full px-10 pt-36 pb-48">
      <div className="max-w-7xl mx-auto">

        {/* ============================
            PROJECT JOURNEY (CUSTOM)
           ============================ */}
        {isProjectJourney && (
          <section className="w-full min-h-screen flex items-center justify-center">
            <h2 className="text-4xl font-light tracking-tight text-gray-400">
              Project Journey content goes here
            </h2>
          </section>
        )}

        {/* ============================
            BEHIND DB — IMAGE + TEXT
           ============================ */}
        {isBehindDB && (
          <section className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <img
                src={category.imageUrl}
                alt="Behind DB"
                className="w-full rounded-xl shadow-xl"
              />
            </div>
            <div
              className="text-black text-lg md:text-xl leading-relaxed"
              dangerouslySetInnerHTML={{ __html: category.description }}
            />
          </section>
        )}

        {/* ============================
            STANDARD SECTIONS
           ============================ */}
        {!isBehindDB && !isProjectJourney && (
          <>
            {/* DESCRIPTION */}
            {category.description && (
              <div className="mb-24">
                <div className="w-full max-w-5xl p-12 bg-white rounded-2xl shadow-xl mx-auto">
                  <div
                    className="text-black text-lg md:text-xl leading-relaxed text-center"
                    dangerouslySetInnerHTML={{
                      __html: category.description,
                    }}
                  />
                </div>
              </div>
            )}

            {/* PROJECT GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24">
              {category.projects.map((project: Project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onClick={onProjectClick}
                  currentSectionName={currentSectionName}
                />
              ))}
            </div>

            {/* DESIGN EXTRA */}
            {category.name === StudioSection.DESIGN && (
              <div className="mt-32 max-w-5xl mx-auto">
                <div className="p-10 bg-black/40 backdrop-blur-md rounded-2xl border border-white/10 shadow-xl">
                  <div
                    className="text-white leading-tight"
                    dangerouslySetInnerHTML={{ __html: isoContent }}
                  />
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SectionView;
