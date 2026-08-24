import { useEffect, useState } from "react";
import { fleet } from "@/data/fleet";
import { readStoredValue, writeStoredValue } from "@/lib/velocityStore";

const VISIBILITY_KEY = "velocity-drive-visible-fleet";
const defaultIds = fleet.filter((car) => car.available).map((car) => car.id);
const featuredIds = ["bmw-m5"];

export function useFleetVisibility() {
  const [visibleCarIds, setVisibleCarIds] = useState<string[]>(() => {
    const storedIds = readStoredValue<string[]>(VISIBILITY_KEY, defaultIds);
    const currentIds = new Set(defaultIds);
    return Array.from(new Set([...storedIds.filter((id) => currentIds.has(id)), ...featuredIds.filter((id) => currentIds.has(id))]));
  });
  useEffect(() => { writeStoredValue(VISIBILITY_KEY, visibleCarIds); }, [visibleCarIds]);
  const isVisible = (id: string) => visibleCarIds.includes(id);
  const toggleVisibility = (id: string) => setVisibleCarIds((current) => current.includes(id) ? current.filter((entry) => entry !== id) : [...current, id]);
  const resetVisibility = () => setVisibleCarIds(defaultIds);
  return { visibleCarIds, isVisible, toggleVisibility, resetVisibility };
}
