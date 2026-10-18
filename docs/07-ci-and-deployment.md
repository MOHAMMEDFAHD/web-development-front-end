# 07 · CI and deployment

"CI" stands for **continuous integration**: every time you push code, a robot on GitHub's servers checks it for you. In this project the same robot also publishes the site when the checks pass.

The whole thing lives in one file: `.github/workflows/ci.yml`. It is heavily commented, so read it alongside this page.

## When it runs

| Event | What runs |
| ----- | --------- |
| Push to `main` | lint, links, deploy |
| Push to any other branch | nothing (open a pull request instead) |
| Pull request | lint, links. Never deploys |
| Every Monday at 06:00 UTC | links only, to catch links that died on their own |
| "Run workflow" button in the Actions tab | lint, links |

## The three jobs

### 1. `lint`

```yaml
- run: npm ci
- run: npm run lint:html
- run: npm run lint:css
- run: npm run lint:js
```

`npm ci` installs the exact versions recorded in `package-lock.json`, so the robot uses the same tools you used on your machine. Each linter is its own step, so when something fails the Actions page tells you straight away whether it was HTML, CSS or JS.

### 2. `links`

[Lychee](https://github.com/lycheeverse/lychee) visits every link in the HTML and Markdown files. The settings are in `lychee.toml`, which also lists the links it should skip:

- `mailto:` and `tel:` links, which are not web pages,
- `example.com` placeholders,
- the broken image in lesson 06, which is broken on purpose,
- our own GitHub Pages address, which does not exist until the first deploy.

If an external site is down for a day, this job reports it, but it is marked `continue-on-error`, so your commit stays green and deploy is never blocked. Open the job log to see which links failed.

### 3. `deploy`

Runs only on pushes to `main`, and only after `lint` passes. It copies the public files into a `_site` folder, so docs, configs and tooling never go online:

```yaml
- run: |
    mkdir _site
    cp index.html about.html 404.html robots.txt sitemap.xml site.webmanifest _site/
    cp -r assets _site/
```

Then three official actions upload and publish that folder to GitHub Pages.

If you add a new page, say `contact.html`, **add it to that `cp` line too**, or it will not be published.

## Permissions, briefly

The workflow starts with:

```yaml
permissions:
  contents: read
```

That means "by default, jobs can only read the code". The deploy job asks for two extra permissions on its own: `pages: write` to publish and `id-token: write` to prove its identity to GitHub Pages. Giving each job only what it needs is called the principle of least privilege, and it is a good habit long before you work on anything sensitive.

## First-time setup for your fork

1. Fork the repository.
2. **Settings > Pages > Build and deployment > Source**: choose **GitHub Actions**.
3. **Settings > Actions > General**: make sure actions are allowed (they are by default).
4. Update the site address. Search the project for `mohammedfahd.github.io/web-development-front-end` and replace it with `YOUR-NAME.github.io/YOUR-REPO`. It appears in `index.html`, `about.html`, `robots.txt`, `sitemap.xml` and `lychee.toml`.
5. If your repository is not called `web-development-front-end`, change `<base href="/web-development-front-end/">` in `404.html`.
6. Push to `main`. Open the **Actions** tab and watch it run. The deploy job shows the live URL when it finishes.

## Running the same checks locally

Everything CI does, you can do before pushing:

```bash
npm ci          # or npm install the first time
npm run lint
```

For links, install Lychee (`brew install lychee` on Mac, or see its README) and run:

```bash
lychee --config lychee.toml "./*.html" "./*.md" "./docs/*.md"
```

## Reading a failed run

1. Open the **Actions** tab and click the red run.
2. Click the red job, then the red step.
3. Read from the bottom up. The last lines usually say the file, the line number and the rule name.
4. Fix it locally, run `npm run lint`, commit and push again. The run restarts by itself.

## Keeping things up to date

`.github/dependabot.yml` asks GitHub to open a pull request once a month when a new version of an action or a linter is released. All the npm tools are grouped into one pull request so you are not flooded. Let CI run on it, and merge when it is green.

## Other hosts

The site is plain static files, so any static host works:

| Host | How |
| ---- | --- |
| Netlify | Drag the folder onto app.netlify.com/drop, or connect the repo with no build command and publish directory `.` |
| Vercel | Import the repo, framework preset "Other", no build command |
| Cloudflare Pages | Connect the repo, no build command, output directory `/` |

On those hosts the site lives at the domain root, so change `<base href>` in `404.html` to `/`.
