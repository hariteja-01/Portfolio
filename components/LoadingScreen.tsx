'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';

// Dynamically import Lottie to avoid SSR issues
const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

// Import Loading animation
import loadingAnimation from '@/public/Loading.json';

// Inspiring quotations
const quotations = [
    "Code is poetry written in logic.",
    "Simplicity is the ultimate sophistication.",
    "First, solve the problem. Then, write the code.",
];

export default function LoadingScreen() {
    const [isLoading, setIsLoading] = useState(true);
    const [isFadingOut, setIsFadingOut] = useState(false);
    const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

    useEffect(() => {
        // Cycle through quotes every 1.5 seconds
        const quoteTimer = setInterval(() => {
            setCurrentQuoteIndex((prev) => (prev + 1) % quotations.length);
        }, 1500);

        // Start fade out after 4 seconds
        const fadeTimer = setTimeout(() => {
            setIsFadingOut(true);
        }, 4000);

        // Complete exit after 5 seconds (4s display + 1s fade)
        const exitTimer = setTimeout(() => {
            setIsLoading(false);
        }, 5000);

        return () => {
            clearInterval(quoteTimer);
            clearTimeout(fadeTimer);
            clearTimeout(exitTimer);
        };
    }, []);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    animate={{ opacity: isFadingOut ? 0 : 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
                    className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden"
                    style={{ background: 'var(--bg-primary)' }}
                >
                    {/* Subtle gradient background overlay */}
                    <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                            background: 'radial-gradient(circle at 50% 50%, rgba(0,240,255,0.03) 0%, transparent 60%)',
                        }}
                    />

                    {/* Lottie Animation Container */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                        className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96"
                    >
                        {/* Glow effect behind animation */}
                        <div
                            className="absolute inset-0 rounded-full blur-3xl opacity-30"
                            style={{
                                background: 'linear-gradient(135deg, #00F0FF 0%, #8B5CF6 50%, #FF6B35 100%)',
                                transform: 'scale(0.6)',
                            }}
                        />
                        
                        {/* Lottie Player */}
                        <div className="relative z-10 w-full h-full flex items-center justify-center lottie-loading-container">
                            <Lottie
                                animationData={loadingAnimation}
                                loop={true}
                                autoplay={true}
                                style={{ width: '100%', height: '100%' }}
                            />
                        </div>
                    </motion.div>

                    {/* Scrolling Quotations */}
                    <div className="mt-8 h-16 overflow-hidden relative w-full max-w-md px-6">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentQuoteIndex}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -30 }}
                                transition={{ 
                                    duration: 0.5, 
                                    ease: [0.4, 0, 0.2, 1] 
                                }}
                                className="text-center"
                            >
                                {/* Opening quotation mark */}
                                <span
                                    className="text-3xl font-serif leading-none inline-block mr-1"
                                    style={{ 
                                        color: '#00F0FF',
                                        opacity: 0.6,
                                        verticalAlign: 'top',
                                    }}
                                >
                                    &ldquo;
                                </span>
                                
                                {/* Quote text */}
                                <span
                                    className="text-sm md:text-base italic"
                                    style={{ color: 'var(--text-secondary)' }}
                                >
                                    {quotations[currentQuoteIndex]}
                                </span>
                                
                                {/* Closing quotation mark */}
                                <span
                                    className="text-3xl font-serif leading-none inline-block ml-1"
                                    style={{ 
                                        color: '#8B5CF6',
                                        opacity: 0.6,
                                        verticalAlign: 'bottom',
                                    }}
                                >
                                    &rdquo;
                                </span>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Subtle progress indicator */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.4 }}
                        transition={{ delay: 0.5 }}
                        className="absolute bottom-10 flex items-center gap-2"
                    >
                        {quotations.map((_, i) => (
                            <motion.div
                                key={i}
                                className="w-1.5 h-1.5 rounded-full transition-all duration-300"
                                style={{
                                    background: i === currentQuoteIndex 
                                        ? 'linear-gradient(135deg, #00F0FF, #8B5CF6)' 
                                        : 'var(--border-color)',
                                    transform: i === currentQuoteIndex ? 'scale(1.3)' : 'scale(1)',
                                }}
                            />
                        ))}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
