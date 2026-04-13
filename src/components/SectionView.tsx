/*
 * SECTIONVIEW.TSX — Versión final con Project Journey:
 * - Texto arriba (blanco, alineado a la izquierda, con espacio superior).
 * - Imagen debajo (ocupa el resto).
 * - Botón "Start your Project" solo en la última diapositiva.
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
// COMPONENTE PROJECT JOURNEY SLIDES (texto arriba, imagen abajo)
// ============================
interface ProjectJourneySlidesProps {
  onStartProject: () => void;
}

const ProjectJourneySlides: React.FC<ProjectJourneySlidesProps> = ({ onStartProject }) => {
  const slides = [
    {
      id: 1,
      image: "https://res.cloudinary.com/dwealmbfi/image/upload/v1775930330/1._Family_Country_xehkff.png",
      line1: "Architecture begins with you:",
      line2: "not with drawings, not with plans. With your life, your needs, your history.",
      // Sin botón en este slide
    },
    {
      id: 2,
      image: "https://res.cloudinary.com/dwealmbfi/image/upload/v1775929794/2._table_drawings_mdzbk2.png",
      text: "You need a space that meets your needs. You’ve gathered ideas and inspiration, but it still doesn’t fit. That doubt marks the moment to design something unmistakably yours",
    },
    {
      id: 3,
      image: "https://res.cloudinary.com/dwealmbfi/image/upload/v1775929804/3._Model_kuhihd.png",
      text: "Doubt is not an obstacle; it marks the beginning. Great architecture does not arise from ready answers but from asking the right questions about your routines, tastes, ambitions and way of living",
    },
    {
      id: 4,
      image: "https://res.cloudinary.com/dwealmbfi/image/upload/v1775929824/4._Panoramic_Livingroom_hi9uhv.png",
      text: "Your ideal project starts here. Stop overthinking. Start imagining with us. Tell us what you need, what you love, how you live, and we’ll shape a space that feels right from day one.",
      isLast: true,
    },
  ];

  return (
    <div className="relative w-full h-full">
      {slides.map((slide) => (
        <section
          key={slide.id}
          className="relative w-full h-screen snap-start flex flex-col"
          style={{ scrollSnapAlign: "start" }}
        >
          {/* Espacio superior (para separar del borde) */}
          <div className="pt-16 md:pt-24 lg:pt-32"></div>

          {/* Contenedor del texto: fondo blanco, alineado a la izquierda, con padding horizontal reducido */}
          <div className="bg-white py-8 px-4 md:px-8 text-left">
            {slide.id === 1 ? (
              <>
                <p className="text-black text-2xl md:text-3xl lg:text-4xl font-light leading-tight tracking-wide">
                  {slide.line1}
                </p>
                <p className="text-black text-2xl md:text-3xl lg:text-4xl font-light leading-tight tracking-wide mt-2">
                  {slide.line2}
                </p>
              </>
            ) : (
              <p className="text-black text-2xl md:text-3xl lg:text-4xl font-light leading-tight tracking-wide">
                {slide.text}
              </p>
            )}
            {slide.isLast && (
              <div className="mt-10">
                <button
                  onClick={onStartProject}
                  className="group inline-flex items-center gap-3 bg-black text-white px-8 py-4 rounded-full text-sm font-semibold uppercase tracking-wider shadow-xl hover:bg-red-600 hover:text-white transition-all duration-300"
                >
                  Start your Project
                  <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            )}
          </div>

          {/* Imagen debajo, ocupando el resto del espacio disponible */}
          <div className="flex-1 w-full overflow-hidden">
            <img
              src={slide.image}
              alt={`Journey ${slide.id}`}
              className="w-full h-full object-cover"
            />
          </div>
        </section>
      ))}
    </div>
  );
};

// ============================
// TIPOS Y CONSTANTES (sin cambios)
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
const formatBytes = (bytes: number) => {
  if (!bytes && bytes !== 0) return "";
  const sizes = ["B", "KB", "MB", "GB", "TB"];
  if (bytes === 0) return "0 B";
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  const val = bytes / Math.pow(1024, i);
  return `${val.toFixed(val >= 100 || i === 0 ? 0 : 1)} ${sizes[i]}`;
};
const fileId = (f: File) => `${f.name}-${f.size}-${f.lastModified}-${Math.random().toString(36).slice(2, 8)}`;

const SectionView: React.FC<SectionViewProps> = ({
  category,
  onProjectClick,
  isActive,
  currentSectionName,
  onNavigateToEnquiry,
}) => {
  // Estados de animación
  const [displayedCategory, setDisplayedCategory] = useState<CategoryGroup>(category);
  const [showDB, setShowDB] = useState(false);
  const [showPlus, setShowPlus] = useState(false);
  const [showName, setShowName] = useState(false);
  const [showDesc, setShowDesc] = useState(false);
  const [showGalleryItems, setShowGalleryItems] = useState(false);
  const [stage, setStage] = useState<"intro" | "gallery">("intro");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const isFirstRender = useRef(true);

  // Estados del formulario Enquiry
  const [enquiryStep, setEnquiryStep] = useState(1);
  const [isSending, setIsSending] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [items, setItems] = useState<UploadedItem[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // ============================
  // Animaciones (Aesthetic A)
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

  // Flags de sección
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

  // ============================
  // Lógica de subida de archivos (ENQUIRY)
  // ============================
  const uploadFiles = (files: File[]) => {
    if (!files?.length) return;
    setIsUploading(true);
    const initial: UploadedItem[] = files.map((f) => ({
      id: fileId(f),
      name: f.name,
      size: f.size,
      type: f.type,
      progress: 0,
      status: "uploading",
    }));
    setItems((prev) => [...prev, ...initial]);

    const xhr = new XMLHttpRequest();
    const fd = new FormData();
    files.forEach((f) => fd.append("files[]", f));

    xhr.upload.onprogress = (e) => {
      if (!e.lengthComputable) return;
      const pct = Math.round((e.loaded / e.total) * 100);
      setItems((prev) =>
        prev.map((it) =>
          initial.some((i) => i.id === it.id) ? { ...it, progress: pct } : it
        )
      );
    };

    xhr.onload = () => {
      const ok = xhr.status >= 200 && xhr.status < 300;
      const raw = xhr.responseText || "";
      let json: any = null;
      try { json = JSON.parse(raw); } catch { json = null; }
      if (!ok || !Array.isArray(json)) {
        setItems((prev) =>
          prev.map((it) =>
            initial.some((i) => i.id === it.id)
              ? { ...it, status: "error", error: "Invalid server response" }
              : it
          )
        );
        setIsUploading(false);
        return;
      }
      const byName = new Map<string, { url?: string; error?: boolean }>();
      json.forEach((r: any) => {
        if (r && typeof r === "object" && typeof r.name === "string") {
          byName.set(r.name, { url: r.url, error: !!r.error });
        }
      });
      setItems((prev) =>
        prev.map((it) => {
          if (!initial.some((i) => i.id === it.id)) return it;
          const safe = it.name.replace(/[^A-Za-z0-9._-]/g, "_");
          const r = byName.get(safe);
          if (!r) return { ...it, status: "error", error: "File missing" };
          if (r.error) return { ...it, status: "error", error: "Upload failed" };
          return { ...it, status: "uploaded", progress: 100, url: r.url };
        })
      );
      setIsUploading(false);
    };

    xhr.onerror = () => {
      setItems((prev) =>
        prev.map((it) =>
          initial.some((i) => i.id === it.id)
            ? { ...it, status: "error", error: "Network error" }
            : it
        )
      );
      setIsUploading(false);
    };

    xhr.open("POST", UPLOAD_ENDPOINT, true);
    xhr.withCredentials = false;
    xhr.send(fd);
  };

  const onDropFiles = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const files = e.dataTransfer?.files ? Array.from(e.dataTransfer.files) : [];
    if (files.length) uploadFiles(files);
  };

  const onSelectFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target?.files ? Array.from(e.target.files) : [];
    if (files.length) uploadFiles(files);
    if (e.currentTarget) e.currentTarget.value = "";
  };

  const removeItem = (id: string) => setItems((prev) => prev.filter((it) => it.id !== id));
  const clearErrored = () => setItems((prev) => prev.filter((it) => it.status !== "error"));
  const fileUrls = items.filter((it) => it.status === "uploaded" && it.url).map((it) => it.url!);

  const handleEnquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isUploading) return;
    setIsSending(true);
    const success = await sendProjectEnquiry({
      name: formData.name,
      email: formData.email,
      message: formData.message,
      fileUrls,
    });
    if (success) {
      setEnquiryStep(4);
      setTimeout(() => setFormData({ name: "", email: "", message: "" }), 2000);
    }
    setIsSending(false);
  };

  const navigateToEnquiry = () => {
    if (onNavigateToEnquiry) {
      onNavigateToEnquiry();
    } else {
      const enquiryNavItem = Array.from(document.querySelectorAll('nav a, [data-nav]')).find(
        (el) => el.textContent?.trim() === "Enquiry"
      ) as HTMLElement;
      if (enquiryNavItem) enquiryNavItem.click();
      else console.warn("No se pudo navegar a Enquiry");
    }
  };

  // ============================
  // RENDER PRINCIPAL
  // ============================
  return (
    <div
      className={`fixed inset-0 w-full transition-opacity duration-500 ${
        isTransitioning ? "opacity-0" : "opacity-100"
      } bg-transparent`}
    >
      {/* Fondo para ENQUIRY */}
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

      {/* HEADER (Aesthetic A) */}
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
            <h2
              className={`text-9xl font-light tracking-tighter transition-all ${
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
            {isUrbanSection ? (
              <div className="flex flex-col items-start justify-center">
                <span className={`text-4xl md:text-6xl tracking-[0.15em] font-light leading-none block ${isEnquiry ? "text-white" : "text-black"}`}>
                  Masterplanning +
                </span>
                <span className="text-3xl md:text-5xl tracking-[0.15em] font-light text-gray-400 mt-4 leading-none block">
                  Urban
                </span>
              </div>
            ) : isDesignSection ? (
              <div className="flex flex-col items-start justify-center">
                <span className={`text-4xl md:text-6xl tracking-[0.15em] font-light leading-none block ${isEnquiry ? "text-white" : "text-black"}`}>
                  Design
                </span>
                <span className="text-3xl md:text-5xl tracking-[0.15em] font-light text-gray-400 mt-4 leading-none block">
                  &amp; Management
                </span>
              </div>
            ) : (
              <span className={`text-4xl md:text-6xl tracking-[0.15em] font-light block leading-none ${isEnquiry ? "text-white" : "text-black"}`}>
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
                transform: stage === "gallery" && showDesc ? "translateX(0)" : "translateX(-40px)",
              }}
            >
              {isUrbanSection ? (
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

      {/* CONTENEDOR DE SCROLL */}
      <div
        ref={scrollContainerRef}
        className={`h-full w-full overflow-y-auto custom-scroll transition-opacity duration-1000 ${
          stage === "gallery" ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        style={{
          scrollSnapType: isProjectJourney ? "y mandatory" : "auto",
          scrollBehavior: "smooth",
        }}
      >
        <div className={isProjectJourney ? "w-full h-full" : "max-w-7xl mx-auto px-10 pb-48"}>
          {isEnquiry ? (
            <div className="max-w-7xl mx-auto relative z-[50] px-10 py-20">
              {/* FORMULARIO ENQUIRY (completo) */}
              <div className="relative z-[60]">
                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10">
                  <aside className="bg-neutral-900/95 text-white rounded-2xl p-8 md:p-10 shadow-2xl border border-white/10">
                    <h3 className="text-3xl md:text-4xl font-light leading-tight">Contact<br />Information</h3>
                    <div className="mt-8 space-y-6 text-white/80">
                      <div><div className="text-[11px] tracking-[0.25em] text-white/50 uppercase">Office</div><div className="mt-2 text-base leading-6">108 Kestrel Road, Corby,<br />Northamptonshire, England</div></div>
                      <div><div className="text-[11px] tracking-[0.25em] text-white/50 uppercase">Telephone</div><div className="mt-2 text-base">+44 07955018937</div></div>
                      <div><div className="text-[11px] tracking-[0.25em] text-white/50 uppercase">Email</div><a href="mailto:db@dbsdesigner.com" className="mt-2 block text-base text-red-400 hover:text-red-300">db@dbsdesigner.com</a></div>
                    </div>
                  </aside>
                  <section className="bg-neutral-800/70 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/10 shadow-2xl text-white">
                    <form onSubmit={handleEnquirySubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div><label className="block text-[11px] tracking-[0.25em] text-white/70 uppercase mb-2">Full Name</label><input type="text" required placeholder="John Doe" className="w-full bg-neutral-700/60 border border-white/15 rounded-md px-4 py-3 outline-none placeholder-white/40 focus:ring-2 focus:ring-white/20" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} disabled={isSending} /></div>
                        <div><label className="block text-[11px] tracking-[0.25em] text-white/70 uppercase mb-2">Email Address</label><input type="email" required placeholder="john@example.com" className="w-full bg-neutral-700/60 border border-white/15 rounded-md px-4 py-3 outline-none placeholder-white/40 focus:ring-2 focus:ring-white/20" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} disabled={isSending} /></div>
                      </div>
                      <div><label className="block text-[11px] tracking-[0.25em] text-white/70 uppercase mb-2">Project Brief</label><textarea required placeholder="Tell us about your architectural vision..." className="w-full h-44 bg-neutral-700/60 border border-white/15 rounded-md px-4 py-3 outline-none placeholder-white/40 focus:ring-2 focus:ring-white/20" value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} disabled={isSending} /></div>
                      <div>
                        <label className="block text-[11px] tracking-[0.25em] text-white/70 uppercase mb-3">Attachments</label>
                        <div className={["rounded-xl border-2 border-dashed cursor-pointer", dragActive ? "border-red-500 bg-red-500/10" : "border-white/20 bg-neutral-700/40", "p-6 md:p-8 transition-colors"].join(" ")} onClick={() => !isSending && fileInputRef.current?.click()} onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); setDragActive(true); }} onDragLeave={(e) => { e.preventDefault(); e.stopPropagation(); setDragActive(false); }} onDrop={onDropFiles}>
                          <div className="flex flex-col items-center text-center gap-3 pointer-events-none">
                            <div className="p-3 rounded-full bg-white/10 border border-white/10"><Upload className="w-6 h-6 text-white/80" /></div>
                            <div className="text-sm"><span className="text-white">Drag &amp; drop files here</span> <span className="text-white/60">or</span> <span className="text-red-400 underline">click to browse</span></div>
                            <div className="text-xs text-white/50">Blueprints, PDFs, images… Large files supported.</div>
                            {(isUploading || items.some((it) => it.status === "uploading")) && <div className="text-[11px] uppercase tracking-[0.25em] text-white/60 mt-2">Uploading…</div>}
                          </div>
                          <input ref={fileInputRef} type="file" className="hidden" multiple onChange={onSelectFiles} disabled={isSending} />
                        </div>
                        {items.length > 0 && (
                          <div className="mt-5 space-y-3">
                            {items.map((it) => (
                              <div key={it.id} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3">
                                <div className="flex items-start gap-3">
                                  <div className="mt-0.5">{it.status === "uploaded" ? <CheckCircle className="w-4 h-4 text-green-400" /> : it.status === "error" ? <AlertCircle className="w-4 h-4 text-red-400" /> : <FileIcon className="w-4 h-4 text-white/70" />}</div>
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2"><div className="text-sm text-white/90 truncate">{it.name}</div><div className="text-[11px] text-white/50">· {formatBytes(it.size)}</div></div>
                                    {it.status === "uploading" && (<div className="mt-2"><div className="w-full bg-white/10 rounded-full h-2 overflow-hidden"><div className="h-2 bg-red-500 transition-all" style={{ width: `${it.progress}%` }} /></div><div className="text-[11px] text-white/60 mt-1">{it.progress}%</div></div>)}
                                    {it.status === "error" && <div className="text-xs text-red-400 mt-2">{it.error || "Upload failed"}</div>}
                                    {it.status === "uploaded" && it.url && (<div className="mt-2 flex items-center gap-3"><a href={it.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-xs text-red-300 hover:text-red-200 underline"><Link2 className="w-3.5 h-3.5" />Open file</a><button type="button" onClick={async () => { try { await navigator.clipboard.writeText(it.url!); } catch {} }} className="text-xs text-white/60 hover:text-white">Copy URL</button></div>)}
                                  </div>
                                  <button type="button" onClick={() => removeItem(it.id)} className="text-white/40 hover:text-red-400 transition-colors"><CloseIcon className="w-4 h-4" /></button>
                                </div>
                              </div>
                            ))}
                            {items.some((x) => x.status === "error") && (<div className="pt-1"><button type="button" onClick={clearErrored} className="text-xs text-white/60 hover:text-white underline">Clear failed uploads</button></div>)}
                          </div>
                        )}
                      </div>
                      <button type="submit" disabled={isSending || isUploading} className="flex items-center gap-6 mt-2 bg-white text-black px-10 py-4 rounded-full shadow-2xl hover:bg-red-600 hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                        <span className="text-xs font-bold tracking-[0.4em] uppercase">{isSending ? "Transmitting..." : isUploading ? "Uploading…" : "Submit to db+"}</span>
                        {isSending || isUploading ? <Loader2 className="w-5 h-5 animate-spin" /> : <ChevronRight className="w-5 h-5" />}
                      </button>
                      {enquiryStep >= 4 && (
                        <div className="py-16 flex flex-col items-center text-center space-y-6">
                          <div className="p-5 bg-white rounded-full"><CheckCircle className="w-14 h-14 text-red-600" /></div>
                          <div><h4 className="text-2xl font-light text-white">Vision Received</h4><p className="text-white/70 mt-2 leading-tight max-w-md">Your project details and documents have been submitted to <span className="text-red-400">db@dbsdesigner.com</span>. We will review your vision and contact you shortly.</p></div>
                        </div>
                      )}
                    </form>
                  </section>
                </div>
              </div>
            </div>
          ) : isBehindDBSection ? (
            <div className={`max-w-6xl mx-auto relative z-10 text-white pt-20 transition-opacity duration-1000 px-10 ${showGalleryItems ? "opacity-100" : "opacity-0"}`}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start w-full">
                <div className="md:col-span-1 p-8 bg-black/40 backdrop-blur-md rounded-2xl border border-white/10 shadow-xl">
                  <div className="text-base md:text-lg lg:text-xl font-light leading-tight text-justify" dangerouslySetInnerHTML={{ __html: displayedCategory.description }} />
                </div>
                <div className="md:col-span-1 w-full overflow-hidden shadow-2xl rounded-2xl border border-white/10">
                  <img src={displayedCategory.imageUrl} alt={displayedCategory.name} className="w-full h-auto object-cover" style={{ aspectRatio: typeof window !== "undefined" && window.innerWidth < 768 ? "1/1" : "unset" }} loading="lazy" />
                </div>
              </div>
            </div>
          ) : (
            <div className={`transition-opacity duration-1000 ${showGalleryItems ? "opacity-100" : "opacity-0"}`}>
              {(isUrbanSection || isStructureSection || isDesignSection || isProjectSupportSection || isArchitectureSection || isProjectJourney) && (
                <div className="flex flex-col gap-12">
                  {isArchitectureSection && (
                    <div className={`flex flex-col gap-12 ${isDesignSection ? "mb-8" : "mb-24"}`}>
                      <div className="w-full max-w-5xl p-10 bg-black/40 backdrop-blur-md rounded-2xl border border-white/10 shadow-xl">
                        <div>{/* Architecture content */}</div>
                      </div>
                    </div>
                  )}
                  {isProjectJourney && (
                    <ProjectJourneySlides onStartProject={navigateToEnquiry} />
                  )}
                  {!isProjectJourney && (
                    <div className="text-white font-normal text-lg md:text-xl leading-tight px-10" dangerouslySetInnerHTML={{ __html: displayedCategory.description }} />
                  )}
                </div>
              )}
              {!isProjectJourney && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24 px-10">
                    {displayedCategory.projects.map((project) => (
                      <ProjectCard key={project.id} project={project} onClick={onProjectClick} currentSectionName={currentSectionName} />
                    ))}
                  </div>
                  {isDesignSection && (
                    <div className="flex flex-col gap-24 mt-32 mb-16 max-w-5xl mx-auto px-10">
                      <div className="p-10 bg-black/40 backdrop-blur-md rounded-2xl border border-white/10 shadow-xl">
                        <div className="text-white leading-tight" dangerouslySetInnerHTML={{ __html: isoContent }} />
                      </div>
                      <div className="w-full overflow-hidden rounded-2xl shadow-2xl border border-white/10">
                        <img src="https://res.cloudinary.com/dwealmbfi/image/upload/v1771155566/Gemini_Generated_Image_867rii867rii867r_czfvu7.png" alt="Design & Management Vision" className="w-full h-auto object-cover" loading="lazy" />
                      </div>
                    </div>
                  )}
                  {isUrbanSection && (
                    <div className="mt-32 mb-16 max-w-5xl mx-auto px-10">
                      <div className="w-full overflow-hidden rounded-2xl shadow-2xl border border-white/10">
                        <img src="https://res.cloudinary.com/dwealmbfi/image/upload/v1770138676/dibujo_limpio_profesional_1_i078jd.png" alt="Urban Masterplanning Drawing" className="w-full h-auto object-cover" loading="lazy" />
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SectionView;
