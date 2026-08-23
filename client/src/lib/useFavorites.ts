/**
 * Velocity Drive visual system: Modern Motor Journal — browser-persistent favorites shared by the fleet, detail pages, and drive desk.
 */
import { useEffect, useState } from "react";
import { readStoredValue, writeStoredValue } from "@/lib/velocityStore";

const FAVORITES_KEY = "velocity-drive-saved";

export function useFavorites() {
  const [savedCarIds, setSavedCarIds] = useState<string[]>(() => readStoredValue(FAVORITES_KEY, []));
  useEffect(() => { writeStoredValue(FAVORITES_KEY, savedCarIds); }, [savedCarIds]);
  const toggleFavorite = (carId: string) => setSavedCarIds((current) => current.includes(carId) ? current.filter((id) => id !== carId) : [...current, carId]);
  return { savedCarIds, toggleFavorite };
}
