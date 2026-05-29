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
  perc: {
    name: "PERC (monocristalino)",
    price: 75,
    powerWp: 410,
    efficiency: "18‑20%",
    appearance: "Dark blue/black, 9‑12 thick busbars, visible ribs",
    imageType: "mono"
  },
  topcon: {
    name: "TOPCon (monocristalino)",
    price: 85,
    powerWp: 440,
    efficiency: "20‑22.5%",
    appearance: "Intense black, 12‑16 very thin busbars, clean minimal reflections",
    imageType: "mono"
  },
  hjt: {
    name: "HJT (monocristalino)",
    price: 95,
    powerWp: 460,
    efficiency: "21‑23%",
    appearance: "Jet black, 6‑8 extremely thin busbars, uniform black mirror",
    imageType: "mono"
  },
  ibc: {
    name: "IBC (monocristalino)",
    price: 110,
    powerWp: 480,
    efficiency: "22‑24%",
    appearance: "Pure black, no front busbars, smooth no grid",
    imageType: "mono"
  },
  poly: {
    name: "Policristalino (policristalino)",
    price: 65,
    powerWp: 400,
    efficiency: "16‑18%",
    appearance: "Speckled blue, visible crystal fragments",
    imageType: "poly"
  }
};
type PanelKey = keyof typeof PANEL_CATALOG;

// ==================== FACTORES DE ORIENTACIÓN E INCLINACIÓN ====================
const getOrientationFactor = (deg: number): number => {
  let angle = deg % 360;
  if (angle < 0) angle += 360;
  const anchors = [
    { deg: 0, factor: 1.0 },   // Sur
    { deg: 45, factor: 0.85 }, // Sureste
    { deg: 90, factor: 0.75 }, // Este
    { deg: 135, factor: 0.55 },// Noreste
    { deg: 180, factor: 0.35 },// Norte
    { deg: 225, factor: 0.55 },// Noroeste
    { deg: 270, factor: 0.75 },// Oeste
    { deg: 315, factor: 0.85 },// Suroeste
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

const getTiltFactor = (tiltDeg: number): number => {
  const tilt = Math.min(60, Math.max(0, tiltDeg));
  if (tilt <= 35) return 0.9 + (tilt / 35) * 0.1;
  else return 1.0 - ((tilt - 35) / 25) * 0.15;
};

// Color dinámico según factor (verde=1, rojo=mínimo)
const getColorFromFactor = (factor: number, minFactor: number, maxFactor: number): string => {
  const t = (factor - minFactor) / (maxFactor - minFactor);
  const r = Math.floor(255 * (1 - t));
  const g = Math.floor(255 * t);
  const b = 0;
  return `rgb(${r}, ${g}, ${b})`;
};

// ==================== CÁLCULO DE DISPOSICIÓN ====================
type Obstacle = { x: number; z: number };
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

// ==================== COMPONENTE PRINCIPAL ====================
const SolarPanelCalculator: React.FC = () => {
  const [roofLength, setRoofLength] = useState(8);
  const [roofWidth, setRoofWidth] = useState(5);
  const [panelKey, setPanelKey] = useState<PanelKey>('topcon');
  const [obstacles, setObstacles] = useState<Obstacle[]>([]);
  const [orientationDeg, setOrientationDeg] = useState(0);
  const [tiltDeg, setTiltDeg] = useState(35);
  const [selectedCountry, setSelectedCountry] = useState("United Kingdom");
  const [region, setRegion] = useState<'north' | 'south'>('south');

  // Costes editables
  const [panelPricePerUnit, setPanelPricePerUnit] = useState(PANEL_CATALOG.topcon.price);
  const [inverterType, setInverterType] = useState<'string' | 'micro' | 'hybrid'>('string');
  const [inverterCost, setInverterCost] = useState(900);
  const [mountingCost, setMountingCost] = useState(450);
  const [scaffoldingCost, setScaffoldingCost] = useState(600);
  const [electricalCost, setElectricalCost] = useState(350);
  const [labourCost, setLabourCost] = useState(1150);
  const [adminCost, setAdminCost] = useState(175);

  // Financieros
  const [selfConsumptionPercent, setSelfConsumptionPercent] = useState(50);
  const [exportTariff, setExportTariff] = useState(15);
  const [monthlyBill, setMonthlyBill] = useState(120);
  const importPrice = 24;

  const [layout, setLayout] = useState<{ totalPanels: number; cols: number; rows: number; panelPositions: { x: number; z: number }[] } | null>(null);

  useEffect(() => {
    const panelW = 1.0;
    const panelH = 1.7;
    const { length, width } = calculateUsableDimensions(roofLength, roofWidth, obstacles);
    const newLayout = calculatePanelLayout(length, width, panelW, panelH, obstacles);
    setLayout(newLayout);
  }, [roofLength, roofWidth, panelKey, obstacles]);

  useEffect(() => {
    setPanelPricePerUnit(PANEL_CATALOG[panelKey].price);
  }, [panelKey]);

  useEffect(() => {
    const inverterPrices = { string: 900, micro: 1400, hybrid: 1600 };
    setInverterCost(inverterPrices[inverterType]);
  }, [inverterType]);

  // Cálculo de producción
  const totalWp = layout ? layout.totalPanels * PANEL_CATALOG[panelKey].powerWp : 0;
  const orientationFactor = getOrientationFactor(orientationDeg);
  const tiltFactor = getTiltFactor(tiltDeg);
  const insolation = (() => {
    const country = countriesInsolation.find(c => c.name === selectedCountry);
    if (!country) return 1000;
    return region === 'south' ? country.south : country.north;
  })();
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

  // Colores dinámicos para sliders
  const orientationColor = getColorFromFactor(orientationFactor, 0.35, 1.0);
  const tiltColor = getColorFromFactor(tiltFactor, 0.85, 1.0); // tilt factor min ~0.85, max 1.0

  // Imágenes
  const monoImage = 'https://res.cloudinary.com/dwealmbfi/image/upload/v1779970838/Monocristaline_imbvt7.png';
  const polyImage = 'https://res.cloudinary.com/dwealmbfi/image/upload/v1779971127/afbc2e44-892f-4e87-83f4-b19cc739626d.png';
  const currentPanelImage = PANEL_CATALOG[panelKey].imageType === 'mono' ? monoImage : polyImage;

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-3xl font-light mb-2 text-center">Solar Panel Designer – 2D Interactive</h2>
      <p className="text-sm text-gray-600 mb-6 text-center">
        * All prices exclude VAT (0% valid until March 2027). Adjust orientation and tilt with the sliders.
      </p>

      {/* Compass de orientación */}
      <div className="bg-gray-100 p-4 rounded-lg mb-6 flex flex-col items-center">
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
          {/* Flecha giratoria desde el centro (apunta al sur = 0°, gira con el ángulo) */}
          <div
            className="absolute top-1/2 left-1/2 w-0 h-0"
            style={{
              transform: `translate(-50%, -50%) rotate(${orientationDeg}deg)`,
              transformOrigin: 'center'
            }}
          >
            <div
              style={{
                width: 0,
                height: 0,
                borderLeft: '8px solid transparent',
                borderRight: '8px solid transparent',
                borderBottom: `24px solid ${orientationColor}`,
                position: 'relative',
                left: '-8px',
                top: '-36px'
              }}
            />
            <div
              style={{
                position: 'absolute',
                width: '2px',
                height: '36px',
                backgroundColor: orientationColor,
                left: '-1px',
                top: '-12px'
              }}
            />
          </div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl">🏠</div>
        </div>
        <div className="w-full max-w-md">
          <label className="block text-center font-medium">Roof orientation (degrees from south):</label>
          <div className="relative w-full h-8 flex items-center">
            <input
              type="range"
              min="0"
              max="360"
              step="1"
              value={orientationDeg}
              onChange={(e) => setOrientationDeg(parseInt(e.target.value))}
              className="w-full appearance-none bg-transparent focus:outline-none"
            />
            <style>{`
              input[type=range]::-webkit-slider-thumb {
                -webkit-appearance: none;
                width: 20px;
                height: 20px;
                border-radius: 50%;
                background: ${orientationColor};
                cursor: pointer;
                box-shadow: 0 0 4px rgba(0,0,0,0.3);
                border: 2px solid white;
              }
              input[type=range]::-webkit-slider-runnable-track {
                height: 4px;
                background: transparent;
              }
              input[type=range]::-moz-range-thumb {
                width: 20px;
                height: 20px;
                border-radius: 50%;
                background: ${orientationColor};
                cursor: pointer;
                border: none;
              }
              input[type=range]::-moz-range-track {
                background: transparent;
              }
            `}</style>
          </div>
          <p className="text-center text-sm mt-1"><strong>{orientationDeg}°</strong> → Orientation factor: <strong>{orientationFactor.toFixed(2)}</strong></p>
        </div>
      </div>

      {/* Representación gráfica del pitch (inclinación) */}
      <div className="bg-gray-100 p-4 rounded-lg mb-6 flex flex-col items-center">
        <h3 className="font-semibold mb-2">Roof tilt (pitch) visualization</h3>
        <div className="relative w-full max-w-md h-40 flex justify-center items-center">
          <svg width="300" height="150" viewBox="0 0 300 150" className="mx-auto">
            {/* Suelo */}
            <line x1="20" y1="130" x2="280" y2="130" stroke="#666" strokeWidth="2" />
            {/* Panel inclinado */}
            <g transform={`translate(150, 130) rotate(${-tiltDeg})`}>
              <rect x="-40" y="-70" width="80" height="10" fill="#4A90D9" stroke="#333" strokeWidth="1" />
              <rect x="-40" y="-70" width="80" height="3" fill="#FFD700" opacity="0.6" />
            </g>
            {/* Arco del ángulo */}
            <path
              d={`M 110 130 A 40 40 0 0 1 ${150 - 40 * Math.sin(tiltDeg * Math.PI / 180)} ${130 - 40 * Math.cos(tiltDeg * Math.PI / 180)}`}
              fill="none"
              stroke="#888"
              strokeWidth="1.5"
              strokeDasharray="4"
            />
            <text x="105" y="115" fontSize="12" fill="#333">{tiltDeg}°</text>
          </svg>
        </div>
        <div className="w-full max-w-md mt-2">
          <label className="block text-center font-medium">Roof pitch (tilt) degrees:</label>
          <div className="relative w-full h-8 flex items-center">
            <input
              type="range"
              min="0"
              max="60"
              step="1"
              value={tiltDeg}
              onChange={(e) => setTiltDeg(parseInt(e.target.value))}
              className="w-full appearance-none bg-transparent focus:outline-none"
            />
            <style>{`
              input[type=range]::-webkit-slider-thumb {
                -webkit-appearance: none;
                width: 20px;
                height: 20px;
                border-radius: 50%;
                background: ${tiltColor};
                cursor: pointer;
                box-shadow: 0 0 4px rgba(0,0,0,0.3);
                border: 2px solid white;
              }
              input[type=range]::-webkit-slider-runnable-track {
                height: 4px;
                background: transparent;
              }
              input[type=range]::-moz-range-thumb {
                width: 20px;
                height: 20px;
                border-radius: 50%;
                background: ${tiltColor};
                cursor: pointer;
                border: none;
              }
              input[type=range]::-moz-range-track {
                background: transparent;
              }
            `}</style>
          </div>
          <p className="text-center text-sm mt-1"><strong>{tiltDeg}°</strong> → Tilt factor: <strong>{tiltFactor.toFixed(2)}</strong></p>
          <p className="text-center text-xs text-gray-500">Optimal ~35° (green), flat or steep roofs (orange/red) produce less.</p>
        </div>
      </div>

      {/* Controles en una columna (resto del componente) */}
      <div className="grid grid-cols-1 gap-6">
        {/* Dimensiones y tipo de panel */}
        <div className="grid md:grid-cols-3 gap-4">
          <div><label className="block font-medium">Roof length (m):</label><input type="number" step="0.5" value={roofLength} onChange={(e) => setRoofLength(parseFloat(e.target.value))} className="border p-2 rounded w-full" /></div>
          <div><label className="block font-medium">Roof width (m):</label><input type="number" step="0.5" value={roofWidth} onChange={(e) => setRoofWidth(parseFloat(e.target.value))} className="border p-2 rounded w-full" /></div>
          <div>
            <label className="block font-medium">Panel type:</label>
            <select value={panelKey} onChange={(e) => setPanelKey(e.target.value as PanelKey)} className="border p-2 rounded w-full">
              <option value="perc">PERC (monocristalino) – £{PANEL_CATALOG.perc.price}</option>
              <option value="topcon">TOPCon (monocristalino) – £{PANEL_CATALOG.topcon.price}</option>
              <option value="hjt">HJT (monocristalino) – £{PANEL_CATALOG.hjt.price}</option>
              <option value="ibc">IBC (monocristalino) – £{PANEL_CATALOG.ibc.price}</option>
              <option value="poly">Policristalino (policristalino) – £{PANEL_CATALOG.poly.price}</option>
            </select>
            <div className="mt-1 flex justify-center">
              <img src={currentPanelImage} alt={PANEL_CATALOG[panelKey].name} className="h-16 w-auto rounded shadow" />
            </div>
            <p className="text-xs text-gray-500 mt-1">{PANEL_CATALOG[panelKey].appearance}</p>
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
            {obstacles.map((_, idx) => (<button key={idx} onClick={() => removeObstacle(idx)} className="bg-red-500 text-white px-2 py-1 rounded text-sm ml-1">Remove {idx+1}</button>))}
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

        {/* Ubicación */}
        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="font-bold text-lg mb-2">🌍 Location</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div><label className="block font-medium">Country:</label><select value={selectedCountry} onChange={(e) => setSelectedCountry(e.target.value)} className="border p-2 rounded w-full">{countriesInsolation.map(c => <option key={c.name}>{c.name}</option>)}</select></div>
            <div><label className="block font-medium">Region:</label><select value={region} onChange={(e) => setRegion(e.target.value as 'north' | 'south')} className="border p-2 rounded w-full"><option value="south">Southern half</option><option value="north">Northern half</option></select></div>
          </div>
          <p className="text-sm mt-2">Base insolation: {insolation} kWh/kWp/year (south-facing, optimal tilt)</p>
        </div>

        {layout && (
          <>
            <div className="bg-gray-100 p-4 rounded-lg text-center">
              <h3 className="font-bold text-lg">📐 Layout Results</h3>
              <p><strong>Total panels:</strong> {layout.totalPanels} &nbsp;| <strong>Columns:</strong> {layout.cols} &nbsp;| <strong>Rows:</strong> {layout.rows}</p>
              <p><strong>Estimated power:</strong> {totalWp.toFixed(0)} Wp &nbsp;| <strong>Installation area:</strong> {(layout.totalPanels * 1.0 * 1.7).toFixed(1)} m²</p>
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
