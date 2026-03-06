'use client';

import { useEffect, useRef, useCallback } from 'react';
import { useExperience } from '@/components/ExperienceContext';

// Dynamically loaded Howler to avoid SSR issues
let Howl: any = null;

interface SoundInstances {
    hover: any;
    transition: any;
}

const sounds: SoundInstances = { hover: null, transition: null };

async function loadHowler() {
    if (Howl) return;
    try {
        const mod = await import('howler');
        Howl = mod.Howl;
    } catch {
        // Howler unavailable - silently skip
    }
}

/**
 * Initializes sound instances using Howler.js.
 * Uses Web Audio oscillators as ultra-lightweight synthetic sounds.
 * No external audio files needed.
 */
function createSyntheticTick() {
    try {
        const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.frequency.value = 880;
        gain.gain.setValueAtTime(0.04, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.08);
    } catch {
        // AudioContext not available
    }
}

function createSyntheticWhoosh() {
    try {
        const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
        const bufferSize = ctx.sampleRate * 0.25;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / bufferSize, 2);
        }
        const source = ctx.createBufferSource();
        source.buffer = buffer;
        const filter = ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.value = 800;
        filter.Q.value = 0.5;
        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.06, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
        source.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);
        source.start();
    } catch {
        // AudioContext not available
    }
}

export function playHover() {
    try { createSyntheticTick(); } catch { }
}

export function playTransition() {
    try { createSyntheticWhoosh(); } catch { }
}

/**
 * SoundManager component - mounts invisibly, exposes sound functions via module exports.
 * Reads soundEnabled from ExperienceContext. Only active when sound is ON.
 */
export default function SoundManager() {
    const { soundEnabled } = useExperience();
    const enabledRef = useRef(soundEnabled);

    useEffect(() => {
        enabledRef.current = soundEnabled;
    }, [soundEnabled]);

    // Attach global hover sound listeners
    useEffect(() => {
        if (!soundEnabled) return;

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (
                target.tagName === 'BUTTON' ||
                target.tagName === 'A' ||
                target.closest('button') ||
                target.closest('a')
            ) {
                playHover();
            }
        };

        document.addEventListener('mouseover', handleMouseOver);
        return () => document.removeEventListener('mouseover', handleMouseOver);
    }, [soundEnabled]);

    return null; // Invisible component
}
