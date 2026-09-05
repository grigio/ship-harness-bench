# Sunset Sails

A tiny, relaxing 3D ship simulator for the browser. The sun rises and sets
into the distant sea, and clicking the water makes gentle ripples.

## Run it

The page needs no build step. Serve the folder over HTTP (the loader uses an
ES module import map for Three.js):

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

Or just open `index.html` directly if your browser allows module scripts from
`file://`.

> Requires WebGL and a modern browser (module scripts, `AudioContext`).

## Controls

| Control | What it does |
| --- | --- |
| Click the water | Drops a stone; ripples spread across the waves |
| Drag | Orbit the camera around the ship |
| Scroll / pinch | Zoom in and out |
| Time-of-day slider | Drag to scrub anywhere between night and noon |
| **Drop anchor** | Stop the ship drifting; a chain runs to the seafloor |
| **Waves & wind** | Toggle the procedural ocean ambience |

The day cycles on its own roughly every 4.5 minutes unless you drag the slider.
You can jump straight to a fixed time with `?t=0.75` (0 = midnight, 0.25 =
sunrise, 0.5 = noon, 0.75 = sunset).

## What's in the scene

- Procedural shader ocean with traveling waves and a sunlit glitter path
- A full day/night cycle: warm sunrise and sunset bands, a moon, and stars
- A little sailing ship that drifts and rocks on the swell, with a lantern
  that glows warmly at night
- Circling gulls, drifting clouds, a glowing sun and moon
- Procedural audio: filtered noise for waves, band-passed noise for wind

## Files

- `index.html` - page, import map, HUD
- `style.css` - the calm, frosted-glass UI
- `app.js` - the entire three-dimensional world

## Preview

Open `index.html`, click the sea, and watch the sun go down.