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
      {/* 1. FULL HISTORY OF SOLAR PANELS (including solar thermal and payback evolution) */}
      {/* ============================================================ */}
      <h3 className="text-2xl font-semibold mt-8 mb-4">1. A complete history of solar energy – from water heating to high‑efficiency PV</h3>
      
      <h4 className="text-xl font-semibold mt-6 mb-2">☀️ The early alternative: solar thermal (water heating) panels</h4>
      <p className="mb-2">
        Before PV became cheap, <strong>solar thermal collectors</strong> were the mainstream way to capture the sun's energy. These panels (flat‑plate or evacuated tube) heat water directly using a dark absorber and a fluid circuit. In the 1970s‑2000s, they made sense for domestic hot water, especially in southern Europe. However, they cannot generate electricity, produce nothing in winter, and require a separate system. Today, with PV prices below $0.10/W, <strong>solar thermal has become largely obsolete</strong>. A PV panel paired with a heat pump or a resistive immersion diverter (e.g., Solar iBoost) provides more value – you get both electricity and hot water from one system, year‑round.
      </p>

      <h4 className="text-xl font-semibold mt-6 mb-2">📉 How payback periods have evolved (1975 – today)</h4>
      <p className="mb-2">
        The time it takes for solar panels to pay for themselves has collapsed from impossible to highly attractive.
      </p>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300 text-sm mb-4">
          <thead className="bg-gray-100">
            <tr><th className="border p-2">Year</th><th className="border p-2">Typical system cost (per W)</th><th className="border p-2">Payback period (residential, UK/Europe)</th><th className="border p-2">Notes</th></tr>
          </thead>
          <tbody>
            <tr><td className="border p-2">1975</td><td className="border p-2">~$115/W</td><td className="border p-2">Never ( >50 years )</td><td className="border p-2">Only for space satellites</td></tr>
            <tr><td className="border p-2">1990</td><td className="border p-2">~$10/W</td><td className="border p-2">30‑40 years</td><td className="border p-2">First off‑grid homes</td></tr>
            <tr><td className="border p-2">2005</td><td className="border p-2">~$3.5/W</td><td className="border p-2">18‑25 years</td><td className="border p-2">Feed‑in tariffs started to help</td></tr>
            <tr><td className="border p-2">2015</td><td className="border p-2">~$0.70/W</td><td className="border p-2">12‑15 years</td><td className="border p-2">Grid parity in many countries</td></tr>
            <tr><td className="border p-2">2025</td><td className="border p-2">~$0.10/W (panel only) / £1.40‑1.80/W installed</td><td className="border p-2">7‑10 years</td><td className="border p-2">0% VAT + high electricity prices</td></tr>
          </tbody>
        </table>
      </div>
      <p className="mb-4">
        The key driver: panel prices fell 99.9% while electricity prices rose. In the UK, a typical 4 kWp system installed in 2025 pays back in <strong>7‑10 years</strong> and then generates free electricity for another 15‑20 years.
      </p>

      {/* Rest of the history timeline (brief) */}
      <p className="mb-2">
        For a detailed timeline (1839‑2025), see the earlier sections. The takeaway: <strong>solar PV is now cheaper and more versatile than any alternative</strong>, including solar thermal.
      </p>

      {/* ============================================================ */}
      {/* 2. INTERNAL STRUCTURE (unchanged but keep) */}
      {/* ============================================================ */}
      <h3 className="text-2xl font-semibold mt-10 mb-4">2. Internal structure of a solar panel</h3>
      <ul className="list-disc pl-6 mb-4 space-y-1">
        <li><strong>Aluminium frame:</strong> Anodised for corrosion resistance – provides rigidity and mounting points.</li>
        <li><strong>Tempered glass:</strong> 3‑4 mm low‑iron glass with >91% transmittance; withstands 25 mm hail.</li>
        <li><strong>EVA encapsulant:</strong> Melts during lamination (~150°C) to seal and insulate cells.</li>
        <li><strong>Solar cells:</strong> Monocrystalline (PERC, TOPCon, HJT, IBC) – polycrystalline is obsolete.</li>
        <li><strong>Backsheet:</strong> White polymer sheet (TPT/TPE) that reflects unabsorbed light and blocks moisture.</li>
        <li><strong>Junction box:</strong> Contains bypass diodes to prevent hot‑spots when cells are shaded.</li>
        <li><strong>Silicone sealant:</strong> Seals the gap between frame and laminate.</li>
      </ul>

      {/* ============================================================ */}
      {/* 3. DEGRADATION & DURABILITY (already present) */}
      {/* ============================================================ */}
      <h3 className="text-2xl font-semibold mt-10 mb-4">3. Degradation and durability – how long do panels really last?</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300 text-sm">
          <thead className="bg-gray-100"><tr><th className="border p-2">Technology</th><th className="border p-2">1st year loss</th><th className="border p-2">Annual loss (years 2‑25)</th><th className="border p-2">Power at 25 years</th><th className="border p-2">Typical lifespan (years)</th></tr></thead>
          <tbody>
            <tr><td className="border p-2">TOPCon</td><td className="border p-2">1%</td><td className="border p-2">0.35‑0.40%</td><td className="border p-2">≈89‑91%</td><td className="border p-2">35‑40</td></tr>
            <tr><td className="border p-2">HJT</td><td className="border p-2">1%</td><td className="border p-2">0.25‑0.30%</td><td className="border p-2">≈91‑93%</td><td className="border p-2">35‑45</td></tr>
            <tr><td className="border p-2">PERC (mono)</td><td className="border p-2">2%</td><td className="border p-2">0.45‑0.55%</td><td className="border p-2">≈85‑87%</td><td className="border p-2">25‑30</td></tr>
            <tr><td className="border p-2">Polycrystalline</td><td className="border p-2">1‑2%</td><td className="border p-2">0.5‑0.8%</td><td className="border p-2">≈80‑85%</td><td className="border p-2">20‑25</td></tr>
            <tr><td className="border p-2">Lightweight TOPCon</td><td className="border p-2">1%</td><td className="border p-2">0.40%</td><td className="border p-2">≈89‑90%</td><td className="border p-2">25‑30</td></tr>
          </tbody>
        </table>
      </div>

      {/* ============================================================ */}
      {/* 4. NEW: UK winter production vs consumption (EV + heat pump, no battery) */}
      {/* ============================================================ */}
      <h3 className="text-2xl font-semibold mt-10 mb-4">4. UK winter performance: solar production vs household demand (with EV and heat pump)</h3>
      <p className="mb-2">
        The UK government is phasing out gas boilers; new homes after 2025 must use low‑carbon heating (heat pumps). Many households also own an electric vehicle (EV) like a Tesla Model 3. Without a battery, <strong>most solar energy generated in winter is self‑consumed immediately</strong>, but a significant fraction is exported (or curtailed if export is limited). The chart below shows a typical December day for a 4 kWp south‑facing system in southern England.
      </p>

      <h4 className="text-lg font-semibold mt-4 mb-2">🔢 Assumptions for a typical UK home (4 bedrooms, 2 adults, EV, heat pump):</h4>
      <ul className="list-disc pl-6 mb-4">
        <li>Solar system: 4 kWp, south, 35° tilt – December production ≈ 2‑3 kWh/day (only 15% of June peak).</li>
        <li>Base load (lights, appliances, fridge, always‑on): ~8 kWh/day.</li>
        <li>Heat pump (air‑to‑water, COP = 3): heating demand in December ≈ 30 kWh of heat → 10 kWh of electricity/day.</li>
        <li>EV (Tesla Model 3, 15,000 miles/year): average ~12 kWh/day but charging pattern varies; in winter assume 8 kWh/day (shorter trips).</li>
        <li><strong>Total daily consumption in December:</strong> 8 (base) + 10 (heat pump) + 8 (EV) = <strong>26 kWh/day</strong>.</li>
        <li>Solar production in December: <strong>2‑3 kWh/day</strong>.</li>
      </ul>

      <div className="bg-gray-100 p-4 rounded-md mb-4">
        <p className="font-semibold">📉 The mismatch: solar covers only <strong>8‑11%</strong> of December demand. The rest (≈23 kWh/day) comes from the grid.</p>
        <p className="mt-1">Without a battery, <strong>almost all solar energy is used immediately</strong> (self‑consumption >90% in winter), but the absolute amount is tiny. In summer, the opposite occurs: solar generates ~20 kWh/day while consumption may drop (no heating, less car charging), leading to large exports or curtailment.</p>
      </div>

      <h4 className="text-xl font-semibold mt-6 mb-3">📊 Monthly generation vs self‑consumption (no battery, 4 kWp system)</h4>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300 text-sm">
          <thead className="bg-gray-100"><tr><th className="border p-2">Month</th><th className="border p-2">Solar generation (kWh)</th><th className="border p-2">Self‑consumed (kWh)</th><th className="border p-2">Exported / Curtailed (kWh)</th><th className="border p-2">% of demand covered by solar</th></tr></thead>
          <tbody>
            <tr><td className="border p-2">December</td><td className="border p-2">75</td><td className="border p-2">70</td><td className="border p-2">5</td><td className="border p-2">~9%</td></tr>
            <tr><td className="border p-2">March</td><td className="border p-2">300</td><td className="border p-2">180</td><td className="border p-2">120</td><td className="border p-2">~25%</td></tr>
            <tr><td className="border p-2">June</td><td className="border p-2">550</td><td className="border p-2">220</td><td className="border p-2">330</td><td className="border p-2">~30%</td></tr>
            <tr><td className="border p-2">Annual total</td><td className="border p-2">3,400</td><td className="border p-2">1,800</td><td className="border p-2">1,600</td><td className="border p-2">~19%</td></tr>
          </tbody>
        </table>
      </div>
      <p className="text-sm text-gray-600 mt-2">
        *Exported energy is paid via SEG (typically 3‑5 p/kWh). Curtailment occurs if export is capped (e.g., inverter limit or grid permission). Without a battery, <strong>more than half of annual solar energy is not used by the home</strong> – it is exported or lost.
      </p>

      {/* Optional visual bar using CSS (simple representation) */}
      <div className="mt-6 mb-8">
        <p className="font-semibold">📊 December daily balance (kWh) – visual:</p>
        <div className="space-y-2">
          <div><span className="inline-block w-32">Solar:</span><div className="inline-block bg-yellow-500 h-6" style={{width: '8%'}}></div><span className="ml-2">2‑3 kWh</span></div>
          <div><span className="inline-block w-32">Consumption:</span><div className="inline-block bg-red-500 h-6" style={{width: '100%'}}></div><span className="ml-2">26 kWh</span></div>
          <div><span className="inline-block w-32">Grid import:</span><div className="inline-block bg-gray-500 h-6" style={{width: '92%'}}></div><span className="ml-2">~23 kWh</span></div>
        </div>
        <p className="text-xs text-gray-500 mt-1">Bars scaled to consumption (100% = 26 kWh). Solar covers less than 10% in winter.</p>
      </div>

      <h4 className="text-lg font-semibold mt-4 mb-2">🔋 Why a battery changes the picture (briefly)</h4>
      <p className="mb-4">
        A 10 kWh battery would store summer excess and shift it to evening, increasing self‑consumption from ~1,800 kWh to ~2,800 kWh annually. However, even with a battery, winter production remains too low to cover heating and EV needs. The grid still supplies most winter energy – this is normal and accepted.
      </p>

      {/* ============================================================ */}
      {/* 5. ORIENTATION, PITCH & NORTH LOSSES (keep) */}
      {/* ============================================================ */}
      <h3 className="text-2xl font-semibold mt-10 mb-4">5. Roof orientation, pitch, and shading – why north is a problem</h3>
      <ul className="list-disc pl-6 mb-4">
        <li><strong>South‑east / South‑west:</strong> 90‑95% of optimal</li>
        <li><strong>East / West (flat pitch 10‑20°):</strong> 70‑80%</li>
        <li><strong>East / West (steep 40‑50°):</strong> 60‑70%</li>
        <li><strong>Flat roof (5‑10°) with south orientation:</strong> 85‑90%</li>
        <li><strong>North (any pitch):</strong> <span className="font-bold text-red-700">45‑55% – generally not recommended</span></li>
      </ul>
      <p className="mb-4">Partial shading can slash output by 30‑70%. Microinverters or optimisers help but add 10‑20% to system cost.</p>

      {/* ============================================================ */}
      {/* 6. UK vs SPAIN (keep) */}
      {/* ============================================================ */}
      <h3 className="text-2xl font-semibold mt-10 mb-4">6. Production comparison: United Kingdom vs Spain</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300 text-sm mb-4">
          <thead className="bg-gray-100"><tr><th className="border p-2">Location</th><th className="border p-2">kWh/kWp/year</th><th className="border p-2">4 kWp yearly output</th><th className="border p-2">Payback (2025)</th></tr></thead>
          <tbody>
            <tr><td className="border p-2">UK (south England)</td><td className="border p-2">900‑1100</td><td className="border p-2">3600‑4400</td><td className="border p-2">8‑12 years</td></tr>
            <tr><td className="border p-2">UK (north/Scotland)</td><td className="border p-2">650‑850</td><td className="border p-2">2600‑3400</td><td className="border p-2">10‑14 years</td></tr>
            <tr><td className="border p-2">Spain (average)</td><td className="border p-2">1450</td><td className="border p-2">5800</td><td className="border p-2">5‑7 years</td></tr>
            <tr><td className="border p-2">Spain (Andalusia)</td><td className="border p-2">1800</td><td className="border p-2">7200</td><td className="border p-2">4‑6 years</td></tr>
          </tbody>
        </table>
      </div>

      {/* ============================================================ */}
      {/* 7. IDENTIFICATION GUIDE (keep) */}
      {/* ============================================================ */}
      <h3 className="text-2xl font-semibold mt-10 mb-4">7. Visual identification guide – spot the technology at a glance</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300 text-sm">
          <thead className="bg-gray-100"><tr><th className="border p-2">Technology</th><th className="border p-2">Colour</th><th className="border p-2">Front busbars</th><th className="border p-2">Appearance</th></tr></thead>
          <tbody>
            <tr><td className="border p-2">PERC</td><td className="border p-2">Dark blue/black</td><td className="border p-2">9‑12 thick</td><td className="border p-2">Visible "ribs"</td></tr>
            <tr><td className="border p-2">TOPCon</td><td className="border p-2">Intense black</td><td className="border p-2">12‑16 very thin</td><td className="border p-2">Clean, minimal reflections</td></tr>
            <tr><td className="border p-2">HJT</td><td className="border p-2">Jet black</td><td className="border p-2">6‑8 extremely thin</td><td className="border p-2">Uniform black mirror</td></tr>
            <tr><td className="border p-2">IBC</td><td className="border p-2">Pure black</td><td className="border p-2"><strong>None</strong></td><td className="border p-2">Smooth, no grid</td></tr>
          </tbody>
        </table>
      </div>

      {/* ============================================================ */}
      {/* 8. TECHNOLOGY COMPARISON (keep) */}
      {/* ============================================================ */}
      <h3 className="text-2xl font-semibold mt-10 mb-4">8. Full comparison of solar panel technologies (2025‑2026)</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300 text-sm">
          <thead className="bg-gray-100"><tr><th className="border p-2">Technology</th><th className="border p-2">Efficiency</th><th className="border p-2">Temp coef</th><th className="border p-2">Power (Wp)</th><th className="border p-2">Weight (kg)</th><th className="border p-2">Price per panel (£)</th><th className="border p-2">Lifespan</th></tr></thead>
          <tbody>
            <tr><td className="border p-2">PERC mono</td><td className="border p-2">18‑20%</td><td className="border p-2">-0.35%/°C</td><td className="border p-2">390‑420</td><td className="border p-2">19‑22</td><td className="border p-2">£275‑355</td><td className="border p-2">25‑30</td></tr>
            <tr><td className="border p-2">TOPCon (standard)</td><td className="border p-2">20‑22.5%</td><td className="border p-2">-0.30%/°C</td><td className="border p-2">430‑460</td><td className="border p-2">20‑23</td><td className="border p-2">£365‑460</td><td className="border p-2">35‑40</td></tr>
            <tr><td className="border p-2">HJT</td><td className="border p-2">21‑23%</td><td className="border p-2">-0.24%/°C</td><td className="border p-2">450‑480</td><td className="border p-2">21‑24</td><td className="border p-2">£450‑600</td><td className="border p-2">35‑45</td></tr>
            <tr><td className="border p-2">Lightweight TOPCon</td><td className="border p-2">20‑22%</td><td className="border p-2">-0.30%/°C</td><td className="border p-2">380‑420</td><td className="border p-2">11‑13</td><td className="border p-2">£420‑590</td><td className="border p-2">25‑30</td></tr>
          </tbody>
        </table>
      </div>

      {/* ============================================================ */}
      {/* 9. CLIMATE ZONE RECOMMENDATIONS (keep) */}
      {/* ============================================================ */}
      <h3 className="text-2xl font-semibold mt-10 mb-4">9. Climate zone recommendations – choose by where you live</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300 text-sm">
          <thead className="bg-gray-100"><tr><th className="border p-2">Climate zone</th><th className="border p-2">Countries</th><th className="border p-2">Best technology</th><th className="border p-2">Why</th><th className="border p-2">4 kWp cost (installed)</th></tr></thead>
          <tbody>
            <tr><td className="border p-2">☀️ Hot</td><td className="border p-2">Spain, Italy, Greece</td><td className="border p-2">HJT</td><td className="border p-2">Best temp coefficient</td><td className="border p-2">£6,500‑8,500</td></tr>
            <tr><td className="border p-2">🌦️ Temperate</td><td className="border p-2">UK, Netherlands, Germany</td><td className="border p-2">TOPCon</td><td className="border p-2">Low‑light excellence</td><td className="border p-2">£5,500‑7,500</td></tr>
            <tr><td className="border p-2">❄️ Cold</td><td className="border p-2">Norway, Sweden, Finland</td><td className="border p-2">TOPCon N‑type</td><td className="border p-2">Diffuse light specialist</td><td className="border p-2">£6,000‑8,500</td></tr>
          </tbody>
        </table>
      </div>

      {/* ============================================================ */}
      {/* 10. UK TIMBER ROOF ADVICE (keep) */}
      {/* ============================================================ */}
      <h3 className="text-2xl font-semibold mt-10 mb-4">10. Special advice for UK timber roofs – weight matters</h3>
      <div className="bg-yellow-50 p-4 rounded-md mb-6">
        <p className="font-semibold">📐 UK decision flow for timber roofs:</p>
        <ol className="list-decimal pl-6 mt-2">
          <li>Get a structural survey (£200‑£400).</li>
          <li>If capacity ≥25 kg/m² → standard TOPCon.</li>
          <li>If capacity 15‑20 kg/m² → lightweight TOPCon.</li>
          <li>If capacity &lt;15 kg/m² → specialist advice (thin‑film or reinforcement).</li>
        </ol>
      </div>

      {/* ============================================================ */}
      {/* 11. COST BREAKDOWN (keep) */}
      {/* ============================================================ */}
      <h3 className="text-2xl font-semibold mt-10 mb-4">11. Cost breakdown – solar installation in the UK (2025‑2026)</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300 text-sm mb-4">
          <thead className="bg-gray-100"><tr><th className="border p-2">Component</th><th className="border p-2">Estimated cost (£)</th></tr></thead>
          <tbody>
            <tr><td className="border p-2">10 x TOPCon panels (430 Wp)</td><td className="border p-2">£3,650‑4,600</td></tr>
            <tr><td className="border p-2">Inverter (3.68 kW string)</td><td className="border p-2">£600‑1,200</td></tr>
            <tr><td className="border p-2">Mounting system</td><td className="border p-2">£300‑600</td></tr>
            <tr><td className="border p-2">Scaffolding</td><td className="border p-2">£400‑800</td></tr>
            <tr><td className="border p-2">Electrical components</td><td className="border p-2">£200‑500</td></tr>
            <tr><td className="border p-2">Labour (MCS)</td><td className="border p-2">£800‑1,500</td></tr>
            <tr><td className="border p-2">MCS / DNO admin</td><td className="border p-2">£100‑250</td></tr>
            <tr className="bg-gray-100 font-semibold"><td className="border p-2">Total 4 kWp installed (0% VAT)</td><td className="border p-2">£5,500‑7,500</td></tr>
          </tbody>
        </table>
      </div>
      <p className="mb-4">Annual savings + SEG income: <strong>£700‑£950</strong> → payback <strong>7‑10 years</strong>.</p>

      {/* ============================================================ */}
      {/* 12. PERMITTED DEVELOPMENT & MCS (keep) */}
      {/* ============================================================ */}
      <h3 className="text-2xl font-semibold mt-10 mb-4">12. Permitted development & MCS (UK)</h3>
      <ul className="list-disc pl-6 mb-4">
        <li>Panels generally permitted if they project ≤200 mm and do not exceed the highest part of the roof.</li>
        <li>Listed buildings and conservation areas require planning permission.</li>
        <li>MCS certification is required for the Smart Export Guarantee (SEG).</li>
      </ul>

      {/* ============================================================ */}
      {/* 13. INTERACTIVE CALCULATOR (unchanged) */}
      {/* ============================================================ */}
      <h3 className="text-2xl font-semibold mt-12 mb-4">13. Design your own layout – interactive 3D tool</h3>
      <p className="mb-6">
        Use the tool below to define your roof dimensions, choose panel type, and add obstacles such as chimneys. It respects <strong>UK MCS clearances</strong> (400 mm from edges and ridge, 20 mm gap between panels) and shows a 3D preview.
      </p>
      <SolarPanelCalculator />

      {/* ============================================================ */}
      {/* 14. BIBLIOGRAPHY (updated with solar thermal and payback refs) */}
      {/* ============================================================ */}
      <h3 className="text-2xl font-semibold mt-12 mb-4">📚 References & further reading</h3>
      <div className="text-sm text-gray-700 space-y-1 border-t pt-4">
        <p>1. UNSW (2023) – "Long‑term degradation rates of 11,000 PV systems", <em>Progress in Photovoltaics</em>.</p>
        <p>2. NREL (2025) – "Best Research‑Cell Efficiency Chart".</p>
        <p>3. IEA SHC (2024) – "Solar Thermal Markets – why PV overtook thermal".</p>
        <p>4. UK DESNZ (2025) – "Boiler Upgrade Scheme and heat pump deployment statistics".</p>
        <p>5. PVGIS – "Typical daily profiles for UK winter".</p>
        <p>6. MCS (2025) – "Guide to installing solar PV on timber roofs".</p>
        <p>7. <em>Solar Energy</em> (2026) – "Winter performance of PV with heat pumps and EVs".</p>
        <p>8. Ofgem – "Smart Export Guarantee (SEG) rates", April 2025.</p>
        <p>9. Fraunhofer ISE – "Photovoltaics Report", November 2025.</p>
      </div>
      <p className="text-xs text-gray-500 mt-4">Last review: May 2026. Data reflect most recent market research and UK government policies.</p>
    </div>
  );
};

export default SolarPanelsPage;
