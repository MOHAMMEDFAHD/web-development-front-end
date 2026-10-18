# 02 · Project structure

A tour of every file, what it is for, and when you would touch it.

## The pages

### `index.html`

The heart of the bootcamp. It is long because it is a textbook. The order inside is:

1. The `<head>`, grouped into nine numbered blocks: essentials, title and SEO, Open Graph, Twitter, device appearance, fonts, styles, the no-flash theme script, and structured data.
2. The skip link and the scroll progress bar.
3. The site header with the logo, navigation and theme toggle.
4. `<main>`, containing the hero, the course layout (table of contents plus 14 lessons), the playground, the quiz and the profile card.
5. The site footer.
6. Floating pieces outside `<main>`: back-to-top button, toast region and two `<dialog>` elements.

Every lesson follows the same shape, so once you understand one you understand them all:

```html
<section id="links" class="lesson" aria-labelledby="links-title" data-reveal>
  <header class="lesson__header">
    <p class="lesson__number">الدرس 05</p>
    <h2 id="links-title" class="lesson__title">الروابط</h2>
    <p class="lesson__lead">...</p>
  </header>

  <!-- the lesson content -->

  <footer class="lesson__footer">
    <label class="lesson-check">
      <input type="checkbox" data-lesson-check="links">
      <span>أنهيت هذا الدرس</span>
    </label>
  </footer>
</section>
```

### `about.html`

The second page. It reuses the exact same header, footer, stylesheet and script. Its job in the course is to show why we keep CSS and JS in separate files: change them once and every page updates.

### `404.html`

GitHub Pages serves this automatically for any address that does not exist. It uses `<base href>` so the stylesheet loads even from deep, wrong URLs.

## The assets

### `assets/css/style.css`

The entire design system, split into 28 numbered chapters. The list of chapters is at the top of the file. The important idea is **design tokens**: every colour, size and spacing value is a CSS custom property defined in chapter 01. Components only ever use the tokens, which is why the dark theme is just a second list of values.

### `assets/js/main.js`

All interactivity, in 22 numbered sections. The file is one self-running function containing small independent features. Each feature looks for its own `data-*` attributes and quietly does nothing if they are missing. See the [JavaScript guide](05-javascript-guide.md).

### `assets/images/`

| File | Used for |
| ---- | -------- |
| `logo.svg` | The logo in the header, and the relative-path example in lesson 06 |
| `favicon.svg` | The browser tab icon |
| `apple-touch-icon.png` | The icon when someone adds the site to an iPhone home screen |
| `icon-192.png`, `icon-512.png` | App icons listed in `site.webmanifest` |
| `hero-640.*`, `hero-1280.*` | The hero image, in two widths and two formats for `<picture>` |
| `og-image.png` | The 1200 x 630 preview card for social media |
| `avatar.svg` | The profile picture placeholder |

### `assets/media/`

Empty on purpose. If you want to host your own video or audio for lesson 10 instead of the MDN samples, put the files here and change the `src` attributes.

## The data attributes, at a glance

`main.js` finds elements through these attributes. If you add one to the HTML, the matching feature switches on.

| Attribute | Feature |
| --------- | ------- |
| `data-theme-toggle` | Theme switch button |
| `data-nav-toggle`, `data-site-nav`, `data-site-header` | Mobile menu |
| `data-scroll-progress` | Reading progress bar |
| `data-back-to-top` | Back-to-top button |
| `data-toc` | Table of contents for scroll spy |
| `data-reveal` | Fade in on scroll |
| `data-count-to="40"` | Count up to a number |
| `data-tabs` | Tabs container |
| `data-lesson-check="id"` | Lesson progress checkbox |
| `data-course-progress`, `data-course-progress-label`, `data-progress-reset` | Progress display |
| `data-persist="key"` | Checkbox that remembers its state |
| `data-sortable` | Sortable table |
| `data-table-filter="tableId"` | Search box for a table |
| `data-validate` | Form with custom validation messages |
| `data-simple-form` | Validated form that shows a thank-you toast |
| `data-char-count` | Textarea with a character counter |
| `data-password-toggle`, `data-password-meter` | Password helpers |
| `data-range-output` | Live value for a range slider |
| `data-dialog-open="id"`, `data-dialog-close` | Dialog buttons |
| `data-accordion-toggle="id"` | Open or close all `details` |
| `data-playground` | Code playground |
| `data-quiz`, `data-answer` | Quiz |
| `data-year` | Current year |
| `data-toast-region` | Where toasts appear |

## The root files

| File | What it does | Edit it when |
| ---- | ------------ | ------------ |
| `site.webmanifest` | Name, colours and icons for installing the site | You rebrand |
| `robots.txt` | Tells crawlers what they may read, points to the sitemap | You move the site |
| `sitemap.xml` | Lists every public page | You add a page |
| `package.json` | Dev tools and npm scripts | You add a tool |
| `package-lock.json` | Exact tool versions, used by `npm ci` | Never by hand |
| `.htmlvalidate.json` | HTML linter rules | You disagree with a rule |
| `.stylelintrc.json` | CSS linter rules | Same |
| `eslint.config.js` | JS linter rules | Same |
| `lychee.toml` | Link checker settings and exclusions | A link is a known false alarm |
| `.editorconfig` | Indentation, line endings, encoding | Rarely |
| `.gitignore` | Files Git should not track | You add generated files |

## The `.github` folder

| File | Purpose |
| ---- | ------- |
| `workflows/ci.yml` | Lint, link check and deploy. See [CI and deployment](07-ci-and-deployment.md) |
| `dependabot.yml` | Monthly pull requests to update actions and tools |
| `ISSUE_TEMPLATE/` | Forms people see when they open an issue |
| `pull_request_template.md` | The checklist people see when they open a pull request |
