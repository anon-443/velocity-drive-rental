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
  "/manus-storage/kia-sorento-hybrid_9c1e9c28.jpg": "kia-sorento-hybrid.jpg",
  "/manus-storage/hyundai-ioniq-5_3d058c55.jpg": "hyundai-ioniq-5.jpg",
  "/manus-storage/mercedes-e300_dc47005f.jpg": "mercedes-e300.jpg",
  "/manus-storage/toyota-corolla_549cc6cb.jpg": "toyota-corolla.jpg",
  "/manus-storage/mazda-cx5_4af358e1.jpg": "mazda-cx5.jpg",
  "/manus-storage/kia-ev6_a4cad62a.jpg": "kia-ev6.jpg",
  "/manus-storage/bmw-x3_7587a69c.jpg": "bmw-x3.jpg",
  "/manus-storage/honda-civic_cfd1fe7f.jpg": "honda-civic.jpg",
  "/manus-storage/lexus-rx350_47dd1dc9.jpg": "lexus-rx350.jpg",
  "/manus-storage/volkswagen-tiguan_cca363a6.jpg": "volkswagen-tiguan.jpg",
  "/manus-storage/tesla-model-3_55df243b.jpg": "tesla-model-3.jpg",
  "/manus-storage/skoda-octavia_3f4b930a.jpg": "skoda-octavia.jpg",
};

export function staticAssetPath(source: string) {
  if (!isStaticDemo) return source;
  const assetName = assetNames[source];
  return assetName ? `${pagesBasePath()}/assets/${assetName}` : source;
}

export function staticOutputAsset(source: string) {
  return `/assets/${assetNames[source] ?? source.split("/").pop() ?? ""}`;
}
