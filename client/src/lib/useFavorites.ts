/**
 * Velocity Drive visual system: Modern Motor Journal — account-synced Favorites with a local browsing fallback.
 */
import { useEffect, useRef, useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { readStoredValue, writeStoredValue } from "@/lib/velocityStore";

const FAVORITES_KEY = "velocity-drive-saved";

export function useFavorites() {
  const { isAuthenticated, loading: isAuthLoading } = useAuth();
  const utils = trpc.useUtils();
  const [localSavedCarIds, setLocalSavedCarIds] = useState<string[]>(() => readStoredValue(FAVORITES_KEY, []));
  const mergedLocalFavorites = useRef(false);
  const favoritesQuery = trpc.favorites.list.useQuery(undefined, { enabled: isAuthenticated, retry: false, refetchOnWindowFocus: false });
  const toggleMutation = trpc.favorites.toggle.useMutation({
    onMutate: async ({ vehicleId }) => {
      await utils.favorites.list.cancel();
      const previous = utils.favorites.list.getData();
      utils.favorites.list.setData(undefined, (current) => current ? (current.includes(vehicleId) ? current.filter((id) => id !== vehicleId) : [...current, vehicleId]) : current);
      return { previous };
    },
    onError: (_error, _input, context) => {
      if (context?.previous) utils.favorites.list.setData(undefined, context.previous);
    },
    onSettled: () => utils.favorites.list.invalidate(),
  });

  useEffect(() => { writeStoredValue(FAVORITES_KEY, localSavedCarIds); }, [localSavedCarIds]);
  useEffect(() => {
    if (!isAuthenticated || !favoritesQuery.isSuccess || mergedLocalFavorites.current) return;
    mergedLocalFavorites.current = true;
    const remoteIds = favoritesQuery.data;
    localSavedCarIds.filter((id) => !remoteIds.includes(id)).forEach((vehicleId) => toggleMutation.mutate({ vehicleId }));
  }, [favoritesQuery.data, favoritesQuery.isSuccess, isAuthenticated, localSavedCarIds, toggleMutation]);
  useEffect(() => {
    if (!isAuthenticated || !favoritesQuery.data) return;
    setLocalSavedCarIds(favoritesQuery.data);
  }, [favoritesQuery.data, isAuthenticated]);

  const savedCarIds = isAuthenticated ? favoritesQuery.data ?? localSavedCarIds : localSavedCarIds;
  const toggleFavorite = (carId: string) => {
    if (!isAuthenticated) {
      setLocalSavedCarIds((current) => current.includes(carId) ? current.filter((id) => id !== carId) : [...current, carId]);
      return;
    }
    toggleMutation.mutate({ vehicleId: carId });
  };

  return { savedCarIds, toggleFavorite, isSynced: isAuthenticated, isSyncing: isAuthLoading || (isAuthenticated && (favoritesQuery.isLoading || toggleMutation.isPending)) };
}
