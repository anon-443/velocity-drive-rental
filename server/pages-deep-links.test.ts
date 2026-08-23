import { readFile } from "node:fs/promises";
import { describe, expect, it } from "vitest";

describe("static Pages deep-link output", () => {
  it("writes direct route shells for the known non-crawler page routes", async () => {
    const source = await readFile(new URL("../scripts/configure-static-pages-output.mjs", import.meta.url), "utf8");

    expect(source).toContain('["booking-terms", "compare"]');
    expect(source).toContain('replaceAll("./assets/", "../assets/")');
  });
});
