'use client';

import { motion } from 'framer-motion';

interface AnimatedSectionDividerProps {
    color?: string;
}

export default function AnimatedSectionDivider({
    color = '#00F0FF',
}: AnimatedSectionDividerProps) {
    return (
        <div className="py-8 flex justify-center items-center" aria-hidden="true">
            <div className="relative w-full max-w-2xl h-px overflow-visible">
                {/* Base glow line */}
                <div
                    className="absolute inset-0 h-px"
                    style={{
                        background: `linear-gradient(90deg, transparent 0%, ${color}40 20%, ${color}90 50%, ${color}40 80%, transparent 100%)`,
                    }}
                />

                {/* Animated moving dot */}
                <motion.div
                    className="absolute top-1/2 -translate-y-1/2"
                    style={{
                        width: 6,
                        height: 6,
                        borderRadius: '50%',
                        background: color,
                        boxShadow: `0 0 8px 2px ${color}80`,
                    }}
                    animate={{ left: ['0%', '100%'] }}
                    transition={{
                        duration: 2.8,
                        repeat: Infinity,
                        ease: 'linear',
                        repeatDelay: 0.4,
                    }}
                />

                {/* Secondary smaller dot, offset */}
                <motion.div
                    className="absolute top-1/2 -translate-y-1/2"
                    style={{
                        width: 3,
                        height: 3,
                        borderRadius: '50%',
                        background: `${color}80`,
                        boxShadow: `0 0 4px 1px ${color}40`,
                    }}
                    animate={{ left: ['0%', '100%'] }}
                    transition={{
                        duration: 2.8,
                        repeat: Infinity,
                        ease: 'linear',
                        repeatDelay: 0.4,
                        delay: 1.4,
                    }}
                />

                {/* Left node dot */}
                <div
                    className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full"
                    style={{
                        background: color,
                        opacity: 0.4,
                    }}
                />
                {/* Right node dot */}
                <div
                    className="absolute -right-1 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full"
                    style={{
                        background: color,
                        opacity: 0.4,
                    }}
                />
            </div>
        </div>
    );
}
