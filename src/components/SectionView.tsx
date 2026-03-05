// =====================
// SECTIONVIEW — DB+ (PARTE 1/3)
// =====================

import React, { useState, useEffect, useRef } from "react";
import { CategoryGroup, Project, StudioSection } from "../types";
import ProjectCard from "./ProjectCard";

import {
  ChevronRight,
  CheckCircle,
  Upload,
  Paperclip,
  X as CloseIcon,
  Loader2,
} from "lucide-react";

import {
  CATEGORIES,
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
  // ==========================
  // ANIMACIONES DB+
  // ==========================
  const [displayedCategory, setDisplayedCategory] = useState(category);
  const [showDB, setShowDB] = useState(false);
  const [showPlus, setShowPlus] = useState(false);
  const [showName, setShowName] = useState(false);
  const [showDesc, setShowDesc] = useState(false);
  const [showGalleryItems, setShowGalleryItems] = useState(false);
  const [stage, setStage] = useState<"intro" | "gallery">("intro");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const isFirstRender = useRef(true);

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
    const t1 = setTimeout(() => setShowPlus(true), 300);
    const t2 = setTimeout(() => setShowName(true), 500);
    const t3 = setTimeout(() => setStage("gallery"), 800);
    const t4 = setTimeout(() => setShowDesc(true), 1100);
    const t5 = setTimeout(() => setShowGalleryItems(true), 1500);
    return [t1, t2, t3, t4, t5];
  };

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

        setTimeout(() => startSequence(), 150);
      }, 300);

      return () => clearTimeout(tOut);
    }
  }, [category, displayedCategory.id]);

  // ==========================
  // ENQUIRY FORM — ESTADO
  // ==========================
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [enquiryStep, setEnquiryStep] = useState(1);
  const [isSending, setIsSending] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    files: [] as File[],
  });

  const fileToBase64 = (file: File) =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () =>
        resolve((reader.result as string).split(",")[1] ?? "");
      reader.onerror = reject;
    });
  // =========================
// SECTIONVIEW — PARTE 2/3
// ENQUIRY: FORM + SUBMIT + RESET REAL
// =========================

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData({ ...formData, files: Array.from(e.target.files) });
    }
  };

  const removeFile = (index: number) =>
    setFormData({
      ...formData,
      files: formData.files.filter((_, i) => i !== index),
    });

  // 🔥 SUBMIT FIJO — Aquí está el reset REAL
  const handleEnquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);

    const processed = await Promise.all(
      formData.files.map(async (file) => ({
        name: file.name,
        type: file.type,
        data: await fileToBase64(file),
      }))
    );

    const success = await sendProjectEnquiry({
      name: formData.name,
      email: formData.email,
      message: formData.message,
      files: processed,
    });

    if (success) {
      // Mostrar la pantalla "Vision Received"
      setEnquiryStep(4);

      // Después de 2s vaciamos la página
      setTimeout(() => {
        // 1. Vaciar inputs
        setFormData({ name: "", email: "", message: "", files: [] });

        // 2. Volver al paso 1
        setEnquiryStep(1);

        // 3. 🔥 Resetear SECCIÓN COMPLETA → esto es lo que realmente “vacía la página”
        resetSequence();
        setDisplayedCategory(category);
        startSequence();
      }, 2000);
    }

    setIsSending(false);
  };

  // ==========================
  // FLAGS
  // ==========================
  const isEnquiry = displayedCategory.name === StudioSection.ENQUIRY;
  const isHome = displayedCategory.name === StudioSection.HOME;
  const isUrban = displayedCategory.name === StudioSection.URBANISM;
  const isDesign = displayedCategory.name === StudioSection.DESIGN;
  const isArch = displayedCategory.name === StudioSection.ARCHITECTURE;
  const isSupport = displayedCategory.name === StudioSection.PROJECT_SUPPORT;
  const isStructure = displayedCategory.name === StudioSection.STRUCTURE;
  const isBehindDB = displayedCategory.name === StudioSection.BEHIND_DB;

  if (!isActive) return null;

  const scaleTarget =
    typeof window !== "undefined" && window.innerWidth >= 768 ? 0.5 : 0.4;

  // ==========================
  // RENDER
  // ==========================
  return (
    <div
      className={`fixed inset-0 w-full transition-opacity duration-500 ${
        isTransitioning ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Fondo para ENQUIRY */}
      {isEnquiry && (
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src="https://res.cloudinary.com/dwealmbfi/image/upload/v1769967857/make_the_background_2_xwqmiu.png"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
      )}
      // =========================
// SECTIONVIEW — PARTE 3/3
// =========================

      {/* CABECERA DB+ */}
      <div
        className={`fixed z-30 flex items-center transition-all ${
          stage === "intro"
            ? "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-7xl px-10 justify-center"
            : "top-24 left-10 translate-x-0 translate-y-0 pointer-events-none justify-start"
        }`}
        style={{
          width: stage === "intro" ? "100%" : "calc(100% - 80px)",
        }}
      >
        <div
          className="flex items-center gap-10 md:gap-20 transition-all"
          style={{
            transform:
              stage === "gallery"
                ? `scale(${scaleTarget})`
                : "scale(1)",
            transformOrigin: "left",
          }}
        >
          <div className="flex items-center gap-3">
            <h2
              className={`text-9xl font-light text-white transition-all ${
                showDB ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
              }`}
            >
              DB
            </h2>
            <span
              className={`text-7xl text-gray-400 transition-all ${
                showPlus ? "opacity-100 scale-100" : "opacity-0 scale-0"
              }`}
            >
              +
            </span>
          </div>

          <div
            className="transition-all overflow-hidden"
            style={{
              opacity: showName ? 1 : 0,
            }}
          >
            {!isHome && (
              <span className="text-5xl md:text-6xl text-white">
                {displayedCategory.name}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* CONTENIDO PRINCIPAL */}
      <div
        className={`h-full w-full overflow-y-auto px-10 pb-48 custom-scroll ${
          stage === "gallery" ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        style={{ paddingTop: "340px" }}
      >
        <div className="max-w-7xl mx-auto">
          {isEnquiry ? (
            /* ---------------- ENQUIRY ---------------- */
            <div
              className={`max-w-5xl mx-auto ${
                showGalleryItems ? "opacity-100" : "opacity-0"
              } transition-opacity duration-700 relative z-10`}
            >
              {/* Aquí va el formulario (PARTE 2 ya lo incluiste) */}
            </div>
          ) : isBehindDB ? (
            /* ---------------- BEHIND_DB ---------------- */
            <div className="max-w-6xl mx-auto text-black pt-20">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="p-8 bg-white/50 rounded-2xl shadow-xl">
                  <div
                    className="text-lg leading-tight text-justify"
                    dangerouslySetInnerHTML={{
                      __html: displayedCategory.description,
                    }}
                  />
                </div>

                {displayedCategory.imageUrl && (
                  <div className="shadow-2xl rounded-2xl overflow-hidden">
                    <img
                      src={displayedCategory.imageUrl}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* ---------------- OTRAS SECCIONES ---------------- */
            <div>
              {(isUrban || isStructure || isDesign || isSupport || isArch) && (
                <div className="max-w-5xl mb-24">
                  <div className="p-10 bg-white/60 rounded-2xl shadow-xl">
                    <div
                      className="text-black text-lg leading-tight"
                      dangerouslySetInnerHTML={{
                        __html: displayedCategory.description,
                      }}
                    />
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                {displayedCategory.projects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    onClick={onProjectClick}
                    currentSectionName={currentSectionName}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SectionView;
