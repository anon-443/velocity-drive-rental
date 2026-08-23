import { describe, expect, it, vi } from "vitest";
import type { TrpcContext } from "./_core/context";

const storedFavorites = vi.hoisted(() => new Map<number, Set<string>>());

vi.mock("./db", () => ({
  listVehicleFavorites: async (userId: number) => [...(storedFavorites.get(userId) ?? new Set<string>())],
  toggleVehicleFavorite: async (userId: number, vehicleId: string) => {
    const favorites = storedFavorites.get(userId) ?? new Set<string>();
    storedFavorites.set(userId, favorites);
    if (favorites.has(vehicleId)) {
      favorites.delete(vehicleId);
      return { vehicleId, saved: false };
    }
    favorites.add(vehicleId);
    return { vehicleId, saved: true };
  },
}));

import { appRouter } from "./routers";

function accountContext(userId: number) {
  return {
    user: { id: userId },
  } as TrpcContext;
}

describe("account-backed Favorites", () => {
  it("returns the same saved vehicles from independent sessions for one account", async () => {
    storedFavorites.clear();
    const firstSession = appRouter.createCaller(accountContext(42));
    const secondSession = appRouter.createCaller(accountContext(42));

    await expect(firstSession.favorites.toggle({ vehicleId: "kia-sorento-hybrid" })).resolves.toEqual({ vehicleId: "kia-sorento-hybrid", saved: true });
    await expect(secondSession.favorites.list()).resolves.toEqual(["kia-sorento-hybrid"]);
    await expect(secondSession.favorites.toggle({ vehicleId: "kia-sorento-hybrid" })).resolves.toEqual({ vehicleId: "kia-sorento-hybrid", saved: false });
    await expect(firstSession.favorites.list()).resolves.toEqual([]);
  });
});
