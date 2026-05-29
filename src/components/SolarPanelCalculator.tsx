// SolarPanelCalculator.tsx (actualizado)
import React, { useState } from 'react';
import ThreeScene from './ThreeScene';
import PanelInfo from './PanelInfo';
import { PANEL_TYPES, calculateUsableDimensions, calculatePanelLayout, Obstacle } from '../utils/solarCalculator';

// Imágenes para los paneles (las mismas que usaste)
const monoImage = 'https://res.cloudinary.com/dwealmbfi/image/upload/v1779970838/Monocristaline_imbvt7.png';
const polyImage = 'https://res.cloudinary.com/dwealmbfi/image/upload/v1779971127/afbc2e44-892f-4e87-83f4-b19cc739626d.png';

// Tipos de inversor con coste medio (0% VAT)
const inverterOptions = [
  { id: 'string', name: 'String inverter (3.68 kW)', cost: 900 },      // media £600-1200
  { id: 'micro', name: 'Microinverters (per panel)', cost: 1400 },     // estimación
  { id: 'hybrid', name: 'Hybrid inverter (battery ready)', cost: 1600 },
];

// Costes fijos sin IVA (valores medios de los rangos proporcionados)
const fixedCosts = {
  mounting: 450,        // £300-600
  scaffolding: 600,     // £400-800
  electrical: 350,      // £200-500
  labour: 1150,         // £800-1500
  admin: 175,           // £100-250
};

const SolarPanelCalculator: React.FC = () => {
  const [roofLength, setRoofLength] = useState(8);
  const [roofWidth, setRoofWidth] = useState(5);
  const [panelType, setPanelType] = useState<'monocrystalline' | 'polycrystalline'>('monocrystalline');
  const [obstacles, setObstacles] = useState<Obstacle[]>([]);
  const [layout, setLayout] = useState<{ totalPanels: number; cols: number; rows: number; panelPositions: { x: number; z: number }[] } | null>(null);
  const [inverterType, setInverterType] = useState(inverterOptions[0].id);

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

  // Cálculo de coste total (0% VAT)
  const totalCost = layout ? (
    layout.totalPanels * (panelType === 'monocrystalline' ? 45 : 35) +
    (inverterOptions.find(opt => opt.id === inverterType)?.cost || 0) +
    fixedCosts.mounting + fixedCosts.scaffolding + fixedCosts.electrical + fixedCosts.labour + fixedCosts.admin
  ) : 0;

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-3xl font-light mb-2">Solar Panel Layout Designer</h2>
      <p className="text-sm text-gray-600 mb-4">* All prices exclude VAT (0% valid until March 2027)</p>

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
              <option value="monocrystalline">Monocristalino (TOPCon) – £45/panel est.</option>
              <option value="polycrystalline">Policristalino (PERC) – £35/panel est.</option>
            </select>
            <div className="mt-2 flex justify-center">
              <img 
                src={panelType === 'monocrystalline' ? monoImage : polyImage} 
                alt={panelType} 
                className="h-24 w-auto rounded shadow-md"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block font-medium">Inverter type:</label>
            <select value={inverterType} onChange={(e) => setInverterType(e.target.value)} className="border p-2 rounded w-full">
              {inverterOptions.map(opt => (
                <option key={opt.id} value={opt.id}>{opt.name} – £{opt.cost}</option>
              ))}
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

        <div>
          <PanelInfo panelType={panelType} />
          {/* Desglose de costes (se muestra solo si layout calculado) */}
          {layout && (
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h3 className="font-bold text-lg mb-2">💰 Estimated cost breakdown (0% VAT)</h3>
              <ul className="text-sm space-y-1">
                <li>Panels ({layout.totalPanels} × {panelType === 'monocrystalline' ? '£45' : '£35'}): <strong>£{(layout.totalPanels * (panelType === 'monocrystalline' ? 45 : 35)).toFixed(0)}</strong></li>
                <li>Inverter ({inverterOptions.find(opt => opt.id === inverterType)?.name}): <strong>£{inverterOptions.find(opt => opt.id === inverterType)?.cost}</strong></li>
                <li>Mounting system: £{fixedCosts.mounting}</li>
                <li>Scaffolding: £{fixedCosts.scaffolding}</li>
                <li>Electrical components: £{fixedCosts.electrical}</li>
                <li>Labour (MCS certified): £{fixedCosts.labour}</li>
                <li>MCS / DNO admin: £{fixedCosts.admin}</li>
                <li className="pt-2 font-bold border-t">Total installed (0% VAT): <span className="text-red-700">£{totalCost.toFixed(0)}</span></li>
              </ul>
              <p className="text-xs text-gray-500 mt-2">* Prices exclude VAT (valid until March 2027). Estimates based on 2025-2026 UK market.</p>
            </div>
          )}
        </div>
      </div>

      {layout && layout.panelPositions.length > 0 && (
        <ThreeScene roofLength={roofLength} roofWidth={roofWidth} layout={layout} panelType={panelType} obstacles={obstacles} />
      )}
    </div>
  );
};

export default SolarPanelCalculator;
