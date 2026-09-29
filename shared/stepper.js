// A reusable step-through visualizer for DSA problems.
// Each problem supplies: code lines, editable inputs, build(values) -> frames, and draw(frame) -> HTML.
// A frame is { line, msg, vars, ...anything draw() needs }.
(function () {
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  window.Stepper = function (root, cfg) {
    let frames = [], i = 0, timer = null, speed = 1;
    const id = root.id;
    root.classList.add("stepper");
    root.innerHTML = `
      <form class="st-inputs" autocomplete="off">
        ${cfg.inputs.map(inp => `<label class="field" for="${id}-${inp.key}"><span>${inp.label}</span><input id="${id}-${inp.key}" name="${inp.key}" value="${esc(inp.value)}" spellcheck="false"></label>`).join("")}
        <button type="submit" class="primary">Run</button>
        ${cfg.presets ? `<div class="st-presets">${cfg.presets.map((p, k) => `<button type="button" data-preset="${k}">${esc(p.label)}</button>`).join("")}</div>` : ""}
      </form>
      <p class="st-error" role="alert" hidden></p>
      <div class="st-main">
        <div class="st-stage" aria-live="polite"></div>
        <div class="st-side">
          <pre class="st-code" aria-label="Code"></pre>
          <div class="st-vars"></div>
        </div>
      </div>
      <div class="st-bar">
        <button type="button" data-a="first" aria-label="First step">⏮</button>
        <button type="button" data-a="prev" aria-label="Previous step">◀ Prev</button>
        <button type="button" data-a="play" class="primary">Play</button>
        <button type="button" data-a="next" aria-label="Next step">Next ▶</button>
        <button type="button" data-a="last" aria-label="Last step">⏭</button>
        <input type="range" class="st-scrub" min="0" value="0" aria-label="Step">
        <span class="st-count mono"></span>
      </div>
      <p class="st-msg"></p>`;
    const $ = sel => root.querySelector(sel);
    const form = $(".st-inputs");

    function build() {
      const values = Object.fromEntries(cfg.inputs.map(inp => [inp.key, form.elements[inp.key].value]));
      const out = cfg.build(values);
      const err = $(".st-error");
      if (out.error) { err.hidden = false; err.textContent = out.error; return; }
      err.hidden = true;
      frames = out.frames; i = 0; stop();
      $(".st-scrub").max = frames.length - 1;
      show();
    }
    function show() {
      const f = frames[i];
      $(".st-stage").innerHTML = cfg.draw(f);
      $(".st-code").innerHTML = cfg.code.map((ln, k) =>
        `<span class="ln${k === f.line ? " on" : ""}"><i>${k + 1}</i>${esc(ln) || " "}</span>`).join("");
      $(".st-vars").innerHTML = Object.entries(f.vars || {}).map(([k, v]) =>
        `<span><b>${esc(k)}</b> ${esc(v)}</span>`).join("");
      $(".st-msg").innerHTML = f.msg || "";
      $(".st-count").textContent = `step ${i + 1} / ${frames.length}`;
      $(".st-scrub").value = i;
      $('[data-a="prev"]').disabled = $('[data-a="first"]').disabled = i === 0;
      $('[data-a="next"]').disabled = $('[data-a="last"]').disabled = i === frames.length - 1;
    }
    function stop() { clearInterval(timer); timer = null; $('[data-a="play"]').textContent = "Play"; }
    function play() {
      if (timer) { stop(); return; }
      if (i === frames.length - 1) i = 0;
      $('[data-a="play"]').textContent = "Pause";
      timer = setInterval(() => { if (i < frames.length - 1) { i++; show(); } else stop(); }, 900 / speed);
    }
    root.addEventListener("click", e => {
      const a = e.target.closest("[data-a]"); if (a) {
        const act = a.dataset.a;
        if (act === "play") return play();
        stop();
        if (act === "prev" && i > 0) i--;
        if (act === "next" && i < frames.length - 1) i++;
        if (act === "first") i = 0;
        if (act === "last") i = frames.length - 1;
        show(); return;
      }
      const p = e.target.closest("[data-preset]"); if (p) {
        const preset = cfg.presets[+p.dataset.preset];
        Object.entries(preset.values).forEach(([k, v]) => { form.elements[k].value = v; });
        build();
      }
    });
    $(".st-scrub").addEventListener("input", e => { stop(); i = +e.target.value; show(); });
    form.addEventListener("submit", e => { e.preventDefault(); build(); });
    root.addEventListener("keydown", e => {
      if (e.target.tagName === "INPUT" && e.target.type !== "range") return;
      if (e.key === "ArrowRight") { stop(); if (i < frames.length - 1) { i++; show(); } }
      if (e.key === "ArrowLeft") { stop(); if (i > 0) { i--; show(); } }
    });
    build();
  };

  // ---------- drawing helpers shared by problems ----------
  // values: array of strings/numbers. opts.ptr: {label: index}. opts.mark: {index: "hit"|"miss"|"done"|"skip"|"active"}
  window.drawArray = function (values, opts = {}) {
    const n = values.length, cw = Math.max(34, Math.min(52, Math.floor(640 / Math.max(n, 1)) - 6)), gap = 6;
    const W = n * (cw + gap) - gap + 20, ptrs = Object.entries(opts.ptr || {}).filter(([, v]) => v !== undefined && v !== null && v >= 0 && v < n);
    const rows = {}; ptrs.forEach(([, v]) => { rows[v] = (rows[v] || 0) + 1; });
    const maxStack = Math.max(1, ...Object.values(rows));
    const H = 30 + cw + 16 + maxStack * 22;
    const colors = { hit: "var(--ok)", miss: "var(--bad)", done: "var(--line)", skip: "var(--amber)", active: "var(--accent)" };
    let s = "";
    values.forEach((v, k) => {
      const x = 10 + k * (cw + gap), m = (opts.mark || {})[k];
      const fill = m === "hit" ? "var(--ok)" : m === "active" ? "var(--accent)" : m === "done" ? "var(--paper)" : "var(--panel)";
      const text = m === "hit" || m === "active" ? "var(--panel)" : m === "done" ? "var(--muted)" : "var(--ink)";
      s += `<rect x="${x}" y="22" width="${cw}" height="${cw}" rx="6" fill="${fill}" stroke="${m ? colors[m] : "var(--line)"}" stroke-width="${m && m !== "done" ? 2.5 : 1.3}"/>`;
      s += `<text x="${x + cw / 2}" y="${22 + cw / 2 + 1}" text-anchor="middle" dominant-baseline="central" font-family="var(--mono)" font-size="${String(v).length > 3 ? 12 : 16}" font-weight="600" fill="${text}">${esc(v === " " ? "␣" : v)}</text>`;
      s += `<text x="${x + cw / 2}" y="14" text-anchor="middle" font-family="var(--mono)" font-size="10" fill="var(--muted)">${k}</text>`;
    });
    const used = {};
    ptrs.forEach(([label, v]) => {
      const x = 10 + v * (cw + gap) + cw / 2, slot = used[v] = (used[v] || 0) + 1;
      const y = 22 + cw + 8 + (slot - 1) * 22;
      const c = label === "i" ? "var(--ink)" : label.startsWith("L") ? "var(--accent)" : label.startsWith("R") ? "var(--amber)" : "var(--ok)";
      s += `<path d="M${x} ${y} l-5 7 h10 z" fill="${c}"/>`;
      s += `<text x="${x}" y="${y + 19}" text-anchor="middle" font-family="var(--mono)" font-size="12" font-weight="700" fill="${c}">${esc(label)}</text>`;
    });
    return `<div class="st-scroll"><svg viewBox="0 0 ${W} ${H}" width="${W}" style="max-width:100%;height:auto" role="img" aria-label="Array">${s}</svg></div>`;
  };

  // parse "1, 2, 3" into numbers
  window.parseNums = function (text, { min = 2, max = 14 } = {}) {
    const parts = text.split(/[\s,]+/).filter(Boolean);
    if (parts.length < min) return { error: `Enter at least ${min} numbers, separated by commas.` };
    if (parts.length > max) return { error: `Use at most ${max} numbers so every step fits on screen.` };
    const nums = parts.map(Number);
    if (nums.some(x => !Number.isFinite(x) || !Number.isInteger(x))) return { error: "Use whole numbers only, for example 1, 3, 4, 6." };
    if (nums.some(x => Math.abs(x) > 999)) return { error: "Keep numbers between -999 and 999." };
    return { nums };
  };
})();
