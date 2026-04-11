import { Topic } from "@/types";

export const graphs: Topic = {
  slug: "graphs",
  title: "Graphs",
  description: "BFS, DFS, shortest paths, topological sort, union-find, and advanced graph algorithms",
  icon: "Share2",
  totalProblems: 0,
  patterns: [
    {
      id: "graph-bfs-dfs",
      title: "BFS & DFS",
      tagline: "Foundation of graph traversal — explore level-by-level or depth-first",
      recognitionTips: ["Problem involves traversing a grid or adjacency list", "Need to find connected components or reachability", "Phrases like 'number of islands', 'flood fill', 'surrounded regions'", "Shortest path in unweighted graph → BFS"],
      proTips: ["BFS guarantees shortest path in unweighted graphs", "Use visited set to avoid infinite loops in cyclic graphs", "For grids, directions array simplifies neighbor traversal: {{0,1},{0,-1},{1,0},{-1,0}}"],
      approach: "BFS: Use a queue for level-by-level exploration — ideal for shortest paths. DFS: Use recursion or stack for deep exploration — ideal for connected components, cycle detection, and path finding.",
      templateCode: `// Number of Islands — BFS
public int numIslands(char[][] grid) {
    int count = 0;
    int rows = grid.length, cols = grid[0].length;
    int[][] directions = {{0,1},{0,-1},{1,0},{-1,0}};
    for (int i = 0; i < rows; i++) {
        for (int j = 0; j < cols; j++) {
            if (grid[i][j] == '1') {
                count++;
                Queue<int[]> queue = new LinkedList<>();
                queue.offer(new int[]{i, j});
                grid[i][j] = '0'; // Why: mark visited
                while (!queue.isEmpty()) {
                    int[] cell = queue.poll();
                    for (int[] dir : directions) {
                        int nr = cell[0] + dir[0], nc = cell[1] + dir[1];
                        if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] == '1') {
                            grid[nr][nc] = '0';
                            queue.offer(new int[]{nr, nc});
                        }
                    }
                }
            }
        }
    }
    return count;
}`,
      cppTemplate: `// Number of Islands — BFS
int numIslands(vector<vector<char>>& grid) {
    int count = 0;
    int rows = grid.size(), cols = grid[0].size();
    vector<pair<int, int>> directions = {{0, 1}, {0, -1}, {1, 0}, {-1, 0}};
    for (int i = 0; i < rows; i++) {
        for (int j = 0; j < cols; j++) {
            if (grid[i][j] == '1') {
                count++;
                queue<pair<int, int>> q;
                q.push({i, j});
                grid[i][j] = '0'; // Why: mark visited
                while (!q.empty()) {
                    auto [r, c] = q.front();
                    q.pop();
                    for (auto& dir : directions) {
                        int nr = r + dir.first, nc = c + dir.second;
                        if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] == '1') {
                            grid[nr][nc] = '0';
                            q.push({nr, nc});
                        }
                    }
                }
            }
        }
    }
    return count;
}`,
      timeComplexity: "O(V + E)",
      spaceComplexity: "O(V)",
      problems: [
        { id: "gr-num-islands", title: "Number of Islands", platform: "leetcode", url: "https://leetcode.com/problems/number-of-islands/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Google", "Facebook", "Microsoft"] },
        { id: "gr-flood-fill", title: "Flood Fill", platform: "leetcode", url: "https://leetcode.com/problems/flood-fill/", difficulty: "easy", isStandard: true, companies: ["Amazon", "Google"] },
        { id: "gr-clone-graph", title: "Clone Graph", platform: "leetcode", url: "https://leetcode.com/problems/clone-graph/", difficulty: "medium", isStandard: true, companies: ["Facebook", "Amazon", "Google"] },
        { id: "gr-surrounded", title: "Surrounded Regions", platform: "leetcode", url: "https://leetcode.com/problems/surrounded-regions/", difficulty: "medium", isStandard: true, companies: ["Google", "Amazon"] },
        { id: "gr-pacific-atlantic", title: "Pacific Atlantic Water Flow", platform: "leetcode", url: "https://leetcode.com/problems/pacific-atlantic-water-flow/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Google"] },
        { id: "gr-rotting-oranges", title: "Rotting Oranges", platform: "leetcode", url: "https://leetcode.com/problems/rotting-oranges/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Microsoft", "Google"] },
        { id: "gr-walls-gates", title: "Walls and Gates", platform: "leetcode", url: "https://leetcode.com/problems/walls-and-gates/", difficulty: "medium", isStandard: true, companies: ["Facebook", "Google", "Amazon"] },
        { id: "gr-open-lock", title: "Open the Lock", platform: "leetcode", url: "https://leetcode.com/problems/open-the-lock/", difficulty: "medium", isStandard: true, companies: ["Google", "Amazon"] },
        { id: "gr-word-ladder", title: "Word Ladder", platform: "leetcode", url: "https://leetcode.com/problems/word-ladder/", difficulty: "hard", isStandard: true, companies: ["Amazon", "Facebook", "Google", "Microsoft"] }
      ]
    },
    {
      id: "topological-sort",
      title: "Topological Sort",
      tagline: "Linear ordering of vertices in a DAG respecting all edge directions",
      recognitionTips: ["Problem involves ordering tasks with prerequisites", "Phrases like 'course schedule', 'build order', 'dependency resolution'", "Need to detect cycles in a directed graph", "Ordering where A must come before B"],
      proTips: ["Two approaches: Kahn's (BFS with in-degree) and DFS-based", "If topo sort result has fewer nodes than total, a cycle exists", "Kahn's naturally detects cycles; with DFS, use coloring (white/gray/black)"],
      approach: "Kahn's algorithm: Find all nodes with in-degree 0, add to queue. Process each node, reduce in-degree of neighbors. If neighbor's in-degree becomes 0, add to queue. Repeat until queue is empty.",
      templateCode: `// Topological Sort — Kahn's Algorithm (BFS)
public int[] topologicalSort(int numCourses, int[][] prerequisites) {
    List<List<Integer>> adjList = new ArrayList<>();
    int[] inDegree = new int[numCourses];
    for (int i = 0; i < numCourses; i++) adjList.add(new ArrayList<>());
    for (int[] prereq : prerequisites) {
        adjList.get(prereq[1]).add(prereq[0]);
        inDegree[prereq[0]]++;
    }
    Queue<Integer> queue = new LinkedList<>();
    for (int i = 0; i < numCourses; i++)
        if (inDegree[i] == 0) queue.offer(i);
    int[] order = new int[numCourses];
    int index = 0;
    while (!queue.isEmpty()) {
        int node = queue.poll();
        order[index++] = node;
        for (int neighbor : adjList.get(node)) {
            if (--inDegree[neighbor] == 0) queue.offer(neighbor);
        }
    }
    // Why: if index != numCourses, cycle exists
    return index == numCourses ? order : new int[0];
}`,
      cppTemplate: `// Topological Sort — Kahn's Algorithm (BFS)
vector<int> topologicalSort(int numCourses, vector<vector<int>>& prerequisites) {
    vector<vector<int>> adjList;
    vector<int> inDegree(numCourses);
    for (int i = 0; i < numCourses; i++) adjList.push_back({});
    for (vector<int>& prereq : prerequisites) {
        adjList[prereq[1]].push_back(prereq[0]);
        inDegree[prereq[0]]++;
    }
    queue<int> queue;
    for (int i = 0; i < numCourses; i++)
        if (inDegree[i] == 0) queue.push(i);
    vector<int> order(numCourses);
    int index = 0;
    while (!queue.empty()) {
        int node = queue.front();
        queue.pop();
        order[index++] = node;
        for (int neighbor : adjList[node]) {
            if (--inDegree[neighbor] == 0) queue.push(neighbor);
        }
    }
    // Why: if index != numCourses, cycle exists
    return index == numCourses ? order : vector<int>{};
}`,
      timeComplexity: "O(V + E)",
      spaceComplexity: "O(V + E)",
      problems: [
        { id: "gr-course-schedule", title: "Course Schedule", platform: "leetcode", url: "https://leetcode.com/problems/course-schedule/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Facebook", "Google", "Microsoft"] },
        { id: "gr-course-schedule-ii", title: "Course Schedule II", platform: "leetcode", url: "https://leetcode.com/problems/course-schedule-ii/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Facebook", "Google"] },
        { id: "gr-alien-dict", title: "Alien Dictionary", platform: "leetcode", url: "https://leetcode.com/problems/alien-dictionary/", difficulty: "hard", isStandard: true, companies: ["Facebook", "Amazon", "Google", "Microsoft"] },
        { id: "gr-min-height-trees", title: "Minimum Height Trees", platform: "leetcode", url: "https://leetcode.com/problems/minimum-height-trees/", difficulty: "medium", isStandard: true, companies: ["Google", "Amazon"] },
        { id: "gr-parallel-courses", title: "Parallel Courses", platform: "leetcode", url: "https://leetcode.com/problems/parallel-courses/", difficulty: "medium", isStandard: false, companies: ["Google"] },
        { id: "gr-sequence-reconstruct", title: "Sequence Reconstruction", platform: "leetcode", url: "https://leetcode.com/problems/sequence-reconstruction/", difficulty: "medium", isStandard: false, companies: ["Google", "Amazon"] },
        { id: "gr-longest-path-dag", title: "Longest Increasing Path in a Matrix", platform: "leetcode", url: "https://leetcode.com/problems/longest-increasing-path-in-a-matrix/", difficulty: "hard", isStandard: true, companies: ["Google", "Amazon", "Facebook"] },
        { id: "gr-find-safe-states", title: "Find Eventual Safe States", platform: "leetcode", url: "https://leetcode.com/problems/find-eventual-safe-states/", difficulty: "medium", isStandard: false, companies: ["Google"] }
      ]
    },
    {
      id: "union-find",
      title: "Union-Find / DSU",
      tagline: "Disjoint Set Union for dynamic connectivity and component tracking",
      recognitionTips: ["Problem involves grouping or merging connected components", "Dynamic connectivity — edges added over time", "Phrases like 'connected components', 'redundant connection', 'accounts merge'", "Need to check if two elements belong to the same group"],
      proTips: ["Path compression + union by rank gives near O(1) amortized per operation", "Always union the smaller tree under the larger one (union by rank)", "For counting components, start with n components and decrement on each successful union"],
      approach: "Maintain a parent array for each element. find() traces to the root with path compression. union() merges two sets by connecting roots (by rank). Near O(α(n)) amortized per operation.",
      templateCode: `// Union-Find with Path Compression and Union by Rank
class UnionFind {
    int[] parent, rank;
    int components;
    UnionFind(int n) {
        parent = new int[n]; rank = new int[n]; components = n;
        for (int i = 0; i < n; i++) parent[i] = i;
    }
    int find(int x) {
        if (parent[x] != x) parent[x] = find(parent[x]); // Why: path compression
        return parent[x];
    }
    boolean union(int x, int y) {
        int rootX = find(x), rootY = find(y);
        if (rootX == rootY) return false; // Why: already connected
        if (rank[rootX] < rank[rootY]) { int temp = rootX; rootX = rootY; rootY = temp; }
        parent[rootY] = rootX; // Why: attach smaller tree under larger
        if (rank[rootX] == rank[rootY]) rank[rootX]++;
        components--;
        return true;
    }
}`,
      cppTemplate: `// Union-Find with Path Compression and Union by Rank
class UnionFind {
public:
    vector<int> parent, rank;
    int components;
    
    UnionFind(int n) : parent(n), rank(n, 0), components(n) {
        for (int i = 0; i < n; i++) parent[i] = i;
    }
    
    int find(int x) {
        if (parent[x] != x) parent[x] = find(parent[x]); // Why: path compression
        return parent[x];
    }
    
    bool unionSets(int x, int y) {
        int rootX = find(x), rootY = find(y);
        if (rootX == rootY) return false; // Why: already connected
        if (rank[rootX] < rank[rootY]) swap(rootX, rootY);
        parent[rootY] = rootX; // Why: attach smaller tree under larger
        if (rank[rootX] == rank[rootY]) rank[rootX]++;
        components--;
        return true;
    }
}`,
      timeComplexity: "O(α(n)) amortized per operation",
      spaceComplexity: "O(n)",
      problems: [
        { id: "gr-num-provinces", title: "Number of Provinces", platform: "leetcode", url: "https://leetcode.com/problems/number-of-provinces/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Facebook", "Microsoft"] },
        { id: "gr-redundant-conn", title: "Redundant Connection", platform: "leetcode", url: "https://leetcode.com/problems/redundant-connection/", difficulty: "medium", isStandard: true, companies: ["Google", "Amazon"] },
        { id: "gr-accounts-merge", title: "Accounts Merge", platform: "leetcode", url: "https://leetcode.com/problems/accounts-merge/", difficulty: "medium", isStandard: true, companies: ["Facebook", "Amazon", "Google"] },
        { id: "gr-graph-valid-tree", title: "Graph Valid Tree", platform: "leetcode", url: "https://leetcode.com/problems/graph-valid-tree/", difficulty: "medium", isStandard: true, companies: ["Google", "Facebook", "Amazon"] },
        { id: "gr-num-connected", title: "Number of Connected Components in an Undirected Graph", platform: "leetcode", url: "https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/", difficulty: "medium", isStandard: true, companies: ["Google", "Facebook"] },
        { id: "gr-earliest-moment", title: "The Earliest Moment When Everyone Become Friends", platform: "leetcode", url: "https://leetcode.com/problems/the-earliest-moment-when-everyone-become-friends/", difficulty: "medium", isStandard: false, companies: ["Facebook"] },
        { id: "gr-most-stones", title: "Most Stones Removed with Same Row or Column", platform: "leetcode", url: "https://leetcode.com/problems/most-stones-removed-with-same-row-or-column/", difficulty: "medium", isStandard: false, companies: ["Google", "Amazon"] },
        { id: "gr-swim-in-water", title: "Swim in Rising Water", platform: "leetcode", url: "https://leetcode.com/problems/swim-in-rising-water/", difficulty: "hard", isStandard: false, companies: ["Google"] }
      ]
    },
    {
      id: "dijkstras",
      title: "Dijkstra's Algorithm",
      tagline: "Single-source shortest path for non-negative weighted graphs",
      recognitionTips: ["Weighted graph with non-negative edges", "Find shortest path/distance from source to all nodes", "Phrases like 'minimum cost path', 'cheapest flights', 'network delay time'", "Cannot use BFS because edges have different weights"],
      proTips: ["Use a min-heap (PriorityQueue) for efficient extraction of minimum distance node", "Skip processing a node if it's already been finalized (distance in heap > known distance)", "Does NOT work with negative edge weights — use Bellman-Ford for that"],
      approach: "Start from source with distance 0. Use a min-heap. Extract the node with smallest distance, relax all its neighbors. If a shorter path to a neighbor is found, update and add to heap.",
      templateCode: `// Dijkstra's — Network Delay Time
public int networkDelayTime(int[][] times, int n, int k) {
    List<List<int[]>> graph = new ArrayList<>();
    for (int i = 0; i <= n; i++) graph.add(new ArrayList<>());
    for (int[] t : times) graph.get(t[0]).add(new int[]{t[1], t[2]});
    int[] dist = new int[n + 1];
    Arrays.fill(dist, Integer.MAX_VALUE);
    dist[k] = 0;
    // Why: min-heap ordered by distance
    PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> a[1] - b[1]);
    pq.offer(new int[]{k, 0});
    while (!pq.isEmpty()) {
        int[] curr = pq.poll();
        int node = curr[0], d = curr[1];
        if (d > dist[node]) continue; // Why: stale entry, skip
        for (int[] edge : graph.get(node)) {
            int newDist = d + edge[1];
            if (newDist < dist[edge[0]]) {
                dist[edge[0]] = newDist;
                pq.offer(new int[]{edge[0], newDist});
            }
        }
    }
    int maxDist = 0;
    for (int i = 1; i <= n; i++) maxDist = Math.max(maxDist, dist[i]);
    return maxDist == Integer.MAX_VALUE ? -1 : maxDist;
}`,
      cppTemplate: `// Dijkstra's — Network Delay Time
int networkDelayTime(vector<vector<int>>& times, int n, int k) {
    vector<vector<pair<int, int>>> graph(n + 1);
    for (vector<int>& t : times) graph[t[0]].push_back({t[1], t[2]});
    vector<int> dist(n + 1, INT_MAX);
    dist[k] = 0;
    // Why: min-heap ordered by distance
    priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> pq;
    pq.push({0, k});
    while (!pq.empty()) {
        auto [d, node] = pq.top();
        pq.pop();
        if (d > dist[node]) continue; // Why: stale entry, skip
        for (auto& edge : graph[node]) {
            int neighbor = edge.first, weight = edge.second;
            int newDist = d + weight;
            if (newDist < dist[neighbor]) {
                dist[neighbor] = newDist;
                pq.push({newDist, neighbor});
            }
        }
    }
    int maxDist = 0;
    for (int i = 1; i <= n; i++) maxDist = max(maxDist, dist[i]);
    return maxDist == INT_MAX ? -1 : maxDist;
}`,
      timeComplexity: "O((V + E) log V)",
      spaceComplexity: "O(V + E)",
      problems: [
        { id: "gr-network-delay", title: "Network Delay Time", platform: "leetcode", url: "https://leetcode.com/problems/network-delay-time/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Google", "Facebook"] },
        { id: "gr-cheapest-flights", title: "Cheapest Flights Within K Stops", platform: "leetcode", url: "https://leetcode.com/problems/cheapest-flights-within-k-stops/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Google", "Facebook"] },
        { id: "gr-path-max-prob", title: "Path with Maximum Probability", platform: "leetcode", url: "https://leetcode.com/problems/path-with-maximum-probability/", difficulty: "medium", isStandard: false, companies: ["Google"] },
        { id: "gr-min-effort-path", title: "Path With Minimum Effort", platform: "leetcode", url: "https://leetcode.com/problems/path-with-minimum-effort/", difficulty: "medium", isStandard: true, companies: ["Google", "Amazon", "Facebook"] },
        { id: "gr-shortest-path-alt", title: "Shortest Path with Alternating Colors", platform: "leetcode", url: "https://leetcode.com/problems/shortest-path-with-alternating-colors/", difficulty: "medium", isStandard: false, companies: ["Google"] },
        { id: "gr-min-cost-connect", title: "Connecting Cities With Minimum Cost", platform: "leetcode", url: "https://leetcode.com/problems/connecting-cities-with-minimum-cost/", difficulty: "medium", isStandard: false, companies: ["Amazon"] },
        { id: "gr-shortest-path-grid", title: "Shortest Path in a Grid with Obstacles Elimination", platform: "leetcode", url: "https://leetcode.com/problems/shortest-path-in-a-grid-with-obstacles-elimination/", difficulty: "hard", isStandard: true, companies: ["Google", "Amazon"] },
        { id: "gr-min-cost-reach", title: "Minimum Cost to Reach Destination in Time", platform: "leetcode", url: "https://leetcode.com/problems/minimum-cost-to-reach-destination-in-time/", difficulty: "hard", isStandard: false, companies: ["Google"] }
      ]
    },
    {
      id: "bellman-ford",
      title: "Bellman-Ford",
      tagline: "Shortest paths with negative weights and negative cycle detection",
      recognitionTips: ["Graph may have negative edge weights", "Need to detect negative cycles", "Limited number of edges/stops in path (k stops)", "Phrases like 'cheapest flights with at most K stops'"],
      proTips: ["Relax all edges V-1 times — one more relaxation iteration detects negative cycles", "For K stops limit, run exactly K+1 iterations using a copy of distances", "Slower than Dijkstra O(VE) but handles negative weights"],
      approach: "Initialize distances to infinity except source (0). Repeat V-1 times: for every edge (u,v,w), if dist[u] + w < dist[v], update dist[v]. After V-1 iterations, one more pass detects negative cycles.",
      templateCode: `// Bellman-Ford — Cheapest Flights Within K Stops
public int findCheapestPrice(int n, int[][] flights, int src, int dst, int k) {
    int[] prices = new int[n];
    Arrays.fill(prices, Integer.MAX_VALUE);
    prices[src] = 0;
    // Why: k stops means at most k+1 edges
    for (int i = 0; i <= k; i++) {
        int[] temp = Arrays.copyOf(prices, n); // Why: use previous iteration's values
        for (int[] flight : flights) {
            int from = flight[0], to = flight[1], cost = flight[2];
            if (prices[from] != Integer.MAX_VALUE) {
                temp[to] = Math.min(temp[to], prices[from] + cost);
            }
        }
        prices = temp;
    }
    return prices[dst] == Integer.MAX_VALUE ? -1 : prices[dst];
}`,
      cppTemplate: `// Bellman-Ford — Cheapest Flights Within K Stops
int findCheapestPrice(int n, vector<vector<int>>& flights, int src, int dst, int k) {
    vector<int> prices(n, INT_MAX);
    prices[src] = 0;
    // Why: k stops means at most k+1 edges
    for (int i = 0; i <= k; i++) {
        vector<int> temp = prices; // Why: use previous iteration's values
        for (vector<int>& flight : flights) {
            int from = flight[0], to = flight[1], cost = flight[2];
            if (prices[from] != INT_MAX) {
                temp[to] = min(temp[to], prices[from] + cost);
            }
        }
        prices = temp;
    }
    return prices[dst] == INT_MAX ? -1 : prices[dst];
}`,
      timeComplexity: "O(V * E)",
      spaceComplexity: "O(V)",
      problems: [
        { id: "gr-cheapest-k-bf", title: "Cheapest Flights Within K Stops", platform: "leetcode", url: "https://leetcode.com/problems/cheapest-flights-within-k-stops/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Google", "Facebook"] },
        { id: "gr-neg-cycle-gfg", title: "Negative Weight Cycle Detection", platform: "gfg", url: "https://www.geeksforgeeks.org/detect-negative-cycle-graph-bellman-ford/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Goldman Sachs"] },
        { id: "gr-network-delay-bf", title: "Network Delay Time (Bellman-Ford)", platform: "leetcode", url: "https://leetcode.com/problems/network-delay-time/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Google"] },
        { id: "gr-shortest-dist-gfg", title: "Shortest Path in Undirected Graph", platform: "gfg", url: "https://www.geeksforgeeks.org/shortest-path-unweighted-graph/", difficulty: "medium", isStandard: false, companies: ["Amazon"] },
        { id: "gr-min-cost-all-nodes", title: "Find the City With Smallest Number of Neighbors", platform: "leetcode", url: "https://leetcode.com/problems/find-the-city-with-the-smallest-number-of-neighbors-at-a-threshold-distance/", difficulty: "medium", isStandard: false, companies: ["Google"] },
        { id: "gr-max-network-rank", title: "Maximal Network Rank", platform: "leetcode", url: "https://leetcode.com/problems/maximal-network-rank/", difficulty: "medium", isStandard: false, companies: ["Amazon"] },
        { id: "gr-evaluate-division", title: "Evaluate Division", platform: "leetcode", url: "https://leetcode.com/problems/evaluate-division/", difficulty: "medium", isStandard: true, companies: ["Google", "Facebook", "Amazon"] },
        { id: "gr-keys-rooms", title: "Keys and Rooms", platform: "leetcode", url: "https://leetcode.com/problems/keys-and-rooms/", difficulty: "medium", isStandard: false, companies: ["Amazon"] }
      ]
    },
    {
      id: "floyd-warshall",
      title: "Floyd-Warshall",
      tagline: "All-pairs shortest paths using dynamic programming",
      recognitionTips: ["Need shortest path between ALL pairs of nodes", "Small graph (n ≤ 400) where O(n³) is acceptable", "Phrases like 'city with smallest number of reachable neighbors'", "Transitive closure or reachability matrix problems"],
      proTips: ["O(n³) — only suitable for small graphs", "Can detect negative cycles: if dist[i][i] < 0 after running", "Initialize dist[i][j] = weight if edge exists, infinity otherwise, dist[i][i] = 0"],
      approach: "For each intermediate node k, for each pair (i, j), check if path i→k→j is shorter than current i→j path. Three nested loops over all vertices.",
      templateCode: `// Floyd-Warshall — All-Pairs Shortest Path
public int[][] floydWarshall(int n, int[][] edges) {
    int INF = (int) 1e9;
    int[][] dist = new int[n][n];
    for (int[] row : dist) Arrays.fill(row, INF);
    for (int i = 0; i < n; i++) dist[i][i] = 0;
    for (int[] e : edges) dist[e[0]][e[1]] = e[2];
    // Why: try every possible intermediate vertex k
    for (int k = 0; k < n; k++)
        for (int i = 0; i < n; i++)
            for (int j = 0; j < n; j++)
                if (dist[i][k] + dist[k][j] < dist[i][j])
                    dist[i][j] = dist[i][k] + dist[k][j];
    return dist;
}`,
      cppTemplate: `// Floyd-Warshall — All-Pairs Shortest Path
vector<vector<int>> floydWarshall(int n, vector<vector<int>>& edges) {
    int INF = (int) 1e9;
    vector<vector<int>> dist(n, vector<int>(n));
    for (vector<int>& row : dist) fill(row.begin(), row.end(), INF);
    for (int i = 0; i < n; i++) dist[i][i] = 0;
    for (vector<int>& e : edges) dist[e[0]][e[1]] = e[2];
    // Why: try every possible intermediate vertex k
    for (int k = 0; k < n; k++)
        for (int i = 0; i < n; i++)
            for (int j = 0; j < n; j++)
                if (dist[i][k] + dist[k][j] < dist[i][j])
                    dist[i][j] = dist[i][k] + dist[k][j];
    return dist;
}`,
      timeComplexity: "O(V³)",
      spaceComplexity: "O(V²)",
      problems: [
        { id: "gr-city-threshold", title: "Find the City With Smallest Number of Neighbors at Threshold", platform: "leetcode", url: "https://leetcode.com/problems/find-the-city-with-the-smallest-number-of-neighbors-at-a-threshold-distance/", difficulty: "medium", isStandard: true, companies: ["Google", "Amazon"] },
        { id: "gr-evaluate-div-fw", title: "Evaluate Division", platform: "leetcode", url: "https://leetcode.com/problems/evaluate-division/", difficulty: "medium", isStandard: true, companies: ["Google", "Facebook"] },
        { id: "gr-course-schedule-iv", title: "Course Schedule IV", platform: "leetcode", url: "https://leetcode.com/problems/course-schedule-iv/", difficulty: "medium", isStandard: false, companies: ["Google"] },
        { id: "gr-shortest-path-query", title: "Shortest Path Queries", platform: "gfg", url: "https://www.geeksforgeeks.org/floyd-warshall-algorithm-dp-16/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Goldman Sachs"] },
        { id: "gr-count-reachable", title: "Count Reachable Nodes", platform: "gfg", url: "https://www.geeksforgeeks.org/transitive-closure-of-a-graph/", difficulty: "medium", isStandard: false, companies: ["Amazon"] },
        { id: "gr-graph-connectivity", title: "Graph Connectivity With Threshold", platform: "leetcode", url: "https://leetcode.com/problems/graph-connectivity-with-threshold/", difficulty: "hard", isStandard: false, companies: ["Google"] },
        { id: "gr-min-cost-all-fw", title: "Minimum Cost to Convert String I", platform: "leetcode", url: "https://leetcode.com/problems/minimum-cost-to-convert-string-i/", difficulty: "medium", isStandard: false, companies: ["Google"] },
        { id: "gr-is-graph-bipartite", title: "Is Graph Bipartitex", platform: "leetcode", url: "https://leetcode.com/problems/is-graph-bipartite/", difficulty: "medium", isStandard: true, companies: ["Facebook", "Amazon"] }
      ]
    },
    {
      id: "bridges-articulation",
      title: "Bridges & Articulation Points",
      tagline: "Find critical edges and vertices whose removal disconnects the graph",
      recognitionTips: ["Need to find edges/nodes whose removal increases connected components", "Critical connections or single points of failure", "Network reliability analysis", "Phrases like 'critical connections in a network'"],
      proTips: ["Uses Tarjan's algorithm with discovery time and low values", "Bridge: edge (u,v) where low[v] > disc[u]", "Articulation point: node u where low[child] >= disc[u] (or root with 2+ children)"],
      approach: "Perform DFS tracking discovery time and low values. low[u] = minimum discovery time reachable from subtree of u. If low[v] > disc[u], edge (u,v) is a bridge. If low[v] >= disc[u], u is an articulation point.",
      templateCode: `// Critical Connections — Tarjan's Bridge Finding
int timer = 0;
public List<List<Integer>> criticalConnections(int n, List<List<Integer>> connections) {
    List<List<Integer>> graph = new ArrayList<>(), result = new ArrayList<>();
    int[] disc = new int[n], low = new int[n];
    boolean[] visited = new boolean[n];
    for (int i = 0; i < n; i++) graph.add(new ArrayList<>());
    for (List<Integer> conn : connections) {
        graph.get(conn.get(0)).add(conn.get(1));
        graph.get(conn.get(1)).add(conn.get(0));
    }
    dfs(0, -1, disc, low, visited, graph, result);
    return result;
}
void dfs(int u, int parent, int[] disc, int[] low, boolean[] visited,
         List<List<Integer>> graph, List<List<Integer>> result) {
    visited[u] = true;
    disc[u] = low[u] = timer++;
    for (int v : graph.get(u)) {
        if (v == parent) continue;
        if (!visited[v]) {
            dfs(v, u, disc, low, visited, graph, result);
            low[u] = Math.min(low[u], low[v]);
            if (low[v] > disc[u]) result.add(Arrays.asList(u, v));
        } else {
            low[u] = Math.min(low[u], disc[v]);
        }
    }
}`,
      cppTemplate: `// Critical Connections — Tarjan's Bridge Finding
int timer = 0;
void dfs(int u, int parent, vector<int>& disc, vector<int>& low, vector<bool>& visited,
         vector<vector<int>>& graph, vector<vector<int>>& result) {
    visited[u] = true;
    disc[u] = low[u] = timer++;
    for (int v : graph[u]) {
        if (v == parent) continue;
        if (!visited[v]) {
            dfs(v, u, disc, low, visited, graph, result);
            low[u] = min(low[u], low[v]);
            if (low[v] > disc[u]) result.push_back({u, v});
        } else {
            low[u] = min(low[u], disc[v]);
        }
    }
}
vector<vector<int>> criticalConnections(int n, vector<vector<int>>& connections) {
    timer = 0;
    vector<vector<int>> graph(n), result;
    vector<int> disc(n, -1), low(n, -1);
    vector<bool> visited(n, false);
    for (vector<int>& conn : connections) {
        graph[conn[0]].push_back(conn[1]);
        graph[conn[1]].push_back(conn[0]);
    }
    for (int i = 0; i < n; i++) {
        if (!visited[i]) dfs(i, -1, disc, low, visited, graph, result);
    }
    return result;
}`,
      timeComplexity: "O(V + E)",
      spaceComplexity: "O(V + E)",
      problems: [
        { id: "gr-critical-conn", title: "Critical Connections in a Network", platform: "leetcode", url: "https://leetcode.com/problems/critical-connections-in-a-network/", difficulty: "hard", isStandard: true, companies: ["Amazon", "Google"] },
        { id: "gr-articulation-pts-gfg", title: "Articulation Points in a Graph", platform: "gfg", url: "https://www.geeksforgeeks.org/articulation-points-or-cut-vertices-in-a-graph/", difficulty: "hard", isStandard: true, companies: ["Amazon", "Google", "Goldman Sachs"] },
        { id: "gr-bridges-gfg", title: "Bridges in a Graph", platform: "gfg", url: "https://www.geeksforgeeks.org/bridge-in-a-graph/", difficulty: "hard", isStandard: true, companies: ["Amazon", "Google"] },
        { id: "gr-remove-max-edges", title: "Remove Max Number of Edges to Keep Graph Fully Traversable", platform: "leetcode", url: "https://leetcode.com/problems/remove-max-number-of-edges-to-keep-graph-fully-traversable/", difficulty: "hard", isStandard: false, companies: ["Google"] },
        { id: "gr-min-days-disconnect", title: "Minimum Number of Days to Disconnect Island", platform: "leetcode", url: "https://leetcode.com/problems/minimum-number-of-days-to-disconnect-island/", difficulty: "hard", isStandard: false, companies: ["Google"] },
        { id: "gr-network-connected", title: "Number of Operations to Make Network Connected", platform: "leetcode", url: "https://leetcode.com/problems/number-of-operations-to-make-network-connected/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Microsoft"] },
        { id: "gr-euler-path-gfg", title: "Eulerian Path and Circuit", platform: "gfg", url: "https://www.geeksforgeeks.org/eulerian-path-and-circuit/", difficulty: "medium", isStandard: false, companies: ["Google"] },
        { id: "gr-reconstruct-itinerary", title: "Reconstruct Itinerary", platform: "leetcode", url: "https://leetcode.com/problems/reconstruct-itinerary/", difficulty: "hard", isStandard: true, companies: ["Amazon", "Google"] }
      ]
    },
    {
      id: "scc",
      title: "Strongly Connected Components",
      tagline: "Find maximal groups where every node is reachable from every other node",
      recognitionTips: ["Need to find strongly connected components in a directed graph", "Problem involves cyclic dependencies", "Need to check mutual reachability", "Condensation graph or DAG of SCCs"],
      proTips: ["Kosaraju's: two DFS passes — first on original graph (finish order), second on reversed graph", "Tarjan's: single DFS with stack and low-link values", "After finding SCCs, the condensation graph is always a DAG"],
      approach: "Kosaraju's: 1) DFS on original graph, push to stack by finish time. 2) Transpose the graph. 3) Process vertices in stack order, DFS on transposed graph — each DFS tree is an SCC.",
      templateCode: `// Kosaraju's Algorithm for SCC
public int countSCCs(int n, List<List<Integer>> adj) {
    boolean[] visited = new boolean[n];
    Deque<Integer> stack = new ArrayDeque<>();
    // Pass 1: fill stack by finish time
    for (int i = 0; i < n; i++)
        if (!visited[i]) dfsForward(i, adj, visited, stack);
    // Transpose graph
    List<List<Integer>> reversed = new ArrayList<>();
    for (int i = 0; i < n; i++) reversed.add(new ArrayList<>());
    for (int u = 0; u < n; u++)
        for (int v : adj.get(u)) reversed.get(v).add(u);
    // Pass 2: process in reverse finish order
    Arrays.fill(visited, false);
    int sccCount = 0;
    while (!stack.isEmpty()) {
        int node = stack.pop();
        if (!visited[node]) {
            dfsReverse(node, reversed, visited);
            sccCount++;
        }
    }
    return sccCount;
}`,
      cppTemplate: `// Kosaraju's Algorithm for SCC
void dfsForward(int node, vector<vector<int>>& adj, vector<bool>& visited, stack<int>& order) {
    visited[node] = true;
    for (int neighbor : adj[node]) {
        if (!visited[neighbor]) dfsForward(neighbor, adj, visited, order);
    }
    order.push(node);
}
void dfsReverse(int node, vector<vector<int>>& reversed, vector<bool>& visited) {
    visited[node] = true;
    for (int neighbor : reversed[node]) {
        if (!visited[neighbor]) dfsReverse(neighbor, reversed, visited);
    }
}
int countSCCs(int n, vector<vector<int>>& adj) {
    vector<bool> visited(n, false);
    stack<int> order;
    // Pass 1: fill stack by finish time
    for (int i = 0; i < n; i++)
        if (!visited[i]) dfsForward(i, adj, visited, order);
    // Transpose graph
    vector<vector<int>> reversed(n);
    for (int u = 0; u < n; u++)
        for (int v : adj[u]) reversed[v].push_back(u);
    // Pass 2: process in reverse finish order
    fill(visited.begin(), visited.end(), false);
    int sccCount = 0;
    while (!order.empty()) {
        int node = order.top();
        order.pop();
        if (!visited[node]) {
            dfsReverse(node, reversed, visited);
            sccCount++;
        }
    }
    return sccCount;
}`,
      timeComplexity: "O(V + E)",
      spaceComplexity: "O(V + E)",
      problems: [
        { id: "gr-scc-kosaraju-gfg", title: "Strongly Connected Components (Kosaraju)", platform: "gfg", url: "https://www.geeksforgeeks.org/strongly-connected-components/", difficulty: "hard", isStandard: true, companies: ["Amazon", "Google"] },
        { id: "gr-scc-tarjan-gfg", title: "Strongly Connected Components (Tarjan)", platform: "gfg", url: "https://www.geeksforgeeks.org/tarjan-algorithm-find-strongly-connected-components/", difficulty: "hard", isStandard: true, companies: ["Google", "Amazon"] },
        { id: "gr-critical-conn-scc", title: "Critical Connections in a Network", platform: "leetcode", url: "https://leetcode.com/problems/critical-connections-in-a-network/", difficulty: "hard", isStandard: true, companies: ["Amazon", "Google"] },
        { id: "gr-satisfiability-2sat", title: "2-SAT Problem", platform: "gfg", url: "https://www.geeksforgeeks.org/2-satisfiability-2-sat-problem/", difficulty: "hardest", isStandard: false, companies: ["Google"] },
        { id: "gr-minimum-scc", title: "Minimum Number of Vertices to Reach All Nodes", platform: "leetcode", url: "https://leetcode.com/problems/minimum-number-of-vertices-to-reach-all-nodes/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Google"] },
        { id: "gr-all-paths-source", title: "All Paths From Source to Target", platform: "leetcode", url: "https://leetcode.com/problems/all-paths-from-source-to-target/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Google"] },
        { id: "gr-detect-cycle-directed", title: "Detect Cycle in Directed Graph", platform: "gfg", url: "https://www.geeksforgeeks.org/detect-cycle-in-a-graph/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Microsoft", "Flipkart"] },
        { id: "gr-detect-cycle-undirected", title: "Detect Cycle in Undirected Graph", platform: "gfg", url: "https://www.geeksforgeeks.org/detect-cycle-undirected-graph/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Microsoft"] }
      ]
    }
  ]
};

graphs.totalProblems = graphs.patterns.reduce((sum, p) => sum + p.problems.length, 0);
