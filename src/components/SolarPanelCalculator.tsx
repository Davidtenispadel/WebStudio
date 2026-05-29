import React, { useState, useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Box, Html } from '@react-three/drei';
import * as THREE from 'three';

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

// ==================== CONSTANTES DE PANELES ====================
// Precios reales orientativos (sin IVA)
const REAL_PANEL_PRICES = {
  monocrystalline: 80,   // £ por panel (TOPCon)
  polycrystalline: 65,   // £ por panel (PERC)
};

const PANEL_DIMENSIONS = {
  monocrystalline: { width: 1.0, height: 1.7, powerWp: 430 },
  polycrystalline: { width: 1.0, height: 1.7, powerWp: 400 },
};

// ==================== FUNCIÓN DE ORIENTACIÓN REALISTA ====================
// Factor de producción según ángulo (0° = Sur, 90° = Este, 180° = Norte, 270° = Oeste)
// Valores más realistas: norte muy malo (0.35), este/oeste aceptable (0.75)
const getOrientationFactor = (deg: number): number => {
  let angle = deg % 360;
  if (angle < 0) angle += 360;
  // Puntos de control: (ángulo, factor)
  // Sur: 0° y 360° -> 1.0
  // Sureste: 45° -> 0.85
  // Este: 90° -> 0.75
  // Noreste: 135° -> 0.55
  // Norte: 180° -> 0.35
  // Noroeste: 225° -> 0.55
  // Oeste: 270° -> 0.75
  // Suroeste: 315° -> 0.85
  const anchors = [
    { deg: 0, factor: 1.0 },
    { deg: 45, factor: 0.85 },
    { deg: 90, factor: 0.75 },
    { deg: 135, factor: 0.55 },
    { deg: 180, factor: 0.35 },
    { deg: 225, factor: 0.55 },
    { deg: 270, factor: 0.75 },
    { deg: 315, factor: 0.85 },
    { deg: 360, factor: 1.0 }
  ];
  for (let i = 0; i < anchors.length - 1; i++) {
    const a1 = anchors[i];
    const a2 = anchors[i+1];
    if (angle >= a1.deg && angle <= a2.deg) {
      const t = (angle - a1.deg) / (a2.deg - a1.deg);
      return a1.factor + t * (a2.factor - a1.factor);
    }
  }
  return 1.0;
};

// Factor de inclinación (0° plano, 35° óptimo, 60° muy inclinado)
const getTiltFactor = (tiltDeg: number): number => {
  const tilt = Math.min(60, Math.max(0, tiltDeg));
  if (tilt <= 35) return 0.9 + (tilt / 35) * 0.1;
  else return 1.0 - ((tilt - 35) / 25) * 0.15;
};

// ==================== CÁLCULO DE DISPOSICIÓN DE PANELES ====================
type Obstacle = { x: number; z: number };

const calculateUsableDimensions = (roofLength: number, roofWidth: number, obstacles: Obstacle[]) => {
  const margin = 0.4; // 400 mm
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

// ==================== COMPONENTE 3D DE LA CASA ====================
const House3D: React.FC<{
  roofLength: number;
  roofWidth: number;
  layout: { panelPositions: { x: number; z: number }[] } | null;
  panelType: 'monocrystalline' | 'polycrystalline';
  obstacles: Obstacle[];
  orientationDeg: number;
}> = ({ roofLength, roofWidth, layout, panelType, obstacles, orientationDeg }) => {
  const groupRef = useRef<THREE.Group>(null);

  // Aplicar rotación según el ángulo (en grados)
  useEffect(() => {
    if (groupRef.current) {
      const rad = (orientationDeg * Math.PI) / 180;
      groupRef.current.rotation.y = rad;
    }
  }, [orientationDeg]);

  return (
    <group ref={groupRef}>
      {/* Base / suelo */}
      <Box args={[roofLength + 1, 0.2, roofWidth + 1]} position={[0, -0.5, 0]}>
        <meshStandardMaterial color="#8B5A2B" />
      </Box>

      {/* Tejado (simple caja) */}
      <Box args={[roofLength, 0.1, roofWidth]} position={[0, 0.2, 0]}>
        <meshStandardMaterial color="#C0A080" />
      </Box>

      {/* Paneles solares */}
      {layout && layout.panelPositions.map((pos, idx) => {
        const panelW = PANEL_DIMENSIONS[panelType].width;
        const panelH = PANEL_DIMENSIONS[panelType].height;
        const panelColor = panelType === 'monocrystalline' ? "#1E3A8A" : "#3B82F6";
        return (
          <Box key={idx} args={[panelW, 0.05, panelH]} position={[pos.x, 0.35, pos.z]}>
            <meshStandardMaterial color={panelColor} metalness={0.7} roughness={0.3} />
          </Box>
        );
      })}

      {/* Obstáculos (chimeneas) */}
      {obstacles.map((obs, idx) => (
        <Box key={`obs-${idx}`} args={[0.5, 0.8, 0.5]} position={[obs.x, 0.1, obs.z]}>
          <meshStandardMaterial color="#A52A2A" />
        </Box>
      ))}
    </group>
  );
};

// ==================== COMPONENTE PRINCIPAL ====================
const SolarPanelCalculator: React.FC = () => {
  // Estado de dimensiones y obstáculos
  const [roofLength, setRoofLength] = useState(8);
  const [roofWidth, setRoofWidth] = useState(5);
  const [panelType, setPanelType] = useState<'monocrystalline' | 'polycrystalline'>('monocrystalline');
  const [obstacles, setObstacles] = useState<Obstacle[]>([]);
  const [orientationDeg, setOrientationDeg] = useState(0); // 0 = sur
  const [tiltDeg, setTiltDeg] = useState(35);
  const [selectedCountry, setSelectedCountry] = useState("United Kingdom");
  const [region, setRegion] = useState<'north' | 'south'>('south');

  // Costes editables
  const [panelPricePerUnit, setPanelPricePerUnit] = useState(REAL_PANEL_PRICES.monocrystalline);
  const [inverterType, setInverterType] = useState<'string' | 'micro' | 'hybrid'>('string');
  const [inverterCost, setInverterCost] = useState(900);
  const [mountingCost, setMountingCost] = useState(450);
  const [scaffoldingCost, setScaffoldingCost] = useState(600);
  const [electricalCost, setElectricalCost] = useState(350);
  const [labourCost, setLabourCost] = useState(1150);
  const [adminCost, setAdminCost] = useState(175);

  // Parámetros financieros
  const [selfConsumptionPercent, setSelfConsumptionPercent] = useState(50);
  const [exportTariff, setExportTariff] = useState(15);
  const [monthlyBill, setMonthlyBill] = useState(120);
  const importPrice = 24; // p/kWh

  // Layout calculado automáticamente
  const [layout, setLayout] = useState<{ totalPanels: number; cols: number; rows: number; panelPositions: { x: number; z: number }[] } | null>(null);

  // Recalcular layout al cambiar dimensiones o tipo de panel u obstáculos
  useEffect(() => {
    const panel = PANEL_DIMENSIONS[panelType];
    const { length, width } = calculateUsableDimensions(roofLength, roofWidth, obstacles);
    const newLayout = calculatePanelLayout(length, width, panel.width, panel.height, obstacles);
    setLayout(newLayout);
  }, [roofLength, roofWidth, panelType, obstacles]);

  // Sincronizar precio del panel con el tipo seleccionado
  useEffect(() => {
    setPanelPricePerUnit(REAL_PANEL_PRICES[panelType]);
  }, [panelType]);

  // Sincronizar coste del inversor según tipo
  useEffect(() => {
    const inverterPrices = { string: 900, micro: 1400, hybrid: 1600 };
    setInverterCost(inverterPrices[inverterType]);
  }, [inverterType]);

  // Cálculos de producción
  const totalWp = layout ? layout.totalPanels * PANEL_DIMENSIONS[panelType].powerWp : 0;
  const orientationFactor = getOrientationFactor(orientationDeg);
  const tiltFactor = getTiltFactor(tiltDeg);
  const getInsolation = () => {
    const country = countriesInsolation.find(c => c.name === selectedCountry);
    if (!country) return 1000;
    return region === 'south' ? country.south : country.north;
  };
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

  const addObstacle = () => setObstacles([...obstacles, { x: 1.5, z: 2.0 }]);
  const removeObstacle = (index: number) => setObstacles(obstacles.filter((_, i) => i !== index));

  const monoImage = 'https://res.cloudinary.com/dwealmbfi/image/upload/v1779970838/Monocristaline_imbvt7.png';
  const polyImage = 'https://res.cloudinary.com/dwealmbfi/image/upload/v1779971127/afbc2e44-892f-4e87-83f4-b19cc739626d.png';

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-3xl font-light mb-2 text-center">Solar Panel Designer – 3D Interactive</h2>
      <p className="text-sm text-gray-600 mb-6 text-center">
        * All prices exclude VAT (0% valid until March 2027). Use the slider to rotate the house.
      </p>

      {/* Lienzo 3D con la casa orientable */}
      <div className="w-full h-[500px] bg-gray-100 rounded-xl overflow-hidden mb-6">
        <Canvas camera={{ position: [6, 5, 8], fov: 45 }}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 10, 5]} intensity={1} />
          <House3D
            roofLength={roofLength}
            roofWidth={roofWidth}
            layout={layout}
            panelType={panelType}
            obstacles={obstacles}
            orientationDeg={orientationDeg}
          />
          <OrbitControls enablePan={false} enableZoom={true} zoomSpeed={1.0} rotateSpeed={1.0} target={[0, 1, 0]} />
        </Canvas>
      </div>

      {/* Controles en una sola columna */}
      <div className="grid grid-cols-1 gap-6">
        {/* Dimensiones y tipo de panel */}
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="block font-medium">Roof length (m):</label>
            <input type="number" step="0.5" value={roofLength} onChange={(e) => setRoofLength(parseFloat(e.target.value))} className="border p-2 rounded w-full" />
          </div>
          <div>
            <label className="block font-medium">Roof width (m):</label>
            <input type="number" step="0.5" value={roofWidth} onChange={(e) => setRoofWidth(parseFloat(e.target.value))} className="border p-2 rounded w-full" />
          </div>
          <div>
            <label className="block font-medium">Panel type:</label>
            <select value={panelType} onChange={(e) => setPanelType(e.target.value as any)} className="border p-2 rounded w-full">
              <option value="monocrystalline">Monocristalino (TOPCon) – £80/panel</option>
              <option value="polycrystalline">Policristalino (PERC) – £65/panel</option>
            </select>
            <div className="mt-1 flex justify-center">
              <img src={panelType === 'monocrystalline' ? monoImage : polyImage} alt={panelType} className="h-16 w-auto rounded shadow" />
            </div>
          </div>
        </div>

        {/* Inversor y obstáculos */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium">Inverter type:</label>
            <select value={inverterType} onChange={(e) => setInverterType(e.target.value as any)} className="border p-2 rounded w-full">
              <option value="string">String inverter (3.68 kW) – £900</option>
              <option value="micro">Microinverters (per panel) – £1400</option>
              <option value="hybrid">Hybrid inverter (battery ready) – £1600</option>
            </select>
          </div>
          <div>
            <label className="block font-medium">Obstacles (chimneys):</label>
            <button onClick={addObstacle} className="bg-gray-500 text-white px-3 py-1 rounded mr-2">+ Add</button>
            {obstacles.map((_, idx) => (
              <button key={idx} onClick={() => removeObstacle(idx)} className="bg-red-500 text-white px-2 py-1 rounded text-sm ml-1">Remove {idx+1}</button>
            ))}
          </div>
        </div>

        {/* Costes editables */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-bold text-lg mb-2">💰 Edit your cost estimates (0% VAT)</h3>
          <div className="grid md:grid-cols-3 gap-3 text-sm">
            <div className="flex justify-between items-center"><label>Panel price (£/panel):</label><input type="number" value={panelPricePerUnit} onChange={(e) => setPanelPricePerUnit(parseFloat(e.target.value))} className="border p-1 rounded w-28 text-right" step="5" /></div>
            <div className="flex justify-between items-center"><label>Inverter cost (£):</label><input type="number" value={inverterCost} onChange={(e) => setInverterCost(parseFloat(e.target.value))} className="border p-1 rounded w-28 text-right" step="50" /></div>
            <div className="flex justify-between items-center"><label>Mounting system (£):</label><input type="number" value={mountingCost} onChange={(e) => setMountingCost(parseFloat(e.target.value))} className="border p-1 rounded w-28 text-right" step="50" /></div>
            <div className="flex justify-between items-center"><label>Scaffolding (£):</label><input type="number" value={scaffoldingCost} onChange={(e) => setScaffoldingCost(parseFloat(e.target.value))} className="border p-1 rounded w-28 text-right" step="50" /></div>
            <div className="flex justify-between items-center"><label>Electrical components (£):</label><input type="number" value={electricalCost} onChange={(e) => setElectricalCost(parseFloat(e.target.value))} className="border p-1 rounded w-28 text-right" step="50" /></div>
            <div className="flex justify-between items-center"><label>Labour (MCS) (£):</label><input type="number" value={labourCost} onChange={(e) => setLabourCost(parseFloat(e.target.value))} className="border p-1 rounded w-28 text-right" step="50" /></div>
            <div className="flex justify-between items-center"><label>MCS/DNO admin (£):</label><input type="number" value={adminCost} onChange={(e) => setAdminCost(parseFloat(e.target.value))} className="border p-1 rounded w-28 text-right" step="25" /></div>
          </div>
        </div>

        {/* Ubicación, orientación e inclinación */}
        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="font-bold text-lg mb-2">🌍 Location, Orientation & Roof Pitch</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium">Country:</label>
              <select value={selectedCountry} onChange={(e) => setSelectedCountry(e.target.value)} className="border p-2 rounded w-full">
                {countriesInsolation.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block font-medium">Region:</label>
              <select value={region} onChange={(e) => setRegion(e.target.value as 'north' | 'south')} className="border p-2 rounded w-full">
                <option value="south">Southern half (higher irradiance)</option>
                <option value="north">Northern half (lower irradiance)</option>
              </select>
            </div>
          </div>
          <div className="mt-3">
            <label className="block font-medium">Roof orientation (degrees from south):</label>
            <input type="range" min="0" max="360" step="1" value={orientationDeg} onChange={(e) => setOrientationDeg(parseInt(e.target.value))} className="w-full" />
            <div className="flex justify-between text-xs"><span>0° S</span><span>90° E</span><span>180° N</span><span>270° W</span><span>360° S</span></div>
            <p className="text-sm mt-1">Current: <strong>{orientationDeg}°</strong> → Orientation factor: <strong>{orientationFactor.toFixed(2)}</strong></p>
          </div>
          <div className="mt-3">
            <label className="block font-medium">Roof pitch (tilt) degrees:</label>
            <input type="range" min="0" max="60" step="1" value={tiltDeg} onChange={(e) => setTiltDeg(parseInt(e.target.value))} className="w-full" />
            <div className="flex justify-between text-xs"><span>0° flat</span><span>35° optimal</span><span>60° steep</span></div>
            <p className="text-sm mt-1">Current tilt: <strong>{tiltDeg}°</strong> → Factor: <strong>{tiltFactor.toFixed(2)}</strong></p>
          </div>
          <div className="mt-2 text-sm">
            <p>🏠 Base insolation: {insolation} kWh/kWp/year (south-facing, optimal tilt)</p>
          </div>
        </div>

        {/* Resultados del diseño */}
        {layout && (
          <>
            <div className="bg-gray-100 p-4 rounded-lg text-center">
              <h3 className="font-bold text-lg">📐 Layout Results</h3>
              <p><strong>Total panels:</strong> {layout.totalPanels} &nbsp;| <strong>Columns:</strong> {layout.cols} &nbsp;| <strong>Rows:</strong> {layout.rows}</p>
              <p><strong>Estimated power:</strong> {totalWp.toFixed(0)} Wp &nbsp;| <strong>Installation area:</strong> {(layout.totalPanels * PANEL_DIMENSIONS[panelType].width * PANEL_DIMENSIONS[panelType].height).toFixed(1)} m²</p>
              <p className="text-xs text-gray-500">* Margins: 400mm edges, 20mm gap. UK MCS compliant.</p>
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg">
              <h3 className="font-bold text-lg">☀️ Seasonal Production</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                <div className="bg-white p-2 rounded text-center">🌱 Spring<br/>{seasonalKwh.spring.toFixed(0)} kWh</div>
                <div className="bg-white p-2 rounded text-center">☀️ Summer<br/>{seasonalKwh.summer.toFixed(0)} kWh</div>
                <div className="bg-white p-2 rounded text-center">🍂 Autumn<br/>{seasonalKwh.autumn.toFixed(0)} kWh</div>
                <div className="bg-white p-2 rounded text-center">❄️ Winter<br/>{seasonalKwh.winter.toFixed(0)} kWh</div>
              </div>
            </div>

            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="font-bold text-lg">💰 Financial Analysis</h3>
              <div className="grid md:grid-cols-2 gap-3 text-sm">
                <div>
                  <p>Annual generation: <strong>{annualKwh.toFixed(0)} kWh</strong></p>
                  <label className="block mt-2">Self-consumption (%):</label>
                  <input type="range" min="0" max="100" step="5" value={selfConsumptionPercent} onChange={(e) => setSelfConsumptionPercent(parseInt(e.target.value))} className="w-full" />
                  <p>{selfConsumptionPercent}% consumed, {100-selfConsumptionPercent}% exported</p>
                </div>
                <div>
                  <div className="flex justify-between"><span>Export tariff (p/kWh):</span><input type="number" step="0.5" value={exportTariff} onChange={(e) => setExportTariff(parseFloat(e.target.value))} className="border p-1 rounded w-28 text-right" /></div>
                  <div className="flex justify-between mt-1"><span>Monthly bill (£):</span><input type="number" step="10" value={monthlyBill} onChange={(e) => setMonthlyBill(parseFloat(e.target.value))} className="border p-1 rounded w-28 text-right" /></div>
                </div>
              </div>
              <div className="mt-3 text-sm border-t pt-2">
                <p>✅ Self-consumed: {selfConsumedKwh.toFixed(0)} kWh → saves <strong>£{annualSavingFromSelf.toFixed(0)}/year</strong></p>
                <p>📡 Exported: {exportedKwh.toFixed(0)} kWh → income <strong>£{annualExportIncome.toFixed(0)}/year</strong></p>
                <p className="font-semibold">💰 Total annual benefit: <span className="text-green-700">£{totalAnnualBenefit.toFixed(0)}</span></p>
                <p>🏠 New monthly bill: <strong>£{newMonthlyBill.toFixed(0)}</strong> (saving £{monthlyBillSaving.toFixed(0)}/month)</p>
                <p>📅 Payback period: <strong>{paybackYears.toFixed(1)} years</strong> (installation cost £{totalInstallCost.toFixed(0)})</p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SolarPanelCalculator;
