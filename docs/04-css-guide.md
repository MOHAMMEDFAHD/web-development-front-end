# 04 · CSS guide

How `assets/css/style.css` is built, and the handful of ideas that make a stylesheet of more than 2,600 lines easy to live with.

## One file, 28 chapters

The table of contents is at the top of the file. Each chapter starts with a banner comment and a number, so `Ctrl + F` and `15.` takes you straight to the tables. The order goes from general to specific: tokens, reset, base elements, layout helpers, then components, then motion and print. Later rules can override earlier ones, so this order keeps surprises to a minimum.

## Idea 1 · Design tokens

Every colour, size and duration lives in a custom property on `:root`:

```css
:root {
  --color-bg: #f5f6f7;
  --color-text: #1b1b32;
  --color-accent: #f1be32;
  --space-4: 1rem;
  --radius-md: 10px;
}
```

Components never write a raw colour. They ask for a token:

```css
.lesson {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
}
```

The payoff is the dark theme. It is not a second stylesheet, just new values for the same names:

```css
:root[data-theme="dark"] {
  --color-bg: #0a0a23;
  --color-text: #e8e8ee;
}
```

Change the `data-theme` attribute on `<html>` and every component recolours itself.

## Idea 2 · Logical properties for RTL

Arabic reads right to left, English left to right. Instead of choosing a side, we describe the direction of text:

| Physical (avoid) | Logical (use) |
| ---------------- | ------------- |
| `margin-left` | `margin-inline-start` |
| `padding-right` | `padding-inline-end` |
| `left: 0` | `inset-inline-start: 0` |
| `border-left` | `border-inline-start` |
| `margin-top` | `margin-block-start` |
| `text-align: left` | `text-align: start` |

Try it: change `dir="rtl"` to `dir="ltr"` in `index.html`. The whole layout mirrors correctly. The only places we deliberately use physical directions are code blocks, because code is always left to right.

## Idea 3 · Mobile first

Base styles are written for phones. Media queries *add* to them for larger screens:

```css
.site-nav {
  display: none;          /* phones: hidden until the menu opens */
}

@media (min-width: 960px) {
  .site-nav {
    display: flex;        /* desktop: always visible */
  }
}
```

The breakpoints used are 640, 720, 900, 960 and 1024 pixels. They are chosen where the content starts to look cramped, not for specific devices.

## Idea 4 · Grids that need no media queries

```css
.demo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 240px), 1fr));
  gap: var(--space-4);
}
```

Read it as: "fit as many columns as you can, each at least 240px wide, and share the leftover space". The `min(100%, 240px)` part stops a single column from overflowing on tiny screens.

A related trap we hit while building this project: a grid with one `auto` column grows to fit its widest child. A long line of code then pushes the whole page sideways on a phone. The fix is `grid-template-columns: minmax(0, 1fr)`, which you will find on `.lessons`, `.course-layout` and friends.

## Idea 5 · Naming with BEM

Class names follow a light version of BEM (Block, Element, Modifier):

```
.lesson              the block
.lesson__title       an element inside the block
.lesson--complete    a variation of the block (we use .is-complete for states)
```

Two prefixes have special meaning:

- `.is-*` classes (`.is-open`, `.is-active`, `.is-invalid`) are **states**. JavaScript adds and removes them.
- `.js` and `.no-js` on `<html>` tell us whether JavaScript is running, so we only hide things the script can show again.

## Idea 6 · Style the state you can see

Wherever possible we style ARIA attributes instead of extra classes:

```css
.nav-toggle[aria-expanded="true"] .nav-toggle__bars { ... }
.tabs__tab[aria-selected="true"] { ... }
th[aria-sort="ascending"] .sort-button::after { ... }
```

This makes it impossible for the visual state and the state announced to screen readers to disagree.

## Idea 7 · Respect the visitor

- `:focus-visible` shows a clear ring for keyboard users without bothering mouse users.
- `@media (prefers-reduced-motion: reduce)` turns animations off for people who asked their system for less motion.
- `@media print` removes navigation and prints link URLs after the link text.
- `accent-color` paints native checkboxes, radios and sliders in our brand colour without rebuilding them.

## Modern features, with fallbacks

| Feature | Used for | Fallback |
| ------- | -------- | -------- |
| `color-mix()` | See-through header, zebra rows | A plain colour declared on the line before |
| `:has()` | Striking through checked checklist items | Items simply stay unstruck |
| `text-wrap: balance` | Nicer heading line breaks | Normal wrapping |
| `backdrop-filter` | Blur behind the sticky header | No blur, still readable |

The trick in the first row is worth remembering. When a browser does not understand a value, it ignores that declaration and keeps the previous one:

```css
background-color: var(--color-bg);                                       /* everyone */
background-color: color-mix(in srgb, var(--color-bg) 85%, transparent);  /* modern browsers */
```

## Linting

`npm run lint:css` runs Stylelint with the standard config. Two rules are switched off in `.stylelintrc.json`, on purpose:

- `selector-class-pattern`, because BEM's `__` and `--` do not match its default kebab-case pattern.
- `no-descending-specificity`, because in a component-based file it mostly reports harmless ordering.

`media-feature-range-notation` is set to `prefix`, so we write `(min-width: 960px)` instead of `(width >= 960px)`. The new syntax is nicer but older Safari versions ignore it, which would leave desktop visitors with the phone layout.
