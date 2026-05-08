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
    class="text-center text-[#ff3e00] px-6 sm:px-4"
  >
    <h1 class="text-2xl sm:text-3xl md:text-4xl font-extrabold leading-snug">
      Stop memorizing start understanding <br class="hidden sm:block" />
      visualizations that make algorithms click
    </h1>
    <Button
      onclick={() => navigate("/algorithms")}
      class="px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-extrabold text-white border-2 border-[#ff3e00] hover:bg-[#ff3e00] transition-colors duration-200 text-base sm:text-xl my-4"
    >
      Get started
    </Button>
  </div>
{/if}
