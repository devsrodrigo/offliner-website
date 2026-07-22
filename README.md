# Offliner website

A static marketing site. No framework, no build step, no dependencies, no
`node_modules`. Six HTML pages, one CSS file, one JS file.

Total weight before images: roughly **120 KB**. Compare with a Next.js starter
at 400 MB installed.

```
website/
  index.html          Home. The funnel.
  why.html            Why Offliner. Science, symptoms, process, features, suggestion box.
  about.html          The story.
  support.html        FAQ. Apple requires a support URL for App Store listings.
  privacy.html        Legal.
  terms.html          Legal.
  404.html
  robots.txt
  sitemap.xml
  vercel.json         Caching and security headers.
  assets/
    css/site.css      The whole design system. Ported from OfflinerDesignSystem.swift.
    js/site.js        ~2 KB. Menu, scroll reveal, accordion, mailto form.
    img/              Empty. See assets/img/README.md for what goes here.
```

## Running it locally

There is no server to start. Double click `index.html`.

The only caveat is that links are root absolute (`/why.html`), so opening from
the filesystem will break navigation. To get it exactly right, run any static
server from inside `website/`:

```bash
python3 -m http.server 3000
# then open http://localhost:3000
```

## The design system

`assets/css/site.css` is a direct port of `LOCKIN/OfflinerDesignSystem.swift`.
Same palette hex values, same radii, same Avenir Next, same three layer glass
treatment, same ambient bloom. If the app's design changes, change it here too.

Rules carried over from the app, which apply to anything added later:

- Ground, then bloom, then glass, then content. Never put content on the ground.
- One hero number per section. Two big numbers means one of them is wrong.
- Colour is state, not decoration. Grey until it needs to mean something.
- State colours appear as dots, lines and bars, never as a large flat fill.
  The orange gradient CTA is the only flood.
- Semibold is the ceiling. Emphasis comes from size and space.
- **No em dashes anywhere.** Rephrase with a period, comma, colon or parentheses.

### A note on the typeface

The app uses Avenir Next, which ships with every Apple device. The CSS asks for
it first and falls back to the system UI font elsewhere. Since the audience is
iPhone owners, most visitors see the exact app typeface with zero font download.
Windows and Android visitors get a close system fallback rather than a 200 KB
webfont on every page load. If you would rather it be pixel identical
everywhere, the swap is one line in `:root { --font: ... }` plus a
self hosted woff2.

---

# Deploying

You need three things wired together: the code on GitHub, the hosting on Vercel,
and the DNS on Cloudflare. Do them in that order.

## Step 1. Put the code on GitHub

The website currently lives inside the LOCKIN Xcode repo. Two options.

**Option A, separate repo. Recommended.** Keeps the site's deploy history clean
and stops every Swift commit triggering a website rebuild.

```bash
cd /Users/rodrigoatiye/Development/LOCKIN/website
git init
git add .
git commit -m "Offliner website"
```

Then create an empty repo called `offliner-website` at
https://github.com/new (private is fine, Vercel can read private repos), and:

```bash
git remote add origin https://github.com/YOUR_USERNAME/offliner-website.git
git branch -M main
git push -u origin main
```

**Option B, keep it in the LOCKIN repo.** Commit as normal. In Step 2 you will
set Vercel's **Root Directory** to `website` so it only deploys that folder.

## Step 2. Deploy on Vercel

1. Go to https://vercel.com and sign in with GitHub.
2. Click **Add New** then **Project**.
3. Find your repo in the list and click **Import**. If it does not appear, click
   **Adjust GitHub App Permissions** and grant access to that repo.
4. On the configure screen:
   - **Framework Preset:** `Other`
   - **Root Directory:** leave as `./` for Option A, or set to `website` for Option B
   - **Build Command:** leave empty (click the toggle to override, then clear it)
   - **Output Directory:** leave empty
   - **Install Command:** leave empty
5. Click **Deploy**.

It finishes in under thirty seconds because there is nothing to build. You get a
URL like `offliner-website.vercel.app`. Open it and check the site works.

From now on, every `git push` to `main` redeploys automatically. Pushes to any
other branch get their own preview URL, which is useful for showing someone a
change before it goes live.

## Step 3. Add the domain in Vercel

1. In your project, go to **Settings** then **Domains**.
2. Type `offliner.app` and click **Add**.
3. When asked, choose to add **both** `offliner.app` and `www.offliner.app`,
   and set `offliner.app` as the primary with `www` redirecting to it.
4. Vercel will now show you the DNS records it wants and say the domain is
   "Invalid Configuration". That is expected. Leave this tab open.

## Step 4. Point Cloudflare at Vercel

In the Cloudflare dashboard, select `offliner.app`, then **DNS** then **Records**.

Delete any existing A, AAAA or CNAME records for `@` and `www` first, otherwise
they will conflict. Then add these two:

| Type | Name | Content | Proxy status | TTL |
| --- | --- | --- | --- | --- |
| `A` | `@` | `76.76.21.21` | **DNS only (grey cloud)** | Auto |
| `CNAME` | `www` | `cname.vercel-dns.com` | **DNS only (grey cloud)** | Auto |

**The grey cloud is the part everyone gets wrong.** If the cloud is orange,
Cloudflare proxies the traffic, Vercel cannot complete its SSL certificate
challenge, and you get either a stuck "Invalid Configuration" or an endless
redirect loop in the browser. Click the orange cloud on each record to turn it
grey before saving.

Then, still in Cloudflare, go to **SSL/TLS** and set the encryption mode to
**Full (strict)**. Anything less can also cause a redirect loop.

## Step 5. Wait, then verify

Go back to the Vercel Domains tab and click **Refresh**. Propagation is usually
under five minutes with Cloudflare, occasionally up to an hour. When it is done
you will see a green **Valid Configuration** and Vercel will have issued a free
SSL certificate automatically.

Check all of these load over `https://`:

- https://offliner.app
- https://www.offliner.app (should redirect to the non www version)
- https://offliner.app/why.html
- https://offliner.app/privacy.html

## Optional. Turn the Cloudflare proxy back on

Once Vercel says Valid Configuration and the certificate has issued, you *may*
flip the two records back to the orange cloud to get Cloudflare's caching, DDoS
protection and analytics. If anything breaks, turn it straight back to grey.

Honestly, for a static site on Vercel's edge network, the proxy adds very little.
Leaving it grey is the lower risk choice and I would leave it.

## Step 6. Housekeeping after launch

- Add the site to [Google Search Console](https://search.google.com/search-console)
  and submit `https://offliner.app/sitemap.xml`.
- Update the App Store Connect listing so the Support URL points to
  `https://offliner.app/support.html` and the Privacy Policy URL points to
  `https://offliner.app/privacy.html`.
- If you want visitor numbers without a cookie banner, add
  [Plausible](https://plausible.io) or
  [Vercel Web Analytics](https://vercel.com/docs/analytics). Both are one script
  tag. Avoid Google Analytics on a site whose whole pitch is privacy.
- Set up the three email addresses (`info@`, `support@`, `suggestions@`) on the
  `offliner.app` domain. Cloudflare Email Routing does this free in about two
  minutes and forwards everything to your normal inbox.
