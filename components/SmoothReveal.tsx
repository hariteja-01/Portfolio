'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface SmoothRevealProps {
    children: ReactNode;
    direction?: 'up' | 'down' | 'left' | 'right';
    delay?: number;
    className?: string;
}

export default function SmoothReveal({
    children,
    direction = 'up',
    delay = 0,
    className = '',
}: SmoothRevealProps) {
    const offsets = {
        up: { y: 30, x: 0 },
        down: { y: -30, x: 0 },
        left: { y: 0, x: 30 },
        right: { y: 0, x: -30 },
    };

    const offset = offsets[direction];

    return (
        <motion.div
            className={className}
            initial={{ opacity: 0, y: offset.y, x: offset.x }}
            whileInView={{ opacity: 1, y: 0, x: 0 }}
            transition={{
                duration: 0.6,
                delay,
                ease: [0.25, 0.1, 0.25, 1],
            }}
            viewport={{ once: true, amount: 0.2 }}
        >
            {children}
        </motion.div>
    );
}
