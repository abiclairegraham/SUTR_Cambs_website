// assets/js/config.js
function get(obj, path) {
  return path.split('.').reduce((o, k) => (o ? o[k] : undefined), obj);
}

async function applyConfig() {
  const res = await fetch(`data/config.json?cache=${Date.now()}`);
  if (!res.ok) throw new Error('config.json failed to load');
  const cfg = await res.json();

  // Set hrefs from data-config-key
  document.querySelectorAll('[data-config-key]').forEach(el => {
    const url = get(cfg, el.getAttribute('data-config-key'));
    if (url) el.setAttribute('href', url);
  });

  // Generic: set any attribute from config
  document.querySelectorAll('[data-config-attr][data-config-key]').forEach(el => {
    const attr = el.getAttribute('data-config-attr');
    const val  = get(cfg, el.getAttribute('data-config-key'));
    if (val) el.setAttribute(attr, val);
  });
}

applyConfig().catch(err => {
  console.error(err);
  // Optional: show a small notice for admins
});
