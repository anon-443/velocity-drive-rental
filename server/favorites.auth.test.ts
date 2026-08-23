import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

describe("favorites router", () => {
  it("requires an authenticated account before reading saved vehicles", async () => {
    const caller = appRouter.createCaller({ user: null } as TrpcContext);
    await expect(caller.favorites.list()).rejects.toMatchObject({ code: "UNAUTHORIZED" });
  });
});
