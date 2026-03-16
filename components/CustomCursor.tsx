'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

// ═══════════════════════════════════════════════════════════════════════
//  Professional Magnetic Cursor
//  - Sleek crosshair dot that sticks to mouse instantly
//  - Smooth trailing ring with magnetic spring physics
//  - Gradient tail trail that fades behind the cursor
//  - Morphs into contextual shapes on interactive elements
//  - 100% GPU-accelerated (translate3d + scale only)
// ═══════════════════════════════════════════════════════════════════════

const TRAIL_LENGTH = 12;

export default function CustomCursor() {
    const dotRef = useRef<HTMLDivElement>(null);
    const ringRef = useRef<HTMLDivElement>(null);
    const labelRef = useRef<HTMLDivElement>(null);
    const trailRefs = useRef<(HTMLDivElement | null)[]>([]);
    const mousePos = useRef({ x: -100, y: -100 });
    const ringPos = useRef({ x: -100, y: -100 });
    const velocity = useRef({ x: 0, y: 0 });
    const trail = useRef<{ x: number; y: number }[]>(
        Array.from({ length: TRAIL_LENGTH }, () => ({ x: -100, y: -100 }))
    );
    const rafId = useRef(0);
    const [isMobile, setIsMobile] = useState(true);
    const cursorStateRef = useRef<'default' | 'project' | 'wave'>('default');
    const [cursorState, setCursorState] = useState<'default' | 'project' | 'wave'>('default');
    const isMoving = useRef(false);
    const moveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleMouseMove = useCallback((e: MouseEvent) => {
        mousePos.current = { x: e.clientX, y: e.clientY };
        isMoving.current = true;
        if (moveTimer.current) clearTimeout(moveTimer.current);
        moveTimer.current = setTimeout(() => { isMoving.current = false; }, 100);
    }, []);

    const updateCursorState = useCallback((state: 'default' | 'project' | 'wave') => {
        if (cursorStateRef.current !== state) {
            cursorStateRef.current = state;
            setCursorState(state);
        }
    }, []);

    const handleMouseOver = useCallback((e: MouseEvent) => {
        const target = e.target as HTMLElement;
        const el = target.closest('a, button, [data-cursor]') as HTMLElement | null;
        if (!el) {
            updateCursorState('default');
            return;
        }
        const dataCursor = el.getAttribute('data-cursor');
        if (dataCursor === 'project') updateCursorState('project');
        else if (dataCursor === 'wave') updateCursorState('wave');
        else updateCursorState('default');
    }, [updateCursorState]);

    const handleMouseOut = useCallback((e: MouseEvent) => {
        const related = e.relatedTarget as HTMLElement | null;
        if (!related || !related.closest('a, button, [data-cursor]')) {
            updateCursorState('default');
        }
    }, [updateCursorState]);

    useEffect(() => {
        if (isMobile) return;

        // Spring physics constants
        const stiffness = 0.08;
        const damping = 0.72;

        const animate = () => {
            const mx = mousePos.current.x;
            const my = mousePos.current.y;

            // Spring physics for ring (bouncy, organic feel)
            const dx = mx - ringPos.current.x;
            const dy = my - ringPos.current.y;
            velocity.current.x += dx * stiffness;
            velocity.current.y += dy * stiffness;
            velocity.current.x *= damping;
            velocity.current.y *= damping;
            ringPos.current.x += velocity.current.x;
            ringPos.current.y += velocity.current.y;

            // Update trail positions (each follows the previous with delay)
            for (let i = TRAIL_LENGTH - 1; i > 0; i--) {
                trail.current[i].x += (trail.current[i - 1].x - trail.current[i].x) * 0.35;
                trail.current[i].y += (trail.current[i - 1].y - trail.current[i].y) * 0.35;
            }
            trail.current[0].x += (mx - trail.current[0].x) * 0.5;
            trail.current[0].y += (my - trail.current[0].y) * 0.5;

            // Dot — instant, sticks to cursor
            if (dotRef.current) {
                dotRef.current.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`;
            }

            // Ring — spring-based trailing
            if (ringRef.current) {
                const state = cursorStateRef.current;
                const scale =
                    state === 'project' ? 2.4
                    : state === 'wave' ? 1.8
                    : 1;
                ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%) scale(${scale})`;
            }

            // Label
            if (labelRef.current) {
                labelRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%)`;
            }

            // Trail particles
            for (let i = 0; i < TRAIL_LENGTH; i++) {
                const el = trailRefs.current[i];
                if (el) {
                    const t = trail.current[i];
                    const progress = i / TRAIL_LENGTH;
                    const s = 1 - progress * 0.85;
                    const o = isMoving.current ? (1 - progress) * 0.4 : 0;
                    el.style.transform = `translate3d(${t.x}px, ${t.y}px, 0) translate(-50%, -50%) scale(${s})`;
                    el.style.opacity = `${o}`;
                }
            }

            rafId.current = requestAnimationFrame(animate);
        };

        document.addEventListener('mousemove', handleMouseMove, { passive: true });
        document.addEventListener('mouseover', handleMouseOver, { passive: true });
        document.addEventListener('mouseout', handleMouseOut, { passive: true });
        rafId.current = requestAnimationFrame(animate);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseover', handleMouseOver);
            document.removeEventListener('mouseout', handleMouseOut);
            cancelAnimationFrame(rafId.current);
            if (moveTimer.current) clearTimeout(moveTimer.current);
        };
    }, [isMobile, handleMouseMove, handleMouseOver, handleMouseOut]);

    if (isMobile) return null;

    const isHovering = cursorState === 'project' || cursorState === 'wave';

    return (
        <>
            {/* Trail particles */}
            {Array.from({ length: TRAIL_LENGTH }).map((_, i) => (
                <div
                    key={i}
                    ref={el => { trailRefs.current[i] = el; }}
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: 4,
                        height: 4,
                        borderRadius: '50%',
                        background: `rgba(0, 240, 255, ${0.6 - (i / TRAIL_LENGTH) * 0.5})`,
                        pointerEvents: 'none',
                        zIndex: 9996,
                        willChange: 'transform, opacity',
                        opacity: 0,
                    }}
                />
            ))}

            {/* Core dot — crosshair style */}
            <div
                ref={dotRef}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: 8,
                    height: 8,
                    pointerEvents: 'none',
                    zIndex: 9999,
                    willChange: 'transform',
                    opacity: isHovering ? 0 : 1,
                    transition: 'opacity 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
            >
                {/* Center point */}
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    width: 4,
                    height: 4,
                    borderRadius: '50%',
                    background: '#00F0FF',
                    transform: 'translate(-50%, -50%)',
                    boxShadow: '0 0 8px 2px rgba(0, 240, 255, 0.6), 0 0 20px 4px rgba(0, 240, 255, 0.2)',
                }} />
                {/* Crosshair lines */}
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    width: 14,
                    height: 1,
                    background: 'linear-gradient(90deg, transparent 0%, rgba(0,240,255,0.5) 30%, transparent 45%, transparent 55%, rgba(0,240,255,0.5) 70%, transparent 100%)',
                    transform: 'translate(-50%, -50%)',
                }} />
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    width: 1,
                    height: 14,
                    background: 'linear-gradient(180deg, transparent 0%, rgba(0,240,255,0.5) 30%, transparent 45%, transparent 55%, rgba(0,240,255,0.5) 70%, transparent 100%)',
                    transform: 'translate(-50%, -50%)',
                }} />
            </div>

            {/* Outer ring — spring-animated, morphing */}
            <div
                ref={ringRef}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: 32,
                    height: 32,
                    borderRadius: isHovering ? '10px' : '50%',
                    border: `1px solid rgba(0, 240, 255, ${isHovering ? 0.7 : 0.3})`,
                    background: isHovering
                        ? 'radial-gradient(circle, rgba(0,240,255,0.08) 0%, transparent 70%)'
                        : 'transparent',
                    pointerEvents: 'none',
                    zIndex: 9998,
                    willChange: 'transform',
                    transition: 'border-radius 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), border-color 0.3s ease, background 0.3s ease, box-shadow 0.3s ease',
                    boxShadow: isHovering
                        ? '0 0 20px 3px rgba(0, 240, 255, 0.12), inset 0 0 12px rgba(0, 240, 255, 0.06)'
                        : 'none',
                    backdropFilter: isHovering ? 'blur(1px)' : 'none',
                }}
            />

            {/* Floating label for project / wave */}
            {(cursorState === 'project' || cursorState === 'wave') && (
                <div
                    ref={labelRef}
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        pointerEvents: 'none',
                        zIndex: 10000,
                        willChange: 'transform',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    {cursorState === 'project' && (
                        <span style={{
                            fontSize: 10,
                            color: '#00F0FF',
                            fontWeight: 600,
                            whiteSpace: 'nowrap',
                            letterSpacing: '0.12em',
                            textTransform: 'uppercase',
                            textShadow: '0 0 8px rgba(0, 240, 255, 0.4)',
                        }}>
                            View
                        </span>
                    )}
                    {cursorState === 'wave' && (
                        <span style={{ fontSize: 16 }}>👋</span>
                    )}
                </div>
            )}
        </>
    );
}
