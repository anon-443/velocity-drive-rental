import { describe, expect, it } from "vitest";
import { staticOutputAsset } from "../client/src/lib/staticDemo";

describe("static Pages asset output", () => {
  it("maps hosted vehicle media to portable Pages asset paths", () => {
    expect(staticOutputAsset("/manus-storage/kia-sorento-hybrid_9c1e9c28.jpg")).toBe("/assets/kia-sorento-hybrid.jpg");
    expect(staticOutputAsset("/manus-storage/tesla-model-3_55df243b.jpg")).toBe("/assets/tesla-model-3.jpg");
    expect(staticOutputAsset("/manus-storage/bmw-m5_f01f9672.jpg")).toBe("/assets/bmw-m5.jpg");
    expect(staticOutputAsset("/manus-storage/velocity-drive-new-mark_c1ed0e2a.png")).toBe("/assets/velocity-drive-new-mark.png");
  });
});
