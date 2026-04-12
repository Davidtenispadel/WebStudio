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

import { sendProjectEnquiry } from "../services/emailService";

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
  // =========================
  // SAFE CATEGORY (CRITICAL FIX)
  // =========================
  const safeCategory = category || {
    id: "fallback",
    name: "",
    projects: [],
  };

  const [displayedCategory, setDisplayedCategory] =
    useState<CategoryGroup>(safeCategory);

  // =========================
  // ANIMATION STATE (SIMPLIFIED)
  // =========================
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

  const startSequence = () => {
    clearTimers();

    setShowDB(true);

    timers.current.push(setTimeout(() => setShowPlus(true), 250));
    timers.current.push(setTimeout(() => setShowName(true), 500));
    timers.current.push(setTimeout(() => setShowGallery(true), 900));
    timers.current.push(setTimeout(() => setStage("gallery"), 1200));
  };

  // =========================
  // INIT / ACTIVATE
  // =========================
  useEffect(() => {
    if (!isActive) return;

    setStage("intro");
    startSequence();

    return clearTimers;
  }, [isActive]);

  // =========================
  // CATEGORY CHANGE SAFE RESET
  // =========================
  useEffect(() => {
    if (!category) return;

    if (category.id !== displayedCategory.id) {
      clearTimers();

      setStage("intro");
      setShowDB(false);
      setShowPlus(false);
      setShowName(false);
      setShowGallery(false);

      const t = setTimeout(() => {
        setDisplayedCategory(category);
        startSequence();
      }, 100);

      return () => clearTimeout(t);
    }
  }, [category]);

  // =========================
  // UPLOADER
  // =========================
  const [items, setItems] = useState<UploadedItem[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const uploadFiles = (files: File[]) => {
    if (!files?.length) return;

    const initial = files.map((f) => ({
      id: fileId(f),
      name: f.name,
      size: f.size,
      progress: 0,
      status: "uploading" as UploadStatus,
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
          initial.some((i) => i.id === it.id)
            ? { ...it, progress: pct }
            : it
        )
      );
    };

    xhr.onload = () => {
      try {
        const res = JSON.parse(xhr.responseText || "[]");

        setItems((prev) =>
          prev.map((it) => {
            const match = res.find(
              (r: any) => r?.name === it.name
            );

            if (!match) return it;

            return {
              ...it,
              status: "uploaded",
              progress: 100,
              url: match.url,
            };
          })
        );
      } catch (e) {
        console.error("Upload parse error", e);
      }
    };

    xhr.onerror = () => {
      setItems((prev) =>
        prev.map((it) =>
          initial.some((i) => i.id === it.id)
            ? { ...it, status: "error" }
            : it
        )
      );
    };

    xhr.open("POST", UPLOAD_ENDPOINT);
    xhr.send(fd);
  };

  // =========================
  // SAFETY RENDER GUARD (CRITICAL FIX)
  // =========================
  if (!isActive) {
    return (
      <div className="fixed inset-0 opacity-0 pointer-events-none" />
    );
  }

  const isEnquiry =
    displayedCategory?.name === StudioSection.ENQUIRY;

  const projects = displayedCategory?.projects || [];

  // =========================
  // RENDER
  // =========================
  return (
    <div className="fixed inset-0 transition-opacity duration-500 opacity-100">
      {/* HEADER */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 flex items-center gap-10">
        <h1
          className={`text-8xl transition-all ${
            showDB ? "opacity-100" : "opacity-0 translate-y-10"
          }`}
        >
          DB
        </h1>

        <span
          className={`text-6xl transition-all ${
            showPlus ? "opacity-100" : "opacity-0 scale-0"
          }`}
        >
          +
        </span>

        <span
          className={`text-4xl transition-all ${
            showName
              ? "opacity-100"
              : "opacity-0 translate-x-10"
          }`}
        >
          {displayedCategory?.name}
        </span>
      </div>

      {/* CONTENT */}
      <div
        className={`h-full overflow-y-auto pt-40 transition-opacity duration-500 ${
          showGallery ? "opacity-100" : "opacity-100"
        }`}
      >
        {/* ENQUIRY */}
        {isEnquiry ? (
          <div className="p-10 text-white">
            <h2 className="text-3xl mb-6">Send files</h2>

            <div
              className="border p-10 cursor-pointer"
              onClick={() =>
                fileInputRef.current?.click()
              }
            >
              Upload files
            </div>

            <input
              ref={fileInputRef}
              type="file"
              multiple
              className="hidden"
              onChange={(e) =>
                uploadFiles(
                  Array.from(e.target.files || [])
                )
              }
            />

            <div className="mt-6 space-y-2">
              {items.map((it) => (
                <div key={it.id} className="text-sm">
                  {it.name} — {it.progress}%
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 p-10">
            {projects.length > 0 ? (
              projects.map((p) => (
                <ProjectCard
                  key={p.id}
                  project={p}
                  onClick={onProjectClick}
                  currentSectionName={
                    displayedCategory.name
                  }
                />
              ))
            ) : (
              <div className="text-white/60">
                No projects available
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SectionView;
