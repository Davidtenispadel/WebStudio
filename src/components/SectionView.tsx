/*
 * SECTIONVIEW.TSX — UNIFICADO
 * - Estética A (primera versión IAStudio) para TODAS las secciones
 * - ENQUIRY intacto tal cual el segundo (sin cambios de estructura/estilo)
 */

import React, { useEffect, useRef, useState } from "react";
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
  // ============================
  // ANIMATION STATE (estilo A)
  // ============================
  const [displayedCategory, setDisplayedCategory] = useState<CategoryGroup>(category);
  const [showDB, setShowDB] = useState(false);
  const [showPlus, setShowPlus] = useState(false);
  const [showName, setShowName] = useState(false);
  const [showDesc, setShowDesc] = useState(false);
  const [showGalleryItems, setShowGalleryItems] = useState(false);
  const [stage, setStage] = useState<"intro" | "gallery">("intro");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const isFirstRender = useRef(true);

  // ============================
  // ENQUIRY STATE (del segundo, intacto)
  // ============================
  const [enquiryStep, setEnquiryStep] = useState(1);
  const [isSending, setIsSending] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    files: [] as File[],
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ============================
  // ANIMATION LOGIC (estilo A)
  // ============================
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
    const t3 = setTimeout(() => setStage("gallery"), 1000);
    const t4 = setTimeout(() => setShowDesc(true), 1300);
    const t5 = setTimeout(() => setShowGalleryItems(true), 1600);
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
        setTimeout(() => {
          startSequence();
        }, 100);
      }, 500);
      return () => clearTimeout(tOut);
    }
  }, [category, displayedCategory.id]);

  // Forzar stage "gallery" en ENQUIRY como en el segundo
  useEffect(() => {
    if (displayedCategory.name === StudioSection.ENQUIRY) {
      setStage("gallery");
    }
  }, [displayedCategory.name]);

  // ============================
  // ENQUIRY HELPERS (del segundo, intactos)
  // ============================
  const fileToBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      // tal cual el segundo: sin prefijo data:, lo recortamos
      reader.onload = () => resolve((reader.result as string).split(",")[1] ?? "");
      reader.onerror = reject;
    });

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
      setEnquiryStep(4);
      setTimeout(() => {
        setFormData({ name: "", email: "", message: "", files: [] });
      }, 2000);
    }
    setIsSending(false);
  };

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

  if (!isActive) return null;

  // ============================
  // FLAGS por sección
  // ============================
  const isEnquiry = displayedCategory.name === StudioSection.ENQUIRY;
  const isHomeSection = displayedCategory.name === StudioSection.HOME;
  const isUrbanSection = displayedCategory.name === StudioSection.URBANISM;
  const isDesignSection = displayedCategory.name === StudioSection.DESIGN;
  const isArchitectureSection = displayedCategory.name === StudioSection.ARCHITECTURE;
  const isProjectSupportSection = displayedCategory.name === StudioSection.PROJECT_SUPPORT;
  const isStructureSection = displayedCategory.name === StudioSection.STRUCTURE;
  const isBehindDBSection = displayedCategory.name === StudioSection.BEHIND_DB;

  const scaleTarget =
    typeof window !== "undefined" && window.innerWidth >= 768 ? 0.5 : 0.4;

  // ============================
  // RENDER
  // ============================
  return (
    <div
      className={`fixed inset-0 w-full transition-opacity duration-500 ${
        isTransitioning ? "opacity-0" : "opacity-100"
      } bg-transparent`}
    >
      {/* ==== FONDO ENQUIRY (del segundo) ==== */}
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

      {/* ==== HEADER DB+ (estética A) ==== */}
      <div
        className={`fixed z-[40] flex items-center transition-all ${
          stage === "intro"
            ? "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-7xl px-10 justify-center"
            : "top-24 left-10 translate-x-0 translate-y-0 pointer-events-none justify-start"
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
            <h2
              className={`text-9xl font-light tracking-tighter transition-all ${
                // En A el header es negro sobre fondo claro;
                // en ENQUIRY mantenemos DB blanco para contraste con fondo oscuro, sin tocar enquiry layout
                isEnquiry ? "text-white" : "text-black"
              } ${showDB ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"}`}
              style={{
                fontSize: typeof window !== "undefined" && window.innerWidth >= 768 ? "12rem" : "9rem",
                transitionTimingFunction: "cubic-bezier(0.23, 1, 0.32, 1)",
                transitionDuration: "1000ms",
              }}
            >
              DB
            </h2>
            <span
              className={`text-6xl md:text-8xl font-thin transition-all ${
                isEnquiry ? "text-gray-300" : "text-gray-400"
              } ${showPlus ? "opacity-100 scale-100 rotate-0" : "opacity-0 scale-0 rotate-45"}`}
              style={{ transitionDuration: "700ms" }}
            >
              +
            </span>
          </div>

          <div
            className="transition-all ease-out overflow-hidden flex-1"
            style={{
              transitionDuration: "700ms",
              transform: showName ? "translateX(0)" : "translateX(-48px)",
              opacity: showName ? 1 : 0,
            }}
          >
            {/* Nombres de sección (estética A) */}
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

        {/* Descripción (estética A), excluyendo secciones especiales y Enquiry */}
        {displayedCategory.description &&
          !isHomeSection &&
          !isDesignSection &&
          !isEnquiry &&
          !isProjectSupportSection &&
          !isStructureSection &&
          !isBehindDBSection && (
            <div
              className={`transition-all ease-out overflow-hidden flex-1 ${
                stage === "gallery"
                  ? "ml-6 md:ml-10 border-l border-black/20 pl-6 md:pl-10 max-w-3xl "
                  : "pointer-events-none w-0 h-0"
              }`}
              style={{
                transitionDuration: "1000ms",
                opacity: stage === "gallery" && showDesc ? 1 : 0,
                transform:
                  stage === "gallery" && showDesc ? "translateX(0)" : "translateX(-40px)",
              }}
            >
              {isArchitectureSection ? (
                <span className="font-light text-gray-400 leading-tight tracking-tight italic text-sm md:text-base lg:text-lg whitespace-pre-line">
                  Portfolio of selected projects
                </span>
              ) : isUrbanSection ? (
                <span className="font-light text-gray-400 leading-tight tracking-tight italic text-sm md:text-base lg:text-lg whitespace-pre-line">
                  {urbanMasterplanningHeaderDescription}
                </span>
              ) : (
                <div
                  className="font-light text-gray-400 leading-tight tracking-tight italic text-sm md:text-base lg:text-lg whitespace-pre-line"
                  dangerouslySetInnerHTML={{ __html: displayedCategory.description }}
                />
              )}
            </div>
          )}
      </div>

      {/* ==== MAIN CONTENT (scroll) ==== */}
      <div
        className={`h-full w-full overflow-y-auto custom-scroll px-10 pb-48 transition-opacity duration-1000 ${
          stage === "gallery" ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        style={{ paddingTop: "340px" }}
      >
        <div className="max-w-7xl mx-auto">
          {/* ===== ENQUIRY (del segundo, intacto) ===== */}
          {isEnquiry ? (
            <div className="max-w-7xl mx-auto relative z-[50]">
              <div className="relative z-[60]">
                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10">
                  {/* Columna izquierda — NEGRO (del segundo) */}
                  <aside className="bg-neutral-900/95 text-white rounded-2xl p-8 md:p-10 shadow-2xl border border-white/10">
                    <h3 className="text-3xl md:text-4xl font-light leading-tight">
                      Contact
                      <br />
                      Information
                    </h3>

                    <div className="mt-8 space-y-6 text-white/80">
                      <div>
                        <div className="text-[11px] tracking-[0.25em] text-white/50 uppercase">
                          Office
                        </div>
                        <div className="mt-2 text-base leading-6">
                          108 Kestrel Road, Corby,
                          <br />
                          Northamptonshire, England
                        </div>
                      </div>

                      <div>
                        <div className="text-[11px] tracking-[0.25em] text-white/50 uppercase">
                          Telephone
                        </div>
                        <div className="mt-2 text-base">+44 07955018937</div>
                      </div>

                      <div>
                        <div className="text-[11px] tracking-[0.25em] text-white/50 uppercase">
                          Email
                        </div>
                        <a
                          href="mailto:db@dbsdesigner.com"
                          className="mt-2 block text-base text-red-400 hover:text-red-300"
                        >
                          db@dbsdesigner.com
                        </a>
                      </div>
                    </div>
                  </aside>

                  {/* Columna derecha — FORMULARIO (del segundo) */}
                  <section className="bg-neutral-800/70 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/10 shadow-2xl text-white">
                    <form onSubmit={handleEnquirySubmit} className="space-y-6">
                      {/* Name + Email */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-[11px] tracking-[0.25em] text-white/70 uppercase mb-2">
                            Full Name
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="John Doe"
                            className="w-full bg-neutral-700/60 border border-white/15 rounded-md px-4 py-3 outline-none placeholder-white/40 focus:ring-2 focus:ring-white/20"
                            value={formData.name}
                            onChange={(e) =>
                              setFormData({ ...formData, name: e.target.value })
                            }
                            disabled={isSending}
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] tracking-[0.25em] text-white/70 uppercase mb-2">
                            Email Address
                          </label>
                          <input
                            type="email"
                            required
                            placeholder="john@example.com"
                            className="w-full bg-neutral-700/60 border border-white/15 rounded-md px-4 py-3 outline-none placeholder-white/40 focus:ring-2 focus:ring-white/20"
                            value={formData.email}
                            onChange={(e) =>
                              setFormData({ ...formData, email: e.target.value })
                            }
                            disabled={isSending}
                          />
                        </div>
                      </div>

                      {/* Project Brief */}
                      <div>
                        <label className="block text-[11px] tracking-[0.25em] text-white/70 uppercase mb-2">
                          Project Brief
                        </label>
                        <textarea
                          required
                          placeholder="Tell us about your architectural vision..."
                          className="w-full h-44 bg-neutral-700/60 border border-white/15 rounded-md px-4 py-3 outline-none placeholder-white/40 focus:ring-2 focus:ring-white/20"
                          value={formData.message}
                          onChange={(e) =>
                            setFormData({ ...formData, message: e.target.value })
                          }
                          disabled={isSending}
                        />
                      </div>

                      {/* Attachments */}
                      <div>
                        <label className="block text-[11px] tracking-[0.25em] text-white/70 uppercase mb-3">
                          Attachments
                        </label>

                        <div className="rounded-xl bg-neutral-700/50 border border-white/15 p-5 md:p-6 text-white/70">
                          <button
                            type="button"
                            onClick={() => !isSending && fileInputRef.current?.click()}
                            className={`w-full flex flex-col items-center justify-center gap-3 py-8 rounded-lg transition ${
                              isSending ? "opacity-50 cursor-not-allowed" : "hover:bg-white/5"
                            }`}
                          >
                            <Upload className="w-7 h-7 opacity-80" />
                            <span className="text-xs">
                              Click to attach blueprints, photos, or project requirements
                            </span>
                            {formData.files.length > 0 && (
                              <span className="text-xs text-red-400 font-bold">
                                {formData.files.length} file(s) selected
                              </span>
                            )}
                          </button>

                          <input
                            ref={fileInputRef}
                            type="file"
                            className="hidden"
                            multiple
                            onChange={handleFileChange}
                            disabled={isSending}
                          />

                          {formData.files.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-4">
                              {formData.files.map((file, idx) => (
                                <div
                                  key={idx}
                                  className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full border border-white/10"
                                >
                                  <Paperclip className="w-3 h-3 text-red-400" />
                                  <span className="text-[10px] text-white/80 max-w-[120px] truncate">
                                    {file.name}
                                  </span>
                                  <button
                                    type="button"
                                    onClick={() => !isSending && removeFile(idx)}
                                    className="hover:text-red-400 text-white/40 transition-colors"
                                  >
                                    <CloseIcon className="w-3 h-3" />
                                  </button>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Submit */}
                      <button
                        type="submit"
                        disabled={isSending}
                        className="flex items-center gap-6 mt-2 bg-white text-black px-10 py-4 rounded-full shadow-2xl hover:bg-red-600 hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <span className="text-xs font-bold tracking-[0.4em] uppercase">
                          {isSending ? "Transmitting..." : "Submit to db+"}
                        </span>
                        {isSending ? (
                          <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                          <ChevronRight className="w-5 h-5" />
                        )}
                      </button>

                      {/* Success */}
                      {enquiryStep >= 4 && (
                        <div className="py-16 flex flex-col items-center text-center space-y-6">
                          <div className="p-5 bg-white rounded-full">
                            <CheckCircle className="w-14 h-14 text-red-600" />
                          </div>
                          <div>
                            <h4 className="text-2xl font-light text-white">Vision Received</h4>
                            <p className="text-white/70 mt-2 leading-tight max-w-md">
                              Your project details and documents have been submitted to{" "}
                              <span className="text-red-400">db@dbsdesigner.com</span>. We will
                              review your vision and contact you shortly.
                            </p>
                          </div>
                        </div>
                      )}
                    </form>
                  </section>
                </div>
              </div>
            </div>
          ) : isBehindDBSection ? (
            // ===== Behind DB (estética A)
            <div
              className={`max-w-6xl mx-auto relative z-10 text-black pt-20 transition-opacity duration-1000 ${
                showGalleryItems ? "opacity-100" : "opacity-0"
              }`}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start w-full">
                <div className="md:col-span-1 p-8 bg-white/50 backdrop-blur-md rounded-2xl border border-white/60 shadow-xl">
                  <div
                    className="text-base md:text-lg lg:text-xl font-light leading-tight text-justify"
                    dangerouslySetInnerHTML={{ __html: displayedCategory.description }}
                  />
                </div>
                <div className="md:col-span-1 w-full overflow-hidden shadow-2xl rounded-2xl border border-white/20">
                  <img
                    src={displayedCategory.imageUrl}
                    alt={displayedCategory.name}
                    className="w-full h-auto object-cover"
                    style={{
                      aspectRatio: typeof window !== "undefined" && window.innerWidth < 768 ? "1/1" : "unset",
                    }}
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          ) : (
            // ===== Resto de secciones (estética A)
            <div className={`transition-opacity duration-1000 ${showGalleryItems ? "opacity-100" : "opacity-0"}`}>
              {(isUrbanSection || isStructureSection || isDesignSection || isProjectSupportSection || isArchitectureSection) && (
                <div className={`flex flex-col gap-12 ${isDesignSection ? "mb-8" : "mb-24"}`}>
                  {/* Descripción sin fondo, sin borde, mismo estilo que el header */}
                  <div className="w-full max-w-5xl">
                    <div
                      className="font-light text-gray-400 leading-tight tracking-tight italic text-sm md:text-base lg:text-lg"
                      dangerouslySetInnerHTML={{ __html: displayedCategory.description }}
                    />
                  </div>
                </div>
              )}

              {/* Grilla de proyectos */}
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

              {/* Bloques especiales */}
              {isDesignSection && (
                <div className="flex flex-col gap-24 mt-32 mb-16 max-w-5xl mx-auto">
                  <div className="p-10 bg-white/60 backdrop-blur-md rounded-2xl border border-white/50 shadow-xl">
                    <div className="text-black leading-tight" dangerouslySetInnerHTML={{ __html: isoContent }} />
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
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SectionView;
