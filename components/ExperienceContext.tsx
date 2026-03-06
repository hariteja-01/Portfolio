'use client';

import {
    createContext,
    useContext,
    useState,
    useCallback,
    useEffect,
    ReactNode,
} from 'react';

type ExperienceMode = 'cinematic' | 'minimal';

interface ExperienceContextValue {
    experienceMode: ExperienceMode;
    soundEnabled: boolean;
    competitiveModeActive: boolean;
    toggleExperienceMode: () => void;
    toggleSound: () => void;
    setCompetitiveMode: (val: boolean) => void;
}

const ExperienceContext = createContext<ExperienceContextValue>({
    experienceMode: 'cinematic',
    soundEnabled: false,
    competitiveModeActive: false,
    toggleExperienceMode: () => { },
    toggleSound: () => { },
    setCompetitiveMode: () => { },
});

export function ExperienceProvider({ children }: { children: ReactNode }) {
    const [experienceMode, setExperienceMode] = useState<ExperienceMode>('cinematic');
    const [soundEnabled, setSoundEnabled] = useState(false);
    const [competitiveModeActive, setCompetitiveModeActive] = useState(false);

    // Persist experience mode preference
    useEffect(() => {
        const saved = localStorage.getItem('portfolio-experience') as ExperienceMode | null;
        if (saved === 'minimal') setExperienceMode('minimal');
    }, []);

    const toggleExperienceMode = useCallback(() => {
        setExperienceMode((prev) => {
            const next = prev === 'cinematic' ? 'minimal' : 'cinematic';
            localStorage.setItem('portfolio-experience', next);
            // Apply/remove minimal class on body
            if (next === 'minimal') {
                document.documentElement.classList.add('minimal-mode');
            } else {
                document.documentElement.classList.remove('minimal-mode');
            }
            return next;
        });
    }, []);

    const toggleSound = useCallback(() => {
        setSoundEnabled((prev) => !prev);
    }, []);

    const setCompetitiveMode = useCallback((val: boolean) => {
        setCompetitiveModeActive(val);
    }, []);

    // Apply minimal class if saved on mount
    useEffect(() => {
        const saved = localStorage.getItem('portfolio-experience');
        if (saved === 'minimal') {
            document.documentElement.classList.add('minimal-mode');
        }
    }, []);

    return (
        <ExperienceContext.Provider
            value={{
                experienceMode,
                soundEnabled,
                competitiveModeActive,
                toggleExperienceMode,
                toggleSound,
                setCompetitiveMode,
            }}
        >
            {children}
        </ExperienceContext.Provider>
    );
}

export function useExperience() {
    return useContext(ExperienceContext);
}
