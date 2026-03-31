/* 
 * SECTIONVIEW.TSX — SIN HERO (definitivo)
 * - Hero se renderiza exclusivamente en App.tsx cuando la sección es Architecture.
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

const ENQUIRY_ENDPOINT = "/api/send-enquiry";

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

  const [enquiryStep, setEnquiryStep] = useState(1);
  const [isSending, setIsSending] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
    const t3 = setTimeout(() => setStage("gallery"), 2000);
    const t4 = setTimeout(() => setShowDesc(true), 1300);
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

        setTimeout(() => {
          startSequence();
        }, 100);
      }, 500);

      return () => clearTimeout(tOut);
    }
  }, [category, displayedCategory.id]);

  useEffect(() => {
    if (displayedCategory.name === StudioSection.ENQUIRY) {
      setStage("gallery");
    }
  }, [displayedCategory.name]);

  if (!isActive) return null;

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

  const onSelectFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    if (files.length) setSelectedFiles((prev) => [...prev, ...files]);
    if (e.currentTarget) e.currentTarget.value = "";
  };

  const onDropFiles = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const files = e.dataTransfer?.files
      ? Array.from(e.dataTransfer.files)
      : [];
    if (files.length) setSelectedFiles((prev) => [...prev, ...files]);
  };

  const removeFile = (indexToRemove: number) => {
    setSelectedFiles((prev) =>
      prev.filter((_, idx) => idx !== indexToRemove)
    );
  };

  const clearAllFiles = () => setSelectedFiles([]);

  const handleEnquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);

    const fd = new FormData();
    fd.append("name", formData.name);
    fd.append("email", formData.email);
    fd.append("message", formData.message);
    selectedFiles.forEach((file) => fd.append("files[]", file));

    try {
      const response = await fetch(ENQUIRY_ENDPOINT, {
        method: "POST",
        body: fd,
      });
      const result = await response.json();

      if (response.ok && result.success) {
        setEnquiryStep(4);
        setTimeout(() => {
          setFormData({ name: "", email: "", message: "" });
          setSelectedFiles([]);
          if (fileInputRef.current) fileInputRef.current.value = "";
        }, 2000);
      } else {
        alert(result.error || "Server error.");
      }
    } catch {
      alert("Network error.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div
      className={`fixed inset-0 w-full transition-opacity duration-500 ${
        isTransitioning ? "opacity-0" : "opacity-100"
      } bg-transparent`}
    >
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

      <div className="fixed top-8 left-0 right-0 z-30 pointer-events-none flex justify-between items-start px-8 md:px-12">
        <div className="pointer-events-auto flex items-center gap-1">
          {showDB && (
            <span
              className={`text-5xl md:text-7xl font-black tracking-tighter transition-all duration-700 ${
                isEnquiry ? "text-white" : "text-black"
              }`}
            >
              DB
            </span>
          )}
          {showPlus && (
            <span
              className={`text-5xl md:text-7xl font-black transition-all duration-700 ${
                isEnquiry ? "text-white" : "text-black"
              }`}
            >
              +
            </span>
          )}
          {showName && (
            <div className="ml-3 overflow-hidden">
              <div
                className={`text-sm uppercase tracking-wider font-medium transition-all duration-700 ${
                  isEnquiry ? "text-white/80" : "text-black/80"
                }`}
              >
                Architecture Practice
              </div>
            </div>
          )}
        </div>
      </div>

      <div
        className={`h-full w-full overflow-y-auto custom-scroll px-10 pb-48 transition-opacity duration-1000 ${
          stage === "gallery"
            ? "opacity-100"
            : "opacity-0 pointer-events-none"
        }`}
        style={{ paddingTop: "120px" }}
      >
        <div className="max-w-7xl mx-auto">
          {isArchitectureSection ? (
            <div className="w-full">
              <div
                className={`max-w-6xl mx-auto relative z-10 text-black pt-20 transition-opacity duration-1000 ${
                  showGalleryItems ? "opacity-100" : "opacity-0"
                }`}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start w-full">
                  <div className="md:col-span-1 p-8 bg-white/50 backdrop-blur-md rounded-2xl border border-white/60 shadow-xl">
                    <div
                      className="text-base md:text-lg lg:text-xl font-light leading-tight text-justify"
                      dangerouslySetInnerHTML={{
                        __html: displayedCategory.description,
                      }}
                    />
                  </div>
                  <div className="md:col-span-1 w-full overflow-hidden shadow-2xl rounded-2xl border border-white/20">
                    <img
                      src={displayedCategory.imageUrl}
                      alt={displayedCategory.name}
                      className="w-full h-auto object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>
              {!(isEnquiry || isBehindDBSection) && (
                <div
                  className={`max-w-6xl mx-auto relative z-10 text-black pt-20 transition-opacity duration-1000 ${
                    showGalleryItems ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start w-full">
                    <div className="md:col-span-1 p-8 bg-white/50 backdrop-blur-md rounded-2xl border border-white/60 shadow-xl">
                      <div
                        className="text-base md:text-lg lg:text-xl font-light leading-tight text-justify"
                        dangerouslySetInnerHTML={{
                          __html: displayedCategory.description,
                        }}
                      />
                    </div>
                    <div className="md:col-span-1 w-full overflow-hidden shadow-2xl rounded-2xl border border-white/20">
                      <img
                        src={displayedCategory.imageUrl}
                        alt={displayedCategory.name}
                        className="w-full h-auto object-cover"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </div>
              )}

              {!isArchitectureSection && !isEnquiry && !isBehindDBSection && (
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

              {isDesignSection && (
                <div className="flex flex-col gap-24 mt-32 mb-16 max-w-5xl mx-auto">
                  <div className="p-10 bg-white/60 backdrop-blur-md rounded-2xl border border-white/50 shadow-xl">
                    <div
                      className="text-black leading-tight"
                      dangerouslySetInnerHTML={{ __html: isoContent }}
                    />
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

              {isEnquiry && (
                <div className="max-w-2xl mx-auto relative z-30 py-12">
                  <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-2xl">
                    {enquiryStep === 1 && (
                      <div className="text-center">
                        <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
                          Let's talk about your project
                        </h2>
                        <p className="text-gray-700 mb-8">
                          Share your ideas and we'll get back to you shortly.
                        </p>
                        <button
                          onClick={() => setEnquiryStep(2)}
                          className="bg-black text-white px-8 py-3 rounded-full font-medium hover:bg-gray-800 transition"
                        >
                          Start your enquiry
                        </button>
                      </div>
                    )}

                    {enquiryStep === 2 && (
                      <form onSubmit={handleEnquirySubmit} className="space-y-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Name *
                          </label>
                          <input
                            type="text"
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                            value={formData.name}
                            onChange={(e) =>
                              setFormData({ ...formData, name: e.target.value })
                            }
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email *
                          </label>
                          <input
                            type="email"
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                            value={formData.email}
                            onChange={(e) =>
                              setFormData({ ...formData, email: e.target.value })
                            }
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Message *
                          </label>
                          <textarea
                            rows={4}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                            value={formData.message}
                            onChange={(e) =>
                              setFormData({ ...formData, message: e.target.value })
                            }
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Attachments (optional)
                          </label>
                          <div
                            className={`border-2 border-dashed rounded-lg p-6 text-center transition ${
                              dragActive
                                ? "border-black bg-gray-100"
                                : "border-gray-300"
                            }`}
                            onDragOver={(e) => {
                              e.preventDefault();
                              setDragActive(true);
                            }}
                            onDragLeave={() => setDragActive(false)}
                            onDrop={onDropFiles}
                          >
                            <Upload className="mx-auto h-10 w-10 text-gray-400 mb-2" />
                            <p className="text-sm text-gray-600">
                              Drag & drop files here, or{" "}
                              <button
                                type="button"
                                className="text-black underline"
                                onClick={() => fileInputRef.current?.click()}
                              >
                                browse
                              </button>
                            </p>
                            <input
                              ref={fileInputRef}
                              type="file"
                              multiple
                              className="hidden"
                              onChange={onSelectFiles}
                            />
                          </div>
                          {selectedFiles.length > 0 && (
                            <div className="mt-4 space-y-2">
                              {selectedFiles.map((file, idx) => (
                                <div
                                  key={idx}
                                  className="flex items-center justify-between bg-gray-50 p-2 rounded"
                                >
                                  <div className="flex items-center gap-2">
                                    <FileIcon className="h-4 w-4 text-gray-500" />
                                    <span className="text-sm truncate max-w-[200px]">
                                      {file.name}
                                    </span>
                                    <span className="text-xs text-gray-400">
                                      ({formatBytes(file.size)})
                                    </span>
                                  </div>
                                  <button
                                    type="button"
                                    onClick={() => removeFile(idx)}
                                    className="text-red-500 hover:text-red-700"
                                  >
                                    <CloseIcon className="h-4 w-4" />
                                  </button>
                                </div>
                              ))}
                              {selectedFiles.length > 1 && (
                                <button
                                  type="button"
                                  onClick={clearAllFiles}
                                  className="text-xs text-red-500 hover:text-red-700"
                                >
                                  Clear all
                                </button>
                              )}
                            </div>
                          )}
                        </div>

                        <div className="flex gap-4">
                          <button
                            type="button"
                            onClick={() => setEnquiryStep(1)}
                            className="px-6 py-2 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-100"
                          >
                            Back
                          </button>
                          <button
                            type="submit"
                            disabled={isSending}
                            className="flex-1 bg-black text-white px-6 py-2 rounded-full font-medium hover:bg-gray-800 disabled:opacity-50"
                          >
                            {isSending ? (
                              <>
                                <Loader2 className="inline animate-spin mr-2 h-4 w-4" />
                                Sending...
                              </>
                            ) : (
                              "Send message"
                            )}
                          </button>
                        </div>
                      </form>
                    )}

                    {enquiryStep === 3 && (
                      <div className="text-center">
                        <Loader2 className="animate-spin h-8 w-8 mx-auto mb-4" />
                        <p className="text-gray-700">Sending your message...</p>
                      </div>
                    )}

                    {enquiryStep === 4 && (
                      <div className="text-center">
                        <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                        <h3 className="text-2xl font-bold mb-2">
                          Message sent!
                        </h3>
                        <p className="text-gray-700">
                          We'll get back to you as soon as possible.
                        </p>
                        <button
                          onClick={() => setEnquiryStep(1)}
                          className="mt-6 bg-black text-white px-6 py-2 rounded-full"
                        >
                          Close
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {isBehindDBSection && (
                <div className="max-w-6xl mx-auto relative z-10 text-black pt-20">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start w-full">
                    <div className="md:col-span-1 p-8 bg-white/50 backdrop-blur-md rounded-2xl border border-white/60 shadow-xl">
                      <div
                        className="text-base md:text-lg lg:text-xl font-light leading-tight text-justify"
                        dangerouslySetInnerHTML={{
                          __html: displayedCategory.description,
                        }}
                      />
                    </div>
                    <div className="md:col-span-1 w-full overflow-hidden shadow-2xl rounded-2xl border border-white/20">
                      <img
                        src={displayedCategory.imageUrl}
                        alt={displayedCategory.name}
                        className="w-full h-auto object-cover"
                        loading="lazy"
                      />
                    </div>
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
