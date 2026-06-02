import React from 'react';

interface Props {
  selfConsumedKwhPerMonth: number; // ej: 251.1
}

// Consumos medios mensuales orientativos (fuente: CNMC, IDAE, UK household surveys)
const avgMonthlyConsumption: Record<string, number> = {
  '1‑2 hab': 320,   // rango 250‑400 kWh
  '3‑4 hab': 520,   // rango 450‑600 kWh
  '5+ hab': 800,    // rango 700‑1000 kWh
};

const HouseholdFeedingTable: React.FC<Props> = ({ selfConsumedKwhPerMonth }) => {
  const computeHomesFed = (consumption: number) => {
    const homes = selfConsumedKwhPerMonth / consumption;
    return homes.toFixed(2);
  };

  return (
    <div className="my-8 p-4 bg-white rounded-xl border border-gray-200 shadow-md">
      <h3 className="text-xl font-semibold text-gray-800 mb-3">
        🏡 ¿Cuántas viviendas de cada tipo puede alimentar tu autoconsumo?
      </h3>
      <p className="text-sm text-gray-600 mb-4">
        Basado en el autoconsumo mensual de <strong>{selfConsumedKwhPerMonth} kWh</strong>.
        Se calcula como: <code className="bg-gray-100 px-1">Autoconsumo ÷ Consumo medio del hogar</code>
      </p>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-3 text-left">Tipo de vivienda</th>
              <th className="border p-3 text-left">Consumo medio mensual (kWh)</th>
              <th className="border p-3 text-left">Nº de viviendas que puede alimentar</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-green-50">
              <td className="border p-3 font-semibold">1‑2 habitantes</td>
              <td className="border p-3">{avgMonthlyConsumption['1‑2 hab']} kWh</td>
              <td className="border p-3 text-green-700 font-bold">{computeHomesFed(avgMonthlyConsumption['1‑2 hab'])}</td>
            </tr>
            <tr className="bg-blue-50">
              <td className="border p-3 font-semibold">3‑4 habitantes</td>
              <td className="border p-3">{avgMonthlyConsumption['3‑4 hab']} kWh</td>
              <td className="border p-3 text-blue-700 font-bold">{computeHomesFed(avgMonthlyConsumption['3‑4 hab'])}</td>
            </tr>
            <tr className="bg-yellow-50">
              <td className="border p-3 font-semibold">5 o más habitantes</td>
              <td className="border p-3">{avgMonthlyConsumption['5+ hab']} kWh</td>
              <td className="border p-3 text-yellow-700 font-bold">{computeHomesFed(avgMonthlyConsumption['5+ hab'])}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="text-xs text-gray-500 mt-3">
        *Nota: los consumos medios son orientativos. El cálculo supone que toda la energía autoconsumida se usa íntegramente para cubrir las necesidades de otras viviendas idénticas.
      </p>
    </div>
  );
};

export default HouseholdFeedingTable;
