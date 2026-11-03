const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const docx = require('docx');
const { Document, Packer, Paragraph, TextRun, HeadingLevel, Table, TableRow, TableCell, BorderStyle, WidthType, AlignmentType } = docx;

// 1. GENERATE WORD DOCUMENT (.docx)
async function generateDocx() {
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          // Title
          new Paragraph({
            text: "JOJO Career OS — Master Guidebook & Project Manual",
            heading: HeadingLevel.TITLE,
            alignment: AlignmentType.CENTER,
            spacing: { after: 200 },
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "All-in-One Job Finding, ATS Verification, & Multi-Platform Synchronization Engine\n", italics: true }),
              new TextRun({ text: "Author: Geeta Jogi (DevSecOps Lead) | Date: November 2026 | Version: 1.2 (VAPT Certified)", bold: true }),
            ],
            alignment: AlignmentType.CENTER,
            spacing: { after: 400 },
          }),

          // 1. AIM & VISION
          new Paragraph({ text: "1. Project Aim & Vision", heading: HeadingLevel.HEADING_1, spacing: { before: 300, after: 150 } }),
          new Paragraph({
            text: "The aim of JOJO is to revolutionize and simplify the fragmented job application process for tech professionals worldwide. Instead of logging into 6 different portals (LinkedIn, Naukri, Indeed, Instahyre, etc.), repeatedly copy-pasting resumes, and losing track of applications, JOJO centralizes your career into a single Operating System.",
            spacing: { after: 150 },
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "• Our Primary Mission:\n", bold: true }),
              new TextRun("1. Store Master Profile Once: Maintain your headline, CTC, notice period (e.g. 30 days), and core skills in one trusted place.\n"),
              new TextRun("2. Filter 80%+ High Matches: Automatically eliminate low-quality jobs and spotlight top-tier opportunities matching your exact skills.\n"),
              new TextRun("3. Worldwide Remote & Indian Jobs: Filter high-paying USD remote jobs ($90k–$150k) alongside Indian tech hubs (Bangalore, Pune, Gurgaon).\n"),
              new TextRun("4. 8-Platform Auto-Sync: Seamlessly bridge your profile to LinkedIn, Naukri, Indeed, and corporate ATS portals.\n"),
              new TextRun("5. Multi-Tenant Bank-Grade Security: Completely isolate every user's data with bcrypt encryption and IDOR authorization barriers.\n"),
            ],
            spacing: { after: 250 },
          }),

          // 2. WHAT WE HAVE DONE
          new Paragraph({ text: "2. What We Have Built & Delivered", heading: HeadingLevel.HEADING_1, spacing: { before: 300, after: 150 } }),
          new Paragraph({
            text: "JOJO is a production-grade fullstack web application with an accompanying Chromium extension and secure backend:",
            spacing: { after: 150 },
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "✓ Next.js 14 App Router Fullstack Engine: ", bold: true }),
              new TextRun("High-performance Next.js Turbopack engine running React 18, TypeScript, and Tailwind CSS.\n"),
              new TextRun({ text: "✓ 80%+ Matching & ATS Scoring Algorithm: ", bold: true }),
              new TextRun("Calculates exact percentage match and ATS score (e.g. 95% Top 5% Candidate) against Greenhouse, Lever, and Workday formats.\n"),
              new TextRun({ text: "✓ Universal Platform Connector Hub: ", bold: true }),
              new TextRun("Central core node connecting 8 satellite job networks with real-time sync pulse animations and JSON payloads.\n"),
              new TextRun({ text: "✓ Chrome Companion Extension (Manifest V3): ", bold: true }),
              new TextRun("Browser extension that injects a floating JOJO Sync widget on LinkedIn, Naukri, and Indeed for 1-click form auto-filling.\n"),
              new TextRun({ text: "✓ 7-Stage Kanban Application Board: ", bold: true }),
              new TextRun("Visual drag-and-drop tracker (Wishlist -> Applied -> Screening -> Technical -> Final -> Offer) with private interview notes.\n"),
              new TextRun({ text: "✓ 1-Click AI Resume Tailor: ", bold: true }),
              new TextRun("Automatically analyzes job requirements to generate targeted 95%+ ATS resume bullets and cover letters.\n"),
              new TextRun({ text: "✓ Mobile App & PWA: ", bold: true }),
              new TextRun("Native mobile bottom navigation tab bar + PWA 'Add to Home Screen' capability for iOS & Android.\n"),
              new TextRun({ text: "✓ VAPT Security Hardened: ", bold: true }),
              new TextRun("Bcrypt 12-round password hashing, IDOR authorization barriers, HMAC-SHA256 session cookies, and brute-force rate limiters.\n"),
            ],
            spacing: { after: 250 },
          }),

          // 3. STEP-BY-STEP SCREEN GUIDE
          new Paragraph({ text: "3. Step-by-Step Screen Walkthrough", heading: HeadingLevel.HEADING_1, spacing: { before: 300, after: 150 } }),
          new Paragraph({
            children: [
              new TextRun({ text: "A. Executive Dashboard:\n", bold: true }),
              new TextRun("Provides live KPI cards (80%+ top match count, pipeline compensation with hike %, ATS average score 95%), velocity conversion funnel, and Skill Gap Advisor.\n\n"),
              new TextRun({ text: "B. 80%+ Match Job Feed:\n", bold: true }),
              new TextRun("Aggregated listings filterable by 80%+ Match, 70%+ Match, or All Jobs. Includes global region filter for Worldwide Remote, India, US, and Europe.\n\n"),
              new TextRun({ text: "C. Applications Kanban Pipeline:\n", bold: true }),
              new TextRun("Tracks candidate progression across 7 clear interview stages. Allows updating notes, recruiter contacts, and scheduled interview times.\n\n"),
              new TextRun({ text: "D. Master Profile:\n", bold: true }),
              new TextRun("The single source of truth for your name, CTC, notice period, skills matrix (Beginner, Intermediate, Expert), and work experience.\n\n"),
              new TextRun({ text: "E. Universal Sync Hub:\n", bold: true }),
              new TextRun("Visual interactive connector linking LinkedIn, Naukri, Indeed, Instahyre, Glassdoor, Foundit, Wellfound, and Greenhouse with automated JSON payloads.\n\n"),
              new TextRun({ text: "F. 1-Click AI Resume Tailor:\n", bold: true }),
              new TextRun("Generates custom-tailored resume bullets and cover letters tailored specifically to each target job description in 1 click.\n"),
            ],
            spacing: { after: 250 },
          }),

          // 4. BROWSER EXTENSION SETUP
          new Paragraph({ text: "4. Browser Companion Extension Setup", heading: HeadingLevel.HEADING_1, spacing: { before: 300, after: 150 } }),
          new Paragraph({
            children: [
              new TextRun({ text: "• On Desktop (Chrome, Edge, Brave):\n", bold: true }),
              new TextRun("1. Open chrome://extensions -> enable 'Developer mode'.\n"),
              new TextRun("2. Click 'Load unpacked' -> select the JOJO 'extension' folder.\n"),
              new TextRun("3. Open LinkedIn or Naukri -> click the purple floating JOJO badge to auto-fill your profile details.\n\n"),
              new TextRun({ text: "• On Android Phones (Kiwi Browser):\n", bold: true }),
              new TextRun("1. Install Kiwi Browser from Google Play Store (free).\n"),
              new TextRun("2. In Kiwi Browser, tap 3 dots -> Extensions -> Developer mode -> Load unpacked -> pick JOJO extension.\n"),
              new TextRun("3. Open LinkedIn or Naukri on your phone -> the JOJO sync widget runs natively on mobile!\n\n"),
              new TextRun({ text: "• On iPhone (Safari PWA):\n", bold: true }),
              new TextRun("1. Open JOJO in Safari -> tap Share -> 'Add to Home Screen'.\n"),
              new TextRun("2. Use the 1-Tap Mobile Sync button to copy tailored bullets directly into the mobile LinkedIn/Naukri app.\n"),
            ],
            spacing: { after: 250 },
          }),

          // 5. VAPT SECURITY AUDIT & CLOSURE
          new Paragraph({ text: "5. VAPT Security Audit & Closure Status", heading: HeadingLevel.HEADING_1, spacing: { before: 300, after: 150 } }),
          new Paragraph({
            text: "All Critical and High vulnerabilities have been neutralized and verified:",
            spacing: { after: 150 },
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "1. Password Encryption (CWE-256): ", bold: true }),
              new TextRun("PASSED. All passwords encrypted with 12-round bcrypt hashes ($2b$12$...). Zero plaintext stored.\n"),
              new TextRun({ text: "2. IDOR Protection (CWE-639 / OWASP API1): ", bold: true }),
              new TextRun("PASSED. Attempting to view another user's private data is blocked with HTTP 403 Forbidden.\n"),
              new TextRun({ text: "3. Brute-Force Rate Limiting (CWE-307): ", bold: true }),
              new TextRun("PASSED. Throttles after 5 failed attempts with HTTP 429 Too Many Requests and security lockout.\n"),
              new TextRun({ text: "4. Session Security (CWE-384): ", bold: true }),
              new TextRun("PASSED. Cryptographic HMAC-SHA256 tokens and HttpOnly, SameSite=Lax cookies active.\n"),
              new TextRun({ text: "5. Safe DOM Construction (CWE-79): ", bold: true }),
              new TextRun("PASSED. Injected elements in extension use safe document.createElement rather than innerHTML.\n"),
            ],
            spacing: { after: 250 },
          }),

          // 6. QUICKSTART
          new Paragraph({ text: "6. Quickstart: How to Run JOJO in 3 Steps", heading: HeadingLevel.HEADING_1, spacing: { before: 300, after: 150 } }),
          new Paragraph({
            children: [
              new TextRun("Step 1: Double-click START-JOJO.bat (or run 'npm run dev').\n"),
              new TextRun("Step 2: Open your browser to http://127.0.0.1:3000.\n"),
              new TextRun("Step 3: Click 'Log In' -> 'One-Click Quick Login as Geeta Jogi' (password: password123).\n\n"),
              new TextRun({ text: "Official GitHub Repository: https://github.com/geet264/JOJO-.git", italics: true, bold: true }),
            ],
          }),
        ],
      },
    ],
  });

  const buffer = await Packer.toBuffer(doc);
  const docxPath = path.join(process.cwd(), 'JOJO-Career-OS-Master-Guidebook.docx');
  fs.writeFileSync(docxPath, buffer);
  console.log('Generated Word Document at:', docxPath);
}

// 2. GENERATE PDF DOCUMENT (.pdf) VIA EDGE HEADLESS
function generatePdf() {
  const imagesDir = 'C:/Users/geeta.jogi/.gemini/antigravity/brain/e1dbbd2c-c94e-43f6-a630-17b9028bdcbd/.user_uploaded';

  const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>JOJO Career OS — Master Guidebook</title>
<style>
  @page {
    size: A4;
    margin: 20mm 18mm 20mm 18mm;
  }
  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    color: #1e293b;
    line-height: 1.6;
    font-size: 11pt;
    margin: 0;
    padding: 0;
  }
  .cover-page {
    page-break-after: always;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    height: 90vh;
    padding: 20px;
  }
  .badge {
    background: #eef2ff;
    color: #4f46e5;
    padding: 6px 14px;
    border-radius: 9999px;
    font-weight: 700;
    font-size: 11pt;
    border: 1px solid #c7d2fe;
    display: inline-block;
    margin-bottom: 20px;
  }
  h1 {
    font-size: 28pt;
    font-weight: 900;
    color: #1e1b4b;
    margin: 0 0 10px 0;
    letter-spacing: -0.5px;
  }
  .subtitle {
    font-size: 14pt;
    color: #475569;
    max-width: 600px;
    margin: 0 auto 30px auto;
  }
  .meta-box {
    margin-top: 40px;
    padding: 16px 24px;
    border-radius: 12px;
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    text-align: left;
    display: inline-block;
    font-size: 10pt;
  }
  .page {
    page-break-after: always;
  }
  h2 {
    color: #1e1b4b;
    border-bottom: 2px solid #e2e8f0;
    padding-bottom: 8px;
    margin-top: 24px;
    font-size: 16pt;
  }
  h3 {
    color: #334155;
    margin-top: 18px;
    font-size: 13pt;
  }
  .highlight-card {
    background: #f8fafc;
    border-left: 4px solid #4f46e5;
    padding: 12px 18px;
    border-radius: 0 8px 8px 0;
    margin: 14px 0;
    font-size: 10.5pt;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    margin: 16px 0;
    font-size: 9.5pt;
  }
  th, td {
    border: 1px solid #cbd5e1;
    padding: 8px 12px;
    text-align: left;
  }
  th {
    background: #f1f5f9;
    font-weight: 700;
    color: #0f172a;
  }
  .screenshot {
    width: 100%;
    max-height: 340px;
    object-fit: contain;
    border-radius: 8px;
    border: 1px solid #e2e8f0;
    box-shadow: 0 4px 6px -1px rgba(0,0,0,0.07);
    margin: 12px 0;
  }
  .code-block {
    background: #0f172a;
    color: #e2e8f0;
    font-family: Courier, monospace;
    padding: 12px 16px;
    border-radius: 8px;
    font-size: 9pt;
    margin: 10px 0;
  }
</style>
</head>
<body>

  <!-- COVER PAGE -->
  <div class="cover-page">
    <div class="badge">Official Product &amp; Technical Manual</div>
    <h1>JOJO Career OS</h1>
    <div class="subtitle">All-in-One Job Finding, ATS Verification, &amp; Multi-Platform Synchronization Engine</div>
    <div style="width: 80px; height: 4px; background: #4f46e5; margin: 20px auto; border-radius: 2px;"></div>
    
    <div class="meta-box">
      <div><strong>Project Lead:</strong> Geeta Jogi (DevSecOps Lead)</div>
      <div><strong>Repository:</strong> https://github.com/geet264/JOJO-.git</div>
      <div><strong>Audited &amp; Hardened:</strong> VAPT Certified (OWASP Top 10 Compliant)</div>
      <div><strong>Date:</strong> November 2026 | Version 1.2</div>
    </div>
  </div>

  <!-- CHAPTER 1 & 2 -->
  <div class="page">
    <h2>1. Executive Summary &amp; Project Aim</h2>
    <div class="highlight-card">
      <strong>Our Aim:</strong> Replace the painful, manual process of job hunting across fragmented websites with a unified Career Operating System. Store your profile once in JOJO, automatically match top-tier jobs with &ge; 80% compatibility, and sync effortlessly across all 8 major job portals.
    </div>

    <h3>The Problem We Solved</h3>
    <table>
      <thead>
        <tr>
          <th>The Old Way of Job Hunting</th>
          <th>The JOJO Way</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Re-typing Notice Period and CTC on 6 separate job portals.</td>
          <td><strong>Update Once in JOJO:</strong> Syncs to LinkedIn, Naukri, Indeed, and Instahyre in 1 click.</td>
        </tr>
        <tr>
          <td>Browsing hundreds of low-match jobs (20%-40%).</td>
          <td><strong>80%+ Match Filter:</strong> Prioritizes top-tier roles matching your core skills.</td>
        </tr>
        <tr>
          <td>Rejection by automated corporate ATS filters.</td>
          <td><strong>Built-in ATS Scorer:</strong> Ranks your resume against Greenhouse, Lever &amp; Workday standards.</td>
        </tr>
        <tr>
          <td>Losing track of interview rounds and notes.</td>
          <td><strong>7-Stage Kanban Board:</strong> Visual drag-and-drop tracker with private interview notes.</td>
        </tr>
      </tbody>
    </table>

    <h2>2. What We Have Built (Complete Technical Inventory)</h2>
    <ul>
      <li><strong>Fullstack Next.js 14 Engine:</strong> Built with App Router, TypeScript, and Tailwind CSS on Turbopack.</li>
      <li><strong>80%+ Match &amp; ATS Algorithm:</strong> Real-time skill vector scoring with missing skills diagnosis.</li>
      <li><strong>Universal Platform Connector:</strong> Central sync hub managing 8 platform bridges.</li>
      <li><strong>Chrome Companion Extension:</strong> Manifest V3 content script auto-filling profile forms.</li>
      <li><strong>7-Stage Kanban Tracker:</strong> Wishlist &rarr; Applied &rarr; Screening &rarr; Technical &rarr; Final &rarr; Offer &rarr; Rejected.</li>
      <li><strong>1-Click AI Resume Tailor:</strong> Generates targeted 95%+ ATS resume bullets and cover letters.</li>
      <li><strong>Mobile App Experience &amp; PWA:</strong> Mobile bottom navigation tab bar + phone extension support.</li>
      <li><strong>VAPT Hardened Architecture:</strong> 12-round bcrypt password hashing, IDOR authorization barriers, rate-limiting, and secure cookies.</li>
    </ul>
  </div>

  <!-- CHAPTER 3: SCREEN WALKTHROUGHS -->
  <div class="page">
    <h2>3. Screen Walkthrough &amp; Visual Guide</h2>

    <h3>Screen 1: Executive Dashboard</h3>
    <p>Provides live KPI metric cards (80%+ top matches, target CTC with hike %, 95% average ATS score), application velocity funnel, and Skill Gap Advisor.</p>
    <img class="screenshot" src="file:///${imagesDir}/media_1793188865572_18d225a7.png" alt="Executive Dashboard" />

    <h3>Screen 2: 80%+ Match Job Feed &amp; Worldwide Remote Filters</h3>
    <p>Aggregated job listings filterable by 80%+ Top Match, 70%+ Match, or All Jobs across Worldwide Remote (USD), India, US, and Europe.</p>
    <img class="screenshot" src="file:///${imagesDir}/media_1793200133390_54fd0c7b.png" alt="Job Feed" />
  </div>

  <!-- CHAPTER 3 CONTINUED -->
  <div class="page">
    <h3>Screen 3: Universal Platform Connector &amp; Sync Hub</h3>
    <p>Visual central core node connecting 8 satellite networks (LinkedIn, Naukri, Indeed, Instahyre, Glassdoor, Foundit, Wellfound, Greenhouse).</p>
    <img class="screenshot" src="file:///${imagesDir}/media_1793624814647_633a9985.png" alt="Universal Connector" />

    <h3>Screen 4: Auto-Fill &amp; Isolated Sync Payload</h3>
    <p>Standardized digital package prepared for the companion extension to inject into external authenticated portals.</p>
    <img class="screenshot" src="file:///${imagesDir}/media_1793625732331_bee3c130.png" alt="Sync Payload" />
  </div>

  <!-- CHAPTER 4: EXTENSION & MOBILE -->
  <div class="page">
    <h2>4. Companion Browser Extension &amp; Mobile Guide</h2>
    <div class="highlight-card">
      <strong>Why an Extension is Used:</strong> Portals like LinkedIn and Naukri do not allow third-party servers to edit personal profiles. JOJO solves this using a lightweight Chrome Companion Extension that operates inside your authenticated browser session.
    </div>

    <h3>How to Install on Desktop</h3>
    <ol>
      <li>Open <code>chrome://extensions</code> &rarr; toggle on <strong>Developer mode</strong>.</li>
      <li>Click <strong>Load unpacked</strong> &rarr; select the <code>extension</code> folder in the JOJO project.</li>
      <li>Open LinkedIn or Naukri &rarr; click the floating purple <strong>JOJO Sync</strong> widget to auto-fill your profile details.</li>
    </ol>
    <img class="screenshot" src="file:///${imagesDir}/media_1793624044338_cef7a8e2.png" alt="Extension on LinkedIn" />

    <h3>Running on Phones</h3>
    <ul>
      <li><strong>On Android (Kiwi Browser):</strong> Install Kiwi Browser from Play Store &rarr; Extensions &rarr; Developer Mode &rarr; Load unpacked &rarr; Pick JOJO folder. The extension runs natively on your phone!</li>
      <li><strong>On iPhone (Safari PWA):</strong> Open in Safari &rarr; Tap Share &rarr; <em>Add to Home Screen</em>. Use 1-Tap Mobile Sync to copy tailored bullets directly into the mobile LinkedIn or Naukri app.</li>
    </ul>
  </div>

  <!-- CHAPTER 5: VAPT SECURITY -->
  <div class="page">
    <h2>5. VAPT Security Audit &amp; Verification Closure</h2>
    <p>A full Vulnerability Assessment &amp; Penetration Testing (VAPT) audit was conducted and all critical security vulnerabilities have been patched:</p>
    
    <table>
      <thead>
        <tr>
          <th>Vulnerability</th>
          <th>OWASP / CWE</th>
          <th>Fix Implemented</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Plaintext Passwords</td>
          <td>CWE-256 / CWE-916</td>
          <td>Encrypted using 12-round bcrypt hashes ($2b$12$...).</td>
          <td><strong>VERIFIED FIXED</strong></td>
        </tr>
        <tr>
          <td>IDOR / Cross-User Snooping</td>
          <td>OWASP API1 / CWE-639</td>
          <td>HMAC session verification; cross-account queries blocked with HTTP 403.</td>
          <td><strong>VERIFIED FIXED</strong></td>
        </tr>
        <tr>
          <td>Brute-Force Login Attacks</td>
          <td>OWASP API4 / CWE-307</td>
          <td>Sliding window rate limiter: blocks with HTTP 429 after 5 failed attempts.</td>
          <td><strong>VERIFIED FIXED</strong></td>
        </tr>
        <tr>
          <td>Insecure Session Storage</td>
          <td>CWE-384 / CWE-306</td>
          <td>Signed session tokens + HttpOnly, SameSite=Lax cookies.</td>
          <td><strong>VERIFIED FIXED</strong></td>
        </tr>
        <tr>
          <td>CORS Vulnerabilities</td>
          <td>CWE-942</td>
          <td>Strict preflight origin whitelist (localhost &amp; extension only).</td>
          <td><strong>VERIFIED FIXED</strong></td>
        </tr>
      </tbody>
    </table>

    <h2>6. Quickstart: Running JOJO in 3 Steps</h2>
    <div class="code-block">
Step 1: Double-click START-JOJO.bat (or run "npm run dev")
Step 2: Open http://127.0.0.1:3000 in your browser
Step 3: Click "Log In" -> "One-Click Quick Login as Geeta Jogi" (password: password123)
    </div>

    <p style="text-align: center; margin-top: 40px; font-size: 10pt; color: #64748b;">
      Official Git Repository: <strong>https://github.com/geet264/JOJO-.git</strong><br>
      JOJO Career OS — Built with Next.js 14 &amp; DevSecOps Best Practices
    </p>
  </div>

</body>
</html>`;

  const htmlPath = path.join(process.cwd(), 'temp-guidebook.html');
  const pdfPath = path.join(process.cwd(), 'JOJO-Career-OS-Master-Guidebook.pdf');
  fs.writeFileSync(htmlPath, htmlContent, 'utf-8');

  const edgeExe = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  const cmd = `"${edgeExe}" --headless --disable-gpu --print-to-pdf="${pdfPath}" "${htmlPath}"`;
  
  execSync(cmd);
  if (fs.existsSync(htmlPath)) fs.unlinkSync(htmlPath);
  console.log('Generated PDF Document at:', pdfPath);
}

async function main() {
  await generateDocx();
  generatePdf();
}

main().catch(console.error);
