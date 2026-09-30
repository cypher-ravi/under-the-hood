# Under the Hood

Interactive visualizations of the algorithms and systems behind everyday software. Each topic is a small, working simulation you can poke at, not a pre-recorded animation.

| Topic | Area | What you can do |
| --- | --- | --- |
| [Consistent Hashing](topics/consistent-hashing.html) | Distributed systems | Add/remove servers, tune virtual nodes, compare key movement against `hash mod N` |
| [Raft Consensus](topics/raft.html) | Distributed systems | Watch leader election, send client writes, crash and restart servers |
| [Bloom Filter](topics/bloom-filter.html) | Data structures | Add and check words, catch false positives, tune bits and hash count against the formula |
| [Rate Limiters](topics/rate-limiter.html) | Backend | Four algorithms side by side on the same traffic, including a burst across a window boundary |
| [Geohash and Quadtrees](topics/geohash-quadtree.html) | Proximity search | Move a rider on a map of drivers, compare a geohash grid with a quadtree, see what each search checks or misses |
| [LRU Cache](topics/lru-cache.html) | Data structures | Step through the hash map and linked list, replay access patterns, compare with the optimal policy |

## Design questions

| Question | Concepts used |
| --- | --- |
| [Design a URL Shortener](questions/bitly.html) | LRU cache, consistent hashing, Bloom filter, rate limiting |
| [Design Ticketmaster](questions/ticketmaster.html) | Rate limiting, caching, consistent hashing |
| [Design a Rate Limiter](questions/rate-limiter-design.html) | Rate limiting algorithms, consistent hashing |

Each question page follows the same interview steps: requirements, core entities, API, high-level design (drawn live and evolved one component at a time), then deep dives with interactive estimates. The step order follows Hello Interview's delivery framework; the breakdowns are original.

## DSA patterns

| Pattern | Problems (each with a step-through visualizer) |
| --- | --- |
| [Two Pointers](dsa/two-pointers.html) | Palindrome check, pair with target sum, container with most water, three sum |
| [Sliding Window](dsa/sliding-window.html) | Best sum of k in a row, every anagram, longest run without repeats, shortest subarray reaching a target |
| [Simultaneous Traversal](dsa/simultaneous-traversal.html) | Merge two sorted arrays, subsequence check, common elements, merge in place |

Pattern pages teach the idea from first principles, how to spot it, and a template, then step through each problem's solution line by line with editable inputs. Patterns are grouped by data structure; the pattern-first structure is inspired by Codeintuition. `shared/stepper.js` is the reusable step-through engine.

## Concept pages

Every topic page has the same sections: the simulation, a worked example traced by hand, the story of who invented it and why, a first-principles summary (what, why, when, where, how), and an interview angle.

Planned topics are listed in [`topics/registry.js`](topics/registry.js). The roadmap follows the core concepts, patterns and problem breakdowns in [Hello Interview's system design guide](https://www.hellointerview.com/learn/system-design/in-a-hurry/introduction).

## Run locally

No build step and no dependencies.

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

## Deploy

Push to GitHub and enable **Settings → Pages → Deploy from branch → main / root**. The site is static.

## Structure

```
index.html            gallery, renders cards from topics/registry.js
shared/lab.css        theme tokens (light + dark) and shared components
topics/registry.js    list of topics and their status
topics/<slug>.html    one self-contained page per topic
```

See [CONTRIBUTING.md](CONTRIBUTING.md) for how to add a topic.
