export const isStaticDemo = import.meta.env.VITE_STATIC_DEMO === "true";

const pagesRepo = import.meta.env.VITE_PAGES_REPO || "velocity-drive-rental";

export function pagesBasePath() {
  if (typeof window === "undefined") return "";
  return window.location.hostname.endsWith("github.io") ? `/${pagesRepo}` : "";
}

const assetNames: Record<string, string> = {
  "/manus-storage/velocity-suv_f11b8d82.jpg": "velocity-suv.jpg",
  "/manus-storage/velocity-electric_62363ef1.jpg": "velocity-electric.jpg",
  "/manus-storage/velocity-luxury_3afef11e.jpg": "velocity-luxury.jpg",
  "/manus-storage/velocity-crossover_4ab45789.jpg": "velocity-crossover.jpg",
  "/manus-storage/velocity-hero_0ffdea12.jpg": "velocity-hero.jpg",
  "/manus-storage/velocity-drive-new-mark_c1ed0e2a.png": "velocity-drive-new-mark.png",
};

export function staticAssetPath(source: string) {
  if (!isStaticDemo) return source;
  const assetName = assetNames[source];
  return assetName ? `${pagesBasePath()}/assets/${assetName}` : source;
}

export function staticOutputAsset(source: string) {
  return `/assets/${assetNames[source] ?? source.split("/").pop() ?? ""}`;
}
