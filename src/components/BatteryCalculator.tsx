import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  listSavedSolarProfiles,
  loadSolarProfileById,
  SavedSolarProfile,
  saveNamedBatteryProfile,
  listSavedBatteryProfiles,
  loadBatteryProfileById,
  deleteBatteryProfile,
  SavedBatteryProfile,
  BatterySizingMode,
} from '../utils/EnergyProfile';

// -------------------- DATA --------------------
// Orientative UK-market figures (hardware only, ex-installation labour).
// Chemistry notes are general guidance, not manufacturer specifications —
// always confirm exact figures against the datasheet of the unit quoted.
const BATTERY_CATALOG = {
  lfp_modular_ac: {
    name: 'LFP modular AC-coupled (e.g. GivEnergy / Growatt / Alpha ESS cabinet)',
    chemistry: 'LiFePO4 (LFP)',
    pricePerKwh: 350, // £ per nameplate kWh, hardware only
    typicalUnitKwh: 5.2,
    cycleLife: 6000,
    dod: 0.95,
    roundTripEfficiency: 0.95,
    weightPerKwhKg: 11,
    fireRisk: 'Low — thermally stable chemistry, still needs a certified installation',
    warrantyYears: 10,
  },
  lfp_integrated_hybrid: {
    name: 'LFP integrated hybrid, inverter built in (e.g. Tesla Powerwall‑style)',
    chemistry: 'LiFePO4 (LFP)',
    pricePerKwh: 430,
    typicalUnitKwh: 13.5,
    cycleLife: 6000,
    dod: 0.975,
    roundTripEfficiency: 0.9,
    weightPerKwhKg: 9.6,
    fireRisk: 'Low',
    warrantyYears: 10,
  },
  lfp_all_in_one: {
    name: 'LFP all‑in‑one cabinet, battery + hybrid inverter + EPS in one unit (e.g. GivEnergy AIO‑style)',
    chemistry: 'LiFePO4 (LFP)',
    pricePerKwh: 400,
    typicalUnitKwh: 8.2,
    cycleLife: 6000,
    dod: 0.95,
    roundTripEfficiency: 0.93,
    weightPerKwhKg: 12,
    fireRisk: 'Low',
    warrantyYears: 10,
  },
  lfp_stackable_high_capacity: {
    name: 'LFP stackable high‑capacity tower (e.g. Sonnen / Huawei LUNA‑style, expandable)',
    chemistry: 'LiFePO4 (LFP)',
    pricePerKwh: 460,
    typicalUnitKwh: 5.0,
    cycleLife: 8000,
    dod: 0.95,
    roundTripEfficiency: 0.94,
    weightPerKwhKg: 10.5,
    fireRisk: 'Low',
    warrantyYears: 10,
  },
  nmc_compact: {
    name: 'NMC compact wall‑mounted (entry‑level residential systems)',
    chemistry: 'NMC (Nickel Manganese Cobalt)',
    pricePerKwh: 300,
    typicalUnitKwh: 3.3,
    cycleLife: 4000,
    dod: 0.9,
    roundTripEfficiency: 0.92,
    weightPerKwhKg: 13,
    fireRisk: 'Moderate — higher energy density, more thermally sensitive than LFP; mind clearances',
    warrantyYears: 7,
  },
  nmc_high_density: {
    name: 'NMC high energy‑density (EV‑derived cells, compact footprint)',
    chemistry: 'NMC (Nickel Manganese Cobalt)',
    pricePerKwh: 340,
    typicalUnitKwh: 4.8,
    cycleLife: 3000,
    dod: 0.9,
    roundTripEfficiency: 0.93,
    weightPerKwhKg: 8,
    fireRisk: 'Moderate‑high — needs strict thermal management; mind fire‑rated enclosure rules',
    warrantyYears: 8,
  },
  sodium_ion_emerging: {
    name: 'Sodium‑ion (emerging technology, first residential units ~2025‑26)',
    chemistry: 'Sodium‑ion (Na‑ion)',
    pricePerKwh: 320,
    typicalUnitKwh: 5.0,
    cycleLife: 4000,
    dod: 0.9,
    roundTripEfficiency: 0.9,
    weightPerKwhKg: 14,
    fireRisk: 'Very low — inherently more thermally stable than lithium chemistries; supply/track record still limited',
    warrantyYears: 6,
  },
  saltwater_aqueous: {
    name: 'Saltwater / aqueous electrolyte (non‑flammable, niche availability)',
    chemistry: 'Saltwater (aqueous Na‑ion)',
    pricePerKwh: 380,
    typicalUnitKwh: 2.6,
    cycleLife: 3000,
    dod: 1.0,
    roundTripEfficiency: 0.8,
    weightPerKwhKg: 28,
    fireRisk: 'Very low — non‑flammable electrolyte; larger and heavier than lithium for the same usable kWh',
    warrantyYears: 5,
  },
  flow_vanadium: {
    name: 'Vanadium redox flow (long‑duration, whole‑house/off‑grid scale)',
    chemistry: 'Vanadium redox flow',
    pricePerKwh: 550,
    typicalUnitKwh: 10.0,
    cycleLife: 15000,
    dod: 1.0,
    roundTripEfficiency: 0.75,
    weightPerKwhKg: 25,
    fireRisk: 'Very low — non‑flammable liquid electrolyte, but large tanks and plant‑room space needed',
    warrantyYears: 10,
  },
  second_life_ev: {
    name: 'Second‑life EV battery pack (repurposed, budget large‑capacity)',
    chemistry: 'NMC or LFP (varies by donor EV)',
    pricePerKwh: 220,
    typicalUnitKwh: 20.0,
    cycleLife: 2500,
    dod: 0.8,
    roundTripEfficiency: 0.88,
    weightPerKwhKg: 10,
    fireRisk: 'Moderate — condition depends on the donor pack\u2019s history; ask for a health/degradation report',
    warrantyYears: 3,
  },
  lead_acid_offgrid: {
    name: 'Sealed lead‑acid / AGM (budget or off‑grid only)',
    chemistry: 'Lead‑acid (AGM)',
    pricePerKwh: 150,
    typicalUnitKwh: 2.4,
    cycleLife: 1200,
    dod: 0.5,
    roundTripEfficiency: 0.8,
    weightPerKwhKg: 33,
    fireRisk: 'Very low, but vents hydrogen while charging — needs a ventilated enclosure',
    warrantyYears: 3,
  },
  lead_acid_flooded_gel: {
    name: 'Flooded / Gel lead‑acid (traditional off‑grid, lowest upfront cost)',
    chemistry: 'Lead‑acid (Flooded/Gel)',
    pricePerKwh: 120,
    typicalUnitKwh: 2.0,
    cycleLife: 800,
    dod: 0.5,
    roundTripEfficiency: 0.75,
    weightPerKwhKg: 36,
    fireRisk: 'Very low, but flooded types need topping up and strong ventilation; shortest lifespan here',
    warrantyYears: 2,
  },
};
type BatteryKey = keyof typeof BATTERY_CATALOG;

// Assumed number of days per year a home battery can usefully complete a
// full useful cycle (accounts for low-generation winter days, cloudy
// spells, etc.) — used only to cap the financial "shifted kWh" estimate.
const USEFUL_CYCLE_DAYS_PER_YEAR = 300;

// -------------------- MAIN COMPONENT --------------------
const BatteryCalculator: React.FC = () => {
  const navigate = useNavigate();
  const calculatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.location.hash === '#battery-calculator') {
      setTimeout(() => {
        const el = document.getElementById('battery-calculator');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 200);
    }
  }, []);

  // --- Linked solar project ---
  const [solarProjects, setSolarProjects] = useState<SavedSolarProfile[]>([]);
  const [linkedSolarId, setLinkedSolarId] = useState<string>('');
  const [linkedSolar, setLinkedSolar] = useState<SavedSolarProfile | null>(null);

  useEffect(() => {
    setSolarProjects(listSavedSolarProfiles());
  }, []);

  const handleLinkSolar = (id: string) => {
    setLinkedSolarId(id);
    if (!id) {
      setLinkedSolar(null);
      return;
    }
    const saved = loadSolarProfileById(id);
    setLinkedSolar(saved);
    if (saved) {
      // Sensible defaults once a solar project is linked: use its export
      // surplus as the self-consumption sizing target and its self-
      // consumption as the backup critical load.
      setCriticalLoadKwhDay(Math.max(1, saved.data.selfConsumedKwhMonthly / 30));
    }
  };

  // --- Manual fallback values (used only when no solar project is linked) ---
  const [manualExportedKwhMonth, setManualExportedKwhMonth] = useState(0);
  const [manualImportTariff, setManualImportTariff] = useState(0.28);
  const [manualExportTariff, setManualExportTariff] = useState(0.09);

  // --- Battery selection & sizing ---
  const [batteryKey, setBatteryKey] = useState<BatteryKey>('lfp_modular_ac');
  const [sizingMode, setSizingMode] = useState<BatterySizingMode>('self_consumption');
  const [backupDays, setBackupDays] = useState(1);
  const [criticalLoadKwhDay, setCriticalLoadKwhDay] = useState(8);
  const [manualCapacityKwh, setManualCapacityKwh] = useState(10);

  // --- Household consumption profile (informs the suggested backup load) ---
  const [consumptionProfile, setConsumptionProfile] = useState<'low' | 'medium' | 'high'>('medium');
  const [futureIncrease, setFutureIncrease] = useState(false);
  const CONSUMPTION_ANNUAL_KWH: Record<'low' | 'medium' | 'high', number> = {
    low: 1800,
    medium: 2700,
    high: 4100,
  };
  const FUTURE_INCREASE_ANNUAL_KWH = 2500; // rough allowance for an added heat pump / more appliances

  const applyConsumptionProfile = (profile: 'low' | 'medium' | 'high', future: boolean) => {
    const annual = CONSUMPTION_ANNUAL_KWH[profile] + (future ? FUTURE_INCREASE_ANNUAL_KWH : 0);
    // Rough share of daily household consumption treated as "critical" backup
    // load (fridge, lighting, router, boiler controls) — about a third of
    // average daily use, editable afterwards.
    setCriticalLoadKwhDay(Math.round(((annual / 365) * 0.35) * 10) / 10);
  };

  // --- EV / bidirectional charging — modelled per vehicle from daily miles,
  // battery capacity and real‑world efficiency, not typed in directly ---
  const [numEVs, setNumEVs] = useState<0 | 1 | 2>(0);
  const [ev1BatteryKwh, setEv1BatteryKwh] = useState(60);
  const [ev1DailyMiles, setEv1DailyMiles] = useState(22);
  const [ev1EfficiencyMiPerKwh, setEv1EfficiencyMiPerKwh] = useState(3.8);
  const [ev2BatteryKwh, setEv2BatteryKwh] = useState(60);
  const [ev2DailyMiles, setEv2DailyMiles] = useState(22);
  const [ev2EfficiencyMiPerKwh, setEv2EfficiencyMiPerKwh] = useState(3.8);
  const [vehicleToHome, setVehicleToHome] = useState(false);

  const hasEV = numEVs > 0;
  const ev1DailyKwh = numEVs >= 1 ? ev1DailyMiles / Math.max(0.1, ev1EfficiencyMiPerKwh) : 0;
  const ev2DailyKwh = numEVs >= 2 ? ev2DailyMiles / Math.max(0.1, ev2EfficiencyMiPerKwh) : 0;
  const dailyEvKwh = ev1DailyKwh + ev2DailyKwh;

  // --- Save / load battery project (named, localStorage-based) ---
  const [projectName, setProjectName] = useState('');
  const [currentProfileId, setCurrentProfileId] = useState<string | null>(null);
  const [savedProjects, setSavedProjects] = useState<SavedBatteryProfile[]>([]);
  const [selectedLoadId, setSelectedLoadId] = useState<string>('');
  const [saveMessage, setSaveMessage] = useState<string>('');

  const refreshSavedProjects = () => setSavedProjects(listSavedBatteryProfiles());
  useEffect(() => {
    refreshSavedProjects();
  }, []);

  const battery = BATTERY_CATALOG[batteryKey];

  // -------------------- SIZING --------------------
  // Prefer the linked solar project's real export figure; fall back to the
  // manually entered value (never recomputed) when nothing is linked.
  const dailyExportedKwh = linkedSolar ? linkedSolar.data.exportedKwhMonthly / 30 : manualExportedKwhMonth / 30;

  const evBackupAddKwh = hasEV && !vehicleToHome ? dailyEvKwh : 0;

  let targetUsableKwh = 0;
  if (sizingMode === 'self_consumption') {
    targetUsableKwh = dailyExportedKwh;
  } else if (sizingMode === 'backup') {
    targetUsableKwh = criticalLoadKwhDay * backupDays + evBackupAddKwh * backupDays;
  } else {
    targetUsableKwh = manualCapacityKwh * battery.dod; // manual figure is treated as the nameplate size the user typed
  }

  const requiredNameplateKwh =
    sizingMode === 'manual' ? manualCapacityKwh : targetUsableKwh > 0 ? targetUsableKwh / battery.dod : 0;
  const usableKwh = requiredNameplateKwh * battery.dod;
  const totalCost = requiredNameplateKwh * battery.pricePerKwh;
  const totalWeightKg = requiredNameplateKwh * battery.weightPerKwhKg;
  const approxModules = requiredNameplateKwh > 0 ? Math.max(1, Math.ceil(requiredNameplateKwh / battery.typicalUnitKwh)) : 0;

  // -------------------- FINANCIALS (works with a linked solar project, or with manually entered figures) --------------------
  const annualExportedKwh = linkedSolar ? linkedSolar.data.exportedKwhMonthly * 12 : manualExportedKwhMonth * 12;
  const effectiveImportTariff = linkedSolar ? linkedSolar.data.importTariff : manualImportTariff;
  const effectiveExportTariff = linkedSolar ? linkedSolar.data.exportTariff : manualExportTariff;
  const hasFinancialInputs = linkedSolar !== null || manualExportedKwhMonth > 0;
  const annualShiftedKwh = hasFinancialInputs
    ? Math.min(annualExportedKwh, requiredNameplateKwh * battery.dod * battery.roundTripEfficiency * USEFUL_CYCLE_DAYS_PER_YEAR)
    : 0;
  const tariffSpread = hasFinancialInputs ? Math.max(0, effectiveImportTariff - effectiveExportTariff) : 0;
  const annualSavings = hasFinancialInputs ? annualShiftedKwh * tariffSpread : 0;
  const paybackYears = hasFinancialInputs && annualSavings > 0 ? totalCost / annualSavings : null;

  // -------------------- SAVE / LOAD PROJECT --------------------
  const handleSaveProject = () => {
    const name = projectName.trim();
    if (!name) {
      setSaveMessage('Give your battery project a name before saving.');
      return;
    }
    const data = {
      linkedSolarProfileId: linkedSolar ? linkedSolar.id : null,
      linkedSolarProfileName: linkedSolar ? linkedSolar.name : null,
      manualExportedKwhMonth,
      manualImportTariff,
      manualExportTariff,
      batteryKey,
      sizingMode,
      backupDays,
      criticalLoadKwhDay,
      manualCapacityKwh,
      consumptionProfile,
      futureIncrease,
      hasEV,
      numEVs,
      ev1BatteryKwh,
      ev1DailyMiles,
      ev1EfficiencyMiPerKwh,
      ev2BatteryKwh,
      ev2DailyMiles,
      ev2EfficiencyMiPerKwh,
      dailyEvKwh,
      vehicleToHome,
      requiredNameplateKwh,
      usableKwh,
      totalCost,
      totalWeightKg,
      approxModules,
      annualShiftedKwh,
      annualSavings,
      paybackYears,
    };
    const saved = saveNamedBatteryProfile(name, data, currentProfileId);
    setCurrentProfileId(saved.id);
    setProjectName(saved.name);
    refreshSavedProjects();
    setSaveMessage(`Saved "${saved.name}".`);
    setTimeout(() => setSaveMessage(''), 3000);
  };

  const handleLoadProject = (id: string) => {
    const saved = loadBatteryProfileById(id);
    if (!saved) return;
    const d = saved.data;

    if (d.linkedSolarProfileId) {
      handleLinkSolar(d.linkedSolarProfileId);
    } else {
      setLinkedSolarId('');
      setLinkedSolar(null);
    }
    setManualExportedKwhMonth(d.manualExportedKwhMonth ?? 0);
    setManualImportTariff(d.manualImportTariff ?? 0.28);
    setManualExportTariff(d.manualExportTariff ?? 0.09);
    setBatteryKey(d.batteryKey as BatteryKey);
    setSizingMode(d.sizingMode);
    setBackupDays(d.backupDays);
    setCriticalLoadKwhDay(d.criticalLoadKwhDay);
    setManualCapacityKwh(d.manualCapacityKwh);
    setConsumptionProfile(d.consumptionProfile ?? 'medium');
    setFutureIncrease(d.futureIncrease ?? false);
    setNumEVs((d.numEVs ?? (d.hasEV ? 1 : 0)) as 0 | 1 | 2);
    setEv1BatteryKwh(d.ev1BatteryKwh ?? 60);
    setEv1DailyMiles(d.ev1DailyMiles ?? 22);
    setEv1EfficiencyMiPerKwh(d.ev1EfficiencyMiPerKwh ?? 3.8);
    setEv2BatteryKwh(d.ev2BatteryKwh ?? 60);
    setEv2DailyMiles(d.ev2DailyMiles ?? 22);
    setEv2EfficiencyMiPerKwh(d.ev2EfficiencyMiPerKwh ?? 3.8);
    setVehicleToHome(d.vehicleToHome);

    setCurrentProfileId(saved.id);
    setProjectName(saved.name);
    setSelectedLoadId(saved.id);
    setSaveMessage(`Loaded "${saved.name}".`);
    setTimeout(() => setSaveMessage(''), 3000);
  };

  const handleDeleteProject = (id: string) => {
    deleteBatteryProfile(id);
    refreshSavedProjects();
    if (currentProfileId === id) {
      setCurrentProfileId(null);
      setProjectName('');
    }
    if (selectedLoadId === id) setSelectedLoadId('');
  };

  const handleNewProject = () => {
    setCurrentProfileId(null);
    setProjectName('');
    setSelectedLoadId('');
    setSaveMessage('');
  };

  // -------------------- RENDER --------------------
  return (
    <div
      ref={calculatorRef}
      id="battery-calculator"
      className="w-full bg-white shadow-lg scroll-mt-24 md:max-w-7xl md:mx-auto md:p-6 md:rounded-xl p-0 rounded-none"
    >
      <Helmet>
        <title>Home Battery Calculator UK | Sizing, Weight, Cost & Certification – DB+</title>

        <meta
          name="description"
          content="Free interactive home battery calculator: compare LFP, NMC and lead‑acid battery types, size a system against your solar generation or backup needs, and see weight, cost, payback and UK certification requirements."
        />

        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: 'DB+ Home Battery Calculator',
            applicationCategory: 'UtilitiesApplication',
            operatingSystem: 'Any (web browser)',
            description:
              'Interactive tool to compare home battery chemistries, size a battery system against solar generation or backup needs, and estimate weight, cost, savings and UK MCS/Part P certification requirements.',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'GBP',
            },
            provider: {
              '@type': 'Organization',
              name: 'DB+ Design & Management',
              url: 'https://dbsdesigner.com',
            },
          })}
        </script>
      </Helmet>

      <div className="flex justify-start mb-4 px-4 md:px-0 pt-4 md:pt-0">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-red-600 border border-gray-300 rounded-md"
        >
          ← Back to Home Insight
        </button>
      </div>

      <div className="mx-4 md:mx-0 mb-6 p-4 bg-gray-100 rounded-lg border border-gray-300 text-sm text-gray-700">
        <p className="font-semibold mb-2">📐 How we calculate this</p>
        <p className="mb-1">
          <strong>Nameplate capacity (kWh)</strong> = target usable energy ÷ Depth of Discharge (DoD) of the chosen
          chemistry.
        </p>
        <p className="mb-1">
          <strong>Weight (kg)</strong> = nameplate capacity × weight‑per‑kWh of the chosen chemistry. <strong>Cost</strong> =
          nameplate capacity × price‑per‑kWh (hardware only, excludes installation labour).
        </p>
        <p>
          <strong>Annual saving</strong> (only with a linked solar project) = min(your annual exported kWh, what the battery
          can physically cycle in a year) × (import tariff − export tariff).
        </p>
      </div>

      {/* Section 0: Link a solar project + save/load this battery project */}
      <div className="bg-gray-800 rounded-lg p-4 mb-6 mx-4 md:mx-0">
        <h3 className="font-bold text-xl mb-3 text-white">0. Project</h3>

        <div className="mb-4">
          <label className="text-white text-sm">Link a saved solar project (optional, but needed for savings/payback)</label>
          <select
            value={linkedSolarId}
            onChange={(e) => handleLinkSolar(e.target.value)}
            className="border p-2 rounded w-full bg-gray-100 text-gray-800 mt-1"
          >
            <option value="">— No solar project linked (sizing/weight only) —</option>
            {solarProjects.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} ({p.data.totalAnnualKwh.toFixed(0)} kWh/yr, {new Date(p.updatedAt).toLocaleDateString()})
              </option>
            ))}
          </select>
          {solarProjects.length === 0 && (
            <p className="text-xs text-gray-400 mt-1">
              No saved solar projects found in this browser yet. Run and save a project in the Solar Panel Calculator first
              if you want automatic sizing and savings figures — or enter your own figures manually below.
            </p>
          )}
          {linkedSolar && (
            <div className="mt-3 text-sm text-gray-200 bg-gray-700 rounded-lg p-3 space-y-2">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <p className="font-semibold text-white">
                  📋 Linked project: {linkedSolar.name}
                  <span className="text-xs text-gray-400 font-normal ml-2">
                    ({linkedSolar.data.country}, {linkedSolar.data.region} region)
                  </span>
                </p>
                <button
                  onClick={() => navigate(`/solar-calculator?project=${linkedSolar.id}#solar-calculator`)}
                  className="text-xs bg-white text-gray-900 px-3 py-1.5 rounded-md font-medium hover:bg-gray-200"
                >
                  ✏️ Edit this solar project
                </button>
              </div>
              <p className="text-xs text-gray-400">
                These figures are taken exactly as saved by the Solar Panel Calculator — nothing here is recalculated.
                Use "Edit" to open it there and change roof, panels, inverter or tariffs, then come back and re‑link.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                <div className="bg-gray-800 rounded p-2">
                  <p className="text-gray-400">Panels — Roof A</p>
                  <p className="text-white font-semibold">
                    {linkedSolar.data.panelsRoofA !== undefined ? linkedSolar.data.panelsRoofA : '—'}
                  </p>
                </div>
                <div className="bg-gray-800 rounded p-2">
                  <p className="text-gray-400">Panels — Roof B</p>
                  <p className="text-white font-semibold">
                    {linkedSolar.data.panelsRoofB !== undefined ? linkedSolar.data.panelsRoofB : '—'}
                  </p>
                </div>
                <div className="bg-gray-800 rounded p-2">
                  <p className="text-gray-400">Total panels</p>
                  <p className="text-white font-semibold">{linkedSolar.data.totalPanelsCount}</p>
                </div>
                <div className="bg-gray-800 rounded p-2">
                  <p className="text-gray-400">Total power</p>
                  <p className="text-white font-semibold">{linkedSolar.data.totalWp.toFixed(0)} Wp</p>
                </div>
                <div className="bg-gray-800 rounded p-2">
                  <p className="text-gray-400">Inverter</p>
                  <p className="text-white font-semibold">{linkedSolar.data.inverterName || '—'}</p>
                </div>
                <div className="bg-gray-800 rounded p-2">
                  <p className="text-gray-400">Annual generation</p>
                  <p className="text-white font-semibold">{linkedSolar.data.totalAnnualKwh.toFixed(0)} kWh/yr</p>
                </div>
                <div className="bg-gray-800 rounded p-2">
                  <p className="text-gray-400">Solar install cost</p>
                  <p className="text-white font-semibold">£{linkedSolar.data.totalInstallCost.toFixed(0)}</p>
                </div>
                <div className="bg-gray-800 rounded p-2">
                  <p className="text-gray-400">Self‑consumed</p>
                  <p className="text-white font-semibold">{linkedSolar.data.selfConsumedKwhMonthly.toFixed(1)} kWh/mo</p>
                </div>
                <div className="bg-gray-800 rounded p-2">
                  <p className="text-gray-400">Grid purchase</p>
                  <p className="text-white font-semibold">{linkedSolar.data.gridPurchaseKwhMonthly.toFixed(1)} kWh/mo</p>
                </div>
                <div className="bg-gray-800 rounded p-2">
                  <p className="text-gray-400">Exported</p>
                  <p className="text-white font-semibold">{linkedSolar.data.exportedKwhMonthly.toFixed(1)} kWh/mo</p>
                </div>
                <div className="bg-gray-800 rounded p-2">
                  <p className="text-gray-400">Import tariff</p>
                  <p className="text-white font-semibold">£{linkedSolar.data.importTariff.toFixed(3)}/kWh</p>
                </div>
                <div className="bg-gray-800 rounded p-2">
                  <p className="text-gray-400">Export tariff</p>
                  <p className="text-white font-semibold">£{linkedSolar.data.exportTariff.toFixed(3)}/kWh</p>
                </div>
              </div>
              {(linkedSolar.data.panelsRoofA === undefined) && (
                <p className="text-xs text-yellow-300">
                  ⚠️ This project was saved before per‑roof panel counts were tracked — reopen and re‑save it in the Solar
                  Panel Calculator to fill in the Roof A/B figures above.
                </p>
              )}
            </div>
          )}

          {!linkedSolar && (
            <div className="mt-3 bg-gray-700 rounded-lg p-3">
              <p className="text-sm text-white font-medium mb-1">Or enter your own figures manually</p>
              <p className="text-xs text-gray-400 mb-2">
                No solar project needed — type in your own numbers (e.g. from a quote, your inverter app, or an estimate).
                These are used exactly as entered, not recalculated.
              </p>
              <div className="grid md:grid-cols-3 gap-3 text-sm">
                <div>
                  <label className="text-white">Exported surplus (kWh/month)</label>
                  <input
                    type="number"
                    step="1"
                    value={manualExportedKwhMonth}
                    onChange={(e) => setManualExportedKwhMonth(parseFloat(e.target.value) || 0)}
                    className="border p-2 rounded w-full bg-gray-100 text-gray-800"
                  />
                </div>
                <div>
                  <label className="text-white">Import tariff (£/kWh)</label>
                  <input
                    type="number"
                    step="0.001"
                    value={manualImportTariff}
                    onChange={(e) => setManualImportTariff(parseFloat(e.target.value) || 0)}
                    className="border p-2 rounded w-full bg-gray-100 text-gray-800"
                  />
                </div>
                <div>
                  <label className="text-white">Export tariff (£/kWh)</label>
                  <input
                    type="number"
                    step="0.001"
                    value={manualExportTariff}
                    onChange={(e) => setManualExportTariff(parseFloat(e.target.value) || 0)}
                    className="border p-2 rounded w-full bg-gray-100 text-gray-800"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        <p className="text-xs text-gray-300 mb-3">
          Saved locally in this browser under a project name — no account needed yet. Give this battery calculation a name
          so you can reopen it later.
        </p>
        <div className="grid md:grid-cols-3 gap-3 items-end">
          <div className="md:col-span-1">
            <label className="text-white text-sm">Battery project name</label>
            <input
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="e.g. Casa Corby – 10kWh LFP"
              className="border p-2 rounded w-full bg-gray-100 text-gray-800"
            />
          </div>
          <div className="md:col-span-1 flex gap-2">
            <button
              onClick={handleSaveProject}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium"
            >
              {currentProfileId ? 'Update project' : 'Save project'}
            </button>
            <button
              onClick={handleNewProject}
              className="border border-white/30 text-white px-4 py-2 rounded-md text-sm hover:bg-white hover:text-black transition-colors"
            >
              New
            </button>
          </div>
          <div className="md:col-span-1">
            <label className="text-white text-sm">Reopen a saved battery project</label>
            <select
              value={selectedLoadId}
              onChange={(e) => {
                setSelectedLoadId(e.target.value);
                if (e.target.value) handleLoadProject(e.target.value);
              }}
              className="border p-2 rounded w-full bg-gray-100 text-gray-800"
            >
              <option value="">— Select a saved project —</option>
              {savedProjects.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} ({new Date(p.updatedAt).toLocaleDateString()})
                </option>
              ))}
            </select>
          </div>
        </div>

        {saveMessage && <p className="text-green-300 text-sm mt-2">{saveMessage}</p>}

        {savedProjects.length > 0 && (
          <div className="mt-3 border-t border-gray-600 pt-3">
            <p className="text-white text-sm font-medium mb-2">Your saved battery projects</p>
            <div className="space-y-1">
              {savedProjects.map((p) => (
                <div key={p.id} className="flex items-center justify-between bg-gray-700 rounded px-3 py-2 text-sm">
                  <span className="text-white">
                    {p.name}
                    <span className="text-gray-400 ml-2">
                      · {p.data.requiredNameplateKwh.toFixed(1)} kWh · {p.data.totalWeightKg.toFixed(0)} kg
                    </span>
                  </span>
                  <div className="flex gap-2">
                    <button onClick={() => handleLoadProject(p.id)} className="text-blue-300 hover:text-blue-100 text-xs underline">
                      Open
                    </button>
                    <button onClick={() => handleDeleteProject(p.id)} className="text-red-300 hover:text-red-100 text-xs underline">
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Section 1: Battery type */}
      <div className="bg-gray-800 rounded-lg p-4 mb-6 mx-4 md:mx-0">
        <h3 className="font-bold text-xl mb-3 text-white">1. Battery type</h3>
        <select
          value={batteryKey}
          onChange={(e) => setBatteryKey(e.target.value as BatteryKey)}
          className="border p-2 rounded w-full bg-gray-100 text-gray-800 mb-3"
        >
          {(Object.keys(BATTERY_CATALOG) as BatteryKey[]).map((key) => (
            <option key={key} value={key}>
              {BATTERY_CATALOG[key].name}
            </option>
          ))}
        </select>
        <div className="grid md:grid-cols-3 gap-3 text-sm">
          <div className="bg-gray-700 p-3 rounded">
            <p className="text-gray-300">Chemistry</p>
            <p className="text-white font-semibold">{battery.chemistry}</p>
          </div>
          <div className="bg-gray-700 p-3 rounded">
            <p className="text-gray-300">Depth of Discharge (DoD)</p>
            <p className="text-white font-semibold">{(battery.dod * 100).toFixed(0)}%</p>
          </div>
          <div className="bg-gray-700 p-3 rounded">
            <p className="text-gray-300">Round‑trip efficiency</p>
            <p className="text-white font-semibold">{(battery.roundTripEfficiency * 100).toFixed(0)}%</p>
          </div>
          <div className="bg-gray-700 p-3 rounded">
            <p className="text-gray-300">Cycle life</p>
            <p className="text-white font-semibold">~{battery.cycleLife.toLocaleString()} cycles</p>
          </div>
          <div className="bg-gray-700 p-3 rounded">
            <p className="text-gray-300">Weight</p>
            <p className="text-white font-semibold">~{battery.weightPerKwhKg} kg/kWh</p>
          </div>
          <div className="bg-gray-700 p-3 rounded">
            <p className="text-gray-300">Typical unit size</p>
            <p className="text-white font-semibold">{battery.typicalUnitKwh} kWh/module</p>
          </div>
        </div>
        <p className="text-xs text-gray-300 mt-3">🔥 Fire/safety note: {battery.fireRisk}</p>
        <p className="text-xs text-gray-400 mt-1">
          Figures are orientative UK‑market averages (hardware only) — always check the exact datasheet of the unit your
          installer quotes.
        </p>
      </div>

      {/* Section 2: Sizing */}
      <div className="bg-gray-800 rounded-lg p-4 mb-6 mx-4 md:mx-0">
        <h3 className="font-bold text-xl mb-3 text-white">2. Sizing</h3>
        <div className="flex flex-wrap gap-3 mb-4">
          {(
            [
              ['self_consumption', 'Capture my solar surplus'],
              ['backup', 'Backup / resilience (days of autonomy)'],
              ['manual', 'Enter a capacity myself'],
            ] as [BatterySizingMode, string][]
          ).map(([mode, label]) => (
            <button
              key={mode}
              onClick={() => setSizingMode(mode)}
              className={`px-3 py-2 rounded-md text-sm font-medium border ${
                sizingMode === mode ? 'bg-red-600 border-red-600 text-white' : 'border-white/30 text-white hover:bg-white hover:text-black'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {sizingMode === 'self_consumption' && (
          <div className="text-sm text-white">
            {linkedSolar ? (
              <p>
                Sizing to capture the <strong>{dailyExportedKwh.toFixed(1)} kWh/day</strong> currently exported at low tariff
                by <strong>{linkedSolar.name}</strong>, so it's stored and self‑consumed instead of sold to the grid.
              </p>
            ) : manualExportedKwhMonth > 0 ? (
              <p>
                Sizing to capture the <strong>{dailyExportedKwh.toFixed(1)} kWh/day</strong> you entered manually in
                Section 0.
              </p>
            ) : (
              <p className="text-yellow-300">
                Link a saved solar project, or enter an exported surplus manually in Section 0, to size against a real
                figure — otherwise this mode has nothing to size against.
              </p>
            )}
          </div>
        )}

        {sizingMode === 'backup' && (
          <div>
            <div className="mb-3">
              <label className="text-white text-sm">Household consumption profile</label>
              <div className="flex flex-wrap gap-2 mt-1">
                {(
                  [
                    ['low', 'Low (small/efficient home)'],
                    ['medium', 'Medium (typical UK home)'],
                    ['high', 'High (large home / high use)'],
                  ] as ['low' | 'medium' | 'high', string][]
                ).map(([level, label]) => (
                  <button
                    key={level}
                    onClick={() => {
                      setConsumptionProfile(level);
                      applyConsumptionProfile(level, futureIncrease);
                    }}
                    className={`px-3 py-1.5 rounded-md text-xs font-medium border ${
                      consumptionProfile === level
                        ? 'bg-red-600 border-red-600 text-white'
                        : 'border-white/30 text-white hover:bg-white hover:text-black'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
              <label className="flex items-center gap-2 text-white text-xs mt-2">
                <input
                  type="checkbox"
                  checked={futureIncrease}
                  onChange={(e) => {
                    setFutureIncrease(e.target.checked);
                    applyConsumptionProfile(consumptionProfile, e.target.checked);
                  }}
                />
                Planning a heat pump or other big new electric load soon (future‑proof the sizing)
              </label>
              <p className="text-xs text-gray-400 mt-1">
                Suggests a critical‑load figure below (~⅓ of typical daily use — fridge, lighting, router, boiler
                controls). Adjust it freely; it's a starting point, not a fixed rule.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-3 text-sm">
              <div>
                <label className="text-white">Critical daily load to cover (kWh/day)</label>
                <input
                  type="number"
                  step="0.5"
                  value={criticalLoadKwhDay}
                  onChange={(e) => setCriticalLoadKwhDay(parseFloat(e.target.value))}
                  className="border p-2 rounded w-full bg-gray-100 text-gray-800"
                />
                <p className="text-xs text-gray-400 mt-1">
                  Fridge, lighting, router, boiler controls etc. — not the whole house. Typical UK home: 3–5 kWh/day for
                  essentials only.
                </p>
              </div>
              <div>
                <label className="text-white">Days of autonomy wanted</label>
                <input
                  type="number"
                  step="0.5"
                  value={backupDays}
                  onChange={(e) => setBackupDays(parseFloat(e.target.value))}
                  className="border p-2 rounded w-full bg-gray-100 text-gray-800"
                />
              </div>
            </div>
          </div>
        )}

        {sizingMode === 'manual' && (
          <div className="text-sm">
            <label className="text-white">Nameplate capacity (kWh)</label>
            <input
              type="number"
              step="0.5"
              value={manualCapacityKwh}
              onChange={(e) => setManualCapacityKwh(parseFloat(e.target.value))}
              className="border p-2 rounded w-full bg-gray-100 text-gray-800"
            />
          </div>
        )}

        <div className="mt-4 border-t border-gray-600 pt-3">
          <label className="text-white text-sm">Electric vehicles at home</label>
          <div className="flex flex-wrap gap-2 mt-1 mb-3">
            {([0, 1, 2] as const).map((n) => (
              <button
                key={n}
                onClick={() => setNumEVs(n)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium border ${
                  numEVs === n ? 'bg-red-600 border-red-600 text-white' : 'border-white/30 text-white hover:bg-white hover:text-black'
                }`}
              >
                {n === 0 ? 'No EV' : n === 1 ? '1 EV' : '2 EVs'}
              </button>
            ))}
          </div>

          {numEVs >= 1 && (
            <div className="mb-3 bg-gray-700 rounded p-3">
              <p className="text-white text-sm font-medium mb-2">🚗 Vehicle 1</p>
              <div className="grid md:grid-cols-3 gap-3 text-sm">
                <div>
                  <label className="text-white text-xs">Battery capacity (kWh)</label>
                  <input
                    type="number"
                    step="1"
                    value={ev1BatteryKwh}
                    onChange={(e) => setEv1BatteryKwh(parseFloat(e.target.value) || 0)}
                    className="border p-2 rounded w-full bg-gray-100 text-gray-800"
                  />
                </div>
                <div>
                  <label className="text-white text-xs">Daily miles driven</label>
                  <input
                    type="number"
                    step="1"
                    value={ev1DailyMiles}
                    onChange={(e) => setEv1DailyMiles(parseFloat(e.target.value) || 0)}
                    className="border p-2 rounded w-full bg-gray-100 text-gray-800"
                  />
                </div>
                <div>
                  <label className="text-white text-xs">Efficiency (miles/kWh)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={ev1EfficiencyMiPerKwh}
                    onChange={(e) => setEv1EfficiencyMiPerKwh(parseFloat(e.target.value) || 3.8)}
                    className="border p-2 rounded w-full bg-gray-100 text-gray-800"
                  />
                </div>
              </div>
              <p className="text-xs text-gray-400 mt-1">
                ≈ {ev1DailyKwh.toFixed(1)} kWh/day to charge (UK average: ~22 miles/day, ~3.5‑4.0 mi/kWh).
              </p>
            </div>
          )}

          {numEVs >= 2 && (
            <div className="mb-3 bg-gray-700 rounded p-3">
              <p className="text-white text-sm font-medium mb-2">🚗 Vehicle 2</p>
              <div className="grid md:grid-cols-3 gap-3 text-sm">
                <div>
                  <label className="text-white text-xs">Battery capacity (kWh)</label>
                  <input
                    type="number"
                    step="1"
                    value={ev2BatteryKwh}
                    onChange={(e) => setEv2BatteryKwh(parseFloat(e.target.value) || 0)}
                    className="border p-2 rounded w-full bg-gray-100 text-gray-800"
                  />
                </div>
                <div>
                  <label className="text-white text-xs">Daily miles driven</label>
                  <input
                    type="number"
                    step="1"
                    value={ev2DailyMiles}
                    onChange={(e) => setEv2DailyMiles(parseFloat(e.target.value) || 0)}
                    className="border p-2 rounded w-full bg-gray-100 text-gray-800"
                  />
                </div>
                <div>
                  <label className="text-white text-xs">Efficiency (miles/kWh)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={ev2EfficiencyMiPerKwh}
                    onChange={(e) => setEv2EfficiencyMiPerKwh(parseFloat(e.target.value) || 3.8)}
                    className="border p-2 rounded w-full bg-gray-100 text-gray-800"
                  />
                </div>
              </div>
              <p className="text-xs text-gray-400 mt-1">
                ≈ {ev2DailyKwh.toFixed(1)} kWh/day to charge.
              </p>
            </div>
          )}

          {hasEV && (
            <>
              <label className="flex items-center gap-2 text-white text-sm">
                <input type="checkbox" checked={vehicleToHome} onChange={(e) => setVehicleToHome(e.target.checked)} />
                At least one vehicle has a bidirectional (V2H/V2G) charger
              </label>
              <p className="text-xs text-gray-300 mt-2">
                Combined EV charging demand: <strong>{dailyEvKwh.toFixed(1)} kWh/day</strong>.
              </p>
              {!vehicleToHome ? (
                <p className="text-xs text-gray-400 mt-1">
                  Added to your backup target in "Backup / resilience" mode. Without V2H, the EV only draws from the home
                  battery — it doesn't add storage.
                </p>
              ) : (
                <p className="text-xs text-yellow-300 mt-1">
                  With a V2H/V2G‑capable charger, the EV's own battery can act as extra home storage — but check with the
                  vehicle and charger manufacturer whether this is supported and whether it affects your battery warranty
                  before relying on it for sizing.
                </p>
              )}
            </>
          )}
        </div>
      </div>

      {/* Section 3: Results */}
      <div className="bg-black text-white p-6 rounded-lg mx-4 md:mx-0 mb-6">
        <h3 className="font-bold text-2xl mb-4">📊 Sizing results</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="bg-gray-900 p-3 rounded-lg text-center">
            <p className="text-sm text-gray-400">Nameplate capacity</p>
            <p className="text-2xl font-bold text-yellow-400">{requiredNameplateKwh.toFixed(1)} kWh</p>
          </div>
          <div className="bg-gray-900 p-3 rounded-lg text-center">
            <p className="text-sm text-gray-400">Usable capacity (after DoD)</p>
            <p className="text-2xl font-bold text-green-400">{usableKwh.toFixed(1)} kWh</p>
          </div>
          <div className="bg-gray-900 p-3 rounded-lg text-center">
            <p className="text-sm text-gray-400">Approx. modules needed</p>
            <p className="text-2xl font-bold text-blue-400">{approxModules}</p>
          </div>
          <div className="bg-gray-900 p-3 rounded-lg text-center">
            <p className="text-sm text-gray-400">Total weight</p>
            <p className="text-2xl font-bold text-white">{totalWeightKg.toFixed(0)} kg</p>
          </div>
          <div className="bg-gray-900 p-3 rounded-lg text-center">
            <p className="text-sm text-gray-400">Hardware cost (est.)</p>
            <p className="text-2xl font-bold text-red-400">£{totalCost.toFixed(0)}</p>
          </div>
          <div className="bg-gray-900 p-3 rounded-lg text-center">
            <p className="text-sm text-gray-400">Warranty (typical)</p>
            <p className="text-2xl font-bold text-white">{battery.warrantyYears} yrs</p>
          </div>
        </div>
        <p className="text-xs text-gray-400">
          Weight matters for where it can be sited: check the manufacturer's fixing detail and, for wall‑mounted units, get
          confirmation the wall/floor can take the point load — this is exactly the kind of check our MEP team does as
          part of a battery installation design.
        </p>
      </div>

      {/* Section 4: Financial analysis */}
      <div className="bg-gray-800 rounded-lg p-4 mb-6 mx-4 md:mx-0">
        <h3 className="font-bold text-xl mb-3 text-white">4. Financial analysis</h3>
        {hasFinancialInputs ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-700 p-3 rounded-lg text-center">
              <p className="text-sm text-gray-300">Shifted from export → self‑use</p>
              <p className="text-2xl font-bold text-green-400">{annualShiftedKwh.toFixed(0)} kWh/yr</p>
            </div>
            <div className="bg-gray-700 p-3 rounded-lg text-center">
              <p className="text-sm text-gray-300">Estimated annual saving</p>
              <p className="text-2xl font-bold text-green-400">£{annualSavings.toFixed(0)}</p>
            </div>
            <div className="bg-gray-700 p-3 rounded-lg text-center">
              <p className="text-sm text-gray-300">Payback period</p>
              <p className="text-2xl font-bold text-yellow-400">{paybackYears ? `${paybackYears.toFixed(1)} yrs` : '—'}</p>
            </div>
          </div>
        ) : (
          <p className="text-sm text-yellow-300">
            Link a saved solar project, or enter your export/tariff figures manually, in Section 0 to see estimated
            savings and payback — without either, this is sizing and cost only (e.g. a pure backup/off‑grid battery
            with no solar array to compare against).
          </p>
        )}
      </div>

      {/* Section 5: Placement & installation guidance */}
      <div className="mx-4 md:mx-0 mb-6 p-4 bg-gray-100 rounded-lg border border-gray-300 text-sm text-gray-700">
        <h3 className="font-bold text-lg mb-3 text-gray-900">5. Where can it go?</h3>
        <ul className="list-disc pl-5 space-y-1">
          <li>Not in a bedroom, and not blocking an escape route — this applies to lithium and lead‑acid systems alike.</li>
          <li>Keep manufacturer‑specified clearances around the unit for ventilation and heat dissipation.</li>
          <li>
            Attached garages and utility rooms are common locations in the UK; some manufacturers restrict siting directly
            below or above habitable rooms, or require a fire‑rated enclosure in that case.
          </li>
          <li>Outdoor installation needs an IP‑rated enclosure and protection from direct sun and flooding.</li>
          <li>Lead‑acid batteries vent hydrogen while charging and need active or passive ventilation — never a sealed cupboard.</li>
          <li>Wall‑mounted units need the wall (and, for heavier lithium cabinets, sometimes the floor) checked for point‑load capacity — see the weight figure in Section 3.</li>
        </ul>
        <p className="text-xs text-gray-500 mt-3">
          General good‑practice guidance, not a substitute for the manufacturer's installation manual or a site‑specific
          design.
        </p>
      </div>

      {/* Section 6: Certification & DIY */}
      <div className="mx-4 md:mx-0 mb-6 p-4 bg-gray-100 rounded-lg border border-gray-300 text-sm text-gray-700">
        <h3 className="font-bold text-lg mb-3 text-gray-900">6. Certification — can I install it myself?</h3>
        <p className="mb-2">
          <strong>Grid‑connected battery (AC‑coupled or via a hybrid inverter):</strong> in the UK this needs an{' '}
          <strong>MCS‑certified installer</strong>, compliance with <strong>Building Regs Part P</strong> for the electrical
          work, and notification to the local electricity network operator (DNO) under <strong>G98</strong> for small,
          deemed‑compliant systems, or prior approval under <strong>G99</strong> for larger installations. This isn't
          something a homeowner can self‑certify — it's a safety requirement (arc‑fault and thermal‑runaway risk) as well
          as a condition of most manufacturer warranties, home insurance policies and mortgage lenders.
        </p>
        <p className="mb-2">
          <strong>Small stand‑alone off‑grid systems</strong> (e.g. a portable power station, or a battery/panel set not
          wired into the property's fixed installation or export meter) can generally be installed and used by a
          competent homeowner — because it isn't connected to the grid or the house wiring, the Part P/MCS/DNO
          requirements above don't apply in the same way.
        </p>
        <p>
          Keep the installer's <strong>MCS certificate</strong> and the <strong>DNO acknowledgement</strong> — you'll need
          them for home insurance, any export tariff application, and when selling the property.
        </p>
        <p className="text-xs text-gray-500 mt-3">
          General information, not legal advice — requirements can vary by network operator, property type and system
          size; confirm the specifics for your project with your installer and DNO.
        </p>
      </div>
    </div>
  );
};

export default BatteryCalculator;
