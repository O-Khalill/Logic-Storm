<script>
  import { Router, Route } from "svelte-routing";
  import Head from "./lib/Head.svelte";
  import Hero from "./lib/Hero.svelte";
  import Algorithms from "./Algorithms.svelte";
  import Particle from "./Particle.svelte";
  import Quiz from "./Quiz.svelte";
  import Leaderboard from "./Leaderboard.svelte";
  import { Toaster } from "svelte-sonner";
</script>

<Router>
  <div class="bg-[#121212] min-h-screen w-full flex flex-col bg-grid scanlines">
    <Head />
    <Route path="/">
      <div class="flex items-center flex-1 justify-center">
        <Hero />
      </div>
    </Route>
    <Route path="/algorithms">
      <Algorithms />
    </Route>
    <Route path="/quiz">
      <Quiz />
    </Route>
    <Route path="/leaderboard">
      <Leaderboard />
    </Route>
    <Particle />
    <Toaster theme="dark" richColors position="top-center" />
  </div>
</Router>
