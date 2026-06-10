// src/pages/BatteriesPage.tsx

import React from 'react';
import { Link } from 'react-router-dom';
import './BatteriesPage.css'; // Opcional - ajusta a tu sistema de estilos

const BatteriesPage: React.FC = () => {
  return (
    <div className="batteries-page">
      {/* Header con navegación */}
      <header className="page-header">
        <Link to="/" className="back-link">← Back to Portfolio</Link>
        <h1>Batteries for Solar Panels</h1>
        <p className="subtitle">Energy storage systems · Smart automation · BIM integration · Future technologies</p>
      </header>

      <main className="content-container">
        
        {/* INTRODUCCIÓN */}
        <section className="intro-section">
          <p>
            The combination of solar panels and batteries represents a fundamental shift in how we produce 
            and consume electricity. Without storage, a solar panel system is a slave to the sun: it generates 
            power when the sun shines and stops when it sets. The battery is the key that unlocks true 
            energy independence, transforming an intermittent power source into a reliable, 24/7 energy supply.
          </p>
        </section>

        {/* SECCIÓN 1: HISTORIA */}
        <section className="history-section">
          <h2>1. The Evolution of the Battery: From Volta's Pile to the Lithium Age</h2>
          
          <div className="timeline-card">
            <h3>🔋 1800 – The Birth of the Battery</h3>
            <p>Italian physicist <strong>Alessandro Volta</strong> invented the "voltaic pile," the first true device that could produce a continuous, stable electric current. Made of alternating zinc and copper discs separated by brine-soaked cardboard, this was a revolutionary breakthrough.</p>
          </div>

          <div className="timeline-card">
            <h3>⚡ 1836-1859 – The First Practical Cells</h3>
            <p><strong>John Frederic Daniell</strong> solved the "polarization" problem, creating the Daniell Cell, which provided reliable current for telegraph networks. In 1859, <strong>Gaston Planté</strong> invented the first <strong>rechargeable battery</strong> – the lead-acid cell, still in use today.</p>
          </div>

          <div className="timeline-card">
            <h3>🏭 1880s-1950s – The Commercial Era</h3>
            <p>Georges Leclanché's zinc-carbon design led to the first "dry" batteries, making batteries portable and safe. The first half of the 20th century saw alkaline batteries (nickel-cadmium, nickel-iron) for industrial use.</p>
          </div>

          <div className="timeline-card">
            <h3>📱 1970s-1990s – The Rechargeable Revolution</h3>
            <p>Nickel-metal hydride (NiMH) batteries improved energy density, but the true game-changer was the commercialization of the <strong>lithium-ion (Li-ion) battery</strong> in the 1990s – enabling portable computers, mobile phones, and ultimately electric vehicles and residential solar batteries.</p>
          </div>
        </section>

        {/* SECCIÓN 2: COSTES */}
        <section className="cost-section">
          <h2>2. The Cost Trajectory: From Experiment to Accessible Asset</h2>
          <div className="highlight-card green">
            <span className="emoji-icon">📉</span>
            <p><strong>Key fact:</strong> Battery pack prices have fallen by <strong>93% since 2010</strong>. In 2024, utility-scale systems reached around <strong>$192 USD per kilowatt-hour (kWh)</strong>.</p>
          </div>
          <p>A 10 kWh battery that cost upwards of $10,000 a decade ago might now be installed for a third of that price. This dramatic drop, combined with rising electricity prices, has made solar-plus-battery systems a financially sound investment.</p>
        </section>

        {/* SECCIÓN 3: TECNOLOGÍAS ACTUALES */}
        <section className="tech-section">
          <h2>3. Solar Battery Technologies Today: Which One is "Más en Boga"?</h2>
          
          <h3>🔋 Lithium Iron Phosphate (LFP) – The Undisputed Leader for Homes</h3>
          <p>For new residential solar installations in 2026, <strong>LFP (LiFePO₄)</strong> has become the standard and most "en vogue" technology. Over 70% of new home battery systems in Europe use LFP chemistry.</p>
          <ul>
            <li><strong>Safety:</strong> Very stable chemistry, low risk of thermal runaway.</li>
            <li><strong>Long life:</strong> 3,000 to 6,000+ cycles (15-16 years of daily use).</li>
            <li><strong>Efficiency:</strong> Round-trip efficiency of 94-96%.</li>
          </ul>

          <h3>⚡ Nickel Manganese Cobalt (NMC) – High Density Alternative</h3>
          <p>Higher energy density (smaller, lighter), but shorter cycle life (1,500-3,000 cycles), higher fire risk, and uses cobalt.</p>

          <h3>🔋 Lead-Acid – The Legacy Option</h3>
          <p>Cheap upfront, but only 50% usable depth of discharge, short cycle life (400-1,200 cycles). Over 10 years, more expensive than LFP.</p>

          <div className="table-wrapper">
            <table className="comparison-table">
              <thead>
                <tr>
                  <th>Technology</th>
                  <th>Best For</th>
                  <th>Cycle Life</th>
                  <th>Usable Capacity</th>
                  <th>Safety</th>
                  <th>Cost (2026 est.)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>LFP (Lithium)</strong></td>
                  <td>Standard for homes</td>
                  <td>6,000+ cycles</td>
                  <td>100%</td>
                  <td>Very High</td>
                  <td>€400-700/kWh</td>
                </tr>
                <tr>
                  <td><strong>NMC (Lithium)</strong></td>
                  <td>EVs, tight spaces</td>
                  <td>1,500-3,000 cycles</td>
                  <td>100%</td>
                  <td>Moderate</td>
                  <td>€450-750/kWh</td>
                </tr>
                <tr>
                  <td><strong>Lead-Acid</strong></td>
                  <td>Low-use backup</td>
                  <td>500-1,200 cycles</td>
                  <td>50% max</td>
                  <td>High (if vented)</td>
                  <td>€150-300/kWh (short life)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* SECCIÓN 4: FUTURO */}
        <section className="future-section">
          <h2>4. The Battery of the Future: What's on the Horizon?</h2>
          
          <div className="future-card">
            <h3>🧂 Sodium-Ion (Na-Ion)</h3>
            <p>Sodium is abundant, cheap, and widely available. Safer, better cold weather performance, and significantly lower cost. Lower energy density (larger for same capacity), but ideal for stationary home storage.</p>
          </div>

          <div className="future-card">
            <h3>☀️ Integrated Solar Batteries (Photo-rechargeable)</h3>
            <p>The battery itself captures and stores sunlight directly, using advanced materials like perovskites. Ultra-compact systems for off-grid applications, wearables, and smart cities.</p>
          </div>

          <div className="future-card">
            <h3>🚗 Second-Life EV Batteries</h3>
            <p>EV batteries with 70-80% remaining capacity can be repurposed into low-cost stationary storage. The EU's "Battery Passport" will track battery health to enable this.</p>
          </div>
        </section>

        {/* SECCIÓN 5: BIM TECHNOLOGY */}
        <section className="bim-section">
          <h2>5. BIM Technology: The Digital Brain for Energy Production, Storage & Consumption</h2>
          
          <p><strong>Energy BIM (Building Information Modeling)</strong> creates a dynamic digital twin of your entire energy ecosystem:</p>
          <ul>
            <li>Solar panel orientation, shading, degradation</li>
            <li>Battery state of health (SoH) and state of charge (SoC)</li>
            <li>Household consumption patterns (AI-learned)</li>
            <li>Local weather forecasts (solar irradiance, wind speed)</li>
            <li>Real-time electricity pricing from your utility</li>
          </ul>

          <div className="highlight-card green">
            <strong>📐 Practical example:</strong> On a cloudy day, your BIM digital twin predicts only 40% of normal solar production. It will: reduce battery charging, delay non-urgent consumption, and pre-charge the battery from the grid only if nighttime prices are higher.
          </div>
        </section>

        {/* SECCIÓN 6: AUTOMATIZACIÓN - VACIAR BATERÍAS CUANDO LLEGA SOL O VIENTO */}
        <section className="automation-section">
          <h2>6. Consumption Automation: Emptying Batteries When the Sun or Wind Returns</h2>
          
          <p><strong>Predictive discharge automation</strong> is one of the smartest features. The principle: <em>do not store energy that is about to be replenished for free.</em></p>
          
          <div className="logic-steps">
            <div className="step">
              <span className="step-number">1</span>
              <p>Automatically discharge battery before renewable event</p>
            </div>
            <div className="step">
              <span className="step-number">2</span>
              <p>Target 20-30% remaining charge when sun/wind arrives</p>
            </div>
            <div className="step">
              <span className="step-number">3</span>
              <p>Battery absorbs new free renewable energy</p>
            </div>
          </div>

          <div className="highlight-card green">
            <strong>💡 Result:</strong> Almost 100% of renewable energy is captured and used, instead of being curtailed (wasted) because the battery was full.
          </div>
        </section>

        {/* SECCIÓN 7: DSM - CARGAR CUANDO LA ENERGÍA ES MÁS BARATA */}
        <section className="dsm-section">
          <h2>7. Demand-Side Management (DG/DSM): Charging When Energy is Cheapest</h2>
          
          <h3>Price-Based Automation Rules</h3>
          <ul>
            <li><strong>Energy price is low</strong> → Charge battery from grid, run dishwasher, pre-heat home.</li>
            <li><strong>Energy price is high</strong> → Discharge battery to power home, delay non-urgent loads.</li>
            <li><strong>Energy price is negative</strong> → Grid pays you to consume. Charge battery at full power.</li>
          </ul>

          <div className="table-wrapper">
            <table className="schedule-table">
              <thead>
                <tr>
                  <th>Time</th>
                  <th>Price</th>
                  <th>Solar</th>
                  <th>Battery State</th>
                  <th>Automated Decision</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>02:00-05:00</td><td>Very Low</td><td>None</td><td>30%</td><td>Charge battery from grid at cheap rate</td></tr>
                <tr><td>08:00-11:00</td><td>Medium</td><td>Rising</td><td>95%</td><td>Discharge battery to prepare space for midday sun</td></tr>
                <tr><td>11:00-14:00</td><td>Medium</td><td>Peak</td><td>40%→100%</td><td>Solar charges battery automatically</td></tr>
                <tr><td>17:00-20:00</td><td>Peak</td><td>None</td><td>85%</td><td>Discharge battery to power home</td></tr>
                <tr><td>22:00-24:00</td><td>Medium</td><td>None</td><td>25%</td><td>Delay washing machine until 02:00</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* SECCIÓN 8: V2G */}
        <section className="v2g-section">
          <h2>8. Vehicle-to-Grid (V2G): Are Electric Cars the Ultimate Home Battery?</h2>
          
          <div className="warning-card">
            <strong>⚠️ Is it a good solution today?</strong> Yes and no.
            <p><strong>✅ The potential:</strong> Could eliminate the need for a dedicated home battery. Charge your car for free from solar during the day, then power your home at night.</p>
            <p><strong>❌ The reality (2026):</strong> Few EVs and chargers officially support V2G. Battery degradation concerns remain.</p>
            <p><strong>📌 Conclusion:</strong> Incredibly promising for the future, but a dedicated LFP home battery remains more practical for most homeowners today.</p>
          </div>
        </section>

        {/* SECCIÓN 9: RECOMENDACIONES PRÁCTICAS */}
        <section className="recommendations-section">
          <h2>9. Practical Advice for Your Home</h2>
          <ol>
            <li><strong>Start with a smart energy monitor</strong> (Sense, Emporia, Shelly) before buying a battery.</li>
            <li><strong>Choose a battery with an open API</strong> (Tesla Powerwall, Sonnen, Enphase, Sungrow, Victron).</li>
            <li><strong>Integrate a home automation platform</strong> (Home Assistant, openHAB, Apple HomeKit).</li>
            <li><strong>Consider a hybrid inverter</strong> that manages both solar and battery in one unit.</li>
          </ol>
          
          <div className="highlight-card green">
            <strong>📌 The key takeaway:</strong> A battery without smart automation is just a heavy box. A battery connected to an Energy BIM digital twin is an autonomous financial and environmental asset.
          </div>
        </section>

        {/* BIBLIOGRAFÍA */}
        <section className="bibliography-section">
          <h3>📚 Bibliography & References</h3>
          <ul>
            <li>Britannica, T. Editors of Encyclopaedia (2026). <em>Battery</em>. Encyclopedia Britannica.</li>
            <li>Mutyaba, J. (2025). <em>The Rise of Solar PV and Battery Storage's Prominence in Emerging Markets</em>. IRENA.</li>
            <li>Rakholiya, K. (2026). <em>Solar Battery Types: LFP, NMC & Lead-Acid Compared</em>. SurgePV.</li>
            <li><em>Recent advances in integrated solar batteries</em> (2026). Journal of Power Sources, 663, 238862.</li>
            <li>European Commission, CORDIS. (2025). <em>Integrated Battery and Energy Management System for Second-Life Battery</em>.</li>
            <li>BuildingSmart International. (2025). <em>BIM for Energy Management – Use Case Documentation</em>.</li>
            <li>Home Assistant Open Source Project. (2026). <em>Energy Management Integration – Battery Automation Blueprints</em>.</li>
            <li>International Energy Agency (IEA). (2025). <em>Demand-Side Management and Smart Grids</em>.</li>
            <li>U.S. Department of Energy. (2025). <em>Grid-Interactive Efficient Buildings (GEB)</em>.</li>
          </ul>
        </section>
      </main>

      <footer className="page-footer">
        <p>dbsdesgnier.com — Living technical resource for architects and homeowners.<br />
        Information verified with scientific papers and real-world evidence. Updated 2026.</p>
      </footer>
    </div>
  );
};

export default BatteriesPage;
