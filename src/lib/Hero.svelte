<script>
     import { fade } from "svelte/transition";
     import { Button } from "$lib/components/ui/button";
     import { navigate } from "svelte-routing";

     let show = true;
</script>

{#if show}
     <div
          in:fade={{ duration: 1000 }}
          class="  text-center text-4xl text-[#ff3e00]"
     >
          <h1>
               Stop memorizing, start understanding. <br />
               Interactive visualizations that make complex algorithms click.
          </h1>
          <Button
               onclick={() => navigate("/algorithms")}
               class="px-6 py-3 rounded-xl font-bold text-white border-2 border-[#ff3e00] hover:bg-[#ff3e00] transition-colors duration-200"
          >
               Get started
          </Button>
     </div>
{/if}
