import * as React from "react"
import "./TypewriterTitle.css"

let audioUnlocked = false
let keystrokeCount = 0
const AUDIO_UNLOCK_EVENT = "typewriter-audio-unlocked"
let audioContext = null
let masterGainNode = null
let hasPrimedAudioContext = false
let sharedNoiseBuffer = null

function getAudioContext() {
  if (typeof window === "undefined") return null
  const AudioCtx = window.AudioContext || window.webkitAudioContext
  if (!AudioCtx) return null
  if (audioContext) return audioContext

  audioContext = new AudioCtx()
  masterGainNode = audioContext.createGain()
  masterGainNode.gain.value = 0.18
  masterGainNode.connect(audioContext.destination)
  return audioContext
}

function createNoiseBuffer(ctx) {
  if (sharedNoiseBuffer) return sharedNoiseBuffer
  const sampleCount = Math.max(1, Math.floor(ctx.sampleRate * 0.05))
  const buffer = ctx.createBuffer(1, sampleCount, ctx.sampleRate)
  const data = buffer.getChannelData(0)
  for (let i = 0; i < sampleCount; i++) {
    const edgeDamp = 1 - i / sampleCount
    data[i] = (Math.random() * 2 - 1) * edgeDamp
  }
  sharedNoiseBuffer = buffer
  return buffer
}

function primeAudioContext(ctx) {
  if (!ctx || hasPrimedAudioContext) return
  const buffer = ctx.createBuffer(1, 1, ctx.sampleRate)
  const source = ctx.createBufferSource()
  source.buffer = buffer
  source.connect(masterGainNode)
  source.start()
  hasPrimedAudioContext = true
}

function unlockAudio() {
  if (audioUnlocked) return
  const ctx = getAudioContext()
  if (!ctx) return

  const resumePromise =
    typeof ctx.resume === "function" ? ctx.resume() : Promise.resolve()

  resumePromise
    .then(() => {
      primeAudioContext(ctx)
      audioUnlocked = true
      window.dispatchEvent(new CustomEvent(AUDIO_UNLOCK_EVENT))
    })
    .catch(() => {})
}

export function requestTypewriterAudioUnlock() {
  unlockAudio()
}

function ensureAudioReady() {
  const ctx = getAudioContext()
  if (!ctx) return null
  if (!audioUnlocked) {
    audioUnlocked = true
    window.dispatchEvent(new CustomEvent(AUDIO_UNLOCK_EVENT))
  }
  if (ctx.state === "suspended" && typeof ctx.resume === "function") {
    ctx.resume().catch(() => {})
  }
  primeAudioContext(ctx)
  return ctx
}

function playKeystrokeSound(char, prevChar, index) {
  if (!audioUnlocked) return
  const ctx = getAudioContext()
  if (!ctx || !masterGainNode) return

  keystrokeCount += 1
  const charCode = char.charCodeAt(0)
  const isPunctuation = /[.,:;!?)]/.test(char)
  const isSpace = /\s/.test(char)
  const now = ctx.currentTime
  const variationSeed = (charCode * 7 + index * 17 + keystrokeCount * 13) % 23
  const weight = isSpace ? 0.45 : isPunctuation ? 0.8 : 1
  const bodyFrequency = 820 + ((charCode + variationSeed * 31) % 220)
  const clickFrequency = 1450 + ((charCode * 3 + variationSeed * 19) % 620)
  const ringFrequency = 120 + ((charCode * 5 + variationSeed * 11) % 55)
  const attack = 0.001
  const clickDecay = isSpace ? 0.012 : 0.018 + (variationSeed % 5) * 0.003
  const ringDecay = isPunctuation ? 0.05 : prevChar === "\n" ? 0.065 : 0.04

  const outputGain = ctx.createGain()
  outputGain.gain.setValueAtTime(0.0001, now)
  outputGain.gain.exponentialRampToValueAtTime(
    (0.30 + (variationSeed % 6) * 0.020) * weight,
    now + attack
  )
  outputGain.gain.exponentialRampToValueAtTime(0.0001, now + ringDecay)
  outputGain.connect(masterGainNode)

  const clickOsc = ctx.createOscillator()
  clickOsc.type = variationSeed % 3 === 0 ? "triangle" : "square"
  clickOsc.frequency.setValueAtTime(clickFrequency, now)
  clickOsc.frequency.exponentialRampToValueAtTime(
    bodyFrequency,
    now + clickDecay
  )

  const clickFilter = ctx.createBiquadFilter()
  clickFilter.type = "bandpass"
  clickFilter.frequency.setValueAtTime(1180 + variationSeed * 42, now)
  clickFilter.Q.value = 0.58 + (variationSeed % 5) * 0.08

  const clickGain = ctx.createGain()
  clickGain.gain.setValueAtTime(0.0001, now)
  clickGain.gain.exponentialRampToValueAtTime(
    (isSpace ? 0.30 : 0.68) + (variationSeed % 4) * 0.05,
    now + 0.0016
  )
  clickGain.gain.exponentialRampToValueAtTime(0.0001, now + clickDecay)

  clickOsc.connect(clickFilter)
  clickFilter.connect(clickGain)
  clickGain.connect(outputGain)

  const ringOsc = ctx.createOscillator()
  ringOsc.type = variationSeed % 2 === 0 ? "sine" : "triangle"
  ringOsc.frequency.setValueAtTime(ringFrequency, now)
  ringOsc.frequency.exponentialRampToValueAtTime(
    ringFrequency * (isPunctuation ? 1.45 : 1.25),
    now + ringDecay
  )

  const ringGain = ctx.createGain()
  ringGain.gain.setValueAtTime(0.0001, now)
  ringGain.gain.exponentialRampToValueAtTime(
    (isSpace ? 0.026 : 0.082) + (variationSeed % 3) * 0.008,
    now + 0.005
  )
  ringGain.gain.exponentialRampToValueAtTime(0.0001, now + ringDecay)
  ringOsc.connect(ringGain)
  ringGain.connect(outputGain)

  const noiseSource = ctx.createBufferSource()
  noiseSource.buffer = createNoiseBuffer(ctx)
  const noiseFilter = ctx.createBiquadFilter()
  noiseFilter.type = "highpass"
  noiseFilter.frequency.setValueAtTime(780 + variationSeed * 30, now)
  const noiseGain = ctx.createGain()
  noiseGain.gain.setValueAtTime(0.0001, now)
  noiseGain.gain.exponentialRampToValueAtTime(
    (isSpace ? 0.012 : 0.034) + (variationSeed % 5) * 0.0032,
    now + 0.0012
  )
  noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + clickDecay)
  noiseSource.connect(noiseFilter)
  noiseFilter.connect(noiseGain)
  noiseGain.connect(outputGain)

  clickOsc.start(now)
  ringOsc.start(now)
  noiseSource.start(now)

  clickOsc.stop(now + clickDecay + 0.01)
  ringOsc.stop(now + ringDecay + 0.02)
  noiseSource.stop(now + clickDecay + 0.01)
}

export function playUiToggleSound(seed = 0) {
  const ctx = ensureAudioReady()
  if (!ctx || !masterGainNode) return

  const now = ctx.currentTime
  const weight = 0.8 + (seed % 4) * 0.08

  const outputGain = ctx.createGain()
  outputGain.gain.setValueAtTime(0.0001, now)
  outputGain.gain.exponentialRampToValueAtTime(0.09 * weight, now + 0.002)
  outputGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.05)
  outputGain.connect(masterGainNode)

  const bodyOsc = ctx.createOscillator()
  bodyOsc.type = "triangle"
  bodyOsc.frequency.setValueAtTime(180 + (seed % 5) * 14, now)
  bodyOsc.frequency.exponentialRampToValueAtTime(110 + (seed % 4) * 9, now + 0.04)

  const bodyFilter = ctx.createBiquadFilter()
  bodyFilter.type = "lowpass"
  bodyFilter.frequency.setValueAtTime(780 + (seed % 4) * 90, now)
  bodyFilter.Q.value = 0.55

  const bodyGain = ctx.createGain()
  bodyGain.gain.setValueAtTime(0.0001, now)
  bodyGain.gain.exponentialRampToValueAtTime(0.18 * weight, now + 0.002)
  bodyGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.036)

  const noiseSource = ctx.createBufferSource()
  noiseSource.buffer = createNoiseBuffer(ctx)
  const noiseFilter = ctx.createBiquadFilter()
  noiseFilter.type = "bandpass"
  noiseFilter.frequency.setValueAtTime(1700 + (seed % 5) * 120, now)
  noiseFilter.Q.value = 0.85
  const noiseGain = ctx.createGain()
  noiseGain.gain.setValueAtTime(0.0001, now)
  noiseGain.gain.exponentialRampToValueAtTime(0.012 * weight, now + 0.001)
  noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.016)

  bodyOsc.connect(bodyFilter)
  bodyFilter.connect(bodyGain)
  bodyGain.connect(outputGain)
  noiseSource.connect(noiseFilter)
  noiseFilter.connect(noiseGain)
  noiseGain.connect(outputGain)

  bodyOsc.start(now)
  noiseSource.start(now)

  bodyOsc.stop(now + 0.05)
  noiseSource.stop(now + 0.02)
}

export function playTypewriterReturnSound(seed = 0) {
  const ctx = ensureAudioReady()
  if (!ctx || !masterGainNode) return

  const now = ctx.currentTime
  const outputGain = ctx.createGain()
  outputGain.gain.setValueAtTime(0.0001, now)
  outputGain.gain.exponentialRampToValueAtTime(0.13, now + 0.004)
  outputGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.16)
  outputGain.connect(masterGainNode)

  const carriageNoise = ctx.createBufferSource()
  carriageNoise.buffer = createNoiseBuffer(ctx)
  const carriageFilter = ctx.createBiquadFilter()
  carriageFilter.type = "bandpass"
  carriageFilter.frequency.setValueAtTime(960 + seed * 14, now)
  carriageFilter.Q.value = 0.9
  const carriageGain = ctx.createGain()
  carriageGain.gain.setValueAtTime(0.0001, now)
  carriageGain.gain.exponentialRampToValueAtTime(0.028, now + 0.003)
  carriageGain.gain.exponentialRampToValueAtTime(0.012, now + 0.03)
  carriageGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.085)

  const bodyOsc = ctx.createOscillator()
  bodyOsc.type = "triangle"
  bodyOsc.frequency.setValueAtTime(160 + seed * 4, now)
  bodyOsc.frequency.exponentialRampToValueAtTime(92 + seed * 2, now + 0.09)
  const bodyGain = ctx.createGain()
  bodyGain.gain.setValueAtTime(0.0001, now)
  bodyGain.gain.exponentialRampToValueAtTime(0.16, now + 0.003)
  bodyGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.07)

  const bellGain = ctx.createGain()
  bellGain.gain.setValueAtTime(0.0001, now)
  bellGain.gain.exponentialRampToValueAtTime(0.028, now + 0.02)
  bellGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.095)

  const bell = ctx.createOscillator()
  bell.type = "sine"
  bell.frequency.setValueAtTime(1320 + seed * 14, now + 0.016)

  const latchNoise = ctx.createBufferSource()
  latchNoise.buffer = createNoiseBuffer(ctx)
  const latchFilter = ctx.createBiquadFilter()
  latchFilter.type = "highpass"
  latchFilter.frequency.setValueAtTime(2200 + seed * 20, now + 0.058)
  const latchGain = ctx.createGain()
  latchGain.gain.setValueAtTime(0.0001, now)
  latchGain.gain.exponentialRampToValueAtTime(0.012, now + 0.058)
  latchGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.075)

  carriageNoise.connect(carriageFilter)
  carriageFilter.connect(carriageGain)
  carriageGain.connect(outputGain)
  bodyOsc.connect(bodyGain)
  bodyGain.connect(outputGain)
  bell.connect(bellGain)
  bellGain.connect(outputGain)
  latchNoise.connect(latchFilter)
  latchFilter.connect(latchGain)
  latchGain.connect(outputGain)

  carriageNoise.start(now)
  bodyOsc.start(now)
  bell.start(now + 0.012)
  latchNoise.start(now + 0.055)

  carriageNoise.stop(now + 0.09)
  bodyOsc.stop(now + 0.09)
  bell.stop(now + 0.1)
  latchNoise.stop(now + 0.08)
}

function mulberry32(seed) {
  return function () {
    let t = (seed += 0x6d2b79f5)
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = React.useState(false)

  React.useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    const onChange = () => setReduced(Boolean(mq.matches))
    onChange()
    mq.addEventListener?.("change", onChange)
    return () => mq.removeEventListener?.("change", onChange)
  }, [])

  return reduced
}

function useAudioUnlock() {
  const [audioReady, setAudioReady] = React.useState(audioUnlocked)

  React.useEffect(() => {
    if (typeof window === "undefined") return
    const onUnlock = () => unlockAudio()
    const onUnlocked = () => setAudioReady(true)
    window.addEventListener("pointerdown", onUnlock, { passive: true })
    window.addEventListener("keydown", onUnlock)
    window.addEventListener(AUDIO_UNLOCK_EVENT, onUnlocked)
    return () => {
      window.removeEventListener("pointerdown", onUnlock)
      window.removeEventListener("keydown", onUnlock)
      window.removeEventListener(AUDIO_UNLOCK_EVENT, onUnlocked)
    }
  }, [])

  return audioReady
}

export default function TypewriterTitle({
  as: Tag = "h1",
  text,
  className = "",
  startDelayMs = 180,
  onDone,
  onStart
}) {
  const prefersReducedMotion = usePrefersReducedMotion()
  const audioReady = useAudioUnlock()
  const [shown, setShown] = React.useState("")
  const [replayKey, setReplayKey] = React.useState(0)
  const onDoneRef = React.useRef(onDone)
  const onStartRef = React.useRef(onStart)
  const hasRestartedForAudioRef = React.useRef(false)

  React.useEffect(() => {
    onDoneRef.current = onDone
  }, [onDone])

  React.useEffect(() => {
    onStartRef.current = onStart
  }, [onStart])

  React.useEffect(() => {
    if (!audioReady) return
    if (hasRestartedForAudioRef.current) return
    hasRestartedForAudioRef.current = true
    setReplayKey((value) => value + 1)
  }, [audioReady])

  React.useEffect(() => {
    if (!text) return
    if (prefersReducedMotion) {
      setShown(text)
      onDoneRef.current?.()
      return
    }

    let cancelled = false
    const timeoutIds = []
    let doneTimeoutId = null
    let t = 0
    const seed = Array.from(text).reduce((acc, ch) => acc + ch.charCodeAt(0), 0)
    const rnd = mulberry32(seed || 1)

    setShown("")
    onStartRef.current?.()
    const chars = Array.from(text)
    for (let i = 0; i < chars.length; i++) {
      const ch = chars[i]
      const prev = i > 0 ? chars[i - 1] : ""

      // Base human-ish cadence with jitter.
      let dt = 34 + Math.floor(rnd() * 58) // 34..92ms

      // Micro-pause after spaces (breath between words).
      if (prev === " ") dt += 40 + Math.floor(rnd() * 55)

      // Slight pause after punctuation / line breaks.
      if (/[.,:;!?)]/.test(prev)) dt += 110 + Math.floor(rnd() * 110)
      if (prev === "\n") dt += 140 + Math.floor(rnd() * 120)

      // Rare longer pause to avoid "computer perfect" rhythm.
      if (rnd() < 0.035) dt += 160 + Math.floor(rnd() * 240)

      t += dt

      const timeoutId = window.setTimeout(() => {
        if (cancelled) return
        setShown(chars.slice(0, i + 1).join(""))
        if (!/\s/.test(ch)) {
          playKeystrokeSound(ch, prev, i)
        }
      }, startDelayMs + t)
      timeoutIds.push(timeoutId)
    }

    doneTimeoutId = window.setTimeout(() => {
      if (cancelled) return
      onDoneRef.current?.()
    }, startDelayMs + t + 10)

    return () => {
      cancelled = true
      timeoutIds.forEach((timeoutId) => window.clearTimeout(timeoutId))
      if (doneTimeoutId != null) window.clearTimeout(doneTimeoutId)
    }
  }, [text, prefersReducedMotion, startDelayMs, audioReady, replayKey])

  React.useEffect(() => {
    hasRestartedForAudioRef.current = false
  }, [text])

  return (
    <Tag className={`tw ${className}`} aria-label={text}>
      <span className="twGhost" aria-hidden="true">
        {text}
      </span>
      <span className="twText" aria-hidden="true">
        {(() => {
          // If the last typed character is a newline, some browsers will visually place the
          // cursor on the empty next line. Hide the cursor during that moment.
          const endsWithNewline = /\n$/.test(shown)
          return (
            <>
              {shown}
              {endsWithNewline ? null : <span className="twCursor" />}
            </>
          )
        })()}
      </span>
    </Tag>
  )
}
