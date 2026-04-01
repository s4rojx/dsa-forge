import { Topic } from "@/types";

export const bitManipulation: Topic = {
  slug: "bit-manipulation",
  title: "Bit Manipulation",
  description: "Leverage binary operations for elegant O(1) space solutions and XOR tricks",
  icon: "Binary",
  totalProblems: 0,
  patterns: [
    {
      id: "xor-tricks",
      title: "XOR Tricks",
      tagline: "Use XOR properties to find missing/duplicate numbers without extra space",
      recognitionTips: ["Find the single number in an array where all others appear twice", "Find missing or duplicate number using O(1) space", "XOR of a number with itself is 0; XOR with 0 gives the number", "Phrases like 'appears exactly once', 'single number'"],
      proTips: ["a ^ a = 0, a ^ 0 = a — these two properties solve most XOR problems", "To find two unique numbers: XOR all, use a set bit to divide into two groups", "XOR is commutative and associative — order doesn't matter"],
      approach: "XOR all elements together. Since duplicates cancel out (a^a=0), the result is the unique element. For two unique numbers, first XOR all to get xor_result, find any set bit to split into two groups, XOR each group separately.",
      templateCode: `// Single Number — Find the element appearing once
public int singleNumber(int[] nums) {
    int result = 0;
    for (int num : nums) result ^= num; // Why: duplicates cancel out via XOR
    return result;
}
// Two unique numbers among pairs
public int[] singleNumberIII(int[] nums) {
    int xorAll = 0;
    for (int num : nums) xorAll ^= num;
    int diffBit = xorAll & (-xorAll); // Why: isolate rightmost set bit
    int a = 0, b = 0;
    for (int num : nums) {
        if ((num & diffBit) != 0) a ^= num; // Why: group with bit set
        else b ^= num; // Why: group without bit set
    }
    return new int[]{a, b};
}`,
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
      problems: [
        { id: "bm-single-number", title: "Single Number", platform: "leetcode", url: "https://leetcode.com/problems/single-number/", difficulty: "easy", isStandard: true, companies: ["Amazon", "Google", "Facebook"] },
        { id: "bm-single-number-ii", title: "Single Number II", platform: "leetcode", url: "https://leetcode.com/problems/single-number-ii/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Google"] },
        { id: "bm-single-number-iii", title: "Single Number III", platform: "leetcode", url: "https://leetcode.com/problems/single-number-iii/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Facebook"] },
        { id: "bm-missing-number", title: "Missing Number", platform: "leetcode", url: "https://leetcode.com/problems/missing-number/", difficulty: "easy", isStandard: true, companies: ["Amazon", "Microsoft", "Apple"] },
        { id: "bm-complement", title: "Complement of Base 10 Integer", platform: "leetcode", url: "https://leetcode.com/problems/complement-of-base-10-integer/", difficulty: "easy", isStandard: false, companies: ["Amazon"] },
        { id: "bm-hamming-distance", title: "Hamming Distance", platform: "leetcode", url: "https://leetcode.com/problems/hamming-distance/", difficulty: "easy", isStandard: true, companies: ["Facebook", "Amazon"] },
        { id: "bm-total-hamming", title: "Total Hamming Distance", platform: "leetcode", url: "https://leetcode.com/problems/total-hamming-distance/", difficulty: "medium", isStandard: false, companies: ["Facebook"] },
        { id: "bm-xor-queries", title: "XOR Queries of a Subarray", platform: "leetcode", url: "https://leetcode.com/problems/xor-queries-of-a-subarray/", difficulty: "medium", isStandard: false, companies: ["Amazon"] }
      ]
    },
    {
      id: "bit-masking",
      title: "Bit Masking",
      tagline: "Use bitmasks to represent and manipulate sets of elements efficiently",
      recognitionTips: ["Need to track presence/absence of up to 32 items", "Subset representation using integers", "Phrases like 'valid states', 'visited set of small size n ≤ 20'", "DP with bitmask state — each bit represents include/exclude"],
      proTips: ["Set bit i: mask | (1 << i), Clear bit i: mask & ~(1 << i)", "Check bit i: (mask >> i) & 1", "Iterate over all subsets of mask: for (sub = mask; sub > 0; sub = (sub-1) & mask)"],
      approach: "Represent sets using integers where each bit position indicates membership. Use bitwise operations for set operations: OR for union, AND for intersection, XOR for symmetric difference. Common in DP where states involve subsets.",
      templateCode: `// Bitmask DP — Minimum Number of Work Sessions
public int minSessions(int[] tasks, int sessionTime) {
    int n = tasks.length;
    int[] subsetSum = new int[1 << n];
    // Why: precompute sum for every subset
    for (int mask = 1; mask < (1 << n); mask++) {
        int lsb = mask & (-mask);
        int idx = Integer.numberOfTrailingZeros(lsb);
        subsetSum[mask] = subsetSum[mask ^ lsb] + tasks[idx];
    }
    int[] dp = new int[1 << n];
    Arrays.fill(dp, n); // Why: worst case = n sessions
    dp[0] = 0;
    for (int mask = 1; mask < (1 << n); mask++) {
        // Why: iterate over all subsets of mask
        for (int sub = mask; sub > 0; sub = (sub - 1) & mask) {
            if (subsetSum[sub] <= sessionTime) {
                dp[mask] = Math.min(dp[mask], dp[mask ^ sub] + 1);
            }
        }
    }
    return dp[(1 << n) - 1];
}`,
      timeComplexity: "O(3^n) for subset enumeration",
      spaceComplexity: "O(2^n)",
      problems: [
        { id: "bm-counting-bits", title: "Counting Bits", platform: "leetcode", url: "https://leetcode.com/problems/counting-bits/", difficulty: "easy", isStandard: true, companies: ["Amazon", "Microsoft"] },
        { id: "bm-min-sessions", title: "Minimum Number of Work Sessions", platform: "leetcode", url: "https://leetcode.com/problems/minimum-number-of-work-sessions-to-finish-the-tasks/", difficulty: "medium", isStandard: false, companies: ["Google"] },
        { id: "bm-shortest-superstring", title: "Find the Shortest Superstring", platform: "leetcode", url: "https://leetcode.com/problems/find-the-shortest-superstring/", difficulty: "hard", isStandard: false, companies: ["Google"] },
        { id: "bm-can-partition", title: "Can I Win", platform: "leetcode", url: "https://leetcode.com/problems/can-i-win/", difficulty: "medium", isStandard: false, companies: ["Amazon", "Google"] },
        { id: "bm-max-product-word", title: "Maximum Product of Word Lengths", platform: "leetcode", url: "https://leetcode.com/problems/maximum-product-of-word-lengths/", difficulty: "medium", isStandard: false, companies: ["Google"] },
        { id: "bm-utf8-validation", title: "UTF-8 Validation", platform: "leetcode", url: "https://leetcode.com/problems/utf-8-validation/", difficulty: "medium", isStandard: false, companies: ["Google", "Facebook"] },
        { id: "bm-generalized-abbrev", title: "Generalized Abbreviation", platform: "leetcode", url: "https://leetcode.com/problems/generalized-abbreviation/", difficulty: "medium", isStandard: false, companies: ["Google"] },
        { id: "bm-subsets-bitmask", title: "Subsets (Bitmask approach)", platform: "leetcode", url: "https://leetcode.com/problems/subsets/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Facebook"] }
      ]
    },
    {
      id: "power-of-2",
      title: "Power of 2 Checks",
      tagline: "Detect powers of 2 and related properties using bit tricks",
      recognitionTips: ["Check if a number is a power of 2", "Problems involving binary representation properties", "n & (n-1) removes the lowest set bit", "Phrases like 'power of two', 'power of four'"],
      proTips: ["n & (n-1) == 0 means n is a power of 2 (and n > 0)", "n & (-n) isolates the lowest set bit", "For power of 4: must be power of 2 AND set bit at even position"],
      approach: "A power of 2 has exactly one bit set. n & (n-1) clears the lowest set bit — if the result is 0 and n > 0, it's a power of 2. For power of 4, additionally check that the set bit is at an even position.",
      templateCode: `// Power of 2 Check
public boolean isPowerOfTwo(int n) {
    return n > 0 && (n & (n - 1)) == 0; // Why: power of 2 has exactly one bit set
}
// Power of 4 Check
public boolean isPowerOfFour(int n) {
    // Why: must be power of 2 AND bit at even position (0x55555555 = 0101...01)
    return n > 0 && (n & (n - 1)) == 0 && (n & 0x55555555) != 0;
}
// Count Set Bits (Brian Kernighan's)
public int hammingWeight(int n) {
    int count = 0;
    while (n != 0) {
        n &= (n - 1); // Why: removes lowest set bit each iteration
        count++;
    }
    return count;
}`,
      timeComplexity: "O(1) for checks, O(k) for counting k bits",
      spaceComplexity: "O(1)",
      problems: [
        { id: "bm-power-of-two", title: "Power of Two", platform: "leetcode", url: "https://leetcode.com/problems/power-of-two/", difficulty: "easy", isStandard: true, companies: ["Amazon", "Google"] },
        { id: "bm-power-of-four", title: "Power of Four", platform: "leetcode", url: "https://leetcode.com/problems/power-of-four/", difficulty: "easy", isStandard: false, companies: ["Amazon"] },
        { id: "bm-number-1-bits", title: "Number of 1 Bits", platform: "leetcode", url: "https://leetcode.com/problems/number-of-1-bits/", difficulty: "easy", isStandard: true, companies: ["Amazon", "Apple", "Microsoft"] },
        { id: "bm-reverse-bits", title: "Reverse Bits", platform: "leetcode", url: "https://leetcode.com/problems/reverse-bits/", difficulty: "easy", isStandard: true, companies: ["Amazon", "Apple"] },
        { id: "bm-bitwise-and-range", title: "Bitwise AND of Numbers Range", platform: "leetcode", url: "https://leetcode.com/problems/bitwise-and-of-numbers-range/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Microsoft"] },
        { id: "bm-divide-two-int", title: "Divide Two Integers", platform: "leetcode", url: "https://leetcode.com/problems/divide-two-integers/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Facebook"] },
        { id: "bm-sum-two-int", title: "Sum of Two Integers", platform: "leetcode", url: "https://leetcode.com/problems/sum-of-two-integers/", difficulty: "medium", isStandard: true, companies: ["Facebook", "Amazon"] },
        { id: "bm-binary-watch", title: "Binary Watch", platform: "leetcode", url: "https://leetcode.com/problems/binary-watch/", difficulty: "easy", isStandard: false, companies: ["Amazon"] }
      ]
    },
    {
      id: "count-set-bits",
      title: "Count Set Bits",
      tagline: "Efficiently count bits for ranges and arrays using DP and bit tricks",
      recognitionTips: ["Count total set bits from 1 to n", "Problems involving Hamming weight or popcount", "Need O(n) solution using DP with previous results", "Phrases like 'counting bits', 'total set bits'"],
      proTips: ["dp[i] = dp[i >> 1] + (i & 1) — uses previously computed values", "Alternative: dp[i] = dp[i & (i-1)] + 1 — leverages lowest bit removal", "For range 1 to n, use a pattern: groups of bits repeat in powers of 2"],
      approach: "Use DP: the number of set bits in i equals set bits in i/2 (right shift) plus the least significant bit. This gives O(n) for computing bits for 0 to n.",
      templateCode: `// Counting Bits — 0 to n
public int[] countBits(int n) {
    int[] dp = new int[n + 1];
    for (int i = 1; i <= n; i++) {
        dp[i] = dp[i >> 1] + (i & 1); // Why: bits(i) = bits(i/2) + last bit
    }
    return dp;
}
// Count Total Set Bits from 1 to n
public int countSetBitsRange(int n) {
    int count = 0;
    for (int i = 1; i <= n; i++) {
        count += Integer.bitCount(i);
    }
    return count;
    // Why: For O(log n) formula-based approach, count contribution of each bit position
}`,
      timeComplexity: "O(n)",
      spaceComplexity: "O(n)",
      problems: [
        { id: "bm-counting-bits-dp", title: "Counting Bits", platform: "leetcode", url: "https://leetcode.com/problems/counting-bits/", difficulty: "easy", isStandard: true, companies: ["Amazon", "Microsoft"] },
        { id: "bm-count-set-bits-gfg", title: "Count Total Set Bits", platform: "gfg", url: "https://www.geeksforgeeks.org/count-total-set-bits-in-all-numbers-from-1-to-n/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Microsoft"] },
        { id: "bm-min-flips", title: "Minimum Flips to Make a OR b Equal to c", platform: "leetcode", url: "https://leetcode.com/problems/minimum-flips-to-make-a-or-b-equal-to-c/", difficulty: "medium", isStandard: false, companies: ["Amazon"] },
        { id: "bm-prime-set-bits", title: "Prime Number of Set Bits in Binary Representation", platform: "leetcode", url: "https://leetcode.com/problems/prime-number-of-set-bits-in-binary-representation/", difficulty: "easy", isStandard: false, companies: ["Amazon"] },
        { id: "bm-alternating-bits", title: "Binary Number with Alternating Bits", platform: "leetcode", url: "https://leetcode.com/problems/binary-number-with-alternating-bits/", difficulty: "easy", isStandard: false, companies: ["Amazon"] },
        { id: "bm-decode-xored", title: "Decode XORed Array", platform: "leetcode", url: "https://leetcode.com/problems/decode-xored-array/", difficulty: "easy", isStandard: false, companies: ["Amazon"] },
        { id: "bm-concatenation-bin", title: "Concatenation of Consecutive Binary Numbers", platform: "leetcode", url: "https://leetcode.com/problems/concatenation-of-consecutive-binary-numbers/", difficulty: "medium", isStandard: false, companies: ["Amazon"] },
        { id: "bm-max-xor-two", title: "Maximum XOR of Two Numbers in an Array", platform: "leetcode", url: "https://leetcode.com/problems/maximum-xor-of-two-numbers-in-an-array/", difficulty: "medium", isStandard: true, companies: ["Google", "Amazon"] }
      ]
    },
    {
      id: "subset-generation-bits",
      title: "Subset Generation via Bits",
      tagline: "Generate all subsets using binary representation of numbers",
      recognitionTips: ["Generate all 2^n subsets of an array", "Each subset maps to a unique n-bit binary number", "Alternative to recursive backtracking for subset generation", "n is small enough (n ≤ 20) for 2^n enumeration"],
      proTips: ["For n elements, iterate from 0 to 2^n - 1; each bit indicates include/exclude", "This approach generates subsets in binary counting order (not lexicographic)", "Can also enumerate all submasks of a given mask efficiently"],
      approach: "Iterate through all numbers from 0 to 2^n - 1. For each number, check which bits are set — include the corresponding elements to form a subset. This generates all 2^n subsets iteratively.",
      templateCode: `// Subset Generation using Bitmask
public List<List<Integer>> subsets(int[] nums) {
    int n = nums.length;
    List<List<Integer>> result = new ArrayList<>();
    for (int mask = 0; mask < (1 << n); mask++) {
        List<Integer> subset = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            if ((mask & (1 << i)) != 0) { // Why: bit i is set → include nums[i]
                subset.add(nums[i]);
            }
        }
        result.add(subset);
    }
    return result;
}`,
      timeComplexity: "O(n * 2^n)",
      spaceComplexity: "O(n * 2^n) for output",
      problems: [
        { id: "bm-subsets-gen", title: "Subsets", platform: "leetcode", url: "https://leetcode.com/problems/subsets/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Facebook", "Google"] },
        { id: "bm-subsets-ii-gen", title: "Subsets II", platform: "leetcode", url: "https://leetcode.com/problems/subsets-ii/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Facebook"] },
        { id: "bm-letter-case-perm", title: "Letter Case Permutation", platform: "leetcode", url: "https://leetcode.com/problems/letter-case-permutation/", difficulty: "medium", isStandard: false, companies: ["Facebook"] },
        { id: "bm-find-unique-binary", title: "Find Unique Binary String", platform: "leetcode", url: "https://leetcode.com/problems/find-unique-binary-string/", difficulty: "medium", isStandard: false, companies: ["Amazon"] },
        { id: "bm-matchsticks-sq", title: "Matchsticks to Square", platform: "leetcode", url: "https://leetcode.com/problems/matchsticks-to-square/", difficulty: "medium", isStandard: false, companies: ["Amazon"] },
        { id: "bm-partition-k-equal", title: "Partition to K Equal Sum Subsets", platform: "leetcode", url: "https://leetcode.com/problems/partition-to-k-equal-sum-subsets/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Google"] },
        { id: "bm-stickers-spell", title: "Stickers to Spell Word", platform: "leetcode", url: "https://leetcode.com/problems/stickers-to-spell-word/", difficulty: "hard", isStandard: false, companies: ["Google"] },
        { id: "bm-max-and-pair", title: "Maximum AND Sum of Array", platform: "leetcode", url: "https://leetcode.com/problems/maximum-and-sum-of-array/", difficulty: "hard", isStandard: false, companies: ["Google"] }
      ]
    }
  ]
};

bitManipulation.totalProblems = bitManipulation.patterns.reduce((sum, p) => sum + p.problems.length, 0);
