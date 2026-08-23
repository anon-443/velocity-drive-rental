import { readFile } from "node:fs/promises";
import { describe, expect, it } from "vitest";

describe("visual polish system", () => {
  it("keeps the hero headline within a balanced responsive scale and avoids desktop hyphen splitting", async () => {
    const source = await readFile(new URL("../client/src/pages/Home.tsx", import.meta.url), "utf8");

    expect(source).toContain('lg:grid-cols-[minmax(0,1.1fr)_minmax(500px,0.9fr)]');
    expect(source).toContain('lg:text-[clamp(4.5rem,4.7vw,5.6rem)]');
    expect(source).toContain('sm:whitespace-nowrap');
  });

  it("uses a reduced-motion-aware transition layer for page navigation", async () => {
    const source = await readFile(new URL("../client/src/components/RouteTransition.tsx", import.meta.url), "utf8");

    expect(source).toContain("useReducedMotion");
    expect(source).toContain('mode="wait"');
    expect(source).toContain("route-progress");
  });
});
