// Gently synthesized ocean — no external assets. Waves swell and recede forever.
export function createOceanAudio() {
  let ctx: AudioContext | null = null
  let master: GainNode | null = null
  let enabled = false

  function build() {
    if (ctx) return
    ctx = new AudioContext()
    master = ctx.createGain()
    master.gain.value = 0
    master.connect(ctx.destination)

    // --- brown-ish noise buffer ---
    const seconds = 4
    const buffer = ctx.createBuffer(1, ctx.sampleRate * seconds, ctx.sampleRate)
    const data = buffer.getChannelData(0)
    let last = 0
    for (let i = 0; i < data.length; i++) {
      const white = Math.random() * 2 - 1
      last = (last + 0.02 * white) / 1.02
      data[i] = last * 3.5
    }

    // --- deep swell: noise through a slowly-breathing lowpass ---
    const swell = ctx.createBufferSource()
    swell.buffer = buffer
    swell.loop = true
    const swellFilter = ctx.createBiquadFilter()
    swellFilter.type = 'lowpass'
    swellFilter.frequency.value = 420
    swellFilter.Q.value = 0.6
    const swellGain = ctx.createGain()
    swellGain.gain.value = 0.0
    swell.connect(swellFilter)
    swellFilter.connect(swellGain)
    swellGain.connect(master)

    const swellLFO = ctx.createOscillator()
    swellLFO.frequency.value = 0.07
    const swellLFOAmt = ctx.createGain()
    swellLFOAmt.gain.value = 0.16
    const swellLFOBase = ctx.createGain()
    swellLFOBase.gain.value = 0.2
    swellLFO.connect(swellLFOAmt)
    swellLFO.connect(swellLFOBase)
    swellLFOAmt.connect(swellGain.gain)
    swellLFOBase.connect(swellGain.gain)

    // --- fine hiss of breaking crests ---
    const hiss = ctx.createBufferSource()
    hiss.buffer = buffer
    hiss.loop = true
    hiss.playbackRate.value = 2.4
    const hissFilter = ctx.createBiquadFilter()
    hissFilter.type = 'bandpass'
    hissFilter.frequency.value = 2400
    hissFilter.Q.value = 0.4
    const hissGain = ctx.createGain()
    hissGain.gain.value = 0.035
    hiss.connect(hissFilter)
    hissFilter.connect(hissGain)
    hissGain.connect(master)

    const hissLFO = ctx.createOscillator()
    hissLFO.frequency.value = 0.13
    const hissLFOAmt = ctx.createGain()
    hissLFOAmt.gain.value = 0.022
    hissLFO.connect(hissLFOAmt)
    hissLFOAmt.connect(hissGain.gain)

    // --- slow wind bed ---
    const windFilter = ctx.createBiquadFilter()
    windFilter.type = 'lowpass'
    windFilter.frequency.value = 280
    const windGain = ctx.createGain()
    windGain.gain.value = 0.025
    const wind = ctx.createBufferSource()
    wind.buffer = buffer
    wind.loop = true
    wind.playbackRate.value = 0.7
    wind.connect(windFilter)
    windFilter.connect(windGain)
    windGain.connect(master)

    swell.start()
    hiss.start()
    wind.start()
    swellLFO.start()
    hissLFO.start()
  }

  function setEnabled(on: boolean) {
    enabled = on
    if (!ctx) {
      if (!on) return
      build()
    }
    ctx!.resume()
    const t = ctx!.currentTime
    master!.gain.cancelScheduledValues(t)
    master!.gain.setTargetAtTime(on ? 0.9 : 0, t, 0.6)
  }

  function toggle(): boolean {
    setEnabled(!enabled)
    return enabled
  }

  // browsers require a user gesture before audio starts
  function unlock() {
    if (ctx) return
    build()
    ctx!.suspend()
    const resume = () => {
      ctx!.resume()
      window.removeEventListener('pointerdown', resume)
    }
    window.addEventListener('pointerdown', resume)
  }

  return { unlock, setEnabled, toggle }
}

export type OceanAudio = ReturnType<typeof createOceanAudio>
