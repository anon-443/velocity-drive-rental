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
];

await mkdir(outputDir, { recursive: true });
for (const [fileName, sourcePath] of assets) {
  const response = await fetch(`${assetOrigin}${sourcePath}`);
  if (!response.ok) throw new Error(`Could not download ${sourcePath}: ${response.status}`);
  await writeFile(resolve(outputDir, fileName), Buffer.from(await response.arrayBuffer()));
}

console.log(`Staged ${assets.length} static demo assets.`);
