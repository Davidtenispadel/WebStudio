/** SECTIONVIEW.TSX — Unified Version
 * - Aesthetic A applied to all sections (unchanged)
 * - ENQUIRY: Direct form submission with file attachments to PHP endpoint (one.com)
 * - No Netlify dependency; all data sent via multipart/form-data
 * - Sends file attachments together with form fields in one request
 * - IMAGE STYLES FIXED: dark backgrounds, no white borders (DB+ animation unchanged)
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
  File as FileIcon,
} from "lucide-react";

import {
  urbanMasterplanningHeaderDescription,
  isoContent,
} from "../constants";

interface SectionViewProps {
  category: CategoryGroup;
  onProjectClick: (project: Project) => void;
  isActive: boolean;
  currentSectionName: string;
}

// PHP endpoint on one.com – using www to match your site's domain
const ENQUIRY_ENDPOINT = "/api/send-enquiry";

// Format bytes utility
const formatBytes = (bytes: number) => {
  if (!bytes && bytes !== 0) return "";
  const sizes = ["B", "KB", "MB", "GB", "TB"];
  if (bytes === 0) return "0 B";
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  const val = bytes / Math.pow(1024, i);
  return `${val.toFixed(val >= 100 || i === 0 ? 0 : 1)} ${sizes[i]}`;
};

const SectionView: React.FC<SectionViewProps> = ({
  category,
  onProjectClick,
  isActive,
  currentSectionName,
}) => {
  // ============================
  // Aesthetic A Animation State (TIEMPOS ORIGINALES, SIN CAMBIOS)
  // ============================
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

  // ============================
  // ENQUIRY Form State
  // ============================
  const [enquiryStep, setEnquiryStep] = useState(1);
  const [isSending, setIsSending] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  // File handling
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ============================
  // Animation Logic (TIEMPOS ORIGINALES, SIN CAMBIOS)
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

  // Fallback: if showName is still false after 2 seconds, force it
  useEffect(() => {
    if (!isActive || isTransitioning) return;
    const timer = setTimeout(() => {
      if (!showName) {
        setShowName(true);
      }
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

        setTimeout(() => {
          startSequence();
        }, 100);
      }, 500);

      return () => clearTimeout(tOut);
    }
  }, [category, displayedCategory.id]);

  // Force gallery stage in ENQUIRY
  useEffect(() => {
    if (displayedCategory.name === StudioSection.ENQUIRY) {
      setStage("gallery");
    }
  }, [displayedCategory.name]);

  if (!isActive) return null;

  // ============================
  // Section Flags
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

  const scaleTarget =
    typeof window !== "undefined" && window.innerWidth >= 768 ? 0.5 : 0.4;

  // ============================
  // File handlers
  // ============================
  const onSelectFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    if (files.length) {
      setSelectedFiles((prev) => [...prev, ...files]);
    }
    // Reset input to allow re-selecting same files later
    if (e.currentTarget) e.currentTarget.value = "";
  };

  const onDropFiles = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const files = e.dataTransfer?.files ? Array.from(e.dataTransfer.files) : [];
    if (files.length) {
      setSelectedFiles((prev) => [...prev, ...files]);
    }
  };

  const removeFile = (indexToRemove: number) => {
    setSelectedFiles((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const clearAllFiles = () => {
    setSelectedFiles([]);
  };

  // ============================
  // Submit Enquiry (with files)
  // ============================
  const handleEnquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);

    const fd = new FormData();
    fd.append("name", formData.name);
    fd.append("email", formData.email);
    fd.append("message", formData.message);
    selectedFiles.forEach((file) => {
      fd.append("files[]", file);
    });

    try {
      const response = await fetch(ENQUIRY_ENDPOINT, {
        method: "POST",
        body: fd,
      });
      const result = await response.json();

      if (response.ok && result.success) {
        setEnquiryStep(4);
        // Clear form after success
        setTimeout(() => {
          setFormData({ name: "", email: "", message: "" });
          setSelectedFiles([]);
          if (fileInputRef.current) fileInputRef.current.value = "";
        }, 2000);
      } else {
        console.error("Server error:", result.error);
        alert(
          result.error ||
            "An error occurred. Please try again or contact us directly."
        );
      }
    } catch (error) {
      console.error("Network error:", error);
      alert("Network error. Please check your connection and try again.");
    } finally {
      setIsSending(false);
    }
  };

  // ============================
  // RENDER
  // ============================
  return (
    <div
      className={`fixed inset-0 w-full transition-opacity duration-500 ${
        isTransitioning ? "opacity-0" : "opacity-100"
      } bg-transparent`}
    >
      {/* ENQUIRY BACKGROUND */}
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

      {/* HEADER (Aesthetic A) - disappears completely in gallery stage */}
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
            transform:
              stage === "gallery" ? `scale(${scaleTarget})` : "scale(1)",
            transformOrigin: "left",
          }}
        >
          {/* DB+ */}
          <div className="flex items-center gap-3 shrink-0">
            <h2
              className={`text-9xl font-light tracking-tighter transition-all ${
                isEnquiry ? "text-white" : "text-black"
              } ${
                showDB
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-20"
              }`}
              style={{
                fontSize:
                  typeof window !== "undefined" && window.innerWidth >= 768
                    ? "12rem"
                    : "9rem",
                transitionTimingFunction: "cubic-bezier(0.23, 1, 0.32, 1)",
                transitionDuration: "1000ms",
              }}
            >
              DB
            </h2>

            <span
              className={`text-6xl md:text-8xl font-thin transition-all ${
                isEnquiry ? "text-gray-300" : "text-gray-400"
              } ${
                showPlus
                  ? "opacity-100 scale-100 rotate-0"
                  : "opacity-0 scale-0 rotate-45"
              }`}
              style={{ transitionDuration: "700ms" }}
            >
              +
            </span>
          </div>

          {/* Section Names */}
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

        {/* Section Description */}
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
                transform:
                  stage === "gallery" && showDesc
                    ? "translateX(0)"
                    : "translateX(-40px)",
              }}
            >
              {isUrbanSection ? (
                <span className="font-light text-gray-400 leading-tight tracking-tight italic text-sm md:text-base lg:text-lg whitespace-pre-line">
                  {urbanMasterplanningHeaderDescription}
                </span>
              ) : (
                <div
                  className="font-light text-gray-400 leading-tight tracking-tight italic text-sm md:text-base lg:text-lg whitespace-pre-line"
                  dangerouslySetInnerHTML={{
                    __html: displayedCategory.description,
                  }}
                />
              )}
            </div>
          )}
      </div>

      {/* MAIN CONTENT */}
      <div
        className={`h-full w-full overflow-y-auto custom-scroll px-10 pb-48 transition-opacity duration-1000 ${
          stage === "gallery"
            ? "opacity-100"
            : "opacity-0 pointer-events-none"
        }`}
        style={{ paddingTop: "120px" }}
      >
        <div className="max-w-7xl mx-auto">
          {/* ENQUIRY SECTION */}
          {isEnquiry ? (
            <div className="max-w-7xl mx-auto relative z-[50]">
              <div className="relative z-[60]">
                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10">
                  {/* Left Column - Contact Info */}
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

                  {/* Right Column - Form */}
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
                              setFormData({
                                ...formData,
                                name: e.target.value,
                              })
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
                              setFormData({
                                ...formData,
                                email: e.target.value,
                              })
                            }
                            disabled={isSending}
                          />
                        </div>
                      </div>

                      {/* Message */}
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
                            setFormData({
                              ...formData,
                              message: e.target.value,
                            })
                          }
                          disabled={isSending}
                        />
                      </div>

                      {/* Attachments */}
                      <div>
                        <label className="block text-[11px] tracking-[0.25em] text-white/70 uppercase mb-3">
                          Attachments
                        </label>

                        <div
                          className={[
                            "rounded-xl border-2 border-dashed cursor-pointer",
                            dragActive
                              ? "border-red-500 bg-red-500/10"
                              : "border-white/20 bg-neutral-700/40",
                            "p-6 md:p-8 transition-colors",
                          ].join(" ")}
                          onClick={() =>
                            !isSending && fileInputRef.current?.click()
                          }
                          onDragOver={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setDragActive(true);
                          }}
                          onDragLeave={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setDragActive(false);
                          }}
                          onDrop={onDropFiles}
                        >
                          <div className="flex flex-col items-center text-center gap-3 pointer-events-none">
                            <div className="p-3 rounded-full bg-white/10 border border-white/10">
                              <Upload className="w-6 h-6 text-white/80" />
                            </div>

                            <div className="text-sm">
                              <span className="text-white">
                                Drag &amp; drop files here
                              </span>{" "}
                              <span className="text-white/60">or</span>{" "}
                              <span className="text-red-400 underline">
                                click to browse
                              </span>
                            </div>

                            <div className="text-xs text-white/50">
                              Blueprints, PDFs, images… Large files supported.
                            </div>
                          </div>

                          <input
                            ref={fileInputRef}
                            type="file"
                            className="hidden"
                            multiple
                            onChange={onSelectFiles}
                            disabled={isSending}
                          />
                        </div>

                        {/* Selected files list */}
                        {selectedFiles.length > 0 && (
                          <div className="mt-5 space-y-3">
                            {selectedFiles.map((file, idx) => (
                              <div
                                key={idx}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3"
                              >
                                <div className="flex items-start gap-3">
                                  <div className="mt-0.5">
                                    <FileIcon className="w-4 h-4 text-white/70" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2">
                                      <div className="text-sm text-white/90 truncate">
                                        {file.name}
                                      </div>
                                      <div className="text-[11px] text-white/50">
                                        · {formatBytes(file.size)}
                                      </div>
                                    </div>
                                  </div>
                                  <button
                                    type="button"
                                    onClick={() => removeFile(idx)}
                                    className="text-white/40 hover:text-red-400 transition-colors"
                                    title="Remove file"
                                  >
                                    <CloseIcon className="w-4 h-4" />
                                  </button>
                                </div>
                              </div>
                            ))}
                            <div className="flex justify-end">
                              <button
                                type="button"
                                onClick={clearAllFiles}
                                className="text-xs text-white/60 hover:text-white underline"
                              >
                                Clear all
                              </button>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Submit Button */}
                      <button
                        type="submit"
                        disabled={isSending}
                        className="flex items-center gap-6 mt-2 bg-white text-black px-10 py-4 rounded-full shadow-2xl hover:bg-red-600 hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <span className="text-xs font-bold tracking-[0.4em] uppercase">
                          {isSending ? "Sending..." : "Submit to db+"}
                        </span>
                        {isSending ? (
                          <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                          <ChevronRight className="w-5 h-5" />
                        )}
                      </button>

                      {/* Success Feedback */}
                      {enquiryStep >= 4 && (
                        <div className="py-16 flex flex-col items-center text-center space-y-6">
                          <div className="p-5 bg-white rounded-full">
                            <CheckCircle className="w-14 h-14 text-red-600" />
                          </div>
                          <div>
                            <h4 className="text-2xl font-light text-white">
                              Vision Received
                            </h4>
                            <p className="text-white/70 mt-2 leading-tight max-w-md">
                              Your project details and documents have been
                              submitted to{" "}
                              <span className="text-red-400">
                                db@dbsdesigner.com
                              </span>
                              . We will review your vision and contact you
                              shortly.
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
            // BEHIND DB SECTION - IMAGE STYLES FIXED (dark background, no white borders)
            <div
              className={`max-w-6xl mx-auto relative z-10 text-white pt-20 transition-opacity duration-1000 ${
                showGalleryItems ? "opacity-100" : "opacity-0"
              }`}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start w-full">
                <div className="md:col-span-1 p-8 bg-black/40 backdrop-blur-md rounded-2xl border border-white/10 shadow-xl">
                  <div
                    className="text-base md:text-lg lg:text-xl font-light leading-tight text-justify"
                    dangerouslySetInnerHTML={{
                      __html: displayedCategory.description,
                    }}
                  />
                </div>

                <div className="md:col-span-1 w-full overflow-hidden shadow-2xl rounded-2xl border border-white/10">
                  <img
                    src={displayedCategory.imageUrl}
                    alt={displayedCategory.name}
                    className="w-full h-auto object-cover"
                    style={{
                      aspectRatio:
                        typeof window !== "undefined" && window.innerWidth < 768
                          ? "1/1"
                          : "unset",
                    }}
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          ) : (
            // REMAINING SECTIONS - IMAGE STYLES FIXED (dark backgrounds, no white borders)
            <div
              className={`transition-opacity duration-1000 ${
                showGalleryItems ? "opacity-100" : "opacity-0"
              }`}
            >
              {/* Description block for all relevant sections */}
              {(isUrbanSection ||
                isStructureSection ||
                isDesignSection ||
                isProjectSupportSection ||
                isArchitectureSection) && (
                <div
                  className={`flex flex-col gap-12 ${
                    isDesignSection ? "mb-8" : "mb-24"
                  }`}
                >
                  <div className="w-full max-w-5xl p-10 bg-black/40 backdrop-blur-md rounded-2xl border border-white/10 shadow-xl">
                    <div
                      className="text-white font-normal text-lg md:text-xl leading-tight"
                      dangerouslySetInnerHTML={{
                        __html: displayedCategory.description,
                      }}
                    />
                  </div>
                </div>
              )}

              {/* Project Grid */}
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

              {/* Special Blocks */}
              {isDesignSection && (
                <div className="flex flex-col gap-24 mt-32 mb-16 max-w-5xl mx-auto">
                  <div className="p-10 bg-black/40 backdrop-blur-md rounded-2xl border border-white/10 shadow-xl">
                    <div
                      className="text-white leading-tight"
                      dangerouslySetInnerHTML={{ __html: isoContent }}
                    />
                  </div>

                  <div className="w-full overflow-hidden rounded-2xl shadow-2xl border border-white/10">
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
                  <div className="w-full overflow-hidden rounded-2xl shadow-2xl border border-white/10">
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
