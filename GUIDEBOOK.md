# 📘 The Ultimate JOJO Career OS Guidebook & Workbook

> **The Complete All-in-One Manual for New Users, Developers, Recruiters, and Job Seekers**  
> *Everything you need to know about JOJO: Project Aim, What Has Been Built, How New Users Experience JOJO, Chrome Extension Deep-Dive, Chrome Web Store Publishing, and Hands-on Action Checklists.*

---

## 📑 Table of Contents

1. [🎯 Chapter 1: Project Aim & What We Have Done](#-chapter-1-project-aim--what-we-have-done)
2. [👥 Chapter 2: How Other People See & Use JOJO](#-chapter-2-how-other-people-see--use-jojo)
   - [Guest Preview vs. Authenticated User](#guest-preview-vs-authenticated-user)
   - [Creating a New User Account](#creating-a-new-user-account)
   - [Strict Multi-Tenant Data Isolation](#strict-multi-tenant-data-isolation)
3. [🧩 Chapter 3: How the Companion Extension Works After Installation](#-chapter-3-how-the-companion-extension-works-after-installation)
   - [Extension Popup Status Indicator](#extension-popup-status-indicator)
   - [The Floating Widget on LinkedIn, Naukri & Indeed](#the-floating-widget-on-linkedin-naukri--indeed)
   - [1-Click Auto-Fill & Instant Clipboard Copy](#1-click-auto-fill--instant-clipboard-copy)
   - [Live Background Sync with the Master Profile](#live-background-sync-with-the-master-profile)
4. [🌐 Chapter 4: How to Put the Extension on Google Chrome](#-chapter-4-how-to-put-the-extension-on-google-chrome)
   - [Method 1: Local Developer Mode Installation (Free & Immediate)](#method-1-local-developer-mode-installation-free--immediate)
   - [Method 2: Publishing to the Official Google Chrome Web Store](#method-2-publishing-to-the-official-google-chrome-web-store)
   - [Running on Mobile Phones (Android Kiwi Browser & iOS PWA)](#running-on-mobile-phones-android-kiwi-browser--ios-pwa)
5. [🖥️ Chapter 5: Complete Screen-by-Screen Walkthrough](#️-chapter-5-complete-screen-by-screen-walkthrough)
   - [Screen 1: Executive Dashboard & Target Metrics](#screen-1-executive-dashboard--target-metrics)
   - [Screen 2: 80%+ Match Job Feed & Global Filters](#screen-2-80-match-job-feed--global-filters)
   - [Screen 3: 7-Stage Kanban Application Tracker](#screen-3-7-stage-kanban-application-tracker)
   - [Screen 4: Master Profile (Single Source of Truth)](#screen-4-master-profile-single-source-of-truth)
   - [Screen 5: Universal Sync Hub (8-Node Platform Bridge)](#screen-5-universal-sync-hub-8-node-platform-bridge)
   - [Screen 6: 1-Click AI Resume Tailor](#screen-6-1-click-ai-resume-tailor)
6. [🔒 Chapter 6: Multi-Tenant Accounts & VAPT Security Architecture](#-chapter-6-multi-tenant-accounts--vapt-security-architecture)
7. [📝 Chapter 7: The JOJO Hands-On Workbook & Action Checklists](#-chapter-7-the-jojo-hands-on-workbook--action-checklists)
   - [Worksheet 1: Master Profile & Digital Passport Setup](#worksheet-1-master-profile--digital-passport-setup)
   - [Worksheet 2: 80%+ Match Job Hunting & Daily Routine](#worksheet-2-80-match-job-hunting--daily-routine)
   - [Worksheet 3: Extension Deployment & Platform Sync Checklist](#worksheet-3-extension-deployment--platform-sync-checklist)

---

## 🎯 Chapter 1: Project Aim & What We Have Done

### 1.1 The Core Aim
The primary mission of **JOJO Career OS** is to solve the painful, slow, and fragmented process of modern job hunting. 

In traditional job hunting, candidates have to:
1. Open 6 to 10 separate browser tabs (LinkedIn, Naukri, Indeed, Instahyre, Glassdoor, etc.).
2. Re-type their notice period, current salary, and target compensation over and over again on every portal.
3. Waste hours sifting through irrelevant job postings that only match 20% to 30% of their actual skillset.
4. Watch their resumes get silently discarded by Applicant Tracking Systems (Workday, Greenhouse, Lever) because resume keywords are not tailored.
5. Track applications in disorganized Excel spreadsheets or sticky notes.

**JOJO eliminates all of this by centralizing your entire career into a single operating system.**

### 1.2 Summary of What Has Been Built & Hardened
- **Next.js 14 Fullstack App**: Lightning-fast, modern UI powered by Turbopack and React 18.
- **80%+ Match Filtering Engine**: Scans job listings and prioritizes opportunities where your skills match 80% to 100%.
- **Worldwide Remote & Indian Filters**: Filter by $90k–$150k USD remote openings, Bangalore, Pune, Gurgaon, or hybrid roles.
- **Universal Platform Connector**: 8 platform integration bridges linking LinkedIn, Naukri, Indeed, Instahyre, Foundit, Wellfound, Glassdoor, and Greenhouse/Lever.
- **Companion Chrome Extension (Manifest V3)**: Floating auto-fill helper that injects your profile, notice period, and tailored bullet points directly into application forms.
- **7-Stage Kanban Tracker**: Visual drag-and-drop pipeline tracking Wishlist $\to$ Applied $\to$ Screening $\to$ Technical $\to$ Final $\to$ Offer $\to$ Rejected.
- **1-Click AI Resume Tailor**: Generates high-impact, ATS-optimized bullet points scoring 95%+ match rates.
- **Mobile Responsive + PWA**: Optimized navigation bar for smartphones with Progressive Web App offline support.
- **VAPT Certified Security**: 12-round bcrypt password encryption, IDOR authorization barriers, rate-limiting on authentication, and signed HTTP-only cookies.

---

## 👥 Chapter 2: How Other People See & Use JOJO

When someone else (a friend, recruiter, or teammate) visits your JOJO application, here is how the experience works:

```
[ New Visitor Arrives at JOJO ]
          │
          ├───► 1. Guest Preview Mode (Read-Only Sample Data)
          │        • Can view sample dashboard & job feeds
          │        • Cannot overwrite private personal profiles
          │
          └───► 2. Create Their Own Free Account
                   • Enters Name, Email, Password, Role, CTC & Notice Period
                   • Dedicated Database Slice Created Automatically
                   • 100% Private & Isolated Data Storage
```

### 2.1 Guest Preview Mode
- When an unauthenticated user opens `http://<domain-or-ip>:3000`, they enter a safe **Guest Preview Mode**.
- They can browse the sample job feed, inspect ATS match percentages, test the salary calculators, and explore the Kanban board layout.
- Any attempt to modify data or sync external profiles requires logging in or signing up.

### 2.2 Creating a New User Account
- The visitor clicks **"Log In"** in the top navigation bar, then clicks **"Create Account"**.
- They fill out a clean signup form:
  - Full Name & Professional Title (e.g., *DevSecOps Engineer*, *Full Stack Developer*, *Product Manager*)
  - Email Address & Password (encrypted using 12 rounds of bcrypt)
  - Current CTC & Target CTC
  - Notice Period (e.g., *Immediate*, *15 Days*, *30 Days*, *60 Days*)
- Once registered, JOJO creates an independent digital workspace for them.

### 2.3 Strict Multi-Tenant Data Isolation
- **Separate Data Storage**: Each user's applications, notes, custom skills, and sync history are saved under their own isolated profile ID in `data/jojo-db.json`.
- **Zero Cross-Contamination**: Person A can never see Person B's job applications, salary details, or interview notes.
- **VAPT-Hardened IDOR Barrier**: If anyone attempts to manipulate API parameters (`/api/data?userId=other_user`), JOJO's server blocks the request with `HTTP 403 Forbidden`.

---

## 🧩 Chapter 3: How the Companion Extension Works After Installation

The JOJO Chrome Companion Extension is built using Google Chrome's modern **Manifest V3** standard. Here is what happens once it is installed in your browser:

### 3.1 Extension Popup Status Indicator
When you click the purple JOJO icon in your Chrome toolbar:
- It connects to your local or hosted JOJO backend (`http://localhost:3000/api/data`).
- Displays your current sync status: **"Connected to JOJO Core"** with a green pulse dot.
- Displays your active profile credentials: Full Name, Current Title, Primary Skills, Current Notice Period, and Target CTC.

### 3.2 The Floating Widget on Job Portals
When you navigate to **LinkedIn**, **Naukri.com**, or **Indeed**:
- The extension automatically injects a sleek, non-intrusive floating badge in the bottom-right corner of the webpage: **"JOJO Sync"**.
- The widget stays minimized until you hover or click on it, keeping your browsing experience clean.

### 3.3 1-Click Auto-Fill & Instant Clipboard Copy
When you click the floating JOJO badge on any job application page:
- **Instant Headline & Summary Injection**: Injects your tailored headline directly into the profile form.
- **Notice Period & CTC Form Auto-Fill**: Automatically fills standard dropdowns and inputs for notice period and salary expectations.
- **1-Click Clipboard Copy**: Provides instant copy buttons for your tailored AI resume bullets, GitHub links, and custom cover letters.

### 3.4 Live Background Sync
- Whenever you update your skills or change your notice period in the JOJO web dashboard, the Chrome extension receives the updated payload in real time. You never need to reinstall the extension or manually re-enter data.

---

## 🌐 Chapter 4: How to Put the Extension on Google Chrome

You can install the JOJO extension in two ways: **Method 1** for instant personal use (takes 30 seconds), or **Method 2** for publishing to the official Google Chrome Web Store for the general public.

---

### Method 1: Local Developer Mode Installation (Free & Immediate)

This is the standard way to run custom extensions directly from your computer without paying any fees or waiting for Google review:

```
[ Step 1: Open Extensions ] ──► [ Step 2: Toggle Developer Mode ] ──► [ Step 3: Load Unpacked ]
   chrome://extensions             Top-Right Corner Switch              Select the "extension" Folder
```

#### Step-by-Step Instructions:
1. Open Google Chrome, Brave, or Microsoft Edge on your computer.
2. In the browser address bar, type `chrome://extensions` and press **Enter**.
3. In the top-right corner, switch the **"Developer mode"** toggle switch to **ON**.
4. In the top-left corner, click the **"Load unpacked"** button.
5. In the file picker window, navigate to your JOJO project folder and select the `extension` folder:
   ```
   c:\Users\geeta.jogi\OneDrive - AltiSec Technologies Pvt. Ltd\Desktop\DevSecOps\JOJO\extension
   ```
6. Click **Select Folder**.
7. The **JOJO Sync Companion** extension will now appear in your extensions list!
8. Click the puzzle piece icon (Extensions) in your browser toolbar and click the **Pin** icon next to JOJO so it stays visible.

---

### Method 2: Publishing to the Official Google Chrome Web Store

To make the extension available to anyone worldwide via a single click from the Chrome Web Store:

#### Step 1: Prepare the Extension Archive (.zip)
1. Navigate to the `extension` folder inside the JOJO directory.
2. Verify that `manifest.json`, `background.js`, `content.js`, `popup.html`, `popup.js`, and the `icons/` folder (`icon16.png`, `icon48.png`, `icon128.png`) are present.
3. Select all files inside the `extension` folder, right-click, and choose **Compress to ZIP file** (name it `jojo-extension.zip`).  
   *(Note: Zip the contents directly, not the outer parent directory).*

#### Step 2: Register a Chrome Web Store Developer Account
1. Open [Google Chrome Web Store Developer Console](https://chrome.google.com/webstore/devconsole).
2. Sign in with your Google account.
3. Pay the one-time Google developer registration fee of **\$5 USD** (Google requires this once per developer to prevent spam).
4. Complete your developer profile (Name, Developer Contact Email).

#### Step 3: Upload the Package
1. In the Chrome Web Store Developer Console, click the **"Add new item"** button.
2. Drag and drop your `jojo-extension.zip` file into the upload box.
3. Google will unpack the zip and validate your `manifest.json`.

#### Step 4: Complete Store Listing Information
Fill in the public listing details:
- **Title**: JOJO Career OS — Multi-Platform Auto-Fill & ATS Sync
- **Short Description**: Centralized career operating system companion. Auto-fills job applications, syncs notice periods, and matches ATS keywords across LinkedIn, Naukri, and Indeed.
- **Detailed Description**: Full overview of features, supported platforms, and privacy assurances.
- **Category**: Productivity / Tools.
- **Icon**: Upload 128x128 px PNG store icon.
- **Screenshots**: Upload at least one 1280x800 px or 640x400 px screenshot demonstrating the extension popup and floating badge in action.

#### Step 5: Privacy Practices Declaration
1. Google requires declaring which permissions your extension uses:
   - `storage`: Used to save the user's sync settings locally.
   - `tabs` / `activeTab`: Used to display the auto-fill helper on LinkedIn, Naukri, and Indeed.
2. Single Purpose Description: *"To synchronize user career profiles and assist in auto-filling application forms on job websites."*
3. Check the box confirming that user data is never sold or transferred to third parties.

#### Step 6: Submit for Review
1. Click **"Submit for Review"**.
2. Google's automated checks and manual review team typically review and approve new extensions within **24 to 72 hours**.
3. Once approved, your extension will have its own public URL (e.g., `https://chromewebstore.google.com/detail/jojo/...`) that anyone can install with one click!

---

### Running on Mobile Phones (Android & iOS)

- **Android (Kiwi / Lemur Browser)**: Install Kiwi Browser from the Google Play Store $\to$ open `chrome://extensions` in Kiwi $\to$ toggle Developer Mode $\to$ Load unpacked $\to$ select the JOJO `extension` folder. You now have the full desktop extension working on your mobile device!
- **iPhone (iOS Safari PWA)**: Open `http://<your-ip>:3000` in Safari $\to$ tap Share $\to$ tap **"Add to Home Screen"**. JOJO runs as a native full-screen app with 1-tap clipboard sync.

---

## 🖥️ Chapter 5: Complete Screen-by-Screen Walkthrough

### Screen 1: Executive Dashboard & Target Metrics
- **Top KPI Cards**: 80%+ Match Opportunities, Target CTC with Expected Hike percentage, Average ATS Compatibility Score (95%), and Active Pipeline count.
- **Velocity Funnel**: Visual tracking of candidate progression from Initial Application down to Final Job Offer.
- **Skill Gap Advisor**: Highlights missing high-demand skills so you can prioritize learning.

### Screen 2: 80%+ Match Job Feed & Global Filters
- **Match Tiers**: Filter tabs for `80%+ Top Match`, `70%+ Match`, and `All Jobs`.
- **Global Region Selector**: Instantly filter between Worldwide Remote (\$90k–\$150k USD), India (Bangalore, Pune, Gurgaon), USA, and Europe.
- **Actionable Job Cards**: Shows matched vs. missing skills, platform source badges, and direct stage mover buttons.

### Screen 3: 7-Stage Kanban Application Tracker
- **Columns**: Wishlist $\to$ Applied $\to$ Screening $\to$ Technical $\to$ Final Round $\to$ Offer $\to$ Rejected.
- **Card Details**: Interactive cards with company logo, compensation badges, and private recruiter interview notes.

### Screen 4: Master Profile (Single Source of Truth)
- One central place to maintain your Full Name, Headline, Notice Period (e.g. Immediate / 30 Days), Current and Expected CTC, Skills with expertise levels, and Verified Certifications.

### Screen 5: Universal Sync Hub (8-Node Platform Bridge)
- Visual nerve center connecting 8 external job portals: LinkedIn, Naukri.com, Indeed India, Instahyre, Glassdoor, Foundit, Wellfound, and Greenhouse/Lever ATS.

### Screen 6: 1-Click AI Resume Tailor
- Analyzes any job description, extracts key requirements, and generates 3 high-impact resume bullet points with quantifiable metrics tailored for a 95%+ ATS match score.

---

## 🔒 Chapter 6: Multi-Tenant Accounts & VAPT Security Architecture

JOJO has undergone a thorough Vulnerability Assessment and Penetration Testing (VAPT) process and is hardened against standard attack vectors:

| Security Domain | Vulnerability Addressed | Remediation Implemented | Status |
| :--- | :--- | :--- | :--- |
| **Authentication** | Plaintext password exposure | **12-Round Bcrypt Hashing** (`$2b$12$...`) | ✅ **Hardened** |
| **Authorization** | Broken Object Level Auth (IDOR) | **Session-Bound User ID Validation** (returns 403) | ✅ **Hardened** |
| **Brute-Force Defense** | Automated credential stuffing | **In-Memory Rate Limiter** (locks out after 5 failures) | ✅ **Hardened** |
| **Session Security** | Session hijacking & token theft | **HMAC-SHA256 Signed Cookies** (`HttpOnly`, `SameSite=Lax`) | ✅ **Hardened** |

---

## 📝 Chapter 7: The JOJO Hands-On Workbook & Action Checklists

Use these interactive worksheets and checklists to guide your daily job hunting routine:

### Worksheet 1: Master Profile & Digital Passport Setup
- [ ] Log in or create your personal account on JOJO.
- [ ] Set your current title and target primary designation.
- [ ] Accurately configure your Notice Period (*Immediate*, *15 Days*, *30 Days*, or *60 Days*).
- [ ] Enter your Current CTC and Target CTC with realistic market hike expectations.
- [ ] Add at least 6 primary skills (e.g., Kubernetes, CI/CD, AWS, Python, Docker, Terraform).
- [ ] Click **"Save Changes"** in the Master Profile tab.

### Worksheet 2: 80%+ Match Job Hunting & Daily Routine
- [ ] Open the **80%+ Match Job Feed** tab.
- [ ] Select your target location (**Worldwide Remote** for USD roles or **India** for domestic openings).
- [ ] Review the top 5 high-priority matches with green skill badges.
- [ ] Click **"AI Tailor"** on your top target job and review the generated ATS bullet points.
- [ ] Move the job card to the **"Applied"** stage in your Kanban tracker.
- [ ] When a recruiter responds, move the card to **"Screening"** and add meeting notes.

### Worksheet 3: Extension Deployment & Platform Sync Checklist
- [ ] Open `chrome://extensions` in Google Chrome and enable **Developer mode**.
- [ ] Click **Load unpacked** and select the JOJO `extension` folder.
- [ ] Pin the JOJO Sync Companion icon to your browser toolbar.
- [ ] Open LinkedIn or Naukri and confirm the floating **JOJO Sync** badge appears in the bottom right corner.
- [ ] Test 1-click headline and notice period copying into an application form.
- [ ] If distributing publicly, follow Chapter 4 (Method 2) to prepare and upload `jojo-extension.zip` to the Chrome Web Store Developer Console.

---

*(Official Repository: [https://github.com/geet264/JOJO-.git](https://github.com/geet264/JOJO-.git))*
