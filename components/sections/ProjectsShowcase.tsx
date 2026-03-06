'use client';

import { motion } from 'framer-motion';
import { portfolioModes } from '@/data/portfolio';

interface ProjectsShowcaseProps {
    onProjectSelect: (index: number) => void;
}

export default function ProjectsShowcase({
    onProjectSelect,
}: ProjectsShowcaseProps) {
    return (
        <section id="projects" className="py-32 px-6">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="mb-16"
                >
                    <h2
                        className="text-4xl md:text-5xl font-black"
                        style={{ color: 'var(--text-primary)' }}
                    >
                        Featured Projects
                    </h2>
                    <p
                        className="text-lg mt-3 max-w-lg"
                        style={{ color: 'var(--text-secondary)' }}
                    >
                        Each project represents a chapter of my engineering journey.
                    </p>
                    <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="h-1 w-20 mt-4 rounded-full"
                        style={{
                            background: 'linear-gradient(90deg, #00F0FF, #8B5CF6)',
                            transformOrigin: 'left',
                        }}
                    />
                </motion.div>

                {/* Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {portfolioModes.map((mode, i) => (
                        <motion.div
                            key={mode.id}
                            data-cursor="project"
                            initial={{ opacity: 0, y: 60 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.6,
                                delay: i * 0.15,
                                ease: [0.25, 0.1, 0.25, 1],
                            }}
                            viewport={{ once: true, amount: 0.2 }}
                            className="group relative overflow-hidden rounded-2xl transition-all duration-[400ms]"
                            style={{
                                background: 'var(--glass-bg)',
                                backdropFilter: 'blur(20px)',
                                border: '1px solid var(--glass-border)',
                                boxShadow: 'var(--glass-shadow)',
                                minHeight: 440,
                                cursor: 'pointer',
                            }}
                            onClick={() => onProjectSelect(i)}
                            onMouseEnter={(e) => {
                                const el = e.currentTarget;
                                el.style.transform = 'translateY(-8px)';
                                el.style.borderColor = mode.themeColor;
                                el.style.boxShadow = `0 20px 60px ${mode.themeColor}26`;
                            }}
                            onMouseLeave={(e) => {
                                const el = e.currentTarget;
                                el.style.transform = 'translateY(0)';
                                el.style.borderColor = 'var(--glass-border)';
                                el.style.boxShadow = 'var(--glass-shadow)';
                            }}
                        >
                            {/* Card Top: First frame */}
                            <div className="relative h-56 overflow-hidden rounded-t-2xl">
                                <img
                                    src={`${mode.folderPath}/1.jpg`}
                                    alt={mode.name}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                {/* Gradient overlay */}
                                <div
                                    className="absolute inset-0"
                                    style={{
                                        background: `linear-gradient(to bottom, transparent 30%, var(--bg-primary) 100%)`,
                                    }}
                                />
                            </div>

                            {/* Card Bottom */}
                            <div className="px-6 py-5">
                                <h3
                                    className="text-xl font-bold"
                                    style={{ color: 'var(--text-primary)' }}
                                >
                                    {mode.name}
                                </h3>
                                <p className="text-sm mt-1" style={{ color: mode.themeColor }}>
                                    {mode.subName}
                                </p>
                                <div
                                    className="h-px w-full my-3"
                                    style={{ background: 'var(--border-color)' }}
                                />
                                {/* Tech */}
                                <div className="flex flex-wrap gap-2">
                                    {mode.techStack.slice(0, 3).map((tech) => (
                                        <span
                                            key={tech}
                                            className="text-xs px-2 py-0.5 rounded-full"
                                            style={{
                                                border: '1px solid var(--border-color)',
                                                color: 'var(--text-secondary)',
                                            }}
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                                {/* Stats */}
                                <div className="flex justify-between mt-4">
                                    {mode.stats.map((stat) => (
                                        <div key={stat.label}>
                                            <div
                                                className="text-lg font-bold"
                                                style={{ color: mode.themeColor }}
                                            >
                                                {stat.val}
                                            </div>
                                            <div
                                                className="text-xs"
                                                style={{ color: 'var(--text-secondary)' }}
                                            >
                                                {stat.label}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Hover gradient sweep */}
                            <div
                                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                                style={{
                                    background: `linear-gradient(to top, ${mode.themeColor}0D, transparent)`,
                                }}
                            />
                        </motion.div>
                    ))}
                </div>

                {/* Subtitle */}
                <p
                    className="text-sm text-center mt-8 italic"
                    style={{ color: 'var(--text-secondary)' }}
                >
                    Click any project to dive into the full experience →
                </p>
            </div>
        </section>
    );
}
