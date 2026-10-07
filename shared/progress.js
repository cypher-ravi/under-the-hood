// Course mode and progress checkmarks.
// On a content page: shows one bite-sized step at a time (sections of <main>), with a step bar,
// Back / "Mark covered & next" buttons and a "covered" checkmark per step.
// On the gallery: adds a covered checkmark to every card and a progress line to every tab.
// Progress lives in this browser's localStorage only (export/import from the gallery footer).
//
// Steps on a page, in order:
//   - every <section> that is a direct child of <main>;
//   - data-step="Title" names a step; data-step-join merges a section into the previous step;
//   - data-split on a section turns each <h3> group inside it into its own step;
//   - without any data-step attributes, a section with no id joins the previous step
//     (unless no section has an id, then each section is a step).
(function () {
  const KEY = "uth-progress-v1";
  function load() {
    try { const s = JSON.parse(localStorage.getItem(KEY)); return s && s.pages ? s : { pages: {} }; }
    catch (e) { return { pages: {} }; }
  }
  function save(s) { try { localStorage.setItem(KEY, JSON.stringify(s)); } catch (e) {} }
  function pageKey(path) {
    const m = String(path).match(/(topics|questions|dsa|lessons)\/([^\/?#]+)\.html/);
    return m ? m[1] + "/" + m[2] : null;
  }
  function slug(t) { return String(t).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 40) || "step"; }
  const esc = t => String(t).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
  window.UTHProgress = { KEY, load, save, pageKey };

  const main = document.querySelector("main");
  if (!main) return;
  if (document.getElementById("lessonList")) { gallery(); return; }
  const key = pageKey(location.pathname);
  const secs = [...main.children].filter(e => e.tagName === "SECTION");
  if (!key || secs.length < 2) return;

  // ---------- build the step list ----------
  const explicit = secs.some(s => s.hasAttribute("data-step") || s.hasAttribute("data-step-join"));
  const anyId = secs.some(s => s.id);
  const titleOf = s => {
    if (s.dataset.step) return s.dataset.step;
    if (s.dataset.nav) return s.dataset.nav;
    if (s.id === "simulation") return "Simulation";
    const h = s.querySelector("h2");
    if (!h) return "Step";
    const c = h.cloneNode(true); c.querySelectorAll(".tag, .step-time").forEach(x => x.remove());
    return c.textContent.trim() || "Step";
  };
  const steps = [], used = new Set();
  const uid = base => { let id = base, n = 2; while (used.has(id) || (document.getElementById(id) && !secs.includes(document.getElementById(id)))) id = base + "-" + n++; used.add(id); return id; };
  secs.forEach(s => {
    const join = explicit ? s.hasAttribute("data-step-join") : (anyId && !s.id);
    if (join && steps.length) { steps[steps.length - 1].els.push(s); return; }
    if (s.hasAttribute("data-split") && s.querySelector(":scope > h3")) {
      // wrap each h3 and what follows it; anything before the first h3 (besides the h2) goes with the first part
      const kids = [...s.childNodes], groups = [];
      let lead = [], cur = null;
      kids.forEach(n => {
        if (n.nodeType === 1 && n.tagName === "H2") return;
        if (n.nodeType === 1 && n.tagName === "H3") { cur = { h: n, nodes: groups.length ? [] : lead.splice(0), title: n.textContent.trim() }; groups.push(cur); }
        (cur ? cur.nodes : lead).push(n);
      });
      const base = s.dataset.step ? slug(s.dataset.step) : "part";
      groups.forEach((g, i) => {
        const w = document.createElement("div"); w.className = "uth-sub";
        g.nodes.forEach(n => w.appendChild(n)); s.appendChild(w);
        steps.push({ id: uid(base + "-" + (i + 1)), title: g.title.replace(/^\d+[.)]\s*/, ""), els: [s], sub: w, group: s.dataset.step || "" });
      });
      return;
    }
    steps.push({ id: s.id || uid(slug(titleOf(s))), title: titleOf(s), els: [s] });
    if (s.id) used.add(s.id);
  });
  if (steps.length < 2) return;
  steps.forEach(st => {
    const words = st.sub ? st.sub.textContent : st.els.map(e => e.textContent).join(" ");
    st.min = Math.max(1, Math.round(words.split(/\s+/).filter(Boolean).length / 200));
  });

  // ---------- state ----------
  let store = load();
  const rec = () => (store.pages[key] = store.pages[key] || { s: {} });
  {
    const r = store.pages[key];
    if (r && r.all) { r.s = {}; steps.forEach(st => r.s[st.id] = 1); delete r.all; }
  }
  const isDone = st => !!(store.pages[key] && store.pages[key].s && store.pages[key].s[st.id]);
  function setDone(st, v) {
    store = load(); const r = rec(); r.s = r.s || {};
    if (r.all) { r.s = {}; steps.forEach(x => r.s[x.id] = 1); delete r.all; }
    if (v) r.s[st.id] = 1; else delete r.s[st.id];
    r.n = steps.length; r.d = steps.every(x => r.s[x.id]) ? 1 : 0; r.t = Date.now(); r.title = document.title;
    save(store); paint();
  }
  const tab = { topics: "", questions: "#questions", dsa: "#dsa", lessons: "#lessons" }[key.split("/")[0]];
  const home = "../index.html" + tab;
  let onePage = false;
  try { onePage = localStorage.getItem("uth-onepage") === "1"; } catch (e) {}

  // ---------- chrome: the step bar and a footer per step ----------
  const bar = document.createElement("div");
  bar.className = "uth-bar"; bar.setAttribute("role", "navigation"); bar.setAttribute("aria-label", "Steps on this page");
  bar.innerHTML = `
    <div class="uth-top"><span class="uth-count"></span><span class="uth-title"></span><span class="uth-sum"></span></div>
    <div class="uth-track">${steps.map((st, i) => `<button type="button" data-i="${i}" aria-label="Step ${i + 1}: ${esc(st.title)}" title="${i + 1}. ${esc(st.title)}"></button>`).join("")}</div>
    <details class="uth-list"><summary>All steps</summary>
      <ol>${steps.map((st, i) => `<li><button type="button" data-i="${i}"><span class="uth-ck" aria-hidden="true"></span><span class="uth-li-t">${esc(st.title)}</span><span class="uth-min">${st.min} min</span></button></li>`).join("")}</ol>
      <div class="uth-tools">
        <label><input type="checkbox" class="uth-one"> Show every step on one page</label>
        <button type="button" class="uth-all">Mark all covered</button>
        <button type="button" class="uth-clear">Clear checkmarks</button>
      </div>
    </details>`;
  main.insertBefore(bar, secs[0]);

  steps.forEach((st, i) => {
    const f = document.createElement("div"); f.className = "uth-foot";
    const last = i === steps.length - 1;
    f.innerHTML = `
      <label class="uth-check"><input type="checkbox"> <span>Covered</span></label>
      <span class="uth-gap"></span>
      ${i > 0 ? `<button type="button" class="uth-prev">← Back</button>` : ""}
      <button type="button" class="uth-next">${last ? "Mark covered &amp; finish" : "Mark covered &amp; next →"}</button>
      <p class="uth-fin" hidden>Page covered ✓ <a href="${home}">Back to the gallery</a></p>`;
    if (st.sub) st.sub.appendChild(f);
    else { const after = st.els[st.els.length - 1]; after.after(f); st.els.push(f); }
    st.foot = f;
    f.querySelector("input").addEventListener("change", e => setDone(st, e.target.checked));
    const prev = f.querySelector(".uth-prev"); if (prev) prev.addEventListener("click", () => go(i - 1, true));
    f.querySelector(".uth-next").addEventListener("click", () => {
      setDone(st, true);
      if (onePage) { if (!last) (steps[i + 1].sub || steps[i + 1].els[0]).scrollIntoView({ behavior: "smooth", block: "start" }); }
      else if (!last) go(i + 1, true);
      if (last) f.querySelector(".uth-fin").hidden = false;
    });
  });

  let cur = 0;
  function paint() {
    const st = steps[cur], n = steps.filter(isDone).length;
    bar.querySelector(".uth-count").textContent = onePage ? `${steps.length} steps` : `Step ${cur + 1} of ${steps.length}`;
    bar.querySelector(".uth-title").textContent = onePage ? "All on one page" : (st.group ? st.group + " · " : "") + st.title;
    bar.querySelector(".uth-sum").textContent = n === steps.length ? "Page covered ✓" : `${n}/${steps.length} covered`;
    bar.classList.toggle("all-done", n === steps.length);
    bar.querySelectorAll(".uth-track button").forEach((b, i) => { b.classList.toggle("done", isDone(steps[i])); b.classList.toggle("cur", !onePage && i === cur); });
    bar.querySelectorAll(".uth-list li button").forEach((b, i) => { b.classList.toggle("done", isDone(steps[i])); b.classList.toggle("cur", !onePage && i === cur); });
    bar.querySelector(".uth-one").checked = onePage;
    steps.forEach(s => { const c = s.foot.querySelector("input"); c.checked = isDone(s); });
    // checkmarks in the question/pattern sidebar, when the page has one
    document.querySelectorAll(".qnav a[data-id]").forEach(a => {
      const s = steps.find(x => x.els.some(e => e.id === a.dataset.id) || x.id === a.dataset.id);
      a.classList.toggle("uth-done", !!(s && isDone(s)));
    });
  }
  function show() {
    const vis = new Set(), subs = new Set();
    steps.forEach((s, i) => { if (onePage || i === cur) { s.els.forEach(e => vis.add(e)); if (s.sub) subs.add(s.sub); } });
    steps.forEach(s => { s.els.forEach(e => e.classList.toggle("uth-off", !vis.has(e))); if (s.sub) s.sub.classList.toggle("uth-off", !subs.has(s.sub)); });
    main.classList.toggle("uth-paged", !onePage);
    paint();
    window.dispatchEvent(new Event("resize"));
  }
  function go(i, scroll, focusEl) {
    cur = Math.max(0, Math.min(steps.length - 1, i));
    show();
    store = load(); const r = rec(); r.last = steps[cur].id; r.n = steps.length; r.title = document.title; save(store);
    if (!onePage) window.history.replaceState(null, "", "#" + steps[cur].id);
    if (focusEl) focusEl.scrollIntoView({ block: "start" });
    else if (scroll === "jump") { bar.scrollIntoView({ block: "start" }); if (document.readyState !== "complete") window.addEventListener("load", () => setTimeout(() => bar.scrollIntoView({ block: "start" }), 0), { once: true }); }
    else if (scroll) bar.scrollIntoView({ block: "start", behavior: "smooth" });
  }
  function fromHash(scroll) {
    const id = decodeURIComponent(location.hash.slice(1));
    if (!id) return false;
    const si = steps.findIndex(s => s.id === id);
    if (si >= 0) { go(si, scroll || "jump"); return true; }
    const el = document.getElementById(id);
    if (!el) return false;
    const ti = steps.findIndex(s => (s.sub && s.sub.contains(el)) || (!s.sub && s.els.some(e => e.contains(el))));
    if (ti < 0) return false;
    if (onePage) { el.scrollIntoView({ block: "start" }); return true; }
    go(ti, false, el);
    return true;
  }

  bar.addEventListener("click", e => {
    const b = e.target.closest("button[data-i]");
    if (b) {
      const i = +b.dataset.i;
      if (onePage) { const s = steps[i]; (s.sub || s.els[0]).scrollIntoView({ block: "start", behavior: "smooth" }); }
      else go(i, true);
      const d = bar.querySelector(".uth-list"); if (b.closest(".uth-list")) d.open = false;
    }
    if (e.target.closest(".uth-all")) { store = load(); const r = rec(); r.s = {}; steps.forEach(s => r.s[s.id] = 1); r.n = steps.length; r.d = 1; r.t = Date.now(); r.title = document.title; save(store); paint(); }
    if (e.target.closest(".uth-clear")) { store = load(); const r = rec(); r.s = {}; r.d = 0; delete r.all; save(store); paint(); }
  });
  bar.querySelector(".uth-one").addEventListener("change", e => {
    onePage = e.target.checked;
    try { localStorage.setItem("uth-onepage", onePage ? "1" : "0"); } catch (err) {}
    show();
    if (!onePage) window.history.replaceState(null, "", "#" + steps[cur].id);
  });
  window.addEventListener("hashchange", () => fromHash(true));

  // start: the hash if it points somewhere, else where the reader left off, else the first uncovered step
  if (!fromHash(false)) {
    // no usable hash: resume where the reader left off
    const r = store.pages[key];
    let i = r && r.last ? steps.findIndex(s => s.id === r.last) : -1;
    if (i < 0) { i = steps.findIndex(s => !isDone(s)); if (i < 0) i = 0; }
    cur = i; show();
  }

  // ---------- gallery ----------
  function gallery() {
    const panels = ["concepts", "questions", "dsa", "lessons"].map(id => document.getElementById(id)).filter(Boolean);
    const cards = [...main.querySelectorAll("a.topic[href]")].filter(a => pageKey(a.getAttribute("href")));
    cards.forEach(a => {
      const w = document.createElement("div"); w.className = "uth-card";
      a.parentNode.insertBefore(w, a); w.appendChild(a);
      const b = document.createElement("button"); b.type = "button"; b.className = "uth-cardcheck";
      w.appendChild(b);
      b.addEventListener("click", e => {
        e.preventDefault();
        const k = pageKey(a.getAttribute("href")), s = load(), r = s.pages[k] = s.pages[k] || { s: {} };
        if (r.d) { r.d = 0; r.s = {}; delete r.all; } else { r.d = 1; r.all = 1; }
        r.t = Date.now(); save(s); paintGallery();
      });
    });
    panels.forEach(p => {
      const sum = document.createElement("div"); sum.className = "uth-tabsum";
      const head = p.querySelector(".section-head");
      if (head) head.after(sum); else p.prepend(sum);
    });
    const foot = main.querySelector("footer");
    const tools = document.createElement("p"); tools.className = "uth-galtools";
    tools.innerHTML = `Your checkmarks are saved in this browser. <button type="button" data-a="export">Copy progress code</button> <button type="button" data-a="import">Paste progress code</button> <button type="button" data-a="reset">Reset progress</button>`;
    (foot || main.lastElementChild).after(tools);
    tools.addEventListener("click", async e => {
      const a = e.target.dataset && e.target.dataset.a; if (!a) return;
      if (a === "export") {
        const code = btoa(unescape(encodeURIComponent(JSON.stringify(load()))));
        try { await navigator.clipboard.writeText(code); e.target.textContent = "Copied ✓"; } catch (err) { window.prompt("Copy this progress code:", code); }
      }
      if (a === "import") {
        const code = window.prompt("Paste a progress code from another browser:");
        if (!code) return;
        try { const s = JSON.parse(decodeURIComponent(escape(atob(code.trim())))); if (!s.pages) throw 0; save(s); paintGallery(); }
        catch (err) { window.alert("That code could not be read."); }
      }
      if (a === "reset" && window.confirm("Clear every checkmark saved in this browser?")) { save({ pages: {} }); paintGallery(); }
    });
    function paintGallery() {
      const s = load();
      cards.forEach(a => {
        const k = pageKey(a.getAttribute("href")), r = s.pages[k], b = a.nextElementSibling;
        const n = r && r.s ? Object.keys(r.s).length : 0, done = !!(r && r.d);
        b.classList.toggle("done", done);
        b.classList.toggle("part", !done && n > 0);
        b.innerHTML = done ? "✓" : (n > 0 && r.n ? `${n}/${r.n}` : "");
        b.setAttribute("aria-pressed", done ? "true" : "false");
        const t = a.querySelector("h3"); const name = t ? t.textContent.trim() : "this page";
        b.setAttribute("aria-label", done ? `Covered: ${name}. Click to unmark` : `Mark ${name} as covered`);
        b.title = done ? "Covered (click to unmark)" : (n > 0 ? `${n} of ${r.n} steps covered (click to mark all)` : "Mark as covered");
        a.parentNode.classList.toggle("covered", done);
      });
      panels.forEach(p => {
        const cs = cards.filter(a => p.contains(a)), d = cs.filter(a => { const r = s.pages[pageKey(a.getAttribute("href"))]; return r && r.d; }).length;
        const el = p.querySelector(".uth-tabsum"); if (!el) return;
        const pct = cs.length ? Math.round(d / cs.length * 100) : 0;
        el.innerHTML = `<span>${d} of ${cs.length} covered</span><i><b style="width:${pct}%"></b></i>`;
      });
    }
    paintGallery();
    window.addEventListener("storage", e => { if (e.key === KEY) paintGallery(); });
  }
})();
