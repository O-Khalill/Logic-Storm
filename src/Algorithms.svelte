<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import Sorting from "./Sorting.svelte";
  import Searching from "./Searching.svelte";
  import { toast } from "svelte-sonner";

  let selected = $state("");
  let array = $state<number[]>([]);
  let target = $state<number | undefined>();

  let customInput = $state("");
  let targetInput = $state("");

  function genArray() {
    array = Array.from({ length: 15 }, () => Math.ceil(Math.random() * 50));
    customInput = array.join(", ");
  }

  function genArrayWithTarget() {
    array = Array.from({ length: 15 }, () => Math.ceil(Math.random() * 50));
    target = array[Math.floor(Math.random() * array.length)];
    customInput = array.join(", ");
    targetInput = String(target);
  }

  // Validates + applies the custom array only.
  // For searching mode it also picks a fresh random target from the new array.
  function applyArray() {
    const parts = customInput
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s !== "");

    if (parts.length === 0) {
      toast.error("Array cannot be empty.");
      return;
    }
    if (parts.length > 20) {
      toast.error("Maximum 20 elements allowed.");
      return;
    }

    const nums = parts.map((p) => Number(p));
    if (nums.some((n) => isNaN(n) || !Number.isInteger(n) || n < 1 || n > 99)) {
      toast.error("All values must be integers between 1 and 99.");
      return;
    }

    array = nums;

    if (selected === "searching") {
      // Reset to a random target from the new array whenever the array changes
      target = array[Math.floor(Math.random() * array.length)];
      targetInput = String(target);
      toast.success("Array applied — target reset to " + target + ".");
    } else {
      toast.success("Array applied.");
    }
  }

  // Validates + applies ONLY the target — independent of the array.
  function applyTarget() {
    if (array.length === 0) {
      toast.error("Generate or apply an array first.");
      return;
    }

    const raw = targetInput.trim();

    if (raw === "") {
      toast.error("Target cannot be empty.");
      return;
    }

    const t = Number(raw);

    if (isNaN(t) || !Number.isInteger(t)) {
      toast.error("Target must be a whole number.");
      return;
    }
    if (t < 1 || t > 99) {
      toast.error("Target must be between 1 and 99.");
      return;
    }
    if (!array.includes(t)) {
      toast.error(`${t} is not in the current array.`);
      return;
    }

    target = t;
    toast.success("Target set to " + t + ".");
  }
</script>

<div class="flex flex-col items-center gap-4 pb-10">
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
  </div>

  {#if selected}
    <div class="flex flex-col items-center gap-4 w-full max-w-xl px-4">
      <!-- Array input -->
      <div class="w-full flex flex-col gap-2">
        <label
          for="custom-array"
          class="text-gray-400 text-xs font-bold tracking-widest uppercase"
        >
          Array — whole numbers 1–99, comma-separated, max 20
        </label>
        <div class="flex gap-2">
          <input
            id="custom-array"
            type="text"
            bind:value={customInput}
            placeholder="e.g. 12, 5, 34, 8, 21"
            class="flex-1 bg-[#1e1e1e] border-2 border-[#ff3e00]/60 text-white rounded-xl px-4 py-2 font-mono text-sm focus:outline-none focus:border-[#ff3e00]"
          />
          <button
            onclick={applyArray}
            class="px-4 py-2 rounded-xl font-bold text-white bg-[#ff3e00] hover:bg-[#cc3200] transition-colors text-sm"
          >
            Apply
          </button>
          <button
            onclick={selected === "sorting" ? genArray : genArrayWithTarget}
            class="px-4 py-2 rounded-xl font-bold text-gray-400 border border-gray-600 hover:border-[#ff3e00] hover:text-white bg-transparent transition-colors text-sm"
          >
            Random
          </button>
        </div>
      </div>

      <!-- Target input — only shown for searching -->
      {#if selected === "searching"}
        <div class="w-full flex flex-col gap-2">
          <label
            for="search-target"
            class="text-gray-400 text-xs font-bold tracking-widest uppercase"
          >
            Search Target — must be a value in the array
          </label>
          <div class="flex gap-2 items-center">
            <input
              id="search-target"
              type="text"
              inputmode="numeric"
              bind:value={targetInput}
              placeholder="e.g. 21"
              onkeydown={(e) => e.key === "Enter" && applyTarget()}
              class="w-32 bg-[#1e1e1e] border-2 border-[#ff3e00]/60 text-white rounded-xl px-4 py-2 font-mono text-sm focus:outline-none focus:border-[#ff3e00]"
            />
            <button
              onclick={applyTarget}
              class="px-4 py-2 rounded-xl font-bold text-white bg-[#ff3e00] hover:bg-[#cc3200] transition-colors text-sm"
            >
              Set
            </button>
          </div>
        </div>
      {/if}
    </div>
  {/if}

  {#if selected === "sorting"}
    <Sorting {array} />
  {:else if selected === "searching"}
    <Searching {array} {target} />
  {/if}
</div>
