/** Typed adapter around the demo JSON inventory used throughout Velocity Drive. */
import inventory from "./cars.json";
import { staticAssetPath } from "@/lib/staticDemo";

export type CarType = "SUV" | "Sedan" | "Electric" | "Luxury";
export type UnavailableWindow = { start: string; end: string };
export type FleetCar = {
  id: string; name: string; modelYear: string; type: CarType; image: string; gallery: string[]; rate: number; weeklyRate: number;
  addOns: { insurance: number; gps: number }; fuel: string; transmission: string; seats: number; available: boolean; unavailableWindows: UnavailableWindow[];
  accent: string; note: string; description: string; drive: string; power: string; efficiency: string; cargo: string; exterior: string; colorOptions: string[]; engine: string; badge: string; popularity: number; features: string[];
};

/**
 * Each rendered vehicle now has its own source image. The inventory labels and
 * photos intentionally use the same stable ID so a category-level stock photo
 * cannot be displayed under the wrong model name.
 */
const imageAssets: Record<string, string> = {
  "kia-sorento-hybrid": staticAssetPath("/manus-storage/kia-sorento-hybrid_9c1e9c28.jpg"),
  "hyundai-ioniq-5": staticAssetPath("/manus-storage/hyundai-ioniq-5_3d058c55.jpg"),
  "mercedes-e300": staticAssetPath("/manus-storage/mercedes-e300_dc47005f.jpg"),
  "toyota-corolla": staticAssetPath("/manus-storage/toyota-corolla_549cc6cb.jpg"),
  "mazda-cx5": staticAssetPath("/manus-storage/mazda-cx5_4af358e1.jpg"),
  "kia-ev6": staticAssetPath("/manus-storage/kia-ev6_a4cad62a.jpg"),
  "bmw-x3": staticAssetPath("/manus-storage/bmw-x3_7587a69c.jpg"),
  "bmw-m5": staticAssetPath("/manus-storage/bmw-m5-black_0855dd1c.jpg"),
  "honda-civic": staticAssetPath("/manus-storage/honda-civic_cfd1fe7f.jpg"),
  "lexus-rx350": staticAssetPath("/manus-storage/lexus-rx350_47dd1dc9.jpg"),
  "volkswagen-tiguan": staticAssetPath("/manus-storage/volkswagen-tiguan_cca363a6.jpg"),
  "tesla-model-3": staticAssetPath("/manus-storage/tesla-model-3_55df243b.jpg"),
  "skoda-octavia": staticAssetPath("/manus-storage/skoda-octavia_3f4b930a.jpg"),
};

const specs: Record<CarType, Pick<FleetCar, "drive" | "power" | "efficiency" | "cargo">> = {
  SUV: { drive: "All-wheel drive", power: "187 hp", efficiency: "Up to 31 mpg", cargo: "Up to 75 cu ft" },
  Sedan: { drive: "Front-wheel drive", power: "169 hp", efficiency: "Up to 35 mpg", cargo: "13.5 cu ft trunk" },
  Electric: { drive: "Rear-wheel drive", power: "225 hp", efficiency: "Up to 303 mi range", cargo: "27 cu ft rear cargo" },
  Luxury: { drive: "All-wheel drive", power: "255 hp", efficiency: "Turbo efficiency", cargo: "13 cu ft trunk" },
};

const vehicleSpecOverrides: Record<string, Partial<Pick<FleetCar, "drive" | "power" | "efficiency" | "cargo">>> = {
  "bmw-m5": { drive: "M xDrive all-wheel drive", power: "717 hp system output", efficiency: "Up to 42 mi electric range", cargo: "16.5 cu ft trunk" },
};

function unavailableWindows(index: number): UnavailableWindow[] {
  const startDay = 3 + index * 2;
  return [{ start: `2026-09-${String(startDay).padStart(2, "0")}`, end: `2026-09-${String(startDay + 2).padStart(2, "0")}` }];
}

export const branchLocations = ["Bishkek Downtown Hub", "Manas International Airport (FRU)", "Bishkek Railway Station", "Asia Mall — South Gate", "Almaty Road — East Service Hub"];

const baseFleet: FleetCar[] = inventory.map((item, index) => {
  const type = item.category as CarType;
  const image = imageAssets[item.id];
  const typeSpecs = specs[type];
  return {
    id: item.id, name: item.name, modelYear: String(item.year), type, image, gallery: [image],
    rate: item.pricePerDay, weeklyRate: Math.round(item.pricePerDay * 6.2), addOns: { insurance: Math.max(14, Math.round(item.pricePerDay * 0.2)), gps: 6 }, fuel: item.fuel, transmission: item.transmission, seats: item.seats,
    available: item.available, unavailableWindows: unavailableWindows(index), accent: item.tagline, note: `${item.badge} demo vehicle with clear daily pricing and practical trip details.`, description: `${item.tagline} This is a client-side demonstration vehicle listing; availability and rates are planning estimates pending a rental team response.`,
    ...typeSpecs, ...(vehicleSpecOverrides[item.id] ?? {}), exterior: item.colorOptions[0], colorOptions: item.colorOptions, engine: item.engine, badge: item.badge, popularity: 13 - index, features: item.features,
  };
});

const featuredFleetOrder = ["kia-sorento-hybrid", "bmw-m5"];

export const fleet: FleetCar[] = [...baseFleet]
  .sort((left, right) => {
    const leftPosition = featuredFleetOrder.indexOf(left.id);
    const rightPosition = featuredFleetOrder.indexOf(right.id);
    const leftRank = leftPosition === -1 ? featuredFleetOrder.length : leftPosition;
    const rightRank = rightPosition === -1 ? featuredFleetOrder.length : rightPosition;
    return leftRank - rightRank;
  })
  .map((car, index) => ({ ...car, popularity: baseFleet.length - index }));

export const fleetCategories: Array<"All" | CarType> = ["All", "SUV", "Sedan", "Electric", "Luxury"];
export function getCarById(id: string) { return fleet.find((car) => car.id === id); }
export function isCarAvailableForDates(car: FleetCar, pickupDate: string, returnDate: string) { if (!car.available) return false; if (!pickupDate && !returnDate) return true; const fallback = pickupDate || returnDate; const requestStart = new Date(`${pickupDate || fallback}T12:00:00`).getTime(); const requestEnd = new Date(`${returnDate || fallback}T12:00:00`).getTime(); if (!Number.isFinite(requestStart) || !Number.isFinite(requestEnd)) return true; const start = Math.min(requestStart, requestEnd); const end = Math.max(requestStart, requestEnd); return !car.unavailableWindows.some((window) => { const blockStart = new Date(`${window.start}T12:00:00`).getTime(); const blockEnd = new Date(`${window.end}T12:00:00`).getTime(); return start <= blockEnd && end >= blockStart; }); }
