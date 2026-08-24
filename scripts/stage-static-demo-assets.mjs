import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = process.cwd();
const outputDir = resolve(root, process.env.STATIC_OUTPUT_DIR || "dist/pages", "assets");
const assetOrigin = (process.env.STATIC_ASSET_ORIGIN || "https://velodrive-nsztcadp.manus.space").replace(/\/$/, "");

const assets = [
  ["velocity-suv.jpg", "/manus-storage/velocity-suv_f11b8d82.jpg"],
  ["velocity-electric.jpg", "/manus-storage/velocity-electric_62363ef1.jpg"],
  ["velocity-luxury.jpg", "/manus-storage/velocity-luxury_3afef11e.jpg"],
  ["velocity-crossover.jpg", "/manus-storage/velocity-crossover_4ab45789.jpg"],
  ["velocity-hero.jpg", "/manus-storage/velocity-hero_0ffdea12.jpg"],
  ["velocity-drive-new-mark.png", "/manus-storage/velocity-drive-new-mark_c1ed0e2a.png"],
  ["kia-sorento-hybrid.jpg", "/manus-storage/kia-sorento-hybrid_9c1e9c28.jpg"],
  ["hyundai-ioniq-5.jpg", "/manus-storage/hyundai-ioniq-5_3d058c55.jpg"],
  ["mercedes-e300.jpg", "/manus-storage/mercedes-e300_dc47005f.jpg"],
  ["toyota-corolla.jpg", "/manus-storage/toyota-corolla_549cc6cb.jpg"],
  ["mazda-cx5.jpg", "/manus-storage/mazda-cx5_4af358e1.jpg"],
  ["kia-ev6.jpg", "/manus-storage/kia-ev6_a4cad62a.jpg"],
  ["bmw-x3.jpg", "/manus-storage/bmw-x3_7587a69c.jpg"],
  ["bmw-m5.jpg", "/manus-storage/bmw-m5-black_0855dd1c.jpg"],
  ["honda-civic.jpg", "/manus-storage/honda-civic_cfd1fe7f.jpg"],
  ["lexus-rx350.jpg", "/manus-storage/lexus-rx350_47dd1dc9.jpg"],
  ["volkswagen-tiguan.jpg", "/manus-storage/volkswagen-tiguan_cca363a6.jpg"],
  ["tesla-model-3.jpg", "/manus-storage/tesla-model-3_55df243b.jpg"],
  ["skoda-octavia.jpg", "/manus-storage/skoda-octavia_3f4b930a.jpg"],
];

await mkdir(outputDir, { recursive: true });
for (const [fileName, sourcePath] of assets) {
  const response = await fetch(`${assetOrigin}${sourcePath}`);
  if (!response.ok) throw new Error(`Could not download ${sourcePath}: ${response.status}`);
  await writeFile(resolve(outputDir, fileName), Buffer.from(await response.arrayBuffer()));
}

console.log(`Staged ${assets.length} static demo assets.`);
