// =====================
// SECTIONVIEW COMPLETO
// DB+ 2026 — Versión CORREGIDA
// =====================

import React, { useState, useEffect, useRef } from 'react';
import { CategoryGroup, Project, StudioSection } from '../types';
import ProjectCard from './ProjectCard';
import { ChevronRight, CheckCircle, Upload, Paperclip, X as CloseIcon, Loader2 } from 'lucide-react';
import {
  CATEGORIES,
  urbanMasterplanningHeaderDescription,
  projectSupportHeaderDescription,
  isoContent
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
  currentSectionName
}) => {

  // ==========================
  // ANIMACIONES GENERALES DB+
  // ==========================
  const [displayedCategory, setDisplayedCategory] = useState<CategoryGroup>(category);
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
    const t1 = setTimeout(() => setShowPlus(true), 400);
    const t2 = setTimeout(() => setShowName(true), 700);
    const t3 = setTimeout(() => setStage('gallery'), 1000);
    const t4 = setTimeout(() => setShowDesc(true), 1300);
    const t5 = setTimeout(() => setShowGalleryItems(true), 1600);
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

        setTimeout(() => startSequence(), 100);
      }, 500);

      return () => clearTimeout(tOut);
    }
  }, [category, displayedCategory.id]);

  // ==========================
  //       ENQUIRY FORM
  // ==========================
  const [enquiryStep, setEnquiryStep] = useState(1);
  const [isSending, setIsSending] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    files: [] as File[]
  });

  // Convert file to Base64
  const fileToBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () =>
        resolve((reader.result as string).split(',')[1]); // sin prefijo
      reader.onerror = (err) => reject(err);
    });

  // FILE UPLOAD
