import React, { useState, useEffect } from 'react';

// ==================== DATOS DE IRRADIACIÓN POR PAÍS ====================
type CountryInsolation = { name: string; north: number; south: number };
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

// ==================== CATÁLOGO DE PANELES ====================
const PANEL_CATALOG = {
  perc: { name: "PERC (monocristalino)", price: 75, powerWp: 410, efficiency: "18‑20%", appearance: "Dark blue/black, 9‑12 thick busbars", imageType: "mono" },
  topcon: { name: "TOPCon (monocristalino)", price: 85, powerWp: 440, efficiency: "20‑22.5%", appearance: "Intense black, 12‑16 very thin busbars", imageType: "mono" },
  hjt: { name: "HJT (monocristalino)", price: 95, powerWp: 460, efficiency: "21‑23%", appearance: "Jet black, 6‑8 extremely thin busbars", imageType: "mono" },
  ibc: { name: "IBC (monocristalino)", price: 110, powerWp: 480, efficiency: "22‑24%", appearance: "Pure black, no front busbars", imageType: "mono" },
  poly: { name: "Policristalino (policristalino)", price: 65, powerWp: 400, efficiency: "16‑18%", appearance: "Speckled blue, visible crystal fragments", imageType: "poly" }
};
type PanelKey = keyof typeof PANEL_CATALOG;

// ==================== FACTORES DE ORIENTACIÓN E INCLINACIÓN ====================
const getOrientationFactor = (deg: number): number => {
  let angle = deg % 360;
  if (angle < 0) angle += 360;
  const anchors = [
    { deg: 0, factor: 0.35 }, { deg: 45, factor: 0.45 }, { deg: 90, factor: 0.75 },
    { deg: 135, factor: 0.85 }, { deg: 180, factor: 1.0 }, { deg: 225, factor: 0.85 },
    { deg: 270, factor: 0.75 }, { deg: 315, factor: 0.45 }, { deg: 360, factor: 0.35 }
  ];
  for (let i = 0; i < anchors.length - 1; i++) {
    const a1 = anchors[i], a2 = anchors[i+1];
    if (angle >= a1.deg && angle <= a2.deg) {
      const t = (angle - a1.deg) / (a2.deg - a1.deg);
      return a1.factor + t * (a2.factor - a1.factor);
    }
  }
  return 0.35;
};

const getTiltFactor = (tiltDeg: number): number => {
  const tilt = Math.min(60, Math.max(0, tiltDeg));
  if (tilt <= 35) return 0.9 + (tilt / 35) * 0.1;
  return 1.0 - ((tilt - 35) / 25) * 0.15;
};

const getColorFromFactor = (factor: number, minFactor: number, maxFactor: number): string => {
  const t = (factor - minFactor) / (maxFactor - minFactor);
  const r = Math.floor(255 * (1 - t)), g = Math.floor(255 * t);
  return `rgb(${r}, ${g}, 0)`;
};

// ==================== CÁLCULO DE DISPOSICIÓN ====================
type Obstacle = { x: number; z: number };
const calculateUsableDimensions = (roofLength: number, roofWidth: number, obstacles: Obstacle[]) => {
  const margin = 0.4;
  let length = roofLength - 2 * margin, width = roofWidth - 2 * margin;
  if (obstacles.length > 0) {
    const obstacleArea = obstacles.reduce((acc) => acc + 0.5 * 0.5, 0);
    const totalArea = length * width;
    const reduction = Math.min(0.3, obstacleArea / totalArea);
    length *= (1 - reduction); width *= (1 - reduction);
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
          collide = true; break;
        }
      }
      if (!collide) panelPositions.push({ x, z });
    }
  }
  return { totalPanels: panelPositions.length, cols, rows, panelPositions };
};

// ==================== COMPONENTE PRINCIPAL ====================
const SolarPanelCalculator: React.FC = () => {
  // --- Estados de entrada ---
  const [roofLength, setRoofLength] = useState(8);
  const [roofWidth, setRoofWidth] = useState(5);
  const [panelKey, setPanelKey] = useState<PanelKey>('topcon');
  const [obstacles, setObstacles] = useState<Obstacle[]>([]);
  const [orientationDeg, setOrientationDeg] = useState(180);
  const [tiltDeg, setTiltDeg] = useState(35);
  const [selectedCountry, setSelectedCountry] = useState("United Kingdom");
  const [region, setRegion] = useState<'north' | 'south'>('south');
  const [selfConsumptionPercent, setSelfConsumptionPercent] = useState(50);
  const [exportTariff, setExportTariff] = useState(15);
  const [monthlyBill, setMonthlyBill] = useState(120);
  const importPrice = 24;

  // Costes de instalación
  const [panelPricePerUnit, setPanelPricePerUnit] = useState(PANEL_CATALOG.topcon.price);
  const [inverterType, setInverterType] = useState<'string' | 'micro' | 'hybrid'>('string');
  const [inverterCost, setInverterCost] = useState(900);
  const [mountingCost, setMountingCost] = useState(450);
  const [scaffoldingCost, setScaffoldingCost] = useState(600);
  const [electricalCost, setElectricalCost] = useState(350);
  const [labourCost, setLabourCost] = useState(1150);
  const [adminCost, setAdminCost] = useState(175);

  // Mantenimiento
  const [includeMaintenance, setIncludeMaintenance] = useState(false);
  const [environment, setEnvironment] = useState<'urban' | 'rural'>('urban');
  const [climate, setClimate] = useState<'rainy' | 'dry'>('rainy');
  const [countryCostLevel, setCountryCostLevel] = useState<'expensive' | 'economical'>('expensive');
  const [customCleaningCost, setCustomCleaningCost] = useState<number | null>(null);
  const [customElectricalCost, setCustomElectricalCost] = useState<number | null>(null);

  // Autoconsumo del inversor (modelo + vatios)
  const [selectedInverterModel, setSelectedInverterModel] = useState<string>('none');
  const [customInverterW, setCustomInverterW] = useState<number>(0);
  const [inverterSelfConsumptionW, setInverterSelfConsumptionW] = useState<number>(0);

  const [layout, setLayout] = useState<{ totalPanels: number; cols: number; rows: number; panelPositions: { x: number; z: number }[] } | null>(null);

  // ==================== EFECTOS ====================
  useEffect(() => {
    const panelW = 1.0, panelH = 1.7;
    const { length, width } = calculateUsableDimensions(roofLength, roofWidth, obstacles);
    setLayout(calculatePanelLayout(length, width, panelW, panelH, obstacles));
  }, [roofLength, roofWidth, panelKey, obstacles]);

  useEffect(() => setPanelPricePerUnit(PANEL_CATALOG[panelKey].price), [panelKey]);
  useEffect(() => {
    const inverterPrices = { string: 900, micro: 1400, hybrid: 1600 };
    setInverterCost(inverterPrices[inverterType]);
  }, [inverterType]);

  useEffect(() => {
    const modelWatts: Record<string, number> = {
      none: 0, huawei: 2, sma: 3, solaredge: 2, fronius: 3, custom: customInverterW
    };
    setInverterSelfConsumptionW(modelWatts[selectedInverterModel] || 0);
  }, [selectedInverterModel, customInverterW]);

  // ==================== CÁLCULOS ====================
  const totalWp = layout ? layout.totalPanels * PANEL_CATALOG[panelKey].powerWp : 0;
  const orientationFactor = getOrientationFactor(orientationDeg);
  const tiltFactor = getTiltFactor(tiltDeg);
  const insolation = (() => {
    const country = countriesInsolation.find(c => c.name === selectedCountry);
    if (!country) return 1000;
    return region === 'south' ? country.south : country.north;
  })();
  const annualKwh = (totalWp / 1000) * insolation * orientationFactor * tiltFactor;
  const selfConsumedKwh = annualKwh * (selfConsumptionPercent / 100);
  const exportedKwh = Math.max(0, annualKwh - selfConsumedKwh);
  const inverterAnnualKwh = (inverterSelfConsumptionW * 24 * 365) / 1000;
  const solarOffsetKwh = Math.min(inverterAnnualKwh, exportedKwh);
  const inverterNetCost = Math.max(0, (inverterAnnualKwh * importPrice / 100) - (solarOffsetKwh * (importPrice - exportTariff) / 100));

  // Costes mantenimiento recomendados
  const getRecommendedCleaningCostAnnual = (): number => {
    const base = countryCostLevel === 'expensive' ? 150 : 80;
    let years = 2;
    if (climate === 'rainy' && environment === 'rural') years = 2.5;
    else if (climate === 'rainy' && environment === 'urban') years = 2;
    else if (climate === 'dry' && environment === 'rural') years = 1.5;
    else if (climate === 'dry' && environment === 'urban') years = 1;
    return base / years;
  };
  const getRecommendedElectricalCostAnnual = (): number => {
    const base = countryCostLevel === 'expensive' ? 120 : 70;
    return base / 4;
  };
  const cleaningCostAnnual = customCleaningCost !== null ? customCleaningCost : (includeMaintenance ? getRecommendedCleaningCostAnnual() : 0);
  const electricalMaintenanceCostAnnual = customElectricalCost !== null ? customElectricalCost : (includeMaintenance ? getRecommendedElectricalCostAnnual() : 0);
  const totalCleaningAndElectricalAnnual = cleaningCostAnnual + electricalMaintenanceCostAnnual;
  const totalAnnualMaintenanceCost = totalCleaningAndElectricalAnnual + inverterNetCost;

  const totalInstallCost = layout ? (
    layout.totalPanels * panelPricePerUnit + inverterCost + mountingCost + scaffoldingCost + electricalCost + labourCost + adminCost
  ) : 0;
  const annualSavingFromSelf = (selfConsumedKwh * importPrice) / 100;
  const annualExportIncome = (exportedKwh * exportTariff) / 100;
  const totalAnnualBenefitBeforeMaintenance = annualSavingFromSelf + annualExportIncome;
  const totalAnnualBenefit = Math.max(0, totalAnnualBenefitBeforeMaintenance - totalAnnualMaintenanceCost);
  const paybackYears = totalInstallCost > 0 && totalAnnualBenefit > 0 ? totalInstallCost / totalAnnualBenefit : 0;
  const roiPercent = totalInstallCost > 0 ? (totalAnnualBenefit / totalInstallCost) * 100 : 0;
  const monthlyBillSaving = totalAnnualBenefit / 12;
  const newMonthlyBill = Math.max(0, monthlyBill - monthlyBillSaving);

  // Auxiliares UI
  const addObstacle = () => setObstacles([...obstacles, { x: 1.5, z: 2.0 }]);
  const removeObstacle = (index: number) => setObstacles(obstacles.filter((_, i) => i !== index));
  const orientationColor = getColorFromFactor(orientationFactor, 0.35, 1.0);
  const tiltColor = getColorFromFactor(tiltFactor, 0.85, 1.0);
  const monoImage = 'https://res.cloudinary.com/dwealmbfi/image/upload/v1779970838/Monocristaline_imbvt7.png';
  const polyImage = 'https://res.cloudinary.com/dwealmbfi/image/upload/v1779971127/afbc2e44-892f-4e87-83f4-b19cc739626d.png';
  const currentPanelImage = PANEL_CATALOG[panelKey].imageType === 'mono' ? monoImage : polyImage;

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-3xl font-light mb-6 text-center">Solar Panel Designer – Interactive</h2>

      {/* ==================== 1. ROOF ORIENTATION ==================== */}
      <div className="bg-gray-100 p-4 rounded-lg mb-6">
        <h3 className="font-bold text-xl mb-3">1. 🧭 Roof Orientation</h3>
        <div className="flex flex-col items-center">
          <div className="relative w-48 h-48 mb-4">
            <div className="absolute inset-0 rounded-full border-4 border-gray-700"></div>
            <div className="absolute top-1/2 left-1/2 w-0.5 h-20 bg-gray-600 origin-bottom transform -translate-x-1/2 -translate-y-full rotate-0"></div>
            <div className="absolute top-1/2 left-1/2 w-0.5 h-20 bg-gray-600 origin-bottom transform -translate-x-1/2 -translate-y-full rotate-90"></div>
            <div className="absolute top-1/2 left-1/2 w-0.5 h-20 bg-gray-600 origin-bottom transform -translate-x-1/2 -translate-y-full rotate-180"></div>
            <div className="absolute top-1/2 left-1/2 w-0.5 h-20 bg-gray-600 origin-bottom transform -translate-x-1/2 -translate-y-full -rotate-90"></div>
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 font-bold text-sm">N</div>
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 font-bold text-sm">S</div>
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 font-bold text-sm">W</div>
            <div className="absolute right-0 top-1/2 transform -translate-y-1/2 font-bold text-sm">E</div>
            <div className="absolute top-1/2 left-1/2 w-0 h-0" style={{ transform: `translate(-50%, -50%) rotate(${orientationDeg}deg)`, transformOrigin: 'center' }}>
              <div style={{ width: 0, height: 0, borderLeft: '8px solid transparent', borderRight: '8px solid transparent', borderBottom: `24px solid ${orientationColor}`, position: 'relative', left: '-8px', top: '-36px' }} />
              <div style={{ position: 'absolute', width: '2px', height: '36px', backgroundColor: orientationColor, left: '-1px', top: '-12px' }} />
            </div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl">🏠</div>
          </div>
          <div className="w-full max-w-md">
            <label className="block text-center font-medium">Degrees from North:</label>
            <input type="range" min="0" max="360" step="1" value={orientationDeg} onChange={(e) => setOrientationDeg(parseInt(e.target.value))} className="w-full" />
            <p className="text-center text-sm mt-1"><strong>{orientationDeg}°</strong> → Factor: <strong>{orientationFactor.toFixed(2)}</strong></p>
            <p className="text-xs text-center text-gray-500">0°=N, 90°=E, 180°=S, 270°=W</p>
          </div>
        </div>
      </div>

      {/* ==================== 2. SOLAR PANEL PITCH ==================== */}
      <div className="bg-gray-100 p-4 rounded-lg mb-6">
        <h3 className="font-bold text-xl mb-3">2. 📐 Solar Panel Pitch (Tilt)</h3>
        <div className="flex flex-col items-center">
          <svg width="300" height="150" viewBox="0 0 300 150" className="mx-auto">
            <line x1="20" y1="130" x2="280" y2="130" stroke="#666" strokeWidth="2" />
            <g transform={`translate(150, 130) rotate(${-tiltDeg})`}>
              <rect x="-40" y="-70" width="80" height="10" fill="#4A90D9" stroke="#333" strokeWidth="1" />
              <rect x="-40" y="-70" width="80" height="3" fill="#FFD700" opacity="0.6" />
            </g>
            <path d={`M 110 130 A 40 40 0 0 1 ${150 - 40 * Math.sin(tiltDeg * Math.PI / 180)} ${130 - 40 * Math.cos(tiltDeg * Math.PI / 180)}`} fill="none" stroke="#888" strokeWidth="1.5" strokeDasharray="4" />
            <text x="105" y="115" fontSize="12" fill="#333">{tiltDeg}°</text>
          </svg>
          <div className="w-full max-w-md mt-2">
            <label className="block text-center font-medium">Tilt degrees:</label>
            <input type="range" min="0" max="60" step="1" value={tiltDeg} onChange={(e) => setTiltDeg(parseInt(e.target.value))} className="w-full" />
            <p className="text-center text-sm mt-1"><strong>{tiltDeg}°</strong> → Factor: <strong>{tiltFactor.toFixed(2)}</strong></p>
            <p className="text-center text-xs text-gray-500">Optimal ~35° (green)</p>
          </div>
        </div>
      </div>

      {/* ==================== 3. SOLAR PANEL + INVERTER ==================== */}
      <div className="bg-blue-50 p-4 rounded-lg mb-6">
        <h3 className="font-bold text-xl mb-3">3. 🔧 Solar Panel + Inverter</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium">Panel type:</label>
            <select value={panelKey} onChange={(e) => setPanelKey(e.target.value as PanelKey)} className="border p-2 rounded w-full">
              <option value="perc">PERC – £{PANEL_CATALOG.perc.price}</option>
              <option value="topcon">TOPCon – £{PANEL_CATALOG.topcon.price}</option>
              <option value="hjt">HJT – £{PANEL_CATALOG.hjt.price}</option>
              <option value="ibc">IBC – £{PANEL_CATALOG.ibc.price}</option>
              <option value="poly">Polycrystalline – £{PANEL_CATALOG.poly.price}</option>
            </select>
            <div className="mt-2 flex justify-center"><img src={currentPanelImage} alt="panel" className="h-16 w-auto rounded shadow" /></div>
          </div>
          <div>
            <label className="block font-medium">Inverter type (cost):</label>
            <select value={inverterType} onChange={(e) => setInverterType(e.target.value as any)} className="border p-2 rounded w-full mb-2">
              <option value="string">String inverter – £900</option>
              <option value="micro">Microinverters – £1400</option>
              <option value="hybrid">Hybrid (battery ready) – £1600</option>
            </select>
            <label className="block font-medium mt-2">Inverter model (standby power):</label>
            <select value={selectedInverterModel} onChange={(e) => setSelectedInverterModel(e.target.value)} className="border p-2 rounded w-full">
              <option value="none">None (0 W) – ideal</option>
              <option value="huawei">Huawei SUN2000 – 2 W</option>
              <option value="sma">SMA Sunny Boy – 3 W</option>
              <option value="solaredge">SolarEdge HD‑Wave – 2 W</option>
              <option value="fronius">Fronius GEN24 – 3 W</option>
              <option value="custom">Custom value (enter below)</option>
            </select>
            {selectedInverterModel === 'custom' && (
              <input type="number" step="1" value={customInverterW} onChange={(e) => setCustomInverterW(parseFloat(e.target.value) || 0)} placeholder="Watts" className="border p-1 rounded w-full mt-1" />
            )}
            <p className="text-xs text-gray-500 mt-1">This standby consumption will be deducted from your savings.</p>
          </div>
        </div>
        <div className="mt-3">
          <label className="block font-medium">Roof dimensions & obstacles:</label>
          <div className="grid grid-cols-2 gap-2">
            <input type="number" step="0.5" value={roofLength} onChange={(e) => setRoofLength(parseFloat(e.target.value))} placeholder="Length (m)" className="border p-1 rounded" />
            <input type="number" step="0.5" value={roofWidth} onChange={(e) => setRoofWidth(parseFloat(e.target.value))} placeholder="Width (m)" className="border p-1 rounded" />
          </div>
          <button onClick={addObstacle} className="bg-gray-500 text-white px-3 py-1 rounded mt-2">+ Add chimney obstacle</button>
          {obstacles.map((_, idx) => (<button key={idx} onClick={() => removeObstacle(idx)} className="bg-red-500 text-white px-2 py-1 rounded text-sm ml-2">Remove {idx+1}</button>))}
        </div>
      </div>

      {/* ==================== 4. COST ESTIMATE ==================== */}
      <div className="bg-indigo-50 p-4 rounded-lg mb-6">
        <h3 className="font-bold text-xl mb-3">4. 💷 Cost Estimate (one‑time, 0% VAT)</h3>
        <div className="grid md:grid-cols-3 gap-3 text-sm">
          <div className="flex justify-between"><label>Panel price (£/panel):</label><input type="number" value={panelPricePerUnit} onChange={(e) => setPanelPricePerUnit(parseFloat(e.target.value))} className="border p-1 rounded w-28 text-right" step="5" /></div>
          <div className="flex justify-between"><label>Inverter cost (£):</label><input type="number" value={inverterCost} onChange={(e) => setInverterCost(parseFloat(e.target.value))} className="border p-1 rounded w-28 text-right" step="50" /></div>
          <div className="flex justify-between"><label>Mounting system (£):</label><input type="number" value={mountingCost} onChange={(e) => setMountingCost(parseFloat(e.target.value))} className="border p-1 rounded w-28 text-right" step="50" /></div>
          <div className="flex justify-between"><label>Scaffolding (£):</label><input type="number" value={scaffoldingCost} onChange={(e) => setScaffoldingCost(parseFloat(e.target.value))} className="border p-1 rounded w-28 text-right" step="50" /></div>
          <div className="flex justify-between"><label>Electrical components (£):</label><input type="number" value={electricalCost} onChange={(e) => setElectricalCost(parseFloat(e.target.value))} className="border p-1 rounded w-28 text-right" step="50" /></div>
          <div className="flex justify-between"><label>Labour (MCS) (£):</label><input type="number" value={labourCost} onChange={(e) => setLabourCost(parseFloat(e.target.value))} className="border p-1 rounded w-28 text-right" step="50" /></div>
          <div className="flex justify-between"><label>MCS/DNO admin (£):</label><input type="number" value={adminCost} onChange={(e) => setAdminCost(parseFloat(e.target.value))} className="border p-1 rounded w-28 text-right" step="25" /></div>
        </div>
        <div className="text-right font-bold mt-2">Total installation cost: <span className="text-lg">£{totalInstallCost.toFixed(0)}</span></div>

        {/* Opción de mantenimiento anual */}
        <div className="mt-4 border-t pt-3">
          <label className="flex items-center gap-2"><input type="checkbox" checked={includeMaintenance} onChange={(e) => setIncludeMaintenance(e.target.checked)} /> Include annual cleaning & electrical maintenance</label>
          {includeMaintenance && (
            <div className="grid md:grid-cols-2 gap-3 mt-2 text-sm">
              <select value={environment} onChange={(e) => setEnvironment(e.target.value as any)} className="border p-1 rounded"><option value="urban">Urban (more dust)</option><option value="rural">Rural (less dust)</option></select>
              <select value={climate} onChange={(e) => setClimate(e.target.value as any)} className="border p-1 rounded"><option value="rainy">Rainy (natural cleaning)</option><option value="dry">Dry (frequent cleaning)</option></select>
              <select value={countryCostLevel} onChange={(e) => setCountryCostLevel(e.target.value as any)} className="border p-1 rounded"><option value="expensive">Expensive country</option><option value="economical">Economical country</option></select>
              <div><label>Cleaning cost (£/year):</label><input type="number" step="5" value={customCleaningCost !== null ? customCleaningCost : cleaningCostAnnual} onChange={(e) => setCustomCleaningCost(e.target.value === '' ? null : parseFloat(e.target.value))} className="border p-1 rounded w-full" /></div>
              <div><label>Electrical inspection (£/year):</label><input type="number" step="5" value={customElectricalCost !== null ? customElectricalCost : electricalMaintenanceCostAnnual} onChange={(e) => setCustomElectricalCost(e.target.value === '' ? null : parseFloat(e.target.value))} className="border p-1 rounded w-full" /></div>
            </div>
          )}
        </div>
      </div>

      {/* ==================== 5. LOCATION + SEASONAL PRODUCTION ==================== */}
      <div className="bg-green-50 p-4 rounded-lg mb-6">
        <h3 className="font-bold text-xl mb-3">5. 🌍 Location & Seasonal Production</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div><label>Country:</label><select value={selectedCountry} onChange={(e) => setSelectedCountry(e.target.value)} className="border p-2 rounded w-full">{countriesInsolation.map(c => <option key={c.name}>{c.name}</option>)}</select></div>
          <div><label>Region:</label><select value={region} onChange={(e) => setRegion(e.target.value as any)} className="border p-2 rounded w-full"><option value="south">Southern half</option><option value="north">Northern half</option></select></div>
        </div>
        <p className="text-sm mt-2">Base insolation: {insolation} kWh/kWp/year (south, optimal tilt)</p>
        <div className="mt-3">
          <p className="font-semibold">📅 Estimated seasonal production:</p>
          <div className="grid grid-cols-4 gap-2 text-center text-sm">
            <div className="bg-white p-1 rounded">🌱 Spring<br/>{(annualKwh * 0.25).toFixed(0)} kWh</div>
            <div className="bg-white p-1 rounded">☀️ Summer<br/>{(annualKwh * 0.40).toFixed(0)} kWh</div>
            <div className="bg-white p-1 rounded">🍂 Autumn<br/>{(annualKwh * 0.20).toFixed(0)} kWh</div>
            <div className="bg-white p-1 rounded">❄️ Winter<br/>{(annualKwh * 0.15).toFixed(0)} kWh</div>
          </div>
        </div>
      </div>

      {/* ==================== 6. FINANCIAL ANALYSIS ==================== */}
      <div className="bg-purple-50 p-4 rounded-lg mb-6">
        <h3 className="font-bold text-xl mb-3">6. 💰 Financial Analysis</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label>Annual generation: <strong>{annualKwh.toFixed(0)} kWh</strong></label>
            <label className="block mt-2">Self-consumption vs Export:</label>
            <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden my-1">
              <div className="h-full text-center text-xs text-white font-medium" style={{ width: `${selfConsumptionPercent}%`, background: `linear-gradient(90deg, #22c55e, ${selfConsumptionPercent > 50 ? '#eab308' : '#ef4444'})` }}>
                {selfConsumptionPercent}%
              </div>
            </div>
            <input type="range" min="0" max="100" step="5" value={selfConsumptionPercent} onChange={(e) => setSelfConsumptionPercent(parseInt(e.target.value))} className="w-full" />
            <p className="text-xs">{selfConsumptionPercent}% self-consumed, {100-selfConsumptionPercent}% exported</p>
          </div>
          <div>
            <div className="flex justify-between"><span>Export tariff (p/kWh):</span><input type="number" step="0.5" value={exportTariff} onChange={(e) => setExportTariff(parseFloat(e.target.value))} className="border p-1 rounded w-28 text-right" /></div>
            <div className="flex justify-between mt-1"><span>Monthly bill (£):</span><input type="number" step="10" value={monthlyBill} onChange={(e) => setMonthlyBill(parseFloat(e.target.value))} className="border p-1 rounded w-28 text-right" /></div>
          </div>
        </div>
      </div>

      {/* ==================== 7. RESULTS (large & bold) ==================== */}
      {layout && (
        <div className="bg-gray-800 text-white p-6 rounded-lg mb-4">
          <h3 className="font-bold text-2xl mb-4">📊 7. RESULTS</h3>
          <div className="text-lg space-y-2">
            <p><strong className="text-xl">📐 Layout:</strong> {layout.totalPanels} panels, {layout.cols} columns × {layout.rows} rows, {(layout.totalPanels * 1.0 * 1.7).toFixed(1)} m² area</p>
            <p><strong className="text-xl">⚡ Power:</strong> {totalWp.toFixed(0)} Wp</p>
            <p><strong className="text-xl">💰 Installation cost (one‑time):</strong> £{totalInstallCost.toFixed(0)}</p>
            <p><strong className="text-xl">🔄 Annual maintenance cost:</strong> £{totalAnnualMaintenanceCost.toFixed(1)}</p>
            <p><strong className="text-xl">✅ Annual benefit (after all costs):</strong> £{totalAnnualBenefit.toFixed(0)}</p>
            <p><strong className="text-xl">🏠 New monthly bill:</strong> £{newMonthlyBill.toFixed(0)} (saving £{monthlyBillSaving.toFixed(0)}/month)</p>
            <p><strong className="text-xl">📅 Payback period:</strong> {paybackYears.toFixed(1)} years</p>
            <p><strong className="text-3xl text-green-400">📈 ROI: {roiPercent.toFixed(1)}%</strong> 
              {roiPercent >= 12 && <span className="ml-2 text-green-300">✨ Excellent ( > stock market)</span>}
              {roiPercent >= 6 && roiPercent < 12 && <span className="ml-2 text-yellow-300">👍 Good</span>}
              {roiPercent < 6 && roiPercent > 0 && <span className="ml-2 text-red-300">⚠️ Low</span>}
              {roiPercent <= 0 && <span className="ml-2 text-red-400">❌ Not profitable</span>}
            </p>
            {inverterSelfConsumptionW > 0 && (
              <p className="text-sm text-gray-300">* Inverter standby cost already included (model: {selectedInverterModel}, {inverterSelfConsumptionW} W).</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SolarPanelCalculator;
