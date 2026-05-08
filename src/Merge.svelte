<script lang="ts">
  import { flip } from "svelte/animate";
  let { array } = $props();

  let bars = $state<number[]>([]);
  let running = $state(false);
  let active = $state<number[]>([]);
  let swapping = $state<number[]>([]);
  let containerWidth = $state(800);

  function barHeight(v: number) {
    const factor = containerWidth > 640 ? 6 : containerWidth > 420 ? 4 : 3;
    return v * factor + 10;
  }

  function showLabel() {
    return containerWidth / bars.length >= 22;
  }

  $effect(() => {
    bars = [...array];
  });

  async function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function mergeSort() {
    running = true;
    let arr = [...bars];
    await sort(arr, 0, arr.length - 1);
    active = [];
    swapping = [];
    running = false;
  }

  async function sort(arr: number[], l: number, r: number) {
    if (l >= r) return;
    const m = Math.floor(l + (r - l) / 2);

    await sort(arr, l, m);
    await sort(arr, m + 1, r);
    await merge(arr, l, m, r);
  }

  async function merge(arr: number[], l: number, m: number, r: number) {
    let leftPart = arr.slice(l, m + 1);
    let rightPart = arr.slice(m + 1, r + 1);

    let i = 0,
      j = 0,
      k = l;

    while (i < leftPart.length && j < rightPart.length) {
      active = [l + i, m + 1 + j];

      if (leftPart[i] <= rightPart[j]) {
        arr[k] = leftPart[i];
        i++;
      } else {
        swapping = [k];
        arr[k] = rightPart[j];
        j++;
      }

      bars = [...arr];
      await sleep(200);
      swapping = [];
      k++;
    }

    while (i < leftPart.length) {
      arr[k] = leftPart[i];
      bars = [...arr];
      await sleep(150);
      i++;
      k++;
    }
    while (j < rightPart.length) {
      arr[k] = rightPart[j];
      bars = [...arr];
      await sleep(130);
      j++;
      k++;
    }
  }
</script>

<div class="flex flex-col items-center gap-4 font-sans">
  <button
    onclick={mergeSort}
    disabled={running}
    class="px-6 py-3 rounded-xl font-bold text-white bg-[#ff3e00] disabled:opacity-50"
  >
    {running ? "Merging..." : "Run"}
  </button>

  <div
    bind:clientWidth={containerWidth}
    class="flex items-end gap-0.75 sm:gap-2 md:gap-3 px-2 sm:px-4 md:px-6 py-3 border-2 border-[#ff3e00] rounded-xl w-full max-w-3xl overflow-x-auto"
    style="min-height: {barHeight(50) + 24}px"
  >
    {#each bars as item, i (i)}
      <div
        animate:flip={{ duration: 300 }}
        class="flex-1 min-w-4 max-w-12 rounded-t-md flex items-end justify-center overflow-hidden text-white text-center font-extrabold border border-white transition-all duration-150 transform"
        class:bg-red-500={swapping.includes(i)}
        class:bg-yellow-400={!swapping.includes(i) && active.includes(i)}
        class:bg-[#ff3e00]={!swapping.includes(i) && !active.includes(i)}
        class:scale-110={swapping.includes(i)}
        style="height: {barHeight(item)}px"
      >
        {#if showLabel()}
          <span class="text-[9px] sm:text-xs leading-none pb-0.5">{item}</span>
        {/if}
      </div>
    {/each}
  </div>
</div>
