'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import GlassmorphicCard from '@/components/GlassmorphicCard';
import { GraduationCap, School, MapPin, CalendarRange } from 'lucide-react';
import { profile, type EducationItem } from '@/data/portfolio';

export default function AboutSection() {
    const [typedText, setTypedText] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const typingRef = useRef<HTMLDivElement>(null);
    const hasTyped = useRef(false);

    const terminalContent = `> whoami

I'm a pre-final year CSE undergrad at Lovely Professional University with a 9.18 CGPA and an obsession for clean, efficient code.

> skills --top

900+ problems solved on LeetCode - not for the streak, but because understanding algorithms at a deep level is my idea of fun.

> certifications --list

Dual Oracle Cloud certified (Data Science + Developer Professional). IBM & Microsoft certified in AI & GenAI. NPTEL certified in Social Networks (IIT Madras).

> interests

Algorithms • Machine Learning • Full-Stack Development • Financial Markets • Data Science

> status

Building the future, one commit at a time.`;

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasTyped.current) {
                    hasTyped.current = true;
                    setIsTyping(true);
                }
            },
            { threshold: 0.2 }
        );
        if (typingRef.current) observer.observe(typingRef.current);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!isTyping) return;
        let i = 0;
        const interval = setInterval(() => {
            if (i < terminalContent.length) {
                setTypedText(terminalContent.slice(0, i + 1));
                i++;
            } else {
                clearInterval(interval);
            }
        }, 15);
        return () => clearInterval(interval);
    }, [isTyping, terminalContent]);

    const education = [...(profile.education as EducationItem[])].sort(
        (a, b) => b.sortValue - a.sortValue
    );

    return (
        <section id="about" className="py-24 px-6">
            <div className="max-w-6xl mx-auto">
                <motion.h2
                    className="text-3xl md:text-4xl font-bold mb-12"
                    style={{ color: 'var(--text-primary)' }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                >
                    About Me
                </motion.h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
                    {/* Left: Terminal */}
                    <motion.div
                        ref={typingRef}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true, amount: 0.2 }}
                        className="rounded-xl overflow-hidden h-full flex flex-col"
                        style={{
                            border: '1px solid var(--border-color)',
                            boxShadow: 'var(--glass-shadow)',
                        }}
                    >
                        {/* Terminal header */}
                        <div
                            className="h-8 flex items-center px-3 gap-2 shrink-0"
                            style={{ background: 'var(--bg-secondary)' }}
                        >
                            <div className="w-3 h-3 rounded-full" style={{ background: '#FF5F56' }} />
                            <div className="w-3 h-3 rounded-full" style={{ background: '#FFBD2E' }} />
                            <div className="w-3 h-3 rounded-full" style={{ background: '#27C93F' }} />
                            <span
                                className="ml-2 text-xs font-mono"
                                style={{ color: 'var(--text-secondary)' }}
                            >
                                hariteja@dev:~$
                            </span>
                        </div>
                        {/* Terminal body */}
                        <div
                            className="flex-1 p-4 md:p-5 font-mono text-sm leading-relaxed overflow-auto"
                            style={{
                                background: 'linear-gradient(180deg, #0B1220 0%, #111827 100%)',
                                color: '#86EFAC',
                                minHeight: 340,
                            }}
                        >
                            <pre className="m-0 whitespace-pre-wrap break-words">{typedText}</pre>
                            <span className="animate-blink">_</span>
                        </div>
                    </motion.div>

                    {/* Right: Education timeline */}
                    <div className="relative">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.55 }}
                            viewport={{ once: true, amount: 0.2 }}
                            className="mb-4"
                        >
                            <p className="text-xs uppercase tracking-[0.25em] mb-2 font-mono" style={{ color: '#8B5CF6' }}>
                                Education
                            </p>
                            <h3 className="text-2xl md:text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>
                                Academic Journey
                            </h3>
                        </motion.div>

                        <div className="absolute left-[13px] top-20 bottom-3 w-[2px]" style={{
                            background: 'linear-gradient(180deg, rgba(0,240,255,0.65), rgba(139,92,246,0.45), rgba(255,107,53,0.4))',
                        }} />

                        <div className="space-y-4">
                            {education.map((item, i) => (
                                <motion.div
                                    key={`${item.institution}-${item.period}`}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.45, delay: i * 0.1 }}
                                    viewport={{ once: true, amount: 0.3 }}
                                    className="relative pl-10"
                                >
                                    <div
                                        className="absolute left-0 top-6 w-7 h-7 rounded-full flex items-center justify-center"
                                        style={{
                                            background: 'var(--bg-secondary)',
                                            border: '1px solid rgba(0,240,255,0.5)',
                                            boxShadow: '0 0 16px rgba(0,240,255,0.28)',
                                        }}
                                    >
                                        {i === 0 ? (
                                            <GraduationCap className="w-4 h-4" style={{ color: '#00F0FF' }} />
                                        ) : (
                                            <School className="w-4 h-4" style={{ color: '#8B5CF6' }} />
                                        )}
                                    </div>

                                    <GlassmorphicCard className="p-5" hoverColor="#00F0FF" hoverGlow>
                                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
                                            <div>
                                                <h4 className="text-base md:text-lg font-bold" style={{ color: 'var(--text-primary)' }}>
                                                    {item.institution}
                                                </h4>
                                                <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
                                                    {item.qualification}
                                                </p>
                                            </div>
                                            <span
                                                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold h-fit"
                                                style={{
                                                    background: 'rgba(0,240,255,0.12)',
                                                    border: '1px solid rgba(0,240,255,0.35)',
                                                    color: '#00F0FF',
                                                }}
                                            >
                                                <CalendarRange className="w-3.5 h-3.5" />
                                                {item.period}
                                            </span>
                                        </div>

                                        <div className="mt-3 flex flex-wrap items-center gap-2">
                                            <span
                                                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs"
                                                style={{
                                                    background: 'rgba(139,92,246,0.16)',
                                                    border: '1px solid rgba(139,92,246,0.35)',
                                                    color: 'var(--text-primary)',
                                                }}
                                            >
                                                <MapPin className="w-3.5 h-3.5" style={{ color: '#8B5CF6' }} />
                                                {item.location}
                                            </span>

                                            <span
                                                className="px-2.5 py-1 rounded-full text-xs"
                                                style={{
                                                    background: 'rgba(255,107,53,0.15)',
                                                    border: '1px solid rgba(255,107,53,0.35)',
                                                    color: 'var(--text-primary)',
                                                }}
                                            >
                                                {item.score}
                                            </span>
                                        </div>
                                    </GlassmorphicCard>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}
