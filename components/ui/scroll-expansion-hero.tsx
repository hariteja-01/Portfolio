'use client';

import {
    useEffect,
    useRef,
    useState,
    ReactNode,
} from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface ScrollExpandMediaProps {
    mediaType?: 'video' | 'image';
    mediaSrc: string;
    posterSrc?: string;
    bgImageSrc: string;
    title?: string;
    date?: string;
    role?: string;
    themeColor?: string;
    techStack?: string[];
    scrollToExpand?: string;
    textBlend?: boolean;
    children?: ReactNode;
}

const ScrollExpandMedia = ({
    mediaType = 'video',
    mediaSrc,
    posterSrc,
    bgImageSrc,
    title,
    date,
    role,
    themeColor = '#00F0FF',
    techStack = [],
    scrollToExpand,
    children,
}: ScrollExpandMediaProps) => {
    const [scrollProgress, setScrollProgress] = useState<number>(0);
    const [showContent, setShowContent] = useState<boolean>(false);
    const [mediaFullyExpanded, setMediaFullyExpanded] = useState<boolean>(false);
    const [touchStartY, setTouchStartY] = useState<number>(0);
    const [isMobileState, setIsMobileState] = useState<boolean>(false);

    const sectionRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        setScrollProgress(0);
        setShowContent(false);
        setMediaFullyExpanded(false);
    }, [mediaType]);

    useEffect(() => {
        const handleWheel = (e: globalThis.WheelEvent) => {
            if (mediaFullyExpanded && e.deltaY < 0 && window.scrollY <= 5) {
                setMediaFullyExpanded(false);
                e.preventDefault();
            } else if (!mediaFullyExpanded) {
                e.preventDefault();
                const scrollDelta = e.deltaY * 0.0009;
                const newProgress = Math.min(
                    Math.max(scrollProgress + scrollDelta, 0),
                    1
                );
                setScrollProgress(newProgress);

                if (newProgress >= 1) {
                    setMediaFullyExpanded(true);
                    setShowContent(true);
                } else if (newProgress < 0.75) {
                    setShowContent(false);
                }
            }
        };

        const handleTouchStart = (e: globalThis.TouchEvent) => {
            setTouchStartY(e.touches[0].clientY);
        };

        const handleTouchMove = (e: globalThis.TouchEvent) => {
            if (!touchStartY) return;

            const touchY = e.touches[0].clientY;
            const deltaY = touchStartY - touchY;

            if (mediaFullyExpanded && deltaY < -20 && window.scrollY <= 5) {
                setMediaFullyExpanded(false);
                e.preventDefault();
            } else if (!mediaFullyExpanded) {
                e.preventDefault();
                const scrollFactor = deltaY < 0 ? 0.008 : 0.005;
                const scrollDelta = deltaY * scrollFactor;
                const newProgress = Math.min(
                    Math.max(scrollProgress + scrollDelta, 0),
                    1
                );
                setScrollProgress(newProgress);

                if (newProgress >= 1) {
                    setMediaFullyExpanded(true);
                    setShowContent(true);
                } else if (newProgress < 0.75) {
                    setShowContent(false);
                }

                setTouchStartY(touchY);
            }
        };

        const handleTouchEnd = (): void => {
            setTouchStartY(0);
        };

        const handleScroll = (): void => {
            if (!mediaFullyExpanded) {
                window.scrollTo(0, 0);
            }
        };

        window.addEventListener('wheel', handleWheel, { passive: false });
        window.addEventListener('scroll', handleScroll);
        window.addEventListener('touchstart', handleTouchStart, { passive: false });
        window.addEventListener('touchmove', handleTouchMove, { passive: false });
        window.addEventListener('touchend', handleTouchEnd);

        return () => {
            window.removeEventListener('wheel', handleWheel);
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('touchstart', handleTouchStart);
            window.removeEventListener('touchmove', handleTouchMove);
            window.removeEventListener('touchend', handleTouchEnd);
        };
    }, [scrollProgress, mediaFullyExpanded, touchStartY]);

    useEffect(() => {
        const checkIfMobile = (): void => {
            setIsMobileState(window.innerWidth < 768);
        };

        checkIfMobile();
        window.addEventListener('resize', checkIfMobile);

        return () => window.removeEventListener('resize', checkIfMobile);
    }, []);

    /* ── Derived layout values ───────────────────────────────────── */
    const mediaWidth = 340 + scrollProgress * (isMobileState ? 620 : 1200);
    const mediaHeight = 280 + scrollProgress * (isMobileState ? 320 : 520);
    // Text fades out and moves up as scroll progresses
    const textOpacity = Math.max(0, 1 - scrollProgress * 2.5);
    const textTranslateY = scrollProgress * -60;

    return (
        <div
            ref={sectionRef}
            className='overflow-x-hidden'
            style={{ background: 'var(--bg-primary)' }}
        >
            <section className='relative flex flex-col items-center justify-start min-h-[100dvh]'>
                <div className='relative w-full flex flex-col items-center min-h-[100dvh]'>
                    {/* Subtle bg tint */}
                    <div
                        className='absolute inset-0 z-0'
                        style={{
                            background: `radial-gradient(ellipse at center 40%, ${themeColor}08 0%, transparent 70%)`,
                        }}
                    />

                    <div className='w-full flex flex-col items-center relative z-10'>
                        <div className='flex flex-col items-center w-full h-[100dvh] relative'>

                            {/* ── Text Block: ABOVE the media ──────────────────── */}
                            <div
                                className='flex flex-col items-center text-center px-6 pt-16 md:pt-20 relative z-20'
                                style={{
                                    opacity: textOpacity,
                                    transform: `translateY(${textTranslateY}px)`,
                                    transition: 'none',
                                    pointerEvents: textOpacity < 0.1 ? 'none' : 'auto',
                                }}
                            >
                                {/* Role tag */}
                                {role && (
                                    <motion.p
                                        initial={{ opacity: 0, y: 12 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: 0.1 }}
                                        style={{
                                            fontSize: 10,
                                            letterSpacing: 4,
                                            textTransform: 'uppercase',
                                            color: themeColor,
                                            fontWeight: 600,
                                            fontFamily: 'monospace',
                                            marginBottom: 10,
                                        }}
                                    >
                                        {role}
                                    </motion.p>
                                )}

                                {/* Project title */}
                                <motion.h2
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.2 }}
                                    className='text-3xl md:text-5xl lg:text-6xl font-black leading-tight'
                                    style={{ color: 'var(--text-primary)' }}
                                >
                                    {title}
                                </motion.h2>

                                {/* Subheading */}
                                {date && (
                                    <motion.p
                                        initial={{ opacity: 0, y: 14 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: 0.35 }}
                                        className='text-sm md:text-base mt-2'
                                        style={{ color: 'var(--text-secondary)' }}
                                    >
                                        {date}
                                    </motion.p>
                                )}

                                {/* Tech pills */}
                                {techStack.length > 0 && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.5, delay: 0.5 }}
                                        className='flex flex-wrap gap-1.5 justify-center mt-3'
                                    >
                                        {techStack.map((tech) => (
                                            <span
                                                key={tech}
                                                className='px-2.5 py-0.5 rounded-full text-[10px] font-medium'
                                                style={{
                                                    color: 'var(--text-primary)',
                                                    background: `${themeColor}16`,
                                                    border: `1px solid ${themeColor}45`,
                                                }}
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </motion.div>
                                )}
                            </div>

                            {/* ── Media Container: BELOW the text ──────────────── */}
                            <div
                                className='absolute z-10 left-1/2 transition-none rounded-2xl'
                                style={{
                                    width: `${mediaWidth}px`,
                                    height: `${mediaHeight}px`,
                                    maxWidth: '98vw',
                                    maxHeight: '90vh',
                                    transform: 'translateX(-50%)',
                                    top: `calc(50% - ${Math.max(0, 30 - scrollProgress * 80)}px)`,
                                    marginTop: `${40 - scrollProgress * 40}px`,
                                    boxShadow: `0 20px 60px rgba(0,0,0,0.4), 0 0 40px ${themeColor}15`,
                                }}
                            >
                                {mediaType === 'video' ? (
                                    mediaSrc.includes('youtube.com') ? (
                                        <div className='relative w-full h-full pointer-events-none'>
                                            <iframe
                                                width='100%'
                                                height='100%'
                                                src={
                                                    mediaSrc.includes('embed')
                                                        ? mediaSrc +
                                                        (mediaSrc.includes('?') ? '&' : '?') +
                                                        'autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&disablekb=1&modestbranding=1'
                                                        : mediaSrc.replace('watch?v=', 'embed/') +
                                                        '?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&disablekb=1&modestbranding=1&playlist=' +
                                                        mediaSrc.split('v=')[1]
                                                }
                                                className='w-full h-full rounded-xl'
                                                frameBorder='0'
                                                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                                                allowFullScreen
                                            />
                                        </div>
                                    ) : (
                                        <div className='relative w-full h-full pointer-events-none'>
                                            <video
                                                src={mediaSrc}
                                                poster={posterSrc}
                                                autoPlay
                                                muted
                                                loop
                                                playsInline
                                                preload='auto'
                                                className='w-full h-full object-cover rounded-xl'
                                                controls={false}
                                                disablePictureInPicture
                                                disableRemotePlayback
                                            />
                                        </div>
                                    )
                                ) : (
                                    <div className='relative w-full h-full'>
                                        <Image
                                            src={mediaSrc}
                                            alt={title || 'Media content'}
                                            fill
                                            sizes='(min-width: 1024px) 92vw, 98vw'
                                            className='w-full h-full object-cover rounded-xl'
                                        />
                                    </div>
                                )}
                            </div>

                            {/* Scroll to expand indicator */}
                            {scrollToExpand && (
                                <div
                                    className='absolute bottom-8 left-1/2 flex flex-col items-center gap-1.5 z-20'
                                    style={{
                                        transform: 'translateX(-50%)',
                                        opacity: textOpacity,
                                    }}
                                >
                                    <span
                                        className='text-[10px] uppercase tracking-[3px] font-mono'
                                        style={{ color: 'var(--text-tertiary, rgba(255,255,255,0.35))' }}
                                    >
                                        {scrollToExpand}
                                    </span>
                                    <motion.div
                                        animate={{ y: [0, 5, 0] }}
                                        transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
                                        style={{
                                            width: 1,
                                            height: 16,
                                            background: `linear-gradient(to bottom, ${themeColor}50, transparent)`,
                                        }}
                                    />
                                </div>
                            )}
                        </div>

                        <motion.section
                            className='flex flex-col w-full px-8 py-10 md:px-16 lg:py-20'
                            initial={{ opacity: 0 }}
                            animate={{ opacity: showContent ? 1 : 0 }}
                            transition={{ duration: 0.7 }}
                        >
                            {children}
                        </motion.section>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ScrollExpandMedia;
