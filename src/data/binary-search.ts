import { Topic } from "@/types";

export const binarySearch: Topic = {
  slug: "binary-search",
  title: "Binary Search",
  description: "Divide search space in half — sorted arrays, answer space, and rotated arrays",
  icon: "SearchCode",
  totalProblems: 0,
  patterns: [
    {
      id: "search-sorted",
      title: "Search in Sorted Array",
      tagline: "Classic binary search on a monotonically sorted array",
      recognitionTips: [
        "Array is sorted (ascending or descending) — this is the #1 signal for binary search",
        "Need O(log n) search for a target in a sorted collection",
        "Keywords: 'find element in sorted array', 'search insert position', 'sqrt(x)'",
        "Any problem where you can eliminate half the search space with one comparison",
        "2D sorted matrix: treat as a 1D sorted array with index mapping (row = idx/cols, col = idx%cols)",
        "Problem constraints say n ≤ 10^5 or 10^6 with O(log n) expected — binary search",
        "You need to find a 'boundary' or 'insertion point' rather than exact match"
      ],
      proTips: [
        "Use `left + (right - left) / 2` instead of `(left + right) / 2` to prevent integer overflow",
        "Decide carefully: `left <= right` (inclusive) vs `left < right` (exclusive) — affects termination and return value",
        "For lower bound: when target is found, DON'T return — set right = mid to keep narrowing left",
        "For upper bound: when target is found, set left = mid + 1 to find the position after the last occurrence",
        "Common bug: infinite loop when `left < right` and `mid = left + (right - left) / 2` with `left = mid` — use `mid = left + (right - left + 1) / 2` instead",
        "For 'search insert position', the answer is simply the lower_bound — where target would be inserted"
      ],
      approach: "Set left = 0, right = n-1. Compute mid. If target found, return. If target < mid, search left half. If target > mid, search right half. Repeat until left > right.",
      templateCode: `// Binary Search — Standard
public int search(int[] nums, int target) {
    int left = 0, right = nums.length - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2; // Why: avoids overflow
        if (nums[mid] == target) return mid;
        else if (nums[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}
// Lower Bound — First Position of Target
public int lowerBound(int[] nums, int target) {
    int left = 0, right = nums.length;
    while (left < right) {
        int mid = left + (right - left) / 2;
        if (nums[mid] < target) left = mid + 1;
        else right = mid; // Why: mid could be the answer, keep it
    }
    return left;
}`,
      timeComplexity: "O(log n)",
      spaceComplexity: "O(1)",
      problems: [
        { id: "bs-binary-search", title: "Binary Search", platform: "leetcode", url: "https://leetcode.com/problems/binary-search/", difficulty: "easy", isStandard: true, companies: ["Amazon", "Microsoft"] },
        { id: "bs-search-insert", title: "Search Insert Position", platform: "leetcode", url: "https://leetcode.com/problems/search-insert-position/", difficulty: "easy", isStandard: true, companies: ["Amazon", "Google"] },
        { id: "bs-guess-number", title: "Guess Number Higher or Lower", platform: "leetcode", url: "https://leetcode.com/problems/guess-number-higher-or-lower/", difficulty: "easy", isStandard: false, companies: ["Amazon"] },
        { id: "bs-sqrt", title: "Sqrt(x)", platform: "leetcode", url: "https://leetcode.com/problems/sqrtx/", difficulty: "easy", isStandard: true, companies: ["Amazon", "Facebook", "Microsoft"] },
        { id: "bs-valid-perfect-sq", title: "Valid Perfect Square", platform: "leetcode", url: "https://leetcode.com/problems/valid-perfect-square/", difficulty: "easy", isStandard: false, companies: ["Amazon"] },
        { id: "bs-2d-matrix", title: "Search a 2D Matrix", platform: "leetcode", url: "https://leetcode.com/problems/search-a-2d-matrix/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Microsoft", "Facebook"] },
        { id: "bs-2d-matrix-ii", title: "Search a 2D Matrix II", platform: "leetcode", url: "https://leetcode.com/problems/search-a-2d-matrix-ii/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Microsoft", "Google"] },
        { id: "bs-count-negative", title: "Count Negative Numbers in a Sorted Matrix", platform: "leetcode", url: "https://leetcode.com/problems/count-negative-numbers-in-a-sorted-matrix/", difficulty: "easy", isStandard: false, companies: ["Amazon"] }
      ]
    },
    {
      id: "search-answer-space",
      title: "Search on Answer Space",
      tagline: "Binary search on the answer value when the search space is monotonic",
      recognitionTips: [
        "Answer lies in a numeric range [min, max] and you need to find the optimal value",
        "A feasibility function check(x) is monotonic — if x works, all values ≥ x (or ≤ x) also work",
        "Keywords: 'minimum capacity', 'maximum sweetness', 'koko eating bananas', 'split array largest sum'",
        "Need to find the threshold where a condition flips from feasible to infeasible",
        "You're NOT searching an array — you're searching the space of possible answers",
        "Problem says 'minimize the maximum' or 'maximize the minimum' — classic answer-space binary search",
        "Brute force would try every possible answer value — binary search eliminates half each time"
      ],
      proTips: [
        "Define a clear check(x) function that returns boolean — this is the core of the solution",
        "Binary search on answer: if check(mid) is feasible, try to optimize (go left for min, right for max)",
        "The key insight: you're not searching an array — you're searching the answer range",
        "Ceiling division trick: `(a + b - 1) / b` avoids floating-point and works for integer division",
        "For 'painter's partition' / 'split array': check if you can split into ≤ k parts with max sum ≤ mid",
        "Always define search bounds carefully — lo should be the minimum possible answer, hi the maximum"
      ],
      approach: "Define the search range [lo, hi] for the answer. For each mid, check if it's feasible. If feasible, try to optimize (go left for minimum, right for maximum). If not feasible, search the other half.",
      templateCode: `// Search on Answer — Koko Eating Bananas (Minimum Speed)
public int minEatingSpeed(int[] piles, int h) {
    int left = 1, right = Arrays.stream(piles).max().getAsInt();
    while (left < right) {
        int mid = left + (right - left) / 2;
        if (canFinish(piles, mid, h)) {
            right = mid; // Why: mid speed works, try slower
        } else {
            left = mid + 1; // Why: too slow, need faster
        }
    }
    return left;
}
boolean canFinish(int[] piles, int speed, int hours) {
    int totalHours = 0;
    for (int pile : piles) {
        totalHours += (pile + speed - 1) / speed; // Why: ceiling division
    }
    return totalHours <= hours;
}`,
      timeComplexity: "O(n * log(max answer))",
      spaceComplexity: "O(1)",
      problems: [
        { id: "bs-koko-bananas", title: "Koko Eating Bananas", platform: "leetcode", url: "https://leetcode.com/problems/koko-eating-bananas/", difficulty: "medium", isStandard: true, companies: ["Google", "Facebook", "Amazon"] },
        { id: "bs-split-array", title: "Split Array Largest Sum", platform: "leetcode", url: "https://leetcode.com/problems/split-array-largest-sum/", difficulty: "hard", isStandard: true, companies: ["Google", "Amazon", "Facebook"] },
        { id: "bs-capacity-ship", title: "Capacity To Ship Packages Within D Days", platform: "leetcode", url: "https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Google"] },
        { id: "bs-magnetic-force", title: "Magnetic Force Between Two Balls", platform: "leetcode", url: "https://leetcode.com/problems/magnetic-force-between-two-balls/", difficulty: "medium", isStandard: false, companies: ["Google"] },
        { id: "bs-min-days-bouquets", title: "Minimum Number of Days to Make m Bouquets", platform: "leetcode", url: "https://leetcode.com/problems/minimum-number-of-days-to-make-m-bouquets/", difficulty: "medium", isStandard: false, companies: ["Google", "Amazon"] },
        { id: "bs-max-sweetness", title: "Divide Chocolate (Maximum Sweetness)", platform: "leetcode", url: "https://leetcode.com/problems/divide-chocolate/", difficulty: "hard", isStandard: true, companies: ["Google"] },
        { id: "bs-painters-partition-gfg", title: "Painter's Partition Problem", platform: "gfg", url: "https://www.geeksforgeeks.org/painters-partition-problem/", difficulty: "hard", isStandard: true, companies: ["Amazon", "Google"] },
        { id: "bs-aggr-cows-gfg", title: "Aggressive Cows", platform: "gfg", url: "https://www.geeksforgeeks.org/aggressive-cows/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Google"] }
      ]
    },
    {
      id: "rotated-array-search",
      title: "Rotated Array Search",
      tagline: "Binary search in arrays that were sorted then rotated",
      recognitionTips: [
        "Array was originally sorted but then rotated at some unknown pivot point",
        "Need to search for a target or find minimum in O(log n) — not O(n)",
        "Keywords: 'rotated sorted array', 'find minimum in rotated', 'find peak element'",
        "The array has two sorted halves joined at the rotation point",
        "Mountain array / bitonic array problems — value increases then decreases",
        "Single element in sorted array (every other element appears twice)"
      ],
      proTips: [
        "Core insight: at any mid, at least ONE half [left, mid] or [mid, right] is always sorted",
        "Determine which half is sorted, then check if target lies in that sorted half",
        "For 'find minimum': compare nums[mid] with nums[right] — if mid > right, min is in right half",
        "Handle duplicates carefully (nums[left] == nums[mid] == nums[right]) — worst case degrades to O(n)",
        "Peak element: if nums[mid] < nums[mid+1], peak is to the right; otherwise peak is at mid or left",
        "For 'single element in sorted array': check pairs — if nums[mid] == nums[mid^1], single element is to the right"
      ],
      approach: "Compute mid. Determine which half [left, mid] or [mid, right] is sorted. Check if the target lies in the sorted half. If yes, search there; otherwise search the other half.",
      templateCode: `// Search in Rotated Sorted Array
public int search(int[] nums, int target) {
    int left = 0, right = nums.length - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (nums[mid] == target) return mid;
        // Why: determine which half is sorted
        if (nums[left] <= nums[mid]) { // left half is sorted
            if (target >= nums[left] && target < nums[mid]) right = mid - 1;
            else left = mid + 1;
        } else { // right half is sorted
            if (target > nums[mid] && target <= nums[right]) left = mid + 1;
            else right = mid - 1;
        }
    }
    return -1;
}
// Find Minimum in Rotated Sorted Array
public int findMin(int[] nums) {
    int left = 0, right = nums.length - 1;
    while (left < right) {
        int mid = left + (right - left) / 2;
        if (nums[mid] > nums[right]) left = mid + 1; // Why: min is in right half
        else right = mid; // Why: mid could be the min
    }
    return nums[left];
}`,
      timeComplexity: "O(log n)",
      spaceComplexity: "O(1)",
      problems: [
        { id: "bs-search-rotated", title: "Search in Rotated Sorted Array", platform: "leetcode", url: "https://leetcode.com/problems/search-in-rotated-sorted-array/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Facebook", "Google", "Microsoft"] },
        { id: "bs-search-rotated-ii", title: "Search in Rotated Sorted Array II", platform: "leetcode", url: "https://leetcode.com/problems/search-in-rotated-sorted-array-ii/", difficulty: "medium", isStandard: true, companies: ["Facebook", "Amazon"] },
        { id: "bs-find-min", title: "Find Minimum in Rotated Sorted Array", platform: "leetcode", url: "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Microsoft", "Facebook"] },
        { id: "bs-find-min-ii", title: "Find Minimum in Rotated Sorted Array II", platform: "leetcode", url: "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array-ii/", difficulty: "hard", isStandard: false, companies: ["Amazon"] },
        { id: "bs-rotation-count-gfg", title: "Rotation Count in Rotated Sorted Array", platform: "gfg", url: "https://www.geeksforgeeks.org/find-rotation-count-rotated-sorted-array/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Microsoft"] },
        { id: "bs-find-peak", title: "Find Peak Element", platform: "leetcode", url: "https://leetcode.com/problems/find-peak-element/", difficulty: "medium", isStandard: true, companies: ["Facebook", "Google", "Amazon"] },
        { id: "bs-peak-mountain", title: "Peak Index in a Mountain Array", platform: "leetcode", url: "https://leetcode.com/problems/peak-index-in-a-mountain-array/", difficulty: "medium", isStandard: true, companies: ["Google", "Amazon"] },
        { id: "bs-single-sorted", title: "Single Element in a Sorted Array", platform: "leetcode", url: "https://leetcode.com/problems/single-element-in-a-sorted-array/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Google", "Microsoft"] }
      ]
    },
    {
      id: "find-first-last",
      title: "Find First/Last Position",
      tagline: "Use binary search variants to find boundaries of a target in sorted arrays",
      recognitionTips: [
        "Need the FIRST or LAST occurrence of a target in a sorted array, not just any occurrence",
        "Count occurrences of a target in sorted array — equals (rightBound - leftBound + 1)",
        "Keywords: 'first and last position', 'count of element', 'first bad version'",
        "Standard binary search finds ANY occurrence — but you need the boundary",
        "Median of two sorted arrays requires finding the correct partition using binary search",
        "Problem needs a 'random pick with weight' — binary search on prefix sum for weighted selection"
      ],
      proTips: [
        "For leftmost/first: when found, save result AND continue narrowing right (right = mid - 1)",
        "For rightmost/last: when found, save result AND continue narrowing left (left = mid + 1)",
        "Count of target = rightBound - leftBound + 1 (or 0 if target not found)",
        "Median of two sorted arrays: binary search on the shorter array, partition such that left half count = (m+n+1)/2",
        "First Bad Version: classic lower-bound binary search — minimize API calls by avoiding right = mid - 1 on bad",
        "Time-based key-value store: binary search for the largest timestamp ≤ target"
      ],
      approach: "Run binary search twice: once for the leftmost target (when found, continue narrowing right = mid), once for the rightmost (when found, continue narrowing left = mid). These give the range of the target.",
      templateCode: `// Find First and Last Position of Element
public int[] searchRange(int[] nums, int target) {
    return new int[]{findBound(nums, target, true), findBound(nums, target, false)};
}
int findBound(int[] nums, int target, boolean isFirst) {
    int left = 0, right = nums.length - 1, result = -1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (nums[mid] == target) {
            result = mid;
            if (isFirst) right = mid - 1; // Why: keep looking left for first
            else left = mid + 1; // Why: keep looking right for last
        } else if (nums[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return result;
}`,
      timeComplexity: "O(log n)",
      spaceComplexity: "O(1)",
      problems: [
        { id: "bs-first-last", title: "Find First and Last Position of Element in Sorted Array", platform: "leetcode", url: "https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/", difficulty: "medium", isStandard: true, companies: ["Facebook", "Amazon", "Google", "Microsoft"] },
        { id: "bs-first-bad-version", title: "First Bad Version", platform: "leetcode", url: "https://leetcode.com/problems/first-bad-version/", difficulty: "easy", isStandard: true, companies: ["Facebook", "Amazon", "Google"] },
        { id: "bs-count-occ-gfg", title: "Count Occurrences of a Number", platform: "gfg", url: "https://www.geeksforgeeks.org/count-number-of-occurrences-or-frequency-in-a-sorted-array/", difficulty: "easy", isStandard: true, companies: ["Amazon", "Microsoft"] },
        { id: "bs-h-index-ii", title: "H-Index II", platform: "leetcode", url: "https://leetcode.com/problems/h-index-ii/", difficulty: "medium", isStandard: false, companies: ["Facebook", "Google"] },
        { id: "bs-median-sorted", title: "Median of Two Sorted Arrays", platform: "leetcode", url: "https://leetcode.com/problems/median-of-two-sorted-arrays/", difficulty: "hard", isStandard: true, companies: ["Amazon", "Google", "Facebook", "Microsoft", "Apple"] },
        { id: "bs-kth-element-gfg", title: "K-th Element of Two Sorted Arrays", platform: "gfg", url: "https://www.geeksforgeeks.org/k-th-element-two-sorted-arrays/", difficulty: "hard", isStandard: true, companies: ["Amazon", "Microsoft", "Goldman Sachs"] },
        { id: "bs-random-pick-weight", title: "Random Pick with Weight", platform: "leetcode", url: "https://leetcode.com/problems/random-pick-with-weight/", difficulty: "medium", isStandard: true, companies: ["Facebook", "Google", "Amazon"] },
        { id: "bs-time-based-kv", title: "Time Based Key-Value Store", platform: "leetcode", url: "https://leetcode.com/problems/time-based-key-value-store/", difficulty: "medium", isStandard: true, companies: ["Google", "Amazon"] }
      ]
    }
  ]
};

binarySearch.totalProblems = binarySearch.patterns.reduce((sum, p) => sum + p.problems.length, 0);
