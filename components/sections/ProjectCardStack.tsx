'use client';

import { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { portfolioModes } from '@/data/portfolio';
import { CardStack, CardStackItem } from '@/components/ui/card-stack';

interface ProjectCardStackProps {
    onProjectSelect: (index: number) => void;
}

interface ProjectCard extends CardStackItem {
    videoSrc: string;
    posterSrc: string;
    themeColor: string;
    techStack: string[];
    stats: { label: string; val: string }[];
    projectIndex: number;
}

const projectCards: ProjectCard[] = portfolioModes.map((mode, i) => ({
    id: mode.id,
    title: mode.name,
    description: `${mode.subName} - ${mode.role}`,
    imageSrc: `${mode.folderPath}/1.jpg`,
    href: mode.ctaSection.primaryUrl,
    videoSrc: `/images/${mode.id}-video.mp4`,
    posterSrc: `/images/${mode.id}-end.webp`,
    themeColor: mode.themeColor,
    techStack: mode.techStack,
    stats: mode.stats,
    projectIndex: i,
}));

function VideoCard({
    item,
    active,
    onClickProject,
}: {
    item: ProjectCard;
    active: boolean;
    onClickProject: (index: number) => void;
}) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isHovering, setIsHovering] = useState(false);

    const handleMouseEnter = useCallback(() => {
        setIsHovering(true);
        if (videoRef.current) {
            videoRef.current.play().catch(() => { });
        }
    }, []);

    const handleMouseLeave = useCallback(() => {
        setIsHovering(false);
        if (videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
        }
    }, []);

    return (
        <div
            className="relative h-full w-full group"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            data-cursor="project"
        >
            {/* Poster image (always visible as base) */}
            <img
                src={item.posterSrc}
                alt={item.title}
                className="absolute inset-0 h-full w-full object-cover"
                draggable={false}
                loading="eager"
            />

            {/* Video overlay (plays on hover) */}
            <video
                ref={videoRef}
                src={item.videoSrc}
                poster={item.posterSrc}
                muted
                loop
                playsInline
                preload="metadata"
                className="absolute inset-0 h-full w-full object-cover transition-opacity duration-500"
                style={{ opacity: isHovering ? 1 : 0 }}
            />

            {/* Glass gradient overlay */}
            <div
                className="absolute inset-0 transition-opacity duration-500"
                style={{
                    background: `linear-gradient(to top, ${item.themeColor}95 0%, rgba(0,0,0,0.62) 45%, rgba(0,0,0,0.24) 75%)`,
                    opacity: active ? (isHovering ? 0.9 : 0.7) : 0.5,
                }}
            />

            {/* Theme color glow border on hover */}
            {active && (
                <div
                    className="absolute inset-0 rounded-2xl transition-opacity duration-400 pointer-events-none"
                    style={{
                        opacity: isHovering ? 1 : 0,
                        boxShadow: `inset 0 0 0 2px ${item.themeColor}60, 0 0 40px ${item.themeColor}20`,
                    }}
                />
            )}

            {/* Content */}
            <div className="relative z-10 flex h-full flex-col justify-between p-5">
                {/* Top: Tag */}
                <div className="flex justify-between items-start">
                    <span
                        className="text-[10px] uppercase tracking-[0.2em] font-medium px-2.5 py-1 rounded-full"
                        style={{
                            background: `${item.themeColor}20`,
                            color: item.themeColor,
                            border: `1px solid ${item.themeColor}30`,
                            backdropFilter: 'blur(8px)',
                        }}
                    >
                        {portfolioModes[item.projectIndex].role}
                    </span>
                </div>

                {/* Bottom: Info */}
                <div>
                    {/* Tech pills */}
                    <div
                        className="flex flex-wrap gap-1 mb-2 transition-all duration-500"
                        style={{
                            opacity: active ? 1 : 0,
                            transform: active ? 'translateY(0)' : 'translateY(8px)',
                        }}
                    >
                        {item.techStack.slice(0, 3).map((tech) => (
                            <span
                                key={tech}
                                className="text-[9px] px-2 py-0.5 rounded-full text-white/70"
                                style={{
                                    background: 'rgba(255,255,255,0.1)',
                                    backdropFilter: 'blur(4px)',
                                    textShadow: '0 1px 10px rgba(0,0,0,0.6)',
                                }}
                            >
                                {tech}
                            </span>
                        ))}
                    </div>

                    <div className="text-xl font-bold text-white drop-shadow-lg" style={{ textShadow: '0 2px 16px rgba(0,0,0,0.78)' }}>
                        {item.title}
                    </div>
                    <div className="text-sm text-white/85 mt-0.5" style={{ textShadow: '0 2px 12px rgba(0,0,0,0.72)' }}>
                        {item.description}
                    </div>

                    {/* Stats row (active only) */}
                    <div
                        className="flex gap-4 mt-3 transition-all duration-500"
                        style={{
                            opacity: active ? 1 : 0,
                            transform: active ? 'translateY(0)' : 'translateY(10px)',
                        }}
                    >
                        {item.stats.map((stat) => (
                            <div key={stat.label}>
                                <div
                                    className="text-base font-bold"
                                    style={{ color: item.themeColor }}
                                >
                                    {stat.val}
                                </div>
                                <div className="text-[10px] text-white/70 uppercase tracking-wider" style={{ textShadow: '0 1px 8px rgba(0,0,0,0.65)' }}>
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* CTA */}
                    {active && (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onClickProject(item.projectIndex);
                            }}
                            className="mt-3 text-xs font-medium px-4 py-2 rounded-full transition-all duration-300 hover:scale-105"
                            style={{
                                background: `${item.themeColor}`,
                                color: '#fff',
                                boxShadow: `0 4px 15px ${item.themeColor}40`,
                            }}
                        >
                            Explore Deep Dive →
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default function ProjectCardStack({
    onProjectSelect,
}: ProjectCardStackProps) {
    return (
        <section id="projects" className="relative py-24 px-6 overflow-hidden">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="mb-4 text-center"
                >
                    <h2
                        className="text-4xl md:text-5xl font-black"
                        style={{ color: 'var(--text-primary)' }}
                    >
                        Featured Projects
                    </h2>
                    <p
                        className="text-lg mt-3 max-w-lg mx-auto"
                        style={{ color: 'var(--text-secondary)' }}
                    >
                        Swipe or click to explore each project in 3D
                    </p>
                    <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="h-1 w-20 mt-4 mx-auto rounded-full"
                        style={{
                            background: 'linear-gradient(90deg, #00F0FF, #8B5CF6)',
                            transformOrigin: 'center',
                        }}
                    />
                </motion.div>

                {/* Card Stack */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    viewport={{ once: true, amount: 0.1 }}
                >
                    <CardStack
                        items={projectCards}
                        initialIndex={0}
                        maxVisible={3}
                        cardWidth={520}
                        cardHeight={340}
                        overlap={0.4}
                        spreadDeg={35}
                        perspectivePx={1200}
                        depthPx={120}
                        tiltXDeg={8}
                        activeLiftPx={30}
                        activeScale={1.05}
                        inactiveScale={0.88}
                        springStiffness={260}
                        springDamping={26}
                        loop
                        autoAdvance
                        intervalMs={3500}
                        pauseOnHover
                        showDots
                        renderCard={(item, { active }) => (
                            <VideoCard
                                item={item}
                                active={active}
                                onClickProject={onProjectSelect}
                            />
                        )}
                    />
                </motion.div>

                <p
                    className="text-sm text-center mt-6 italic"
                    style={{ color: 'var(--text-secondary)' }}
                >
                    Drag, swipe, or use arrow keys to navigate
                </p>
            </div>
        </section>
    );
}
