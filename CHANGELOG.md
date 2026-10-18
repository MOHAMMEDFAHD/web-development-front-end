# Changelog

All notable changes to this project are written down here, newest first.

## 1.0.0 · 2026-10-18

The first full release of the bootcamp code.

### Added

- `index.html` rebuilt as a 14-lesson HTML lab, with playground, quiz and final challenge.
- `about.html` rebuilt with mission, audience, eight-week timeline, instructor, values, FAQ and call to action.
- `404.html` for GitHub Pages.
- Complete `<head>` on every page: SEO meta tags, canonical URL, Open Graph, Twitter cards, theme colour, favicons, web manifest and JSON-LD structured data.
- `assets/css/style.css`: design tokens, light and dark themes, RTL with logical properties, responsive layout, print and reduced-motion styles.
- `assets/js/main.js`: 18 independent features in plain JavaScript, all with graceful fallbacks.
- GitHub Actions workflow: HTML, CSS and JS linting, link checking and Pages deployment.
- Documentation in `docs/`, contributing guide, issue and pull request templates.

### Fixed (compared with the first live-coded version)

- `rel="null"` on an external link replaced with `rel="noopener noreferrer"`.
- Empty `<header>` and `<footer>` inside `<main>` replaced with a proper article that has its own header and footer.
- Images now have `width`, `height` and meaningful `alt` text.
- Tables use `scope` on header cells and `border` moved from HTML into CSS.
- The huge inline base64 image replaced with a normal file reference.
