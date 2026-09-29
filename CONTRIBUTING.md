# Adding a topic

1. **Copy a template.** Duplicate `topics/consistent-hashing.html` (static state that changes on click) or `topics/raft.html` (a simulation that runs over time) and rename it `topics/<slug>.html`.
2. **Write the model first, then the drawing.** Keep the logic in plain functions that take state and return new state. Rendering only reads state. This keeps the algorithm testable and easy to explain.
3. **Fill in the four standard sections** so every page reads the same way:
   - **Intro:** the idea in 2–3 sentences.
   - **Stage:** the drawing on the left, controls and live numbers on the right.
   - **What to notice:** 3–4 things to try, each tied to a control.
   - **Interview angle:** the "why" question an interviewer would ask, and the trade-off.
4. **Register it** in `topics/registry.js` with `status: "ready"`, a one-line `blurb`, and `usedIn` (real systems that use it).
5. **Use theme tokens only** (`var(--accent)`, `var(--ink)`, …) so the page works in light and dark mode.

## Quality bar

- The simulation must be real: the page runs the actual algorithm, not a scripted animation.
- Every number shown on screen comes from the model.
- Works at phone width (~400px).
