<script lang="ts">
     import { Button } from "$lib/components/ui/button";
     import Bubble from "./Bubble.svelte";
     import Merge from "./Merge.svelte";

     let { array } = $props();
     let selected = $state("");
</script>

<div class="flex flex-col items-center gap-6 mt-10">
     <h1 class="text-4xl font-extrabold text-[#ff3e00] tracking-wide">
          Sorting Algorithms
     </h1>
     <p class="text-gray-400 text-lg">Pick an algorithm to visualize</p>

     <div class="flex gap-4">
          <button
               onclick={() => (selected = "bubble")}
               class="px-6 py-3 rounded-xl font-bold text-white border-2 border-[#ff3e00] hover:bg-[#ff3e00] transition-colors duration-200 {selected ===
               'bubble'
                    ? 'bg-[#ff3e00]'
                    : ''}"
          >
               Bubble Sort
          </button>
          <button
               onclick={() => (selected = "merge")}
               class="px-6 py-3 rounded-xl font-bold text-white border-2 border-[#ff3e00] hover:bg-[#ff3e00] transition-colors duration-200 {selected ===
               'merge'
                    ? 'bg-[#ff3e00]'
                    : ''}"
          >
               Merge Sort
          </button>
          <button
               class="px-6 py-3 rounded-xl font-bold text-white border-2 border-[#ff3e00] hover:bg-[#ff3e00] transition-colors duration-200"
          >
               Quick Sort
          </button>
     </div>

     {#if selected === "bubble"}
          <Bubble {array} />
     {:else if selected === "merge"}
          <Merge {array} />
     {/if}
</div>
