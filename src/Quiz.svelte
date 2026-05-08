<script lang="ts">
  import { navigate } from "svelte-routing";
  import { toast } from "svelte-sonner";

  // ── question pool ────────────────────────────────────────────────────────────
  const POOL = [
    {
      q: "What is the worst-case time complexity of Bubble Sort?",
      opts: ["O(n)", "O(n log n)", "O(n²)", "O(log n)"],
      a: 2,
    },
    {
      q: "What is the worst-case time complexity of Quick Sort?",
      opts: ["O(n log n)", "O(n²)", "O(n)", "O(log n)"],
      a: 1,
    },
    {
      q: "What is the time complexity of Binary Search?",
      opts: ["O(n)", "O(n²)", "O(log n)", "O(n log n)"],
      a: 2,
    },
    {
      q: "Binary Search requires the array to be:",
      opts: ["Unsorted", "Sorted", "Has unique elements", "Has even length"],
      a: 1,
    },
    {
      q: "What is the worst-case time complexity of Merge Sort?",
      opts: ["O(n²)", "O(n)", "O(log n)", "O(n log n)"],
      a: 3,
    },
    {
      q: "What is the space complexity of Merge Sort?",
      opts: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
      a: 2,
    },
    {
      q: "After the first pass of Bubble Sort, which element is in its correct position?",
      opts: ["The smallest", "The largest", "The middle", "None"],
      a: 1,
    },
    {
      q: "What is the best-case time complexity of an optimised Bubble Sort?",
      opts: ["O(n²)", "O(log n)", "O(n log n)", "O(n)"],
      a: 3,
    },
    {
      q: "Which sorting algorithm is stable?",
      opts: ["Quick Sort", "Heap Sort", "Merge Sort", "Selection Sort"],
      a: 2,
    },
    {
      q: "What is the time complexity of Linear Search?",
      opts: ["O(log n)", "O(n)", "O(n²)", "O(1)"],
      a: 1,
    },
    {
      q: "What is the average time complexity of Quick Sort?",
      opts: ["O(n²)", "O(n log n)", "O(n)", "O(log n)"],
      a: 1,
    },
    {
      q: "Quick Sort partitions the array around a:",
      opts: ["Midpoint", "Pivot", "Sentinel", "Median"],
      a: 1,
    },
    {
      q: "What is the average space complexity of Quick Sort?",
      opts: ["O(n)", "O(1)", "O(log n)", "O(n log n)"],
      a: 2,
    },
    {
      q: "Which algorithm recursively splits the array then merges?",
      opts: ["Bubble Sort", "Selection Sort", "Quick Sort", "Merge Sort"],
      a: 3,
    },
    {
      q: "What is the best-case time complexity of Linear Search?",
      opts: ["O(n)", "O(log n)", "O(1)", "O(n²)"],
      a: 2,
    },
  ];

  const TOTAL = 10;

  // ── state machine ────────────────────────────────────────────────────────────
  type Step = "register" | "quiz" | "results";
  let step = $state<Step>("register");

  // ── registration ─────────────────────────────────────────────────────────────
  let name = $state("");
  let studentId = $state("");

  function startQuiz() {
    const n = name.trim();
    const id = studentId.trim();

    if (n.length < 2 || n.length > 50) {
      toast.error("Name must be 2–50 characters.");
      return;
    }
    if (!/^[A-Za-z][A-Za-z\s]*$/.test(n)) {
      toast.error("Name must contain only letters (spaces allowed).");
      return;
    }
    if (!/^[A-Za-z0-9]{4,12}$/.test(id)) {
      toast.error(
        "Student ID must be 4–12 alphanumeric characters (e.g. S0012).",
      );
      return;
    }

    name = n;
    studentId = id;
    questions = [...POOL].sort(() => Math.random() - 0.5).slice(0, TOTAL);
    answers = new Array(TOTAL).fill(-1);
    current = 0;
    step = "quiz";
  }

  // ── quiz ─────────────────────────────────────────────────────────────────────
  let questions = $state<typeof POOL>([]);
  let answers = $state<number[]>([]);
  let current = $state(0);

  function pick(i: number) {
    answers[current] = i;
  }

  function next() {
    if (answers[current] === -1) {
      toast.error("Please select an answer.");
      return;
    }
    if (current < TOTAL - 1) {
      current++;
    } else {
      finish();
    }
  }

  // ── results ───────────────────────────────────────────────────────────────────
  let score = $state(0);
  let submitting = $state(false);

  async function finish() {
    score = answers.filter((a, i) => a === questions[i].a).length;
    step = "results";
    submitting = true;

    try {
      const res = await fetch("/api/grades", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, studentId, score, total: TOTAL }),
      });
      if (res.ok) {
        toast.success("Grade saved!");
      } else {
        const err = await res.json().catch(() => ({}));
        toast.error("Could not save grade: " + (err.error ?? res.status));
      }
    } catch {
      toast.error("API unreachable — grade not saved.");
    } finally {
      submitting = false;
    }
  }

  function restart() {
    name = "";
    studentId = "";
    step = "register";
  }

  // ── helpers ──────────────────────────────────────────────────────────────────
  function badge(pct: number) {
    if (pct >= 80)
      return {
        text: "Excellent!",
        cls: "bg-green-600/20  text-green-400  border border-green-500/40",
      };
    if (pct >= 60)
      return {
        text: "Good Job!",
        cls: "bg-yellow-600/20 text-yellow-400 border border-yellow-500/40",
      };
    return {
      text: "Keep Practicing!",
      cls: "bg-red-600/20    text-red-400    border border-red-500/40",
    };
  }
</script>

<!-- ── shared wrapper ─────────────────────────────────────────────────────── -->
<div class="flex flex-col items-center gap-8 py-10 px-4 min-h-[60vh]">
  <h1 class="text-3xl sm:text-4xl font-extrabold text-[#ff3e00] tracking-wide">
    Algorithm Quiz
  </h1>

  <!-- ── REGISTER ───────────────────────────────────────────────────────────── -->
  {#if step === "register"}
    <div
      class="w-full max-w-md bg-[#1a1a1a] border border-[#ff3e00]/30 rounded-2xl p-5 sm:p-8 flex flex-col gap-5"
    >
      <div class="flex flex-col gap-2">
        <label
          class="text-gray-400 text-xs font-bold tracking-widest uppercase"
          for="q-name"
        >
          Full Name
        </label>
        <input
          id="q-name"
          type="text"
          bind:value={name}
          placeholder="e.g. Jane Doe"
          onkeydown={(e) => e.key === "Enter" && startQuiz()}
          class="bg-[#1e1e1e] border-2 border-[#ff3e00]/50 text-white rounded-xl px-4 py-2.5 focus:outline-none focus:border-[#ff3e00] w-full font-mono"
        />
      </div>

      <div class="flex flex-col gap-2">
        <label
          class="text-gray-400 text-xs font-bold tracking-widest uppercase"
          for="q-id"
        >
          Student ID
        </label>
        <input
          id="q-id"
          type="text"
          bind:value={studentId}
          placeholder="e.g. S0012"
          onkeydown={(e) => e.key === "Enter" && startQuiz()}
          class="bg-[#1e1e1e] border-2 border-[#ff3e00]/50 text-white rounded-xl px-4 py-2.5 focus:outline-none focus:border-[#ff3e00] w-full font-mono"
        />
        <p class="text-gray-600 text-xs">4–12 letters and digits, no spaces</p>
      </div>

      <button
        onclick={startQuiz}
        class="w-full px-6 py-3 rounded-xl font-bold text-white bg-[#ff3e00] hover:bg-[#cc3200] transition-colors"
      >
        Start Quiz →
      </button>
    </div>

    <!-- ── QUIZ ───────────────────────────────────────────────────────────────── -->
  {:else if step === "quiz"}
    <!-- progress -->
    <div class="w-full max-w-2xl flex flex-col gap-1">
      <div class="flex justify-between text-xs text-gray-500">
        <span>Question {current + 1} / {TOTAL}</span>
        <span>{current} answered</span>
      </div>
      <div class="w-full bg-gray-800 rounded-full h-1.5">
        <div
          class="bg-[#ff3e00] h-1.5 rounded-full transition-all duration-300"
          style="width: {(current / TOTAL) * 100}%"
        ></div>
      </div>
    </div>

    <!-- question card -->
    <div
      class="w-full max-w-2xl bg-[#1a1a1a] border border-[#ff3e00]/30 rounded-2xl p-5 sm:p-8 flex flex-col gap-6"
    >
      <p class="text-lg sm:text-xl font-bold text-white leading-snug">
        {questions[current]?.q}
      </p>

      <div class="flex flex-col gap-3">
        {#each questions[current]?.opts ?? [] as opt, i}
          <button
            onclick={() => pick(i)}
            class="text-left px-5 py-3 rounded-xl border-2 font-semibold text-sm sm:text-base transition-colors
              {answers[current] === i
              ? 'border-[#ff3e00] bg-[#ff3e00]/10 text-white'
              : 'border-gray-700 text-gray-300 hover:border-[#ff3e00]/50 hover:text-white'}"
          >
            {opt}
          </button>
        {/each}
      </div>

      <div class="flex justify-end">
        <button
          onclick={next}
          class="px-6 py-3 rounded-xl font-bold text-white bg-[#ff3e00] hover:bg-[#cc3200] transition-colors"
        >
          {current < TOTAL - 1 ? "Next →" : "Submit"}
        </button>
      </div>
    </div>

    <!-- ── RESULTS ────────────────────────────────────────────────────────────── -->
  {:else}
    {@const pct = Math.round((score / TOTAL) * 100)}
    {@const b = badge(pct)}

    <div
      class="w-full max-w-md bg-[#1a1a1a] border border-[#ff3e00]/30 rounded-2xl p-5 sm:p-8 flex flex-col items-center gap-6 text-center"
    >
      <div class="flex flex-col items-center gap-3">
        <p class="text-gray-400 text-sm">
          {name} · <span class="font-mono">{studentId}</span>
        </p>
        <p class="text-5xl sm:text-7xl font-extrabold text-[#ff3e00]">
          {score}<span class="text-2xl sm:text-3xl text-gray-500">/{TOTAL}</span
          >
        </p>
        <span class="px-4 py-1.5 rounded-full text-sm font-bold {b.cls}"
          >{b.text}</span
        >
      </div>

      {#if submitting}
        <p class="text-gray-500 text-sm animate-pulse">Saving grade…</p>
      {/if}

      <div class="flex flex-wrap gap-3 justify-center">
        <button
          onclick={() => navigate("/leaderboard")}
          class="px-6 py-3 rounded-xl font-bold text-white bg-[#ff3e00] hover:bg-[#cc3200] transition-colors"
        >
          🏆 Leaderboard
        </button>
        <button
          onclick={restart}
          class="px-6 py-3 rounded-xl font-bold text-white border-2 border-[#ff3e00] hover:bg-[#ff3e00] bg-transparent transition-colors"
        >
          Retake
        </button>
      </div>
    </div>
  {/if}
</div>
