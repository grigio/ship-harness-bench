#!/usr/bin/env node
// Screenshot the ship simulator at each phase of the day using Firefox BiDi,
// and collect console errors. One page load per phase via URL params.
import { spawn } from 'node:child_process';
import { mkdirSync, writeFileSync } from 'node:fs';
import { mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const PORT = 9226;
const APP = 'http://127.0.0.1:8931/index.html';
const OUT = process.env.OUT_DIR || '/tmp/shots';
mkdirSync(OUT, { recursive: true });

const errors = [];

async function launch(url) {
  const profile = mkdtempSync(join(tmpdir(), 'ffprof-'));
  const proc = spawn('firefox', [
    '--headless', '--no-remote',
    `--remote-debugging-port=${PORT}`,
    `--profile=${profile}`,
    url,
  ], { stdio: ['ignore', 'pipe', 'pipe'] });
  proc.stderr.on('data', (d) => {
    const s = d.toString();
    if (/seccomp|Sandbox|BiDi listening|GFX1|Exiting due to channel error/.test(s)) return;
    if (/error/i.test(s)) errors.push('FF ' + s.trim());
  });
  // wait for BiDi port then connect
  const ws = await connectBidi();
  return { proc, ws };
}

async function connectBidi(retries = 40) {
  for (let i = 0; i < retries; i++) {
    try {
      return await openBidi();
    } catch {
      await sleep(400);
    }
  }
  throw new Error('bidi connect failed');
}

function sleep(ms) { return new Promise((r) => setTimeout(r, ms)); }

function openBidi() {
  return new Promise((resolve, reject) => {
    const ws = new WebSocket(`ws://127.0.0.1:${PORT}/session`);
    const to = setTimeout(() => reject(new Error('ws timeout')), 6000);
    ws.onerror = () => { clearTimeout(to); reject(new Error('ws error')); };
    ws.onopen = () => {
      clearTimeout(to);
      const bidi = new BiDi(ws);
      bidi.session = null;
      resolve(bidi);
    };
  });
}

class BiDi {
  constructor(ws) {
    this.ws = ws;
    this.id = 0;
    this.pending = new Map();
    this.events = [];
    ws.onmessage = (ev) => {
      const msg = JSON.parse(ev.data.toString());
      if (msg.id && this.pending.has(msg.id)) {
        const { res, rej } = this.pending.get(msg.id);
        this.pending.delete(msg.id);
        if (msg.error) rej(new Error(`${msg.error.message} ${JSON.stringify(msg.error.data ?? '')}`));
        else res(msg.result);
      } else if (msg.method) {
        this.events.push(msg);
      }
    };
  }
  send(method, params = {}) {
    const id = ++this.id;
    this.ws.send(JSON.stringify({ id, method, params }));
    return new Promise((res, rej) => this.pending.set(id, { res, rej }));
  }
  async newSession() {
    const r = await this.send('session.new', { capabilities: {} });
    this.session = r.sessionId;
    this.top = (await this.send('browsingContext.getTree', {})).contexts[0].context;
    await this.send('session.subscribe', { events: ['log.entryAdded', 'browsingContext.load', 'browsingContext.domContentLoaded'] });
  }
  async waitBoot() {
    for (let i = 0; i < 60; i++) {
      try {
        const r = await this.send('script.evaluate', {
          target: { context: this.top },
          expression: 'document.readyState + "|" + (typeof window.__sim === "object")',
          awaitPromise: true,
          resultOwnership: 'none',
        });
        const v = r.result?.value;
        if (typeof v === 'string' && v.includes('true')) return;
      } catch {}
      await sleep(300);
    }
    throw new Error('app did not boot');
  }
  async shot(name) {
    const r = await this.send('browsingContext.captureScreenshot', { context: this.top });
    writeFileSync(`${OUT}/${name}.png`, Buffer.from(r.data, 'base64'));
  }
  errors() {
    return this.events
      .filter((e) => e.method === 'log.entryAdded')
      .map((e) => e.params)
      .filter((l) => ['error', 'warn'].includes(l.level) || l.type === 'javascript')
      .map((l) => `${(l.level || '').toUpperCase()}[${l.type || ''}] ${(l.text || '').slice(0, 260)}`);
  }
}

async function phase(name, timeFrac, extra = '') {
  const url = `${APP}?time=${timeFrac}&autostart=1${extra}`;
  const { proc, ws } = await launch(url);
  await ws.newSession();
  await ws.waitBoot();
  // give the renderer a few frames
  await sleep(900);
  await ws.shot(name);
  const errs = ws.errors();
  errors.push(...errs.map((e) => `[${name}] ${e}`));
  ws.ws.close();
  proc.kill();
  await sleep(300);
}

async function main() {
  await phase('01_noon', 0.25);
  await phase('02_sunrise', 0.0);
  await phase('03_sunset', 0.5);
  await phase('04_night', 0.75);
  await phase('05_wave', 0.25, '&wave=1');

  console.log(JSON.stringify({ errors }, null, 2));
  process.exit(errors.length ? 1 : 0);
}

main().catch((e) => {
  console.error('HARNESS ERROR:', e);
  console.error(JSON.stringify(errors, null, 2));
  process.exit(1);
});