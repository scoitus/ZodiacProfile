# Astralis

A small React app that turns a date of birth into a reading: sun sign, Chinese zodiac, birthstone, birth flower and tarot birth card.

## What it shows

- **Sun sign** with its constellation, element, quality, ruling planet and traits. Dates within a day of a sign boundary get a cusp note, because the exact changeover shifts from year to year.
- **Chinese zodiac** animal, element and yin/yang polarity, keyed to Lunar New Year rather than 1 January.
- **Birthstone and birth flower** for the month, with their traditional meanings.
- **Tarot birth card** from the life path number, including master numbers 11, 22 and 33.

## Running it

```bash
npm install
npm run dev      # local dev server
npm test         # unit tests for the date logic
npm run lint
npm run build    # production build in dist/
```

## Layout

| Path | Contents |
| --- | --- |
| `src/utils/zodiac.js` | All date logic and validation; `calculateProfile('YYYY-MM-DD')` returns the reading |
| `src/data/` | Reference data: signs, animals, stones, flowers, tarot, constellation figures |
| `src/components/` | Birth form, reading view, sky and SVG artwork |
| `src/index.css` | Theme tokens (Tailwind v4 `@theme`) and custom styles |

## Accuracy notes

- Supported years are 1900 to 2100.
- Lunar New Year uses a verified table for 1900–2040. Later years use the browser's built-in Chinese calendar, which can differ from the official date by one day in rare years.
- Sun sign boundaries use the conventional fixed dates.
