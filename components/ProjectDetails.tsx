'use client';

import { motion } from 'framer-motion';
import { PortfolioMode } from '@/data/portfolio';

interface ProjectDetailsProps {
    mode: PortfolioMode;
}

export default function ProjectDetails({ mode }: ProjectDetailsProps) {
    return (
        <motion.section
            className="py-24 px-6 max-w-6xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.3 }}
        >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                {/* Left column */}
                <div>
                    <h3 className="text-3xl md:text-4xl font-bold" style={{ color: 'var(--text-primary)' }}>
                        {mode.detailsSection.title}
                    </h3>
                    <p className="mt-3 text-sm font-semibold" style={{ color: mode.themeColor }}>
                        {mode.period}
                    </p>
                    <div
                        className="h-1 w-16 my-6 rounded-full"
                        style={{ background: mode.themeColor }}
                    />
                    <p className="text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                        {mode.detailsSection.description}
                    </p>

                    {/* Tech Stack Pills */}
                    <div className="flex flex-wrap gap-2 mt-8">
                        {mode.techStack.map((tech) => (
                            <span
                                key={tech}
                                className="rounded-full px-3 py-1 text-sm border"
                                style={{
                                    borderColor: mode.themeColor,
                                    color: mode.themeColor,
                                }}
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Right column: Stats */}
                <div className="grid grid-cols-3 gap-4 content-start">
                    {mode.stats.map((stat) => (
                        <div
                            key={stat.label}
                            className="backdrop-blur rounded-xl p-6 text-center"
                            style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}
                        >
                            <div
                                className="text-3xl md:text-4xl font-black"
                                style={{ color: mode.themeColor }}
                            >
                                {stat.val}
                            </div>
                            <div className="text-sm mt-2" style={{ color: 'var(--text-secondary)' }}>{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </motion.section>
    );
}
