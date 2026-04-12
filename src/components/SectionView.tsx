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

  // 🔥 Apple-ready states (NO timeouts)
  const [showUI, setShowUI] = useState(false);

  useEffect(() => {
    if (isActive) {
      setDisplayedCategory(category);
      setShowUI(true);
    }
  }, [isActive, category]);

  // ============================
  // FLAGS
  // ============================
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

  // 🔥 NO desmontamos componente
  if (!isActive) {
    return <div className="hidden" />;
  }

  return (
    <div className="fixed inset-0 w-full bg-transparent">

      {/* SCROLL ROOT */}
      <div className="h-screen w-full overflow-y-auto custom-scroll px-10 pb-48">

        <div className="max-w-7xl mx-auto pt-32">

          {/* ============================
             HEADER (SIEMPRE VISIBLE)
          ============================ */}
          <div className="mb-24">
            <div className="flex items-center gap-12">

              <h2 className={`text-8xl md:text-[10rem] font-light tracking-tight transition-all duration-700 ${
                isEnquiry ? "text-white" : "text-black"
              } ${showUI ? "opacity-100" : "opacity-0 translate-y-10"}`}>
                DB
              </h2>

              <span className={`text-6xl transition-all duration-500 ${
                isEnquiry ? "text-gray-300" : "text-gray-400"
              } ${showUI ? "opacity-100 scale-100" : "opacity-0 scale-0"}`}>
                +
              </span>

              <div className={`transition-all duration-700 ${
                showUI ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
              }`}>
                <span className={`text-4xl md:text-6xl tracking-[0.15em] font-light ${
                  isEnquiry ? "text-white" : "text-black"
                }`}>
                  {isHomeSection ? "" : displayedCategory.name}
                </span>
              </div>
            </div>
          </div>

          {/* ============================
             ENQUIRY
          ============================ */}
          {isEnquiry ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 text-white">

              {/* LEFT */}
              <div className="bg-neutral-900 p-10 rounded-2xl">
                <h3 className="text-3xl mb-6">Contact</h3>
                <p className="text-white/70">
                  108 Kestrel Road, Corby<br />
                  Northamptonshire, UK
                </p>
              </div>

              {/* RIGHT */}
              <div className="bg-neutral-800 p-10 rounded-2xl">
                <form className="space-y-6">

                  <input
                    placeholder="Name"
                    className="w-full p-3 bg-black/40 border border-white/20"
                  />

                  <input
                    placeholder="Email"
                    className="w-full p-3 bg-black/40 border border-white/20"
                  />

                  <textarea
                    placeholder="Project..."
                    className="w-full p-3 bg-black/40 border border-white/20"
                  />

                  <button className="bg-white text-black px-8 py-4 rounded-full">
                    Submit
                  </button>

                </form>
              </div>

            </div>

          ) : isBehindDBSection ? (

            /* ============================
               BEHIND DB
            ============================ */
            <div className="grid md:grid-cols-2 gap-12 text-white">
              <div
                dangerouslySetInnerHTML={{
                  __html: displayedCategory.description,
                }}
              />
              <img
                src={displayedCategory.imageUrl}
                className="rounded-2xl"
              />
            </div>

          ) : (

            /* ============================
               DEFAULT SECTIONS
            ============================ */
            <div className="space-y-20">

              {/* DESCRIPTION */}
              {(isUrbanSection ||
                isStructureSection ||
                isDesignSection ||
                isProjectSupportSection ||
                isArchitectureSection) && (
                <div className="bg-black/40 p-10 rounded-2xl text-white">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: displayedCategory.description,
                    }}
                  />
                </div>
              )}

              {/* PROJECT GRID */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
                {displayedCategory.projects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    onClick={onProjectClick}
                    currentSectionName={currentSectionName}
                  />
                ))}
              </div>

              {/* EXTRA BLOCKS */}
              {isDesignSection && (
                <div className="bg-black/40 p-10 rounded-2xl text-white">
                  <div dangerouslySetInnerHTML={{ __html: isoContent }} />
                </div>
              )}

              {isUrbanSection && (
                <img
                  src="https://res.cloudinary.com/dwealmbfi/image/upload/v1770138676/dibujo_limpio_profesional_1_i078jd.png"
                  className="rounded-2xl"
                />
              )}

            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default SectionView;
