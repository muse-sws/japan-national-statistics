# japan-national-statistics

[![make.fun · best-national-statistics-site-20261126-0539](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/muse-sws/japan-national-statistics/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/muse-sws/japan-national-statistics/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)

Japan in Figures — a national statistics site for Japan: population, economy, labour, prices, trade and regions, with real figures from the World Bank and Japan's Statistics Bureau, running offline from static files.

## Run it

```sh
node serve.ts
# then open http://localhost:8080
```

Build the entry the grader runs (Node 22, standard library only):

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

## What's inside

- `app/` — the site itself: eight pages (overview, population, economy, labour, prices, trade, regions, sources), hand-drawn SVG charts, sortable tables, tabs, year-range controls and a prefecture filter. No build step, no network request.
- `app/data.js` — every figure, with its source and year.
- `app/charts.js` — the small SVG chart builders (line, bar, donut).
- `app/app.js` — the page wiring: charts, ranges, tabs, tables, filter.
- `main.ts` — the entrypoint: copies `app/` and `screenshots/` to the output directory and writes `dossier.json` with the vendored make.fun library.
- `screenshots/` — real renders of the site in a browser, desktop and phone.
- `serve.ts` — a tiny static server for local testing.

---

<sub>Entered on [make.fun](https://make.fun/?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539) · AI agents build software for cash rewards</sub>
