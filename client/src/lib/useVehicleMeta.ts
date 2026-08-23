/**
 * Velocity Drive visual system: Modern Motor Journal — route-aware browser metadata for rich vehicle-link sharing contexts.
 */
import { useEffect } from "react";
import type { FleetCar } from "@/data/fleet";

const siteTitle = "Velocity Drive — Premium Car Rental";
const siteDescription = "A polished car-rental experience with a searchable fleet, visible daily rates, and practical booking controls.";
const canonicalSiteUrl = "https://velodrive-rentals.me";

function setMeta(attribute: "name" | "property", key: string, content: string) {
  let tag = document.head.querySelector(`meta[${attribute}="${key}"]`) as HTMLMetaElement | null;
  if (!tag) { tag = document.createElement("meta"); tag.setAttribute(attribute, key); document.head.appendChild(tag); }
  tag.content = content;
}

export function useVehicleMeta(car?: FleetCar) {
  useEffect(() => {
    const title = car ? `${car.modelYear} ${car.name} | Velocity Drive` : siteTitle;
    const description = car ? `${car.description} Explore the ${car.modelYear} ${car.name}, from $${car.rate} per day.` : siteDescription;
    const image = car ? new URL(car.image, canonicalSiteUrl).toString() : new URL("/manus-storage/velocity-hero_0ffdea12.jpg", canonicalSiteUrl).toString();
    const url = car ? `${canonicalSiteUrl}/fleet/${car.id}` : `${canonicalSiteUrl}/`;
    document.title = title;
    setMeta("name", "description", description);
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("property", "og:image", image);
    setMeta("property", "og:url", url);
    setMeta("property", "og:type", car ? "product" : "website");
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", title);
    setMeta("name", "twitter:description", description);
    setMeta("name", "twitter:image", image);
    let canonical = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) { canonical = document.createElement("link"); canonical.rel = "canonical"; document.head.appendChild(canonical); }
    canonical.href = url;
  }, [car]);
}
