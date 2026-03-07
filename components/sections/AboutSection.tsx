'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { profile } from '@/data/portfolio';
import GlassmorphicCard from '@/components/GlassmorphicCard';

function AnimatedCounter({
    target,
    duration = 1.5,
    prefix = '',
    suffix = '',
    decimals = 0,
}: {
    target: number;
    duration?: number;
    prefix?: string;
    suffix?: string;
    decimals?: number;
}) {
    const [count, setCount] = useState(0);
    const [started, setStarted] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !started) {
                    setStarted(true);
                }
            },
            { threshold: 0.3 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [started]);

    useEffect(() => {
        if (!started) return;
        const steps = 60;
        const increment = target / steps;
        let current = 0;
        const interval = setInterval(() => {
            current += increment;
            if (current >= target) {
                setCount(target);
                clearInterval(interval);
            } else {
                setCount(current);
            }
        }, (duration * 1000) / steps);
        return () => clearInterval(interval);
    }, [started, target, duration]);

    return (
        <div ref={ref}>
            {prefix}
            {decimals > 0 ? count.toFixed(decimals) : Math.floor(count)}
            {suffix}
        </div>
    );
}

export default function AboutSection() {
    const [typedText, setTypedText] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const typingRef = useRef<HTMLDivElement>(null);
    const hasTyped = useRef(false);

    const terminalContent = `> whoami

I'm a pre-final year CSE undergrad at Lovely Professional University with a 9.18 CGPA and an obsession for clean, efficient code.

> skills --top

900+ problems solved on LeetCode - not for the streak, but because understanding algorithms at a deep level is my idea of fun.

> certifications --list

Dual Oracle Cloud certified (Data Science + Developer Professional). IBM & Microsoft certified in AI & GenAI.

> interests

Algorithms • Machine Learning • Full-Stack Development • Financial Markets • Data Science

> status

Building the future, one commit at a time.`;

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasTyped.current) {
                    hasTyped.current = true;
                    setIsTyping(true);
                }
            },
            { threshold: 0.2 }
        );
        if (typingRef.current) observer.observe(typingRef.current);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!isTyping) return;
        let i = 0;
        const interval = setInterval(() => {
            if (i < terminalContent.length) {
                setTypedText(terminalContent.slice(0, i + 1));
                i++;
            } else {
                clearInterval(interval);
            }
        }, 15);
        return () => clearInterval(interval);
    }, [isTyping, terminalContent]);

    const statCards = [
        {
            value: 9.18,
            decimals: 2,
            suffix: '',
            prefix: '',
            label: 'CGPA',
            sub: 'Top tier among 2000+ CSE students',
            gradient: true,
            color: '',
        },
        {
            value: 900,
            decimals: 0,
            suffix: '+',
            prefix: '',
            label: 'LEETCODE',
            sub: 'Top global percentile',
            gradient: false,
            color: '#FFB74D',
        },
        {
            value: 4,
            decimals: 0,
            suffix: '',
            prefix: '',
            label: 'CERTIFICATIONS',
            sub: 'Oracle, IBM, Microsoft',
            gradient: false,
            color: '#8B5CF6',
        },
        {
            value: 0,
            decimals: 0,
            suffix: '',
            prefix: '#',
            label: 'STATE RANK',
            sub: 'International Math Olympiad',
            gradient: false,
            color: '#FF6B35',
            isRank: true,
        },
    ];

    const certColors = ['#00F0FF', '#8B5CF6', '#FF6B35', '#FFB74D'];

    return (
        <section id="about" className="py-32 px-6">
            <div className="max-w-6xl mx-auto">
                <motion.h2
                    className="text-3xl md:text-4xl font-bold mb-12"
                    style={{ color: 'var(--text-primary)' }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                >
                    About Me
                </motion.h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Left: Terminal */}
                    <motion.div
                        ref={typingRef}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true, amount: 0.2 }}
                        className="rounded-xl overflow-hidden"
                        style={{
                            border: '1px solid var(--border-color)',
                            boxShadow: 'var(--glass-shadow)',
                        }}
                    >
                        {/* Terminal header */}
                        <div
                            className="h-8 flex items-center px-3 gap-2"
                            style={{ background: 'var(--bg-secondary)' }}
                        >
                            <div className="w-3 h-3 rounded-full" style={{ background: '#FF5F56' }} />
                            <div className="w-3 h-3 rounded-full" style={{ background: '#FFBD2E' }} />
                            <div className="w-3 h-3 rounded-full" style={{ background: '#27C93F' }} />
                            <span
                                className="ml-2 text-xs font-mono"
                                style={{ color: 'var(--text-secondary)' }}
                            >
                                hariteja@dev:~$
                            </span>
                        </div>
                        {/* Terminal body */}
                        <div
                            className="p-6 font-mono text-sm leading-relaxed overflow-auto"
                            style={{
                                background: 'var(--bg-primary)',
                                color: '#4ADE80',
                                maxHeight: 420,
                                minHeight: 380,
                            }}
                        >
                            <pre className="whitespace-pre-wrap">{typedText}</pre>
                            <span className="animate-blink">_</span>
                        </div>
                    </motion.div>

                    {/* Right: Stat Cards */}
                    <div className="grid grid-cols-2 gap-4 content-start">
                        {statCards.map((card, i) => (
                            <motion.div
                                key={card.label}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.4, delay: i * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <GlassmorphicCard
                                    className="p-6"
                                    hoverColor={card.color || '#00F0FF'}
                                    hoverGlow
                                >
                                    <div
                                        className="text-4xl font-black"
                                        style={
                                            card.gradient
                                                ? {
                                                    background:
                                                        'linear-gradient(135deg, #00F0FF, #8B5CF6)',
                                                    WebkitBackgroundClip: 'text',
                                                    WebkitTextFillColor: 'transparent',
                                                    backgroundClip: 'text',
                                                }
                                                : { color: card.color }
                                        }
                                    >
                                        {card.isRank ? (
                                            <motion.span
                                                initial={{ scale: 0 }}
                                                whileInView={{ scale: 1 }}
                                                transition={{
                                                    type: 'spring',
                                                    stiffness: 200,
                                                    delay: 0.3 + i * 0.1,
                                                }}
                                                viewport={{ once: true }}
                                            >
                                                #1
                                            </motion.span>
                                        ) : (
                                            <AnimatedCounter
                                                target={card.value}
                                                decimals={card.decimals}
                                                prefix={card.prefix}
                                                suffix={card.suffix}
                                            />
                                        )}
                                    </div>
                                    <div
                                        className="text-xs uppercase tracking-widest mt-2"
                                        style={{ color: 'var(--text-secondary)' }}
                                    >
                                        {card.label}
                                    </div>
                                    <div
                                        className="text-xs mt-1"
                                        style={{ color: 'var(--text-secondary)' }}
                                    >
                                        {card.sub}
                                    </div>
                                </GlassmorphicCard>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Achievements marquee */}
                <div className="overflow-hidden mt-16 max-w-4xl mx-auto">
                    <div className="animate-marquee flex whitespace-nowrap">
                        {[...Array(2)].map((_, rep) => (
                            <span
                                key={rep}
                                className="text-sm mx-4 flex-shrink-0"
                                style={{ color: 'var(--text-secondary)' }}
                            >
                                {profile.achievements.join(' • ')}
                                {' • '}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Certifications */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-3 max-w-4xl mx-auto mt-8">
                    {profile.certifications.map((cert, i) => (
                        <motion.div
                            key={cert.title}
                            className="rounded-r-lg p-3"
                            style={{
                                background: 'var(--bg-card)',
                                borderLeft: `4px solid ${certColors[i % certColors.length]}`,
                            }}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4, delay: i * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <div
                                className="text-sm font-medium"
                                style={{ color: 'var(--text-primary)' }}
                            >
                                {cert.title}
                            </div>
                            <div
                                className="text-xs"
                                style={{ color: 'var(--text-secondary)' }}
                            >
                                {cert.issuer} • {cert.date}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
