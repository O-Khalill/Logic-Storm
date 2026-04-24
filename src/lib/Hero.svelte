<script>
     import { slide } from "svelte/transition";
     import { Button } from "$lib/components/ui/button";
</script>

<div
     in:slide={{ duration: 2000 }}
     class="  text-center text-4xl text-[#ff3e00]"
>
     <h1>
          Stop memorizing, start understanding. <br />
          Interactive visualizations that make complex algorithms click.
     </h1>
     <Button
          class=" text-xl p-5 font-extrabold bg-[#ff3e00] text-white border-3 border-black"
     >
          Get started
     </Button>
</div>
