import { describe, expect, it } from "vitest";
import { staticOutputAsset } from "../client/src/lib/staticDemo";

describe("static Pages asset output", () => {
  it("maps hosted vehicle media to portable Pages asset paths", () => {
    expect(staticOutputAsset("/manus-storage/velocity-suv_f11b8d82.jpg")).toBe("/assets/velocity-suv.jpg");
    expect(staticOutputAsset("/manus-storage/velocity-drive-new-mark_c1ed0e2a.png")).toBe("/assets/velocity-drive-new-mark.png");
  });
});
