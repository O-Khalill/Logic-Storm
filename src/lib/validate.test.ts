import { describe, it, expect } from "vitest";
import { validateArray, validateTarget, validateGrade } from "./validate";

// ── validateArray ─────────────────────────────────────────────────────────────

describe("validateArray", () => {
  it("rejects an empty string", () => {
    expect(validateArray("").error).toBe("Array cannot be empty.");
  });

  it("rejects only commas / whitespace", () => {
    expect(validateArray("  ,  ,  ").error).toBe("Array cannot be empty.");
  });

  it("rejects more than 20 elements", () => {
    expect(validateArray("1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21").error)
      .toBe("Maximum 20 elements allowed.");
  });

  it("rejects non-integer values", () => {
    expect(validateArray("1, abc, 3").error)
      .toBe("All values must be integers between 1 and 99.");
  });

  it("rejects decimals", () => {
    expect(validateArray("1, 2.5, 3").error)
      .toBe("All values must be integers between 1 and 99.");
  });

  it("rejects values below 1", () => {
    expect(validateArray("0, 5, 10").error)
      .toBe("All values must be integers between 1 and 99.");
  });

  it("rejects values above 99", () => {
    expect(validateArray("10, 100, 50").error)
      .toBe("All values must be integers between 1 and 99.");
  });

  it("accepts a valid array", () => {
    const result = validateArray("5, 3, 8, 1, 9");
    expect(result.error).toBe("");
    expect(result.nums).toEqual([5, 3, 8, 1, 9]);
  });

  it("accepts exactly 20 elements", () => {
    const input = Array.from({ length: 20 }, (_, i) => i + 1).join(", ");
    expect(validateArray(input).error).toBe("");
  });

  it("accepts boundary values 1 and 99", () => {
    const result = validateArray("1, 99");
    expect(result.error).toBe("");
    expect(result.nums).toEqual([1, 99]);
  });
});

// ── validateTarget ────────────────────────────────────────────────────────────

describe("validateTarget", () => {
  const array = [10, 20, 30, 40, 50];

  it("rejects an empty string", () => {
    expect(validateTarget("", array).error).toBe("Target cannot be empty.");
  });

  it("rejects non-numeric input", () => {
    expect(validateTarget("abc", array).error).toBe("Target must be a whole number.");
  });

  it("rejects a decimal", () => {
    expect(validateTarget("2.5", array).error).toBe("Target must be a whole number.");
  });

  it("rejects values below 1", () => {
    expect(validateTarget("0", array).error).toBe("Target must be between 1 and 99.");
  });

  it("rejects values above 99", () => {
    expect(validateTarget("200", array).error).toBe("Target must be between 1 and 99.");
  });

  it("rejects a value not in the array", () => {
    expect(validateTarget("99", array).error).toBe("99 is not in the current array.");
  });

  it("accepts a value that is in the array", () => {
    const result = validateTarget("30", array);
    expect(result.error).toBe("");
    expect(result.target).toBe(30);
  });
});

// ── validateGrade ─────────────────────────────────────────────────────────────

describe("validateGrade", () => {
  const valid = { name: "Omar Attia", studentId: "S00122", score: 8, total: 10 };

  it("accepts a valid grade", () => {
    expect(validateGrade(valid)).toBeNull();
  });

  it("rejects a name that is too short", () => {
    expect(validateGrade({ ...valid, name: "A" }))
      .toBe("name must be 2–50 letters/spaces.");
  });

  it("rejects a name with numbers", () => {
    expect(validateGrade({ ...valid, name: "Omar123" }))
      .toBe("name must be 2–50 letters/spaces.");
  });

  it("rejects a studentId that is too short", () => {
    expect(validateGrade({ ...valid, studentId: "AB" }))
      .toBe("studentId must be 4–12 alphanumeric chars.");
  });

  it("rejects a studentId with special characters", () => {
    expect(validateGrade({ ...valid, studentId: "S001@2" }))
      .toBe("studentId must be 4–12 alphanumeric chars.");
  });

  it("rejects a negative score", () => {
    expect(validateGrade({ ...valid, score: -1 }))
      .toBe("score must be a non-negative integer.");
  });

  it("rejects a non-integer score", () => {
    expect(validateGrade({ ...valid, score: 7.5 }))
      .toBe("score must be a non-negative integer.");
  });

  it("rejects a total of zero", () => {
    expect(validateGrade({ ...valid, total: 0 }))
      .toBe("total must be a positive integer.");
  });

  it("rejects score greater than total", () => {
    expect(validateGrade({ ...valid, score: 11, total: 10 }))
      .toBe("score cannot exceed total.");
  });

  it("accepts score equal to total", () => {
    expect(validateGrade({ ...valid, score: 10, total: 10 })).toBeNull();
  });

  it("accepts score of zero", () => {
    expect(validateGrade({ ...valid, score: 0 })).toBeNull();
  });
});
