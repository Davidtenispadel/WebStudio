import React from 'react';
import SolarPanelCalculator from './SolarPanelCalculator';

const SolarPanelsPage: React.FC = () => {
  return (
    <div className="text-black max-w-6xl mx-auto px-4">
      <h2 className="text-3xl md:text-4xl font-light mb-6">Plan Your Project</h2>

      <p className="text-lg mb-4">
        A contemporary home is not just about design, it’s about making the right decisions that affect your budget, energy costs, and long‑term value.
        This section is built to help you plan your project with clarity and confidence.
      </p>
      <p className="mb-2">Here you can:</p>
      <ul className="list-disc pl-6 mb-6 space-y-1">
        <li>Understand how solutions like solar panels and batteries actually perform</li>
        <li>Compare materials and systems based on real data</li>
        <li>Estimate costs and potential savings before you commit</li>
        <li>Access simple tools to help you request accurate quotes</li>
      </ul>
      <p className="text-md italic text-gray-700 mb-6">
        Everything is based on real projects, current regulations, and proven results, not theory.
        As an architect, I continuously update this space to give you practical, data‑driven insights so you can avoid costly mistakes and make smarter decisions.
      </p>

      {/* ============================================================ */}
      {/* 1. EXTENDED HISTORY OF SOLAR PANELS */}
      {/* ============================================================ */}
      <h3 className="text-2xl font-semibold mt-8 mb-4">
        1. Origins and evolution of solar panels – from 19th century to today's technology
      </h3>

      <h4 className="text-xl font-semibold mt-6 mb-2">🌞 The Pioneers (19th century – 1954)</h4>
      <p className="mb-2">
        The history of solar energy began much earlier than most people imagine. In <strong>1883</strong>,
        American inventor <strong>Charles Fritts</strong> built the first practical photovoltaic
        module using selenium coated with a thin layer of gold. Its efficiency was only about
        <strong>1‑2%</strong> – revolutionary in concept but not practical for large‑scale electricity.
      </p>
      <p className="mb-2">
        The true “big bang” of solar energy happened in <strong>1954</strong> when engineers at
        <strong>Bell Laboratories</strong> developed the first practical silicon solar cell, achieving
        <strong>6% efficiency</strong>. That cell was made of <strong>crystalline silicon</strong> – the
        same base material still used in almost all panels today.
      </p>

      <h4 className="text-xl font-semibold mt-6 mb-2">🚀 The Space Race (late 1950s – 1960s)</h4>
      <p className="mb-2">
        The need for reliable power in space catapulted solar technology. By <strong>1959</strong>,
        <strong>Hoffman Electronics</strong> was manufacturing commercial cells with
        <strong>10% efficiency</strong>, used primarily on satellites. Costs remained astronomical
        for Earth‑based use, but the technology matured rapidly.
      </p>

      <h4 className="text-xl font-semibold mt-6 mb-2">🏠 First Rooftops (1970 – 2000)</h4>
      <p className="mb-2">
        The oil crisis of the 1970s spurred research into terrestrial applications. The first
        residential solar panels were <strong>polycrystalline</strong> – cheaper to produce but less
        efficient than monocrystalline. During this period, two main types of silicon panels emerged:
      </p>
      <ul className="list-disc pl-6 mb-4">
        <li><strong>Monocrystalline silicon (mono‑Si):</strong> Made from a single crystal, higher
        efficiency (15‑20%), uniform dark colour, but more expensive.</li>
        <li><strong>Polycrystalline silicon (poly‑Si):</strong> Made from melted fragments, lower
        efficiency (13‑16%), speckled blue appearance, cheaper to manufacture.</li>
      </ul>
      <p className="mb-2">
        By the 1990s, both types were used on rooftops, but polycrystalline dominated the low‑cost
        market. However, efficiency and manufacturing improvements steadily eroded the cost advantage
        of poly.
      </p>

      <h4 className="text-xl font-semibold mt-6 mb-2">📉 The incredible cost drop (1975 – today)</h4>
      <p className="mb-2">
        The reason solar panels are affordable today is a spectacular price reduction driven by
        innovation and mass manufacturing. In 1975, a solar cell cost <strong>$115/W</strong> – only
        viable for satellites. By 2005, costs had dropped to $3.5/W, and by 2015 to $0.70/W. Today,
        panel prices are below <strong>$0.10‑0.40/W</strong>, a reduction of more than 99.8% in 50 years.
      </p>
      <p className="mb-2">
        China's entry into component manufacturing after 2000 accelerated this trend, making solar
        the cheapest electricity source in history.
      </p>

      <h4 className="text-xl font-semibold mt-6 mb-2">
        📊 Today's panels: monocrystalline dominates, polycrystalline is obsolete
      </h4>
      <p className="mb-2">
        <strong>Do manufacturers still make polycrystalline panels?</strong> Yes, but they are rapidly
        disappearing. In 2025, <strong>over 97% of new residential installations use monocrystalline
        cells</strong>. Polycrystalline panels are only found in very low‑cost projects or developing
        markets. Why?
      </p>
      <ul className="list-disc pl-6 mb-4">
        <li><strong>Efficiency gap:</strong> Mono cells now reach 22‑24%, while poly struggles above 17%.</li>
        <li><strong>Space:</strong> Poly requires more roof area for the same power output.</li>
        <li><strong>Cost:</strong> The price difference has shrunk to less than 5‑10%, making mono the better value.</li>
        <li><strong>Degradation:</strong> Poly panels degrade faster (0.5‑0.8%/year vs 0.3‑0.5% for modern mono).</li>
      </ul>
      <p className="mb-2">
        Therefore, <strong>every panel recommended in this guide (PERC, TOPCon, HJT, IBC) is based on
        monocrystalline silicon</strong>. Polycrystalline is no longer a sensible choice for
        homeowners, unless you have extreme budget constraints and plenty of space.
      </p>

      <h4 className="text-xl font-semibold mt-6 mb-2">
        🔬 How long do panels really last? (Degradation and durability)
      </h4>
      <p className="mb-2">
        All solar panels degrade over time. The main causes are UV radiation, thermal cycling,
        humidity, and mechanical stress. A landmark University of New South Wales (UNSW) study of
        11,000 PV systems found a <strong>median degradation rate of 0.9% per year</strong>, but
        quality panels degrade much slower. For example, a Swiss study of panels installed
        between 1987 and 1993 showed only <strong>0.25% annual degradation</strong> – proving that
        premium materials can last 40‑50 years.
      </p>
      <p className="mb-2">
        The table below compares modern technologies: TOPCon, HJT, PERC, polycrystalline, and
        lightweight TOPCon. Note that <strong>HJT has the lowest degradation (0.25‑0.30%/year)</strong>,
        while polycrystalline degrades fastest.
      </p>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Technology</th>
              <th className="border p-2">1st year loss</th>
              <th className="border p-2">Annual loss (years 2‑25)</th>
              <th className="border p-2">Power at 25 years</th>
              <th className="border p-2">Typical lifespan (years)</th>
            </tr>
          </thead>
          <tbody>
            <tr><td className="border p-2">TOPCon</td><td className="border p-2">1%</td><td className="border p-2">0.35‑0.40%</td><td className="border p-2">≈89‑91%</td><td className="border p-2">35‑40</td></tr>
            <tr><td className="border p-2">HJT</td><td className="border p-2">1%</td><td className="border p-2">0.25‑0.30%</td><td className="border p-2">≈91‑93%</td><td className="border p-2">35‑45</td></tr>
            <tr><td className="border p-2">PERC (mono)</td><td className="border p-2">2%</td><td className="border p-2">0.45‑0.55%</td><td className="border p-2">≈85‑87%</td><td className="border p-2">25‑30</td></tr>
            <tr><td className="border p-2">Polycrystalline</td><td className="border p-2">1‑2%</td><td className="border p-2">0.5‑0.8%</td><td className="border p-2">≈80‑85%</td><td className="border p-2">20‑25</td></tr>
            <tr><td className="border p-2">Lightweight TOPCon</td><td className="border p-2">1%</td><td className="border p-2">0.40%</td><td className="border p-2">≈89‑90%</td><td className="border p-2">25‑30</td></tr>
          </tbody>
        </table>
      </div>

      <h4 className="text-xl font-semibold mt-6 mb-2">
        ⚙️ Detailed comparison of modern monocrystalline technologies
      </h4>
      <p className="mb-2">
        Today, the market offers several variations of monocrystalline panels: <strong>PERC</strong>
        (the previous standard), <strong>TOPCon</strong> (the new mainstream), <strong>HJT</strong>
        (high‑efficiency, best temperature coefficient), and <strong>Lightweight TOPCon</strong>
        (reduced weight for timber roofs). The table below compares their efficiency, temperature
        coefficient, power, weight, price per panel, and expected lifespan.
      </p>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300 text-sm">
          <thead className="bg-gray-100">
            <tr><th className="border p-2">Technology</th><th className="border p-2">Efficiency</th><th className="border p-2">Temp coef</th><th className="border p-2">Power (Wp)</th><th className="border p-2">Weight (kg)</th><th className="border p-2">Price per panel (£)</th><th className="border p-2">Lifespan</th></tr>
          </thead>
          <tbody>
            <tr><td className="border p-2">PERC mono</td><td className="border p-2">18‑20%</td><td className="border p-2">-0.35%/°C</td><td className="border p-2">390‑420</td><td className="border p-2">19‑22</td><td className="border p-2">£275‑355</td><td className="border p-2">25‑30</td></tr>
            <tr><td className="border p-2">TOPCon (standard)</td><td className="border p-2">20‑22.5%</td><td className="border p-2">-0.30%/°C</td><td className="border p-2">430‑460</td><td className="border p-2">20‑23</td><td className="border p-2">£365‑460</td><td className="border p-2">35‑40</td></tr>
            <tr><td className="border p-2">HJT</td><td className="border p-2">21‑23%</td><td className="border p-2">-0.24%/°C</td><td className="border p-2">450‑480</td><td className="border p-2">21‑24</td><td className="border p-2">£450‑600</td><td className="border p-2">35‑45</td></tr>
            <tr><td className="border p-2">Lightweight TOPCon</td><td className="border p-2">20‑22%</td><td className="border p-2">-0.30%/°C</td><td className="border p-2">380‑420</td><td className="border p-2">11‑13</td><td className="border p-2">£420‑590</td><td className="border p-2">25‑30</td></tr>
          </tbody>
        </table>
      </div>

      {/* ============================================================ */}
      {/* 2. FUTURE TECHNOLOGIES (2026-2035) */}
      {/* ============================================================ */}
      <h3 className="text-2xl font-semibold mt-10 mb-4">
        2. The near future: new solar technologies (2026‑2035)
      </h3>
      <p className="mb-2">
        Although today's panels are already very efficient, science continues to advance. Here are
        the technologies that will reach rooftops in the coming years.
      </p>
      <h4 className="text-xl font-semibold mt-6 mb-2">🔬 The tandem revolution: Perovskite + Silicon</h4>
      <p className="mb-2"><strong>What is it?</strong> Stacking a top perovskite cell (captures blue light) and a bottom silicon cell (captures red light).</p>
      <p className="mb-2"><strong>Expected efficiency:</strong> Already above 30% in labs, commercial modules expected to reach 35% by 2030.</p>
      <p className="mb-2"><strong>Availability:</strong> 2026‑2027. Oxford PV plans commercial products with 20‑25 year warranties.</p>
      <h4 className="text-xl font-semibold mt-6 mb-2">⚔️ TOPCon vs. Back-Contact (BC): the next decade's battle</h4>
      <p className="mb-2">Back‑Contact (BC) technology moves all metal contacts to the rear, increasing efficiency by 2‑3% but at higher cost. Analysts predict BC will reach cost parity with TOPCon between 2028 and 2030.</p>
      <div className="bg-gray-50 p-4 rounded-md mb-6">
        <p className="font-semibold">✨ Visual timeline of key milestones:</p>
        <ul className="list-disc pl-6 mt-2">
          <li>1839: Becquerel discovers photovoltaic effect</li>
          <li>1883: Fritts builds first selenium cell (~1‑2%)</li>
          <li>1954: Bell Labs creates first practical silicon cell (6%)</li>
          <li>1959: Hoffman Electronics achieves 10% efficiency for satellites</li>
          <li>1970s‑2000: First rooftops, polycrystalline and monocrystalline coexist</li>
          <li>2000‑2015: China scales production, prices collapse from $5/W to $0.70/W</li>
          <li>2023‑2025: TOPCon becomes dominant (≈97% of new mono‑crystalline installs)</li>
          <li>2026‑2028: First commercial Perovskite‑Silicon tandem panels</li>
          <li>2028‑2030: Back‑Contact (BC) reaches cost parity with TOPCon</li>
          <li>2030‑2035: Tandem panels become mainstream, efficiency &gt;30‑35%</li>
        </ul>
      </div>

      {/* ============================================================ */}
      {/* 3. INTERNAL STRUCTURE OF A SOLAR PANEL */}
      {/* ============================================================ */}
      <h3 className="text-2xl font-semibold mt-10 mb-4">3. Internal structure of a solar panel</h3>
      <p className="mb-2">Every modern solar panel is a multi‑layer laminate designed to protect the cells while maximising light absorption. The main layers are:</p>
      <ul className="list-disc pl-6 mb-4 space-y-1">
        <li><strong>Aluminium frame</strong> – anodised for corrosion resistance.</li>
        <li><strong>Tempered glass</strong> – 3‑4 mm, &gt;91% transmittance, withstands 25 mm hail.</li>
        <li><strong>EVA encapsulant</strong> – melts during lamination (~150°C) to seal and insulate.</li>
        <li><strong>Solar cells</strong> – monocrystalline (PERC, TOPCon, HJT, IBC).</li>
        <li><strong>Backsheet</strong> – white polymer sheet reflecting light and blocking moisture.</li>
        <li><strong>Junction box</strong> – contains bypass diodes to prevent hot‑spots.</li>
        <li><strong>Silicone sealant</strong> – seals the gap between frame and laminate.</li>
      </ul>

      {/* ============================================================ */}
      {/* 4. UK WINTER PERFORMANCE (EV + heat pump) */}
      {/* ============================================================ */}
      <h3 className="text-2xl font-semibold mt-10 mb-4">4. UK winter performance: solar production vs household demand (with EV and heat pump)</h3>
      <p className="mb-2">The UK government is phasing out gas boilers; new homes after 2025 must use low‑carbon heating (heat pumps). Many households also own an electric vehicle. Without a battery, most solar energy generated in winter is self‑consumed immediately, but a significant fraction is exported or curtailed.</p>
      <h4 className="text-lg font-semibold mt-4 mb-2">🔢 Assumptions for a typical UK home (4 bedrooms, EV, heat pump):</h4>
      <ul className="list-disc pl-6 mb-4">
        <li>Solar system: 4 kWp, south, 35° – December production ≈ 2‑3 kWh/day (15% of June peak).</li>
        <li>Base load: ~8 kWh/day.</li>
        <li>Heat pump (COP=3): 10 kWh electricity/day.</li>
        <li>EV (Tesla Model 3, 15,000 miles/year): 8 kWh/day in winter.</li>
        <li><strong>Total daily consumption in December:</strong> 26 kWh/day.</li>
        <li>Solar production: 2‑3 kWh/day – covers only 8‑11%.</li>
      </ul>
      <div className="bg-gray-100 p-4 rounded-md mb-4">
        <p className="font-semibold">📉 Without a battery, more than half of annual solar energy is exported or lost.</p>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300 text-sm">
          <thead className="bg-gray-100"><tr><th className="border p-2">Month</th><th className="border p-2">Solar generation (kWh)</th><th className="border p-2">Self‑consumed (kWh)</th><th className="border p-2">Exported / Curtailed (kWh)</th><th className="border p-2">% demand covered</th></tr></thead>
          <tbody>
            <tr><td className="border p-2">December</td><td className="border p-2">75</td><td className="border p-2">70</td><td className="border p-2">5</td><td className="border p-2">~9%</td></tr>
            <tr><td className="border p-2">March</td><td className="border p-2">300</td><td className="border p-2">180</td><td className="border p-2">120</td><td className="border p-2">~25%</td></tr>
            <tr><td className="border p-2">June</td><td className="border p-2">550</td><td className="border p-2">220</td><td className="border p-2">330</td><td className="border p-2">~30%</td></tr>
            <tr><td className="border p-2">Annual total</td><td className="border p-2">3,400</td><td className="border p-2">1,800</td><td className="border p-2">1,600</td><td className="border p-2">~19%</td></tr>
          </tbody>
        </table>
      </div>

      {/* ============================================================ */}
      {/* 5. ROOF ORIENTATION, PITCH & SHADING */}
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
      {/* 6. PRODUCTION COMPARISON: UK vs SPAIN */}
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
      {/* 7. VISUAL IDENTIFICATION GUIDE */}
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
      {/* 8. CLIMATE ZONE RECOMMENDATIONS */}
      {/* ============================================================ */}
      <h3 className="text-2xl font-semibold mt-10 mb-4">8. Climate zone recommendations – choose by where you live</h3>
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
      {/* 9. UK TIMBER ROOF ADVICE */}
      {/* ============================================================ */}
      <h3 className="text-2xl font-semibold mt-10 mb-4">9. Special advice for UK timber roofs – weight matters</h3>
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
      {/* 10. COST BREAKDOWN (UK) */}
      {/* ============================================================ */}
      <h3 className="text-2xl font-semibold mt-10 mb-4">10. Cost breakdown – solar installation in the UK (2025‑2026)</h3>
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
      {/* 11. PERMITTED DEVELOPMENT & MCS (UK) - EXPANDED */}
      {/* ============================================================ */}
      <h3 className="text-2xl font-semibold mt-10 mb-4">11. Permitted development & MCS (UK)</h3>
      <p className="mb-2">
        In most cases, installing solar panels on a residential roof in the UK is considered
        <strong> permitted development</strong>, meaning you do not need planning permission as long as
        certain conditions are met. However, listed buildings and conservation areas have stricter rules.
      </p>
      <ul className="list-disc pl-6 mb-4">
        <li>Panels must project ≤200 mm from the roof slope.</li>
        <li>They cannot exceed the highest part of the roof (excluding chimneys).</li>
        <li>Listed buildings and conservation areas require full planning permission.</li>
        <li>MCS certification is required to access the Smart Export Guarantee (SEG), which pays you for exported electricity.</li>
      </ul>

      <div className="bg-green-50 p-4 rounded-md mb-4">
        <p className="font-semibold">✅ Good news for most homeowners</p>
        <p className="text-sm">
          If your home is <strong>not a listed building</strong> and <strong>not in a conservation area</strong>,
          you generally do not need to apply for planning permission. A reputable MCS‑certified installer will handle
          all legalisation: notifying your Distribution Network Operator (DNO), submitting G98/G99 forms, and ensuring
          the system complies with <strong>engineering recommendation G99</strong> for grid connection.
        </p>
        <p className="text-sm mt-2">
          ⚡ <strong>Electrical safety is critical.</strong> Your installer must verify that the system has
          <strong> anti‑islanding protection</strong> – it automatically shuts down during a grid power cut.
          This prevents your panels from back‑feeding into the grid and endangering utility workers repairing the lines.
        </p>
      </div>

      <div className="bg-yellow-50 p-4 rounded-md mb-4">
        <p className="font-semibold">🏛️ If your home is listed or in a conservation area</p>
        <p className="text-sm">
          You <strong>will need full planning permission</strong>. Moreover, the installation must be sympathetic
          to the architectural character of the building and its setting. This usually requires an
          <strong> architect experienced in heritage projects</strong> to prepare drawings, a design statement,
          and a planning application – in addition to a certified solar installer.
        </p>
      </div>

      <div className="bg-blue-50 p-4 rounded-md mb-4">
        <p className="font-semibold">🔍 Check your property's constraints – official tools</p>
        <p className="text-sm mb-2">Use these free government‑linked resources before you commit:</p>
        <ul className="list-disc pl-6 text-sm">
          <li><a href="https://planningconstraints.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">PlanningConstraints.com</a> – immediate check if your property has any planning constraints (listed status, conservation area, Article 4 direction).</li>
          <li><a href="https://www.planwiser.co.uk/history" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">PlanWiser – History</a> – discover historical restrictions, tree preservation orders, or local design codes that may affect your roof.</li>
          <li><a href="https://www.planningportal.co.uk/" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Planning Portal (UK)</a> – official guide to permitted development rights and how to apply for full planning permission.</li>
        </ul>
        <p className="text-sm mt-2">
          Still unsure? <strong>DB+ expert team</strong> can review your specific case. Use our
          <a href="https://www.dbsdesigner.com/solar-calculator" target="_blank" rel="noopener noreferrer" className="text-blue-700 font-semibold underline ml-1"> contact form</a>
          – we will help you understand what permits you need, whether you require an architect, and how to avoid costly mistakes before installation.
        </p>
      </div>

      {/* ============================================================ */}
      {/* 12. INTERACTIVE CALCULATOR */}
      {/* ============================================================ */}
      <h3 className="text-2xl font-semibold mt-12 mb-4">12. Design your own layout – interactive 3D tool</h3>
      <p className="mb-6">
        Use the tool below to define your roof dimensions, choose panel type, and add obstacles such as chimneys.
        It respects <strong>UK MCS clearances</strong> (400 mm from edges and ridge, 20 mm gap between panels)
        and shows a 3D preview.
      </p>
      <SolarPanelCalculator />

      {/* ============================================================ */}
      {/* 13. BIBLIOGRAPHY */}
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
        <p>10. Oxford PV – "Centaur tandem module roadmap", 2025.</p>
      </div>
      <p className="text-xs text-gray-500 mt-4">Last review: May 2026. Data reflect most recent market research and UK government policies.</p>
    </div>
  );
};

export default SolarPanelsPage;
