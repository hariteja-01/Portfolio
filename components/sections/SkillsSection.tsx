"use client";

import { motion } from "framer-motion";
import OrbitingSkills, { type OrbitingSkillItem } from "@/components/ui/orbiting-skills";
import { profile } from "@/data/portfolio";

const skillMap: Record<string, OrbitingSkillItem> = {
    React: { id: "react", label: "React", icon: "react", ring: "inner" },
    TypeScript: { id: "typescript", label: "TypeScript", icon: "typescript", ring: "inner" },
    "Next.js": { id: "nextjs", label: "Next.js", icon: "nextjs", ring: "inner" },
    JavaScript: { id: "javascript", label: "JavaScript", icon: "javascript", ring: "inner" },
    Python: { id: "python", label: "Python", icon: "python", ring: "middle" },
    "Machine Learning": { id: "ml", label: "Machine Learning", icon: "ml", ring: "middle" },
    "Data Science": { id: "data", label: "Data Science", icon: "data", ring: "middle" },
    "Tailwind CSS": { id: "tailwindcss", label: "Tailwind CSS", icon: "tailwindcss", ring: "middle" },
    "Node.js": { id: "nodejs", label: "Node.js", icon: "nodejs", ring: "outer" },
    "Cloud (Oracle OCI)": { id: "oracleoci", label: "Cloud (Oracle OCI)", icon: "oracleoci", ring: "outer" },
    "Algorithms & DSA": { id: "leetcode", label: "Algorithms & DSA", icon: "leetcode", ring: "outer" },
    "Generative AI": { id: "genai", label: "Generative AI", icon: "genai", ring: "outer" },
    "C++": { id: "cplusplus", label: "C++", icon: "cplusplus", ring: "inner" },
};

const fallbackSkills: OrbitingSkillItem[] = [
    skillMap["React"],
    skillMap["TypeScript"],
    skillMap["Next.js"],
    skillMap["JavaScript"],
    skillMap["Python"],
    skillMap["Machine Learning"],
    skillMap["Data Science"],
    skillMap["Tailwind CSS"],
    skillMap["Node.js"],
    skillMap["Cloud (Oracle OCI)"],
    skillMap["Algorithms & DSA"],
    skillMap["Generative AI"],
];

const skillCategories = [
    {
        title: "Frontend Engineering",
        items: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
        color: "#00F0FF",
    },
    {
        title: "AI, ML & Data",
        items: ["Machine Learning", "Data Science", "Python", "Generative AI"],
        color: "#8B5CF6",
    },
    {
        title: "Systems & Problem Solving",
        items: ["Algorithms & DSA", "Node.js", "Cloud (Oracle OCI)", "C++"],
        color: "#FF6B35",
    },
];

export default function SkillsSection() {
    const orbitSkills = (profile.skills ?? [])
        .map((skill) => skillMap[skill])
        .filter((value): value is OrbitingSkillItem => Boolean(value));

    const renderedSkills = orbitSkills.length > 0 ? orbitSkills : fallbackSkills;

    return (
        <section id="skills" className="py-20 px-6" aria-label="Technical skills">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="mb-12"
                >
                    <p className="text-xs uppercase tracking-[0.25em] mb-3 font-mono" style={{ color: "#00F0FF" }}>
                        Recruiter Fast-Scan
                    </p>
                    <h2 className="text-3xl md:text-4xl font-bold" style={{ color: "var(--text-primary)" }}>
                        Skills
                    </h2>
                    <p className="mt-3 max-w-2xl text-base" style={{ color: "var(--text-secondary)", lineHeight: 1.7 }}>
                        This section highlights my practical stack across frontend systems, AI/ML engineering, and cloud-backed product development.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -24 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true, amount: 0.15 }}
                    >
                        <OrbitingSkills skills={renderedSkills} size={560} />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 24 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.55 }}
                        viewport={{ once: true, amount: 0.2 }}
                        className="space-y-5"
                    >
                        {skillCategories.map((category, index) => (
                            <motion.div
                                key={category.title}
                                initial={{ opacity: 0, y: 14 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.35, delay: index * 0.1 }}
                                viewport={{ once: true, amount: 0.3 }}
                                className="rounded-2xl p-5"
                                style={{
                                    background: "var(--glass-bg)",
                                    border: "1px solid var(--glass-border)",
                                    boxShadow: "var(--glass-shadow)",
                                }}
                            >
                                <h3 className="font-semibold text-sm uppercase tracking-[0.16em] mb-4" style={{ color: category.color }}>
                                    {category.title}
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {category.items.map((item) => (
                                        <span
                                            key={item}
                                            className="px-3 py-1.5 rounded-full text-xs font-medium"
                                            style={{
                                                border: `1px solid ${category.color}40`,
                                                background: `${category.color}15`,
                                                color: "var(--text-primary)",
                                            }}
                                        >
                                            {item}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
