# Images

Drop files here with these exact names so the HTML picks them up without edits.

## Required before launch

| Filename | Size | Used on |
| --- | --- | --- |
| `favicon.png` | 512 x 512 | every page |
| `apple-touch-icon.png` | 180 x 180 | home |
| `og-image.png` | 1200 x 630 | every page, link previews |
| `rodrigo.jpg` | 800 x 1000 (4:5) | about |

## Screenshots

Put App Store screenshots in `screens/`. Export at native iPhone resolution
(1290 x 2796 for a 15/16 Pro) so they stay sharp on retina displays.

| Filename | Screen | Used on |
| --- | --- | --- |
| `screens/home.png` | Home, streak hero | home, above the fold |
| `screens/block.png` | Friction Wait block screen | home, "the moment it matters" |
| `screens/apps.png` | Apps, detox and limits | spare |
| `screens/focus.png` | Focus dial | spare |
| `screens/insights.png` | Insights, week view | spare |

To place one, find the `<div class="phone__placeholder">` block in the HTML and
replace the whole div with:

```html
<img src="/assets/img/screens/home.png"
     alt="Offliner home screen showing a 14 day streak"
     width="1290" height="2796">
```

## Compression

Run every PNG through https://squoosh.app before committing. Target under
250 KB each. The whole site should stay well under 5 MB.
