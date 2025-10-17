<!-- assets/js/include.js -->
(() => {
  const slots = document.querySelectorAll('[data-include]');
  slots.forEach(async (slot) => {
    const url = slot.getAttribute('data-include');
    try {
      const res = await fetch(url, {cache: 'no-cache'});
      if (!res.ok) throw new Error(res.statusText);
      const html = await res.text();
      // Replace the placeholder with the fetched markup
      slot.insertAdjacentHTML('afterend', html);
      slot.remove();
    } catch (e) {
      console.error('Include failed for', url, e);
    }
    finally {
      loaded++;
      if (loaded === slots.length) {
        // ✅ Fire event when all includes are done
        document.dispatchEvent(new Event('includes:loaded'));
      }
  });
})();

(() => {
  const slots = document.querySelectorAll('[data-include]');
  if (!slots.length) return;

  let loaded = 0;

  const done = () => {
    document.dispatchEvent(new Event('includes:loaded'));
  };

  slots.forEach(async (slot) => {
    const url = slot.getAttribute('data-include');
    try {
      const res = await fetch(url, { cache: 'no-cache' });
      if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
      const html = await res.text();
      slot.insertAdjacentHTML('afterend', html);
      slot.remove();
    } catch (err) {
      console.error(`Include failed for ${url}:`, err);
      // visible hint so you notice on the page
      slot.innerHTML = `<div style="background:#fee;border:1px solid #f99;padding:.5rem;border-radius:.5rem">
        Couldn’t load: <code>${url}</code>
      </div>`;
    } finally {
      loaded++;
      if (loaded === slots.length) done();
    }
  });
})();
