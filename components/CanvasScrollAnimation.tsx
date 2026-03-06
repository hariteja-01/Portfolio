'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { useScroll } from 'framer-motion';

interface CanvasScrollAnimationProps {
    folderPath: string;
    frameCount: number;
    themeColor: string;
    scrollWrapperRef: React.RefObject<HTMLDivElement>;
}

export default function CanvasScrollAnimation({
    folderPath,
    frameCount,
    themeColor,
    scrollWrapperRef,
}: CanvasScrollAnimationProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const imagesRef = useRef<HTMLImageElement[]>([]);
    const currentFrameRef = useRef(0);
    const rafIdRef = useRef<number>(0);
    const [loadProgress, setLoadProgress] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);

    const { scrollYProgress } = useScroll({
        target: scrollWrapperRef,
        offset: ['start start', 'end end'],
    });

    const drawFrame = useCallback(
        (frameIndex: number) => {
            const canvas = canvasRef.current;
            if (!canvas) return;
            const ctx = canvas.getContext('2d');
            if (!ctx) return;

            const img = imagesRef.current[frameIndex];
            if (!img || !img.complete || img.naturalWidth === 0) return;

            const cw = canvas.width;
            const ch = canvas.height;
            const iw = img.naturalWidth;
            const ih = img.naturalHeight;

            // object-fit: cover calculation
            const scale = Math.max(cw / iw, ch / ih);
            const sw = iw * scale;
            const sh = ih * scale;
            const sx = (cw - sw) / 2;
            const sy = (ch - sh) / 2;

            ctx.clearRect(0, 0, cw, ch);
            ctx.drawImage(img, sx, sy, sw, sh);
        },
        []
    );

    const renderLoop = useCallback(() => {
        drawFrame(currentFrameRef.current);
        rafIdRef.current = requestAnimationFrame(renderLoop);
    }, [drawFrame]);

    // Load images
    useEffect(() => {
        const images: HTMLImageElement[] = [];
        let loaded = 0;

        for (let i = 1; i <= frameCount; i++) {
            const img = new Image();
            img.src = `${folderPath}/${i}.jpg`;
            img.onload = () => {
                loaded++;
                setLoadProgress(Math.floor((loaded / frameCount) * 100));
                if (loaded === frameCount) {
                    setIsLoaded(true);
                }
            };
            img.onerror = () => {
                loaded++;
                setLoadProgress(Math.floor((loaded / frameCount) * 100));
                if (loaded === frameCount) {
                    setIsLoaded(true);
                }
            };
            images.push(img);
        }
        imagesRef.current = images;

        return () => {
            imagesRef.current = [];
        };
    }, [folderPath, frameCount]);

    // Set canvas size
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            drawFrame(currentFrameRef.current);
        };

        resize();
        window.addEventListener('resize', resize);
        return () => window.removeEventListener('resize', resize);
    }, [drawFrame]);

    // Start render loop
    useEffect(() => {
        rafIdRef.current = requestAnimationFrame(renderLoop);
        return () => cancelAnimationFrame(rafIdRef.current);
    }, [renderLoop]);

    // Listen to scroll progress
    useEffect(() => {
        const unsubscribe = scrollYProgress.on('change', (v) => {
            const frameIndex = Math.min(
                frameCount - 1,
                Math.floor(v * frameCount)
            );
            currentFrameRef.current = frameIndex;
        });
        return () => unsubscribe();
    }, [scrollYProgress, frameCount]);

    return (
        <div
            style={{
                position: 'sticky',
                top: 0,
                height: '100vh',
                width: '100vw',
                overflow: 'hidden',
            }}
        >
            <canvas
                ref={canvasRef}
                style={{
                    display: 'block',
                    width: '100%',
                    height: '100%',
                }}
            />
            {!isLoaded && (
                <div
                    style={{
                        position: 'absolute',
                        inset: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: '#0A0A0F',
                        zIndex: 10,
                    }}
                >
                    <div
                        style={{
                            width: 200,
                            height: 3,
                            background: 'rgba(255,255,255,0.1)',
                            borderRadius: 2,
                            overflow: 'hidden',
                        }}
                    >
                        <div
                            style={{
                                width: `${loadProgress}%`,
                                height: '100%',
                                background: themeColor,
                                borderRadius: 2,
                                transition: 'width 0.2s ease',
                            }}
                        />
                    </div>
                    <p
                        style={{
                            color: 'rgba(255,255,255,0.4)',
                            fontSize: 12,
                            marginTop: 12,
                            fontFamily: 'monospace',
                            letterSpacing: 2,
                        }}
                    >
                        LOADING {loadProgress}%
                    </p>
                </div>
            )}
        </div>
    );
}
