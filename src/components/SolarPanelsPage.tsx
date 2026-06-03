import React from 'react';
import SolarPanelCalculator from './SolarPanelCalculator';

const SolarPanelsPage: React.FC = () => {
  return (
    <div className="text-black max-w-6xl mx-auto px-4">
      <h2 className="text-3xl md:text-4xl font-light mb-6">
        <strong>Solar panels: complete technical guide for homeowners (2025‑2026)</strong>
      </h2>

      <p className="text-lg mb-6">
        Photovoltaic solar panels convert sunlight into electricity and today stand among the most profitable investments for homeowners. In this guide, you'll discover when solar panels were first developed, how much they used to cost, and how much they cost now after a price drop of more than 90%.
        <br /><br />
        <strong>But the real question is: are they truly a good investment?</strong>
      </p>

      <div className="flex justify-center my-4">
        <img 
          src="https://res.cloudinary.com/dwealmbfi/image/upload/v1780122307/hombre_en_traje_de_c_tmj9sf.png" 
          alt="Investment" 
          className="w-auto" 
          style={{ height: '13.2rem' }}
        />
      </div>

      <p className="text-lg mb-6">
        You will also see what real returns they offer compared to other investments: a bank deposit yields around 3%, the stock market can reach <strong>10%</strong>, but solar panels achieve between <strong>12% and 18%</strong> annually, depending on your home and your consumption. Additionally, you will learn how to use a simple formula to calculate how many years it will take to recoup your investment, without batteries. You can enter your own data: orientation, location, number of panels, roof pitch, installation costs, and your average consumption. If you sell surplus energy back to the electricity company, you will know exactly when your electricity will become completely free. <strong>Is the investment profitable then? Could it even be more profitable than investing in the stock market?</strong>
      </p>

      <div className="flex justify-center my-4">
        <img 
          src="https://res.cloudinary.com/dwealmbfi/image/upload/v1780122594/Inersion_xdcdrw.png" 
          alt="Inversion" 
          className="w-auto" 
          style={{ height: '13.2rem' }}
        />
      </div>

      <p className="text-lg mb-6">
        Tailored to the real characteristics of your home, you'll get the exact data you need to understand your investment clearly and confidently. But first, let's learn more about the history of solar panels to understand the current state of this technology, as well as the future of the next technologies being researched. <strong>Let's go.</strong>
      </p>

      {/* ============================================================ */}
      {/* 1. EXTENDED HISTORY + ANALYSIS OF MONO vs POLY + TABLES FROM POINTS 3 & 4 */}
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

      {/* TWO IMAGES IN PARALLEL */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
        <div className="flex justify-center">
          <div className="w-full max-w-md rounded-lg overflow-hidden shadow-md">
            <img 
              src="https://res.cloudinary.com/dwealmbfi/image/upload/v1779952585/4218c5e2-e86e-4093-b8c4-21aa628fbd49.png" 
              alt="Diagram 1" 
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
        <div className="flex justify-center">
          <div className="w-full max-w-xs rounded-lg overflow-hidden shadow-md">
            <img 
              src="https://res.cloudinary.com/dwealmbfi/image/upload/v1779952645/fa9cf63c-2bce-454e-be4a-47a0bc1c09b2.png" 
              alt="Diagram 2" 
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>

      <p className="mb-2">
        The true “big bang” of solar energy happened in <strong>1954</strong> when engineers at
        <strong>Bell Laboratories</strong> developed the first practical silicon solar cell, achieving
        <strong>6% efficiency</strong>. That cell was made of <strong>crystalline silicon</strong> – the
        same base material still used in almost <strong>all panels today</strong>.
      </p>

      <div className="flex justify-center my-6">
        <img 
          src="https://res.cloudinary.com/dwealmbfi/image/upload/v1779952879/4396d0fd-a82f-424e-bcac-dcf41e8911d6.png" 
          alt="Solar panel diagram" 
          className="w-full max-w-md rounded-lg shadow-md"
        />
      </div>

      <h4 className="text-xl font-semibold mt-6 mb-2">🚀 The Space Race (late 1950s – 1960s)</h4>
      <p className="mb-2">
        The need for reliable power in space catapulted solar technology. By <strong>1959</strong>,
        <strong>Hoffman Electronics</strong> was manufacturing commercial cells with
        <strong>10% efficiency</strong>, used primarily on satellites. Costs remained astronomical
        for Earth‑based use, but the technology matured rapidly.
      </p>

      <div className="flex justify-center my-6">
        <img 
          src="https://res.cloudinary.com/dwealmbfi/image/upload/v1779956789/1703e28d-97a4-4f98-a2d2-69166a1c8755.png" 
          alt="Space race solar panel diagram" 
          className="w-full max-w-md rounded-lg shadow-md"
        />
      </div>

      <h4 className="text-xl font-semibold mt-6 mb-2">🏠 First Rooftops (1970 – 2000)</h4>
      <p className="mb-2">
        The oil crisis of the 1970s spurred research into terrestrial applications. The first
        residential solar panels were <strong>polycrystalline</strong> – cheaper to produce but less
        efficient than monocrystalline. During this period, two main types of silicon panels emerged:
      </p>
      <ul className="list-disc pl-6 mb-4">
        <li><strong>Monocrystalline silicon (mono‑Si):</strong> Made from a single crystal, higher
        efficiency (15‑20%), uniform dark colour, but more expensive.</li>

        <div className="flex justify-center my-4">
          <img 
            src="https://res.cloudinary.com/dwealmbfi/image/upload/v1779970838/Monocristaline_imbvt7.png" 
            alt="Monocrystalline silicon panel" 
            className="w-full max-w-md rounded-lg shadow-md"
          />
        </div>

        <li><strong>Polycrystalline silicon (poly‑Si):</strong> Made from melted fragments, lower
        efficiency (13‑16%), speckled blue appearance, cheaper to manufacture.</li>

        <div className="flex justify-center my-4">
          <img 
            src="https://res.cloudinary.com/dwealmbfi/image/upload/v1779971127/afbc2e44-892f-4e87-83f4-b19cc739626d.png" 
            alt="Polycrystalline silicon panel" 
            className="w-full max-w-md rounded-lg shadow-md"
          />
        </div>

        <div className="bg-gray-100 p-4 rounded-md my-6">
          <p className="font-semibold text-lg mb-2">Visual Differences: Monocrystalline vs Polycrystalline Solar Panels</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="font-semibold">Monocrystalline Panels</p>
              <ul className="list-disc pl-5">
                <li>Color: Deep black (uniform)</li>
                <li>Cells: Smooth and consistent appearance</li>
                <li>Shape: Cells often have rounded corners</li>
                <li>Texture: Clean, solid look (no visible variation)</li>
                <li>Overall style: Premium, modern, minimal</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold">Polycrystalline Panels</p>
              <ul className="list-disc pl-5">
                <li>Color: Blue (sometimes light or mixed shades)</li>
                <li>Cells: Speckled / grainy texture (like crystal fragments)</li>
                <li>Shape: More square-looking cells</li>
                <li>Texture: Visible irregular patterns inside each cell</li>
                <li>Overall style: More industrial, less uniform</li>
              </ul>
            </div>
          </div>
        </div>
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
        📊 Monocrystalline panels dominate; polycrystalline is losing relevance
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
        coefficient, power, weight, price per panel, and expected lifespan. Use it to choose the
        right panel for your specific needs.
      </p>
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
      {/* 2. FUTURE TECHNOLOGIES (2026-2035) - REORGANIZED */}
      {/* ============================================================ */}
      <h3 className="text-2xl font-semibold mt-10 mb-4">
        2. The near future: new solar technologies (2026‑2035)
      </h3>
      <p className="mb-4">
        Although today's panels are already very efficient, science continues to advance. Here are
        the technologies that will reach rooftops in the coming years.
      </p>

      <h4 className="text-xl font-semibold mt-6 mb-2">2.1 The tandem revolution: Perovskite + Silicon</h4>
      <p className="mb-2"><strong>What is it?</strong> Stacking a top perovskite cell (captures blue light) and a bottom silicon cell (captures red light) to capture a broader solar spectrum.</p>
      <p className="mb-2"><strong>Expected efficiency:</strong> Already above 30% in labs, commercial modules expected to reach 35% by 2030.</p>
      <p className="mb-2"><strong>Availability:</strong> 2026‑2027. Oxford PV and others plan commercial products with 20‑25 year warranties.</p>
      <p className="mb-2">
        Today’s comparison between Oxford PV’s perovskite tandem panels and standard monocrystalline technology highlights a clear trade-off between performance and market maturity. Monocrystalline panels—the current industry standard—typically cost around <strong>£0.20–£0.32/W</strong>, supported by large-scale global manufacturing, proven lifespans exceeding 25 years, and efficiencies in the 20–23% range (up to ~25% with advanced designs). In contrast, Oxford PV’s panels achieve higher efficiencies of around <strong>24–25%</strong>, but come with estimated production costs of $0.29–0.42/W, likely higher in commercial agreements due to their early-stage positioning and limited scale. The company only began commercial sales in <strong>September 2024</strong>, with its first shipment delivered to a U.S. utility-scale project, marking the world’s first deployment of this technology.
      </p>
      <p className="mb-4">
        From a market perspective, Oxford PV is not yet competing in the mainstream solar segment. Its panels are currently sold through select, large-scale (utility) projects and pilot applications, rather than open commercial distribution, with plans to expand into residential and broader markets in the future. This means that while Oxford PV offers superior energy output per square meter, it does not yet outperform monocrystalline panels on a cost-risk basis. Monocrystalline remains cheaper, widely available, and fully bankable, whereas Oxford PV is still an emerging, high-efficiency solution with greater uncertainty—positioned less as an immediate replacement and more as a potential next-generation technology if it successfully scales and proves long-term reliability.
      </p>

      <h4 className="text-xl font-semibold mt-6 mb-2">2.2 Back‑Contact (BC) technology – the premium choice for aesthetics and efficiency</h4>
      <p className="mb-2">
        Back-Contact (BC) is a solar cell technology in which all electrical contacts are placed on the rear side of the cell, leaving the entire front surface fully exposed to sunlight and eliminating shading losses caused by metal gridlines. This design improves light capture and boosts efficiency compared to conventional panels, while also delivering a uniform, all-black appearance. As a result, BC technology is particularly suited for high-end residential installations and architecturally sensitive applications, where visual quality and design integration are key and the solar system becomes part of the property’s aesthetic distinction. However, its more complex manufacturing process and higher cost limit its adoption in mass markets, meaning it is likely to remain a premium solution rather than a mainstream standard.
      </p>

      <h4 className="text-xl font-semibold mt-6 mb-2">⚔️ TOPCon vs. Back-Contact (BC): the next decade's battle</h4>
      <p className="mb-4">
        Back‑Contact (BC) moves all metal contacts to the rear, increasing efficiency by 2‑3% but at higher cost. Analysts predict BC will reach cost parity with TOPCon between <strong>2028 and 2030</strong>. By 2035, tandem panels (perovskite‑silicon) may replace both.
      </p>

      <h4 className="text-xl font-semibold mt-6 mb-2">✨ Visual timeline of key milestones</h4>
      <div className="overflow-x-auto mb-6">
        <table className="min-w-full border-collapse border border-gray-300 text-sm">
          <thead className="bg-gray-100">
            <tr><th className="border p-2">Year</th><th className="border p-2">Milestone</th></tr>
          </thead>
          <tbody>
            <tr><td className="border p-2">1839</td><td className="border p-2">Becquerel discovers photovoltaic effect</td></tr>
            <tr><td className="border p-2">1883</td><td className="border p-2">Fritts builds first selenium cell (~1‑2%)</td></tr>
            <tr><td className="border p-2">1954</td><td className="border p-2">Bell Labs creates first practical silicon cell (6%)</td></tr>
            <tr><td className="border p-2">1959</td><td className="border p-2">Hoffman Electronics achieves 10% efficiency for satellites</td></tr>
            <tr><td className="border p-2">1970s‑2000</td><td className="border p-2">First rooftops, polycrystalline and monocrystalline coexist</td></tr>
            <tr><td className="border p-2">2000‑2015</td><td className="border p-2">China scales production, prices collapse from $5/W to $0.70/W</td></tr>
            <tr><td className="border p-2">2023‑2025</td><td className="border p-2">TOPCon becomes dominant (≈97% of new mono‑crystalline installs)</td></tr>
            <tr><td className="border p-2">2026‑2028</td><td className="border p-2">First commercial Perovskite‑Silicon tandem panels</td></tr>
            <tr><td className="border p-2">2028‑2030</td><td className="border p-2">Back‑Contact (BC) reaches cost parity with TOPCon</td></tr>
            <tr><td className="border p-2">2030‑2035</td><td className="border p-2">Tandem panels become mainstream, efficiency &gt;30‑35%</td></tr>
          </tbody>
        </table>
      </div>

      {/* ============================================================ */}
      {/* 3. INTERNAL STRUCTURE */}
      {/* ============================================================ */}
      <h3 className="text-2xl font-semibold mt-10 mb-4">3. Internal structure of a solar panel</h3>
      <p className="mb-2">
        Every modern solar panel is a multi‑layer laminate designed to protect the cells while
        maximising light absorption. The main layers are:
      </p>
      <ul className="list-disc pl-6 mb-4 space-y-1">
        <li><strong>Aluminium frame:</strong> Anodised for corrosion resistance – provides rigidity and mounting points.</li>
        <li><strong>Tempered glass:</strong> 3‑4 mm low‑iron glass with &gt;91% transmittance; withstands 25 mm hail.</li>
        <li><strong>EVA encapsulant:</strong> Melts during lamination (~150°C) to seal and insulate cells.</li>
        <li><strong>Solar cells:</strong> Monocrystalline (PERC, TOPCon, HJT, IBC) – polycrystalline is obsolete.</li>
        <li><strong>Backsheet:</strong> White polymer sheet (TPT/TPE) that reflects unabsorbed light and blocks moisture.</li>
        <li><strong>Junction box:</strong> Contains bypass diodes to prevent hot‑spots when cells are shaded.</li>
        <li><strong>Silicone sealant:</strong> Seals the gap between frame and laminate.</li>
      </ul>
      <p className="mb-4">
        The quality of lamination and materials determines long‑term durability. Premium panels use
        thicker glass, UV‑stable EVA, and robust backsheets to achieve 35+ year lifespans.
      </p>

      {/* ============================================================ */}
      {/* 4. UK WINTER PERFORMANCE */}
      {/* ============================================================ */}
      <h3 className="text-2xl font-semibold mt-10 mb-4">4. UK winter performance: solar production vs household demand (with EV and heat pump)</h3>
      <p className="mb-2">
        The UK government is phasing out gas boilers; new homes after 2025 must use low‑carbon heating
        (heat pumps). Many households also own an electric vehicle (EV) like a Tesla Model 3. Without
        a battery, most solar energy generated in winter is self‑consumed immediately, but a
        significant fraction is exported or curtailed. The analysis below uses realistic assumptions.
      </p>
      <h4 className="text-lg font-semibold mt-4 mb-2">🔢 Assumptions for a typical UK home (4 bedrooms, 2 adults, EV, heat pump):</h4>
      <ul className="list-disc pl-6 mb-4">
        <li>Solar system: 4 kWp, south, 35° tilt – December production ≈ 2‑3 kWh/day (only 15% of June peak).</li>
        <li>Base load (lights, appliances, fridge, always‑on): ~8 kWh/day.</li>
        <li>Heat pump (air‑to‑water, COP=3): heating demand in December ≈ 30 kWh heat → 10 kWh electricity/day.</li>
        <li>EV (Tesla Model 3, 15,000 miles/year): average ~12 kWh/day but winter shorter trips → 8 kWh/day.</li>
        <li><strong>Total daily consumption in December:</strong> 8 + 10 + 8 = <strong>26 kWh/day</strong>.</li>
        <li>Solar production in December: <strong>2‑3 kWh/day</strong>.</li>
      </ul>
      <div className="bg-gray-100 p-4 rounded-md mb-4">
        <p className="font-semibold">📉 The mismatch: solar covers only <strong>8‑11%</strong> of December demand. The rest (≈23 kWh/day) comes from the grid.</p>
        <p className="mt-1">Without a battery, almost all solar energy is used immediately (self‑consumption &gt;90% in winter), but the absolute amount is tiny. In summer, solar generates ~20 kWh/day while consumption drops (no heating, less car charging), leading to large exports or curtailment.</p>
      </div>
      <h4 className="text-xl font-semibold mt-6 mb-3">📊 Monthly generation vs self‑consumption (no battery, 4 kWp system)</h4>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300 text-sm">
          <thead className="bg-gray-100"><tr><th className="border p-2">Month</th><th className="border p-2">Solar generation (kWh)</th><th className="border p-2">Self‑consumed (kWh)</th><th className="border p-2">Exported / Curtailed (kWh)</th><th className="border p-2">% of demand covered</th></tr></thead>
          <tbody>
            <tr><td className="border p-2">December</td><td className="border p-2">75</td><td className="border p-2">70</td><td className="border p-2">5</td><td className="border p-2">~9%</td></tr>
            <tr><td className="border p-2">March</td><td className="border p-2">300</td><td className="border p-2">180</td><td className="border p-2">120</td><td className="border p-2">~25%</td></tr>
            <tr><td className="border p-2">June</td><td className="border p-2">550</td><td className="border p-2">220</td><td className="border p-2">330</td><td className="border p-2">~30%</td></tr>
            <tr><td className="border p-2">Annual total</td><td className="border p-2">3,400</td><td className="border p-2">1,800</td><td className="border p-2">1,600</td><td className="border p-2">~19%</td></tr>
          </tbody>
        </table>
      </div>
      <p className="text-sm text-gray-600 mt-2">
        *Exported energy is paid via SEG (3‑5 p/kWh). Curtailment occurs if export is capped. Without a battery,
        <strong> more than half of annual solar energy is not used by the home</strong> – it is exported or lost.
      </p>
      <div className="mt-6 mb-8">
        <p className="font-semibold">📊 December daily balance (kWh) – visual:</p>
        <div className="space-y-2">
          <div><span className="inline-block w-32">Solar:</span><div className="inline-block bg-yellow-500 h-6" style={{width: '8%'}}></div><span className="ml-2">2‑3 kWh</span></div>
          <div><span className="inline-block w-32">Consumption:</span><div className="inline-block bg-red-500 h-6" style={{width: '100%'}}></div><span className="ml-2">26 kWh</span></div>
          <div><span className="inline-block w-32">Grid import:</span><div className="inline-block bg-gray-500 h-6" style={{width: '92%'}}></div><span className="ml-2">~23 kWh</span></div>
        </div>
        <p className="text-xs text-gray-500 mt-1">Bars scaled to consumption (100% = 26 kWh). Solar covers less than 10% in winter.</p>
      </div>

      {/* ============================================================ */}
      {/* 5. ROOF ORIENTATION */}
      {/* ============================================================ */}
      <h3 className="text-2xl font-semibold mt-10 mb-4">5. Roof orientation, pitch, and shading – why north is a problem</h3>
      <p className="mb-2">
        In the northern hemisphere, a south‑facing roof at about 35° tilt receives the maximum annual
        solar radiation. Deviations cause significant losses. The following guide shows expected
        production relative to a perfect south‑facing array.
      </p>
      <ul className="list-disc pl-6 mb-4">
        <li><strong>South‑east / South‑west:</strong> 90‑95% of optimal</li>
        <li><strong>East / West (flat pitch 10‑20°):</strong> 70‑80%</li>
        <li><strong>East / West (steep 40‑50°):</strong> 60‑70%</li>
        <li><strong>Flat roof (5‑10°) with south orientation:</strong> 85‑90% (use tilt frames to improve)</li>
        <li><strong>North (any pitch):</strong> <span className="font-bold text-red-700">45‑55% – generally not recommended</span></li>
      </ul>
      <p className="mb-4">Partial shading from chimneys, trees, or neighbouring buildings can slash output by 30‑70%. Microinverters or power optimisers help but add 10‑20% to system cost.</p>

      {/* ============================================================ */}
      {/* 6. UK vs SPAIN */}
      {/* ============================================================ */}
      <h3 className="text-2xl font-semibold mt-10 mb-4">6. Production comparison: United Kingdom vs Spain</h3>
      <p className="mb-2">
        Solar radiation varies dramatically across Europe. Spain receives nearly twice as much annual
        sunlight as the UK, which directly affects payback periods. The table below shows typical
        yields and expected payback times for a 4 kWp system.
      </p>
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
      {/* 7. VISUAL IDENTIFICATION */}
      {/* ============================================================ */}
      <h3 className="text-2xl font-semibold mt-10 mb-4">7. Visual identification guide – spot the technology at a glance</h3>
      <p className="mb-2">
        You can often identify the type of solar cell by looking at the colour and the pattern of
        thin metal lines (busbars) on the front of the panel. The table below summarises the visual
        differences.
      </p>
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
      {/* 8. CLIMATE ZONE */}
      {/* ============================================================ */}
      <h3 className="text-2xl font-semibold mt-10 mb-4">8. Climate zone recommendations – choose by where you live</h3>
      <p className="mb-2">
        Different technologies perform better in different climates. HJT panels have the best
        temperature coefficient, making them ideal for hot southern Europe. TOPCon excels in
        low‑light conditions, perfect for the UK and central Europe. The table below summarises
        the best choice for each climate zone.
      </p>
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
      {/* 9. TIMBER ROOF */}
      {/* ============================================================ */}
      <h3 className="text-2xl font-semibold mt-10 mb-4">9. Special advice for UK timber roofs – weight matters</h3>
      <p className="mb-2">
        Many British homes have timber roof structures that may not support heavy loads. A typical
        solar array adds 15‑25 kg/m². Unreinforced roofs often have a safe limit of around 20 kg/m².
        The following decision flow helps you choose the right panel based on your roof's capacity.
      </p>
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
      {/* 10. COST BREAKDOWN */}
      {/* ============================================================ */}
      <h3 className="text-2xl font-semibold mt-10 mb-4">10. Cost breakdown – solar installation in the UK (2025‑2026)</h3>
      <p className="mb-2">
        The total cost of a solar installation includes not only the panels but also the inverter,
        mounting system, scaffolding, electrical components, labour, and administrative fees.
        The table below shows a typical breakdown for a 4 kWp TOPCon system installed in southern
        England. All prices include 0% VAT (valid until March 2027).
      </p>
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
      {/* 11. PERMITTED DEVELOPMENT & MCS */}
      {/* ============================================================ */}
      <h3 className="text-2xl font-semibold mt-10 mb-4">11. Permitted development & MCS (UK)</h3>
      <p className="mb-2">
        In most cases, installing solar panels on a residential roof in the UK is considered
        <strong>permitted development</strong>, meaning you do not need planning permission as long as
        certain conditions are met. However, listed buildings and conservation areas have stricter rules.
      </p>
      <ul className="list-disc pl-6 mb-4">
        <li>Panels must project ≤200 mm from the roof slope.</li>
        <li>They cannot exceed the highest part of the roof (excluding chimneys).</li>
        <li>Listed buildings and conservation areas require full planning permission.</li>
        <li><strong>MCS certification</strong> (Microgeneration Certification Scheme) is required to access the Smart Export Guarantee (SEG), which pays you for exported electricity.</li>
      </ul>

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
