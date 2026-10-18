# 05 · JavaScript guide

How `assets/js/main.js` works. It is about 1,200 lines of plain JavaScript, more than half of them comments, no libraries, and every feature is small enough to explain in one sitting.

## The shape of the file

```js
(function () {
  'use strict';

  // 01. helpers
  // 02. storage
  // ...
  // 22. start everything

})();
```

The outer function runs itself straight away. It is called an **IIFE** (Immediately Invoked Function Expression). Everything declared inside stays private, so our `toast` function can never clash with another script's `toast`.

`'use strict'` turns some silent mistakes into real errors, like assigning to a variable you forgot to declare.

## How the script is loaded

```html
<script src="assets/js/main.js" defer></script>
```

`defer` downloads the file in parallel with the HTML and runs it only after the whole page has been parsed. That is why the script can find every element without waiting for `DOMContentLoaded`. We still check `document.readyState` at the bottom, just in case someone removes `defer` one day.

There is also a tiny inline script in the `<head>`. It runs *before* the body is drawn and sets the theme, so dark-mode visitors never see a white flash. It is the only JavaScript that has to be inline.

## The pattern every feature follows

```js
function initSomething() {
  const element = $('[data-something]');
  if (!element) return;            // 1. not on this page? do nothing

  element.addEventListener('click', () => {
    // 2. react to the user
  });
}
```

Then, at the bottom:

```js
features.forEach((feature) => {
  try {
    feature();
  } catch (error) {
    console.error(`[bootcamp] ${feature.name} failed:`, error);
  }
});
```

Each feature runs in its own `try/catch`, so one broken feature cannot take the rest of the page down.

## Why `data-*` attributes

Classes are for CSS. If someone renames `.button` to `.btn` for styling reasons, the JavaScript should not break. A `data-` attribute is a clear contract: "a script depends on this element". You can read every contract in the table in [Project structure](02-project-structure.md).

## Feature by feature

| # | Feature | Concepts you will learn |
| - | ------- | ----------------------- |
| 01 | Helpers `$` and `$$` | `querySelector`, `Array.from`, arrow functions, default parameters, debounce |
| 02 | Safe storage | `localStorage`, `JSON.parse` and `JSON.stringify`, `try/catch` |
| 03 | Toasts | `createElement`, `textContent`, `setTimeout`, `transitionend`, `{ once: true }` |
| 04 | Theme toggle | `setAttribute`, `matchMedia`, listening to system changes |
| 05 | Mobile nav | `classList`, `aria-expanded`, `keydown` and the Escape key, `closest()` |
| 06 | Scroll effects | `scroll` events, `requestAnimationFrame`, `{ passive: true }`, CSS custom properties from JS |
| 07 | Scroll spy | `IntersectionObserver`, `Map`, `rootMargin` |
| 08 | Reveal on scroll | Observing and unobserving, progressive enhancement |
| 09 | Counters | Animation with `requestAnimationFrame`, easing functions |
| 10 | Copy buttons | `navigator.clipboard`, Promises, a fallback for old browsers |
| 11 | Tabs | The WAI-ARIA tabs pattern, roving `tabindex`, arrow keys mirrored for RTL |
| 12 | Lesson progress | `Set`, persisting state, updating many elements from one source of truth |
| 13 | Remembered checkboxes | The smallest possible persisted feature |
| 14 | Sortable tables | `Array.prototype.sort`, `Intl.Collator` for Arabic, moving DOM nodes |
| 15 | Table filter | `input` events, `includes`, the `hidden` property |
| 16 | Forms | The Constraint Validation API, `validity`, `FormData`, custom events |
| 17 | Dialogs | `<dialog>`, `showModal()`, closing on backdrop click |
| 18 | Accordion toggle | `details.open`, `Array.prototype.some` |
| 19 | Playground | `iframe.srcdoc`, the `sandbox` attribute, keyboard shortcuts |
| 20 | Quiz | `submit` and `reset` events, scoring |
| 21 | Footer year | `Date` |

## Three ideas worth stealing

### Let the browser do the work

The form code does not check emails with a regular expression. The HTML already says `type="email" required`, and the browser knows how to check that. We only read the result:

```js
if (field.validity.valueMissing) return 'هذا الحقل مطلوب.';
if (field.validity.typeMismatch) return 'اكتب بريداً إلكترونياً صحيحاً';
```

Same for `<dialog>` (focus trapping and Escape for free) and `<details>` (open and close for free).

### JavaScript calculates, CSS draws

The progress bar does not set a width from JavaScript. It sets one number:

```js
bar.style.setProperty('--progress', progress.toFixed(4));
```

and CSS turns it into a transform:

```css
.scroll-progress__bar { transform: scaleX(var(--progress, 0)); }
```

Transforms are cheap for the browser to animate. Changing `width` on every scroll is not.

### Never trust user text with `innerHTML`

Everything the user typed goes into the page through `textContent`, which treats it as plain text. `innerHTML` would run any HTML inside it, which is how cross-site scripting attacks start. The playground is the one place we *want* to render user HTML, and it does so inside a sandboxed iframe that cannot run scripts.

## Compatibility notes

- The syntax is ES2015 to ES2020: `const`, `let`, arrow functions, template strings, default parameters, spread. Every browser from the last several years understands it.
- Newer APIs are always checked first: `'IntersectionObserver' in window`, `navigator.clipboard && window.isSecureContext`, `typeof dialog.showModal === 'function'`.
- `matchMedia(...).addEventListener` falls back to the older `addListener` for old Safari.

## Debugging tips

- Open the Console. Every feature that fails logs `[bootcamp] initName failed:` with the real error.
- In **Application > Local Storage** you can see and delete the keys starting with `feb-`.
- Put `debugger;` on a line inside a feature, reload with DevTools open, and the browser pauses there so you can inspect every variable.

## Linting

`npm run lint:js` runs ESLint with the recommended rules plus a few that catch classic beginner mistakes: `no-var`, `prefer-const`, `eqeqeq` (always `===`), and `curly`. The config is in `eslint.config.js`, and it is commented.
