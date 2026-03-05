// =====================
// SECTIONVIEW COMPLETO — DB+
// Con arreglo definitivo del formulario ENQUIRY
// =====================

import React, { useState, useEffect, useRef } from 'react';
import { CategoryGroup, Project, StudioSection } from '../types';
import ProjectCard from './ProjectCard';
import {
  ChevronRight,
  CheckCircle,
  Upload,
  Paperclip,
  X as CloseIcon,
  Loader2,
} from 'lucide-react';
import {
  CATEGORIES,
  urbanMasterplanningHeaderDescription,
  isoContent,
} from '../constants';
import { sendProjectEnquiry } from '../services/emailService';

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
  // DB+ ANIMACIONES
  // ==========================
  const [displayedCategory, setDisplayedCategory] =
    useState<CategoryGroup>(category);
  const [showDB, setShowDB] = useState(false);
  const [showPlus, setShowPlus] = useState(false);
  const [showName, setShowName] = useState(false);
  const [showDesc, setShowDesc] = useState(false);
  const [showGalleryItems, setShowGalleryItems] = useState(false);
  const [stage, setStage] = useState<'intro' | 'gallery'>('intro');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const isFirstRender = useRef(true);

  const resetSequence = () => {
    setShowDB(false);
    setShowPlus(false);
    setShowName(false);
    setShowDesc(false);
    setShowGalleryItems(false);
    setStage('intro');
  };

  const startSequence = () => {
    setShowDB(true);
    const t1 = setTimeout(() => setShowPlus(true), 300);
    const t2 = setTimeout(() => setShowName(true), 500);
    const t3 = setTimeout(() => setStage('gallery'), 800);
    const t4 = setTimeout(() => setShowDesc(true), 1100);
    const t5 = setTimeout(() => setShowGalleryItems(true), 1500);
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

  // ==========================
  // ENQUIRY FORM
  // ==========================
  const fileInputRef = useRef<HTMLInputElement>(null);

