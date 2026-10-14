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

Open `index.html` in any modern browser. No server required.

## File Structure

- `index.html` — self-contained single-file demo (all CSS + JS inlined)
- `i18n.js` — translation dictionaries (EN / zh-CN / zh-TW), reference only
- `app.js` — application logic, reference only
- `backend/` — optional Express + SQLite reference backend (same seed data)

## License

Hackathon Demo — 2026
