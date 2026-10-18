import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

/* ============================================================
   SILUETAS SVG
   ============================================================ */

const TurbineSilhouette = ({ type }) => {
  if (type === "HAWT") {
    return (
      <svg viewBox="0 0 120 160" className="w-32 h-40 mx-auto">
        <rect x="55" y="40" width="10" height="90" fill="#0f172a" />
        <rect x="50" y="35" width="20" height="10" fill="#1e293b" />
        <line x1="60" y1="40" x2="60" y2="5" stroke="#38bdf8" strokeWidth="4" />
        <line x1="60" y1="40" x2="95" y2="40" stroke="#38bdf8" strokeWidth="4" />
        <line x1="60" y1="40" x2="25" y2="40" stroke="#38bdf8" strokeWidth="4" />
        <rect x="45" y="130" width="30" height="10" fill="#0f172a" />
      </svg>
    );
  }

  if (type === "VAWT_DEFLECTOR") {
    return (
      <svg viewBox="0 0 140 160" className="w-36 h-40 mx-auto">
        <rect x="65" y="40" width="10" height="90" fill="#0f172a" />
        <rect x="50" y="50" width="40" height="60" rx="8" fill="#22c55e" />
        <path d="M50 50 C40 80 40 80 50 110" fill="#16a34a" />
        <path d="M90 50 C100 80 100 80 90 110" fill="#16a34a" />
        <polygon points="20,50 45,45 45,115 20,110" fill="#0ea5e9" />
        <rect x="55" y="130" width="30" height="10" fill="#0f172a" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 120 160" className="w-32 h-40 mx-auto">
      <rect x="55" y="40" width="10" height="90" fill="#0f172a" />
      <rect x="45" y="50" width="30" height="60" rx="10" fill="#6366f1" />
      <rect x="45" y="130" width="30" height="10" fill="#0f172a" />
    </svg>
  );
};

/* ============================================================
   CALCULO FÍSICO
   ============================================================ */

const windPower = (rho, area, windSpeed) =>
  0.5 * rho * area * Math.pow(windSpeed, 3);

const hawtPower = (radius, cp, rho, windSpeed) => {
  const area = Math.PI * Math.pow(radius, 2);
  const pWind = windPower(rho, area, windSpeed);
  const pTurbine = cp * pWind;
  return { area, pWind, pTurbine };
};

const vawtPower = (diameter, height, cp, rho, windSpeed) => {
  const area = diameter * height;
  const pWind = windPower(rho, area, windSpeed);
  const pTurbine = cp * pWind;
  return { area, pWind, pTurbine };
};

const vawtDeflectorPower = ({
  diameter,
  height,
  cp,
  rho,
  windSpeed,
  angleDeg,
  cpePressure,
  cpeSuction,
  suctionTorque,
}) => {
  const area = diameter * height;

  const vEff = windSpeed * Math.sqrt(cpePressure - cpeSuction);

  const deflectorFactor = Math.max(0.1, Math.min(1.0, 1 - angleDeg / 90));
  const vDeflector = vEff * deflectorFactor;

  const pWind = windPower(rho, area, vDeflector);
  const pTurbine = cp * pWind;

  const torqueAero = cp * rho * area * Math.pow(vDeflector, 2);
  const torqueTotal = torqueAero + suctionTorque;

  return { area, vEff, vDeflector, pWind, pTurbine, torqueAero, torqueTotal };
};

/* ============================================================
   PÁGINA PRINCIPAL
   ============================================================ */

const WindTurbinesPage: React.FC = () => {
  const navigate = useNavigate();

  /* CALCULADORA */
  const [type, setType] = useState("VAWT_DEFLECTOR");
  const [rho, setRho] = useState(1.225);
  const [windSpeed, setWindSpeed] = useState(5);

  const [radius, setRadius] = useState(2);
  const [cpHawt, setCpHawt] = useState(0.4);

  const [diameter, setDiameter] = useState(1.5);
  const [height, setHeight] = useState(1.5);
  const [cpVawt, setCpVawt] = useState(0.3);

  const [angleDeg, setAngleDeg] = useState(40);
  const [cpePressure, setCpePressure] = useState(0.8);
  const [cpeSuction, setCpeSuction] = useState(-0.5);
  const [suctionTorque, setSuctionTorque] = useState(0.3);

  let result = null;

  if (type === "HAWT") {
    result = hawtPower(radius, cpHawt, rho, windSpeed);
  } else if (type === "VAWT") {
    result = vawtPower(diameter, height, cpVawt, rho, windSpeed);
  } else {
    result = vawtDeflectorPower({
      diameter,
      height,
      cp: cpVawt,
      rho,
      windSpeed,
      angleDeg,
      cpePressure,
      cpeSuction,
      suctionTorque,
    });
  }

  return (
    <>
      {/* ============================================================
         TU CONTENIDO ORIGINAL (NO MODIFICADO)
         ============================================================ */}

      <div className="text-black max-w-6xl mx-auto px-4">
        {/* TODO TU TEXTO EXACTO AQUÍ */}
        {/* (No lo repito para no duplicar miles de líneas) */}
      </div>

      {/* ============================================================
         CALCULADORA — AHORA SÍ AL FINAL DEL CONTENIDO
         ============================================================ */}

      <section
        id="wind-turbine-calculator"
        className="max-w-4xl mx-auto px-4 py-8 bg-slate-900 text-slate-100 rounded-2xl shadow-xl mt-16"
      >
        <h2 className="text-2xl font-semibold mb-2">Wind Turbine Calculator</h2>
        <p className="text-sm text-slate-300 mb-4">
          Compare horizontal‑axis, vertical‑axis and deflector‑controlled turbines using the same
          physical model. Designed with the same clarity and structure as the Solar Panel Calculator.
        </p>

        {/* TYPE + IMAGE */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="space-y-3">
            <label className="block text-sm font-medium">Turbine type</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full rounded-md bg-slate-800 border border-slate-700 px-3 py-2 text-sm"
            >
              <option value="HAWT">Horizontal‑axis (HAWT)</option>
              <option value="VAWT">Vertical‑axis (VAWT)</option>
              <option value="VAWT_DEFLECTOR">Vertical‑axis with deflector</option>
            </select>

            <div className="mt-4">
              <TurbineSilhouette type={type} />
              <p className="text-xs text-slate-400 text-center mt-2">
                Silhouette updates automatically when you change turbine type.
              </p>
            </div>
          </div>

          {/* WIND INPUTS */}
          <div className="space-y-3">
            <label className="block text-sm font-medium">Wind speed (m/s)</label>
            <input
              type="number"
              value={windSpeed}
              onChange={(e) => setWindSpeed(parseFloat(e.target.value) || 0)}
              className="w-full rounded-md bg-slate-800 border border-slate-700 px-3 py-2 text-sm"
            />

            <label className="block text-sm font-medium">Air density ρ (kg/m³)</label>
            <input
              type="number"
              value={rho}
              onChange={(e) => setRho(parseFloat(e.target.value) || 0)}
              className="w-full rounded-md bg-slate-800 border border-slate-700 px-3 py-2 text-sm"
            />
          </div>
        </div>

        {/* GEOMETRY */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {type === "HAWT" && (
            <>
              <div>
                <label className="block text-sm font-medium">Rotor radius (m)</label>
                <input
                  type="number"
                  value={radius}
                  onChange={(e) => setRadius(parseFloat(e.target.value) || 0)}
                  className="w-full rounded-md bg-slate-800 border border-slate-700 px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Power coefficient Cp</label>
                <input
                  type="number"
                  value={cpHawt}
                  onChange={(e) => setCpHawt(parseFloat(e.target.value) || 0)}
                  className="w-full rounded-md bg-slate-800 border border-slate-700 px-3 py-2 text-sm"
                />
              </div>
            </>
          )}

          {type !== "HAWT" && (
            <>
              <div>
                <label className="block text-sm font-medium">Rotor diameter (m)</label>
                <input
                  type="number"
                  value={diameter}
                  onChange={(e) => setDiameter(parseFloat(e.target.value) || 0)}
                  className="w-full rounded-md bg-slate-800 border border-slate-700 px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Rotor height (m)</label>
                <input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(parseFloat(e.target.value) || 0)}
                  className="w-full rounded-md bg-slate-800 border border-slate-700 px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Power coefficient Cp</label>
                <input
                  type="number"
                  value={cpVawt}
                  onChange={(e) => setCpVawt(parseFloat(e.target.value) || 0)}
                  className="w-full rounded-md bg-slate-800 border border-slate-700 px-3 py-2 text-sm"
                />
              </div>
            </>
          )}
        </div>

        {/* DEFLECTOR */}
        {type === "VAWT_DEFLECTOR" && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium">Deflector angle (°)</label>
              <input
                type="number"
                value={angleDeg}
                onChange={(e) => setAngleDeg(parseFloat(e.target.value) || 0)}
                className="w-full rounded-md bg-slate-800 border border-slate-700 px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Cpe (pressure)</label>
              <input
                type="number"
                value={cpePressure}
                onChange={(e) => setCpePressure(parseFloat(e.target.value) || 0)}
                className="w-full rounded-md bg-slate-800 border border-slate-700 px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Cpe (suction)</label>
              <input
                type="number"
                value={cpeSuction}
                onChange={(e) => setCpeSuction(parseFloat(e.target.value) || 0)}
                className="w-full rounded-md bg-slate-800 border border-slate-700 px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Suction torque (Nm)</label>
              <input
                type="number"
                value={suctionTorque}
                onChange={(e) => setSuctionTorque(parseFloat(e.target.value) || 0)}
                className="w-full rounded-md bg-slate-800 border border-slate-700 px-3 py-2 text-sm"
              />
            </div>
          </div>
        )}

        {/* RESULTS */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-800 rounded-xl p-4">
            <p className="text-xs text-slate-400">Swept area</p>
            <p className="text-lg font-semibold">
              {result?.area ? result.area.toFixed(2) : "0.00"} m²
            </p>
          </div>
          <div className="bg-slate-800 rounded-xl p-4">
            <p className="text-xs text-slate-400">Wind power</p>
            <p className="text-lg font-semibold">
              {result?.pWind ? (result.pWind / 1000).toFixed(2) : "0.00"} kW
            </p>
          </div>
          <div className="bg-slate-800 rounded-xl p-4">
            <p className="text-xs text-slate-400">Turbine output</p>
            <p className="text-lg font-semibold">
              {result?.pTurbine ? (result.pTurbine / 1000).toFixed(2) : "0.00"} kW
            </p>
          </div>
        </div>

        {type === "VAWT_DEFLECTOR" && (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-800 rounded-xl p-4">
              <p className="text-xs text-slate-400">Effective velocity (building)</p>
              <p className="text-lg font-semibold">
                {result?.vEff ? result.vEff.toFixed(2) : "0.00"} m/s
              </p>
            </div>
            <div className="bg-slate-800 rounded-xl p-4">
              <p className="text-xs text-slate-400">Velocity after deflector</p>
              <p className="text-lg font-semibold">
                {result?.vDeflector ? result.vDeflector.toFixed(2) : "0.00"} m/s
              </p>
            </div>
            <div className="bg-slate-800 rounded-xl p-4">
              <p className="text-xs text-slate-400">Total torque (approx.)</p>
              <p className="text-lg font-semibold">
                {result?.torqueTotal ? result.torqueTotal.toFixed(2) : "0.00"} Nm
              </p>
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default WindTurbinesPage;
