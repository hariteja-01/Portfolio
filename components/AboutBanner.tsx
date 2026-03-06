'use client';

import { motion } from 'framer-motion';
import { profile } from '@/data/portfolio';

const infoCards = [
    { big: '9.18', label: 'CGPA' },
    { big: '800+', label: 'LeetCode' },
    { big: '4', label: 'Certifications' },
    { big: '#1', label: 'State Rank (IMO)' },
];

const certColors = ['#00F0FF', '#8B5CF6', '#FF6B35', '#FFB74D'];

export default function AboutBanner() {
    return (
        <section className="py-16 px-6 border-t border-b border-white/5">
            {/* Info Cards */}
            <motion.div
                className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true, amount: 0.3 }}
            >
                {infoCards.map((card) => (
                    <div
                        key={card.label}
                        className="bg-white/5 border border-white/10 rounded-xl p-4 text-center"
                    >
                        <div className="text-3xl font-black text-cyan-400">{card.big}</div>
                        <div className="text-xs text-gray-500 uppercase tracking-wider mt-1">
                            {card.label}
                        </div>
                    </div>
                ))}
            </motion.div>

            {/* Achievements Marquee */}
            <div className="overflow-hidden mt-10 max-w-4xl mx-auto">
                <div className="animate-marquee flex whitespace-nowrap">
                    {[...Array(2)].map((_, rep) => (
                        <span
                            key={rep}
                            className="text-sm text-gray-500 mx-4 flex-shrink-0"
                        >
                            {profile.achievements.join(' • ')}
                            {' • '}
                        </span>
                    ))}
                </div>
            </div>

            {/* Certifications */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 max-w-4xl mx-auto mt-8">
                {profile.certifications.map((cert, i) => (
                    <motion.div
                        key={cert.title}
                        className="bg-white/5 rounded-r-lg p-3"
                        style={{ borderLeft: `4px solid ${certColors[i % certColors.length]}` }}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: i * 0.1 }}
                        viewport={{ once: true }}
                    >
                        <div className="text-sm font-medium text-white">{cert.title}</div>
                        <div className="text-xs text-gray-500">
                            {cert.issuer} • {cert.date}
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
