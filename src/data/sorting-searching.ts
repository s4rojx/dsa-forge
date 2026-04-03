import { Topic } from "@/types";

export const sortingSearching: Topic = {
  slug: "sorting-searching",
  title: "Sorting & Searching",
  description: "Classic sorting algorithms, custom comparators, and advanced search techniques",
  icon: "ArrowDownUp",
  totalProblems: 0,
  patterns: [
    {
      id: "merge-sort",
      title: "Merge Sort & Divide-and-Conquer",
      tagline: "Divide array in half, sort recursively, merge — stable O(n log n) sort",
      recognitionTips: ["Need to count inversions during sorting", "Merge sort is the basis for many divide-and-conquer problems", "Phrases like 'count inversions', 'reverse pairs', 'merge sort'", "Need a stable sort that preserves relative order of equal elements"],
      proTips: ["Count inversions = count pairs (i,j) where i < j but a[i] > a[j]", "Merge step is where counting happens — when an element from right comes before left", "Can be used for custom sorting when comparison-based approaches are needed"],
      approach: "Divide array into halves, recursively sort each half, then merge the two sorted halves into one. During merge, perform any counting/aggregation needed at the combination step.",
      templateCode: `// Merge Sort — Count Inversions
private int count = 0;
public int countInversions(int[] nums) {
    count = 0;
    mergeSort(nums, 0, nums.length - 1);
    return count;
}
void mergeSort(int[] nums, int lo, int hi) {
    if (lo >= hi) return;
    int mid = lo + (hi - lo) / 2;
    mergeSort(nums, lo, mid);
    mergeSort(nums, mid + 1, hi);
    merge(nums, lo, mid, hi);
}
void merge(int[] nums, int lo, int mid, int hi) {
    int[] temp = new int[hi - lo + 1];
    int i = lo, j = mid + 1, k = 0;
    while (i <= mid && j <= hi) {
        if (nums[i] <= nums[j]) temp[k++] = nums[i++];
        else {
            count += (mid - i + 1); // Why: all remaining left elements form inversions
            temp[k++] = nums[j++];
        }
    }
    while (i <= mid) temp[k++] = nums[i++];
    while (j <= hi) temp[k++] = nums[j++];
    System.arraycopy(temp, 0, nums, lo, temp.length);
}`,
      cppTemplate: `// Merge Sort — Count Inversions
int count = 0;
int countInversions(vector<int>& nums) {
    count = 0;
    mergeSort(nums, 0, nums.size() - 1);
    return count;
}
void mergeSort(vector<int>& nums, int lo, int hi) {
    if (lo >= hi) return;
    int mid = lo + (hi - lo) / 2;
    mergeSort(nums, lo, mid);
    mergeSort(nums, mid + 1, hi);
    merge(nums, lo, mid, hi);
}
void merge(vector<int>& nums, int lo, int mid, int hi) {
    vector<int> temp(hi - lo + 1);
    int i = lo, j = mid + 1, k = 0;
    while (i <= mid && j <= hi) {
        if (nums[i] <= nums[j]) temp[k++] = nums[i++];
        else {
            count += (mid - i + 1); // Why: all remaining left elements form inversions
            temp[k++] = nums[j++];
        }
    }
    while (i <= mid) temp[k++] = nums[i++];
    while (j <= hi) temp[k++] = nums[j++];
    for (int idx = 0; idx < temp.size(); idx++) nums[lo + idx] = temp[idx];
}`,
      timeComplexity: "O(n log n)",
      spaceComplexity: "O(n)",
      problems: [
        { id: "ss-sort-array", title: "Sort an Array", platform: "leetcode", url: "https://leetcode.com/problems/sort-an-array/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Microsoft"] },
        { id: "ss-count-inversions-gfg", title: "Count Inversions", platform: "gfg", url: "https://www.geeksforgeeks.org/count-inversions/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Microsoft", "Google"] },
        { id: "ss-reverse-pairs", title: "Reverse Pairs", platform: "leetcode", url: "https://leetcode.com/problems/reverse-pairs/", difficulty: "hard", isStandard: true, companies: ["Amazon", "Google"] },
        { id: "ss-count-smaller", title: "Count of Smaller Numbers After Self", platform: "leetcode", url: "https://leetcode.com/problems/count-of-smaller-numbers-after-self/", difficulty: "hard", isStandard: true, companies: ["Google", "Amazon"] },
        { id: "ss-merge-sort-ll", title: "Sort List (Merge Sort on Linked List)", platform: "leetcode", url: "https://leetcode.com/problems/sort-list/", difficulty: "medium", isStandard: true, companies: ["Facebook", "Amazon"] },
        { id: "ss-count-range-sum", title: "Count of Range Sum", platform: "leetcode", url: "https://leetcode.com/problems/count-of-range-sum/", difficulty: "hard", isStandard: false, companies: ["Google"] },
        { id: "ss-median-two-sorted", title: "Median of Two Sorted Arrays", platform: "leetcode", url: "https://leetcode.com/problems/median-of-two-sorted-arrays/", difficulty: "hard", isStandard: true, companies: ["Amazon", "Google", "Facebook"] },
        { id: "ss-merge-intervals", title: "Merge Intervals", platform: "leetcode", url: "https://leetcode.com/problems/merge-intervals/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Facebook", "Google"] }
      ]
    },
    {
      id: "quick-sort-select",
      title: "Quick Sort & Quick Select",
      tagline: "Partition-based sorting and O(n) average Kth element selection",
      recognitionTips: ["Need O(n) average for finding kth smallest/largest", "Quick Select is partition-based — like binary search on unsorted array", "Phrases like 'kth largest', 'kth smallest' with O(n) requirement", "Understanding pivot selection and partition schemes"],
      proTips: ["Lomuto partition: pivot at end, simpler; Hoare partition: two pointers, fewer swaps", "Randomize pivot to avoid worst-case O(n²)", "Quick Select only recurses on ONE side — hence O(n) average"],
      approach: "Choose a pivot, partition array so all elements < pivot are on the left and > pivot are on right. For sorting, recurse on both halves. For Quick Select, only recurse on the half containing the kth element.",
      templateCode: `// Quick Select — Kth Largest Element
public int findKthLargest(int[] nums, int k) {
    int target = nums.length - k; // Why: kth largest = (n-k)th smallest
    return quickSelect(nums, 0, nums.length - 1, target);
}
int quickSelect(int[] nums, int lo, int hi, int target) {
    int pivot = nums[hi];
    int i = lo;
    for (int j = lo; j < hi; j++) {
        if (nums[j] <= pivot) { swap(nums, i, j); i++; }
    }
    swap(nums, i, hi);
    if (i == target) return nums[i];
    else if (i < target) return quickSelect(nums, i + 1, hi, target);
    else return quickSelect(nums, lo, i - 1, target);
}`,
      cppTemplate: `// Quick Select — Kth Largest Element
int findKthLargest(vector<int>& nums, int k) {
    int target = nums.size() - k; // Why: kth largest = (n-k)th smallest
    return quickSelect(nums, 0, nums.size() - 1, target);
}
int quickSelect(vector<int>& nums, int lo, int hi, int target) {
    int pivot = nums[hi];
    int i = lo;
    for (int j = lo; j < hi; j++) {
        if (nums[j] <= pivot) { swap(nums, i, j); i++; }
    }
    swap(nums, i, hi);
    if (i == target) return nums[i];
    else if (i < target) return quickSelect(nums, i + 1, hi, target);
    else return quickSelect(nums, lo, i - 1, target);
}`,
      timeComplexity: "O(n) average, O(n²) worst",
      spaceComplexity: "O(log n) recursion",
      problems: [
        { id: "ss-kth-largest", title: "Kth Largest Element in an Array", platform: "leetcode", url: "https://leetcode.com/problems/kth-largest-element-in-an-array/", difficulty: "medium", isStandard: true, companies: ["Facebook", "Amazon", "Google"] },
        { id: "ss-sort-colors-qs", title: "Sort Colors (Dutch National Flag)", platform: "leetcode", url: "https://leetcode.com/problems/sort-colors/", difficulty: "medium", isStandard: true, companies: ["Microsoft", "Amazon", "Facebook"] },
        { id: "ss-wiggle-sort-ii", title: "Wiggle Sort II", platform: "leetcode", url: "https://leetcode.com/problems/wiggle-sort-ii/", difficulty: "medium", isStandard: false, companies: ["Google"] },
        { id: "ss-top-k-freq-qs", title: "Top K Frequent Elements (Quick Select)", platform: "leetcode", url: "https://leetcode.com/problems/top-k-frequent-elements/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Facebook"] },
        { id: "ss-kth-smallest-matrix", title: "Kth Smallest Element in Sorted Matrix", platform: "leetcode", url: "https://leetcode.com/problems/kth-smallest-element-in-a-sorted-matrix/", difficulty: "medium", isStandard: true, companies: ["Facebook", "Amazon"] },
        { id: "ss-partition-gfg", title: "Quick Sort Partition", platform: "gfg", url: "https://www.geeksforgeeks.org/quick-sort/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Microsoft"] },
        { id: "ss-kth-closest-origin", title: "K Closest Points to Origin", platform: "leetcode", url: "https://leetcode.com/problems/k-closest-points-to-origin/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Facebook"] },
        { id: "ss-3way-partition-gfg", title: "3-Way Partition", platform: "gfg", url: "https://www.geeksforgeeks.org/three-way-partitioning-of-an-array-around-a-given-range/", difficulty: "medium", isStandard: false, companies: ["Amazon"] }
      ]
    },
    {
      id: "counting-radix-sort",
      title: "Counting / Radix Sort",
      tagline: "Non-comparison sorts achieving O(n) for bounded domains",
      recognitionTips: ["Values are in a small bounded range", "Need O(n) sorting for integers", "Phrases like 'sort by frequency', 'bucket sort'", "Elements can be mapped to a small number of buckets"],
      proTips: ["Counting sort: O(n + k) where k = range of values", "Radix sort: O(d * (n + k)) where d = number of digits", "Bucket sort: O(n) average when elements are uniformly distributed"],
      approach: "Count occurrences of each value, then use prefix sums to determine positions. For radix sort, apply counting sort on each digit from least significant to most significant.",
      templateCode: `// Counting Sort — Sort by Frequency
public String frequencySort(String s) {
    int[] freq = new int[128];
    for (char c : s.toCharArray()) freq[c]++;
    // Why: bucket sort — group characters by frequency
    List<Character>[] buckets = new List[s.length() + 1];
    for (int i = 0; i < 128; i++) {
        if (freq[i] > 0) {
            if (buckets[freq[i]] == null) buckets[freq[i]] = new ArrayList<>();
            buckets[freq[i]].add((char) i);
        }
    }
    StringBuilder sb = new StringBuilder();
    for (int i = buckets.length - 1; i > 0; i--) {
        if (buckets[i] != null)
            for (char c : buckets[i])
                sb.append(String.valueOf(c).repeat(i));
    }
    return sb.toString();
}`,
      cppTemplate: `// Counting Sort — Sort by Frequency
string frequencySort(string s) {
    vector<int> freq(128, 0);
    for (char c : s) freq[c]++;
    // Why: bucket sort — group characters by frequency
    vector<vector<char>> buckets(s.size() + 1);
    for (int i = 0; i < 128; i++) {
        if (freq[i] > 0) {
            buckets[freq[i]].push_back((char) i);
        }
    }
    string result;
    for (int i = buckets.size() - 1; i > 0; i--) {
        for (char c : buckets[i]) {
            result.append(i, c);
        }
    }
    return result;
}`,
      timeComplexity: "O(n + k)",
      spaceComplexity: "O(n + k)",
      problems: [
        { id: "ss-sort-by-freq", title: "Sort Characters By Frequency", platform: "leetcode", url: "https://leetcode.com/problems/sort-characters-by-frequency/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Google"] },
        { id: "ss-max-gap", title: "Maximum Gap", platform: "leetcode", url: "https://leetcode.com/problems/maximum-gap/", difficulty: "medium", isStandard: true, companies: ["Amazon"] },
        { id: "ss-top-k-frequent-bucket", title: "Top K Frequent Elements (Bucket Sort)", platform: "leetcode", url: "https://leetcode.com/problems/top-k-frequent-elements/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Facebook"] },
        { id: "ss-relative-sort", title: "Relative Sort Array", platform: "leetcode", url: "https://leetcode.com/problems/relative-sort-array/", difficulty: "easy", isStandard: false, companies: ["Amazon"] },
        { id: "ss-h-index", title: "H-Index", platform: "leetcode", url: "https://leetcode.com/problems/h-index/", difficulty: "medium", isStandard: true, companies: ["Facebook", "Google"] },
        { id: "ss-counting-sort-gfg", title: "Counting Sort Algorithm", platform: "gfg", url: "https://www.geeksforgeeks.org/counting-sort/", difficulty: "easy", isStandard: true, companies: ["Amazon", "Microsoft"] },
        { id: "ss-radix-sort-gfg", title: "Radix Sort Algorithm", platform: "gfg", url: "https://www.geeksforgeeks.org/radix-sort/", difficulty: "medium", isStandard: true, companies: ["Amazon"] },
        { id: "ss-contains-dup-iii", title: "Contains Duplicate III", platform: "leetcode", url: "https://leetcode.com/problems/contains-duplicate-iii/", difficulty: "hard", isStandard: false, companies: ["Amazon", "Google"] }
      ]
    },
    {
      id: "custom-comparator",
      title: "Custom Comparators",
      tagline: "Sort with custom ordering logic for specialized requirements",
      recognitionTips: ["Need to sort objects by multiple criteria", "Custom ordering: not just ascending/descending", "Phrases like 'largest number from digits', 'custom sort order'"],
      proTips: ["In Java, use Comparator.comparingInt() with .thenComparing() for multi-key sorting", "For 'largest number': compare concatenations a+b vs b+a", "Sorting intervals: sort by start, then by end for tie-breaking"],
      approach: "Define a custom comparator that encodes the desired ordering. Use Arrays.sort() or Collections.sort() with the custom comparator.",
      templateCode: `// Largest Number — Custom Comparator
public String largestNumber(int[] nums) {
    String[] strs = new String[nums.length];
    for (int i = 0; i < nums.length; i++) strs[i] = String.valueOf(nums[i]);
    // Why: compare concatenations to determine optimal ordering
    Arrays.sort(strs, (a, b) -> (b + a).compareTo(a + b));
    if (strs[0].equals("0")) return "0"; // Why: edge case all zeros
    return String.join("", strs);
}`,
      cppTemplate: `// Largest Number — Custom Comparator
string largestNumber(vector<int>& nums) {
    vector<string> strs(nums.size());
    for (int i = 0; i < nums.size(); i++) strs[i] = to_string(nums[i]);
    // Why: compare concatenations to determine optimal ordering
    sort(strs.begin(), strs.end(), [](const string& a, const string& b) {
        return a + b > b + a;
    });
    if (strs[0] == "0") return "0"; // Why: edge case all zeros
    string result;
    for (string& str : strs) result += str;
    return result;
}`,
      timeComplexity: "O(n log n * k) where k = comparison cost",
      spaceComplexity: "O(n)",
      problems: [
        { id: "ss-largest-number", title: "Largest Number", platform: "leetcode", url: "https://leetcode.com/problems/largest-number/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Microsoft"] },
        { id: "ss-custom-sort-str", title: "Custom Sort String", platform: "leetcode", url: "https://leetcode.com/problems/custom-sort-string/", difficulty: "medium", isStandard: false, companies: ["Facebook"] },
        { id: "ss-reorder-log", title: "Reorder Data in Log Files", platform: "leetcode", url: "https://leetcode.com/problems/reorder-data-in-log-files/", difficulty: "medium", isStandard: false, companies: ["Amazon"] },
        { id: "ss-sort-people", title: "Sort the People", platform: "leetcode", url: "https://leetcode.com/problems/sort-the-people/", difficulty: "easy", isStandard: false, companies: ["Amazon"] },
        { id: "ss-queue-reconstruct", title: "Queue Reconstruction by Height", platform: "leetcode", url: "https://leetcode.com/problems/queue-reconstruction-by-height/", difficulty: "medium", isStandard: true, companies: ["Google", "Amazon"] },
        { id: "ss-pancake-sort", title: "Pancake Sorting", platform: "leetcode", url: "https://leetcode.com/problems/pancake-sorting/", difficulty: "medium", isStandard: false, companies: ["Google", "Microsoft"] },
        { id: "ss-valid-anagram", title: "Valid Anagram", platform: "leetcode", url: "https://leetcode.com/problems/valid-anagram/", difficulty: "easy", isStandard: true, companies: ["Amazon", "Microsoft"] },
        { id: "ss-group-anagrams", title: "Group Anagrams", platform: "leetcode", url: "https://leetcode.com/problems/group-anagrams/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Facebook", "Google"] }
      ]
    }
  ]
};

sortingSearching.totalProblems = sortingSearching.patterns.reduce((sum, p) => sum + p.problems.length, 0);
