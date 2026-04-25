<script lang="ts">
     import { flip } from "svelte/animate";

     let { array, target } = $props();

     let running = $state(false);
     let active = $state<number[]>([]);
     let sorted = $derived([...array].sort((a, b) => a - b));
     let bars = $state<number[]>([]);
     let found = $state();

     $effect(() => {
          bars = [...sorted];
          found = undefined;
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
          class="text-4xl font-extrabold text-[#ff3e00] tracking-wide text-center"
     >
          Target : {target}
     </p>
     <div
          class="flex items-end gap-3 px-6 py-3 border-2 border-[#ff3e00] rounded-xl overflow-hidden min-h-100 text-white"
     >
          {#each bars as item, i (i)}
               <div
                    animate:flip={{ duration: 300 }}
                    class="  w-10 rounded-t-md flex justify-center text-white text-center text-l font-extrabold border border-white transition-all duration-150 transform"
                    class:bg-yellow-400={active.includes(i) &&
                         found === undefined}
                    class:bg-[#ff3e00]={!active.includes(i) &&
                         found === undefined}
                    class:bg-green-500={found === i}
                    style="height: {item * 6 + 10}px"
               >
                    {item}
               </div>
          {/each}
     </div>
</div>
