'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Student3D() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [mouseAngle, setMouseAngle] = useState({ x: 0, y: 0 });
    const [eyeOffset, setEyeOffset] = useState({ x: 0, y: 0 });
    const [isWaving, setIsWaving] = useState(false);
    const [showBubble, setShowBubble] = useState(false);
    const [isScrolling, setIsScrolling] = useState(false);
    const scrollTimeout = useRef<NodeJS.Timeout>();

    const handleMouseMove = useCallback((e: MouseEvent) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        const maxDist = 400;
        const rotateY = Math.max(-15, Math.min(15, (dx / maxDist) * 15));
        const rotateX = Math.max(-10, Math.min(10, -(dy / maxDist) * 10));
        setMouseAngle({ x: rotateX, y: rotateY });
        const eyeX = Math.max(-3, Math.min(3, (dx / maxDist) * 3));
        const eyeY = Math.max(-3, Math.min(3, (dy / maxDist) * 3));
        setEyeOffset({ x: eyeX, y: eyeY });
    }, []);

    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [handleMouseMove]);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolling(true);
            if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
            scrollTimeout.current = setTimeout(() => setIsScrolling(false), 200);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
        };
    }, []);

    const handleWave = () => {
        if (isWaving) return;
        setIsWaving(true);
        setShowBubble(true);
        setTimeout(() => setIsWaving(false), 1200);
        setTimeout(() => setShowBubble(false), 2500);
    };

    const badges = [
        { text: '900+ LC', color: '#FFB74D', x: -80, y: -40, delay: 0 },
        { text: '9.18 CGPA', color: '#00F0FF', x: 90, y: -60, delay: 0.2 },
        { text: 'Oracle Certified', color: '#8B5CF6', x: -90, y: 60, delay: 0.4 },
        { text: 'React + AI', color: '#FF6B35', x: 100, y: 40, delay: 0.6 },
        { text: 'State Rank #1', color: '#4ADE80', x: -20, y: 110, delay: 0.8 },
    ];

    return (
        <div
            ref={containerRef}
            className="relative w-full h-full flex items-center justify-center"
            data-cursor="wave"
            onClick={handleWave}
            onMouseEnter={handleWave}
        >
            {/* Speech bubble */}
            <AnimatePresence>
                {showBubble && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: -10 }}
                        className="absolute -top-4 left-1/2 -translate-x-1/2 z-20"
                        style={{
                            background: 'var(--glass-bg)',
                            backdropFilter: 'blur(20px)',
                            border: '1px solid var(--glass-border)',
                            borderRadius: 12,
                            padding: '8px 16px',
                            fontSize: 14,
                            fontWeight: 500,
                            color: 'var(--text-primary)',
                            whiteSpace: 'nowrap',
                        }}
                    >
                        Hey! 👋
                    </motion.div>
                )}
            </AnimatePresence>

            {/* 3D Character */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                style={{
                    perspective: 1200,
                    transformStyle: 'preserve-3d',
                }}
            >
                <div
                    className="animate-float"
                    style={{
                        transform: `rotateX(${mouseAngle.x + (isScrolling ? -5 : 0)}deg) rotateY(${mouseAngle.y}deg)`,
                        transition: 'transform 0.3s ease-out',
                        transformStyle: 'preserve-3d',
                    }}
                >
                    {/* Head */}
                    <motion.div
                        initial={{ y: -60, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.9 }}
                        className="mx-auto mb-1 relative"
                        style={{
                            width: 64,
                            height: 64,
                            borderRadius: 16,
                            background: 'linear-gradient(135deg, #00F0FF, #8B5CF6)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'column',
                            gap: 6,
                        }}
                    >
                        {/* Eyes */}
                        <div className="flex gap-4">
                            <div
                                className="w-2 h-2 rounded-full bg-white"
                                style={{
                                    transform: `translate(${eyeOffset.x}px, ${eyeOffset.y}px)`,
                                    transition: 'transform 0.1s ease',
                                }}
                            />
                            <div
                                className="w-2 h-2 rounded-full bg-white"
                                style={{
                                    transform: `translate(${eyeOffset.x}px, ${eyeOffset.y}px)`,
                                    transition: 'transform 0.1s ease',
                                }}
                            />
                        </div>
                        {/* Smile */}
                        <div
                            style={{
                                width: 14,
                                height: 7,
                                borderBottom: '2px solid rgba(255,255,255,0.8)',
                                borderRadius: '0 0 50% 50%',
                            }}
                        />
                    </motion.div>

                    {/* Arm (right side, waving) */}
                    <motion.div
                        animate={
                            isWaving
                                ? { rotate: [0, -30, 20, -30, 20, 0] }
                                : { rotate: 0 }
                        }
                        transition={{ duration: 1.2, ease: 'easeInOut' }}
                        style={{
                            position: 'absolute',
                            right: -16,
                            top: 82,
                            width: 12,
                            height: 40,
                            borderRadius: 6,
                            background: 'linear-gradient(135deg, #00F0FF, #8B5CF6)',
                            transformOrigin: 'top center',
                        }}
                    />

                    {/* Body */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 1.0 }}
                        className="mx-auto relative"
                        style={{
                            width: 80,
                            height: 72,
                            borderRadius: '12px 12px 8px 8px',
                            background: 'var(--text-primary)',
                            opacity: 0.9,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <span
                            style={{
                                fontFamily: 'monospace',
                                fontSize: 18,
                                fontWeight: 700,
                                color: 'var(--bg-primary)',
                            }}
                        >
                            {'{ }'}
                        </span>
                    </motion.div>

                    {/* Laptop */}
                    <motion.div
                        initial={{ x: 40, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 1.1 }}
                        className="mx-auto -mt-2 relative"
                        style={{
                            width: 56,
                            height: 6,
                            borderRadius: 3,
                            background: '#333',
                        }}
                    >
                        <div
                            style={{
                                position: 'absolute',
                                bottom: 6,
                                left: '50%',
                                transform: 'translateX(-50%)',
                                width: 48,
                                height: 32,
                                borderRadius: '4px 4px 0 0',
                                background: '#1a1a2e',
                                border: '1px solid rgba(0,240,255,0.3)',
                                overflow: 'hidden',
                                padding: 4,
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 2,
                            }}
                        >
                            <div style={{ width: '80%', height: 2, background: '#00F0FF', borderRadius: 1, opacity: 0.7 }} />
                            <div style={{ width: '60%', height: 2, background: '#8B5CF6', borderRadius: 1, opacity: 0.5 }} />
                            <div style={{ width: '90%', height: 2, background: '#4ADE80', borderRadius: 1, opacity: 0.6 }} />
                            <div style={{ width: '45%', height: 2, background: '#FF6B35', borderRadius: 1, opacity: 0.5 }} />
                            {/* Screen glow */}
                            <div
                                style={{
                                    position: 'absolute',
                                    inset: 0,
                                    background: 'radial-gradient(circle at 50% 50%, rgba(0,240,255,0.15) 0%, transparent 70%)',
                                }}
                            />
                        </div>
                    </motion.div>

                    {/* Legs */}
                    <motion.div
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 1.2 }}
                        className="flex gap-2 mx-auto justify-center mt-1"
                    >
                        <div
                            style={{
                                width: 16,
                                height: 32,
                                borderRadius: 6,
                                background: '#4B5563',
                                transform: isScrolling ? 'rotate(-8deg)' : 'rotate(0deg)',
                                transition: 'transform 0.3s ease',
                            }}
                        />
                        <div
                            style={{
                                width: 16,
                                height: 32,
                                borderRadius: 6,
                                background: '#4B5563',
                                transform: isScrolling ? 'rotate(8deg)' : 'rotate(0deg)',
                                transition: 'transform 0.3s ease',
                            }}
                        />
                    </motion.div>
                </div>
            </motion.div>

            {/* Floating Badges */}
            {badges.map((badge, i) => (
                <motion.div
                    key={badge.text}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                        duration: 0.4,
                        delay: 1.0 + badge.delay,
                        type: 'spring',
                        stiffness: 200,
                    }}
                    className="absolute animate-float"
                    style={{
                        left: `calc(50% + ${badge.x}px)`,
                        top: `calc(50% + ${badge.y}px)`,
                        animationDelay: `${i * 0.5}s`,
                        animationDuration: `${2.5 + i * 0.4}s`,
                        background: 'var(--glass-bg)',
                        backdropFilter: 'blur(12px)',
                        border: '1px solid var(--glass-border)',
                        borderRadius: 20,
                        padding: '4px 12px',
                        fontSize: 11,
                        fontWeight: 500,
                        color: badge.color,
                        whiteSpace: 'nowrap',
                        zIndex: 10,
                    }}
                >
                    {badge.text}
                </motion.div>
            ))}
        </div>
    );
}
