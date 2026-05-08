<script>
  import logo from "../assets/network.png";
  import { navigate } from "svelte-routing";
</script>

<header class="flex items-center justify-between m-2 gap-3 py-4">
  <div
    class="flex items-center gap-3 cursor-pointer"
    onclick={() => navigate("/")}
    role="button"
    tabindex="0"
    onkeydown={(e) => e.key === "Enter" && navigate("/")}
  >
    <img class="object-contain h-10 w-10" src={logo} alt="Logo" />
    <span class="text-[#ff3e00] font-pixel font-bold text-3xl">
      Logic Storm
    </span>
  </div>

  <nav class="flex items-center gap-6 mr-2">
    <a
      href="/algorithms"
      class="text-white hover:text-[#ff3e00] transition-colors font-bold tracking-wide text-sm"
    >
      Algorithms
    </a>
    <a
      href="/quiz"
      class="text-white hover:text-[#ff3e00] transition-colors font-bold tracking-wide text-sm"
    >
      Quiz
    </a>
    <a
      href="/leaderboard"
      class="text-white hover:text-[#ff3e00] transition-colors font-bold tracking-wide text-sm"
    >
      Leaderboard
    </a>
  </nav>
</header>
