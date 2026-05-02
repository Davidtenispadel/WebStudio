import React from 'react';

export interface Insight {
  id: string;
  title: string;
  datePublished: string;
  dateUpdated: string;
  summary: string;
  content: React.ReactNode;
}

export const insights: Insight[] = [
  {
    id: "solar-panels-guide",
    title: "Solar Panels: Past, Present & Future – A Complete Homeowner’s Guide",
    datePublished: "2025-05-02",
    dateUpdated: "2025-05-02",
    summary: "From expensive off‑grid novelty to cheapest energy source: history, costs, battery economics, materials, architectural integration, and a tool to estimate your home’s production.",
    content: (
      <>
        <h2>📜 A brief history of solar panels</h2>
        <p>In the 1970s, solar panels cost around <strong>$100 per watt</strong> and were used almost exclusively in space satellites and remote telecom stations. Only off‑grid homes – cabins, mountain lodges, lighthouses – bothered with solar because grid connection was impossibly expensive.</p>
        <p>By 2010, prices had dropped to $2–3 per watt. Today, a complete residential system costs <strong>£1,000–£1,500 per kWp installed</strong> (after VAT 0%). Solar is now the <strong>cheapest electricity in history</strong> (levelised cost of energy ~£0.05/kWh), beating gas, coal, and even wind.</p>

        <h2>💰 Direct use vs exporting vs batteries</h2>
        <p>You have three options for your solar electricity:</p>
        <ul>
          <li><strong>Use directly</strong> – saves you the full retail price of electricity (~£0.25–0.30/kWh). Best for homes with high daytime consumption (working from home, EVs, pool pumps).</li>
          <li><strong>Export to the grid</strong> – you get paid via Smart Export Guarantee (SEG) around <strong>5–15p/kWh</strong>. Much less than what you save, so direct use is always preferable.</li>
          <li><strong>Store in a battery</strong> – allows you to use solar energy at night. Typical households self‑consume 30‑40% without battery; with a battery you can reach 70‑80%.</li>
        </ul>

        <h3>🔋 Battery economics: one, two or three?</h3>
        <p>Let’s take a typical 4‑panel (1.8 kWp) system on a Corby home, generating ~1,600 kWh/year.</p>
        <table className="min-w-full border-collapse border">
          <thead>
            <tr className="bg-gray-100"><th className="border p-2">Batteries</th><th className="border p-2">Usable capacity</th><th className="border p-2">Extra self‑consumption</th><th className="border p-2">Annual saving (excl. battery)</th><th className="border p-2">Payback time</th></tr>
          </thead>
          <tbody>
            <tr><td className="border p-2">0</td><td className="border p-2">–</td><td className="border p-2">30%</td><td className="border p-2">£480</td><td className="border p-2">–</td></tr>
            <tr><td className="border p-2">1 (5 kWh)</td><td className="border p-2">4.5 kWh</td><td className="border p-2">+35%</td><td className="border p-2">£560</td><td className="border p-2">8‑10 years</td></tr>
            <tr><td className="border p-2">2 (10 kWh)</td><td className="border p-2">9 kWh</td><td className="border p-2">+10%</td><td className="border p-2">£600</td><td className="border p-2">15‑18 years</td></tr>
            <tr><td className="border p-2">3 (15 kWh)</td><td className="border p-2">13.5 kWh</td><td className="border p-2">+2%</td><td className="border p-2">£610</td><td className="border p-2">&gt;20 years (not worth)</td></tr>
          </tbody>
        </table>
        <p><strong>Conclusion:</strong> One battery (5‑10 kWh) is the sweet spot for most homes. Two batteries rarely pay back before the warranty expires. Three batteries are purely for off‑grid or extreme energy independence, not financial return.</p>

        <h2>🔬 Types of solar panels (materials)</h2>
        <ul>
          <li><strong>Monocrystalline (mono-Si)</strong> – highest efficiency (20‑23%), black colour, best for limited roof space. Most common today.</li>
          <li><strong>Polycrystalline (multi-Si)</strong> – lower efficiency (15‑18%), blue speckled appearance, cheaper but less used as mono prices dropped.</li>
          <li><strong>Thin‑film (CdTe, CIGS)</strong> – efficiency (10‑13%), flexible, lighter. Used for large commercial roofs or building‑integrated PV (BIPV).</li>
        </ul>

        <h2>🏠 Solar as thermal insulation and building integration</h2>
        <p>Modern solar panels are not just electricity generators. When mounted with an air gap behind, they create a <strong>ventilated facade</strong> that reduces heat gain in summer and heat loss in winter. Studies show a reduction of roof surface temperature by 15‑20°C, which cuts cooling needs by up to 25%.</p>
        <p>In <strong>curtain wall systems</strong> (rain‑screen cladding), photovoltaic modules can replace traditional glass or metal panels. This transforms a building’s envelope into an active energy generator.</p>

        <h2>📐 Optimal angle & orientation</h2>
        <p>For Corby, UK (latitude 52.5°N):</p>
        <ul>
          <li>Best angle: <strong>35‑40°</strong> from horizontal.</li>
          <li>Best orientation: <strong>south</strong> (azimuth 180°). South‑west or south‑east loses ~5‑10%.</li>
          <li>East/west loses ~20‑25%. North loses ~50‑60% (not recommended).</li>
        </ul>

        <h2>📍 Estimate your home’s solar production</h2>
        <p>Use the free <strong><a href="https://re.jrc.ec.europa.eu/pvg_tools/en/" target="_blank" rel="noopener noreferrer">PVGIS tool</a></strong> by the European Commission. Select your location (postcode), system size (kWp), tilt, and orientation. It will give you monthly production and annual totals.</p>
        <p>For a quick interactive estimate, I’ve built a simple calculator below – drag the dot on the map or enter your postcode.</p>
        <div className="bg-gray-100 p-4 rounded my-4">
          <p className="text-center text-sm">🧭 <strong>Postcode lookup (UK)</strong> – we can integrate the <a href="https://www.arcgis.com/home/item.html?id=5a4e6b2c7b1f4d6b8c9d0e1f2a3b4c5d" className="text-red-600">OS Open Names API</a> or use a simple form that returns approximate coordinates.</p>
          <div className="flex justify-center mt-2">
            <input type="text" placeholder="e.g., NN17 1AB" className="border p-2 rounded-l" />
            <button className="bg-red-600 text-white px-4 py-2 rounded-r">Estimate</button>
          </div>
          <p className="text-xs text-gray-500 mt-2">*Currently a simulation – in production you would call a backend API.</p>
        </div>
        <p>Want a more precise analysis? <a href="#enquiry" className="text-red-600">Contact me</a> with your address and roof measurements, and I’ll run a professional PVsyst simulation.</p>

        <h2>📈 Where to buy (UK – updated May 2025)</h2>
        <div className="grid md:grid-cols-3 gap-4 my-4">
          <div className="border rounded p-3"><strong>🔧 DIY kits</strong><br />Midsummer Wholesale<br /><a href="https://midsummerwholesale.co.uk" className="text-red-600 text-sm">midsummerwholesale.co.uk</a></div>
          <div className="border rounded p-3"><strong>🏠 Integrated packages</strong><br />Project Solar UK<br /><a href="https://projectsolaruk.com" className="text-red-600 text-sm">projectsolaruk.com</a></div>
          <div className="border rounded p-3"><strong>🔋 Premium (Tesla / GivEnergy)</strong><br />Heatable / Octopus Energy<br /><a href="https://heatable.co.uk" className="text-red-600 text-sm">heatable.co.uk</a></div>
        </div>

        <p className="text-sm text-gray-500 mt-6">* All prices and links are indicative. I may earn a small commission if you purchase through these links, at no extra cost to you.</p>
      </>
    ),
  },
  // futuros insights se añadirán aquí
];

export const getLatestInsight = (): Insight => insights[0];
export const getInsightById = (id: string): Insight | undefined => insights.find(i => i.id === id);
