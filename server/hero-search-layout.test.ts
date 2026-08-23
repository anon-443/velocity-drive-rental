import { readFile } from "node:fs/promises";
import { describe, expect, it } from "vitest";

describe("hero search desktop layout", () => {
  it("keeps the Find vehicles column within the responsive grid", async () => {
    const source = await readFile(new URL("../client/src/components/HeroSearch.tsx", import.meta.url), "utf8");

    expect(source).toContain("md:grid-cols-2");
    expect(source).toContain("minmax(250px,1.18fr)");
    expect(source).toContain("minmax(218px,1fr)");
    expect(source).toContain("minmax(190px,202px)");
    expect(source).toContain("whitespace-nowrap");
    expect(source).not.toContain("lg:grid-cols-[");
  });
});
