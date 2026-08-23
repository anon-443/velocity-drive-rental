import { useEffect, useState } from "react";
import { fleet } from "@/data/fleet";
import { readStoredValue, writeStoredValue } from "@/lib/velocityStore";

const VISIBILITY_KEY = "velocity-drive-visible-fleet";
const defaultIds = fleet.filter((car) => car.available).map((car) => car.id);

export function useFleetVisibility() {
  const [visibleCarIds, setVisibleCarIds] = useState<string[]>(() => readStoredValue<string[]>(VISIBILITY_KEY, defaultIds));
  useEffect(() => { writeStoredValue(VISIBILITY_KEY, visibleCarIds); }, [visibleCarIds]);
  const isVisible = (id: string) => visibleCarIds.includes(id);
  const toggleVisibility = (id: string) => setVisibleCarIds((current) => current.includes(id) ? current.filter((entry) => entry !== id) : [...current, id]);
  const resetVisibility = () => setVisibleCarIds(defaultIds);
  return { visibleCarIds, isVisible, toggleVisibility, resetVisibility };
}
