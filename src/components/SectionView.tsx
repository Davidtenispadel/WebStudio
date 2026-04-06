```tsx
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

const SectionView: React.FC<SectionViewProps> = ({
  category,
  onProjectClick,
  isActive,
  currentSectionName,
}) => {
  const [displayedCategory, setDisplayedCategory] =
    useState<CategoryGroup>(category);

  const [showGalleryItems, setShowGalleryItems] = useState(false);
  const [stage, setStage] = useState<"intro" | "gallery">("intro");
  const isFirstRender = useRef(true);

  const isEnquiry = displayedCategory.name === StudioSection.ENQUIRY;
  const isUrbanSection = displayedCategory.name === StudioSection.URBANISM;
  const isDesignSection = displayedCategory.name === StudioSection.DESIGN;
  const isArchitectureSection =
    displayedCategory.name === StudioSection.ARCHITECTURE;
  const isBehindDBSection =
    displayedCategory.name === StudioSection.BEHIND_DB;

  useEffect(() => {
    if (isActive && isFirstRender.current) {
      isFirstRender.current = false;
      setTimeout(() => setStage("gallery"), 1200);
      setTimeout(() => setShowGalleryItems(true), 1400);
    }
  }, [isActive]);

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 w-full bg-black text-white">
      {/* MAIN CONTENT */}
      <div className="h-full w-full overflow-y-auto px-10 pb-40 pt-32">
        <div className="max-w-7xl mx-auto">

          {/* ============================
              ENQUIRY (sin cambios fuertes)
          ============================ */}
          {isEnquiry ? (
            <div className="text-white">ENQUIRY FORM...</div>

          ) : isBehindDBSection ? (
            // ============================
            // BEHIND DB (FIXED)
            // ============================
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16">

              <div className="p-10 bg-black/40 rounded-2xl border border-transparent">
                <div
                  className="text-white text-lg leading-tight"
                  dangerouslySetInnerHTML={{
                    __html: displayedCategory.description,
                  }}
                />
              </div>

              <div className="w-full overflow-hidden rounded-2xl bg-black shadow-2xl">
                <img
                  src={displayedCategory.imageUrl}
                  className="w-full h-auto object-cover bg-black"
                />
              </div>
            </div>

          ) : (
            <>
              {/* ============================
                  DESCRIPTION BLOCK
              ============================ */}
              {(isUrbanSection ||
                isDesignSection ||
                isArchitectureSection) && (
                <div className="mb-24">
                  <div className="max-w-5xl p-10 bg-black/40 rounded-2xl border border-transparent">
                    <div
                      className="text-white text-lg leading-tight"
                      dangerouslySetInnerHTML={{
                        __html: displayedCategory.description,
                      }}
                    />
                  </div>
                </div>
              )}

              {/* ============================
                  PROJECT GRID
              ============================ */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20">
                {displayedCategory.projects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    onClick={onProjectClick}
                    currentSectionName={currentSectionName}
                  />
                ))}
              </div>

              {/* ============================
                  DESIGN IMAGE
              ============================ */}
              {isDesignSection && (
                <div className="mt-32 max-w-5xl mx-auto space-y-20">

                  <div className="p-10 bg-black/40 rounded-2xl border border-transparent">
                    <div
                      className="text-white"
                      dangerouslySetInnerHTML={{ __html: isoContent }}
                    />
                  </div>

                  <div className="w-full overflow-hidden rounded-2xl bg-black shadow-2xl">
                    <img
                      src="https://res.cloudinary.com/dwealmbfi/image/upload/v1771155566/Gemini_Generated_Image_867rii867rii867r_czfvu7.png"
                      className="w-full h-auto object-cover bg-black"
                    />
                  </div>
                </div>
              )}

              {/* ============================
                  URBAN IMAGE
              ============================ */}
              {isUrbanSection && (
                <div className="mt-32 max-w-5xl mx-auto">
                  <div className="w-full overflow-hidden rounded-2xl bg-black shadow-2xl">
                    <img
                      src="https://res.cloudinary.com/dwealmbfi/image/upload/v1770138676/dibujo_limpio_profesional_1_i078jd.png"
                      className="w-full h-auto object-cover bg-black"
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
```
