import { readFile } from "node:fs/promises";
import { describe, expect, it } from "vitest";

describe("visual polish system", () => {
  it("keeps the hero headline within a balanced responsive scale and avoids desktop hyphen splitting", async () => {
    const source = await readFile(new URL("../client/src/pages/Home.tsx", import.meta.url), "utf8");

    expect(source).toContain('wide-shell relative z-10');
    expect(source).toContain('lg:grid-cols-[minmax(0,1.1fr)_minmax(500px,0.9fr)]');
    expect(source).toContain('lg:text-[clamp(4.5rem,4.7vw,5.6rem)]');
    expect(source).toContain('sm:whitespace-nowrap');
  });

  it("uses a wide desktop container with restrained safe-edge padding", async () => {
    const styles = await readFile(new URL("../client/src/index.css", import.meta.url), "utf8");

    expect(styles).toContain(".container { width: 100%; max-width: none !important;");
    expect(styles).toContain("padding-left: 2rem !important");
    expect(styles).toContain("padding-right: 2rem !important");
  });

  it("uses a reduced-motion-aware transition layer for page navigation", async () => {
    const source = await readFile(new URL("../client/src/components/RouteTransition.tsx", import.meta.url), "utf8");

    expect(source).toContain("useReducedMotion");
    expect(source).toContain('mode="wait"');
    expect(source).toContain("route-progress");
  });

  it("keeps the requested wide hero media, fleet banner, compact header, and persistent theme control in the source", async () => {
    const [home, header, app, styles] = await Promise.all([
      readFile(new URL("../client/src/pages/Home.tsx", import.meta.url), "utf8"),
      readFile(new URL("../client/src/components/Navbar.tsx", import.meta.url), "utf8"),
      readFile(new URL("../client/src/App.tsx", import.meta.url), "utf8"),
      readFile(new URL("../client/src/index.css", import.meta.url), "utf8"),
    ]);

    expect(home).toContain("2xl:grid-cols-[minmax(0,0.78fr)_minmax(720px,1.22fr)]");
    expect(home).toContain("FleetBanner cars={fleet}");
    expect(header).toContain("window.scrollY > 32");
    expect(header).toContain("Use night mode");
    expect(app).toContain('ThemeProvider defaultTheme="light" switchable');
    expect(styles).toContain("html.dark #home");
    expect(styles).toContain("html.dark main [class*=\"bg-[#f7f8f6]\"]");
    expect(styles).toContain("html.dark .comparison-journal");
    expect(styles).toContain("html.dark #site-footer");
    expect(styles).toContain("html.dark header .brand-ink");
  });

  it("extends the roadbook visual treatment from the hero into fleet cards and vehicle journals", async () => {
    const source = await readFile(new URL("../client/src/index.css", import.meta.url), "utf8");

    expect(source).toContain("#fleet article:hover::before");
    expect(source).toContain('main:has([aria-label^="Show gallery"])');
    expect(source).toContain("filter: saturate(1.04) contrast(1.05)");
  });

  it("carries the visual system into comparison and terms pages instead of styling only the homepage", async () => {
    const [comparison, terms, styles] = await Promise.all([
      readFile(new URL("../client/src/pages/CompareVehicles.tsx", import.meta.url), "utf8"),
      readFile(new URL("../client/src/pages/BookingTerms.tsx", import.meta.url), "utf8"),
      readFile(new URL("../client/src/index.css", import.meta.url), "utf8"),
    ]);

    expect(comparison).toContain("comparison-matrix");
    expect(terms).toContain("terms-card");
    expect(styles).toContain(".comparison-journal");
    expect(styles).toContain(".terms-rail");
  });
});
