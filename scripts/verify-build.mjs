import assert from "node:assert/strict"
import fs from "node:fs"
import path from "node:path"

const root = process.cwd()
const dist = path.join(root, "dist")

const requiredDistFiles = [
  "index.html",
  "404.html",
  "_redirects",
  "_headers",
  ".nojekyll",
  "favicon.svg",
]

for (const file of requiredDistFiles) {
  const full = path.join(dist, file)
  assert.ok(fs.existsSync(full), `Missing dist artifact: ${file}`)
}

const indexHtml = fs.readFileSync(path.join(dist, "index.html"), "utf8")
const notFoundHtml = fs.readFileSync(path.join(dist, "404.html"), "utf8")
assert.ok(notFoundHtml.includes("__IS_404_PAGE__"), "dist/404.html must include __IS_404_PAGE__ marker")
assert.match(indexHtml, /src="(\.\/|\/[^"]*)assets\/index-/, "Missing built JS script tag in dist/index.html")
assert.match(indexHtml, /rel="icon"[^>]*favicon\.svg/, "Missing favicon link in dist/index.html")
assert.match(indexHtml, /application\/ld\+json/, "Missing JSON-LD structured data")

const assetsDir = path.join(dist, "assets")
const assetFiles = fs.readdirSync(assetsDir)
assert.ok(assetFiles.some((f) => f.endsWith(".js")), "Missing built JS bundle")
assert.ok(assetFiles.some((f) => f.endsWith(".css")), "Missing built CSS bundle")

const headers = fs.readFileSync(path.join(dist, "_headers"), "utf8")
for (const h of ["X-Frame-Options", "X-Content-Type-Options", "Referrer-Policy"]) {
  assert.ok(headers.includes(h), `Missing security header in _headers: ${h}`)
}

// Verify no hardcoded current year slipped into src/
function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const p = path.join(dir, entry.name)
    return entry.isDirectory() ? walk(p) : [p]
  })
}

const currentYear = String(new Date().getFullYear())
for (const file of walk(path.join(root, "src"))) {
  const content = fs.readFileSync(file, "utf8")
  assert.ok(
    !content.includes(currentYear),
    `Found hardcoded current year (${currentYear}) in ${path.relative(root, file)}`,
  )
}

console.log(
  `PASS: All ${requiredDistFiles.length} dist artifacts, security headers, SEO metadata, and dynamic-year checks passed.`,
)
