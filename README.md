# JOJO 🚀 — Unified Job Finding & Cross-Platform Career OS

> **One Master Profile • Multi-Platform Sync • >70% Match Scoring Engine • Visual Application Pipeline • AI ATS Tailorer**

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue?style=for-the-badge&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38bdf8?style=for-the-badge&logo=tailwind-css)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

---

## 💡 Overview

**JOJO** is an all-in-one Career OS and Job Search Command Center designed to solve job search fragmentation and repetitive profile updates. 

Instead of juggling separate profiles across **Naukri**, **LinkedIn**, and **Indeed**, JOJO acts as your single source of truth:
1. **Change Once, Sync Everywhere**: Update your skills, experience, or headline once in JOJO, and push updates across connected job platforms.
2. **AI & Skill Match Scoring ($\ge 70\%$ Filter)**: Aggregates listings across boards and calculates your real-time compatibility score, highlighting matched skills vs. missing gaps.
3. **Application Stages & Kanban Tracker**: Manage your interview lifecycle from *Wishlist* $\rightarrow$ *Applied* $\rightarrow$ *HR Screening* $\rightarrow$ *Tech Round* $\rightarrow$ *Offer*.
4. **AI Resume & Cover Letter Optimizer**: Instantly generates ATS-tailored resume bullet points and personalized cover letters for any targeted role (inspired by *Teal HQ* and *Simplify Jobs*).

---

## ✨ Key Features

### 1. 📊 Executive Analytics & Command Dashboard
- **Application Conversion Funnel**: Visualize your trajectory across *Wishlist $\rightarrow$ Applied $\rightarrow$ Screening $\rightarrow$ Technical $\rightarrow$ Offer*.
- **Compensation & CTC Benchmark**: Track your current CTC vs. target CTC against the average package across your active pipeline.
- **Skill Gap Advisor**: Analyzes all saved jobs and reveals top in-demand skills missing from your profile to unlock higher match scores.
- **Milestones & Agenda**: Never miss an upcoming HR call or system design interview round.

### 2. 🎯 Aggregated Job Feed & Match Engine (>70% Filter)
- Consolidated feed combining postings from **LinkedIn**, **Naukri**, **Indeed**, and direct career pages.
- Dynamic scoring algorithm that computes compatibility based on skills, seniority, and role relevance.
- **One-click toggle** to filter only opportunities matching **$\ge 70\%$**.
- Side-by-side keyword overlap: see exactly which skills matched (green) and which skills are missing (gray).

### 3. 👤 Centralized Master Profile
- Store your complete professional identity: Contact Info, Work Experience, Skills Matrix with proficiency levels (*Beginner, Intermediate, Expert*), Certifications, Notice Period, and Portfolio Links.
- Local JSON database persistence (`data/jojo-db.json`) ensuring all edits persist across reboots.

### 4. 🔄 Cross-Platform Sync Hub
- Connection manager for **LinkedIn**, **Naukri.com**, and **Indeed**.
- Synchronizes headline, skills list, and updated role descriptions with an audit log of recent updates.
- Ready-to-use payload generator for companion browser extensions and automated autofill.

### 5. 📋 Visual Kanban Application Pipeline
- Manage job stages across columns:
  - 📌 `Wishlist / Saved`
  - 📩 `Applied`
  - 📞 `HR Screening`
  - 💻 `Tech Interview`
  - 🤝 `Final Round`
  - 🎉 `Offer Received`
- Log recruiter contact info, interview notes, and specific dates per application.

### 6. 🤖 AI ATS Resume & Cover Letter Tailorer
- Select any job posting and click **"AI Tailor Resume & Cover Letter"**.
- Generates high-impact resume experience bullets incorporating required keywords for Greenhouse, Lever, and Workday ATS parsers.
- Prepares personalized 1-click cover letters ready to copy and send to recruiters.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router, Server Components & API routes)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Data Persistence**: Local JSON Database (`data/jojo-db.json`) with auto-seeding

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18.0 or later)
- npm or yarn

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/geet264/JOJO-.git
   cd JOJO-
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```

4. **Open in your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000).

---

## 📁 Project Structure

```text
jojo/
├── data/
│   └── jojo-db.json            # Persistent local database store
├── src/
│   ├── app/
│   │   ├── api/data/route.ts   # Database CRUD API route
│   │   ├── globals.css         # Tailwind styles
│   │   ├── layout.tsx          # Root layout
│   │   └── page.tsx            # Main application controller
│   ├── components/
│   │   ├── DashboardOverviewView.tsx  # Executive analytics dashboard
│   │   ├── JobFeedView.tsx            # Aggregated feed with >70% match
│   │   ├── ApplicationTrackerView.tsx # Kanban stages tracker
│   │   ├── ProfileView.tsx            # Master profile editor
│   │   ├── SyncManagerView.tsx        # Multi-platform sync center
│   │   ├── AITailorModal.tsx          # AI resume & cover letter builder
│   │   └── Header.tsx                 # Navigation & brand bar
│   ├── lib/
│   │   ├── matchEngine.ts      # Skill & relevance match algorithm
│   │   └── initialData.ts      # Default seed dataset
│   └── types/
│       └── index.ts            # TypeScript definitions
├── package.json
├── tailwind.config.js
└── tsconfig.json
```

---

## 🗺️ Roadmap

- [ ] Chrome Browser Extension for 1-Click Auto-Fill on LinkedIn & Naukri Easy Apply
- [ ] Automated Job Scraper & Webhook Alerts for roles with >85% match
- [ ] Export Profile to PDF with ATS-Optimized Templates
- [ ] Email Integration for automatic interview stage updates

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
