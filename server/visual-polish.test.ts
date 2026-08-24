import { readFile } from "node:fs/promises";
import { describe, expect, it } from "vitest";

describe("visual polish system", () => {
  it("keeps the hero headline within a balanced responsive scale and avoids desktop hyphen splitting", async () => {
    const source = await readFile(new URL("../client/src/pages/Home.tsx", import.meta.url), "utf8");

    expect(source).toContain('wide-shell relative z-10');
    expect(source).toContain('lg:grid-cols-[minmax(0,1.1fr)_minmax(500px,0.9fr)]');
    expect(source).toContain('lg:text-[clamp(4.7rem,4.85vw,5.8rem)]');
    expect(source).toContain('sm:whitespace-nowrap');
  });

  it("uses a wide desktop container with restrained safe-edge padding", async () => {
    const styles = await readFile(new URL("../client/src/index.css", import.meta.url), "utf8");

    expect(styles).toContain(".container { width: 100%; max-width: none !important;");
    expect(styles).toContain("padding-left: 1.5rem !important");
    expect(styles).toContain("padding-right: 1.5rem !important");
  });

  it("uses a reduced-motion-aware transition layer for page navigation", async () => {
    const source = await readFile(new URL("../client/src/components/RouteTransition.tsx", import.meta.url), "utf8");

    expect(source).toContain("useReducedMotion");
    expect(source).toContain('mode="wait"');
    expect(source).toContain("route-progress");
    expect(source).toContain('location.startsWith("/fleet/")');
    expect(source).toContain("window.scrollTo");
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
    expect(fleetGrid).toContain('h-48');
    expect(fleetGrid).toContain('text-[21px]');
    expect(fleetGrid).toContain("useReducedMotion");
    expect(home).toContain('py-[4.5rem] sm:py-20');
    expect(styles).toContain('.eyebrow, .fleet-kicker');
    expect(styles).toContain('.fleet-card:hover .fleet-spec');
    expect(styles).toContain('animation-timeline: view()');
    expect(styles).toContain('@media (prefers-reduced-motion: no-preference)');
    expect(fleetGrid).toContain('pb-12 pt-8 sm:pb-14 sm:pt-10');
  });

  it("keeps the fleet filters as a compact pill-based panel with reduced search and sort controls", async () => {
    const source = await readFile(new URL("../client/src/components/CarGrid.tsx", import.meta.url), "utf8");

    expect(source).toContain('aria-label="Fleet filters"');
    expect(source).toContain('rounded-xl border border-[#E8E0D5] bg-white p-4');
    expect(source).toContain('sm:grid-cols-2 lg:grid-cols-4');
    expect(source).toContain('flex flex-wrap gap-1.5');
    expect(source).toContain('inline-flex h-7 w-auto');
    expect(source).toContain('h-11 w-full rounded-[10px]');
    expect(source).toContain('h-10 w-full items-center gap-2 rounded-[10px]');
    expect(source).toContain('text-[13px] font-medium text-slate-500');
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

  it("uses the shared 72–80px section rhythm and shared eyebrow system across remaining public routes", async () => {
    const [vehicleDetails, contact] = await Promise.all([
      readFile(new URL("../client/src/pages/VehicleDetails.tsx", import.meta.url), "utf8"),
      readFile(new URL("../client/src/components/ContactSection.tsx", import.meta.url), "utf8"),
    ]);

    expect(vehicleDetails).toContain('py-[4.5rem] sm:py-20');
    expect(vehicleDetails).toContain('fleet-kicker text-slate-400');
    expect(contact).toContain('py-[4.5rem] sm:py-20');
    expect(contact).toContain('lg:whitespace-nowrap');
    expect(contact).not.toContain('Call, write, or visit');
  });

  it("keeps the required local rental workflow data-driven through booking and demo administration", async () => {
    const [inventory, fleetSource, app, booking, admin] = await Promise.all([
      readFile(new URL("../client/src/data/cars.json", import.meta.url), "utf8"),
      readFile(new URL("../client/src/data/fleet.ts", import.meta.url), "utf8"),
      readFile(new URL("../client/src/App.tsx", import.meta.url), "utf8"),
      readFile(new URL("../client/src/pages/BookingPage.tsx", import.meta.url), "utf8"),
      readFile(new URL("../client/src/pages/AdminPage.tsx", import.meta.url), "utf8"),
    ]);

    expect((inventory.match(/"id"/g) ?? []).length).toBeGreaterThanOrEqual(12);
    expect(fleetSource).toContain("weeklyRate");
    expect(fleetSource).toContain("unavailableWindows");
    expect(app).toContain('path="/book"');
    expect(app).not.toContain('path="/my-drive"');
    expect(app).toContain('path="/admin"');
    expect(booking).toContain("useForm<BookingFormValues>");
    expect(booking).toContain("canvas-confetti");
    expect(booking).toContain("browser-local request reference");
    expect(booking).not.toContain("View My Drive");
    expect(admin).toContain("Admin demonstration");
  });

  it("maps every vehicle label to a model-specific image and never fills detail galleries with another vehicle", async () => {
    const [fleetSource, vehicleDetails] = await Promise.all([
      readFile(new URL("../client/src/data/fleet.ts", import.meta.url), "utf8"),
      readFile(new URL("../client/src/pages/VehicleDetails.tsx", import.meta.url), "utf8"),
    ]);

    [
      "kia-sorento-hybrid", "hyundai-ioniq-5", "mercedes-e300", "toyota-corolla",
      "mazda-cx5", "kia-ev6", "bmw-x3", "honda-civic", "lexus-rx350",
      "volkswagen-tiguan", "tesla-model-3", "skoda-octavia",
    ].forEach((vehicleId) => expect(fleetSource).toContain(`\"${vehicleId}\": staticAssetPath`));
    expect(fleetSource).toContain("image = imageAssets[item.id]");
    expect(fleetSource).toContain("gallery: [image]");
    expect(vehicleDetails).toContain("Vehicle exterior");
    expect(vehicleDetails).toContain("car.gallery.length > 1");
    expect(vehicleDetails).not.toContain("Gallery frame");
  });

  it("keeps the BMW M5, compact full-vehicle card framing, and reliable fleet-detail paths in the public experience", async () => {
    const [inventory, fleetSource, grid, home, bootstrap] = await Promise.all([
      readFile(new URL("../client/src/data/cars.json", import.meta.url), "utf8"),
      readFile(new URL("../client/src/data/fleet.ts", import.meta.url), "utf8"),
      readFile(new URL("../client/src/components/CarGrid.tsx", import.meta.url), "utf8"),
      readFile(new URL("../client/src/pages/Home.tsx", import.meta.url), "utf8"),
      readFile(new URL("../client/src/main.tsx", import.meta.url), "utf8"),
    ]);

    expect(inventory).toContain('"id":"bmw-m5"');
    expect(fleetSource).toContain('"bmw-m5": staticAssetPath');
    expect(fleetSource).toContain("bmw-m5-black_0855dd1c.jpg");
    expect(fleetSource).toContain("featuredFleetOrder");
    expect(fleetSource).toContain("717 hp system output");
    expect(grid).toContain("object-cover object-center");
    expect(grid).toContain("setLocation(`/fleet/${carId}`)");
    expect(grid).toContain("2xl:grid-cols-5");
    expect(home).toContain("setLocation(`/fleet/${car.id}`)");
    expect(bootstrap).toContain("made\\s+with\\s+manus");
    expect(home).not.toContain("<TripDesk");
  });

  it("removes the optional saved workspace and My Drive navigation from the public internship experience", async () => {
    const [app, header, home, booking] = await Promise.all([
      readFile(new URL("../client/src/App.tsx", import.meta.url), "utf8"),
      readFile(new URL("../client/src/components/Navbar.tsx", import.meta.url), "utf8"),
      readFile(new URL("../client/src/pages/Home.tsx", import.meta.url), "utf8"),
      readFile(new URL("../client/src/pages/BookingPage.tsx", import.meta.url), "utf8"),
    ]);

    expect(app).not.toContain("MyDrivePage");
    expect(header).not.toContain('href: "/my-drive"');
    expect(header).not.toContain("My drive");
    expect(home).not.toContain("TripDesk");
    expect(booking).not.toContain("onViewDrive");
  });

  it("keeps the outer spacing tighter and the card grid usable on mobile screens", async () => {
    const [styles, grid] = await Promise.all([
      readFile(new URL("../client/src/index.css", import.meta.url), "utf8"),
      readFile(new URL("../client/src/components/CarGrid.tsx", import.meta.url), "utf8"),
    ]);

    expect(styles).toContain("padding-left: 0.875rem");
    expect(styles).toContain("@media (max-width: 639px)");
    expect(grid).toContain("grid gap-3 sm:grid-cols-2");
  });

  it("removes the requested journey and FAQ sections while keeping the contact inquiry and fleet navigation focused", async () => {
    const [home, header, contact] = await Promise.all([
      readFile(new URL("../client/src/pages/Home.tsx", import.meta.url), "utf8"),
      readFile(new URL("../client/src/components/Navbar.tsx", import.meta.url), "utf8"),
      readFile(new URL("../client/src/components/ContactSection.tsx", import.meta.url), "utf8"),
    ]);

    expect(home).not.toContain('id="how-it-works"');
    expect(home).not.toContain("Three decisions, one smooth departure");
    expect(header).not.toContain("How it works");
    expect(contact).not.toContain("Rental notes");
    expect(contact).not.toContain("A few answers before you ask");
    expect(contact).toContain("Send inquiry");
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
    expect(visibility).toContain('featuredIds = ["bmw-m5"]');
  });

  it("keeps the requested hero, booking confirmation, and review-ready refinements honest and motion-safe", async () => {
    const [home, booking, vehicleDetails, styles] = await Promise.all([
      readFile(new URL("../client/src/pages/Home.tsx", import.meta.url), "utf8"),
      readFile(new URL("../client/src/pages/BookingPage.tsx", import.meta.url), "utf8"),
      readFile(new URL("../client/src/pages/VehicleDetails.tsx", import.meta.url), "utf8"),
      readFile(new URL("../client/src/index.css", import.meta.url), "utf8"),
    ]);

    expect(home).toContain("lg:pt-4 xl:pt-5");
    expect(home).toContain("font-hero-display");
    expect(home).toContain("md:-translate-y-4");
    expect(home).toContain("velocity-interior");
    expect(home).toContain("interior-hero-frame");
    expect(home).toContain("interior-search");
    expect(styles).toContain("Warm gallery system inspired by the supplied interior-design reference");
    expect(styles).toContain("#4e3422");
    expect(styles).toContain("#cbb395");
    expect(styles).toContain(".vehicle-journal-interior");
    expect(styles).toContain("@keyframes gallery-stage");
    expect(styles).toContain(".interior-search form:hover");
    expect(vehicleDetails).toContain("vehicle-journal-interior");
    expect(booking).toContain("AnimatePresence mode=\"wait\"");
    expect(booking).toContain("ConfirmationModal");
    expect(booking).toContain("aria-modal=\"true\"");
    expect(booking).toContain("useReducedMotion");
    expect(vehicleDetails).toContain("Reviews should come from real trips");
    expect(vehicleDetails).toContain("No invented score");
    expect(vehicleDetails).toContain("verified booking records");
    expect(home).toContain("pt-12 sm:pt-16 lg:min-h");
    expect(vehicleDetails).toContain('sm:grid-cols-3');
    expect(booking).toContain('fixed inset-0 z-50 flex items-center justify-center');
    expect(booking).toContain('w-full max-w-2xl');
    expect(booking).toContain('mt-8"><button onClick={onClose}');
  });

  it("keeps the inquiry surface compact and the requested desktop editorial lines concise", async () => {
    const [styles, home, grid] = await Promise.all([
      readFile(new URL("../client/src/index.css", import.meta.url), "utf8"),
      readFile(new URL("../client/src/pages/Home.tsx", import.meta.url), "utf8"),
      readFile(new URL("../client/src/components/CarGrid.tsx", import.meta.url), "utf8"),
    ]);

    expect(styles).toContain("Compact inquiry treatment");
    expect(styles).toContain("#contact .mt-8.grid > form");
    expect(styles).toContain("max-width: 46rem");
    expect(styles).toContain("textarea { min-height: 5.5rem");
    expect(styles).toContain("#contact .mt-8.grid > div:first-child h3 { white-space: nowrap");
    expect(styles).toContain(".interior-nav .nav-link { color: #705d4c; font-size: 0.88rem");
    expect(home).not.toContain("Three decisions, one smooth departure");
    expect(grid).not.toContain('Use the filter rail to compare cabin space');
    expect(grid).not.toContain('availabilityLabel');
    expect(grid).toContain('mt-5 space-y-3');
    expect(grid).toContain('aria-label="Fleet filters"');
    expect(grid).toContain('rounded-xl border border-[#E8E0D5] bg-white p-4');
    expect(grid).toContain('sm:grid-cols-2 lg:grid-cols-4');
    expect(grid).toContain('inline-flex h-7 w-auto');
    expect(grid).toContain('h-11 w-full rounded-[10px]');
  });

  it("keeps way forward on its own hero line and includes the black BMW M5 in the compact upper fleet banner", async () => {
    const [home, styles] = await Promise.all([
      readFile(new URL("../client/src/pages/Home.tsx", import.meta.url), "utf8"),
      readFile(new URL("../client/src/index.css", import.meta.url), "utf8"),
    ]);

    expect(home).toContain('<span className="block whitespace-nowrap">way forward</span>');
    expect(home).toContain('car.id === "bmw-m5"');
    expect(home).toContain('fleet-banner-cards');
    expect(styles).toContain('.velocity-interior .fleet-banner-cards');
    expect(styles).toContain('font-size: clamp(2.8rem, 15vw, 3.7rem)');
  });
});
