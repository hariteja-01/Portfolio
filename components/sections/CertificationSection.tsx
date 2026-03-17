"use client";

import type { ComponentType, CSSProperties, ReactNode } from "react";
import { motion } from "framer-motion";
import { BookOpen, CheckCircle2, ShieldCheck } from "lucide-react";
import { FaMicrosoft } from "react-icons/fa";
import { SiCoursera, SiLinkedin, SiOracle, SiPython } from "react-icons/si";
import { profile } from "@/data/portfolio";
import { ServiceCard } from "@/components/ui/service-card";

type CertificationsItem = {
    title: string;
    issuer: string;
    date: string;
    issuedAt?: string;
    certificationsUrl?: string;
};

const issuerIconMap: Record<string, ComponentType<{ className?: string; style?: CSSProperties }>> = {
    Oracle: SiOracle,
    "IBM Coursera": SiCoursera,
    "Microsoft & LinkedIn": SiLinkedin,
    NPTEL: BookOpen,
};

const issuerAccentMap: Record<string, string> = {
    Oracle: "#F80000",
    "IBM Coursera": "#0056D2",
    "Microsoft & LinkedIn": "#0A66C2",
    NPTEL: "#0E9F6E",
};

function toSortableValue(issuedAt?: string) {
    if (!issuedAt) return 0;
    const [year, month] = issuedAt.split("-");
    return Number(`${year}${month}`);
}

function getCornerGraphic(cert: CertificationsItem): ReactNode {
    if (cert.issuer === "Oracle") {
        return <SiOracle className="w-16 h-16 md:w-20 md:h-20" style={{ color: "#F80000" }} aria-hidden="true" />;
    }

    if (cert.issuer === "IBM Coursera") {
        return (
            <div className="flex items-end gap-2" aria-hidden="true">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg"
                    alt="IBM logo"
                    className="w-10 h-10 md:w-12 md:h-12 object-contain"
                />
                <SiCoursera className="w-10 h-10 md:w-12 md:h-12" style={{ color: "#0056D2" }} />
            </div>
        );
    }

    if (cert.issuer === "Microsoft & LinkedIn") {
        return (
            <div className="flex items-end gap-2" aria-hidden="true">
                <FaMicrosoft className="w-8 h-8 md:w-10 md:h-10" style={{ color: "#F25022" }} />
                <SiLinkedin className="w-10 h-10 md:w-12 md:h-12" style={{ color: "#0A66C2" }} />
            </div>
        );
    }

    if (cert.issuer === "NPTEL") {
        return (
            <div className="flex flex-col items-end gap-1" aria-hidden="true">
                <BookOpen className="w-14 h-14 md:w-18 md:h-18" style={{ color: "#0E9F6E" }} />
                <span className="text-[10px] font-bold tracking-widest uppercase" style={{ color: "#0E9F6E" }}>IIT Madras</span>
            </div>
        );
    }

    return <ShieldCheck className="w-16 h-16 md:w-20 md:h-20" style={{ color: "#00F0FF" }} aria-hidden="true" />;
}

export default function CertificationSection() {
    const certifications = [...(profile.certifications as CertificationsItem[])].sort(
        (a, b) => toSortableValue(b.issuedAt) - toSortableValue(a.issuedAt)
    );

    return (
        <section id="certifications" className="py-20 px-6" aria-label="Certifications">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 22 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true, amount: 0.45 }}
                    className="mb-10"
                >
                    <p className="text-xs uppercase tracking-[0.25em] mb-3 font-mono" style={{ color: "#8B5CF6" }}>
                        Certified Credentials
                    </p>
                    <h2 className="text-3xl md:text-4xl font-bold" style={{ color: "var(--text-primary)" }}>
                        Certifications
                    </h2>
                    <p className="mt-3 max-w-2xl text-base" style={{ color: "var(--text-secondary)", lineHeight: 1.7 }}>
                        Verified industry credentials with direct access to each official certificate.
                    </p>
                </motion.div>

                <div className="relative">
                    <motion.div
                        className="hidden md:block absolute left-7 top-0 bottom-0 w-[2px]"
                        style={{
                            background:
                                "linear-gradient(180deg, rgba(139,92,246,0.65) 0%, rgba(0,240,255,0.5) 50%, rgba(255,107,53,0.5) 100%)",
                        }}
                        initial={{ opacity: 0.15 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.5 }}
                    />

                    <div className="space-y-6">
                        {certifications.map((cert, index) => {
                            const IssuerIcon = issuerIconMap[cert.issuer] ?? ShieldCheck;
                            const accent = issuerAccentMap[cert.issuer] ?? "#00F0FF";
                            const variant =
                                index % 4 === 0 ? "default" : index % 4 === 1 ? "red" : index % 4 === 2 ? "gray" : "blue";

                            return (
                                <motion.div
                                    key={`${cert.title}-${cert.date}`}
                                    initial={{ opacity: 0, y: 30, scale: 0.98 }}
                                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                    transition={{ duration: 0.45, delay: index * 0.1 }}
                                    viewport={{ once: true, amount: 0.3 }}
                                    className="relative pl-0 md:pl-16"
                                >
                                    <motion.div
                                        className="hidden md:flex absolute left-2 top-10 w-10 h-10 rounded-full items-center justify-center"
                                        style={{
                                            background: "var(--bg-secondary)",
                                            border: `1px solid ${accent}80`,
                                            boxShadow: `0 0 18px ${accent}40`,
                                        }}
                                        initial={{ opacity: 0.2, scale: 0.9 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true, amount: 0.5 }}
                                        transition={{ duration: 0.4, delay: index * 0.08 }}
                                    >
                                        <CheckCircle2 className="w-5 h-5" style={{ color: accent }} />
                                    </motion.div>

                                    <ServiceCard
                                        title={cert.title}
                                        href={cert.certificationsUrl || "#"}
                                        variant={variant}
                                        className="min-h-[220px]"
                                        ctaLabel="View Certificate"
                                        cornerGraphic={getCornerGraphic(cert)}
                                    >
                                        <div className="relative z-10 mt-4 flex flex-wrap gap-2 items-center">
                                            <span
                                                className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-medium"
                                                style={{
                                                    background: `${accent}22`,
                                                    border: `1px solid ${accent}55`,
                                                    color: "var(--text-primary)",
                                                }}
                                            >
                                                <IssuerIcon className="w-3.5 h-3.5" style={{ color: accent }} />
                                                {cert.issuer}
                                            </span>
                                            <span
                                                className="px-2.5 py-1 rounded-full text-xs font-medium"
                                                style={{
                                                    background: "var(--bg-secondary)",
                                                    border: "1px solid rgba(148,163,184,0.35)",
                                                    color: "var(--text-secondary)",
                                                }}
                                            >
                                                {cert.date}
                                            </span>
                                            {cert.title.toLowerCase().includes("python") && (
                                                <span
                                                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium"
                                                    style={{
                                                        background: "rgba(55,118,171,0.2)",
                                                        border: "1px solid rgba(55,118,171,0.45)",
                                                        color: "#BFDBFE",
                                                    }}
                                                >
                                                    <SiPython className="w-3.5 h-3.5" />
                                                    Python
                                                </span>
                                            )}
                                        </div>
                                    </ServiceCard>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
