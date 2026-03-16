'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

// ─── Animated Counter ────────────────────────────────────────────────
function AnimatedCounter({
    target,
    duration = 2,
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
    const ref = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting && !started) setStarted(true); },
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
            if (current >= target) { setCount(target); clearInterval(interval); }
            else setCount(current);
        }, (duration * 1000) / steps);
        return () => clearInterval(interval);
    }, [started, target, duration]);

    return (
        <span ref={ref}>
            {prefix}{decimals > 0 ? count.toFixed(decimals) : Math.floor(count)}{suffix}
        </span>
    );
}

// ─── Metric Card Data ─────────────────────────────────────────────────
const metricGroups = [
    {
        project: 'AlgoQuest',
        color: '#00F0FF',
        gradient: 'linear-gradient(135deg, #00F0FF22 0%, #0891B222 100%)',
        border: '#00F0FF30',
        metrics: [
            { label: 'Learning Efficiency Boost', val: 40, suffix: '%' },
            { label: 'Algorithms Visualized', val: 15, suffix: '+' },
            { label: 'Languages Supported', val: 3, suffix: '' },
        ],
    },
    {
        project: 'AI Game Tester',
        color: '#8B5CF6',
        gradient: 'linear-gradient(135deg, #8B5CF622 0%, #6D28D922 100%)',
        border: '#8B5CF630',
        metrics: [
            { label: 'Games Parsed', val: 700, suffix: '+' },
            { label: 'AI Response Time', val: 2, suffix: 's', prefix: '<' },
            { label: 'Crash Categories Auto-Tagged', val: 100, suffix: '%' },
        ],
    },
    {
        project: 'Real Estate House Price Predictor',
        color: '#FF6B35',
        gradient: 'linear-gradient(135deg, #FF6B3522 0%, #EA580C22 100%)',
        border: '#FF6B3530',
        metrics: [
            { label: 'Prediction Accuracy', val: 92, suffix: '%' },
            { label: 'Records Processed', val: 80000, suffix: '+' },
            { label: 'Years of Market Data', val: 20, suffix: ' yrs' },
        ],
    },
];

// ─── Main Section ─────────────────────────────────────────────────────
export default function ImpactMetricsSection() {
    return (
        <section id="impact" className="py-20 px-6" aria-label="Impact and performance metrics">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="mb-16"
                >
                    <p
                        className="text-xs uppercase tracking-[0.25em] mb-3 font-mono"
                        style={{ color: '#00F0FF' }}
                    >
                        Measured Results
                    </p>
                    <h2
                        className="text-3xl md:text-4xl font-bold"
                        style={{ color: 'var(--text-primary)' }}
                    >
                        Impact &amp; Performance Metrics
                    </h2>
                    <p
                        className="mt-3 max-w-xl text-base"
                        style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}
                    >
                        Systems built for measurable outcomes - not just features.
                    </p>
                </motion.div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {metricGroups.map((group, gi) => (
                        <motion.div
                            key={group.project}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: gi * 0.12 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -6, scale: 1.02 }}
                            className="rounded-2xl p-6 flex flex-col gap-5"
                            style={{
                                background: group.gradient,
                                border: `1px solid ${group.border}`,
                                backdropFilter: 'blur(20px)',
                                boxShadow: `0 10px 30px ${group.color}18`,
                            }}
                            onMouseEnter={(e) => {
                                const el = e.currentTarget as HTMLDivElement;
                                el.style.borderColor = `${group.color}80`;
                                el.style.boxShadow = `0 18px 45px ${group.color}35, inset 0 0 22px ${group.color}25`;
                            }}
                            onMouseLeave={(e) => {
                                const el = e.currentTarget as HTMLDivElement;
                                el.style.borderColor = group.border;
                                el.style.boxShadow = `0 10px 30px ${group.color}18`;
                            }}
                        >
                            {/* Project label */}
                            <div
                                className="text-xs uppercase tracking-widest font-mono font-semibold"
                                style={{ color: group.color }}
                            >
                                {group.project}
                            </div>

                            {/* Metrics */}
                            {group.metrics.map((m, mi) => (
                                <div key={m.label}>
                                    <div
                                        className="text-3xl font-black"
                                        style={{ color: group.color }}
                                    >
                                        {m.prefix && <span>{m.prefix}</span>}
                                        <AnimatedCounter
                                            target={m.val}
                                            suffix={m.suffix}
                                            duration={1.8}
                                        />
                                    </div>
                                    <div
                                        className="text-xs mt-1"
                                        style={{ color: 'var(--text-secondary)' }}
                                    >
                                        {m.label}
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
