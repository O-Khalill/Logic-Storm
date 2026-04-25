<script lang="ts">
     import { flip } from "svelte/animate";
     let { array } = $props();
     let bars = $state<number[]>([]);
     let running = $state(false);
     let active = $state<number[]>([]);
     let swapping = $state<number[]>([]);

     $effect(() => {
          bars = [...array];
     });

     async function sleep(ms: number) {
          return new Promise((resolve) => setTimeout(resolve, ms));
     }
     async function partition(arr: number[], low: number, high: number) {
          const pivot = arr[high];
          let i = low - 1;
          for (let j = low; j < high; j++) {
               active = [j, high];
               await sleep(150);
               if (arr[j] <= pivot) {
                    i++;
                    swapping = [i, j];
                    [arr[i], arr[j]] = [arr[j], arr[i]];
                    bars = [...arr];
                    await sleep(120);
                    swapping = [];
               }
          }

          swapping = [i + 1, high];
          [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
          bars = [...arr];
          await sleep(120);
          swapping = [];
          active = [];
          return i + 1;
     }
     async function sort(arr: number[], low: number, high: number) {
          if (low >= high) return;
          const pivotIndex = await partition(arr, low, high);
          await sort(arr, low, pivotIndex - 1);
          await sort(arr, pivotIndex + 1, high);
     }
     async function quickSort() {
          running = true;
          let arr = [...bars];
          await sort(arr, 0, arr.length - 1);
          active = [];
          swapping = [];
          running = false;
     }
</script>

<div class="flex flex-col items-center gap-4 font-sans">
     <button
          onclick={quickSort}
          disabled={running}
          class="px-6 py-3 rounded-xl font-bold text-white bg-[#ff3e00] disabled:opacity-50"
     >
          {running ? "Sorting..." : "Run"}
     </button>
     <div
          class="flex items-end gap-3 px-6 py-3 border-2 border-[#ff3e00] rounded-xl overflow-hidden min-h-100"
     >
          {#each bars as item, i (i)}
               <div
                    animate:flip={{ duration: 300 }}
                    class="  w-10 rounded-t-md flex justify-center text-white text-center text-l font-extrabold border border-white transition-all duration-150 transform"
                    class:bg-red-500={swapping.includes(i)}
                    class:bg-yellow-400={!swapping.includes(i) &&
                         active.includes(i)}
                    class:bg-[#ff3e00]={!swapping.includes(i) &&
                         !active.includes(i)}
                    class:scale-110={swapping.includes(i)}
                    style="height: {item * 6 + 10}px"
               >
                    {item}
               </div>
          {/each}
     </div>
</div>
