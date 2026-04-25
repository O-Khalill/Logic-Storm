<script>
     import { fly } from "svelte/transition";
     import { Button } from "$lib/components/ui/button";
     import { navigate } from "svelte-routing";
     import { onMount } from "svelte";

     let show = false;

     onMount(() => {
          show = true;
     });
</script>

{#if show}
     <div
          in:fly={{ duration: 3000 }}
          class="  text-center text-4xl text-[#ff3e00]"
     >
          <h1>
               Stop memorizing start understanding <br />
               visualizations that make algorithms click
          </h1>
          <Button
               onclick={() => navigate("/algorithms")}
               class="px-8 py-4.5 rounded-xl font-extrabold text-white border-2 border-[#ff3e00] hover:bg-[#ff3e00] transition-colors duration-200 text-xl my-4  "
          >
               Get started
          </Button>
     </div>
{/if}
