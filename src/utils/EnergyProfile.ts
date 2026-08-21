// src/utils/energyProfile.ts
//
// Named, multi-save handoff between SolarPanelCalculator and the future
// BatteryCalculator.
//
// The user can save as many solar calculations as they want, each under its
// own project name (e.g. "Casa Corby - south roof", "Second home - Spain").
// Each saved record stores BOTH:
//   (a) the raw roof inputs, so SolarPanelCalculator can fully reopen and
//       keep editing a previous project, and
//   (b) the computed results, so BatteryCalculator can use them directly
//       without needing to re-run the solar calculation logic.
//
// Storage: browser localStorage, client-side only. Safe on this static
// (vite-react-ssg) site because all reads/writes happen inside useEffect /
// event handlers, never during the SSR build pass.
//
// NOTE: no user accounts yet — everything is scoped to the current browser.
// User/password + server-side storage is a planned future step.

export const PROFILES_KEY = 'dbplus_solar_profiles_v1';
export const LAST_PROFILE_ID_KEY = 'dbplus_solar_last_profile_id';
export const PROFILE_DATA_VERSION = 2;

export interface SeasonalKwh {
  spring: number;
  summer: number;
  autumn: number;
  winter: number;
}

export interface ObstacleInput {
  x: number;
  z: number;
}

/** Raw inputs for a single roof (A or B), as used by SolarPanelCalculator. */
export interface RoofInput {
  length: number;
  width: number;
  panelKey: string; // key into PANEL_CATALOG_BASE
  obstacles: ObstacleInput[];
  orientationDeg: number;
  enablePitch: boolean;
  tiltDeg: number;
  shadingPercent: number;
}

/** The full solar calculation: raw inputs + computed results. */
export interface SolarEnergyProfileData {
  version: number;

  // Location & tariffs
  country: string;
  region: 'north' | 'south';
  importTariff: number; // currency/kWh
  exportTariff: number; // currency/kWh
  standingCharge: number; // currency/month

  // Raw roof inputs (lets SolarPanelCalculator fully reopen a project)
  roofA: RoofInput;
  roofBEnabled: boolean;
  roofB: RoofInput;

  // Inverter & cost inputs
  inverterType: string;
  dualInverter: boolean;
  manualInverterCost: number | null;
  useManualPanelPrice: boolean;
  minPanelPrice: number;
  incrementalCostPerPanel: number;
  mountingCost: number;
  buildingHeight: '1' | '2' | '3';
  scaffoldingCost: number;
  electricalCost: number;
  adminCost: number;
  includeMaintenance: boolean;
  cleaningCost3Years: number;
  electricalInspection3Years: number;
  standbyPowerW: number;

  // Self-consumption split
  selfConsumptionPercent: number;

  // -------- Computed results (denormalised for BatteryCalculator) --------
  totalPanelsCount: number;
  totalWp: number;
  totalInstallCost: number;
  totalAnnualKwh: number;
  avgMonthlyGeneration: number;
  seasonalKwh: SeasonalKwh; // combined Roof A + Roof B, annual totals
  selfConsumedKwhMonthly: number;
  gridPurchaseKwhMonthly: number;
  exportedKwhMonthly: number;
}

/** A named, saved calculation as stored in localStorage. */
export interface SavedSolarProfile {
  id: string;
  name: string;
  createdAt: string; // ISO date
  updatedAt: string; // ISO date
  data: SolarEnergyProfileData;
}

// -------------------- internal helpers --------------------

function readAll(): SavedSolarProfile[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(PROFILES_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (p): p is SavedSolarProfile =>
        p && typeof p === 'object' && typeof p.id === 'string' && p.data?.version === PROFILE_DATA_VERSION
    );
  } catch {
    return [];
  }
}

function writeAll(list: SavedSolarProfile[]): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(PROFILES_KEY, JSON.stringify(list));
  } catch {
    // Storage can fail (private browsing, quota, etc.) — safe to ignore.
  }
}

function slugify(name: string): string {
  return (
    name
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '') || 'project'
  );
}

function makeId(name: string): string {
  return `${slugify(name)}-${Date.now().toString(36)}`;
}

// -------------------- public API --------------------

/**
 * Save a new named project, or update an existing one if `existingId` is
 * provided and still exists. Returns the saved record (with its id).
 */
export function saveNamedSolarProfile(
  name: string,
  data: Omit<SolarEnergyProfileData, 'version'>,
  existingId?: string | null
): SavedSolarProfile {
  const list = readAll();
  const fullData: SolarEnergyProfileData = { ...data, version: PROFILE_DATA_VERSION };
  const now = new Date().toISOString();

  if (existingId) {
    const idx = list.findIndex((p) => p.id === existingId);
    if (idx !== -1) {
      const updated: SavedSolarProfile = {
        ...list[idx],
        name: name.trim() || list[idx].name,
        updatedAt: now,
        data: fullData,
      };
      list[idx] = updated;
      writeAll(list);
      setLastProfileId(updated.id);
      return updated;
    }
  }

  const record: SavedSolarProfile = {
    id: makeId(name || 'project'),
    name: name.trim() || 'Untitled project',
    createdAt: now,
    updatedAt: now,
    data: fullData,
  };
  list.unshift(record); // newest first
  writeAll(list);
  setLastProfileId(record.id);
  return record;
}

/** List all saved projects, most recently updated first. */
export function listSavedSolarProfiles(): SavedSolarProfile[] {
  return readAll().sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
}

/** Load one saved project by id, or null if it no longer exists. */
export function loadSolarProfileById(id: string): SavedSolarProfile | null {
  return readAll().find((p) => p.id === id) ?? null;
}

/** Rename an existing saved project. */
export function renameSolarProfile(id: string, newName: string): void {
  const list = readAll();
  const idx = list.findIndex((p) => p.id === id);
  if (idx === -1) return;
  list[idx] = { ...list[idx], name: newName.trim() || list[idx].name, updatedAt: new Date().toISOString() };
  writeAll(list);
}

/** Delete a saved project. */
export function deleteSolarProfile(id: string): void {
  const list = readAll().filter((p) => p.id !== id);
  writeAll(list);
  if (getLastProfileId() === id) clearLastProfileId();
}

/** Remember which project the user last worked with, for quick reopening. */
export function setLastProfileId(id: string): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(LAST_PROFILE_ID_KEY, id);
  } catch {
    /* ignore */
  }
}

export function getLastProfileId(): string | null {
  if (typeof window === 'undefined') return null;
  try {
    return window.localStorage.getItem(LAST_PROFILE_ID_KEY);
  } catch {
    return null;
  }
}

export function clearLastProfileId(): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.removeItem(LAST_PROFILE_ID_KEY);
  } catch {
    /* ignore */
  }
}

/** Convenience: load whichever project the user last worked with, if any. */
export function loadLastSolarProfile(): SavedSolarProfile | null {
  const id = getLastProfileId();
  if (!id) return null;
  return loadSolarProfileById(id);
}

/** Human-friendly "how old is this" label, e.g. "2 hours ago". */
export function profileAgeLabel(isoDate: string): string {
  const diffMs = Date.now() - new Date(isoDate).getTime();
  const mins = Math.round(diffMs / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins} min ago`;
  const hours = Math.round(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.round(hours / 24);
  return `${days}d ago`;
}
