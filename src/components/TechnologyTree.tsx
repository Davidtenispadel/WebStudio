import React, { useState } from 'react';

// Definición de un nodo del árbol
interface TreeNode {
  id: string;
  name: string;
  slug: string;          // para navegación (ej: 'technology/green-energy/solar-panels')
  children?: TreeNode[];
}

// Datos del árbol (estructura completa)
const technologyData: TreeNode = {
  id: 'technology',
  name: 'Technology',
  slug: 'technology',
  children: [
    {
      id: 'green-energy',
      name: '⚡ Green Energy',
      slug: 'technology/green-energy',
      children: [
        {
          id: 'solar-energy',
          name: '☀️ Solar Energy',
          slug: 'technology/green-energy/solar-energy',
          children: [
            { id: 'pv-panels', name: 'Solar PV Panels', slug: 'technology/green-energy/solar-energy/pv-panels' },
            { id: 'solar-thermal', name: 'Solar Thermal', slug: 'technology/green-energy/solar-energy/solar-thermal' },
            { id: 'batteries', name: 'Battery Storage', slug: 'technology/green-energy/solar-energy/batteries' },
          ]
        },
        {
          id: 'wind-energy',
          name: '💨 Wind Energy',
          slug: 'technology/green-energy/wind-energy',
          children: [
            { id: 'onshore-wind', name: 'Onshore Wind', slug: 'technology/green-energy/wind-energy/onshore-wind' },
            { id: 'small-turbines', name: 'Small Turbines (Domestic)', slug: 'technology/green-energy/wind-energy/small-turbines' },
          ]
        },
        {
          id: 'geothermal',
          name: '🌡️ Geothermal',
          slug: 'technology/green-energy/geothermal',
          children: [
            { id: 'heat-pumps', name: 'Heat Pumps', slug: 'technology/green-energy/geothermal/heat-pumps' },
            { id: 'ground-source', name: 'Ground Source', slug: 'technology/green-energy/geothermal/ground-source' },
          ]
        },
        {
          id: 'biomass',
          name: '🌿 Biomass',
          slug: 'technology/green-energy/biomass',
          children: [
            { id: 'wood-pellets', name: 'Wood Pellets', slug: 'technology/green-energy/biomass/wood-pellets' },
            { id: 'biogas', name: 'Biogas', slug: 'technology/green-energy/biomass/biogas' },
          ]
        },
        { id: 'hydro', name: '💧 Hydropower', slug: 'technology/green-energy/hydro' },
      ]
    },
    {
      id: 'materials',
      name: '🧱 Materials & Insulation',
      slug: 'technology/materials',
      children: [
        { id: 'natural-insulation', name: 'Natural Insulation', slug: 'technology/materials/natural-insulation' },
        { id: 'synthetic-insulation', name: 'Synthetic Insulation', slug: 'technology/materials/synthetic-insulation' },
        { id: 'timber', name: 'Timber & CLT', slug: 'technology/materials/timber' },
      ]
    },
    {
      id: 'hvac',
      name: '🔥 HVAC Systems',
      slug: 'technology/hvac',
      children: [
        { id: 'heat-pumps-hvac', name: 'Heat Pumps', slug: 'technology/hvac/heat-pumps' },
        { id: 'ventilation', name: 'VMC / MVHR', slug: 'technology/hvac/ventilation' },
        { id: 'radiant-floor', name: 'Radiant Floor', slug: 'technology/hvac/radiant-floor' },
      ]
    },
    {
      id: 'structural',
      name: '📐 Structural Systems',
      slug: 'technology/structural',
      children: [
        { id: 'timber-struct', name: 'Timber Frame', slug: 'technology/structural/timber-frame' },
        { id: 'mixed-struct', name: 'Mixed Systems', slug: 'technology/structural/mixed-systems' },
      ]
    },
    {
      id: 'smart-home',
      name: '🏠 Smart Home',
      slug: 'technology/smart-home',
      children: [
        { id: 'automation', name: 'Home Automation', slug: 'technology/smart-home/automation' },
        { id: 'security', name: 'Security', slug: 'technology/smart-home/security' },
      ]
    },
    {
      id: 'digital-twin',
      name: '🖥️ Digital Twin',
      slug: 'technology/digital-twin',
      children: [
        { id: 'bim', name: 'BIM', slug: 'technology/digital-twin/bim' },
        { id: 'iot', name: 'IoT Sensors', slug: 'technology/digital-twin/iot' },
      ]
    },
  ]
};

interface TechnologyTreeProps {
  onNavigate: (slug: string) => void;  // función para navegar (puede ser tu onNavClick adaptada)
}

const TechnologyTree: React.FC<TechnologyTreeProps> = ({ onNavigate }) => {
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set(['technology']));

  const toggleNode = (nodeId: string) => {
    setExpandedNodes(prev => {
      const newSet = new Set(prev);
      if (newSet.has(nodeId)) {
        newSet.delete(nodeId);
      } else {
        newSet.add(nodeId);
      }
      return newSet;
    });
  };

  const renderNode = (node: TreeNode, level: number = 0) => {
    const isExpanded = expandedNodes.has(node.id);
    const hasChildren = node.children && node.children.length > 0;
    const paddingLeft = level * 24; // px

    return (
      <div key={node.id} className="mb-1">
        <div
          className="flex items-center py-2 px-3 hover:bg-gray-100 rounded-md cursor-pointer transition-all"
          style={{ paddingLeft: `${paddingLeft + 8}px` }}
        >
          {/* Botón expandir/colapsar (solo si tiene hijos) */}
          {hasChildren && (
            <button
              onClick={(e) => { e.stopPropagation(); toggleNode(node.id); }}
              className="mr-2 w-5 h-5 flex items-center justify-center text-gray-500 hover:text-black"
            >
              {isExpanded ? '▼' : '▶'}
            </button>
          )}
          {!hasChildren && <div className="w-5 mr-2" />}
          
          {/* Nodo (texto clickeable para navegar) */}
          <span
            onClick={() => onNavigate(node.slug)}
            className="text-base md:text-lg font-medium hover:text-red-600 transition-colors"
          >
            {node.name}
          </span>
        </div>

        {/* Hijos (si está expandido) */}
        {hasChildren && isExpanded && (
          <div className="ml-4 border-l-2 border-gray-200">
            {node.children!.map(child => renderNode(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 overflow-x-auto">
      <h3 className="text-2xl font-light mb-4">🌿 Content Tree – Click any topic to explore</h3>
      <div className="max-w-3xl">
        {renderNode(technologyData)}
      </div>
      <p className="text-sm text-gray-500 mt-6 italic">
        ✨ This tree will grow as we add more articles, research papers, and case studies.
      </p>
    </div>
  );
};

export default TechnologyTree;
