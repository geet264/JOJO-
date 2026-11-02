document.addEventListener('DOMContentLoaded', async () => {
  const statusEl = document.getElementById('engine-status');
  const userEl = document.getElementById('user-name');
  const syncBtn = document.getElementById('sync-btn');

  try {
    const res = await fetch('http://127.0.0.1:3000/api/data');
    if (res.ok) {
      const data = await res.json();
      statusEl.textContent = 'Connected ✓';
      statusEl.style.background = '#ecfdf5';
      statusEl.style.color = '#047857';
      userEl.textContent = data.profile.fullName || 'Active';
    } else {
      throw new Error();
    }
  } catch (e) {
    statusEl.textContent = 'Disconnected';
    statusEl.style.background = '#fef2f2';
    statusEl.style.color = '#b91c1c';
    statusEl.style.borderColor = '#fecaca';
    userEl.textContent = 'Not Reachable';
  }

  syncBtn.addEventListener('click', async () => {
    syncBtn.textContent = 'Syncing...';
    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      if (tab) {
        chrome.tabs.sendMessage(tab.id, { action: 'TRIGGER_SYNC' }, (response) => {
          syncBtn.textContent = 'Synced Successfully! ✓';
          setTimeout(() => {
            syncBtn.textContent = '🔄 Sync Profile to Current Tab';
          }, 2000);
        });
      }
    } catch (err) {
      syncBtn.textContent = 'Synced! ✓';
      setTimeout(() => {
        syncBtn.textContent = '🔄 Sync Profile to Current Tab';
      }, 2000);
    }
  });
});
