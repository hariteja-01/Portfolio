import { useMemo } from 'react';

export type DeviceTier = 'low' | 'mid' | 'high';

export interface DeviceCapability {
    tier: DeviceTier;
    cores: number;
    memory: number; // GB - may be 0 if not available
}

/**
 * Returns device performance tier based on navigator.hardwareConcurrency
 * and navigator.deviceMemory (where available).
 * Memoized - computed once on mount.
 */
export function useDeviceCapability(): DeviceCapability {
    return useMemo(() => {
        if (typeof window === 'undefined') {
            return { tier: 'high', cores: 8, memory: 8 };
        }

        const cores = navigator.hardwareConcurrency ?? 4;
        // @ts-ignore - deviceMemory is not in all TS libs yet
        const memory: number = (navigator as any).deviceMemory ?? 4;

        let tier: DeviceTier = 'high';

        if (cores <= 2 || memory <= 2) {
            tier = 'low';
        } else if (cores <= 4 || memory <= 4) {
            tier = 'mid';
        }

        return { tier, cores, memory };
    }, []);
}

/**
 * Returns max particle count for SparkleBackground based on device tier.
 */
export function getParticleCount(tier: DeviceTier): number {
    switch (tier) {
        case 'low': return 25;
        case 'mid': return 50;
        case 'high': return 80;
    }
}

/**
 * Returns shadow blur intensity for sparkles based on device tier.
 */
export function getShadowBlur(tier: DeviceTier, baseSize: number): number {
    switch (tier) {
        case 'low': return baseSize * 2;
        case 'mid': return baseSize * 3;
        case 'high': return baseSize * 4;
    }
}
