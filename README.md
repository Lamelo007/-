# GreenSpace NM — Northern Metropolis Green Space Interactive Platform

Hackathon demo: an interactive web platform that turns official text-based green
space planning documents into a visual, map-driven experience for the Northern
Metropolis (Hong Kong).

## Features

- **Interactive Green Space Map** — SVG map built from **real government
  geospatial data** (see below): clickable conservation sites with detail panels,
  type filters, zoom / reset
- **Resident Survey** — 4-step questionnaire with progress tracking
- **AI Opinion Heatmap** — spatial visualisation of aggregated public feedback,
  overlaid on the same real geography
- **Government Dashboard** — KPI cards, Chart.js bar / pie charts, opinion table
- **AI Assistant** — intent-based Q&A over the zone / opinion / dashboard data,
  plus one-click generation of a construction-suggestion report
  (Markdown / HTML / print-to-PDF)
- **Trilingual Support** — English / 简体中文 / 繁體中文 with live switching

## Map data sources

All geometry is projected from official [CSDI](https://portal.csdi.gov.hk)
(Common Spatial Data Infrastructure) GeoJSON downloads — no API key required.

| Layer | Dataset | Provider |
| --- | --- | --- |
| Site polygons (7 zones) | 须优先加强保育地点 — Priority Sites for Enhanced Conservation | AFCD |
| Coastline / land base | 地方行政区分界 — District Council District Boundaries | HAD |
| Stream network | 环评报告生境图 — Habitat Map watercourse network | EPD |
| Ecologically important streams | 具重要生态价值河溪 | AFCD |
| Old & valuable trees | 古树名木及石墙树 | DevB / WB |
| Country-park trees | 郊野公园内主要康乐场地的树木资料 | AFCD |
| Landmarks | 香港湿地公园 | AFCD |

The seven zones are the real AFCD priority conservation sites that fall inside
the Northern Metropolis window:

| id | Site | Type | Area |
| --- | --- | --- | --- |
| z1 | 拉姆薩爾濕地 / Mai Po Ramsar Site | Wetland | 1,551 ha |
| z2 | 拉姆薩爾濕地以外的后海灣濕地 / Deep Bay Wetland outside Ramsar Site | Wetland | 1,012 ha |
| z3 | 塱原及河上鄉 / Long Valley & Ho Sheung Heung | Eco Park | 151 ha |
| z4 | 鳳園 / Fung Yuen | Conservation Reserve | 42 ha |
| z5 | 沙羅洞 / Sha Lo Tung | Conservation Reserve | 55 ha |
| z6 | 鹿頸沼澤 / Luk Keng Marsh | Wetland | 37 ha |
| z7 | 烏蛟騰 / Wu Kau Tang | Eco Park | 103 ha |

Cross-check: the Ramsar polygon measures ≈1,551 ha, matching the official
published figure of ≈1,540 ha.

Geometry is projected with a cos(22.5°) latitude correction so the map is
equidistant-cylindrical on an 800×560 canvas, then simplified with
Douglas–Peucker to keep the SVG light.

## Tech Stack

- HTML5 + CSS3 (single self-contained file)
- Vanilla JavaScript (no build tools)
- Chart.js 4.4.1 (CDN)
- Hand-built SVG map from projected GeoJSON
- localStorage for language preference

## Usage

### Frontend only (no backend)

Open `index.html` in any modern browser. The page renders, but it will show a
**"后端未连接"** banner and every figure will read `0` / `—`.

That is deliberate. The frontend has **no built-in demo corpus** — it reads
every number from the REST API so there is exactly one source of truth. If the
API is unreachable the page reports that honestly instead of showing
plausible-looking invented data.

### With the backend (required for real data)

The backend is an Express + SQLite service that serves the frontend **and**
exposes the REST API.

**Requirement: Node.js 22.** `better-sqlite3` is a native module, so the
Node major version used to install must match the one used to run. If you see
`NODE_MODULE_VERSION ... requires ...`, either switch to the matching Node
version or run `npm rebuild better-sqlite3` inside `backend/`.

```bash
cd backend
npm ci          # or: npm install
node server.js
```

Then open <http://localhost:3000>.

Set `PORT` to change the port, and `CORS_ORIGIN` (comma-separated) to restrict
cross-origin access:

```bash
PORT=8080 CORS_ORIGIN="http://localhost:8080" node server.js
```

## Data model

Two tables describe public opinion, and they mean different things:

| Table | Means | Drives |
| --- | --- | --- |
| `heat_points` | **one aggregated opinion** (a seed baseline sample, or one row auto-generated per submission) | the heat map, the "意见总数" KPI, the pie chart, the per-zone opinion counts, hot topics, function distribution |
| `surveys` | **one resident submission** (rating 1–5 + chosen functions + free text) | "居民意见提交" / "总问卷数", today's new submissions, average satisfaction, active zones |

Because `heat_points` is the single opinion dataset, the map, the pie chart and
the dashboard table can never disagree about how many opinions exist. A seeded
database starts with 7 zones and 11 baseline heat points and **zero** surveys.

A zone nobody has rated has **no** satisfaction score — the API returns `null`
and the UI shows `—`, never `0`, so "no data" is never mistaken for "rated 1".

#### API endpoints

| Method | Path | Purpose |
| --- | --- | --- |
| GET | `/api/zones` | all green space zones, incl. `opinion_count`, `avg_satisfaction` (`null` if unrated), `submission_count` |
| GET | `/api/zones/:id` | single zone detail |
| POST | `/api/surveys` | submit a survey (validates rating 1–5, zone existence, array-typed functions) |
| GET | `/api/heatmap` | opinion heat points (`?type=all\|positive\|improve\|concern\|function`) |
| GET | `/api/dashboard` | dashboard statistics: `total_opinions`, `total_surveys`, `today_new`, `avg_rating`, `active_zones`, `type_percent`, `hot_topic`, `func_distribution`, `zone_table` |
| POST | `/api/ai/chat` | AI assistant chat |
| POST | `/api/ai/report` | generate construction report |
| GET | `/api/ai/suggest` | suggested questions (`?lang=`) |

> The `backend/` directory is intentionally **not** served statically — it holds
> the source code and the SQLite database file.

## File Structure

- `index.html` — self-contained single-file demo (all CSS + JS inlined)
- `i18n.js` — translation dictionaries (EN / zh-CN / zh-TW), reference only
- `app.js` — application logic, reference only
- `backend/` — Express + SQLite reference backend
  - `server.js` — HTTP routes and static hosting
  - `database.js` — schema and seed data
  - `ai-engine.js` — keyword extraction, opinion classification, heat-point generation
  - `ai-assistant.js` — intent detection, chat answers, report generation

`node_modules/` and the generated `greenspace.db` are git-ignored; the database
is created and seeded automatically on first run.

## License

Hackathon Demo — 2026
