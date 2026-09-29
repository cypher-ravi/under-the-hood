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
  { slug: "token-bucket", title: "Token Bucket Rate Limiter", area: "Backend", status: "planned",
    blurb: "Bursty traffic hits a bucket that refills at a fixed rate." },
  { slug: "b-tree", title: "B-Tree Inserts", area: "Databases", status: "planned",
    blurb: "Nodes fill, split and push keys up the tree." },
  { slug: "vector-clocks", title: "Vector Clocks", area: "Distributed systems", status: "planned",
    blurb: "Track causality between events and spot concurrent writes." },
  { slug: "gossip", title: "Gossip Protocol", area: "Distributed systems", status: "planned",
    blurb: "A rumor spreads through a cluster in O(log N) rounds." },
  { slug: "tcp-congestion", title: "TCP Congestion Control", area: "Networking", status: "planned",
    blurb: "Slow start, additive increase and the sawtooth after packet loss." },
  { slug: "attention", title: "Transformer Attention", area: "Machine learning", status: "planned",
    blurb: "Which earlier tokens each token looks at, head by head." }
];
