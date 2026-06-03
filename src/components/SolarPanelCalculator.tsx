import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

// -------------------- DATA --------------------
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

const getClimateFactor = (countryName: string): number => {
  const rainy = ["United Kingdom", "Ireland", "Netherlands", "Belgium", "Denmark", "Norway", "Sweden", "Finland", "Iceland", "New Zealand"];
  const dry = ["Spain", "Portugal", "Greece", "Italy", "Turkey", "Cyprus", "Malta", "Egypt", "Morocco", "South Africa", "Mexico", "Australia", "Chile", "Peru", "India"];
  if (rainy.includes(countryName)) return 0.85;
  if (dry.includes(countryName)) return 0.98;
  return 0.92;
};

// Grid dependency factor: fraction of self-consumed that comes from grid (red). Range 0.20 to 0.55 (max 55% of green).
const getGridDependencyFactor = (countryName: string): number => {
  const map: Record<string, number> = {
    "United Kingdom": 0.52, "Ireland": 0.55, "Netherlands": 0.53, "Belgium": 0.52, "Denmark": 0.55,
    "Norway": 0.55, "Sweden": 0.54, "Finland": 0.55, "Iceland": 0.55, "Germany": 0.50,
    "France": 0.45, "Austria": 0.46, "Switzerland": 0.45, "Poland": 0.48, "Czech Republic": 0.48,
    "Hungary": 0.46, "Romania": 0.45, "Bulgaria": 0.44, "Slovakia": 0.46, "Slovenia": 0.45,
    "Spain": 0.35, "Portugal": 0.36, "Italy": 0.36, "Greece": 0.34, "Turkey": 0.38, "Cyprus": 0.32,
    "Malta": 0.30, "Egypt": 0.30, "Morocco": 0.33, "South Africa": 0.35, "Mexico": 0.34,
    "Australia": 0.34, "New Zealand": 0.42, "USA": 0.40, "Canada": 0.50, "India": 0.38, "China": 0.42,
    "Japan": 0.44, "Brazil": 0.38, "Argentina": 0.42, "Chile": 0.35, "Peru": 0.35, "Colombia": 0.42,
    "Venezuela": 0.38, "Kenya": 0.35, "Nigeria": 0.40,
  };
  let factor = map[countryName] ?? 0.45;
  return Math.min(factor, 0.55);
};

const PANEL_CATALOG = {
  perc: { name: "PERC (monocrystalline)", price: 75, powerWp: 410, efficiency: "18‑20%" },
  topcon: { name: "TOPCon (monocrystalline)", price: 85, powerWp: 440, efficiency: "20‑22.5%" },
  hjt: { name: "HJT (monocrystalline)", price: 95, powerWp: 460, efficiency: "21‑23%" },
  ibc: { name: "IBC (monocrystalline)", price: 110, powerWp: 480, efficiency: "22‑24%" },
  poly: { name: "Polycrystalline", price: 65, powerWp: 400, efficiency: "16‑18%" }
};
type PanelKey = keyof typeof PANEL_CATALOG;

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

const defaultPricesByCountry: { [key: string]: { importRate: number; exportRate: number; standingCharge: number } } = {
  "United Kingdom": { importRate: 0.2800, exportRate: 0.0900, standingCharge: 15 },
  "Germany": { importRate: 0.3869, exportRate: 0.0811, standingCharge: 18 },
  "France": { importRate: 0.2561, exportRate: 0.0565, standingCharge: 12 },
  "Spain": { importRate: 0.2669, exportRate: 0.0400, standingCharge: 10 },
  "Italy": { importRate: 0.2966, exportRate: 0.0464, standingCharge: 14 },
  "Netherlands": { importRate: 0.2930, exportRate: 0.1000, standingCharge: 16 },
  "Belgium": { importRate: 0.3499, exportRate: 0.0830, standingCharge: 15 },
  "Denmark": { importRate: 0.3312, exportRate: 0.0390, standingCharge: 20 },
  "Sweden": { importRate: 0.2700, exportRate: 0.0500, standingCharge: 13 },
  "Poland": { importRate: 0.2100, exportRate: 0.0500, standingCharge: 11 },
  "Czech Republic": { importRate: 0.3217, exportRate: 0.0500, standingCharge: 12 },
  "Portugal": { importRate: 0.2434, exportRate: 0.0420, standingCharge: 10 },
  "Austria": { importRate: 0.3272, exportRate: 0.0650, standingCharge: 14 },
  "Greece": { importRate: 0.2378, exportRate: 0.0450, standingCharge: 11 },
  "Ireland": { importRate: 0.4042, exportRate: 0.0800, standingCharge: 17 },
};

// -------------------- MAIN COMPONENT --------------------
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

  // --- Roof A ---
  const [roofALength, setRoofALength] = useState(8);
  const [roofAWidth, setRoofAWidth] = useState(5);
  const [panelKeyA, setPanelKeyA] = useState<PanelKey>('topcon');
  const [obstaclesA, setObstaclesA] = useState<Obstacle[]>([]);
  const [orientationDegA, setOrientationDegA] = useState(180);
  const [enablePitchA, setEnablePitchA] = useState(true);
  const [tiltDegA, setTiltDegA] = useState(35);
  const [shadingPercentA, setShadingPercentA] = useState(0);
  const [layoutA, setLayoutA] = useState<any>(null);

  // --- Roof B ---
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

  // --- Common parameters ---
  const [selectedCountry, setSelectedCountry] = useState("United Kingdom");
  const [region, setRegion] = useState<'north' | 'south'>('south');
  const [selfConsumptionPercent, setSelfConsumptionPercent] = useState(70); // green % of generation

  // Tariffs
  const [importTariff, setImportTariff] = useState(defaultPricesByCountry["United Kingdom"].importRate);
  const [exportTariff, setExportTariff] = useState(defaultPricesByCountry["United Kingdom"].exportRate);
  const [standingCharge, setStandingCharge] = useState(defaultPricesByCountry["United Kingdom"].standingCharge);

  // Installation costs
  const [panelPricePerUnit, setPanelPricePerUnit] = useState(PANEL_CATALOG.topcon.price);
  const [inverterType, setInverterType] = useState<string>('string_3_68');
  const [inverterCost, setInverterCost] = useState(900);
  const [mountingCost, setMountingCost] = useState(450);
  const [scaffoldingCost, setScaffoldingCost] = useState(600);
  const [electricalCost, setElectricalCost] = useState(350);
  const [labourCost, setLabourCost] = useState(1150);
  const [adminCost, setAdminCost] = useState(175);

  // Maintenance
  const [includeMaintenance, setIncludeMaintenance] = useState(false);
  const [cleaningCost3Years, setCleaningCost3Years] = useState(150);
  const [electricalInspection3Years, setElectricalInspection3Years] = useState(120);

  // Standby
  const [standbyPowerW, setStandbyPowerW] = useState(0);
  const [customStandbyW, setCustomStandbyW] = useState(0);
  const [standbySource, setStandbySource] = useState<'preset' | 'custom'>('preset');

  // Dual inverter
  const [dualInverter, setDualInverter] = useState(false);

  const climateFactor = getClimateFactor(selectedCountry);
  const gridFactor = getGridDependencyFactor(selectedCountry); // between 0.20 and 0.55

  // Update tariffs on country change
  useEffect(() => {
    const def = defaultPricesByCountry[selectedCountry];
    if (def) {
      setImportTariff(def.importRate);
      setExportTariff(def.exportRate);
      setStandingCharge(def.standingCharge);
    }
  }, [selectedCountry]);

  // Layout effects
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

  // Inverter catalog
  const inverterPrices: Record<string, { single: number; dual: number; name: string; power: number; hybrid: boolean; island?: boolean }> = {
    string_3_68: { single: 900, dual: 1700, name: "String 3.68 kW", power: 3.68, hybrid: false, island: false },
    string_5: { single: 1100, dual: 2100, name: "String 5.0 kW", power: 5.0, hybrid: false, island: false },
    string_6: { single: 1300, dual: 2500, name: "String 6.0 kW", power: 6.0, hybrid: false, island: false },
    string_8: { single: 1600, dual: 3000, name: "String 8.0 kW (3‑phase)", power: 8.0, hybrid: false, island: false },
    string_10: { single: 1900, dual: 3600, name: "String 10.0 kW (3‑phase)", power: 10.0, hybrid: false, island: false },
    hybrid_3_68: { single: 1600, dual: 3000, name: "Hybrid 3.68 kW (battery ready)", power: 3.68, hybrid: true, island: true },
    hybrid_5: { single: 1900, dual: 3600, name: "Hybrid 5.0 kW (battery ready)", power: 5.0, hybrid: true, island: true },
    hybrid_6: { single: 2200, dual: 4200, name: "Hybrid 6.0 kW (battery ready)", power: 6.0, hybrid: true, island: true },
    hybrid_8: { single: 2600, dual: 5000, name: "Hybrid 8.0 kW (3‑phase)", power: 8.0, hybrid: true, island: true },
    hybrid_10: { single: 3100, dual: 6000, name: "Hybrid 10.0 kW (3‑phase)", power: 10.0, hybrid: true, island: true },
    micro: { single: 1400, dual: 2800, name: "Microinverters (per panel)", power: 3.68, hybrid: false, island: false }
  };

  const panelsA = layoutA?.totalPanels || 0;
  const panelsB = layoutB?.totalPanels || 0;
  const totalPanelsCount = panelsA + (enableRoofB ? panelsB : 0);
  const orientationsDifferent = enableRoofB && (Math.abs(orientationDegA - orientationDegB) % 360) > 15;
  const forceDual = (totalPanelsCount > 12) || orientationsDifferent;

  useEffect(() => {
    if (forceDual) setDualInverter(true);
  }, [forceDual]);

  useEffect(() => {
    const price = inverterPrices[inverterType]?.single || 900;
    setInverterCost(dualInverter ? (inverterPrices[inverterType]?.dual || price * 2) : price);
  }, [inverterType, dualInverter]);

  // Production calculations (including seasonal for each roof)
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

  // Seasonal breakdown for each roof (for display)
  const seasonalA = prodA.seasonalKwh;
  const seasonalB = prodB.seasonalKwh;

  // -------------------- FINANCIAL MODEL (red = gridFactor * green, capped at 55% of green) --------------------
  const avgMonthlyGeneration = totalAnnualKwh / 12;
  const greenPct = selfConsumptionPercent;
  let redPct = gridFactor * greenPct;
  if (redPct > 100 - greenPct) redPct = 100 - greenPct;
  const bluePct = 100 - greenPct - redPct;
  
  // Actual kWh values
  const selfConsumedKwhMonthly = avgMonthlyGeneration * (greenPct / 100);
  const gridPurchaseKwhMonthly = avgMonthlyGeneration * (redPct / 100);
  const exportedKwhMonthly = avgMonthlyGeneration * (bluePct / 100);
  const totalConsumption = selfConsumedKwhMonthly + gridPurchaseKwhMonthly;
  
  // Bills and savings
  const monthlyBillWithoutSolar = (totalConsumption * importTariff) + standingCharge;
  const monthlyBillWithSolarRaw = (gridPurchaseKwhMonthly * importTariff) + standingCharge - (exportedKwhMonthly * exportTariff);
  const monthlyBillWithSolar = Math.max(0, monthlyBillWithSolarRaw);
  const monthlySavings = monthlyBillWithoutSolar - monthlyBillWithSolar;
  
  // Annual figures for ROI, etc.
  const selfConsumedKwhAnnual = selfConsumedKwhMonthly * 12;
  const exportedKwhAnnual = exportedKwhMonthly * 12;
  const inverterAnnualKwh = (standbyPowerW * 24 * 365) / 1000;
  const solarOffsetKwh = Math.min(inverterAnnualKwh, selfConsumedKwhAnnual);
  const inverterNetCost = Math.max(0, (inverterAnnualKwh - solarOffsetKwh) * importTariff);
  const cleaningCostAnnual = includeMaintenance ? cleaningCost3Years / 3 : 0;
  const electricalInspectionAnnual = includeMaintenance ? electricalInspection3Years / 3 : 0;
  const totalAnnualMaintenanceCost = cleaningCostAnnual + electricalInspectionAnnual + inverterNetCost;
  const panelCostA = panelsA * panelPricePerUnit;
  const panelCostB = (enableRoofB ? panelsB * panelPricePerUnit : 0);
  const totalPanelCost = panelCostA + panelCostB;
  const totalInstallCost = totalPanelCost + inverterCost + mountingCost + scaffoldingCost + electricalCost + labourCost + adminCost;
  const annualSavingFromSelf = selfConsumedKwhAnnual * importTariff;
  const annualExportIncome = exportedKwhAnnual * exportTariff;
  const totalAnnualBenefitBeforeMaintenance = annualSavingFromSelf + annualExportIncome;
  const totalAnnualBenefit = Math.max(0, totalAnnualBenefitBeforeMaintenance - totalAnnualMaintenanceCost);
  const paybackYears = totalInstallCost > 0 && totalAnnualBenefit > 0 ? totalInstallCost / totalAnnualBenefit : 0;
  const roiPercent = totalInstallCost > 0 ? (totalAnnualBenefit / totalInstallCost) * 100 : 0;

  // Draggable thumb for the financial bar
  const barRef = useRef<HTMLDivElement>(null);
  const [isDraggingThumb, setIsDraggingThumb] = useState(false);
  
  const getThumbColor = () => {
    const val = selfConsumptionPercent;
    if (val === 70) return "#22c55e";
    if (val >= 65 && val <= 75) return "#84cc16";
    if (val > 50 && val < 90) return "#eab308";
    return "#ef4444";
  };

  const updateFromMouse = (clientX: number) => {
    if (!barRef.current) return;
    const rect = barRef.current.getBoundingClientRect();
    let x = clientX - rect.left;
    x = Math.max(0, Math.min(x, rect.width));
    let newGreenPct = (x / rect.width) * 100;
    newGreenPct = Math.min(100, Math.max(0, newGreenPct));
    setSelfConsumptionPercent(Math.round(newGreenPct));
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDraggingThumb) updateFromMouse(e.clientX);
  };
  const handleMouseUp = () => {
    setIsDraggingThumb(false);
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('mouseup', handleMouseUp);
  };
  const handleTouchMove = (e: TouchEvent) => {
    if (isDraggingThumb) updateFromMouse(e.touches[0].clientX);
  };
  const handleTouchEnd = () => {
    setIsDraggingThumb(false);
    window.removeEventListener('touchmove', handleTouchMove);
    window.removeEventListener('touchend', handleTouchEnd);
  };

  const startDrag = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    setIsDraggingThumb(true);
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    updateFromMouse(clientX);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleTouchEnd);
  };

  useEffect(() => {
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDraggingThumb]);

  // Obstacle handlers
  const addObstacle = (roof: 'A' | 'B') => {
    if (roof === 'A') setObstaclesA([...obstaclesA, { x: 1.5, z: 2.0 }]);
    else setObstaclesB([...obstaclesB, { x: 1.5, z: 2.0 }]);
  };
  const removeObstacle = (roof: 'A' | 'B', index: number) => {
    if (roof === 'A') setObstaclesA(obstaclesA.filter((_, i) => i !== index));
    else setObstaclesB(obstaclesB.filter((_, i) => i !== index));
  };

  const renderSVG = (layout: any, widthM: number, lengthM: number, obstacles: Obstacle[], title: string) => {
    if (!layout || layout.totalPanels === 0) return <p className="text-sm text-gray-500">No panels fit</p>;
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
          {layout.panelPositions.map((pos: any, idx: number) => {
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
      </div>
    );
  };

  // -------------------- ORIENTATION COMPASS (smooth drag) --------------------
  const OrientationCompass = ({ orientation, onChange, label }: { orientation: number; onChange: (v: number) => void; label: string }) => {
    const factor = getOrientationFactor(orientation);
    const pointColor = factor >= 0.85 ? "#22c55e" : factor >= 0.6 ? "#eab308" : "#ef4444";
    const compassRef = useRef<HTMLDivElement>(null);
    const dragRef = useRef(false);

    const getAngleFromEvent = (clientX: number, clientY: number): number => {
      if (!compassRef.current) return orientation;
      const rect = compassRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      let angle = Math.atan2(clientY - centerY, clientX - centerX) * (180 / Math.PI);
      angle = (angle + 360) % 360;
      return Math.round(angle);
    };

    const handleMove = (e: MouseEvent | TouchEvent) => {
      if (!dragRef.current) return;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      const newAngle = getAngleFromEvent(clientX, clientY);
      onChange(newAngle);
    };

    const startDrag = (e: React.MouseEvent | React.TouchEvent) => {
      e.preventDefault();
      dragRef.current = true;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      const newAngle = getAngleFromEvent(clientX, clientY);
      onChange(newAngle);
      window.addEventListener('mousemove', handleMove);
      window.addEventListener('mouseup', stopDrag);
      window.addEventListener('touchmove', handleMove);
      window.addEventListener('touchend', stopDrag);
    };

    const stopDrag = () => {
      dragRef.current = false;
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', stopDrag);
      window.removeEventListener('touchmove', handleMove);
      window.removeEventListener('touchend', stopDrag);
    };

    const handleClick = (e: React.MouseEvent) => {
      const newAngle = getAngleFromEvent(e.clientX, e.clientY);
      onChange(newAngle);
    };

    return (
      <div className="flex flex-col items-center">
        <div
          ref={compassRef}
          className="relative w-40 h-40 mb-2 cursor-grab active:cursor-grabbing"
          onMouseDown={startDrag}
          onTouchStart={startDrag}
          onClick={handleClick}
        >
          <div className="absolute inset-0 rounded-full border-2 border-gray-600"></div>
          <div className="absolute top-1/2 left-1/2 w-0.5 h-16 bg-gray-500 origin-bottom transform -translate-x-1/2 -translate-y-full rotate-0"></div>
          <div className="absolute top-1/2 left-1/2 w-0.5 h-16 bg-gray-500 origin-bottom transform -translate-x-1/2 -translate-y-full rotate-90"></div>
          <div className="absolute top-1/2 left-1/2 w-0.5 h-16 bg-gray-500 origin-bottom transform -translate-x-1/2 -translate-y-full rotate-180"></div>
          <div className="absolute top-1/2 left-1/2 w-0.5 h-16 bg-gray-500 origin-bottom transform -translate-x-1/2 -translate-y-full -rotate-90"></div>
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 font-bold text-xs">N</div>
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 font-bold text-xs">S</div>
          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 font-bold text-xs">W</div>
          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 font-bold text-xs">E</div>
          <div
            className="absolute top-1/2 left-1/2 w-0 h-0"
            style={{ transform: `translate(-50%, -50%) rotate(${orientation}deg)`, transformOrigin: 'center' }}
          >
            <div
              style={{
                width: 0,
                height: 0,
                borderLeft: '8px solid transparent',
                borderRight: '8px solid transparent',
                borderBottom: `20px solid ${pointColor}`,
                position: 'relative',
                left: '-8px',
                top: '-30px'
              }}
            />
          </div>
          <div
            className="absolute w-5 h-5 rounded-full shadow-lg border-2 border-white"
            style={{
              backgroundColor: pointColor,
              left: `calc(50% + ${Math.sin(orientation * Math.PI / 180) * 60}px - 10px)`,
              top: `calc(50% - ${Math.cos(orientation * Math.PI / 180) * 60}px - 10px)`,
              transform: 'translate(0, 0)'
            }}
          />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xl">🏠</div>
        </div>
        <label className="text-sm font-medium">{label}</label>
        <p className="text-xs mt-1">Factor: {factor.toFixed(2)}</p>
      </div>
    );
  };

  // -------------------- PITCH VISUALIZATION WITH DRAGGABLE POINT --------------------
  const PitchVisualization = ({ tilt, onChange, enabled, setEnabled, label }: any) => {
    const svgRef = useRef<SVGSVGElement>(null);
    const [isDragging, setIsDragging] = useState(false);

    const getTiltFromEvent = (clientX: number, clientY: number): number => {
      if (!svgRef.current) return tilt;
      const rect = svgRef.current.getBoundingClientRect();
      const pivotX = rect.left + 100;
      const pivotY = rect.top + 80;
      let dx = clientX - pivotX;
      let dy = clientY - pivotY;
      let angleRad = Math.atan2(-dy, dx);
      let angleDeg = angleRad * 180 / Math.PI;
      angleDeg = Math.min(90, Math.max(0, angleDeg));
      return Math.round(angleDeg);
    };

    const handleMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging) return;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      const newTilt = getTiltFromEvent(clientX, clientY);
      onChange(newTilt);
    };

    const startDrag = (e: React.MouseEvent | React.TouchEvent) => {
      e.preventDefault();
      setIsDragging(true);
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      const newTilt = getTiltFromEvent(clientX, clientY);
      onChange(newTilt);
      window.addEventListener('mousemove', handleMove);
      window.addEventListener('mouseup', () => setIsDragging(false));
      window.addEventListener('touchmove', handleMove);
      window.addEventListener('touchend', () => setIsDragging(false));
    };

    return (
      <div className="flex flex-col items-center">
        <label className="flex items-center gap-2 text-sm font-medium">
          <input type="checkbox" checked={enabled} onChange={() => setEnabled(!enabled)} /> Custom {label}
        </label>
        {enabled ? (
          <>
            <svg
              ref={svgRef}
              width="200"
              height="100"
              viewBox="0 0 200 100"
              className="my-2 cursor-grab active:cursor-grabbing"
              onMouseDown={startDrag}
              onTouchStart={startDrag}
            >
              <line x1="20" y1="80" x2="180" y2="80" stroke="#666" strokeWidth="1.5" />
              <g transform={`translate(100, 80) rotate(${-tilt})`}>
                <rect x="-25" y="-45" width="50" height="8" fill="#4A90D9" stroke="#333" strokeWidth="1" />
                <rect x="-25" y="-45" width="50" height="3" fill="#FFD700" opacity="0.6" />
              </g>
              <circle cx="100" cy="80" r="5" fill="#ff0000" />
              <path
                d={`M 75 80 A 25 25 0 0 1 ${100 - 25 * Math.sin(tilt * Math.PI / 180)} ${80 - 25 * Math.cos(tilt * Math.PI / 180)}`}
                fill="none" stroke="#888" strokeWidth="1" strokeDasharray="3"
              />
              <text x="75" y="70" fontSize="10" fill="#333">{tilt}°</text>
            </svg>
            <input
              type="range"
              min="0"
              max="90"
              step="1"
              value={tilt}
              onChange={(e) => onChange(parseInt(e.target.value))}
              className="w-full max-w-xs"
            />
            <p className="text-xs">Factor: {getTiltFactor(tilt).toFixed(2)}</p>
          </>
        ) : (
          <p className="text-sm text-gray-600">Using optimal 35° (factor {getTiltFactor(35).toFixed(2)})</p>
        )}
      </div>
    );
  };

  // Recommendation function (unchanged)
  const getDetailedRecommendation = (selfKwh: number, size: string, country: string): string => {
    const hotCountries = ["Spain", "Portugal", "Italy", "Greece", "Turkey", "Cyprus", "Malta", "Egypt", "Morocco", "South Africa", "Mexico", "Australia", "Chile", "Peru", "India", "USA"];
    const isHot = hotCountries.includes(country);
    const isUk = country === "United Kingdom";
    
    let minKwh, medKwh, highKwh, vhighKwh;
    if (size === '1-2') {
      minKwh = 180; medKwh = 300; highKwh = 500; vhighKwh = 750;
    } else if (size === '3-4') {
      minKwh = 250; medKwh = 450; highKwh = 750; vhighKwh = 1100;
    } else {
      minKwh = 350; medKwh = 600; highKwh = 950; vhighKwh = 1500;
    }
    
    let level = 0;
    if (selfKwh < minKwh) level = 0;
    else if (selfKwh < medKwh) level = 1;
    else if (selfKwh < highKwh) level = 2;
    else if (selfKwh < vhighKwh) level = 3;
    else level = 4;
    
    const levelNames = ["Insufficient (below minimum)", "Minimum", "Medium", "High", "Very high"];
    const levelText = levelNames[level];
    
    let text = `**${levelText} electrification level** (${selfKwh.toFixed(0)} kWh/month)\n\n`;
    if (level >= 1) {
      text += "✅ Basic appliances: LED lighting, fridge, TV, laptop, washing machine.\n✅ Induction cooktop.\n✅ Electric water heater.\n";
    } else {
      text += "❌ Not enough for electric cooking or water heating. Use gas or butane.\n";
      return text;
    }
    if (level >= 2) {
      if (isUk) text += "✅ Heating: Air-to-water heat pump (underfloor heating or radiators).\n";
      else if (isHot) text += "✅ Heating & cooling: Reversible air-to-air heat pump (inverter AC).\n🏊 Optional pool heat pump at very high level.\n";
      else text += "✅ Heating: Air-to-water or geothermal heat pump.\n";
    }
    if (level >= 3) text += "🚗 Small EV (55 kWh) can be fully charged.\n";
    if (level >= 4) text += "🔋 Large EV (80-90 kWh) or second EV possible.\n";
    if (totalPanelsCount > 12) text += `\n⚡ Dual inverter recommended (${totalPanelsCount} panels).`;
    else text += `\n⚡ Single inverter sufficient (${totalPanelsCount} panels).`;
    return text;
  };

  // Calculate optimal green for 30% export (blue = 30%)
  // blue = 100 - green - red = 30 => green + red = 70 => green*(1+gridFactor) = 70 => green = 70/(1+gridFactor)
  const optimalGreen = 70 / (1 + gridFactor);
  const optimalGreenDisplay = optimalGreen.toFixed(0);
  const blueAtOptimal = (100 - optimalGreen - gridFactor * optimalGreen).toFixed(0);

  // -------------------- RENDER --------------------
  return (
    <div ref={calculatorRef} id="solar-calculator" className="max-w-7xl mx-auto p-6 bg-white rounded-xl shadow-lg scroll-mt-24">
      <div className="flex justify-start mb-4">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-red-600 border border-gray-300 rounded-md">
          ← Back to Technology
        </button>
      </div>
      <h2 className="text-3xl font-light mb-6 text-center">Solar Panel Designer – Single & Dual Roof</h2>

      {/* ==================== 1. LOCATION & PANEL COUNT ==================== */}
      <div className="border-2 border-gray-400 rounded-lg p-4 mb-6">
        <h3 className="font-bold text-xl mb-3">1. Location & Panel Count</h3>
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div>
            <label>Country:</label>
            <select value={selectedCountry} onChange={(e) => setSelectedCountry(e.target.value)} className="border p-2 rounded w-full">
              {countriesInsolation.map(c => <option key={c.name}>{c.name}</option>)}
            </select>
            <p className="text-xs text-gray-500 mt-1">🌦️ <strong>Climate factor</strong> adjusts production for typical cloud/rain (0.85 for UK, 0.98 for Spain, 0.92 for others).</p>
          </div>
          <div>
            <label>Region:</label>
            <select value={region} onChange={(e) => setRegion(e.target.value as any)} className="border p-2 rounded w-full">
              <option value="south">South (higher irradiation)</option>
              <option value="north">North (lower irradiation)</option>
            </select>
          </div>
        </div>
        {/* Roof A */}
        <div className="mb-4 border-b pb-2">
          <div className="font-semibold text-blue-700">🏠 Roof A</div>
          <div className="grid md:grid-cols-2 gap-4 mt-2">
            <div><label>Panel type:</label><select value={panelKeyA} onChange={(e) => setPanelKeyA(e.target.value as PanelKey)} className="border p-1 rounded w-full">{Object.entries(PANEL_CATALOG).map(([k, v]) => <option key={k} value={k}>{v.name} – {v.powerWp}Wp, £{v.price}</option>)}</select></div>
            <div><label>Dimensions (m):</label><div className="flex gap-2"><input type="number" step="0.5" value={roofALength} onChange={(e) => setRoofALength(parseFloat(e.target.value))} placeholder="Length" className="border p-1 rounded w-1/2" /><input type="number" step="0.5" value={roofAWidth} onChange={(e) => setRoofAWidth(parseFloat(e.target.value))} placeholder="Width" className="border p-1 rounded w-1/2" /></div></div>
            <div><label>Shading (%):</label><input type="range" min="0" max="50" step="1" value={shadingPercentA} onChange={(e) => setShadingPercentA(parseInt(e.target.value))} className="w-full" /><p className="text-sm">{shadingPercentA}% reduction</p></div>
            <div><button onClick={() => addObstacle('A')} className="bg-gray-500 text-white px-2 py-1 rounded text-sm">+ Add chimney</button>{obstaclesA.map((_, idx) => <button key={idx} onClick={() => removeObstacle('A', idx)} className="bg-red-500 text-white px-2 py-1 rounded text-sm ml-2">Remove {idx+1}</button>)}</div>
            <div><OrientationCompass orientation={orientationDegA} onChange={setOrientationDegA} label="Orientation A" /></div>
            <div><PitchVisualization tilt={tiltDegA} onChange={setTiltDegA} enabled={enablePitchA} setEnabled={setEnablePitchA} label="pitch A" /></div>
          </div>
          {/* Seasonal production for Roof A */}
          <div className="mt-3 grid grid-cols-4 gap-2 text-center text-sm bg-blue-50 p-2 rounded">
            <div>🌱 Spring<br/>{seasonalA.spring.toFixed(0)} kWh</div>
            <div>☀️ Summer<br/>{seasonalA.summer.toFixed(0)} kWh</div>
            <div>🍂 Autumn<br/>{seasonalA.autumn.toFixed(0)} kWh</div>
            <div>❄️ Winter<br/>{seasonalA.winter.toFixed(0)} kWh</div>
          </div>
          <div className="mt-2 text-sm">{renderSVG(layoutA, roofAWidth, roofALength, obstaclesA, "Roof A layout")}</div>
        </div>
        {/* Roof B optional */}
        <div className="mb-2">
          <label className="flex items-center gap-2"><input type="checkbox" checked={enableRoofB} onChange={(e) => setEnableRoofB(e.target.checked)} /> Enable Roof B</label>
        </div>
        {enableRoofB && (
          <div className="border-t pt-3">
            <div className="font-semibold text-green-700">🏠 Roof B</div>
            <div className="grid md:grid-cols-2 gap-4 mt-2">
              <div><label>Panel type:</label><select value={panelKeyB} onChange={(e) => setPanelKeyB(e.target.value as PanelKey)} className="border p-1 rounded w-full">{Object.entries(PANEL_CATALOG).map(([k, v]) => <option key={k} value={k}>{v.name} – {v.powerWp}Wp, £{v.price}</option>)}</select></div>
              <div><label>Dimensions (m):</label><div className="flex gap-2"><input type="number" step="0.5" value={roofBLength} onChange={(e) => setRoofBLength(parseFloat(e.target.value))} placeholder="Length" className="border p-1 rounded w-1/2" /><input type="number" step="0.5" value={roofBWidth} onChange={(e) => setRoofBWidth(parseFloat(e.target.value))} placeholder="Width" className="border p-1 rounded w-1/2" /></div></div>
              <div><label>Shading (%):</label><input type="range" min="0" max="50" step="1" value={shadingPercentB} onChange={(e) => setShadingPercentB(parseInt(e.target.value))} className="w-full" /><p className="text-sm">{shadingPercentB}% reduction</p></div>
              <div><button onClick={() => addObstacle('B')} className="bg-gray-500 text-white px-2 py-1 rounded text-sm">+ Add chimney</button>{obstaclesB.map((_, idx) => <button key={idx} onClick={() => removeObstacle('B', idx)} className="bg-red-500 text-white px-2 py-1 rounded text-sm ml-2">Remove {idx+1}</button>)}</div>
              <div><OrientationCompass orientation={orientationDegB} onChange={setOrientationDegB} label="Orientation B" /></div>
              <div><PitchVisualization tilt={tiltDegB} onChange={setTiltDegB} enabled={enablePitchB} setEnabled={setEnablePitchB} label="pitch B" /></div>
            </div>
            {/* Seasonal production for Roof B */}
            <div className="mt-3 grid grid-cols-4 gap-2 text-center text-sm bg-green-50 p-2 rounded">
              <div>🌱 Spring<br/>{seasonalB.spring.toFixed(0)} kWh</div>
              <div>☀️ Summer<br/>{seasonalB.summer.toFixed(0)} kWh</div>
              <div>🍂 Autumn<br/>{seasonalB.autumn.toFixed(0)} kWh</div>
              <div>❄️ Winter<br/>{seasonalB.winter.toFixed(0)} kWh</div>
            </div>
            <div className="mt-2 text-sm">{renderSVG(layoutB, roofBWidth, roofBLength, obstaclesB, "Roof B layout")}</div>
          </div>
        )}
        <div className="mt-3 text-sm text-gray-600">
          💡 Panels generate DC electricity. Estimated annual production: <strong>{totalAnnualKwh.toFixed(0)} kWh</strong> with total power <strong>{totalWp.toFixed(0)} Wp</strong>.
        </div>
      </div>

      {/* ==================== 2. INVERTER CONFIGURATION ==================== */}
      <div className="bg-indigo-50 p-4 rounded-lg mb-6">
        <h3 className="font-bold text-xl mb-3">2. Inverter Configuration</h3>
        <p className="text-sm mb-3">Solar panels generate <strong>DC</strong>. The inverter converts it to <strong>AC</strong> for home use. Surplus energy can be <strong>exported to the grid</strong> or stored in <strong>batteries</strong> (if hybrid inverter).</p>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium">Inverter type & power:</label>
            <select value={inverterType} onChange={(e) => setInverterType(e.target.value)} className="border p-2 rounded w-full">
              {Object.entries(inverterPrices).map(([key, val]) => (<option key={key} value={key}>{val.name} – £{val.single} (dual: £{val.dual})</option>))}
            </select>
            <div className="text-xs text-gray-600 mt-1">{inverterPrices[inverterType]?.hybrid ? "🔋 Hybrid: battery ready, island mode." : "📡 String: cost‑effective, no battery."}</div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="dualInverter" checked={dualInverter} onChange={(e) => !forceDual && setDualInverter(e.target.checked)} disabled={forceDual} />
              <label htmlFor="dualInverter" className="text-sm">Use dual inverters (2 units) {forceDual && <span className="text-red-600 ml-2">(Required: mixed orientations or &gt;12 panels)</span>}<br /><span className="text-xs text-gray-600">Price: £{inverterPrices[inverterType]?.dual || (inverterPrices[inverterType]?.single * 2)}</span></label>
            </div>
            {forceDual && <p className="text-xs text-red-500 mt-1">Different orientations or high panel count require two inverters to avoid clipping.</p>}
          </div>
          <div className="col-span-2">
            <label className="block font-medium mb-1">Standby power (0‑60 W)</label>
            <div className="flex gap-2 items-center">
              <select value={standbySource} onChange={(e) => setStandbySource(e.target.value as any)} className="border p-1 rounded"><option value="preset">Preset</option><option value="custom">Custom</option></select>
              {standbySource === 'preset' ? (
                <select value={standbyPowerW} onChange={(e) => setStandbyPowerW(parseInt(e.target.value))} className="border p-1 rounded">
                  <option value="0">0 W (ideal)</option><option value="2">2 W</option><option value="3">3 W</option><option value="5">5 W</option>
                  <option value="10">10 W</option><option value="20">20 W</option><option value="40">40 W</option><option value="60">60 W</option>
                </select>
              ) : (
                <input type="number" min="0" max="60" step="1" value={customStandbyW} onChange={(e) => { setCustomStandbyW(parseInt(e.target.value)); setStandbyPowerW(parseInt(e.target.value)); }} className="border p-1 rounded w-24" />
              )}
            </div>
            <p className="text-xs text-gray-500 mt-1">Inverter consumption when not generating (night). Always drawn from grid.</p>
          </div>
        </div>
      </div>

      {/* ==================== 3. COST ESTIMATE ==================== */}
      <div className="bg-amber-50 p-4 rounded-lg mb-6">
        <h3 className="font-bold text-xl mb-3">3. Cost Estimate</h3>
        <div className="mb-2"><div className="font-semibold">Roof A</div><div className="grid grid-cols-2 gap-2 text-sm ml-4"><span>Panels ({panelsA} × £{panelPricePerUnit}):</span><span className="text-right">£{panelCostA.toFixed(0)}</span><span>Mounting (proportional):</span><span className="text-right">£{(mountingCost * (panelsA / (totalPanelsCount || 1))).toFixed(0)}</span><span>Scaffolding (proportional):</span><span className="text-right">£{(scaffoldingCost * (panelsA / (totalPanelsCount || 1))).toFixed(0)}</span><span>Labour (proportional):</span><span className="text-right">£{(labourCost * (panelsA / (totalPanelsCount || 1))).toFixed(0)}</span><span>Electrical components (proportional):</span><span className="text-right">£{(electricalCost * (panelsA / (totalPanelsCount || 1))).toFixed(0)}</span></div></div>
        {enableRoofB && (<div className="mt-2"><div className="font-semibold">Roof B</div><div className="grid grid-cols-2 gap-2 text-sm ml-4"><span>Panels ({panelsB} × £{panelPricePerUnit}):</span><span className="text-right">£{panelCostB.toFixed(0)}</span><span>Mounting (proportional):</span><span className="text-right">£{(mountingCost * (panelsB / totalPanelsCount)).toFixed(0)}</span><span>Scaffolding (proportional):</span><span className="text-right">£{(scaffoldingCost * (panelsB / totalPanelsCount)).toFixed(0)}</span><span>Labour (proportional):</span><span className="text-right">£{(labourCost * (panelsB / totalPanelsCount)).toFixed(0)}</span><span>Electrical components (proportional):</span><span className="text-right">£{(electricalCost * (panelsB / totalPanelsCount)).toFixed(0)}</span></div></div>)}
        <div className="mt-2"><div className="font-semibold">Shared costs</div><div className="grid grid-cols-2 gap-2 text-sm ml-4"><span>Inverter (dual={dualInverter ? "yes" : "no"}):</span><span className="text-right">£{inverterCost.toFixed(0)}</span><span>Admin & DNO fees:</span><span className="text-right">£{adminCost.toFixed(0)}</span></div></div>
        <div className="text-right font-bold mt-3 pt-2 border-t">Total installation cost: £{totalInstallCost.toFixed(0)}</div>
        <div className="mt-3"><label className="flex items-center gap-2"><input type="checkbox" checked={includeMaintenance} onChange={(e) => setIncludeMaintenance(e.target.checked)} /> Include annual maintenance (prorated from 3‑year costs)</label>
        {includeMaintenance && (<div className="grid md:grid-cols-2 gap-3 mt-2 text-sm"><div><label>Cleaning (every 3 years, £):</label><input type="number" step="10" value={cleaningCost3Years} onChange={(e) => setCleaningCost3Years(parseFloat(e.target.value))} className="border p-1 rounded w-full" /></div><div><label>Electrical inspection (every 3 years, £):</label><input type="number" step="10" value={electricalInspection3Years} onChange={(e) => setElectricalInspection3Years(parseFloat(e.target.value))} className="border p-1 rounded w-full" /></div></div>)}</div>
      </div>

      {/* ==================== 4. FINANCIAL ANALYSIS ==================== */}
      <div className="bg-green-50 p-4 rounded-lg mb-6">
        <h3 className="font-bold text-xl mb-3">4. Financial Analysis</h3>
        <div className="grid md:grid-cols-3 gap-4 mb-4 p-3 bg-white/50 rounded">
          <div><label className="block text-sm font-medium">Import tariff (£/kWh)</label><input type="number" step="0.001" value={importTariff} onChange={(e) => setImportTariff(parseFloat(e.target.value))} className="border p-1 rounded w-full" /></div>
          <div><label className="block text-sm font-medium">Export tariff (SEG) (£/kWh)</label><input type="number" step="0.001" value={exportTariff} onChange={(e) => setExportTariff(parseFloat(e.target.value))} className="border p-1 rounded w-full" /></div>
          <div><label className="block text-sm font-medium">Standing charge (£/month)</label><input type="number" step="0.5" value={standingCharge} onChange={(e) => setStandingCharge(parseFloat(e.target.value))} className="border p-1 rounded w-full" /></div>
        </div>
        <div className="mb-6">
          <div className="flex justify-between text-sm mb-1">
            <span className="font-medium text-green-700">Self-consumed (green)</span>
            <span className="font-medium text-red-600">Grid purchase (red, {Math.round(gridFactor*100)}% of green, max 55%)</span>
            <span className="font-medium text-blue-600">Exported (blue)</span>
          </div>
          <div ref={barRef} className="relative h-12 w-full bg-gray-200 rounded-lg overflow-hidden cursor-pointer" onClick={(e) => {
            const rect = barRef.current?.getBoundingClientRect();
            if (rect) {
              const x = e.clientX - rect.left;
              const percent = (x / rect.width) * 100;
              let newGreen = Math.min(100, Math.max(0, percent));
              setSelfConsumptionPercent(Math.round(newGreen));
            }
          }}>
            <div className="absolute inset-0" style={{ background: `linear-gradient(to right, #22c55e 0%, #22c55e ${greenPct}%, #ef4444 ${greenPct}%, #ef4444 ${greenPct + redPct}%, #3b82f6 ${greenPct + redPct}%, #3b82f6 100%)` }} />
            {/* Target marker for optimal point (blue = 30%) */}
            {bluePct !== 30 && (
              <div
                className="absolute top-1/2 transform -translate-y-1/2 w-1 h-8 bg-yellow-400 rounded-full z-5"
                style={{ left: `calc(${100 - 30}% - 0.5px)`, pointerEvents: "none" }}
                title="Optimal point (30% exported)"
              />
            )}
            <div
              className="absolute top-1/2 transform -translate-y-1/2 w-6 h-6 rounded-full shadow-lg border-2 border-white cursor-grab active:cursor-grabbing z-10"
              style={{ left: `calc(${greenPct + redPct}% - 12px)`, backgroundColor: getThumbColor() }}
              onMouseDown={startDrag}
              onTouchStart={startDrag}
            />
            <div className="absolute inset-0 flex justify-between items-center px-2 text-white text-xs font-bold pointer-events-none">
              <span>{greenPct.toFixed(0)}%</span><span>{redPct.toFixed(1)}%</span><span>{bluePct.toFixed(1)}%</span>
            </div>
          </div>
          <div className="flex justify-between text-xs text-gray-600 mt-1">
            <span>0% (export all)</span>
            <span className="text-green-600 font-semibold">🎯 Optimal: {optimalGreenDisplay}% green → {blueAtOptimal}% exported (30% recommended)</span>
            <span>100% (consume all)</span>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            📊 <strong>Grid purchase rule:</strong> For <strong>{selectedCountry}</strong>, red (grid) = <strong>{Math.round(gridFactor*100)}%</strong> of green (self‑consumed), <strong>never exceeding 55% of green</strong>.<br />
            🔍 <strong>Optimal point:</strong> Move the draggable circle until the blue (export) is exactly 30% – this leaves a 30% margin for future electric vehicle or increased consumption, which is the recommended design target for your solar panel system.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-green-100 p-3 rounded-lg text-center"><p className="text-sm text-green-800 font-semibold">🌞 Self-consumed (solar)</p><p className="text-2xl font-bold text-green-700">{selfConsumedKwhMonthly.toFixed(1)} kWh</p></div>
          <div className="bg-red-100 p-3 rounded-lg text-center"><p className="text-sm text-red-800 font-semibold">🏭 Grid purchase</p><p className="text-2xl font-bold text-red-600">{gridPurchaseKwhMonthly.toFixed(1)} kWh</p></div>
          <div className="bg-blue-100 p-3 rounded-lg text-center"><p className="text-sm text-blue-800 font-semibold">💰 Exported to grid</p><p className="text-2xl font-bold text-blue-600">{exportedKwhMonthly.toFixed(1)} kWh</p></div>
        </div>
        <div className="mt-3 text-right"><p className="text-[10px] text-gray-400 italic">Energy price sources: based on country selection (overridable). Climate factor already included in production.</p></div>
      </div>

      {/* ==================== ANALYSIS RESULTS ==================== */}
      <div className="bg-gray-800 text-white p-6 rounded-lg">
        <h3 className="font-bold text-2xl mb-4">📊 Analysis Results</h3>
        <div className="mb-6">
          <h4 className="text-xl font-semibold border-b border-gray-600 pb-2 mb-3">1. Data analysis</h4>
          <div className="space-y-2 text-lg">
            <p><strong>Total panels:</strong> {totalPanelsCount}</p>
            <p><strong>Total power:</strong> {totalWp.toFixed(0)} Wp</p>
            <p><strong>Annual generation:</strong> {totalAnnualKwh.toFixed(0)} kWh</p>
            <p><strong>Installation cost:</strong> £{totalInstallCost.toFixed(0)}</p>
            <p><strong>Annual maintenance:</strong> £{totalAnnualMaintenanceCost.toFixed(1)}</p>
            <p><strong>Annual benefit (net):</strong> £{totalAnnualBenefit.toFixed(0)}</p>
            <hr className="my-2 border-gray-600" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="bg-gray-700 p-3 rounded"><p className="text-sm text-gray-300">Monthly bill WITHOUT solar</p><p className="text-2xl font-bold text-red-400">£{monthlyBillWithoutSolar.toFixed(2)}</p></div>
              <div className="bg-gray-700 p-3 rounded"><p className="text-sm text-gray-300">Monthly bill WITH solar</p><p className="text-2xl font-bold text-yellow-400">£{monthlyBillWithSolar.toFixed(2)}</p></div>
              <div className="bg-gray-700 p-3 rounded"><p className="text-sm text-gray-300">Monthly savings</p><p className="text-2xl font-bold text-green-400">£{monthlySavings.toFixed(2)}</p></div>
            </div>
            <hr className="my-2 border-gray-600" />
            <p><strong>Payback period:</strong> {paybackYears.toFixed(1)} years</p>
            <p><strong className="text-3xl text-green-400">ROI: {roiPercent.toFixed(1)}%</strong>
              {roiPercent >= 12 && <span className="ml-2 text-green-300">✨ Excellent</span>}
              {roiPercent >= 6 && roiPercent < 12 && <span className="ml-2 text-yellow-300">👍 Good</span>}
              {roiPercent < 6 && roiPercent > 0 && <span className="ml-2 text-red-300">⚠️ Low</span>}
              {roiPercent <= 0 && <span className="ml-2 text-red-400">❌ Not profitable</span>}
            </p>
          </div>
        </div>
        {selfConsumedKwhMonthly > 0 && (
          <div>
            <h4 className="text-xl font-semibold border-b border-gray-600 pb-2 mb-3">2. Electrification recommendations by household size</h4>
            <p className="text-sm text-gray-300 mb-4">Based on your monthly self‑consumption of <strong className="text-white">{selfConsumedKwhMonthly.toFixed(1)} kWh</strong>.</p>
            <div className="space-y-4">
              <div className="border-l-4 border-blue-400 pl-4 bg-gray-700/30 p-3 rounded"><p className="font-bold text-lg">🏠 1‑2 bedroom home</p><div className="text-sm whitespace-pre-line">{getDetailedRecommendation(selfConsumedKwhMonthly, '1-2', selectedCountry)}</div></div>
              <div className="border-l-4 border-green-400 pl-4 bg-gray-700/30 p-3 rounded"><p className="font-bold text-lg">🏡 3‑4 bedroom home</p><div className="text-sm whitespace-pre-line">{getDetailedRecommendation(selfConsumedKwhMonthly, '3-4', selectedCountry)}</div></div>
              <div className="border-l-4 border-yellow-400 pl-4 bg-gray-700/30 p-3 rounded"><p className="font-bold text-lg">🏘️ 5+ bedroom home</p><div className="text-sm whitespace-pre-line">{getDetailedRecommendation(selfConsumedKwhMonthly, '5+', selectedCountry)}</div></div>
            </div>
            <p className="mt-4 text-xs text-gray-400">* Recommendations tailored to {selectedCountry}. Hot climates prioritise reversible AC; UK favours air‑to‑water heat pumps.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SolarPanelCalculator;
