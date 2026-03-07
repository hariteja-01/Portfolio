'use client';

import { useScroll, useTransform, motion } from 'framer-motion';
import { PortfolioMode } from '@/data/portfolio';

interface ScrollTextOverlaysProps {
    mode: PortfolioMode;
    scrollWrapperRef: React.RefObject<HTMLDivElement>;
}

export default function ScrollTextOverlays({
    mode,
    scrollWrapperRef,
}: ScrollTextOverlaysProps) {
    const { scrollYProgress } = useScroll({
        target: scrollWrapperRef,
        offset: ['start start', 'end end'],
    });

    /* ── Intro sequence: 0% - 12% of scroll ──────────────────────────── */
    // Role tag fades in first
    const introRoleOpacity = useTransform(
        scrollYProgress,
        [0, 0.01, 0.08, 0.11],
        [0, 1, 1, 0]
    );
    const introRoleY = useTransform(
        scrollYProgress,
        [0, 0.01, 0.08, 0.11],
        [15, 0, 0, -10]
    );

    // Title fades in slightly after role
    const introTitleOpacity = useTransform(
        scrollYProgress,
        [0, 0.015, 0.08, 0.11],
        [0, 1, 1, 0]
    );
    const introTitleY = useTransform(
        scrollYProgress,
        [0, 0.015, 0.08, 0.11],
        [25, 0, 0, -10]
    );

    // Subheading fades in after title
    const introSubOpacity = useTransform(
        scrollYProgress,
        [0.005, 0.025, 0.08, 0.11],
        [0, 1, 1, 0]
    );
    const introSubY = useTransform(
        scrollYProgress,
        [0.005, 0.025, 0.08, 0.11],
        [20, 0, 0, -10]
    );

    // Skills fade in last
    const introSkillsOpacity = useTransform(
        scrollYProgress,
        [0.01, 0.035, 0.08, 0.11],
        [0, 1, 1, 0]
    );
    const introSkillsY = useTransform(
        scrollYProgress,
        [0.01, 0.035, 0.08, 0.11],
        [20, 0, 0, -10]
    );

    // Decorative line under title
    const introLineScale = useTransform(
        scrollYProgress,
        [0.01, 0.03, 0.08, 0.11],
        [0, 1, 1, 0]
    );

    /* ── Scroll text sections (after intro fades out) ────────────────── */
    // Section 1: 0.14 to 0.28
    const s1Opacity = useTransform(
        scrollYProgress,
        [0.14, 0.18, 0.24, 0.28],
        [0, 1, 1, 0]
    );

    // Section 2: 0.32 to 0.48
    const s2Opacity = useTransform(
        scrollYProgress,
        [0.32, 0.36, 0.44, 0.48],
        [0, 1, 1, 0]
    );

    // Section 3: 0.52 to 0.68
    const s3Opacity = useTransform(
        scrollYProgress,
        [0.52, 0.56, 0.64, 0.68],
        [0, 1, 1, 0]
    );

    // Section 4: 0.72 to 0.88
    const s4Opacity = useTransform(
        scrollYProgress,
        [0.72, 0.76, 0.84, 0.88],
        [0, 1, 1, 0]
    );

    const textShadow = '0 2px 20px rgba(0,0,0,0.8)';

    const sections = [
        { data: mode.section1, opacity: s1Opacity },
        { data: mode.section2, opacity: s2Opacity },
        { data: mode.section3, opacity: s3Opacity },
        { data: mode.section4, opacity: s4Opacity },
    ];

    return (
        <div
            style={{
                position: 'sticky',
                top: 0,
                height: '100vh',
                width: '100%',
                pointerEvents: 'none',
                zIndex: 5,
                marginTop: '-100vh',
            }}
        >
            {/* ── Intro Sequence ─────────────────────────────────────────── */}
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '0 24px',
                }}
            >
                {/* Role tag */}
                <motion.p
                    style={{
                        opacity: introRoleOpacity,
                        y: introRoleY,
                        fontSize: 11,
                        letterSpacing: 5,
                        textTransform: 'uppercase',
                        color: mode.themeColor,
                        fontWeight: 600,
                        fontFamily: 'monospace',
                        marginBottom: 16,
                    }}
                >
                    {mode.role}
                </motion.p>

                {/* Project Title */}
                <motion.h1
                    style={{
                        opacity: introTitleOpacity,
                        y: introTitleY,
                        textShadow: '0 4px 30px rgba(0,0,0,0.9)',
                    }}
                    className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-none text-center"
                >
                    {mode.name}
                </motion.h1>

                {/* Decorative line */}
                <motion.div
                    style={{
                        scaleX: introLineScale,
                        opacity: introLineScale,
                        height: 2,
                        width: 60,
                        background: mode.themeColor,
                        borderRadius: 2,
                        marginTop: 16,
                        marginBottom: 14,
                        transformOrigin: 'center',
                    }}
                />

                {/* Sub-heading */}
                <motion.p
                    style={{
                        opacity: introSubOpacity,
                        y: introSubY,
                        textShadow: '0 2px 16px rgba(0,0,0,0.7)',
                    }}
                    className="text-lg md:text-xl text-white/90 text-center max-w-md"
                >
                    {mode.subName}
                </motion.p>

                {/* Tech stack pills */}
                <motion.div
                    style={{
                        opacity: introSkillsOpacity,
                        y: introSkillsY,
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: 8,
                        justifyContent: 'center',
                        marginTop: 20,
                        maxWidth: 420,
                    }}
                >
                    {mode.techStack.map((tech) => (
                        <span
                            key={tech}
                            style={{
                                padding: '4px 14px',
                                borderRadius: 999,
                                fontSize: 11,
                                fontWeight: 500,
                                letterSpacing: 0.5,
                                color: mode.themeColor,
                                background: `${mode.themeColor}18`,
                                border: `1px solid ${mode.themeColor}40`,
                                backdropFilter: 'blur(8px)',
                            }}
                        >
                            {tech}
                        </span>
                    ))}
                </motion.div>
            </div>

            {/* ── Scroll Text Sections ───────────────────────────────────── */}
            {sections.map((section, i) => (
                <motion.div
                    key={i}
                    style={{
                        opacity: section.opacity,
                        position: 'absolute',
                        inset: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '0 24px',
                    }}
                >
                    <h2
                        className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-tight text-center"
                        style={{ textShadow }}
                    >
                        {section.data.title}
                    </h2>
                    {section.data.subtitle && (
                        <p
                            className="text-lg md:text-xl text-white/90 mt-4 max-w-xl text-center"
                            style={{ textShadow }}
                        >
                            {section.data.subtitle}
                        </p>
                    )}
                </motion.div>
            ))}
        </div>
    );
}
