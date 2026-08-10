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
          const marker = "/node_modules/";
          const markerIndex = id.lastIndexOf(marker);
          if (markerIndex === -1) return;

          const packagePath = id.slice(markerIndex + marker.length);
          if (/^(react|react-dom|react-router|react-router-dom|scheduler)(\/|$)/.test(packagePath)) return "framework";
          if (/^(recharts|d3-|victory-vendor)(\/|$)/.test(packagePath)) return "charts";
          if (/^(@supabase|@tanstack\/react-query)(\/|$)/.test(packagePath)) return "data";
          if (/^(@radix-ui|cmdk|lucide-react)(\/|$)/.test(packagePath)) return "ui";
          return undefined;
        },
      },
    },
  },
}));
