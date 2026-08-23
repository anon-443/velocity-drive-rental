import { afterEach, describe, expect, it, vi } from "vitest";

describe("PUBLIC_SITE_URL", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("builds the public metadata API address from the configured custom domain", async () => {
    const publicSiteUrl = process.env.PUBLIC_SITE_URL;
    expect(publicSiteUrl).toBe("https://velodrive-rentals.me");

    const request = vi.fn().mockResolvedValue(new Response(null, { status: 204 }));
    vi.stubGlobal("fetch", request);

    await fetch(new URL("/api/trpc/auth.me", publicSiteUrl).toString(), { method: "HEAD" });

    expect(request).toHaveBeenCalledWith("https://velodrive-rentals.me/api/trpc/auth.me", { method: "HEAD" });
  });
});
