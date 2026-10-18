# 01 · Getting started

This page takes you from "I have never done this" to "I just changed a web page and saw it update". Plan for about thirty minutes.

## What you need

| Tool | Why | Required? |
| ---- | --- | --------- |
| A modern browser (Chrome, Firefox, Edge or Safari) | To see the pages and use the DevTools | Yes |
| [VS Code](https://code.visualstudio.com/) | To read and edit the code | Strongly recommended |
| [Git](https://git-scm.com/) | To download the project and save your progress | From week 2 |
| [Node.js](https://nodejs.org/) 20 or newer | Only to run the linters and the local server | Optional |

The website itself runs with nothing but a browser. Node.js is only for the tools that *check* the code.

## Step 1 · Get the code

**The easy way.** On the GitHub page, click **Code**, then **Download ZIP**. Unzip it somewhere you can find again, like your Desktop.

**The developer way.** Open a terminal and run:

```bash
git clone https://github.com/MOHAMMEDFAHD/web-development-front-end.git
cd web-development-front-end
```

## Step 2 · Open it in the browser

Double-click `index.html`. The page opens straight from your disk. Its address starts with `file://`.

That is enough for almost everything. When you want the full experience (clipboard copy works more reliably, the manifest loads), serve it over `http://` with one of these:

- **VS Code:** install the *Live Server* extension, right-click `index.html`, choose **Open with Live Server**. It also reloads the page every time you save.
- **Node.js:** `npm install` once, then `npm start`.
- **Python:** `python3 -m http.server 8080`, then open `http://localhost:8080`.

## Step 3 · Open it in the editor

In VS Code choose **File > Open Folder** and pick the `web-development-front-end` folder. VS Code will offer to install the recommended extensions from `.vscode/extensions.json`. Say yes.

Open `index.html` and scroll. The comments in grey are the real textbook. Read them alongside the page.

## Step 4 · Make your first change

1. Find this line near the top of `<main>`:

   ```html
   مختبر أساسيات <span class="text-accent">HTML</span>
   ```

2. Change it to your own title, for example `مختبري الأول`.
3. Save with `Ctrl + S` (or `Cmd + S` on a Mac).
4. Refresh the browser. Your title is there.

Congratulations, you are a web developer now. Everything else is detail.

## Step 5 · Meet the DevTools

Press `F12` (or right-click anything and choose **Inspect**). You will use these panels all bootcamp long:

- **Elements** shows the live HTML and the CSS applied to each element. Try changing a colour there, it updates instantly (and disappears on refresh).
- **Console** shows messages and errors from JavaScript. There is a small hello from `main.js` waiting for you.
- **Application > Local Storage** shows what the site remembers about you: your theme, your lesson progress, your playground code.
- The **device toolbar** (the phone icon, or `Ctrl + Shift + M`) shows the page at phone sizes.

## Step 6 · Run the checks (optional)

If you installed Node.js:

```bash
npm install
npm run lint
```

No output after the command names means no problems. Break something on purpose, for example delete a closing `</li>`, run it again and read the error. Linters are your friends, they find mistakes before your visitors do.

## When something goes wrong

| Problem | Likely cause |
| ------- | ------------ |
| The page looks plain, no colours | The path to `assets/css/style.css` is wrong, or you moved `index.html` out of the folder |
| My change does not show | You did not save, or the browser cached the old file. Try `Ctrl + Shift + R` |
| Arabic text shows as strange symbols | The file was saved with the wrong encoding. In VS Code, click the encoding in the bottom bar and pick UTF-8 |
| The fonts look different from the video | Google Fonts could not load (offline or blocked). The page falls back to a system font, which is fine |
| `npm` is not recognised | Node.js is not installed, or the terminal was opened before installing it. Close and reopen it |

Still stuck? Open an issue with the *Question about a lesson* template. Include what you tried.
