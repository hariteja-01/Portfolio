'use client';

import { useRef, useState, useEffect, useId } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { profile } from '@/data/portfolio';
import SparkleBackground from '@/components/SparkleBackground';
import { useTheme } from '@/components/ThemeProvider';

// ─── Animated Role Rotator (typewriter + gradient) ──────────────────
function RoleRotator({ roles }: { roles: string[] }) {
    const [roleIdx, setRoleIdx] = useState(0);
    const [text, setText] = useState('');
    const [phase, setPhase] = useState<'typing' | 'pausing' | 'deleting'>('typing');

    useEffect(() => {
        const currentRole = roles[roleIdx];

        if (phase === 'typing') {
            if (text.length < currentRole.length) {
                const t = setTimeout(() => {
                    setText(currentRole.slice(0, text.length + 1));
                }, 65 + Math.random() * 40);
                return () => clearTimeout(t);
            }
            // Done typing — pause
            const t = setTimeout(() => setPhase('pausing'), 2200);
            return () => clearTimeout(t);
        }

        if (phase === 'pausing') {
            setPhase('deleting');
            return;
        }

        if (phase === 'deleting') {
            if (text.length > 0) {
                const t = setTimeout(() => {
                    setText(text.slice(0, -1));
                }, 30);
                return () => clearTimeout(t);
            }
            // Done deleting — next role
            setRoleIdx((prev) => (prev + 1) % roles.length);
            setPhase('typing');
        }
    }, [text, phase, roleIdx, roles]);

    return (
        <span className="inline-flex items-center min-h-[1.5em]">
            <span
                className="font-medium bg-clip-text text-transparent"
                style={{
                    backgroundImage: 'linear-gradient(90deg, #00F0FF, #8B5CF6, #FF6B35)',
                    backgroundSize: '200% 100%',
                    animation: 'gradient-shift 4s ease infinite',
                }}
            >
                {text}
            </span>
            <span
                className="inline-block w-[3px] h-[1.2em] ml-0.5 rounded-sm"
                style={{
                    background: 'linear-gradient(180deg, #00F0FF, #8B5CF6)',
                    animation: 'cursor-blink 0.7s step-end infinite',
                }}
            />
        </span>
    );
}

export default function HeroSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const { scrollY } = useScroll();
    const scrollIndicatorOpacity = useTransform(scrollY, [0, 100], [1, 0]);
    const frameGradientId = useId().replace(/:/g, '');
    const { theme } = useTheme();
    const isLightMode = theme === 'light';

    const firstLine = 'Hari Teja';
    const secondLine = 'Patnala';

    return (
        <section
            ref={sectionRef}
            id="hero"
            className="relative min-h-screen w-full overflow-hidden flex items-center"
            style={{ background: 'var(--bg-primary)' }}
        >
            {/* Dynamic sparkle particle background */}
            <SparkleBackground />

            {/* Animated mesh gradient orbs (below sparkles) */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
                <div
                    className="absolute rounded-full blur-[120px] animate-hero-orb-1"
                    style={{
                        width: 600,
                        height: 600,
                        background: 'radial-gradient(circle, #00F0FF 0%, transparent 70%)',
                        opacity: isLightMode ? 0.2 : 0.15,
                        top: '5%',
                        left: '15%',
                    }}
                />
                <div
                    className="absolute rounded-full blur-[120px] animate-hero-orb-2"
                    style={{
                        width: 500,
                        height: 500,
                        background: 'radial-gradient(circle, #8B5CF6 0%, transparent 70%)',
                        opacity: isLightMode ? 0.15 : 0.1,
                        top: '45%',
                        right: '5%',
                    }}
                />
                <div
                    className="absolute rounded-full blur-[120px] animate-hero-orb-3"
                    style={{
                        width: 450,
                        height: 450,
                        background: 'radial-gradient(circle, #FF6B35 0%, transparent 70%)',
                        opacity: isLightMode ? 0.12 : 0.08,
                        bottom: '5%',
                        left: '45%',
                    }}
                />
                <div
                    className="absolute rounded-full blur-[100px]"
                    style={{
                        width: 300,
                        height: 300,
                        background: 'radial-gradient(circle, #4ADE80 0%, transparent 70%)',
                        opacity: isLightMode ? 0.1 : 0.06,
                        top: '30%',
                        left: '60%',
                        animation: 'hero-orb-4 28s ease-in-out infinite',
                    }}
                />
                {/* Dot grid */}
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage:
                            'radial-gradient(circle, var(--text-secondary) 0.5px, transparent 0.5px)',
                        backgroundSize: '30px 30px',
                        opacity: isLightMode ? 0.06 : 0.03,
                    }}
                />
            </div>

            {/* Content */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-10 py-24">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
                    {/* Left: Text (3/5 on desktop) */}
                    <div className="lg:col-span-3">
                        {/* Greeting tag */}
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-8"
                            style={{
                                background: 'var(--glass-bg)',
                                backdropFilter: 'blur(20px)',
                                border: '1px solid var(--glass-border)',
                            }}
                        >
                            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                            <span
                                className="text-xs"
                                style={{ color: 'var(--text-secondary)' }}
                            >
                                Available for opportunities
                            </span>
                        </motion.div>

                        {/* Name */}
                        <div className="overflow-hidden">
                            <div className="text-6xl md:text-7xl lg:text-8xl font-black leading-[0.9]">
                                {firstLine.split('').map((char, i) => (
                                    <motion.span
                                        key={`f-${i}`}
                                        initial={{ y: 60, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{
                                            duration: 0.5,
                                            delay: 0.6 + i * 0.03,
                                            ease: [0.25, 0.1, 0.25, 1],
                                        }}
                                        className="inline-block"
                                        style={{ color: 'var(--text-primary)' }}
                                    >
                                        {char === ' ' ? '\u00A0' : char}
                                    </motion.span>
                                ))}
                            </div>
                            <div className="text-6xl md:text-7xl lg:text-8xl font-black leading-[0.9] mt-2 relative">
                                {secondLine.split('').map((char, i) => (
                                    <motion.span
                                        key={`s-${i}`}
                                        initial={{ y: 60, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{
                                            duration: 0.5,
                                            delay: 0.8 + i * 0.03,
                                            ease: [0.25, 0.1, 0.25, 1],
                                        }}
                                        className="inline-block"
                                        style={{ color: 'var(--text-primary)' }}
                                    >
                                        {char}
                                    </motion.span>
                                ))}
                                {/* Gradient underline */}
                                <motion.div
                                    initial={{ scaleX: 0 }}
                                    animate={{ scaleX: 1 }}
                                    transition={{ duration: 0.8, delay: 1.2, ease: 'easeOut' }}
                                    className="h-1 w-full mt-2 rounded-full"
                                    style={{
                                        background:
                                            'linear-gradient(90deg, #00F0FF, #8B5CF6, #FF6B35)',
                                        transformOrigin: 'left',
                                    }}
                                />
                            </div>
                        </div>

                        {/* Role — Animated Typewriter */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.8 }}
                            className="text-xl md:text-2xl font-light mt-6"
                            style={{ color: 'var(--text-secondary)' }}
                        >
                            <RoleRotator roles={profile.roles} />
                        </motion.div>

                        {/* Description */}
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 1.0 }}
                            className="text-base md:text-lg max-w-xl mt-4"
                            style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}
                        >
                            I solve hard problems with elegant code.{' '}
                            <span className="font-medium" style={{ color: '#00F0FF' }}>
                                900+ LeetCode
                            </span>{' '}
                            problems solved.{' '}
                            <span className="font-medium" style={{ color: '#8B5CF6' }}>
                                Oracle Cloud certified
                            </span>
                            . Building intelligent systems at the intersection of{' '}
                            <span className="font-medium" style={{ color: '#FF6B35' }}>
                                algorithms, ML
                            </span>
                            , and modern web engineering.
                        </motion.p>

                        {/* CTA Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 1.2 }}
                            className="flex flex-col sm:flex-row gap-4 mt-8"
                        >
                            <a
                                href="#projects"
                                className="inline-flex items-center justify-center text-white font-semibold px-8 py-4 rounded-full hover:scale-[1.03] transition-transform duration-300"
                                style={{
                                    background: 'linear-gradient(135deg, #00F0FF, #8B5CF6)',
                                    boxShadow: '0 4px 20px rgba(0,240,255,0.3)',
                                }}
                            >
                                Explore My Work
                            </a>
                            <a
                                href="/resume.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center font-medium px-8 py-4 rounded-full transition-all duration-300"
                                style={{
                                    color: 'var(--text-primary)',
                                    border: '1.5px solid var(--border-color)',
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.borderColor = '#00F0FF';
                                    e.currentTarget.style.background = 'rgba(0,240,255,0.05)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.borderColor = 'var(--border-color)';
                                    e.currentTarget.style.background = 'transparent';
                                }}
                            >
                                View CV
                            </a>
                        </motion.div>

                        {/* Social links */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 1.4 }}
                            className="flex gap-5 mt-6"
                        >
                            {[
                                { label: 'GitHub', url: profile.github },
                                { label: 'LinkedIn', url: profile.linkedin },
                                { label: 'LeetCode', url: profile.leetcode },
                                { label: 'Email', url: `mailto:${profile.email}` },
                            ].map((link, i) => (
                                <motion.a
                                    key={link.label}
                                    href={link.url}
                                    target={link.label === 'Email' ? undefined : '_blank'}
                                    rel="noopener noreferrer"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: 1.4 + i * 0.08 }}
                                    className="text-sm relative group"
                                    style={{ color: 'var(--text-secondary)' }}
                                >
                                    <span className="group-hover:text-[#00F0FF] transition-colors">
                                        {link.label}
                                    </span>
                                    <span
                                        className="absolute -bottom-0.5 left-0 h-px bg-[#00F0FF] transition-transform duration-300 origin-left scale-x-0 group-hover:scale-x-100"
                                        style={{ width: '100%' }}
                                    />
                                </motion.a>
                            ))}
                        </motion.div>
                    </div>

                    {/* Right: Hero Portrait */}
                    <motion.div
                        className="lg:col-span-2 flex items-center justify-center relative min-h-[420px] lg:min-h-[560px]"
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                    >
                        <motion.div
                            className="relative z-10 w-[78vw] max-w-[410px] h-[400px] lg:h-[520px]"
                            animate={{ y: [0, -5, 0], rotate: [0, 0.18, 0, -0.18, 0] }}
                            transition={{
                                y: { duration: 8, repeat: Infinity, ease: 'easeInOut' },
                                rotate: { duration: 12.5, repeat: Infinity, ease: 'easeInOut' },
                            }}
                        >
                            <div className="absolute inset-[6px] rounded-[1.95rem] overflow-hidden">
                                <Image
                                    src="/my_pic.jpeg"
                                    alt="Portrait of Hari Teja Patnala"
                                    fill
                                    priority
                                    sizes="(min-width: 1024px) 35vw, 82vw"
                                    className="object-cover object-center scale-[1.05]"
                                />
                            </div>

                            <svg
                                viewBox="0 0 410 520"
                                preserveAspectRatio="none"
                                className="absolute inset-0 w-full h-full pointer-events-none"
                                aria-hidden="true"
                            >
                                <defs>
                                    <linearGradient id={frameGradientId} x1="0" y1="0" x2="410" y2="520" gradientUnits="userSpaceOnUse">
                                        <stop offset="0%" stopColor="#00F0FF" />
                                        <stop offset="35%" stopColor="#8B5CF6" />
                                        <stop offset="70%" stopColor="#FF6B35" />
                                        <stop offset="100%" stopColor="#4ADE80" />
                                        <animateTransform
                                            attributeName="gradientTransform"
                                            type="rotate"
                                            from="0 205 260"
                                            to="360 205 260"
                                            dur="7s"
                                            repeatCount="indefinite"
                                        />
                                    </linearGradient>
                                </defs>

                                <rect
                                    x="4"
                                    y="4"
                                    width="402"
                                    height="512"
                                    rx="38"
                                    ry="38"
                                    className="hero-frame-track"
                                />
                                <rect
                                    x="4"
                                    y="4"
                                    width="402"
                                    height="512"
                                    rx="38"
                                    ry="38"
                                    className="hero-frame-flow"
                                    stroke={`url(#${frameGradientId})`}
                                />
                            </svg>
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                style={{ opacity: scrollIndicatorOpacity }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            >
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                    className="text-lg"
                    style={{ color: 'var(--text-secondary)' }}
                >
                    ↓
                </motion.div>
                <span
                    className="text-xs uppercase tracking-widest"
                    style={{ color: 'var(--text-secondary)' }}
                >
                    Scroll to explore
                </span>
            </motion.div>

            <style jsx>{`
                .hero-frame-track {
                    fill: none;
                    stroke: rgba(148, 163, 184, 0.32);
                    stroke-width: 2.2;
                }

                .hero-frame-flow {
                    fill: none;
                    stroke-width: 4;
                    stroke-linecap: round;
                    stroke-dasharray: 220 1240;
                    stroke-dashoffset: 0;
                    filter: drop-shadow(0 0 8px rgba(0, 240, 255, 0.7)) drop-shadow(0 0 16px rgba(139, 92, 246, 0.45));
                    animation: hero-border-loader 4.6s cubic-bezier(0.5, 0.1, 0.5, 1) infinite;
                }

                :global(.light-mode) .hero-frame-track {
                    stroke: rgba(15, 23, 42, 0.32);
                }

                :global(.light-mode) .hero-frame-flow {
                    filter: drop-shadow(0 0 6px rgba(59, 130, 246, 0.55)) drop-shadow(0 0 12px rgba(139, 92, 246, 0.38));
                }

                @keyframes hero-border-loader {
                    0% {
                        stroke-dashoffset: 0;
                    }

                    100% {
                        stroke-dashoffset: -1460;
                    }
                }
            `}</style>
        </section>
    );
}
