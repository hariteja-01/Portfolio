import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ExperienceProvider } from "@/components/ExperienceContext";

const inter = Inter({ subsets: ["latin"], display: 'swap' });

const BASE_URL = 'https://hariteja.dev';

export const metadata: Metadata = {
    metadataBase: new URL(BASE_URL),
    title: {
        default: "Hari Teja Patnala | SDE, ML Engineer, AI Architect",
        template: "%s | Hari Teja Patnala",
    },
    description:
        "SDE, ML Engineer & AI Architect - 900+ LeetCode problems, Oracle Cloud certified. Building intelligent systems at the intersection of algorithms, ML, and high-performance web engineering.",
    keywords: [
        'Algorithm Engineer', 'AI Architect', 'Full Stack Developer',
        'Machine Learning', 'React', 'Next.js', 'LeetCode', 'Oracle Cloud',
        'Hari Teja Patnala', 'Portfolio', 'Data Science'
    ],
    authors: [{ name: 'Hari Teja Patnala' }],
    creator: 'Hari Teja Patnala',
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: BASE_URL,
        title: 'Hari Teja Patnala | SDE, ML Engineer, AI Architect',
        description:
            'SDE, ML Engineer & AI Architect - 900+ LeetCode problems, Oracle Cloud certified. Building intelligent systems at the intersection of algorithms, ML, and modern web engineering.',
        siteName: 'Hari Teja Patnala Portfolio',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Hari Teja Patnala | SDE, ML Engineer, AI Architect',
        description:
            'SDE, ML Engineer & AI Architect - 900+ LeetCode problems, Oracle Cloud certified.',
        creator: '@hariteja01',
    },
    robots: {
        index: true,
        follow: true,
        googleBot: { index: true, follow: true },
    },
};

const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Hari Teja Patnala',
    jobTitle: 'SDE, ML Engineer & AI Architect',
    description: 'SDE, ML Engineer & AI Architect - 900+ LeetCode problems, Oracle Cloud certified.',
    url: BASE_URL,
    sameAs: [
        'https://linkedin.com/in/hari-teja-patnala',
        'https://github.com/hariteja-01',
        'https://leetcode.com/u/hariteja01',
    ],
    alumniOf: {
        '@type': 'EducationalOrganization',
        name: 'Lovely Professional University',
    },
    knowsAbout: ['Algorithms', 'Machine Learning', 'React', 'TypeScript', 'System Design', 'AI'],
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className="dark">
            <head>
                <script
                    dangerouslySetInnerHTML={{
                        __html: `(() => {
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }
  window.scrollTo(0, 0);
})();`,
                    }}
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
            </head>
            <body className={inter.className}>
                <ThemeProvider>
                    <ExperienceProvider>
                        {children}
                    </ExperienceProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
