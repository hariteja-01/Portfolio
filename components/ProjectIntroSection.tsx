'use client';

import { motion } from 'framer-motion';
import { PortfolioMode } from '@/data/portfolio';

interface ProjectIntroSectionProps {
    mode: PortfolioMode;
}

export default function ProjectIntroSection({ mode }: ProjectIntroSectionProps) {
    return (
        <section
            className="relative w-full flex flex-col items-center justify-center text-center px-6 overflow-hidden"
            style={{
                minHeight: '100vh',
                background: 'var(--bg-primary)',
            }}
        >
            {/* Subtle radial glow behind the title */}
            <div
                className="absolute pointer-events-none"
                style={{
                    width: 500,
                    height: 500,
                    borderRadius: '50%',
                    background: `radial-gradient(circle, ${mode.themeColor}12 0%, transparent 70%)`,
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                }}
            />

            {/* Role tag */}
            <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
                style={{
                    fontSize: 11,
                    letterSpacing: 5,
                    textTransform: 'uppercase',
                    color: mode.themeColor,
                    fontWeight: 600,
                    fontFamily: 'monospace',
                    marginBottom: 18,
                }}
            >
                {mode.role}
            </motion.p>

            {/* Project Title */}
            <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.25, ease: 'easeOut' }}
                className="text-5xl md:text-7xl lg:text-8xl font-black leading-none text-center"
                style={{ color: 'var(--text-primary)' }}
            >
                {mode.name}
            </motion.h1>

            {/* Decorative accent line */}
            <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.5, delay: 0.55, ease: 'easeOut' }}
                style={{
                    height: 2,
                    width: 60,
                    background: mode.themeColor,
                    borderRadius: 2,
                    marginTop: 20,
                    marginBottom: 16,
                    transformOrigin: 'center',
                }}
            />

            {/* Sub-heading */}
            <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5, ease: 'easeOut' }}
                className="text-lg md:text-xl text-center max-w-md"
                style={{ color: 'var(--text-secondary)' }}
            >
                {mode.subName}
            </motion.p>

            {/* Tech stack pills */}
            <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7, ease: 'easeOut' }}
                className="flex flex-wrap gap-2 justify-center mt-6 max-w-md"
            >
                {mode.techStack.map((tech, i) => (
                    <motion.span
                        key={tech}
                        initial={{ opacity: 0, scale: 0.85 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.35, delay: 0.75 + i * 0.07, ease: 'easeOut' }}
                        className="px-3.5 py-1 rounded-full text-xs font-medium"
                        style={{
                            color: 'var(--text-primary)',
                            background: `${mode.themeColor}18`,
                            border: `1px solid ${mode.themeColor}45`,
                        }}
                    >
                        {tech}
                    </motion.span>
                ))}
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                className="absolute bottom-10 flex flex-col items-center gap-2"
            >
                <span
                    className="text-[10px] uppercase tracking-[3px] font-mono"
                    style={{ color: 'var(--text-secondary)' }}
                >
                    Scroll to explore
                </span>
                <motion.div
                    animate={{ y: [0, 6, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                    style={{
                        width: 1,
                        height: 20,
                        background: `linear-gradient(to bottom, ${mode.themeColor}60, transparent)`,
                    }}
                />
            </motion.div>
        </section>
    );
}
