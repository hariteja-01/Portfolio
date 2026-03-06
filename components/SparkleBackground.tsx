'use client';

import { useEffect, useRef, useCallback } from 'react';
import { useDeviceCapability, getParticleCount, getShadowBlur } from '@/lib/deviceCapability';

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    opacity: number;
    color: string;
    life: number;
    maxLife: number;
    hueShift: number;
}

const COLORS = [
    '#00F0FF', // cyan
    '#8B5CF6', // violet
    '#FF6B35', // orange
    '#FFB74D', // gold
    '#4ADE80', // green
    '#F472B6', // pink
];

export default function SparkleBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particles = useRef<Particle[]>([]);
    const mouseRef = useRef({ x: -1000, y: -1000 });
    const rafRef = useRef(0);
    const timeRef = useRef(0);

    // Device-based scaling
    const { tier } = useDeviceCapability();
    const maxParticles = getParticleCount(tier);

    const createParticle = useCallback(
        (
            w: number,
            h: number,
            opts?: { x?: number; y?: number; burst?: boolean }
        ): Particle => {
            const isBurst = opts?.burst || false;
            return {
                x: opts?.x ?? Math.random() * w,
                y: opts?.y ?? Math.random() * h,
                vx: (Math.random() - 0.5) * (isBurst ? 2 : 0.3),
                vy: (Math.random() - 0.5) * (isBurst ? 2 : 0.3) - (isBurst ? 0 : 0.15),
                size: Math.random() * (isBurst ? 3 : 2) + 0.5,
                opacity: 0,
                color: COLORS[Math.floor(Math.random() * COLORS.length)],
                life: 0,
                maxLife: Math.random() * 200 + (isBurst ? 60 : 120),
                hueShift: Math.random() * 360,
            };
        },
        []
    );

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        // Use OffscreenCanvas if supported for better GPU performance
        let ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D | null = null;
        let offscreen: OffscreenCanvas | null = null;

        // Try OffscreenCanvas for non-low tier
        const useOffscreen =
            tier !== 'low' &&
            typeof OffscreenCanvas !== 'undefined' &&
            canvas.transferControlToOffscreen !== undefined;

        if (useOffscreen) {
            try {
                offscreen = new OffscreenCanvas(canvas.width, canvas.height);
                ctx = offscreen.getContext('2d');
            } catch {
                ctx = canvas.getContext('2d');
            }
        }

        if (!ctx) {
            ctx = canvas.getContext('2d');
        }
        if (!ctx) return;

        const finalCtx = ctx as CanvasRenderingContext2D;

        const resize = () => {
            const dpr = Math.min(window.devicePixelRatio || 1, tier === 'low' ? 1 : 2);
            canvas.width = window.innerWidth * dpr;
            canvas.height = window.innerHeight * dpr;
            canvas.style.width = `${window.innerWidth}px`;
            canvas.style.height = `${window.innerHeight}px`;
            finalCtx.scale(dpr, dpr);
        };
        resize();
        window.addEventListener('resize', resize);

        const w = () => window.innerWidth;
        const h = () => window.innerHeight;

        // Initialize particles with device-scaled count
        const count = Math.min(maxParticles, Math.floor((w() * h()) / 18000));
        particles.current = Array.from({ length: count }, () =>
            createParticle(w(), h())
        );
        particles.current.forEach((p) => {
            p.life = Math.random() * p.maxLife;
        });

        const handleMouseMove = (e: MouseEvent) => {
            mouseRef.current = { x: e.clientX, y: e.clientY };
        };
        window.addEventListener('mousemove', handleMouseMove, { passive: true });

        // Burst spawn frequency scaled by tier
        const burstFreq = tier === 'low' ? 16 : tier === 'mid' ? 10 : 8;

        const animate = () => {
            timeRef.current++;
            finalCtx.clearRect(0, 0, w(), h());

            const mx = mouseRef.current.x;
            const my = mouseRef.current.y;

            for (let i = particles.current.length - 1; i >= 0; i--) {
                const p = particles.current[i];
                p.life++;

                // Fade in/out
                if (p.life < 30) {
                    p.opacity = (p.life / 30) * 0.8;
                } else if (p.life > p.maxLife - 30) {
                    p.opacity = ((p.maxLife - p.life) / 30) * 0.8;
                } else {
                    p.opacity = 0.3 + Math.sin(p.life * 0.05 + p.hueShift) * 0.4;
                }

                // Mouse interaction - gentle attraction (skip on low tier)
                if (tier !== 'low') {
                    const dx = mx - p.x;
                    const dy = my - p.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 200 && dist > 10) {
                        const force = 0.02 * (1 - dist / 200);
                        p.vx += (dx / dist) * force;
                        p.vy += (dy / dist) * force;
                    }
                }

                // Damping
                p.vx *= 0.995;
                p.vy *= 0.995;
                p.x += p.vx;
                p.y += p.vy;

                // Recycle
                if (
                    p.life >= p.maxLife ||
                    p.x < -20 || p.x > w() + 20 ||
                    p.y < -20 || p.y > h() + 20
                ) {
                    particles.current[i] = createParticle(w(), h());
                    continue;
                }

                // Draw sparkle
                finalCtx.save();
                finalCtx.globalAlpha = Math.max(0, p.opacity);
                finalCtx.shadowColor = p.color;
                finalCtx.shadowBlur = getShadowBlur(tier, p.size);
                finalCtx.fillStyle = p.color;

                // 4-point star
                finalCtx.beginPath();
                const s = p.size;
                finalCtx.moveTo(p.x, p.y - s * 1.5);
                finalCtx.lineTo(p.x + s * 0.4, p.y);
                finalCtx.lineTo(p.x, p.y + s * 1.5);
                finalCtx.lineTo(p.x - s * 0.4, p.y);
                finalCtx.closePath();
                finalCtx.fill();

                // Cross sparkle (skip on low for perf)
                if (tier !== 'low') {
                    finalCtx.beginPath();
                    finalCtx.moveTo(p.x - s * 1.2, p.y);
                    finalCtx.lineTo(p.x, p.y + s * 0.3);
                    finalCtx.lineTo(p.x + s * 1.2, p.y);
                    finalCtx.lineTo(p.x, p.y - s * 0.3);
                    finalCtx.closePath();
                    finalCtx.fill();
                }

                finalCtx.restore();
            }

            // Spawn extra sparkles near mouse - throttled by device tier
            if (timeRef.current % burstFreq === 0 && mx > 0 && my > 0) {
                particles.current.push(
                    createParticle(w(), h(), {
                        x: mx + (Math.random() - 0.5) * 60,
                        y: my + (Math.random() - 0.5) * 60,
                        burst: true,
                    })
                );
            }

            // Keep particle count bounded
            if (particles.current.length > count + 20) {
                particles.current.splice(0, particles.current.length - count);
            }

            rafRef.current = requestAnimationFrame(animate);
        };

        rafRef.current = requestAnimationFrame(animate);

        return () => {
            cancelAnimationFrame(rafRef.current);
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, [createParticle, maxParticles, tier]);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-0 sparkle-canvas"
            aria-hidden="true"
        />
    );
}
