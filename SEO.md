# SEO: what I found, what I did, what you must do

Read the first section before anything else. It contains the two problems that
matter more than every technical change combined.

---

## Part 1. The two things blocking you right now

### Problem 1: your App Store listing does not say Offliner

I fetched your live listing. It reads:

> **LOCK IN: Block Apps & Detox**
> Developer Website: `getrewired.org`
> Privacy Policy: `getrewired.org/privacy-policy`

So when Google asks itself "what is Offliner", the single most authoritative
page about your product, the App Store listing, never uses the word. Your app's
official developer website is recorded as a different domain. There is currently
almost nothing on the internet connecting the name Offliner to this product
except the website we just built.

**No amount of on-page SEO fixes this.** Until App Store Connect says Offliner
and points at offliner.app, you are asking Google to make a connection that
nothing corroborates.

### Problem 2: getrewired.org is competing with you

Your old site is still live, still indexed, and describes the same app. Right now
you have two domains covering one product. That splits authority, creates
duplicate content, and getrewired.org will usually win because it is older.

It also actively contradicts the new site: it advertises a 14-day OS-level
blackout, Echo the AI companion, and $29.99 a year. If a journalist or a curious
user lands there, they get the old product.

**Fix: 301 redirect the whole of getrewired.org to offliner.app.** A 301 passes
most of the accumulated link authority to the new domain. This turns your biggest
SEO liability into your single best asset. Instructions in Part 4.

### The name collision, which you should know about

"Offliner" is not an unclaimed name. Searching it today returns an Android media
downloader called Offliner by Epic Apps Ltd, Offliner Scan, an iOS app called
Files Offliner, and a Maven tool on GitHub. Those are mostly on low-authority
aggregator sites (apkpure, appbrain, malavida), which is good news, but the
Google Play listing is a real competitor.

This does not mean you cannot win. It means:

- You own the exact-match domain `offliner.app`, which is a strong signal.
- You will rank for **"offliner app blocker"**, **"offliner screen time"**,
  **"offliner iphone"** and **"offliner detox"** quite quickly, likely weeks.
- Plain **"offliner app"** will take longer, realistically two to four months
  after the App Store rename, because you need Google to accept a new dominant
  meaning for an existing term.
- I added a disambiguation block to `llms.txt` stating plainly which Offliner
  this is and which ones it is not. That helps AI engines get it right.

---

## Part 2. Realistic timeline

Anyone promising you page one in two weeks is selling something. Based on how new
domains behave:

| When | What to expect |
| --- | --- |
| Days 1 to 3 | Pages get indexed if you submit them manually. Searching `site:offliner.app` starts returning results. |
| Weeks 1 to 4 | You rank for long-tail branded terms: "offliner app blocker iphone", "offliner screen time app". Low volume, high intent. |
| Weeks 4 to 8 | Impressions appear in Search Console. The comparison page starts showing for long-tail category queries on pages 3 to 10. |
| Months 2 to 4 | "offliner app" becomes winnable, assuming the App Store rename and the 301 are both done. |
| Months 4 to 12 | Competitive category terms like "best screen time app iphone". This needs content and links, not just technical work. |

The branded term is the achievable goal. "Screen time app" as a bare phrase is
dominated by well-funded competitors and a wall of affiliate listicles, and
chasing it head-on is a poor use of your time. The comparison page targets the
long tail around it instead, which is where the buyers actually are.

---

## Part 3. What I changed in the code

### Structured data (JSON-LD)

Brands with four or more verified `sameAs` identifiers in Organization schema are
substantially more likely to get a Knowledge Panel. That panel is what makes a
branded search unambiguous. Added across the site:

- **Organization** with logo, founder, contactPoints, and `sameAs` pointing at
  Instagram, TikTok, YouTube and the App Store listing.
- **WebSite** with `alternateName` "Offliner App", tying the domain to the brand.
- **MobileApplication** with the full feature list, version, rating, offers and
  operating system. This is what can produce an app rich result.
- **Person** for you on the About page, linked to your Apple developer page. Google
  weights identifiable authorship.
- **Article** on the two content pages, with `citation` pointing at the actual
  JAMA and Science papers.
- **FAQPage** on home, why and support. These are the passages AI Overviews quote.
- **BreadcrumbList** on subpages.

### New pages and files

| File | Purpose |
| --- | --- |
| `screen-time-app.html` | The comparison page. Targets "best screen time app iphone", "apple screen time alternative", "offliner vs opal" and similar. Honest about where competitors win, which is both correct and what makes it rank. |
| `llms.txt` | Structured summary for AI crawlers, including the disambiguation block. |
| `site.webmanifest` | PWA manifest. Minor signal, cheap to add. |
| `.well-known/security.txt` | Standard security contact. Reads as a legitimate operator. |

### On-page

- Titles rewritten to lead with the query, not the brand. `why.html` is now
  "Phone Addiction Symptoms and What a Social Media Detox Does", which is what
  people actually type.
- Meta descriptions rewritten to be specific and clickable.
- A six-question FAQ on the homepage answering "what is the Offliner app", "is it
  free", "was it called LOCK IN". Short, self-contained, factual: the format AI
  engines quote verbatim.
- Contextual in-body links between pages. Footer links carry little weight, body
  links carry real weight.
- `robots.txt` now explicitly welcomes GPTBot, ClaudeBot, PerplexityBot,
  Google-Extended and Applebot.
- Sitemap has `lastmod` dates and includes the new page.

---

## Part 4. What you need to do, in order

### Step 1. Rename the App Store listing (highest impact, do it today)

In App Store Connect, go to your app, then **App Information** and the current
version's **Product Page**.

Change the app name. You have 30 characters, and Apple indexes the name heavily,
so put the brand first and a keyword after:

```
Offliner: Screen Time Blocker
```

That is 29 characters. The subtitle gets another 30, so use it for terms the name
does not cover:

```
App Blocker & Focus Detox
```

Then, still in App Store Connect, update these three fields:

- **Marketing URL** to `https://offliner.app`
- **Support URL** to `https://offliner.app/support.html`
- **Privacy Policy URL** to `https://offliner.app/privacy.html`

Also rewrite the description's opening two lines. The current one is written for
the old LOCK IN product and describes a 14-day blackout and a 10-minute allowance,
which no longer matches the app or the website. Apple weights the first lines most.

Rename takes effect at your next app update or metadata submission. **This is the
single highest-leverage action available to you.** Everything else is secondary.

### Step 2. Redirect getrewired.org to offliner.app

Assuming getrewired.org is also on Vercel:

1. Open the getrewired.org project in Vercel.
2. Go to **Settings** then **Domains**.
3. Find `getrewired.org`, click **Edit**, and choose **Redirect to another domain**.
4. Set the target to `offliner.app` and make sure it is a **permanent (301)** redirect.

If it is a Next.js project you would rather redirect in code, put this in
`next.config.js` instead:

```js
module.exports = {
  async redirects() {
    return [{ source: '/:path*', destination: 'https://offliner.app/:path*', permanent: true }];
  },
};
```

**Do not delete the old site or let the domain expire.** A deleted site throws
away its accumulated authority. A 301 hands that authority to offliner.app.

Keep renewing getrewired.org for at least two years.

### Step 3. Google Search Console

1. Go to https://search.google.com/search-console and sign in.
2. Click **Add property**, choose **Domain** (not URL prefix), enter `offliner.app`.
3. It gives you a TXT record. In Cloudflare, go to **DNS** then **Records**, add:
   - Type `TXT`, Name `@`, Content: the string Google gave you.
4. Back in Search Console, click **Verify**. Usually works within a minute.
5. Go to **Sitemaps** in the left sidebar, enter `sitemap.xml`, click Submit.
6. Go to **URL Inspection** at the top, paste each URL below, and click
   **Request Indexing** for each one. This is the fastest route into the index:
   - `https://offliner.app/`
   - `https://offliner.app/why.html`
   - `https://offliner.app/screen-time-app.html`
   - `https://offliner.app/about.html`
   - `https://offliner.app/support.html`

Do the same at https://www.bing.com/webmasters. Bing lets you import directly from
Search Console in one click, and it also feeds ChatGPT's web results, which matters
more each year.

### Step 4. Build the entity

Google confirms a brand by seeing consistent, corroborating references. Each of
these is a small signal; together they are what makes the Knowledge Panel appear.

Use the exact same name, description and URL everywhere:

- **Your social bios.** Put `offliner.app` in the Instagram, TikTok and YouTube
  bio links now. This makes the `sameAs` in the schema verifiable in both
  directions, which is what Google checks.
- **Product Hunt.** Launch there. It is a genuine do-follow-adjacent link from a
  high-authority domain and reliably ranks for brand terms.
- **Reddit.** Not spam. Find threads in r/nosurf, r/digitalminimalism and
  r/productivity where people ask for app recommendations, and answer honestly,
  disclosing you built it. Those subreddits tolerate builders who are upfront and
  ban ones who are not.
- **Crunchbase, AlternativeTo, Slant, SaaSHub.** Free listings, all index well,
  all rank for "alternative to" queries.
- **Wikidata.** Once you have two or three independent references, create a
  Wikidata item for Offliner. It is the single strongest disambiguation signal
  available against the name collision, and it is free.

After each new profile goes live, add its URL to the `sameAs` array in the
Organization schema in `index.html`. That array is your entity graph.

### Step 5. Publish the journal

The three placeholder cards on `why.html` should become real posts. Content is
what moves you from "indexed" to "ranking" for anything non-branded.

Priority order, based on what people actually search:

1. **"Why deleting the app never works"** targets "deleted instagram and
   reinstalled", high volume, high intent, almost no good content exists.
2. **"How long does a social media detox take"** targets a question people search
   constantly. You already have the timeline written on `why.html`, so this is
   mostly expansion.
3. **"Apple Screen Time not working"** targets a huge volume of frustrated users
   who are exactly your buyer.

One post every week or two beats six posts at once. Search Console impressions
usually appear around week six of consistent publishing.

---

## Part 5. Nothing will flag this site as unsafe

You raised this specifically. Here is why it is not a risk, and the one thing to
watch.

**Why the site is clean by construction.** Sites get flagged by Google Safe
Browsing for malware, phishing, deceptive redirects, or ad networks serving
malicious payloads. This site has no third-party scripts, no ad network, no
tracking pixels, no user uploads, no login, no database, and no server-side code
at all. It is static HTML with roughly two kilobytes of my own JavaScript. There
is no mechanism by which it can serve anything harmful, and nothing for an
attacker to compromise.

**HTTPS is automatic.** Vercel issues and renews a certificate for you. I have
already set `Strict-Transport-Security` with a two-year max-age in `vercel.json`,
plus `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy` and a
restrictive `Permissions-Policy`. That header set is stronger than most commercial
sites ship.

**The one real risk, and how to avoid it.** Corporate and school wifi filters
categorise domains, and brand-new domains sometimes sit in an "uncategorised"
bucket that strict filters block by default. This is not a security flag, it is
a missing entry. Two fixes, both free and both worth doing on day one:

1. Submit the domain for categorisation. Cloudflare's is at
   https://radar.cloudflare.com/domains/feedback and takes a minute. Suggest
   "Health and Wellness" or "Technology". Do the same at
   https://sitereview.bluecoat.com and https://talosintelligence.com/reputation_center
   (Cisco Umbrella powers a large share of school networks).
2. Having `security.txt` and a real privacy policy, both of which you now have,
   makes automated classifiers treat a domain as a legitimate business rather
   than an unknown.

**Verify after launch.** Paste `offliner.app` into
https://transparencyreport.google.com/safe-browsing/search. It should say no
unsafe content found. Check again a week later. If it ever flags, Search Console
tells you exactly why and a review takes 24 to 72 hours.

**One thing to avoid.** Do not add Google Analytics. Beyond the privacy
contradiction on a site whose entire argument is that nothing leaves your device,
GA is the most commonly blocked script on filtered networks and it will slow the
site. Use Vercel Web Analytics or Plausible. Both are cookie-free, need no consent
banner, and will not get you filtered.

---

## Part 6. Priority order

If you only do three things, do these:

1. **Rename the App Store listing to Offliner and repoint its three URLs.**
   Without this, nothing else can work. Today.
2. **301 redirect getrewired.org to offliner.app.** Turns your biggest liability
   into your biggest asset. Today.
3. **Search Console: verify, submit the sitemap, request indexing on all five
   pages.** Ten minutes, and it is what gets you into the index this week.

Then, over the following month: put the link in your social bios, launch on
Product Hunt, list on AlternativeTo and Crunchbase, and publish the first journal
post.

One honest note to close on. Technical SEO is table stakes, and the site now has
all of it. But Google ranks brands it has seen referenced in places it trusts.
The fastest thing you can do for "offliner app" is not another meta tag. It is
getting the name Offliner to appear on the App Store, on Product Hunt, on Reddit,
and in your own social bios, all pointing at the same domain, all saying the same
thing.
