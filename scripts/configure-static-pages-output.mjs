import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const outputDir = resolve(process.cwd(), process.env.STATIC_OUTPUT_DIR || "dist/pages");
const indexFile = resolve(outputDir, "index.html");
const siteUrl = (process.env.PUBLIC_SITE_URL || "https://velodrive-rentals.me").replace(/\/$/, "");
let html = await readFile(indexFile, "utf8");

html = html
  .replaceAll(`${siteUrl}/manus-storage/velocity-hero_0ffdea12.jpg`, `${siteUrl}/assets/velocity-hero.jpg`)
  .replace('href="/manus-storage/velocity-drive-new-mark_c1ed0e2a.png"', 'href="./assets/velocity-drive-new-mark.png"');

await writeFile(indexFile, html);
console.log("Configured static Pages metadata and favicon.");
