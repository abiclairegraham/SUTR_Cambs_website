// assets/js/config.js
function get(obj, path) {
  return path.split('.').reduce((o, k) => (o && k in o ? o[k] : undefined), obj);
}

async function applyConfig() {
  try {
    const res = await fetch('data/config.json?cache=' + Date.now());
    if (!res.ok) throw new Error(`Failed to load config.json (${res.status})`);
    const cfg = await res.json();

    // Fill hrefs from data-config-key
    document.querySelectorAll('[data-config-key]').forEach(el => {
      const key = el.getAttribute('data-config-key');
      const url = get(cfg, key);
      if (url) {
        el.setAttribute('href', url);
      } else {
        console.warn(`config: key "${key}" not found`);
      }
    });
  } catch (err) {
    console.error('config error:', err);
  }
}

// Run after DOM is ready in case script isn’t deferred
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', applyConfig);
} else {
  applyConfig();
}
