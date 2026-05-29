import React, { useState, useEffect } from 'react';
import ThreeScene from './ThreeScene';
import PanelInfo from './PanelInfo';
import { PANEL_TYPES, calculateUsableDimensions, calculatePanelLayout, Obstacle } from '../utils/solarCalculator';

// Imágenes para los paneles
const monoImage = 'https://res.cloudinary.com/dwealmbfi/image/upload/v1779970838/Monocristaline_imbvt7.png';
const polyImage = 'https://res.cloudinary.com/dwealmbfi/image/upload/v1779971127/afbc2e44-892f-4e87-83f4-b19cc739626d.png';

// Costes por defecto (valores medios sin IVA)
const DEFAULT_PANEL_PRICE = { monocrystalline: 45, polycrystalline: 35 };
const DEFAULT_INVERTER_PRICES = { string: 900, micro: 1400, hybrid: 1600 };
const DEFAULT_FIXED_COSTS = {
  mounting: 450,
  scaffolding: 600,
  electrical: 350,
  labour: 1150,
  admin: 175,
};

const SolarPanelCalculator: React.FC = () => {
  // Dimensiones y obstáculos
  const [roofLength, setRoofLength] = useState(8);
  const [roofWidth, setRoofWidth] = useState(5);
  const [panelType, setPanelType] = useState<'monocrystalline' | 'polycrystalline'>('monocrystalline');
  const [obstacles, setObstacles] = useState<Obstacle[]>([]);
  const [layout, setLayout] = useState<{ totalPanels: number; cols: number; rows: number; panelPositions: { x: number; z: number }[] } | null>(null);

  // Costes editables por el usuario
  const [panelPricePerUnit, setPanelPricePerUnit] = useState(DEFAULT_PANEL_PRICE.monocrystalline);
  const [inverterType, setInverterType] = useState<'string' | 'micro' | 'hybrid'>('string');
  const [inverterCost, setInverterCost] = useState(DEFAULT_INVERTER_PRICES.string);
  const [mountingCost, setMountingCost] = useState(DEFAULT_FIXED_COSTS.mounting);
  const [scaffoldingCost, setScaffoldingCost] = useState(DEFAULT_FIXED_COSTS.scaffolding);
  const [electricalCost, setElectricalCost] = useState(DEFAULT_FIXED_COSTS.electrical);
  const [labourCost, setLabourCost] = useState(DEFAULT_FIXED_COSTS.labour);
  const [adminCost, setAdminCost] = useState(DEFAULT_FIXED_COSTS.admin);

  // Sincronizar precio del panel según tipo (por defecto, pero usuario puede cambiarlo)
  useEffect(() => {
    setPanelPricePerUnit(DEFAULT_PANEL_PRICE[panelType]);
  }, [panelType]);

  // Sincronizar coste del inversor según tipo seleccionado
  useEffect(() => {
    setInverterCost(DEFAULT_INVERTER_PRICES[inverterType]);
  }, [inverterType]);

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

  // Cálculo del coste total (0% VAT)
  const totalCost = layout ? (
    layout.totalPanels * panelPricePerUnit +
    inverterCost +
    mountingCost + scaffoldingCost + electricalCost + labourCost + adminCost
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
              <option value="monocrystalline">Monocristalino (TOPCon)</option>
              <option value="polycrystalline">Policristalino (PERC)</option>
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
            <select value={inverterType} onChange={(e) => setInverterType(e.target.value as any)} className="border p-2 rounded w-full">
              <option value="string">String inverter (3.68 kW)</option>
              <option value="micro">Microinverters (per panel)</option>
              <option value="hybrid">Hybrid inverter (battery ready)</option>
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

          {/* Sección de costes editables (visible siempre) */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="font-bold text-lg mb-2">💰 Edit your cost estimates (0% VAT)</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between items-center">
                <label>Panel price (£ per panel):</label>
                <input type="number" value={panelPricePerUnit} onChange={(e) => setPanelPricePerUnit(parseFloat(e.target.value))} className="border p-1 rounded w-28 text-right" step="5" />
              </div>
              <div className="flex justify-between items-center">
                <label>Inverter cost (£):</label>
                <input type="number" value={inverterCost} onChange={(e) => setInverterCost(parseFloat(e.target.value))} className="border p-1 rounded w-28 text-right" step="50" />
              </div>
              <div className="flex justify-between items-center">
                <label>Mounting system (£):</label>
                <input type="number" value={mountingCost} onChange={(e) => setMountingCost(parseFloat(e.target.value))} className="border p-1 rounded w-28 text-right" step="50" />
              </div>
              <div className="flex justify-between items-center">
                <label>Scaffolding (£):</label>
                <input type="number" value={scaffoldingCost} onChange={(e) => setScaffoldingCost(parseFloat(e.target.value))} className="border p-1 rounded w-28 text-right" step="50" />
              </div>
              <div className="flex justify-between items-center">
                <label>Electrical components (£):</label>
                <input type="number" value={electricalCost} onChange={(e) => setElectricalCost(parseFloat(e.target.value))} className="border p-1 rounded w-28 text-right" step="50" />
              </div>
              <div className="flex justify-between items-center">
                <label>Labour (MCS) (£):</label>
                <input type="number" value={labourCost} onChange={(e) => setLabourCost(parseFloat(e.target.value))} className="border p-1 rounded w-28 text-right" step="50" />
              </div>
              <div className="flex justify-between items-center">
                <label>MCS/DNO admin (£):</label>
                <input type="number" value={adminCost} onChange={(e) => setAdminCost(parseFloat(e.target.value))} className="border p-1 rounded w-28 text-right" step="25" />
              </div>
            </div>
            {layout && (
              <div className="mt-4 pt-2 border-t border-blue-300">
                <p className="font-bold text-lg">Total installed: <span className="text-red-700">£{totalCost.toFixed(0)}</span></p>
                <p className="text-xs text-gray-500 mt-1">* Based on {layout.totalPanels} panels. Change any cost above to match your quote.</p>
              </div>
            )}
            {!layout && (
              <p className="text-xs text-gray-500 mt-2">Click "Calculate layout" to see total cost based on panel count.</p>
            )}
          </div>
        </div>
      </div>

      {layout && layout.panelPositions.length > 0 && (
        <ThreeScene roofLength={roofLength} roofWidth={roofWidth} layout={layout} panelType={panelType} obstacles={obstacles} />
      )}
    </div>
  );
};

export default SolarPanelCalculator;
