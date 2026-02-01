import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    host: true,      // <--- ADD THIS: Allows Docker to connect
    port: 5173,      // <--- ADD THIS: Ensures the correct port
    watch: {
      usePolling: true // <--- OPTIONAL: Helps Windows sync changes better
    }
  }
});
