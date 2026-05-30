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
  perc: { name: "PERC (monocristalino)", price: 75, powerWp: 410, efficiency: "18‑20%", imageType: "mono" },
  topcon: { name: "TOPCon (monocristalino)", price: 85, powerWp: 440, efficiency: "20‑22.5%", imageType: "mono" },
  hjt: { name: "HJT (monocristalino)", price: 95, powerWp: 460, efficiency: "21‑23%", imageType: "mono" },
  ibc: { name: "IBC (monocristalino)", price: 110, powerWp: 480, efficiency: "22‑24%", imageType: "mono" },
  poly: { name: "Policristalino", price: 65, powerWp: 400, efficiency: "16‑18%", imageType: "poly" }
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
  const tilt = Math.min(90, Math.max(0, tiltDeg));
  if (tilt <= 35) return 0.9 + (tilt / 35) * 0.1;
  return 1.0 - ((tilt - 35) / 55) * 0.2;
};

// ==================== CÁLCULO DE DISPOSICIÓN POR TEJADO ====================
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
  // --- Estados para Tejado A ---
  const [roofALength, setRoofALength] = useState(8);
  const [roofAWidth, setRoofAWidth] = useState(5);
  const [panelKeyA, setPanelKeyA] = useState<PanelKey>('topcon');
  const [obstaclesA, setObstaclesA] = useState<Obstacle[]>([]);
  const [orientationDegA, setOrientationDegA] = useState(180);
  const [enablePitchA, setEnablePitchA] = useState(true);
  const [tiltDegA, setTiltDegA] = useState(35);
  const [shadingPercentA, setShadingPercentA] = useState(0);
  const [layoutA, setLayoutA] = useState<{ totalPanels: number; cols: number; rows: number } | null>(null);

  // --- Estados para Tejado B ---
  const [roofBLength, setRoofBLength] = useState(6);
  const [roofBWidth, setRoofBWidth] = useState(4);
  const [panelKeyB, setPanelKeyB] = useState<PanelKey>('topcon');
  const [obstaclesB, setObstaclesB] = useState<Obstacle[]>([]);
  const [orientationDegB, setOrientationDegB] = useState(180);
  const [enablePitchB, setEnablePitchB] = useState(true);
  const [tiltDegB, setTiltDegB] = useState(35);
  const [shadingPercentB, setShadingPercentB] = useState(0);
  const [layoutB, setLayoutB] = useState<{ totalPanels: number; cols: number; rows: number } | null>(null);

  // Parámetros comunes
  const [selectedCountry, setSelectedCountry] = useState("United Kingdom");
  const [region, setRegion] = useState<'north' | 'south'>('south');
  const [selfConsumptionPercent, setSelfConsumptionPercent] = useState(50);
  const [exportTariff, setExportTariff] = useState(15);
  const [monthlyBill, setMonthlyBill] = useState(120);
  const importPrice = 24;

  // Costes de instalación (globales, se suman paneles de ambos tejados)
  const [panelPricePerUnit, setPanelPricePerUnit] = useState(PANEL_CATALOG.topcon.price); // se usa para ambos tejados, pero se pueden diferenciar? Por simplicidad usamos el mismo precio por panel.
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

  // Inversor: standby power (W) rango 0-60
  const [standbyPowerW, setStandbyPowerW] = useState(0);
  const [customStandbyW, setCustomStandbyW] = useState(0);
  const [standbySource, setStandbySource] = useState<'preset' | 'custom'>('preset');

  // ==================== EFECTOS DE CÁLCULO DE LAYOUT ====================
  useEffect(() => {
    const panelW = 1.0, panelH = 1.7;
    if (roofALength > 0 && roofAWidth > 0) {
      const { length, width } = calculateUsableDimensions(roofALength, roofAWidth, obstaclesA);
      const layout = calculatePanelLayout(length, width, panelW, panelH, obstaclesA);
      setLayoutA(layout);
    }
  }, [roofALength, roofAWidth, obstaclesA]);

  useEffect(() => {
    const panelW = 1.0, panelH = 1.7;
    if (roofBLength > 0 && roofBWidth > 0) {
      const { length, width } = calculateUsableDimensions(roofBLength, roofBWidth, obstaclesB);
      const layout = calculatePanelLayout(length, width, panelW, panelH, obstaclesB);
      setLayoutB(layout);
    }
  }, [roofBLength, roofBWidth, obstaclesB]);

  useEffect(() => {
    const inverterPrices = { string: 900, micro: 1400, hybrid: 1600 };
    setInverterCost(inverterPrices[inverterType]);
  }, [inverterType]);

  // ==================== CÁLCULOS DE PRODUCCIÓN POR TEJADO ====================
  const getRoofProduction = (
    layout: { totalPanels: number } | null,
    panelKey: PanelKey,
    orientation: number,
    enablePitch: boolean,
    tilt: number,
    shading: number
  ) => {
    if (!layout) return { totalWp: 0, annualKwh: 0, orientationFactor: 0, tiltFactor: 0 };
    const panelPower = PANEL_CATALOG[panelKey].powerWp;
    const totalWp = layout.totalPanels * panelPower;
    const orientationFactor = getOrientationFactor(orientation);
    const effectiveTilt = enablePitch ? tilt : 35;
    const tiltFactor = getTiltFactor(effectiveTilt);
    const insolationBase = (() => {
      const country = countriesInsolation.find(c => c.name === selectedCountry);
      if (!country) return 1000;
      return region === 'south' ? country.south : country.north;
    })();
    let annualKwh = (totalWp / 1000) * insolationBase * orientationFactor * tiltFactor;
    annualKwh = annualKwh * (1 - shading / 100);
    return { totalWp, annualKwh, orientationFactor, tiltFactor };
  };

  const prodA = getRoofProduction(layoutA, panelKeyA, orientationDegA, enablePitchA, tiltDegA, shadingPercentA);
  const prodB = getRoofProduction(layoutB, panelKeyB, orientationDegB, enablePitchB, tiltDegB, shadingPercentB);
  const totalWp = prodA.totalWp + prodB.totalWp;
  const totalAnnualKwh = prodA.annualKwh + prodB.annualKwh;
  const totalPanelsCount = (layoutA?.totalPanels || 0) + (layoutB?.totalPanels || 0);

  // ==================== CÁLCULOS FINANCIEROS ====================
  const selfConsumedKwh = totalAnnualKwh * (selfConsumptionPercent / 100);
  const exportedKwh = Math.max(0, totalAnnualKwh - selfConsumedKwh);
  
  // Consumo del inversor (standby) – 24/7, pero parte puede ser cubierto por solar durante el día
  const inverterAnnualKwh = (standbyPowerW * 24 * 365) / 1000;
  const solarOffsetKwh = Math.min(inverterAnnualKwh, selfConsumedKwh); // Durante el día, parte del autoconsumo ya incluye el inversor
  // Coste neto: lo que no cubre la solar lo paga de la red
  const inverterNetCost = Math.max(0, (inverterAnnualKwh - solarOffsetKwh) * importPrice / 100);

  // Mantenimiento
  const cleaningCostAnnual = includeMaintenance ? cleaningCost3Years / 3 : 0;
  const electricalInspectionAnnual = includeMaintenance ? electricalInspection3Years / 3 : 0;
  const totalAnnualMaintenanceCost = cleaningCostAnnual + electricalInspectionAnnual + inverterNetCost;

  const totalPanelCost = totalPanelsCount * panelPricePerUnit;
  const totalInstallCost = totalPanelCost + inverterCost + mountingCost + scaffoldingCost + electricalCost + labourCost + adminCost;
  const annualSavingFromSelf = (selfConsumedKwh * importPrice) / 100;
  const annualExportIncome = (exportedKwh * exportTariff) / 100;
  const totalAnnualBenefitBeforeMaintenance = annualSavingFromSelf + annualExportIncome;
  const totalAnnualBenefit = Math.max(0, totalAnnualBenefitBeforeMaintenance - totalAnnualMaintenanceCost);
  const paybackYears = totalInstallCost > 0 && totalAnnualBenefit > 0 ? totalInstallCost / totalAnnualBenefit : 0;
  const roiPercent = totalInstallCost > 0 ? (totalAnnualBenefit / totalInstallCost) * 100 : 0;
  const monthlyBillSaving = totalAnnualBenefit / 12;
  const newMonthlyBill = Math.max(0, monthlyBill - monthlyBillSaving);

  // Función para manejar obstáculos por tejado
  const addObstacle = (roof: 'A' | 'B') => {
    if (roof === 'A') setObstaclesA([...obstaclesA, { x: 1.5, z: 2.0 }]);
    else setObstaclesB([...obstaclesB, { x: 1.5, z: 2.0 }]);
  };
  const removeObstacle = (roof: 'A' | 'B', index: number) => {
    if (roof === 'A') setObstaclesA(obstaclesA.filter((_, i) => i !== index));
    else setObstaclesB(obstaclesB.filter((_, i) => i !== index));
  };

  // Colores (solo para orientación)
  const orientationColorA = getColorFromFactor(prodA.orientationFactor, 0.35, 1.0);
  const orientationColorB = getColorFromFactor(prodB.orientationFactor, 0.35, 1.0);
  const getColorFromFactor = (factor: number, min: number, max: number): string => {
    const t = (factor - min) / (max - min);
    const r = Math.floor(255 * (1 - t)), g = Math.floor(255 * t);
    return `rgb(${r}, ${g}, 0)`;
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-3xl font-light mb-6 text-center">Solar Panel Designer – Dual Roof</h2>

      {/* ==================== TEJADO A ==================== */}
      <div className="border-2 border-blue-300 rounded-lg p-4 mb-6">
        <h3 className="font-bold text-xl mb-3">🏠 Roof A</h3>
        {/* Orientación */}
        <div className="bg-gray-100 p-3 rounded mb-3">
          <label className="block font-medium">Orientation (degrees from North):</label>
          <input type="range" min="0" max="360" step="1" value={orientationDegA} onChange={(e) => setOrientationDegA(parseInt(e.target.value))} className="w-full" />
          <p>{orientationDegA}° → factor {prodA.orientationFactor.toFixed(2)}</p>
        </div>
        {/* Pitch */}
        <div className="bg-gray-100 p-3 rounded mb-3">
          <label className="flex items-center gap-2"><input type="checkbox" checked={enablePitchA} onChange={() => setEnablePitchA(!enablePitchA)} /> Enable custom pitch</label>
          {enablePitchA && (
            <div><label>Tilt (0‑90°):</label><input type="range" min="0" max="90" step="1" value={tiltDegA} onChange={(e) => setTiltDegA(parseInt(e.target.value))} className="w-full" /><p>{tiltDegA}° → factor {getTiltFactor(tiltDegA).toFixed(2)}</p></div>
          )}
          {!enablePitchA && <p>Using optimal 35° (factor {getTiltFactor(35).toFixed(2)})</p>}
        </div>
        {/* Panel type */}
        <div className="bg-gray-100 p-3 rounded mb-3">
          <label>Panel type:</label>
          <select value={panelKeyA} onChange={(e) => setPanelKeyA(e.target.value as PanelKey)} className="border p-1 rounded w-full">
            {Object.entries(PANEL_CATALOG).map(([key, val]) => <option key={key} value={key}>{val.name} – {val.powerWp}Wp, £{val.price}</option>)}
          </select>
        </div>
        {/* Dimensiones y obstáculos */}
        <div className="bg-gray-100 p-3 rounded mb-3">
          <label>Roof length (m):</label><input type="number" step="0.5" value={roofALength} onChange={(e) => setRoofALength(parseFloat(e.target.value))} className="border p-1 rounded w-full mb-1" />
          <label>Roof width (m):</label><input type="number" step="0.5" value={roofAWidth} onChange={(e) => setRoofAWidth(parseFloat(e.target.value))} className="border p-1 rounded w-full mb-1" />
          <button onClick={() => addObstacle('A')} className="bg-gray-500 text-white px-2 py-1 rounded text-sm">+ Add chimney</button>
          {obstaclesA.map((_, idx) => <button key={idx} onClick={() => removeObstacle('A', idx)} className="bg-red-500 text-white px-2 py-1 rounded text-sm ml-2">Remove {idx+1}</button>)}
        </div>
        {/* Sombra */}
        <div className="bg-gray-100 p-3 rounded">
          <label>Shading from trees/buildings (%):</label>
          <input type="range" min="0" max="50" step="1" value={shadingPercentA} onChange={(e) => setShadingPercentA(parseInt(e.target.value))} className="w-full" />
          <p>{shadingPercentA}% reduction</p>
        </div>
        <div className="mt-2 text-sm text-gray-600">📊 {layoutA?.totalPanels || 0} panels, {prodA.totalWp.toFixed(0)} Wp, {prodA.annualKwh.toFixed(0)} kWh/year</div>
      </div>

      {/* ==================== TEJADO B ==================== */}
      <div className="border-2 border-green-300 rounded-lg p-4 mb-6">
        <h3 className="font-bold text-xl mb-3">🏠 Roof B</h3>
        {/* Orientación */}
        <div className="bg-gray-100 p-3 rounded mb-3">
          <label>Orientation (degrees from North):</label>
          <input type="range" min="0" max="360" step="1" value={orientationDegB} onChange={(e) => setOrientationDegB(parseInt(e.target.value))} className="w-full" />
          <p>{orientationDegB}° → factor {prodB.orientationFactor.toFixed(2)}</p>
        </div>
        {/* Pitch */}
        <div className="bg-gray-100 p-3 rounded mb-3">
          <label className="flex items-center gap-2"><input type="checkbox" checked={enablePitchB} onChange={() => setEnablePitchB(!enablePitchB)} /> Enable custom pitch</label>
          {enablePitchB && (
            <div><label>Tilt (0‑90°):</label><input type="range" min="0" max="90" step="1" value={tiltDegB} onChange={(e) => setTiltDegB(parseInt(e.target.value))} className="w-full" /><p>{tiltDegB}° → factor {getTiltFactor(tiltDegB).toFixed(2)}</p></div>
          )}
          {!enablePitchB && <p>Using optimal 35° (factor {getTiltFactor(35).toFixed(2)})</p>}
        </div>
        {/* Panel type */}
        <div className="bg-gray-100 p-3 rounded mb-3">
          <label>Panel type:</label>
          <select value={panelKeyB} onChange={(e) => setPanelKeyB(e.target.value as PanelKey)} className="border p-1 rounded w-full">
            {Object.entries(PANEL_CATALOG).map(([key, val]) => <option key={key} value={key}>{val.name} – {val.powerWp}Wp, £{val.price}</option>)}
          </select>
        </div>
        {/* Dimensiones y obstáculos */}
        <div className="bg-gray-100 p-3 rounded mb-3">
          <label>Roof length (m):</label><input type="number" step="0.5" value={roofBLength} onChange={(e) => setRoofBLength(parseFloat(e.target.value))} className="border p-1 rounded w-full mb-1" />
          <label>Roof width (m):</label><input type="number" step="0.5" value={roofBWidth} onChange={(e) => setRoofBWidth(parseFloat(e.target.value))} className="border p-1 rounded w-full mb-1" />
          <button onClick={() => addObstacle('B')} className="bg-gray-500 text-white px-2 py-1 rounded text-sm">+ Add chimney</button>
          {obstaclesB.map((_, idx) => <button key={idx} onClick={() => removeObstacle('B', idx)} className="bg-red-500 text-white px-2 py-1 rounded text-sm ml-2">Remove {idx+1}</button>)}
        </div>
        {/* Sombra */}
        <div className="bg-gray-100 p-3 rounded">
          <label>Shading from trees/buildings (%):</label>
          <input type="range" min="0" max="50" step="1" value={shadingPercentB} onChange={(e) => setShadingPercentB(parseInt(e.target.value))} className="w-full" />
          <p>{shadingPercentB}% reduction</p>
        </div>
        <div className="mt-2 text-sm text-gray-600">📊 {layoutB?.totalPanels || 0} panels, {prodB.totalWp.toFixed(0)} Wp, {prodB.annualKwh.toFixed(0)} kWh/year</div>
      </div>

      {/* ==================== INVERTER (standby power) ==================== */}
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
            <label>Standby power consumption (0‑60 W) – when no solar production:</label>
            <div className="flex gap-2 items-center">
              <select value={standbySource} onChange={(e) => setStandbySource(e.target.value as any)} className="border p-1 rounded">
                <option value="preset">Preset values</option>
                <option value="custom">Custom</option>
              </select>
              {standbySource === 'preset' ? (
                <select value={standbyPowerW} onChange={(e) => setStandbyPowerW(parseInt(e.target.value))} className="border p-1 rounded">
                  <option value="0">0 W (ideal, no standby)</option>
                  <option value="2">2 W (very efficient)</option>
                  <option value="3">3 W (efficient)</option>
                  <option value="5">5 W (average)</option>
                  <option value="10">10 W (moderate)</option>
                  <option value="20">20 W (inefficient)</option>
                  <option value="40">40 W (old model)</option>
                  <option value="60">60 W (very inefficient)</option>
                </select>
              ) : (
                <input type="number" min="0" max="60" step="1" value={customStandbyW} onChange={(e) => { setCustomStandbyW(parseInt(e.target.value)); setStandbyPowerW(parseInt(e.target.value)); }} className="border p-1 rounded w-24" />
              )}
            </div>
            <p className="text-xs text-gray-500 mt-1">This power is consumed 24/7. Part of it may be covered by solar during the day.</p>
          </div>
        </div>
      </div>

      {/* ==================== COST ESTIMATE & MAINTENANCE ==================== */}
      <div className="bg-amber-50 p-4 rounded-lg mb-6">
        <h3 className="font-bold text-xl mb-3">💰 Cost Estimate (one‑time, 0% VAT)</h3>
        <div className="grid md:grid-cols-3 gap-3 text-sm">
          <div className="flex justify-between"><label>Panel price (£/panel):</label><input type="number" value={panelPricePerUnit} onChange={(e) => setPanelPricePerUnit(parseFloat(e.target.value))} className="border p-1 rounded w-28 text-right" step="5" /></div>
          <div className="flex justify-between"><label>Inverter cost (£):</label><input type="number" value={inverterCost} onChange={(e) => setInverterCost(parseFloat(e.target.value))} className="border p-1 rounded w-28 text-right" step="50" /></div>
          <div className="flex justify-between"><label>Mounting system (£):</label><input type="number" value={mountingCost} onChange={(e) => setMountingCost(parseFloat(e.target.value))} className="border p-1 rounded w-28 text-right" step="50" /></div>
          <div className="flex justify-between"><label>Scaffolding (£):</label><input type="number" value={scaffoldingCost} onChange={(e) => setScaffoldingCost(parseFloat(e.target.value))} className="border p-1 rounded w-28 text-right" step="50" /></div>
          <div className="flex justify-between"><label>Electrical components (£):</label><input type="number" value={electricalCost} onChange={(e) => setElectricalCost(parseFloat(e.target.value))} className="border p-1 rounded w-28 text-right" step="50" /></div>
          <div className="flex justify-between"><label>Labour (MCS) (£):</label><input type="number" value={labourCost} onChange={(e) => setLabourCost(parseFloat(e.target.value))} className="border p-1 rounded w-28 text-right" step="50" /></div>
          <div className="flex justify-between"><label>MCS/DNO admin (£):</label><input type="number" value={adminCost} onChange={(e) => setAdminCost(parseFloat(e.target.value))} className="border p-1 rounded w-28 text-right" step="25" /></div>
        </div>
        <div className="text-right font-bold mt-2">Total installation cost: £{totalInstallCost.toFixed(0)}</div>
        <div className="mt-4 border-t pt-3">
          <label className="flex items-center gap-2"><input type="checkbox" checked={includeMaintenance} onChange={(e) => setIncludeMaintenance(e.target.checked)} /> Include annual maintenance (prorated from 3‑year costs)</label>
          {includeMaintenance && (
            <div className="grid md:grid-cols-2 gap-3 mt-2 text-sm">
              <div><label>Cleaning cost (every 3 years, £):</label><input type="number" step="10" value={cleaningCost3Years} onChange={(e) => setCleaningCost3Years(parseFloat(e.target.value))} className="border p-1 rounded w-full" /></div>
              <div><label>Electrical inspection (every 3 years, £):</label><input type="number" step="10" value={electricalInspection3Years} onChange={(e) => setElectricalInspection3Years(parseFloat(e.target.value))} className="border p-1 rounded w-full" /></div>
            </div>
          )}
        </div>
      </div>

      {/* ==================== LOCATION + FINANCIAL ANALYSIS ==================== */}
      <div className="bg-green-50 p-4 rounded-lg mb-6">
        <h3 className="font-bold text-xl mb-3">🌍 Location & Financial Analysis</h3>
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div><label>Country:</label><select value={selectedCountry} onChange={(e) => setSelectedCountry(e.target.value)} className="border p-2 rounded w-full">{countriesInsolation.map(c => <option key={c.name}>{c.name}</option>)}</select></div>
          <div><label>Region:</label><select value={region} onChange={(e) => setRegion(e.target.value as any)} className="border p-2 rounded w-full"><option value="south">Southern half</option><option value="north">Northern half</option></select></div>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label>Self-consumption vs Export:</label>
            <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden my-1">
              <div className="h-full text-center text-xs text-white font-medium" style={{ width: `${selfConsumptionPercent}%`, background: `linear-gradient(90deg, #22c55e, ${selfConsumptionPercent > 50 ? '#eab308' : '#ef4444'})` }}>
                {selfConsumptionPercent}%
              </div>
            </div>
            <input type="range" min="0" max="100" step="5" value={selfConsumptionPercent} onChange={(e) => setSelfConsumptionPercent(parseInt(e.target.value))} className="w-full" />
            <p className="text-xs">{selfConsumptionPercent}% self-consumed, {100-selfConsumptionPercent}% exported</p>
            <p className="text-xs text-gray-500 italic">Note: Inverter standby power reduces net savings but does not change this percentage.</p>
          </div>
          <div>
            <div className="flex justify-between"><span>Export tariff (p/kWh):</span><input type="number" step="0.5" value={exportTariff} onChange={(e) => setExportTariff(parseFloat(e.target.value))} className="border p-1 rounded w-28 text-right" /></div>
            <div className="flex justify-between mt-1"><span>Monthly bill (£):</span><input type="number" step="10" value={monthlyBill} onChange={(e) => setMonthlyBill(parseFloat(e.target.value))} className="border p-1 rounded w-28 text-right" /></div>
          </div>
        </div>
      </div>

      {/* ==================== RESULTS ==================== */}
      {(layoutA || layoutB) && (
        <div className="bg-gray-800 text-white p-6 rounded-lg">
          <h3 className="font-bold text-2xl mb-4">📊 RESULTS (Combined)</h3>
          <div className="text-lg space-y-2">
            <p><strong className="text-xl">📐 Total panels:</strong> {totalPanelsCount}</p>
            <p><strong className="text-xl">⚡ Total power:</strong> {totalWp.toFixed(0)} Wp</p>
            <p><strong className="text-xl">☀️ Annual generation:</strong> {totalAnnualKwh.toFixed(0)} kWh</p>
            <p><strong className="text-xl">💰 Installation cost:</strong> £{totalInstallCost.toFixed(0)}</p>
            <p><strong className="text-xl">🔄 Annual maintenance cost:</strong> £{totalAnnualMaintenanceCost.toFixed(1)} (cleaning: £{cleaningCostAnnual.toFixed(1)}, electrical: £{electricalInspectionAnnual.toFixed(1)}, inverter standby: £{inverterNetCost.toFixed(1)})</p>
            <p><strong className="text-xl">✅ Annual benefit (after all costs):</strong> £{totalAnnualBenefit.toFixed(0)}</p>
            <p><strong className="text-xl">🏠 New monthly bill:</strong> £{newMonthlyBill.toFixed(0)} (saving £{monthlyBillSaving.toFixed(0)}/month)</p>
            <p><strong className="text-xl">📅 Payback period:</strong> {paybackYears.toFixed(1)} years</p>
            <p><strong className="text-3xl text-green-400">📈 ROI: {roiPercent.toFixed(1)}%</strong>
              {roiPercent >= 12 && <span className="ml-2 text-green-300">✨ Excellent</span>}
              {roiPercent >= 6 && roiPercent < 12 && <span className="ml-2 text-yellow-300">👍 Good</span>}
              {roiPercent < 6 && roiPercent > 0 && <span className="ml-2 text-red-300">⚠️ Low</span>}
              {roiPercent <= 0 && <span className="ml-2 text-red-400">❌ Not profitable</span>}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SolarPanelCalculator;
