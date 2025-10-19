// assets/js/news.js
export function initNews() {
  const localNews = [
    {
      title: "Cambridge first for People’s Assembly standoff with Great British Strikers",
      source: "Cambridge Independent",
      date: "2025-05-28",
      url: "https://www.cambridgeindependent.co.uk/news/cambridge-first-for-people-s-assembly-standoff-with-great-br-9418987",
      excerpt: "Local groups including Cambridge Stand Up To Racism turned out at Market Square to counter a right-wing rally.",
      dot: "var(--accent)"
    },
    {
      title: "Anti-racism protest is 'celebration of humanity'",
      source: "BBC News",
      date: "2025-02-20",
      url: "https://www.bbc.co.uk/news/articles/cwy3pp994q4o",
      excerpt: "About 250 demonstrators gathered at Donkey Common, Cambridge, following violence at anti-immigration protests elsewhere in the country.",
      dot: "var(--accent-2)"
    },
    {
      title: "‘No place for hate’: rally hears anti-racism message in Cambridge",
      source: "Cambridge Independent",
      date: "2024-11-25",
      url: "https://www.cambridgeindependent.co.uk/news/stand-up-to-racism-rally-hears-cambridge-is-no-place-for-ha-9378490",
      excerpt: "Speakers from community groups and unions backed Cambridge Stand Up To Racism at a city-centre rally.",
      dot: "var(--accent-3)"
    }
  ];

  const list = document.getElementById("news-list");
  if (!list) return;

  localNews.forEach(item => {
    const card = document.createElement("article");
    card.className = "card news-item";

    const d = new Date(item.date);
    const prettyDate = d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });

    card.innerHTML = `
      <div class="news-item-head">
        <span class="dot" style="--dot:${item.dot || 'var(--accent)'}"></span>
        <h3 style="margin:0">
          <a href="${item.url}" target="_blank" rel="noopener" style="text-decoration:none">${item.title}</a>
        </h3>
      </div>
      <p class="small muted" style="margin:.2rem 0 .8rem">${item.source} • ${prettyDate}</p>
      <p>${item.excerpt}</p>
    `;
    list.appendChild(card);
  });
}
