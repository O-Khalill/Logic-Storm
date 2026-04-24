<script>
     import { Router, Route } from "svelte-routing";
     import Head from "./lib/Head.svelte";
     import Hero from "./lib/Hero.svelte";
     import Algorithms from "./Algorithms.svelte";
</script>

<Router>
     <div class="bg-[#121212] h-screen w-full flex flex-col">
          <div
               class="fixed top-25 left-20 w-72 h-72 bg-[#ff3e00] rounded-full blur-[120px] opacity-30 pointer-events-none animate-blob"
          ></div>

          <div
               class="fixed bottom-20 right-20 w-96 h-96 bg-[#ff3e00]
          rounded-full blur-[120px] opacity-30 pointer-events-none
          animate-blob"
          ></div>

          <Head />
          <Route path="/">
               <div class="flex items-center flex-1 justify-center">
                    <Hero />
               </div>
          </Route>
          <Route path="/algorithms">
               <Algorithms />
          </Route>
     </div>
</Router>
