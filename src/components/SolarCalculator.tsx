import React, { useState } from 'react';

const SolarCalculator: React.FC = () => {
  const [postcode, setPostcode] = useState('');
  const [peakPower, setPeakPower] = useState(4);
  const [inclination, setInclination] = useState(35);
  const [azimuth, setAzimuth] = useState(0);
  const [battery, setBattery] = useState(0);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleCalculate = async () => {
    if (!postcode) return;
    setLoading(true);
    try {
      const params = new URLSearchParams({
        postcode,
        peakPower: peakPower.toString(),
        inclination: inclination.toString(),
        azimuth: azimuth.toString(),
        battery: battery.toString(),
      });
      const res = await fetch(`/api/solar-calc?${params}`);
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setResult(data);
    } catch (err) {
      console.error(err);
      alert('Error calculating. Please try again or contact us.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
      <h3 className="text-2xl font-bold mb-4">☀️ Instant solar estimate for your home</h3>
      <p className="text-gray-600 mb-4">Enter your postcode and basic roof data to see your potential savings.</p>
      
      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <input
          type="text"
          placeholder="Postcode (e.g., NN17 1AB)"
          value={postcode}
          onChange={(e) => setPostcode(e.target.value)}
          className="border p-2 rounded"
        />
        
        <div>
          <label className="block text-sm font-medium">System size (kWp)</label>
          <input
            type="number"
            step="0.5"
            value={peakPower}
            onChange={(e) => setPeakPower(parseFloat(e.target.value))}
            className="border p-2 rounded w-full"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium">Roof tilt (degrees)</label>
          <input
            type="number"
            value={inclination}
            onChange={(e) => setInclination(parseInt(e.target.value))}
            className="border p-2 rounded w-full"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium">Roof orientation</label>
          <select
            value={azimuth}
            onChange={(e) => setAzimuth(parseInt(e.target.value))}
            className="border p-2 rounded w-full"
          >
            <option value="0">South (best)</option>
            <option value="-90">East</option>
            <option value="90">West</option>
            <option value="180">North</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium">Battery capacity (kWh)</label>
          <input
            type="number"
            step="1"
            value={battery}
            onChange={(e) => setBattery(parseFloat(e.target.value))}
            className="border p-2 rounded w-full"
          />
          <p className="text-xs text-gray-500">0 = no battery</p>
        </div>
      </div>
      
      <button
        onClick={handleCalculate}
        disabled={loading}
        className="bg-red-600 text-white px-6 py-2 rounded-full hover:bg-red-700 transition disabled:opacity-50"
      >
        {loading ? 'Calculating...' : 'Calculate my solar potential →'}
      </button>

      {result && (
        <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
          <h4 className="font-bold text-lg mb-2">📊 Your estimated solar potential</h4>
          <p><strong>Annual production:</strong> {result.produccion_kwh} kWh</p>
          <p><strong>Direct savings on bill:</strong> £{result.ahorro_directo_gbp} / year</p>
          <p><strong>Excess energy sold:</strong> £{result.ingreso_excedente_gbp} / year</p>
          <p><strong>CO₂ saved:</strong> {result.co2_evitado_kg} kg/year</p>
          {result.inclinacion_optima && (
            <p><strong>Optimal tilt for your location:</strong> {result.inclinacion_optima}°</p>
          )}
          {result.bateria && (
            <>
              <hr className="my-2" />
              <p><strong>🔋 Battery ({result.bateria.capacidad_kwh} kWh):</strong> +£{result.bateria.ahorro_adicional_gbp}/year extra saving</p>
              <p>Estimated battery cost: £{result.bateria.costo_estimado_gbp}</p>
              <p>Payback period: {result.bateria.payback_anos} years</p>
            </>
          )}
          <p className="text-xs text-gray-500 mt-3">* Estimates based on typical household consumption (4,500 kWh/year). For a precise quote, contact us.</p>
        </div>
      )}
    </div>
  );
};

export default SolarCalculator;
