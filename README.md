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
| [Quorum Replication and CAP](topics/quorum.html) | Databases | Tune N, R and W, split the network into two sides, choose CP or AP, and measure stale reads against the formula |
| [LSM Tree](topics/lsm-tree.html) | Scaling writes | Put, get and delete keys through a memtable, flush and compact sorted files, toggle Bloom filters, and track write and space amplification |
| [B-Tree Index](topics/b-tree.html) | Database indexing | Insert keys until nodes split upward, search and range-scan the linked leaves, compare random and in-order inserts, and size a real index by page size |
| [Kafka Partitions](topics/kafka.html) | Key technologies | Produce keyed or keyless messages into partitions, add and kill consumers to trigger rebalances, tune the commit interval, and track lag, duplicates and per-key ordering |

## Design questions

| Question | Concepts used |
| --- | --- |
| [Design a URL Shortener](questions/bitly.html) | LRU cache, consistent hashing, Bloom filter, rate limiting |
| [Design Ticketmaster](questions/ticketmaster.html) | Rate limiting, caching, consistent hashing |
| [Design a Rate Limiter](questions/rate-limiter-design.html) | Rate limiting algorithms, consistent hashing |
| [Design WhatsApp](questions/whatsapp.html) | Consistent hashing, quorum replication, rate limiting |
| [Design a News Feed](questions/news-feed.html) | LRU cache, consistent hashing, LSM tree |
| [Design Uber](questions/uber.html) | Geohash and quadtrees, consistent hashing, B-tree index |
| [Design YouTube Top K](questions/top-k.html) | Kafka partitions, Count-Min Sketch, consistent hashing, LRU cache, Bloom filter |

Each question page follows the same interview steps: requirements, core entities, API, high-level design (drawn live and evolved one component at a time), then deep dives with interactive estimates. The step order follows Hello Interview's delivery framework; the breakdowns are original.

### Low-level design

| Question | Patterns used |
| --- | --- |
| [Design a Parking Lot](questions/lld-parking-lot.html) | Strategy, Observer, Factory, Singleton |

Low-level design pages (`questions/lld-<slug>.html`) cover requirements scoped for a 45-minute interview, core entities, a UML class diagram, the main interfaces, the design patterns used and why, an interactive walkthrough of the objects at work, short runnable Python, and deep dives on thread safety, extensibility and SOLID trade-offs.

## DSA patterns

| Pattern | Problems (each with a step-through visualizer) |
| --- | --- |
| [Two Pointers](dsa/two-pointers.html) | Palindrome check, pair with target sum, container with most water, three sum |
| [Sliding Window](dsa/sliding-window.html) | Best sum of k in a row, every anagram, longest run without repeats, shortest subarray reaching a target |
| [Simultaneous Traversal](dsa/simultaneous-traversal.html) | Merge two sorted arrays, subsequence check, common elements, merge in place |
| [Interval Merging and Overlap](dsa/intervals.html) | Merge overlapping intervals, insert an interval, meeting rooms (sweep line), fewest removals |
| [Fast and Slow Pointers](dsa/fast-slow.html) | Middle of a linked list, cycle detection, cycle start, happy numbers |
| [In-place Reversal](dsa/reversal.html) | Reverse a list, reverse a segment, reverse every k nodes, palindrome linked list |
| [Monotonic Stack](dsa/monotonic-stack.html) | Next greater element, days until warmer, stock price span, largest rectangle in a histogram |

Pattern pages teach the idea from first principles, how to spot it, and a template, then step through each problem's solution line by line with editable inputs. Patterns are grouped by data structure; the pattern-first structure is inspired by Codeintuition. `shared/stepper.js` is the reusable step-through engine.

## AI lessons

A from-zero AI course in 60 lessons (plus deep dives), one concept per lesson, published twice a week.

| Lesson | Part | What you can do |
| --- | --- | --- |
| [01 · What AI actually is](lessons/01-what-ai-is.html) | Foundations | Slide a spam-filter threshold over eight emails, then watch the computer try every value and keep the best |
| [02 · Data: examples, features, labels, datasets](lessons/02-data.html) | Foundations | Run a feature recipe on any email you type, then pick two features and see the best rule reach zero mistakes |
| [03 · A model is a function](lessons/03-model-is-a-function.html) | Foundations | Turn a line's two knobs to fit five flats, compare a constant and a lookup table, then search every setting |
| [04 · Vectors and matrices, intuitively](lessons/04-vectors-matrices.html) | Foundations | Drag two arrows to watch the dot product and angle change, then re-price four flats at once with ŷ = Xw + b |
| [05 · Derivatives and slopes](lessons/05-derivatives.html) | Foundations | Shrink a secant's gap until it becomes the tangent, then let the slope walk a loss knob downhill to its best value |

Each lesson has the same sections: where we are, why it matters, the intuition, how it works (every symbol defined), a diagram or widget computing real values, a worked example by hand and in Python, common misconceptions, three check-yourself questions, the one-line takeaway, what comes next, and optional further reading. The full curriculum is in `window.LESSONS` in [`topics/registry.js`](topics/registry.js).

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
lessons/<NN>-<slug>.html  one self-contained page per AI lesson
```

See [CONTRIBUTING.md](CONTRIBUTING.md) for how to add a topic.
