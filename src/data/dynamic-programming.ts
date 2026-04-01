import { Topic } from "@/types";

export const dynamicProgramming: Topic = {
  slug: "dynamic-programming",
  title: "Dynamic Programming",
  description: "Break complex problems into overlapping subproblems — the ultimate interview topic",
  icon: "TableProperties",
  totalProblems: 0,
  patterns: [
    {
      id: "dp-1d-linear",
      title: "1D Linear DP",
      tagline: "Single array DP where state depends on previous elements",
      recognitionTips: [
        "Problem can be solved by building the answer from left to right, one element at a time",
        "State at index i depends only on states at i-1, i-2, or a small fixed lookback",
        "Classic keywords: 'climbing stairs', 'house robber', 'decode ways', 'tiling'",
        "You need to make a binary choice at each step: include or exclude the current element",
        "Brute force would be exponential (try all subsets), hinting at overlapping subproblems",
        "The problem has 'optimal substructure' — optimal solution contains optimal sub-solutions",
        "Fibonacci-style recurrence: each state is a combination of a fixed number of previous states",
        "Constraints suggest O(n) or O(n·k) solution — linear scan with DP transitions"
      ],
      proTips: [
        "Often space-optimizable from O(n) to O(1) by keeping only the last 2-3 values in variables",
        "Check if greedy works first — DP might be overkill for problems with greedy-optimal structure",
        "For circular variants (House Robber II), run DP twice: once excluding first element, once excluding last",
        "When the recurrence involves choices (take/skip), think of it as a 'decision at each index' problem",
        "Draw the recursion tree first to identify overlapping subproblems — memoize top-down, then convert to bottom-up",
        "Watch for off-by-one errors in base cases: dp[0] and dp[1] often need special handling"
      ],
      approach: "Define dp[i] as the answer for the first i elements. Build from dp[0] using a recurrence that depends on previous states.",
      templateCode: `// House Robber — 1D Linear DP
public int rob(int[] nums) {
    if (nums.length == 1) return nums[0];
    int prev2 = 0, prev1 = nums[0];
    for (int i = 1; i < nums.length; i++) {
        int current = Math.max(prev1, prev2 + nums[i]); // Why: rob or skip
        prev2 = prev1;
        prev1 = current;
    }
    return prev1;
}`,
      timeComplexity: "O(n)",
      spaceComplexity: "O(1) optimized",
      problems: [
        { id: "dp-climb-stairs", title: "Climbing Stairs", platform: "leetcode", url: "https://leetcode.com/problems/climbing-stairs/", difficulty: "easy", isStandard: true, companies: ["Amazon", "Google", "Microsoft", "Apple"] },
        { id: "dp-house-robber", title: "House Robber", platform: "leetcode", url: "https://leetcode.com/problems/house-robber/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Google", "Microsoft"] },
        { id: "dp-house-robber-ii", title: "House Robber II", platform: "leetcode", url: "https://leetcode.com/problems/house-robber-ii/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Google"] },
        { id: "dp-decode-ways", title: "Decode Ways", platform: "leetcode", url: "https://leetcode.com/problems/decode-ways/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Facebook", "Google", "Microsoft"] },
        { id: "dp-min-cost-climb", title: "Min Cost Climbing Stairs", platform: "leetcode", url: "https://leetcode.com/problems/min-cost-climbing-stairs/", difficulty: "easy", isStandard: true, companies: ["Amazon"] },
        { id: "dp-num-tilings", title: "Domino and Tromino Tiling", platform: "leetcode", url: "https://leetcode.com/problems/domino-and-tromino-tiling/", difficulty: "medium", isStandard: false, companies: ["Google"] },
        { id: "dp-tribonacci", title: "N-th Tribonacci Number", platform: "leetcode", url: "https://leetcode.com/problems/n-th-tribonacci-number/", difficulty: "easy", isStandard: false, companies: ["Amazon"] },
        { id: "dp-delete-earn", title: "Delete and Earn", platform: "leetcode", url: "https://leetcode.com/problems/delete-and-earn/", difficulty: "medium", isStandard: true, companies: ["Google", "Amazon"] }
      ]
    },
    {
      id: "dp-kadane",
      title: "Kadane's / Subarray DP",
      tagline: "Maximum subarray problems using DP transitions",
      recognitionTips: [
        "Maximum or minimum contiguous subarray sum is requested",
        "Problem involves finding optimal contiguous segment in an array",
        "Keywords: 'maximum subarray', 'maximum product', 'best time to buy and sell'",
        "Local-vs-global optimum decision at each element: extend or restart",
        "Array can contain negative numbers, making prefix sum non-monotonic",
        "You see phrases like 'contiguous subarray' combined with 'maximum' or 'minimum'"
      ],
      proTips: [
        "Track both max and min for product variant — multiplying two negatives gives a positive",
        "Circular variant trick: answer = max(normal Kadane, totalSum - minSubarraySum)",
        "If all elements are negative in circular case, skip the circular check (avoid empty subarray)",
        "Kadane's can be adapted for maximum sum with exactly one deletion using two DP arrays",
        "For 'best time to buy and sell stock', realize it's Kadane's applied to price differences"
      ],
      approach: "At each index, choose: extend current subarray or start new one. Track running optimum and global best.",
      templateCode: `// Maximum Product Subarray
public int maxProduct(int[] nums) {
    int maxProd = nums[0], minProd = nums[0], result = nums[0];
    for (int i = 1; i < nums.length; i++) {
        if (nums[i] < 0) { int temp = maxProd; maxProd = minProd; minProd = temp; }
        maxProd = Math.max(nums[i], maxProd * nums[i]);
        minProd = Math.min(nums[i], minProd * nums[i]);
        result = Math.max(result, maxProd);
    }
    return result;
}`,
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
      problems: [
        { id: "dp-max-subarray", title: "Maximum Subarray", platform: "leetcode", url: "https://leetcode.com/problems/maximum-subarray/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Microsoft", "Google", "Facebook"] },
        { id: "dp-max-product", title: "Maximum Product Subarray", platform: "leetcode", url: "https://leetcode.com/problems/maximum-product-subarray/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Microsoft", "Google"] },
        { id: "dp-max-sum-circular", title: "Maximum Sum Circular Subarray", platform: "leetcode", url: "https://leetcode.com/problems/maximum-sum-circular-subarray/", difficulty: "medium", isStandard: true, companies: ["Goldman Sachs", "Amazon"] },
        { id: "dp-longest-turbulent", title: "Longest Turbulent Subarray", platform: "leetcode", url: "https://leetcode.com/problems/longest-turbulent-subarray/", difficulty: "medium", isStandard: false, companies: ["Amazon"] },
        { id: "dp-max-sum-3-nonoverlap", title: "Maximum Sum of 3 Non-Overlapping Subarrays", platform: "leetcode", url: "https://leetcode.com/problems/maximum-sum-of-3-non-overlapping-subarrays/", difficulty: "hard", isStandard: true, companies: ["Google", "Facebook"] },
        { id: "dp-max-subarray-one-del", title: "Maximum Subarray Sum with One Deletion", platform: "leetcode", url: "https://leetcode.com/problems/maximum-subarray-sum-with-one-deletion/", difficulty: "hard", isStandard: true, companies: ["Microsoft"] },
        { id: "dp-k-concat-max", title: "K-Concatenation Maximum Sum", platform: "leetcode", url: "https://leetcode.com/problems/k-concatenation-maximum-sum/", difficulty: "hard", isStandard: false, companies: ["Google"] },
        { id: "dp-max-sum-2-nonoverlap", title: "Maximum Sum of Two Non-Overlapping Subarrays", platform: "leetcode", url: "https://leetcode.com/problems/maximum-sum-of-two-non-overlapping-subarrays/", difficulty: "medium", isStandard: false, companies: ["Amazon"] }
      ]
    },
    {
      id: "dp-grid",
      title: "Grid DP",
      tagline: "2D DP on grids — paths, minimum cost, and obstacle navigation",
      recognitionTips: [
        "Problem involves a 2D grid where you can typically move only right and/or down",
        "Count paths, find minimum/maximum cost path, or find largest substructure in grid",
        "Keywords: 'unique paths', 'minimum path sum', 'maximal square', 'dungeon game'",
        "You need to reach from top-left to bottom-right with some optimization goal",
        "Grid may contain obstacles (value 1 or -1) that block certain cells",
        "Matrix problems where dp[i][j] depends on dp[i-1][j] and dp[i][j-1]"
      ],
      proTips: [
        "First row and first column are base cases — only one way to reach them (straight line)",
        "Space-optimize from O(m×n) to O(n) by overwriting a single row array left-to-right",
        "For 'maximal square', dp[i][j] = min(top, left, diagonal) + 1 — a non-obvious transition",
        "Dungeon Game requires filling bottom-up (reverse direction) to ensure the knight survives",
        "If movement includes 4 directions (not just right/down), grid DP won't work — use BFS/DFS instead",
        "Triangle problem is grid DP in disguise — fill bottom-up to avoid tracking the start column"
      ],
      approach: "dp[i][j] = optimal value at cell (i,j). Fill row by row using dp[i][j] = f(dp[i-1][j], dp[i][j-1]).",
      templateCode: `// Unique Paths — Grid DP
public int uniquePaths(int m, int n) {
    int[] dp = new int[n];
    Arrays.fill(dp, 1); // Why: first row has 1 path each
    for (int i = 1; i < m; i++)
        for (int j = 1; j < n; j++)
            dp[j] += dp[j - 1]; // Why: paths from top + paths from left
    return dp[n - 1];
}`,
      timeComplexity: "O(m * n)",
      spaceComplexity: "O(n) optimized",
      problems: [
        { id: "dp-unique-paths", title: "Unique Paths", platform: "leetcode", url: "https://leetcode.com/problems/unique-paths/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Google", "Facebook"] },
        { id: "dp-unique-paths-ii", title: "Unique Paths II", platform: "leetcode", url: "https://leetcode.com/problems/unique-paths-ii/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Google"] },
        { id: "dp-min-path-sum", title: "Minimum Path Sum", platform: "leetcode", url: "https://leetcode.com/problems/minimum-path-sum/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Goldman Sachs", "Google"] },
        { id: "dp-triangle", title: "Triangle", platform: "leetcode", url: "https://leetcode.com/problems/triangle/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Microsoft"] },
        { id: "dp-dungeon-game", title: "Dungeon Game", platform: "leetcode", url: "https://leetcode.com/problems/dungeon-game/", difficulty: "hard", isStandard: true, companies: ["Google", "Amazon"] },
        { id: "dp-maximal-square", title: "Maximal Square", platform: "leetcode", url: "https://leetcode.com/problems/maximal-square/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Google", "Facebook"] },
        { id: "dp-cherry-pickup", title: "Cherry Pickup", platform: "leetcode", url: "https://leetcode.com/problems/cherry-pickup/", difficulty: "hard", isStandard: false, companies: ["Google"] },
        { id: "dp-longest-inc-path", title: "Longest Increasing Path in a Matrix", platform: "leetcode", url: "https://leetcode.com/problems/longest-increasing-path-in-a-matrix/", difficulty: "hard", isStandard: true, companies: ["Google", "Amazon", "Facebook"] }
      ]
    },
    {
      id: "dp-01-knapsack",
      title: "0/1 Knapsack",
      tagline: "Select items to maximize value within a weight constraint — each item used at most once",
      recognitionTips: [
        "You must choose or skip items, each with a weight/cost and value/benefit",
        "Keywords: 'partition equal subset sum', 'target sum', '0/1 knapsack'",
        "Each item can be used at most once (contrast with unbounded knapsack)",
        "Problem asks if a subset can reach a target sum — subset sum is knapsack in disguise",
        "Constraints have a 'capacity' or 'budget' that limits total weight/cost of chosen items",
        "Two choices per item: take it (pay the cost, gain the value) or leave it",
        "n × W constraints (n items, W capacity) are manageable when W is not too large"
      ],
      proTips: [
        "1D optimization: iterate capacity in REVERSE (right to left) to avoid reusing the same item",
        "Subset Sum is a special case where value equals weight — dp[j] = can we reach sum j?",
        "'Target Sum' with +/- can be reduced to subset sum: find subset with sum = (total + target) / 2",
        "If total sum is odd, partition into equal halves is immediately impossible — early exit",
        "'Last Stone Weight II' is actually minimum subset difference — a knapsack reduction",
        "Always check if W fits in memory — if W is up to 10^9, knapsack won't work; look for greedy"
      ],
      approach: "dp[i][w] = max value using first i items with capacity w. For each item: include (dp[i-1][w-weight] + value) or exclude (dp[i-1][w]).",
      templateCode: `// 0/1 Knapsack — Partition Equal Subset Sum
public boolean canPartition(int[] nums) {
    int total = Arrays.stream(nums).sum();
    if (total % 2 != 0) return false;
    int target = total / 2;
    boolean[] dp = new boolean[target + 1];
    dp[0] = true;
    for (int num : nums) {
        for (int j = target; j >= num; j--) { // Why: reverse to avoid reusing same item
            dp[j] = dp[j] || dp[j - num];
        }
    }
    return dp[target];
}`,
      timeComplexity: "O(n * W)",
      spaceComplexity: "O(W)",
      problems: [
        { id: "dp-partition-equal", title: "Partition Equal Subset Sum", platform: "leetcode", url: "https://leetcode.com/problems/partition-equal-subset-sum/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Facebook", "Google"] },
        { id: "dp-target-sum", title: "Target Sum", platform: "leetcode", url: "https://leetcode.com/problems/target-sum/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Facebook", "Google"] },
        { id: "dp-last-stone-ii", title: "Last Stone Weight II", platform: "leetcode", url: "https://leetcode.com/problems/last-stone-weight-ii/", difficulty: "medium", isStandard: false, companies: ["Google"] },
        { id: "dp-ones-zeroes", title: "Ones and Zeroes", platform: "leetcode", url: "https://leetcode.com/problems/ones-and-zeroes/", difficulty: "medium", isStandard: false, companies: ["Google"] },
        { id: "dp-knapsack-gfg", title: "0/1 Knapsack Problem", platform: "gfg", url: "https://www.geeksforgeeks.org/0-1-knapsack-problem-dp-10/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Microsoft", "Flipkart"] },
        { id: "dp-count-subset-sum-gfg", title: "Count Subsets with Sum K", platform: "gfg", url: "https://www.geeksforgeeks.org/count-of-subsets-with-sum-equal-to-x/", difficulty: "medium", isStandard: true, companies: ["Amazon"] },
        { id: "dp-profitable-schemes", title: "Profitable Schemes", platform: "leetcode", url: "https://leetcode.com/problems/profitable-schemes/", difficulty: "hard", isStandard: false, companies: ["Google"] },
        { id: "dp-min-diff-two-subsets", title: "Minimum Difference Between Two Subsets", platform: "gfg", url: "https://www.geeksforgeeks.org/partition-a-set-into-two-subsets-such-that-the-difference-of-subset-sums-is-minimum/", difficulty: "hard", isStandard: true, companies: ["Amazon", "Microsoft"] }
      ]
    },
    {
      id: "dp-unbounded-knapsack",
      title: "Unbounded Knapsack",
      tagline: "Unlimited supply of items — coin change, rod cutting, and similar",
      recognitionTips: [
        "Items/coins can be used an unlimited number of times",
        "Keywords: 'coin change', 'rod cutting', 'integer break', 'word break'",
        "Minimum coins/pieces to reach a target, or count total ways to reach it",
        "Contrast with 0/1 knapsack: here, no item-usage limit",
        "Problem says 'unlimited supply' or doesn't restrict reuse of elements",
        "You need to fill a capacity/target using items from a set with repetition allowed"
      ],
      proTips: [
        "Iterate capacity FORWARD (left to right) since items are reusable — opposite of 0/1 knapsack",
        "Coin Change has two variants: minimum coins (minimize) vs. ways to make amount (count)",
        "For counting combinations (not permutations), iterate coins in outer loop, amount in inner",
        "For counting permutations, iterate amount in outer loop, coins in inner",
        "Word Break is unbounded knapsack where 'items' are dictionary words and 'capacity' is the string length",
        "Use amount+1 as 'infinity' sentinel instead of Integer.MAX_VALUE to avoid overflow on +1"
      ],
      approach: "dp[w] = optimal value with capacity w, allowing unlimited item reuse. Iterate capacity forward since same item can be picked again.",
      templateCode: `// Coin Change — Minimum Coins
public int coinChange(int[] coins, int amount) {
    int[] dp = new int[amount + 1];
    Arrays.fill(dp, amount + 1); // Why: impossible sentinel
    dp[0] = 0;
    for (int coin : coins)
        for (int j = coin; j <= amount; j++) // Why: forward — reuse allowed
            dp[j] = Math.min(dp[j], dp[j - coin] + 1);
    return dp[amount] > amount ? -1 : dp[amount];
}`,
      timeComplexity: "O(n * W)",
      spaceComplexity: "O(W)",
      problems: [
        { id: "dp-coin-change", title: "Coin Change", platform: "leetcode", url: "https://leetcode.com/problems/coin-change/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Google", "Microsoft", "Facebook"] },
        { id: "dp-coin-change-ii", title: "Coin Change II", platform: "leetcode", url: "https://leetcode.com/problems/coin-change-ii/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Google", "Facebook"] },
        { id: "dp-perfect-squares", title: "Perfect Squares", platform: "leetcode", url: "https://leetcode.com/problems/perfect-squares/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Google"] },
        { id: "dp-integer-break", title: "Integer Break", platform: "leetcode", url: "https://leetcode.com/problems/integer-break/", difficulty: "medium", isStandard: false, companies: ["Amazon"] },
        { id: "dp-rod-cutting-gfg", title: "Rod Cutting Problem", platform: "gfg", url: "https://www.geeksforgeeks.org/cutting-a-rod-dp-13/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Microsoft", "Flipkart"] },
        { id: "dp-word-break", title: "Word Break", platform: "leetcode", url: "https://leetcode.com/problems/word-break/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Facebook", "Google"] },
        { id: "dp-combo-sum-iv", title: "Combination Sum IV", platform: "leetcode", url: "https://leetcode.com/problems/combination-sum-iv/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Google"] },
        { id: "dp-min-cost-tickets", title: "Minimum Cost For Tickets", platform: "leetcode", url: "https://leetcode.com/problems/minimum-cost-for-tickets/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Google"] }
      ]
    },
    {
      id: "dp-lcs",
      title: "Longest Common Subsequence",
      tagline: "Compare two sequences to find their longest shared subsequence",
      recognitionTips: ["Two strings/arrays being compared", "Phrases like 'longest common subsequence', 'edit distance', 'minimum deletions'"],
      proTips: ["2D table: dp[i][j] = LCS of first i chars of s1 and first j chars of s2", "Edit distance, shortest common supersequence are LCS variants"],
      approach: "If characters match, dp[i][j] = dp[i-1][j-1] + 1. Otherwise, dp[i][j] = max(dp[i-1][j], dp[i][j-1]).",
      templateCode: `// Longest Common Subsequence
public int longestCommonSubsequence(String text1, String text2) {
    int m = text1.length(), n = text2.length();
    int[] dp = new int[n + 1];
    for (int i = 1; i <= m; i++) {
        int prev = 0;
        for (int j = 1; j <= n; j++) {
            int temp = dp[j];
            if (text1.charAt(i-1) == text2.charAt(j-1)) dp[j] = prev + 1;
            else dp[j] = Math.max(dp[j], dp[j-1]);
            prev = temp;
        }
    }
    return dp[n];
}`,
      timeComplexity: "O(m * n)",
      spaceComplexity: "O(n) optimized",
      problems: [
        { id: "dp-lcs", title: "Longest Common Subsequence", platform: "leetcode", url: "https://leetcode.com/problems/longest-common-subsequence/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Google", "Facebook"] },
        { id: "dp-edit-distance", title: "Edit Distance", platform: "leetcode", url: "https://leetcode.com/problems/edit-distance/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Google", "Facebook", "Microsoft"] },
        { id: "dp-delete-ops", title: "Delete Operation for Two Strings", platform: "leetcode", url: "https://leetcode.com/problems/delete-operation-for-two-strings/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Google"] },
        { id: "dp-min-ascii-delete", title: "Minimum ASCII Delete Sum for Two Strings", platform: "leetcode", url: "https://leetcode.com/problems/minimum-ascii-delete-sum-for-two-strings/", difficulty: "medium", isStandard: false, companies: ["Amazon"] },
        { id: "dp-shortest-superseq", title: "Shortest Common Supersequence", platform: "leetcode", url: "https://leetcode.com/problems/shortest-common-supersequence/", difficulty: "hard", isStandard: true, companies: ["Amazon", "Google"] },
        { id: "dp-distinct-subseq", title: "Distinct Subsequences", platform: "leetcode", url: "https://leetcode.com/problems/distinct-subsequences/", difficulty: "hard", isStandard: true, companies: ["Google", "Amazon"] },
        { id: "dp-interleaving-str", title: "Interleaving String", platform: "leetcode", url: "https://leetcode.com/problems/interleaving-string/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Google"] },
        { id: "dp-wildcard-match", title: "Wildcard Matching", platform: "leetcode", url: "https://leetcode.com/problems/wildcard-matching/", difficulty: "hard", isStandard: true, companies: ["Amazon", "Google", "Facebook"] }
      ]
    },
    {
      id: "dp-lis",
      title: "Longest Increasing Subsequence",
      tagline: "Find the longest strictly increasing subsequence using DP or binary search",
      recognitionTips: ["Find longest increasing/decreasing subsequence", "Phrases like 'LIS', 'longest chain', 'Russian doll envelopes'"],
      proTips: ["O(n²) DP: dp[i] = LIS ending at i. O(n log n): maintain tails array with binary search", "For 2D (envelopes), sort by width asc, then LIS on heights"],
      approach: "O(n log n): Maintain a tails array where tails[i] = smallest tail element of all increasing subsequences of length i+1. Binary search to find insertion point for each new element.",
      templateCode: `// LIS — O(n log n) with Binary Search
public int lengthOfLIS(int[] nums) {
    List<Integer> tails = new ArrayList<>();
    for (int num : nums) {
        int pos = Collections.binarySearch(tails, num);
        if (pos < 0) pos = -(pos + 1);
        if (pos == tails.size()) tails.add(num);
        else tails.set(pos, num); // Why: replace to keep smallest possible tail
    }
    return tails.size();
}`,
      timeComplexity: "O(n log n)",
      spaceComplexity: "O(n)",
      problems: [
        { id: "dp-lis-main", title: "Longest Increasing Subsequence", platform: "leetcode", url: "https://leetcode.com/problems/longest-increasing-subsequence/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Google", "Microsoft", "Facebook"] },
        { id: "dp-russian-doll", title: "Russian Doll Envelopes", platform: "leetcode", url: "https://leetcode.com/problems/russian-doll-envelopes/", difficulty: "hard", isStandard: true, companies: ["Google", "Amazon"] },
        { id: "dp-longest-chain", title: "Maximum Length of Pair Chain", platform: "leetcode", url: "https://leetcode.com/problems/maximum-length-of-pair-chain/", difficulty: "medium", isStandard: true, companies: ["Amazon"] },
        { id: "dp-num-lis", title: "Number of Longest Increasing Subsequence", platform: "leetcode", url: "https://leetcode.com/problems/number-of-longest-increasing-subsequence/", difficulty: "medium", isStandard: true, companies: ["Facebook", "Amazon"] },
        { id: "dp-longest-str-chain", title: "Longest String Chain", platform: "leetcode", url: "https://leetcode.com/problems/longest-string-chain/", difficulty: "medium", isStandard: true, companies: ["Google", "Amazon"] },
        { id: "dp-largest-divisible", title: "Largest Divisible Subset", platform: "leetcode", url: "https://leetcode.com/problems/largest-divisible-subset/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Google"] },
        { id: "dp-min-jumps-lis", title: "Minimum Number of Removals to Make Mountain Array", platform: "leetcode", url: "https://leetcode.com/problems/minimum-number-of-removals-to-make-mountain-array/", difficulty: "hard", isStandard: false, companies: ["Google"] },
        { id: "dp-inc-subsequences", title: "Non-decreasing Subsequences", platform: "leetcode", url: "https://leetcode.com/problems/non-decreasing-subsequences/", difficulty: "medium", isStandard: false, companies: ["Amazon"] }
      ]
    },
    {
      id: "dp-string",
      title: "String DP",
      tagline: "DP on strings for palindromes, regex matching, and substring problems",
      recognitionTips: ["String problems involving palindromes or pattern matching", "Phrases like 'longest palindromic subsequence', 'regular expression matching'"],
      proTips: ["Palindrome problems: expand from center or use dp[i][j] = is substring i..j a palindrome", "Regex/wildcard: 2D DP matching characters or patterns"],
      approach: "For palindromic subsequence: dp[i][j] = longest palindromic subsequence in s[i..j]. For matching: dp[i][j] = does s[0..i] match p[0..j].",
      templateCode: `// Longest Palindromic Subsequence
public int longestPalindromeSubseq(String s) {
    int n = s.length();
    int[] dp = new int[n];
    Arrays.fill(dp, 1);
    for (int i = n - 2; i >= 0; i--) {
        int prev = 0;
        for (int j = i + 1; j < n; j++) {
            int temp = dp[j];
            if (s.charAt(i) == s.charAt(j)) dp[j] = prev + 2;
            else dp[j] = Math.max(dp[j], dp[j-1]);
            prev = temp;
        }
    }
    return dp[n - 1];
}`,
      timeComplexity: "O(n²)",
      spaceComplexity: "O(n) optimized",
      problems: [
        { id: "dp-longest-palindrome-sub", title: "Longest Palindromic Substring", platform: "leetcode", url: "https://leetcode.com/problems/longest-palindromic-substring/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Microsoft", "Google", "Facebook"] },
        { id: "dp-longest-palindrome-subseq", title: "Longest Palindromic Subsequence", platform: "leetcode", url: "https://leetcode.com/problems/longest-palindromic-subsequence/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Facebook"] },
        { id: "dp-palindrome-partition-ii", title: "Palindrome Partitioning II", platform: "leetcode", url: "https://leetcode.com/problems/palindrome-partitioning-ii/", difficulty: "hard", isStandard: true, companies: ["Amazon", "Google"] },
        { id: "dp-regex-match", title: "Regular Expression Matching", platform: "leetcode", url: "https://leetcode.com/problems/regular-expression-matching/", difficulty: "hard", isStandard: true, companies: ["Google", "Facebook", "Amazon"] },
        { id: "dp-wildcard", title: "Wildcard Matching", platform: "leetcode", url: "https://leetcode.com/problems/wildcard-matching/", difficulty: "hard", isStandard: true, companies: ["Amazon", "Google", "Facebook"] },
        { id: "dp-count-palindromic-sub", title: "Count Different Palindromic Subsequences", platform: "leetcode", url: "https://leetcode.com/problems/count-different-palindromic-subsequences/", difficulty: "hard", isStandard: false, companies: ["Amazon"] },
        { id: "dp-min-insertions-palindrome", title: "Minimum Insertion Steps to Make a String Palindrome", platform: "leetcode", url: "https://leetcode.com/problems/minimum-insertion-steps-to-make-a-string-palindrome/", difficulty: "hard", isStandard: true, companies: ["Amazon", "Google"] },
        { id: "dp-scramble-string", title: "Scramble String", platform: "leetcode", url: "https://leetcode.com/problems/scramble-string/", difficulty: "hard", isStandard: false, companies: ["Google"] }
      ]
    },
    {
      id: "dp-state-machine-stocks",
      title: "State Machine DP / Stocks",
      tagline: "Model states and transitions for stock trading and FSM problems",
      recognitionTips: ["Multiple buy/sell transactions with constraints (cooldown, fee, limit)", "State transitions: holding, not-holding, cooldown", "Phrases like 'best time to buy and sell stock with cooldown/fee/k transactions'"],
      proTips: ["Model as state machine: each day you're in one state (holding, not-holding, cooldown)", "Transition between states with buy/sell/hold actions", "For k transactions, use 2D: dp[t][0/1] = max profit with t transactions, holding/not"],
      approach: "Track state variables for each day. Compute optimal transition from all possible previous states.",
      templateCode: `// Best Time Buy/Sell — With Cooldown (State Machine)
public int maxProfit(int[] prices) {
    int held = Integer.MIN_VALUE, sold = 0, rest = 0;
    for (int price : prices) {
        int prevSold = sold;
        sold = held + price;      // Why: sell today
        held = Math.max(held, rest - price); // Why: buy today or hold
        rest = Math.max(rest, prevSold);     // Why: cooldown or stay resting
    }
    return Math.max(sold, rest);
}`,
      timeComplexity: "O(n) or O(n*k)",
      spaceComplexity: "O(1) or O(k)",
      problems: [
        { id: "dp-stock-i", title: "Best Time to Buy and Sell Stock", platform: "leetcode", url: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/", difficulty: "easy", isStandard: true, companies: ["Amazon", "Goldman Sachs", "Facebook"] },
        { id: "dp-stock-ii", title: "Best Time to Buy and Sell Stock II", platform: "leetcode", url: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Goldman Sachs"] },
        { id: "dp-stock-iii", title: "Best Time to Buy and Sell Stock III", platform: "leetcode", url: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iii/", difficulty: "hard", isStandard: true, companies: ["Amazon", "Goldman Sachs"] },
        { id: "dp-stock-iv", title: "Best Time to Buy and Sell Stock IV", platform: "leetcode", url: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iv/", difficulty: "hard", isStandard: true, companies: ["Amazon", "Goldman Sachs", "Google"] },
        { id: "dp-stock-cooldown", title: "Best Time to Buy and Sell Stock with Cooldown", platform: "leetcode", url: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Goldman Sachs", "Google"] },
        { id: "dp-stock-fee", title: "Best Time to Buy and Sell Stock with Transaction Fee", platform: "leetcode", url: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-transaction-fee/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Facebook"] },
        { id: "dp-paint-house", title: "Paint House", platform: "leetcode", url: "https://leetcode.com/problems/paint-house/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Google"] },
        { id: "dp-paint-house-ii", title: "Paint House II", platform: "leetcode", url: "https://leetcode.com/problems/paint-house-ii/", difficulty: "hard", isStandard: false, companies: ["Facebook"] }
      ]
    },
    {
      id: "dp-interval",
      title: "Interval DP",
      tagline: "DP on intervals/ranges — merge elements optimally from a contiguous range",
      recognitionTips: ["Problem involves merging/splitting a contiguous range optimally", "Phrases like 'burst balloons', 'matrix chain multiplication', 'minimum cost to merge stones'"],
      proTips: ["dp[i][j] represents optimal value for interval [i, j]", "Try all possible split points k between i and j", "Fill diagonally: start with small intervals, build to larger"],
      approach: "dp[i][j] = optimal value for range [i..j]. For each split point k in [i..j-1], dp[i][j] = min/max over dp[i][k] + dp[k+1][j] + merge cost.",
      templateCode: `// Burst Balloons — Interval DP
public int maxCoins(int[] nums) {
    int n = nums.length;
    int[] arr = new int[n + 2]; // Why: pad with 1s on both ends
    arr[0] = arr[n + 1] = 1;
    for (int i = 0; i < n; i++) arr[i + 1] = nums[i];
    int[][] dp = new int[n + 2][n + 2];
    for (int len = 1; len <= n; len++) {
        for (int left = 1; left + len - 1 <= n; left++) {
            int right = left + len - 1;
            for (int k = left; k <= right; k++) {
                // Why: k is the last balloon to burst in [left, right]
                dp[left][right] = Math.max(dp[left][right],
                    dp[left][k-1] + arr[left-1]*arr[k]*arr[right+1] + dp[k+1][right]);
            }
        }
    }
    return dp[1][n];
}`,
      timeComplexity: "O(n³)",
      spaceComplexity: "O(n²)",
      problems: [
        { id: "dp-burst-balloons", title: "Burst Balloons", platform: "leetcode", url: "https://leetcode.com/problems/burst-balloons/", difficulty: "hard", isStandard: true, companies: ["Google", "Amazon", "Microsoft"] },
        { id: "dp-matrix-chain-gfg", title: "Matrix Chain Multiplication", platform: "gfg", url: "https://www.geeksforgeeks.org/matrix-chain-multiplication-dp-8/", difficulty: "hard", isStandard: true, companies: ["Amazon", "Microsoft"] },
        { id: "dp-min-cost-merge-stones", title: "Minimum Cost to Merge Stones", platform: "leetcode", url: "https://leetcode.com/problems/minimum-cost-to-merge-stones/", difficulty: "hard", isStandard: true, companies: ["Google"] },
        { id: "dp-strange-printer", title: "Strange Printer", platform: "leetcode", url: "https://leetcode.com/problems/strange-printer/", difficulty: "hard", isStandard: false, companies: ["Google"] },
        { id: "dp-min-score-triangulation", title: "Minimum Score Triangulation of Polygon", platform: "leetcode", url: "https://leetcode.com/problems/minimum-score-triangulation-of-polygon/", difficulty: "medium", isStandard: false, companies: ["Amazon"] },
        { id: "dp-boolean-parens-gfg", title: "Boolean Parenthesization", platform: "gfg", url: "https://www.geeksforgeeks.org/boolean-parenthesization-problem-dp-37/", difficulty: "hard", isStandard: true, companies: ["Amazon", "Google"] },
        { id: "dp-optimal-bst-gfg", title: "Optimal Binary Search Tree", platform: "gfg", url: "https://www.geeksforgeeks.org/optimal-binary-search-tree-dp-24/", difficulty: "hard", isStandard: false, companies: ["Amazon"] },
        { id: "dp-palindrome-partition-iii", title: "Palindrome Partitioning III", platform: "leetcode", url: "https://leetcode.com/problems/palindrome-partitioning-iii/", difficulty: "hard", isStandard: false, companies: ["Google"] }
      ]
    },
    {
      id: "dp-on-trees",
      title: "DP on Trees",
      tagline: "Combine subtree results bottom-up to solve tree optimization problems",
      recognitionTips: ["Compute optimal value for tree using children's results", "Phrases like 'house robber III', 'binary tree cameras', 'tree diameter'"],
      proTips: ["Post-order traversal: compute children before parent", "Often return a pair/array from recursion: (include root, exclude root)"],
      approach: "DFS post-order. For each node, compute DP values using children's DP results. Return aggregated results upward.",
      templateCode: `// House Robber III — DP on Trees
public int rob(TreeNode root) {
    int[] result = robHelper(root);
    return Math.max(result[0], result[1]);
}
int[] robHelper(TreeNode node) {
    if (node == null) return new int[]{0, 0};
    int[] left = robHelper(node.left);
    int[] right = robHelper(node.right);
    // [0] = rob this node, [1] = skip this node
    int robThis = node.val + left[1] + right[1];
    int skipThis = Math.max(left[0], left[1]) + Math.max(right[0], right[1]);
    return new int[]{robThis, skipThis};
}`,
      timeComplexity: "O(n)",
      spaceComplexity: "O(h)",
      problems: [
        { id: "dp-house-robber-iii", title: "House Robber III", platform: "leetcode", url: "https://leetcode.com/problems/house-robber-iii/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Google"] },
        { id: "dp-binary-tree-cameras", title: "Binary Tree Cameras", platform: "leetcode", url: "https://leetcode.com/problems/binary-tree-cameras/", difficulty: "hard", isStandard: true, companies: ["Amazon", "Google"] },
        { id: "dp-longest-zigzag", title: "Longest ZigZag Path in a Binary Tree", platform: "leetcode", url: "https://leetcode.com/problems/longest-zigzag-path-in-a-binary-tree/", difficulty: "medium", isStandard: false, companies: ["Amazon"] },
        { id: "dp-max-path-sum-tree", title: "Binary Tree Maximum Path Sum", platform: "leetcode", url: "https://leetcode.com/problems/binary-tree-maximum-path-sum/", difficulty: "hard", isStandard: true, companies: ["Facebook", "Amazon", "Google"] },
        { id: "dp-diameter-tree", title: "Diameter of Binary Tree", platform: "leetcode", url: "https://leetcode.com/problems/diameter-of-binary-tree/", difficulty: "easy", isStandard: true, companies: ["Facebook", "Amazon"] },
        { id: "dp-sum-distances-tree", title: "Sum of Distances in Tree", platform: "leetcode", url: "https://leetcode.com/problems/sum-of-distances-in-tree/", difficulty: "hard", isStandard: true, companies: ["Google"] },
        { id: "dp-distribute-coins", title: "Distribute Coins in Binary Tree", platform: "leetcode", url: "https://leetcode.com/problems/distribute-coins-in-binary-tree/", difficulty: "medium", isStandard: false, companies: ["Amazon"] },
        { id: "dp-unique-bst", title: "Unique Binary Search Trees", platform: "leetcode", url: "https://leetcode.com/problems/unique-binary-search-trees/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Google"] }
      ]
    },
    {
      id: "dp-bitmask",
      title: "Bitmask DP",
      tagline: "Use bitmasks to represent sets in DP state — for small n (≤ 20)",
      recognitionTips: ["n is small (≤ 20), need to track which items are used", "TSP, assignment problem, or partition into groups", "Phrases like 'minimum cost to visit all', 'travelling salesman'"],
      proTips: ["State: dp[mask] or dp[mask][last] — mask encodes which items are chosen", "Total states = 2^n * n for TSP-like problems", "Pre-compute valid masks and transitions to optimize constant factor"],
      approach: "dp[mask] represents the optimal value when the set of chosen items is represented by the bitmask 'mask'. Transition: try adding each unchosen item to the current mask.",
      templateCode: `// Shortest Path Visiting All Nodes (TSP variant)
public int shortestPathLength(int[][] graph) {
    int n = graph.length;
    int fullMask = (1 << n) - 1;
    int[][] dist = new int[1 << n][n];
    for (int[] row : dist) Arrays.fill(row, Integer.MAX_VALUE);
    Queue<int[]> queue = new LinkedList<>();
    for (int i = 0; i < n; i++) {
        dist[1 << i][i] = 0;
        queue.offer(new int[]{1 << i, i});
    }
    while (!queue.isEmpty()) {
        int[] curr = queue.poll();
        int mask = curr[0], node = curr[1];
        if (mask == fullMask) return dist[mask][node];
        for (int next : graph[node]) {
            int nextMask = mask | (1 << next);
            if (dist[mask][node] + 1 < dist[nextMask][next]) {
                dist[nextMask][next] = dist[mask][node] + 1;
                queue.offer(new int[]{nextMask, next});
            }
        }
    }
    return -1;
}`,
      timeComplexity: "O(2^n * n²)",
      spaceComplexity: "O(2^n * n)",
      problems: [
        { id: "dp-shortest-path-all", title: "Shortest Path Visiting All Nodes", platform: "leetcode", url: "https://leetcode.com/problems/shortest-path-visiting-all-nodes/", difficulty: "hard", isStandard: true, companies: ["Google"] },
        { id: "dp-partition-k-equal", title: "Partition to K Equal Sum Subsets", platform: "leetcode", url: "https://leetcode.com/problems/partition-to-k-equal-sum-subsets/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Google"] },
        { id: "dp-parallel-courses-ii", title: "Parallel Courses II", platform: "leetcode", url: "https://leetcode.com/problems/parallel-courses-ii/", difficulty: "hard", isStandard: false, companies: ["Google"] },
        { id: "dp-tsp-gfg", title: "Travelling Salesman Problem", platform: "gfg", url: "https://www.geeksforgeeks.org/travelling-salesman-problem-using-dynamic-programming/", difficulty: "hardest", isStandard: true, companies: ["Google", "Amazon"] },
        { id: "dp-max-students-exams", title: "Maximum Students Taking Exam", platform: "leetcode", url: "https://leetcode.com/problems/maximum-students-taking-exam/", difficulty: "hard", isStandard: false, companies: ["Google"] },
        { id: "dp-min-xor-sum", title: "Minimum XOR Sum of Two Arrays", platform: "leetcode", url: "https://leetcode.com/problems/minimum-xor-sum-of-two-arrays/", difficulty: "hard", isStandard: false, companies: ["Google"] },
        { id: "dp-num-ways-hats", title: "Number of Ways to Wear Different Hats", platform: "leetcode", url: "https://leetcode.com/problems/number-of-ways-to-wear-different-hats-to-each-other/", difficulty: "hard", isStandard: false, companies: ["Google"] },
        { id: "dp-max-compat-sum", title: "Maximum Compatibility Score Sum", platform: "leetcode", url: "https://leetcode.com/problems/maximum-compatibility-score-sum/", difficulty: "medium", isStandard: false, companies: ["Amazon"] }
      ]
    },
    {
      id: "dp-digit",
      title: "Digit DP",
      tagline: "Count numbers in a range satisfying digit-level constraints",
      recognitionTips: ["Count numbers in range [L, R] with specific digit properties", "Constraints on individual digits (sum, product, divisibility)", "Phrases like 'count numbers with digit sum equal to'", "n can be very large (up to 10^18) — iterate over digits, not numbers"],
      proTips: ["Process digit by digit from MSB to LSB", "Track tight constraint: whether we're still bounded by the limit", "Memoize (position, tight, state) to avoid recomputation"],
      approach: "Recursively build numbers digit by digit. Track whether we're still constrained by the upper bound (tight flag). Memoize based on position, tight flag, and any additional state (digit sum, leading zeros, etc.).",
      templateCode: `// Digit DP — Count Numbers with Even Digit Sum (conceptual template)
// This is a framework — adapt the 'state' for specific problems
long[][][] memo;
public int countEvenDigitSum(int num) {
    String digits = String.valueOf(num);
    memo = new long[digits.length()][2][200]; // [pos][tight][digitSum]
    for (long[][] a : memo) for (long[] b : a) Arrays.fill(b, -1);
    return (int) solve(digits, 0, true, 0);
}
long solve(String digits, int pos, boolean tight, int sum) {
    if (pos == digits.length()) return sum % 2 == 0 ? 1 : 0;
    int t = tight ? 1 : 0;
    if (memo[pos][t][sum] != -1) return memo[pos][t][sum];
    int limit = tight ? digits.charAt(pos) - '0' : 9;
    long count = 0;
    for (int d = 0; d <= limit; d++) {
        count += solve(digits, pos + 1, tight && d == limit, sum + d);
    }
    return memo[pos][t][sum] = count;
}`,
      timeComplexity: "O(digits * states * 10)",
      spaceComplexity: "O(digits * states)",
      problems: [
        { id: "dp-digit-count-1", title: "Number of Digit One", platform: "leetcode", url: "https://leetcode.com/problems/number-of-digit-one/", difficulty: "hard", isStandard: true, companies: ["Google", "Amazon"] },
        { id: "dp-count-special", title: "Count Special Integers", platform: "leetcode", url: "https://leetcode.com/problems/count-special-integers/", difficulty: "hard", isStandard: false, companies: ["Google"] },
        { id: "dp-count-stepping", title: "Count Stepping Numbers in Range", platform: "leetcode", url: "https://leetcode.com/problems/count-stepping-numbers-in-range/", difficulty: "hard", isStandard: false, companies: ["Google"] },
        { id: "dp-rotated-digits", title: "Rotated Digits", platform: "leetcode", url: "https://leetcode.com/problems/rotated-digits/", difficulty: "medium", isStandard: false, companies: ["Google"] },
        { id: "dp-non-neg-no-consec-1", title: "Non-negative Integers without Consecutive Ones", platform: "leetcode", url: "https://leetcode.com/problems/non-negative-integers-without-consecutive-ones/", difficulty: "hard", isStandard: false, companies: ["Google"] },
        { id: "dp-digit-sum-gfg", title: "Digit DP (Count from 1 to N)", platform: "gfg", url: "https://www.geeksforgeeks.org/digit-dp-introduction/", difficulty: "hard", isStandard: true, companies: ["Google", "Amazon"] },
        { id: "dp-numbers-at-most-n", title: "Numbers At Most N Given Digit Set", platform: "leetcode", url: "https://leetcode.com/problems/numbers-at-most-n-given-digit-set/", difficulty: "hard", isStandard: false, companies: ["Google"] },
        { id: "dp-count-integers-even-digit", title: "Count Integers With Even Digit Sum", platform: "leetcode", url: "https://leetcode.com/problems/count-integers-with-even-digit-sum/", difficulty: "easy", isStandard: false, companies: ["Amazon"] }
      ]
    },
    {
      id: "dp-deque-optimization",
      title: "Deque Optimization DP",
      tagline: "Optimize DP transitions using a monotonic deque for sliding window minimum/maximum",
      recognitionTips: ["DP where transition looks at a window of previous states", "dp[i] = min/max over dp[j] + cost for j in [i-k, i-1]", "Phrases like 'jump game VI', 'constrained subsequence sum'"],
      proTips: ["Use a monotonic deque to maintain candidates in the window", "Remove elements outside the window from the front", "Remove suboptimal elements from the back before inserting"],
      approach: "When dp[i] depends on min/max of dp[j] for j in a sliding window [i-k, i-1], maintain a monotonic deque of candidates. This reduces per-transition cost from O(k) to amortized O(1).",
      templateCode: `// Jump Game VI — Deque Optimization
public int maxResult(int[] nums, int k) {
    int n = nums.length;
    int[] dp = new int[n];
    dp[0] = nums[0];
    Deque<Integer> deque = new ArrayDeque<>(); // Why: max-deque of dp values
    deque.offerLast(0);
    for (int i = 1; i < n; i++) {
        // Why: remove elements outside window
        while (!deque.isEmpty() && deque.peekFirst() < i - k) deque.pollFirst();
        dp[i] = dp[deque.peekFirst()] + nums[i];
        // Why: remove elements worse than current from back
        while (!deque.isEmpty() && dp[deque.peekLast()] <= dp[i]) deque.pollLast();
        deque.offerLast(i);
    }
    return dp[n - 1];
}`,
      timeComplexity: "O(n)",
      spaceComplexity: "O(n)",
      problems: [
        { id: "dp-jump-game-vi", title: "Jump Game VI", platform: "leetcode", url: "https://leetcode.com/problems/jump-game-vi/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Google"] },
        { id: "dp-constrained-subseq", title: "Constrained Subsequence Sum", platform: "leetcode", url: "https://leetcode.com/problems/constrained-subsequence-sum/", difficulty: "hard", isStandard: true, companies: ["Google"] },
        { id: "dp-sliding-window-max", title: "Sliding Window Maximum", platform: "leetcode", url: "https://leetcode.com/problems/sliding-window-maximum/", difficulty: "hard", isStandard: true, companies: ["Amazon", "Google", "Microsoft"] },
        { id: "dp-shortest-subarray-sum-k", title: "Shortest Subarray with Sum at Least K", platform: "leetcode", url: "https://leetcode.com/problems/shortest-subarray-with-sum-at-least-k/", difficulty: "hard", isStandard: true, companies: ["Google", "Facebook"] },
        { id: "dp-longest-subarray-limit", title: "Longest Subarray With Abs Diff <= Limit", platform: "leetcode", url: "https://leetcode.com/problems/longest-continuous-subarray-with-absolute-diff-less-than-or-equal-to-limit/", difficulty: "medium", isStandard: false, companies: ["Google"] },
        { id: "dp-min-cost-k-flowers", title: "Minimum Cost to Buy Flowers", platform: "gfg", url: "https://www.geeksforgeeks.org/minimum-cost-to-connect-all-cities/", difficulty: "medium", isStandard: false, companies: ["Amazon"] },
        { id: "dp-max-value-k-coins", title: "Maximum Value of K Coins From Piles", platform: "leetcode", url: "https://leetcode.com/problems/maximum-value-of-k-coins-from-piles/", difficulty: "hard", isStandard: false, companies: ["Google"] },
        { id: "dp-paint-houses-iii", title: "Paint House III", platform: "leetcode", url: "https://leetcode.com/problems/paint-house-iii/", difficulty: "hard", isStandard: false, companies: ["Google"] }
      ]
    },
    {
      id: "dp-probability",
      title: "Probability DP",
      tagline: "Compute probabilities and expected values using DP transitions",
      recognitionTips: ["Problem asks for probability or expected value", "Random events with state transitions", "Phrases like 'probability of reaching', 'knight probability', 'soup servings'"],
      proTips: ["States represent current position/amount, transitions are probabilistic", "Sum of probabilities of all transitions from a state must equal 1", "Often involves floating-point DP — use double"],
      approach: "dp[state] = probability of being in this state. Transition: distribute current state's probability to next states based on transition probabilities.",
      templateCode: `// Knight Probability in Chessboard
public double knightProbability(int n, int k, int row, int column) {
    double[][] dp = new double[n][n];
    dp[row][column] = 1.0;
    int[][] moves = {{-2,-1},{-2,1},{-1,-2},{-1,2},{1,-2},{1,2},{2,-1},{2,1}};
    for (int step = 0; step < k; step++) {
        double[][] newDp = new double[n][n];
        for (int r = 0; r < n; r++)
            for (int c = 0; c < n; c++)
                if (dp[r][c] > 0)
                    for (int[] move : moves) {
                        int nr = r + move[0], nc = c + move[1];
                        if (nr >= 0 && nr < n && nc >= 0 && nc < n)
                            newDp[nr][nc] += dp[r][c] / 8.0;
                    }
        dp = newDp;
    }
    double prob = 0;
    for (double[] r : dp) for (double v : r) prob += v;
    return prob;
}`,
      timeComplexity: "O(k * n²)",
      spaceComplexity: "O(n²)",
      problems: [
        { id: "dp-knight-prob", title: "Knight Probability in Chessboard", platform: "leetcode", url: "https://leetcode.com/problems/knight-probability-in-chessboard/", difficulty: "medium", isStandard: true, companies: ["Goldman Sachs", "Google", "Amazon"] },
        { id: "dp-soup-servings", title: "Soup Servings", platform: "leetcode", url: "https://leetcode.com/problems/soup-servings/", difficulty: "medium", isStandard: false, companies: ["Google"] },
        { id: "dp-new-21-game", title: "New 21 Game", platform: "leetcode", url: "https://leetcode.com/problems/new-21-game/", difficulty: "medium", isStandard: true, companies: ["Google", "Goldman Sachs"] },
        { id: "dp-toss-strange-coin", title: "Toss Strange Coins", platform: "leetcode", url: "https://leetcode.com/problems/toss-strange-coins/", difficulty: "medium", isStandard: false, companies: ["Google"] },
        { id: "dp-dice-rolls-target", title: "Number of Dice Rolls With Target Sum", platform: "leetcode", url: "https://leetcode.com/problems/number-of-dice-rolls-with-target-sum/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Google"] },
        { id: "dp-predict-winner", title: "Predict the Winner", platform: "leetcode", url: "https://leetcode.com/problems/predict-the-winner/", difficulty: "medium", isStandard: true, companies: ["Google", "Amazon"] },
        { id: "dp-stone-game", title: "Stone Game", platform: "leetcode", url: "https://leetcode.com/problems/stone-game/", difficulty: "medium", isStandard: true, companies: ["Google", "Amazon"] },
        { id: "dp-stone-game-ii", title: "Stone Game II", platform: "leetcode", url: "https://leetcode.com/problems/stone-game-ii/", difficulty: "medium", isStandard: false, companies: ["Google"] }
      ]
    }
  ]
};

dynamicProgramming.totalProblems = dynamicProgramming.patterns.reduce((sum, p) => sum + p.problems.length, 0);
