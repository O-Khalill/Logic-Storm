<script lang="ts">
  import { onMount } from "svelte";

  interface GradeEntry {
    name: string;
    studentId: string;
    score: number;
    total: number;
    percentage: number;
    date: string;
  }

  let grades = $state<GradeEntry[]>([]);
  let loading = $state(true);
  let error = $state("");

  const medals = ["🥇", "🥈", "🥉"];

  async function loadGrades() {
    loading = true;
    error = "";
    try {
      const res = await fetch("/api/grades");
      if (!res.ok) throw new Error(`Server returned ${res.status}`);
      grades = await res.json();
    } catch (e: any) {
      error = e.message ?? "Unknown error";
    } finally {
      loading = false;
    }
  }

  onMount(loadGrades);
</script>

<div class="flex flex-col items-center gap-6 py-10 px-4">
  <div class="flex items-center gap-4">
    <h1
      class="text-3xl sm:text-4xl font-extrabold text-[#ff3e00] tracking-wide"
    >
      🏆 Leaderboard
    </h1>
    <button
      onclick={loadGrades}
      disabled={loading}
      class="px-3 py-1.5 rounded-lg text-xs font-bold text-gray-400 border border-gray-600 hover:border-[#ff3e00] hover:text-white disabled:opacity-40 transition-colors"
    >
      {loading ? "…" : "↻ Refresh"}
    </button>
  </div>

  {#if loading}
    <p class="text-gray-400 animate-pulse">Loading…</p>
  {:else if error}
    <div class="flex flex-col items-center gap-3 text-center">
      <p class="text-red-400">Failed to load grades: {error}</p>
      <p class="text-gray-500 text-sm">
        Make sure the API server is running (<code
          class="font-mono text-gray-400">npm run dev</code
        >)
      </p>
    </div>
  {:else if grades.length === 0}
    <p class="text-gray-500">No grades yet — be the first to take the quiz!</p>
  {:else}
    <div
      class="w-full max-w-2xl overflow-x-auto rounded-2xl border border-[#ff3e00]/30"
    >
      <table class="w-full text-sm text-white">
        <thead>
          <tr
            class="bg-[#1e1e1e] text-[#ff3e00] uppercase tracking-widest text-xs"
          >
            <th class="py-2 px-2 sm:py-3 sm:px-4 text-center w-10">Rank</th>
            <th class="py-2 px-2 sm:py-3 sm:px-4 text-left">Name</th>
            <th
              class="py-2 px-2 sm:py-3 sm:px-4 text-center hidden sm:table-cell"
              >ID</th
            >
            <th class="py-2 px-2 sm:py-3 sm:px-4 text-center">Score</th>
            <th class="py-2 px-2 sm:py-3 sm:px-4 text-center">%</th>
            <th
              class="py-2 px-2 sm:py-3 sm:px-4 text-center hidden md:table-cell"
              >Date</th
            >
          </tr>
        </thead>
        <tbody>
          {#each grades as entry, i}
            <tr
              class="border-t border-[#ff3e00]/10 transition-colors {i === 0
                ? 'bg-[#ff3e00]/10'
                : 'bg-[#121212] hover:bg-[#1e1e1e]'}"
            >
              <td
                class="py-2 px-2 sm:py-3 sm:px-4 text-center text-base sm:text-lg"
              >
                {i < 3 ? medals[i] : i + 1}
              </td>
              <td class="py-2 px-2 sm:py-3 sm:px-4 font-bold">{entry.name}</td>
              <td
                class="py-2 px-2 sm:py-3 sm:px-4 text-center text-gray-400 font-mono hidden sm:table-cell"
                >{entry.studentId}</td
              >
              <td
                class="py-2 px-2 sm:py-3 sm:px-4 text-center font-bold text-[#ff3e00] font-mono"
              >
                {entry.score}/{entry.total}
              </td>
              <td class="py-2 px-2 sm:py-3 sm:px-4 text-center">
                <span
                  class="inline-block px-2 py-0.5 rounded-full text-xs font-bold
                  {entry.percentage >= 90
                    ? 'bg-[#ff3e00] text-white'
                    : entry.percentage >= 70
                      ? 'bg-yellow-600/40 text-yellow-300'
                      : 'bg-gray-700 text-gray-300'}"
                >
                  {entry.percentage}%
                </span>
              </td>
              <td
                class="py-2 px-2 sm:py-3 sm:px-4 text-center text-gray-500 text-xs hidden md:table-cell"
                >{entry.date}</td
              >
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  {/if}
</div>
