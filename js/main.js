(() => {
  const { profile, categories, projects } = window.PORTFOLIO;
  const $ = (s) => document.querySelector(s);
  const esc = (s = "") => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const metaLine = (p) => [p.client, p.platform].filter(Boolean).join(" · ");

  /* ---------- Static profile content ---------- */
  $("#hero-bio").textContent = profile.bio;
  $("#about-bio").textContent = profile.bio;
  $("#year").textContent = new Date().getFullYear();

  const facts = {
    Experience: profile.experience,
    Education: profile.education,
    Languages: profile.languages.join(", "),
    Tools: profile.tools.join(", "),
    Focus: profile.focus.join(", "),
  };
  $("#facts").innerHTML = Object.entries(facts).map(([k, v]) => `<dt>${k}</dt><dd>${esc(v)}</dd>`).join("");
  $("#timeline").innerHTML = profile.experienceTimeline.map((e) => `
    <li><strong>${esc(e.company)}</strong>${e.period ? `<span class="period">${esc(e.period)}</span>` : ""}<p>${esc(e.summary)}</p></li>`).join("");

  const L = profile.links;
  $("#contact-links").innerHTML = [
    L.email && `<a class="btn primary" href="mailto:${esc(L.email)}">${esc(L.email)}</a>`,
    L.linkedin && `<a class="btn" href="${esc(L.linkedin)}" target="_blank" rel="noopener">LinkedIn</a>`,
    L.behance && `<a class="btn" href="${esc(L.behance)}" target="_blank" rel="noopener">Behance</a>`,
    L.tumblr && `<a class="btn" href="${esc(L.tumblr)}" target="_blank" rel="noopener">Tumblr</a>`,
  ].filter(Boolean).join("");

  /* ---------- Hero mosaic (featured covers) ---------- */
  const featured = projects.filter((p) => p.featured && p.images.length).slice(0, 6);
  $("#hero-mosaic").innerHTML = featured.map((p, i) =>
    `<button data-slug="${p.slug}" tabindex="-1"><img src="${i === 0 ? p.images[0].src : p.images[0].thumb}" alt=""></button>`).join("");

  /* ---------- Filters + grid ---------- */
  const used = new Set(projects.flatMap((p) => p.categories));
  const filterKeys = ["all", ...Object.keys(categories).filter((k) => used.has(k))];
  $("#filters").innerHTML = filterKeys.map((k) =>
    `<button role="tab" data-filter="${k}" aria-selected="${k === "all"}">${k === "all" ? "All" : esc(categories[k])}</button>`).join("");

  $("#grid").innerHTML = projects.map((p) => {
    const cover = p.images[0];
    return `<button class="card" data-slug="${p.slug}" data-cats="${p.categories.join(" ")}">
      <div class="card-img">${cover ? `<img src="${cover.thumb}" alt="${esc(p.title)}" loading="lazy">` : ""}</div>
      <div class="card-body">
        <h3>${esc(p.title)}</h3>
        <span class="meta">${esc(metaLine(p))}</span>
        <div class="tags">${p.categories.map((c) => `<span class="tag">${esc(categories[c])}</span>`).join("")}</div>
      </div></button>`;
  }).join("");

  $("#filters").addEventListener("click", (e) => {
    const b = e.target.closest("button"); if (!b) return;
    const f = b.dataset.filter;
    document.querySelectorAll("#filters button").forEach((x) => x.setAttribute("aria-selected", x === b));
    document.querySelectorAll(".card").forEach((c) => { c.hidden = f !== "all" && !c.dataset.cats.split(" ").includes(f); });
  });

  document.addEventListener("click", (e) => {
    const t = e.target.closest("[data-slug]");
    if (t) location.hash = `#/${t.dataset.slug}`;
  });

  /* ---------- Project modal (hash routing: #/slug) ---------- */
  const modal = $("#modal");
  let current = null, scrollY = 0;

  function openProject(slug) {
    const i = projects.findIndex((p) => p.slug === slug);
    if (i < 0) return closeProject(false);
    const p = projects[i]; current = p;
    $("#m-client").textContent = metaLine(p);
    $("#m-title").textContent = p.title;
    $("#m-desc").textContent = p.description;
    const meta = { Role: p.role, Platform: p.platform, Year: p.year, Client: p.client };
    $("#m-meta").innerHTML = Object.entries(meta).filter(([, v]) => v)
      .map(([k, v]) => `<div><dt>${k}</dt><dd>${esc(v)}</dd></div>`).join("");
    $("#m-gallery").innerHTML = p.images.map((im, n) =>
      `<button data-index="${n}" aria-label="Open image ${n + 1}"><img src="${im.thumb}" width="${im.w}" height="${im.h}" alt="${esc(p.title)} — image ${n + 1}" loading="lazy"></button>`).join("");
    const prev = projects[(i - 1 + projects.length) % projects.length];
    const next = projects[(i + 1) % projects.length];
    $("#m-prev").href = `#/${prev.slug}`; $("#m-prev").textContent = `← ${prev.title}`;
    $("#m-next").href = `#/${next.slug}`; $("#m-next").textContent = `${next.title} →`;
    if (modal.hidden) { scrollY = window.scrollY; modal.hidden = false; document.body.classList.add("locked"); }
    $(".modal-panel").scrollTop = 0;
    document.title = `${p.title} — Arthur Marinho`;
    $(".modal-close").focus({ preventScroll: true });
  }

  function closeProject(updateHash = true) {
    modal.hidden = true; current = null; document.body.classList.remove("locked");
    document.title = "Arthur Marinho — Game UI/UX Designer";
    if (updateHash && location.hash.startsWith("#/")) history.pushState("", "", location.pathname + "#work");
    window.scrollTo(0, scrollY);
  }

  function route() {
    const m = location.hash.match(/^#\/(.+)$/);
    if (m) openProject(decodeURIComponent(m[1]));
    else if (!modal.hidden) closeProject(false);
  }
  window.addEventListener("hashchange", route);
  modal.addEventListener("click", (e) => { if (e.target.closest("[data-close]")) closeProject(); });

  /* ---------- Lightbox ---------- */
  const lb = $("#lightbox"); let idx = 0;
  const showImg = () => {
    const im = current.images[idx];
    $("#lb-img").src = im.src; $("#lb-img").alt = `${current.title} — image ${idx + 1}`;
    $("#lb-count").textContent = `${idx + 1} / ${current.images.length}`;
  };
  const step = (d) => { idx = (idx + d + current.images.length) % current.images.length; showImg(); };
  $("#m-gallery").addEventListener("click", (e) => {
    const b = e.target.closest("[data-index]"); if (!b) return;
    idx = +b.dataset.index; showImg(); lb.hidden = false;
  });
  lb.addEventListener("click", (e) => {
    if (e.target.closest(".lb-prev")) step(-1);
    else if (e.target.closest(".lb-next")) step(1);
    else if (e.target.id !== "lb-img") lb.hidden = true;
  });

  document.addEventListener("keydown", (e) => {
    if (!lb.hidden) {
      if (e.key === "Escape") lb.hidden = true;
      if (e.key === "ArrowLeft") step(-1);
      if (e.key === "ArrowRight") step(1);
    } else if (!modal.hidden && e.key === "Escape") closeProject();
  });

  route();
})();
