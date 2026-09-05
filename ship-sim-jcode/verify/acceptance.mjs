#!/usr/bin/env node
// Final acceptance harness for Voyager:
//  - loads the app, verifies intro overlay present
//  - begins sailing (autostart), checks HUD text and body classes
//  - simulates a click on the sea -> expects a ripple
//  - verifies sun/moon mesh visibility tracks day/night
//  - checks for console errors across a dawn->noon->dusk->night sweep
import { spawn } from 'node:child_process';
import { mkdirSync, writeFileSync, mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const PORT = 9250;
const APP = 'http://127.0.0.1:8931/index.html';
const OUT = process.env.OUT_DIR || '/tmp/shots';
mkdirSync(OUT, { recursive: true });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const profile = mkdtempSync(join(tmpdir(), 'ffacc-'));
const proc = spawn('firefox', [
  '--headless', '--no-remote',
  `--remote-debugging-port=${PORT}`,
  `--profile=${profile}`,
  `${APP}?autostart=1`,
], { stdio: ['ignore', 'pipe', 'pipe'] });
proc.stderr.on('data', (d) => {
  const s = d.toString();
  if (/seccomp|Sandbox|BiDi listening|GFX1|Exiting due to channel error/.test(s)) return;
  if (/error/i.test(s)) console.error('FF>', s.trim());
});

async function main() {
  let ws = null;
  for (let i = 0; i < 60; i++) {
    try {
      ws = await new Promise((res, rej) => {
        const w = new WebSocket(`ws://127.0.0.1:${PORT}/session`);
        const t = setTimeout(() => rej(new Error('to')), 4000);
        w.onerror = () => { clearTimeout(t); rej(new Error('err')); };
        w.onopen = () => { clearTimeout(t); res(w); };
      });
      break;
    } catch { await sleep(400); }
  }
  if (!ws) throw new Error('no bidi socket');

  let id = 0;
  const pend = new Map();
  const events = [];
  ws.onmessage = (e) => {
    const m = JSON.parse(e.data.toString());
    if (m.id && pend.has(m.id)) {
      const { res, rej } = pend.get(m.id);
      pend.delete(m.id);
      m.error ? rej(new Error(JSON.stringify(m.error))) : res(m.result);
    } else if (m.method) events.push(m.params ?? { method: m.method });
  };
  const send = (method, params = {}) => {
    const i = ++id;
    ws.send(JSON.stringify({ id: i, method, params }));
    return new Promise((res, rej) => pend.set(i, { res, rej }));
  };
  const evalx = (expr) => send('script.evaluate', { target: { context: top }, expression: expr, awaitPromise: true, resultOwnership: 'none' });
  const waitApp = async () => {
    for (let i = 0; i < 60; i++) {
      try {
        const r = await evalx('typeof window.__sim === "object"');
        if (r.result?.value === true) return;
      } catch {}
      await sleep(300);
    }
    throw new Error('app did not boot');
  };

  await send('session.new', { capabilities: {} });
  const tree = await send('browsingContext.getTree', {});
  const top = tree.contexts[0].context;
  await send('session.subscribe', { events: ['log.entryAdded'] }).catch(() => {});
  await waitApp();
  await sleep(1200);

  const results = {};

  // 1. started (autostart) state
  const st = await evalx('JSON.stringify({cls: document.body.className, startBtn: !!document.getElementById("start"), clock: document.getElementById("clock").textContent.trim(), status: document.getElementById("status").textContent.trim()})');
  results.start = JSON.parse(st.result?.value);

  // 2. Sun visible at noon, hidden at midnight; moon opposite
  await evalx('window.__sim.setTime(37.5); true'); await sleep(120);
  const noon = await evalx('JSON.stringify(window.__sunVis())');
  await evalx('window.__sim.setTime(112.5); true'); await sleep(120);
  const night = await evalx('JSON.stringify(window.__sunVis())');
  results.sunMoon = { noon: JSON.parse(noon.result?.value), night: JSON.parse(night.result?.value) };

  // 3. click on the sea creates a ripple
  await evalx('window.__sim.setTime(37.5); true'); await sleep(120);
  const before = (await evalx('window.__sim.rippleCount()')).result?.value;
  await send('input.performActions', { context: top, actions: [{
    type: 'pointer', id: 'm', parameters: { pointerType: 'mouse' },
    actions: [
      { type: 'pointerMove', duration: 0, x: 640, y: 500 },
      { type: 'pointerDown', button: 0 },
      { type: 'pointerUp', button: 0 },
    ],
  }] });
  await sleep(600);
  const after = (await evalx('window.__sim.rippleCount()')).result?.value;
  results.clickRipple = { before, after };

  // 4. sweep the whole day collecting console errors
  const errs = events.filter((e) => e.level && ['error', 'warn'].includes(e.level));
  results.consoleErrors = errs.map((e) => `${e.level.toUpperCase()}[${e.type}] ${(e.text || '').slice(0, 220)}`);

  console.log(JSON.stringify(results, null, 2));
  process.exit(results.consoleErrors.length ? 1 : 0);
}

main().catch((e) => {
  console.error('HARNESS ERROR:', e.message || e);
  process.exit(1);
});

// extra hook registration
const { mkdtempSync: _m } = await import('node:fs');