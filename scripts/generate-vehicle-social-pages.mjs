import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";

const root = process.cwd();
const publicRoot = resolve(root, process.env.STATIC_OUTPUT_DIR || "dist/public");
const inventory = JSON.parse(await readFile(resolve(root, "client/src/data/cars.json"), "utf8"));
const staticImageNames = {
  "/manus-storage/velocity-suv_f11b8d82.jpg": "/assets/velocity-suv.jpg",
  "/manus-storage/velocity-electric_62363ef1.jpg": "/assets/velocity-electric.jpg",
  "/manus-storage/velocity-luxury_3afef11e.jpg": "/assets/velocity-luxury.jpg",
  "/manus-storage/velocity-crossover_4ab45789.jpg": "/assets/velocity-crossover.jpg",
};
const isStaticPages = Boolean(process.env.STATIC_OUTPUT_DIR);
const imageSources = {
  suv: "/manus-storage/velocity-suv_f11b8d82.jpg",
  electric: "/manus-storage/velocity-electric_62363ef1.jpg",
  luxury: "/manus-storage/velocity-luxury_3afef11e.jpg",
  crossover: "/manus-storage/velocity-crossover_4ab45789.jpg",
};
const vehicles = inventory.map((vehicle) => {
  const sourceImage = imageSources[vehicle.imageKey] || imageSources.crossover;
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
