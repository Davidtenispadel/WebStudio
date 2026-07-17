/*
 * SECTIONVIEW.TSX — Versión completa y funcional
 * - Home Insight: Green Energy (Solar panels muestra SolarPanelsPage)
 * - Home Insight: Tools (Solar Panel Layout redirige a /solar-calculator)
 * - Iconos grandes (h-64)
 */

import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  ArrowLeft,
} from "lucide-react";
import {
  urbanMasterplanningHeaderDescription,
  isoContent,
} from "../constants";
import { sendProjectEnquiry } from "../services/emailService";
import ProjectJourney from "./ProjectJourney";
import SolarPanelsPage from "./SolarPanelsPage";

// ============================
// TIPO PARA NODOS DE TECNOLOGÍA
// ============================
type TechNode = {
  id: string;
  title: string;
  imageUrl: string;
  description?: string;
  children?: TechNode[];
  articleComponent?: React.ReactNode;
  externalLink?: string;
};

// Componentes placeholder
const BatteriesPlaceholder: React.FC = () => (
  <div className="p-8 bg-white rounded-2xl shadow-xl">
    <h2 className="text-3xl font-light mb-4">Batteries</h2>
    <p className="text-gray-600">Information about energy storage systems will appear here soon.</p>
  </div>
);

const WindTurbinesPlaceholder: React.FC = () => (
  <div className="p-8 bg-white rounded-2xl shadow-xl">
    <h2 className="text-3xl font-light mb-4">Wind Turbines</h2>
    <p className="text-gray-600">Information about wind energy systems will appear here soon.</p>
  </div>
);

// ============================
// CONFIGURACIÓN DE LOS NODOS DE HOME INSIGHT (iconos grandes)
// ============================
const homeInsightRootNodes: TechNode[] = [
  {
    id: "green-energy",
    title: "Green Energy",
    imageUrl: "https://res.cloudinary.com/dwealmbfi/image/upload/v1780075454/Greenenergy_lxlahz.png",
    description: "Renewable energy systems for homes",
    children: [
      {
        id: "solar-panels",
        title: "Solar Panels",
        imageUrl: "https://res.cloudinary.com/dwealmbfi/image/upload/v1780076711/66681c59-9afc-41e2-be6f-ef0f5d5af64d.png",
        description: "Photovoltaic technology",
        articleComponent: <SolarPanelsPage />,
      },
      {
        id: "batteries",
        title: "Batteries",
        imageUrl: "https://res.cloudinary.com/dwealmbfi/image/upload/v1780078524/bater%C3%ADa_verde_con_ed_a8rxo8.png",
        description: "Energy storage systems",
        articleComponent: <BatteriesPlaceholder />,
      },
      {
        id: "wind-turbines",
        title: "Wind Turbines",
        imageUrl: "https://res.cloudinary.com/dwealmbfi/image/upload/v1780079324/wind_Turbines_oft0q6.png",
        description: "Wind energy generation",
        articleComponent: <WindTurbinesPlaceholder />,
      },
    ],
  },
  {
    id: "tools",
    title: "Tools",
    imageUrl: "https://res.cloudinary.com/dwealmbfi/image/upload/v1780249527/Hero_horizontal_2560_d7r0ik.png",
    description: "Utilities and calculators",
    children: [
      {
        id: "solar-panel-layout",
        title: "Solar Panel Layout",
        imageUrl: "https://res.cloudinary.com/dwealmbfi/image/upload/v1780249738/Icono_minimalista_pa_dufmt7.png",
        description: "Calculate ROI and design your solar array",
        externalLink: "/solar-calculator",
      },
    ],
  },
];

// ============================
// TIPOS Y CONSTANTES PARA EL RESTO DE LA APP
// ============================
type UploadStatus = "uploading" | "uploaded" | "error";
interface UploadedItem {
  id: string;
  name: string;
  size: number;
  type?: string;
  progress: number;
  status: UploadStatus;
  url?: string;
  error?: string;
}
interface SectionViewProps {
  category: CategoryGroup;
  onProjectClick: (project: Project) => void;
  isActive: boolean;
  currentSectionName: string;
  onNavigateToEnquiry?: () => void;
}

const UPLOAD_ENDPOINT = "https://dbsdesigner.com/api/upload.php";
const formatBytes = (bytes: number) => {
  if (!bytes && bytes !== 0) return "";
  const sizes = ["B", "KB", "MB", "GB", "TB"];
  if (bytes === 0) return "0 B";
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  const val = bytes / Math.pow(1024, i);
  return `${val.toFixed(val >= 100 || i === 0 ? 0 : 1)} ${sizes[i]}`;
};
const fileId = (f: File) => `${f.name}-${f.size}-${f.lastModified}-${Math.random().toString(36).slice(2, 8)}`;

const SectionView: React.FC<SectionViewProps> = ({
  category,
  onProjectClick,
  isActive,
  currentSectionName,
  onNavigateToEnquiry,
}) => {
  const navigate = useNavigate();

  // Estados de animación y UI
  const [displayedCategory, setDisplayedCategory] = useState<CategoryGroup>(category);
  const [showDB, setShowDB] = useState(false);
  const [showPlus, setShowPlus] = useState(false);
  const [showName, setShowName] = useState(false);
  const [showDesc, setShowDesc] = useState(false);
  const [showGalleryItems, setShowGalleryItems] = useState(false);
  const [stage, setStage] = useState<"intro" | "gallery">("intro");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const isFirstRender = useRef(true);

  // Estado para el formulario de Enquiry
  const [enquiryStep, setEnquiryStep] = useState(1);
  const [isSending, setIsSending] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [items, setItems] = useState<UploadedItem[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Estados para navegación en Home Insight
  const [currentTechNodes, setCurrentTechNodes] = useState<TechNode[]>(homeInsightRootNodes);
  const [techHistory, setTechHistory] = useState<TechNode[][]>([]);
  const [activeArticle, setActiveArticle] = useState<React.ReactNode | null>(null);

  // ========== ANIMACIONES (Aesthetic A) ==========
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
    const t1 = setTimeout(() => setShowPlus(true), 250);
    const t2 = setTimeout(() => setShowName(true), 450);
    const t3 = setTimeout(() => setStage("gallery"), 1700);
    const t4 = setTimeout(() => setShowDesc(true), 1300);
    const t5 = setTimeout(() => setShowGalleryItems(true), 1500);
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
        setTimeout(() => startSequence(), 100);
      }, 500);
      return () => clearTimeout(tOut);
    }
  }, [category, displayedCategory.id]);

  useEffect(() => {
    if (displayedCategory.name === StudioSection.ENQUIRY) setStage("gallery");
  }, [displayedCategory.name]);

  useEffect(() => {
    if (displayedCategory.name === StudioSection.PROJECT_JOURNEY) {
      setShowGalleryItems(true);
      setStage("gallery");
    }
  }, [displayedCategory.name]);

  // Home Insight: al entrar, reseteamos la navegación
  useEffect(() => {
    if (displayedCategory.name === 'Home Insight') {
      setStage("gallery");
      setShowGalleryItems(true);
      setCurrentTechNodes(homeInsightRootNodes);
      setTechHistory([]);
      setActiveArticle(null);
    }
  }, [displayedCategory.name]);

  useEffect(() => {
    if (displayedCategory.name !== 'Home Insight') {
      setActiveArticle(null);
    }
  }, [displayedCategory.name]);

  if (!isActive) return null;

  const isEnquiry = displayedCategory.name === StudioSection.ENQUIRY;
  const isHomeSection = displayedCategory.name === StudioSection.HOME;
  const isUrbanSection = displayedCategory.name === StudioSection.URBANISM;
  const
