<script>
     import { Router, Route } from "svelte-routing";
     import Head from "./lib/Head.svelte";
     import Hero from "./lib/Hero.svelte";
     import Algorithms from "./Algorithms.svelte";
     import Particle from "./Particle.svelte";
</script>

<Router>
     <div class="bg-[#121212] h-screen w-full flex flex-col bg-grid scanlines">
          <!-- <div
               class="fixed top-25 left-20 w-42 h-42 bg-[#ff3e00] rounded-full opacity-40 blur-[110px] pointer-events-none animate-blob"
          ></div>

          <div
               class="fixed bottom-25 right-20 w-42 h-72 bg-[#ff3e00] rounded opacity-40 blur-[110px] pointer-events-none animate-blob"
          ></div>
 -->
          <Head />
          <Route path="/">
               <div class="flex items-center flex-1 justify-center">
                    <Hero />
               </div>
          </Route>
          <Route path="/algorithms">
               <Algorithms />
          </Route>

          <Particle />
     </div>
</Router>
