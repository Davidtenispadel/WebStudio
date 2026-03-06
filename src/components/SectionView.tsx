/*  SECTIONVIEW.TSX — VERSION COMPLETA + FORMULARIO INTEGRADO + FIX ENQUIRY  */

import React, { useState, useEffect, useRef } from "react";
import { CategoryGroup, Project, StudioSection } from "../types";
import ProjectCard from "./ProjectCard";
import {
  ChevronRight,
  CheckCircle,
  Upload,
  Paperclip,
  X as CloseIcon,
  Loader2,
} from "lucide-react";
import {
  CATEGORIES,
  urbanMasterplanningHeaderDescription,
  isoContent,
} from "../constants";
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
  // ANIMACIONES DB+
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
