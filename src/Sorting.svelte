<script lang="ts">
     import { Button } from "$lib/components/ui/button";
     let { array } = $props();
</script>

<div class="flex flex-col items-center gap-6 mt-10">
     <h1 class="text-4xl font-extrabold text-[#ff3e00] tracking-wide">
          Sorting Algorithms
     </h1>
     <p class="text-gray-400 text-lg">Pick an algorithm to visualize</p>

     <div class="flex gap-4">
          <button
               class="px-6 py-3 rounded-xl font-bold text-white border-2 border-[#ff3e00] hover:bg-[#ff3e00] transition-colors duration-200"
          >
               Bubble Sort
          </button>
          <button
               class="px-6 py-3 rounded-xl font-bold text-white border-2 border-[#ff3e00] hover:bg-[#ff3e00] transition-colors duration-200"
          >
               Merge Sort
          </button>
          <button
               class="px-6 py-3 rounded-xl font-bold text-white border-2 border-[#ff3e00] hover:bg-[#ff3e00] transition-colors duration-200"
          >
               Quick Sort
          </button>
     </div>
     <div
          class="px-6 py-3 flex rounded-xl font-bold text-white border-2 border-[#ff3e00] items-end gap-3"
     >
          {#each array as item}
               <div
                    class="bg-[#ff3e00] w-10 rounded-t-md flex items-end justify-center text-white text-sm font-bold border-1 rounded-b-md"
                    style="height: {item * 4}px"
               >
                    {item}
               </div>
          {/each}
     </div>
</div>
