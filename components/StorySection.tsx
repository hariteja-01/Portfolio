'use client';

import { motion } from 'framer-motion';
import { PortfolioMode } from '@/data/portfolio';

interface StorySectionProps {
    mode: PortfolioMode;
}

export default function StorySection({ mode }: StorySectionProps) {
    return (
        <motion.section
            className="py-24 px-6 max-w-4xl mx-auto"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.3 }}
        >
            <div
                className="pl-8"
                style={{ borderLeft: `4px solid ${mode.themeColor}` }}
            >
                <h3 className="text-2xl md:text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>
                    {mode.storySection.title}
                </h3>
                <p className="text-lg leading-relaxed mt-4" style={{ color: 'var(--text-secondary)' }}>
                    {mode.storySection.description}
                </p>
            </div>
        </motion.section>
    );
}
