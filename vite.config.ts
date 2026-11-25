import fs from "fs"
import path from "path"
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

function resolveBase(raw?: string): string {
  // Default to relative "./" so dist/ works on ANY GitHub Pages subpath (/MyWebsite/) or Netlify root
  if (!raw) return "./"
  if (raw === "/" || raw === "./") return raw
  const trimmed = raw.replace(/^\/+|\/+$/g, "")
  return trimmed ? `/${trimmed}/` : "/"
}

// Copies dist/index.html -> dist/404.html with a marker so GitHub Pages renders the animated 404 view
function githubPages404() {
  return {
    name: "github-pages-404",
    closeBundle() {
      const distDir = path.resolve(__dirname, "dist")
      const indexFile = path.join(distDir, "index.html")
      const notFoundFile = path.join(distDir, "404.html")
      if (fs.existsSync(indexFile)) {
        const html = fs.readFileSync(indexFile, "utf8")
        const marked = html.replace(
          "<head>",
          "<head>\n    <script>window.__IS_404_PAGE__=true;</script>",
        )
        fs.writeFileSync(notFoundFile, marked, "utf8")
      }
    },
  }
}

export default defineConfig({
  base: resolveBase(process.env.VITE_BASE_PATH),
  plugins: [react(), githubPages404()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
