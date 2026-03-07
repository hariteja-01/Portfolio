'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import GlassmorphicCard from '@/components/GlassmorphicCard';
import emailjs from '@emailjs/browser';

// Dynamically import Lottie to avoid SSR issues
const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

// Import Lottie animation data
import contactAnimation from '@/public/Contact_us.json';

export default function ContactSection() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });
    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        setStatus('sending');

        emailjs
            .send(
                'service_irddtaj',
                'template_qlcfc08',
                {
                    from_name: formData.name,
                    from_email: formData.email,
                    subject: formData.subject,
                    message: formData.message,
                },
                'ofRC8JbWo4PRvixus'
            )
            .then(() => {
                setStatus('success');
                setFormData({ name: '', email: '', subject: '', message: '' });
                setTimeout(() => setStatus('idle'), 4000);
            })
            .catch(() => {
                setStatus('error');
                setTimeout(() => setStatus('idle'), 4000);
            });
    };

    return (
        <section id="contact" className="py-32 px-6">
            <motion.div
                className="max-w-5xl mx-auto"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true, amount: 0.2 }}
            >
                {/* Heading */}
                <h2
                    className="text-4xl md:text-5xl font-black"
                    style={{ color: 'var(--text-primary)' }}
                >
                    Let&apos;s Build Something
                </h2>
                <h2
                    className="text-4xl md:text-5xl font-black"
                    style={{
                        background: 'linear-gradient(90deg, #00F0FF, #8B5CF6)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                    }}
                >
                    Extraordinary.
                </h2>
                <p
                    className="text-lg mt-4"
                    style={{ color: 'var(--text-secondary)' }}
                >
                    Have a project in mind? Want to collaborate? Or just want to talk
                    algorithms?
                </p>

                {/* Two columns: Lottie on left, Form on right */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12 items-center">
                    {/* Left: Lottie Animation */}
                    <motion.div
                        className="flex items-center justify-center"
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <div className="w-full max-w-md lottie-contact-container">
                            <Lottie
                                animationData={contactAnimation}
                                loop={true}
                                autoplay={true}
                                style={{ width: '100%', height: 'auto' }}
                            />
                        </div>
                    </motion.div>

                    {/* Right: Get in Touch Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <h3
                            className="text-xl font-semibold mb-6"
                            style={{ color: 'var(--text-primary)' }}
                        >
                            Get in Touch
                        </h3>
                        <GlassmorphicCard className="p-8">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <input
                                    type="text"
                                    placeholder="Your name"
                                    value={formData.name}
                                    onChange={(e) =>
                                        setFormData((f) => ({ ...f, name: e.target.value }))
                                    }
                                    className="w-full bg-transparent py-3 outline-none transition-colors"
                                    style={{
                                        borderBottom: '1px solid var(--border-color)',
                                        color: 'var(--text-primary)',
                                    }}
                                    onFocus={(e) => {
                                        e.currentTarget.style.borderColor = '#00F0FF';
                                    }}
                                    onBlur={(e) => {
                                        e.currentTarget.style.borderColor = 'var(--border-color)';
                                    }}
                                />
                                <input
                                    type="email"
                                    placeholder="your@email.com"
                                    value={formData.email}
                                    onChange={(e) =>
                                        setFormData((f) => ({ ...f, email: e.target.value }))
                                    }
                                    className="w-full bg-transparent py-3 outline-none transition-colors"
                                    style={{
                                        borderBottom: '1px solid var(--border-color)',
                                        color: 'var(--text-primary)',
                                    }}
                                    onFocus={(e) => {
                                        e.currentTarget.style.borderColor = '#00F0FF';
                                    }}
                                    onBlur={(e) => {
                                        e.currentTarget.style.borderColor = 'var(--border-color)';
                                    }}
                                />
                                <input
                                    type="text"
                                    placeholder="Subject"
                                    value={formData.subject}
                                    onChange={(e) =>
                                        setFormData((f) => ({ ...f, subject: e.target.value }))
                                    }
                                    className="w-full bg-transparent py-3 outline-none transition-colors"
                                    style={{
                                        borderBottom: '1px solid var(--border-color)',
                                        color: 'var(--text-primary)',
                                    }}
                                    onFocus={(e) => {
                                        e.currentTarget.style.borderColor = '#00F0FF';
                                    }}
                                    onBlur={(e) => {
                                        e.currentTarget.style.borderColor = 'var(--border-color)';
                                    }}
                                />
                                <textarea
                                    placeholder="Tell me about your project..."
                                    rows={4}
                                    value={formData.message}
                                    onChange={(e) =>
                                        setFormData((f) => ({ ...f, message: e.target.value }))
                                    }
                                    className="w-full bg-transparent py-3 outline-none transition-colors resize-none"
                                    style={{
                                        borderBottom: '1px solid var(--border-color)',
                                        color: 'var(--text-primary)',
                                    }}
                                    onFocus={(e) => {
                                        e.currentTarget.style.borderColor = '#00F0FF';
                                    }}
                                    onBlur={(e) => {
                                        e.currentTarget.style.borderColor = 'var(--border-color)';
                                    }}
                                />
                                <button
                                    type="submit"
                                    disabled={status === 'sending'}
                                    className="w-full py-4 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed"
                                    style={{
                                        background: status === 'success'
                                            ? 'linear-gradient(135deg, #10B981, #059669)'
                                            : status === 'error'
                                            ? 'linear-gradient(135deg, #EF4444, #DC2626)'
                                            : 'linear-gradient(135deg, #00F0FF, #8B5CF6)',
                                        boxShadow: '0 4px 20px rgba(0,240,255,0.2)',
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.boxShadow =
                                            '0 8px 30px rgba(0,240,255,0.3)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.boxShadow =
                                            '0 4px 20px rgba(0,240,255,0.2)';
                                    }}
                                >
                                    {status === 'sending'
                                        ? 'Sending...'
                                        : status === 'success'
                                        ? '✓ Message Sent!'
                                        : status === 'error'
                                        ? 'Failed — Try Again'
                                        : 'Send Message →'}
                                </button>
                            </form>
                        </GlassmorphicCard>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
}
