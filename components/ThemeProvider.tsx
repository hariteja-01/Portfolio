'use client';

import {
    createContext,
    useContext,
    useState,
    useEffect,
    useCallback,
    ReactNode,
} from 'react';

type Theme = 'dark' | 'light';

interface ThemeContextValue {
    theme: Theme;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue>({
    theme: 'dark',
    toggleTheme: () => { },
});

const darkVars: Record<string, string> = {
    '--bg-primary': '#0A0A0F',
    '--bg-secondary': '#111118',
    '--bg-card': 'rgba(255,255,255,0.05)',
    '--text-primary': '#F1F1F1',
    '--text-secondary': '#6B7280',
    '--border-color': 'rgba(255,255,255,0.1)',
    '--glass-bg': 'rgba(255,255,255,0.05)',
    '--glass-border': 'rgba(255,255,255,0.1)',
    '--glass-shadow': '0 8px 32px rgba(0,0,0,0.4)',
    '--cursor-glow': 'rgba(0,240,255,0.15)',
};

const lightVars: Record<string, string> = {
    '--bg-primary': '#F6F7FB',
    '--bg-secondary': '#FFFFFF',
    '--bg-card': 'rgba(255,255,255,0.82)',
    '--text-primary': '#111827',
    '--text-secondary': '#4B5563',
    '--border-color': 'rgba(15,23,42,0.12)',
    '--glass-bg': 'rgba(255,255,255,0.84)',
    '--glass-border': 'rgba(15,23,42,0.1)',
    '--glass-shadow': '0 14px 40px rgba(15,23,42,0.09)',
    '--cursor-glow': 'rgba(0,240,255,0.12)',
    '--text-tertiary': 'rgba(17,24,39,0.52)',
};

function updateFavicon(theme: Theme) {
    // Inline SVG favicons that switch with theme
    const darkFavicon = `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" rx="8" fill="%230A0A0F"/><text x="50%" y="50%" dominant-baseline="central" text-anchor="middle" font-size="20" font-family="monospace" fill="%2300F0FF">&lt;&gt;</text></svg>`;
    const lightFavicon = `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" rx="8" fill="%23F5F5F7"/><text x="50%" y="50%" dominant-baseline="central" text-anchor="middle" font-size="20" font-family="monospace" fill="%230891B2">&lt;&gt;</text></svg>`;

    let link = document.querySelector<HTMLLinkElement>('link[rel="icon"]');
    if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.head.appendChild(link);
    }
    link.href = theme === 'dark' ? darkFavicon : lightFavicon;
}

function applyTheme(theme: Theme) {
    const vars = theme === 'dark' ? darkVars : lightVars;
    const root = document.documentElement;
    Object.entries(vars).forEach(([key, value]) => {
        root.style.setProperty(key, value);
    });
    if (theme === 'light') {
        root.classList.add('light-mode');
        root.classList.remove('dark');
    } else {
        root.classList.add('dark');
        root.classList.remove('light-mode');
    }
    updateFavicon(theme);
}

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [theme, setTheme] = useState<Theme>('dark');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem('portfolio-theme') as Theme | null;
        const initial = saved === 'light' ? 'light' : 'dark';
        setTheme(initial);
        applyTheme(initial);
        setMounted(true);
    }, []);

    const toggleTheme = useCallback(() => {
        setTheme((prev) => {
            const next = prev === 'dark' ? 'light' : 'dark';
            localStorage.setItem('portfolio-theme', next);
            applyTheme(next);
            return next;
        });
    }, []);

    if (!mounted) {
        return <>{children}</>;
    }

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    return useContext(ThemeContext);
}
