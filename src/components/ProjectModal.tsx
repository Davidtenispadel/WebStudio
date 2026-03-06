import React, { useEffect, useState } from "react";
import { Project } from "../types";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  // ⛔️ No mostrar modal cuando no hay proyecto o cuando sea "ENQUIRY"
  if (!project) return null;
  if (project.category === "ENQUIRY") return null;

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageFade, setImageFade] = useState(true);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    setCurrentImageIndex(0);
    setImageFade(true);
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [project]);

  const images = [project.imageUrl, ...(project.additionalImages || [])];

  const handleNextImage = () => {
    setImageFade(false);
    setTimeout(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
      setImageFade(true);
    }, 300);
  };

  const handlePrevImage = () => {
    setImageFade(false);
    setTimeout(() => {
      setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
      setImageFade(true);
    }, 300);
  };

  return (
    <div
