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

// ==================== PRECIOS DE ENERGÍA POR PAÍS (IMPORT Y EXPORT) ====================
const electricityPricesByCountry: { [key: string]: { importRate: number; exportRate: number; standingCharge: number; currency: string; importSource: string; exportSource: string } } = {
  "United Kingdom": { 
    importRate: 0.2800, exportRate: 0.0900, standingCharge: 15, currency: "£",
    importSource: "Ofgem (estimado)", exportSource: "SEG average rate 2026" 
  },
  "Germany": { 
    importRate: 0.3869, exportRate: 0.0811, standingCharge: 18, currency: "€",
    importSource: "Eurostat H2 2025", exportSource: "EEG feed-in tariff 2026" 
  },
  "France": { 
    importRate: 0.2561, exportRate: 0.0565, standingCharge: 12, currency: "€",
    importSource: "Countryeconomy", exportSource: "Net metering tariff" 
  },
  "Spain": { 
    importRate: 0.2669, exportRate: 0.0400, standingCharge: 10, currency: "€",
    importSource: "Countryeconomy", exportSource: "Excedente compensation 2025" 
  },
  "Italy": { 
    importRate: 0.2966, exportRate: 0.0464, standingCharge: 14, currency: "€",
    importSource: "Countryeconomy", exportSource: "Ritiro Dedicato 2025" 
  },
  "Netherlands": { 
    importRate: 0.2930, exportRate: 0.1000, standingCharge: 16, currency: "€",
    importSource: "Eurostat H2 2025", exportSource: "Market estimate" 
  },
  "Belgium": { 
    importRate: 0.3499, exportRate: 0.0830, standingCharge: 15, currency: "€",
    importSource: "Eurostat H2 2025", exportSource: "Regional estimate" 
  },
  "Denmark": { 
    importRate: 0.3312, exportRate: 0.0390, standingCharge: 20, currency: "€",
    importSource: "Eurostat H2 2025", exportSource: "Green Power Denmark" 
  },
  "Sweden": { 
    importRate: 0.2700, exportRate: 0.0500, standingCharge: 13, currency: "€",
    importSource: "Eurostat H2 2025", exportSource: "Market estimate" 
  },
  "Poland": { 
    importRate: 0.2100, exportRate: 0.0500, standingCharge: 11, currency: "€",
    importSource: "Eurostat H2 2025", exportSource: "Wholesale based" 
  },
  "Czech Republic": { 
    importRate: 0.3217, exportRate: 0.0500, standingCharge: 12, currency: "€",
    importSource: "Countryeconomy", exportSource: "Wholesale based" 
  },
  "Portugal": { 
    importRate: 0.2434, exportRate: 0.0420, standingCharge: 10, currency: "€",
    importSource: "Countryeconomy", exportSource: "Excedente compensation" 
  },
  "Austria": { 
    importRate: 0.3272, exportRate: 0.0650, standingCharge: 14, currency: "€",
    importSource: "Countryeconomy", exportSource: "OeMAG feed-in" 
  },
  "Greece": { 
    importRate: 0.2378, exportRate: 0.0450, standingCharge: 11, currency: "€",
    importSource: "Countryeconomy", exportSource: "Market estimate" 
  },
  "Ireland": { 
    importRate: 0.4042, exportRate: 0.0800, standingCharge: 17, currency: "€",
    importSource: "Eurostat H2 2025", exportSource: "Micro-generation support" 
  },
};

// ==================== COMPONENTE PRINCIPAL ====================
const SolarPanelCalculator: React.FC = () => {
  const navigate = useNavigate();
  const calculatorRef = useRef<HTMLDivElement>(null);

  // Scroll suave SOLO si se accede con el hash (desde Tools)
  useEffect(() => {
    if (window.location.hash === '#solar-calculator') {
      setTimeout(() => {
        const el = document.getElementById('solar-calculator');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 200);
    }
  }, []);

  // --- Estados para Tejado A ---
  const [roofALength, setRoofALength] = useState(8);
  const [roofAWidth, setRoofAWidth] = useState(5);
  const [panelKeyA, setPanelKeyA] = useState<PanelKey>('topcon');
  const [obstaclesA, setObstaclesA] = useState<Obstacle[]>([]);
  const [orientationDegA, setOrientationDegA] = useState(180);
  const [enablePitchA, setEnablePitchA] = useState(true);
  const [tiltDegA, setTiltDegA] = useState(35);
  const [shadingPercentA, setShadingPercentA] = useState(0);
  const [layoutA, setLayoutA] = useState<{ totalPanels: number; cols: number; rows: number; panelPositions: { x: number; z: number }[] } | null>(null);

  // --- Estados para Tejado B ---
  const [enableRoofB, setEnableRoofB] = useState(true);
  const [roofBLength, setRoofBLength] = useState(6);
  const [roofBWidth, setRoofBWidth] = useState(4);
  const [panelKeyB, setPanelKeyB] = useState<PanelKey>('topcon');
  const [obstaclesB, setObstaclesB] = useState<Obstacle[]>([]);
  const [orientationDegB, setOrientationDegB] = useState(180);
  const [enablePitchB, setEnablePitchB] = useState(true);
  const [tiltDegB, setTiltDegB] = useState(35);
  const [shadingPercentB, setShadingPercentB] = useState(0);
  const [layoutB, setLayoutB] = useState<{ totalPanels: number; cols: number; rows: number; panelPositions: { x: number; z: number }[] } | null>(null);

  // --- Parámetros comunes ---
  const [selectedCountry, setSelectedCountry] = useState("United Kingdom");
  const [region, setRegion] = useState<'north' | 'south'>('south');
  const [selfConsumptionPercent, setSelfConsumptionPercent] = useState(50);
  
  // NUEVO: Consumo mensual del hogar (kWh/mes) que introduce el usuario
  const [monthlyConsumption, setMonthlyConsumption] = useState(300);
  
  // Tarifas de energía (se actualizan al cambiar país)
  const [importTariff, setImportTariff] = useState(0.2800);
  const [exportTariff, setExportTariff] = useState(0.0900);
  const [standingCharge, setStandingCharge] = useState(15);
  
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
  const [cleaningCost3Years, setCleaningCost3Years] = useState(150);
  const [electricalInspection3Years, setElectricalInspection3Years] = useState(120);

  // Inversor standby
  const [standbyPowerW, setStandbyPowerW] = useState(0);
  const [customStandbyW, setCustomStandbyW] = useState(0);
  const [standbySource, setStandbySource] = useState<'preset' | 'custom'>('preset');

  const climateFactor = getClimateFactor(selectedCountry);

  // Efecto para actualizar tarifas al cambiar de país
  useEffect(() => {
    const priceData = electricityPricesByCountry[selectedCountry];
    if (priceData) {
      setImportTariff(priceData.importRate);
      setExportTariff(priceData.exportRate);
      setStandingCharge(priceData.standingCharge);
    }
  }, [selectedCountry]);

  // Effects para layouts
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

  // Cálculo de producción por tejado
  const getRoofProduction = (layout: typeof layoutA, panelKey: PanelKey, orientation: number, enablePitch: boolean, tilt: number, shading: number) => {
    if (!layout) return { totalWp: 0, annualKwh: 0, seasonalKwh: { spring: 0, summer: 0, autumn: 0, winter: 0 }, orientationFactor: 0, tiltFactor: 0 };
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
    return { totalWp, annualKwh, seasonalKwh, orientationFactor, tiltFactor };
  };

  const prodA = getRoofProduction(layoutA, panelKeyA, orientationDegA, enablePitchA, tiltDegA, shadingPercentA);
  const prodB = getRoofProduction(layoutB, panelKeyB, orientationDegB, enablePitchB, tiltDegB, shadingPercentB);
  const totalWp = prodA.totalWp + (enableRoofB ? prodB.totalWp : 0);
  const totalAnnualKwh = prodA.annualKwh + (enableRoofB ? prodB.annualKwh : 0);
  const totalPanelsCount = (layoutA?.totalPanels || 0) + (enableRoofB ? (layoutB?.totalPanels || 0) : 0);

  // Cálculos financieros (para beneficio anual, ROI, payback)
  const selfConsumedKwhAnnual = totalAnnualKwh * (selfConsumptionPercent / 100);
  const exportedKwhAnnual = Math.max(0, totalAnnualKwh - selfConsumedKwhAnnual);
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

  // Valores mensuales para la nueva barra interactiva
  const avgMonthlyGeneration = totalAnnualKwh / 12;
  const selfConsumedKwhMonthly = avgMonthlyGeneration * (selfConsumptionPercent / 100);
  const exportedKwhMonthly = avgMonthlyGeneration - selfConsumedKwhMonthly;
  const gridPurchaseKwhMonthly = Math.max(0, monthlyConsumption - selfConsumedKwhMonthly);
  const currencySymbol = electricityPricesByCountry[selectedCountry]?.currency === "€" ? "€" : "£";

  // Handlers obstáculos
  const addObstacle = (roof: 'A' | 'B') => {
    if (roof === 'A') setObstaclesA([...obstaclesA, { x: 1.5, z: 2.0 }]);
    else setObstaclesB([...obstaclesB, { x: 1.5, z: 2.0 }]);
  };
  const removeObstacle = (roof: 'A' | 'B', index: number) => {
    if (roof === 'A') setObstaclesA(obstaclesA.filter((_, i) => i !== index));
    else setObstaclesB(obstaclesB.filter((_, i) => i !== index));
  };

  // Renderizado SVG
  const renderSVG = (layout: typeof layoutA, widthM: number, lengthM: number, obstacles: Obstacle[], title: string) => {
    if (!layout || layout.totalPanels === 0) return <p className="text-sm text-gray-500">No panels fit (check dimensions or obstacles)</p>;
    const scale = 15;
    const svgWidth = lengthM * scale + 20;
    const svgHeight = widthM * scale + 20;
    const panelWpx = 1.0 * scale;
    const panelHpx = 1.7 * scale;
    return (
      <div className="mt-2">
        <p className="font-semibold">{title} – {layout.totalPanels} panels</p>
        <svg width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="border bg-gray-50 mx-auto">
          <rect x="10" y="10" width={lengthM * scale} height={widthM * scale} fill="#e2e8f0" stroke="#475569" strokeWidth="2" />
          {layout.panelPositions.map((pos, idx) => {
            const x = 10 + (pos.x + lengthM/2) * scale;
            const y = 10 + (pos.z + widthM/2) * scale;
            return <rect key={idx} x={x} y={y} width={panelWpx} height={panelHpx} fill="#3b82f6" stroke="#1e3a8a" strokeWidth="1" rx="2" />;
          })}
          {obstacles.map((obs, idx) => {
            const x = 10 + (obs.x + lengthM/2) * scale;
            const y = 10 + (obs.z + widthM/2) * scale;
            return <rect key={idx} x={x - 8} y={y - 8} width="16" height="16" fill="#ef4444" stroke="#7f1d1d" strokeWidth="1" rx="2" />;
          })}
        </svg>
        <p className="text-xs text-center mt-1">Blue: panels, Red: chimneys</p>
      </div>
    );
  };

  // Compás de orientación
  const OrientationCompass = ({ orientation, onChange, color, label }: { orientation: number; onChange: (v: number) => void; color: string; label: string }) => {
    return (
      <div className="flex flex-col items-center">
        <div className="relative w-40 h-40 mb-2">
          <div className="absolute inset-0 rounded-full border-2 border-gray-600"></div>
          <div className="absolute top-1/2 left-1/2 w-0.5 h-16 bg-gray-500 origin-bottom transform -translate-x-1/2 -translate-y-full rotate-0"></div>
          <div className="absolute top-1/2 left-1/2 w-0.5 h-16 bg-gray-500 origin-bottom transform -translate-x-1/2 -translate-y-full rotate-90"></div>
          <div className="absolute top-1/2 left-1/2 w-0.5 h-16 bg-gray-500 origin-bottom transform -translate-x-1/2 -translate-y-full rotate-180"></div>
          <div className="absolute top-1/2 left-1/2 w-0.5 h-16 bg-gray-500 origin-bottom transform -translate-x-1/2 -translate-y-full -rotate-90"></div>
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 font-bold text-xs">N</div>
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 font-bold text-xs">S</div>
          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 font-bold text-xs">W</div>
          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 font-bold text-xs">E</div>
          <div className="absolute top-1/2 left-1/2 w-0 h-0" style={{ transform: `translate(-50%, -50%) rotate(${orientation}deg)`, transformOrigin: 'center' }}>
            <div style={{ width: 0, height: 0, borderLeft: '6px solid transparent', borderRight: '6px solid transparent', borderBottom: `20px solid ${color}`, position: 'relative', left: '-6px', top: '-30px' }} />
            <div style={{ position: 'absolute', width: '2px', height: '30px', backgroundColor: color, left: '-1px', top: '-10px' }} />
          </div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xl">🏠</div>
        </div>
        <label className="text-sm font-medium">{label}</label>
        <input type="range" min="0" max="360" step="1" value={orientation} onChange={(e) => onChange(parseInt(e.target.value))} className="w-full max-w-xs" />
        <p className="text-xs">{orientation}° → factor {getOrientationFactor(orientation).toFixed(2)}</p>
      </div>
    );
  };

  // Visualización inclinación
  const PitchVisualization = ({ tilt, onChange, enabled, setEnabled, label }: { tilt: number; onChange: (v: number) => void; enabled: boolean; setEnabled: (v: boolean) => void; label: string }) => {
    return (
      <div className="flex flex-col items-center">
        <label className="flex items-center gap-2 text-sm font-medium"><input type="checkbox" checked={enabled} onChange={() => setEnabled(!enabled)} /> Custom {label}</label>
        {enabled ? (
          <>
            <svg width="200" height="100" viewBox="0 0 200 100" className="my-2">
              <line x1="20" y1="80" x2="180" y2="80" stroke="#666" strokeWidth="1.5" />
              <g transform={`translate(100, 80) rotate(${-tilt})`}>
                <rect x="-25" y="-45" width="50" height="8" fill="#4A90D9" stroke="#333" strokeWidth="1" />
                <rect x="-25" y="-45" width="50" height="3" fill="#FFD700" opacity="0.6" />
              </g>
              <path d={`M 75 80 A 25 25 0 0 1 ${100 - 25 * Math.sin(tilt * Math.PI / 180)} ${80 - 25 * Math.cos(tilt * Math.PI / 180)}`} fill="none" stroke="#888" strokeWidth="1" strokeDasharray="3" />
              <text x="75" y="70" fontSize="10" fill="#333">{tilt}°</text>
            </svg>
            <input type="range" min="0" max="90" step="1" value={tilt} onChange={(e) => onChange(parseInt(e.target.value))} className="w-full max-w-xs" />
            <p className="text-xs">Factor: {getTiltFactor(tilt).toFixed(2)}</p>
          </>
        ) : (
          <p className="text-sm text-gray-600">Using optimal 35° (factor {getTiltFactor(35).toFixed(2)})</p>
        )}
      </div>
    );
  };

  return (
    <div
      ref={calculatorRef}
      id="solar-calculator"
      className="max-w-7xl mx-auto p-6 bg-white rounded-xl shadow-lg scroll-mt-24"
    >
      {/* BOTÓN PARA VOLVER A TECHNOLOGY */}
      <div className="flex justify-start mb-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-red-600 transition-all duration-200 border border-gray-300 rounded-md hover:border-red-600"
        >
          <span className="text-lg">←</span> 
          <span>Back to Technology</span>
        </button>
      </div>

      <h2 className="text-3xl font-light mb-6 text-center">Solar Panel Designer – Dual Roof</h2>

      {/* TEJADO A */}
      <div className="border-2 border-blue-300 rounded-lg p-4 mb-6">
        <h3 className="font-bold text-xl mb-3">🏠 Roof A</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <OrientationCompass orientation={orientationDegA} onChange={setOrientationDegA} color={getColorFromFactor(getOrientationFactor(orientationDegA), 0.35, 1.0)} label="Orientation A" />
          <PitchVisualization tilt={tiltDegA} onChange={setTiltDegA} enabled={enablePitchA} setEnabled={setEnablePitchA} label="pitch A" />
        </div>
        <div className="grid md:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block">Panel type:</label>
            <select value={panelKeyA} onChange={(e) => setPanelKeyA(e.target.value as PanelKey)} className="border p-1 rounded w-full">
              {Object.entries(PANEL_CATALOG).map(([k, v]) => <option key={k} value={k}>{v.name} – {v.powerWp}Wp, £{v.price}</option>)}
            </select>
          </div>
          <div>
            <label>Roof dimensions (m):</label>
            <div className="flex gap-2"><input type="number" step="0.5" value={roofALength} onChange={(e) => setRoofALength(parseFloat(e.target.value))} placeholder="Length" className="border p-1 rounded w-1/2" /><input type="number" step="0.5" value={roofAWidth} onChange={(e) => setRoofAWidth(parseFloat(e.target.value))} placeholder="Width" className="border p-1 rounded w-1/2" /></div>
          </div>
          <div>
            <label>Shading from trees/buildings (%):</label>
            <input type="range" min="0" max="50" step="1" value={shadingPercentA} onChange={(e) => setShadingPercentA(parseInt(e.target.value))} className="w-full" />
            <p className="text-sm">{shadingPercentA}% reduction</p>
          </div>
          <div>
            <button onClick={() => addObstacle('A')} className="bg-gray-500 text-white px-2 py-1 rounded text-sm">+ Add chimney</button>
            {obstaclesA.map((_, idx) => <button key={idx} onClick={() => removeObstacle('A', idx)} className="bg-red-500 text-white px-2 py-1 rounded text-sm ml-2">Remove {idx+1}</button>)}
          </div>
        </div>
        <div className="mt-4 p-3 bg-blue-50 rounded">
          <p className="text-sm font-semibold">🌦️ Climate factor for {selectedCountry}: <strong>{(climateFactor * 100).toFixed(0)}%</strong> (rain/cloud reduction)</p>
          <p className="text-xs text-gray-600">Based on annual rainy days and cloud cover.</p>
          <div className="mt-2">
            <p className="font-semibold">📅 Seasonal production (after climate & shading):</p>
            <div className="grid grid-cols-4 gap-2 text-center text-sm">
              <div className="bg-white p-1 rounded">🌱 Spring<br/>{prodA.seasonalKwh.spring.toFixed(0)} kWh</div>
              <div className="bg-white p-1 rounded">☀️ Summer<br/>{prodA.seasonalKwh.summer.toFixed(0)} kWh</div>
              <div className="bg-white p-1 rounded">🍂 Autumn<br/>{prodA.seasonalKwh.autumn.toFixed(0)} kWh</div>
              <div className="bg-white p-1 rounded">❄️ Winter<br/>{prodA.seasonalKwh.winter.toFixed(0)} kWh</div>
            </div>
            <p className="text-sm mt-1">Annual: <strong>{prodA.annualKwh.toFixed(0)} kWh</strong> | Power: {prodA.totalWp.toFixed(0)} Wp</p>
          </div>
        </div>
        {renderSVG(layoutA, roofAWidth, roofALength, obstaclesA, `Roof A layout`)}
      </div>

      {/* TEJADO B (activatable) */}
      <div className="border-2 border-green-300 rounded-lg p-4 mb-6">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-xl mb-2">🏠 Roof B</h3>
          <label className="flex items-center gap-2"><input type="checkbox" checked={enableRoofB} onChange={(e) => setEnableRoofB(e.target.checked)} /> Enable Roof B</label>
        </div>
        {enableRoofB && (
          <>
            <div className="grid md:grid-cols-2 gap-6">
              <OrientationCompass orientation={orientationDegB} onChange={setOrientationDegB} color={getColorFromFactor(getOrientationFactor(orientationDegB), 0.35, 1.0)} label="Orientation B" />
              <PitchVisualization tilt={tiltDegB} onChange={setTiltDegB} enabled={enablePitchB} setEnabled={setEnablePitchB} label="pitch B" />
            </div>
            <div className="grid md:grid-cols-2 gap-4 mt-4">
              <div>
                <label>Panel type:</label>
                <select value={panelKeyB} onChange={(e) => setPanelKeyB(e.target.value as PanelKey)} className="border p-1 rounded w-full">
                  {Object.entries(PANEL_CATALOG).map(([k, v]) => <option key={k} value={k}>{v.name} – {v.powerWp}Wp, £{v.price}</option>)}
                </select>
              </div>
              <div>
                <label>Roof dimensions (m):</label>
                <div className="flex gap-2"><input type="number" step="0.5" value={roofBLength} onChange={(e) => setRoofBLength(parseFloat(e.target.value))} placeholder="Length" className="border p-1 rounded w-1/2" /><input type="number" step="0.5" value={roofBWidth} onChange={(e) => setRoofBWidth(parseFloat(e.target.value))} placeholder="Width" className="border p-1 rounded w-1/2" /></div>
              </div>
              <div>
                <label>Shading from trees/buildings (%):</label>
                <input type="range" min="0" max="50" step="1" value={shadingPercentB} onChange={(e) => setShadingPercentB(parseInt(e.target.value))} className="w-full" />
                <p className="text-sm">{shadingPercentB}% reduction</p>
              </div>
              <div>
                <button onClick={() => addObstacle('B')} className="bg-gray-500 text-white px-2 py-1 rounded text-sm">+ Add chimney</button>
                {obstaclesB.map((_, idx) => <button key={idx} onClick={() => removeObstacle('B', idx)} className="bg-red-500 text-white px-2 py-1 rounded text-sm ml-2">Remove {idx+1}</button>)}
              </div>
            </div>
            <div className="mt-4 p-3 bg-green-50 rounded">
              <p className="text-sm font-semibold">🌦️ Climate factor for {selectedCountry}: <strong>{(climateFactor * 100).toFixed(0)}%</strong> (same as Roof A)</p>
              <div className="mt-2">
                <p className="font-semibold">📅 Seasonal production (after climate & shading):</p>
                <div className="grid grid-cols-4 gap-2 text-center text-sm">
                  <div className="bg-white p-1 rounded">🌱 Spring<br/>{prodB.seasonalKwh.spring.toFixed(0)} kWh</div>
                  <div className="bg-white p-1 rounded">☀️ Summer<br/>{prodB.seasonalKwh.summer.toFixed(0)} kWh</div>
                  <div className="bg-white p-1 rounded">🍂 Autumn<br/>{prodB.seasonalKwh.autumn.toFixed(0)} kWh</div>
                  <div className="bg-white p-1 rounded">❄️ Winter<br/>{prodB.seasonalKwh.winter.toFixed(0)} kWh</div>
                </div>
                <p className="text-sm mt-1">Annual: <strong>{prodB.annualKwh.toFixed(0)} kWh</strong> | Power: {prodB.totalWp.toFixed(0)} Wp</p>
              </div>
            </div>
            {renderSVG(layoutB, roofBWidth, roofBLength, obstaclesB, `Roof B layout`)}
          </>
        )}
      </div>

      {/* INVERTER */}
      <div className="bg-indigo-50 p-4 rounded-lg mb-6">
        <h3 className="font-bold text-xl mb-3">⚡ Inverter</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label>Inverter type:</label>
            <select value={inverterType} onChange={(e) => setInverterType(e.target.value as any)} className="border p-2 rounded w-full">
              <option value="string">String inverter – £900 (3.68 kW, single‑phase)</option>
              <option value="micro">Microinverters – £1400 (per panel, single‑phase)</option>
              <option value="hybrid">Hybrid inverter – £1600 (3.68 kW, battery ready)</option>
            </select>
          </div>
          <div>
            <label>Standby power (0‑60 W) – when no solar production:</label>
            <div className="flex gap-2 items-center">
              <select value={standbySource} onChange={(e) => setStandbySource(e.target.value as any)} className="border p-1 rounded">
                <option value="preset">Preset</option>
                <option value="custom">Custom</option>
              </select>
              {standbySource === 'preset' ? (
                <select value={standbyPowerW} onChange={(e) => setStandbyPowerW(parseInt(e.target.value))} className="border p-1 rounded">
                  <option value="0">0 W (ideal)</option><option value="2">2 W</option><option value="3">3 W</option><option value="5">5 W</option>
                  <option value="10">10 W</option><option value="20">20 W</option><option value="40">40 W</option><option value="60">60 W</option>
                </select>
              ) : (
                <input type="number" min="0" max="60" step="1" value={customStandbyW} onChange={(e) => { setCustomStandbyW(parseInt(e.target.value)); setStandbyPowerW(parseInt(e.target.value)); }} className="border p-1 rounded w-24" />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* COST ESTIMATE & MAINTENANCE */}
      <div className="bg-amber-50 p-4 rounded-lg mb-6">
        <h3 className="font-bold text-xl mb-3">💰 Cost Estimate (one‑time, 0% VAT)</h3>
        <div className="grid md:grid-cols-3 gap-3 text-sm">
          <div className="flex justify-between"><label>Panel price (£/panel):</label><input type="number" value={panelPricePerUnit} onChange={(e) => setPanelPricePerUnit(parseFloat(e.target.value))} className="border p-1 rounded w-28 text-right" step="5" /></div>
          <div className="flex justify-between"><label>Inverter cost (£):</label><input type="number" value={inverterCost} onChange={(e) => setInverterCost(parseFloat(e.target.value))} className="border p-1 rounded w-28 text-right" step="50" /></div>
          <div className="flex justify-between"><label>Mounting system (£):</label><input type="number" value={mountingCost} onChange={(e) => setMountingCost(parseFloat(e.target.value))} className="border p-1 rounded w-28 text-right" step="50" /></div>
          <div className="flex justify-between"><label>Scaffolding (£):</label><input type="number" value={scaffoldingCost} onChange={(e) => setScaffoldingCost(parseFloat(e.target.value))} className="border p-1 rounded w-28 text-right" step="50" /></div>
          <div className="flex justify-between"><label>Electrical components (£):</label><input type="number" value={electricalCost} onChange={(e) => setElectricalCost(parseFloat(e.target.value))} className="border p-1 rounded w-28 text-right" step="50" /></div>
          <div className="flex justify-between"><label>Labour (£):</label><input type="number" value={labourCost} onChange={(e) => setLabourCost(parseFloat(e.target.value))} className="border p-1 rounded w-28 text-right" step="50" /></div>
          <div className="flex justify-between"><label>Admin (£):</label><input type="number" value={adminCost} onChange={(e) => setAdminCost(parseFloat(e.target.value))} className="border p-1 rounded w-28 text-right" step="25" /></div>
        </div>
        <div className="text-right font-bold mt-2">Total installation cost: £{totalInstallCost.toFixed(0)}</div>
        <div className="mt-4 border-t pt-3">
          <label className="flex items-center gap-2"><input type="checkbox" checked={includeMaintenance} onChange={(e) => setIncludeMaintenance(e.target.checked)} /> Include annual maintenance (prorated from 3‑year costs)</label>
          {includeMaintenance && (
            <div className="grid md:grid-cols-2 gap-3 mt-2 text-sm">
              <div><label>Cleaning (every 3 years, £):</label><input type="number" step="10" value={cleaningCost3Years} onChange={(e) => setCleaningCost3Years(parseFloat(e.target.value))} className="border p-1 rounded w-full" /></div>
              <div><label>Electrical inspection (every 3 years, £):</label><input type="number" step="10" value={electricalInspection3Years} onChange={(e) => setElectricalInspection3Years(parseFloat(e.target.value))} className="border p-1 rounded w-full" /></div>
            </div>
          )}
        </div>
      </div>

      {/* ==================== LOCATION & FINANCIAL ANALYSIS – NUEVA BARRA INTERACTIVA ==================== */}
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

        {/* Monthly consumption input */}
        <div className="mb-6">
          <label className="block text-sm font-medium">Your average monthly consumption (kWh):</label>
          <input
            type="number"
            step="50"
            value={monthlyConsumption}
            onChange={(e) => setMonthlyConsumption(parseFloat(e.target.value))}
            className="border p-2 rounded w-full mt-1"
          />
          <p className="text-xs text-gray-500 mt-1">Typical UK home: 250-450 kWh/month</p>
        </div>

        {/* Self-Consumption vs Export slider bar */}
        <div className="mb-6">
          <div className="flex justify-between text-sm mb-1">
            <span className="font-medium text-green-700">Self-consumption (green)</span>
            <span className="font-medium text-orange-600">Export (orange)</span>
          </div>
          
          {/* Barra visual con degradado y punto deslizante */}
          <div className="relative h-12 w-full bg-gray-200 rounded-lg overflow-hidden">
            <div 
              className="absolute inset-0"
              style={{
                background: `linear-gradient(to right, #22c55e 0%, #22c55e ${selfConsumptionPercent}%, #f97316 ${selfConsumptionPercent}%, #f97316 100%)`
              }}
            />
            <div 
              className="absolute top-1/2 transform -translate-y-1/2 w-6 h-6 bg-blue-600 rounded-full shadow-lg border-2 border-white cursor-pointer"
              style={{ left: `calc(${selfConsumptionPercent}% - 12px)` }}
            />
            <div className="absolute inset-0 flex justify-between items-center px-2 text-white text-xs font-bold">
              <span>{selfConsumptionPercent}%</span>
              <span>{100 - selfConsumptionPercent}%</span>
            </div>
          </div>
          
          {/* Slider real (input range) – controla el porcentaje */}
          <input
            type="range"
            min="0"
            max="100"
            step="1"
            value={selfConsumptionPercent}
            onChange={(e) => setSelfConsumptionPercent(parseInt(e.target.value))}
            className="w-full mt-2"
          />
          
          <div className="flex justify-between text-xs text-gray-600 mt-1">
            <span>All self-consumed</span>
            <span>All exported</span>
          </div>
        </div>

        {/* Tres indicadores dinámicos (kWh) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-green-100 p-3 rounded-lg text-center">
            <p className="text-sm text-green-800 font-semibold">⚡ Self-consumption</p>
            <p className="text-2xl font-bold text-green-700">{selfConsumedKwhMonthly.toFixed(1)} kWh</p>
            <p className="text-xs text-green-600">Consumed directly from your solar</p>
          </div>
          <div className="bg-gray-200 p-3 rounded-lg text-center">
            <p className="text-sm text-gray-800 font-semibold">🏭 Grid purchase (night/bad weather)</p>
            <p className="text-2xl font-bold text-gray-700">{gridPurchaseKwhMonthly.toFixed(1)} kWh</p>
            <p className="text-xs text-gray-600">Needed when solar is insufficient</p>
          </div>
          <div className="bg-orange-100 p-3 rounded-lg text-center">
            <p className="text-sm text-orange-800 font-semibold">💰 Export to grid</p>
            <p className="text-2xl font-bold text-orange-600">{exportedKwhMonthly.toFixed(1)} kWh</p>
            <p className="text-xs text-orange-600">Sold to electricity company</p>
          </div>
        </div>

        {/* Impacto económico (facturas) */}
        <div className="mt-2 p-3 bg-white/70 rounded-lg">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-600">Monthly bill WITHOUT solar:</p>
              <p className="text-xl font-semibold">{currencySymbol}{(monthlyConsumption * importTariff + standingCharge).toFixed(2)}</p>
            </div>
            <div>
              <p className="text-gray-600">Monthly bill WITH solar:</p>
              <p className="text-xl font-semibold text-green-700">{currencySymbol}{((gridPurchaseKwhMonthly * importTariff) + standingCharge - (exportedKwhMonthly * exportTariff)).toFixed(2)}</p>
            </div>
          </div>
        </div>

        {/* Fuentes de datos */}
        <div className="mt-3 text-right">
          <p className="text-[10px] text-gray-400 italic">
            ⓘ Energy price sources: {electricityPricesByCountry[selectedCountry]?.importSource} (import) | {electricityPricesByCountry[selectedCountry]?.exportSource} (export)
          </p>
        </div>
      </div>

      {/* RESULTS */}
      <div className="bg-gray-800 text-white p-6 rounded-lg">
        <h3 className="font-bold text-2xl mb-4">📊 RESULTS (Combined)</h3>
        <div className="text-lg space-y-2">
          <p><strong>Total panels:</strong> {totalPanelsCount}</p>
          <p><strong>Total power:</strong> {totalWp.toFixed(0)} Wp</p>
          <p><strong>Annual generation:</strong> {totalAnnualKwh.toFixed(0)} kWh</p>
          <p><strong>Installation cost:</strong> £{totalInstallCost.toFixed(0)}</p>
          <p><strong>Annual maintenance:</strong> £{totalAnnualMaintenanceCost.toFixed(1)} (cleaning: £{cleaningCostAnnual.toFixed(1)}, electrical: £{electricalInspectionAnnual.toFixed(1)}, inverter standby: £{inverterNetCost.toFixed(1)})</p>
          <p><strong>Annual benefit (net):</strong> £{totalAnnualBenefit.toFixed(0)}</p>
          <p><strong>New monthly bill:</strong> £{((gridPurchaseKwhMonthly * importTariff) + standingCharge - (exportedKwhMonthly * exportTariff)).toFixed(2)} (saving £{(monthlyConsumption * importTariff + standingCharge) - ((gridPurchaseKwhMonthly * importTariff) + standingCharge - (exportedKwhMonthly * exportTariff)).toFixed(2)}/month)</p>
          <p><strong>Payback period:</strong> {paybackYears.toFixed(1)} years</p>
          <p><strong className="text-3xl text-green-400">ROI: {roiPercent.toFixed(1)}%</strong>
            {roiPercent >= 12 && <span className="ml-2 text-green-300">✨ Excellent</span>}
            {roiPercent >= 6 && roiPercent < 12 && <span className="ml-2 text-yellow-300">👍 Good</span>}
            {roiPercent < 6 && roiPercent > 0 && <span className="ml-2 text-red-300">⚠️ Low</span>}
            {roiPercent <= 0 && <span className="ml-2 text-red-400">❌ Not profitable</span>}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SolarPanelCalculator;
