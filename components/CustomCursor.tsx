'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

export default function CustomCursor() {
    const dotRef = useRef<HTMLDivElement>(null);
    const ringRef = useRef<HTMLDivElement>(null);
    const glowRef = useRef<HTMLDivElement>(null);
    const mousePos = useRef({ x: -100, y: -100 });
    const ringPos = useRef({ x: -100, y: -100 });
    const rafId = useRef(0);
    const [isMobile, setIsMobile] = useState(true);
    const [cursorState, setCursorState] = useState<'default' | 'pointer' | 'project' | 'wave'>('default');

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
    }, []);

    const handleMouseOver = useCallback((e: MouseEvent) => {
        const target = e.target as HTMLElement;
        const el = target.closest('a, button, [data-cursor]') as HTMLElement | null;
        if (!el) {
            setCursorState('default');
            return;
        }
        const dataCursor = el.getAttribute('data-cursor');
        if (dataCursor === 'project') {
            setCursorState('project');
        } else if (dataCursor === 'wave') {
            setCursorState('wave');
        } else {
            setCursorState('pointer');
        }
    }, []);

    const handleMouseOut = useCallback((e: MouseEvent) => {
        const related = e.relatedTarget as HTMLElement | null;
        if (!related || !related.closest('a, button, [data-cursor]')) {
            setCursorState('default');
        }
    }, []);

    useEffect(() => {
        if (isMobile) return;

        const lerpFactor = 0.12;

        const animate = () => {
            ringPos.current.x += (mousePos.current.x - ringPos.current.x) * lerpFactor;
            ringPos.current.y += (mousePos.current.y - ringPos.current.y) * lerpFactor;

            if (dotRef.current) {
                dotRef.current.style.transform = `translate(${mousePos.current.x}px, ${mousePos.current.y}px) translate(-50%, -50%)`;
            }
            if (ringRef.current) {
                ringRef.current.style.transform = `translate(${ringPos.current.x}px, ${ringPos.current.y}px) translate(-50%, -50%)`;
            }
            if (glowRef.current) {
                glowRef.current.style.background = `radial-gradient(circle at ${mousePos.current.x}px ${mousePos.current.y}px, var(--cursor-glow) 0%, transparent 70%)`;
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
        };
    }, [isMobile, handleMouseMove, handleMouseOver, handleMouseOut]);

    if (isMobile) return null;

    const getDotSize = () => {
        if (cursorState === 'pointer' || cursorState === 'project' || cursorState === 'wave') return 0;
        return 8;
    };

    const getRingSize = () => {
        if (cursorState === 'project') return 80;
        if (cursorState === 'wave') return 60;
        if (cursorState === 'pointer') return 50;
        return 36;
    };

    const dotSize = getDotSize();
    const ringSize = getRingSize();

    return (
        <>
            {/* Glow */}
            <div
                ref={glowRef}
                style={{
                    position: 'fixed',
                    inset: 0,
                    pointerEvents: 'none',
                    zIndex: 9990,
                    opacity: 0.4,
                }}
            />
            {/* Inner dot */}
            <div
                ref={dotRef}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: dotSize,
                    height: dotSize,
                    borderRadius: '50%',
                    background: '#00F0FF',
                    mixBlendMode: 'difference',
                    pointerEvents: 'none',
                    zIndex: 9999,
                    transition: 'width 0.2s ease, height 0.2s ease',
                }}
            />
            {/* Outer ring */}
            <div
                ref={ringRef}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: ringSize,
                    height: ringSize,
                    borderRadius: '50%',
                    border:
                        cursorState === 'pointer'
                            ? '1.5px solid rgba(0,240,255,0.8)'
                            : '1.5px solid rgba(0,240,255,0.5)',
                    background:
                        cursorState === 'pointer'
                            ? 'rgba(0,240,255,0.08)'
                            : cursorState === 'project'
                                ? 'rgba(0,240,255,0.06)'
                                : 'transparent',
                    pointerEvents: 'none',
                    zIndex: 9998,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition:
                        'width 0.2s ease, height 0.2s ease, border 0.2s ease, background 0.2s ease',
                }}
            >
                {cursorState === 'project' && (
                    <span
                        style={{
                            fontSize: 11,
                            color: '#00F0FF',
                            fontWeight: 500,
                            whiteSpace: 'nowrap',
                        }}
                    >
                        View →
                    </span>
                )}
                {cursorState === 'wave' && (
                    <span style={{ fontSize: 18 }}>👋</span>
                )}
            </div>
        </>
    );
}
