# Front-End Bootcamp · معسكر تطوير الواجهات الأمامية

A free, Arabic-first front-end bootcamp built with nothing but **HTML, CSS and plain JavaScript**. No frameworks, no build step, no magic. Every line is commented so you can read the source like a textbook.

This repository is the companion code for the live bootcamp recorded on the freeCodeCamp Arabic YouTube channel. Each lesson on the page is also a lesson about the code that builds it.

> **بالعربية:** هذا المستودع هو الكود المرافق لمعسكر تطوير الواجهات الأمامية على قناة freeCodeCamp العربية. افتح `index.html` في المتصفح لتشاهد الدروس، وافتح الملف نفسه في المحرر لتقرأ الشرح داخل التعليقات. كل شيء مكتوب بـ HTML وCSS وJavaScript خالصة، بدون أي مكتبات.

---

## Table of contents

- [What you will learn](#what-you-will-learn)
- [Quick start](#quick-start)
- [What is inside](#what-is-inside)
- [Features](#features)
- [Project structure](#project-structure)
- [Available scripts](#available-scripts)
- [Continuous integration](#continuous-integration)
- [Deploying your own copy](#deploying-your-own-copy)
- [Documentation](#documentation)
- [Browser support](#browser-support)
- [Contributing](#contributing)
- [Credits and license](#credits-and-license)

---

## What you will learn

The bootcamp runs for eight weeks. This repository currently contains the full **HTML foundations lab** (weeks 1 and 2) plus the CSS and JavaScript that power it, which we take apart in weeks 3 to 7.

| Week | Topic | Where in this repo |
| ---- | ----- | ------------------ |
| 1 | HTML basics: structure, text, links, images, lists, tables | `index.html`, lessons 01 to 08 |
| 2 | Forms, media, semantic HTML, entities, SEO, accessibility | `index.html`, lessons 09 to 14 |
| 3 | CSS basics: selectors, colours, fonts, units, variables | `assets/css/style.css`, chapters 01 to 05 |
| 4 | Box model and Flexbox | `style.css`, header, buttons, forms |
| 5 | Grid and responsive design | `style.css`, course layout, cards, footer |
| 6 | JavaScript fundamentals | `assets/js/main.js`, helpers and storage |
| 7 | The DOM and events | `main.js`, every feature after section 03 |
| 8 | Final project and deployment | `.github/workflows/ci.yml`, your own fork |

## Quick start

You only need a browser. Really.

1. Download the code: click the green **Code** button on GitHub, then **Download ZIP**, and unzip it.
2. Double-click `index.html`. Done.

A few features (copying code to the clipboard, the web manifest) behave better over `http://` than `file://`, so when you are ready, run a tiny local server:

```bash
# Option A: VS Code
# Install the "Live Server" extension, right-click index.html, "Open with Live Server".

# Option B: Node.js (version 20 or newer)
npm install
npm start          # opens http://localhost:8080

# Option C: Python, already installed on most Macs and Linux machines
python3 -m http.server 8080
```

To work on the code like a developer, clone it with Git instead:

```bash
git clone https://github.com/MOHAMMEDFAHD/web-development-front-end.git
cd web-development-front-end
npm install
npm run lint
```

## What is inside

**`index.html`** is the lab. Fourteen lessons, each in its own `<section>`:

1. What is HTML (with accessible tabs)
2. The document structure, line by line
3. Headings, paragraphs, line breaks, whitespace and comments
4. Text-level semantics: `strong`, `em`, `mark`, `code`, `kbd`, `abbr`, `time`, `q`, `blockquote`, `address` and friends
5. Links: external, relative, fragment, `mailto:`, `tel:` and `download`
6. Images: absolute and relative paths, `alt` text, `figure`, `picture`, `srcset`, lazy loading
7. Lists: unordered, ordered (`reversed`, `start`, `type`) and description lists
8. Tables: `caption`, `thead`, `tbody`, `tfoot`, `scope`, `rowspan`, `colspan`, plus a sortable, searchable table
9. Forms: a real registration form with almost every input type and built-in validation
10. Audio, video and `iframe` embeds
11. Semantic HTML, `details`/`summary` and the native `dialog`
12. HTML entities
13. Meta tags, Open Graph, Twitter cards, canonical URLs and JSON-LD
14. Accessibility checklist

After the lessons come a live **code playground**, a five-question **quiz**, and the **final challenge**: your own profile card.

**`about.html`** shows that a site is more than one page: shared header, footer, stylesheet and script, plus breadcrumbs, a curriculum timeline, an instructor card, an FAQ and a call-to-action form.

**`404.html`** is the friendly page GitHub Pages shows for missing addresses.

## Features

Everything below is written from scratch in `main.js` and `style.css`:

- Light and dark themes that follow the system setting and remember your choice, with no white flash on load
- Right-to-left layout written with CSS logical properties, so switching to `dir="ltr"` just works
- Responsive from 320px phones to wide desktops, with a mobile menu
- Sticky header, reading progress bar, back-to-top button
- Scroll spy that highlights the lesson you are reading
- Lesson progress tracker saved in `localStorage`
- Copy buttons on code blocks, with a fallback for older browsers
- Accessible tabs with full keyboard support, mirrored for RTL
- Sortable and filterable table using `Intl.Collator` for correct Arabic sorting
- Form validation on top of the browser's Constraint Validation API, with friendly Arabic messages, a password strength meter, a character counter and a summary dialog
- Sandboxed HTML playground with live mode and `Ctrl + Enter` to run
- Self-marking quiz
- Reveal-on-scroll and number counters that respect `prefers-reduced-motion`
- Print stylesheet that prints link URLs
- Skip link, visible focus rings, ARIA where it helps and nowhere it does not

Every interactive feature degrades gracefully. Turn JavaScript off and every lesson is still readable, every form still validates, and every accordion still opens.

## Project structure

```
web-development-front-end/
├── index.html                 The HTML lab, 14 lessons + playground + quiz
├── about.html                 About page: mission, curriculum, instructor, FAQ
├── 404.html                   "Page not found" page for GitHub Pages
├── assets/
│   ├── css/style.css          The whole design system, 28 chapters
│   ├── js/main.js             All interactivity, 18 features in 22 sections
│   └── images/                Logo, favicon, hero, Open Graph image, app icons
├── docs/                      Guides for learners and teachers
├── .github/
│   ├── workflows/ci.yml       Lint, link check and deploy
│   ├── dependabot.yml         Keeps tools up to date
│   ├── ISSUE_TEMPLATE/        Bug report and question templates
│   └── pull_request_template.md
├── site.webmanifest           Lets people install the site on their phone
├── robots.txt                 Rules for search engine crawlers
├── sitemap.xml                List of pages for search engines
├── package.json               Dev tools and scripts (the site itself needs none)
├── .htmlvalidate.json         HTML linter rules
├── .stylelintrc.json          CSS linter rules
├── eslint.config.js           JavaScript linter rules
├── lychee.toml                Link checker settings
└── .editorconfig              Shared editor settings
```

There is a longer tour in [docs/02-project-structure.md](docs/02-project-structure.md).

## Available scripts

These need Node.js 20 or newer and one `npm install`.

| Command | What it does |
| ------- | ------------ |
| `npm start` | Serves the site at `http://localhost:8080` with caching turned off |
| `npm run lint` | Runs all three linters, one after the other |
| `npm run lint:html` | Validates the HTML files with html-validate |
| `npm run lint:css` | Checks `style.css` with Stylelint |
| `npm run lint:js` | Checks `main.js` with ESLint |
| `npm run fix:css` | Lets Stylelint fix what it can by itself |
| `npm run fix:js` | Lets ESLint fix what it can by itself |

The website itself has **zero dependencies**. `node_modules` only holds the tools that check our work.

## Continuous integration

`.github/workflows/ci.yml` runs on GitHub's servers every time you push:

1. **Lint.** HTML, CSS and JavaScript are checked. A mistake turns the run red and points at the exact line.
2. **Links.** Every link in the pages and docs is tested. This job also runs every Monday, because links break on their own.
3. **Deploy.** When the `main` branch passes lint, the public files are published to GitHub Pages.

Pull requests are checked but never deployed. The full walkthrough is in [docs/07-ci-and-deployment.md](docs/07-ci-and-deployment.md).

## Deploying your own copy

1. Fork this repository on GitHub.
2. In your fork, open **Settings > Pages** and set **Source** to **GitHub Actions**.
3. Replace `mohammedfahd.github.io/web-development-front-end` with your own address in `index.html`, `about.html`, `robots.txt` and `sitemap.xml`. Search and replace does it in one go. If your repository has a different name, update `<base href>` in `404.html` too.
4. Push to `main`. After a minute or two your site is live at `https://YOUR-NAME.github.io/web-development-front-end/`.

## Documentation

| Guide | For whom |
| ----- | -------- |
| [Getting started](docs/01-getting-started.md) | Complete beginners: tools, first run, first edit |
| [Project structure](docs/02-project-structure.md) | Anyone who wants to know where things live |
| [HTML guide](docs/03-html-guide.md) | Week 1 and 2 learners |
| [CSS guide](docs/04-css-guide.md) | Week 3 to 5 learners |
| [JavaScript guide](docs/05-javascript-guide.md) | Week 6 and 7 learners |
| [SEO and accessibility](docs/06-seo-and-accessibility.md) | Everyone who ships a real site |
| [CI and deployment](docs/07-ci-and-deployment.md) | Week 8, and anyone forking the repo |
| [Recording plan](docs/08-recording-plan.md) | Teachers who want to run this bootcamp themselves |
| [Exercises](docs/09-exercises.md) | Homework for every lesson |

## Browser support

The site works in every evergreen browser from roughly the last three years: Chrome, Edge, Firefox, Safari on macOS and iOS, and Samsung Internet. A handful of newer CSS features (`color-mix()`, `:has()`) are used as enhancements with fallbacks, so older browsers get a slightly plainer look instead of a broken one.

## Contributing

Found a typo, a bug, or an explanation that could be clearer? Please open an issue or a pull request. Read [CONTRIBUTING.md](CONTRIBUTING.md) first, it is short.

## Credits and license

Created by **Mohammed Fahd Abrah** for the freeCodeCamp Arabic community.

Sample video and audio are public domain clips hosted by MDN. The map is from OpenStreetMap contributors. Fonts are IBM Plex Sans Arabic and JetBrains Mono from Google Fonts.

The code is released under the [MIT License](LICENSE). Use it in your classroom, your workshop or your own learning, and keep the license notice.
