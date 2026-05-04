import React, { useState } from 'react';
import ThreeScene from './ThreeScene';
import PanelInfo from './PanelInfo';
import { PANEL_TYPES, calculateUsableDimensions, calculatePanelLayout, Obstacle } from '../utils/solarCalculator';

const SolarPanelCalculator: React.FC = () => {
  const [roofLength, setRoofLength] = useState(8);
  const [roofWidth, setRoofWidth] = useState(5);
  const [panelType, setPanelType] = useState<'monocrystalline' | 'polycrystalline'>('monocrystalline');
  const [obstacles, setObstacles] = useState<Obstacle[]>([]);
  const [layout, setLayout] = useState<{ totalPanels: number; cols: number; rows: number; panelPositions: { x: number; z: number }[] } | null>(null);

  const handleCalculate = () => {
    const panel = PANEL_TYPES[panelType];
    const { length, width } = calculateUsableDimensions(roofLength, roofWidth, obstacles);
    const calculatedLayout = calculatePanelLayout(length, width, panel.width, panel.height, obstacles);
    setLayout(calculatedLayout);
  };

  const addObstacle = () => {
    setObstacles([...obstacles, { x: 1.5, z: 2.0 }]);
  };

  const removeObstacle = (index: number) => {
    setObstacles(obstacles.filter((_, i) => i !== index));
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-3xl font-light mb-6">Solar Panel Layout Designer</h2>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <div className="mb-4">
            <label className="block font-medium">Roof length (m):</label>
            <input type="number" step="0.5" value={roofLength} onChange={(e) => setRoofLength(parseFloat(e.target.value))} className="border p-2 rounded w-full" />
          </div>
          <div className="mb-4">
            <label className="block font-medium">Roof width (m):</label>
            <input type="number" step="0.5" value={roofWidth} onChange={(e) => setRoofWidth(parseFloat(e.target.value))} className="border p-2 rounded w-full" />
          </div>
          <div className="mb-4">
            <label className="block font-medium">Panel type:</label>
            <select value={panelType} onChange={(e) => setPanelType(e.target.value as any)} className="border p-2 rounded w-full">
              <option value="monocrystalline">Monocristalino (TOPCon)</option>
              <option value="polycrystalline">Policristalino (PERC)</option>
            </select>
          </div>
          <div className="mb-4">
            <button onClick={addObstacle} className="bg-gray-500 text-white px-4 py-2 rounded mr-2">Add chimney</button>
            {obstacles.map((_, idx) => (
              <button key={idx} onClick={() => removeObstacle(idx)} className="bg-red-500 text-white px-2 py-1 rounded text-sm ml-1">Remove {idx+1}</button>
            ))}
          </div>
          <button onClick={handleCalculate} className="bg-red-600 text-white px-6 py-2 rounded-full hover:bg-red-700 transition">Calculate layout</button>
          {layout && (
            <div className="mt-6 p-4 bg-gray-100 rounded-lg">
              <p><strong>Total panels:</strong> {layout.totalPanels}</p>
              <p><strong>Columns:</strong> {layout.cols} &nbsp;| <strong>Rows:</strong> {layout.rows}</p>
              <p><strong>Estimated power:</strong> {(layout.totalPanels * PANEL_TYPES[panelType].powerWp).toFixed(0)} Wp</p>
              <p><strong>Installation area:</strong> {(layout.totalPanels * PANEL_TYPES[panelType].width * PANEL_TYPES[panelType].height).toFixed(1)} m²</p>
              <p className="text-xs text-gray-500 mt-2">* Margins: 400mm edges, 20mm gap. UK MCS compliant.</p>
            </div>
          )}
        </div>
        <PanelInfo panelType={panelType} />
      </div>
      {layout && layout.panelPositions.length > 0 && (
        <ThreeScene roofLength={roofLength} roofWidth={roofWidth} layout={layout} panelType={panelType} obstacles={obstacles} />
      )}
    </div>
  );
};

export default SolarPanelCalculator;
