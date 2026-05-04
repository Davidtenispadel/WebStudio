import React, { useState } from 'react';

interface TreeNode {
  id: string;
  name: string;
  slug: string;
  children?: TreeNode[];
}

const technologyData: TreeNode = {
  id: 'technology',
  name: 'Technology',
  slug: 'technology',
  children: [
    {
      id: 'green-energy',
      name: 'Green Energy',
      slug: 'technology/green-energy',
      children: [
        { id: 'solar-panels', name: 'Solar panels', slug: 'technology/green-energy/solar-panels' },
        { id: 'solar', name: 'Solar Energy', slug: 'technology/green-energy/solar' },
        { id: 'wind', name: 'Wind Energy', slug: 'technology/green-energy/wind' },
        { id: 'geothermal', name: 'Geothermal', slug: 'technology/green-energy/geothermal' },
        { id: 'biomass', name: 'Biomass', slug: 'technology/green-energy/biomass' },
      ]
    },
    {
      id: 'materials',
      name: 'Materials & Insulation',
      slug: 'technology/materials',
    },
    {
      id: 'hvac',
      name: 'HVAC Systems',
      slug: 'technology/hvac',
    },
    {
      id: 'structural',
      name: 'Structural Systems',
      slug: 'technology/structural',
    },
    {
      id: 'smart-home',
      name: 'Smart Home',
      slug: 'technology/smart-home',
    },
    {
      id: 'digital-twin',
      name: 'Digital Twin',
      slug: 'technology/digital-twin',
    },
  ]
};

const TechnologyTree: React.FC<{ onNavigate?: (slug: string) => void }> = ({ onNavigate }) => {
  const [expanded, setExpanded] = useState<Set<string>>(new Set(['technology']));

  const toggle = (id: string) => {
    setExpanded(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) newSet.delete(id);
      else newSet.add(id);
      return newSet;
    });
  };

  const renderNode = (node: TreeNode, level = 0) => {
    const hasChildren = !!(node.children && node.children.length);
    const isExpanded = expanded.has(node.id);
    const paddingLeft = level * 20;

    return (
      <div key={node.id} className="mb-1">
        <div
          className="flex items-center py-2 px-2 hover:bg-gray-100 rounded cursor-pointer"
          style={{ paddingLeft: `${paddingLeft + 8}px` }}
        >
          {hasChildren && (
            <button onClick={() => toggle(node.id)} className="w-5 mr-1 text-gray-600">
              {isExpanded ? '▼' : '▶'}
            </button>
          )}
          {!hasChildren && <span className="w-5 mr-1"></span>}
          <span
            onClick={() => onNavigate && onNavigate(node.slug)}
            className="text-base font-medium hover:text-red-600"
          >
            {node.name}
          </span>
        </div>
        {hasChildren && isExpanded && (
          <div className="ml-4 border-l border-gray-200">
            {node.children!.map(child => renderNode(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="text-xl font-semibold mb-3">Content Tree</h3>
      {renderNode(technologyData)}
      <p className="text-xs text-gray-400 mt-3">Click any topic – content will grow here.</p>
    </div>
  );
};

export default TechnologyTree;
