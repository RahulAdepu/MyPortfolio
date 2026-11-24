# Rahul Adepu — Portfolio

React, TypeScript, Tailwind CSS, and shadcn/ui structure. Preconfigured for zero-config hosting on **GitHub Pages** and **Netlify**.

## Local Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

Outputs a ready-to-host static bundle in `dist/` (including `404.html`, `_redirects`, and `.nojekyll`).

## Host on Netlify (2 options)

- **Git deploy**: Push this folder to GitHub, import the repo in Netlify — `netlify.toml` automatically sets Node 22, runs `npm run build`, publishes `dist/`, and enables SPA routing for the animated 404 page.
- **Drag & drop**: Run `npm run build` and drop the `dist/` folder into [app.netlify.com/drop](https://app.netlify.com/drop) (`dist/_redirects` is bundled automatically).

## Host on GitHub Pages

1. Push this folder to GitHub (`main` or `master`).
2. Open **Settings → Pages → Source** and select **GitHub Actions**.
3. `.github/workflows/deploy.yml` automatically detects your Pages base path (works for custom domains, `<user>.github.io`, or project repos like `<user>.github.io/MyWebsite/`), builds `dist/`, and publishes it.
# MyPortfolio
