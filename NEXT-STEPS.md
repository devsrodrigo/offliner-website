# What I still need from you

Everything below is marked in the code so you can find it. Search the HTML for
`data-placeholder`, `data-personalise` and `data-verify` to jump to each spot.

---

## 1. Screenshots (blocking, do these first)

The site has real iPhone frames already built in CSS. They currently show a
labelled empty slot. Drop the PNGs into `assets/img/screens/` and follow the
instructions in `assets/img/README.md` to swap them in.

| What | Where it appears | Priority |
| --- | --- | --- |
| Home screen with the streak hero | Home, above the fold. This is the single most looked at image on the site. | Critical |
| A Friction Wait block screen | Home, "the moment it matters" | Critical |
| Insights, week view | Spare, for a section we can add later | Nice to have |
| Focus dial | Spare | Nice to have |
| Apps screen with detox and limits | Spare | Nice to have |

Use a real device or the simulator at 1290 x 2796, and use plausible numbers
rather than zeros. A screenshot showing a 14 day streak sells; one showing a
0 day streak does not.

## 2. Brand assets

| File | Size | Note |
| --- | --- | --- |
| `assets/img/favicon.png` | 512 x 512 | You already have `OfflinerIcon.png` in the repo root, that may work directly |
| `assets/img/apple-touch-icon.png` | 180 x 180 | |
| `assets/img/og-image.png` | 1200 x 630 | The link preview card. Dark background, logo, one line of the headline. This is what shows when anyone shares the site. |
| `assets/img/rodrigo.jpg` | 800 x 1000 | Your photo for the About page |
| Wordmark SVG | any | Right now the header uses an inline SVG approximation of your mark (orange circle, darker right half) plus the word Offliner in text. If you export the real wordmark I will swap it in. |

## 3. Copy I wrote as a first draft and you should personalise

Search for `data-personalise`.

- **`about.html`, opening two paragraphs.** I wrote a plausible version of your
  story: the screen time number, the feeling of not remembering the decision.
  Replace with what actually happened. This is the highest trust paragraph on the
  entire site and it should be true and specific. A real number is better than a
  vague one.
- **`about.html`, "What I tried first".** I listed Screen Time, deleting apps,
  greyscale, other blockers, willpower. Add or remove to match your real history.
- **`why.html`, the timeline.** I wrote day 1, days 2 to 4, days 5 to 7, week 2,
  week 3, week 4. You said you would supply this. Replace freely, the structure
  holds any number of entries.

## 4. Numbers I need you to confirm before launch

Search for `data-verify`. Nothing false should ship, and a single wrong number
undermines the accuracy claim that the whole site rests on.

- **"4 out of 5 times, beta users chose the activity over scrolling."** I need
  the sample size and the time window so I can add a footnote. Without those it
  reads as marketing. With them it reads as evidence.
- **Device support.** I have written "iPhone and iPad" throughout. The old site
  said iPhone, iPad and Mac. Confirm which is currently true.
- **Pricing.** I deliberately left price off every page except a generic
  "Cancel anytime in the App Store". The old site advertised $29.99 a year or
  $4.99 a week. Tell me the current price and whether there is a free trial, and
  I will add a pricing section. Hiding the price tends to reduce conversion, not
  increase it.
- **App Store rating.** The hero shows "5.0 on the App Store" and there are two
  real reviews. Confirm the rating is still 5.0, and send a third review when
  you have one you like. There is a placeholder card waiting for it.

## 5. The logo carousel

You asked for a logo strip for credibility. You do not have press logos yet, and
fake ones are the fastest way to look like a dropshipping page, so I built the
honest version instead: a strip that says what the app is built on (Apple Screen
Time API, Family Controls, Device Activity, on device only, no account required).

That reads as technical credibility rather than borrowed credibility, which is
the correct move at this stage. When you have real ones, replace the text items
in the `.marquee__track` in `index.html`. Good candidates, roughly in order of
value:

1. Any press mention, however small
2. "Featured by Apple" if it ever happens
3. University or clinic affiliations if you get any
4. Follower counts on TikTok and Instagram, if they are impressive

## 6. Graphs

I drew three charts directly in SVG so the site is complete today and weighs
nothing. Two are honest, one is conceptual and labelled as such.

**Already done, no action needed:**

1. **ADHD symptoms bar chart** (`why.html`). Real data from Ra et al., JAMA 2018.
   4.6% with no high frequency digital media use, 9.5% with seven activities,
   10.5% with fourteen.
2. **Effort against reward curves** (`why.html`). Conceptual, showing difficulty
   falling steeply while benefit rises.
3. **Reward baseline over time** (`why.html`). Conceptual, labelled in the caption
   as a diagram rather than measured data.

**If you want to generate nicer versions,** here is what to ask for. Match the
palette exactly or they will look pasted on: background `#0B0C12`, orange
`#F0632B`, red `#F16A5A`, amber `#E8B44A`, green `#34D399`, indigo `#6E74A6`,
text grey `#B2B6CA`. Export as SVG if you can, PNG at 2x otherwise.

- *"A minimal dark bar chart, three bars, values 4.6%, 9.5% and 10.5%, coloured
  indigo, amber and orange left to right. Background #0B0C12. Thin white
  gridlines at 10% opacity. Sans serif labels in grey #B2B6CA. No borders, no
  drop shadows, no 3D."*
- *"A minimal dark line chart with two smooth curves. One red curve starts at the
  top left and falls steeply. One green curve starts at the bottom left and rises
  steadily. They cross at about one third along. Background #0B0C12, no gridlines,
  thin lines, small grey labels."*

**One graph I would like that does not exist yet.** A chart of your own beta
data: average distracting minutes per day across the cohort, from day 1 to day 30.
If that line falls the way I expect it does, it is the most persuasive image on
the entire site, because it is yours and nobody else can show it. Send me the raw
numbers and I will draw it.

## 7. The blog

`why.html` has a Journal section at the bottom with three placeholder cards, all
linking to `#`. I wrote the three headlines and summaries as a starting point:

- Why deleting the app never works
- What your screen time number is hiding
- Boredom is a skill

Write one and I will build the post template and wire it up. One good post is
worth more than three placeholders, and until then the section says "Coming soon"
honestly rather than pretending.

## 8. Suggestion box backend

The form on `why.html` opens the visitor's email client with the message
pre-filled and addressed to `suggestions@offliner.app`. This works everywhere,
costs nothing, and requires no server.

The downside is that people on webmail sometimes have no default mail client
configured and nothing happens. If you want a real form that posts to your inbox,
[Formspree](https://formspree.io) has a free tier and is a two line change. Say
the word and I will swap it.

---

## Things I deliberately did not do, and why

- **No fake testimonials, no invented statistics, no fabricated press logos.**
  You asked for a site that looks like a hundred person team built it. The thing
  that actually separates those sites from dropshipping pages is not the design,
  it is that every claim on them survives being checked.
- **No cookie banner, no tracking pixels.** The pitch is privacy. Adding
  surveillance to the marketing site for a privacy app would be the single most
  damaging thing we could do to the brand.
- **I dropped the "23 minutes to refocus after an interruption" statistic.** It
  is everywhere online and it is on most competitor sites. I checked it and it
  traces back to a 2006 interview rather than a published paper. Using it would
  have been a small lie on a page whose whole argument is that we do not round
  numbers.
- **No pricing section yet.** Only because I do not know the current price.
  Send it and I will add one.
