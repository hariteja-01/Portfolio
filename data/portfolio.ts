export interface PortfolioMode {
    id: string;
    name: string;
    period: string;
    subName: string;
    role: string;
    folderPath: string;
    frameCount: number;
    themeColor: string;
    gradient: string;
    textColor: string;
    techStack: string[];
    stats: { label: string; val: string }[];
    section1: { title: string; subtitle: string };
    section2: { title: string; subtitle: string };
    section3: { title: string; subtitle: string };
    section4: { title: string; subtitle: string };
    detailsSection: { title: string; description: string };
    storySection: { title: string; description: string };
    ctaSection: {
        primaryText: string;
        primaryUrl: string;
        highlights: string[];
        tagline: string;
    };
}

export interface EducationItem {
    institution: string;
    location: string;
    qualification: string;
    score: string;
    period: string;
    sortValue: number;
}

export interface TrainingItem {
    title: string;
    organization: string;
    credential: string;
    period: string;
    sortValue: number;
    highlights: string[];
    tech: string[];
    certificateUrl?: string;
}

export interface AchievementItem {
    title: string;
    date: string;
    sortValue: number;
    description: string;
    issuer?: string;
}

export const profile = {
    name: "Hari Teja Patnala",
    tagline: "SDE | ML Engineer | AI Architect",
    skills: [
        "React",
        "TypeScript",
        "Next.js",
        "JavaScript",
        "C++",
        "Python",
        "Machine Learning",
        "Data Science",
        "Tailwind CSS",
        "Node.js",
        "Cloud (Oracle OCI)",
        "Algorithms & DSA",
        "Generative AI",
    ],
    roles: [
        "Software Development Engineer",
        "Machine Learning Engineer",
        "AI Architect",
        "Full Stack Developer",
        "Algorithm Specialist",
        "Cloud Engineer",
    ],
    email: "patnalahariteja@gmail.com",
    phone: "+91-9392329691",
    linkedin: "https://linkedin.com/in/hari-teja-patnala",
    github: "https://github.com/hariteja-01",
    leetcode: "https://leetcode.com/u/hariteja01",
    university: "Lovely Professional University",
    degree: "B.Tech CSE | CGPA: 9.18/10",
    graduation: "Expected Jul '27",
    achievements: [
        "900+ LeetCode Problems",
        "IMO State Rank 1",
        "Oracle OCI Certified",
        "MumbaiHacks 2025 Finalist",
        "9.18 CGPA",
        "NPTEL IIT Madras Certified",
    ],
    certifications: [
        {
            title: "OCI Data Science Professional",
            issuer: "Oracle",
            date: "Nov '25",
            issuedAt: "2025-11",
            certificationsUrl: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=D882C1B1345014E818023BEA9942D34A9718ADCF28204E34ED158FBBF1D1A1D9",
        },
        {
            title: "OCI Developer Professional",
            issuer: "Oracle",
            date: "Oct '25",
            issuedAt: "2025-10",
            certificationsUrl: "https://catalog-education.oracle.com/pls/certview/sharebadge?id=4369BADDBECEC87FFAB7AC3633A7E8317399BBDC123D9E734B553EA4A0431569",
        },
        {
            title: "Python for Data Science & AI",
            issuer: "IBM Coursera",
            date: "Oct '25",
            issuedAt: "2025-10",
            certificationsUrl: "https://www.coursera.org/account/accomplishments/verify/SF891HUZCUPO",
        },
        {
            title: "Social Networks",
            issuer: "NPTEL",
            date: "May '25",
            issuedAt: "2025-05",
            certificationsUrl: "https://drive.google.com/file/d/1_yGVcXbJ3xXDmHjiV2KOnBVYuOXHxVw9/view?usp=sharing",
        },
        {
            title: "Generative AI Essentials",
            issuer: "Microsoft & LinkedIn",
            date: "Jul '24",
            issuedAt: "2024-07",
            certificationsUrl: "https://www.linkedin.com/learning/certificates/88a0488c7323d1f8c05da9b8501076b549e8b9c573592a7023fb007948e60f8c?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BPV%2FFjUW0S1SH%2FKNxFUstUw%3D%3D",
        },
    ],
    education: [
        {
            institution: "Lovely Professional University",
            location: "Phagwara, Punjab",
            qualification: "Bachelor of Technology - Computer Science and Engineering",
            score: "CGPA: 9.18",
            period: "Aug '23 - Present",
            sortValue: 202308,
        },
        {
            institution: "A.P Model School & Junior College",
            location: "Srikakulam, Andhra Pradesh",
            qualification: "Intermediate",
            score: "Percentage: 96.2",
            period: "Jun '21 - May '23",
            sortValue: 202106,
        },
        {
            institution: "A.P Model School & Junior College",
            location: "Srikakulam, Andhra Pradesh",
            qualification: "Matriculation",
            score: "Percentage: 97.5",
            period: "Jun '20 - Apr '21",
            sortValue: 202006,
        },
    ] as EducationItem[],
    training: [
        {
            title: "AlgoTutor",
            organization: "EdTech Company",
            credential: "Certificate",
            period: "Jun '25 - Jul '25",
            sortValue: 202507,
            highlights: [
                "Gained strong proficiency in core DSA concepts through a 28-day intensive competitive programming training, consistently applying concepts in daily problem-solving.",
                "Demonstrated the ability to analyze, optimize, and refactor multiple solution approaches, consistently improving algorithmic time and space complexity across problems.",
                "Built AlgoQuest, a structured competitive-programming practice project, completing algorithmic problems with measurable efficiency improvements.",
            ],
            tech: ["C++", "Python"],
            certificateUrl: "https://drive.google.com/file/d/1LwJUjKVzSXwMGsr3idiMoE52QkBwhH0z/view?usp=sharing",
        },
    ] as TrainingItem[],
    achievementsDetailed: [
        {
            title: '"HI FLYERS" Achievers Award',
            date: "Dec '25",
            sortValue: 202512,
            issuer: "Lovely Professional University",
            description:
                "Honored for outstanding academic performance and top-tier standing in core computer science coursework.",
        },
        {
            title: "MumbaiHacks 2025 Finalist",
            date: "Nov '25",
            sortValue: 202511,
            description:
                "Secured a finalist position at MumbaiHacks 2025 by developing and presenting a functional prototype under time-bound hackathon conditions.",
        },
        {
            title: "LeetCode Algorithmic Excellence",
            date: "Oct '25",
            sortValue: 202510,
            description:
                "Ranked in the Top 35.28% globally with 900+ problems solved across C++, Java, and C. Earned 17 achievement badges and sustained a 390-day problem-solving streak.",
        },
        {
            title: "University Academic Excellence Award",
            date: "May '24",
            sortValue: 202405,
            issuer: "Lovely Professional University",
            description:
                "Awarded for outstanding academic performance (TGPA: 9.50) and top-tier standing in core computer science coursework.",
        },
    ] as AchievementItem[],
};

export const portfolioModes: PortfolioMode[] = [
    {
        id: "algoquest",
        name: "AlgoQuest",
        period: "Jul '25 - Aug '25",
        subName: "Algorithm Visualizer",
        role: "Algorithm Engineer",
        folderPath: "/images/algoquest",
        frameCount: 200,
        themeColor: "#00F0FF",
        gradient: "linear-gradient(135deg, #00F0FF 0%, #0891B2 100%)",
        textColor: "#00F0FF",
        techStack: ["React.js", "TypeScript", "Tailwind CSS", "HTML5"],
        stats: [
            { label: "Learning Boost", val: "40%" },
            { label: "Algorithms", val: "15+" },
            { label: "Code Languages", val: "3" },
        ],
        section1: { title: "AlgoQuest.", subtitle: "See algorithms think." },
        section2: {
            title: "N-Queens. Tries. DP Tables.",
            subtitle:
                "Complex algorithms visualized step-by-step with interactive execution.",
        },
        section3: {
            title: "Multi-language code generation.",
            subtitle:
                "Instantly generate solutions in Python, C++, and JavaScript.",
        },
        section4: {
            title: "Built to teach. Designed to inspire.",
            subtitle: "",
        },
        detailsSection: {
            title: "The Algorithm Arena",
            description:
                "AlgoQuest transforms abstract algorithmic concepts into tangible, visual experiences. Watch N-Queens backtrack in real-time. See Trie nodes light up as words are inserted. Observe DP tables fill cell-by-cell with the optimal path highlighted. Built with React Hooks to handle complex state transitions, the platform reduced algorithm learning time by 40%. Features a multi-language code generation engine supporting Python, C++, and JavaScript with real-time performance analytics.",
        },
        storySection: {
            title: "From 900+ LeetCode Problems to This",
            description:
                "After solving over 900 problems on LeetCode and ranking in the top global percentile, I realized that understanding algorithms shouldn't require grinding through text-heavy explanations. AlgoQuest was born from this frustration - every visualization is informed by hundreds of hours of competitive programming. Each algorithm's edge cases, time complexities, and optimization patterns are baked into the learning flow.",
        },
        ctaSection: {
            primaryText: "View on GitHub",
            primaryUrl: "https://github.com/hariteja-01/AlgoQuest",
            highlights: ["React + TypeScript", "15+ Algorithms", "Real-time Analytics"],
            tagline: "Where theory meets visualization.",
        },
    },
    {
        id: "dashboard",
        name: "AI-Powered Game Testing Dashboard",
        period: "Feb '25 - May '25",
        subName: "Gemini-Powered Dashboard",
        role: "AI Engineer",
        folderPath: "/images/dashboard",
        frameCount: 200,
        themeColor: "#8B5CF6",
        gradient: "linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%)",
        textColor: "#8B5CF6",
        techStack: ["Python", "Streamlit", "Gemini API", "Plotly"],
        stats: [
            { label: "Games Parsed", val: "700+" },
            { label: "AI Model", val: "Gemini" },
            { label: "Response", val: "<2s" },
        ],
        section1: {
            title: "AI Game Tester.",
            subtitle: "Intelligence meets debugging.",
        },
        section2: {
            title: "700+ game titles analyzed.",
            subtitle:
                "Google Gemini API processes error logs and crash reports automatically.",
        },
        section3: {
            title: "Multimodal AI analysis.",
            subtitle:
                "Upload screenshots - AI identifies bugs, suggests fixes, tracks performance.",
        },
        section4: {
            title: "Debugging at the speed of thought.",
            subtitle: "",
        },
        detailsSection: {
            title: "The Command Center",
            description:
                "This dashboard represents the future of QA testing. Instead of engineers manually sifting through thousands of error logs across 700+ game titles, the Google Gemini API does it in seconds. The multimodal chatbot analyzes screenshot artifacts, identifies visual glitches, and cross-references them with known crash patterns. Built with Plotly, real-time visualizations track CPU/GPU usage and FPS stability across different game builds.",
        },
        storySection: {
            title: "AI That Understands Games",
            description:
                "With Oracle Cloud certifications and deep ML pipeline experience, I wanted to push what a debugging tool could be. Traditional dashboards show data - this one understands data. By leveraging Gemini's multimodal capabilities to process both text logs and visual screenshots, the system provides contextual debugging that feels like having a senior engineer looking over your shoulder.",
        },
        ctaSection: {
            primaryText: "View on GitHub",
            primaryUrl: "https://github.com/hariteja-01/Game-Tester-Using-AI",
            highlights: ["Gemini API", "Multimodal AI", "Real-time Monitoring"],
            tagline: "AI-powered debugging for the modern game studio.",
        },
    },
    {
        id: "realestate",
        name: "Real Estate Analytics Engine",
        period: "Feb '25 - Apr '25",
        subName: "ML Analytics Engine",
        role: "Data Scientist",
        folderPath: "/images/realestate",
        frameCount: 200,
        themeColor: "#FF6B35",
        gradient: "linear-gradient(135deg, #FF6B35 0%, #EA580C 100%)",
        textColor: "#FF6B35",
        techStack: [
            "Python",
            "XGBoost",
            "Scikit-learn",
            "Streamlit",
            "Folium",
            "SHAP",
        ],
        stats: [
            { label: "Accuracy", val: "92%" },
            { label: "Records", val: "80K+" },
            { label: "Data Span", val: "20 yrs" },
        ],
        section1: { title: "House Price Predictor.", subtitle: "Data predicts value." },
        section2: {
            title: "80,000+ records. 20 years.",
            subtitle:
                "XGBoost and Random Forest trained on two decades of property transactions.",
        },
        section3: {
            title: "Explainable AI with SHAP.",
            subtitle:
                "Every prediction shows exactly which features drove the estimate.",
        },
        section4: {
            title: "Machine learning meets real estate.",
            subtitle: "",
        },
        detailsSection: {
            title: "The Data Landscape",
            description:
                "This isn't just a price predictor - it's a complete analytics engine. The ML pipeline processes 80,000+ property records spanning 20 years, using XGBoost and Random Forest ensembles to achieve 92% accuracy. SHAP value analysis provides full transparency - users see exactly why a property is valued the way it is. Geospatial Folium visualizations reveal regional pricing trends that raw numbers can't capture.",
        },
        storySection: {
            title: "From Numbers to Knowledge",
            description:
                "My Data Science minor and Financial Markets background gave me a unique perspective. Real estate isn't just about features - it's about market sentiment, regional development, and temporal trends. The 20-year dataset allows the model to learn how markets evolve. Deploying with Streamlit ensures anyone - not just data scientists - can generate instant property value estimates with confidence intervals.",
        },
        ctaSection: {
            primaryText: "View on GitHub",
            primaryUrl: "https://github.com/hariteja-01/House-Price-Predictor",
            highlights: ["92% Accuracy", "SHAP Analysis", "Geospatial Maps"],
            tagline: "Predict property values with ML precision.",
        },
    },
];
