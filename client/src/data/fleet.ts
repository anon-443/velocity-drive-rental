/**
 * Velocity Drive visual system: Modern Motor Journal — realistic regional demo rates, named collection branches, and deterministic availability windows.
 */
export type CarType = "SUV" | "Sedan" | "Electric" | "Luxury";
export type UnavailableWindow = { start: string; end: string; };

export type FleetCar = {
  id: string;
  name: string;
  modelYear: string;
  type: CarType;
  image: string;
  rate: number;
  fuel: string;
  transmission: string;
  seats: number;
  available: boolean;
  unavailableWindows: UnavailableWindow[];
  accent: string;
  note: string;
};

export const branchLocations = [
  "Bishkek Downtown Hub",
  "Manas International Airport (FRU)",
  "Bishkek Railway Station",
  "Asia Mall — South Gate",
  "Almaty Road — East Service Hub",
];

export const fleet: FleetCar[] = [
  { id: "atlas-q5", name: "Atlas Q5", modelYear: "2024", type: "SUV", image: "/manus-storage/velocity-suv_f11b8d82.jpg", rate: 78, fuel: "Hybrid", transmission: "Automatic", seats: 5, available: true, unavailableWindows: [{ start: "2026-08-25", end: "2026-08-27" }, { start: "2026-09-05", end: "2026-09-08" }], accent: "A versatile city-to-coast companion.", note: "Quiet confidence, generous cabin space." },
  { id: "lumen-e3", name: "Lumen E3", modelYear: "2025", type: "Electric", image: "/manus-storage/velocity-electric_62363ef1.jpg", rate: 89, fuel: "Electric", transmission: "Automatic", seats: 5, available: true, unavailableWindows: [{ start: "2026-08-29", end: "2026-08-31" }, { start: "2026-09-14", end: "2026-09-16" }], accent: "Clean, calm, and charge-ready.", note: "A smooth, zero-emission daily drive." },
  { id: "meridian-s7", name: "Meridian S7", modelYear: "2024", type: "Luxury", image: "/manus-storage/velocity-luxury_3afef11e.jpg", rate: 139, fuel: "Petrol", transmission: "Automatic", seats: 5, available: true, unavailableWindows: [{ start: "2026-09-01", end: "2026-09-04" }, { start: "2026-09-20", end: "2026-09-23" }], accent: "The considered choice for arrival.", note: "Executive comfort with a composed ride." },
  { id: "haven-cx", name: "Haven CX", modelYear: "2024", type: "Sedan", image: "/manus-storage/velocity-crossover_4ab45789.jpg", rate: 54, fuel: "Petrol", transmission: "Automatic", seats: 5, available: true, unavailableWindows: [{ start: "2026-08-23", end: "2026-08-26" }, { start: "2026-09-10", end: "2026-09-12" }], accent: "Easy-going space for everyday plans.", note: "A practical four-door with a polished edge." },
];

export const fleetCategories: Array<"All" | CarType> = ["All", "SUV", "Sedan", "Electric", "Luxury"];

export function isCarAvailableForDates(car: FleetCar, pickupDate: string, returnDate: string) {
  if (!car.available) return false;
  if (!pickupDate && !returnDate) return true;
  const fallback = pickupDate || returnDate;
  const requestStart = new Date(`${pickupDate || fallback}T12:00:00`).getTime();
  const requestEnd = new Date(`${returnDate || fallback}T12:00:00`).getTime();
  if (!Number.isFinite(requestStart) || !Number.isFinite(requestEnd)) return true;
  const start = Math.min(requestStart, requestEnd);
  const end = Math.max(requestStart, requestEnd);
  return !car.unavailableWindows.some((window) => {
    const blockStart = new Date(`${window.start}T12:00:00`).getTime();
    const blockEnd = new Date(`${window.end}T12:00:00`).getTime();
    return start <= blockEnd && end >= blockStart;
  });
}
