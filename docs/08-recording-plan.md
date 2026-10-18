# 08 · Recording plan

How the bootcamp sessions are structured, for anyone who wants to teach this material, and as a running order for the live recordings on the freeCodeCamp Arabic channel.

## The format

- Eight weeks, two live sessions a week, about 75 minutes each.
- Every session follows the same rhythm: **explain** (10 min), **live code** (45 min), **break it on purpose** (10 min), **homework and questions** (10 min).
- The code is written live from an empty file, then compared with the finished version in this repository at the end. Learners can always catch up by opening the matching section here.

## The rules for live coding

1. Type it, do not paste it. Learners need to see the mistakes too.
2. Say the shortcut every time you use one, the first fifty times.
3. Keep the browser and the editor side by side, at 125% zoom or more.
4. Make one deliberate mistake per session and debug it out loud with DevTools.
5. Commit at the end of every session, with a real commit message, on screen.

## Week by week

### Week 1 · HTML basics

| Session | Covers | Finished code |
| ------- | ------ | ------------- |
| 1.1 | What the web is, browsers, editors, the boilerplate, headings and paragraphs, comments, whitespace | `index.html` lessons 01 to 03 |
| 1.2 | Text semantics, links of every kind, images and paths, lists | Lessons 04 to 07 |

Homework: exercises 01 to 07.

### Week 2 · Forms, media and meaning

| Session | Covers | Finished code |
| ------- | ------ | ------------- |
| 2.1 | Tables, forms, input types, built-in validation | Lessons 08 and 09 |
| 2.2 | Media, semantic layout, `details`, `dialog`, entities, the `<head>` for SEO and sharing, accessibility check | Lessons 10 to 14, `about.html` |

Homework: the profile card challenge, published to GitHub Pages.

### Week 3 · CSS basics

| Session | Covers | Finished code |
| ------- | ------ | ------------- |
| 3.1 | Linking a stylesheet, selectors, the cascade, specificity, colours, fonts | `style.css` chapters 02 and 03 |
| 3.2 | Units (`px`, `rem`, `%`, `vw`), custom properties and design tokens, `clamp()` | Chapter 01 |

### Week 4 · Box model and Flexbox

| Session | Covers | Finished code |
| ------- | ------ | ------------- |
| 4.1 | Margin, padding, border, `box-sizing`, logical properties and RTL | Chapters 04 and 05 |
| 4.2 | Flexbox: the header, buttons, forms | Chapters 06, 08, 16 |

### Week 5 · Grid and responsive design

| Session | Covers | Finished code |
| ------- | ------ | ------------- |
| 5.1 | Grid, `auto-fit` and `minmax`, named areas | Chapters 10, 18, 23 |
| 5.2 | Media queries, mobile first, dark theme, reduced motion, print | Chapters 01, 06, 27, 28 |

### Week 6 · JavaScript fundamentals

| Session | Covers | Finished code |
| ------- | ------ | ------------- |
| 6.1 | Variables, types, functions, conditions, the console | `main.js` sections 01 and 21 |
| 6.2 | Arrays, objects, loops, `localStorage` and JSON, `try/catch` | Sections 02 and 13 |

### Week 7 · The DOM and events

| Session | Covers | Finished code |
| ------- | ------ | ------------- |
| 7.1 | Selecting, creating and changing elements, `click` and `keydown`, theme and menu | Sections 03 to 05, 18 |
| 7.2 | Forms and validation, tabs, sorting and filtering | Sections 11, 14 to 16 |

### Week 8 · Final project

| Session | Covers | Finished code |
| ------- | ------ | ------------- |
| 8.1 | Observers, animation frames, the playground, the quiz | Sections 06 to 10, 19, 20 |
| 8.2 | Git and GitHub properly, linters, CI, deploying to GitHub Pages, showcase | `.github/workflows/ci.yml` |

Final project: each learner builds a three-page personal site with their own design tokens, at least three interactive features from `main.js` rewritten in their own words, a green CI run, and a live URL.

## Before every recording

- [ ] Close notifications, email and chat apps
- [ ] Browser in a clean profile, no extensions visible, bookmarks bar hidden
- [ ] Editor font size 18 or more, a high-contrast theme
- [ ] Clear `localStorage` for the site so progress starts at zero
- [ ] `git status` is clean, and you are on a fresh branch for the session
- [ ] Microphone check, a glass of water nearby

## After every recording

- [ ] Push the session's code
- [ ] Add chapter timestamps to the video description
- [ ] Open a GitHub Discussion for questions about the session
- [ ] Note any confusing moment in this file, and fix the explanation in the code comments
