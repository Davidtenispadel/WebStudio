import React from 'react';
import SolarPanelCalculator from './SolarPanelCalculator';

const SolarPanelsPage: React.FC = () => {
  return (
    <div className="text-black max-w-5xl mx-auto px-4">
      <h2 className="text-3xl md:text-4xl font-light mb-6">Solar panels</h2>
      
      <p className="text-lg mb-6">
        Solar photovoltaic (PV) panels convert sunlight into electricity. They are the most accessible renewable energy source for homes, offering energy independence and long-term savings.
      </p>

      {/* ========== 1. TIPOS DE PANELES ========== */}
      <h3 className="text-2xl font-semibold mt-8 mb-4">1. Types of solar panels</h3>
      <p className="mb-4">The market is dominated by crystalline silicon technologies. Below is a comparison of the main options available in 2025–2026:</p>
      
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Technology</th>
              <th className="border p-2">Efficiency</th>
              <th className="border p-2">Cost per watt</th>
              <th className="border p-2">Annual degradation</th>
              <th className="border p-2">Best for</th>
            </tr>
          </thead>
          <tbody>
            <tr><td className="border p-2">Monocrystalline (standard)</td><td className="border p-2">18-22%</td><td className="border p-2">£0.70-1.00</td><td className="border p-2">0.3-0.5%</td><td className="border p-2">Limited roof space</td></tr>
            <tr><td className="border p-2">TOPCon (mono premium)</td><td className="border p-2">up to 23.7%</td><td className="border p-2">~£0.10-0.12/Wp</td><td className="border p-2">0.45% (30y warranty)</td><td className="border p-2">Best residential (2026)</td></tr>
            <tr><td className="border p-2">Polycrystalline</td><td className="border p-2">15-17%</td><td className="border p-2">£0.90-1.00</td><td className="border p-2">0.5-0.7%</td><td className="border p-2">Large roofs, tight budget</td></tr>
            <tr><td className="border p-2">HJT (Heterojunction)</td><td className="border p-2">~22-24%</td><td className="border p-2">Higher cost</td><td className="border p-2">-0.25%/°C (temp coefficient)</td><td className="border p-2">Hot climates</td></tr>
            <tr><td className="border p-2">Thin film</td><td className="border p-2">10-13%</td><td className="border p-2">£0.80-1.40</td><td className="border p-2">0.7-1.0%</td><td className="border p-2">Facades, vehicles</td></tr>
          </tbody>
        </table>
      </div>

      <p className="mt-4 text-sm text-gray-600">* TOPCon technology has become the 2026 standard, representing 97.7% of the monocrystalline market. Glass-glass TOPCon modules offer 30-year warranties with only 0.45% annual degradation.</p>

      {/* ========== 2. COSTES Y AMORTIZACIÓN ========== */}
      <h3 className="text-2xl font-semibold mt-10 mb-4">2. Real costs and payback (UK, 2025-2026)</h3>
      <ul className="list-disc pl-6 mb-4 space-y-1">
        <li><strong>4 kWp system (typical 3-4 bed house):</strong> £5,000 – £7,000 installed</li>
        <li><strong>4.5 kWp + 5 kWh battery:</strong> ~£9,800 installed (annual savings £640-£882)</li>
        <li><strong>Additional 5 kWh battery:</strong> adds £4,000 – £6,000</li>
        <li><strong>Individual 400W panel:</strong> £150 – £300</li>
      </ul>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300 text-sm">
          <thead className="bg-gray-100">
            <tr><th className="border p-2">Scenario</th><th className="border p-2">Installation cost</th><th className="border p-2">Annual saving</th><th className="border p-2">Payback time</th></tr>
          </thead>
          <tbody>
            <tr><td className="border p-2">Panels only (4 kWp)</td><td className="border p-2">£6,000</td><td className="border p-2">£700 – £1,000</td><td className="border p-2">6 – 8 years</td></tr>
            <tr><td className="border p-2">Panels + battery (5 kWh)</td><td className="border p-2">~£10,000 – £12,000</td><td className="border p-2">£900 – £1,200 (70-80% self-consumption)</td><td className="border p-2">8 – 12 years</td></tr>
            <tr><td className="border p-2">4.5 kWp + SEG (export)</td><td className="border p-2">~£6,500 – £8,000</td><td className="border p-2">up to £1,000</td><td className="border p-2">6 – 7 years</td></tr>
          </tbody>
        </table>
      </div>
      <p className="mt-2 text-sm text-gray-600">The Smart Export Guarantee (SEG) pays 12-15p/kWh for exported surplus. A home with battery can achieve 70-80% self‑consumption, saving up to £1,200/year.</p>

      {/* ========== 3. EMERGING TECHNOLOGIES ========== */}
      <h3 className="text-2xl font-semibold mt-10 mb-4">3. Emerging technologies (2026-2028)</h3>
      <ul className="list-disc pl-6 mb-4">
        <li><strong>Perovskite‑silicon tandem:</strong> laboratory cells reach 28.96% – 29.76% efficiency; commercial modules (Tandem PV) already achieve 29.7% with &lt;1% annual loss. Expected on market 2026-2028.</li>
        <li><strong>Flexible tandem:</strong> LONGi developed cells only 60µm thick, 33.4% efficiency (NREL certified), power‑to‑weight ratio 1.77 W/gram.</li>
        <li><strong>Bifacial modules:</strong> capture light from both sides, gaining 9.4% – 12.1% energy yield when used with trackers.</li>
      </ul>

      {/* ========== 4. WEIGHT AND STRUCTURAL CONSIDERATIONS ========== */}
      <h3 className="text-2xl font-semibold mt-10 mb-4">4. Weight and roof suitability (UK timber roofs)</h3>
      <p className="mb-2">Modern monocrystalline panels (430-550Wp) weigh 18-23 kg each, similar to polycrystalline. However, monocrystalline systems require <strong>16-18 panels for 4 kWp</strong> vs <strong>19-23 polycrystalline panels</strong>, saving 100-150 kg total roof load.</p>
      <p className="text-sm text-gray-600">UK building regulations require 400 mm fire setbacks from roof edges and ridge. Our calculator respects these MCS guidelines.</p>

      {/* ========== 5. BATTERY ANALYSIS ========== */}
      <h3 className="text-2xl font-semibold mt-10 mb-4">5. Battery storage – is it worth it?</h3>
      <ul className="list-disc pl-6 mb-4">
        <li><strong>LFP (LiFePO₄) batteries:</strong> safer, longer cycle life (6000+ cycles), recommended for residential.</li>
        <li><strong>NMC batteries:</strong> higher energy density, slightly lower safety.</li>
        <li><strong>Payback:</strong> with current electricity prices (£0.25/kWh), a 5 kWh battery (£4,000-£5,000) adds 3-4 years to the payback period but increases self‑sufficiency.</li>
      </ul>

      {/* ========== 6. CALCULATOR ========== */}
      <h3 className="text-2xl font-semibold mt-10 mb-4">6. Design your own layout</h3>
      <p className="mb-6">
        Use the interactive tool below to estimate how many panels fit on your roof, choose between monocrystalline and polycrystalline, and see a 3D preview.
        The calculation respects UK MCS margins (400 mm edges, 20 mm between panels) and accounts for chimneys.
      </p>
      
      <SolarPanelCalculator />
      
      {/* ========== 7. REFERENCES ========== */}
      <h3 className="text-2xl font-semibold mt-12 mb-4">📚 References & further reading</h3>
      <ul className="list-disc pl-6 text-sm text-gray-700 space-y-1">
        <li>R. Neumann, "Solar Panel Types Compared: Mono vs Poly vs TOPCon vs HJT (2026)", SurgePV, 2026.</li>
        <li>Enerix, "Photovoltaikmodul Arten: Welche Module gibt es?" (2026). Market share TOPCon 97.7%, glass‑glass degradation 0.45%.</li>
        <li>"Tailored self‑assembled molecule for efficient charge extraction…", <em>Chemical Engineering Journal</em>, May 2026 (28.96% perovskite‑perovskite tandem).</li>
        <li>"MXene‑driven nanoscale field‑effect junction for advanced 4‑terminal perovskite/silicon tandem solar panels", <em>Nature Communications</em>, 2026.</li>
        <li>"New strategy unlocks 29.76% efficiency for all‑perovskite tandem solar cells", <em>Joule</em>, Mar. 2026.</li>
        <li>H. Mustoe, "How much do solar panels cost? UK 2025 prices guide", <em>The Independent</em>, Oct. 2025.</li>
        <li>Y. He et al., "A techno‑economic‑environmental comparison of residential solar energy systems", <em>Energy Conversion and Management</em>, Dec. 2025.</li>
        <li>"IoT‑based evaluation of photovoltaic modules enhanced by different reflector materials", <em>Scientific Reports</em>, 2026 (reflector +21.2% yield).</li>
        <li>"LONGi Breakthrough in Flexible Tandem Technology Selected Among China's Top 10 Scientific Advances", LONGi, Mar. 2026 (33.4% flexible tandem, 1.77 W/gram).</li>
        <li>"Tandem PV launches commercial perovskite‑silicon manufacturing in California", <em>pv magazine USA</em>, Apr. 2026 (40 MW factory, 29.7% modules).</li>
      </ul>
    </div>
  );
};

export default SolarPanelsPage;
