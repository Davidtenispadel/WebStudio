import React, { useState, useEffect } from 'react';

// Intentamos importar componentes auxiliares, con fallbacks
let ThreeScene: React.ComponentType<any> = () => <div className="h-96 bg-gray-200 flex items-center justify-center">3D view not available</div>;
let PanelInfo: React.ComponentType<any> = () => <div className="bg-gray-100 p-4 rounded">Panel info not available</div>;

try {
  // @ts-ignore
  const ThreeSceneModule = require('./ThreeScene');
  if (ThreeSceneModule.default) ThreeScene = ThreeSceneModule.default;
} catch (e) { console.warn("ThreeScene not found, using placeholder"); }

try {
  // @ts-ignore
  const PanelInfoModule = require('./PanelInfo');
  if (PanelInfoModule.default) PanelInfo = PanelInfoModule.default;
} catch (e) { console.warn("PanelInfo not found, using placeholder"); }

// ==================== DATOS DE IRRADIACIÓN POR PAÍS Y REGIÓN ====================
type CountryInsolation = {
  name: string;
  north: number;  // mitad norte
  south: number;  // mitad sur
};

const countriesInsolation: CountryInsolation[] = [
  { name: "United Kingdom", north: 850, south: 1000 },
  { name: "Ireland", north: 850, south: 950 },
  { name: "France", north: 1100, south: 1350 },
  { name: "Germany", north: 950, south: 1100 },
  { name: "Spain", north: 1450, south: 1750 },
  { name: "Portugal", north: 1500, south: 1750 },
  { name: "Italy", north: 1300, south: 1600 },
  { name: "Greece", north: 1450, south: 1650 },
  { name: "Netherlands", north: 900, south: 1000 },
  { name: "Belgium", north: 900, south: 1000 },
  { name: "Denmark", north: 950, south: 1050 },
  { name: "Sweden", north: 850, south: 1000 },
  { name: "Norway", north: 800, south: 950 },
  { name: "Finland", north: 800, south: 950 },
  { name: "Poland", north: 1000, south: 1100 },
  { name: "Czech Republic", north: 1000, south: 1100 },
  { name: "Austria", north: 1050, south: 1200 },
  { name: "Switzerland", north: 1050, south: 1250 },
  { name: "Slovakia", north: 1050, south: 1150 },
  { name: "Hungary", north: 1150, south: 1250 },
  { name: "Romania", north: 1200, south: 1350 },
  { name: "Bulgaria", north: 1250, south: 1400 },
  { name: "Croatia", north: 1250, south: 1400 },
  { name: "Slovenia", north: 1150, south: 1300 },
  { name: "Serbia", north: 1200, south: 1350 },
  { name: "Bosnia", north: 1150, south: 1300 },
  { name: "Albania", north: 1250, south: 1400 },
  { name: "North Macedonia", north: 1250, south: 1400 },
  { name: "Montenegro", north: 1300, south: 1450 },
  { name: "Kosovo", north: 1250, south: 1400 },
  { name: "Estonia", north: 900, south: 1000 },
  { name: "Latvia", north: 900, south: 1000 },
  { name: "Lithuania", north: 950, south: 1050 },
  { name: "Turkey", north: 1350, south: 1650 },
  { name: "Cyprus", north: 1600, south: 1750 },
  { name: "Malta", north: 1700, south: 1800 },
  { name: "Iceland", north: 700, south: 800 },
  { name: "USA", north: 1300, south: 1800 },
  { name: "Canada", north: 1000, south: 1300 },
  { name: "Mexico", north: 1700, south: 2000 },
  { name: "Australia", north: 1600, south: 1800 },
  { name: "New Zealand", north: 1300, south: 1500 },
  { name: "South Africa", north: 1800, south: 2100 },
  { name: "India", north: 1600, south: 1900 },
  { name: "China", north: 1300, south: 1600 },
  { name: "Japan", north: 1200, south: 1400 },
  { name: "Brazil", north: 1500, south: 1700 },
  { name: "Argentina", north: 1600, south: 1800 },
  { name: "Chile", north: 2000, south: 1700 },
  { name: "Peru", north: 1700, south: 1900 },
  { name: "Colombia", north: 1600, south: 1800 },
  { name: "Venezuela", north: 1700, south: 1900 },
  { name: "Egypt", north: 1900, south: 2100 },
  { name: "Morocco", north: 1700, south: 2000 },
  { name: "Kenya", north: 1800, south: 2000 },
  { name: "Nigeria", north: 1600, south: 1800 },
];

// ==================== FUNCIONES DE DISPOSICIÓN (locales) ====================
type Obstacle = { x: number; z: number };

const PANEL_TYPES = {
  monocrystalline: { width: 1.0, height: 1.7, powerWp: 430 },
  polycrystalline: { width: 1.0, height: 1.7, powerWp: 400 },
};

const calculateUsableDimensions = (roofLength: number, roofWidth: number, obstacles: Obstacle[]) => {
  const margin = 0.4;
  let length = roofLength - 2 * margin;
  let width = roofWidth - 2 * margin;
  if (obstacles.length > 0) {
    const obstacleArea = obstacles.reduce((acc) => acc + 0.5 * 0.5, 0);
    const totalArea = length * width;
    const reduction = Math.min(0.3, obstacleArea / totalArea);
    length *= (1 - reduction);
    width *= (1 - reduction);
  }
  return { length, width };
};

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

// ==================== FACTOR DE ORIENTACIÓN CONTINUO ====================
const orientationAnchors = [
  { deg: 0,   factor: 1.0 },   // Sur
  { deg: 45,  factor: 0.9 },   // Sureste
  { deg: 90,  factor: 0.8 },   // Este
  { deg: 135, factor: 0.6 },   // Noreste
  { deg: 180, factor: 0.5 },   // Norte
  { deg: 225, factor: 0.6 },   // Noroeste
  { deg: 270, factor: 0.8 },   // Oeste
  { deg: 315, factor: 0.9 },   // Suroeste
  { deg: 360, factor: 1.0 },   // Vuelta a Sur
];

const getOrientationFactor = (deg: number): number => {
  let angle = deg % 360;
  if (angle < 0) angle += 360;
  for (let i = 0; i < orientationAnchors.length - 1; i++) {
    const a1 = orientationAnchors[i];
    const a2 = orientationAnchors[i+1];
    if (angle >= a1.deg && angle <= a2.deg) {
      const t = (angle - a1.deg) / (a2.deg - a1.deg);
      return a1.factor + t * (a2.factor - a1.factor);
    }
  }
  return 1.0;
};

// ==================== FACTOR DE INCLINACIÓN (PITCH) ====================
// Simula el efecto del ángulo del tejado (0° plano, ~35° óptimo, 60° muy inclinado)
const getTiltFactor = (tiltDeg: number): number => {
  const tilt = Math.min(60, Math.max(0, tiltDeg));
  if (tilt <= 35) {
    // De 0.9 en plano a 1.0 a 35°
    return 0.9 + (tilt / 35) * 0.1;
  } else {
    // De 1.0 a 35° hasta 0.85 a 60°
    return 1.0 - ((tilt - 35) / 25) * 0.15;
  }
};

// ==================== COMPONENTE PRINCIPAL ====================
const SolarPanelCalculator: React.FC = () => {
  // Dimensiones y disposición
  const [roofLength, setRoofLength] = useState(8);
  const [roofWidth, setRoofWidth] = useState(5);
  const [panelType, setPanelType] = useState<'monocrystalline' | 'polycrystalline'>('monocrystalline');
  const [obstacles, setObstacles] = useState<Obstacle[]>([]);
  const [layout, setLayout] = useState<{ totalPanels: number; cols: number; rows: number; panelPositions: { x: number; z: number }[] } | null>(null);

  // País y región
  const [selectedCountry, setSelectedCountry] = useState<string>("United Kingdom");
  const [region, setRegion] = useState<'north' | 'south'>('south');

  // Ángulo de inclinación (pitch) del tejado
  const [tilt, setTilt] = useState(35); // 35° óptimo por defecto

  // Costes editables
  const [panelPricePerUnit, setPanelPricePerUnit] = useState(45);
  const [inverterType, setInverterType] = useState<'string' | 'micro' | 'hybrid'>('string');
  const [inverterCost, setInverterCost] = useState(900);
  const [mountingCost, setMountingCost] = useState(450);
  const [scaffoldingCost, setScaffoldingCost] = useState(600);
  const [electricalCost, setElectricalCost] = useState(350);
  const [labourCost, setLabourCost] = useState(1150);
  const [adminCost, setAdminCost] = useState(175);

  // Parámetros financieros y de consumo
  const [orientation, setOrientation] = useState(0);
  const [selfConsumptionPercent, setSelfConsumptionPercent] = useState(50);
  const [exportTariff, setExportTariff] = useState(15);
  const [monthlyBill, setMonthlyBill] = useState(120);

  const importPrice = 24; // p/kWh

  // Sincronizar precios por defecto según tipo de panel
  const defaultPanelPrice = { monocrystalline: 45, polycrystalline: 35 };
  useEffect(() => {
    setPanelPricePerUnit(defaultPanelPrice[panelType]);
  }, [panelType]);

  useEffect(() => {
    const inverterPrices = { string: 900, micro: 1400, hybrid: 1600 };
    setInverterCost(inverterPrices[inverterType]);
  }, [inverterType]);

  const getInsolation = (): number => {
    const country = countriesInsolation.find(c => c.name === selectedCountry);
    if (!country) return 1000;
    return region === 'south' ? country.south : country.north;
  };

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

  // Cálculo de producción con orientación e inclinación
  const totalWp = layout ? layout.totalPanels * PANEL_TYPES[panelType].powerWp : 0;
  const orientationFactor = getOrientationFactor(orientation);
  const tiltFactor = getTiltFactor(tilt);
  const insolation = getInsolation();
  const annualKwh = (totalWp / 1000) * insolation * orientationFactor * tiltFactor;

  const seasonalDistribution = { spring: 0.25, summer: 0.40, autumn: 0.20, winter: 0.15 };
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

  const paybackYears = totalInstallCost > 0 && totalAnnualBenefit > 0 ? totalInstallCost / totalAnnualBenefit : 0;
  const monthlyBillSaving = totalAnnualBenefit / 12;
  const newMonthlyBill = Math.max(0, monthlyBill - monthlyBillSaving);

  const monoImage = 'https://res.cloudinary.com/dwealmbfi/image/upload/v1779970838/Monocristaline_imbvt7.png';
  const polyImage = 'https://res.cloudinary.com/dwealmbfi/image/upload/v1779971127/afbc2e44-892f-4e87-83f4-b19cc739626d.png';

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-3xl font-light mb-2">Solar Panel Layout Designer</h2>
      <p className="text-sm text-gray-600 mb-4">* All prices exclude VAT (0% valid until March 2027)</p>

      <div className="grid md:grid-cols-2 gap-8">
        {/* COLUMNA IZQUIERDA: Diseño del tejado */}
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
              <img src={panelType === 'monocrystalline' ? monoImage : polyImage} alt={panelType} className="h-24 w-auto rounded shadow-md" />
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

        {/* COLUMNA DERECHA: Información, costes, producción y finanzas */}
        <div>
          <PanelInfo panelType={panelType} />

          {/* Costes editables */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="font-bold text-lg mb-2">💰 Edit your cost estimates (0% VAT)</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between items-center"><label>Panel price (£/panel):</label><input type="number" value={panelPricePerUnit} onChange={(e) => setPanelPricePerUnit(parseFloat(e.target.value))} className="border p-1 rounded w-28 text-right" step="5" /></div>
              <div className="flex justify-between items-center"><label>Inverter cost (£):</label><input type="number" value={inverterCost} onChange={(e) => setInverterCost(parseFloat(e.target.value))} className="border p-1 rounded w-28 text-right" step="50" /></div>
              <div className="flex justify-between items-center"><label>Mounting system (£):</label><input type="number" value={mountingCost} onChange={(e) => setMountingCost(parseFloat(e.target.value))} className="border p-1 rounded w-28 text-right" step="50" /></div>
              <div className="flex justify-between items-center"><label>Scaffolding (£):</label><input type="number" value={scaffoldingCost} onChange={(e) => setScaffoldingCost(parseFloat(e.target.value))} className="border p-1 rounded w-28 text-right" step="50" /></div>
              <div className="flex justify-between items-center"><label>Electrical components (£):</label><input type="number" value={electricalCost} onChange={(e) => setElectricalCost(parseFloat(e.target.value))} className="border p-1 rounded w-28 text-right" step="50" /></div>
              <div className="flex justify-between items-center"><label>Labour (MCS) (£):</label><input type="number" value={labourCost} onChange={(e) => setLabourCost(parseFloat(e.target.value))} className="border p-1 rounded w-28 text-right" step="50" /></div>
              <div className="flex justify-between items-center"><label>MCS/DNO admin (£):</label><input type="number" value={adminCost} onChange={(e) => setAdminCost(parseFloat(e.target.value))} className="border p-1 rounded w-28 text-right" step="25" /></div>
            </div>
          </div>

          {layout && (
            <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
              <h3 className="font-bold text-lg mb-2">🌍 Location, Orientation & Roof Pitch</h3>
              
              {/* País y región */}
              <div className="mb-3">
                <label className="block font-medium">Country:</label>
                <select value={selectedCountry} onChange={(e) => setSelectedCountry(e.target.value)} className="border p-2 rounded w-full">
                  {countriesInsolation.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
                </select>
              </div>
              <div className="mb-3">
                <label className="block font-medium">Region:</label>
                <select value={region} onChange={(e) => setRegion(e.target.value as 'north' | 'south')} className="border p-2 rounded w-full">
                  <option value="south">Southern half (higher irradiance)</option>
                  <option value="north">Northern half (lower irradiance)</option>
                </select>
                <p className="text-xs text-gray-600 mt-1">Base insolation: {getInsolation()} kWh/kWp/year (south-facing, optimal tilt 35°)</p>
              </div>

              {/* Orientación en grados */}
              <div className="mb-3">
                <label className="block font-medium">Roof orientation (degrees from south):</label>
                <input type="range" min="0" max="360" step="1" value={orientation} onChange={(e) => setOrientation(parseInt(e.target.value))} className="w-full" />
                <div className="flex justify-between text-xs"><span>0° S</span><span>90° E</span><span>180° N</span><span>270° W</span><span>360° S</span></div>
                <p className="text-sm mt-1">Current: <strong>{orientation}°</strong> → Orientation factor: <strong>{orientationFactor.toFixed(2)}</strong></p>
              </div>

              {/* NUEVO: Inclinación del tejado (pitch) */}
              <div className="mb-4">
                <label className="block font-medium">Roof pitch (tilt) degrees:</label>
                <input type="range" min="0" max="60" step="1" value={tilt} onChange={(e) => setTilt(parseInt(e.target.value))} className="w-full" />
                <div className="flex justify-between text-xs"><span>0° (flat)</span><span>35° (optimal)</span><span>60° (steep)</span></div>
                <p className="text-sm mt-1">Current pitch: <strong>{tilt}°</strong> → Tilt factor: <strong>{tiltFactor.toFixed(2)}</strong></p>
                <p className="text-xs text-gray-500">* Optimal tilt for most latitudes is ~30-40°. Flat roofs produce ~10% less, very steep roofs ~15% less.</p>
              </div>

              {/* Producción estacional */}
              <h3 className="font-bold text-lg mt-4 mb-2">☀️ Seasonal Production</h3>
              <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                <div className="bg-white p-2 rounded text-center">🌱 Spring<br/>{seasonalKwh.spring.toFixed(0)} kWh</div>
                <div className="bg-white p-2 rounded text-center">☀️ Summer<br/>{seasonalKwh.summer.toFixed(0)} kWh</div>
                <div className="bg-white p-2 rounded text-center">🍂 Autumn<br/>{seasonalKwh.autumn.toFixed(0)} kWh</div>
                <div className="bg-white p-2 rounded text-center">❄️ Winter<br/>{seasonalKwh.winter.toFixed(0)} kWh</div>
              </div>

              {/* Análisis financiero */}
              <h3 className="font-bold text-lg mt-2 mb-2">💰 Financial Analysis</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span>Annual generation:</span><span className="font-semibold">{annualKwh.toFixed(0)} kWh</span></div>
                <div>
                  <label className="block">Self-consumption (%):</label>
                  <input type="range" min="0" max="100" step="5" value={selfConsumptionPercent} onChange={(e) => setSelfConsumptionPercent(parseInt(e.target.value))} className="w-full" />
                  <span className="text-xs">{selfConsumptionPercent}% consumed, {100-selfConsumptionPercent}% exported</span>
                </div>
                <div className="flex justify-between"><span>Export tariff (p/kWh):</span><input type="number" step="0.5" value={exportTariff} onChange={(e) => setExportTariff(parseFloat(e.target.value))} className="border p-1 rounded w-24 text-right" /></div>
                <div className="flex justify-between"><span>Monthly bill (£):</span><input type="number" step="10" value={monthlyBill} onChange={(e) => setMonthlyBill(parseFloat(e.target.value))} className="border p-1 rounded w-24 text-right" /></div>
                <div className="border-t pt-2 mt-2">
                  <p>✅ Self-consumed: {selfConsumedKwh.toFixed(0)} kWh → saves <strong>£{(annualSavingFromSelf).toFixed(0)}/year</strong></p>
                  <p>📡 Exported: {exportedKwh.toFixed(0)} kWh → income <strong>£{(annualExportIncome).toFixed(0)}/year</strong></p>
                  <p className="font-semibold">💰 Total annual benefit: <span className="text-green-700">£{totalAnnualBenefit.toFixed(0)}</span></p>
                  <p>🏠 New monthly bill: <strong>£{newMonthlyBill.toFixed(0)}</strong> (saving £{monthlyBillSaving.toFixed(0)}/month)</p>
                  <p>📅 Payback period: <strong>{paybackYears.toFixed(1)} years</strong> (installation cost £{totalInstallCost.toFixed(0)})</p>
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
