# 09 · Exercises

One small exercise per lesson, then a few bigger challenges. Do them in a fresh file next to `index.html`, for example `practice.html`, so you never break the original.

Each exercise has a **goal** and a **check**: how you know you got it right. There are no answer files on purpose. The answer is somewhere in `index.html`, and finding it is part of the exercise.

## HTML lessons

**01 · What is HTML.** Write one paragraph about yourself with one word in `<strong>` and one in `<em>`.
Check: View the page source and explain to a friend which tag means what.

**02 · Structure.** Create `practice.html` from memory, without copying. `lang`, `dir`, `charset`, `viewport` and `title` must all be there.
Check: `npm run lint:html` reports no errors for your file. (Add it to the command: `npx html-validate practice.html`.)

**03 · Headings.** Write the outline of your favourite book as headings only, `h1` to `h4`, without skipping a level.
Check: Install the "HeadingsMap" browser extension and confirm the outline is a clean tree.

**04 · Text semantics.** Write a recipe step using `<kbd>`, `<time>`, `<abbr>` and `<mark>` where each one makes sense.
Check: Every tag you used, you can justify in one sentence.

**05 · Links.** Make a "contact me" list with an email link, a phone link, an external link that opens safely in a new tab, and a link to a section further down the same page.
Check: Each link does what its text promises, and the external one has `rel="noopener noreferrer"`.

**06 · Images.** Add three images: one decorative, one informative, one inside a link.
Check: Turn images off in DevTools (Network > block request URL). Does the page still make sense?

**07 · Lists.** Write your daily routine as an ordered list that starts at 5, with one nested unordered list.
Check: The numbers start at 5 and the nesting is inside an `<li>`.

**08 · Tables.** Build your weekly timetable with a `<caption>`, `scope` on every header, and at least one `rowspan` and one `colspan`.
Check: Read it with a screen reader. Each cell should be announced with its row and column headers.

**09 · Forms.** Build a "join our club" form with five different input types, a fieldset, and at least two validation rules.
Check: Submitting it empty shows the browser's messages, and every field can be filled using only the keyboard.

**10 · Media.** Embed one video with captions using a `<track>` element. Write a tiny `.vtt` file yourself.
Check: The CC button appears in the player and your captions show.

**11 · Semantics.** Take a page you built earlier made only of `<div>`s and replace every div you can with a semantic element.
Check: Count the divs before and after. Fewer is the goal, zero is not.

**12 · Entities.** Write a paragraph that shows the text `<p>` and the symbol `&` correctly, without the browser treating them as code.
Check: The source contains `&lt;` and `&amp;`, and the page shows `<p>` and `&`.

**13 · SEO.** Give `practice.html` a unique title, description, canonical URL and all the Open Graph tags.
Check: After deploying, paste the URL into a chat app and see your card.

**14 · Accessibility.** Run Lighthouse on `practice.html` and fix everything in the Accessibility section.
Check: Score of 100, and you can explain each fix.

## CSS challenges

**C1 · Your own tokens.** Change only chapter 01 of `style.css` to give the site a completely different look. Touch nothing else.
Check: Both themes still have readable contrast (DevTools colour picker shows 4.5 or more).

**C2 · Flip it.** Change `dir="rtl"` to `dir="ltr"` and `lang="ar"` to `lang="en"` on a copy of `about.html`.
Check: Nothing overlaps and nothing sits on the wrong side.

**C3 · A new component.** Design a "pricing card" using only existing tokens and the BEM naming style.
Check: It works at 320px and 1440px wide, in light and dark.

## JavaScript challenges

**J1 · Read before you write.** Pick any feature in `main.js`, delete it, and rewrite it from memory.
Check: It behaves like the original, and ESLint passes.

**J2 · A keyboard shortcut.** Pressing `/` focuses the table search box, like on GitHub. Ignore the key when the user is typing in another field.
Check: Typing a `/` inside the playground still types a slash.

**J3 · Remember the quiz.** Save the quiz answers in `localStorage` so a refresh does not lose them.
Check: Answer two questions, refresh, they are still selected.

**J4 · Copy the playground.** Add a "copy" button to the playground that reuses the `copyText` function.
Check: No copy-pasted code, you call the existing function.

**J5 · Fetch something.** Add a section that loads a random quote from a public API with `fetch()` and shows a friendly message if the network fails.
Check: Turn the network off in DevTools and see your error message, not a broken page.

## Final project

A three-page personal site:

- your own design tokens and both themes,
- a home page, a projects page and a contact page with a validated form,
- at least three interactive features rewritten in your own words,
- a green CI run on GitHub,
- a live URL on GitHub Pages.

Share the link in the community. We will look at every single one.
