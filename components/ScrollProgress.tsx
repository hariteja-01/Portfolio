'use client';

import { useScroll, useSpring, motion } from 'framer-motion';

export default function ScrollProgress() {
    const { scrollYProgress } = useScroll();
    const scaleY = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    });

    return (
        <div
            className="fixed right-0 top-0 z-40 hidden md:block"
            style={{
                width: 3,
                height: '100vh',
                background: 'var(--border-color)',
            }}
        >
            <motion.div
                style={{
                    scaleY,
                    transformOrigin: 'top',
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(to bottom, #00F0FF, #8B5CF6, #FF6B35)',
                    borderRadius: 2,
                }}
            />
        </div>
    );
}
