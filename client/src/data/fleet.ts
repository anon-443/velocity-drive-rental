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

const imageAssets = {
  suv: staticAssetPath("/manus-storage/velocity-suv_f11b8d82.jpg"),
  electric: staticAssetPath("/manus-storage/velocity-electric_62363ef1.jpg"),
  luxury: staticAssetPath("/manus-storage/velocity-luxury_3afef11e.jpg"),
  crossover: staticAssetPath("/manus-storage/velocity-crossover_4ab45789.jpg"),
  hero: staticAssetPath("/manus-storage/velocity-hero_0ffdea12.jpg"),
};

const specs: Record<CarType, Pick<FleetCar, "drive" | "power" | "efficiency" | "cargo">> = {
  SUV: { drive: "All-wheel drive", power: "187 hp", efficiency: "Up to 31 mpg", cargo: "Up to 75 cu ft" },
  Sedan: { drive: "Front-wheel drive", power: "169 hp", efficiency: "Up to 35 mpg", cargo: "13.5 cu ft trunk" },
  Electric: { drive: "Rear-wheel drive", power: "225 hp", efficiency: "Up to 303 mi range", cargo: "27 cu ft rear cargo" },
  Luxury: { drive: "All-wheel drive", power: "255 hp", efficiency: "Turbo efficiency", cargo: "13 cu ft trunk" },
};

function unavailableWindows(index: number): UnavailableWindow[] {
  const startDay = 3 + index * 2;
  return [{ start: `2026-09-${String(startDay).padStart(2, "0")}`, end: `2026-09-${String(startDay + 2).padStart(2, "0")}` }];
}

export const branchLocations = ["Bishkek Downtown Hub", "Manas International Airport (FRU)", "Bishkek Railway Station", "Asia Mall — South Gate", "Almaty Road — East Service Hub"];

export const fleet: FleetCar[] = inventory.map((item, index) => {
  const type = item.category as CarType;
  const image = imageAssets[item.imageKey as keyof typeof imageAssets];
  const typeSpecs = specs[type];
  return {
    id: item.id, name: item.name, modelYear: String(item.year), type, image, gallery: [image, imageAssets.hero, imageAssets[index % 2 ? "suv" : "crossover"]],
    rate: item.pricePerDay, weeklyRate: Math.round(item.pricePerDay * 6.2), addOns: { insurance: Math.max(14, Math.round(item.pricePerDay * 0.2)), gps: 6 }, fuel: item.fuel, transmission: item.transmission, seats: item.seats,
    available: item.available, unavailableWindows: unavailableWindows(index), accent: item.tagline, note: `${item.badge} demo vehicle with clear daily pricing and practical trip details.`, description: `${item.tagline} This is a client-side demonstration vehicle listing; availability and rates are planning estimates pending a rental team response.`,
    ...typeSpecs, exterior: item.colorOptions[0], colorOptions: item.colorOptions, engine: item.engine, badge: item.badge, popularity: 12 - index, features: item.features,
  };
});

export const fleetCategories: Array<"All" | CarType> = ["All", "SUV", "Sedan", "Electric", "Luxury"];
export function getCarById(id: string) { return fleet.find((car) => car.id === id); }
export function isCarAvailableForDates(car: FleetCar, pickupDate: string, returnDate: string) { if (!car.available) return false; if (!pickupDate && !returnDate) return true; const fallback = pickupDate || returnDate; const requestStart = new Date(`${pickupDate || fallback}T12:00:00`).getTime(); const requestEnd = new Date(`${returnDate || fallback}T12:00:00`).getTime(); if (!Number.isFinite(requestStart) || !Number.isFinite(requestEnd)) return true; const start = Math.min(requestStart, requestEnd); const end = Math.max(requestStart, requestEnd); return !car.unavailableWindows.some((window) => { const blockStart = new Date(`${window.start}T12:00:00`).getTime(); const blockEnd = new Date(`${window.end}T12:00:00`).getTime(); return start <= blockEnd && end >= blockStart; }); }
