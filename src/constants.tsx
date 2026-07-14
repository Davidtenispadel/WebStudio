/*
 * SECTIONVIEW.TSX — versión integrada con Home Insight optimizado
 */

import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CategoryGroup, Project, StudioSection } from "../types";
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
import ProjectJourney from "./ProjectJourney";
import SolarPanelsPage from './components/SolarPanelsPage';

// ✅ NUEVO TEXTO OPTIMIZADO
const homeInsightDescription = `
<p><strong>Make better decisions for your home</strong></p>

<p>Improving a home today is not just about design. It is about understanding how energy, materials and systems work together — and knowing where to invest your time and budget.</p>

<p>Most homeowners make decisions without clear data. That leads to unnecessary costs, inefficient solutions and missed opportunities.</p>

<p>In this space, we help you change that.</p>

<p>Here you will find practical tools and clear guidance to understand your home, evaluate different options and identify what really makes a difference — from solar potential and energy consumption to system efficiency and long-term value.</p>

<p>Each tool provides a simplified estimation designed to give you clarity.</p>

<p><strong>This is your starting point, not the full picture.</strong></p>

<p>For a complete analysis tailored to your specific home, conditions and budget, we guide you through a more detailed process.</p>

<p>Explore, learn and take the first step towards a smarter, more efficient home.</p>
`;

// ============================
// NODOS HOME INSIGHT
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

const homeInsightRootNodes: TechNode[] = [
  {
    id: "green-energy",
    title: "Green Energy",
    imageUrl: "https://res.cloudinary.com/dwealmbfi/image/upload/v1780075454/Greenenergy_lxlahz.png",
    children: [
      {
        id: "solar-panels",
        title: "Solar Panels",
        imageUrl: "https://res.cloudinary.com/dwealmbfi/image/upload/v1780076711/66681c59-9afc-41e2-be6f-ef0f5d5af64d.png",
        articleComponent: <SolarPanelsPage />,
      },
    ],
  },
];

// ============================

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
  const navigate = useNavigate();

  const [displayedCategory, setDisplayedCategory] =
    useState<CategoryGroup>(category);

  const [currentTechNodes, setCurrentTechNodes] =
    useState<TechNode[]>(homeInsightRootNodes);

  const [techHistory, setTechHistory] = useState<TechNode[][]>([]);
  const [activeArticle, setActiveArticle] =
    useState<React.ReactNode | null>(null);

  useEffect(() => {
    setDisplayedCategory(category);
  }, [category]);

  if (!isActive) return null;

  const isHomeInsight = displayedCategory.name === "Home Insight";

  const handleTechNodeClick = (node: TechNode) => {
    if (node.articleComponent) {
      setActiveArticle(node.articleComponent);
      setTechHistory([...techHistory, currentTechNodes]);
      setCurrentTechNodes([]);
    } else if (node.children) {
      setTechHistory([...techHistory, currentTechNodes]);
      setCurrentTechNodes(node.children);
    }
  };

  const handleBack = () => {
    if (techHistory.length > 0) {
      const prev = techHistory[techHistory.length - 1];
      setCurrentTechNodes(prev);
      setTechHistory(techHistory.slice(0, -1));
      setActiveArticle(null);
    }
  };

  return (
    <div className="w-full h-full overflow-y-auto">

      {/* HOME INSIGHT */}
      {isHomeInsight && (
        <div className="max-w-7xl mx-auto py-12">

          {/* ✅ TEXTO MEJORADO */}
          <div
            className="text-black text-lg md:text-xl px-6 mb-10 leading-relaxed"
            dangerouslySetInnerHTML={{
              __html: homeInsightDescription,
            }}
          />

          <div className="px-6">

            {(techHistory.length > 0 || activeArticle) && (
              <button
                onClick={handleBack}
                className="flex items-center gap-2 text-red-600 mb-6"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>
            )}

            {activeArticle ? (
              <div>{activeArticle}</div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {currentTechNodes.map((node) => (
                  <div
                    key={node.id}
                    onClick={() => handleTechNodeClick(node)}
                    className="cursor-pointer group"
                  >
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                      <div className="p-6 flex justify-center items-center">
                        <img
                          src={node.imageUrl}
                          className="h-48 object-contain group-hover:scale-110 transition"
                        />
                      </div>
                      <div className="text-center p-4">
                        <h4 className="text-lg">{node.title}</h4>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>
        </div>
      )}

      {/* RESTO DE SECCIONES */}
      {!isHomeInsight && (
        <div className="max-w-7xl mx-auto px-6 py-12">

          <div
            dangerouslySetInnerHTML={{
              __html: displayedCategory.description,
            }}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-10">
            {displayedCategory.projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onClick={onProjectClick}
                currentSectionName={currentSectionName}
              />
            ))}
          </div>

        </div>
      )}
    </div>
  );
};

export default SectionView;
