import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Using HashRouter in the app, so no SPA fallback config is required for
// static hosts (Firebase Hosting, Netlify, GitHub Pages all work as-is).
export default defineConfig({
  // Repo name → served from https://<user>.github.io/jinju-smart-phone-mobile/
  // Change this if you rename the repo (or set to "/" for a custom domain / user page).
  base: "/jinju-smart-phone-mobile/",
  plugins: [react()],
});
