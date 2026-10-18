# 03 · HTML guide

The ideas behind the 14 lessons in `index.html`. Use this as a revision sheet after each session.

## The three words you must not mix up

```html
<a href="about.html">من نحن</a>
```

| Word | In this example |
| ---- | --------------- |
| **Tag** | `<a>` and `</a>` |
| **Attribute** | `href="about.html"` |
| **Element** | The whole thing: opening tag, content and closing tag |

Some elements are **void**: they have no content and no closing tag. `<img>`, `<br>`, `<hr>`, `<input>`, `<meta>` and `<link>` are the common ones.

## Lesson by lesson

### 01 · What is HTML

HTML describes *meaning*, not looks. A heading is a heading because it is `<h2>`, not because it is big. The big part is CSS.

### 02 · Document structure

```html
<!DOCTYPE html>
<html lang="ar" dir="rtl">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>صفحتي</title>
  </head>
  <body>
  </body>
</html>
```

- `lang` helps screen readers choose a voice and search engines choose an audience.
- `dir="rtl"` is required for Arabic. Without it punctuation and layout end up on the wrong side.
- `charset` must come first in `<head>`, before any text.

### 03 · Headings and text

- One `<h1>` per page.
- Never skip levels going down (`h2` then `h4`). Going back up is fine.
- The browser collapses any run of spaces and new lines into a single space. Use CSS for spacing, not `&nbsp;` or `<br>`.

### 04 · Text-level semantics

| Use | Not | Because |
| --- | --- | ------- |
| `<strong>` | `<b>` | `strong` means importance, `b` only means bold |
| `<em>` | `<i>` | `em` means spoken emphasis |
| `<code>`, `<kbd>` | a monospace font | They tell tools what the text *is* |
| `<time datetime="...">` | plain text dates | Machines can read the exact date |
| `<blockquote>` | indenting with spaces | It is a quote, so say so |

### 05 · Links

```html
<a href="https://example.org" target="_blank" rel="noopener noreferrer">...</a>
```

- `target="_blank"` opens a new tab. Use it sparingly, people like control over their tabs.
- `rel="noopener"` is a security fix: without it, the new page can redirect *your* page through `window.opener`.
- Link text must make sense on its own. "Download the syllabus" beats "click here".

### 06 · Images

- `alt` is required. Describe what the image *says*, not what it *is* ("a team celebrating launch day" beats "photo").
- Decorative images get `alt=""`, an empty value, never a missing attribute.
- Always set `width` and `height` so the page does not jump while loading.
- `loading="lazy"` for images below the first screen. Never on the hero image.
- `<picture>` with `<source type="image/webp">` serves a smaller format to browsers that support it.

### 07 · Lists

- A nested list goes *inside* an `<li>`, never directly inside the outer `<ul>`.
- `<ol>` accepts `reversed`, `start` and `type`.
- `<dl>` is for name and value pairs: glossaries, FAQs, metadata.

### 08 · Tables

- Tables are for data, never for layout.
- `<caption>` is the table's title. Screen readers announce it.
- `<th scope="col">` and `<th scope="row">` say which cells a header describes.
- `colspan` merges across, `rowspan` merges down.
- Borders belong in CSS. The old `border="1"` attribute is obsolete.

### 09 · Forms

The three rules from the lesson:

1. Every control has a `<label>`, linked by `for` and `id`.
2. Related controls sit in a `<fieldset>` with a `<legend>`.
3. Use the right `type`. Phones show the matching keyboard for `email`, `tel` and `number`.

Built-in validation attributes, no JavaScript needed: `required`, `minlength`, `maxlength`, `min`, `max`, `step`, `pattern`, `type="email"`, `type="url"`.

`autocomplete` values like `name`, `email`, `tel` and `new-password` let the browser fill forms for people. That is a big accessibility win, not just a convenience.

### 10 · Media

- `controls` on every `<video>` and `<audio>`. Never autoplay sound.
- `preload="metadata"` or `preload="none"` saves data for people on mobile plans.
- `<iframe>` needs a `title`. Add `loading="lazy"`.

### 11 · Semantic HTML

| Element | Means |
| ------- | ----- |
| `<header>` | Introduction to the page, or to a section or article |
| `<nav>` | A block of major navigation links |
| `<main>` | The unique content of the page. Once per page |
| `<section>` | A themed group of content with its own heading |
| `<article>` | Something that makes sense on its own: a post, a card, a comment |
| `<aside>` | Related but secondary: sidebars, notes, pull quotes |
| `<footer>` | Closing information for the page, section or article |
| `<details>` / `<summary>` | A disclosure widget that works without JavaScript |
| `<dialog>` | A native modal or non-modal dialog |

Tags close in reverse order, like boxes inside boxes:

```html
<!-- wrong -->
<p><strong>text</p></strong>

<!-- right -->
<p><strong>text</strong></p>
```

### 12 · Entities

`&lt;` `&gt;` `&amp;` `&quot;` `&copy;` `&nbsp;`. Inside `<pre><code>` blocks you must escape `<` and `>`, otherwise the browser renders your example instead of showing it.

### 13 · SEO

Covered in depth in [SEO and accessibility](06-seo-and-accessibility.md).

### 14 · Accessibility

Covered in depth in [SEO and accessibility](06-seo-and-accessibility.md).

## Checking your HTML

- Run `npm run lint:html` locally.
- Or paste your page into the [W3C validator](https://validator.w3.org/).
- In DevTools, the **Lighthouse** panel runs accessibility and SEO audits.
