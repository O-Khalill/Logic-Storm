<script lang="ts">
     import { Button } from "$lib/components/ui/button";
     import Sorting from "./Sorting.svelte";
     let selected = $state("");

     let array = $state<number[]>([]);

     function genArray() {
          array = Array.from({ length: 12 }, () =>
               Math.floor(Math.random() * 50),
          );
     }
</script>

<div class="flex flex-col items-center">
     <h1 class="text-4xl font-extrabold text-[#ff3e00] tracking-wide">
          Choose Your Algorithm Category
     </h1>
     <div class="flex justify-evenly gap-3">
          <Button
               onclick={() => {
                    selected = "sorting";
                    genArray();
               }}
               class="px-6 py-3 rounded-xl font-bold text-white border-2 border-[#ff3e00] hover:bg-[#ff3e00] transition-colors duration-200 my-3 text-lg {selected ===
               'sorting'
                    ? 'bg-[#ff3e00]'
                    : 'bg-transparent'}"
          >
               Sorting
          </Button>
          <Button
               onclick={() => {
                    selected = "searching";
               }}
               class="px-6 py-3 rounded-xl font-bold text-white border-2 border-[#ff3e00] hover:bg-[#ff3e00] transition-colors duration-200 my-3 text-lg {selected ===
               'searching'
                    ? 'bg-[#ff3e00]'
                    : 'bg-transparent'}"
          >
               Searching
          </Button>
          <Button
               onclick={() => {
                    selected = "path";
               }}
               class="px-6 py-3 rounded-xl font-bold text-white border-2 border-[#ff3e00] hover:bg-[#ff3e00] transition-colors duration-200 my-3 text-lg {selected ===
               'path'
                    ? 'bg-[#ff3e00]'
                    : 'bg-transparent'}"
          >
               Path finding
          </Button>
     </div>

     {#if selected === "sorting"}
          <Sorting {array} />
     {:else if selected === "searching"}
          <!-- <Searching /> -->
     {:else if selected === "path"}
          <!-- <Pathfinding /> -->
     {/if}
</div>
