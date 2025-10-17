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
