import React from 'react';
import { useNavigate } from 'react-router-dom';

const WindTurbinesPage: React.FC = () => {
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
          <strong>Domestic wind turbines: complete technical guide for homeowners 2026</strong>
        </h2>

        <p className="text-lg mb-6">
          Small wind turbines convert moving air into electricity using the same basic principle as a large
          offshore wind farm, scaled down for a single property. Unlike solar panels, they can generate
          around the clock — including at night and through winter storms, when solar output is at its
          lowest. But wind is far less forgiving of a bad site than solar is of a bad roof: get the location
          wrong and a domestic turbine can produce almost nothing.
          <br /><br />
          <strong>So the real question is: does your site actually have enough usable wind, and which type of turbine suits it?</strong>
        </p>

        <p className="text-lg mb-6">
          In this guide you'll learn how horizontal-axis and vertical-axis turbines differ, what the physics
          says about their maximum possible efficiency, how much a domestic system really costs and
          produces in the UK, when a turbine makes financial sense next to solar and battery storage, and
          what planning permission, noise and structural rules apply before you can install one. <strong>Let's begin.</strong>
        </p>

        {/* ============================================================ */}
        {/* 1. HISTORY */}
        {/* ============================================================ */}
        <h3 className="text-2xl font-semibold mt-8 mb-4">
          1. From windmills to modern micro-generation
        </h3>
        <p className="mb-2">
          Harnessing wind for mechanical work is one of the oldest human technologies, with windmills used
          for grinding grain and pumping water across Persia, China and medieval Europe for over a
          thousand years. The shift to electricity generation began in the late 19th century, and the
          modern three-blade horizontal-axis design that dominates the industry today was largely
          standardised through Danish wind engineering in the late 20th century.
        </p>
        <p className="mb-2">
          Vertical-axis designs are not new either — the Savonius rotor was patented in 1922 and the
          Darrieus rotor in 1931 — but they were commercially overshadowed by horizontal-axis turbines for
          large-scale wind farms. They have found a renewed niche more recently in small-scale, urban and
          building-mounted applications, where their different aerodynamic behaviour is actually an
          advantage rather than a drawback.
        </p>

        {/* ============================================================ */}
        {/* 2. HAWT vs VAWT */}
        {/* ============================================================ */}
        <h3 className="text-2xl font-semibold mt-10 mb-4">
          2. Horizontal-axis (HAWT) vs vertical-axis (VAWT) turbines
        </h3>
        <p className="mb-2">
          The single most important design choice for a small wind system is the orientation of the
          rotor's axis relative to the ground.
        </p>

        <h4 className="text-xl font-semibold mt-6 mb-2">🌀 Horizontal-axis wind turbines (HAWT)</h4>
        <p className="mb-2">
          The rotor shaft runs parallel to the ground and to the wind direction — this is the classic
          "propeller on a pole" shape used by virtually all large wind farms and most domestic pole-mounted
          turbines. HAWTs need to face directly into the wind to work efficiently, which is normally handled
          by a tail fin (small turbines) or an active yaw motor (larger ones). Comparative studies of small
          wind turbines report that horizontal-axis designs are generally around 20‑25% more efficient at
          converting wind into electricity than vertical-axis designs of similar size, because their blades
          can be aerodynamically optimised for a single, known wind direction.
        </p>

        <h4 className="text-xl font-semibold mt-6 mb-2">🔄 Vertical-axis wind turbines (VAWT)</h4>
        <p className="mb-2">
          The rotor shaft is vertical, so the turbine captures wind from any direction without needing to
          turn — a genuine advantage on a roof or in a built-up area, where wind is turbulent and constantly
          changing direction rather than arriving in one steady stream. The two common subtypes are:
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li><strong>Darrieus / H-rotor (lift-based):</strong> curved or straight vertical aerofoil blades that generate lift, similar in principle to a HAWT blade but arranged around a vertical axis. Reasonably efficient but historically prone to vibration and self-starting difficulty at low wind speeds.</li>
          <li><strong>Savonius (drag-based):</strong> curved scoop-shaped blades that are pushed round by wind drag rather than lift. Lower peak efficiency, but simple, robust, quiet and self-starting even in light or gusty wind — a common choice for small building-mounted units.</li>
        </ul>

        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-300 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2">Factor</th>
                <th className="border p-2">Horizontal-axis (HAWT)</th>
                <th className="border p-2">Vertical-axis (VAWT)</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="border p-2">Peak efficiency (power coefficient)</td><td className="border p-2">Higher — typically the better performer in steady, unobstructed wind</td><td className="border p-2">Lower — roughly 20‑25% less efficient than an equivalent HAWT</td></tr>
              <tr><td className="border p-2">Best wind conditions</td><td className="border p-2">Steady, unidirectional wind — open rural or coastal sites</td><td className="border p-2">Turbulent, multi-directional wind — rooftops, urban and built-up sites</td></tr>
              <tr><td className="border p-2">Needs to face the wind?</td><td className="border p-2">Yes — tail fin or yaw motor required</td><td className="border p-2">No — omnidirectional by design</td></tr>
              <tr><td className="border p-2">Typical noise</td><td className="border p-2">Higher — blade-tip and mechanical yaw noise</td><td className="border p-2">Generally lower and less tonal</td></tr>
              <tr><td className="border p-2">Height / visual impact</td><td className="border p-2">Tall pole needed to clear turbulence</td><td className="border p-2">Can sit lower, closer to a roofline</td></tr>
              <tr><td className="border p-2">Maintenance access</td><td className="border p-2">Generator and gearbox at the top of the pole</td><td className="border p-2">Generator often at the base — easier to reach</td></tr>
              <tr><td className="border p-2">Typical domestic use case</td><td className="border p-2">Open rural plot, pole-mounted, larger capacities (2.5‑15 kW)</td><td className="border p-2">Roof or wall-mounted, smaller capacities (&lt;2 kW), urban/suburban sites</td></tr>
            </tbody>
          </table>
        </div>

        {/* ============================================================ */}
        {/* 3. EFFICIENCY / BETZ LIMIT */}
        {/* ============================================================ */}
        <h3 className="text-2xl font-semibold mt-10 mb-4">3. Why turbines never capture 100% of the wind — the Betz limit</h3>
        <p className="mb-2">
          No wind turbine, of any design, can convert all of the kinetic energy passing through its rotor
          into electricity. Physicist Albert Betz showed in 1919 that the theoretical maximum fraction of
          wind energy any turbine can extract is <strong>59.3%</strong> — known as the Betz limit — because
          air must retain some velocity to flow away from the rotor rather than piling up in front of it.
        </p>
        <p className="mb-2">
          Real turbines fall well short of that theoretical ceiling once mechanical, electrical and
          aerodynamic losses are included. Well-designed horizontal-axis turbines typically achieve
          power coefficients in the range of roughly 35‑45% of available wind energy in practice, while
          vertical-axis designs tend to sit lower still, consistent with their generally lower measured
          efficiency in comparative testing. This is why turbine "rated output" (its kW label) only tells
          you the output at one specific, fairly strong wind speed — actual annual generation depends
          heavily on the real, average wind speed at your exact site.
        </p>

        {/* ============================================================ */}
        {/* 4. DURABILITY */}
        {/* ============================================================ */}
        <h3 className="text-2xl font-semibold mt-10 mb-4">4. How long does a domestic wind turbine last?</h3>
        <p className="mb-2">
          A well-maintained domestic wind turbine typically has a service life of around <strong>20 years</strong>,
          broadly comparable to a solar panel's warranty period but shorter than a panel's real-world 30‑40
          year lifespan — the difference comes down to moving parts. Unlike a solar panel, which has no
          moving components, a turbine's bearings, gearbox (where fitted) and blades are under constant
          mechanical stress and require periodic inspection and servicing, particularly after storms.
        </p>

        {/* ============================================================ */}
        {/* 5. SHOULD YOU INSTALL ONE */}
        {/* ============================================================ */}
        <h3 className="text-2xl font-semibold mt-10 mb-4">5. Should you install a wind turbine?</h3>
        <p className="mb-2">
          This depends almost entirely on one factor: your site's real average wind speed, measured at
          turbine height, not at ground level. Industry cost calculators for the UK generally assume an
          average wind speed of around <strong>5‑6.5 m/s</strong> to produce the outputs manufacturers quote —
          a figure realistically found in open, elevated, rural or coastal locations, not in typical
          suburban gardens surrounded by houses and trees.
        </p>
        <p className="mb-2">
          Turbulence from nearby buildings, trees and hills doesn't just reduce a turbine's output — it can
          also shorten its life by subjecting the rotor to constantly shifting, gusty loads instead of a
          smooth airflow. As a rule of thumb, a freestanding turbine should be sited at least{' '}
          <strong>1.5 times its own height</strong> away from buildings, trees, roads and overhead lines, and
          ideally clear of any obstruction for a substantial distance in the prevailing wind direction.
        </p>

        {/* ============================================================ */}
        {/* 6. WHEN IT DOESN'T MAKE SENSE */}
        {/* ============================================================ */}
        <h3 className="text-2xl font-semibold mt-10 mb-4">6. Why so few UK homes have one</h3>
        <p className="mb-2">
          Domestic wind is a genuine niche technology in the UK. MCS certification data shows only around{' '}
          <strong>125 domestic wind turbines</strong> have been installed nationally, compared with over{' '}
          <strong>427,000 residential solar PV installations</strong> — a gap of more than three orders of
          magnitude. The reasons are structural rather than fashion: most UK homes sit in suburban or
          semi-rural settings with turbulent, moderate wind, not the open, consistently windy sites a
          turbine needs; planning objections from neighbours are common; and the payback periods below are,
          for most sites, longer than for an equivalent solar and battery system.
        </p>
        <p className="mb-2">
          A wind turbine tends to make more sense as a complement to solar rather than a replacement for
          it — wind resource in the UK is generally strongest in autumn and winter, exactly when solar
          output is at its lowest, so a hybrid wind-plus-solar system can smooth out generation across the
          year better than either alone. It rarely makes sense as a first renewable investment on an
          ordinary suburban plot.
        </p>

        {/* ============================================================ */}
        {/* 7. COSTS & OUTPUT */}
        {/* ============================================================ */}
        <h3 className="text-2xl font-semibold mt-10 mb-4">7. Costs, output and payback by system size</h3>
        <p className="mb-2">
          Figures vary significantly between suppliers and sites, but the ranges below give a realistic
          UK picture, assuming a reasonable site wind speed (roughly 5‑6.5 m/s average) and installed,
          grid-connected systems including Smart Export Guarantee (SEG) income where applicable.
        </p>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-300 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2">System size</th>
                <th className="border p-2">Mounting</th>
                <th className="border p-2">Indicative installed cost</th>
                <th className="border p-2">Typical annual output</th>
                <th className="border p-2">Approx. payback</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="border p-2">~1 kW</td><td className="border p-2">Roof-mounted</td><td className="border p-2">£1,500‑£3,000</td><td className="border p-2">800‑1,200 kWh</td><td className="border p-2">Often does not break even</td></tr>
              <tr><td className="border p-2">1.5 kW</td><td className="border p-2">Pole-mounted, freestanding</td><td className="border p-2">£7,000‑£10,000</td><td className="border p-2">~2,000‑2,600 kWh</td><td className="border p-2">~15‑20 years</td></tr>
              <tr><td className="border p-2">2.5 kW</td><td className="border p-2">Pole-mounted, freestanding</td><td className="border p-2">£12,500‑£18,000</td><td className="border p-2">~3,500‑4,400 kWh</td><td className="border p-2">~18‑21 years</td></tr>
              <tr><td className="border p-2">5 kW</td><td className="border p-2">Pole-mounted, freestanding</td><td className="border p-2">£23,500‑£30,500</td><td className="border p-2">~7,000‑9,000 kWh</td><td className="border p-2">~18 years</td></tr>
              <tr><td className="border p-2">10 kW</td><td className="border p-2">Pole-mounted, freestanding</td><td className="border p-2">£45,000‑£58,500</td><td className="border p-2">~15,000‑21,500 kWh</td><td className="border p-2">~14‑15 years</td></tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Figures are indicative UK-market ranges collated from installer and industry sources; actual
          output depends heavily on your site's real wind speed, turbine height and local terrain — always
          get a site-specific wind assessment before committing.
        </p>
        <p className="mb-2 mt-4">
          By comparison, a typical 4 kWp domestic solar PV installation costs roughly £5,500‑£7,500 with a
          payback of around 7‑10 years — solar remains the more financially reliable choice for the large
          majority of UK homes, which is why it's worth reading our{' '}
          <button onClick={() => navigate('/solar-calculator')} className="text-blue-600 underline">solar panel guide</button>{' '}
          alongside this one before deciding.
        </p>

        {/* ============================================================ */}
        {/* 8. PLANNING PERMISSION & NOISE */}
        {/* ============================================================ */}
        <h3 className="text-2xl font-semibold mt-10 mb-4">8. Planning permission and noise rules (UK)</h3>
        <p className="mb-2">
          Wind turbines are treated far more cautiously than solar panels under UK planning rules, because
          of their height, visual impact, noise and shadow flicker.
        </p>
        <div className="bg-yellow-50 p-4 rounded-md mb-4">
          <p className="font-semibold">🏠 Permitted development (where it applies)</p>
          <p className="text-sm">
            A single, freestanding domestic-scale turbine can sometimes be installed under permitted
            development rights without a full planning application, generally subject to a height limit in
            the region of 11.1 m, siting rules relative to the property boundary, and compliance with the
            MCS noise planning standard, which sets a permitted-development noise limit of 42 dB LAeq (5
            minute average) at the nearest neighbouring property. Conservation areas, listed buildings,
            Article 4 directions and larger or roof-mounted turbines typically fall outside permitted
            development and need a full planning application, including a noise assessment for anything
            over about 10 kW.
          </p>
        </div>
        <p className="mb-2">
          Because objections from neighbours are common and noise/shadow flicker assessments can be
          demanding, it's worth getting a planning pre-application check before ordering any turbine —
          exactly the kind of check our team can help with alongside the structural side of the
          installation.
        </p>

        {/* ============================================================ */}
        {/* 9. STRUCTURE & SITING */}
        {/* ============================================================ */}
        <h3 className="text-2xl font-semibold mt-10 mb-4">9. Structural and siting considerations</h3>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>Freestanding pole-mounted turbines need a properly designed foundation sized for the turbine's overturning moment in high wind — this is structural engineering, not a fence-post job.</li>
          <li>Roof-mounted turbines transmit significant vibration and cyclic loading into the roof structure; many UK roofs are not designed for this and need reinforcement, which is why roof-mounted turbines are the most likely to underperform and cause problems.</li>
          <li>Lightning protection to BS EN 62305 and electrical installation to BS 7671 are standard requirements, the same wiring regulations that apply to solar and battery installations.</li>
          <li>Keep the turbine at least 1.5 times its height from buildings, roads, footpaths, bridleways and overhead lines, in case of structural failure.</li>
        </ul>

        {/* ============================================================ */}
        {/* 10. CERTIFICATION & DIY */}
        {/* ============================================================ */}
        <h3 className="text-2xl font-semibold mt-10 mb-4">10. Certification — can I install a wind turbine myself?</h3>
        <p className="mb-2">
          As with solar and battery storage, the certification requirement depends on whether the system is
          connected to the property's electrical installation and the grid.
        </p>
        <p className="mb-2">
          <strong>Grid-connected turbines</strong> need an MCS-certified installer, compliance with{' '}
          <strong>Building Regs Part P</strong> for the electrical work, and DNO notification under{' '}
          <strong>G98</strong> (small, deemed-compliant systems) or <strong>G99</strong> (larger
          installations, requiring prior approval) — this isn't something a homeowner can self-certify, both
          for safety and because it's normally a condition of insurance and any Smart Export Guarantee
          tariff.
        </p>
        <p className="mb-2">
          <strong>Small, genuinely standalone systems</strong> not wired into the house's fixed electrical
          installation (for example, charging a separate battery bank directly) can generally be installed
          by a competent person without MCS/Part P/DNO involvement, in the same way a stand-alone off-grid
          battery system can.
        </p>

   
        {/* ============================================================ */}
        {/* REFERENCES */}
        {/* ============================================================ */}
        <h3 className="text-2xl font-semibold mt-12 mb-4">📚 References & further reading</h3>
        <div className="text-sm text-gray-700 space-y-1 border-t pt-4">
          <p>1. Betz, A. (1920) – "Das Maximum der theoretisch möglichen Ausnutzung des Windes durch Windmotoren", <em>Zeitschrift für das gesamte Turbinenwesen</em> (origin of the Betz limit, 59.3%).</p>
          <p>2. Comparative studies of horizontal‑ and vertical‑axis small wind turbine performance and efficiency (ResearchGate / engineering literature, 2020s).</p>
          <p>3. MCS (Microgeneration Certification Scheme) — installation statistics and MIS 3003 Planning Standard for wind turbine noise.</p>
          <p>4. The Eco Experts (2023–2026) – "Are Domestic Wind Turbines Worth It?" — UK cost, output and break-even data by system size.</p>
          <p>5. Renewable Energy Hub (2026) – UK domestic wind turbine cost, output and Smart Export Guarantee income tables.</p>
          <p>6. Homebuilding &amp; Renovating — "Wind Turbines Guide", siting, planning consent and cost guidance for UK self-builders.</p>
          <p>7. Planning Portal (UK) — permitted development rules for domestic microgeneration wind turbines.</p>
          <p>8. IET — BS 7671 Wiring Regulations, 18th Edition; BS EN 62305 lightning protection standard.</p>
        </div>
        <p className="text-xs text-gray-500 mt-4">Last review: 2026. Data reflect the most recent market research and UK government/planning guidance available at time of writing.</p>

      </div>
    </>
  );
};

export default WindTurbinesPage;
