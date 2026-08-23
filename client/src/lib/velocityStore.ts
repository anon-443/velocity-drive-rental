/**
 * Velocity Drive visual system: Modern Motor Journal — small client-side persistence for a practical demo of saved vehicles and reservation history.
 */
export type TripRecord = {
  id: string;
  carId?: string;
  carName: string;
  carImage: string;
  pickupDate: string;
  returnDate: string;
  total: number;
  status: "Request received" | "Cancelled";
  customerName?: string;
  pickupLocation?: string;
  createdAt?: string;
  extras?: string[];
};

export function readStoredValue<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const value = window.localStorage.getItem(key);
    return value ? (JSON.parse(value) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function writeStoredValue<T>(key: string, value: T) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, JSON.stringify(value));
}
