import fs from "fs"
import path from "path"
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

function normalizeBase(raw?: string): string {
  if (!raw || raw === "/") return "/"
  const trimmed = raw.replace(/^\/+|\/+$/g, "")
  return trimmed ? `/${trimmed}/` : "/"
}

// Copies dist/index.html -> dist/404.html so GitHub Pages serves the SPA 404 route cleanly
function githubPages404() {
  return {
    name: "github-pages-404",
    closeBundle() {
      const distDir = path.resolve(__dirname, "dist")
      const indexFile = path.join(distDir, "index.html")
      const notFoundFile = path.join(distDir, "404.html")
      if (fs.existsSync(indexFile)) {
        fs.copyFileSync(indexFile, notFoundFile)
      }
    },
  }
}

export default defineConfig({
  base: normalizeBase(process.env.VITE_BASE_PATH),
  plugins: [react(), githubPages404()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
