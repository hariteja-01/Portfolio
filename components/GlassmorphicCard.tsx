'use client';

import { ReactNode } from 'react';

interface GlassmorphicCardProps {
    children: ReactNode;
    className?: string;
    hoverColor?: string;
    hoverGlow?: boolean;
}

export default function GlassmorphicCard({
    children,
    className = '',
    hoverColor = '#00F0FF',
    hoverGlow = false,
}: GlassmorphicCardProps) {
    return (
        <div
            className={`transition-all duration-300 ${className}`}
            style={{
                background: 'var(--glass-bg)',
                backdropFilter: 'blur(20px) saturate(180%)',
                WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                border: '1px solid var(--glass-border)',
                borderRadius: 16,
                boxShadow: 'var(--glass-shadow)',
            }}
            onMouseEnter={(e) => {
                if (hoverGlow) {
                    const el = e.currentTarget;
                    el.style.borderColor = hoverColor;
                    el.style.boxShadow = `0 8px 40px ${hoverColor}26, var(--glass-shadow)`;
                    el.style.transform = 'translateY(-4px)';
                }
            }}
            onMouseLeave={(e) => {
                if (hoverGlow) {
                    const el = e.currentTarget;
                    el.style.borderColor = 'var(--glass-border)';
                    el.style.boxShadow = 'var(--glass-shadow)';
                    el.style.transform = 'translateY(0)';
                }
            }}
        >
            {children}
        </div>
    );
}
