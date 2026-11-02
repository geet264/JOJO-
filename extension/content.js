// JOJO Chrome Companion - Content Script
(function () {
  console.log('[JOJO] Companion loaded on:', window.location.hostname);

  // Floating JOJO Quick Sync Badge
  const badge = document.createElement('div');
  badge.id = 'jojo-floating-widget';
  badge.innerHTML = `
    <div style="
      position: fixed;
      bottom: 24px;
      right: 24px;
      z-index: 999999;
      background: linear-gradient(135deg, #4f46e5, #7c3aed);
      color: white;
      padding: 10px 16px;
      border-radius: 9999px;
      box-shadow: 0 10px 25px -5px rgba(79, 70, 229, 0.5), 0 8px 10px -6px rgba(79, 70, 229, 0.5);
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      font-size: 13px;
      font-weight: 700;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 8px;
      border: 1px solid rgba(255, 255, 255, 0.3);
      transition: all 0.2s ease;
    ">
      <span style="
        background: white;
        color: #4f46e5;
        width: 20px;
        height: 20px;
        border-radius: 6px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 900;
        font-size: 12px;
      ">J</span>
      <span>JOJO Sync</span>
    </div>
  `;

  document.body.appendChild(badge);

  // Widget Click Menu
  badge.addEventListener('click', async () => {
    try {
      const res = await fetch('http://127.0.0.1:3000/api/data');
      if (!res.ok) throw new Error('Local server not reachable');
      const data = await res.json();
      const profile = data.profile;

      alert(
        `🚀 JOJO Connected!\n\n` +
        `Ready to sync for: ${profile.fullName}\n` +
        `Role: ${profile.currentTitle}\n` +
        `Skills (${profile.skills.length}): ${profile.skills.map(s => s.name).slice(0, 5).join(', ')}...\n` +
        `Notice Period: ${profile.noticePeriod}\n` +
        `Expected CTC: ${profile.expectedCTC}\n\n` +
        `Click OK to copy your tailored headline & skills to clipboard for this page!`
      );

      const copyText = `${profile.currentTitle} | ${profile.skills.map(s => s.name).join(' • ')} | Notice: ${profile.noticePeriod}`;
      navigator.clipboard.writeText(copyText);
    } catch (e) {
      alert(
        `⚠️ Could not connect to local JOJO.\n\n` +
        `Make sure JOJO is running at http://127.0.0.1:3000`
      );
    }
  });
})();
