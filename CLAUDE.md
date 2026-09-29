# Under the Hood: working notes

Static site of interactive visualizations, live at https://cypher-ravi.github.io/under-the-hood/.
Every push to `main` redeploys through `.github/workflows/pages.yml` (about 1 minute).

## Rules
- Commit as the user only: `git -c user.name="cypher-ravi" -c user.email="ravikdev1999@gmail.com" commit ...`.
  **No Claude co-author trailer or any Claude attribution** in commits, PRs or pages.
- No build step, no dependencies. Plain HTML/CSS/JS, one file per page. Fonts from Google Fonts only.
- Colors only through tokens in `shared/lab.css` (light and dark). Every page must fit a 400px-wide screen with no sideways scroll.
- After changing `shared/lab.css`, bump the `?v=N` query on every page's stylesheet link (currently `v=6`).
- Write explanations and problem statements in our own words. Credit Hello Interview (design questions) and Codeintuition (DSA pattern structure) as inspiration; never copy their text.
- Verify facts (dates, names, numbers) with a quick search before putting them in a "story" section.
- Check each new page once with Playwright (desktop + 400px width, look for console errors), then push.

## Structure
- `index.html`: gallery with three tabs (Concepts, Design questions, DSA patterns), rendered from `topics/registry.js`.
- `topics/registry.js`: `TOPICS`, `QUESTIONS`, `DSA`. Flip an entry's `status` to `"ready"` when its page ships.
- `topics/<slug>.html`: concept pages. Sections: simulation, worked example, story (history), first principles (`.qa` rows), what to notice, interview angle.
- `questions/<slug>.html`: design questions. Sidebar via `<aside class="qnav" id="qnav" data-current="slug">` + `shared/qnav.js`. Sections carry `data-nav`, `data-num`, `data-time`. Steps follow Hello Interview's framework: requirements, core entities, API, high-level design (staged animated diagram), deep dives; then worked example, first principles, story, follow-ups, concept links.
- `dsa/<slug>.html`: DSA pattern pages. Same sidebar with `data-kind="dsa"`. Sections: the idea, how to spot it, template, problems (question box with example I/O + hint, then a `Stepper`), why it works.
- `shared/stepper.js`: `Stepper(root, { code, inputs, presets, build(values) -> {frames}|{error}, draw(frame) })`, plus `drawArray(values, {ptr, mark})` and `parseNums(text)`. `dsa/two-pointers.html` is the reference example.

## Roadmap (next up first)
- DSA: Sliding Window (fixed + variable), Simultaneous Traversal, Interval Merging and Overlap, then Linked List, Stack, Binary Search, Tree, Heap, Graph, Backtracking, DP.
- Design questions: Ticketmaster, Rate Limiter, WhatsApp, News Feed, Uber, YouTube Top K, Web Crawler, Distributed Cache, Google Docs, Dropbox.
- Concepts: Geohash and Quadtrees, Quorum and CAP, LSM Tree, B-Tree, Kafka partitions, Count-Min Sketch, Distributed Locks, CRDTs, Vector Clocks.
