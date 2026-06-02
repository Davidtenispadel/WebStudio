import React from 'react';

interface Props {
  selfConsumedKwhPerMonth: number;
}

const SolarFeedingResult: React.FC<Props> = ({ selfConsumedKwhPerMonth }) => {
  const householdTypes = [
    {
      size: '1‑2 habitaciones',
      monthlyConsumption: 450,
      appliances: [
        'Frigorífico (30 kWh/mes)',
        'Lavadora (20 kWh/mes)',
        'Iluminación LED (15 kWh/mes)',
        'Placa inducción (50 kWh/mes)',
        'Calefacción eléctrica (200 kWh/mes en invierno)',
        'Agua caliente eléctrica (80 kWh/mes)',
        'Electrónicos (TV, ordenador, etc.) (40 kWh/mes)',
      ],
    },
    {
      size: '3‑4 habitaciones',
      monthlyConsumption: 750,
      appliances: [
        'Todo lo anterior (proporcionalmente mayor)',
        'Secadora (40 kWh/mes)',
        'Lavavajillas (30 kWh/mes)',
        'Aire acondicionado (150 kWh/mes en verano)',
        'Bomba de calor (300 kWh/mes en invierno)',
        'Coche eléctrico pequeño (55 kWh, 150 kWh/mes para 1000 km)',
      ],
    },
    {
      size: '5+ habitaciones',
      monthlyConsumption: 1100,
      appliances: [
        'Todo lo anterior más',
        'Segundo frigorífico / congelador (40 kWh/mes)',
        'Coche eléctrico grande (90 kWh, 250 kWh/mes para 1500 km)',
        'Jacuzzi / sauna eléctrica (200 kWh/mes)',
        'Piscina con bomba de calor (300 kWh/mes en verano)',
      ],
    },
  ];

  return (
    <div className="my-8 p-5 bg-white rounded-2xl border border-gray-200 shadow-md overflow-x-auto">
      <h3 className="text-xl font-semibold text-gray-800 mb-2">
        🔋 ¿Qué puedes alimentar con tu autoconsumo solar de {selfConsumedKwhPerMonth.toFixed(1)} kWh/mes?
      </h3>
      <p className="text-sm text-gray-600 mb-4">
        El autoconsumo representa la energía que generas y usas directamente de tus paneles.<br />
        Dependiendo del tamaño de tu vivienda, podrás cubrir una parte u otra de tus necesidades.
      </p>
      <div className="space-y-6">
        {householdTypes.map((type) => {
          const fraction = selfConsumedKwhPerMonth / type.monthlyConsumption;
          const percentage = (fraction * 100).toFixed(0);
          return (
            <div key={type.size} className="border rounded-lg p-4 bg-gray-50">
              <div className="flex flex-wrap justify-between items-center mb-3">
                <h4 className="text-lg font-bold text-gray-800">{type.size}</h4>
                <div className="text-sm font-mono bg-white px-3 py-1 rounded-full shadow">
                  Consumo típico: {type.monthlyConsumption} kWh/mes
                </div>
              </div>
              <div className="mb-3">
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div
                    className="bg-blue-600 h-4 rounded-full"
                    style={{ width: `${Math.min(100, fraction * 100)}%` }}
                  ></div>
                </div>
                <p className="text-sm mt-1">
                  Tu energía cubre aproximadamente el <strong>{percentage}%</strong> de esta vivienda.
                </p>
              </div>
              <div>
                <p className="font-semibold text-sm text-gray-700 mb-1">
                  ⚡ Con tu autoconsumo podrías alimentar:
                </p>
                <ul className="list-disc pl-5 text-sm text-gray-600 grid grid-cols-1 md:grid-cols-2 gap-x-4">
                  {type.appliances.map((app, idx) => (
                    <li key={idx}>{app}</li>
                  ))}
                </ul>
                {fraction < 1 && (
                  <p className="text-xs text-amber-600 mt-2">
                    * Para cubrir el 100% de esta vivienda necesitarías un sistema de mayor producción o añadir baterías.
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <p className="text-xs text-gray-500 mt-4">
        Nota: Los consumos son estimaciones medias. Los valores reales dependen del aislamiento, clima, hábitos de uso y eficiencia de los electrodomésticos.
      </p>
    </div>
  );
};

export default SolarFeedingResult;
