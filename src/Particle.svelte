<script lang="ts">
     const particles = Array.from({ length: 55 }, (_, i) => ({
          id: i,
          left: Math.random() * 100,
          bottom: Math.random() * 100,
          duration: 4 + Math.random() * 5,
          delay: -(Math.random() * 3),
          symbol: [
               "0",
               "1",
               "{}",
               "[]",
               "Θ",
               "n²",
               "log n",
               "∑",
               "01",
               "O(n)",
               "O(n^2",
               "Ω",
               "α",
               "β",
               "γ",
               "δ",
               "ε",
               "ζ",
               "η",
               "θ",
               "λ",
               "μ",
               "π",
               "σ",
               "τ",
               "φ",
               "ψ",
               "ω",
               "Ω",
               "Σ",
               "Δ",
               "Λ",
               "Γ",
               "Π",
               "0",
               "1",
               "n²",
               "log n",
               "O(n)",
          ][Math.floor(Math.random() * 10)],
     }));
</script>

{#each particles as p}
     <div
          class="particle"
          style="left: {p.left}%; bottom: {p.bottom}%; animation-duration: {p.duration}s; animation-delay: {p.delay}s;"
     >
          {p.symbol}
     </div>
{/each}
