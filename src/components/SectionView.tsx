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
  const [displayedCategory, setDisplayedCategory] = useState(category);

  const [stage, setStage] = useState<"intro" | "gallery">("intro");

  const [showDB, setShowDB] = useState(false);
  const [showPlus, setShowPlus] = useState(false);
  const [showName, setShowName] = useState(false);
  const [showGallery, setShowGallery] = useState(false);

  const timers = useRef<any[]>([]);

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  const startSequence = () => {
    clearTimers();

    setShowDB(true);

    timers.current.push(setTimeout(() => setShowPlus(true), 300));
    timers.current.push(setTimeout(() => setShowName(true), 600));
    timers.current.push(setTimeout(() => setShowGallery(true), 1200));
    timers.current.push(setTimeout(() => setStage("gallery"), 1600));
  };

  useEffect(() => {
    if (!isActive) return;

    startSequence();

    return clearTimers;
  }, [isActive]);

  useEffect(() => {
    if (!displayedCategory || category.id !== displayedCategory.id) {
      clearTimers();

      setStage("intro");
      setShowDB(false);
      setShowPlus(false);
      setShowName(false);
      setShowGallery(false);

      setTimeout(() => {
        setDisplayedCategory(category);
        startSequence();
      }, 100);
    }
  }, [category]);

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

    setItems((prev) => [...prev, ...initial]);

    const xhr = new XMLHttpRequest();
    const fd = new FormData();

    files.forEach((f) => fd.append("files[]", f));

    xhr.upload.onprogress = (e) => {
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
        console.error("Upload error");
      }
    };

    xhr.open("POST", UPLOAD_ENDPOINT);
    xhr.send(fd);
  };

  // ======================
  // RENDER
  // ======================

  const isEnquiry = displayedCategory.name === StudioSection.ENQUIRY;

  return (
    <div
      className={`fixed inset-0 transition-opacity duration-500 ${
        isActive
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
    >
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
            showName ? "opacity-100" : "opacity-0 translate-x-10"
          }`}
        >
          {displayedCategory.name}
        </span>
      </div>

      {/* CONTENT */}
      <div
        className={`h-full overflow-y-auto pt-40 transition-all ${
          showGallery ? "opacity-100" : "opacity-0"
        }`}
      >
        {isEnquiry ? (
          <div className="p-10 text-white">
            <h2 className="text-3xl mb-6">Send files</h2>

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
              className="hidden"
              onChange={(e) =>
                uploadFiles(Array.from(e.target.files || []))
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
          <div className="grid grid-cols-3 gap-10 p-10">
            {displayedCategory.projects.map((p) => (
              <ProjectCard
                key={p.id}
                project={p}
                onClick={onProjectClick}
                currentSectionName={displayedCategory.name}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SectionView;
