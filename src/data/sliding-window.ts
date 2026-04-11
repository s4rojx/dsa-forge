import { Topic } from "@/types";

export const slidingWindow: Topic = {
  slug: "sliding-window",
  title: "Sliding Window & Two Pointers",
  description: "Fixed and variable-width windows for substring, subarray, and two-pointer problems",
  icon: "MoveHorizontal",
  totalProblems: 0,
  patterns: [
    {
      id: "fixed-window",
      title: "Fixed Window",
      tagline: "Process subarrays of exact size K using a sliding window",
      recognitionTips: ["Problem specifies a fixed window size K", "Need max/min/sum of all subarrays of size K", "Phrases like 'subarray of size K', 'K consecutive elements'", "Window size doesn't change as it slides"],
      proTips: ["Initialize window with first K elements, then slide by adding right and removing left", "Use a deque for max/min in window in O(1) amortized", "Don't forget edge case: array length < K"],
      approach: "Build initial window of size K. Slide right: add new element, remove leftmost. At each position, compute the required metric (sum, max, min, average). This gives O(n) instead of O(n*K).",
      templateCode: `// Fixed Window — Maximum Sum Subarray of Size K
public int maxSumSubarray(int[] nums, int k) {
    int windowSum = 0, maxSum = 0;
    for (int i = 0; i < k; i++) windowSum += nums[i]; // Why: build initial window
    maxSum = windowSum;
    for (int i = k; i < nums.length; i++) {
        windowSum += nums[i] - nums[i - k]; // Why: slide — add right, remove left
        maxSum = Math.max(maxSum, windowSum);
    }
    return maxSum;
}`,
      cppTemplate: `// Fixed Window — Maximum Sum Subarray of Size K
int maxSumSubarray(vector<int>& nums, int k) {
    int windowSum = 0, maxSum = 0;
    for (int i = 0; i < k; i++) windowSum += nums[i]; // Why: build initial window
    maxSum = windowSum;
    for (int i = k; i < nums.size(); i++) {
        windowSum += nums[i] - nums[i - k]; // Why: slide — add right, remove left
        maxSum = max(maxSum, windowSum);
    }
    return maxSum;
}`,
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
      problems: [
        { id: "sw-max-avg-i", title: "Maximum Average Subarray I", platform: "leetcode", url: "https://leetcode.com/problems/maximum-average-subarray-i/", difficulty: "easy", isStandard: true, companies: ["Amazon", "Google"] },
        { id: "sw-max-sum-k-gfg", title: "Max Sum Subarray of Size K", platform: "gfg", url: "https://www.geeksforgeeks.org/find-maximum-minimum-sum-subarray-size-k/", difficulty: "easy", isStandard: true, companies: ["Amazon", "Microsoft"] },
        { id: "sw-grumpy-bookstore", title: "Grumpy Bookstore Owner", platform: "leetcode", url: "https://leetcode.com/problems/grumpy-bookstore-owner/", difficulty: "medium", isStandard: false, companies: ["Amazon"] },
        { id: "sw-k-beauty", title: "Finding the K-Beauty of a Number", platform: "leetcode", url: "https://leetcode.com/problems/finding-the-k-beauty-of-a-number/", difficulty: "easy", isStandard: false, companies: ["Amazon"] },
        { id: "sw-max-points-cards", title: "Maximum Points You Can Obtain from Cards", platform: "leetcode", url: "https://leetcode.com/problems/maximum-points-you-can-obtain-from-cards/", difficulty: "medium", isStandard: true, companies: ["Google", "Amazon"] },
        { id: "sw-sliding-window-max", title: "Sliding Window Maximum", platform: "leetcode", url: "https://leetcode.com/problems/sliding-window-maximum/", difficulty: "hard", isStandard: true, companies: ["Amazon", "Google", "Microsoft", "Facebook"] },
        { id: "sw-contains-dup-ii", title: "Contains Duplicate II", platform: "leetcode", url: "https://leetcode.com/problems/contains-duplicate-ii/", difficulty: "easy", isStandard: true, companies: ["Amazon", "Facebook"] },
        { id: "sw-diet-plan", title: "Diet Plan Performance", platform: "leetcode", url: "https://leetcode.com/problems/diet-plan-performance/", difficulty: "easy", isStandard: false, companies: ["Amazon"] }
      ]
    },
    {
      id: "variable-window",
      title: "Variable Window",
      tagline: "Expand and shrink window dynamically to find optimal substrings/subarrays",
      recognitionTips: ["Window size is not fixed — it grows and shrinks", "Find longest/shortest substring/subarray satisfying a condition", "Phrases like 'longest substring without repeating', 'minimum window substring'", "Two pointers: right expands to include, left shrinks to restore validity"],
      proTips: ["Expand right to make window valid/include more elements", "Shrink left when window violates the constraint", "Use HashMap/Set to track window contents for character problems"],
      approach: "Two pointers (left, right) both start at 0. Expand right to include new elements. When constraint is violated, shrink from left until constraint is restored. Track the best window seen.",
      templateCode: `// Variable Window — Longest Substring Without Repeating Characters
public int lengthOfLongestSubstring(String s) {
    Map<Character, Integer> lastSeen = new HashMap<>();
    int maxLen = 0, left = 0;
    for (int right = 0; right < s.length(); right++) {
        char ch = s.charAt(right);
        if (lastSeen.containsKey(ch) && lastSeen.get(ch) >= left) {
            left = lastSeen.get(ch) + 1; // Why: shrink past the duplicate
        }
        lastSeen.put(ch, right);
        maxLen = Math.max(maxLen, right - left + 1);
    }
    return maxLen;
}
// Minimum Window Substring
public String minWindow(String s, String t) {
    Map<Character, Integer> need = new HashMap<>(), have = new HashMap<>();
    for (char c : t.toCharArray()) need.merge(c, 1, Integer::sum);
    int required = need.size(), formed = 0;
    int left = 0, minLen = Integer.MAX_VALUE, minStart = 0;
    for (int right = 0; right < s.length(); right++) {
        char c = s.charAt(right);
        have.merge(c, 1, Integer::sum);
        if (need.containsKey(c) && have.get(c).intValue() == need.get(c).intValue()) formed++;
        while (formed == required) {
            if (right - left + 1 < minLen) { minLen = right - left + 1; minStart = left; }
            char lc = s.charAt(left);
            have.merge(lc, -1, Integer::sum);
            if (need.containsKey(lc) && have.get(lc) < need.get(lc)) formed--;
            left++;
        }
    }
    return minLen == Integer.MAX_VALUE ? "" : s.substring(minStart, minStart + minLen);
}`,
      cppTemplate: `// Variable Window — Longest Substring Without Repeating Characters
int lengthOfLongestSubstring(string s) {
    unordered_map<char, int> lastSeen;
    int maxLen = 0, left = 0;
    for (int right = 0; right < s.size(); right++) {
        char ch = s[right];
        if (lastSeen.count(ch) && lastSeen[ch] >= left) {
            left = lastSeen[ch] + 1; // Why: shrink past the duplicate
        }
        lastSeen[ch] = right;
        maxLen = max(maxLen, right - left + 1);
    }
    return maxLen;
}
// Minimum Window Substring
string minWindow(string s, string t) {
    unordered_map<char, int> need, have;
    for (char c : t) need[c]++;
    int required = need.size(), formed = 0;
    int left = 0, minLen = INT_MAX, minStart = 0;
    for (int right = 0; right < s.size(); right++) {
        char c = s[right];
        have[c]++;
        if (need.count(c) && have[c] == need[c]) formed++;
        while (formed == required) {
            if (right - left + 1 < minLen) { minLen = right - left + 1; minStart = left; }
            char lc = s[left];
            have[lc]--;
            if (need.count(lc) && have[lc] < need[lc]) formed--;
            left++;
        }
    }
    return minLen == INT_MAX ? "" : s.substr(minStart, minLen);
}`,
      timeComplexity: "O(n)",
      spaceComplexity: "O(k) where k = alphabet size",
      problems: [
        { id: "sw-longest-no-repeat", title: "Longest Substring Without Repeating Characters", platform: "leetcode", url: "https://leetcode.com/problems/longest-substring-without-repeating-characters/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Facebook", "Google", "Microsoft", "Apple"] },
        { id: "sw-min-window-sub", title: "Minimum Window Substring", platform: "leetcode", url: "https://leetcode.com/problems/minimum-window-substring/", difficulty: "hard", isStandard: true, companies: ["Facebook", "Amazon", "Google", "Microsoft"] },
        { id: "sw-longest-k-distinct", title: "Longest Substring with At Most K Distinct Characters", platform: "leetcode", url: "https://leetcode.com/problems/longest-substring-with-at-most-k-distinct-characters/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Google", "Facebook"] },
        { id: "sw-fruit-baskets", title: "Fruit Into Baskets", platform: "leetcode", url: "https://leetcode.com/problems/fruit-into-baskets/", difficulty: "medium", isStandard: true, companies: ["Google", "Amazon"] },
        { id: "sw-longest-repeating-replace", title: "Longest Repeating Character Replacement", platform: "leetcode", url: "https://leetcode.com/problems/longest-repeating-character-replacement/", difficulty: "medium", isStandard: true, companies: ["Google", "Amazon"] },
        { id: "sw-permutation-in-string", title: "Permutation in String", platform: "leetcode", url: "https://leetcode.com/problems/permutation-in-string/", difficulty: "medium", isStandard: true, companies: ["Microsoft", "Amazon"] },
        { id: "sw-find-all-anagrams", title: "Find All Anagrams in a String", platform: "leetcode", url: "https://leetcode.com/problems/find-all-anagrams-in-a-string/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Facebook", "Microsoft"] },
        { id: "sw-min-size-subarray", title: "Minimum Size Subarray Sum", platform: "leetcode", url: "https://leetcode.com/problems/minimum-size-subarray-sum/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Facebook", "Goldman Sachs"] },
        { id: "sw-subarrays-k-diff", title: "Subarrays with K Different Integers", platform: "leetcode", url: "https://leetcode.com/problems/subarrays-with-k-different-integers/", difficulty: "hard", isStandard: true, companies: ["Google", "Amazon"] },
        { id: "sw-substring-concat", title: "Substring with Concatenation of All Words", platform: "leetcode", url: "https://leetcode.com/problems/substring-with-concatenation-of-all-words/", difficulty: "hard", isStandard: true, companies: ["Amazon", "Google"] }
      ]
    },
    {
      id: "two-pointer-opposite",
      title: "Two-Pointer Opposite Ends",
      tagline: "Converge from both ends to find pairs or optimize values",
      recognitionTips: ["Array is sorted or problem benefits from converging pointers", "Find pairs summing to target from sorted data", "Phrases like 'two sum sorted', 'container with most water', 'valid palindrome'", "Comparing elements from both ends narrows the search space"],
      proTips: ["Start left=0, right=n-1 and converge based on comparison with target", "For container with most water: move the pointer at the shorter line", "This technique avoids O(n²) brute force"],
      approach: "Place pointers at both ends. Compare their combined value with the target. If too small, move left pointer right; if too large, move right pointer left. Continue until pointers meet.",
      templateCode: `// Two-Pointer Opposite — Container With Most Water
public int maxArea(int[] height) {
    int left = 0, right = height.length - 1;
    int maxWater = 0;
    while (left < right) {
        int width = right - left;
        int h = Math.min(height[left], height[right]);
        maxWater = Math.max(maxWater, width * h);
        // Why: move the shorter line — keeping it can only decrease area
        if (height[left] < height[right]) left++;
        else right--;
    }
    return maxWater;
}`,
      cppTemplate: `// Two-Pointer Opposite — Container With Most Water
int maxArea(vector<int>& height) {
    int left = 0, right = height.size() - 1;
    int maxWater = 0;
    while (left < right) {
        int width = right - left;
        int h = min(height[left], height[right]);
        maxWater = max(maxWater, width * h);
        // Why: move the shorter line — keeping it can only decrease area
        if (height[left] < height[right]) left++;
        else right--;
    }
    return maxWater;
}`,
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
      problems: [
        { id: "sw-two-sum-sorted", title: "Two Sum II - Input Array Is Sorted", platform: "leetcode", url: "https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Microsoft"] },
        { id: "sw-container-water", title: "Container With Most Water", platform: "leetcode", url: "https://leetcode.com/problems/container-with-most-water/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Goldman Sachs", "Google", "Facebook"] },
        { id: "sw-valid-palindrome", title: "Valid Palindrome", platform: "leetcode", url: "https://leetcode.com/problems/valid-palindrome/", difficulty: "easy", isStandard: true, companies: ["Facebook", "Microsoft", "Amazon"] },
        { id: "sw-valid-palindrome-ii", title: "Valid Palindrome II", platform: "leetcode", url: "https://leetcode.com/problems/valid-palindrome-ii/", difficulty: "easy", isStandard: true, companies: ["Facebook", "Amazon"] },
        { id: "sw-3sum", title: "3Sum", platform: "leetcode", url: "https://leetcode.com/problems/3sum/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Facebook", "Google", "Microsoft"] },
        { id: "sw-3sum-closest", title: "3Sum Closest", platform: "leetcode", url: "https://leetcode.com/problems/3sum-closest/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Facebook"] },
        { id: "sw-trap-rain-2p", title: "Trapping Rain Water", platform: "leetcode", url: "https://leetcode.com/problems/trapping-rain-water/", difficulty: "hard", isStandard: true, companies: ["Amazon", "Goldman Sachs", "Google", "Facebook"] },
        { id: "sw-sort-colors-2p", title: "Sort Colors", platform: "leetcode", url: "https://leetcode.com/problems/sort-colors/", difficulty: "medium", isStandard: true, companies: ["Microsoft", "Amazon", "Facebook"] }
      ]
    },
    {
      id: "two-pointer-same",
      title: "Two-Pointer Same Direction",
      tagline: "Both pointers start from the same end for in-place operations and merging",
      recognitionTips: ["Need to modify array in-place with a write pointer", "Phrases like 'remove duplicates', 'remove element', 'merge sorted arrays'", "Fast pointer reads, slow pointer writes", "Both pointers move left to right"],
      proTips: ["Slow pointer = write position, fast pointer = read position", "Skip elements that should be removed; write elements that should be kept", "Useful for removing duplicates, partitioning, and in-place filtering"],
      approach: "Use a slow (write) and fast (read) pointer. Fast scans all elements. When an element should be kept, write it at slow pointer and advance slow. Skip elements that should be removed.",
      templateCode: `// Same Direction — Remove Duplicates from Sorted Array
public int removeDuplicates(int[] nums) {
    if (nums.length == 0) return 0;
    int writePtr = 1; // Why: first element is always unique
    for (int readPtr = 1; readPtr < nums.length; readPtr++) {
        if (nums[readPtr] != nums[readPtr - 1]) {
            nums[writePtr] = nums[readPtr]; // Why: new unique element found
            writePtr++;
        }
    }
    return writePtr; // Why: number of unique elements
}`,
      cppTemplate: `// Same Direction — Remove Duplicates from Sorted Array
int removeDuplicates(vector<int>& nums) {
    if (nums.size() == 0) return 0;
    int writePtr = 1; // Why: first element is always unique
    for (int readPtr = 1; readPtr < nums.size(); readPtr++) {
        if (nums[readPtr] != nums[readPtr - 1]) {
            nums[writePtr] = nums[readPtr]; // Why: new unique element found
            writePtr++;
        }
    }
    return writePtr; // Why: number of unique elements
}`,
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
      problems: [
        { id: "sw-remove-dupes", title: "Remove Duplicates from Sorted Array", platform: "leetcode", url: "https://leetcode.com/problems/remove-duplicates-from-sorted-array/", difficulty: "easy", isStandard: true, companies: ["Facebook", "Microsoft", "Amazon"] },
        { id: "sw-remove-dupes-ii", title: "Remove Duplicates from Sorted Array II", platform: "leetcode", url: "https://leetcode.com/problems/remove-duplicates-from-sorted-array-ii/", difficulty: "medium", isStandard: true, companies: ["Facebook", "Amazon"] },
        { id: "sw-remove-element", title: "Remove Element", platform: "leetcode", url: "https://leetcode.com/problems/remove-element/", difficulty: "easy", isStandard: true, companies: ["Amazon"] },
        { id: "sw-move-zeroes", title: "Move Zeroes", platform: "leetcode", url: "https://leetcode.com/problems/move-zeroes/", difficulty: "easy", isStandard: true, companies: ["Facebook", "Amazon", "Apple"] },
        { id: "sw-squares-sorted", title: "Squares of a Sorted Array", platform: "leetcode", url: "https://leetcode.com/problems/squares-of-a-sorted-array/", difficulty: "easy", isStandard: true, companies: ["Facebook", "Amazon", "Google"] },
        { id: "sw-backspace-compare", title: "Backspace String Compare", platform: "leetcode", url: "https://leetcode.com/problems/backspace-string-compare/", difficulty: "easy", isStandard: true, companies: ["Google", "Facebook", "Amazon"] },
        { id: "sw-interval-list-inter", title: "Interval List Intersections", platform: "leetcode", url: "https://leetcode.com/problems/interval-list-intersections/", difficulty: "medium", isStandard: true, companies: ["Facebook", "Amazon"] },
        { id: "sw-longest-mountain", title: "Longest Mountain in Array", platform: "leetcode", url: "https://leetcode.com/problems/longest-mountain-in-array/", difficulty: "medium", isStandard: false, companies: ["Google", "Amazon"] }
      ]
    }
  ]
};

slidingWindow.totalProblems = slidingWindow.patterns.reduce((sum, p) => sum + p.problems.length, 0);
