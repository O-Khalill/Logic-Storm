<script lang="ts">
     import { Button } from "$lib/components/ui/button";
     import Sorting from "./Sorting.svelte";
     import Searching from "./Searching.svelte";

     let selected = $state("");

     let array = $state<number[]>([]);
     let target = $state();

     function genArray() {
          array = Array.from({ length: 15 }, () =>
               Math.ceil(Math.random() * 50),
          );
     }
     function genArrayWithTarget() {
          array = Array.from({ length: 15 }, () =>
               Math.ceil(Math.random() * 50),
          );

          target = array[Math.floor(Math.random() * array.length)];
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
               class="px-6 py-3 rounded-xl font-bold text-white border-2 border-[#ff3e00] hover:bg-[#ff3e00] transition-colors duration-200 my-3 text-lg tracking-wide {selected ===
               'sorting'
                    ? 'bg-[#ff3e00]'
                    : 'bg-transparent'}"
          >
               Sorting
          </Button>
          <Button
               onclick={() => {
                    selected = "searching";
                    genArrayWithTarget();
               }}
               class="px-6 py-3 rounded-xl font-bold text-white border-2 border-[#ff3e00] hover:bg-[#ff3e00] transition-colors duration-200 my-3 text-lg tracking-wide {selected ===
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
               class="tracking-wide px-6 py-3 rounded-xl font-bold text-white border-2 border-[#ff3e00] hover:bg-[#ff3e00] transition-colors duration-200 my-3 text-lg {selected ===
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
          <Searching {array} {target} />
     {:else if selected === "path"}
          <!-- <Pathfinding /> -->
     {/if}
</div>
