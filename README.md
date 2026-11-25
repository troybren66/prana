# Prana

A mobile-first web app (PWA) for sattvic living and a simple Raja Yoga daily rhythm. It covers what to buy, how to structure the day, and why each habit supports energy (prana) and a clear mind.

Prana grew out of the Yogi Food Mentor app. It is built as a plain static site: no build step, no framework, no accounts, no tracking.

## What's in it

| Tab | What it does |
|---|---|
| **Today** | Morning-to-evening checklist built from the user's wake-up time: meals, a rotating "today's purification", a 3-minute breath, postures for digestion, a wind-down and a one-line reflection. Timers built in. |
| **Shop** | Grocery list sorted by aisle, with national chains marked on each item, store and frequency filters, and tick boxes. **Find stores near me** lists real nearby Indian groceries, farmers markets and natural food stores (OpenStreetMap), with map-app searches as a fallback. |
| **Meals** | 19 simple one-pot or one-bowl meals and a weekly menu. |
| **Practice** | About 40 practices: the home-safe shatkarmas (neti, kapalabhati, agnisar, trataka), daily saucha (tongue scraping, bathing, oil massage…), breath, postures, inner cleanliness (inputs, speech, emotions) and home habits. Each has steps, "Take care" notes and a timer where useful. Six advanced cleansings are described as "Teacher only". |
| **Learn** | The energy of food (balanced, activating, heavy), "Can I eat this?" search, the 8 limbs, common traps, daily habits, short reads, and an About page. |

It works offline after the first visit, installs to the home screen, and keeps all data (ticks, times, reflections) in the phone's local storage.

## Files

```
index.html            app shell
styles.css            all styling (light and dark)
app.js                logic: rendering, timers, store finder, install help
content/meals.js      meals and the weekly menu
content/shop.js       grocery list, stores, nearby searches
content/practices.js  practice library and the daily purification rotation
content/learn.js      food energy, food guide, 8 limbs, traps, habits, reads, credit line
sw.js                 offline support (network first, cache fallback)
manifest.webmanifest  install details
icons/                app icons
```

To change content, edit the matching file in `content/`. The fields are described at the top of each file.

## Run it locally

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000.

## Publish with GitHub Pages

In the repository on GitHub, go to **Settings → Pages**. Under "Build and deployment", choose **Deploy from a branch**, pick the `main` branch and the `/ (root)` folder, and save. The site appears at `https://<username>.github.io/prana/` within a minute or two.

## Disclaimer

Prana is a traditional lifestyle guide, not medical advice.
