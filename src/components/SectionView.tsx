/*  SECTIONVIEW.TSX — VERSIÓN COMPLETA + ENQUIRY CON RECUADROS (NEGRO + GRIS)  */

import React, { useState, useEffect, useRef } from "react";
import { CategoryGroup, Project, StudioSection } from "../types";
import ProjectCard from "./ProjectCard";
import { CheckCircle } from "lucide-react";
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
  // ANIMATION STATE
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

  // ==========================
  // ENQUIRY FORM STATE
  // ==========================
  const [enquiryStep, setEnquiryStep] = useState(1);
  const [isSending, setIsSending] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    files: [] as File[],
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  // ==========================
  // ANIMATION SEQUENCES
  // ==========================
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
        setTimeout(() => startSequence(), 150);
      }, 300);
      return () => clearTimeout(tOut);
    }
  }, [category, displayedCategory.id]);

  // Forzar "gallery" en ENQUIRY (evita opacidad/pointer-events)
  useEffect(() => {
    if (displayedCategory.name === StudioSection.ENQUIRY) {
      setStage("gallery");
    }
  }, [displayedCategory.name]);

  // ==========================
  // HELPERS FORM
  // ==========================
  const fileToBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () =>
        resolve((reader.result as string).split(",")[1] ?? "");
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

  const removeFile = (index: number) => {
    setFormData({
      ...formData,
      files: formData.files.filter((_, i) => i !== index),
    });
  };

  if (!isActive) return null;

  const isEnquiry = displayedCategory.name === StudioSection.ENQUIRY;
  const isHome = displayedCategory.name === StudioSection.HOME;

  const scaleTarget =
    typeof window !== "undefined" && window.innerWidth >= 768 ? 0.5 : 0.4;

  // ==========================================
  // RENDER
  // ==========================================
  return (
    <div
      className={`fixed inset-0 w-full transition-opacity duration-500 ${
        isTransitioning ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Fondo ENQUIRY */}
      {isEnquiry && (
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src="https://res.cloudinary.com/dwealmbfi/image/upload/v1769967857/make_the_background_2_xwqmiu.png"
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
      )}

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
            transform: stage === "gallery" ? `scale(${scaleTarget})` : "scale(1)",
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
            style={{ opacity: showName ? 1 : 0 }}
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
          stage === "gallery" || isEnquiry
            ? "opacity-100"
            : "opacity-0 pointer-events-none"
        }`}
        style={{ paddingTop: "340px" }}
      >
        <div className="max-w-7xl mx-auto relative z-20">
          {/* ==========================================================
              ENQUIRY — RECUADRO NEGRO (INFO) + RECUADRO GRIS (FORM)
             ========================================================== */}
          {isEnquiry && (
            <div className="relative z-20">
              <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10">
                {/* COLUMNA IZQUIERDA — TARJETA NEGRA */}
                <aside className="bg-black/95 text-white rounded-2xl p-8 md:p-10 shadow-2xl border border-white/5">
                  <h3 className="text-3xl md:text-4xl font-light leading-tight">
                    Contact<br />Information
                  </h3>

                  <div className="mt-8 space-y-6 text-white/80">
                    <div>
                      <div className="text-[11px] tracking-[0.25em] text-white/50 uppercase">
                        Office
                      </div>
                      <div className="mt-2 text-base leading-6">
                        108 Kestrel Road, Corby,<br />
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

                {/* COLUMNA DERECHA — FORMULARIO */}
                <section className="bg-neutral-800/70 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/10 shadow-2xl text-white">
                  <form onSubmit={handleEnquirySubmit} className="space-y-6">
                    {/* NAME + EMAIL */}
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
                        />
                      </div>
                    </div>

                    {/* PROJECT BRIEF */}
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
                      />
                    </div>

                    {/* ATTACHMENTS */}
                    <div>
                      <label className="block text-[11px] tracking-[0.25em] text-white/70 uppercase mb-3">
                        Attachments
                      </label>

                      <div className="rounded-xl bg-neutral-700/50 border border-white/15 p-5 md:p-6 text-white/70">
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="w-full flex flex-col items-center justify-center gap-3 py-8 hover:bg-white/5 rounded-lg transition"
                        >
                          {/* Ícono upload inline (sin dependencia adicional) */}
                          <svg
                            width="28"
                            height="28"
                            viewBox="0 0 24 24"
                            className="opacity-80"
                          >
                            <path
                              fill="currentColor"
                              d="M12 16V8m0 0l-3 3m3-3l3 3M6 20h12a2 2 0 0 0 2-2v-3a1 1 0 1 0-2 0v3H6v-3a1 1 0 1 0-2 0v3a2 2 0 0 0 2 2Z"
                            />
                          </svg>
                          <span className="text-sm text-white/80">
                            Click to attach blueprints, photos, or project requirements
                          </span>
                        </button>

                        <input
                          ref={fileInputRef}
                          type="file"
                          multiple
                          onChange={handleFileChange}
                          className="hidden"
                        />

                        {formData.files.length > 0 && (
                          <div className="mt-4 space-y-2">
                            {formData.files.map((file, idx) => (
                              <div
                                key={`${file.name}-${idx}`}
                                className="flex items-center justify-between bg-white/5 border border-white/10 rounded-md px-3 py-2 text-sm"
                              >
                                <span className="truncate max-w-[16rem]">
                                  {file.name}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => removeFile(idx)}
                                  className="text-red-300 hover:text-red-400"
                                >
                                  Remove
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* SUBMIT */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isSending}
                        className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full hover:bg-white/90 disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        {isSending ? "Sending…" : "SUBMIT TO DB+  →"}
                      </button>
                    </div>

                    {/* SUCCESS */}
                    {enquiryStep === 4 && (
                      <div className="flex items-center gap-3 text-base text-green-400">
                        <CheckCircle />
                        <span>Thank you — your enquiry has been sent.</span>
                      </div>
                    )}
                  </form>
                </section>
              </div>
            </div>
          )}

          {/* ==========================================================
              LISTA DE PROYECTOS (NO ENQUIRY)
             ========================================================== */}
          {!isEnquiry && (
            <div
              className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 transition-all ${
                showGalleryItems ? "opacity-100" : "opacity-0"
              }`}
            >
              {(displayedCategory.projects ?? []).map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onClick={() => onProjectClick(project)}
                  currentSectionName={displayedCategory.name}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SectionView;
``
