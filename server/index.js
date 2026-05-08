import express from "express";
import cors from "cors";
import { readFileSync, writeFileSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const GRADES_FILE = join(__dirname, "grades.json");
const PORT = 3001;

// ─── initialise file ────────────────────────────────────────────────────────
if (!existsSync(GRADES_FILE)) {
  writeFileSync(GRADES_FILE, JSON.stringify([], null, 2));
}

function read() {
  try {
    return JSON.parse(readFileSync(GRADES_FILE, "utf-8"));
  } catch {
    return [];
  }
}

function write(data) {
  writeFileSync(GRADES_FILE, JSON.stringify(data, null, 2));
}

// ─── app ────────────────────────────────────────────────────────────────────
const app = express();
app.use(cors());
app.use(express.json());

// ─── GET /api/grades ─────────────────────────────────────────────────────────
// Returns every grade entry sorted by percentage desc, then date desc.
// Postman: GET http://localhost:3001/api/grades
app.get("/api/grades", (_req, res) => {
  const sorted = read().sort(
    (a, b) => b.percentage - a.percentage || b.date.localeCompare(a.date),
  );
  res.json(sorted);
});

// ─── POST /api/grades ────────────────────────────────────────────────────────
// Body (JSON):
//   { "name": "Jane Doe", "studentId": "S0012", "score": 8, "total": 10 }
// Postman: POST http://localhost:3001/api/grades
//          Content-Type: application/json
app.post("/api/grades", (req, res) => {
  const { name, studentId, score, total } = req.body ?? {};

  // --- validation ---
  if (
    !name ||
    typeof name !== "string" ||
    name.trim().length < 2 ||
    name.trim().length > 50 ||
    !/^[A-Za-z\s]+$/.test(name.trim())
  ) {
    return res.status(400).json({ error: "name must be 2–50 letters/spaces." });
  }
  if (
    !studentId ||
    typeof studentId !== "string" ||
    !/^[A-Za-z0-9]{4,12}$/.test(studentId.trim())
  ) {
    return res
      .status(400)
      .json({ error: "studentId must be 4–12 alphanumeric chars." });
  }
  if (!Number.isInteger(score) || score < 0) {
    return res
      .status(400)
      .json({ error: "score must be a non-negative integer." });
  }
  if (!Number.isInteger(total) || total <= 0) {
    return res.status(400).json({ error: "total must be a positive integer." });
  }
  if (score > total) {
    return res.status(400).json({ error: "score cannot exceed total." });
  }

  const entry = {
    name: name.trim(),
    studentId: studentId.trim(),
    score,
    total,
    percentage: Math.round((score / total) * 100),
    date: new Date().toISOString().split("T")[0],
  };

  const grades = read();
  grades.push(entry);
  write(grades);

  res.status(201).json(entry);
});

// ─── DELETE /api/grades/:studentId ──────────────────────────────────────────
// Removes every entry that matches the given studentId.
// Postman: DELETE http://localhost:3001/api/grades/S00122
app.delete("/api/grades/:studentId", (req, res) => {
  const id = req.params.studentId.trim();
  const before = read();
  const after = before.filter((e) => e.studentId !== id);

  if (after.length === before.length) {
    return res
      .status(404)
      .json({ error: `No entries found for studentId "${id}".` });
  }

  write(after);
  res.json({
    message: `Deleted ${before.length - after.length} entry for "${id}".`,
  });
});

// ─── DELETE /api/grades ──────────────────────────────────────────────────────
// Wipes all grades — useful for resetting state during testing.
// Postman: DELETE http://localhost:3001/api/grades
app.delete("/api/grades", (_req, res) => {
  write([]);
  res.json({ message: "All grades cleared." });
});

// ─── start ───────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n  Grades API  →  http://localhost:${PORT}\n`);
  console.log("  Endpoints:");
  console.log(`    GET    http://localhost:${PORT}/api/grades`);
  console.log(`    POST   http://localhost:${PORT}/api/grades`);
  console.log(`    DELETE http://localhost:${PORT}/api/grades/:studentId`);
  console.log(`    DELETE http://localhost:${PORT}/api/grades\n`);
});
