import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from "lucide-react";
// import BatteryCalculator from './BatteryCalculator'; // ⬅ descomentar cuando exista el componente

const BatteriesPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <style>
        {`
          ::-webkit-scrollbar {
            width: 16px;
            height: 16px;
          }
          ::-webkit-scrollbar-track {
            background: #f1f1f1;
            border-radius: 10px;
          }
          ::-webkit-scrollbar-thumb {
            background: #c1c1c1;
            border-radius: 10px;
          }
          ::-webkit-scrollbar-thumb:hover {
            background: #a8a8a8;
          }
          * {
            scrollbar-width: auto;
            scrollbar-color: #c1c1c1 #f1f1f1;
          }
        `}
      </style>

      <div className="text-black max-w-6xl mx-auto px-4">

        <h2 className="text-3xl md:text-4xl font-light mb-6">
          <strong>Batteries: complete technical guide for homeowners 2026</strong>
        </h2>

        <p className="text-lg mb-6">
          Solar panels generate electricity when the sun shines. Batteries store surplus electricity so it can be
          used later — in the evening, overnight, or during periods of high electricity prices. Unlike solar panels,
          batteries do not generate electricity: their purpose is to increase self‑consumption, reduce grid imports,
          provide backup power and optimise the value of every kilowatt‑hour your solar panels produce.
          <br /><br />
          <strong>But the real question is: are batteries actually a good investment?</strong>
        </p>

        <p className="text-lg mb-6">
          In this guide you will learn how battery technology evolved, which chemistries dominate the market today,
          how long a battery really lasts, when a battery makes financial sense — and when it doesn't — how to size
          one correctly, and how Vehicle‑to‑Home (V2H), artificial intelligence and Digital Twins may change the role
          of residential batteries over the next decade. <strong>Let's begin.</strong>
        </p>

        {/* ============================================================ */}
        {/* 1. HISTORY */}
        {/* ============================================================ */}
        <h3 className="text-2xl font-semibold mt-8 mb-4">
          1. Origins and evolution of battery technology
        </h3>

        <h4 className="text-xl font-semibold mt-6 mb-2">⚡ The first batteries (1800–1859)</h4>
        <p className="mb-2">
          The history of battery technology began in <strong>1800</strong>, when Italian physicist{' '}
          <strong>Alessandro Volta</strong> invented the Voltaic Pile — alternating layers of copper and zinc
          separated by cloth soaked in electrolyte. For the first time, electricity could be produced continuously
          rather than through static discharge. Early batteries suffered from low energy density, short lifespan and
          poor efficiency, so for most of the 19th century they remained scientific instruments rather than
          practical energy‑storage systems.
        </p>

        <h4 className="text-xl font-semibold mt-6 mb-2">🔋 The lead‑acid revolution (1859–1970)</h4>
        <p className="mb-2">
          In <strong>1859</strong>, French physicist <strong>Gaston Planté</strong> developed the first rechargeable
          battery, the foundation of modern energy storage. Lead‑acid batteries became dominant because they were
          rechargeable, inexpensive, reliable and capable of delivering high current — though heavy, low‑capacity
          and requiring regular maintenance. More than 150 years later, lead‑acid is still used in vehicles and
          certain industrial and off‑grid applications.
        </p>

        <h4 className="text-xl font-semibold mt-6 mb-2">☀️ Batteries meet solar energy (1970–2000)</h4>
        <p className="mb-2">
          The 1970s oil crisis accelerated global interest in renewable energy. As residential solar systems became
          more common, almost all storage relied on lead‑acid: flooded lead‑acid (70‑80% efficiency, 3‑7 years
          lifespan, ~50% usable depth of discharge) and sealed AGM batteries, which improved reliability but kept
          ownership expensive and technically demanding.
        </p>

        <h4 className="text-xl font-semibold mt-6 mb-2">🚀 The lithium revolution (2000–2025)</h4>
        <p className="mb-2">
          Mobile phones, laptops, electric vehicles and energy storage systems drove mass production and a dramatic
          fall in battery prices: average lithium‑ion pack costs fell from roughly <strong>$1,200/kWh in 2010</strong>{' '}
          to <strong>$350/kWh in 2015</strong> and below <strong>$100/kWh by 2024‑2025</strong> — a fall of over 93%
          since 2010. The launch of the Tesla Powerwall in 2015 transformed public awareness of residential battery
          storage, and global demand now exceeds one terawatt‑hour a year.
        </p>

        <div className="bg-gray-50 p-4 rounded-md mb-6">
          <p className="font-semibold">✨ Visual timeline of key milestones:</p>
          <ul className="list-disc pl-6 mt-2">
            <li>1800: Volta invents the Voltaic Pile</li>
            <li>1859: Planté invents the first rechargeable (lead‑acid) battery</li>
            <li>1866: Leclanché's zinc‑carbon cell enables portable, "dry" batteries</li>
            <li>1970s: Oil crisis drives early residential solar + lead‑acid systems</li>
            <li>1990s: Commercialisation of lithium‑ion batteries</li>
            <li>2010–2025: Battery pack costs fall from ~$1,200/kWh to under $100/kWh</li>
            <li>2015: Tesla Powerwall launches, mainstreaming home battery storage</li>
            <li>2020s: LFP becomes the dominant residential chemistry</li>
            <li>2026 onward: V2H, AI‑driven optimisation and Digital Twins mature</li>
          </ul>
        </div>

        {/* ============================================================ */}
        {/* 2. TODAY'S TECHNOLOGIES */}
        {/* ============================================================ */}
        <h3 className="text-2xl font-semibold mt-10 mb-4">2. Today's battery technologies</h3>

        <h4 className="text-xl font-semibold mt-6 mb-2">🔋 Lithium Iron Phosphate (LFP) — current market leader</h4>
        <p className="mb-2">
          In 2026, most residential battery systems use <strong>LFP (LiFePO₄)</strong> chemistry — used in over 70%
          of new home battery systems in Europe. Examples include the Tesla Powerwall 3, BYD Battery Box, Huawei
          Luna, GivEnergy and Sunsynk. LFP offers excellent safety, long lifespan, high cycle life, strong thermal
          stability and low maintenance.
        </p>

        <h4 className="text-xl font-semibold mt-6 mb-2">⚡ Nickel Manganese Cobalt (NMC)</h4>
        <p className="mb-2">
          Traditionally popular in electric vehicles, NMC offers higher energy density and a more compact size, but
          at higher cost, with greater fire risk and a shorter lifespan than LFP. LFP is progressively replacing NMC
          in residential applications.
        </p>

        <h4 className="text-xl font-semibold mt-6 mb-2">🔋 Lead‑acid — the legacy option</h4>
        <p className="mb-2">
          Still found in cabins, agricultural properties and remote off‑grid systems, thanks to a low upfront cost.
          However, with only ~50% usable depth of discharge and 500‑1,200 cycles, it is generally no longer
          recommended for modern residential solar installations.
        </p>

        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-300 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2">Technology</th>
                <th className="border p-2">Best for</th>
                <th className="border p-2">Efficiency</th>
                <th className="border p-2">Cycle life</th>
                <th className="border p-2">Usable capacity (DoD)</th>
                <th className="border p-2">Typical lifespan</th>
                <th className="border p-2">Cost (2026 est.)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border p-2">LFP (Lithium)</td>
                <td className="border p-2">Standard for homes</td>
                <td className="border p-2">92‑96%</td>
                <td className="border p-2">6,000‑10,000</td>
                <td className="border p-2">90‑100%</td>
                <td className="border p-2">15‑20 years</td>
                <td className="border p-2">€400‑700/kWh</td>
              </tr>
              <tr>
                <td className="border p-2">NMC (Lithium)</td>
                <td className="border p-2">EVs, tight spaces</td>
                <td className="border p-2">90‑95%</td>
                <td className="border p-2">1,500‑3,000</td>
                <td className="border p-2">100%</td>
                <td className="border p-2">8‑12 years</td>
                <td className="border p-2">€450‑750/kWh</td>
              </tr>
              <tr>
                <td className="border p-2">Lead‑acid</td>
                <td className="border p-2">Low‑use / off‑grid backup</td>
                <td className="border p-2">70‑80%</td>
                <td className="border p-2">500‑1,200</td>
                <td className="border p-2">~50% max</td>
                <td className="border p-2">3‑7 years</td>
                <td className="border p-2">€150‑300/kWh (short life)</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* ============================================================ */}
        {/* 3. LONGEVITY */}
        {/* ============================================================ */}
        <h3 className="text-2xl font-semibold mt-10 mb-4">3. How long do batteries really last?</h3>
        <p className="mb-2">
          Unlike solar panels, which routinely achieve operational lifespans of 30 to 40 years, batteries have a
          finite service life that depends on temperature, charging and discharging rate, number of cycles and
          manufacturing quality. Modern LFP batteries typically carry a <strong>10‑year warranty</strong>, retain{' '}
          <strong>70‑80% capacity</strong> after that warranty, and are rated for <strong>6,000‑10,000 cycles</strong>.
        </p>
        <p className="mb-2">
          For a homeowner performing roughly one cycle per day: 6,000 cycles ≈ <strong>16 years</strong>; 10,000
          cycles ≈ <strong>27 years</strong>. In real‑world operation, most residential batteries achieve{' '}
          <strong>15‑20 years</strong> of useful service life.
        </p>

        {/* ============================================================ */}
        {/* 4. INTERNAL STRUCTURE */}
        {/* ============================================================ */}
        <h3 className="text-2xl font-semibold mt-10 mb-4">4. Internal structure of a modern battery system</h3>
        <p className="mb-2">
          A residential battery system is much more than a collection of cells. Its main components are:
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li><strong>Battery cells</strong> — store the electrical energy.</li>
          <li><strong>Battery Management System (BMS)</strong> — monitors voltage, current, temperature, cell balancing and safety conditions.</li>
          <li><strong>Inverter</strong> — converts battery DC power into household AC electricity.</li>
          <li><strong>Thermal management system</strong> — maintains safe operating temperatures.</li>
          <li><strong>Safety isolation devices</strong> — protect the battery and the property during faults.</li>
        </ul>

        {/* ============================================================ */}
        {/* 5. SHOULD YOU INSTALL A BATTERY */}
        {/* ============================================================ */}
        <h3 className="text-2xl font-semibold mt-10 mb-4">5. Should you install a battery?</h3>
        <p className="mb-2">
          This is the most important question for homeowners, and the answer depends on economics rather than
          technology. The key equation is:
        </p>
        <div className="bg-gray-100 p-4 rounded-md mb-4 font-semibold">
          Value of stored electricity = Import price − Export tariff − Battery losses
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-300 text-sm mb-4">
            <thead className="bg-gray-100">
              <tr><th className="border p-2">Parameter</th><th className="border p-2">Example value</th></tr>
            </thead>
            <tbody>
              <tr><td className="border p-2">Import electricity price</td><td className="border p-2">30 p/kWh</td></tr>
              <tr><td className="border p-2">Export tariff</td><td className="border p-2">15 p/kWh</td></tr>
              <tr><td className="border p-2">Battery efficiency</td><td className="border p-2">90%</td></tr>
            </tbody>
          </table>
        </div>
        <p className="mb-2">
          In this example, storing energy creates financial value because imported electricity is considerably more
          expensive than exported electricity.
        </p>

        {/* ============================================================ */}
        {/* 6. WHEN IT DOESN'T MAKE SENSE */}
        {/* ============================================================ */}
        <h3 className="text-2xl font-semibold mt-10 mb-4">6. When batteries do not make financial sense</h3>
        <p className="mb-2">
          Many installers assume a battery automatically improves return on investment — this is not always true.
          As a useful guideline: <strong>battery storage becomes significantly less attractive when the export
          tariff reaches 70‑80% of the import electricity price.</strong> For example, with a 30 p/kWh import tariff
          and a 24 p/kWh export tariff, the value created by storage is relatively small — and under certain smart
          tariffs, exporting electricity and buying it back later can outperform battery storage financially.
        </p>

        {/* ============================================================ */}
        {/* 7. SIZING */}
        {/* ============================================================ */}
        <h3 className="text-2xl font-semibold mt-10 mb-4">7. The most common battery sizing mistake — and the case for small batteries</h3>
        <p className="mb-2">
          The most common mistake is <strong>oversizing</strong>. Example: a 4 kWp solar system paired with a 10 kWh
          battery, when the household only consumes 3‑4 kWh between sunset and sunrise. The result is higher
          investment, longer payback and lower ROI, because a large part of the battery remains underutilised.
        </p>
        <p className="mb-2">
          For many households, a <strong>3‑5 kWh</strong> battery produces a better financial outcome than a{' '}
          <strong>10‑15 kWh</strong> one: lower upfront investment, faster payback, better utilisation, and easier
          expansion later. Bigger is not always better.
        </p>

        {/* ============================================================ */}
        {/* 8. V2H / V2G */}
        {/* ============================================================ */}
        <h3 className="text-2xl font-semibold mt-10 mb-4">8. Vehicle‑to‑Home (V2H): the largest battery you may already own</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-300 text-sm mb-4">
            <thead className="bg-gray-100">
              <tr><th className="border p-2">System</th><th className="border p-2">Typical capacity</th></tr>
            </thead>
            <tbody>
              <tr><td className="border p-2">Home battery</td><td className="border p-2">5‑15 kWh</td></tr>
              <tr><td className="border p-2">Tesla Powerwall 3</td><td className="border p-2">13.5 kWh</td></tr>
              <tr><td className="border p-2">Typical EV</td><td className="border p-2">60‑100 kWh</td></tr>
            </tbody>
          </table>
        </div>
        <p className="mb-2">
          Vehicle‑to‑Home (V2H) technology allows an electric vehicle to supply power directly to a home — for
          night‑time supply, backup power, peak‑tariff avoidance and solar storage. Bidirectional charging (also
          called Vehicle‑to‑Grid, or V2G, when power flows back to the network) is developing rapidly and may become
          a major alternative to large stationary batteries over the next decade.
        </p>
        <div className="bg-yellow-50 p-4 rounded-md mb-4">
          <p className="font-semibold">⚠️ Is V2G/V2H a good solution today?</p>
          <p className="text-sm">
            The potential is significant — it could remove the need for a dedicated home battery. In practice
            (2026), few EVs and chargers officially support bidirectional charging, and battery‑degradation
            concerns remain. A dedicated LFP home battery is still the more practical choice for most homeowners
            today.
          </p>
        </div>

        {/* ============================================================ */}
        {/* 9. AI, AUTOMATION & DIGITAL TWINS */}
        {/* ============================================================ */}
        <h3 className="text-2xl font-semibold mt-10 mb-4">9. Artificial intelligence, automation and Digital Twins</h3>
        <p className="mb-2">
          The next major energy revolution may come from software rather than hardware. Future battery systems
          analyse weather forecasts, electricity prices, solar forecasts, EV charging schedules, heat‑pump demand
          and historical household consumption. The objective is not to maximise battery charge — it is to{' '}
          <strong>maximise financial return</strong>.
        </p>

        <h4 className="text-xl font-semibold mt-6 mb-2">🔮 Predictive discharge: emptying batteries before the sun or wind returns</h4>
        <p className="mb-2">
          The principle: do not store energy that is about to be replenished for free. The system discharges the
          battery ahead of a forecast renewable event, targets 20‑30% remaining charge when the sun or wind arrives,
          then lets the battery absorb the new free renewable energy — capturing close to 100% of it instead of it
          being curtailed because the battery was already full.
        </p>

        <h4 className="text-xl font-semibold mt-6 mb-2">💷 Demand‑side management: charging when energy is cheapest</h4>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-300 text-sm mb-4">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2">Time</th>
                <th className="border p-2">Price</th>
                <th className="border p-2">Solar</th>
                <th className="border p-2">Battery state</th>
                <th className="border p-2">Automated decision</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="border p-2">02:00–05:00</td><td className="border p-2">Very low</td><td className="border p-2">None</td><td className="border p-2">30%</td><td className="border p-2">Charge from grid at cheap rate</td></tr>
              <tr><td className="border p-2">08:00–11:00</td><td className="border p-2">Medium</td><td className="border p-2">Rising</td><td className="border p-2">95%</td><td className="border p-2">Discharge to prepare space for midday sun</td></tr>
              <tr><td className="border p-2">11:00–14:00</td><td className="border p-2">Medium</td><td className="border p-2">Peak</td><td className="border p-2">40%→100%</td><td className="border p-2">Solar charges battery automatically</td></tr>
              <tr><td className="border p-2">17:00–20:00</td><td className="border p-2">Peak</td><td className="border p-2">None</td><td className="border p-2">85%</td><td className="border p-2">Discharge to power home</td></tr>
              <tr><td className="border p-2">22:00–24:00</td><td className="border p-2">Medium</td><td className="border p-2">None</td><td className="border p-2">25%</td><td className="border p-2">Delay washing machine until 02:00</td></tr>
            </tbody>
          </table>
        </div>

        <h4 className="text-xl font-semibold mt-6 mb-2">🧠 Digital Twins: a predictive home energy model</h4>
        <p className="mb-2">
          A Digital Twin is a virtual model of a home that continuously learns from real‑world performance — roof
          performance, solar production, occupancy patterns, appliance behaviour, battery ageing, insulation and
          seasonal consumption. Using this data the system simulates future conditions before making energy
          decisions: instead of reacting to demand, the home becomes predictive.
        </p>
        <div className="bg-green-50 p-4 rounded-md mb-6">
          <p className="font-semibold">📐 Practical example</p>
          <p className="text-sm">
            If tomorrow is forecast to generate 40 kWh of solar energy, the system may intentionally discharge part
            of the battery overnight to create extra storage capacity. If several cloudy days are expected, it may
            preserve battery charge and minimise exports instead.
          </p>
        </div>

        {/* ============================================================ */}
        {/* 10. FIRE SAFETY & LOCATION */}
        {/* ============================================================ */}
        <h3 className="text-2xl font-semibold mt-10 mb-4">10. Fire safety and battery location</h3>
        <p className="mb-2">
          As residential battery capacities increase, installation location is becoming increasingly important.
          Many countries are progressively encouraging installation within utility rooms, technical rooms, garages,
          plant rooms or external battery cabinets rather than within primary living spaces.
        </p>

        <div className="bg-blue-50 p-4 rounded-md mb-4">
          <p className="font-semibold">🇬🇧 Current UK position</p>
          <p className="text-sm">
            As of 2026, the UK does not generally require all domestic batteries to be installed in a dedicated
            battery room. However, installations must comply with manufacturer guidance,{' '}
            <strong>BS 7671 Wiring Regulations</strong>, Building Regulations, fire‑safety guidance and DNO
            requirements.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-green-50 p-4 rounded-md">
            <p className="font-semibold">✅ Preferred locations</p>
            <ul className="list-disc pl-5 text-sm">
              <li>Garage</li>
              <li>Utility room</li>
              <li>Dedicated plant room</li>
              <li>Weatherproof external enclosure</li>
            </ul>
          </div>
          <div className="bg-yellow-50 p-4 rounded-md">
            <p className="font-semibold">⚠ Less desirable locations</p>
            <ul className="list-disc pl-5 text-sm">
              <li>Bedrooms</li>
              <li>Hallways</li>
              <li>Stairways</li>
              <li>Escape routes</li>
            </ul>
          </div>
        </div>
        <p className="text-sm mb-6">
          As battery capacities increase, regulatory requirements are likely to become more stringent — always
          confirm current placement rules with an MCS‑certified installer before finalising a location.
        </p>

        {/* ============================================================ */}
        {/* 11. COSTS & PRACTICAL RECOMMENDATIONS */}
        {/* ============================================================ */}
        <h3 className="text-2xl font-semibold mt-10 mb-4">11. Costs and practical recommendations</h3>
        <div className="bg-gray-100 p-4 rounded-md mb-4">
          <p className="font-semibold">📉 Key fact</p>
          <p className="text-sm">
            Battery pack prices have fallen by roughly <strong>93% since 2010</strong>. In 2024, utility‑scale
            systems reached around <strong>$192/kWh</strong>. A 10 kWh battery that cost upwards of $10,000 a decade
            ago can now be installed for a third of that price.
          </p>
        </div>
        <ol className="list-decimal pl-6 mb-4 space-y-1">
          <li><strong>Start with a smart energy monitor</strong> (e.g. Sense, Emporia, Shelly) before buying a battery.</li>
          <li><strong>Choose a battery with an open API</strong> (Tesla Powerwall, Sonnen, Enphase, Sungrow, Victron).</li>
          <li><strong>Integrate a home‑automation platform</strong> (Home Assistant, openHAB, Apple HomeKit).</li>
          <li><strong>Consider a hybrid inverter</strong> that manages both solar and battery in a single unit.</li>
        </ol>
        <div className="bg-green-50 p-4 rounded-md mb-6">
          <p className="font-semibold">📌 The key takeaway</p>
          <p className="text-sm">
            A battery without smart automation is just a heavy box. A battery connected to an AI‑driven, Digital
            Twin‑based energy system is an autonomous financial and environmental asset.
          </p>
        </div>

        {/* ============================================================ */}
        {/* 12. CALCULATOR (COMING SOON) */}
        {/* ============================================================ */}
        <h3 className="text-2xl font-semibold mt-12 mb-4">12. Design your own battery system — intelligent storage calculator</h3>
        <p className="mb-6">
          DB+ is developing a complete <strong>Battery Selection Formula</strong> that will analyse your solar
          production, consumption profile, tariffs, battery chemistry, EV ownership, heating system and local
          regulations to recommend the right technology, the right size, and whether a battery makes sense for your
          home at all — plus expected savings, payback period and V2H suitability.
        </p>
        <div className="bg-gray-100 border border-dashed border-gray-300 rounded-md p-8 text-center mb-6">
          <p className="font-semibold text-lg mb-1">🛠️ Interactive battery calculator — coming soon</p>
          <p className="text-sm text-gray-600">
            In the meantime, use the enquiry form below and our team will run these numbers for your property
            manually.
          </p>
        </div>
        {/* <BatteryCalculator /> */}

        {/* ============================================================ */}
        {/* CTA final — same style as SolarPanelsPage */}
        {/* ============================================================ */}
        <div className="mt-16 max-w-4xl mx-auto p-8 bg-black/90 text-white rounded-2xl shadow-2xl border border-white/10">

          <h3 className="text-2xl md:text-3xl font-light mb-4">
            Your battery is only as good as the strategy behind it
          </h3>

          <p className="text-white/80 mb-6 leading-relaxed">
            Chemistry, size, location and automation all affect the real return of a home battery. Every property
            is different, and factors such as consumption profile, existing solar system, tariff structure and
            available space can significantly change what makes sense for your home.
          </p>

          <p className="text-white/80 mb-6 leading-relaxed">
            We help you turn this guide into a complete strategy — including battery sizing, technology selection,
            placement and integration with your solar system and financial analysis tailored to your home.
          </p>

          <p className="text-white/60 text-sm mb-8 leading-relaxed">
            We'll also check whether your property's location and installation type require additional certification
            or fire‑safety compliance before installation.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => navigate("/enquiry")}
              className="bg-white text-black px-8 py-4 rounded-full font-medium hover:bg-red-600 hover:text-white transition-all flex items-center justify-center gap-2"
            >
              Start your project
              <ChevronRight className="w-5 h-5" />
            </button>

            <button
              onClick={() => navigate("/enquiry")}
              className="border border-white/30 px-8 py-4 rounded-full text-white hover:bg-white hover:text-black transition-all"
            >
              Contact directly
            </button>
          </div>
        </div>

        {/* ============================================================ */}
        {/* REFERENCES */}
        {/* ============================================================ */}
        <h3 className="text-2xl font-semibold mt-12 mb-4">📚 References & further reading</h3>
        <div className="text-sm text-gray-700 space-y-1 border-t pt-4">
          <p>1. Encyclopaedia Britannica (2026) – "Battery".</p>
          <p>2. IRENA (2025) – "The Rise of Solar PV and Battery Storage's Prominence in Emerging Markets".</p>
          <p>3. SurgePV (2026) – "Solar Battery Types: LFP, NMC & Lead‑Acid Compared".</p>
          <p>4. <em>Journal of Power Sources</em>, 663, 238862 (2026) – "Recent advances in integrated solar batteries".</p>
          <p>5. European Commission, CORDIS (2025) – "Integrated Battery and Energy Management System for Second‑Life Battery".</p>
          <p>6. buildingSMART International (2025) – "BIM for Energy Management – Use Case Documentation".</p>
          <p>7. Home Assistant Open Source Project (2026) – "Energy Management Integration – Battery Automation Blueprints".</p>
          <p>8. International Energy Agency (2025) – "Demand‑Side Management and Smart Grids".</p>
          <p>9. U.S. Department of Energy (2025) – "Grid‑Interactive Efficient Buildings (GEB)".</p>
          <p>10. MCS (2025) – "Battery storage installation and fire safety guidance".</p>
          <p>11. IET (2026) – "BS 7671 Wiring Regulations, 18th Edition, Amendment 3".</p>
        </div>
        <p className="text-xs text-gray-500 mt-4">Last review: 2026. Data reflect the most recent market research and UK government policy.</p>

      </div>
    </>
  );
};

export default BatteriesPage;
