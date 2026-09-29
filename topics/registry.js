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
