import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // Percorsi relativi: il risultato funziona anche in una sottocartella.
  base: "./",
  build: { outDir: "dist", emptyOutDir: true },
});
