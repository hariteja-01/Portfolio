'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useTheme } from '@/components/ThemeProvider';
import { useExperience } from '@/components/ExperienceContext';

interface NavbarProps {
    showProjectView?: boolean;
    onBackToPortfolio?: () => void;
}

export default function Navbar({
    showProjectView = false,
    onBackToPortfolio,
}: NavbarProps) {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('hero');
    const { theme, toggleTheme } = useTheme();
    const { experienceMode, toggleExperienceMode, soundEnabled, toggleSound } = useExperience();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 100);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Intersection observer for active section
    useEffect(() => {
        if (showProjectView) return;
        const sections = ['hero', 'about', 'projects', 'contact'];
        const observers: IntersectionObserver[] = [];

        sections.forEach((id) => {
            const el = document.getElementById(id);
            if (!el) return;
            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        setActiveSection(id);
                    }
                },
                { threshold: 0.3, rootMargin: '-80px 0px 0px 0px' }
            );
            observer.observe(el);
            observers.push(observer);
        });

        return () => observers.forEach((o) => o.disconnect());
    }, [showProjectView]);

    const navLinks = [
        { label: 'Home', href: '#hero' },
        { label: 'About', href: '#about' },
        { label: 'Projects', href: '#projects' },
        { label: 'Contact', href: '#contact' },
    ];

    const handleMobileNav = (href: string) => {
        setMobileMenuOpen(false);
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <>
            <nav
                className={`fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-between px-6 md:px-10 transition-all duration-500 ${scrolled
                    ? 'backdrop-blur-xl border-b'
                    : 'bg-transparent border-b border-transparent'
                    }`}
                style={{
                    background: scrolled ? 'var(--glass-bg)' : 'transparent',
                    borderColor: scrolled ? 'var(--glass-border)' : 'transparent',
                }}
            >
                {/* Logo - Theme aware */}
                <a href="#hero" className="flex items-center gap-1.5 group">
                    <Image
                        src={theme === 'dark' ? '/black_logo.svg' : '/l1.png'}
                        alt="HTP Logo"
                        width={40}
                        height={40}
                        className="transition-transform duration-300 group-hover:scale-110"
                        priority
                    />
                </a>

                {/* Center nav links (desktop only, VIEW 1) */}
                {!showProjectView && (
                    <div className="hidden md:flex items-center gap-6">
                        {navLinks.map((link) => (
                            <a
                                key={link.label}
                                href={link.href}
                                className="text-sm font-medium transition-colors relative"
                                style={{
                                    color:
                                        activeSection === link.href.replace('#', '')
                                            ? 'var(--text-primary)'
                                            : 'var(--text-secondary)',
                                }}
                            >
                                {link.label}
                                {activeSection === link.href.replace('#', '') && (
                                    <motion.div
                                        layoutId="nav-dot"
                                        className="w-1 h-1 rounded-full bg-[#00F0FF] mx-auto mt-1"
                                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                    />
                                )}
                            </a>
                        ))}
                    </div>
                )}

                {/* Right side controls */}
                <div className="flex items-center gap-2">

                    {/* Back button (project view - right side) */}
                    {showProjectView && onBackToPortfolio && (
                        <motion.button
                            onClick={onBackToPortfolio}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            className="hidden md:flex items-center gap-1.5 text-xs font-semibold tracking-wide uppercase px-4 py-2 rounded-full transition-all duration-300 mr-1"
                            style={{
                                color: '#00F0FF',
                                background: 'rgba(0,240,255,0.06)',
                                border: '1px solid rgba(0,240,255,0.2)',
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background = 'rgba(0,240,255,0.12)';
                                e.currentTarget.style.borderColor = 'rgba(0,240,255,0.45)';
                                e.currentTarget.style.boxShadow = '0 0 18px rgba(0,240,255,0.15)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = 'rgba(0,240,255,0.06)';
                                e.currentTarget.style.borderColor = 'rgba(0,240,255,0.2)';
                                e.currentTarget.style.boxShadow = 'none';
                            }}
                        >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="19" y1="12" x2="5" y2="12" />
                                <polyline points="12 19 5 12 12 5" />
                            </svg>
                            Portfolio
                        </motion.button>
                    )}

                    {/* Experience Mode Toggle (Cinematic ↔ Minimal) */}
                    <motion.button
                        onClick={toggleExperienceMode}
                        title={experienceMode === 'cinematic' ? 'Switch to Minimal Mode' : 'Switch to Cinematic Mode'}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300"
                        style={{
                            background: experienceMode === 'cinematic'
                                ? 'rgba(0,240,255,0.08)'
                                : 'rgba(255,255,255,0.05)',
                            border: experienceMode === 'cinematic'
                                ? '1px solid rgba(0,240,255,0.25)'
                                : '1px solid var(--glass-border)',
                            color: experienceMode === 'cinematic' ? '#00F0FF' : 'var(--text-secondary)',
                        }}
                        aria-label={`Experience mode: ${experienceMode}`}
                    >
                        {experienceMode === 'cinematic' ? (
                            <>
                                {/* Film icon */}
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="2" y="2" width="20" height="20" rx="3" />
                                    <path d="M7 2v20M17 2v20M2 12h20M2 7h5M17 7h5M2 17h5M17 17h5" />
                                </svg>
                                <span className="hidden md:inline">Cinematic</span>
                            </>
                        ) : (
                            <>
                                {/* Bolt icon */}
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                                </svg>
                                <span className="hidden md:inline">Minimal</span>
                            </>
                        )}
                    </motion.button>

                    {/* Sound Toggle — ambient music */}
                    <motion.button
                        onClick={toggleSound}
                        title={soundEnabled ? 'Stop ambient music' : 'Play ambient music'}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="hidden sm:flex w-8 h-8 items-center justify-center rounded-full transition-all"
                        style={{
                            background: soundEnabled ? 'rgba(139,92,246,0.1)' : 'transparent',
                            border: soundEnabled ? '1px solid rgba(139,92,246,0.3)' : '1px solid transparent',
                            color: soundEnabled ? '#8B5CF6' : 'var(--text-secondary)',
                        }}
                        aria-label={soundEnabled ? 'Stop ambient music' : 'Play ambient music'}
                    >
                        {soundEnabled ? (
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                                <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                                <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                            </svg>
                        ) : (
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                                <line x1="23" y1="9" x2="17" y2="15" />
                                <line x1="17" y1="9" x2="23" y2="15" />
                            </svg>
                        )}
                    </motion.button>

                    {/* Theme toggle */}
                    <button
                        onClick={toggleTheme}
                        className="w-9 h-9 rounded-full flex items-center justify-center transition-colors"
                        style={{ background: 'transparent' }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'var(--glass-bg)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'transparent';
                        }}
                        aria-label="Toggle theme"
                    >
                        <motion.div
                            animate={{ rotate: theme === 'light' ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            {theme === 'dark' ? (
                                <svg
                                    width="18"
                                    height="18"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="var(--text-secondary)"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                                </svg>
                            ) : (
                                <svg
                                    width="18"
                                    height="18"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="var(--text-secondary)"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <circle cx="12" cy="12" r="5" />
                                    <line x1="12" y1="1" x2="12" y2="3" />
                                    <line x1="12" y1="21" x2="12" y2="23" />
                                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                                    <line x1="1" y1="12" x2="3" y2="12" />
                                    <line x1="21" y1="12" x2="23" y2="12" />
                                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                                </svg>
                            )}
                        </motion.div>
                    </button>

                    {/* Download CV */}
                    <a
                        href="/resume.pdf"
                        download
                        className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-all duration-300"
                        style={{
                            color: 'var(--text-primary)',
                            border: '1px solid var(--border-color)',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = '#00F0FF';
                            e.currentTarget.style.boxShadow = '0 0 15px rgba(0,240,255,0.3)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = 'var(--border-color)';
                            e.currentTarget.style.boxShadow = 'none';
                        }}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                            <polyline points="7 10 12 15 17 10" />
                            <line x1="12" y1="15" x2="12" y2="3" />
                        </svg>
                        <span className="hidden md:inline">Download CV</span>
                    </a>

                    {/* Mobile hamburger */}
                    <button
                        className="md:hidden w-9 h-9 flex flex-col items-center justify-center gap-1.5"
                        onClick={() => setMobileMenuOpen(true)}
                        aria-label="Open menu"
                    >
                        <span className="w-5 h-0.5 rounded-full" style={{ background: 'var(--text-primary)' }} />
                        <span className="w-5 h-0.5 rounded-full" style={{ background: 'var(--text-primary)' }} />
                        <span className="w-3.5 h-0.5 rounded-full" style={{ background: 'var(--text-primary)' }} />
                    </button>
                </div>
            </nav>

            {/* Mobile menu overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-[60] flex flex-col items-center justify-center"
                        style={{
                            background: 'var(--bg-primary)',
                            backdropFilter: 'blur(40px)',
                        }}
                    >
                        {/* Close button */}
                        <button
                            className="absolute top-4 right-6 w-9 h-9 flex items-center justify-center text-2xl"
                            onClick={() => setMobileMenuOpen(false)}
                            style={{ color: 'var(--text-primary)' }}
                            aria-label="Close menu"
                        >
                            ✕
                        </button>
                        {/* Links */}
                        <div className="flex flex-col items-center gap-8">
                            {navLinks.map((link, i) => (
                                <motion.button
                                    key={link.label}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1, duration: 0.3 }}
                                    className="text-2xl font-medium"
                                    style={{ color: 'var(--text-primary)' }}
                                    onClick={() => handleMobileNav(link.href)}
                                >
                                    {link.label}
                                </motion.button>
                            ))}
                            {showProjectView && onBackToPortfolio && (
                                <motion.button
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4, duration: 0.3 }}
                                    className="text-lg font-medium"
                                    style={{ color: '#00F0FF' }}
                                    onClick={() => {
                                        setMobileMenuOpen(false);
                                        onBackToPortfolio();
                                    }}
                                >
                                    ← Back to Portfolio
                                </motion.button>
                            )}
                            {/* Mobile mode toggles */}
                            <div className="flex gap-4 mt-4">
                                <button
                                    onClick={() => { toggleExperienceMode(); setMobileMenuOpen(false); }}
                                    className="px-4 py-2 rounded-full text-sm"
                                    style={{
                                        background: 'var(--glass-bg)',
                                        border: '1px solid var(--glass-border)',
                                        color: experienceMode === 'cinematic' ? '#00F0FF' : 'var(--text-secondary)',
                                    }}
                                >
                                    {experienceMode === 'cinematic' ? '🎬 Cinematic' : '⚡ Minimal'}
                                </button>
                                <button
                                    onClick={() => { toggleSound(); }}
                                    className="px-4 py-2 rounded-full text-sm"
                                    style={{
                                        background: 'var(--glass-bg)',
                                        border: `1px solid ${soundEnabled ? 'rgba(139,92,246,0.3)' : 'var(--glass-border)'}`,
                                        color: soundEnabled ? '#8B5CF6' : 'var(--text-secondary)',
                                    }}
                                >
                                    {soundEnabled ? '🔊 Sound' : '🔇 Muted'}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
