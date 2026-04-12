import React, { useEffect, useRef, useState } from "react";
import { CategoryGroup, Project, StudioSection } from "../types";
import ProjectCard from "./ProjectCard";

interface UploadedItem {
  id: string;
  name: string;
  size: number;
  progress: number;
  status: "uploading" | "uploaded" | "error";
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
  // =============================
  // STATE
  // =============================
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

  // =============================
  // SAFE CATEGORY SYNC (FIX CLAVE)
  // =============================
  useEffect(() => {
    if (!category) return;

    setDisplayedCategory(category);

    clearTimers();

    setStage("intro");
    setShowDB(false);
    setShowPlus(false);
    setShowName(false);
    setShowGallery(false);

    const t1 = setTimeout(() => setShowDB(true), 100);
    const t2 = setTimeout(() => setShowPlus(true), 300);
    const t3 = setTimeout(() => setShowName(true), 600);
    const t4 = setTimeout(() => setShowGallery(true), 900);
    const t5 = setTimeout(() => setStage("gallery"), 1100);

    timers.current.push(t1, t2, t3, t4, t5);

    return clearTimers;
  }, [category?.id]);

  useEffect(() => {
    if (!isActive) return;
  }, [isActive]);

  // =============================
  // SAFE PROJECTS (CRITICAL FIX)
  // =============================
  const safeProjects: Project[] = Array.isArray(
    displayedCategory?.projects
  )
    ? displayedCategory.projects
    : [];

  // =============================
  // DETECT SECTIONS (ROBUST)
  // =============================
  const name = displayedCategory?.name || "";

  const isEnquiry = name.toLowerCase().includes("enquiry");
  const isBehindDB = name.toLowerCase().includes("behind");

  // =============================
  // UPLOADER (BASIC SAFE)
  // =============================
  const [items, setItems] = useState<UploadedItem[]>([]);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const uploadFiles = (files: File[]) => {
    const initial = files.map((f) => ({
      id: fileId(f),
      name: f.name,
      size: f.size,
      progress: 0,
      status: "uploading" as const,
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

  // =============================
  // RENDER SAFETY
  // =============================
  if (!displayedCategory) return null;

  return (
    <div
      className={`fixed inset-0 transition-opacity duration-500 ${
        isActive ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      {/* HEADER */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-6 z-40">
        <h1 className={`text-7xl ${showDB ? "opacity-100" : "opacity-0"}`}>
          DB
        </h1>
        <span className={`${showPlus ? "opacity-100" : "opacity-0"}`}>
          +
        </span>
        <span className={`${showName ? "opacity-100" : "opacity-0"}`}>
          {name}
        </span>
      </div>

      {/* CONTENT */}
      <div
        className={`h-full overflow-y-auto pt-40 transition-opacity ${
          showGallery ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* ================= ENQUIRY ================= */}
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
        ) : isBehindDB ? (
          /* ================= BEHIND DB ================= */
          <div className="p-10 text-white max-w-3xl">
            <div
              dangerouslySetInnerHTML={{
                __html: displayedCategory?.description || "",
              }}
            />
          </div>
        ) : (
          /* ================= PROJECTS ================= */
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 p-10">
            {safeProjects.length > 0 ? (
              safeProjects.map((p) => (
                <ProjectCard
                  key={p.id}
                  project={p}
                  onClick={onProjectClick}
                  currentSectionName={name}
                />
              ))
            ) : (
              <div className="text-white opacity-40">
                No projects found in this category
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SectionView;
