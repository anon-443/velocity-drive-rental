import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";

const root = process.cwd();
const publicRoot = resolve(root, process.env.STATIC_OUTPUT_DIR || "dist/public");
const inventory = JSON.parse(await readFile(resolve(root, "client/src/data/cars.json"), "utf8"));
const staticImageNames = {
  "/manus-storage/kia-sorento-hybrid_9c1e9c28.jpg": "/assets/kia-sorento-hybrid.jpg",
  "/manus-storage/hyundai-ioniq-5_3d058c55.jpg": "/assets/hyundai-ioniq-5.jpg",
  "/manus-storage/mercedes-e300_dc47005f.jpg": "/assets/mercedes-e300.jpg",
  "/manus-storage/toyota-corolla_549cc6cb.jpg": "/assets/toyota-corolla.jpg",
  "/manus-storage/mazda-cx5_4af358e1.jpg": "/assets/mazda-cx5.jpg",
  "/manus-storage/kia-ev6_a4cad62a.jpg": "/assets/kia-ev6.jpg",
  "/manus-storage/bmw-x3_7587a69c.jpg": "/assets/bmw-x3.jpg",
  "/manus-storage/honda-civic_cfd1fe7f.jpg": "/assets/honda-civic.jpg",
  "/manus-storage/lexus-rx350_47dd1dc9.jpg": "/assets/lexus-rx350.jpg",
  "/manus-storage/volkswagen-tiguan_cca363a6.jpg": "/assets/volkswagen-tiguan.jpg",
  "/manus-storage/tesla-model-3_55df243b.jpg": "/assets/tesla-model-3.jpg",
  "/manus-storage/skoda-octavia_3f4b930a.jpg": "/assets/skoda-octavia.jpg",
};
const isStaticPages = Boolean(process.env.STATIC_OUTPUT_DIR);
const imageSources = {
  "kia-sorento-hybrid": "/manus-storage/kia-sorento-hybrid_9c1e9c28.jpg",
  "hyundai-ioniq-5": "/manus-storage/hyundai-ioniq-5_3d058c55.jpg",
  "mercedes-e300": "/manus-storage/mercedes-e300_dc47005f.jpg",
  "toyota-corolla": "/manus-storage/toyota-corolla_549cc6cb.jpg",
  "mazda-cx5": "/manus-storage/mazda-cx5_4af358e1.jpg",
  "kia-ev6": "/manus-storage/kia-ev6_a4cad62a.jpg",
  "bmw-x3": "/manus-storage/bmw-x3_7587a69c.jpg",
  "honda-civic": "/manus-storage/honda-civic_cfd1fe7f.jpg",
  "lexus-rx350": "/manus-storage/lexus-rx350_47dd1dc9.jpg",
  "volkswagen-tiguan": "/manus-storage/volkswagen-tiguan_cca363a6.jpg",
  "tesla-model-3": "/manus-storage/tesla-model-3_55df243b.jpg",
  "skoda-octavia": "/manus-storage/skoda-octavia_3f4b930a.jpg",
};
const vehicles = inventory.map((vehicle) => {
  const sourceImage = imageSources[vehicle.id];
  if (!sourceImage) throw new Error(`Missing model-specific image for ${vehicle.id}`);
  return { id: vehicle.id, name: vehicle.name, year: vehicle.year, type: vehicle.category, image: isStaticPages ? staticImageNames[sourceImage] || sourceImage : sourceImage, rate: vehicle.pricePerDay, description: `${vehicle.tagline} Demo rates and availability require confirmation.` };
});
const siteUrl = (process.env.PUBLIC_SITE_URL || "https://velodrive-rentals.me").replace(/\/$/, "");

for (const vehicle of vehicles) {
  const title = `${vehicle.year} ${vehicle.name} | Velocity Drive`;
  const description = `${vehicle.description} Explore this ${vehicle.type.toLowerCase()} from $${vehicle.rate} per day.`;
  const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${title}</title>
    <meta name="description" content="${description}" />
    <meta property="og:site_name" content="Velocity Drive" />
    <meta property="og:type" content="product" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:image" content="${siteUrl}${vehicle.image}" />
    <meta property="og:url" content="${siteUrl}/fleet/${vehicle.id}" />
    <link rel="canonical" href="${siteUrl}/fleet/${vehicle.id}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${title}" />
    <meta name="twitter:description" content="${description}" />
    <meta name="twitter:image" content="${siteUrl}${vehicle.image}" />
    <script>window.location.replace(window.location.origin + '/?vehicle=${vehicle.id}')</script>
  </head>
  <body><p>Opening ${vehicle.name}…</p></body>
</html>`;
  const output = resolve(publicRoot, "fleet", vehicle.id, "index.html");
  await mkdir(dirname(output), { recursive: true });
  await writeFile(output, html);
}

console.log(`Generated ${vehicles.length} crawler-readable vehicle pages.`);
