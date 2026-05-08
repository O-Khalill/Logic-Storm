<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import Linear from "./Linear.svelte";
  import Binary from "./Binary.svelte";

  let { array, target } = $props();
  let selected = $state("");
</script>

<div
  class="flex flex-col items-center gap-4 sm:gap-6 mt-6 sm:mt-10 font-extrabold w-full px-3 sm:px-6"
>
  <h1
    class="text-2xl sm:text-4xl font-extrabold text-[#ff3e00] tracking-wide text-center"
  >
    Searching Algorithms
  </h1>
  <p class="text-gray-400 text-sm sm:text-lg">
    Press on category to remake array
  </p>

  <div class="flex flex-wrap justify-center gap-3">
    <Button
      onclick={() => (selected = "Linear")}
      class="px-8 py-4.5 rounded-xl text-xl font-extrabold text-white border-2 border-[#ff3e00] hover:bg-[#ff3e00] transition-colors duration-200 {selected ===
      'Linear'
        ? 'bg-[#ff3e00]'
        : 'bg-transparent'}"
    >
      Linear search
    </Button>

    <Button
      onclick={() => (selected = "Binary")}
      class="px-8 py-4.5 rounded-xl text-xl font-extrabold text-white border-2 border-[#ff3e00] hover:bg-[#ff3e00] transition-colors duration-200 {selected ===
      'Binary'
        ? 'bg-[#ff3e00]'
        : 'bg-transparent'}"
    >
      Binary search
    </Button>
  </div>

  {#if selected === "Linear"}
    {#key `${array}-${target}`}
      <Linear {array} {target} />
    {/key}
  {:else if selected === "Binary"}
    {#key `${array}-${target}`}
      <Binary {array} {target} />
    {/key}
  {/if}
</div>
