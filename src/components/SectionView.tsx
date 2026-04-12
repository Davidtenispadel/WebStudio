import React, { useEffect, useRef, useState } from "react";
import { CategoryGroup, Project } from "../types";
import ProjectCard from "./ProjectCard";

type UploadStatus = "uploading" | "uploaded" | "error";

interface UploadedItem {
  id: string;
  name: string;
  size: number;
  progress: number;
  status: UploadStatus;
  url?: string;
}

interface Props {
  category: CategoryGroup;
  onProjectClick: (project: Project) => void;
  isActive: boolean;
  currentSectionName: string;
}

const UPLOAD_ENDPOINT = "https://dbsdesigner.com/api/upload.php";

const fileId = (f: File) =>
  `${f.name}-${f.size}-${Math.random().toString(36).slice(2)}`;

const SectionView: React.FC<Props> = ({
  category,
  onProjectClick,
  isActive,
}) => {
  // ======================
  // STATE CORE
  // ======================
  const [displayedCategory, setDisplayedCategory] =
    useState<CategoryGroup>(category);

  const [stage, setStage] = useState<"intro" | "gallery">("intro");

  const [showDB, setShowDB] = useState(false);
  const [showPlus, setShowPlus] = useState(false);
  const [showName, setShowName] = useState(false);
  const [showGallery, setShowGallery] = useState(false);

  const timers = useRef<NodeJS.Timeout[]>([]);

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  // ======================
  // ANIMATION SEQUENCE
  // ======================
  const startSequence = () => {
    clearTimers();

    setStage("intro");
    setShowDB(false);
    setShowPlus(false);
    setShowName(false);
    setShowGallery(false);

    timers.current.push(setTimeout(() => setShowDB(true), 100));
    timers.current.push(setTimeout(() => setShowPlus(true), 300));
    timers.current.push(setTimeout(() => setShowName(true), 600));
    timers.current.push(setTimeout(() => setShowGallery(true), 900));
    timers.current.push(setTimeout(() => setStage("gallery"), 1100));
  };

  // ======================
  // INIT
  // ======================
  useEffect(() => {
    if (!isActive) return;
    startSequence();
  }, [isActive]);

  // ======================
  // CATEGORY CHANGE (FIX CRÍTICO)
  // ======================
  useEffect(() => {
    if (!category) return;

    setDisplayedCategory(category);

    const t = setTimeout(() => {
      startSequence();
    }, 50);

    return () => clearTimeout(t);
  }, [category]);

  // ======================
  // SAFE DETECTION (FIX ENQUIRY REAL)
  // ======================
  const categoryName =
    displayedCategory?.name?.toLowerCase().trim() || "";

  const isEnquiry = categoryName === "enquiry";

  // ======================
  // SAFETY GUARD
  // ======================
  const projects = Array.isArray(displayedCategory?.projects)
    ? displayedCategory.projects
    : [];

  if (!displayedCategory) return null;

  // ======================
  // UPLOADER
  // ======================
  const [items, setItems] = useState<UploadedItem[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const uploadFiles = (files: File[]) => {
    const initial = files.map((f) => ({
      id: fileId(f),
      name: f.name,
      size: f.size,
      progress: 0,
      status: "uploading" as UploadStatus,
    }));

    setItems((p) => [...p, ...initial]);

    const xhr = new XMLHttpRequest();
    const fd = new FormData();

    files.forEach((f) => fd.append("files[]", f));

    xhr.upload.onprogress = (e) => {
      if (!e.lengthComputable) return;

      const pct = Math.round((e.loaded / e.total) * 100);

      setItems((prev) =>
        prev.map((it) =>
          initial.some((i) => i.id === it.id)
            ? { ...it, progress: pct }
            : it
        )
      );
    };

    xhr.onload = () => {
      try {
        const res = JSON.parse(xhr.responseText);

        setItems((prev) =>
          prev.map((it) => {
            const match = res.find((r: any) => r.name === it.name);
            if (!match) return it;
            return { ...it, status: "uploaded", url: match.url };
          })
        );
      } catch {
        console.error("upload error");
      }
    };

    xhr.open("POST", UPLOAD_ENDPOINT);
    xhr.send(fd);
  };

  // ======================
  // RENDER
  // ======================
  return (
    <div
      className={`fixed inset-0 transition-opacity duration-500 ${
        isActive ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      {/* HEADER */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-8 z-40">
        <h1 className={`${showDB ? "opacity-100" : "opacity-0"}`}>DB</h1>
        <span className={`${showPlus ? "opacity-100" : "opacity-0"}`}>+</span>
        <span className={`${showName ? "opacity-100" : "opacity-0"}`}>
          {displayedCategory?.name}
        </span>
      </div>

      {/* CONTENT */}
      <div
        className={`h-full overflow-y-auto pt-40 transition-opacity ${
          showGallery ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* ENQUIRY FIXED */}
        {isEnquiry ? (
          <div className="p-10 text-white">
            <h2 className="text-3xl mb-6">Enquiry</h2>

            <div
              className="border p-10 cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              Upload files
            </div>

            <input
              ref={fileInputRef}
              type="file"
              multiple
              hidden
              onChange={(e) =>
                uploadFiles(Array.from(e.target.files || []))
              }
            />

            <div className="mt-4 space-y-2">
              {items.map((it) => (
                <div key={it.id} className="text-sm text-white">
                  {it.name} — {it.progress}%
                </div>
              ))}
            </div>
          </div>
        ) : (
          // PROJECTS FIXED
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 p-10">
            {projects.length ? (
              projects.map((p) => (
                <ProjectCard
                  key={p.id}
                  project={p}
                  onClick={onProjectClick}
                  currentSectionName={displayedCategory.name}
                />
              ))
            ) : (
              <div className="text-white opacity-50">
                No projects in this section
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SectionView;
