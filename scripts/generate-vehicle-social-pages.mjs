import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";

const root = process.cwd();
const publicRoot = resolve(root, "dist/public");
const fleetFile = await readFile(resolve(root, "client/src/data/fleet.ts"), "utf8");
const recordMatcher = /\{ id: "([^"]+)", name: "([^"]+)", modelYear: "([^"]+)", type: "([^"]+)", image: "([^"]+)"[\s\S]*?rate: (\d+),[\s\S]*?description: "([^"]+)"/g;
const vehicles = [...fleetFile.matchAll(recordMatcher)].map((match) => ({ id: match[1], name: match[2], year: match[3], type: match[4], image: match[5], rate: match[6], description: match[7] }));
const siteUrl = (process.env.PUBLIC_SITE_URL || "https://velodrive-nsztcadp.manus.space").replace(/\/$/, "");

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
    <script>window.location.replace('/?vehicle=${vehicle.id}')</script>
  </head>
  <body><p>Opening ${vehicle.name}…</p></body>
</html>`;
  const output = resolve(publicRoot, "fleet", vehicle.id, "index.html");
  await mkdir(dirname(output), { recursive: true });
  await writeFile(output, html);
}

console.log(`Generated ${vehicles.length} crawler-readable vehicle pages.`);
