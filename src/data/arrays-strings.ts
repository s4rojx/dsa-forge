import { Topic } from "@/types";

export const arraysStrings: Topic = {
  slug: "arrays-strings",
  title: "Arrays & Strings",
  description: "Foundation of DSA — master traversal, manipulation, and subarray techniques",
  icon: "LayoutList",
  totalProblems: 0,
  patterns: [
    {
      id: "prefix-sum",
      title: "Prefix Sum",
      tagline: "Precompute cumulative sums for O(1) range queries",
      recognitionTips: [
        "Problem asks for sum/count in a subarray or range — prefix sum precomputes this",
        "Keywords: 'subarray sum equals K', 'range sum query', 'contiguous array'",
        "Brute force involves nested loops summing subarrays (O(n²)) — prefix sum reduces to O(n)",
        "Problem involves cumulative frequency, running totals, or prefix-based calculations",
        "If you see 'number of subarrays with sum = target', think prefix sum + HashMap",
        "2D range sum queries — apply prefix sum in both dimensions with inclusion-exclusion",
        "Product of array except self — prefix and suffix products are a variant"
      ],
      proTips: [
        "Use a HashMap to store prefix sum frequencies for O(1) lookup when target sum is involved",
        "For 2D prefix sums, apply inclusion-exclusion: sum(r1,c1,r2,c2) = prefix[r2][c2] - prefix[r1-1][c2] - prefix[r2][c1-1] + prefix[r1-1][c1-1]",
        "Watch for integer overflow — use long when summing large arrays",
        "Always initialize HashMap with (0, 1) — the empty prefix has sum 0 with count 1",
        "Contiguous Array (equal 0s and 1s): treat 0 as -1, then find longest subarray with sum 0 using prefix sum",
        "For 'divisible by K': use modular arithmetic on prefix sums; handle negative remainders carefully"
      ],
      approach: "Build a prefix sum array where prefix[i] = sum of elements from index 0 to i-1. To get sum of subarray [l, r], compute prefix[r+1] - prefix[l]. For 'subarray sum equals K' problems, use a HashMap storing prefix sum frequencies.",
      templateCode: `// Prefix Sum — Subarray Sum Equals K
public int subarraySum(int[] nums, int k) {
    // Why: HashMap stores how many times each prefix sum has occurred
    Map<Integer, Integer> prefixCount = new HashMap<>();
    prefixCount.put(0, 1); // Why: empty prefix has sum 0
    
    int currentSum = 0;
    int result = 0;
    
    for (int num : nums) {
        currentSum += num;
        // Why: if (currentSum - k) was seen before, those subarrays sum to k
        int complement = currentSum - k;
        result += prefixCount.getOrDefault(complement, 0);
        prefixCount.merge(currentSum, 1, Integer::sum);
    }
    return result;
}`,
      cppTemplate: `// Prefix Sum — Subarray Sum Equals K
#include <bits/stdc++.h>
using namespace std;
int subarraySum(vector<int>& nums, int k) {
    unordered_map<int, int> freq; 
    freq[0] = 1; // empty prefix sum
    int sum = 0;
    int count = 0;
    for (int x : nums) {
        sum += x;  
        // if (sum - k) seen before → subarray exists
        if (freq.count(sum - k)) {
            count += freq[sum - k];
        }
        // store current prefix sum
        freq[sum]++;
    }
    return count;
}`,
      timeComplexity: "O(n)",
      spaceComplexity: "O(n)",
      problems: [
        { id: "as-running-sum", title: "Running Sum of 1d Array", platform: "leetcode", url: "https://leetcode.com/problems/running-sum-of-1d-array/", difficulty: "easy", isStandard: false, companies: ["Amazon", "Apple"] },
        { id: "as-range-sum-query", title: "Range Sum Query - Immutable", platform: "leetcode", url: "https://leetcode.com/problems/range-sum-query-immutable/", difficulty: "easy", isStandard: true, companies: ["Google", "Facebook"] },
        { id: "as-find-pivot-index", title: "Find Pivot Index", platform: "leetcode", url: "https://leetcode.com/problems/find-pivot-index/", difficulty: "easy", isStandard: true, companies: ["Goldman Sachs", "Facebook"] },
        { id: "as-subarray-sum-k", title: "Subarray Sum Equals K", platform: "leetcode", url: "https://leetcode.com/problems/subarray-sum-equals-k/", difficulty: "medium", isStandard: true, companies: ["Google", "Facebook", "Amazon", "Microsoft"] },
        { id: "as-contiguous-array", title: "Contiguous Array", platform: "leetcode", url: "https://leetcode.com/problems/contiguous-array/", difficulty: "medium", isStandard: true, companies: ["Facebook", "Amazon", "Goldman Sachs"] },
        { id: "as-product-except-self", title: "Product of Array Except Self", platform: "leetcode", url: "https://leetcode.com/problems/product-of-array-except-self/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Apple", "Microsoft", "Facebook"] },
        { id: "as-range-sum-2d", title: "Range Sum Query 2D - Immutable", platform: "leetcode", url: "https://leetcode.com/problems/range-sum-query-2d-immutable/", difficulty: "medium", isStandard: false, companies: ["Google", "Facebook"] },
        { id: "as-subarray-div-k", title: "Subarray Sums Divisible by K", platform: "leetcode", url: "https://leetcode.com/problems/subarray-sums-divisible-by-k/", difficulty: "medium", isStandard: true, companies: ["Goldman Sachs", "Microsoft", "Amazon"] },
        { id: "as-max-subarray-sum-k", title: "Maximum Size Subarray Sum Equals K", platform: "leetcode", url: "https://leetcode.com/problems/maximum-size-subarray-sum-equals-k/", difficulty: "hard", isStandard: true, companies: ["Facebook", "Google"] },
        { id: "as-count-subarrays-score", title: "Count Subarrays With Score Less Than K", platform: "leetcode", url: "https://leetcode.com/problems/count-subarrays-with-score-less-than-k/", difficulty: "hard", isStandard: false, companies: ["Google"] }
      ]
    },
    {
      id: "kadanes-algorithm",
      title: "Kadane's Algorithm",
      tagline: "Find maximum subarray sum in linear time",
      recognitionTips: [
        "Problem asks for maximum/minimum subarray sum — the classic Kadane's signal",
        "You need to find a contiguous subarray with optimal (max or min) value",
        "Keywords: 'maximum sum subarray', 'best time to buy and sell stock', 'maximum product'",
        "Local vs global optimum decision at each element: extend current subarray or start fresh",
        "Stock problems (buy/sell once) are Kadane's in disguise — apply to price differences",
        "Circular array variant: answer = max(normal Kadane, totalSum - minSubarraySum)"
      ],
      proTips: [
        "Track both maxEndingHere and maxSoFar — reset maxEndingHere when it drops below current element",
        "For circular arrays, answer is max(normal Kadane, totalSum - minSubarraySum) — but handle all-negative case",
        "Kadane's can be adapted for maximum product by tracking both max AND min products at each step",
        "For 'best time to buy and sell stock': compute diff[i] = prices[i] - prices[i-1], then run Kadane's on diffs",
        "If the problem asks for the actual subarray (not just the sum), track start/end indices during the scan",
        "Common interview mistake: forgetting that maxEndingHere can be reset to nums[i] when prefix sum is negative"
      ],
      approach: "At each index, decide: either extend the current subarray or start a new one from this element. Keep track of the running max ending at the current position (maxEndingHere) and the overall best (maxSoFar). This greedy approach works because any subarray with negative prefix sum should be discarded.",
      templateCode: `// Kadane's Algorithm — Maximum Subarray Sum
public int maxSubArray(int[] nums) {
    int maxEndingHere = nums[0];
    int maxSoFar = nums[0];
    
    for (int i = 1; i < nums.length; i++) {
        // Why: either extend previous subarray or start fresh from nums[i]
        maxEndingHere = Math.max(nums[i], maxEndingHere + nums[i]);
        maxSoFar = Math.max(maxSoFar, maxEndingHere);
    }
    return maxSoFar;
}

// Variant — Maximum Subarray Sum in Circular Array
public int maxSubarraySumCircular(int[] nums) {
    int totalSum = 0;
    int maxSum = nums[0], minSum = nums[0];
    int curMax = 0, curMin = 0;
    
    for (int num : nums) {
        curMax = Math.max(num, curMax + num);
        maxSum = Math.max(maxSum, curMax);
        curMin = Math.min(num, curMin + num);
        minSum = Math.min(minSum, curMin);
        totalSum += num;
    }
    // Why: if all elements are negative, maxSum handles it; otherwise check circular case
    return maxSum > 0 x Math.max(maxSum, totalSum - minSum) : maxSum;
}`,
      cppTemplate: `// Kadane's Algorithm — Maximum Subarray Sum
int maxSubArray(vector<int> &nums)
{
    int curr_sum = 0;
    int ans = INT_MIN;
    for (int i = 0; i < nums.size(); i++)
    {
        curr_sum += nums[i]; //Update currentSum by adding the current element to it.
        ans = max(ans, curr_sum); //Update the maximum sum found so far.
        if (curr_sum < 0)
            curr_sum = 0; //Reset currentSum to 0 if it becomes negative.
    }
    return ans;
}

// Variant — Maximum Subarray Sum in Circular Array
#include <bits/stdc++.h>
using namespace std;

int maxSubarraySumCircular(vector<int>& nums) {
    int total = 0;
    int curMax = 0, maxSum = INT_MIN;
    int curMin = 0, minSum = INT_MAX;
    for (int x : nums) {
        // normal max subarray (Kadane)
        curMax = max(x, curMax + x);
        maxSum = max(maxSum, curMax);
        // min subarray
        curMin = min(x, curMin + x);
        minSum = min(minSum, curMin);

        total += x;
    }
    // if all numbers are negative
    if (maxSum < 0) return maxSum;
    // either normal or circular
    return max(maxSum, total - minSum);
}`,
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
      problems: [
        { id: "as-max-subarray", title: "Maximum Subarray", platform: "leetcode", url: "https://leetcode.com/problems/maximum-subarray/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Microsoft", "Google", "Apple", "Facebook"] },
        { id: "as-best-time-stock", title: "Best Time to Buy and Sell Stock", platform: "leetcode", url: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/", difficulty: "easy", isStandard: true, companies: ["Amazon", "Goldman Sachs", "Facebook", "Microsoft"] },
        { id: "as-max-sum-circular", title: "Maximum Sum Circular Subarray", platform: "leetcode", url: "https://leetcode.com/problems/maximum-sum-circular-subarray/", difficulty: "medium", isStandard: true, companies: ["Goldman Sachs", "Amazon", "Google"] },
        { id: "as-max-product-subarray", title: "Maximum Product Subarray", platform: "leetcode", url: "https://leetcode.com/problems/maximum-product-subarray/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Microsoft", "Google"] },
        { id: "as-max-abs-sum", title: "Maximum Absolute Sum of Any Subarray", platform: "leetcode", url: "https://leetcode.com/problems/maximum-absolute-sum-of-any-subarray/", difficulty: "medium", isStandard: false, companies: ["Amazon"] },
        { id: "as-longest-turbulent", title: "Longest Turbulent Subarray", platform: "leetcode", url: "https://leetcode.com/problems/longest-turbulent-subarray/", difficulty: "medium", isStandard: false, companies: ["Amazon", "Google"] },
        { id: "as-max-subarray-concat", title: "K-Concatenation Maximum Sum", platform: "leetcode", url: "https://leetcode.com/problems/k-concatenation-maximum-sum/", difficulty: "hard", isStandard: false, companies: ["Google"] },
        { id: "as-max-subarray-one-del", title: "Maximum Subarray Sum with One Deletion", platform: "leetcode", url: "https://leetcode.com/problems/maximum-subarray-sum-with-one-deletion/", difficulty: "hard", isStandard: true, companies: ["Microsoft", "Google"] }
      ]
    },
    {
      id: "two-pointers-array",
      title: "Two Pointers",
      tagline: "Converge from both ends or march in tandem to solve in-place",
      recognitionTips: [
        "Array is sorted or can be sorted without changing the answer",
        "Problem asks for pairs/triplets satisfying a condition (sum, product, distance)",
        "Need to remove duplicates or move elements in-place with O(1) extra space",
        "Keywords: 'two sum in sorted array', 'container with most water', '3Sum'",
        "Opposite-end pointers: start from both ends and converge toward the middle",
        "Same-direction pointers: one 'slow' and one 'fast' pointer march together",
        "Partitioning problems: rearrange array around a condition (move zeroes, sort by parity)"
      ],
      proTips: [
        "Always clarify: do pointers start from same end or opposite ends of the arrayx",
        "For 3Sum/4Sum, fix one element and reduce to 2Sum with two pointers on the remaining sorted subarray",
        "When removing duplicates, use a 'write pointer' that only advances on unique elements",
        "Container With Most Water: move the shorter side inward — moving the taller side can never improve area",
        "For 'valid palindrome' problems, two pointers from both ends + skip non-alphanumeric characters",
        "Watch for duplicate-handling in 3Sum: skip consecutive equal values after finding a valid triplet"
      ],
      approach: "Place two pointers at strategic positions (typically both ends for sorted arrays, or both at start for partitioning). Move pointers based on comparison with target. This eliminates the need for nested loops, reducing O(n²) to O(n).",
      templateCode: `// Two Pointers — Two Sum II (Sorted Array)
public int[] twoSum(int[] numbers, int target) {
    int left = 0;
    int right = numbers.length - 1;
    
    while (left < right) {
        int currentSum = numbers[left] + numbers[right];
        if (currentSum == target) {
            return new int[]{left + 1, right + 1}; // Why: 1-indexed
        } else if (currentSum < target) {
            left++; // Why: need a larger sum, move left pointer right
        } else {
            right--; // Why: need a smaller sum, move right pointer left
        }
    }
    return new int[]{-1, -1};
}

// Two Pointers — 3Sum
public List<List<Integer>> threeSum(int[] nums) {
    Arrays.sort(nums);
    List<List<Integer>> result = new ArrayList<>();
    
    for (int i = 0; i < nums.length - 2; i++) {
        if (i > 0 && nums[i] == nums[i - 1]) continue; // Why: skip duplicates
        int left = i + 1, right = nums.length - 1;
        while (left < right) {
            int sum = nums[i] + nums[left] + nums[right];
            if (sum == 0) {
                result.add(Arrays.asList(nums[i], nums[left], nums[right]));
                while (left < right && nums[left] == nums[left + 1]) left++;
                while (left < right && nums[right] == nums[right - 1]) right--;
                left++;
                right--;
            } else if (sum < 0) left++;
            else right--;
        }
    }
    return result;
}`,
      cppTemplate: `// Two Pointers — Two Sum II (Sorted Array)
vector<int> twoSum(vector<int> &nums, int target)
{
    unordered_map<int, int> mp;
    for (int i = 0; i < nums.size(); i++)
    {
        int remain = target - nums[i];
        if (mp.find(remain) != mp.end() && mp[remain] != i)
            return {i, mp[remain]};
        mp[nums[i]] = i;
    }
    return {-1, -1};
    // If the question asks to just return whether pair exists or not, not the indexes in that case we can sort and easily find the pair sum without extra space
}

// Two Pointers — 3Sum
vector<vector<int>> threeSum(vector<int> &nums)
{
    vector<vector<int>> ans;
    sort(nums.begin(), nums.end());

    for (int k = 0; k < nums.size(); k++)
    {
        int i = k + 1;
        int j = nums.size() - 1;
        int target = -nums[k];
        while (i < j)
        {
            int sum = nums[i] + nums[j];
            if (sum == target)
            {
                ans.push_back({nums[k], nums[i], nums[j]});
                i++;
                j--;
                // Skip duplicate elements
                while (i < j && nums[i] == nums[i - 1])
                    i++;
                while (i < j && nums[j] == nums[j + 1])
                    j--;
            }
            else if (sum < target)
            {
                i++;
            }
            else
            {
                j--;
            }
        }
        // Skip duplicate elements
        while (k + 1 < nums.size() && nums[k + 1] == nums[k])
            k++;
    }

    return ans;
}`,
      timeComplexity: "O(n) for two sum, O(n²) for 3Sum",
      spaceComplexity: "O(1) excluding output",
      problems: [
        { id: "as-two-sum-sorted", title: "Two Sum II - Input Array Is Sorted", platform: "leetcode", url: "https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Microsoft", "Google"] },
        { id: "as-remove-duplicates", title: "Remove Duplicates from Sorted Array", platform: "leetcode", url: "https://leetcode.com/problems/remove-duplicates-from-sorted-array/", difficulty: "easy", isStandard: true, companies: ["Facebook", "Microsoft", "Amazon"] },
        { id: "as-move-zeroes", title: "Move Zeroes", platform: "leetcode", url: "https://leetcode.com/problems/move-zeroes/", difficulty: "easy", isStandard: true, companies: ["Facebook", "Amazon", "Apple"] },
        { id: "as-container-water", title: "Container With Most Water", platform: "leetcode", url: "https://leetcode.com/problems/container-with-most-water/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Goldman Sachs", "Google", "Facebook"] },
        { id: "as-three-sum", title: "3Sum", platform: "leetcode", url: "https://leetcode.com/problems/3sum/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Facebook", "Google", "Microsoft", "Apple"] },
        { id: "as-three-sum-closest", title: "3Sum Closest", platform: "leetcode", url: "https://leetcode.com/problems/3sum-closest/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Facebook", "Google"] },
        { id: "as-four-sum", title: "4Sum", platform: "leetcode", url: "https://leetcode.com/problems/4sum/", difficulty: "medium", isStandard: false, companies: ["Amazon", "Microsoft"] },
        { id: "as-sort-colors", title: "Sort Colors", platform: "leetcode", url: "https://leetcode.com/problems/sort-colors/", difficulty: "medium", isStandard: true, companies: ["Microsoft", "Amazon", "Facebook"] },
        { id: "as-trapping-rain", title: "Trapping Rain Water", platform: "leetcode", url: "https://leetcode.com/problems/trapping-rain-water/", difficulty: "hard", isStandard: true, companies: ["Amazon", "Goldman Sachs", "Google", "Microsoft", "Facebook"] },
        { id: "as-valid-palindrome", title: "Valid Palindrome", platform: "leetcode", url: "https://leetcode.com/problems/valid-palindrome/", difficulty: "easy", isStandard: true, companies: ["Facebook", "Microsoft", "Amazon"] }
      ]
    },
    {
      id: "dutch-national-flag",
      title: "Dutch National Flag",
      tagline: "Three-way partitioning in a single pass",
      recognitionTips: [
        "Array contains exactly 3 distinct values/categories",
        "Need to partition array into 3 groups in-place",
        "Problem says 'sort colors' or 'three-way partition'",
        "Elements need to be grouped: low | mid | high"
      ],
      proTips: [
        "Use three pointers: low, mid, high — process elements at mid pointer",
        "Only increment mid when swapping with low; decrement high when swapping with high (don't increment mid in this case!)",
        "This is a special case of quicksort's partition scheme"
      ],
      approach: "Maintain three regions using pointers: [0..low-1] for first group, [low..mid-1] for second group, [high+1..n-1] for third group. Process element at mid: swap to appropriate region and adjust pointers. Single pass O(n) solution.",
      templateCode: `// Dutch National Flag — Sort Colors (0, 1, 2)
public void sortColors(int[] nums) {
    int low = 0, mid = 0, high = nums.length - 1;
    
    while (mid <= high) {
        if (nums[mid] == 0) {
            // Why: move 0 to the front by swapping with low pointer
            swap(nums, low, mid);
            low++;
            mid++;
        } else if (nums[mid] == 1) {
            // Why: 1 is already in correct region, just advance mid
            mid++;
        } else {
            // Why: move 2 to the back; don't advance mid because
            // the swapped element hasn't been examined yet
            swap(nums, mid, high);
            high--;
        }
    }
}

private void swap(int[] nums, int i, int j) {
    int temp = nums[i];
    nums[i] = nums[j];
    nums[j] = temp;
}`,
      cppTemplate: `// Dutch National Flag — Sort Colors (0, 1, 2)
void sortColors(vector<int>& nums) {
    int low = 0, mid = 0, high = nums.size() - 1;

    while (mid <= high) {
        if (nums[mid] == 0) {
            swap(nums[low], nums[mid]);
            low++;
            mid++;
        }
        else if (nums[mid] == 1) {
            mid++; // already in correct place
        }
        else { // nums[mid] == 2
            swap(nums[mid], nums[high]);
            high--; // don't move mid here
        }
    }
}`,
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
      problems: [
        { id: "as-sort-colors-dnf", title: "Sort Colors", platform: "leetcode", url: "https://leetcode.com/problems/sort-colors/", difficulty: "medium", isStandard: true, companies: ["Microsoft", "Amazon", "Facebook", "Google"] },
        { id: "as-move-zeroes-dnf", title: "Move Zeroes", platform: "leetcode", url: "https://leetcode.com/problems/move-zeroes/", difficulty: "easy", isStandard: true, companies: ["Facebook", "Amazon"] },
        { id: "as-sort-array-parity", title: "Sort Array By Parity", platform: "leetcode", url: "https://leetcode.com/problems/sort-array-by-parity/", difficulty: "easy", isStandard: false, companies: ["Facebook", "Amazon"] },
        { id: "as-sort-array-parity-ii", title: "Sort Array By Parity II", platform: "leetcode", url: "https://leetcode.com/problems/sort-array-by-parity-ii/", difficulty: "easy", isStandard: false, companies: ["Amazon"] },
        { id: "as-partition-labels", title: "Partition Labels", platform: "leetcode", url: "https://leetcode.com/problems/partition-labels/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Google"] },
        { id: "as-wiggle-sort-ii", title: "Wiggle Sort II", platform: "leetcode", url: "https://leetcode.com/problems/wiggle-sort-ii/", difficulty: "medium", isStandard: false, companies: ["Google", "Microsoft"] },
        { id: "as-sort-012-gfg", title: "Sort an array of 0s, 1s and 2s", platform: "gfg", url: "https://www.geeksforgeeks.org/sort-an-array-of-0s-1s-and-2s/", difficulty: "easy", isStandard: true, companies: ["Amazon", "Microsoft", "Flipkart"] },
        { id: "as-three-way-partition", title: "Three Way Partitioning", platform: "gfg", url: "https://www.geeksforgeeks.org/three-way-partitioning-of-an-array-around-a-given-range/", difficulty: "medium", isStandard: false, companies: ["Amazon"] }
      ]
    },
    {
      id: "cyclic-sort",
      title: "Cyclic Sort",
      tagline: "Place each number at its correct index in O(n)",
      recognitionTips: [
        "Array contains numbers in range [0, n] or [1, n]",
        "Problem asks to find missing/duplicate numbers",
        "Need O(1) space solution for finding missing elements",
        "Phrases like 'first missing positive', 'find all duplicates'"
      ],
      proTips: [
        "Key insight: for numbers in range [1, n], number i should be at index i-1",
        "Don't advance index after a swap — the new element at current index needs processing too",
        "For 'first missing positive', ignore numbers ≤ 0 or > n"
      ],
      approach: "Iterate through the array. For each element, swap it to its correct position (nums[i] should be at index nums[i]-1). After placing all elements correctly, a second pass finds positions where nums[i] != i+1, revealing missing or duplicate numbers.",
      templateCode: `// Cyclic Sort — Find All Missing Numbers
public List<Integer> findDisappearedNumbers(int[] nums) {
    int i = 0;
    while (i < nums.length) {
        int correctIndex = nums[i] - 1; // Why: number k belongs at index k-1
        if (nums[i] != nums[correctIndex]) {
            // Why: swap nums[i] to its correct position
            int temp = nums[i];
            nums[i] = nums[correctIndex];
            nums[correctIndex] = temp;
        } else {
            i++; // Why: nums[i] is either at correct position or is a duplicate
        }
    }
    
    List<Integer> missing = new ArrayList<>();
    for (int j = 0; j < nums.length; j++) {
        if (nums[j] != j + 1) {
            missing.add(j + 1); // Why: position j should hold j+1
        }
    }
    return missing;
}`,
      cppTemplate: `// Cyclic Sort — Find All Missing Numbers
vector<int> findDisappearedNumbers(vector<int>& nums) {
    int i = 0;
    // place each number at its correct index
    while (i < nums.size()) {
        int correct = nums[i] - 1;
        if (nums[i] != nums[correct]) {
            swap(nums[i], nums[correct]);
        } else {
            i++;
        }
    }
    // collect missing numbers
    vector<int> ans;
    for (int j = 0; j < nums.size(); j++) {
        if (nums[j] != j + 1) {
            ans.push_back(j + 1);
        }
    }

    return ans;
}`,
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
      problems: [
        { id: "as-missing-number", title: "Missing Number", platform: "leetcode", url: "https://leetcode.com/problems/missing-number/", difficulty: "easy", isStandard: true, companies: ["Amazon", "Microsoft", "Apple"] },
        { id: "as-find-disappeared", title: "Find All Numbers Disappeared in an Array", platform: "leetcode", url: "https://leetcode.com/problems/find-all-numbers-disappeared-in-an-array/", difficulty: "easy", isStandard: true, companies: ["Amazon", "Google"] },
        { id: "as-find-duplicate", title: "Find the Duplicate Number", platform: "leetcode", url: "https://leetcode.com/problems/find-the-duplicate-number/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Microsoft", "Google", "Facebook"] },
        { id: "as-find-all-dupes", title: "Find All Duplicates in an Array", platform: "leetcode", url: "https://leetcode.com/problems/find-all-duplicates-in-an-array/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Microsoft"] },
        { id: "as-set-mismatch", title: "Set Mismatch", platform: "leetcode", url: "https://leetcode.com/problems/set-mismatch/", difficulty: "easy", isStandard: false, companies: ["Amazon"] },
        { id: "as-couple-holding-hands", title: "Couples Holding Hands", platform: "leetcode", url: "https://leetcode.com/problems/couples-holding-hands/", difficulty: "hard", isStandard: false, companies: ["Google"] },
        { id: "as-first-missing-pos", title: "First Missing Positive", platform: "leetcode", url: "https://leetcode.com/problems/first-missing-positive/", difficulty: "hard", isStandard: true, companies: ["Amazon", "Microsoft", "Google", "Facebook", "Apple"] },
        { id: "as-kth-missing", title: "Kth Missing Positive Number", platform: "leetcode", url: "https://leetcode.com/problems/kth-missing-positive-number/", difficulty: "easy", isStandard: false, companies: ["Facebook", "Amazon"] }
      ]
    },
    {
      id: "next-permutation",
      title: "Next Permutation",
      tagline: "Generate the lexicographically next arrangement in-place",
      recognitionTips: [
        "Problem asks for the next lexicographic permutation",
        "Need to rearrange array elements to get next greater number",
        "Phrases like 'next greater permutation', 'next arrangement'",
        "Related to generating permutations in specific order"
      ],
      proTips: [
        "Find the rightmost element that is smaller than its next element — this is the 'pivot'",
        "After finding the pivot, swap with the smallest element to its right that is larger than it",
        "Reverse the suffix after the pivot position"
      ],
      approach: "1) Find the largest index i where nums[i] < nums[i+1] (the pivot). 2) Find the largest index j > i where nums[j] > nums[i]. 3) Swap nums[i] and nums[j]. 4) Reverse the suffix starting at i+1. If no pivot exists, the array is the last permutation — reverse the whole array.",
      templateCode: `// Next Permutation — In-Place
public void nextPermutation(int[] nums) {
    int n = nums.length;
    int pivot = -1;
    
    // Why: find rightmost element smaller than its successor
    for (int i = n - 2; i >= 0; i--) {
        if (nums[i] < nums[i + 1]) {
            pivot = i;
            break;
        }
    }
    
    if (pivot == -1) {
        // Why: array is in descending order, wrap to smallest permutation
        reverse(nums, 0, n - 1);
        return;
    }
    
    // Why: find smallest element in suffix that is larger than pivot
    for (int j = n - 1; j > pivot; j--) {
        if (nums[j] > nums[pivot]) {
            swap(nums, pivot, j);
            break;
        }
    }
    
    // Why: reverse suffix to get the smallest possible tail
    reverse(nums, pivot + 1, n - 1);
}

private void reverse(int[] nums, int left, int right) {
    while (left < right) {
        swap(nums, left++, right--);
    }
}

private void swap(int[] nums, int i, int j) {
    int temp = nums[i];
    nums[i] = nums[j];
    nums[j] = temp;
}`,
      cppTemplate: `// Next Permutation — In-Place
void nextPermutation(vector<int> &nums)
{
    int bp = -1;
    // finding the break point
    for (int i = nums.size() - 2; i >= 0; i--)
    {
        if (nums[i] < nums[i + 1])
        {
            bp = i;
            break;
        }
    }
    // first greater element from back
    if (bp != -1)
    {
        for (int i = nums.size() - 1; i >= 0; i--)
        {
            if (nums[i] > nums[bp])
            {
                swap(nums[i], nums[bp]);
                break;
            }
        }
    }
    // reverse the array from bp+1 to end
    reverse(nums.begin() + bp + 1, nums.end());
}`,
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
      problems: [
        { id: "as-next-permutation", title: "Next Permutation", platform: "leetcode", url: "https://leetcode.com/problems/next-permutation/", difficulty: "medium", isStandard: true, companies: ["Google", "Facebook", "Amazon", "Microsoft"] },
        { id: "as-permutations", title: "Permutations", platform: "leetcode", url: "https://leetcode.com/problems/permutations/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Microsoft", "Facebook"] },
        { id: "as-permutations-ii", title: "Permutations II", platform: "leetcode", url: "https://leetcode.com/problems/permutations-ii/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Microsoft"] },
        { id: "as-next-greater-iii", title: "Next Greater Element III", platform: "leetcode", url: "https://leetcode.com/problems/next-greater-element-iii/", difficulty: "medium", isStandard: false, companies: ["Amazon", "Google"] },
        { id: "as-permutation-sequence", title: "Permutation Sequence", platform: "leetcode", url: "https://leetcode.com/problems/permutation-sequence/", difficulty: "hard", isStandard: true, companies: ["Amazon", "Google", "Microsoft"] },
        { id: "as-smallest-string-swaps", title: "Smallest String With Swaps", platform: "leetcode", url: "https://leetcode.com/problems/smallest-string-with-swaps/", difficulty: "medium", isStandard: false, companies: ["Amazon"] },
        { id: "as-previous-permutation", title: "Previous Permutation With One Swap", platform: "leetcode", url: "https://leetcode.com/problems/previous-permutation-with-one-swap/", difficulty: "medium", isStandard: false, companies: ["Facebook"] },
        { id: "as-minimum-adjacent-swaps", title: "Minimum Adjacent Swaps to Reach the Kth Smallest Number", platform: "leetcode", url: "https://leetcode.com/problems/minimum-adjacent-swaps-to-reach-the-kth-smallest-number/", difficulty: "hard", isStandard: false, companies: ["Google"] }
      ]
    }
  ]
};

arraysStrings.totalProblems = arraysStrings.patterns.reduce((sum, p) => sum + p.problems.length, 0);
