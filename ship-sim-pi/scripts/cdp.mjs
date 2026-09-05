import { spawn } from 'node:child_process'
import { writeFileSync } from 'node:fs'

const port = 9222
const chrome = spawn('chromium', [
  '--headless=new',
  '--no-sandbox',
  '--disable-gpu',
  '--enable-unsafe-swiftshader',
  '--remote-debugging-port=' + port,
  '--window-size=1280,800',
  'about:blank',
])
chrome.stderr.on('data', () => {})

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
async function getWs() {
  for (let i = 0; i < 50; i++) {
    try {
      const res = await fetch(`http://127.0.0.1:${port}/json`)
      const targets = await res.json()
      const page = targets.find((t) => t.type === 'page')
      if (page) return page.webSocketDebuggerUrl
    } catch {}
    await sleep(200)
  }
  throw new Error('no debugger target')
}

const wsUrl = await getWs()
const ws = new WebSocket(wsUrl)
let id = 0
const pending = new Map()
const events = []
const errors = []
const consoleLogs = []

function send(method, params = {}) {
  return new Promise((resolve, reject) => {
    const mid = ++id
    pending.set(mid, { resolve, reject })
    ws.send(JSON.stringify({ id: mid, method, params }))
  })
}

ws.onmessage = (e) => {
  const msg = JSON.parse(e.data)
  if (msg.id && pending.has(msg.id)) {
    const { resolve, reject } = pending.get(msg.id)
    pending.delete(msg.id)
    if (msg.error) reject(new Error(msg.error.message))
    else resolve(msg.result)
    return
  }
  if (msg.method === 'Runtime.consoleAPICalled' || msg.method === 'Runtime.exceptionThrown') {
    events.push(msg)
  }
}

await new Promise((r) => (ws.onopen = r))
await send('Runtime.enable')
await send('Page.enable')
await send('Log.enable')

// capture console + errors
ws.onmessage = (e) => {
  const msg = JSON.parse(e.data)
  if (msg.method === 'Runtime.consoleAPICalled') {
    const text = msg.params.args.map((a) => a.value ?? a.description ?? '').join(' ')
    if (msg.params.type === 'error' || msg.params.type === 'warning' || /Shader|THREE|error/i.test(text)) {
      consoleLogs.push(`[${msg.params.type}] ${text}`)
    }
  }
  if (msg.method === 'Runtime.exceptionThrown') {
    errors.push(JSON.stringify(msg.params.exceptionDetails))
  }
  if (msg.method === 'Log.entryAdded' && msg.params.entry.level === 'error') {
    errors.push(msg.params.entry.text)
  }
}

await send('Page.navigate', { url: 'http://localhost:5173/' })
await sleep(10000) // let it run to simulate a little time

const easy = await send('Page.captureScreenshot', { format: 'png' })
writeFileSync('shots/cdp.png', Buffer.from(easy.data, 'base64'))

console.log('--- console (shader/error lines) ---')
console.log(consoleLogs.slice(0, 40).join('\n') || '(none)')
console.log('--- exceptions ---')
console.log(errors.slice(0, 20).join('\n') || '(none)')
chrome.kill('SIGKILL')
process.exit(0)