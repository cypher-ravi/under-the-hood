// Builds the sticky sidebar on question pages: a question switcher plus the interview steps.
// Sections opt in with data-nav="Label", and data-num / data-time for interview steps.
(function () {
  const nav = document.getElementById("qnav");
  if (!nav) return;
  const current = nav.dataset.current;
  const kind = nav.dataset.kind || "question";
  const qs = kind === "dsa"
    ? (window.DSA || []).flatMap(g => g.patterns.map(p => ({ ...p, title: `${g.area}: ${p.title}` })))
    : (window.QUESTIONS || []);
  const sections = [...document.querySelectorAll("main section[data-nav]")];
  const steps = sections.filter(s => s.dataset.num), extra = sections.filter(s => !s.dataset.num);
  const item = s => `<li><a href="#${s.id}" data-id="${s.id}"><span class="n">${s.dataset.num || "·"}</span><span>${s.dataset.nav}</span>${s.dataset.time ? `<span class="t">${s.dataset.time}</span>` : ""}</a></li>`;
  const opt = q => `<option value="${q.slug}"${q.slug === current ? " selected" : ""}${q.status !== "ready" ? " disabled" : ""}>${q.title}${q.status !== "ready" ? " (soon)" : ""}</option>`;
  // design questions are grouped into high-level and low-level design
  const options = kind === "dsa" ? qs.map(opt).join("")
    : [["hld", "High-level design"], ["lld", "Low-level design"]].map(([lv, label]) => {
        const group = qs.filter(q => (q.level || "hld") === lv);
        return group.length ? `<optgroup label="${label}">${group.map(opt).join("")}</optgroup>` : "";
      }).join("");
  const weights = [5, 2, 5, 13, 10];
  nav.innerHTML = `
    <label class="field" for="qswitch"><span class="eyebrow nav-label">${kind === "dsa" ? "Pattern" : "Question"}</span><select id="qswitch" aria-label="Switch ${kind === "dsa" ? "pattern" : "question"}">${options}</select></label>
    <div style="display:grid;gap:10px">
      <span class="eyebrow nav-label">${kind === "dsa" ? "On this page" : "Interview steps · 45 min"}</span>
      ${kind === "dsa" ? "" : `<div class="mini" aria-hidden="true">${weights.map(w => `<i style="flex:${w}"></i>`).join("")}</div>`}
      <ol>${kind === "dsa" ? sections.map(item).join("") : steps.map(item).join("") + (extra.length ? `<li class="sep">Also on this page</li>` : "") + extra.map(item).join("")}</ol>
    </div>`;
  nav.querySelector("#qswitch").addEventListener("change", e => { location.href = `${e.target.value}.html`; });

  const links = [...nav.querySelectorAll("a[data-id]")];
  const bars = [...nav.querySelectorAll(".mini i")];
  function setActive(id) {
    links.forEach(a => a.classList.toggle("active", a.dataset.id === id));
    // light up the 45-minute bar up to the current interview step (steps 5a/5b share the last segment)
    const pos = sections.findIndex(s => s.id === id);
    const stepIdx = steps.filter(s => sections.indexOf(s) <= pos).length - 1;
    bars.forEach((b, i) => b.classList.toggle("on", i <= Math.min(stepIdx, bars.length - 1)));
    const a = links.find(x => x.dataset.id === id);
    if (a && window.matchMedia("(max-width: 900px)").matches) a.scrollIntoView({ block: "nearest", inline: "center" });
  }
  const io = new IntersectionObserver(entries => {
    const visible = entries.filter(e => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
    if (visible.length) setActive(visible[0].target.id);
  }, { rootMargin: "-15% 0px -70% 0px" });
  sections.forEach(s => io.observe(s));
  setActive(sections[0] && sections[0].id);
})();
