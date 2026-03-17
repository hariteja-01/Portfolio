"use client";

import { motion } from "framer-motion";
import { Trophy, Star, Medal, CalendarDays, Rocket, Crown } from "lucide-react";
import GlassmorphicCard from "@/components/GlassmorphicCard";
import { profile, type AchievementItem } from "@/data/portfolio";

const ACHIEVEMENT_STYLES = [
    {
        accent: "#00F0FF",
        softBg: "rgba(0,240,255,0.14)",
        softBorder: "rgba(0,240,255,0.4)",
    },
    {
        accent: "#FF6B35",
        softBg: "rgba(255,107,53,0.14)",
        softBorder: "rgba(255,107,53,0.4)",
    },
    {
        accent: "#8B5CF6",
        softBg: "rgba(139,92,246,0.16)",
        softBorder: "rgba(139,92,246,0.4)",
    },
    {
        accent: "#FFB74D",
        softBg: "rgba(255,183,77,0.18)",
        softBorder: "rgba(255,183,77,0.45)",
    },
];

function iconByIndex(index: number) {
    if (index === 0) return Trophy;
    if (index === 1) return Rocket;
    if (index === 2) return Star;
    if (index === 3) return Crown;
    return Medal;
}

export default function AchievementsSection() {
    const achievements = [...(profile.achievementsDetailed as AchievementItem[])].sort(
        (a, b) => b.sortValue - a.sortValue
    );

    return (
        <section id="achievements" className="py-24 px-6" aria-label="Achievements">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true, amount: 0.4 }}
                    className="mb-10"
                >
                    <p className="text-xs uppercase tracking-[0.25em] mb-3 font-mono" style={{ color: "#00F0FF" }}>
                        Milestones
                    </p>
                    <h2 className="text-3xl md:text-4xl font-bold" style={{ color: "var(--text-primary)" }}>
                        Achievements
                    </h2>
                    <p className="mt-3 max-w-3xl text-base" style={{ color: "var(--text-secondary)", lineHeight: 1.7 }}>
                        Chronologically arranged in decreasing order, focused on university and professional milestones.
                    </p>
                </motion.div>

                <div className="relative">
                    <motion.div
                        className="hidden md:block absolute left-8 top-0 bottom-0 w-[2px]"
                        style={{
                            background:
                                "linear-gradient(180deg, rgba(0,240,255,0.7), rgba(139,92,246,0.55), rgba(255,107,53,0.5))",
                        }}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true, amount: 0.2 }}
                    />

                    <div className="space-y-5">
                        {achievements.map((item, index) => {
                            const Icon = iconByIndex(index);
                            const style = ACHIEVEMENT_STYLES[index % ACHIEVEMENT_STYLES.length];

                            return (
                                <motion.div
                                    key={`${item.title}-${item.date}`}
                                    initial={{ opacity: 0, y: 24, scale: 0.98 }}
                                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                    transition={{ duration: 0.45, delay: index * 0.08 }}
                                    viewport={{ once: true, amount: 0.25 }}
                                    className="relative md:pl-20"
                                >
                                    <div
                                        className="hidden md:flex absolute left-[17px] top-8 w-8 h-8 rounded-full items-center justify-center"
                                        style={{
                                            background: "var(--bg-secondary)",
                                            border: `1px solid ${style.softBorder}`,
                                            boxShadow: `0 0 18px ${style.softBg}`,
                                        }}
                                    >
                                        <Icon className="w-4 h-4" style={{ color: style.accent }} />
                                    </div>

                                    <GlassmorphicCard className="p-6" hoverColor={style.accent} hoverGlow>
                                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
                                            <div>
                                                <h3 className="text-xl md:text-2xl font-bold" style={{ color: "var(--text-primary)" }}>
                                                    {item.title}
                                                </h3>
                                                {item.issuer && (
                                                    <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
                                                        Issued by {item.issuer}
                                                    </p>
                                                )}
                                            </div>
                                            <span
                                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold h-fit"
                                                style={{
                                                    background: style.softBg,
                                                    border: `1px solid ${style.softBorder}`,
                                                    color: style.accent,
                                                }}
                                            >
                                                <CalendarDays className="w-3.5 h-3.5" />
                                                {item.date}
                                            </span>
                                        </div>

                                        <p className="mt-4 text-sm md:text-base leading-relaxed" style={{ color: "var(--text-primary)" }}>
                                            {item.description}
                                        </p>
                                    </GlassmorphicCard>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
