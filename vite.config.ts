import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  plugins: [svelte(), tailwindcss()],
  resolve: {
    alias: { $lib: path.resolve("./src/lib") },
  },
  server: {
    proxy: {
      // All /api/* requests are forwarded to the Express server.
      // The frontend can just call fetch("/api/grades") without worrying about ports.
      "/api": "http://localhost:3001",
    },
  },
});
