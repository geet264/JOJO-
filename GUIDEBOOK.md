# 📘 The Ultimate JOJO Career OS Guide Book

> **The All-in-One Manual for New Users, Developers, and Job Seekers**  
> *Everything you need to know about JOJO: What it is, how it works, step-by-step screen walkthroughs, extension setup, and security architecture.*

---

## 📑 Table of Contents

1. [🌟 Chapter 1: Introduction to JOJO](#-chapter-1-introduction-to-jojo)
   - [What is JOJO?](#what-is-jojo)
   - [The Problem with the Old Way of Job Hunting](#the-problem-with-the-old-way-of-job-hunting)
   - [How JOJO is Different from Tools like Jobalytics](#how-jojo-is-different-from-tools-like-jobalytics)
2. [🏗️ Chapter 2: How JOJO Works (System Architecture)](#️-chapter-2-how-jojo-works-system-architecture)
3. [🖥️ Chapter 3: Step-by-Step Screen Walkthrough](#️-chapter-3-step-by-step-screen-walkthrough)
   - [Screen 1: Executive Dashboard](#screen-1-executive-dashboard)
   - [Screen 2: 80%+ Match Job Feed & Global Filters](#screen-2-80-match-job-feed--global-filters)
   - [Screen 3: 7-Stage Kanban Application Pipeline](#screen-3-7-stage-kanban-application-pipeline)
   - [Screen 4: Master Profile (Single Source of Truth)](#screen-4-master-profile-single-source-of-truth)
   - [Screen 5: Universal Sync Hub & Platform Connector](#screen-5-universal-sync-hub--platform-connector)
   - [Screen 6: 1-Click AI Resume Tailor](#screen-6-1-click-ai-resume-tailor)
4. [🧩 Chapter 4: The Companion Browser Extension](#-chapter-4-the-companion-browser-extension)
   - [How to Install on Desktop (Chrome, Edge, Brave)](#how-to-install-on-desktop-chrome-edge-brave)
   - [How to Run the Extension on Your Phone (Android)](#how-to-run-the-extension-on-your-phone-android)
   - [Using JOJO on iPhone (iOS PWA & 1-Tap Sync)](#using-jojo-on-iphone-ios-pwa--1-tap-sync)
5. [🔒 Chapter 5: Multi-Tenant Accounts & VAPT Security](#-chapter-5-multi-tenant-accounts--vapt-security)
   - [How Account Isolation Works](#how-account-isolation-works)
   - [VAPT Security Verification (Bcrypt, IDOR, Rate Limiting)](#vapt-security-verification-bcrypt-idor-rate-limiting)
6. [🚀 Chapter 6: Beginner's 3-Minute Quickstart Guide](#-chapter-6-beginners-3-minute-quickstart-guide)

---

## 🌟 Chapter 1: Introduction to JOJO

### What is JOJO?
**JOJO** is an all-in-one **Career Operating System**. 

Instead of juggling 6 browser tabs (LinkedIn, Naukri, Indeed, Instahyre, Glassdoor, etc.), re-typing your notice period and CTC on each site, and manually tracking job applications in messy spreadsheets, **JOJO manages your entire job hunt from one central headquarters**.

```
[ JOJO Core Hub ] 
  ├── 💼 LinkedIn Profile & Easy Apply
  ├── 🚀 Naukri.com
  ├── 🌐 Indeed India
  ├── ⚡ Instahyre
  ├── 🤖 Greenhouse & Lever ATS
  └── 🦄 Wellfound / Foundit
```

### The Problem with the Old Way of Job Hunting
* **Duplicate Effort**: Whenever your notice period changes (e.g. from 60 days to 30 days) or your expected CTC increases, you have to log into 6 different websites and change it 6 times.
* **Low-Match Noise**: Standard job portals flood your notifications with irrelevant jobs that only match 20% to 30% of your real skills.
* **ATS Rejection Black Hole**: Many resumes get automatically filtered out by corporate Applicant Tracking Systems (Workday, Greenhouse, Lever) because keywords aren't tailored.
* **Disorganized Applications**: It's easy to lose track of which company has responded, when an interview is scheduled, or what notes you took.

### How JOJO is Different from Tools like Jobalytics
* **Jobalytics**: Just a passive browser popup that matches keywords on a single webpage against a single resume document. It cannot store your master profile, cannot sync across platforms, has no application tracking, and knows nothing about Indian platforms like Naukri or CTC negotiations.
* **JOJO**: A complete **Career Command Center**. It stores your profile once, calculates ATS compatibility, aggregates jobs worldwide with an **80%+ match filter**, syncs with LinkedIn/Naukri, tracks your interview pipeline via Kanban, and provides 1-click AI resume tailoring.

---

## 🏗️ Chapter 2: How JOJO Works (System Architecture)

* **Client Layer**:
  * Next.js 14 Web Dashboard (Turbopack engine)
  * Responsive Mobile UI & PWA (iOS / Android)
  * Chrome Companion Extension (Manifest V3)
* **Core Engine Layer**:
  * 🎯 80%+ Match & ATS Engine
  * 🔄 Universal Platform Sync Hub
  * ✨ AI Resume & Cover Letter Tailor
  * 🛡️ VAPT Hardened Auth & Rate Limiter
* **Data Storage Layer**:
  * `data/users.json`: Secure accounts with 12-round bcrypt password hashing.
  * `data/jojo-db.json`: Isolated multi-tenant career databases per user.

---

## 🖥️ Chapter 3: Step-by-Step Screen Walkthrough

### Screen 1: Executive Dashboard
The first screen you see after logging in. It gives you a high-level command view of your job search velocity:
* **Top KPI Metric Cards**:
  * **80%+ Top Match Jobs**: Live count of high-fit jobs matching your exact skills.
  * **Target Pipeline Value**: Displays current CTC vs. expected target CTC with expected hike percentage.
  * **Average ATS Score (95%)**: Shows your resume's competitive standing against automated filters.
  * **Active Applications**: Total count of active jobs in your pipeline.
* **Velocity Funnel**: Visual representation of candidate conversion across each stage.
* **Skill Gap Advisor**: Highlights missing high-demand skills (e.g. *Falco Runtime Security*, *Terraform*) so you can upskill and increase your match rates.

---

### Screen 2: 80%+ Match Job Feed & Global Filters
The aggregated job feed consolidates listings from LinkedIn, Naukri, Indeed, and direct company careers portals:
* **Match Percentage Tabs**:
  * `80%+ Top Match`: High-priority tier where your skills match 80% to 100% of the job description.
  * `70%+ Match`: Solid matching opportunities.
  * `All Jobs`: Full raw search feed.
* **Global Region Selector**:
  * 🌐 **Worldwide Remote**: High-paying US Dollar & Euro remote jobs ($90,000 – $150,000/yr).
  * 🇮🇳 **India**: Bangalore, Pune, Gurgaon, Hyderabad, and India-remote openings.
  * 🇺🇸 **United States** & 🇪🇺 **Europe / UK**.
* **Job Card Features**:
  * **Platform Badge**: Shows whether the job is from LinkedIn, Naukri, or Indeed.
  * **ATS Score Badge**: Shows automated match ranking (*"Top 5% Candidate"* or *"Strong ATS Match"*).
  * **Matched Skills (Green)** vs. **Missing Skills (Red)**.
  * **One-Click Stage Mover**: Instantly move a job card to *"Applied"*, *"Screening"*, or *"Offer"*.
  * **✨ AI Tailor Button**: Opens the AI resume bullet generator for that specific job.

---

### Screen 3: 7-Stage Kanban Application Pipeline
Never lose track of an application or recruiter conversation again:
$$\text{Wishlist} \longrightarrow \text{Applied} \longrightarrow \text{Screening} \longrightarrow \text{Technical} \longrightarrow \text{Final Round} \longrightarrow \text{Offer} \longrightarrow \text{Rejected}$$

* **Interactive Drag-and-Drop Columns**:
  * `Wishlist`: Jobs you want to apply to later.
  * `Applied`: Submissions awaiting recruiter response.
  * `Screening`: HR phone screens and introductory calls.
  * `Technical`: System design, coding interviews, and architecture rounds.
  * `Final Round`: Hiring manager and leadership alignment.
  * `Offer`: Compensation packages and written job offers.
* **Interview Notes**: Click on any card to type notes, recruiter contacts, and scheduled meeting times.

---

### Screen 4: Master Profile (Single Source of Truth)
This is your master digital passport. Any change you save here immediately propagates to your job match calculations and sync payloads:
* **Basic Credentials**: Full Name, Email, Phone, Primary Title.
* **Notice Period**: Crucial for Indian and global hiring (e.g. *Immediate / Serving Notice*, *15 Days*, *30 Days*).
* **Compensation**: Current CTC (e.g. ₹14 LPA) & Expected CTC (e.g. ₹22–25 LPA or $100k USD).
* **Skills Matrix with Expertise Levels**: Tag skills as *Beginner*, *Intermediate*, or *Expert*.
* **Work Experience & Certifications**: Stores your bullet points, AWS/Kubernetes certifications, and education.

---

### Screen 5: Universal Sync Hub & Platform Connector
The nervous system of JOJO that links your profile to outside job portals:
* **8 Platform Nodes**:
  * Left: LinkedIn, Naukri.com, Indeed India, Instahyre.
  * Right: Glassdoor, Foundit, Wellfound, Greenhouse/Lever.
* **Central Master Core**: Pulses live status showing total active skills and last sync time.
* **Isolated Multi-Tenant Session**: Displays your active account email so that data is never crossed between different users.
* **Auto-Fill & Sync Payload**:
  * Standardized digital packet containing your skills, CTC, and notice period.
  * The companion extension reads this package to auto-fill web forms on LinkedIn and Naukri.

---

### Screen 6: 1-Click AI Resume Tailor
Clicking **"AI Tailor"** on any job card opens an intelligent assistant modal:
* Analyzes the exact requirements of the job description.
* Cross-references your master skills and experience.
* Generates **3 tailored, action-driven resume bullet points** engineered to score 95%+ on applicant tracking systems.
* Generates a **customized cover letter** ready to copy and paste.

---

## 🧩 Chapter 4: The Companion Browser Extension

Because LinkedIn and Naukri do not allow outside servers to directly edit your personal profile, JOJO includes a lightweight **Chrome Companion Extension** that operates directly inside your authenticated browser session.

### How to Install on Desktop (Chrome, Edge, Brave)
1. Open your browser and go to `chrome://extensions` (or `edge://extensions`).
2. Turn on the **"Developer mode"** toggle switch in the top right corner.
3. Click the **"Load unpacked"** button in the top left corner.
4. Select the `extension` folder from the JOJO project directory.
5. The **JOJO Sync Companion** extension is now installed!

* **How to Use It**:
  * Open LinkedIn or Naukri.
  * A floating purple **"JOJO Sync"** badge appears in the bottom-right corner of your screen.
  * Click it to instantly review and copy your tailored headline, notice period, and skills into the page.

---

### How to Run the Extension on Your Phone (Android)
Standard mobile Google Chrome disables extensions, but **Kiwi Browser** and **Lemur Browser** (both free on the Google Play Store) have full Chromium desktop extension support built-in:
1. Open Google Play Store on your Android phone and install **Kiwi Browser**.
2. Open Kiwi Browser, tap the **3 dots menu** in the top-right &rarr; tap **Extensions**.
3. Turn on the **Developer Mode** toggle.
4. Tap **+(from .zip / .crx / user dir)** and select the JOJO `extension` folder.
5. The extension is now running on your phone! When you browse LinkedIn or Naukri on Kiwi Browser, the floating JOJO badge appears on your phone screen.

---

### Using JOJO on iPhone (iOS PWA & 1-Tap Sync)
Apple prevents third-party engines from loading unpacked extensions on iOS. To provide a seamless experience on iPhone:
1. **Install JOJO as a Native App (PWA)**:
   * Open `http://<YOUR_LOCAL_IP>:3000` in Safari on iPhone.
   * Tap the **Share button** (square with arrow up).
   * Tap **"Add to Home Screen"**.
   * JOJO now appears as an app icon on your home screen and launches full-screen without address bars!
2. **1-Tap Mobile Sync**:
   * Tap **AI Tailor** on any job card.
   * Tap **"Copy Mobile Bullets"**.
   * Tap **"Open LinkedIn App"** or **"Open Naukri App"** to paste your tailored bullets directly into the mobile application form.

---

## 🔒 Chapter 5: Multi-Tenant Accounts & VAPT Security

JOJO has undergone a complete **Vulnerability Assessment and Penetration Testing (VAPT)** security audit and is 100% hardened:
* **12-Round Bcrypt Encryption**: Passwords are encrypted as `$2b$12$...` in `data/users.json`. Plaintext passwords are never stored.
* **IDOR Protection**: Requests attempting to view another user's private data are blocked with `HTTP 403 Forbidden`.
* **Brute-Force Rate Limiting**: 5 failed login attempts in 10 minutes locks out further attempts with `HTTP 429 Too Many Requests`.
* **HMAC Signed Session Cookies**: Tamper-proof `HttpOnly`, `SameSite=Lax` cookies protect sessions.

---

## 🚀 Chapter 6: Beginner's 3-Minute Quickstart Guide

If a new user or team member wants to run JOJO right now, follow these 3 simple steps:

1. **Start JOJO**: Double-click `START-JOJO.bat` or run `npm run dev` in the terminal.
2. **Open in Your Browser**: Navigate to `http://127.0.0.1:3000`.
3. **Sign In or Create an Account**:
   * Click **"Log In"** &rarr; click **"One-Click Quick Login as Geeta Jogi"** (`password123`).
   * Or click **"Create Account"** to register your own custom role, CTC, and notice period!

---

*(Official repository: [https://github.com/geet264/JOJO-.git](https://github.com/geet264/JOJO-.git))*
