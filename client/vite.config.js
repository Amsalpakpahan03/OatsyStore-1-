import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/api": {
        target:
          "https://84f4aea9-6cd1-497c-9633-5f97fba4cd4f-00-oacy874i4krt.sisko.replit.dev",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
