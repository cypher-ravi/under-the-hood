// The list of topics shown on the gallery page.
// To add a topic: create topics/<slug>.html, then add an entry here with status "ready".
window.TOPICS = [
  {
    slug: "consistent-hashing",
    title: "Consistent Hashing",
    area: "Distributed systems",
    status: "ready",
    blurb: "Add or remove a server and watch how few keys move, compared with plain hash mod N.",
    usedIn: "DynamoDB, Cassandra, Discord, CDNs",
    glyph: "ring"
  },
  {
    slug: "raft",
    title: "Raft Consensus",
    area: "Distributed systems",
    status: "ready",
    blurb: "Five servers elect a leader and replicate a log. Crash any of them and watch the cluster recover.",
    usedIn: "etcd, Consul, CockroachDB, TiKV",
    glyph: "cluster"
  },
  {
    slug: "lru-cache",
    title: "LRU Cache",
    area: "Data structures",
    status: "ready",
    blurb: "A hash map plus a doubly linked list. Replay access patterns and compare LRU with the optimal policy that knows the future.",
    usedIn: "Redis, Memcached, Linux page cache, CPU caches",
    glyph: "list"
  },
  {
    slug: "bloom-filter",
    title: "Bloom Filter",
    area: "Data structures",
    status: "ready",
    blurb: "Add words to a bit array, check ones you never added, and catch a false positive. Tune m and k against the formula.",
    usedIn: "Cassandra, RocksDB, Bigtable, Akamai",
    glyph: "bits"
  },
  {
    slug: "rate-limiter",
    title: "Rate Limiters",
    area: "Backend",
    status: "ready",
    blurb: "Fixed window, sliding log, sliding counter and token bucket fed the same traffic. Burst across a window boundary and see which one leaks.",
    usedIn: "AWS API Gateway, Stripe, Cloudflare, Nginx",
    glyph: "lanes"
  },
  { slug: "geohash-quadtree", title: "Geohash and Quadtrees", area: "Proximity search", status: "planned",
    blurb: "Find nearby drivers or restaurants by splitting the map into cells that share prefixes." },
  { slug: "quorum", title: "Quorum Replication and CAP", area: "Databases", status: "planned",
    blurb: "Tune N, R and W, partition the network, and watch reads go stale or writes fail." },
  { slug: "lsm-tree", title: "LSM Tree", area: "Scaling writes", status: "planned",
    blurb: "Writes land in memory, flush to sorted files and get compacted, as in Cassandra and RocksDB." },
  { slug: "b-tree", title: "B-Tree Index", area: "Database indexing", status: "planned",
    blurb: "Nodes fill, split and push keys up. See why a lookup touches only three or four pages." },
  { slug: "kafka", title: "Kafka Partitions", area: "Key technologies", status: "planned",
    blurb: "Producers, partitions, offsets and consumer groups, including a rebalance when a consumer dies." },
  { slug: "count-min-sketch", title: "Count-Min Sketch and Top K", area: "Big data", status: "planned",
    blurb: "Estimate the most viewed videos in a stream using a few kilobytes of counters." },
  { slug: "distributed-lock", title: "Contention and Distributed Locks", area: "Patterns", status: "planned",
    blurb: "Two buyers, one ticket: compare locks, optimistic concurrency and leases with expiry." },
  { slug: "crdt", title: "Collaborative Editing (OT and CRDTs)", area: "Real-time updates", status: "planned",
    blurb: "Two people type at the same spot offline. See how both edits survive the merge." },
  { slug: "vector-clocks", title: "Vector Clocks", area: "Distributed systems", status: "planned",
    blurb: "Track causality between events and spot concurrent writes." }
];

// Interview-style design questions. Each page follows the same steps:
// requirements, core entities, API, high-level design, deep dives.
window.QUESTIONS = [
  {
    slug: "bitly",
    title: "Design a URL Shortener",
    status: "ready",
    blurb: "Watch the design grow from one server to a scaled read path, generate codes three ways, and size it with live estimates.",
    concepts: ["lru-cache", "consistent-hashing", "bloom-filter", "rate-limiter"]
  },
  { slug: "rate-limiter-design", title: "Design a Rate Limiter", status: "planned", blurb: "A shared limiter for an API gateway: where it runs, Redis and Lua, and failing open or closed." },
  { slug: "ticketmaster", title: "Design Ticketmaster", status: "planned", blurb: "Thousands of buyers, one seat: reservations, locks with expiry, and virtual waiting rooms." },
  { slug: "whatsapp", title: "Design WhatsApp", status: "planned", blurb: "Persistent connections, delivery receipts and offline inboxes." },
  { slug: "news-feed", title: "Design a News Feed", status: "planned", blurb: "Fan-out on write versus on read, and the celebrity problem." },
  { slug: "uber", title: "Design Uber", status: "planned", blurb: "Matching riders to nearby drivers with geospatial indexes and location updates." },
  { slug: "top-k", title: "Design YouTube Top K", status: "planned", blurb: "Most-viewed videos over sliding windows using stream processing and sketches." },
  { slug: "web-crawler", title: "Design a Web Crawler", status: "planned", blurb: "Frontier queues, politeness, deduplication and failure recovery." },
  { slug: "distributed-cache", title: "Design a Distributed Cache", status: "planned", blurb: "Eviction, sharding, replication and hot keys." },
  { slug: "google-docs", title: "Design Google Docs", status: "planned", blurb: "Real-time collaborative editing with OT or CRDTs." },
  { slug: "dropbox", title: "Design Dropbox", status: "planned", blurb: "Chunked uploads, presigned URLs and sync across devices." }
];
