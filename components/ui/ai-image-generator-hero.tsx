"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface ImageCard {
    id: string
    src: string
    alt: string
    rotation: number
}

interface ImageCarouselHeroProps {
    title: string
    subtitle: string
    description: string
    ctaText: string
    onCtaClick?: () => void
    images: ImageCard[]
    features?: Array<{
        title: string
        description: string
    }>
}

export function ImageCarouselHero({
    title,
    subtitle,
    description,
    ctaText,
    onCtaClick,
    images,
    features = [
        {
            title: "Realistic Results",
            description: "Realistic Results Photos that look professionally crafted",
        },
        {
            title: "Fast Generation",
            description: "Turn ideas into images in seconds.",
        },
        {
            title: "Diverse Styles",
            description: "Choose from a wide range of artistic options.",
        },
    ],
}: ImageCarouselHeroProps) {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
    const [isHovering, setIsHovering] = useState(false)
    const [rotatingCards, setRotatingCards] = useState<number[]>([])

    // Continuous rotation animation
    useEffect(() => {
        const interval = setInterval(() => {
            setRotatingCards((prev) => prev.map((_, i) => (prev[i] + 0.5) % 360))
        }, 50)

        return () => clearInterval(interval)
    }, [])

    // Initialize rotating cards
    useEffect(() => {
        setRotatingCards(images.map((_, i) => i * (360 / images.length)))
    }, [images])

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect()
        setMousePosition({
            x: (e.clientX - rect.left) / rect.width,
            y: (e.clientY - rect.top) / rect.height,
        })
    }

    return (
        <div className="relative w-full min-h-screen overflow-hidden"
            style={{ background: 'var(--bg-primary)' }}>
            {/* Animated background gradient */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl animate-pulse"
                    style={{ background: 'rgba(0,240,255,0.05)' }} />
                <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full blur-3xl animate-pulse"
                    style={{ background: 'rgba(139,92,246,0.05)' }} />
            </div>

            <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
                {/* Carousel Container */}
                <div
                    className="relative w-full max-w-6xl h-96 sm:h-[500px] mb-12 sm:mb-16"
                    onMouseMove={handleMouseMove}
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                >
                    {/* Rotating Image Cards */}
                    <div className="absolute inset-0 flex items-center justify-center" style={{ perspective: '1200px' }}>
                        {images.map((image, index) => {
                            const angle = (rotatingCards[index] || 0) * (Math.PI / 180)
                            const radius = 180
                            const x = Math.cos(angle) * radius
                            const y = Math.sin(angle) * radius

                            const perspectiveX = (mousePosition.x - 0.5) * 20
                            const perspectiveY = (mousePosition.y - 0.5) * 20

                            return (
                                <div
                                    key={image.id}
                                    className="absolute w-32 h-40 sm:w-40 sm:h-48 transition-all duration-300"
                                    style={{
                                        transform: `
                      translate(${x}px, ${y}px)
                      rotateX(${perspectiveY}deg)
                      rotateY(${perspectiveX}deg)
                      rotateZ(${image.rotation}deg)
                    `,
                                        transformStyle: "preserve-3d",
                                    }}
                                >
                                    <div
                                        className={cn(
                                            "relative w-full h-full rounded-2xl overflow-hidden shadow-2xl",
                                            "transition-all duration-300 hover:scale-110",
                                            "cursor-pointer group",
                                        )}
                                        style={{ transformStyle: "preserve-3d" }}
                                    >
                                        <Image
                                            src={image.src || "/placeholder.svg"}
                                            alt={image.alt}
                                            fill
                                            sizes="(min-width: 640px) 160px, 128px"
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                            draggable={false}
                                        />
                                        {/* Shine effect */}
                                        <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>

                {/* Content Section */}
                <div className="relative z-20 text-center max-w-2xl mx-auto mb-12 sm:mb-16">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold mb-4 sm:mb-6 text-balance leading-tight"
                        style={{ color: 'var(--text-primary)' }}>
                        {title}
                    </h1>

                    <p className="text-lg sm:text-xl mb-8 text-balance"
                        style={{ color: 'var(--text-secondary)' }}>
                        {description}
                    </p>

                    {/* CTA Button */}
                    <button
                        onClick={onCtaClick}
                        className={cn(
                            "inline-flex items-center gap-2 px-8 py-3 rounded-full",
                            "text-white font-medium",
                            "hover:shadow-lg hover:scale-105 transition-all duration-300",
                            "active:scale-95 focus:outline-none",
                            "group",
                        )}
                        style={{
                            background: 'linear-gradient(135deg, #00F0FF, #8B5CF6)',
                            boxShadow: '0 4px 20px rgba(0,240,255,0.3)',
                        }}
                    >
                        {ctaText}
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>

                {/* Features Section */}
                <div className="relative z-20 w-full max-w-4xl grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mt-12 sm:mt-16">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className={cn(
                                "text-center p-6 rounded-xl",
                                "backdrop-blur-sm",
                                "transition-all duration-300",
                                "group",
                            )}
                            style={{
                                background: 'var(--glass-bg)',
                                border: '1px solid var(--glass-border)',
                            }}
                        >
                            <h3 className="text-lg sm:text-xl font-semibold mb-2 group-hover:text-[#00F0FF] transition-colors"
                                style={{ color: 'var(--text-primary)' }}>
                                {feature.title}
                            </h3>
                            <p className="text-sm sm:text-base"
                                style={{ color: 'var(--text-secondary)' }}>
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
