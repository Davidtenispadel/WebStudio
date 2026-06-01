import React, { useState, useEffect, useRef } from 'react';

// ==================== DATOS DE IRRADIACIÓN POR PAÍS (se mantienen igual) ====================
type CountryInsolation = { name: string; north: number; south: number };
const countriesInsolation: CountryInsolation[] = [
  { name: "United Kingdom", north: 850, south: 1000 },
  // ... (todos los países, idénticos a versiones anteriores)
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

// ==================== CATÁLOGO DE PANELES (igual) ====================
const PANEL_CATALOG = {
  perc: { name: "PERC (monocristalino)", price: 75, powerWp: 410, efficiency: "18‑20%", imageType: "mono" },
  topcon: { name: "TOPCon (monocristalino)", price: 85, powerWp: 440, efficiency: "20‑22.5%", imageType: "mono" },
  hjt: { name: "HJT (monocristalino)", price: 95, powerWp: 460, efficiency: "21‑23%", imageType: "mono" },
  ibc: { name: "IBC (monocristalino)", price: 110, powerWp: 480, efficiency: "22‑24%", imageType: "mono" },
  poly: { name: "Policristalino", price: 65, powerWp: 400, efficiency: "16‑18%", imageType: "poly" }
};
type PanelKey = keyof typeof PANEL_CATALOG;

// ==================== FACTORES ORIENTACIÓN E INCLINACIÓN (igual) ====================
const getOrientationFactor = (deg: number): number => { ... };
const getTiltFactor = (tiltDeg: number): number => { ... };
const getColorFromFactor = (factor: number, minFactor: number, maxFactor: number): string => { ... };

// ==================== DISPOSICIÓN EN TEJADO (igual) ====================
type Obstacle = { x: number; z: number };
const calculateUsableDimensions = (roofLength: number, roofWidth: number, obstacles: Obstacle[]) => { ... };
const calculatePanelLayout = (length: number, width: number, panelW: number, panelH: number, obstacles: Obstacle[]) => { ... };

// ==================== PRECIOS DE ENERGÍA POR PAÍS (igual) ====================
const electricityPricesByCountry: { [key: string]: { importRate: number; exportRate: number; standingCharge: number; currency: string; importSource: string; exportSource: string } } = {
  // ... (mismo que antes)
};

// ==================== COMPONENTE PRINCIPAL CORREGIDO ====================
const SolarPanelCalculator: React.FC = () => {
  const calculatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.location.hash === '#solar-calculator') {
      setTimeout(() => {
        const el = document.getElementById('solar-calculator');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 200);
    }
  }, []);

  // --- Estados Tejado A y B (igual) ---
  const [roofALength, setRoofALength] = useState(8);
  const [roofAWidth, setRoofAWidth] = useState(5);
  const [panelKeyA, setPanelKeyA] = useState<PanelKey>('topcon');
  const [obstaclesA, setObstaclesA] = useState<Obstacle[]>([]);
  const [orientationDegA, setOrientationDegA] = useState(180);
  const [enablePitchA, setEnablePitchA] = useState(true);
  const [tiltDegA, setTiltDegA] = useState(35);
  const [shadingPercentA, setShadingPercentA] = useState(0);
  const [layoutA, setLayoutA] = useState<any>(null);

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
  const [selfConsumptionPercent, setSelfConsumptionPercent] = useState(50); // Verde (autoconsumo)

  // Tarifas energía
  const [importTariff, setImportTariff] = useState(0.2800);
  const [exportTariff, setExportTariff] = useState(0.0900);
  const [standingCharge, setStandingCharge] = useState(15);

  // Costes instalación, mantenimiento, etc.
  const [panelPricePerUnit, setPanelPricePerUnit] = useState(PANEL_CATALOG.topcon.price);
  const [inverterType, setInverterType] = useState<'string' | 'micro' | 'hybrid'>('string');
  const [inverterCost, setInverterCost] = useState(900);
  const [mountingCost, setMountingCost] = useState(450);
  const [scaffoldingCost, setScaffoldingCost] = useState(600);
  const [electricalCost, setElectricalCost] = useState(350);
  const [labourCost, setLabourCost] = useState(1150);
  const [adminCost, setAdminCost] = useState(175);

  const [includeMaintenance, setIncludeMaintenance] = useState(false);
  const [cleaningCost3Years, setCleaningCost3Years] = useState(150);
  const [electricalInspection3Years, setElectricalInspection3Years] = useState(120);

  const [standbyPowerW, setStandbyPowerW] = useState(0);
  const [customStandbyW, setCustomStandbyW] = useState(0);
  const [standbySource, setStandbySource] = useState<'preset' | 'custom'>('preset');

  const climateFactor = getClimateFactor(selectedCountry);

  useEffect(() => {
    const priceData = electricityPricesByCountry[selectedCountry];
    if (priceData) {
      setImportTariff(priceData.importRate);
      setExportTariff(priceData.exportRate);
      setStandingCharge(priceData.standingCharge);
    }
  }, [selectedCountry]);

  // Layout effects (igual)
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

  // Cálculo producción
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

  // ==================== CÁLCULO CON STANDBY ====================
  const inverterAnnualKwh = (standbyPowerW * 24 * 365) / 1000;          // kWh/año que consume el inversor (siempre)
  const selfConsumedKwhAnnual = totalAnnualKwh * (selfConsumptionPercent / 100);
  const solarOffsetKwh = Math.min(inverterAnnualKwh, selfConsumedKwhAnnual); // parte del standby que cubre el sol
  const standbyGridKwhAnnual = Math.max(0, inverterAnnualKwh - solarOffsetKwh); // resto que debe tomar de la red
  const standbyGridKwhMonthly = standbyGridKwhAnnual / 12;

  // Generación media mensual
  const avgMonthlyGeneration = totalAnnualKwh / 12 || 0;

  // Parte inevitable proporcional al verde (p.ej., 20% del autoconsumo)
  const RED_FACTOR = 0.2;   // rojo = 20% del verde (noche/lluvia)
  const gridFromInevitableKwhMonthly = avgMonthlyGeneration * (selfConsumptionPercent * RED_FACTOR / 100);

  // Compra de red total = parte inevitable + standby
  let totalGridPurchaseKwhMonthly = gridFromInevitableKwhMonthly + standbyGridKwhMonthly;

  // Convertir a porcentaje sobre la generación
  let redPercent = (totalGridPurchaseKwhMonthly / avgMonthlyGeneration) * 100;
  const greenPercent = selfConsumptionPercent;
  // Ajustar para que verde + rojo no supere 100% (si supera, se reduce rojo)
  if (redPercent > (100 - greenPercent)) {
    redPercent = 100 - greenPercent;
    totalGridPurchaseKwhMonthly = avgMonthlyGeneration * (redPercent / 100);
  }

  const selfConsumedKwhMonthly = avgMonthlyGeneration * (greenPercent / 100);
  let exportedKwhMonthly = avgMonthlyGeneration - selfConsumedKwhMonthly - totalGridPurchaseKwhMonthly;
  if (exportedKwhMonthly < 0) exportedKwhMonthly = 0;

  const bluePercent = 100 - greenPercent - redPercent;

  // Facturas mensuales
  const totalConsumption = selfConsumedKwhMonthly + totalGridPurchaseKwhMonthly;
  const monthlyBillWithoutSolar = (totalConsumption * importTariff) + standingCharge;
  const monthlyBillWithSolar = (totalGridPurchaseKwhMonthly * importTariff) + standingCharge - (exportedKwhMonthly * exportTariff);
  const monthlySavings = monthlyBillWithoutSolar - monthlyBillWithSolar;

  // Otros cálculos financieros anuales
  const exportedKwhAnnual = exportedKwhMonthly * 12;
  const inverterNetCost = standbyGridKwhAnnual * importTariff;
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

  const maxGreen = 100 / (1 + RED_FACTOR); // para que rojo no supere límite

  // Handlers obstáculos, renderizado SVG, brújula, etc. (igual que antes)
  // (se omiten por brevedad, pero deben incluirse en el código final)

  return (
    <div ref={calculatorRef} id="solar-calculator" className="max-w-7xl mx-auto p-6 bg-white rounded-xl shadow-lg scroll-mt-24">
      <button onClick={() => window.history.back()} className="...">← Back to Technology</button>
      <h2>Solar Panel Designer – Dual Roof</h2>
      {/* ... Tejado A, Tejado B, Inverter, Cost Estimate (igual que antes) ... */}

      {/* Sección de análisis financiero con barra tricolor que incluye standby */}
      <div className="bg-green-50 p-4 rounded-lg mb-6">
        <h3>🌍 Location & Financial Analysis</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <select ...>{countriesInsolation.map(...)}</select>
          <select ...>...</select>
        </div>

        <div className="mb-6">
          <div className="flex justify-between text-sm mb-1">
            <span>Self-consumed (green)</span>
            <span>Grid purchase (red, incl. standby)</span>
            <span>Exported (blue)</span>
          </div>
          <div className="relative h-12 w-full bg-gray-200 rounded-lg overflow-hidden">
            <div className="absolute inset-0" style={{
              background: `linear-gradient(to right, 
                #22c55e 0%, 
                #22c55e ${greenPercent}%, 
                #ef4444 ${greenPercent}%, 
                #ef4444 ${greenPercent + redPercent}%, 
                #3b82f6 ${greenPercent + redPercent}%, 
                #3b82f6 100%)`
            }} />
            <div className="absolute top-1/2 transform -translate-y-1/2 w-6 h-6 bg-blue-800 rounded-full shadow-lg border-2 border-white"
              style={{ left: `calc(${greenPercent + redPercent}% - 12px)` }} />
            <div className="absolute inset-0 flex justify-between items-center px-2 text-white text-xs font-bold">
              <span>{greenPercent.toFixed(0)}%</span>
              <span>{redPercent.toFixed(0)}%</span>
              <span>{bluePercent.toFixed(0)}%</span>
            </div>
          </div>
          <input type="range" min="0" max={maxGreen} step="1" value={selfConsumptionPercent}
            onChange={(e) => setSelfConsumptionPercent(parseInt(e.target.value))} className="w-full mt-2" />
          <p className="text-xs text-gray-500 mt-1">
            Adjust green (self‑consumption). Red includes inevitable grid purchase (proportional to green)
            plus <strong>{standbyGridKwhMonthly.toFixed(2)} kWh/month</strong> from inverter standby.  
            Total red = {totalGridPurchaseKwhMonthly.toFixed(1)} kWh/month.
          </p>
        </div>

        {/* Tres indicadores en kWh */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-green-100 p-3 text-center">
            <p>🌞 Self-consumed</p>
            <p className="text-2xl font-bold">{selfConsumedKwhMonthly.toFixed(1)} kWh</p>
          </div>
          <div className="bg-red-100 p-3 text-center">
            <p>🏭 Grid purchase</p>
            <p className="text-2xl font-bold">{totalGridPurchaseKwhMonthly.toFixed(1)} kWh</p>
            <p className="text-xs">(incl. {standbyGridKwhMonthly.toFixed(2)} standby)</p>
          </div>
          <div className="bg-blue-100 p-3 text-center">
            <p>💰 Exported</p>
            <p className="text-2xl font-bold">{exportedKwhMonthly.toFixed(1)} kWh</p>
          </div>
        </div>

        <div className="mt-4 p-3 bg-white/70 rounded-lg">
          <div className="grid grid-cols-2 gap-4">
            <div>Monthly bill WITHOUT solar: £{monthlyBillWithoutSolar.toFixed(2)}</div>
            <div>Monthly bill WITH solar: £{monthlyBillWithSolar.toFixed(2)}</div>
          </div>
          <p className="text-center text-sm mt-2">You save <strong className="text-green-700">£{monthlySavings.toFixed(2)}</strong> per month</p>
        </div>
      </div>

      {/* RESULTS (igual) */}
    </div>
  );
};

export default SolarPanelCalculator;
