/**
 * Velocity Drive visual system: Modern Motor Journal — precise, editorial fleet data.
 */
export type CarType = "SUV" | "Sedan" | "Electric" | "Luxury";

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
  accent: string;
  note: string;
};

export const fleet: FleetCar[] = [
  {
    id: "atlas-q5",
    name: "Atlas Q5",
    modelYear: "2024",
    type: "SUV",
    image: "/manus-storage/velocity-suv_f11b8d82.jpg",
    rate: 86,
    fuel: "Hybrid",
    transmission: "Automatic",
    seats: 5,
    available: true,
    accent: "A versatile city-to-coast companion.",
    note: "Quiet confidence, generous cabin space.",
  },
  {
    id: "lumen-e3",
    name: "Lumen E3",
    modelYear: "2025",
    type: "Electric",
    image: "/manus-storage/velocity-electric_62363ef1.jpg",
    rate: 94,
    fuel: "Electric",
    transmission: "Automatic",
    seats: 5,
    available: true,
    accent: "Clean, calm, and charge-ready.",
    note: "A smooth, zero-emission daily drive.",
  },
  {
    id: "meridian-s7",
    name: "Meridian S7",
    modelYear: "2024",
    type: "Luxury",
    image: "/manus-storage/velocity-luxury_3afef11e.jpg",
    rate: 148,
    fuel: "Petrol",
    transmission: "Automatic",
    seats: 5,
    available: true,
    accent: "The considered choice for arrival.",
    note: "Executive comfort with a composed ride.",
  },
  {
    id: "haven-cx",
    name: "Haven CX",
    modelYear: "2024",
    type: "Sedan",
    image: "/manus-storage/velocity-crossover_4ab45789.jpg",
    rate: 72,
    fuel: "Petrol",
    transmission: "Automatic",
    seats: 5,
    available: false,
    accent: "Easy-going space for everyday plans.",
    note: "A practical four-door with a polished edge.",
  },
];

export const fleetCategories: Array<"All" | CarType> = [
  "All",
  "SUV",
  "Sedan",
  "Electric",
  "Luxury",
];
