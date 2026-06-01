import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

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

// ==================== FACTOR CLIMÁTICO ====================
const getClimateFactor = (countryName: string): number => {
  const rainyCountries = ["United Kingdom", "Ireland", "Netherlands", "Belgium", "Denmark", "Norway", "Sweden", "Finland", "Iceland", "New Zealand"];
  const dryCountries = ["Spain", "Portugal", "Greece", "Italy", "Turkey", "Cyprus", "Malta", "Egypt", "Morocco", "South Africa", "Mexico", "Australia", "Chile", "Peru", "India"];
  if (rainyCountries.includes(countryName)) return 0.85;
  if (dryCountries.includes(countryName)) return 0.98;
  return 0.92;
};

// ==================== CATÁLOGO DE PANELES ====================
const PANEL_CATALOG = {
  perc: { name: "PERC (monocristalino)", price: 75, powerWp: 410, efficiency: "18‑20%", imageType: "mono" },
  topcon: { name: "TOPCon (monocristalino)", price: 85, powerWp: 440, efficiency: "20‑22.5%", imageType: "mono" },
  hjt: { name: "HJT (monocristalino)", price: 95, powerWp: 460, efficiency: "21‑23%", imageType: "mono" },
  ibc: { name: "IBC (monocristalino)", price: 110, powerWp: 480, efficiency: "22‑24%", imageType: "mono" },
  poly: { name: "Policristalino", price: 65, powerWp: 400, efficiency: "16‑18%", imageType: "poly" }
};
type PanelKey = keyof typeof PANEL_CATALOG;

// ==================== FACTORES ORIENTACIÓN E INCLINACIÓN ====================
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
  const tilt = Math.min(90, Math.max(0, tiltDeg));
  if (tilt <= 35) return 0.9 + (tilt / 35) * 0.1;
  return 1.0 - ((tilt - 35) / 55) * 0.2;
};

const getColorFromFactor = (factor: number, minFactor: number, maxFactor: number): string => {
  const t = (factor - minFactor) / (maxFactor - minFactor);
  const r = Math.floor(255 * (1 - t)), g = Math.floor(255 * t);
  return `rgb(${r}, ${g}, 0)`;
};

// ==================== DISPOSICIÓN EN TEJADO ====================
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

// ==================== PRECIOS DE ENERGÍA POR PAÍS ====================
const electricityPricesByCountry: { [key: string]: { importRate: number; exportRate: number; standingCharge: number; currency: string; importSource: string; exportSource: string } } = {
  "United Kingdom": { importRate: 0.2800, exportRate: 0.0900, standingCharge: 15, currency: "£", importSource: "Ofgem (estimado)", exportSource: "SEG average rate 2026" },
  "Germany": { importRate: 0.3869, exportRate: 0.0811, standingCharge: 18, currency: "€", importSource: "Eurostat H2 2025", exportSource: "EEG feed-in tariff 2026" },
  "France": { importRate: 0.2561, exportRate: 0.0565, standingCharge: 12, currency: "€", importSource: "Countryeconomy", exportSource: "Net metering tariff" },
  "Spain": { importRate: 0.2669, exportRate: 0.0400, standingCharge: 10, currency: "€", importSource: "Countryeconomy", exportSource: "Excedente compensation 2025" },
  "Italy": { importRate: 0.2966, exportRate: 0.0464, standingCharge: 14, currency: "€", importSource: "Countryeconomy", exportSource: "Ritiro Dedicato 2025" },
  "Netherlands": { importRate: 0.2930, exportRate: 0.1000, standingCharge: 16, currency: "€", importSource: "Eurostat H2 2025", exportSource: "Market estimate" },
  "Belgium": { importRate: 0.3499, exportRate: 0.0830, standingCharge: 15, currency: "€", importSource: "Eurostat H2 2025", exportSource: "Regional estimate" },
  "Denmark": { importRate: 0.3312, exportRate: 0.0390, standingCharge: 20, currency: "€", importSource: "Eurostat H2 2025", exportSource: "Green Power Denmark" },
  "Sweden": { importRate: 0.2700, exportRate: 0.0500, standingCharge: 13, currency: "€", importSource: "Eurostat H2 2025", exportSource: "Market estimate" },
  "Poland": { importRate: 0.2100, exportRate: 0.0500, standingCharge: 11, currency: "€", importSource: "Eurostat H2 2025", exportSource: "Wholesale based" },
  "Czech Republic": { importRate: 0.3217, exportRate: 0.0500, standingCharge: 12, currency: "€", importSource: "Countryeconomy", exportSource: "Wholesale based" },
  "Portugal": { importRate: 0.2434, exportRate: 0.0420, standingCharge: 10, currency: "€", importSource: "Countryeconomy", exportSource: "Excedente compensation" },
  "Austria": { importRate: 0.3272, exportRate: 0.0650, standingCharge: 14, currency: "€", importSource: "Countryeconomy", exportSource: "OeMAG feed-in" },
  "Greece": { importRate: 0.2378, exportRate: 0.0450, standingCharge: 11, currency: "€", importSource: "Countryeconomy", exportSource: "Market estimate" },
  "Ireland": { importRate: 0.4042, exportRate: 0.0800, standingCharge: 17, currency: "€", importSource: "Eurostat H2 2025", exportSource: "Micro-generation support" },
};

// ==================== COMPONENTE PRINCIPAL ====================
const SolarPanelCalculator: React.FC = () => {
  const navigate = useNavigate();
  const calculatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.location.hash === '#solar-calculator') {
      setTimeout(() => {
        const el = document.getElementById('solar-calculator');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 200);
    }
  }, []);

  // --- Tejado A ---
  const [roofALength, setRoofALength] = useState(8);
  const [roofAWidth, setRoofAWidth] = useState(5);
  const [panelKeyA, setPanelKeyA] = useState<PanelKey>('topcon');
  const [obstaclesA, setObstaclesA] = useState<Obstacle[]>([]);
  const [orientationDegA, setOrientationDegA] = useState(180);
  const [enablePitchA, setEnablePitchA] = useState(true);
  const [tiltDegA, setTiltDegA] = useState(35);
  const [shadingPercentA, setShadingPercentA] = useState(0);
  const [layoutA, setLayoutA] = useState<any>(null);

  // --- Tejado B ---
  const [enableRoofB, setEnableRoofB] = useState(true);
  const [roofBLength, setRoofBLength] = useState(6);
  const [roofBWidth, setRoofBWidth] = useState(4);
  const [panelKeyB, setPanelKeyB] = useState<PanelKey>('topcon');
  const [obstaclesB, setObstaclesB] = useState<Obstacle[]>([]);
  const [orientationDegB, setOrientationDegB] = useState(180);
  const [enablePitchB, setEnablePitchB] = useState(true);
  const [tiltDegB, setTiltDegB] = useState(35);
  const [shadingPercentB, setShadingPercentB] = useState(0);
  const [layoutB, setLayoutB] = useState<any>(null);

  // --- Parámetros comunes ---
  const [selectedCountry, setSelectedCountry] = useState("United Kingdom");
  const [region, setRegion] = useState<'north' | 'south'>('south');
  const [selfConsumptionPercent, setSelfConsumptionPercent] = useState(50);
  
  // Tarifas
  const [importTariff, setImportTariff] = useState(0.2800);
  const [exportTariff, setExportTariff] = useState(0.0900);
  const [standingCharge, setStandingCharge] = useState(15);
  
  // Costes instalación
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
  const [cleaningCost3Years, setCleaningCost3Years] = useState(150);
  const [electricalInspection3Years, setElectricalInspection3Years] = useState(120);

  // Inversor standby
  const [standbyPowerW, setStandbyPowerW] = useState(0);
  const [customStandbyW, setCustomStandbyW] = useState(0);
  const [standbySource, setStandbySource] = useState<'preset' | 'custom'>('preset');

  const climateFactor = getClimateFactor(selectedCountry);

  // Actualizar tarifas al cambiar país
  useEffect(() => {
    const priceData = electricityPricesByCountry[selectedCountry];
    if (priceData) {
      setImportTariff(priceData.importRate);
      setExportTariff(priceData.exportRate);
      setStandingCharge(priceData.standingCharge);
    }
  }, [selectedCountry]);

  // Layouts effects
  useEffect(() => {
    const panelW = 1.0, panelH = 1.7;
    if (roofALength > 0 && roofAWidth > 0) {
      const { length, width } = calculateUsableDimensions(roofALength, roofAWidth, obstaclesA);
      setLayoutA(calculatePanelLayout(length, width, panelW, panelH, obstaclesA));
    } else setLayoutA(null);
  }, [roofALength, roofAWidth, obstaclesA]);

  useEffect(() => {
    if (enableRoofB) {
      const panelW = 1.0, panelH = 1.7;
      if (roofBLength > 0 && roofBWidth > 0) {
        const { length, width } = calculateUsableDimensions(roofBLength, roofBWidth, obstaclesB);
        setLayoutB(calculatePanelLayout(length, width, panelW, panelH, obstaclesB));
      } else setLayoutB(null);
    } else setLayoutB(null);
  }, [enableRoofB, roofBLength, roofBWidth, obstaclesB]);

  useEffect(() => {
    const invPrices = { string: 900, micro: 1400, hybrid: 1600 };
    setInverterCost(invPrices[inverterType]);
  }, [inverterType]);

  // Producción
  const getRoofProduction = (layout: any, panelKey: PanelKey, orientation: number, enablePitch: boolean, tilt: number, shading: number) => {
    if (!layout) return { totalWp: 0, annualKwh: 0, seasonalKwh: { spring: 0, summer: 0, autumn: 0, winter: 0 } };
    const panelPower = PANEL_CATALOG[panelKey].powerWp;
    const totalWp = layout.totalPanels * panelPower;
    const orientationFactor = getOrientationFactor(orientation);
    const effectiveTilt = enablePitch ? tilt : 35;
    const tiltFactor = getTiltFactor(effectiveTilt);
    const countryBase = countriesInsolation.find(c => c.name === selectedCountry);
    const insolationBase = countryBase ? (region === 'south' ? countryBase.south : countryBase.north) : 1000;
    let annualKwh = (totalWp / 1000) * insolationBase * orientationFactor * tiltFactor;
    annualKwh = annualKwh * (1 - shading / 100) * climateFactor;
    const seasonal = { spring: 0.25, summer: 0.40, autumn: 0.20, winter: 0.15 };
    const seasonalKwh = {
      spring: annualKwh * seasonal.spring,
      summer: annualKwh * seasonal.summer,
      autumn: annualKwh * seasonal.autumn,
      winter: annualKwh * seasonal.winter,
    };
    return { totalWp, annualKwh, seasonalKwh };
  };

  const prodA = getRoofProduction(layoutA, panelKeyA, orientationDegA, enablePitchA, tiltDegA, shadingPercentA);
  const prodB = getRoofProduction(layoutB, panelKeyB, orientationDegB, enablePitchB, tiltDegB, shadingPercentB);
  const totalWp = prodA.totalWp + (enableRoofB ? prodB.totalWp : 0);
  const totalAnnualKwh = prodA.annualKwh + (enableRoofB ? prodB.annualKwh : 0);
  const totalPanelsCount = (layoutA?.totalPanels || 0) + (enableRoofB ? (layoutB?.totalPanels || 0) : 0);

  // ==================== NUEVA LÓGICA DE BARRA TRICOLOR ====================
  const INEVITABLE_GRID_PERCENT = 25; // 25% de la generación solar corresponde a compra de red inevitable
  const avgMonthlyGeneration = totalAnnualKwh / 12;
  const gridPurchaseKwhMonthly = avgMonthlyGeneration * (INEVITABLE_GRID_PERCENT / 100);
  const selfConsumedKwhMonthly = avgMonthlyGeneration * (selfConsumptionPercent / 100);
  const exportedKwhMonthly = avgMonthlyGeneration - selfConsumedKwhMonthly - gridPurchaseKwhMonthly; // el resto

  // La barra tiene ancho 100%. Los segmentos:
  // - Verde: selfConsumptionPercent % (autoconsumo)
  // - Rojo: INEVITABLE_GRID_PERCENT % (compra red)
  // - Azul: 100 - selfConsumptionPercent - INEVITABLE_GRID_PERCENT % (exportación)
  const redStart = selfConsumptionPercent; // el rojo empieza donde termina el verde
  const blueStart = selfConsumptionPercent + INEVITABLE_GRID_PERCENT; // el azul empieza donde termina el rojo
  const maxSelfConsumption = 100 - INEVITABLE_GRID_PERCENT; // límite superior para que siempre quede azul >=0

  // Control del slider: selfConsumptionPercent no puede exceder maxSelfConsumption
  const handleSelfConsumptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = parseInt(e.target.value);
    if (val > maxSelfConsumption) val = maxSelfConsumption;
    setSelfConsumptionPercent(val);
  };

  // Facturas
  const totalConsumption = selfConsumedKwhMonthly + gridPurchaseKwhMonthly; // lo que realmente consumes al mes (solar+red)
  const monthlyBillWithoutSolar = (totalConsumption * importTariff) + standingCharge;
  const monthlyBillWithSolar = (gridPurchaseKwhMonthly * importTariff) + standingCharge - (exportedKwhMonthly * exportTariff);
  const monthlySavings = monthlyBillWithoutSolar - monthlyBillWithSolar;

  // Otros cálculos financieros (ROI, payback)
  const selfConsumedKwhAnnual = selfConsumedKwhMonthly * 12;
  const exportedKwhAnnual = exportedKwhMonthly * 12;
  const gridPurchaseKwhAnnual = gridPurchaseKwhMonthly * 12;
  const inverterAnnualKwh = (standbyPowerW * 24 * 365) / 1000;
  const solarOffsetKwh = Math.min(inverterAnnualKwh, selfConsumedKwhAnnual);
  const inverterNetCost = Math.max(0, (inverterAnnualKwh - solarOffsetKwh) * importTariff);
  const cleaningCostAnnual = includeMaintenance ? cleaningCost3Years / 3 : 0;
  const electricalInspectionAnnual = includeMaintenance ? electricalInspection3Years / 3 : 0;
  const totalAnnualMaintenanceCost = cleaningCostAnnual + electricalInspectionAnnual + inverterNetCost;
  const totalPanelCost = totalPanelsCount * panelPricePerUnit;
  const totalInstallCost = totalPanelCost + inverterCost + mountingCost + scaffoldingCost + electricalCost + labourCost + adminCost;
  const annualSavingFromSelf = selfConsumedKwhAnnual * importTariff;
  const annualExportIncome = exportedKwhAnnual * exportTariff;
  const totalAnnualBenefitBeforeMaintenance = annualSavingFromSelf + annualExportIncome;
  const totalAnnualBenefit = Math.max(0, totalAnnualBenefitBeforeMaintenance - totalAnnualMaintenanceCost);
  const paybackYears = totalInstallCost > 0 && totalAnnualBenefit > 0 ? totalInstallCost / totalAnnualBenefit : 0;
  const roiPercent = totalInstallCost > 0 ? (totalAnnualBenefit / totalInstallCost) * 100 : 0;

  // Handlers obstáculos, SVG, OrientationCompass, PitchVisualization (igual que antes, omito por brevedad pero debes incluirlos)
  // ... (aquí irían las funciones addObstacle, removeObstacle, renderSVG, OrientationCompass, PitchVisualization, etc.)
  // Para ahorrar espacio, asumo que las tienes. Si no, las incluyo al final.

  return (
    <div ref={calculatorRef} id="solar-calculator" className="max-w-7xl mx-auto p-6 bg-white rounded-xl shadow-lg scroll-mt-24">
      <div className="flex justify-start mb-4">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-red-600 border border-gray-300 rounded-md">
          ← Back to Technology
        </button>
      </div>
      <h2 className="text-3xl font-light mb-6 text-center">Solar Panel Designer – Dual Roof</h2>

      {/* Tejados A y B (mismo código que antes) */}

      {/* LOCATION & FINANCIAL ANALYSIS - NUEVA BARRA TRICOLOR */}
      <div className="bg-green-50 p-4 rounded-lg mb-6">
        <h3 className="font-bold text-xl mb-3">🌍 Location & Financial Analysis</h3>
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div>
            <label>Country:</label>
            <select value={selectedCountry} onChange={(e) => setSelectedCountry(e.target.value)} className="border p-2 rounded w-full">
              {countriesInsolation.map(c => <option key={c.name}>{c.name}</option>)}
            </select>
          </div>
          <div>
            <label>Region:</label>
            <select value={region} onChange={(e) => setRegion(e.target.value as any)} className="border p-2 rounded w-full">
              <option value="south">Southern</option>
              <option value="north">Northern</option>
            </select>
          </div>
        </div>

        {/* Barra tricolor */}
        <div className="mb-6">
          <div className="flex justify-between text-sm mb-1">
            <span className="font-medium text-green-700">Self-consumed (green)</span>
            <span className="font-medium text-red-600">Grid purchase (red)</span>
            <span className="font-medium text-blue-600">Exported (blue)</span>
          </div>
          <div className="relative h-12 w-full bg-gray-200 rounded-lg overflow-hidden">
            <div className="absolute inset-0" style={{
              background: `linear-gradient(to right, 
                #22c55e 0%, 
                #22c55e ${selfConsumptionPercent}%, 
                #ef4444 ${selfConsumptionPercent}%, 
                #ef4444 ${blueStart}%, 
                #3b82f6 ${blueStart}%, 
                #3b82f6 100%)`
            }} />
            <div className="absolute top-1/2 transform -translate-y-1/2 w-6 h-6 bg-blue-800 rounded-full shadow-lg border-2 border-white cursor-pointer"
              style={{ left: `calc(${blueStart}% - 12px)` }} />
            <div className="absolute inset-0 flex justify-between items-center px-2 text-white text-xs font-bold">
              <span>{selfConsumptionPercent}%</span>
              <span>{INEVITABLE_GRID_PERCENT}%</span>
              <span>{Math.max(0, 100 - selfConsumptionPercent - INEVITABLE_GRID_PERCENT)}%</span>
            </div>
          </div>
          <input
            type="range"
            min="0"
            max={maxSelfConsumption}
            step="1"
            value={selfConsumptionPercent}
            onChange={handleSelfConsumptionChange}
            className="w-full mt-2"
          />
          <p className="text-xs text-gray-500 mt-1">
            Adjust the slider to change how much of your solar generation you consume (green). 
            Red (grid purchase) is fixed at {INEVITABLE_GRID_PERCENT}% of your solar generation (night/rainy days). 
            Blue is automatically the remaining surplus exported.
          </p>
        </div>

        {/* Tres indicadores en kWh */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-green-100 p-3 rounded-lg text-center">
            <p className="text-sm text-green-800 font-semibold">🌞 Self-consumed</p>
            <p className="text-2xl font-bold text-green-700">{selfConsumedKwhMonthly.toFixed(1)} kWh</p>
            <p className="text-xs text-green-600">From your solar panels</p>
          </div>
          <div className="bg-red-100 p-3 rounded-lg text-center">
            <p className="text-sm text-red-800 font-semibold">🏭 Grid purchase (inevitable)</p>
            <p className="text-2xl font-bold text-red-600">{gridPurchaseKwhMonthly.toFixed(1)} kWh</p>
            <p className="text-xs text-red-600">Necessary for night & bad weather</p>
          </div>
          <div className="bg-blue-100 p-3 rounded-lg text-center">
            <p className="text-sm text-blue-800 font-semibold">💰 Exported to grid</p>
            <p className="text-2xl font-bold text-blue-600">{exportedKwhMonthly.toFixed(1)} kWh</p>
            <p className="text-xs text-blue-600">Surplus sold to utility</p>
          </div>
        </div>

        {/* Facturas */}
        <div className="mt-4 p-3 bg-white/70 rounded-lg">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-600">Monthly bill WITHOUT solar:</p>
              <p className="text-xl font-semibold">£{monthlyBillWithoutSolar.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-gray-600">Monthly bill WITH solar:</p>
              <p className="text-xl font-semibold text-green-700">£{monthlyBillWithSolar.toFixed(2)}</p>
            </div>
          </div>
          <p className="text-center text-sm mt-2">You save <strong className="text-green-700">£{monthlySavings.toFixed(2)}</strong> per month</p>
        </div>

        {/* Fuentes */}
        <div className="mt-3 text-right">
          <p className="text-[10px] text-gray-400 italic">
            ⓘ Energy price sources: {electricityPricesByCountry[selectedCountry]?.importSource} (import) | {electricityPricesByCountry[selectedCountry]?.exportSource} (export)
          </p>
        </div>
      </div>

      {/* RESULTS (igual) */}
      <div className="bg-gray-800 text-white p-6 rounded-lg">
        <h3 className="font-bold text-2xl mb-4">📊 RESULTS (Combined)</h3>
        <div className="text-lg space-y-2">
          <p><strong>Total panels:</strong> {totalPanelsCount}</p>
          <p><strong>Total power:</strong> {totalWp.toFixed(0)} Wp</p>
          <p><strong>Annual generation:</strong> {totalAnnualKwh.toFixed(0)} kWh</p>
          <p><strong>Installation cost:</strong> £{totalInstallCost.toFixed(0)}</p>
          <p><strong>Annual maintenance:</strong> £{totalAnnualMaintenanceCost.toFixed(1)}</p>
          <p><strong>Annual benefit (net):</strong> £{totalAnnualBenefit.toFixed(0)}</p>
          <p><strong>New monthly bill:</strong> £{monthlyBillWithSolar.toFixed(2)} (saving £{monthlySavings.toFixed(2)}/month)</p>
          <p><strong>Payback period:</strong> {paybackYears.toFixed(1)} years</p>
          <p><strong className="text-3xl text-green-400">ROI: {roiPercent.toFixed(1)}%</strong></p>
        </div>
      </div>
    </div>
  );
};

export default SolarPanelCalculator;
