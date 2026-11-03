// JOJO Chrome Companion - Content Script (Hardened DOM & Safe Output)
(function () {
  console.log('[JOJO] Secure Companion loaded on:', window.location.hostname);

  // Floating JOJO Quick Sync Badge created safely via DOM nodes (CWE-79 Remediation)
  const badgeContainer = document.createElement('div');
  badgeContainer.id = 'jojo-floating-widget';

  const badgeBtn = document.createElement('div');
  Object.assign(badgeBtn.style, {
    position: 'fixed',
    bottom: '24px',
    right: '24px',
    zIndex: '999999',
    background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
    color: 'white',
    padding: '10px 16px',
    borderRadius: '9999px',
    boxShadow: '0 10px 25px -5px rgba(79, 70, 229, 0.5), 0 8px 10px -6px rgba(79, 70, 229, 0.5)',
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    fontSize: '13px',
    fontWeight: '700',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    transition: 'all 0.2s ease',
  });

  const iconSpan = document.createElement('span');
  Object.assign(iconSpan.style, {
    background: 'white',
    color: '#4f46e5',
    width: '20px',
    height: '20px',
    borderRadius: '6px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '900',
    fontSize: '12px',
  });
  iconSpan.textContent = 'J';

  const textSpan = document.createElement('span');
  textSpan.textContent = 'JOJO Sync';

  badgeBtn.appendChild(iconSpan);
  badgeBtn.appendChild(textSpan);
  badgeContainer.appendChild(badgeBtn);
  document.body.appendChild(badgeContainer);

  // Widget Click Menu with sanitized output
  badgeBtn.addEventListener('click', async () => {
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
    } catch {
      alert(
        `⚠️ Could not connect to local JOJO.\n\n` +
        `Make sure JOJO is running at http://127.0.0.1:3000`
      );
    }
  });
})();
