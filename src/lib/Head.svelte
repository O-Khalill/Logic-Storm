<script>
  import logo from "../assets/network.png";
  import { navigate } from "svelte-routing";
</script>

<header
  class="flex items-center justify-between mx-3 sm:mx-4 py-3 sm:py-4 gap-2"
>
  <div
    class="flex items-center gap-2 sm:gap-3 cursor-pointer"
    onclick={() => navigate("/")}
    role="button"
    tabindex="0"
    onkeydown={(e) => e.key === "Enter" && navigate("/")}
  >
    <img
      class="object-contain h-8 w-8 sm:h-10 sm:w-10 shrink-0"
      src={logo}
      alt="Logo"
    />
    <span
      class="text-[#ff3e00] font-pixel font-bold text-xl sm:text-3xl leading-none"
    >
      Logic Storm
    </span>
  </div>

  <nav class="flex items-center gap-3 sm:gap-6">
    <a
      href="/algorithms"
      class="text-white hover:text-[#ff3e00] transition-colors font-bold tracking-wide text-xs sm:text-sm"
      >Algorithms</a
    >
    <a
      href="/quiz"
      class="text-white hover:text-[#ff3e00] transition-colors font-bold tracking-wide text-xs sm:text-sm"
      >Quiz</a
    >
    <a
      href="/leaderboard"
      class="text-white hover:text-[#ff3e00] transition-colors font-bold tracking-wide text-xs sm:text-sm"
      >Leaderboard</a
    >
  </nav>
</header>
