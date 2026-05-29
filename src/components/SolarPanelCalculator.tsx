import React, { useState, useEffect } from 'react';

// Intentamos importar los componentes auxiliares, pero si fallan, los reemplazamos por placeholders
let ThreeScene: React.ComponentType<any> = () => <div className="h-96 bg-gray-200 flex items-center justify-center">3D view not available</div>;
let PanelInfo: React.ComponentType<any> = () => <div className="bg-gray-100 p-4 rounded">Panel info not available</div>;

try {
  // @ts-ignore
  const ThreeSceneModule = require('./ThreeScene');
  if (ThreeSceneModule.default) ThreeScene = ThreeSceneModule.default;
} catch (e) {
  console.warn("ThreeScene not found, using placeholder");
}

try {
  // @ts-ignore
  const PanelInfoModule = require('./PanelInfo');
  if (PanelInfoModule.default) PanelInfo = PanelInfoModule.default;
} catch (e) {
  console.warn("PanelInfo not found, using placeholder");
}

// Definiciones locales de tipos de panel (por si el archivo solarCalculator no existe)
const PANEL_TYPES = {
  monocrystalline: { width: 1.0, height: 1.7, powerWp: 430 },
  polycrystalline: { width: 1.0, height: 1.7, powerWp: 400 },
};

type Obstacle = { x: number; z: number };

// Función local para calcular dimensiones útiles (restando márgenes y obstáculos)
const calculateUsableDimensions = (roofLength: number, roofWidth: number, obstacles: Obstacle[]) => {
  const margin = 0.4; // 400 mm
  let length = roofLength - 2 * margin;
  let width = roofWidth - 2 * margin;
  // Reducción simplificada por obstáculos (si hay alguno, restamos área)
  if (obstacles.length > 0) {
    const obstacleArea = obstacles.reduce((acc, obs) => acc + 0.5 * 0.5, 0); // cada obstáculo 0.5x0.5
    const totalArea = length * width;
    const reduction = Math.min(0.3, obstacleArea / totalArea);
    length *= (1 - reduction);
    width *= (1 - reduction);
  }
  return { length, width };
};

// Función local para calcular disposición de paneles
const calculatePanelLayout = (length: number, width: number, panelW: number, panelH: number, obstacles: Obstacle[]) => {
  const gap = 0.02;
  const cols = Math.floor((length + gap) / (panelW + gap));
  const rows = Math.floor((width + gap) / (panelH + gap));
  const panelPositions: { x: number; z: number }[] = [];
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      const x = -length/2 + i * (panelW + gap) + panelW/2;
      const z = -width/2 + j * (panelH + gap) + panelH/2;
      let collide = false;
      for (const obs of obstacles) {
        if (Math.abs(x - obs.x) < (panelW/2 + 0.3) && Math.abs(z - obs.z) < (panelH/2 + 0.3)) {
          collide = true;
          break;
        }
      }
      if (!collide) panelPositions.push({ x, z });
    }
  }
  return { totalPanels: panelPositions.length, cols, rows, panelPositions };
};

// Imágenes de paneles
const monoImage = 'https://res.cloudinary.com/dwealmbfi/image/upload/v1779970838/Monocristaline_imbvt7.png';
const polyImage = 'https://res.cloudinary.com/dwealmbfi/image/upload/v1779971127/afbc2e44-892f-4e87-83f4-b19cc739626d.png';

// Costes por defecto (sin IVA)
const DEFAULT_PANEL_PRICE = { monocrystalline: 45, polycrystalline: 35 };
const DEFAULT_INVERTER_PRICES = { string: 900, micro: 1400, hybrid: 1600 };
const DEFAULT_FIXED_COSTS = {
  mounting: 450,
  scaffolding: 600,
  electrical: 350,
  labour: 1150,
  admin: 175,
};

// Factor de orientación (0° = sur)
const getOrientationFactor = (orientationDeg: number): number => {
  const angle = Math.abs(orientationDeg % 360);
  if (angle <= 45) return 1.0;
  if (angle <= 90) return 0.85;
  if (angle <= 135) return 0.65;
  return 0.5;
};

// Distribución estacional (%)
const seasonalDistribution = {
  spring: 0.25,
  summer: 0.40,
  autumn: 0.20,
  winter: 0.15,
};

const SolarPanelCalculator: React.FC = () => {
  // Dimensiones
  const [roofLength, setRoofLength] = useState(8);
  const [roofWidth, setRoofWidth] = useState(5);
  const [panelType, setPanelType] = useState<'monocrystalline' | 'polycrystalline'>('monocrystalline');
  const [obstacles, setObstacles] = useState<Obstacle[]>([]);
  const [layout, setLayout] = useState<{ totalPanels: number; cols: number; rows: number; panelPositions: { x: number; z: number }[] } | null>(null);

  // Costes editables
  const [panelPricePerUnit, setPanelPricePerUnit] = useState(DEFAULT_PANEL_PRICE.monocrystalline);
  const [inverterType, setInverterType] = useState<'string' | 'micro' | 'hybrid'>('string');
  const [inverterCost, setInverterCost] = useState(DEFAULT_INVERTER_PRICES.string);
  const [mountingCost, setMountingCost] = useState(DEFAULT_FIXED_COSTS.mounting);
  const [scaffoldingCost, setScaffoldingCost] = useState(DEFAULT_FIXED_COSTS.scaffolding);
  const [electricalCost, setElectricalCost] = useState(DEFAULT_FIXED_COSTS.electrical);
  const [labourCost, setLabourCost] = useState(DEFAULT_FIXED_COSTS.labour);
  const [adminCost, setAdminCost] = useState(DEFAULT_FIXED_COSTS.admin);

  // Parámetros producción / finanzas
  const [orientation, setOrientation] = useState(0);
  const [selfConsumptionPercent, setSelfConsumptionPercent] = useState(50);
  const [exportTariff, setExportTariff] = useState(15); // p/kWh
  const [monthlyBill, setMonthlyBill] = useState(120);  // £

  const importPrice = 24; // p/kWh

  // Sincronizar precios según tipo
  useEffect(() => {
    setPanelPricePerUnit(DEFAULT_PANEL_PRICE[panelType]);
  }, [panelType]);

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

  const totalWp = layout ? layout.totalPanels * PANEL_TYPES[panelType].powerWp : 0;
  const orientationFactor = getOrientationFactor(orientation);
  const baseAnnualKwhPerKw = 950;
  const annualKwh = (totalWp / 1000) * baseAnnualKwhPerKw * orientationFactor;

  const seasonalKwh = {
    spring: annualKwh * seasonalDistribution.spring,
    summer: annualKwh * seasonalDistribution.summer,
    autumn: annualKwh * seasonalDistribution.autumn,
    winter: annualKwh * seasonalDistribution.winter,
  };

  const selfConsumedKwh = annualKwh * (selfConsumptionPercent / 100);
  const exportedKwh = annualKwh - selfConsumedKwh;
  const annualSavingFromSelf = (selfConsumedKwh * importPrice) / 100;
  const annualExportIncome = (exportedKwh * exportTariff) / 100;
  const totalAnnualBenefit = annualSavingFromSelf + annualExportIncome;

  const totalInstallCost = layout ? (
    layout.totalPanels * panelPricePerUnit +
    inverterCost +
    mountingCost + scaffoldingCost + electricalCost + labourCost + adminCost
  ) : 0;

  const paybackYears = totalInstallCost > 0 ? totalInstallCost / totalAnnualBenefit : 0;
  const monthlyBillSaving = totalAnnualBenefit / 12;
  const newMonthlyBill = Math.max(0, monthlyBill - monthlyBillSaving);

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-3xl font-light mb-2">Solar Panel Layout Designer</h2>
      <p className="text-sm text-gray-600 mb-4">* All prices exclude VAT (0% valid until March 2027)</p>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Columna izquierda */}
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

        {/* Columna derecha */}
        <div>
          <PanelInfo panelType={panelType} />

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
          </div>

          {layout && (
            <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
              <h3 className="font-bold text-lg mb-2">☀️ Orientation & Seasonal Production</h3>
              <div className="mb-3">
                <label className="block font-medium">Roof orientation (degrees):</label>
                <input type="range" min="0" max="360" step="5" value={orientation} onChange={(e) => setOrientation(parseInt(e.target.value))} className="w-full" />
                <div className="flex justify-between text-sm">
                  <span>0° (S)</span><span>90° (E)</span><span>180° (N)</span><span>270° (W)</span>
                </div>
                <p className="text-sm mt-1">Current: <strong>{orientation}°</strong> – Factor: <strong>{orientationFactor.toFixed(2)}</strong></p>
              </div>

              <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                <div className="bg-white p-2 rounded text-center">🌱 Spring<br/>{seasonalKwh.spring.toFixed(0)} kWh</div>
                <div className="bg-white p-2 rounded text-center">☀️ Summer<br/>{seasonalKwh.summer.toFixed(0)} kWh</div>
                <div className="bg-white p-2 rounded text-center">🍂 Autumn<br/>{seasonalKwh.autumn.toFixed(0)} kWh</div>
                <div className="bg-white p-2 rounded text-center">❄️ Winter<br/>{seasonalKwh.winter.toFixed(0)} kWh</div>
              </div>

              <h3 className="font-bold text-lg mt-4 mb-2">💰 Financial Analysis</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Annual generation:</span>
                  <span className="font-semibold">{annualKwh.toFixed(0)} kWh</span>
                </div>
                <div>
                  <label className="block">Self-consumption (%):</label>
                  <input type="range" min="0" max="100" step="5" value={selfConsumptionPercent} onChange={(e) => setSelfConsumptionPercent(parseInt(e.target.value))} className="w-full" />
                  <span className="text-xs">{selfConsumptionPercent}% consumed, {100-selfConsumptionPercent}% exported</span>
                </div>
                <div className="flex justify-between">
                  <span>Export tariff (p/kWh):</span>
                  <input type="number" step="0.5" value={exportTariff} onChange={(e) => setExportTariff(parseFloat(e.target.value))} className="border p-1 rounded w-24 text-right" />
                </div>
                <div className="flex justify-between">
                  <span>Monthly bill (£):</span>
                  <input type="number" step="10" value={monthlyBill} onChange={(e) => setMonthlyBill(parseFloat(e.target.value))} className="border p-1 rounded w-24 text-right" />
                </div>
                <div className="border-t pt-2 mt-2">
                  <p>✅ Self-consumed: {selfConsumedKwh.toFixed(0)} kWh → saves <strong>£{(annualSavingFromSelf).toFixed(0)}/year</strong></p>
                  <p>📡 Exported: {exportedKwh.toFixed(0)} kWh → income <strong>£{(annualExportIncome).toFixed(0)}/year</strong></p>
                  <p className="font-semibold">💰 Total annual benefit: <span className="text-green-700">£{totalAnnualBenefit.toFixed(0)}</span></p>
                  <p>🏠 New monthly bill: <strong>£{newMonthlyBill.toFixed(0)}</strong> (saving £{monthlyBillSaving.toFixed(0)}/month)</p>
                  <p>📅 Payback period: <strong>{paybackYears.toFixed(1)} years</strong> (cost £{totalInstallCost.toFixed(0)})</p>
                </div>
              </div>
            </div>
          )}

          {!layout && (
            <div className="mt-6 p-4 bg-yellow-50 rounded-lg text-center text-sm">
              ⚙️ Click "Calculate layout" to see production estimates and payback.
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
