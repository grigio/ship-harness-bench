# Open Sea · a relaxing 3D ship simulator

A calm, generative, single-page 3D ship simulator for the browser. No models,
textures or assets — everything is built live from code with Three.js.

* **Sun on the horizon** driving a smooth **day / night cycle** (rise → noon →
  sunset → starry night → dawn), with a warm dusk/dawn palette, moon, clouds
  and stars.
* **Procedural shader ocean** — soft swells + sun glint + distance haze.
* **Click the sea to make a wave** — an expanding ripple that also rocks the ship.
* A **sailing ship** built from primitives, riding the swells, sailing a wide
  circle while you relax and watch.
* **Relaxing camera** — drag to orbit, scroll to zoom, and a gentle auto-drift
  when you stop interacting.

## Run

Open the self-contained **`index.html`** (everything is inlined, no network
needed):

```sh
# serve it (or just double-click index.html)
python3 -m http.server 8000
# → http://localhost:8000/index.html
```

Requires a WebGL (2) capable browser.

## Controls

| Action | Effect |
| ------ | ------ |
| Drag | Orbit the camera (smooth, damped) |
| Scroll / pinch | Zoom in and out |
| Click / tap the water | Spawn a ripple wave |
| (idle) | Camera slowly drifts for a relaxing pan |

## Build

```sh
# bun is required (three.js is the only dependency)
bun install          # fetch three
./build.sh           # bundle src/main.js → dist/app.js → inline into index.html
```

`package.json` pins `three` as the only runtime dependency (installed once, at
build time, then inlined).

### Dev / debug query params

Hidden test knobs, harmless in normal use:

* `?t=0.75` — set the starting time of day (`0.25` sunrise · `0.5` midday ·
  `0.75` sunset · `0.98` night)
* `?low=1` — low-fidelity mode (fast on software GL/headless)
* `?d=1` — diagnostic overlay + freeze (headless verification)
* `?ripple=1` — auto-spawn ripples for testing
* `?stable=1` — delay load until frames are drawn (reliable headless capture)

## Files

* `src/main.js` — the whole simulator (scene, sky/ocean shaders, ship, camera)
* `index.template.html` — HTML/CSS shell with a `/*__BUNDLE__*/` placeholder
* `index.html` — **the deliverable**: shell + inlined minified bundle
* `build.sh` — builds `dist/app.js` and inlines it into `index.html`
* `PLAN.md` — the one-line brief this project implements