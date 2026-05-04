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
          <thead className="bg-gray-100">
            <tr><th className="border p-2">Location</th><th className="border p-2">Annual production (kWh/kWp)</th><th className="border p-2">4 kWp example (kWh/year)</th><th className="border p-2">Estimated payback (2025)</th></tr>
          </thead>
          <tbody>
            <tr><td className="border p-2">UK (south England)</td><td className="border p-2">850‑1,100</td><td className="border p-2">3,400‑4,400</td><td className="border p-2">8‑12 years</td></tr>
            <tr><td className="border p-2">UK (north/Scotland)</td><td className="border p-2">650‑850</td><td className="border p-2">2,600‑3,400</td><td className="border p-2">10‑14 years</td></tr>
            <tr><td className="border p-2">Spain (average)</td><td className="border p-2">1,450</td><td className="border p-2">5,800</td><td className="border p-2">5‑7 years</td></tr>
            <tr><td className="border p-2">Spain (Andalusia/Murcia)</td><td className="border p-2">1,800</td><td className="border p-2">7,200</td><td className="border p-2">4‑6 years</td></tr>
          </tbody>
        </table>
      </div>

      {/* ============================================================ */}
      {/* 5. TYPES OF PANELS – EFFICIENCY, DIMENSIONS, WEIGHT */}
      {/* ============================================================ */}
      <h3 className="text-2xl font-semibold mt-10 mb-4">5. Types of solar panels – detailed comparison</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300 text-sm">
          <thead className="bg-gray-100">
            <tr><th className="border p-2">Technology</th><th className="border p-2">Cell efficiency</th><th className="border p-2">Module efficiency</th><th className="border p-2">Temp coefficient</th><th className="border p-2">Typical dimensions (W×H)</th><th className="border p-2">Weight</th><th className="border p-2">Power (Wp)</th></tr>
          </thead>
          <tbody>
            <tr><td className="border p-2">Monocrystalline PERC</td><td className="border p-2">20‑22.5%</td><td className="border p-2">18‑20%</td><td className="border p-2">-0.35%/°C</td><td className="border p-2">1.05×1.75 m</td><td className="border p-2">19‑21 kg</td><td className="border p-2">400‑430</td></tr>
            <tr><td className="border p-2">TOPCon</td><td className="border p-2">22‑24.5%</td><td className="border p-2">20‑22.5%</td><td className="border p-2">-0.30%/°C</td><td className="border p-2">1.05×1.75 m</td><td className="border p-2">20‑23 kg</td><td className="border p-2">430‑480</td></tr>
            <tr><td className="border p-2">HJT</td><td className="border p-2">23‑25%</td><td className="border p-2">21‑23%</td><td className="border p-2">-0.25%/°C</td><td className="border p-2">1.05×1.75 m</td><td className="border p-2">21‑24 kg</td><td className="border p-2">450‑500</td></tr>
            <tr><td className="border p-2">Polycrystalline</td><td className="border p-2">16‑18%</td><td className="border p-2">14‑16%</td><td className="border p-2">-0.40%/°C</td><td className="border p-2">0.99×1.65 m</td><td className="border p-2">18‑22 kg</td><td className="border p-2">300‑380</td></tr>
          </tbody>
        </table>
      </div>
      <p className="mt-2 text-sm text-gray-600">TOPCon (tunnel oxide passivated contact) currently represents ≈97% of new mono‑crystalline installations due to its excellent price/performance ratio.</p>

      {/* ============================================================ */}
      {/* 6. ROOF ORIENTATION, PITCH, SHADING */}
      {/* ============================================================ */}
      <h3 className="text-2xl font-semibold mt-10 mb-4">6. Roof orientation, pitch & shading – real production losses</h3>
      <ul className="list-disc pl-6 mb-4">
        <li><strong>South‑east / South‑west:</strong> 90‑95% of optimal</li>
        <li><strong>East / West (flat pitch 10‑20°):</strong> 70‑80% of optimal</li>
        <li><strong>East / West (steep 40‑50°):</strong> 60‑70% of optimal</li>
        <li><strong>Flat roof (5‑10°):</strong> 85‑90% if oriented south</li>
        <li><strong>North (any pitch):</strong> 45‑55% – generally not recommended</li>
      </ul>
      <p className="mb-4">Partial shading from chimneys or trees can slash output by 30‑70%. Micro‑inverters or power optimisers mitigate this; they add 10‑20% to system cost but are recommended when shade is present.</p>

      {/* ============================================================ */}
      {/* 7. BATTERIES – LFP vs NMC, OPTIMAL SIZING */}
      {/* ============================================================ */}
      <h3 className="text-2xl font-semibold mt-10 mb-4">7. Battery storage – LFP vs NMC, optimal sizing</h3>
      <ul className="list-disc pl-6 mb-4">
        <li><strong>LFP (Lithium Iron Phosphate):</strong> safer, 4,000‑6,000 cycles, lower energy density, ideal for daily cycling.</li>
        <li><strong>NMC (Nickel Manganese Cobalt):</strong> higher energy density, cheaper per kWh, but 2,000‑3,000 cycles and lower thermal runaway threshold.</li>
        <li><strong>Optimal size for 4‑6 kWp system:</strong> 5‑10 kWh (covers evening and night usage).</li>
        <li><strong>Payback:</strong> a 5 kWh battery (£4,500‑£6,000) adds 3‑4 years to the payback period but increases self‑sufficiency.</li>
      </ul>

      {/* ============================================================ */}
      {/* 8. PERMITTED DEVELOPMENT & MCS */}
      {/* ============================================================ */}
      <h3 className="text-2xl font-semibold mt-10 mb-4">8. Permitted development & MCS (UK)</h3>
      <ul className="list-disc pl-6 mb-4">
        <li>Panels are generally permitted development if they project ≤200 mm from the roof slope and do not exceed the highest part of the roof (excluding chimneys).</li>
        <li>Listed buildings and conservation areas require full planning permission.</li>
        <li>MCS certification is needed to access the Smart Export Guarantee (SEG).</li>
      </ul>

      {/* ============================================================ */}
      {/* 9. INTERACTIVE CALCULATOR */}
      {/* ============================================================ */}
      <h3 className="text-2xl font-semibold mt-12 mb-4">9. Design your own layout – interactive 3D tool</h3>
      <p className="mb-6">
        Use the tool below to define your roof dimensions, choose panel type, and add obstacles such as chimneys. It respects <strong>UK MCS clearances</strong> (400 mm from edges and ridge, 20 mm gap between panels) and shows a 3D preview. You can switch between monocrystalline and polycrystalline panels.
      </p>
      <SolarPanelCalculator />

      {/* ============================================================ */}
      {/* 10. COMPLETE BIBLIOGRAPHY */}
      {/* ============================================================ */}
      <h3 className="text-2xl font-semibold mt-12 mb-4">📚 References & further reading</h3>
      <div className="text-sm text-gray-700 space-y-1 border-t pt-4">
        <p>1. R. Neumann, "Solar Panel Types Compared: Mono vs Poly vs TOPCon vs HJT (2026)", SurgePV, 2026.</p>
        <p>2. Enerix, "Photovoltaikmodul Arten: Welche Module gibt es? (Marktdaten 2026)", 2026.</p>
        <p>3. Fraunhofer ISE, "Photovoltaics Report", updated November 2025.</p>
        <p>4. H. Mustoe, "How much do solar panels cost? UK 2025 prices guide", The Independent, 2025.</p>
        <p>5. Y. He et al., "A techno‑economic‑environmental comparison of residential solar energy systems", Energy Conversion and Management, 2025.</p>
        <p>6. "Tailored self‑assembled molecule for efficient charge extraction…", Chemical Engineering Journal, May 2026.</p>
        <p>7. "MXene‑driven nanoscale field‑effect junction…", Nature Communications, 2026.</p>
        <p>8. "New strategy unlocks 29.76% efficiency for all‑perovskite tandem solar cells", Joule, Mar. 2026.</p>
        <p>9. "IoT‑based evaluation of photovoltaic modules enhanced by different reflector materials", Scientific Reports, 2026.</p>
        <p>10. "LONGi Breakthrough in Flexible Tandem Technology", LONGi, Mar. 2026.</p>
        <p>11. "Tandem PV launches commercial perovskite‑silicon manufacturing", pv magazine USA, Apr. 2026.</p>
        <p>12. UK Government, "Solar PV cost data – historical and projections 2025‑2030", DESNZ, Feb. 2025.</p>
        <p>13. MCS, "Installation Best Practice Guide for Solar PV (Issue 6.2)", Jan. 2025.</p>
        <p>14. PVGIS (European Commission JRC), "Solar radiation and PV performance data for the United Kingdom", 2025.</p>
        <p>15. "Recycling solar photovoltaic panels as an end‑of‑life scenario", Science of The Total Environment, 2025.</p>
        <p>16. Ofgem, "Smart Export Guarantee (SEG) – supplier rates and guidance", Apr. 2025.</p>
        <p>17. Solar Energy UK, "Homeowner Guide to Battery Storage", 2025.</p>
        <p>18. National Grid ESO, "Future Energy Scenarios 2025 – distributed generation outlook".</p>
      </div>
      <p className="text-xs text-gray-500 mt-4">Last review: May 2026. Data reflect most recent market research and peer‑reviewed studies.</p>
    </div>
  );
};

export default SolarPanelsPage;
