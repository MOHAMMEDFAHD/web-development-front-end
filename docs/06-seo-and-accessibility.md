# 06 · SEO and accessibility

Two sides of the same coin: helping machines (search engines, social apps) and helping people (every visitor, whatever device or ability) understand your page.

## Part 1 · SEO

### The tags every page needs

```html
<title>من نحن | معسكر تطوير الواجهات الأمامية</title>
<meta name="description" content="140 to 160 characters that honestly describe the page.">
<link rel="canonical" href="https://your-site/about.html">
```

| Tag | Rule of thumb |
| --- | ------------- |
| `title` | Under about 60 characters. Page name first, site name after. Unique on every page |
| `description` | 140 to 160 characters. Not a ranking factor, but it decides whether people click |
| `canonical` | The one true URL of the page. Prevents duplicate-content problems |
| `robots` | `index, follow` for normal pages, `noindex` for the 404 page |

`<meta name="keywords">` is in our head only so we can talk about it. Google has ignored it for well over a decade.

### Open Graph and Twitter cards

When someone pastes your link into WhatsApp, Telegram, LinkedIn, Facebook or X, those apps read these tags to build the preview card:

```html
<meta property="og:title" content="...">
<meta property="og:description" content="...">
<meta property="og:image" content="https://your-site/assets/images/og-image.png">
<meta property="og:url" content="https://your-site/">
<meta name="twitter:card" content="summary_large_image">
```

- Use an **absolute** URL for the image, starting with `https://`.
- 1200 x 630 pixels is the safe size for every platform.
- Apps cache previews. After changing the image, use the platform's debugging tool to refresh it.

### Structured data (JSON-LD)

The `<script type="application/ld+json">` blocks describe the page in Schema.org vocabulary. `index.html` declares a `Course`, `about.html` declares an `AboutPage`, a `BreadcrumbList` and a `Person`. Test them with Google's Rich Results Test after deploying.

### Sitemap and robots.txt

- `robots.txt` says who may crawl what, and points to the sitemap.
- `sitemap.xml` lists every public page. Add a `<url>` block each time you add a page.
- Submit the sitemap once in Google Search Console after your first deploy.

### Performance is SEO too

Search engines reward fast pages. This project helps by:

- giving every image `width` and `height` (no layout shift),
- serving WebP through `<picture>` with JPEG as a fallback,
- `loading="lazy"` for images below the fold and `fetchpriority="high"` for the hero,
- `defer` on the script,
- `preconnect` to the font servers and `display=swap` on the fonts,
- shipping zero JavaScript libraries.

Run **Lighthouse** in Chrome DevTools to measure.

## Part 2 · Accessibility

Around one in six people lives with some form of disability. Many more are using a phone in the sun, holding a baby in one arm, or on a slow connection. Accessible sites are better sites for everyone.

### What this project does, and where

| Practice | Where to look |
| -------- | ------------- |
| `lang` and `dir` on `<html>` | Top of every page |
| Skip link to the main content | First element in `<body>` |
| One `<h1>`, headings in order | Every page |
| Landmarks: `header`, `nav`, `main`, `aside`, `footer` | Every page, each `nav` has an `aria-label` |
| `alt` text on every image, empty for decoration | Lesson 06, header logo |
| Labels on every form control | Lesson 09 |
| Errors announced with `aria-live` and linked with `aria-describedby` | Lesson 09 |
| `aria-invalid` on fields that fail validation | `main.js`, section 16 |
| Real `<button>` elements for actions | Everywhere |
| `aria-expanded` on the menu button | Header |
| `aria-pressed` on the theme switch | Header |
| Full keyboard support for tabs | Lesson 01 |
| `aria-sort` on sortable columns | Lesson 08 |
| Visible focus ring with `:focus-visible` | `style.css`, chapter 05 |
| Reduced-motion support | `style.css`, chapter 27 |
| 44 px minimum touch targets on buttons | `style.css`, chapter 08 |
| Content readable without JavaScript | Everywhere |

### The first rule of ARIA

**Do not use ARIA if a native element does the job.** A `<button>` is focusable, clickable with Enter and Space, and announced as a button. A `<div role="button">` needs all of that rebuilt by hand. We only reach for ARIA where HTML has no element for the job, like tabs.

### Test it yourself in ten minutes

1. **Keyboard only.** Unplug the mouse. Press `Tab` from the top. Can you reach and use everything? Can you always see where focus is?
2. **Zoom to 200%.** Does anything overlap or disappear?
3. **Screen reader.** NVDA (free, Windows), VoiceOver (built into Mac and iPhone, `Cmd + F5`), TalkBack (Android). Listen to one lesson.
4. **Lighthouse.** DevTools > Lighthouse > Accessibility. Aim for 100, then remember a perfect score does not mean a perfect experience.
5. **Grayscale.** In DevTools rendering settings, emulate vision deficiencies. Does any information rely on colour alone?

### Contrast

Normal text needs a contrast ratio of at least 4.5:1 against its background, large text 3:1. The colour tokens in `style.css` were picked with that in mind for both themes. If you change them, check with the colour picker in DevTools, it shows the ratio.
