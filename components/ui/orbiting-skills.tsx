"use client";

import { memo, useEffect, useMemo, useState } from "react";
import { Code2 } from "lucide-react";
import type { IconType } from "react-icons";
import {
    SiCplusplus,
    SiJavascript,
    SiLeetcode,
    SiNextdotjs,
    SiNodedotjs,
    SiOpenai,
    SiOracle,
    SiPandas,
    SiPython,
    SiReact,
    SiScikitlearn,
    SiTailwindcss,
    SiTypescript,
} from "react-icons/si";

type OrbitColor = "cyan" | "violet" | "orange";
type OrbitRing = "inner" | "middle" | "outer";

type OrbitIconType =
    | "react"
    | "typescript"
    | "nextjs"
    | "javascript"
    | "python"
    | "ml"
    | "data"
    | "tailwindcss"
    | "nodejs"
    | "oracleoci"
    | "leetcode"
    | "genai"
    | "cplusplus";

export interface OrbitingSkillItem {
    id: string;
    label: string;
    icon: OrbitIconType;
    ring: OrbitRing;
    color?: OrbitColor;
}

interface OrbitingSkillsProps {
    skills: OrbitingSkillItem[];
    size?: number;
}

interface SkillConfig extends OrbitingSkillItem {
    orbitRadius: number;
    iconSize: number;
    speed: number;
    phaseShift: number;
    glowColor: OrbitColor;
}

interface OrbitingSkillProps {
    config: SkillConfig;
    angle: number;
    paletteMap: Record<OrbitColor, { bg: string; glow: string; border: string; text: string }>;
    isLightMode: boolean;
}

interface GlowingOrbitPathProps {
    radius: number;
    glowColor: OrbitColor;
    delay?: number;
    paletteMap: Record<OrbitColor, { bg: string; glow: string; border: string; text: string }>;
}

const ringConfig: Record<OrbitRing, { radius: number; iconSize: number; speed: number; color: OrbitColor }> = {
    inner: { radius: 112, iconSize: 46, speed: 0.9, color: "cyan" },
    middle: { radius: 175, iconSize: 48, speed: -0.7, color: "violet" },
    outer: { radius: 232, iconSize: 50, speed: 0.5, color: "orange" },
};

const getOrbitPalette = (isLightMode: boolean): Record<OrbitColor, { bg: string; glow: string; border: string; text: string }> => {
    if (isLightMode) {
        return {
            cyan: {
                bg: "rgba(8, 145, 178, 0.18)",
                glow: "rgba(8, 145, 178, 0.32)",
                border: "rgba(15, 23, 42, 0.45)",
                text: "#0E7490",
            },
            violet: {
                bg: "rgba(109, 40, 217, 0.18)",
                glow: "rgba(109, 40, 217, 0.3)",
                border: "rgba(30, 41, 59, 0.45)",
                text: "#6D28D9",
            },
            orange: {
                bg: "rgba(194, 65, 12, 0.18)",
                glow: "rgba(194, 65, 12, 0.3)",
                border: "rgba(51, 65, 85, 0.45)",
                text: "#C2410C",
            },
        };
    }

    return {
        cyan: {
            bg: "rgba(0, 240, 255, 0.12)",
            glow: "rgba(0, 240, 255, 0.35)",
            border: "rgba(0, 240, 255, 0.3)",
            text: "#67E8F9",
        },
        violet: {
            bg: "rgba(139, 92, 246, 0.14)",
            glow: "rgba(139, 92, 246, 0.35)",
            border: "rgba(139, 92, 246, 0.3)",
            text: "#C4B5FD",
        },
        orange: {
            bg: "rgba(255, 107, 53, 0.14)",
            glow: "rgba(255, 107, 53, 0.35)",
            border: "rgba(255, 107, 53, 0.3)",
            text: "#FDBA74",
        },
    };
};

const iconMap: Record<OrbitIconType, IconType> = {
    react: SiReact,
    typescript: SiTypescript,
    nextjs: SiNextdotjs,
    javascript: SiJavascript,
    python: SiPython,
    ml: SiScikitlearn,
    data: SiPandas,
    tailwindcss: SiTailwindcss,
    nodejs: SiNodedotjs,
    oracleoci: SiOracle,
    leetcode: SiLeetcode,
    genai: SiOpenai,
    cplusplus: SiCplusplus,
};

const getIconBrandColors = (isLightMode: boolean): Record<OrbitIconType, string> => ({
    react: "#61DAFB",
    typescript: "#3178C6",
    nextjs: isLightMode ? "#0F172A" : "#F1F5F9",
    javascript: "#F7DF1E",
    python: "#3776AB",
    ml: "#F7931E",
    data: isLightMode ? "#1E3A8A" : "#150458",
    tailwindcss: "#06B6D4",
    nodejs: "#339933",
    oracleoci: "#F80000",
    leetcode: "#FFA116",
    genai: "#10A37F",
    cplusplus: "#00599C",
});

const OrbitIcon = memo(function OrbitIcon({ icon, isLightMode }: { icon: OrbitIconType; isLightMode: boolean }) {
    const Icon = iconMap[icon] ?? SiReact;
    const iconBrandColors = getIconBrandColors(isLightMode);
    return <Icon className="w-full h-full" style={{ color: iconBrandColors[icon] }} aria-hidden="true" />;
});

const OrbitingSkill = memo(function OrbitingSkill({ config, angle, paletteMap, isLightMode }: OrbitingSkillProps) {
    const [hovered, setHovered] = useState(false);
    const x = Math.cos(angle) * config.orbitRadius;
    const y = Math.sin(angle) * config.orbitRadius;
    const palette = paletteMap[config.glowColor];

    return (
        <div
            className="absolute top-1/2 left-1/2 transition-transform duration-300 ease-out"
            style={{
                width: `${config.iconSize}px`,
                height: `${config.iconSize}px`,
                transform: `translate(calc(${x}px - 50%), calc(${y}px - 50%))`,
                zIndex: hovered ? 40 : 20,
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <div
                className="relative w-full h-full rounded-full flex items-center justify-center backdrop-blur-md border"
                style={{
                    color: palette.text,
                    background: hovered ? "var(--bg-secondary)" : isLightMode ? "rgba(255,255,255,0.95)" : "var(--bg-card)",
                    borderColor: palette.border,
                    boxShadow: hovered
                        ? `0 0 24px ${palette.glow}, 0 0 44px ${palette.glow}`
                        : `0 0 14px ${palette.glow}`,
                    transform: hovered ? "scale(1.2)" : "scale(1)",
                    transition: "all 220ms ease",
                }}
            >
                <div className="w-[55%] h-[55%]">
                    <OrbitIcon icon={config.icon} isLightMode={isLightMode} />
                </div>
                <span
                    className="absolute -bottom-9 left-1/2 -translate-x-1/2 text-[11px] font-mono px-2 py-1 rounded whitespace-nowrap pointer-events-none"
                    style={{
                        opacity: hovered ? 1 : 0,
                        background: "var(--bg-secondary)",
                        color: "var(--text-primary)",
                        border: "1px solid var(--glass-border)",
                        transform: hovered ? "translate(-50%, 0)" : "translate(-50%, 6px)",
                        transition: "all 180ms ease",
                    }}
                >
                    {config.label}
                </span>
            </div>
        </div>
    );
});

const GlowingOrbitPath = memo(function GlowingOrbitPath({ radius, glowColor, delay = 0, paletteMap }: GlowingOrbitPathProps) {
    const palette = paletteMap[glowColor];

    return (
        <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
            style={{
                width: `${radius * 2}px`,
                height: `${radius * 2}px`,
            }}
        >
            <div
                className="absolute inset-0 rounded-full"
                style={{
                    background: `radial-gradient(circle, transparent 62%, ${palette.bg} 80%, ${palette.glow} 100%)`,
                    border: `1px solid ${palette.border}`,
                    boxShadow: `inset 0 0 28px ${palette.glow}, 0 0 38px ${palette.glow}`,
                    animation: `pulse 4.5s ease-in-out ${delay}s infinite`,
                }}
            />
        </div>
    );
});

export default function OrbitingSkills({ skills, size = 460 }: OrbitingSkillsProps) {
    const [time, setTime] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [isLightMode, setIsLightMode] = useState(false);

    useEffect(() => {
        const updateThemeState = () => {
            const html = document.documentElement;
            setIsLightMode(html.classList.contains('light-mode'));
        };

        updateThemeState();

        const observer = new MutationObserver(updateThemeState);
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

        return () => observer.disconnect();
    }, []);

    const paletteMap = useMemo(() => getOrbitPalette(isLightMode), [isLightMode]);

    useEffect(() => {
        if (isPaused) return;

        let animationFrameId = 0;
        let previous = performance.now();

        const animate = (now: number) => {
            const delta = (now - previous) / 1000;
            previous = now;
            setTime((t) => t + delta);
            animationFrameId = window.requestAnimationFrame(animate);
        };

        animationFrameId = window.requestAnimationFrame(animate);
        return () => window.cancelAnimationFrame(animationFrameId);
    }, [isPaused]);

    const skillConfigs = useMemo<SkillConfig[]>(() => {
        const grouped: Record<OrbitRing, OrbitingSkillItem[]> = {
            inner: [],
            middle: [],
            outer: [],
        };

        skills.forEach((skill) => {
            grouped[skill.ring].push(skill);
        });

        return (Object.keys(grouped) as OrbitRing[]).flatMap((ring) => {
            const items = grouped[ring];
            const { radius, iconSize, speed, color } = ringConfig[ring];

            return items.map((item, index) => ({
                ...item,
                orbitRadius: radius,
                iconSize,
                speed,
                phaseShift: (index / Math.max(items.length, 1)) * Math.PI * 2,
                glowColor: item.color ?? color,
            }));
        });
    }, [skills]);

    return (
        <div className="w-full flex items-center justify-center overflow-hidden">
            <div
                className="relative flex items-center justify-center rounded-2xl"
                style={{
                    width: `min(calc(100vw - 32px), ${size}px)`,
                    height: `min(calc(100vw - 32px), ${size}px)`,
                    background:
                        "radial-gradient(circle at 20% 20%, rgba(0,240,255,0.12), transparent 40%), radial-gradient(circle at 80% 82%, rgba(139,92,246,0.14), transparent 45%), radial-gradient(circle at 50% 20%, rgba(255,107,53,0.1), transparent 38%), var(--glass-bg)",
                    border: "1px solid var(--glass-border)",
                }}
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
            >
                <div className="absolute inset-0 rounded-2xl opacity-50 pointer-events-none" style={{ background: "linear-gradient(120deg, rgba(15,23,42,0.35), rgba(2,6,23,0.08))" }} />

                <GlowingOrbitPath radius={ringConfig.inner.radius} glowColor="cyan" delay={0} paletteMap={paletteMap} />
                <GlowingOrbitPath radius={ringConfig.middle.radius} glowColor="violet" delay={0.5} paletteMap={paletteMap} />
                <GlowingOrbitPath radius={ringConfig.outer.radius} glowColor="orange" delay={1} paletteMap={paletteMap} />

                <div className="relative w-24 h-24 rounded-full z-30 flex items-center justify-center" style={{ background: "linear-gradient(135deg, var(--bg-secondary), var(--bg-primary))", border: "1px solid var(--glass-border)", boxShadow: "0 0 26px rgba(99, 102, 241, 0.35)" }}>
                    <Code2 className="w-11 h-11" style={{ color: "var(--text-primary)" }} />
                </div>

                {skillConfigs.map((config) => {
                    const angle = time * config.speed + config.phaseShift;
                    return <OrbitingSkill key={config.id} config={config} angle={angle} paletteMap={paletteMap} isLightMode={isLightMode} />;
                })}
            </div>
        </div>
    );
}
