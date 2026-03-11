'use client';

import { useEffect, useRef } from 'react';
import { useExperience } from '@/components/ExperienceContext';

// ═══════════════════════════════════════════════════════════════════════
//  "INTERSTELLAR MAIN THEME — EXTRA EXTENDED" AMBIENT ENGINE
//  Faithful to Hans Zimmer's signature: rhythmic organ pumping with
//  harmonic overtones, Am descending-bass progression, the iconic
//  1-per-second tick, slowly building strings, space dust noise wash.
//  Pure Web Audio API synthesis — no audio files.
// ═══════════════════════════════════════════════════════════════════════

interface AmbientState {
    ctx: AudioContext | null;
    master: GainNode | null;
    nodes: AudioNode[];
    timers: NodeJS.Timeout[];
    intervals: NodeJS.Timeout[];
    isPlaying: boolean;
}

const S: AmbientState = {
    ctx: null, master: null, nodes: [], timers: [], intervals: [],
    isPlaying: false,
};

const FADE_IN = 5.0;   // slow cinematic entrance
const FADE_OUT = 4.0;
const VOL = 1.0;       // full scale — let the OS system volume control loudness

// ─── Interstellar Main Theme progression ────────────────────────────
// Am → Am/G# → C/G → Fmaj7 → Dm7 → E7sus4 → Am
// (Descending bass line — the actual harmonic motion of the theme)
const PROG = [
    { bass: 55.0,  notes: [110, 130.81, 164.81, 220] },      // Am
    { bass: 51.91, notes: [110, 130.81, 164.81, 207.65] },    // Am/G#
    { bass: 49.0,  notes: [130.81, 164.81, 196.0, 261.63] },  // C/G
    { bass: 43.65, notes: [110, 130.81, 164.81, 220] },       // Fmaj7
    { bass: 36.71, notes: [110, 146.83, 174.61, 220] },       // Dm7
    { bass: 41.20, notes: [123.47, 146.83, 164.81, 220] },    // E7sus4
    { bass: 55.0,  notes: [110, 130.81, 164.81, 220] },       // Am (home)
];

let ci = 0;
let bassOsc: OscillatorNode | null = null;
let bassOsc2: OscillatorNode | null = null;
let padOscs: OscillatorNode[] = [];

function track(...n: AudioNode[]) { S.nodes.push(...n); }

// ═══════════════════════════════════════════════════════════════════════
//  LAYER 1 — Organ Pump (the heartbeat of the Interstellar theme)
//  A rhythmic organ that swells in and out — the iconic "pumping" feel
// ═══════════════════════════════════════════════════════════════════════
function organPump(ctx: AudioContext, dest: AudioNode) {
    const bus = ctx.createGain();
    bus.gain.value = 0.18;
    bus.connect(dest);
    track(bus);

    // The "pump" LFO — rhythmic volume swell at ~0.5Hz (one pump ≈ 2 seconds)
    // This is what gives the Interstellar organ its breathing, pulsing feel
    const pumpLfo = ctx.createOscillator();
    pumpLfo.type = 'sine';
    pumpLfo.frequency.value = 0.5; // one full swell cycle every 2 seconds
    const pumpDepth = ctx.createGain();
    pumpDepth.gain.value = 0.08;
    pumpLfo.connect(pumpDepth);
    pumpDepth.connect(bus.gain);
    pumpLfo.start();
    track(pumpLfo, pumpDepth);

    // Bass note — deep organ pedal
    bassOsc = ctx.createOscillator();
    bassOsc.type = 'sine';
    bassOsc.frequency.value = 55.0;
    const bassG = ctx.createGain();
    bassG.gain.value = 0.5;
    const bassF = ctx.createBiquadFilter();
    bassF.type = 'lowpass'; bassF.frequency.value = 150; bassF.Q.value = 0.7;
    bassOsc.connect(bassF); bassF.connect(bassG); bassG.connect(bus);
    bassOsc.start();
    track(bassOsc, bassG, bassF);

    // Detuned bass double (organ "width")
    bassOsc2 = ctx.createOscillator();
    bassOsc2.type = 'sine';
    bassOsc2.frequency.value = 55.0;
    bassOsc2.detune.value = 4;
    const b2g = ctx.createGain();
    b2g.gain.value = 0.3;
    const b2f = ctx.createBiquadFilter();
    b2f.type = 'lowpass'; b2f.frequency.value = 130;
    bassOsc2.connect(b2f); b2f.connect(b2g); b2g.connect(bus);
    bassOsc2.start();
    track(bassOsc2, b2g, b2f);

    // Organ harmonics on A (2nd, 3rd, 4th, 6th, 8th partials)
    // This builds the rich church organ pipe timbre
    const harmonics = [
        { mult: 2, vol: 0.25, lpf: 400 },   // octave
        { mult: 3, vol: 0.12, lpf: 500 },   // twelfth
        { mult: 4, vol: 0.08, lpf: 600 },   // 2 octaves
        { mult: 6, vol: 0.04, lpf: 800 },   // 2 oct + fifth
        { mult: 8, vol: 0.02, lpf: 1000 },  // 3 octaves
    ];
    harmonics.forEach(({ mult, vol, lpf }) => {
        const o = ctx.createOscillator();
        o.type = 'sine';
        o.frequency.value = 55.0 * mult;
        o.detune.value = (mult % 3) * 2; // subtle beating between harmonics
        const g = ctx.createGain(); g.gain.value = vol;
        const f = ctx.createBiquadFilter();
        f.type = 'lowpass'; f.frequency.value = lpf; f.Q.value = 0.5;
        o.connect(f); f.connect(g); g.connect(bus);
        o.start();
        track(o, g, f);
    });
}

// ═══════════════════════════════════════════════════════════════════════
//  LAYER 2 — Chord Pad (evolving organ voicing with the progression)
// ═══════════════════════════════════════════════════════════════════════
function chordPad(ctx: AudioContext, dest: AudioNode) {
    const bus = ctx.createGain();
    bus.gain.value = 0.12;
    bus.connect(dest);
    track(bus);

    padOscs = [];
    const chord = PROG[0];

    // Create 4-note organ chord voicing
    chord.notes.forEach((freq, i) => {
        // Main pipe
        const o1 = ctx.createOscillator();
        o1.type = 'sine'; o1.frequency.value = freq;
        o1.detune.value = (i - 2) * 4;
        const g1 = ctx.createGain();
        g1.gain.value = 0.15 - i * 0.02;
        const f1 = ctx.createBiquadFilter();
        f1.type = 'lowpass'; f1.frequency.value = 800 + i * 100; f1.Q.value = 0.5;
        o1.connect(f1); f1.connect(g1); g1.connect(bus);
        o1.start();
        padOscs.push(o1);
        track(o1, g1, f1);

        // Detuned chorus double — wider stereo organ feel
        const o2 = ctx.createOscillator();
        o2.type = 'sine'; o2.frequency.value = freq;
        o2.detune.value = (i - 2) * 4 + 8;
        const g2 = ctx.createGain();
        g2.gain.value = 0.06 - i * 0.01;
        o2.connect(g2); g2.connect(bus);
        o2.start();
        padOscs.push(o2);
        track(o2, g2);
    });

    // Evolve through the progression — 12 seconds per chord (extended feel)
    ci = 0;
    const chordLoop = setInterval(() => {
        if (!S.isPlaying || !S.ctx) return;
        ci = (ci + 1) % PROG.length;
        const nc = PROG[ci];
        const now = ctx.currentTime;
        const glide = 4; // 4-second glide between chords

        // Glide bass notes
        if (bassOsc) bassOsc.frequency.linearRampToValueAtTime(nc.bass, now + glide);
        if (bassOsc2) bassOsc2.frequency.linearRampToValueAtTime(nc.bass, now + glide + 0.5);

        // Glide pad voices
        let idx = 0;
        nc.notes.forEach((freq) => {
            if (padOscs[idx]) padOscs[idx].frequency.linearRampToValueAtTime(freq, now + glide);
            idx++;
            if (padOscs[idx]) padOscs[idx].frequency.linearRampToValueAtTime(freq, now + glide + 0.3);
            idx++;
        });
    }, 12000);
    S.intervals.push(chordLoop);
}

// ═══════════════════════════════════════════════════════════════════════
//  LAYER 3 — The Tick (Interstellar's iconic 1-per-second clock)
//  Each tick represents one day on Earth. Precise. Relentless. Soft.
// ═══════════════════════════════════════════════════════════════════════
function theTick(ctx: AudioContext, dest: AudioNode) {
    const tickBus = ctx.createGain();
    tickBus.gain.value = 0.3;
    tickBus.connect(dest);
    track(tickBus);

    function tick() {
        if (!S.isPlaying || !S.ctx) return;
        try {
            const now = ctx.currentTime;

            // The tick is a short filtered noise burst — like a distant clock
            const len = Math.floor(ctx.sampleRate * 0.012);
            const buf = ctx.createBuffer(1, len, ctx.sampleRate);
            const d = buf.getChannelData(0);
            for (let i = 0; i < len; i++) {
                // Sharp transient that decays exponentially
                d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 6);
            }
            const src = ctx.createBufferSource();
            src.buffer = buf;

            const env = ctx.createGain();
            env.gain.setValueAtTime(0.08, now);
            env.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

            // High-pass + bandpass to make it "tick" not "thud"
            const hp = ctx.createBiquadFilter();
            hp.type = 'highpass'; hp.frequency.value = 2500;
            const bp = ctx.createBiquadFilter();
            bp.type = 'bandpass'; bp.frequency.value = 4500; bp.Q.value = 3;

            src.connect(hp); hp.connect(bp); bp.connect(env); env.connect(tickBus);
            src.start(now); src.stop(now + 0.08);
        } catch { /* skip */ }
    }

    // Exactly 1 tick per second — matching the film
    const tickLoop = setInterval(tick, 1000);
    S.intervals.push(tickLoop);
    // Let organ establish for 4 seconds before first tick
    S.timers.push(setTimeout(tick, 4000));
}

// ═══════════════════════════════════════════════════════════════════════
//  LAYER 4 — Strings (distant violins building like Cornfield Chase)
//  Sustained Am triad with vibrato + slowly emerging solo melody
// ═══════════════════════════════════════════════════════════════════════
function strings(ctx: AudioContext, dest: AudioNode) {
    const strBus = ctx.createGain();
    strBus.gain.value = 0.016;
    strBus.connect(dest);
    track(strBus);

    // Sustained string pad — Am triad: A4, C5, E5
    const strPad = [440, 523.25, 659.25];
    strPad.forEach((freq, i) => {
        const o = ctx.createOscillator();
        o.type = 'sine'; o.frequency.value = freq;
        o.detune.value = i * 2;
        const g = ctx.createGain();
        g.gain.value = 0.6 - i * 0.1;

        // Vibrato — realistic bowed string ~5Hz
        const vib = ctx.createOscillator();
        vib.type = 'sine'; vib.frequency.value = 4.8 + i * 0.2;
        const vibG = ctx.createGain();
        vibG.gain.value = 1.5;
        vib.connect(vibG); vibG.connect(o.frequency); vib.start();

        const f = ctx.createBiquadFilter();
        f.type = 'lowpass'; f.frequency.value = 1800 + i * 200; f.Q.value = 0.4;
        o.connect(f); f.connect(g); g.connect(strBus);
        o.start();
        track(o, g, vib, vibG, f);
    });

    // "Cornfield Chase" solo string melody — notes from A natural minor
    // Each phrase is [freq, dur_seconds, attack_seconds]
    const phrases = [
        // Phrase 1: E5 holds, falls to C5, resolves to A4
        [[659.25, 4, 1.5], [523.25, 3.5, 1.2], [440, 5, 1.8]],
        // Phrase 2: A5 reaches up, D5 steps down, C5 settles
        [[880, 3.5, 1.5], [587.33, 3, 1], [523.25, 4.5, 1.5]],
        // Phrase 3: E5 and B4 — just two notes, breathing space
        [[659.25, 5, 2], [493.88, 4, 1.5]],
        // Phrase 4: G5 sweeps, E5, D5, resolves C5
        [[783.99, 3, 1.2], [659.25, 2.5, 1], [587.33, 3, 1.2], [523.25, 5, 2]],
        // Phrase 5: High A5 alone — like a held breath
        [[880, 6, 2.5]],
        // Phrase 6: E5 → A4 — the theme's resting point
        [[659.25, 4, 1.5], [440, 6, 2]],
    ];
    let pi = 0;

    function playPhrase() {
        if (!S.isPlaying || !S.ctx) return;
        const phrase = phrases[pi % phrases.length];
        pi++;
        let offset = 0;

        phrase.forEach(([freq, dur, atk]) => {
            const t = setTimeout(() => {
                if (!S.isPlaying || !S.ctx) return;
                try {
                    const now = ctx.currentTime;
                    const o = ctx.createOscillator();
                    o.type = 'sine'; o.frequency.value = freq;

                    // Vibrato
                    const v = ctx.createOscillator();
                    v.type = 'sine'; v.frequency.value = 5.2;
                    const vg = ctx.createGain(); vg.gain.value = 2;
                    v.connect(vg); vg.connect(o.frequency); v.start();

                    // Bowed string envelope: slow attack, sustain, gentle release
                    const g = ctx.createGain();
                    g.gain.setValueAtTime(0, now);
                    g.gain.linearRampToValueAtTime(0.06, now + atk);
                    g.gain.setValueAtTime(0.06, now + atk + 0.5);
                    g.gain.exponentialRampToValueAtTime(0.001, now + dur);

                    // Warm filter that slowly closes
                    const f = ctx.createBiquadFilter();
                    f.type = 'lowpass'; f.frequency.value = 2800;
                    f.frequency.linearRampToValueAtTime(900, now + dur * 0.8);

                    o.connect(f); f.connect(g); g.connect(strBus);
                    o.start(now); o.stop(now + dur + 0.5);
                    v.stop(now + dur + 0.5);
                } catch { /* skip */ }
            }, offset * 1000);
            S.timers.push(t);
            offset += dur * 0.7; // notes slightly overlap → legato
        });
    }

    // First phrase after 6 seconds, then every 14 seconds (like the extended version)
    S.timers.push(setTimeout(playPhrase, 6000));
    const phraseLoop = setInterval(() => {
        if (!S.isPlaying) return;
        playPhrase();
    }, 14000);
    S.intervals.push(phraseLoop);
}

// ═══════════════════════════════════════════════════════════════════════
//  LAYER 5 — Space Dust (cosmic noise wash — the vastness of space)
// ═══════════════════════════════════════════════════════════════════════
function spaceDust(ctx: AudioContext, dest: AudioNode) {
    const len = ctx.sampleRate * 5;
    const buf = ctx.createBuffer(2, len, ctx.sampleRate);
    // Brownian noise — smooth like distant solar wind
    for (let ch = 0; ch < 2; ch++) {
        const d = buf.getChannelData(ch);
        let last = 0;
        for (let i = 0; i < len; i++) {
            last = (last + 0.02 * (Math.random() * 2 - 1)) / 1.02;
            d[i] = last * 3.5;
        }
    }
    const src = ctx.createBufferSource(); src.buffer = buf; src.loop = true;
    const bp = ctx.createBiquadFilter();
    bp.type = 'bandpass'; bp.frequency.value = 200; bp.Q.value = 0.3;

    // Slow LFO — the noise breathes like cosmic wind
    const lfo = ctx.createOscillator();
    lfo.type = 'sine'; lfo.frequency.value = 0.035;
    const lg = ctx.createGain(); lg.gain.value = 100;
    lfo.connect(lg); lg.connect(bp.frequency); lfo.start();

    const g = ctx.createGain(); g.gain.value = 0.03;
    src.connect(bp); bp.connect(g); g.connect(dest); src.start();
    track(src, bp, lfo, lg, g);
}

// ═══════════════════════════════════════════════════════════════════════
//  LAYER 6 — High Organ Pipes (upper register shimmer)
//  The bright upper stops that give the Interstellar organ its grandeur
// ═══════════════════════════════════════════════════════════════════════
function organHighs(ctx: AudioContext, dest: AudioNode) {
    const bus = ctx.createGain();
    bus.gain.value = 0.007;
    bus.connect(dest);
    track(bus);

    // High pipes: C5, E5, G5, A5 — bright organ stops
    const pipes = [523.25, 659.25, 783.99, 880];
    pipes.forEach((freq, i) => {
        const o = ctx.createOscillator();
        o.type = 'sine'; o.frequency.value = freq;
        o.detune.value = (i - 1) * 3;
        const g = ctx.createGain();
        g.gain.value = 0.4 - i * 0.06;
        const f = ctx.createBiquadFilter();
        f.type = 'lowpass'; f.frequency.value = 2200; f.Q.value = 0.4;
        o.connect(f); f.connect(g); g.connect(bus);
        o.start();
        track(o, g, f);

        // Detuned pair for chorus width
        const o2 = ctx.createOscillator();
        o2.type = 'sine'; o2.frequency.value = freq;
        o2.detune.value = (i - 1) * 3 + 7;
        const g2 = ctx.createGain();
        g2.gain.value = 0.15 - i * 0.02;
        o2.connect(g2); g2.connect(bus);
        o2.start();
        track(o2, g2);
    });

    // Ultra-slow swell — the upper stops breathe independently
    const lfo = ctx.createOscillator();
    lfo.type = 'sine'; lfo.frequency.value = 0.025;
    const lg = ctx.createGain(); lg.gain.value = 0.003;
    lfo.connect(lg); lg.connect(bus.gain); lfo.start();
    track(lfo, lg);
}

// ═══════════════════════════════════════════════════════════════════════
//  START / STOP
// ═══════════════════════════════════════════════════════════════════════
function startAmbient() {
    if (S.isPlaying) return;
    try {
        const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
        S.ctx = ctx; ci = 0;

        const master = ctx.createGain();
        master.gain.setValueAtTime(0, ctx.currentTime);
        master.gain.linearRampToValueAtTime(VOL, ctx.currentTime + FADE_IN);
        master.connect(ctx.destination);
        S.master = master;

        // Build 6-layer Interstellar soundscape
        organPump(ctx, master);   // 1. Rhythmic organ pump (the heartbeat)
        chordPad(ctx, master);    // 2. Evolving chord voicing
        theTick(ctx, master);     // 3. 1-per-second clock tick
        strings(ctx, master);     // 4. Emotional violins + melody
        spaceDust(ctx, master);   // 5. Cosmic noise wash
        organHighs(ctx, master);  // 6. High organ shimmer

        S.isPlaying = true;
    } catch { /* Web Audio unavailable */ }
}

function stopAmbient() {
    if (!S.isPlaying || !S.ctx || !S.master) return;
    try {
        const ctx = S.ctx;
        const m = S.master;
        const now = ctx.currentTime;

        // Cinematic fade out
        m.gain.cancelScheduledValues(now);
        m.gain.setValueAtTime(m.gain.value, now);
        m.gain.linearRampToValueAtTime(0, now + FADE_OUT);

        // Clear all timers
        S.intervals.forEach((id) => clearInterval(id));
        S.timers.forEach((id) => clearTimeout(id));
        S.intervals = [];
        S.timers = [];

        // Stop all nodes after fade
        const allNodes = [...S.nodes];
        setTimeout(() => {
            allNodes.forEach((n) => {
                try { if ('stop' in n && typeof (n as any).stop === 'function') (n as any).stop(); } catch { }
            });
            try { ctx.close(); } catch { }
        }, FADE_OUT * 1000 + 300);

        S.nodes = []; padOscs = [];
        bassOsc = null; bassOsc2 = null;
        S.ctx = null; S.master = null; S.isPlaying = false;
    } catch { /* cleanup error */ }
}

export function playHover() { }
export function playTransition() { }

export default function SoundManager() {
    const { soundEnabled } = useExperience();
    const prev = useRef(false);

    useEffect(() => {
        if (soundEnabled && !prev.current) startAmbient();
        else if (!soundEnabled && prev.current) stopAmbient();
        prev.current = soundEnabled;
        return () => { if (S.isPlaying) stopAmbient(); };
    }, [soundEnabled]);

    return null;
}
