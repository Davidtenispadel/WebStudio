import React from "react";
import { Project, StudioSection } from "../types";

interface ProjectCardProps {
  project: Project;
  onClick: (project: Project) => void;
  currentSectionName: StudioSection; // Type safer than string
}

/**
 * Title case for English with common short words kept lowercase (except if first/last).
 * Examples: "house extension in corby" -> "House Extension in Corby"
 */
const toEnglishTitleCase = (title: string): string => {
  if (!title) return "";
  const smallWords = new Set([
    "a", "an", "the",
    "and", "but", "or", "nor",
    "for", "so", "yet",
    "at", "by", "in", "of", "on", "to", "up", "via", "off", "per", "into", "with", "from"
  ]);

  const words = title.trim().split(/\s+/);
  return words
    .map((raw, idx) => {
      const w = raw.toLowerCase();
      const isFirst = idx === 0;
      const isLast = idx === words.length - 1;
      if (!isFirst && !isLast && smallWords.has(w)) return w;
      return w.charAt(0).toUpperCase() + w.slice(1);
    })
    .join(" ");
};

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onClick,
  currentSectionName,
}) => {
  const isStaticVisualSection = currentSectionName === StudioSection.STRUCTURE;

  // Prefer project-specific alt text; fall back gracefully
  const altText =
    project?.alt ||
    project?.title ||
    "Architecture project image";

  // Prefer a local fallback in /public for reliability in production
  const FALLBACK_IMG = "/fallbacks/project-fallback.jpg";

  const handleKeyUp: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick(project);
    }
  };

  return (
    <div
      className="group cursor-pointer mb-16 outline-none"
      onClick={() => onClick(project)}
      role="button"
      tabIndex={0}
      aria-label={project?.title ? `Open project: ${toEnglishTitleCase(project.title)}` : "Open project"}
      onKeyUp={handleKeyUp}
    >
      <div className="project-image-container relative aspect-[4/5] w-full bg-gray-100 overflow-hidden">
        <img
          src={project.imageUrl}
          alt={altText}
          className={`object-cover w-full h-full transition-all ease-in-out ${
            isStaticVisualSection ? "" : "project-card-image-effects"
          }`}
          style={{ transitionDuration: "1400ms" }}
          loading="lazy"
          onError={(e) => {
