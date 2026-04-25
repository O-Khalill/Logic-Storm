<script lang="ts">
     import { Button } from "$lib/components/ui/button";
     import Linear from "./Linear.svelte";

     let { array, target } = $props();
     let selected = $state("");
</script>

<div class="flex flex-col items-center gap-6 mt-10">
     <h1 class="text-4xl font-extrabold text-[#ff3e00] tracking-wide">
          Sorting Algorithms
     </h1>
     <p class="text-gray-400 text-lg">Pick an algorithm to visualize</p>

     <div class="flex gap-4">
          <Button
               onclick={() => (selected = "Linear")}
               class="px-6 py-3 rounded-xl font-bold text-white border-2 border-[#ff3e00] hover:bg-[#ff3e00] transition-colors duration-200 {selected ===
               'bubble'
                    ? 'bg-[#ff3e00]'
                    : ''}"
          >
               Linear search
          </Button>
          <Button
               onclick={() => (selected = "Binary")}
               class="px-6 py-3 rounded-xl font-bold text-white border-2 border-[#ff3e00] hover:bg-[#ff3e00] transition-colors duration-200 {selected ===
               'merge'
                    ? 'bg-[#ff3e00]'
                    : ''}"
          >
               Binary search
          </Button>
     </div>

     {#if selected === "Linear"}
          <Linear {array} {target} />
          <!-- {:else if selected === "Binary""}
          <Merge {array} /> -->
     {/if}
</div>
