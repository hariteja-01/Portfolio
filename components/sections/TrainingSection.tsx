"use client";

import { motion } from "framer-motion";
import { Binary, Award, BrainCircuit, Sparkles } from "lucide-react";
import GlassmorphicCard from "@/components/GlassmorphicCard";
import { profile, type TrainingItem } from "@/data/portfolio";

export default function TrainingSection() {
    const training = [...(profile.training as TrainingItem[])].sort(
        (a, b) => b.sortValue - a.sortValue
    );

    return (
        <section id="training" className="py-24 px-6" aria-label="Training">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 22 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true, amount: 0.35 }}
                    className="mb-10"
                >
                    <p className="text-xs uppercase tracking-[0.25em] mb-3 font-mono" style={{ color: "#FF6B35" }}>
                        Competitive Programming Journey
                    </p>
                    <h2 className="text-3xl md:text-4xl font-bold" style={{ color: "var(--text-primary)" }}>
                        Training
                    </h2>
                    <p className="mt-3 max-w-3xl text-base" style={{ color: "var(--text-secondary)", lineHeight: 1.7 }}>
                        Focused learning sprint in algorithmic problem-solving, optimization, and practical implementation.
                    </p>
                </motion.div>

                <div className="space-y-6">
                    {training.map((item, index) => (
                        <motion.div
                            key={`${item.title}-${item.period}`}
                            initial={{ opacity: 0, y: 28, scale: 0.98 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ duration: 0.45, delay: index * 0.08 }}
                            viewport={{ once: true, amount: 0.25 }}
                        >
                            <GlassmorphicCard className="p-6 md:p-8" hoverColor="#FF6B35" hoverGlow>
                                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
                                    <div>
                                        <h3 className="text-2xl md:text-3xl font-black" style={{ color: "var(--text-primary)" }}>
                                            {item.title}
                                        </h3>
                                        <div className="flex flex-wrap items-center gap-2 mt-1 text-sm md:text-base">
                                            <span style={{ color: "var(--text-secondary)" }}>
                                                {item.organization}
                                            </span>
                                            {item.certificateUrl && (
                                                <a
                                                    href={item.certificateUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-1.5 font-semibold transition-all duration-300 hover:scale-[1.03]"
                                                    style={{ color: "#FF6B35" }}
                                                >
                                                    View Certificate
                                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                                                        <polyline points="15 3 21 3 21 9" />
                                                        <line x1="10" y1="14" x2="21" y2="3" />
                                                    </svg>
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                    <span
                                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold h-fit"
                                        style={{
                                            background: "rgba(255,107,53,0.15)",
                                            border: "1px solid rgba(255,107,53,0.35)",
                                            color: "#FF6B35",
                                        }}
                                    >
                                        <Award className="w-4 h-4" />
                                        {item.period}
                                    </span>
                                </div>

                                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {item.highlights.map((highlight, i) => (
                                        <motion.div
                                            key={highlight}
                                            initial={{ opacity: 0, y: 12 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.35, delay: 0.12 + i * 0.1 }}
                                            viewport={{ once: true }}
                                            className="rounded-xl p-4"
                                            style={{
                                                background: "linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
                                                border: "1px solid var(--border-color)",
                                            }}
                                        >
                                            <div className="flex items-center gap-2 mb-2">
                                                {i === 0 ? (
                                                    <Binary className="w-4 h-4" style={{ color: "#00F0FF" }} />
                                                ) : i === 1 ? (
                                                    <BrainCircuit className="w-4 h-4" style={{ color: "#8B5CF6" }} />
                                                ) : (
                                                    <Sparkles className="w-4 h-4" style={{ color: "#FFB74D" }} />
                                                )}
                                                <span className="text-xs uppercase tracking-[0.18em]" style={{ color: "var(--text-secondary)" }}>
                                                    Highlight {i + 1}
                                                </span>
                                            </div>
                                            <p className="text-sm leading-relaxed" style={{ color: "var(--text-primary)" }}>
                                                {highlight}
                                            </p>
                                        </motion.div>
                                    ))}
                                </div>

                                <div className="mt-6 flex items-center flex-wrap gap-2">
                                    <span className="text-xs uppercase tracking-[0.2em]" style={{ color: "var(--text-secondary)" }}>
                                        Tech
                                    </span>
                                    {item.tech.map((tech) => (
                                        <span
                                            key={tech}
                                            className="px-2.5 py-1 rounded-full text-xs font-medium"
                                            style={{
                                                background: "rgba(0,240,255,0.13)",
                                                border: "1px solid rgba(0,240,255,0.35)",
                                                color: "#00F0FF",
                                            }}
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </GlassmorphicCard>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
