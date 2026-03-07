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
                className="fixed left-4 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full backdrop-blur hidden md:flex items-center justify-center text-xl opacity-50 hover:opacity-100 transition-all duration-300"
                style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', color: 'var(--text-primary)' }}
                aria-label="Previous project"
            >
                ‹
            </button>

            {/* Right Arrow */}
            <button
                onClick={onNext}
                className="fixed right-4 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full backdrop-blur hidden md:flex items-center justify-center text-xl opacity-50 hover:opacity-100 transition-all duration-300"
                style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', color: 'var(--text-primary)' }}
                aria-label="Next project"
            >
                ›
            </button>
        </>
    );
}
