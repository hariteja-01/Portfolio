'use client';

interface ArrowNavigationProps {
    onPrev: () => void;
    onNext: () => void;
}

export default function ArrowNavigation({
    onPrev,
    onNext,
}: ArrowNavigationProps) {
    return (
        <>
            {/* Left Arrow */}
            <button
                onClick={onPrev}
                className="fixed left-4 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-white/10 backdrop-blur border border-white/10 hidden md:flex items-center justify-center text-white text-xl opacity-50 hover:opacity-100 hover:bg-white/20 transition-all duration-300"
                aria-label="Previous project"
            >
                ‹
            </button>

            {/* Right Arrow */}
            <button
                onClick={onNext}
                className="fixed right-4 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-white/10 backdrop-blur border border-white/10 hidden md:flex items-center justify-center text-white text-xl opacity-50 hover:opacity-100 hover:bg-white/20 transition-all duration-300"
                aria-label="Next project"
            >
                ›
            </button>
        </>
    );
}
