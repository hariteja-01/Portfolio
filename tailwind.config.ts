import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                cyan: {
                    DEFAULT: "#00F0FF",
                    400: "#00F0FF",
                    500: "#00D4E0",
                },
                violet: {
                    DEFAULT: "#8B5CF6",
                    400: "#8B5CF6",
                    500: "#7C3AED",
                },
                orange: {
                    DEFAULT: "#FF6B35",
                    400: "#FF6B35",
                    500: "#EA580C",
                },
                gold: {
                    DEFAULT: "#FFB74D",
                    400: "#FFB74D",
                },
                void: "#0A0A0F",
            },
            keyframes: {
                float: {
                    "0%, 100%": { transform: "translateY(0px)" },
                    "50%": { transform: "translateY(-10px)" },
                },
                marquee: {
                    "0%": { transform: "translateX(0%)" },
                    "100%": { transform: "translateX(-50%)" },
                },
                "hero-orb-1": {
                    "0%, 100%": { transform: "translate(0, 0)" },
                    "25%": { transform: "translate(80px, -60px)" },
                    "50%": { transform: "translate(-40px, 40px)" },
                    "75%": { transform: "translate(60px, 80px)" },
                },
                "hero-orb-2": {
                    "0%, 100%": { transform: "translate(0, 0)" },
                    "25%": { transform: "translate(-60px, 80px)" },
                    "50%": { transform: "translate(80px, -40px)" },
                    "75%": { transform: "translate(-80px, -60px)" },
                },
                "hero-orb-3": {
                    "0%, 100%": { transform: "translate(0, 0)" },
                    "33%": { transform: "translate(60px, -80px)" },
                    "66%": { transform: "translate(-80px, 40px)" },
                },
                "hero-orb-4": {
                    "0%, 100%": { transform: "translate(0, 0)" },
                    "40%": { transform: "translate(-50px, 60px)" },
                    "80%": { transform: "translate(50px, -40px)" },
                },
            },
            animation: {
                float: "float 3s ease-in-out infinite",
                marquee: "marquee 20s linear infinite",
                "hero-orb-1": "hero-orb-1 25s ease-in-out infinite",
                "hero-orb-2": "hero-orb-2 30s ease-in-out infinite",
                "hero-orb-3": "hero-orb-3 22s ease-in-out infinite",
                "hero-orb-4": "hero-orb-4 28s ease-in-out infinite",
            },
        },
    },
    plugins: [],
};

export default config;
