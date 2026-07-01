# Repository Guidelines

## Project Structure & Module Organization

This repository is a static landing page for AQUA-5 DRY. The production files live at the repository root:

- `index.html` contains the page structure, copy, links, and calculator markup.
- `styles.css` contains all layout, responsive, and visual styling.
- `script.js` contains the dosage calculator and sticky CTA behavior.
- `Images/` contains local product, logo, and supporting image assets.
- `WORKFLOW Template/` is reference material only; do not treat it as production source.

There is currently no framework, bundler, or package manifest.

## Build, Test, and Development Commands

- `python -m http.server 4173 --bind 127.0.0.1`  
  Serves the static site locally at `http://127.0.0.1:4173/`.
- `node --check script.js`  
  Verifies JavaScript syntax without running a browser.
- `git diff --check`  
  Checks for whitespace errors before committing.
- `npx wrangler pages deploy <publish-dir> --project-name=aqua5dry --branch=main`  
  Directly deploys a prepared static folder to Cloudflare Pages.

For direct deploys, publish only `index.html`, `styles.css`, `script.js`, and `Images/`; do not upload `.git/` or workflow templates.

## Coding Style & Naming Conventions

Use two-space indentation in HTML, CSS, and JavaScript. Keep filenames stable because Cloudflare serves them directly. Prefer descriptive class names such as `.slider-control`, `.result-panel`, and `.shop-note`. Keep CSS variables in `:root` and reuse the existing color tokens instead of adding a new palette.

Use real German umlauts and symbols (`Ä`, `ö`, `ü`, `€`). Do not commit text that shows UTF-8 mojibake from misdecoded German copy.

## Testing Guidelines

There is no automated test framework. Validate changes manually in desktop and mobile widths. For calculator changes, verify the key examples: `15.000 l -> 28 g -> 1x 70 g`, `50.000 l -> 94 g -> 1x 140 g`, and `150.000 l` with start dose -> `560 g -> 2x 280 g`.

## Commit & Pull Request Guidelines

Commit messages in this repo use short imperative summaries, for example `Restore slider dosage calculator` or `Refine branding and German copy`.

Pull requests should include a concise change summary, screenshots for visual changes, tested viewport sizes, and any Cloudflare deployment URL. Mention if pricing, availability, or product claims were changed, because those must stay source-grounded.

## Deployment Notes

Production is Cloudflare Pages project `aqua5dry`, branch `main`, with custom domain `aqua5dry.munverricht.org`. After deployment, verify the live domain with a cache-busted request and check that the slider calculator is present.
