import { readFile } from "node:fs/promises";
import { describe, expect, it } from "vitest";

describe("hero search desktop layout", () => {
  it("keeps the Find vehicles column within the responsive grid", async () => {
    const source = await readFile(new URL("../client/src/components/HeroSearch.tsx", import.meta.url), "utf8");

    expect(source).toContain("minmax(176px,202px)");
    expect(source).toContain("whitespace-nowrap");
    expect(source).not.toContain("1.03fr_202px");
  });
});
