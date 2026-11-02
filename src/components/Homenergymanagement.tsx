import React from 'react';
import {
  Activity,
  ArrowDownRight,
  ArrowRight,
  BatteryCharging,
  BrainCircuit,
  Building2,
  CalendarClock,
  CloudSun,
  Cpu,
  Database,
  Gauge,
  Home,
  Layers3,
  LineChart,
  Network,
  PlugZap,
  Sun,
  Wifi,
  Zap,
} from 'lucide-react';

const Homeenergymanagement: React.FC = () => {
  const hardware = [
    {
      name: 'Shelly Pro 3EM',
      type: 'Energy monitoring',
      description:
        'A DIN-rail three-phase energy meter for measuring import, export and power use. Ethernet, Wi-Fi, MQTT and Modbus support can make it a useful data source for a local monitoring platform.',
      use: 'Measure whole-home electricity flows and, where the electrical design allows, selected circuits.',
      url: 'https://www.shelly.com/products/shelly-pro-3em-x1',
      label: 'Metering and integration',
    },
    {
      name: 'GivEnergy inverter and battery systems',
      type: 'Battery and inverter control',
      description:
        'A UK-market battery ecosystem with monitoring and documented API services. Its Smart Tariff API documentation lists UK support and an Octopus Energy provider option. Exact functions depend on the installed model, firmware and account permissions.',
      use: 'Monitor battery state and, on supported configurations, schedule charging around tariff periods.',
      url: 'https://givenergy.cloud/docs/api/v1',
      label: 'Battery management',
    },
    {
      name: 'Tesla Powerwall',
      type: 'Integrated home battery',
      description:
        'Tesla provides a native app for solar production, household demand, battery behaviour and tariff settings. Features such as Savings mode and heat-pump optimisation depend on system configuration and compatibility.',
      use: 'A largely integrated route for households prioritising a manufacturer-managed battery ecosystem.',
      url: 'https://www.tesla.com/en_gb/support/energy/powerwall/mobile-app/tesla-app-for-energy',
      label: 'Integrated ecosystem',
    },
    {
      name: 'myenergi zappi, eddi and libbi',
      type: 'Flexible household loads',
      description:
        'A coordinated product family for EV charging, solar diversion to hot water and battery storage. Grid CT monitoring allows compatible devices to respond to the power flowing through the property.',
      use: 'Coordinate EV charging and hot-water heating with available solar generation and household demand.',
      url: 'https://www.myenergi.com/renewable-energy-solutions/diverting-generated-energy/',
      label: 'Load shifting',
    },
    {
      name: 'Home Assistant',
      type: 'Local integration and automation platform',
      description:
        'An open home-automation platform with an Energy dashboard. Compatible meters, inverters, batteries and smart devices can feed data into one view; automations can then coordinate supported devices.',
      use: 'Bring equipment from different manufacturers into a common monitoring and automation layer, subject to integration support.',
      url: 'https://www.home-assistant.io/docs/energy',
      label: 'Multi-brand integration',
    },
    {
      name: 'Octopus Energy API',
      type: 'Tariff and price data',
      description:
        'The Octopus API provides tariff and consumption data. Agile prices are available in half-hourly periods, allowing an energy-management system to compare the cost of charging, discharging or shifting a load.',
      use: 'Use day-ahead and tariff data as an input to an energy plan. A tariff API does not itself control the battery.',
      url: 'https://docs.octopus.energy/rest/guides/endpoints/',
      label: 'Dynamic tariffs',
    },
  ];

  const stages = [
    {
      number: '01',
      title: 'Create the BIM asset model',
      description:
        'Develop the Revit model with spaces, building systems and maintainable assets. Give important equipment consistent identifiers and structured parameters.',
    },
    {
      number: '02',
      title: 'Install and connect sensors',
      description:
        'Connect meters, inverter data, battery status, temperature sensors, EV chargers and other supported devices. Record the physical location and data source of each asset.',
    },
    {
      number: '03',
      title: 'Build the operational twin',
      description:
        'Connect the BIM asset information to live and historic readings through a platform such as Autodesk Tandem or a custom data application.',
    },
    {
      number: '04',
      title: 'Forecast and optimise',
      description:
        'Combine weather, solar forecasts, occupancy patterns, expected demand, battery state and electricity prices to evaluate operating strategies.',
    },
    {
      number: '05',
      title: 'Control and learn',
      description:
        'Send approved commands to compatible equipment, check the resulting performance and refine the next operating plan. Safety limits and user overrides remain in place.',
    },
  ];

  const capabilities = [
    {
      icon: <CloudSun size={25} />,
      title: 'Solar generation forecasting',
      text: 'Estimate the electricity likely to be generated from the PV system using local weather forecasts, solar orientation, shading and historic performance.',
    },
    {
      icon: <CalendarClock size={25} />,
      title: 'Future demand forecasting',
      text: 'Estimate household demand from historic consumption, time of day, season, occupancy assumptions and planned activities such as EV charging.',
    },
    {
      icon: <BatteryCharging size={25} />,
      title: 'Predictive battery management',
      text: 'Choose when to charge, hold or discharge the battery while respecting reserve capacity, operating limits, efficiency and battery health.',
    },
    {
      icon: <PlugZap size={25} />,
      title: 'Flexible load management',
      text: 'Schedule compatible EV chargers, hot-water systems, heat pumps and appliances to use energy when it is available or less expensive.',
    },
    {
      icon: <LineChart size={25} />,
      title: 'Tariff and cost optimisation',
      text: 'Compare forecast electricity prices with expected demand and generation to reduce avoidable imports and improve the value of stored energy.',
    },
    {
      icon: <ShieldCheck size={25} />,
      title: 'Resilience and reserve planning',
      text: 'Maintain a user-defined reserve for essential loads or possible outages, rather than pursuing self-consumption at any cost.',
    },
  ];

  const sources = [
    {
      label: 'Autodesk Tandem – BIM and operational digital twins',
      url: 'https://www.autodesk.com/uk/products/Tandem/overview',
    },
    {
      label: 'Autodesk Tandem – importing Revit and IFC models',
      url: 'https://help.autodesk.com/cloudhelp/ENU/Tandem-Facilities/files/tandem-files.html',
    },
    {
      label: 'Autodesk Tandem Data API – asset properties and IoT streams',
      url: 'https://aps.autodesk.com/en/docs/tandem/v1',
    },
    {
      label: 'Home Assistant – Home energy management',
      url: 'https://www.home-assistant.io/docs/energy',
    },
    {
      label: 'Shelly – Pro 3EM technical information',
      url: 'https://shelly-api-docs.shelly.cloud/gen2/Devices/Gen2/ShellyPro3EM/',
    },
    {
      label: 'GivEnergy – API documentation and Smart Tariff',
      url: 'https://givenergy.cloud/docs/api/v1',
    },
    {
      label: 'Tesla – Powerwall energy app',
      url: 'https://www.tesla.com/en_gb/support/energy/powerwall/mobile-app/tesla-app-for-energy',
    },
    {
      label: 'myenergi – solar energy diversion',
      url: 'https://www.myenergi.com/renewable-energy-solutions/diverting-generated-energy/',
    },
    {
      label: 'Octopus Energy – API endpoints and tariff data',
      url: 'https://docs.octopus.energy/rest/guides/endpoints/',
    },
  ];

  return (
    <>
      <style>{`
        .hem-page { color: #171717; max-width: 1152px; margin: 0 auto; padding: 0 1rem 4rem; }
        .hem-page * { box-sizing: border-box; }
        .hem-hero { background: linear-gradient(135deg, #102b35 0%, #174b50 58%, #277267 100%); color: #fff; border-radius: 20px; padding: clamp(1.5rem, 4vw, 3.25rem); margin: 1.5rem 0 2rem; overflow: hidden; position: relative; }
        .hem-kicker { text-transform: uppercase; letter-spacing: .13em; font-size: .75rem; font-weight: 700; color: #a8ded1; margin-bottom: .85rem; }
        .hem-hero h1 { font-size: clamp(2rem, 4vw, 3.25rem); line-height: 1.08; font-weight: 650; max-width: 850px; margin: 0 0 1.1rem; }
        .hem-hero p { max-width: 820px; color: #e4f0ee; font-size: 1.08rem; line-height: 1.75; margin: 0; }
        .hem-hero-note { display: inline-flex; align-items: center; gap: .55rem; border: 1px solid rgba(255,255,255,.25); background: rgba(255,255,255,.08); border-radius: 999px; padding: .55rem .85rem; margin-top: 1.5rem; font-size: .88rem; }
        .hem-section { margin-top: 3.25rem; }
        .hem-section h2 { font-size: clamp(1.55rem, 3vw, 2rem); line-height: 1.2; font-weight: 650; margin: 0 0 1rem; }
        .hem-section h3 { font-size: 1.2rem; line-height: 1.3; font-weight: 650; margin: 0 0 .65rem; }
        .hem-lead { font-size: 1.06rem; line-height: 1.8; color: #404040; max-width: 920px; }
        .hem-muted { color: #5b6265; line-height: 1.7; }
        .hem-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 1rem; }
        .hem-grid.two { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        .hem-card { border: 1px solid #e3e7e7; border-radius: 15px; padding: 1.25rem; background: #fff; height: 100%; }
        .hem-card p { color: #565f62; line-height: 1.7; margin: .4rem 0 0; }
        .hem-icon { width: 48px; height: 48px; display: flex; align-items: center; justify-content: center; border-radius: 13px; background: #e8f3ef; color: #23695d; margin-bottom: 1rem; }
        .hem-tag { display: inline-block; color: #26685d; background: #eaf4f0; border-radius: 999px; padding: .3rem .65rem; font-size: .75rem; font-weight: 700; margin-bottom: .8rem; }
        .hem-flow { display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: .7rem; align-items: stretch; }
        .hem-flow-step { background: #f5f8f7; border: 1px solid #e2e9e6; border-radius: 13px; padding: 1rem; min-width: 0; }
        .hem-flow-number { color: #277267; font-size: .78rem; font-weight: 800; letter-spacing: .08em; margin-bottom: .65rem; }
        .hem-flow-step h3 { font-size: 1rem; }
        .hem-flow-step p { color: #596366; font-size: .9rem; line-height: 1.6; margin: .45rem 0 0; }
        .hem-diagram { background: #f4f8f6; border: 1px solid #e0e8e4; border-radius: 18px; padding: 1.4rem; }
        .hem-diagram-top { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: .8rem; }
        .hem-node { background: white; border: 1px solid #dfe7e3; border-radius: 13px; padding: 1rem .75rem; text-align: center; }
        .hem-node-icon { color: #277267; display: flex; justify-content: center; margin-bottom: .5rem; }
        .hem-node strong { display: block; font-size: .92rem; }
        .hem-node span { display: block; color: #64706c; font-size: .78rem; margin-top: .3rem; line-height: 1.45; }
        .hem-down { display: flex; justify-content: center; color: #478276; padding: .55rem 0; }
        .hem-twin { background: #143e43; color: white; border-radius: 14px; text-align: center; padding: 1.2rem; }
        .hem-twin p { color: #d9e9e4; line-height: 1.6; margin: .45rem auto 0; max-width: 760px; }
        .hem-action-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: .8rem; margin-top: 1rem; }
        .hem-action { border: 1px solid #dfe7e3; border-radius: 12px; padding: 1rem; background: white; }
        .hem-action strong { display: block; margin-bottom: .3rem; }
        .hem-action p { color: #5c6662; line-height: 1.55; margin: 0; font-size: .92rem; }
        .hem-hardware { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1rem; }
        .hem-hardware-card { border: 1px solid #e2e7e5; border-radius: 15px; padding: 1.2rem; display: flex; flex-direction: column; }
        .hem-hardware-card h3 { margin-bottom: .25rem; }
        .hem-hardware-card p { color: #58615e; font-size: .94rem; line-height: 1.65; margin: .55rem 0; }
        .hem-hardware-card .hem-use { background: #f5f8f6; border-radius: 9px; padding: .75rem; color: #35413d; font-size: .88rem; }
        .hem-hardware-card a, .hem-source a { color: #1d6b60; text-decoration: underline; text-underline-offset: 3px; font-weight: 650; }
        .hem-hardware-card a { margin-top: auto; padding-top: .8rem; }
        .hem-table-wrap { overflow-x: auto; border: 1px solid #e1e7e4; border-radius: 13px; }
        .hem-table { width: 100%; border-collapse: collapse; min-width: 670px; }
        .hem-table th, .hem-table td { padding: .9rem 1rem; text-align: left; vertical-align: top; border-bottom: 1px solid #e7ece9; line-height: 1.6; }
        .hem-table th { background: #f2f6f4; color: #35443e; font-size: .86rem; }
        .hem-table td { color: #4c5752; font-size: .92rem; }
        .hem-table tr:last-child td { border-bottom: 0; }
        .hem-callout { border-left: 4px solid #408575; background: #f0f6f3; padding: 1.1rem 1.2rem; border-radius: 0 12px 12px 0; margin: 1.25rem 0; color: #3d4d47; line-height: 1.7; }
        .hem-warning { border-left-color: #c28a35; background: #fff8eb; }
        .hem-example { background: #122f36; color: white; border-radius: 17px; padding: 1.5rem; }
        .hem-example h3 { color: white; }
        .hem-example p { color: #d9e7e4; line-height: 1.7; }
        .hem-timeline { display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: .75rem; margin-top: 1.25rem; }
        .hem-time { border-top: 2px solid #8cc4b5; padding-top: .75rem; }
        .hem-time strong { color: #b4dfd3; display: block; margin-bottom: .4rem; }
        .hem-time span { color: #e2eeea; display: block; font-size: .88rem; line-height: 1.55; }
        .hem-source { padding: .65rem 0; border-bottom: 1px solid #e8ecea; font-size: .93rem; }
        .hem-source:last-child { border-bottom: 0; }
        .hem-small { color: #707a75; font-size: .82rem; line-height: 1.55; }
        .hem-cta { background: #edf4f1; border-radius: 16px; padding: 1.4rem; }
        .hem-cta p { color: #4f5d57; line-height: 1.7; }
        @media (max-width: 900px) { .hem-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } .hem-flow { grid-template-columns: repeat(2, minmax(0, 1fr)); } .hem-flow-step:last-child { grid-column: 1 / -1; } .hem-timeline { grid-template-columns: repeat(3, minmax(0, 1fr)); } }
        @media (max-width: 640px) { .hem-grid, .hem-grid.two, .hem-hardware, .hem-action-grid { grid-template-columns: 1fr; } .hem-diagram-top { grid-template-columns: repeat(2, minmax(0, 1fr)); } .hem-flow { grid-template-columns: 1fr; } .hem-flow-step:last-child { grid-column: auto; } .hem-timeline { grid-template-columns: 1fr; } .hem-time { border-top: 0; border-left: 2px solid #8cc4b5; padding: 0 0 0 .8rem; } }
      `}</style>

      <div className="hem-page">
        <header className="hem-hero">
          <div className="hem-kicker">Smart homes · BIM · IoT · Energy optimisation</div>
          <h1>Digital Twin &amp; Intelligent Home Energy Management</h1>
          <p>
            A home can do more than generate and store renewable electricity. By connecting its solar panels,
            battery, heating, EV charger and electrical meters to an intelligent energy-management system, it can
            anticipate future demand, respond to changing energy prices and make better use of the energy it
            produces. A Digital Twin adds the building and its equipment to this picture, providing a structured
            digital representation of how the home is designed and how it performs in operation.
          </p>
          <div className="hem-hero-note"><BrainCircuit size={17} /> From a static building model to a connected, predictive home</div>
        </header>

        <section>
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">What if your home could plan its energy use before it happens?</h2>
          <p className="hem-lead">
            Traditional solar installations are generally designed around the expected annual generation and
            consumption of a property. A smart energy-management system goes further: it looks at what is happening
            now, what is likely to happen next and which action is most useful. The system may charge a battery when
            electricity is inexpensive, retain capacity before a sunny period, heat water when solar surplus is
            available or delay EV charging until a more favourable period.
          </p>
          <p className="hem-lead">
            The Digital Twin provides the building context for these decisions. It connects the physical property,
            its BIM information and its operational data. The result is not simply a 3D model or an energy dashboard,
            but a digital representation that can support monitoring, simulation, optimisation and, where compatible
            controls are available, automation.
          </p>
        </section>

        <section className="hem-section">
          <h2>1. What is a Home Energy Digital Twin?</h2>
          <p className="hem-lead">
            A Digital Twin is a digital representation of a physical asset that is connected to relevant information
            from the real world. For a home, this can include the building layout, construction elements, rooms,
            heating and electrical systems, solar panels, inverters, batteries, meters and connected appliances.
          </p>
          <div className="hem-grid two mt-5">
            <article className="hem-card">
              <div className="hem-icon"><Layers3 size={25} /></div>
              <h3>The BIM model: what the home contains</h3>
              <p>
                The Revit model describes the building and its assets: spaces, roof orientation, solar panel locations,
                electrical distribution, heating equipment, battery location, equipment references and maintenance
                information. This creates the structured building information on which the operational twin can be based.
              </p>
            </article>
            <article className="hem-card">
              <div className="hem-icon"><Activity size={25} /></div>
              <h3>Operational data: how the home behaves</h3>
              <p>
                Meters and connected equipment provide measurements such as electricity import and export, PV output,
                battery state of charge, temperature, hot-water demand and EV charging power. Weather forecasts and
                tariff data add information about likely future conditions.
              </p>
            </article>
          </div>
          <div className="hem-callout">
            <strong>Important distinction:</strong> BIM is the structured description of the building; the Digital Twin
            connects that information with operational data. A monitoring platform displays and stores readings, while
            an energy-management controller makes decisions. These functions can be integrated, but they are not the
            same thing and do not automatically come from Revit.
          </div>
        </section>

        <section className="hem-section">
          <h2>2. How the system works</h2>
          <p className="hem-lead">
            A practical residential solution is normally made up of five connected layers. The exact hardware and
            software depend on the inverter, battery, electrical installation, selected tariff and the level of control
            required by the homeowner.
          </p>
          <div className="hem-diagram mt-5">
            <div className="hem-diagram-top">
              <div className="hem-node"><div className="hem-node-icon"><Sun size={25} /></div><strong>Solar PV</strong><span>Generation and inverter data</span></div>
              <div className="hem-node"><div className="hem-node-icon"><BatteryCharging size={25} /></div><strong>Battery</strong><span>Charge, discharge and reserve</span></div>
              <div className="hem-node"><div className="hem-node-icon"><Gauge size={25} /></div><strong>Smart meters</strong><span>Import, export and consumption</span></div>
              <div className="hem-node"><div className="hem-node-icon"><Home size={25} /></div><strong>Home devices</strong><span>Heating, hot water and EV</span></div>
            </div>
            <div className="hem-down"><ArrowDownRight size={27} /></div>
            <div className="hem-twin">
              <div className="flex justify-center mb-2"><Network size={31} /></div>
              <strong className="text-xl">Connected Digital Twin &amp; Energy Data Platform</strong>
              <p>Building information from BIM + live measurements from equipment + external information such as weather forecasts and electricity tariffs.</p>
            </div>
            <div className="hem-down"><ArrowDownRight size={27} /></div>
            <div className="hem-diagram-top">
              <div className="hem-node"><div className="hem-node-icon"><CloudSun size={25} /></div><strong>Forecast</strong><span>Solar generation and weather</span></div>
              <div className="hem-node"><div className="hem-node-icon"><LineChart size={25} /></div><strong>Prediction</strong><span>Demand, prices and battery needs</span></div>
              <div className="hem-node"><div className="hem-node-icon"><BrainCircuit size={25} /></div><strong>Optimisation</strong><span>Compare operating strategies</span></div>
              <div className="hem-node"><div className="hem-node-icon"><Cpu size={25} /></div><strong>Control</strong><span>Commands to compatible devices</span></div>
            </div>
          </div>
          <p className="hem-small mt-3">Conceptual architecture. Actual data connections and control permissions must be checked for each manufacturer's equipment and installation.</p>
        </section>

        <section className="hem-section">
          <h2>3. What can an intelligent system manage?</h2>
          <p className="hem-lead">
            The objective is to coordinate generation, storage and flexible consumption rather than treating each
            piece of equipment as an isolated product.
          </p>
          <div className="hem-grid mt-5">
            {capabilities.map((item) => (
              <article className="hem-card" key={item.title}>
                <div className="hem-icon">{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="hem-section">
          <h2>4. Predictive battery management: should the battery be emptied before the sun comes out?</h2>
          <p className="hem-lead">
            One of the most interesting applications is to manage the battery using forecasts rather than waiting for
            the battery to fill or empty. The system can estimate how much solar energy is likely to be generated,
            how much the home will consume and what electricity will cost during the next tariff periods.
          </p>
          <div className="hem-grid two mt-5">
            <article className="hem-card">
              <div className="hem-icon"><Sun size={25} /></div>
              <h3>Preparing for a sunny day</h3>
              <p>
                If a high level of solar production is expected the next day, the controller may use some stored energy
                overnight or reduce grid charging so that more battery capacity is available for the coming solar
                surplus. It should only do this when the forecast, tariff and expected demand make the strategy worthwhile.
              </p>
            </article>
            <article className="hem-card">
              <div className="hem-icon"><Zap size={25} /></div>
              <h3>Preparing for an expensive period</h3>
              <p>
                If electricity prices are forecast to rise, the system may preserve stored energy for the expensive
                period, charge during a cheaper period or reduce flexible consumption. The preferred action depends
                on export payments, import prices, battery losses and the homeowner's reserve setting.
              </p>
            </article>
          </div>
          <div className="hem-callout hem-warning">
            <strong>Battery capacity should not be released automatically just because sunshine is forecast.</strong>
            Discharging has a cost: round-trip losses, battery cycling and possible loss of backup reserve. A good
            controller compares the expected value of the solar energy that could be stored with the value and cost
            of the energy used to create that free capacity. It also respects the battery manufacturer's operating limits.
          </div>
          <h3 className="mt-6">Example: a forecast-based operating strategy</h3>
          <div className="hem-example mt-4">
            <h3>A home with solar panels, a battery, an EV and a heat pump</h3>
            <p>
              The Digital Twin receives the weather forecast, the next tariff periods, the current battery state and
              the home's typical demand. It compares different scenarios and selects a schedule that meets the home's
              priorities while reducing unnecessary imports.
            </p>
            <div className="hem-timeline">
              <div className="hem-time"><strong>00:00–06:00</strong><span>Use low-price electricity only if charging the battery or another load is beneficial.</span></div>
              <div className="hem-time"><strong>06:00–10:00</strong><span>Maintain the chosen battery reserve and avoid unnecessary high-power demand.</span></div>
              <div className="hem-time"><strong>10:00–15:00</strong><span>Use solar surplus for the battery, hot water or EV charging, according to priorities.</span></div>
              <div className="hem-time"><strong>15:00–19:00</strong><span>Use stored energy strategically when solar production falls or electricity prices rise.</span></div>
              <div className="hem-time"><strong>19:00–24:00</strong><span>Recalculate the next plan using actual consumption and updated forecasts.</span></div>
            </div>
          </div>
        </section>

        <section className="hem-section">
          <h2>5. Real devices and platforms available for home energy management</h2>
          <p className="hem-lead">
            These are examples of real products and platforms that can form part of a residential system. They do not
            all perform the same function, and they are not automatically interoperable. Before specifying equipment,
            the installer or system designer should confirm the exact model, firmware, local interfaces, API access and
            control permissions.
          </p>
          <div className="hem-hardware mt-5">
            {hardware.map((item) => (
              <article className="hem-hardware-card" key={item.name}>
                <div className="hem-tag">{item.label}</div>
                <h3>{item.name}</h3>
                <div className="hem-small">{item.type}</div>
                <p>{item.description}</p>
                <div className="hem-use"><strong>Potential application:</strong> {item.use}</div>
                <a href={item.url} target="_blank" rel="noreferrer">Manufacturer or platform information <ArrowRight className="inline ml-1" size={14} /></a>
              </article>
            ))}
          </div>
          <div className="hem-callout mt-5">
            <strong>How these products fit together:</strong> a Shelly meter can provide electrical measurements;
            an inverter and battery provide generation and storage data; Home Assistant can bring supported devices
            together; tariff data can inform a scheduling strategy; and compatible equipment can execute commands.
            Autodesk Tandem or a custom digital-twin application can add the BIM and spatial context. The final
            architecture must be designed around the actual products selected for the property.
          </div>
        </section>

        <section className="hem-section">
          <h2>6. Why BIM and Revit are important</h2>
          <p className="hem-lead">
            This is where an architectural practice can add value. The Revit model can become the structured starting
            point for the home's operational Digital Twin. Instead of delivering only drawings and equipment schedules,
            the architect can prepare a coordinated information model that identifies the assets which will later be
            monitored and managed.
          </p>
          <div className="hem-grid two mt-5">
            <article className="hem-card">
              <div className="hem-icon"><Building2 size={25} /></div>
              <h3>What should be included in Revit?</h3>
              <p>
                Building spaces and zones; roof orientation and PV layout; panel and inverter references; battery
                location and capacity; electrical distribution; heat pump and hot-water equipment; EV charger;
                relevant meters and sensors; and the routes or systems needed to understand how the assets connect.
              </p>
            </article>
            <article className="hem-card">
              <div className="hem-icon"><Database size={25} /></div>
              <h3>What information should each asset contain?</h3>
              <p>
                A unique asset ID, manufacturer, model, serial or product reference where appropriate, rated capacity,
                location, installation date, warranty, maintenance information, communication protocol, data source
                and the identifier used by the monitoring platform. Sensitive credentials should never be stored in
                the BIM model.
              </p>
            </article>
          </div>
          <h3 className="mt-6">A possible Revit-to-Digital-Twin workflow</h3>
          <div className="hem-flow mt-4">
            {stages.map((stage) => (
              <div className="hem-flow-step" key={stage.number}>
                <div className="hem-flow-number">{stage.number}</div>
                <h3>{stage.title}</h3>
                <p>{stage.description}</p>
              </div>
            ))}
          </div>
          <div className="hem-callout mt-5">
            <strong>Autodesk Tandem is one possible bridge.</strong> Autodesk describes Tandem as a platform for
            connecting BIM information with operational systems. Its documentation supports Revit and IFC model
            import, asset properties and IoT data streams through its data capabilities. It can provide the spatial
            and asset context for operational data, but the energy optimisation and device-control logic may still
            need a separate Home Energy Management System (HEMS) or a bespoke integration.
          </div>
        </section>

        <section className="hem-section">
          <h2>7. What information does the system use to make decisions?</h2>
          <div className="hem-table-wrap mt-4">
            <table className="hem-table">
              <thead>
                <tr><th>Information source</th><th>Example data</th><th>How it is used</th></tr>
              </thead>
              <tbody>
                <tr><td>Solar PV and inverter</td><td>Current power, daily generation, inverter status</td><td>Estimate available solar energy and detect abnormal performance.</td></tr>
                <tr><td>Battery</td><td>State of charge, charge/discharge power, reserve and limits</td><td>Decide whether to charge, hold or discharge within manufacturer limits.</td></tr>
                <tr><td>Electricity meter</td><td>Import, export, instantaneous power and accumulated energy</td><td>Measure the home's actual energy balance.</td></tr>
                <tr><td>Weather service</td><td>Cloud cover, irradiance estimate, temperature and forecast</td><td>Predict PV generation and heating or cooling demand.</td></tr>
                <tr><td>Tariff provider</td><td>Current and future import/export prices</td><td>Compare the cost of using, storing or exporting electricity.</td></tr>
                <tr><td>Home equipment</td><td>EV charge request, hot-water temperature, heat-pump status</td><td>Identify loads that can be shifted without reducing comfort or safety.</td></tr>
                <tr><td>BIM / Revit model</td><td>Asset ID, room, system, orientation, capacity and product data</td><td>Identify where equipment is located and relate data to the building and its systems.</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="hem-section">
          <h2>8. From monitoring to predictive control</h2>
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
          <h2>9. What could an architectural studio provide?</h2>
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
          <h2>10. Is a Digital Twin suitable for every home?</h2>
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
const Settings2Fallback: React.FC = () => (
  <span aria-hidden="true" className="inline-flex items-center justify-center">
    <Wifi size={25} />
  </span>
);

export default Homeenergymanagement;
