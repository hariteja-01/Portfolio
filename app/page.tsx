'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { portfolioModes } from '@/data/portfolio';
import CanvasScrollAnimation from '@/components/CanvasScrollAnimation';
import ProjectIntroSection from '@/components/ProjectIntroSection';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProjectDetails from '@/components/ProjectDetails';
import StorySection from '@/components/StorySection';
import CTASection from '@/components/CTASection';
import ContactSection from '@/components/ContactSection';
import ModeNavigation from '@/components/ModeNavigation';
import ArrowNavigation from '@/components/ArrowNavigation';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import SkillsSection from '@/components/sections/SkillsSection';
import ProjectCardStack from '@/components/sections/ProjectCardStack';
import TrainingSection from '@/components/sections/TrainingSection';
import ImpactMetricsSection from '@/components/sections/ImpactMetricsSection';
import EngineeringPhilosophySection from '@/components/sections/EngineeringPhilosophySection';
import CertificationSection from '@/components/sections/CertificationSection';
import AchievementsSection from '@/components/sections/AchievementsSection';
import CustomCursor from '@/components/CustomCursor';
import LoadingScreen from '@/components/LoadingScreen';
import ScrollProgress from '@/components/ScrollProgress';
import AnimatedSectionDivider from '@/components/AnimatedSectionDivider';
import SoundManager, { playTransition } from '@/components/SoundManager';
import HiddenCompetitiveMode from '@/components/HiddenCompetitiveMode';
import { useExperience } from '@/components/ExperienceContext';

type ViewState = 'landing' | 'deepdive';

// Base page title
const BASE_TITLE = 'Hari Teja Patnala | SDE, ML Engineer, AI Architect';

export default function Home() {
    const [viewState, setViewState] = useState<ViewState>('landing');
    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollWrapperRef = useRef<HTMLDivElement>(null);
    const currentMode = portfolioModes[currentIndex];
    const { experienceMode, soundEnabled } = useExperience();

    // Always start at top on hard refresh or page restore.
    useEffect(() => {
        if ('scrollRestoration' in window.history) {
            window.history.scrollRestoration = 'manual';
        }

        const resetScroll = () => {
            window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
        };

        resetScroll();
        window.addEventListener('pageshow', resetScroll);

        return () => {
            window.removeEventListener('pageshow', resetScroll);
        };
    }, []);

    // ── Dynamic page title ──────────────────────────────────────────────
    useEffect(() => {
        if (viewState === 'deepdive') {
            document.title = `${currentMode.name} - ${currentMode.subName} | Hari Teja Patnala`;
        } else {
            document.title = BASE_TITLE;
        }
    }, [viewState, currentMode]);

    // ── View handlers ───────────────────────────────────────────────────
    const handleProjectSelect = useCallback((index: number) => {
        setCurrentIndex(index);
        setViewState('deepdive');
        if (soundEnabled) playTransition();
        window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    }, [soundEnabled]);

    const handleBackToPortfolio = useCallback(() => {
        setViewState('landing');
        window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    }, []);

    const goNext = useCallback(() => {
        setCurrentIndex((prev) => (prev + 1) % portfolioModes.length);
        if (soundEnabled) playTransition();
        window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    }, [soundEnabled]);

    const goPrev = useCallback(() => {
        setCurrentIndex(
            (prev) => (prev - 1 + portfolioModes.length) % portfolioModes.length
        );
        window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    }, []);

    const goTo = useCallback((index: number) => {
        setCurrentIndex(index);
        window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    }, []);

    useEffect(() => {
        document.body.style.background = 'var(--bg-primary)';
        return () => {
            document.body.style.background = 'var(--bg-primary)';
        };
    }, [currentIndex, viewState]);

    const isProjectView = viewState === 'deepdive';

    return (
        <main>
            <LoadingScreen />
            <CustomCursor />
            <ScrollProgress />
            <SoundManager />
            <HiddenCompetitiveMode />

            <Navbar
                showProjectView={isProjectView}
                onBackToPortfolio={handleBackToPortfolio}
            />

            <AnimatePresence mode="wait">
                {viewState === 'landing' && (
                    /* ── VIEW 1: Landing ─────────────────────────────────────────── */
                    <motion.div
                        key="landing"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4 }}
                    >
                        <HeroSection />

                        <AnimatedSectionDivider color="#00F0FF" />
                        <AboutSection />

                        <AnimatedSectionDivider color="#FF6B35" />
                        <SkillsSection />

                        <AnimatedSectionDivider color="#00F0FF" />
                        <ProjectCardStack onProjectSelect={handleProjectSelect} />

                        <AnimatedSectionDivider color="#8B5CF6" />
                        <ImpactMetricsSection />

                        <AnimatedSectionDivider color="#FF6B35" />
                        <TrainingSection />

                        <AnimatedSectionDivider color="#8B5CF6" />
                        <CertificationSection />

                        <AnimatedSectionDivider color="#00F0FF" />
                        <AchievementsSection />

                        <AnimatedSectionDivider color="#FF6B35" />
                        <EngineeringPhilosophySection />

                        <AnimatedSectionDivider color="#8B5CF6" />
                        <ContactSection />
                        <Footer />
                    </motion.div>
                )}

                {viewState === 'deepdive' && (
                    /* ── VIEW 3: Full Project Deep Dive ─────────────────────────── */
                    <motion.div
                        key={`deepdive-${currentMode.id}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4 }}
                    >
                        {/* Project Intro - appears before the frames */}
                        <ProjectIntroSection mode={currentMode} />

                        {/* Canvas Scroll Animation - hidden in Minimal mode */}
                        <div
                            ref={scrollWrapperRef}
                            style={{ height: '500vh', position: 'relative' }}
                            className={experienceMode === 'minimal' ? 'canvas-scroll-heavy' : ''}
                        >
                            {experienceMode === 'cinematic' && (
                                <CanvasScrollAnimation
                                    folderPath={currentMode.folderPath}
                                    frameCount={currentMode.frameCount}
                                    themeColor={currentMode.themeColor}
                                    scrollWrapperRef={scrollWrapperRef}
                                />
                            )}

                            {/* Minimal mode: clean project header instead */}
                            {experienceMode === 'minimal' && (
                                <div
                                    className="sticky top-0 w-full flex flex-col items-center justify-center text-center px-6"
                                    style={{ height: '100vh' }}
                                >
                                    <p className="text-xs uppercase tracking-widest mb-4 font-mono" style={{ color: currentMode.themeColor }}>
                                        {currentMode.subName}
                                    </p>
                                    <h1 className="text-5xl md:text-7xl font-black mb-6" style={{ color: 'var(--text-primary)' }}>
                                        {currentMode.name}
                                    </h1>
                                    <p className="text-lg max-w-lg" style={{ color: 'var(--text-secondary)' }}>
                                        {currentMode.detailsSection.description.slice(0, 160)}...
                                    </p>
                                    <div className="flex gap-3 flex-wrap justify-center mt-6">
                                        {currentMode.techStack.map((tech) => (
                                            <span
                                                key={tech}
                                                className="px-3 py-1 rounded-full text-xs font-medium"
                                                style={{
                                                    background: `${currentMode.themeColor}15`,
                                                    border: `1px solid ${currentMode.themeColor}30`,
                                                    color: currentMode.themeColor,
                                                }}
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Content Sections */}
                        <ProjectDetails mode={currentMode} />
                        <StorySection mode={currentMode} />
                        <CTASection
                            mode={currentMode}
                            onNextProject={goNext}
                            isLast={currentIndex === portfolioModes.length - 1}
                        />
                        <ContactSection />
                        <Footer />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Fixed Navigation (only in deep dive) */}
            {viewState === 'deepdive' && (
                <>
                    <ModeNavigation
                        modes={portfolioModes}
                        currentIndex={currentIndex}
                        onSelect={goTo}
                    />
                    <ArrowNavigation onPrev={goPrev} onNext={goNext} />
                </>
            )}
        </main>
    );
}
