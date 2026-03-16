# Portfolio PPT Prompt Kit (Claude + Gamma)

Use this file to generate a premium 10-12 slide presentation directly from my real portfolio content.

## 1) Ground Truth About My Portfolio (Do Not Hallucinate)

- Name: Hari Teja Patnala
- Tagline: SDE | ML Engineer | AI Architect
- University: Lovely Professional University
- Degree: B.Tech CSE | CGPA: 9.18/10
- Graduation: Expected Jul 2027
- Core achievements:
  - 900+ LeetCode Problems
  - IMO State Rank 1
  - Oracle OCI Certified
  - MumbaiHacks 2025 Finalist
  - NPTEL IIT Madras Certified
- Certifications:
  - OCI Data Science Professional (Oracle, Nov 2025)
  - OCI Developer Professional (Oracle, Oct 2025)
  - Python for Data Science and AI (IBM Coursera, Oct 2025)
  - Generative AI Essentials (Microsoft and LinkedIn, Jul 2024)
- Portfolio projects:
  - AlgoQuest (React.js, TypeScript, Tailwind CSS, HTML5)
    - Impact: 40% learning boost, 15+ algorithms, 3 code languages
    - GitHub: https://github.com/hariteja-01/AlgoQuest
  - AI Game Tester (Python, Streamlit, Gemini API, Plotly)
    - Impact: 700+ games parsed, under 2 seconds response
    - GitHub: https://github.com/hariteja-01/Game-Tester-Using-AI
  - Real Estate House Price Predictor (Python, XGBoost, Scikit-learn, Streamlit, Folium, SHAP)
    - Impact: 92% accuracy, 80K+ records, 20 years data span
    - GitHub: https://github.com/hariteja-01/House-Price-Predictor
- Contact links:
  - Email: patnalahariteja@gmail.com
  - LinkedIn: https://linkedin.com/in/hari-teja-patnala
  - GitHub: https://github.com/hariteja-01
  - LeetCode: https://leetcode.com/u/hariteja01
- Resume:
  - Downloadable PDF exists in portfolio as /public/resume.pdf

## 2) Faculty Rubric Alignment (Must Be Explicit In Deck)

Required visible portfolio elements:
- Introduction and Summary
- About Me
- Skills and Technologies
- Projects
- Certifications and Courses
- Experience (Internships and Work)
- Competitive Programming and Hackathons
- Open Source Contributions (if any)
- Blog and Technical Writing (optional)
- Research Publication/Patent
- Contact Section
- Downloadable Resume (PDF)

Important truth constraints for this PPT:
- Do not invent internships, open-source contributions, blogs, or publications if not available.
- If a section is currently not present, show it as "Planned Upgrade" with clear action points.
- Keep claims evidence-based and measurable.

## 3) Copy-Paste Master Prompt For Claude (Primary)

Paste everything below into Claude exactly as-is:

---
You are an elite presentation strategist and visual storyteller.
Create a faculty-impressing 10-12 slide presentation from my portfolio data.

Context:
This is an academic portfolio presentation with strict evaluation parameters:
1) Content presentation and branding (10)
2) Language proficiency and body language (10)
3) CV upload (5)
4) Storytelling and narrative (3)
5) Verification of portfolio URL uploaded on placement portal (2)

My verified portfolio data (single source of truth):
- Name: Hari Teja Patnala
- Tagline: SDE | ML Engineer | AI Architect
- University: Lovely Professional University
- Degree: B.Tech CSE | CGPA: 9.18/10
- Graduation: Expected Jul 2027
- Achievements: 900+ LeetCode, IMO State Rank 1, Oracle OCI Certified, MumbaiHacks 2025 Finalist, NPTEL IIT Madras Certified
- Certifications:
  - OCI Data Science Professional (Oracle, Nov 2025)
  - OCI Developer Professional (Oracle, Oct 2025)
  - Python for Data Science and AI (IBM Coursera, Oct 2025)
  - Generative AI Essentials (Microsoft and LinkedIn, Jul 2024)
- Project 1: AlgoQuest
  - Tech: React.js, TypeScript, Tailwind CSS, HTML5
  - Metrics: 40% learning boost, 15+ algorithms, 3 code languages
  - GitHub: https://github.com/hariteja-01/AlgoQuest
- Project 2: AI Game Tester
  - Tech: Python, Streamlit, Gemini API, Plotly
  - Metrics: 700+ games parsed, under 2 seconds response
  - GitHub: https://github.com/hariteja-01/Game-Tester-Using-AI
- Project 3: Real Estate House Price Predictor
  - Tech: Python, XGBoost, Scikit-learn, Streamlit, Folium, SHAP
  - Metrics: 92% accuracy, 80K+ records, 20 years data
  - GitHub: https://github.com/hariteja-01/House-Price-Predictor
- Contact: patnalahariteja@gmail.com, LinkedIn, GitHub, LeetCode
- Resume: downloadable PDF exists

Portfolio technical highlights worth showcasing:
- Next.js + React + TypeScript portfolio architecture
- Cinematic scroll narrative and project deep-dive transitions
- Canvas/frame-based project visual storytelling
- Motion-rich UI, theme system, custom interactive UX

Missing sections to address honestly:
- Experience (internships/work) not shown in detail
- Open source contributions not explicitly shown
- Blog/technical writing not explicitly shown
- Research publication/patent not explicitly shown

Your task:
Generate a 12-slide deck that is elegant, bold, and academically professional.

Slide design system requirements:
- Style: premium modern, clean, high contrast, faculty-friendly
- Colors: cyan (#00F0FF), violet (#8B5CF6), orange (#FF6B35), charcoal backgrounds
- Typography pairing: strong headline serif + modern sans body
- Minimal text per slide, strong visual hierarchy, clear metrics
- Every slide must include a short speaker note (25-45 seconds max per slide)

Mandatory slide plan:
1) Title and identity
2) 60-second personal narrative (problem to purpose)
3) About me and academic profile
4) Skills and technologies map
5) Project case study: AlgoQuest
6) Project case study: AI Game Tester
7) Project case study: Real Estate ML
8) Certifications and credibility
9) Competitive programming and hackathons
10) Resume and portfolio verification checklist (include CV uploaded + placement portal URL verification reminder)
11) Gap-to-growth slide (experience, open source, blog, research as roadmap)
12) Closing slide with contact and call to action

Output format:
- First provide slide-by-slide structure in a table:
  - Slide number
  - Slide title
  - On-slide content (short bullet points)
  - Visual direction
  - Speaker script (what to say)
- Then provide final presenter script for a crisp 2-minute version.
- Then provide an expanded 5-minute version for backup.
- Keep language polished, confident, and natural for live delivery.
- Avoid fake claims.
---

## 4) Copy-Paste Prompt For Gamma (Alternative)

Paste this into Gamma when generating the deck:

---
Create a 12-slide academic portfolio presentation.
Theme: premium modern tech profile with strong storytelling.

Presenter profile:
- Hari Teja Patnala
- SDE | ML Engineer | AI Architect
- B.Tech CSE, Lovely Professional University
- CGPA 9.18/10, Expected Jul 2027

Achievements:
- 900+ LeetCode problems
- IMO State Rank 1
- Oracle OCI certifications
- MumbaiHacks 2025 Finalist
- NPTEL IIT Madras certified

Projects:
1) AlgoQuest
- React.js, TypeScript, Tailwind CSS
- 40% learning boost, 15+ algorithms, 3 code languages
- GitHub: https://github.com/hariteja-01/AlgoQuest

2) AI Game Tester
- Python, Streamlit, Gemini API, Plotly
- 700+ games parsed, under 2s response
- GitHub: https://github.com/hariteja-01/Game-Tester-Using-AI

3) Real Estate House Price Predictor
- Python, XGBoost, Scikit-learn, SHAP, Folium
- 92% accuracy, 80K+ records, 20 years data
- GitHub: https://github.com/hariteja-01/House-Price-Predictor

Include slides for:
- Intro summary
- About me
- Skills and technologies
- Projects
- Certifications and courses
- Competitive programming and hackathons
- Contact section
- Resume PDF availability
- Portfolio URL verification on placement portal
- Growth roadmap for missing sections (experience, open source, blog, research)

Design instructions:
- Color palette: #00F0FF, #8B5CF6, #FF6B35, dark neutral background
- Bold title typography, clean readable body text
- One key message per slide
- Use metric callouts and timeline visuals
- Keep layout highly professional and faculty-friendly

Important:
- Do not fabricate internships, publications, open-source records, or blogs.
- Represent unavailable sections as planned next steps.
---

## 5) Fast Delivery Tips (For Your Speaking)

- Open with this line:
  - "I design engineering systems where algorithmic depth meets production-ready user experience."
- Use this structure while speaking each project:
  - Problem -> What I built -> Tech used -> Measured impact -> What I learned
- Keep voice pacing:
  - One slide about 10 seconds for strict 2-minute run
- Eye contact rule:
  - 70% audience, 30% screen
- End with this line:
  - "I am actively building toward high-impact internships, open-source visibility, and research-backed engineering outcomes."

## 6) Optional One-Line Prompt If You Are In A Hurry

"Use the data in this file to generate a premium 12-slide academic portfolio PPT with speaker notes, a 2-minute script, and a 5-minute backup script, with strict truthfulness and no fabricated experience."
