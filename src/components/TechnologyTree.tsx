import React, { useState } from 'react';

interface TreeNode {
  id: string;
  name: string;
  slug: string;
  children?: TreeNode[];
}

const technologyData: TreeNode = {
  id: 'technology',
  name: '🌿 Technology Hub',
  slug: 'technology',
  children: [
    {
      id: 'green-energy',
      name: '⚡ Green Energy',
      slug: 'technology/green-energy',
      children: [
        { id: 'solar', name: '☀️ Solar PV + Thermal', slug: 'technology/green-energy/solar' },
        { id: 'wind', name: '💨 Wind (onshore & domestic)', slug: 'technology/green-energy/wind' },
        { id: 'geothermal', name: '🌡️ Geothermal / Heat Pumps', slug: 'technology/green-energy/geothermal' },
        { id: 'biomass', name: '🌿 Biomass & Biogas', slug: 'technology/green-energy/biomass' },
        { id: 'hydro', name: '💧 Hydropower', slug: 'technology/green-energy/hydro' },
        { id: 'storage', name: '🔋 Battery storage', slug: 'technology/green-energy/storage' },
      ]
    },
    {
      id: 'materials',
      name: '🧱 Materials & Insulation',
      slug: 'technology/materials',
      children: [
        { id: 'natural-ins', name: '🌾 Natural insulation', slug: 'technology/materials/natural-insulation' },
        { id: 'synthetic-ins', name: '🧪 Synthetic insulation', slug: 'technology/materials/synthetic-insulation' },
        { id: 'timber', name: '🪵 Timber & CLT', slug: 'technology/materials/timber' },
        { id: 'recycled', name: '♻️ Recycled materials', slug: 'technology/materials/recycled' },
      ]
    },
    {
      id: 'hvac',
      name: '🔥 HVAC Systems',
      slug: 'technology/hvac',
      children: [
        { id: 'heat-pumps', name: 'Heat pumps (air/ground)', slug: 'technology/hvac/heat-pumps' },
        { id: 'ventilation', name: 'MVHR / VMC', slug: 'technology/hvac/ventilation' },
        { id: 'radiant', name: 'Radiant floor / ceiling', slug: 'technology/hvac/radiant' },
        { id: 'ac', name: 'Efficient AC (SEER)', slug: 'technology/hvac/ac' },
      ]
    },
    {
      id: 'structural',
      name: '📐 Structural Systems',
      slug: 'technology/structural',
      children: [
        { id: 'timber-frame', name: 'Timber frame / CLT', slug: 'technology/structural/timber-frame' },
        { id: 'mixed', name: 'Mixed (steel+timber)', slug: 'technology/structural/mixed' },
        { id: 'prefab', name: 'Prefabricated systems', slug: 'technology/structural/prefab' },
      ]
    },
    {
      id: 'smart-home',
      name: '🏠 Smart Home',
      slug: 'technology/smart-home',
      children: [
        { id: 'automation', name: 'Lighting & blinds', slug: 'technology/smart-home/automation' },
        { id: 'security', name: 'Security & access', slug: 'technology/smart-home/security' },
        { id: 'energy-mgmt', name: 'Energy management', slug: 'technology/smart-home/energy-mgmt' },
      ]
    },
    {
      id: 'digital-twin',
      name: '🖥️ Digital Twin & BIM',
      slug: 'technology/digital-twin',
      children: [
        { id: 'bim', name: 'BIM (ISO 19650)', slug: 'technology/digital-twin/bim' },
        { id: 'iot', name: 'IoT sensors', slug: 'technology/digital-twin/iot' },
        { id: 'ai-ml', name: 'AI / ML optimisation', slug: 'technology/digital-twin/ai-ml' },
      ]
    },
  ]
};

const TechnologyTreeModern: React.FC<{ onNavigate?: (slug: string) => void }> = ({ onNavigate }) => {
  const [expanded, setExpanded] = useState<Set<string>>(new Set(['technology']));

  const toggle = (id: string) => {
    setExpanded(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) newSet.delete(id);
      else newSet.add(id);
      return newSet;
    });
  };

  const renderBranch = (node: TreeNode, level = 0) => {
    const hasChildren = !!(node.children && node.children.length);
    const isExpanded = expanded.has(node.id);
    const bgColor = level === 0 ? 'bg-gradient-to-r from-indigo-50 to-white' : 'bg-white';
    const borderStyle = level === 0 ? 'border-2 border-indigo-200 shadow-lg' : 'border border-gray-200 shadow-md';

    return (
      <div key={node.id} className="mb-4 relative">
        {/* Nodo */}
        <div
          className={`${bgColor} ${borderStyle} rounded-xl p-3 transition-all hover:shadow-xl cursor-pointer flex items-center justify-between`}
          style={{ marginLeft: `${level * 24}px` }}
        >
          <div className="flex items-center gap-2">
            {hasChildren && (
              <button
                onClick={(e) => { e.stopPropagation(); toggle(node.id); }}
                className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-300"
              >
                {isExpanded ? '−' : '+'}
              </button>
            )}
            <span
              onClick={() => onNavigate && onNavigate(node.slug)}
              className="text-base md:text-lg font-medium text-gray-800 hover:text-indigo-600 transition-colors"
            >
              {node.name}
            </span>
          </div>
          {hasChildren && (
            <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-full">
              {node.children?.length}
            </span>
          )}
        </div>

        {/* Hijos (sub‑ramas) */}
        {hasChildren && isExpanded && (
          <div className="ml-8 mt-2 pl-4 border-l-2 border-indigo-200">
            {node.children!.map(child => renderBranch(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto my-8">
      <h3 className="text-2xl font-light mb-6 text-center text-gray-700">🌳 Technology Knowledge Tree</h3>
      <div className="bg-gray-50/80 rounded-2xl p-6 backdrop-blur-sm">
        {renderBranch(technologyData)}
      </div>
      <p className="text-center text-xs text-gray-400 mt-4">
        Click on any topic to explore – more branches will grow over time.
      </p>
    </div>
  );
};

export default TechnologyTreeModern;
