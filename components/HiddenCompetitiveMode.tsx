'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useExperience } from '@/components/ExperienceContext';

// Algorithm symbols that float in competitive mode
const ALGO_SYMBOLS = [
    'O(n log n)', 'O(1)', 'BFS', 'DFS', 'DP', 'MST', 'NP', 'FFT',
    'Θ(n²)', 'Ω(log n)', 'KMP', 'Trie', 'DAG', 'LCS', 'SCC', 'KD',
    '∑', 'Δ', 'π', '∞', '≡', '∈', '∉', '⊆', '∩', '∪',
    'while', 'for', 'if()', 'O(n!)', 'QuickSort', 'HeapSort',
];

interface FloatingSymbol {
    id: number;
    symbol: string;
    x: number;
    y: number;
    size: number;
    delay: number;
    color: string;
}

const COLORS = ['#00F0FF', '#8B5CF6', '#FF6B35', '#4ADE80', '#FFB74D'];

function generateSymbols(): FloatingSymbol[] {
    return Array.from({ length: 22 }, (_, i) => ({
        id: i,
        symbol: ALGO_SYMBOLS[Math.floor(Math.random() * ALGO_SYMBOLS.length)],
        x: Math.random() * 90 + 5,
        y: Math.random() * 80 + 10,
        size: Math.random() * 12 + 10,
        delay: Math.random() * 1.5,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
    }));
}

export default function HiddenCompetitiveMode() {
    const { setCompetitiveMode, competitiveModeActive } = useExperience();
    const bufferRef = useRef('');
    const [symbols] = useState<FloatingSymbol[]>(generateSymbols);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    // Listen for keystrokes - detect "DSA"
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            // Skip when typing in inputs
            if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;

            bufferRef.current = (bufferRef.current + e.key).slice(-3);
            if (bufferRef.current.toUpperCase() === 'DSA') {
                bufferRef.current = '';
                setCompetitiveMode(true);
                // Auto-dismiss after 5s
                if (timerRef.current) clearTimeout(timerRef.current);
                timerRef.current = setTimeout(() => setCompetitiveMode(false), 5000);
            }
        };

        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [setCompetitiveMode]);

    return (
        <AnimatePresence>
            {competitiveModeActive && (
                <motion.div
                    key="competitive-overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="fixed inset-0 z-[100] pointer-events-none overflow-hidden"
                    aria-hidden="true"
                >
                    {/* Glitch scanline overlay */}
                    <motion.div
                        className="absolute inset-0"
                        style={{
                            background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,240,255,0.015) 2px, rgba(0,240,255,0.015) 4px)',
                        }}
                        animate={{
                            y: ['0%', '100%'],
                        }}
                        transition={{
                            duration: 0.8,
                            repeat: Infinity,
                            ease: 'linear',
                        }}
                    />

                    {/* Corner label */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="absolute top-20 left-8 font-mono text-xs"
                        style={{ color: '#00F0FF', letterSpacing: '0.2em' }}
                    >
                        // COMPETITIVE_MODE: ACTIVE
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="absolute top-20 right-8 font-mono text-xs"
                        style={{ color: '#8B5CF6', letterSpacing: '0.1em' }}
                    >
                        LeetCode: 900+ 🔥
                    </motion.div>

                    {/* Floating algorithm symbols */}
                    {symbols.map((sym) => (
                        <motion.div
                            key={sym.id}
                            className="absolute font-mono font-bold select-none"
                            style={{
                                left: `${sym.x}%`,
                                top: `${sym.y}%`,
                                fontSize: sym.size,
                                color: sym.color,
                                opacity: 0.65,
                            }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{
                                opacity: [0, 0.65, 0.65, 0],
                                y: [20, 0, -10, -30],
                            }}
                            transition={{
                                duration: 3.5,
                                delay: sym.delay,
                                ease: 'easeOut',
                            }}
                        >
                            {sym.symbol}
                        </motion.div>
                    ))}

                    {/* Glitch flicker on edges */}
                    <motion.div
                        className="absolute inset-x-0 top-0 h-0.5"
                        style={{ background: '#00F0FF' }}
                        animate={{ scaleX: [1, 0.3, 1, 0.7, 1], opacity: [1, 0.4, 1, 0.6, 1] }}
                        transition={{ duration: 0.4, repeat: Infinity }}
                    />
                    <motion.div
                        className="absolute inset-x-0 bottom-0 h-0.5"
                        style={{ background: '#8B5CF6' }}
                        animate={{ scaleX: [1, 0.5, 1, 0.2, 1], opacity: [1, 0.5, 1, 0.3, 1] }}
                        transition={{ duration: 0.5, repeat: Infinity, delay: 0.2 }}
                    />

                    {/* Dismiss hint */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.5 }}
                        transition={{ delay: 1 }}
                        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-xs font-mono"
                        style={{ color: 'var(--text-secondary)' }}
                    >
                        Auto-dismissing…
                    </motion.p>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
