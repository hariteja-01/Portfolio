# Hari Teja Patnala — Portfolio

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-3178C6?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-11.15-FF0055?style=for-the-badge&logo=framer)

**Algorithm Systems Engineer & AI Architect**

*900+ LeetCode Problems • Oracle OCI Certified • IMO State Rank 1*

[Live Demo](https://hariteja.dev) • [LinkedIn](https://linkedin.com/in/hari-teja-patnala) • [GitHub](https://github.com/hariteja-01)

</div>

---

## ✨ Overview

A modern, immersive portfolio website showcasing projects in algorithm engineering, AI/ML, and full-stack development. Built with cutting-edge web technologies featuring:

- 🎬 **Scroll-driven canvas animations** with frame-by-frame video playback
- 🎨 **Lottie animations** for loading screen, hero section, and contact area
- 🌓 **Dark/Light theme** with smooth transitions and theme-aware assets
- 📱 **Fully responsive** design optimized for all devices
- ⚡ **Performance optimized** with static export for CDN deployment
- 🎯 **Custom cursor** and interactive micro-animations

---

## 🏗️ Tech Stack

| Category | Technologies |
|----------|-------------|
| **Framework** | Next.js 14 (App Router, Static Export) |
| **Language** | TypeScript 5.3 |
| **Styling** | Tailwind CSS 3.4, CSS Variables |
| **Animation** | Framer Motion, GSAP, Lottie |
| **Icons** | Lucide React |
| **Audio** | Howler.js |

---

## 📂 Project Structure

```
├── app/
│   ├── globals.css         # Global styles & CSS variables
│   ├── layout.tsx          # Root layout with metadata & providers
│   └── page.tsx            # Main portfolio page
├── components/
│   ├── sections/           # Major page sections
│   │   ├── HeroSection.tsx
│   │   ├── AboutSection.tsx
│   │   ├── ProjectCardStack.tsx
│   │   ├── ImpactMetricsSection.tsx
│   │   └── EngineeringPhilosophySection.tsx
│   ├── ui/                 # Reusable UI components
│   ├── Navbar.tsx          # Theme-aware navigation
│   ├── Footer.tsx          # Social links with tooltips
│   ├── LoadingScreen.tsx   # Lottie loader + scrolling quotes
│   ├── ContactSection.tsx  # Contact form with Lottie
│   ├── ThemeProvider.tsx   # Dark/Light mode context
│   └── ...                 # Additional components
├── data/
│   └── portfolio.ts        # Project data & profile info
├── public/
│   ├── images/             # Project screenshots & videos
│   ├── *.json              # Lottie animation files
│   └── *.svg/*.png         # Logo assets
└── lib/
    ├── utils.ts            # Utility functions
    └── deviceCapability.ts # Device detection
```

---

## 🚀 Featured Projects

### 1. AlgoQuest — Algorithm Visualizer
> *React.js • TypeScript • Tailwind CSS*

Interactive platform that transforms abstract algorithmic concepts into visual experiences. Watch N-Queens backtrack in real-time, see Trie nodes light up, observe DP tables fill optimally.

- 📈 **40% improvement** in algorithm learning time
- 🧮 **15+ algorithms** visualized step-by-step
- 💻 Multi-language code generation (Python, C++, JavaScript)

### 2. AI Game Tester — Gemini-Powered Dashboard
> *Python • Streamlit • Gemini API • Plotly*

Next-generation QA debugging dashboard leveraging Google Gemini's multimodal AI to analyze error logs and screenshot artifacts across 700+ game titles.

- 🎮 **700+ games** analyzed
- 🤖 Multimodal AI for visual glitch detection
- ⚡ **<2 second** response time

### 3. Real Estate House Price Predictor
> *Python • XGBoost • Scikit-learn • SHAP • Folium*

ML-powered analytics engine trained on 20 years of property transaction data with explainable AI insights.

- 🎯 **92% accuracy** with XGBoost ensemble
- 📊 **80,000+ records** processed
- 🗺️ Interactive Folium maps with heatmaps

---

## 🛠️ Getting Started

### Prerequisites

- Node.js 18.17+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/hariteja-01/HariPortfolio.git
cd HariPortfolio

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the portfolio.

### Build for Production

```bash
# Create optimized static build
npm run build

# Preview production build locally
npx serve out
```

The static export will be generated in the `out/` directory, ready for deployment.

---

## 🌐 Deployment

This portfolio is configured for **static export**, making it compatible with:

| Platform | Deploy Command |
|----------|----------------|
| **Vercel** | `vercel --prod` (zero-config) |
| **Netlify** | Drag & drop `out/` folder |
| **GitHub Pages** | Push `out/` to `gh-pages` branch |
| **Cloudflare Pages** | Connect repo, set build: `npm run build` |
| **AWS S3 + CloudFront** | Upload `out/` to S3 bucket |

### Environment Variables

No environment variables required for deployment. The portfolio is fully static.

---

## ⚙️ Configuration

### Theme Customization

Edit CSS variables in `app/globals.css`:

```css
:root {
  --bg-primary: #ffffff;
  --text-primary: #1a1a2e;
  --accent-primary: #00F0FF;
  /* ... */
}

.dark {
  --bg-primary: #0a0a0a;
  --text-primary: #e5e5e5;
  /* ... */
}
```

### Project Data

Modify `data/portfolio.ts` to update:
- Profile information
- Project details
- Tech stacks
- Statistics

---

## 📱 Responsive Breakpoints

| Breakpoint | Width | Target |
|------------|-------|--------|
| `sm` | 640px | Large phones |
| `md` | 768px | Tablets |
| `lg` | 1024px | Laptops |
| `xl` | 1280px | Desktops |
| `2xl` | 1536px | Large screens |

---

## 🎨 Features Deep Dive

### Scroll-Driven Canvas Animation
Custom canvas component syncs video frames with scroll position for cinematic project showcases.

### Lottie Integration
- **Loading Screen**: Animated loader with rotating inspirational quotes
- **Hero Section**: Dynamic character animation
- **Contact Section**: Engaging visual alongside contact form

### Theme System
- CSS variable-based theming
- Theme-aware logo switching (SVG for dark, PNG for light)
- Smooth transitions between modes
- Persisted preference via localStorage

### Performance Optimizations
- Static site generation for instant TTFB
- Image optimization with Next.js Image
- Dynamic imports for heavy components
- Efficient re-renders with React.memo and useCallback

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🤝 Contact

**Hari Teja Patnala**

- 📧 Email: [patnalahariteja@gmail.com](mailto:patnalahariteja@gmail.com)
- 💼 LinkedIn: [hari-teja-patnala](https://linkedin.com/in/hari-teja-patnala)
- 🐙 GitHub: [hariteja-01](https://github.com/hariteja-01)
- 🏆 LeetCode: [hariteja01](https://leetcode.com/u/hariteja01)

---

<div align="center">

**Built with ❤️ using Next.js, TypeScript & Framer Motion**

*"Code is poetry written in logic."*

</div>
