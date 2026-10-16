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

Open `index.html` in any modern browser. The page runs standalone using its
built-in demo corpus; the AI assistant automatically falls back to the
client-side engine when no API is reachable.

### With the backend (recommended for the full demo)

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

#### API endpoints

| Method | Path | Purpose |
| --- | --- | --- |
| GET | `/api/zones` | all green space zones |
| GET | `/api/zones/:id` | single zone detail |
| POST | `/api/surveys` | submit a survey |
| GET | `/api/heatmap` | opinion heat points (`?type=all\|positive\|improve\|concern\|function`) |
| GET | `/api/dashboard` | dashboard statistics |
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
