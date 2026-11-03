const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const docx = require('docx');
const { Document, Packer, Paragraph, TextRun, HeadingLevel, Table, TableRow, TableCell, AlignmentType } = docx;

// 1. GENERATE WORD DOCUMENT (.docx)
async function generateDocx() {
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          // Title
          new Paragraph({
            text: "JOJO Career OS — Complete Guidebook & Workbook",
            heading: HeadingLevel.TITLE,
            alignment: AlignmentType.CENTER,
            spacing: { after: 150 },
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "All-in-One Job Finding, ATS Verification, Multi-Platform Sync & Extension Manual\n", italics: true }),
            ],
            alignment: AlignmentType.CENTER,
            spacing: { after: 300 },
          }),

          // SECTION 1: AIM & WHAT WE HAVE DONE
          new Paragraph({ text: "1. Project Aim & What We Have Done", heading: HeadingLevel.HEADING_1, spacing: { before: 200, after: 150 } }),
          new Paragraph({
            children: [
              new TextRun({ text: "Our Aim:\n", bold: true }),
              new TextRun("To replace the slow, manual process of job hunting across fragmented websites with a unified Career Operating System. Instead of re-typing your profile, notice period, and CTC on 6 different portals, JOJO centralizes everything into one single master dashboard.\n\n"),
              new TextRun({ text: "What Has Been Built & Delivered:\n", bold: true }),
              new TextRun("• Fullstack Next.js 14 App with Turbopack & React 18.\n"),
              new TextRun("• 80%+ Match Engine filtering top-tier jobs with matching skills.\n"),
              new TextRun("• Worldwide Remote ($90k–$150k USD) and Indian location filtering.\n"),
              new TextRun("• Universal Platform Connector Hub bridging 8 job platforms.\n"),
              new TextRun("• Companion Chrome Extension (Manifest V3) for automated form auto-filling.\n"),
              new TextRun("• 7-Stage Kanban Application Tracker with interview notes.\n"),
              new TextRun("• 1-Click AI Resume Tailor generating 95%+ ATS bullet points.\n"),
              new TextRun("• Mobile responsive bottom tab bar + PWA for smartphones.\n"),
              new TextRun("• VAPT Certified Security: 12-round bcrypt password hashing, IDOR authorization barriers, rate limiting, and secure cookies.\n"),
            ],
            spacing: { after: 200 },
          }),

          // SECTION 2: HOW OTHER PEOPLE SEE AND USE JOJO
          new Paragraph({ text: "2. How Other People See and Use JOJO", heading: HeadingLevel.HEADING_1, spacing: { before: 200, after: 150 } }),
          new Paragraph({
            children: [
              new TextRun({ text: "When a new person or teammate visits JOJO:\n", bold: true }),
              new TextRun("1. Guest Preview Mode: Before logging in, they see a clean preview mode with live sample data and a welcome invitation banner.\n"),
              new TextRun("2. Creating Their Account: They click 'Create Account' and set up their own name, email, password, target role, notice period, and preferred CTC.\n"),
              new TextRun("3. Complete Data Isolation: The moment they sign in, JOJO initializes a private, isolated data bucket for them. Their skills, jobs, and platform connections are strictly their own. User A never sees or overwrites User B's data.\n"),
              new TextRun("4. Personalized Dashboard: Their dashboard immediately recalculates 80%+ match jobs tailored strictly to their own skill set.\n"),
            ],
            spacing: { after: 200 },
          }),

          // SECTION 3: HOW THE CHROME EXTENSION WORKS AFTER INSTALLATION
          new Paragraph({ text: "3. How the Extension Works After Installation", heading: HeadingLevel.HEADING_1, spacing: { before: 200, after: 150 } }),
          new Paragraph({
            children: [
              new TextRun({ text: "What Happens After Installing the Extension:\n", bold: true }),
              new TextRun("• Instant Engine Link: The extension icon in your browser toolbar connects to your local JOJO hub, displaying 'Engine Status: Connected ✓' along with your active user name.\n"),
              new TextRun("• Floating Widget on Job Sites: When you navigate to LinkedIn, Naukri, or Indeed, a sleek purple 'JOJO Sync' badge automatically appears in the bottom-right corner of the webpage.\n"),
              new TextRun("• 1-Click Auto-Fill: Clicking the widget reads your master profile payload, displays your matching headline, skills, notice period, and CTC, and auto-fills the web form or copies tailored bullets to your clipboard.\n"),
            ],
            spacing: { after: 200 },
          }),

          // SECTION 4: HOW TO PUT THIS EXTENSION ON GOOGLE CHROME EXTENSIONS
          new Paragraph({ text: "4. How to Put the Extension on Google Chrome (Local & Web Store)", heading: HeadingLevel.HEADING_1, spacing: { before: 200, after: 150 } }),
          new Paragraph({
            children: [
              new TextRun({ text: "Method A: Load Locally in Chrome (Available Right Now):\n", bold: true }),
              new TextRun("1. Open Google Chrome and type: chrome://extensions in the address bar.\n"),
              new TextRun("2. Turn on the 'Developer mode' toggle switch in the top-right corner.\n"),
              new TextRun("3. Click 'Load unpacked' in the top-left corner.\n"),
              new TextRun("4. Select the 'extension' folder from your JOJO project directory. The extension is now live!\n\n"),
              new TextRun({ text: "Method B: Publishing to Official Google Chrome Web Store:\n", bold: true }),
              new TextRun("To allow anyone in the world to install JOJO from the Chrome Web Store in 1 click:\n"),
              new TextRun("Step 1: Compress the extension folder into a ZIP file (e.g. jojo-extension.zip).\n"),
              new TextRun("Step 2: Go to the Chrome Web Store Developer Dashboard (chrome.google.com/webstore/devconsole).\n"),
              new TextRun("Step 3: Register a Chrome Web Store developer account ($5 one-time registration fee by Google).\n"),
              new TextRun("Step 4: Click 'New Item' and upload your jojo-extension.zip package.\n"),
              new TextRun("Step 5: Fill in Store Listing (Title: 'JOJO Sync Companion', Description, Category: Productivity, Icon: 128x128).\n"),
              new TextRun("Step 6: Submit for Google review. Once approved, your extension is live on the Chrome Web Store with an 'Add to Chrome' button!\n"),
            ],
            spacing: { after: 200 },
          }),

          // SECTION 5: INTERACTIVE WORKBOOK & CHECKLISTS
          new Paragraph({ text: "5. Hands-on User Workbook (Checklists & Action Steps)", heading: HeadingLevel.HEADING_1, spacing: { before: 200, after: 150 } }),
          new Paragraph({
            children: [
              new TextRun({ text: "Worksheet 1: Master Profile Setup\n", bold: true }),
              new TextRun("[  ] Step 1.1: Log in to JOJO at http://127.0.0.1:3000.\n"),
              new TextRun("[  ] Step 1.2: Navigate to 'My Profile'.\n"),
              new TextRun("[  ] Step 1.3: Set your Current CTC, Expected CTC, and Notice Period (e.g. 30 Days).\n"),
              new TextRun("[  ] Step 1.4: Add your core skills with level ratings (Expert, Intermediate).\n\n"),

              new TextRun({ text: "Worksheet 2: 80%+ Match Job Hunt\n", bold: true }),
              new TextRun("[  ] Step 2.1: Open 'Job Matches'.\n"),
              new TextRun("[  ] Step 2.2: Select the '80%+ Top Match' tab.\n"),
              new TextRun("[  ] Step 2.3: Select 'Worldwide Remote' to view USD salary openings.\n"),
              new TextRun("[  ] Step 2.4: Move your top choices to 'Wishlist' or 'Applied'.\n\n"),

              new TextRun({ text: "Worksheet 3: Extension Installation & Sync\n", bold: true }),
              new TextRun("[  ] Step 3.1: Open chrome://extensions and enable Developer mode.\n"),
              new TextRun("[  ] Step 3.2: Click 'Load unpacked' and pick the extension folder.\n"),
              new TextRun("[  ] Step 3.3: Open LinkedIn or Naukri and verify the purple JOJO Sync widget appears.\n"),
              new TextRun("[  ] Step 3.4: Click the widget to auto-fill your application details.\n"),
            ],
            spacing: { after: 200 },
          }),
        ],
      },
    ],
  });

  const buffer = await Packer.toBuffer(doc);
  const docxPath = path.join(process.cwd(), 'JOJO-Career-OS-Master-Guidebook.docx');
  fs.writeFileSync(docxPath, buffer);
  console.log('Regenerated Word Document at:', docxPath);
}

// 2. GENERATE PDF DOCUMENT (.pdf) VIA EDGE HEADLESS
function generatePdf() {
  const imagesDir = 'C:/Users/geeta.jogi/.gemini/antigravity/brain/e1dbbd2c-c94e-43f6-a630-17b9028bdcbd/.user_uploaded';

  const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>JOJO Career OS — Guidebook &amp; Workbook</title>
<style>
  @page {
    size: A4;
    margin: 18mm 16mm 18mm 16mm;
  }
  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    color: #1e293b;
    line-height: 1.6;
    font-size: 10.5pt;
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
    height: 88vh;
    padding: 20px;
  }
  .badge {
    background: #eef2ff;
    color: #4f46e5;
    padding: 6px 16px;
    border-radius: 9999px;
    font-weight: 800;
    font-size: 11pt;
    border: 1px solid #c7d2fe;
    display: inline-block;
    margin-bottom: 24px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  h1 {
    font-size: 32pt;
    font-weight: 900;
    color: #1e1b4b;
    margin: 0 0 12px 0;
    letter-spacing: -0.5px;
  }
  .subtitle {
    font-size: 14pt;
    color: #475569;
    max-width: 620px;
    margin: 0 auto;
    line-height: 1.5;
  }
  .divider {
    width: 90px;
    height: 4px;
    background: linear-gradient(90deg, #4f46e5, #7c3aed);
    margin: 28px auto;
    border-radius: 2px;
  }
  .cover-tags {
    margin-top: 35px;
    display: flex;
    gap: 10px;
    justify-content: center;
    flex-wrap: wrap;
  }
  .tag {
    background: #f1f5f9;
    color: #334155;
    padding: 6px 14px;
    border-radius: 8px;
    font-size: 9.5pt;
    font-weight: 600;
    border: 1px solid #e2e8f0;
  }
  .page {
    page-break-after: always;
  }
  h2 {
    color: #1e1b4b;
    border-bottom: 2px solid #e2e8f0;
    padding-bottom: 6px;
    margin-top: 22px;
    font-size: 15pt;
  }
  h3 {
    color: #334155;
    margin-top: 16px;
    font-size: 12pt;
  }
  .highlight-card {
    background: #f8fafc;
    border-left: 4px solid #4f46e5;
    padding: 12px 18px;
    border-radius: 0 8px 8px 0;
    margin: 14px 0;
    font-size: 10pt;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    margin: 14px 0;
    font-size: 9pt;
  }
  th, td {
    border: 1px solid #cbd5e1;
    padding: 8px 10px;
    text-align: left;
  }
  th {
    background: #f1f5f9;
    font-weight: 700;
    color: #0f172a;
  }
  .screenshot {
    width: 100%;
    max-height: 300px;
    object-fit: contain;
    border-radius: 8px;
    border: 1px solid #e2e8f0;
    box-shadow: 0 4px 6px -1px rgba(0,0,0,0.07);
    margin: 10px 0;
  }
  .code-block {
    background: #0f172a;
    color: #e2e8f0;
    font-family: Courier, monospace;
    padding: 12px 14px;
    border-radius: 8px;
    font-size: 8.5pt;
    margin: 10px 0;
  }
  .step-box {
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 10px;
    padding: 12px 16px;
    margin: 10px 0;
    box-shadow: 0 1px 3px rgba(0,0,0,0.05);
  }
  .step-number {
    display: inline-block;
    background: #4f46e5;
    color: white;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    text-align: center;
    line-height: 22px;
    font-weight: bold;
    font-size: 9pt;
    margin-right: 8px;
  }
</style>
</head>
<body>

  <!-- CLEAN COVER PAGE (NO UNWANTED METADATA BOX) -->
  <div class="cover-page">
    <div class="badge">Comprehensive Guidebook &amp; Workbook</div>
    <h1>JOJO Career OS</h1>
    <div class="subtitle">
      All-in-One Job Search Command Center, ATS Scoring Engine, Multi-Platform Sync &amp; Chrome Extension Manual
    </div>
    <div class="divider"></div>
    
    <div class="cover-tags">
      <span class="tag">🎯 80%+ Match Engine</span>
      <span class="tag">🔄 Universal Sync Hub</span>
      <span class="tag">🧩 Chrome Companion</span>
      <span class="tag">📱 Mobile &amp; PWA Ready</span>
      <span class="tag">🛡️ VAPT Hardened</span>
    </div>
  </div>

  <!-- CHAPTER 1: AIM & WHAT WE HAVE DONE -->
  <div class="page">
    <h2>1. Project Aim &amp; What We Have Done</h2>
    <div class="highlight-card">
      <strong>Our Aim:</strong> Empower tech professionals to take full control of their job hunt. Instead of typing notice periods and CTC 6 times across fragmented websites, JOJO manages your master profile from one dashboard, spotlights 80%+ match roles, and auto-syncs across LinkedIn, Naukri, and Indeed.
    </div>

    <h3>What Has Been Built &amp; Delivered</h3>
    <table>
      <thead>
        <tr>
          <th>Capability</th>
          <th>What It Does for You</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Fullstack Next.js 14 Engine</strong></td>
          <td>High-speed Next.js Turbopack web application running locally or in cloud.</td>
        </tr>
        <tr>
          <td><strong>80%+ Match &amp; ATS Algorithm</strong></td>
          <td>Ranks jobs by exact skill match and evaluates your resume against Greenhouse/Lever ATS formats.</td>
        </tr>
        <tr>
          <td><strong>Worldwide Remote USD Filter</strong></td>
          <td>Aggregates high-paying global remote roles ($90k–$150k USD) and Indian tech hubs.</td>
        </tr>
        <tr>
          <td><strong>Universal Sync Hub (8 Channels)</strong></td>
          <td>Connects LinkedIn, Naukri, Indeed, Instahyre, Glassdoor, Foundit, Wellfound, and Greenhouse.</td>
        </tr>
        <tr>
          <td><strong>Chrome Companion Extension</strong></td>
          <td>Browser extension that auto-fills your profile details into external job websites in 1 click.</td>
        </tr>
        <tr>
          <td><strong>7-Stage Kanban Tracker</strong></td>
          <td>Wishlist &rarr; Applied &rarr; Screening &rarr; Technical &rarr; Final &rarr; Offer with private notes.</td>
        </tr>
        <tr>
          <td><strong>1-Click AI Resume Tailor</strong></td>
          <td>Generates tailored 95%+ ATS resume bullets and cover letters for each job.</td>
        </tr>
        <tr>
          <td><strong>VAPT Security Hardening</strong></td>
          <td>Bcrypt 12-round password encryption, IDOR authorization barriers, and rate limiting.</td>
        </tr>
      </tbody>
    </table>

    <h2>2. How Other People See &amp; Use JOJO</h2>
    <div class="step-box">
      <span class="step-number">1</span><strong>Guest Preview Mode:</strong> When any new person or teammate visits JOJO, they see a clean preview mode with live sample metrics and a welcome banner inviting them to sign in or create an account.
    </div>
    <div class="step-box">
      <span class="step-number">2</span><strong>Creating Their Account:</strong> They click "Create Account" and input their name, email, password, target role, notice period, and preferred CTC.
    </div>
    <div class="step-box">
      <span class="step-number">3</span><strong>Complete Multi-Tenant Isolation:</strong> JOJO automatically creates a private data bucket for them. Their skills, jobs, and platform connections are strictly isolated. User A never sees or overwrites User B's data.
    </div>
  </div>

  <!-- CHAPTER 3: EXTENSION IN ACTION -->
  <div class="page">
    <h2>3. How the Extension Works After Installation</h2>
    <p>Once the extension is installed in your browser, here is exactly how it behaves on external job sites:</p>

    <div class="step-box">
      <span class="step-number">A</span><strong>Extension Status in Chrome:</strong> Clicking the extension icon in your toolbar shows your live connection status: <code>Engine Status: Connected ✓</code> along with your active user name.
    </div>
    <img class="screenshot" src="file:///${imagesDir}/media_1793625020578_5e68d7d3.png" alt="Extension Status" />

    <div class="step-box">
      <span class="step-number">B</span><strong>Floating Sync Badge on LinkedIn &amp; Naukri:</strong> When you open LinkedIn, Naukri, or Indeed, a floating purple <strong>JOJO Sync</strong> badge appears automatically in the bottom-right corner of your screen.
    </div>
    <img class="screenshot" src="file:///${imagesDir}/media_1793624044338_cef7a8e2.png" alt="Floating Sync Badge" />

    <div class="step-box">
      <span class="step-number">C</span><strong>1-Click Auto-Fill:</strong> Clicking the widget opens your profile details (headline, skills, 30-day notice period, CTC) and instantly auto-fills the application form or copies tailored bullets to your clipboard!
    </div>
  </div>

  <!-- CHAPTER 4: HOW TO PUT ON GOOGLE EXTENSIONS -->
  <div class="page">
    <h2>4. How to Put the Extension on Google Chrome</h2>
    <p>There are two ways to use the extension: locally right now, or published on the official Chrome Web Store for the public.</p>

    <h3>Method 1: Load Locally in Chrome (Available Right Now)</h3>
    <ol>
      <li>Open Google Chrome and type <code>chrome://extensions</code> in the address bar.</li>
      <li>Turn on the <strong>Developer mode</strong> toggle switch in the top-right corner.</li>
      <li>Click <strong>Load unpacked</strong> in the top-left corner.</li>
      <li>Select the <code>extension</code> folder inside your JOJO project directory. The extension is now live and working!</li>
    </ol>
    <img class="screenshot" src="file:///${imagesDir}/media_1793623369039_646dfe47.png" alt="Developer Mode Load Unpacked" />

    <h3>Method 2: Publishing to the Official Google Chrome Web Store</h3>
    <p>To let anyone in the world install your extension with a single click from the Chrome Web Store:</p>
    <div class="step-box">
      <span class="step-number">1</span><strong>Zip the Extension:</strong> Right-click the <code>extension</code> folder &rarr; Send to &rarr; Compressed (zipped) folder (named <code>jojo-extension.zip</code>).
    </div>
    <div class="step-box">
      <span class="step-number">2</span><strong>Open Developer Console:</strong> Navigate to <code>chrome.google.com/webstore/devconsole</code>.
    </div>
    <div class="step-box">
      <span class="step-number">3</span><strong>Register as a Developer:</strong> Sign in with your Google account and pay Google's one-time $5 developer registration fee.
    </div>
    <div class="step-box">
      <span class="step-number">4</span><strong>Upload Package:</strong> Click <em>"New Item"</em> and upload your <code>jojo-extension.zip</code>.
    </div>
    <div class="step-box">
      <span class="step-number">5</span><strong>Fill Store Listing:</strong> Add Title ("JOJO Sync Companion"), Description, Store Screenshots, and Category (Productivity).
    </div>
    <div class="step-box">
      <span class="step-number">6</span><strong>Submit for Review:</strong> Click <em>"Submit for Review"</em>. Google reviews it (usually 24-48 hours), and your extension goes live with a public <em>"Add to Chrome"</em> button!
    </div>
  </div>

  <!-- CHAPTER 5: WORKBOOK & CHECKLISTS -->
  <div class="page">
    <h2>5. The JOJO Hands-on Workbook &amp; Action Checklists</h2>
    <p>Use these actionable worksheets to guide your daily job search workflow:</p>

    <div class="step-box">
      <h3 style="margin-top:0;">📝 Worksheet 1: Master Profile Configuration</h3>
      <p>[ &nbsp; ] <strong>1.1:</strong> Open JOJO at <code>http://127.0.0.1:3000</code> and log in.<br>
      [ &nbsp; ] <strong>1.2:</strong> Go to <strong>My Profile</strong> and enter your Current CTC, Expected CTC, and Notice Period.<br>
      [ &nbsp; ] <strong>1.3:</strong> Add your primary skills and mark them as Expert or Intermediate.<br>
      [ &nbsp; ] <strong>1.4:</strong> Click <em>Save Changes</em> to update your sync payload.</p>
    </div>

    <div class="step-box">
      <h3 style="margin-top:0;">📝 Worksheet 2: 80%+ Match Job Hunt</h3>
      <p>[ &nbsp; ] <strong>2.1:</strong> Open the <strong>Job Matches</strong> tab.<br>
      [ &nbsp; ] <strong>2.2:</strong> Click the <strong>80%+ Top Match</strong> filter.<br>
      [ &nbsp; ] <strong>2.3:</strong> Switch location to <strong>Worldwide Remote</strong> to view USD salary openings.<br>
      [ &nbsp; ] <strong>2.4:</strong> Move high-priority roles to <em>Wishlist</em> or <em>Applied</em>.</p>
    </div>

    <div class="step-box">
      <h3 style="margin-top:0;">📝 Worksheet 3: Extension Auto-Fill Workflow</h3>
      <p>[ &nbsp; ] <strong>3.1:</strong> Open LinkedIn or Naukri on your browser.<br>
      [ &nbsp; ] <strong>3.2:</strong> Look for the purple floating <strong>JOJO Sync</strong> widget in the bottom-right corner.<br>
      [ &nbsp; ] <strong>3.3:</strong> Click the widget to auto-fill your headline and skills.<br>
      [ &nbsp; ] <strong>3.4:</strong> Submit your application and track it on your JOJO Kanban board!</p>
    </div>

    <div class="highlight-card" style="margin-top: 30px; text-align: center;">
      <strong>JOJO Career OS — Built for Speed, Privacy, and High-Velocity Career Growth.</strong><br>
      Double-click <code>START-JOJO.bat</code> or run <code>npm run dev</code> to launch your command center anytime.
    </div>
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
  console.log('Regenerated PDF Document at:', pdfPath);
}

async function main() {
  await generateDocx();
  generatePdf();
}

main().catch(console.error);
