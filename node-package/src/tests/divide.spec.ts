import { describe, expect, it } from "vitest";
import { divide } from "..";

describe("divide function tests", () => {
  it("should divide 2 by 2 and return 1", () => {
    expect(divide(2, 2)).toBe(1);
  });

  it("should divide by 0 and raise error", () => {
    expect(divide(2, 0)).toBe(Infinity);
  });
});
