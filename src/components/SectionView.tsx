import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CategoryGroup, Project, StudioSection } from "../types";
import ProjectCard from "./ProjectCard";
import Footer from "./Footer";
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
  Home,
} from "lucide-react";
import {
  urbanMasterplanningHeaderDescription,
  isoContent,
} from "../constants";
import { sendProjectEnquiry } from "../services/emailService";
import ProjectJourney from "./ProjectJourney";
import SolarPanelsPage from "./SolarPanelsPage";
import BatteriesPage from "./BatteriesPage";
import WindTurbinesPage from "./WindTurbinesPage";
import Homeenergymanagement from "./Homeenergymanagement";

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
  icon?: React.ReactNode;
};

// Componentes placeholder

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
        articleComponent: <BatteriesPage />,
      },
      {
        id: "home-energy-management",
        title: "Home Energy Management",
        imageUrl: "",
        description: "Digital Twin, monitoring and intelligent control of home energy",
        icon: <Home size={112} strokeWidth={1.1} className="text-emerald-700" />,
        articleComponent: <Homeenergymanagement />,
      },
      {
        id: "wind-turbines",
        title: "Wind Turbines",
        imageUrl: "https://res.cloudinary.com/dwealmbfi/image/upload/v1780079324/wind_Turbines_oft0q6.png",
        description: "Wind energy generation",
        articleComponent: <WindTurbinesPage />,
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
