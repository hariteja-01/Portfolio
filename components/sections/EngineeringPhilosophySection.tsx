'use client';

import { motion } from 'framer-motion';

const philosophyPoints = [
    {
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
            </svg>
        ),
        title: 'Systems Thinking',
        description:
            'I design for scale before writing the first line. Every module is a node in a larger graph - I always see the full topology.',
        color: '#00F0FF',
    },
    {
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
            </svg>
        ),
        title: 'Algorithm Optimization',
        description:
            'O(n²) is a problem to solve, not accept. I profile before optimizing and reduce complexity where it matters most.',
        color: '#8B5CF6',
    },
    {
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3" />
                <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
            </svg>
        ),
        title: 'AI Integration at Scale',
        description:
            'I build AI into product workflows - not demos. Multimodal pipelines, real-time inference, and explainable predictions.',
        color: '#FF6B35',
    },
    {
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" />
            </svg>
        ),
        title: 'Performance-First Architecture',
        description:
            'Every millisecond counts. I target Lighthouse 95+ and instrument metrics from the start - not as an afterthought.',
        color: '#4ADE80',
    },
    {
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
            </svg>
        ),
        title: 'Production-Ready Code Discipline',
        description:
            'TypeScript strict mode, clean interfaces, edge-case coverage. Code that ships and stays maintainable for years.',
        color: '#FFB74D',
    },
];

export default function EngineeringPhilosophySection() {
    return (
        <section
            id="philosophy"
            className="py-24 px-6"
            aria-label="Engineering philosophy"
        >
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
                        style={{ color: '#8B5CF6' }}
                    >
                        What I Bring to a Team
                    </p>
                    <h2
                        className="text-3xl md:text-4xl font-bold"
                        style={{ color: 'var(--text-primary)' }}
                    >
                        Engineering Philosophy
                    </h2>
                    <p
                        className="mt-3 max-w-xl text-base"
                        style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}
                    >
                        Principles that guide every system I design, every line I write.
                    </p>
                </motion.div>

                {/* Cards grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {philosophyPoints.map((point, i) => (
                        <motion.div
                            key={point.title}
                            initial={{ opacity: 0, y: 30, scale: 0.97 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            viewport={{ once: true }}
                            whileHover={{
                                y: -4,
                                transition: { duration: 0.2 },
                            }}
                            className="rounded-2xl p-6 flex flex-col gap-4 group"
                            style={{
                                background: 'var(--glass-bg)',
                                border: '1px solid var(--glass-border)',
                                backdropFilter: 'blur(20px)',
                                boxShadow: 'var(--glass-shadow)',
                                transformStyle: 'preserve-3d',
                                perspective: '800px',
                            }}
                            onMouseEnter={(e) => {
                                (e.currentTarget as HTMLElement).style.borderColor = `${point.color}40`;
                                (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 32px ${point.color}20`;
                            }}
                            onMouseLeave={(e) => {
                                (e.currentTarget as HTMLElement).style.borderColor = 'var(--glass-border)';
                                (e.currentTarget as HTMLElement).style.boxShadow = 'var(--glass-shadow)';
                            }}
                        >
                            {/* Icon */}
                            <div
                                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-200 group-hover:scale-110"
                                style={{
                                    background: `${point.color}15`,
                                    color: point.color,
                                    border: `1px solid ${point.color}25`,
                                }}
                            >
                                {point.icon}
                            </div>

                            {/* Content */}
                            <div>
                                <h3
                                    className="font-bold text-base mb-2"
                                    style={{ color: 'var(--text-primary)' }}
                                >
                                    {point.title}
                                </h3>
                                <p
                                    className="text-sm leading-relaxed"
                                    style={{ color: 'var(--text-secondary)' }}
                                >
                                    {point.description}
                                </p>
                            </div>

                            {/* Bottom accent line */}
                            <div
                                className="h-0.5 rounded-full mt-auto w-0 group-hover:w-full transition-all duration-500"
                                style={{ background: point.color }}
                            />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
