import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "index.html"),
        resume: path.resolve(__dirname, "resume.html"),
      },
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) return;
          if (id.includes("recharts") || id.includes("d3-") || id.includes("victory-vendor")) return "charts";
          if (id.includes("@supabase") || id.includes("@tanstack/react-query")) return "data";
          if (id.includes("react") || id.includes("scheduler")) return "react";
          if (id.includes("@radix-ui") || id.includes("cmdk") || id.includes("lucide-react")) return "ui";
          return "vendor";
        },
      },
    },
  },
}));
