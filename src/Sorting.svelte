<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import Bubble from "./Bubble.svelte";
  import Merge from "./Merge.svelte";
  import Quick from "./Quick.svelte";

  let { array } = $props();
  let selected = $state("");
</script>

<div
  class="flex flex-col items-center gap-4 sm:gap-6 mt-6 sm:mt-10 font-extrabold w-full px-3 sm:px-6"
>
  <h1
    class="text-2xl sm:text-4xl font-extrabold text-[#ff3e00] tracking-wide text-center"
  >
    Sorting Algorithms
  </h1>
  <p class="text-gray-400 text-sm sm:text-lg">
    Press on category to remake array
  </p>

  <div class="flex flex-wrap justify-center gap-3">
    <Button
      onclick={() => (selected = "bubble")}
      class="text-xl tracking-wide px-6 py-4.5 rounded-xl font-extrabold text-white border-2 border-[#ff3e00] hover:bg-[#ff3e00] transition-colors duration-200 {selected ===
      'bubble'
        ? 'bg-[#ff3e00]'
        : ''}"
    >
      Bubble Sort
    </Button>
    <Button
      onclick={() => (selected = "merge")}
      class="text-xl tracking-wide px-8 py-4.5 rounded-xl font-extrabold text-white border-2 border-[#ff3e00] hover:bg-[#ff3e00] transition-colors duration-200 {selected ===
      'merge'
        ? 'bg-[#ff3e00]'
        : ''}"
    >
      Merge Sort
    </Button>
    <Button
      onclick={() => (selected = "quick")}
      class="text-xl tracking-wide px-6 py-4.5 rounded-xl font-extrabold text-white border-2 border-[#ff3e00] hover:bg-[#ff3e00] transition-colors duration-200 {selected ===
      'quick'
        ? 'bg-[#ff3e00]'
        : ''}"
    >
      Quick Sort
    </Button>
  </div>

  {#if selected === "bubble"}
    <Bubble {array} />
  {:else if selected === "merge"}
    <Merge {array} />
  {:else if selected === "quick"}
    <Quick {array} />
  {/if}
</div>
