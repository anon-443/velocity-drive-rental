import { readFile } from "node:fs/promises";
import { describe, expect, it } from "vitest";

describe("hero search desktop layout", () => {
  it("keeps a compact four-field rental control grid without a separate action box", async () => {
    const source = await readFile(new URL("../client/src/components/HeroSearch.tsx", import.meta.url), "utf8");

    expect(source).toContain("md:grid-cols-2");
    expect(source).toContain("minmax(250px,1.18fr)");
    expect(source).toContain("minmax(218px,1fr)");
    expect(source).toContain("xl:grid-cols-[minmax(250px,1.18fr)_minmax(218px,1fr)_minmax(218px,1fr)_minmax(228px,1.03fr)]");
    expect(source).toContain('aria-label="Rental search controls"');
    expect(source).not.toContain("Find vehicles");
    expect(source).toContain("whitespace-nowrap");
    expect(source).not.toContain("lg:grid-cols-[");
  });
});
