<script lang="ts">
  import { flip } from "svelte/animate";

  let { array, target } = $props();

  let running = $state(false);
  let active = $state<number[]>([]);
  let sorted = $derived([...array].sort((a, b) => a - b));
  let bars = $state<number[]>([]);
  let found = $state();
  let containerWidth = $state(800);

  function barHeight(v: number) {
    const factor = containerWidth > 640 ? 6 : containerWidth > 420 ? 4 : 3;
    return v * factor + 10;
  }

  function showLabel() {
    return containerWidth / bars.length >= 22;
  }

  $effect(() => {
    bars = [...sorted];
    found = undefined;
    active = [];
    running = false;
  });

  async function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function binarySearch() {
    running = true;
    found = undefined;
    let left = 0;
    let right = bars.length - 1;

    while (left <= right) {
      let mid = Math.floor((left + right) / 2);
      active = [mid];
      await sleep(400);

      if (bars[mid] === target) {
        found = mid;
        await sleep(1000);
        break;
      } else if (bars[mid] < target) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }

    active = [];
    running = false;
  }
</script>

<div class="flex flex-col items-center gap-4 font-sans">
  <button
    onclick={binarySearch}
    disabled={running}
    class="px-6 py-3 rounded-xl font-bold text-white bg-[#ff3e00] disabled:opacity-50"
  >
    {running ? "Searching..." : "Run"}
  </button>
  <p
    class="text-2xl sm:text-4xl font-extrabold text-[#ff3e00] tracking-wide text-center"
  >
    Target : {target}
  </p>
  <div
    bind:clientWidth={containerWidth}
    class="flex items-end gap-0.75 sm:gap-2 md:gap-3 px-2 sm:px-4 md:px-6 py-3 border-2 border-[#ff3e00] rounded-xl w-full max-w-3xl overflow-x-auto"
    style="min-height: {barHeight(50) + 24}px"
  >
    {#each bars as item, i (i)}
      <div
        animate:flip={{ duration: 300 }}
        class="flex-1 min-w-6 max-w-12 rounded-t-md flex items-end justify-center overflow-hidden text-white text-center font-extrabold border border-white transition-all duration-150 transform"
        class:bg-yellow-400={active.includes(i) && found === undefined}
        class:bg-[#ff3e00]={!active.includes(i) && found === undefined}
        class:bg-green-500={found === i}
        style="height: {barHeight(item)}px"
      >
        {#if showLabel()}
          <span class="text-[9px] sm:text-xs leading-none pb-0.5">{item}</span>
        {/if}
      </div>
    {/each}
  </div>
</div>
