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

     async function bubbleSort() {
          running = true;
          let arr = [...bars];

          for (let i = 0; i < arr.length; i++) {
               for (let j = 0; j < arr.length - i - 1; j++) {
                    active = [j, j + 1];

                    if (arr[j] > arr[j + 1]) {
                         swapping = [j, j + 1];
                         [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                         bars = [...arr];
                         await sleep(120);
                    }
                    swapping = [];
                    await sleep(190);
               }
          }

          active = [];
          swapping = [];
          running = false;
     }
</script>

<div class="flex flex-col items-center gap-4 font-sans">
     <button
          onclick={bubbleSort}
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
                    class="w-10 rounded-t-md flex justify-center text-white text-center text-l font-extrabold border border-white transition-all duration-150 transform"
                    class:bg-red-500={swapping.includes(i)}
                    class:bg-yellow-400={!swapping.includes(i) &&
                         active.includes(i)}
                    class:bg-[#ff3e00]={!swapping.includes(i) &&
                         !active.includes(i)}
                    class:scale-110={swapping.includes(i)}
                    style="height: {item * 6}px"
               >
                    {item}
               </div>
          {/each}
     </div>
</div>
