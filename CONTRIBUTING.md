# Contributing

Thank you for wanting to help. This project is used by beginners, so the bar for "good code" here is simple: **a learner in their first month should be able to read it.**

## Ways to help

- Fix a typo or an unclear sentence, in the pages or the docs.
- Report a bug with the issue template.
- Improve a comment that confused you. If it confused you, it confuses others.
- Translate a doc page into Arabic.
- Suggest an exercise for [docs/09-exercises.md](docs/09-exercises.md).

## Ground rules

1. **No libraries and no frameworks.** Plain HTML, CSS and JavaScript only. That is the point of the bootcamp.
2. **Comment for humans.** Explain *why*, not just *what*. Write the way you would explain it to a friend sitting next to you.
3. **Keep the three jobs apart.** Structure in HTML, looks in CSS, behaviour in JS. No inline styles, no `onclick=""` attributes.
4. **Content first, enhancement second.** Every feature must leave the page usable when JavaScript is off.
5. **Accessible by default.** Real `<button>` elements, labels on every input, keyboard support, enough contrast.
6. **Logical CSS properties.** Use `margin-inline-start`, not `margin-left`, so the RTL layout keeps working.

## Workflow

```bash
git clone https://github.com/YOUR-NAME/frontend-bootcamp.git
cd frontend-bootcamp
npm install
git checkout -b fix/short-description

# make your change, then
npm run lint
```

Open both pages in a browser, check light and dark mode and a phone-sized window, then push and open a pull request. The template has a short checklist.

## Commit messages

Short and in the present tense: `Fix table filter on empty search`, `Explain srcset in lesson 06`. One idea per commit when you can.

## Be kind

Everyone here is learning, including the maintainers. Questions are welcome, impatience is not.
