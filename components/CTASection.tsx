'use client';

import { motion } from 'framer-motion';
import { PortfolioMode } from '@/data/portfolio';
import { profile } from '@/data/portfolio';

interface CTASectionProps {
    mode: PortfolioMode;
    onNextProject: () => void;
    isLast?: boolean;
}

export default function CTASection({
    mode,
    onNextProject,
    isLast,
}: CTASectionProps) {
    return (
        <motion.section
            className="py-24 px-6 max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.3 }}
        >
            {/* Tagline */}
            <p className="text-xl italic mb-8" style={{ color: 'var(--text-secondary)' }}>
                {mode.ctaSection.tagline}
            </p>

            {/* Highlights */}
            <div className="flex flex-wrap justify-center gap-3">
                {mode.ctaSection.highlights.map((h) => (
                    <span
                        key={h}
                        className="rounded-full px-4 py-2 text-sm border"
                        style={{ borderColor: mode.themeColor, color: mode.themeColor }}
                    >
                        {h}
                    </span>
                ))}
            </div>

            {/* Primary CTA */}
            <a
                href={mode.ctaSection.primaryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-2 text-white font-bold rounded-full px-8 py-4 text-lg hover:scale-105 transition-transform duration-300"
                style={{ background: mode.gradient }}
            >
                {mode.ctaSection.primaryText}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                </svg>
            </a>

            {/* Secondary links */}
            <div className="mt-6 flex gap-6 justify-center">
                <a
                    href={profile.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors text-sm"
                    style={{ color: 'var(--text-secondary)' }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--text-primary)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-secondary)'; }}
                >
                    GitHub
                </a>
                <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors text-sm"
                    style={{ color: 'var(--text-secondary)' }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--text-primary)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-secondary)'; }}
                >
                    LinkedIn
                </a>
                <a
                    href={`mailto:${profile.email}`}
                    className="transition-colors text-sm"
                    style={{ color: 'var(--text-secondary)' }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--text-primary)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-secondary)'; }}
                >
                    Email
                </a>
            </div>

            {/* Next Project */}
            {!isLast && (
                <button
                    onClick={onNextProject}
                    className="mt-16 text-2xl font-bold cursor-pointer hover:transition-colors duration-300 group"
                    style={{ color: 'var(--text-primary)', borderBottom: `2px solid ${mode.themeColor}` }}
                    onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.color = mode.themeColor;
                    }}
                    onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.color = 'var(--text-primary)';
                    }}
                >
                    Next Project →
                </button>
            )}
        </motion.section>
    );
}
