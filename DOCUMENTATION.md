# Logic Storm — Project Documentation

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Tech Stack](#2-tech-stack)
3. [How to Run](#3-how-to-run)
4. [Project Structure](#4-project-structure)
5. [Frontend Components](#5-frontend-components)
6. [Shared Utilities](#6-shared-utilities)
7. [Backend API](#7-backend-api)
8. [Testing](#8-testing)
   - [Vitest — Unit Tests](#81-vitest--unit-tests)
   - [Selenium — Browser Automation](#82-selenium--browser-automation)
   - [Postman — API Testing](#83-postman--api-testing)

---

## 1. Project Overview

**Logic Storm** is an interactive algorithm visualizer and quiz platform built as a college project. It is designed to help students understand sorting and searching algorithms through step-by-step animated visualizations, and to assess their understanding through a built-in quiz with a live leaderboard.

### Core Features

| Feature | Description |
|---|---|
| Algorithm Visualizer | Animated step-by-step visualizations of Bubble Sort, Merge Sort, Quick Sort, Linear Search, and Binary Search |
| Custom Array Input | Students can type their own array instead of using a randomly generated one |
| Search Target Input | Students can set a specific search target and validate it against the current array |
| Algorithm Quiz | 10 randomly selected MCQ questions from a pool of 15, covering algorithm complexity and behaviour |
| Student Registration | Name and Student ID required before starting the quiz, with full input validation |
| Leaderboard | Ranks all quiz submissions by score, fetched live from the API |
| REST API | Express server that stores, retrieves, and deletes grade entries from a JSON file |

---

## 2. Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| [Svelte 5](https://svelte.dev) | UI framework using the new Runes reactivity model (`$state`, `$derived`, `$effect`) |
| [Vite](https://vitejs.dev) | Build tool and dev server |
| [TypeScript](https://www.typescriptlang.org) | Static typing throughout the frontend |
| [Tailwind CSS v4](https://tailwindcss.com) | Utility-first styling |
| [svelte-routing](https://github.com/EmilTholin/svelte-routing) | Client-side SPA routing |
| [svelte-sonner](https://github.com/wobsoriano/svelte-sonner) | Toast notification system |
| [shadcn-svelte](https://www.shadcn-svelte.com) | Pre-built UI components (Button, Sonner wrapper) |

### Backend
| Technology | Purpose |
|---|---|
| [Node.js](https://nodejs.org) | Runtime for the API server |
| [Express 5](https://expressjs.com) | HTTP server and routing |
| [cors](https://www.npmjs.com/package/cors) | Cross-origin headers so Postman and the browser can both reach the API |
| `fs` (Node built-in) | Reading and writing `grades.json` |

### Testing
| Technology | Purpose |
|---|---|
| [Vitest](https://vitest.dev) | Unit testing for pure validation logic |
| [Selenium](https://www.selenium.dev) (Python) | Browser automation — tests inputs and the quiz in a real browser |
| [Postman](https://www.postman.com) | Manual API testing for all REST endpoints |

### Developer Tools
| Technology | Purpose |
|---|---|
| [concurrently](https://www.npmjs.com/package/concurrently) | Runs Vite and the Express server in a single terminal with `npm run dev` |

---

## 3. How to Run

### Prerequisites
- Node.js 18+
- Python 3.8+ with `pip`
- Chromium browser (for Selenium)

### Install dependencies

```bash
npm install
pip install selenium
```

### Start the app

```bash
npm run dev
```

This starts **both** the Vite frontend (`http://localhost:5173`) and the Express API (`http://localhost:3001`) at the same time.

### Run unit tests

```bash
npm run test
```

### Run Selenium browser tests

```bash
# Make sure npm run dev is already running
python tests/run.py
```

---

## 4. Project Structure

```
Logic-Storm/
│
├── src/                        # Frontend source
│   ├── App.svelte              # Root component — router + layout
│   ├── Algorithms.svelte       # Algorithm page — category select + array/target input
│   ├── Sorting.svelte          # Sorting sub-page — algorithm selector
│   ├── Searching.svelte        # Searching sub-page — algorithm selector
│   ├── Bubble.svelte           # Bubble Sort visualizer
│   ├── Merge.svelte            # Merge Sort visualizer
│   ├── Quick.svelte            # Quick Sort visualizer
│   ├── Linear.svelte           # Linear Search visualizer
│   ├── Binary.svelte           # Binary Search visualizer
│   ├── Quiz.svelte             # Quiz — registration, questions, results
│   ├── Leaderboard.svelte      # Leaderboard — fetches and ranks grades
│   ├── Particle.svelte         # Decorative floating algorithm symbols
│   ├── app.css                 # Global styles, Tailwind imports, animations
│   └── lib/
│       ├── Head.svelte         # Navigation header
│       ├── Hero.svelte         # Landing page hero section
│       ├── utils.ts            # shadcn utility (cn class merger)
│       ├── validate.ts         # Shared validation logic (array, target, grade)
│       └── validate.test.ts    # Vitest unit tests
│
├── server/
│   ├── index.js                # Express API server
│   └── grades.json             # Persistent grade storage (read/written by the API)
│
├── tests/
│   └── run.py                  # Selenium browser automation script
│
├── public/                     # Static assets served by Vite
├── vite.config.ts              # Vite config + /api proxy to Express
├── package.json                # Dependencies and scripts
└── tsconfig.app.json           # TypeScript config for the frontend
```

---

## 5. Frontend Components

### `App.svelte`
The root of the application. Wraps everything in `svelte-routing`'s `<Router>` and defines the four routes:

| Route | Component |
|---|---|
| `/` | `Hero` — landing page |
| `/algorithms` | `Algorithms` — visualizer |
| `/quiz` | `Quiz` — quiz page |
| `/leaderboard` | `Leaderboard` — rankings |

Also mounts the `<Toaster>` (from `svelte-sonner`) at the app level so toast notifications are available on every page.

---

### `lib/Head.svelte`
The persistent navigation header rendered on every page. Contains:
- The Logic Storm logo and name (clicking navigates home)
- Nav links to **Algorithms**, **Quiz**, and **Leaderboard**

---

### `lib/Hero.svelte`
The landing page. Displays the tagline *"Stop memorizing, start understanding"* and a **Get Started** button that navigates to `/algorithms`. Uses Svelte's `fly` transition for an entrance animation.

---

### `Algorithms.svelte`
The main algorithm page. Manages all shared state for the visualizers:

- **Category buttons** — "Sorting" and "Searching". Clicking one generates a random array (and target for searching) and reveals the sub-components.
- **Array input form** — Lets students type a comma-separated custom array. The **Apply** button runs validation via `validateArray()` and shows a toast on any error. The **Random** button regenerates a random array.
- **Target input form** (searching only) — Lets students set a specific search target. The **Set** button runs validation via `validateTarget()`, checking that the value is a valid integer between 1–99 **and** exists in the current array.

All state (`array`, `target`) flows down as props to `Sorting` and `Searching`.

---

### `Sorting.svelte`
Receives the `array` prop and renders three algorithm buttons: **Bubble Sort**, **Merge Sort**, **Quick Sort**. Clicking a button mounts the corresponding visualizer component and passes the array to it.

---

### `Searching.svelte`
Receives `array` and `target` props. Renders two algorithm buttons: **Linear Search**, **Binary Search**. Uses a `{#key}` block around the visualizer so it fully remounts (resetting all state) whenever `array` or `target` changes — this is the mechanism that ensures the target display always reflects the latest value.

---

### `Bubble.svelte`
Animates **Bubble Sort**. Maintains a local copy of the array (`bars`) and runs through the O(n²) nested loop with 100–300 ms delays between steps. Bars are coloured:
- 🟡 Yellow — currently being compared
- 🔴 Red — currently being swapped
- 🟠 Orange — default

Uses `animate:flip` from Svelte for smooth bar movement. The bar container binds `clientWidth` to dynamically scale bar heights and gaps for different screen sizes.

---

### `Merge.svelte`
Animates **Merge Sort**. Recursively splits the array into halves, then merges them back in sorted order. The merge step highlights active comparison indices in yellow and the element being placed in red.

---

### `Quick.svelte`
Animates **Quick Sort**. Uses the last element of each sub-array as the pivot. The partition step is visualized by highlighting the pivot and the element being compared, swapping when needed. Recursively sorts both partitions.

---

### `Linear.svelte`
Animates **Linear Search**. Scans the array one element at a time, highlighting each in yellow. When the target is found it turns green. Receives both `array` and `target` as props. The `$effect` resets `bars`, `found`, `active`, and `running` whenever the array changes.

---

### `Binary.svelte`
Animates **Binary Search**. Sorts the received array before searching (using `$derived`). Repeatedly halves the search space, highlighting the mid-point. The `$effect` resets state whenever `sorted` changes. Note: because Binary Search requires a sorted array, the bars are always displayed in sorted order regardless of input.

---

### `Quiz.svelte`
A three-step component:

**Step 1 — Registration**
- Collects **Full Name** (2–50 letters/spaces) and **Student ID** (4–12 alphanumeric characters)
- All validation uses `toast.error()` for feedback
- Both inputs support pressing **Enter** to submit

**Step 2 — Quiz**
- 10 questions are randomly selected from a pool of 15 and shuffled
- One question is shown at a time with a progress bar
- Answer options are rendered as buttons; selected option is highlighted in red
- **Next** advances to the next question; clicking **Next** without selecting shows a toast error
- The last question's button says **Submit**

**Step 3 — Results**
- Displays the score (e.g. `8/10`) and a badge: **Excellent!** (≥80%), **Good Job!** (≥60%), **Keep Practicing!** (<60%)
- On reaching this step, the score is automatically `POST`ed to `/api/grades`
- Buttons to **View Leaderboard** or **Retake**

---

### `Leaderboard.svelte`
Fetches grades from `GET /api/grades` on mount using `onMount`. Displays results in a ranked table sorted by percentage (descending). Features:
- 🥇 🥈 🥉 medals for the top three entries
- Percentage badge coloured by score range (red = top, yellow = mid, grey = low)
- A **↻ Refresh** button to re-fetch live data
- Error state with a helpful message if the API server is not running
- Empty state if no grades have been submitted yet

---

### `Particle.svelte`
A purely decorative background layer. Generates 55 floating symbols (algorithm notation like `O(n)`, `log n`, `n²`, Greek letters, `0`/`1`) that animate upward using a CSS `float-up` keyframe animation. Symbols are randomized in position, speed, and delay on page load.

---

## 6. Shared Utilities

### `lib/validate.ts`
Contains three pure validation functions shared between the frontend components and the Vitest test suite. Keeping validation logic here (instead of inline in components) makes it independently testable.

#### `validateArray(input: string)`
Parses a comma-separated string into a number array.

| Condition | Error returned |
|---|---|
| No elements after splitting | `"Array cannot be empty."` |
| More than 20 elements | `"Maximum 20 elements allowed."` |
| Any value is not a whole integer 1–99 | `"All values must be integers between 1 and 99."` |
| All valid | `{ nums: number[], error: "" }` |

#### `validateTarget(input: string, array: number[])`
Validates a search target string against the current array.

| Condition | Error returned |
|---|---|
| Empty string | `"Target cannot be empty."` |
| Not a whole number | `"Target must be a whole number."` |
| Outside range 1–99 | `"Target must be between 1 and 99."` |
| Not found in array | `"X is not in the current array."` |
| Valid | `{ target: number, error: "" }` |

#### `validateGrade(body)`
Server-side grade validation logic (also tested via Vitest).

| Field | Rule |
|---|---|
| `name` | 2–50 characters, letters and spaces only |
| `studentId` | 4–12 alphanumeric characters |
| `score` | Non-negative integer |
| `total` | Positive integer |
| `score` vs `total` | Score cannot exceed total |

Returns `null` if valid, or an error string if not.

---

### `lib/utils.ts`
Auto-generated by shadcn-svelte. Exports a `cn()` function that merges Tailwind class strings using `clsx` and `tailwind-merge`.

---

## 7. Backend API

The API is a lightweight **Express 5** server (`server/index.js`) that persists data to `server/grades.json`. It runs on port **3001** and has CORS enabled so both the browser and Postman can access it.

Vite's dev server proxies all `/api/*` requests to `http://localhost:3001`, so the frontend only ever calls `fetch("/api/grades")` without hardcoding ports.

### Endpoints

---

#### `GET /api/grades`
Returns all grade entries sorted by percentage (descending), then by date (descending).

**Response `200`**
```json
[
  {
    "name": "Emma Davis",
    "studentId": "S005",
    "score": 10,
    "total": 10,
    "percentage": 100,
    "date": "2025-01-14"
  }
]
```

---

#### `POST /api/grades`
Adds a new grade entry. Validates all fields before saving.

**Request body**
```json
{
  "name": "Omar Attia",
  "studentId": "S00122",
  "score": 8,
  "total": 10
}
```

**Response `201`** — the saved entry (with `percentage` and `date` added by the server)

**Response `400`** — validation error
```json
{ "error": "name must be 2–50 letters/spaces." }
```

---

#### `DELETE /api/grades/:studentId`
Removes all entries matching the given Student ID.

**Example:** `DELETE /api/grades/S00122`

**Response `200`**
```json
{ "message": "Deleted 1 entry for \"S00122\"." }
```

**Response `404`** — if no matching entry exists

---

#### `DELETE /api/grades`
Wipes the entire grades file (resets to `[]`). Useful for testing.

**Response `200`**
```json
{ "message": "All grades cleared." }
```

---

## 8. Testing

### 8.1 Vitest — Unit Tests

**File:** `src/lib/validate.test.ts`  
**Run:** `npm run test`

Vitest is used to test the pure validation logic in `validate.ts`. These are fast, isolated unit tests that run in Node.js with no browser needed. There are **28 tests** across 3 suites.

#### What is tested

**`validateArray`** (10 tests)
- Empty string
- Only commas/whitespace
- More than 20 elements
- Non-integer values (e.g. `"abc"`)
- Decimal values (e.g. `"2.5"`)
- Values below 1 (e.g. `"0"`)
- Values above 99 (e.g. `"100"`)
- Valid array returns correct numbers
- Exactly 20 elements (boundary)
- Boundary values `1` and `99`

**`validateTarget`** (7 tests)
- Empty string
- Non-numeric input
- Decimal input
- Value below 1
- Value above 99
- Value not in the array
- Valid target returns correct number

**`validateGrade`** (11 tests)
- Valid grade returns `null`
- Name too short
- Name contains numbers
- Student ID too short
- Student ID with special characters
- Negative score
- Non-integer score
- Total of zero
- Score greater than total
- Score equal to total (boundary)
- Score of zero (boundary)

---

### 8.2 Selenium — Browser Automation

**File:** `tests/run.py`  
**Run:** `python tests/run.py` (requires `npm run dev` running)

Selenium opens a real Chromium browser window and automatically interacts with the app the same way a user would. The script runs top-to-bottom, printing what it is doing at each step. No test framework — just a plain Python script.

#### What is tested

**Array input** (4 scenarios)
1. Clearing the array field and clicking Apply → expects *"cannot be empty"* toast
2. Entering `"abc, 999, -1"` → expects *"integers between 1 and 99"* toast
3. Entering 24 comma-separated numbers → expects *"Maximum 20"* toast
4. Entering `"5, 3, 8, 1, 9"` → expects *"Array applied"* success toast

**Target input** (4 scenarios)
1. Entering `"abc"` → expects *"whole number"* toast
2. Entering `"200"` → expects *"between 1 and 99"* toast
3. Setting array to `"1,2,3,4,5"` then target to `"99"` → expects *"not in the current array"* toast
4. Setting array to `"10,20,30,40,50"` then target to `"30"` → expects *"Target set to 30"* toast

**Quiz** (5 scenarios)
1. Clicking Start Quiz with no input → expects name error toast
2. Entering a 2-character Student ID → expects ID format error toast
3. Valid name + ID → expects the Question 1 card to appear
4. Clicking Next without selecting an answer → expects *"select an answer"* toast
5. Completing all 10 questions by always selecting the first option → expects the results screen (`/10`)

---

### 8.3 Postman — API Testing

Postman was used to manually test and verify all REST API endpoints during development. The API has CORS enabled so no extra headers are needed.

#### Setup
- Set the body type to **raw → JSON** in the Body tab (not "Text")

#### Endpoints to test

| Method | URL | Notes |
|---|---|---|
| `GET` | `http://localhost:3001/api/grades` | No body needed |
| `POST` | `http://localhost:3001/api/grades` | JSON body required (see below) |
| `DELETE` | `http://localhost:3001/api/grades/S00122` | Replace ID in URL |
| `DELETE` | `http://localhost:3001/api/grades` | Clears all grades |

#### POST request body
```json
{
  "name": "Omar Attia",
  "studentId": "S00122",
  "score": 8,
  "total": 10
}
```

#### Validation error examples

| Invalid input | Response |
|---|---|
| Name with no space or too short | `400` — name must be 2–50 letters/spaces |
| Student ID shorter than 4 characters | `400` — studentId must be 4–12 alphanumeric chars |
| `score` greater than `total` | `400` — score cannot exceed total |
| Missing any field | `400` with the relevant message |
| Wrong Content-Type (Text instead of JSON) | Body is not parsed — same 400 errors appear |
| Non-existent Student ID in DELETE | `404` — No entries found for studentId |
