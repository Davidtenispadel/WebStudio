<h2>9. From monitoring to predictive control</h2>
          <div className="hem-grid two mt-5">
            <article className="hem-card">
              <div className="hem-icon"><Activity size={25} /></div>
              <h3>Level 1 – Monitoring</h3>
              <p>Collect and display energy production, consumption, imports, exports and battery status. The homeowner can understand how the property performs.</p>
            </article>
            <article className="hem-card">
              <div className="hem-icon"><LineChart size={25} /></div>
              <h3>Level 2 – Forecasting</h3>
              <p>Estimate future solar generation, household demand and energy prices. Compare expected performance against actual readings.</p>
            </article>
            <article className="hem-card">
              <div className="hem-icon"><BrainCircuit size={25} /></div>
              <h3>Level 3 – Optimisation</h3>
              <p>Evaluate different battery and load schedules against cost, self-consumption, comfort, reserve and battery-life objectives.</p>
            </article>
            <article className="hem-card">
              <div className="hem-icon"><Cpu size={25} /></div>
              <h3>Level 4 – Automated operation</h3>
              <p>Send approved commands to compatible devices, verify the result and adjust the operating plan when actual conditions change.</p>
            </article>
          </div>
          <div className="hem-callout hem-warning">
            Artificial intelligence is not essential for every stage. Reliable measurement, sound forecasts and a clearly
            defined optimisation objective should come first. More advanced systems can use predictive control or
            machine learning, but automated commands must remain within electrical, manufacturer, comfort and safety limits.
          </div>
        </section>

        <section className="hem-section">
          <h2>10. What could an architectural studio provide?</h2>
          <p className="hem-lead">
            The architectural practice can coordinate the design information and prepare the building for intelligent
            operation. Specialist electrical installers and controls engineers would normally commission the meters,
            batteries, inverters and control interfaces. The digital-twin and energy-management scope can then be
            developed with the relevant technology partners.
          </p>
          <div className="hem-grid mt-5">
            <article className="hem-card"><div className="hem-icon"><Layers3 size={25} /></div><h3>BIM-ready home design</h3><p>Develop Revit models with coordinated spaces, systems, equipment schedules and asset identifiers.</p></article>
            <article className="hem-card"><div className="hem-icon"><Gauge size={25} /></div><h3>Energy system specification</h3><p>Coordinate PV, storage, metering, EV charging, heating and hot-water systems around the building's needs.</p></article>
            <article className="hem-card"><div className="hem-icon"><Network size={25} /></div><h3>Digital-twin setup</h3><p>Structure asset information and map the relevant equipment data to the building model.</p></article>
            <article className="hem-card"><div className="hem-icon"><CloudSun size={25} /></div><h3>Performance forecasting</h3><p>Use weather, consumption and tariff information to model expected operation and compare scenarios.</p></article>
            <article className="hem-card"><div className="hem-icon"><Settings2Fallback /></div><h3>Controls integration</h3><p>Coordinate with qualified specialists to connect supported devices and define safe operating strategies.</p></article>
            <article className="hem-card"><div className="hem-icon"><LineChart size={25} /></div><h3>Operational review</h3><p>Compare actual performance with design expectations and identify opportunities for improvement.</p></article>
          </div>
        </section>

        <section className="hem-section">
          <h2>11. Is a Digital Twin suitable for every home?</h2>
          <p className="hem-lead">
            Not every property needs a full 3D operational twin or an AI-based controller. A modest installation may
            benefit most from a smart meter, an inverter app and a simple energy dashboard. A more advanced Digital
            Twin becomes more valuable when a property has several interacting systems, such as solar PV, battery
            storage, a heat pump, an EV charger, hot-water storage and dynamic electricity tariffs.
          </p>
          <div className="hem-grid two mt-5">
            <article className="hem-card">
              <h3>Good starting point</h3>
              <p>Smart meter or energy meter, compatible inverter monitoring, a battery dashboard where installed and a clear record of the home's energy use.</p>
            </article>
            <article className="hem-card">
              <h3>Advanced connected home</h3>
              <p>Structured BIM assets, multiple metering points, weather and tariff data, an integration platform, predictive optimisation and controls for compatible equipment.</p>
            </article>
          </div>
        </section>

        <section className="hem-section">
          <div className="hem-cta">
            <h2>Design the home. Connect its systems. Optimise its energy.</h2>
            <p>
              A well-designed energy system starts with understanding the building. By combining architectural design,
              BIM information, renewable generation and intelligent controls, DB+ can help homeowners explore a route
              from a conventional solar installation towards a connected and more responsive home.
            </p>
            <p className="mb-0"><strong>The next step is to assess the property, its energy needs and the level of automation that makes practical and economic sense.</strong></p>
          </div>
        </section>

        <section className="hem-section">
          <h2>Technical references and manufacturers</h2>
          <p className="hem-muted">The following official resources provide further information about the platforms and products discussed on this page. Product compatibility and available features should always be checked against the specific model and installation.</p>
          <div className="mt-3">
            {sources.map((source) => (
              <div className="hem-source" key={source.url}>
                <a href={source.url} target="_blank" rel="noreferrer">{source.label} <ArrowRight className="inline ml-1" size={13} /></a>
              </div>
            ))}
          </div>
          <p className="hem-small mt-4">
            Technical note: This page is an introduction to possible system architectures, not an installation design or
            a guarantee that the listed products can communicate directly with one another. Electrical work, battery
            settings, export arrangements and automated control should be designed and commissioned by appropriately
            qualified professionals. Always retain manual override, manufacturer protections and an appropriate battery reserve.
          </p>
        </section>
      </div>
    </>
  );
};

// Small inline icon wrapper kept local to avoid adding another icon dependency.
const DropletsFallback: React.FC = () => (
  <span aria-hidden="true" className="inline-flex items-center justify-center">
    <Droplets size={25} />
  </span>
);

const Settings2Fallback: React.FC = () => (
  <span aria-hidden="true" className="inline-flex items-center justify-center">
    <Wifi size={25} />
  </span>
);

export default Homeenergymanagement;
