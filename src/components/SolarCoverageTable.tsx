import React from 'react';

interface CoverageRow {
  household: string;
  electrificationLevel: string;
  annualConsumptionKWh: string;
  ukCoverage4kWp: string;
  spainCoverage4kWp: string;
  recommendation: string;
}

const coverageData: CoverageRow[] = [
  {
    household: '1‑2 hab',
    electrificationLevel: '✅ Full electrification + medium EV (60 kWh)',
    annualConsumptionKWh: '4.000 – 6.000',
    ukCoverage4kWp: '⚠️ Partial – covers 60‑80% (needs grid in winter)',
    spainCoverage4kWp: '✅ Fully covered – 100% possible with battery',
    recommendation: '4 kWp + small battery (UK) / 4 kWp without battery (Spain)'
  },
  {
    household: '3‑4 hab',
    electrificationLevel: '⚠️ High electrification (heat pump + medium EV)',
    annualConsumptionKWh: '6.000 – 9.000',
    ukCoverage4kWp: '❌ Insufficient – covers <50%',
    spainCoverage4kWp: '⚠️ Partial – covers 65‑85% (needs 5‑6 kWp)',
    recommendation: '5‑6 kWp + battery mandatory'
  },
  {
    household: '3‑4 hab',
    electrificationLevel: '✅ Medium + medium EV',
    annualConsumptionKWh: '6.000 – 8.000',
    ukCoverage4kWp: '⚠️ 50‑70%',
    spainCoverage4kWp: '✅ 85‑100% (good balance)',
    recommendation: '4 kWp + battery (UK) / 4 kWp (Spain)'
  },
  {
    household: '3‑4 hab',
    electrificationLevel: '❌ High + large EV (90 kWh)',
    annualConsumptionKWh: '9.000 – 13.000',
    ukCoverage4kWp: '❌ Very insufficient (<30%)',
    spainCoverage4kWp: '❌ Insufficient (<60%)',
    recommendation: '8‑10 kWp system'
  },
  {
    household: '5 hab',
    electrificationLevel: '✅ Base + medium EV',
    annualConsumptionKWh: '6.000 – 8.000',
    ukCoverage4kWp: '⚠️ 50‑70%',
    spainCoverage4kWp: '✅ 85‑100%',
    recommendation: '4‑5 kWp + battery (UK) / 5 kWp (Spain)'
  },
  {
    household: '5 hab',
    electrificationLevel: '⚠️ High electrification',
    annualConsumptionKWh: '8.000 – 12.000',
    ukCoverage4kWp: '❌ <40%',
    spainCoverage4kWp: '⚠️ 60‑80%',
    recommendation: '6‑7 kWp + battery'
  },
  {
    household: '5 hab',
    electrificationLevel: '❌ High + 2 large EVs',
    annualConsumptionKWh: '12.000 – 20.000',
    ukCoverage4kWp: '❌ <20%',
    spainCoverage4kWp: '❌ <40%',
    recommendation: '10‑12 kWp + large battery'
  }
];

const SolarCoverageTable: React.FC = () => {
  return (
    <div className="w-full overflow-x-auto my-8">
      <table className="min-w-full border-collapse border border-gray-300 text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-3 text-left">Household size</th>
            <th className="border p-3 text-left">Electrification level & EV</th>
            <th className="border p-3 text-left">Annual consumption (kWh)</th>
            <th className="border p-3 text-left">Coverage with 4 kWp in UK</th>
            <th className="border p-3 text-left">Coverage with 4 kWp in Spain</th>
            <th className="border p-3 text-left">Recommended system</th>
          </tr>
        </thead>
        <tbody>
          {coverageData.map((row, idx) => (
            <tr key={idx} className="border-b hover:bg-gray-50">
              <td className="border p-3 font-semibold">{row.household}</td>
              <td className="border p-3">{row.electrificationLevel}</td>
              <td className="border p-3">{row.annualConsumptionKWh}</td>
              <td className="border p-3">{row.ukCoverage4kWp}</td>
              <td className="border p-3">{row.spainCoverage4kWp}</td>
              <td className="border p-3 bg-yellow-50">{row.recommendation}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="text-xs text-gray-500 mt-2">
        *Assumptions: 4 kWp system south‑facing, 35° tilt. UK = 900‑1100 kWh/kWp/year, Spain = 1450‑1800 kWh/kWp/year.
        Medium EV = 60 kWh battery (≈15 kWh/100 km). Large EV = 90 kWh.
      </p>
    </div>
  );
};

export default SolarCoverageTable;
