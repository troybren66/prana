# Notes for Claude working on Prana

Prana is a static PWA with no build step. See README.md for the file map. The owner asks Claude for content changes rather than editing files directly, so most changes go in `content/*.js`.

## Content principles

- **Gentle, not dogmatic.** Food framing follows Balanced / Activating / Heavy (sattvic / rajasic / tamasic) with "notice how you feel" questions. Onion, garlic and mushrooms are a *traditional* omission, not a health claim. Frozen food and safely stored leftovers are fine. Never imply that food decides someone's worth.
- **Safety first.** Every practice with physical risk carries a `caution` list. Neti always says distilled, sterile or boiled-then-cooled water (FDA guidance). Advanced cleansings (vastra dhauti, basti, vamana, sutra neti, shankhaprakshalana, full nauli) stay in the `teacher` category: described, never instructed. No medical claims. Phrase benefits as tradition or experience.
- **National, not local.** Stores are national chains plus generic types (Indian grocery, farmers market, any supermarket). Nothing specific to the owner's town.
- **No personal details** about the owner or their teacher's students anywhere in the app.
- **Our own words.** Teachings from Zach Sanders (Conscious Warrior Yoga) are paraphrased, never copied from his course materials or slides. The credit line lives in `PRANA.credit` in `content/learn.js`.
- Plain, short sentences. One instruction per step.

## Technical notes

- Content files set `window.PRANA.*` and load as classic scripts before `app.js`.
- Storage keys are prefixed `prana-` in localStorage. Shop ticks are keyed by `category|item name`, so renaming an item resets its tick.
- `sw.js` is network first with a 3.5s timeout, then cache. A new file must be added to `SHELL` in `sw.js` to work offline.
- The store finder calls the public Overpass API (OpenStreetMap) only after the user taps the button. Keep the OSM attribution line.
- Test on a phone-sized viewport (Playwright `devices['iPhone 13']`) in light and dark mode, and check that no page scrolls sideways.
