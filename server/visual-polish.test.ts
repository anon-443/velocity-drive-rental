import { readFile } from "node:fs/promises";
import { describe, expect, it } from "vitest";

describe("visual polish system", () => {
  it("keeps the hero headline within a balanced responsive scale and avoids desktop hyphen splitting", async () => {
    const source = await readFile(new URL("../client/src/pages/Home.tsx", import.meta.url), "utf8");

    expect(source).toContain('wide-shell relative z-10');
    expect(source).toContain('lg:grid-cols-[minmax(0,1.1fr)_minmax(500px,0.9fr)]');
    expect(source).toContain('lg:text-[clamp(5.2rem,5.35vw,6.4rem)]');
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
    expect(home).toContain("FleetBanner cars={fleet.filter((car) => visibleCarIds.includes(car.id))}");
    expect(header).toContain("window.scrollY > 32");
    expect(header).toContain("Use night mode");
    expect(app).toContain('ThemeProvider defaultTheme="light" switchable');
    expect(styles).toContain("html.dark #home");
    expect(styles).toContain("html.dark main [class*=\"bg-[#f7f8f6]\"]");
    expect(styles).toContain("html.dark .comparison-journal");
    expect(styles).toContain("html.dark #site-footer");
    expect(styles).toContain("html.dark header .brand-ink");
  });

  it("keeps the tighter featured and supporting fleet-card system with motion-safe refinements", async () => {
    const [fleetGrid, home, styles] = await Promise.all([
      readFile(new URL("../client/src/components/CarGrid.tsx", import.meta.url), "utf8"),
      readFile(new URL("../client/src/pages/Home.tsx", import.meta.url), "utf8"),
      readFile(new URL("../client/src/index.css", import.meta.url), "utf8"),
    ]);

    expect(fleetGrid).toContain('text-[44px]');
    expect(fleetGrid).toContain('grid-cols-[1fr_1.35fr_1fr]');
    expect(fleetGrid).toContain('h-[250px]');
    expect(fleetGrid).toContain('text-[23px]');
    expect(fleetGrid).toContain('text-[22px]');
    expect(fleetGrid).toContain("useReducedMotion");
    expect(home).toContain('py-[4.5rem] sm:py-20');
    expect(styles).toContain('.eyebrow, .fleet-kicker');
    expect(styles).toContain('.fleet-card:hover .fleet-spec');
    expect(styles).toContain('animation-timeline: view()');
    expect(styles).toContain('@media (prefers-reduced-motion: no-preference)');
    expect(fleetGrid).toContain('py-[4.5rem] sm:py-20');
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

  it("uses the shared 72–80px section rhythm and shared eyebrow system across remaining primary routes", async () => {
    const [vehicleDetails, tripDesk, contact] = await Promise.all([
      readFile(new URL("../client/src/pages/VehicleDetails.tsx", import.meta.url), "utf8"),
      readFile(new URL("../client/src/components/TripDesk.tsx", import.meta.url), "utf8"),
      readFile(new URL("../client/src/components/ContactSection.tsx", import.meta.url), "utf8"),
    ]);

    expect(vehicleDetails).toContain('py-[4.5rem] sm:py-20');
    expect(vehicleDetails).toContain('fleet-kicker text-slate-400');
    expect(tripDesk).toContain('py-[4.5rem] sm:py-20');
    expect(tripDesk).toContain('fleet-kicker text-slate-400');
    expect(contact).toContain('py-[4.5rem] sm:py-20');
    expect(contact).toContain('fleet-kicker text-[#f6b256]');
  });

  it("keeps the expanded local rental workflow data-driven and routed through booking, My Drive, and demo administration", async () => {
    const [inventory, fleetSource, app, booking, myDrive, admin] = await Promise.all([
      readFile(new URL("../client/src/data/cars.json", import.meta.url), "utf8"),
      readFile(new URL("../client/src/data/fleet.ts", import.meta.url), "utf8"),
      readFile(new URL("../client/src/App.tsx", import.meta.url), "utf8"),
      readFile(new URL("../client/src/pages/BookingPage.tsx", import.meta.url), "utf8"),
      readFile(new URL("../client/src/pages/MyDrivePage.tsx", import.meta.url), "utf8"),
      readFile(new URL("../client/src/pages/AdminPage.tsx", import.meta.url), "utf8"),
    ]);

    expect((inventory.match(/"id"/g) ?? []).length).toBeGreaterThanOrEqual(12);
    expect(fleetSource).toContain("weeklyRate");
    expect(fleetSource).toContain("unavailableWindows");
    expect(app).toContain('path="/book"');
    expect(app).toContain('path="/my-drive"');
    expect(app).toContain('path="/admin"');
    expect(booking).toContain("useForm<BookingFormValues>");
    expect(booking).toContain("canvas-confetti");
    expect(booking).toContain("browser-local request reference");
    expect(myDrive).toContain("Cancel request");
    expect(admin).toContain("Admin demonstration");
  });

  it("keeps the final accessibility and interaction closures connected to the visible rental experience", async () => {
    const [home, grid, vehicleDetails, admin, visibility] = await Promise.all([
      readFile(new URL("../client/src/pages/Home.tsx", import.meta.url), "utf8"),
      readFile(new URL("../client/src/components/CarGrid.tsx", import.meta.url), "utf8"),
      readFile(new URL("../client/src/pages/VehicleDetails.tsx", import.meta.url), "utf8"),
      readFile(new URL("../client/src/pages/AdminPage.tsx", import.meta.url), "utf8"),
      readFile(new URL("../client/src/lib/useFleetVisibility.ts", import.meta.url), "utf8"),
    ]);

    expect(home).toContain('lg:min-h-[calc(100svh-76px)]');
    expect(home).toContain("const reduceMotion = Boolean(useReducedMotion())");
    expect(home).toContain("visibleCarIds.includes(car.id)");
    expect(grid).toContain("FleetSkeleton");
    expect(grid).toContain("motion-safe:animate-pulse");
    expect(vehicleDetails).toContain("Live planning estimate");
    expect(vehicleDetails).toContain("isCarAvailableForDates");
    expect(vehicleDetails).toContain("Continue with these dates");
    expect(admin).toContain("resetVisibility");
    expect(admin).toContain("immediately affect the public fleet and banner");
    expect(visibility).toContain("velocity-drive-visible-fleet");
  });

  it("keeps the requested hero, booking confirmation, and review-ready refinements honest and motion-safe", async () => {
    const [home, booking, vehicleDetails] = await Promise.all([
      readFile(new URL("../client/src/pages/Home.tsx", import.meta.url), "utf8"),
      readFile(new URL("../client/src/pages/BookingPage.tsx", import.meta.url), "utf8"),
      readFile(new URL("../client/src/pages/VehicleDetails.tsx", import.meta.url), "utf8"),
    ]);

    expect(home).toContain("lg:pt-4 xl:pt-5");
    expect(home).toContain("font-hero-display");
    expect(booking).toContain("AnimatePresence mode=\"wait\"");
    expect(booking).toContain("ConfirmationModal");
    expect(booking).toContain("aria-modal=\"true\"");
    expect(booking).toContain("useReducedMotion");
    expect(vehicleDetails).toContain("Reviews should come from real trips.");
    expect(vehicleDetails).toContain("No invented score");
    expect(vehicleDetails).toContain("verified booking records");
    expect(home).toContain("pt-12 sm:pt-16 lg:min-h");
    expect(vehicleDetails).toContain('sm:grid-cols-3');
    expect(booking).toContain('fixed inset-0 z-50 flex items-center justify-center');
    expect(booking).toContain('w-full max-w-2xl');
    expect(booking).toContain('flex flex-wrap gap-3');
  });
});
