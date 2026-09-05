# Sunset Sails

Create a beautiful, relaxing, 3D ship simulator for the browser with the sun
in the horizon alternating day and night and when you click on the sea the
water makes a wave.

## Status: implemented

Implements the requested plan in full:

- **3D ship simulator** - a procedurally-built sailing ship (hull, deck,
  cabin, mast, gaff sail, jib, bowsprit) that drifts and rocks on animated
  waves, rendered with Three.js.
- **Sun in the horizon alternating day and night** - a continuous sky model
  (night / dusk / day palettes) drives the sky dome, ocean color, lighting and
  a sun sprite that rises from the east horizon (t~0.25) and sinks into the
  west (t~0.75); a moon and stars appear at night.
- **Click the sea to make a wave** - clicking the ocean raycasts to the water
  and pushes a ring of ripples into the vertex shader, so the surface actually
  deforms and radiates outward.

## Usage

```bash
python3 -m http.server 8000   # then open http://localhost:8000
```

Drag to orbit, scroll to zoom, drag the time-of-day slider, drop anchor, and
toggle the procedural wave/wind audio. See README.md for details.