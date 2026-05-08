export function validateArray(input: string): { nums: number[]; error: string } {
  const parts = input
    .split(",")
    .map((s) => s.trim())
    .filter((s) => s !== "");

  if (parts.length === 0)
    return { nums: [], error: "Array cannot be empty." };

  if (parts.length > 20)
    return { nums: [], error: "Maximum 20 elements allowed." };

  const nums = parts.map((p) => Number(p));

  if (nums.some((n) => isNaN(n) || !Number.isInteger(n) || n < 1 || n > 99))
    return { nums: [], error: "All values must be integers between 1 and 99." };

  return { nums, error: "" };
}

export function validateTarget(
  input: string,
  array: number[]
): { target: number; error: string } {
  const raw = input.trim();

  if (raw === "")
    return { target: -1, error: "Target cannot be empty." };

  const t = Number(raw);

  if (isNaN(t) || !Number.isInteger(t))
    return { target: -1, error: "Target must be a whole number." };

  if (t < 1 || t > 99)
    return { target: -1, error: "Target must be between 1 and 99." };

  if (!array.includes(t))
    return { target: -1, error: `${t} is not in the current array.` };

  return { target: t, error: "" };
}

export function validateGrade(body: {
  name: unknown;
  studentId: unknown;
  score: unknown;
  total: unknown;
}): string | null {
  const { name, studentId, score, total } = body;

  if (
    !name ||
    typeof name !== "string" ||
    name.trim().length < 2 ||
    name.trim().length > 50 ||
    !/^[A-Za-z\s]+$/.test(name.trim())
  )
    return "name must be 2–50 letters/spaces.";

  if (
    !studentId ||
    typeof studentId !== "string" ||
    !/^[A-Za-z0-9]{4,12}$/.test((studentId as string).trim())
  )
    return "studentId must be 4–12 alphanumeric chars.";

  if (!Number.isInteger(score) || (score as number) < 0)
    return "score must be a non-negative integer.";

  if (!Number.isInteger(total) || (total as number) <= 0)
    return "total must be a positive integer.";

  if ((score as number) > (total as number))
    return "score cannot exceed total.";

  return null;
}
