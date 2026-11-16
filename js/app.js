(() => {
  const { order, projects } = window.SITE;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = (s = "") => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const PAGES = ["jogos", "apps", "arte", "sobre", "contato"];
  const BASE_TITLE = "Arthur Marinho — UX & UI Designer";

  /* ---------- Detail page (same layout as the original "showDetail" view) ---------- */
  const label = 'font-size:13px;line-height:14px;letter-spacing:0.08em;text-transform:uppercase;margin:0 0 28px;font-weight:700';
  const hr = '<hr style="height:2px;border:0;margin:0;background:var(--color-divider)">';
  const fig = (im, ratio, alt) => im ? `
        <figure data-lb data-full="${im.src}" style="margin:0;cursor:zoom-in">
          <div class="slot" style="width:100%;aspect-ratio:${ratio}"><img src="${im.thumb || im.src}" alt="${esc(alt)}" loading="lazy"></div>
        </figure>` : "";

  function renderDetail(slug) {
    const p = projects[slug];
    const imgs = p.images || [];
    const main = p.card ? { src: p.card } : imgs[0];
    const rest = p.card ? imgs : imgs.slice(1);
    const proc = [rest.slice(0, 2), rest.slice(2, 4)].filter((g) => g.length);
    const shots = rest.slice(4, 13);
    const next = order[(order.indexOf(slug) + 1) % order.length];

    $("#detail").innerHTML = `
  <div style="max-width:1200px;margin:0 auto;padding:0 clamp(20px,5vw,72px)">
    <section style="padding:56px 0 42px">
      <a href="#${p.home}" class="btn btn-ghost" style="margin-bottom:42px">← Voltar</a>
      <p style="${label};color:var(--color-text)">${esc(p.meta)}</p>
      <h1 style="font-family:var(--font-heading);font-weight:var(--font-heading-weight);font-size:clamp(38px,5.4vw,68px);line-height:1.06;letter-spacing:-0.02em;margin:0 0 0 -0.058em">${esc(p.title)}</h1>
      <p style="font-size:19px;line-height:32px;max-width:52ch;margin:28px 0 0">${esc(p.lead)}</p>
      <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:28px">
        ${p.tags.map((t) => `<span class="tag tag-outline">${esc(t)}</span>`).join("")}
      </div>
    </section>
    ${hr}
    <section data-g="split" style="display:grid;grid-template-columns:minmax(0,4fr) minmax(0,8fr);gap:28px clamp(24px,5vw,72px);padding:56px 0">
      <div><p style="${label};color:var(--color-accent);margin:0">Meu papel</p></div>
      <div>
        <p style="font-size:17px;line-height:32px;margin:0 0 28px;max-width:60ch">${esc(p.role)}</p>
        ${main ? fig(main, "16/9", p.title) : ""}
      </div>
    </section>
    ${p.guide ? `${hr}
    <section style="padding:56px 0 28px">
      <p style="${label};color:var(--color-accent)">Style guide</p>
      <h2 style="font-family:var(--font-heading);font-weight:var(--font-heading-weight);font-size:clamp(30px,3.6vw,44px);line-height:1.1;letter-spacing:-0.015em;margin:0 0 20px">Da série à interface</h2>
      ${p.guideIntro ? `<p style="font-size:17px;line-height:32px;margin:0;max-width:60ch">${esc(p.guideIntro)}</p>` : ""}
      <div class="guide">
        ${p.guide.map((g, i) => `
        <div class="guide-step" data-g="split">
          <div>
            <span class="guide-n">${String(i + 1).padStart(2, "0")}</span>
            <h3 class="guide-title">${esc(g.title)}</h3>
            <p class="guide-text">${esc(g.text)}</p>
          </div>
          <figure data-lb data-full="${g.src}" style="margin:0;cursor:zoom-in">
            <div class="slot guide-img" style="aspect-ratio:${g.w}/${g.h}"><img src="${g.thumb}" alt="${esc(p.title)} — ${esc(g.title)}" loading="lazy"></div>
          </figure>
        </div>`).join("")}
      </div>
    </section>` : ""}
    ${proc.map((g) => `${hr}
    <section style="padding:32px 0">
      <p style="${label};color:var(--color-text)">Processo de design</p>
      <div data-g="cards" style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:42px clamp(24px,4vw,56px)">
        ${g.map((im) => fig(im, "4/3", p.title)).join("")}
      </div>
    </section>`).join("")}
    ${shots.length ? `${hr}
    <section style="padding:56px 0">
      <p style="${label};color:var(--color-accent);margin:0 0 42px">Screenshots</p>
      <div data-g="arte" style="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:clamp(14px,2vw,28px)">
        ${shots.map((im, i) => fig(im, "16/10", `${p.title} — screenshot ${i + 1}`)).join("")}
      </div>
    </section>` : ""}
    ${hr}
    <section style="padding:42px 0 84px;display:flex;justify-content:flex-end">
      <a href="#p/${next}" class="hard-btn" style="background:#fff;color:var(--color-text);padding:8px 14px;display:inline-block;border:2px solid var(--color-text);box-shadow:5px 5px 0 0 var(--color-text);transition:transform 0.15s ease;font-family:var(--font-heading);font-weight:700;font-size:20px">Próximo: ${esc(projects[next].title)} →</a>
    </section>
  </div>`;
  }

  // Which home page a project belongs to (for "← Voltar" and nav highlight)
  $$("[data-view] [data-slug]").forEach((a) => {
    const p = projects[a.dataset.slug];
    if (p && !p.home) p.home = a.closest("[data-view]").dataset.view;
  });

  /* ---------- Routing: #jogos #apps #arte #sobre #contato #p/<slug> ---------- */
  function route() {
    const h = decodeURIComponent(location.hash.slice(1));
    const m = h.match(/^p\/([\w-]+)$/);
    const slug = m && projects[m[1]] ? m[1] : null;
    let page = PAGES.includes(h) ? h : null;

    if (!slug && !page) {
      // in-page anchors (#top, #arte-ilustracao…) keep the current view
      if (h && document.getElementById(h) && !$("#home").hidden) return;
      page = "jogos";
    }

    $("#home").hidden = !!slug;
    $("#detail").hidden = !slug;
    $$("#home > [data-view]").forEach((v) => (v.hidden = v.dataset.view !== page));
    if (slug) renderDetail(slug);

    const cur = slug ? projects[slug].home : page;
    $$(".nav [data-page]").forEach((a) => {
      if (a.classList.contains("nav-brand")) return;
      a.toggleAttribute("aria-current", a.dataset.page === cur);
      if (a.hasAttribute("aria-current")) a.setAttribute("aria-current", "page");
    });
    document.title = slug ? `${projects[slug].title} — Arthur Marinho` : BASE_TITLE;
    // page hashes match section ids, so the browser would jump to them: always start at the top
    window.scrollTo(0, 0);
    setTimeout(() => window.scrollTo(0, 0), 0);
  }
  window.addEventListener("hashchange", route);

  /* ---------- Zoom (lightbox) ---------- */
  const zoom = $("#zoom"), zimg = $("[data-zoom-img]");
  document.addEventListener("click", (e) => {
    const lb = e.target.closest("[data-lb]");
    if (lb) {
      const img = lb.querySelector("img");
      zimg.src = lb.dataset.full || (img && img.src);
      zoom.hidden = false;
      return;
    }
    if (!zoom.hidden && e.target.closest("#zoom")) zoom.hidden = true;
    const top = e.target.closest('a[href="#top"]');
    if (top) { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }
  });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") zoom.hidden = true; });

  /* ---------- Contact form → opens the visitor's e-mail app ---------- */
  $("#contact-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const nome = $("#f-nome").value.trim(), email = $("#f-email").value.trim(), msg = $("#f-msg").value.trim();
    const body = `${msg}\n\n— ${nome}${email ? ` <${email}>` : ""}`;
    location.href = `mailto:arthurmarinho88@icloud.com?subject=${encodeURIComponent("Contato pelo portfolio — " + (nome || "visitante"))}&body=${encodeURIComponent(body)}`;
    $("#form-note").textContent = "Obrigado — respondo em breve.";
  });

  route();
})();
