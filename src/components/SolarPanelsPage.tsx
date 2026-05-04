import React from 'react';
import SolarPanelCalculator from './SolarPanelCalculator';

const SolarPanelsPage: React.FC = () => {
  return (
    <div className="text-black max-w-6xl mx-auto px-4">
      <h2 className="text-3xl md:text-4xl font-light mb-6">Solar panels: complete technical guide for homeowners (2025‑2026)</h2>
      
      <p className="text-lg mb-6">
        Solar photovoltaic (PV) panels convert sunlight directly into electricity. A well‑designed system can cover 50‑100% of a household’s annual consumption, reduce energy bills, cut carbon emissions, and increase property value. This guide compiles the latest scientific and market data to help you make an informed decision.
      </p>

      {/* ============================================================ */}
      {/* 1. TYPES OF SOLAR PANELS – DEEP COMPARISON */}
      {/* ============================================================ */}
      <h3 className="text-2xl font-semibold mt-8 mb-4">1. Types of solar panels – detailed comparison</h3>
      <p className="mb-4">
        Three main families dominate the residential market: monocrystalline, polycrystalline and thin‑film. However, within monocrystalline there have been rapid technological leaps (PERC, TOPCon, HJT). The table below shows realistic 2025‑2026 specifications.
      </p>
      
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300 text-sm">
          <thead className="bg-gray-100">
            <tr><th className="border p-2">Technology</th><th className="border p-2">Cell efficiency</th><th className="border p-2">Module efficiency</th><th className="border p-2">Temp coefficient (Pmax)</th><th className="border p-2">Annual degradation</th><th className="border p-2">Warranty (years)</th><th className="border p-2">Cost premium</th></tr>
          </thead>
          <tbody>
            <tr><td className="border p-2">Monocrystalline PERC</td><td className="border p-2">20‑22.5%</td><td className="border p-2">18‑20%</td><td className="border p-2">‑0.35%/°C</td><td className="border p-2">0.5%</td><td className="border p-2">25</td><td className="border p-2">Baseline</td></tr>
            <tr><td className="border p-2">TOPCon (mono)</td><td className="border p-2">22‑24.5%</td><td className="border p-2">20‑22.5%</td><td className="border p-2">‑0.30%/°C</td><td className="border p-2">0.45%</td><td className="border p-2">30 (product & power)</td><td className="border p-2">+5‑10%</td></tr>
            <tr><td className="border p-2">HJT (heterojunction)</td><td className="border p-2">23‑25%</td><td className="border p-2">21‑23%</td><td className="border p-2">‑0.25%/°C</td><td className="border p-2">0.35‑0.4%</td><td className="border p-2">30</td><td className="border p-2">+15‑25%</td></tr>
            <tr><td className="border p-2">Polycrystalline</td><td className="border p-2">16‑18%</td><td className="border p-2">14‑16%</td><td className="border p-2">‑0.40%/°C</td><td className="border p-2">0.7%</td><td className="border p-2">20‑25</td><td className="border p-2">‑10‑15% (cheaper)</td></tr>
            <tr><td className="border p-2">Thin film (CIGS)</td><td className="border p-2">13‑17%</td><td className="border p-2">11‑15%</td><td className="border p-2">‑0.30%/°C</td><td className="border p-2">0.8‑1%</td><td className="border p-2">20</td><td className="border p-2">Similar to mono</td></tr>
          </tbody>
        </table>
      </div>
      <p className="mt-2 text-sm text-gray-600">Data aggregated from MCS, Fraunhofer ISE, and manufacturer datasheets (2025‑2026). TOPCon (tunnel oxide passivated contact) currently represents ≈97% of new mono‑crystalline installations due to its excellent price/performance ratio.</p>

      <h4 className="text-xl font-semibold mt-6 mb-2">1.1 Typical dimensions & weight</h4>
      <ul className="list-disc pl-6 mb-4">
        <li><strong>60‑cell panel (residential standard):</strong> ≈1.05 m × 1.75 m → 1.84 m². Weight ≈18‑23 kg.</li>
        <li><strong>72‑cell panel (larger roof):</strong> ≈1.05 m × 2.10 m → 2.20 m². Weight ≈22‑28 kg.</li>
        <li><strong>Half‑cut and shingled cells</strong> slightly increase efficiency (up to +5% compared to full‑cell).</li>
      </ul>

      {/* ============================================================ */}
      {/* 2. REAL COSTS, SAVINGS AND PAYBACK (UK 2025‑2026) */}
      {/* ============================================================ */}
      <h3 className="text-2xl font-semibold mt-10 mb-4">2. Real costs, savings and payback period (UK data)</h3>
      <p className="mb-4">All prices include VAT (0% for solar PV + batteries until 2027, then 5% afterwards) and typical installation costs for a detached house in England (scaffolding, inverter, cabling, MCS certification).</p>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300 text-sm mb-4">
          <thead className="bg-gray-100"><tr><th className="border p-2">System size</th><th className="border p-2">Annual generation (UK avg)</th><th className="border p-2">Typical installed cost (2025)</th><th className="border p-2">Annual bill saving (normal use)</th><th className="border p-2">Payback time (no battery)</th></tr></thead>
          <tbody>
            <tr><td className="border p-2">3 kWp (≈8 panels)</td><td className="border p-2">2,400‑2,700 kWh</td><td className="border p-2">£4,500‑£5,500</td><td className="border p-2">£420‑£550</td><td className="border p-2">9‑12 years</td></tr>
            <tr><td className="border p-2">4 kWp (≈11‑12 panels)</td><td className="border p-2">3,400‑3,800 kWh</td><td className="border p-2">£5,000‑£7,000</td><td className="border p-2">£600‑£850</td><td className="border p-2">7‑9 years</td></tr>
            <tr><td className="border p-2">5 kWp (≈14‑15 panels)</td><td className="border p-2">4,100‑4,600 kWh</td><td className="border p-2">£6,000‑£8,500</td><td className="border p-2">£750‑£1,050</td><td className="border p-2">6‑8 years</td></tr>
            <tr><td className="border p-2">4 kWp + 5 kWh LFP battery</td><td className="border p-2">3,800 kWh (self‑consumption 70‑80%)</td><td className="border p-2">£9,800‑£12,500</td><td className="border p-2">£900‑£1,250</td><td className="border p-2">8‑11 years</td></tr>
          </tbody>
        </table>
      </div>
      <p className="text-sm text-gray-600">* Assumptions: electricity price £0.24‑0.27/kWh (variable as of April 2025), SEG export rate £0.12‑0.15/kWh. Savings can be higher if working from home or owning an EV.</p>

      <h4 className="text-xl font-semibold mt-6 mb-2">2.1 Smart Export Guarantee (SEG) – what you earn</h4>
      <p className="mb-2">All excess electricity not consumed on site can be exported to the grid. Through the SEG, most suppliers pay between 4‑15 p/kWh. Some examples (April 2025):</p>
      <ul className="list-disc pl-6 mb-4">
        <li><strong>Octopus Fixed Export (12 months):</strong> 15 p/kWh</li>
        <li><strong>E.ON Next Export &amp; Earn:</strong> 16.5 p/kWh (requires their import tariff)</li>
        <li><strong>British Gas Export &amp; Earn™:</strong> 6.4 p/kWh (lower but uncapped)</li>
      </ul>
      <p>Annual export income for a typical 4 kWp system (without battery) is around £100‑£250. With a battery you export almost nothing, but you save more by avoiding peak import prices (<strong>peak‑shaving</strong>).</p>

      {/* ============================================================ */}
      {/* 3. ROOF ORIENTATION, INCLINATION & SHADING – REAL PRODUCTION LOSSES */}
      {/* ============================================================ */}
      <h3 className="text-2xl font-semibold mt-10 mb-4">3. Effect of roof orientation, pitch & shading</h3>
      <p className="mb-2">South orientation at 30‑40° is ideal (100% yield). Any deviation reduces annual production as follows (based on PVGIS data for southern UK):</p>
      <ul className="list-disc pl-6 mb-4">
        <li><strong>South‑east / South‑west:</strong> 90‑95% of optimal</li>
        <li><strong>East / West (flat pitch 10‑20°):</strong> 70‑80% of optimal</li>
        <li><strong>East / West (steep 40‑50°):</strong> 60‑70% of optimal</li>
        <li><strong>Flat roof (5‑10°):</strong> 85‑90% if oriented south, lower if random</li>
        <li><strong>North (any pitch):</strong> 45‑55% – generally not recommended unless very low cost</li>
      </ul>
      <p className="mb-4">Partial shading from chimneys, trees or neighbouring buildings can slash output by 30‑70% if not mitigated. Micro‑inverters or power optimisers (e.g. SolarEdge, Enphase) solve this problem – they increase system cost by 10‑20% but are recommended when shade is present.</p>

      {/* ============================================================ */}
      {/* 4. BATTERIES – LFP vs NMC, OPTIMAL SIZING & PAYBACK */}
      {/* ============================================================ */}
      <h3 className="text-2xl font-semibold mt-10 mb-4">4. Battery storage – detailed analysis</h3>
      <p className="mb-2">Adding a battery raises self‑consumption from ~30% (panels only) to 70‑90% (with adequate storage). The two dominant chemistries are:</p>
      <ul className="list-disc pl-6 mb-4">
        <li><strong>LFP (Lithium Iron Phosphate):</strong> safer, long cycle life (4,000‑6,000 cycles), slightly less energy dense, ideal for daily cycling.</li>
        <li><strong>NMC (Nickel Manganese Cobalt):</strong> higher energy density, cheaper per kWh, but shorter cycle life (2,000‑3,000 cycles) and lower thermal runaway threshold.</li>
      </ul>
      <p className="mb-2">For a typical UK home (4,500 kWh/year consumption, 4 kWp solar), the optimal battery size is <strong>5‑10 kWh</strong>. Smaller than 5 kWh leaves too much export; larger than 10 kWh seldom fills in winter.</p>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300 text-sm">
          <thead className="bg-gray-100"><tr><th className="border p-2">Battery size</th><th className="border p-2">Installed cost (LFP)</th><th className="border p-2">Usable capacity</th><th className="border p-2">Additional annual saving (vs panels only)</th><th className="border p-2">Additional payback (years)</th></tr></thead>
          <tbody>
            <tr><td className="border p-2">3 kWh</td><td className="border p-2">£3,000‑£4,000</td><td className="border p-2">2.7 kWh</td><td className="border p-2">£150‑£200</td><td className="border p-2">15‑20</td></tr>
            <tr><td className="border p-2">5 kWh</td><td className="border p-2">£4,500‑£6,000</td><td className="border p-2">4.5 kWh</td><td className="border p-2">£250‑£350</td><td className="border p-2">12‑15</td></tr>
            <tr><td className="border p-2">10 kWh</td><td className="border p-2">£7,000‑£9,500</td><td className="border p-2">9 kWh</td><td className="border p-2">£400‑£500</td><td className="border p-2">14‑18</td></tr>
          </tbody>
        </table>
      </div>
      <p className="mt-2 text-sm text-gray-600">Battery payback remains longer than panels alone. However, with time‑of‑use tariffs (e.g. Octopus Intelligent or E.ON Next Drive) you can charge the battery at low night rates (7‑9 p/kWh) and discharge during peak (25‑28 p/kWh), improving payback substantially. This is called <strong>energy arbitrage</strong>.</p>

      {/* ============================================================ */}
      {/* 5. INNOVATIONS & EMERGING TECHNOLOGIES (2026‑2030) */}
      {/* ============================================================ */}
      <h3 className="text-2xl font-semibold mt-10 mb-4">5. What comes next – emerging technologies with commercial timeline</h3>
      <ul className="list-disc pl-6 mb-4">
        <li><strong>Perovskite‑silicon tandem cells:</strong> lab efficiencies above 33.5%, commercial modules already 29.7% (Tandem PV, 2026). Expected to surpass TOPCon by 2028‑2030. Degradation and stability are still being optimised.</li>
        <li><strong>Building Integrated Photovoltaics (BIPV):</strong> solar slates, solar tiles, coloured panels that replace conventional roofing – Marley SolarTile, GAF Energy. Cost premium 30‑50% but aesthetically superior.</li>
        <li><strong>Bifacial modules for pitched roofs:</strong> capture reflection from roof surface; can increase yield by 5‑12% depending on roof colour and tilt.</li>
        <li><strong>Smart DC home grids + bidirectional EV charging:</strong> use the car’s battery as home storage (V2H – Vehicle‑to‑Home). Nissan Leaf, Hyundai Ioniq 5 and certain wallboxes already support this.</li>
        <li><strong>50+ year PV modules:</strong> glass‑glass encapsulation combined with high‑stability cell technologies aim for useful lifetime beyond 50 years, with degradation below 0.2%/year.</li>
      </ul>

      {/* ============================================================ */}
      {/* 6. REGULATIONS & PLANNING PERMISSION (UK) */}
      {/* ============================================================ */}
      <h3 className="text-2xl font-semibold mt-10 mb-4">6. Permitted development vs planning permission</h3>
      <p className="mb-2">In England, solar panels are generally considered <strong>permitted development</strong> if they comply with the following rules (updated 2025):</p>
      <ul className="list-disc pl-6 mb-4">
        <li>Not project more than 200 mm beyond the roof slope (measured from the surface).</li>
        <li>Not exceed the highest part of the roof (excluding chimneys).</li>
        <li>For flats and listed buildings you always need full planning permission.</li>
        <li>Ground‑mounted systems: maximum area 9 m², height &lt; 4 m, and at least 5 m from any boundary.</li>
      </ul>
      <p>Additionally, MCS certification is required to access the Smart Export Guarantee (SEG) and also for feed‑in tariff legacy schemes. Always check with your local council if the building is in a conservation area.</p>

      {/* ============================================================ */}
      {/* 7. INSTALLATION PROCESS, SCAFFOLDING & TIMELINE */}
      {/* ============================================================ */}
      <h3 className="text-2xl font-semibold mt-10 mb-4">7. What to expect during installation</h3>
      <ol className="list-decimal pl-6 mb-4 space-y-1">
        <li><strong>Site survey (1‑2h):</strong> assess roof structure, electrics, shading, and calculate optimum layout.</li>
        <li><strong>Structural check:</strong> timber rafters must support the additional loading (≈15‑20 kg/m²).</li>
        <li><strong>Scaffolding (1‑2 days before):</strong> safety access for installers.</li>
        <li><strong>Installation (1‑3 days):</strong> fixings, rails, panels, inverter, cabling, and battery if ordered.</li>
        <li><strong>Commissioning & MCS certificate:</strong> test, configure monitoring app, handover documents.</li>
        <li><strong>Grid connection notification:</strong> your DNO must be informed (installer usually does this).</li>
      </ol>
      <p>Total downtime from deposit to generating electricity is typically 4‑8 weeks, depending on equipment availability.</p>

      {/* ============================================================ */}
      {/* 8. ENVIRONMENTAL & LONG TERM VALUE */}
      {/* ============================================================ */}
      <h3 className="text-2xl font-semibold mt-10 mb-4">8. Environmental benefits & resale value</h3>
      <p className="mb-2">A typical 4 kWp solar system saves around <strong>1.2‑1.5 tonnes of CO₂ per year</strong>. Over 25 years, that’s 30 + tonnes of carbon avoided – equivalent to planting 1,500 trees or driving 150,000 km less.</p>
      <p>Studies have consistently shown that solar PV adds value to a property. According to a 2024 report by the UK Department for Energy Security and Net Zero, homes with solar panels sell 4‑8% faster and achieve a premium of £1,500‑£5,000 depending on system size and battery inclusion.</p>

      {/* ============================================================ */}
      {/* 9. CALCULATOR – INTERACTIVE LAYOUT TOOL */}
      {/* ============================================================ */}
      <h3 className="text-2xl font-semibold mt-10 mb-4">9. Design your own roof layout (interactive)</h3>
      <p className="mb-6">
        The tool below lets you define your roof dimensions, choose panel type, and add obstacles such as chimneys. It respects <strong>UK MCS clearances</strong> (400 mm from edges and ridge, 20 mm gap between panels) and shows the 3D layout. You can toggle between monocrystalline and polycrystalline panels to see how many units fit and the total power.
      </p>
      
      <SolarPanelCalculator />
      
      {/* ============================================================ */}
      {/* 10. FULL BIBLIOGRAPHY – all sources used */}
      {/* ============================================================ */}
      <h3 className="text-2xl font-semibold mt-12 mb-4">📚 Complete bibliography & sources</h3>
      <div className="text-sm text-gray-700 space-y-1 border-t pt-4">
        <p>1. R. Neumann, "Solar Panel Types Compared: Mono vs Poly vs TOPCon vs HJT (2026)", <em>SurgePV</em>, January 2026.</p>
        <p>2. Enerix, "Photovoltaikmodul Arten: Welche Module gibt es? (Marktdaten 2026)", February 2026. <em>Market share TOPCon 97.7%, glass‑glass degradation 0.45%.</em></p>
        <p>3. Fraunhofer ISE, "Photovoltaics Report", updated November 2025. <em>Efficiency trends, temperature coefficients, degradation rates.</em></p>
        <p>4. H. Mustoe, "How much do solar panels cost? UK 2025 prices guide", <em>The Independent</em>, October 2025.</p>
        <p>5. Y. He et al., "A techno‑economic‑environmental comparison of residential solar energy systems with and without storage", <em>Energy Conversion and Management</em>, Volume 312, December 2025.</p>
        <p>6. "Tailored self‑assembled molecule for efficient charge extraction in all‑perovskite tandem solar cells", <em>Chemical Engineering Journal</em>, May 2026. <em>(28.96% lab efficiency)</em></p>
        <p>7. "MXene‑driven nanoscale field‑effect junction for advanced 4‑terminal perovskite/silicon tandem solar panels", <em>Nature Communications</em>, 2026.</p>
        <p>8. "New strategy unlocks 29.76% efficiency for all‑perovskite tandem solar cells", <em>Joule</em>, March 2026.</p>
        <p>9. "IoT‑based evaluation of photovoltaic modules enhanced by different reflector materials under desert conditions", <em>Scientific Reports</em>, 2026. <em>(Flat mirror reflector increases yield +21.2%)</em></p>
        <p>10. "LONGi Breakthrough in Flexible Tandem Technology Selected Among China's Top 10 Scientific Advances", LONGi Green Energy, March 2026. <em>(33.4% flexible tandem, 1.77 W/gram)</em></p>
        <p>11. "Tandem PV launches commercial perovskite‑silicon manufacturing in California", <em>pv magazine USA</em>, April 2026. <em>(40 MW factory, 29.7% modules, &lt;1% annual loss)</em></p>
        <p>12. UK Government, "Solar PV cost data – historical and projections 2025‑2030", DESNZ, February 2025.</p>
        <p>13. MCS (Microgeneration Certification Scheme), "Installation Best Practice Guide for Solar PV (Issue 6.2)", January 2025. <em>Setbacks, clearances, fire safety.</em></p>
        <p>14. PVGIS (European Commission JRC), "Solar radiation and PV performance data for the United Kingdom", 2025.</p>
        <p>15. "Recycling solar photovoltaic panels as an end‑of‑life scenario: a Life Cycle Assessment review", <em>Science of The Total Environment</em>, 2025.</p>
        <p>16. "Sustainable approaches to solar photovoltaic waste management under environmental uncertainty", <em>Discover Environment</em>, 2025.</p>
        <p>17. Ofgem, "Smart Export Guarantee (SEG) – supplier rates and guidance", quarterly update April 2025.</p>
        <p>18. Solar Energy UK, "Homeowner Guide to Battery Storage", 2025 edition.</p>
        <p>19. National Grid ESO, "Future Energy Scenarios 2025 – distributed generation outlook".</p>
      </div>
      <p className="text-xs text-gray-500 mt-4">This guide is updated frequently. Last review: May 2026. All data reflect the most recent available market research and peer‑reviewed studies.</p>
    </div>
  );
};

export default SolarPanelsPage;
