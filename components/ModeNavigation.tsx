'use client';

import { useState } from 'react';
import { PortfolioMode } from '@/data/portfolio';

interface ModeNavigationProps {
    modes: PortfolioMode[];
    currentIndex: number;
    onSelect: (index: number) => void;
}

export default function ModeNavigation({
    modes,
    currentIndex,
    onSelect,
}: ModeNavigationProps) {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    return (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
            <div className="flex items-center gap-3 backdrop-blur-xl rounded-full px-6 py-3" style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', boxShadow: 'var(--glass-shadow)' }}>
                {modes.map((mode, i) => (
                    <div key={mode.id} className="flex items-center gap-3">
                        {/* Dot */}
                        <div className="relative">
                            <button
                                onClick={() => onSelect(i)}
                                onMouseEnter={() => setHoveredIndex(i)}
                                onMouseLeave={() => setHoveredIndex(null)}
                                className="transition-all duration-300 rounded-full"
                                style={{
                                    width: i === currentIndex ? 12 : 10,
                                    height: i === currentIndex ? 12 : 10,
                                    background:
                                        i === currentIndex ? mode.themeColor : '#4B5563',
                                    transform: i === currentIndex ? 'scale(1.25)' : 'scale(1)',
                                    boxShadow:
                                        i === currentIndex
                                            ? `0 0 10px ${mode.themeColor}40`
                                            : 'none',
                                }}
                                aria-label={`View ${mode.name}`}
                            />
                            {/* Tooltip */}
                            {hoveredIndex === i && (
                                <div
                                    className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap pointer-events-none"
                                    style={{
                                        background: 'var(--bg-primary)',
                                        border: `1px solid ${mode.themeColor}30`,
                                        color: mode.themeColor,
                                    }}
                                >
                                    {mode.name}
                                    <div
                                        className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0"
                                        style={{
                                            borderLeft: '4px solid transparent',
                                            borderRight: '4px solid transparent',
                                            borderTop: '4px solid var(--bg-primary)',
                                        }}
                                    />
                                </div>
                            )}
                        </div>

                        {/* Separator */}
                        {i < modes.length - 1 && (
                            <div className="w-px h-4" style={{ background: 'var(--border-color)' }} />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
