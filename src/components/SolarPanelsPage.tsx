import React from 'react';
import SolarPanelCalculator from './SolarPanelCalculator';

const SolarPanelsPage: React.FC = () => {
  return (
    <div className="text-black max-w-6xl mx-auto px-4">
      <h2 className="text-3xl md:text-4xl font-light mb-6">Solar panels: complete technical guide for homeowners (2025‑2026)</h2>
      
      <p className="text-lg mb-6">
        Solar photovoltaic (PV) panels convert sunlight directly into electricity. A well‑designed system can cover 50‑100% of a household's annual consumption, reduce energy bills, cut carbon emissions, and increase property value. This guide compiles the latest scientific and market data to help you make an informed decision.
      </p>

      {/* ============================================================ */}
      {/* 1. COMPONENTS OF A SOLAR PANEL – INTERNAL STRUCTURE */}
      {/* ============================================================ */}
      <h3 className="text-2xl font-semibold mt-8 mb-4">1. Components of a solar panel – internal structure</h3>
      <p className="mb-2">
        A modern solar panel is a multi‑layer device that converts light into electricity. The main components are:
      </p>
      <ul className="list-disc pl-6 mb-4 space-y-1">
        <li><strong>Aluminium frame:</strong> Provides structural rigidity, simplifies installation, and protects edges from mechanical damage. It is usually anodised aluminium to resist corrosion.</li>
        <li><strong>Tempered glass:</strong> A 3‑4 mm front layer of low‑iron glass with high light transmittance (&gt;91%). It protects cells from hail, snow, and dirt. Quality panels withstand hailstones up to 25 mm diameter without damage.</li>
        <li><strong>EVA encapsulant (Ethylene Vinyl Acetate):</strong> A thermoset resin that surrounds the solar cells and bonds them to the glass and backsheet. It melts during lamination (≈150 °C) and provides electrical insulation and moisture sealing.</li>
        <li><strong>Photovoltaic cells:</strong> The heart of the panel, usually monocrystalline or polycrystalline silicon, which convert sunlight into direct current (DC) via the photovoltaic effect. Cells are connected by metal ribbons (busbars) to form strings.</li>
        <li><strong>Backsheet:</strong> A multi‑layer polymer sheet (often TPT/TPE) acting as an electrical and moisture barrier. Its white colour reflects light that passes through the cells, slightly increasing efficiency.</li>
        <li><strong>Junction box:</strong> Contains bypass diodes, which allow current to flow around shaded or damaged cells, preventing hot‑spots and power losses.</li>
        <li><strong>Sealant (silicone):</strong> Seals the gap between the frame and the laminate to prevent dust and water ingress.</li>
      </ul>
      <p className="text-sm text-gray-600">
        All these elements are laminated together under vacuum and high temperature (≈200 °C) to form a monolithic panel. The quality of the lamination process and the materials used determine long‑term durability.
      </p>

      {/* ============================================================ */}
      {/* 2. DEGRADATION AND DURABILITY – DETAILED STUDY */}
      {/* ============================================================ */}
      <h3 className="text-2xl font-semibold mt-10 mb-4">2. Degradation and durability: how long do panels really last?</h3>
      <p className="mb-2">
        Degradation is the gradual loss of a panel's power over time. The main causes include ultraviolet radiation, thermal cycling, humidity, wind, and mechanical stress. Current data shows:
      </p>
      <ul className="list-disc pl-6 mb-4">
        <li><strong>Tier‑1 TOPCon, HJT or xBC panels:</strong> annual degradation between 0.3% and 0.5%.</li>
        <li><strong>TOPCon:</strong> After an initial 1% loss in the first year, it degrades at 0.4% per year thereafter.</li>
        <li><strong>HJT (heterojunction):</strong> Around 0.3% annual degradation – the lowest on the market.</li>
        <li><strong>Polycrystalline:</strong> Typical degradation of 0.5% to 0.8% per year.</li>
      </ul>
      <p className="mb-2">
        A University of New South Wales (UNSW) study of nearly 11,000 PV systems found a <strong>median degradation rate of 0.9% per year</strong>, but it also detected a “long tail”: about 20% of systems degraded at least 1.5 times faster than the median, and one in twelve degraded twice as fast. In extreme cases, losses could reach 45% after 25 years.
      </p>
      <p className="mb-4">
        On the optimistic side, a Swiss study on panels installed between 1987 and 1993 showed an <strong>average degradation of only 0.25% per year</strong>, well below the standard 0.7%. This indicates that with quality materials, panels can still generate more than 90% of their original power after 25 years, and remain useful for 40‑50 years.
      </p>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300 text-sm">
          <thead className="bg-gray-100">
            <tr><th className="border p-2">Technology</th><th className="border p-2">1st year degradation</th><th className="border p-2">Annual degradation (after year 1)</th><th className="border p-2">Estimated power at 25 years</th></tr>
          </thead>
          <tbody>
            <tr><td className="border p-2">TOPCon</td><td className="border p-2">1%</td><td className="border p-2">0.40%</td><td className="border p-2">≈89.5%</td></tr>
            <tr><td className="border p-2">HJT</td><td className="border p-2">1%</td><td className="border p-2">0.30%</td><td className="border p-2">≈91.8%</td></tr>
            <tr><td className="border p-2">PERC (mono)</td><td className="border p-2">2%</td><td className="border p-2">0.45%</td><td className="border p-2">≈87.2%</td></tr>
            <tr><td className="border p-2">Polycrystalline</td><td className="border p-2">1-2%</td><td className="border p-2">0.5-0.8%</td><td className="border p-2">≈80-85%</td></tr>
          </tbody>
        </table>
      </div>

      {/* ============================================================ */}
      {/* 3. SEASONAL EFFICIENCY: SUMMER vs WINTER */}
      {/* ============================================================ */}
      <h3 className="text-2xl font-semibold mt-10 mb-4">3. Seasonal efficiency: summer vs winter production</h3>
      <p className="mb-2">
        Solar output varies enormously between seasons. In the UK, the difference can be as high as 80‑90%. Factors include day length, solar altitude, cloud cover, and – surprisingly – temperature.
      </p>
      <h4 className="text-xl font-semibold mt-6 mb-3">3.1. Summer – surprisingly affected by heat</h4>
      <p className="mb-2">
        Although there are more sunshine hours, heat reduces panel efficiency. The typical temperature coefficient is between –0.30%/°C and –0.50%/°C. For every degree the cell temperature exceeds 25 °C, power decreases by 0.3‑0.5%. When ambient temperature reaches 60 °C, the loss can be considerable. On poorly ventilated roofs, trapped heat cancels part of the summer gain.
      </p>
      <h4 className="text-xl font-semibold mt-6 mb-3">3.2. Winter – what really matters</h4>
      <p className="mb-2">
        In winter, production can drop by 65‑80% compared to summer, depending on region and orientation. However, low temperatures (&lt;10 °C) actually improve cell efficiency. On cold, sunny days a panel can reach its maximum instantaneous output, although the daily total remains low because of few sunlight hours.
      </p>
      <p className="mb-2">
        Practical figures: a 400 Wp panel in southern England produces about 1.5 kWh in June, but only 0.5 kWh in December. A typical 4 kWp system generates roughly 3,400 kWh annually, but in December it may drop to 150 kWh (only ≈15% of the peak).
      </p>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300 text-sm">
          <thead className="bg-gray-100">
            <tr><th className="border p-2">Month</th><th className="border p-2">Daily production (kWh, 4 kWp south, 35°)</th><th className="border p-2">Percentage of peak</th></tr>
          </thead>
          <tbody>
            <tr><td className="border p-2">June</td><td className="border p-2">18‑20 kWh</td><td className="border p-2">100%</td></tr>
            <tr><td className="border p-2">September</td><td className="border p-2">10‑12 kWh</td><td className="border p-2">≈55%</td></tr>
            <tr><td className="border p-2">December</td><td className="border p-2">2‑3 kWh</td><td className="border p-2">≈15%</td></tr>
          </tbody>
        </table>
      </div>

      {/* ============================================================ */}
      {/* 4. PRODUCTION COMPARISON: UNITED KINGDOM vs SPAIN */}
      {/* ============================================================ */}
      <h3 className="text-2xl font-semibold mt-10 mb-4">4. Production comparison: United Kingdom vs Spain</h3>
      <p className="mb-2">
        Solar radiation differs dramatically between the two countries, with a large advantage for Spain. The most reliable figures are:
      </p>
      <ul className="list-disc pl-6 mb-4">
        <li><strong>UK (southern England):</strong> 850‑1,100 kWh per year per kWp installed. A 4 kWp system produces about 3,400 kWh annually.</li>
        <li><strong>Andalusia / Murcia region (Spain):</strong> 1,600‑1,800 kWh/kWp/year.</li>
        <li><strong>Central Spain (Madrid):</strong> 1,400‑1,600 kWh/kWp/year.</li>
        <li><strong>Spanish national average (fixed tilt):</strong> ≈1,450 kWh/kWp/year; with trackers it can reach 2,127 kWh/kWp/year.</li>
      </ul>
      <p className="mb-4">
        This difference leads to a much shorter payback period in Spain (4‑7 years) compared to the UK (8‑12 years). Long‑term profitability is far higher, although even in the British climate modern installations are economically viable.
      </p>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300 text-sm">
          <thead className="bg-gray-100"><tr><th className="border p-2">Location</th><th className="border p-2">Annual production (kWh/kWp)</th><th className="border p-2">4 kWp example (kWh/year)</th><th className="border p-2">Estimated payback (2025)</th></tr></thead>
          <tbody>
            <tr><td className="border p-2">UK (south England)</td><td className="border p-2">850‑1,100</td><td className="border p-2">3,400‑4,400</td><td className="border p-2">8‑12 years</td></tr>
            <tr><td class
