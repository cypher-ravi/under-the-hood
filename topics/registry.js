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
  {
    slug: "geohash-quadtree",
    title: "Geohash and Quadtrees",
    area: "Proximity search",
    status: "ready",
    blurb: "Drop a rider on a map of drivers and compare a geohash grid with a quadtree: what each search checks, and what the grid can miss.",
    usedIn: "Uber, Redis GEO, Elasticsearch, MongoDB",
    glyph: "grid"
  },
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
  {
    slug: "rate-limiter-design",
    title: "Design a Rate Limiter",
    status: "ready",
    blurb: "Watch a per-server limiter leak, step two gateways through a race on one counter, and size a sharded Redis tier that fails safely.",
    concepts: ["rate-limiter", "consistent-hashing", "lru-cache"]
  },
  {
    slug: "ticketmaster",
    title: "Design Ticketmaster",
    status: "ready",
    blurb: "Step two buyers through a race for one seat, watch abandoned holds expire on a live seat map, and size a waiting room for an on-sale surge.",
    concepts: ["rate-limiter", "lru-cache", "consistent-hashing"]
  },
  { slug: "whatsapp", title: "Design WhatsApp", status: "planned", blurb: "Persistent connections, delivery receipts and offline inboxes." },
  { slug: "news-feed", title: "Design a News Feed", status: "planned", blurb: "Fan-out on write versus on read, and the celebrity problem." },
  { slug: "uber", title: "Design Uber", status: "planned", blurb: "Matching riders to nearby drivers with geospatial indexes and location updates." },
  { slug: "top-k", title: "Design YouTube Top K", status: "planned", blurb: "Most-viewed videos over sliding windows using stream processing and sketches." },
  { slug: "web-crawler", title: "Design a Web Crawler", status: "planned", blurb: "Frontier queues, politeness, deduplication and failure recovery." },
  { slug: "distributed-cache", title: "Design a Distributed Cache", status: "planned", blurb: "Eviction, sharding, replication and hot keys." },
  { slug: "google-docs", title: "Design Google Docs", status: "planned", blurb: "Real-time collaborative editing with OT or CRDTs." },
  { slug: "dropbox", title: "Design Dropbox", status: "planned", blurb: "Chunked uploads, presigned URLs and sync across devices." }
];

// DSA patterns, grouped by data structure. Each pattern page teaches the idea, how to spot it,
// a template, and several problems with step-through visualizations of the question and the answer.
window.DSA = [
  { area: "Array", patterns: [
    { slug: "two-pointers", title: "Two Pointers", status: "ready",
      blurb: "Direct, reduction and subproblem variants: palindromes, pair sums, the water container and three sum, stepped line by line.",
      problems: ["Palindrome check", "Pair with target sum", "Container with most water", "Three sum"] },
    { slug: "sliding-window", title: "Sliding Window", status: "ready",
      blurb: "Fixed and variable windows grown and shrunk in one pass: best k-sum, anagrams, longest run without repeats and shortest sum.",
      problems: ["Best sum of k in a row", "Find every anagram", "Longest run without repeats", "Shortest subarray reaching a target"] },
    { slug: "simultaneous-traversal", title: "Simultaneous Traversal", status: "ready",
      blurb: "One pointer per sorted array: merge, match a subsequence, intersect, and merge in place from the back, stepped line by line.",
      problems: ["Merge two sorted arrays", "Is it a subsequence?", "Common elements", "Merge in place"] },
    { slug: "intervals", title: "Interval Merging and Overlap", status: "planned", blurb: "Sort by start, merge overlaps, and sweep a line to count meeting rooms." }
  ] },
  { area: "Linked List", patterns: [
    { slug: "fast-slow", title: "Fast and Slow Pointers", status: "planned", blurb: "Find cycles and middles with pointers moving at different speeds." },
    { slug: "reversal", title: "In-place Reversal", status: "planned", blurb: "Rewire next pointers to reverse a list or a segment of it." }
  ] },
  { area: "Stack", patterns: [
    { slug: "monotonic-stack", title: "Monotonic Stack", status: "planned", blurb: "Next greater element, daily temperatures and the largest rectangle." }
  ] },
  { area: "Binary Search", patterns: [
    { slug: "binary-search", title: "Binary Search on the Answer", status: "planned", blurb: "Halve a sorted range, or halve the space of possible answers." }
  ] },
  { area: "Tree", patterns: [
    { slug: "tree-traversal", title: "DFS and BFS on Trees", status: "planned", blurb: "Preorder, inorder, postorder and level order, with the call stack drawn." }
  ] },
  { area: "Heap", patterns: [
    { slug: "top-k", title: "Top K and Two Heaps", status: "planned", blurb: "Keep the k largest with a min-heap, and a running median with two heaps." }
  ] },
  { area: "Graph", patterns: [
    { slug: "graph-search", title: "BFS, Topological Sort and Union-Find", status: "planned", blurb: "Shortest paths in unweighted graphs, dependency order and connected groups." }
  ] },
  { area: "Recursion and DP", patterns: [
    { slug: "backtracking", title: "Backtracking", status: "planned", blurb: "Build subsets and permutations by choosing, exploring and undoing." },
    { slug: "dynamic-programming", title: "Dynamic Programming", status: "planned", blurb: "Fill a table from smaller subproblems: stairs, grids and knapsack." }
  ] }
];

// AI lessons: a from-zero course, one concept per lesson, grouped by curriculum part.
// To ship a lesson: create lessons/<NN>-<slug>.html, then flip its status to "ready".
window.LESSONS = [
  { part: "Part 1 · Foundations", lessons: [
    { num: 1, slug: "01-what-ai-is", title: "What AI actually is", status: "ready",
      blurb: "AI, machine learning and deep learning as three nested circles, and a machine that learns a spam threshold from eight emails." },
    { num: 2, slug: "02-data", title: "Data: examples, features, labels, datasets", status: "planned", blurb: "What goes in each row and column of the table a model learns from." },
    { num: 3, slug: "03-model-is-a-function", title: "A model is a function", status: "planned", blurb: "Learning as fitting a function to data." },
    { num: 4, slug: "04-vectors-matrices", title: "Vectors and matrices, intuitively", status: "planned", blurb: "Lists and grids of numbers, with the code view." },
    { num: 5, slug: "05-derivatives", title: "Derivatives and slopes, intuitively", status: "planned", blurb: "How fast an output changes when you nudge an input." },
    { num: 6, slug: "06-probability", title: "Probability basics for ML", status: "planned", blurb: "Chance, distributions and expectations, just enough for ML." },
    { num: 7, slug: "07-loss-functions", title: "Loss functions", status: "planned", blurb: "One number that measures how wrong a model is." },
    { num: 8, slug: "08-gradient-descent", title: "Gradient descent", status: "planned", blurb: "Walk downhill on the loss, one small step at a time." },
    { num: 9, slug: "09-linear-regression", title: "Linear regression end to end", status: "planned", blurb: "Fit a line to data: model, loss and training together." },
    { num: 10, slug: "10-logistic-regression", title: "Logistic regression and classification", status: "planned", blurb: "Turn a score into a probability and a yes/no answer." },
    { num: 11, slug: "11-splits", title: "Train, validation and test splits", status: "planned", blurb: "Why a model must be graded on data it never saw." },
    { num: 12, slug: "12-overfitting", title: "Overfitting, underfitting and bias–variance", status: "planned", blurb: "Memorizing versus learning, and the trade-off between them." },
    { num: 13, slug: "13-regularization", title: "Regularization", status: "planned", blurb: "Penalize complexity so a model generalizes." },
    { num: 14, slug: "14-metrics", title: "Evaluation metrics", status: "planned", blurb: "Accuracy, precision, recall, F1 and the confusion matrix." },
    { num: 15, slug: "15-decision-trees", title: "Decision trees", status: "planned", blurb: "Learn a flowchart of yes/no questions." },
    { num: 16, slug: "16-ensembles", title: "Ensembles: random forests and gradient boosting", status: "planned", blurb: "Many weak models voting beat one strong one." },
    { num: 17, slug: "17-knn", title: "k-nearest neighbours and distance", status: "planned", blurb: "Predict by asking the most similar examples." },
    { num: 18, slug: "18-kmeans", title: "Clustering with k-means", status: "planned", blurb: "Find groups in data that has no labels." },
    { num: 19, slug: "19-pca", title: "Dimensionality reduction with PCA", status: "planned", blurb: "Squash many features into a few that keep the most information." }
  ] },
  { part: "Part 2 · Neural networks", lessons: [
    { num: 20, slug: "20-perceptron", title: "The artificial neuron and the perceptron", status: "planned", blurb: "A weighted sum and a threshold: the unit networks are built from." },
    { num: 21, slug: "21-activations", title: "Activation functions", status: "planned", blurb: "The bends that let networks model curves." },
    { num: 22, slug: "22-deep-networks", title: "Multi-layer networks and why depth helps", status: "planned", blurb: "Stack layers to build features out of features." },
    { num: 23, slug: "23-backprop", title: "Backpropagation, step by step", status: "planned", blurb: "The chain rule, run backwards through a network." },
    { num: 24, slug: "24-optimizers", title: "Optimizers: SGD, momentum, Adam", status: "planned", blurb: "Smarter ways to take each downhill step." },
    { num: 25, slug: "25-training-practice", title: "Training in practice", status: "planned", blurb: "Batches, epochs and learning rates." },
    { num: 26, slug: "26-init-norm", title: "Initialization and normalization", status: "planned", blurb: "Keep signals a sane size: batch norm and layer norm." },
    { num: 27, slug: "27-dropout", title: "Dropout and other regularization tricks", status: "planned", blurb: "Randomly switch off neurons so none become crutches." },
    { num: 28, slug: "28-cnns", title: "Convolutional neural networks", status: "planned", blurb: "Slide small filters over images to find patterns anywhere." },
    { num: 29, slug: "29-rnns", title: "Recurrent networks and LSTMs", status: "planned", blurb: "Networks with memory for sequences." },
    { num: 30, slug: "30-embeddings", title: "Embeddings: meaning as vectors", status: "planned", blurb: "Similar things end up close together in space." }
  ] },
  { part: "Part 3 · Language models and transformers", lessons: [
    { num: 31, slug: "31-tokenization", title: "Tokenization", status: "planned", blurb: "How text is chopped into pieces a model can count." },
    { num: 32, slug: "32-word2vec", title: "Word embeddings (word2vec)", status: "planned", blurb: "Learn word meaning from the company words keep." },
    { num: 33, slug: "33-seq2seq", title: "Sequence-to-sequence and the bottleneck", status: "planned", blurb: "Squeezing a whole sentence into one vector, and why it breaks." },
    { num: 34, slug: "34-attention", title: "The attention mechanism", status: "planned", blurb: "Let the model look back at every input word." },
    { num: 35, slug: "35-self-attention", title: "Self-attention: queries, keys and values", status: "planned", blurb: "Every token asks every other token what matters." },
    { num: 36, slug: "36-multihead", title: "Multi-head attention and positional encoding", status: "planned", blurb: "Several attention patterns at once, plus a sense of order." },
    { num: 37, slug: "37-transformer-block", title: "The transformer block, assembled", status: "planned", blurb: "Attention, feed-forward, residuals and norms in one unit." },
    { num: 38, slug: "38-language-modelling", title: "Language modelling: predicting the next token", status: "planned", blurb: "The single training task behind chatbots." },
    { num: 39, slug: "39-scaling", title: "Pretraining at scale and scaling laws", status: "planned", blurb: "What happens as models, data and compute grow." },
    { num: 40, slug: "40-decoding", title: "Decoding: greedy, temperature, top-k, top-p", status: "planned", blurb: "Turning next-token probabilities into text." },
    { num: 41, slug: "41-fine-tuning", title: "Fine-tuning", status: "planned", blurb: "Adapt a pretrained model to a narrower job." },
    { num: 42, slug: "42-rlhf", title: "Instruction tuning and RLHF", status: "planned", blurb: "Teach a model to follow instructions and be helpful." },
    { num: 43, slug: "43-prompting", title: "Prompting and in-context learning", status: "planned", blurb: "Steer a model with examples inside the prompt." },
    { num: 44, slug: "44-context-windows", title: "Context windows and their limits", status: "planned", blurb: "How much a model can read at once, and what it forgets." },
    { num: 45, slug: "45-hallucinations", title: "Hallucinations", status: "planned", blurb: "Why fluent models make things up." }
  ] },
  { part: "Part 4 · Building with AI", lessons: [
    { num: 46, slug: "46-semantic-search", title: "Embeddings for semantic search", status: "planned", blurb: "Search by meaning instead of keywords." },
    { num: 47, slug: "47-vector-databases", title: "Vector databases", status: "planned", blurb: "Find nearest neighbours among millions of vectors, fast." },
    { num: 48, slug: "48-rag", title: "Retrieval-augmented generation (RAG)", status: "planned", blurb: "Look things up first, then answer." },
    { num: 49, slug: "49-tool-use", title: "Tool use and function calling", status: "planned", blurb: "Let a model call your code." },
    { num: 50, slug: "50-agents", title: "AI agents", status: "planned", blurb: "Models that plan, act and check their work in a loop." },
    { num: 51, slug: "51-evals", title: "Evaluating LLM applications", status: "planned", blurb: "Measure a system whose outputs are open-ended text." },
    { num: 52, slug: "52-efficiency", title: "Quantization, distillation and LoRA", status: "planned", blurb: "Make big models cheaper to run and tune." }
  ] },
  { part: "Part 5 · Beyond text", lessons: [
    { num: 53, slug: "53-vit", title: "Vision transformers", status: "planned", blurb: "Treat an image as a sequence of patches." },
    { num: 54, slug: "54-vae-gan", title: "Generative models: VAEs and GANs", status: "planned", blurb: "Learn to create new examples, not just label them." },
    { num: 55, slug: "55-diffusion", title: "Diffusion models", status: "planned", blurb: "Generate images by removing noise step by step." },
    { num: 56, slug: "56-multimodal", title: "Multimodal models", status: "planned", blurb: "One model for text, images and audio." },
    { num: 57, slug: "57-rl", title: "Reinforcement learning basics", status: "planned", blurb: "Learn from rewards by trial and error." },
    { num: 58, slug: "58-safety", title: "Safety, alignment and bias", status: "planned", blurb: "Making models do what we actually want, fairly." },
    { num: 59, slug: "59-interpretability", title: "Interpretability", status: "planned", blurb: "Looking inside a model to see how it works." },
    { num: 60, slug: "60-review", title: "Where the field is heading", status: "planned", blurb: "Open problems, plus a review of the whole path." }
  ] }
];
