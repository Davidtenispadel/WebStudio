import React, { useState } from 'react';
import SolarFeedingResult from './SolarFeedingResult';

const SolarPanelCalculator: React.FC = () => {
  // ==================== ESTADOS ====================
  const [systemSize, setSystemSize] = useState<number>(4); // kWp
  const [orientation, setOrientation] = useState<string>('south');
  const [pitch, setPitch] = useState<number>(35); // grados
  const [location, setLocation] = useState<string>('uk'); // 'uk' o 'spain'
  const [monthlyConsumption, setMonthlyConsumption] = useState<number>(400); // kWh/mes
  const [elecPrice, setElecPrice] = useState<number>(0.28); // £/kWh (UK)
  const [segRate, setSegRate] = useState<number>(0.05); // £/kWh (export)
  const [installCost, setInstallCost] = useState<number>(6500); // £

  // ==================== FACTORES DE PRODUCCIÓN ====================
  const getAnnualProduction = () => {
    // kWh por kWp al año según ubicación
    let baseKwhPerKwp = location === 'uk' ? 950 : 1600; // UK sur / España media
    // Ajuste por orientación
    const orientationFactor: Record<string, number> = {
      south: 1.0,
      southeast: 0.95,
      southwest: 0.95,
      east: 0.85,
      west: 0.85,
      north: 0.55,
    };
    // Ajuste por inclinación (simple: óptimo 35°, pérdidas si se aleja)
    const pitchFactor = Math.max(0.7, 1 - Math.abs(pitch - 35) / 100);
    const factor = (orientationFactor[orientation] || 0.85) * pitchFactor;
    return systemSize * baseKwhPerKwp * factor;
  };

  const annualProduction = getAnnualProduction(); // kWh/año
  const monthlyProduction = annualProduction / 12;

  // ==================== AUTOCONSUMO Y EXPORTACIÓN ====================
  // El autoconsumo no puede superar ni la producción ni el consumo
  const monthlyConsumptionKwh = monthlyConsumption;
  const selfConsumedMonthly = Math.min(monthlyProduction, monthlyConsumptionKwh);
  const exportedMonthly = Math.max(0, monthlyProduction - monthlyConsumptionKwh);
  const gridPurchaseMonthly = Math.max(0, monthlyConsumptionKwh - monthlyProduction);

  // Valores anuales
  const selfConsumedYearly = selfConsumedMonthly * 12;
  const exportedYearly = exportedMonthly * 12;
  const gridPurchaseYearly = gridPurchaseMonthly * 12;

  // ==================== FINANZAS ====================
  const annualSavings = selfConsumedYearly * elecPrice;
  const annualExportIncome = exportedYearly * segRate;
  const totalAnnualBenefit = annualSavings + annualExportIncome;
  const paybackYears = totalAnnualBenefit > 0 ? installCost / totalAnnualBenefit : 0;
  const roi = (totalAnnualBenefit / installCost) * 100;

  // ==================== RENDER ====================
  return (
    <div className="my-8 p-5 bg-gray-50 rounded-2xl shadow-md">
      <h3 className="text-2xl font-semibold mb-4">☀️ Calculadora solar interactiva</h3>
      <p className="text-sm text-gray-600 mb-4">
        Introduce los datos de tu instalación y consumo para obtener el análisis financiero y ver qué electrodomésticos podrías alimentar.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Columna izquierda - inputs */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Tamaño del sistema (kWp)</label>
            <input
              type="range"
              min="1"
              max="10"
              step="0.5"
              value={systemSize}
              onChange={(e) => setSystemSize(parseFloat(e.target.value))}
              className="w-full"
            />
            <span className="text-sm">{systemSize} kWp</span>
          </div>

          <div>
            <label className="block text-sm font-medium">Orientación del tejado</label>
            <select
              value={orientation}
              onChange={(e) => setOrientation(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="south">Sur</option>
              <option value="southeast">Sureste</option>
              <option value="southwest">Suroeste</option>
              <option value="east">Este</option>
              <option value="west">Oeste</option>
              <option value="north">Norte</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium">Inclinación (grados)</label>
            <input
              type="range"
              min="0"
              max="60"
              value={pitch}
              onChange={(e) => setPitch(parseInt(e.target.value))}
              className="w-full"
            />
            <span className="text-sm">{pitch}°</span>
          </div>

          <div>
            <label className="block text-sm font-medium">Ubicación</label>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="uk">Reino Unido (sur)</option>
              <option value="spain">España (centro/sur)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium">Consumo eléctrico mensual (kWh)</label>
            <input
              type="number"
              value={monthlyConsumption}
              onChange={(e) => setMonthlyConsumption(parseFloat(e.target.value) || 0)}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Precio electricidad (£/kWh)</label>
            <input
              type="number"
              step="0.01"
              value={elecPrice}
              onChange={(e) => setElecPrice(parseFloat(e.target.value))}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Tarifa SEG exportación (£/kWh)</label>
            <input
              type="number"
              step="0.01"
              value={segRate}
              onChange={(e) => setSegRate(parseFloat(e.target.value))}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Coste instalación (£)</label>
            <input
              type="number"
              value={installCost}
              onChange={(e) => setInstallCost(parseFloat(e.target.value))}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>

        {/* Columna derecha - resultados financieros */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h4 className="font-bold text-lg mb-3">📈 Resultados financieros</h4>
          <div className="space-y-2 text-sm">
            <p>🔆 Producción anual: <strong>{Math.round(annualProduction)} kWh</strong></p>
            <p>🏠 Autoconsumo anual: <strong>{Math.round(selfConsumedYearly)} kWh</strong></p>
            <p>📤 Exportación anual: <strong>{Math.round(exportedYearly)} kWh</strong></p>
            <p>🛒 Compra a red anual: <strong>{Math.round(gridPurchaseYearly)} kWh</strong></p>
            <hr />
            <p>💰 Ahorro anual: <strong>£{(annualSavings).toFixed(0)}</strong></p>
            <p>💸 Ingreso por excedentes: <strong>£{(annualExportIncome).toFixed(0)}</strong></p>
            <p className="text-green-700 font-semibold">💵 Beneficio total anual: <strong>£{(totalAnnualBenefit).toFixed(0)}</strong></p>
            <p>⏱️ Payback: <strong>{paybackYears.toFixed(1)} años</strong></p>
            <p>📊 ROI anual: <strong>{roi.toFixed(1)}%</strong></p>
          </div>
        </div>
      </div>

      {/* ========== TABLA DE ALIMENTACIÓN (SOLAR FEEDING RESULT) ========== */}
      {selfConsumedMonthly > 0 && (
        <div className="mt-8">
          <SolarFeedingResult selfConsumedKwhPerMonth={selfConsumedMonthly} />
        </div>
      )}
    </div>
  );
};

export default SolarPanelCalculator;
