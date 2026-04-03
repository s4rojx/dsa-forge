import { Topic } from "@/types";

export const heaps: Topic = {
  slug: "heaps",
  title: "Heaps & Priority Queue",
  description: "Efficient min/max retrieval — top-K, merge K lists, and scheduling",
  icon: "ArrowUpDown",
  totalProblems: 0,
  patterns: [
    {
      id: "top-k-elements",
      title: "Top-K Elements",
      tagline: "Efficiently find the K largest/smallest/most frequent elements",
      recognitionTips: ["Problem asks for K largest, smallest, or most frequent elements", "Need to maintain a running set of top-K items from a stream", "Phrases like 'kth largest', 'top K frequent', 'K closest points'", "Sorting works but heap gives better O(n log k)"],
      proTips: ["For K largest: use a min-heap of size k (smallest of the K largest is at top)", "For K smallest: use a max-heap of size k", "QuickSelect gives O(n) average but O(n²) worst case; heap is O(n log k) guaranteed"],
      approach: "Use a heap of size K. For K largest elements, maintain a min-heap — when the heap exceeds size K, remove the minimum. After processing all elements, the heap contains the K largest. The top of the heap is the Kth largest.",
      templateCode: `// Top-K Frequent Elements
public int[] topKFrequent(int[] nums, int k) {
    Map<Integer, Integer> freqMap = new HashMap<>();
    for (int num : nums) freqMap.merge(num, 1, Integer::sum);
    // Why: min-heap by frequency — keeps top-k most frequent
    PriorityQueue<Integer> minHeap = new PriorityQueue<>(
        (a, b) -> freqMap.get(a) - freqMap.get(b)
    );
    for (int num : freqMap.keySet()) {
        minHeap.offer(num);
        if (minHeap.size() > k) minHeap.poll(); // Why: remove least frequent
    }
    int[] result = new int[k];
    for (int i = 0; i < k; i++) result[i] = minHeap.poll();
    return result;
}`,
      cppTemplate: `// Top-K Frequent Elements
vector<int> topKFrequent(vector<int>& nums, int k) {
    unordered_map<int, int> freqMap;
    for (int num : nums) freqMap[num]++;
    // Why: min-heap by frequency — keeps top-k most frequent
    auto compare = [&freqMap](int a, int b) {
        return freqMap[a] > freqMap[b];
    };
    priority_queue<int, vector<int>, decltype(compare)> minHeap(compare);
    for (auto& entry : freqMap) {
        int num = entry.first;
        minHeap.push(num);
        if (minHeap.size() > k) minHeap.pop(); // Why: remove least frequent
    }
    vector<int> result(k);
    for (int i = 0; i < k; i++) {
        result[i] = minHeap.top();
        minHeap.pop();
    }
    return result;
}`,
      timeComplexity: "O(n log k)",
      spaceComplexity: "O(n + k)",
      problems: [
        { id: "hp-kth-largest", title: "Kth Largest Element in an Array", platform: "leetcode", url: "https://leetcode.com/problems/kth-largest-element-in-an-array/", difficulty: "medium", isStandard: true, companies: ["Facebook", "Amazon", "Google", "Microsoft"] },
        { id: "hp-top-k-frequent", title: "Top K Frequent Elements", platform: "leetcode", url: "https://leetcode.com/problems/top-k-frequent-elements/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Facebook", "Google"] },
        { id: "hp-top-k-words", title: "Top K Frequent Words", platform: "leetcode", url: "https://leetcode.com/problems/top-k-frequent-words/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Google", "Facebook"] },
        { id: "hp-k-closest", title: "K Closest Points to Origin", platform: "leetcode", url: "https://leetcode.com/problems/k-closest-points-to-origin/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Facebook", "Google"] },
        { id: "hp-kth-largest-stream", title: "Kth Largest Element in a Stream", platform: "leetcode", url: "https://leetcode.com/problems/kth-largest-element-in-a-stream/", difficulty: "easy", isStandard: true, companies: ["Amazon", "Facebook"] },
        { id: "hp-sort-char-freq", title: "Sort Characters By Frequency", platform: "leetcode", url: "https://leetcode.com/problems/sort-characters-by-frequency/", difficulty: "medium", isStandard: false, companies: ["Amazon", "Google"] },
        { id: "hp-last-stone", title: "Last Stone Weight", platform: "leetcode", url: "https://leetcode.com/problems/last-stone-weight/", difficulty: "easy", isStandard: true, companies: ["Amazon"] },
        { id: "hp-reorganize-string", title: "Reorganize String", platform: "leetcode", url: "https://leetcode.com/problems/reorganize-string/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Google", "Facebook"] },
        { id: "hp-k-closest-sorted", title: "Find K Closest Elements", platform: "leetcode", url: "https://leetcode.com/problems/find-k-closest-elements/", difficulty: "medium", isStandard: true, companies: ["Facebook", "Amazon"] }
      ]
    },
    {
      id: "merge-k-lists",
      title: "Merge K Sorted Lists/Streams",
      tagline: "Efficiently merge multiple sorted sequences using a min-heap",
      recognitionTips: ["Need to merge K sorted arrays, lists, or streams", "Problem involves finding the smallest range covering elements from K lists", "Phrases like 'merge k sorted', 'find the kth smallest in sorted matrix'", "Multiple sorted inputs need to be combined in order"],
      proTips: ["Always put the first element from each list into the heap initially", "When you pop from the heap, push the next element from the same list", "The heap size stays at most K at all times, giving O(N log K) total"],
      approach: "Initialize a min-heap with the first element from each sorted list. Extract the minimum, add it to the result, then push the next element from that same list. Repeat until all lists are exhausted.",
      templateCode: `// Merge K Sorted Lists
public ListNode mergeKLists(ListNode[] lists) {
    PriorityQueue<ListNode> minHeap = new PriorityQueue<>(
        (a, b) -> a.val - b.val
    );
    // Why: seed the heap with heads of all non-empty lists
    for (ListNode head : lists)
        if (head != null) minHeap.offer(head);
    ListNode dummy = new ListNode(0);
    ListNode tail = dummy;
    while (!minHeap.isEmpty()) {
        ListNode smallest = minHeap.poll();
        tail.next = smallest;
        tail = tail.next;
        // Why: push next node from the same list
        if (smallest.next != null) minHeap.offer(smallest.next);
    }
    return dummy.next;
}`,
      cppTemplate: `// Merge K Sorted Lists
ListNode* mergeKLists(vector<ListNode*>& lists) {
    auto compare = [](ListNode* a, ListNode* b) {
        return a->val > b->val;
    };
    priority_queue<ListNode*, vector<ListNode*>, decltype(compare)> minHeap(compare);
    // Why: seed the heap with heads of all non-empty lists
    for (ListNode* head : lists)
        if (head != nullptr) minHeap.push(head);
    ListNode* dummy = new ListNode(0);
    ListNode* tail = dummy;
    while (!minHeap.empty()) {
        ListNode* smallest = minHeap.top();
        minHeap.pop();
        tail->next = smallest;
        tail = tail->next;
        // Why: push next node from the same list
        if (smallest->next != nullptr) minHeap.push(smallest->next);
    }
    return dummy->next;
}`,
      timeComplexity: "O(N log K) where N = total elements",
      spaceComplexity: "O(K)",
      problems: [
        { id: "hp-merge-k", title: "Merge k Sorted Lists", platform: "leetcode", url: "https://leetcode.com/problems/merge-k-sorted-lists/", difficulty: "hard", isStandard: true, companies: ["Amazon", "Facebook", "Google", "Microsoft"] },
        { id: "hp-kth-sorted-matrix", title: "Kth Smallest Element in a Sorted Matrix", platform: "leetcode", url: "https://leetcode.com/problems/kth-smallest-element-in-a-sorted-matrix/", difficulty: "medium", isStandard: true, companies: ["Facebook", "Amazon", "Google"] },
        { id: "hp-smallest-range", title: "Smallest Range Covering Elements from K Lists", platform: "leetcode", url: "https://leetcode.com/problems/smallest-range-covering-elements-from-k-lists/", difficulty: "hard", isStandard: true, companies: ["Google", "Amazon"] },
        { id: "hp-kth-pair-sum", title: "Find K Pairs with Smallest Sums", platform: "leetcode", url: "https://leetcode.com/problems/find-k-pairs-with-smallest-sums/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Google"] },
        { id: "hp-ugly-number-ii", title: "Ugly Number II", platform: "leetcode", url: "https://leetcode.com/problems/ugly-number-ii/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Google"] },
        { id: "hp-super-ugly", title: "Super Ugly Number", platform: "leetcode", url: "https://leetcode.com/problems/super-ugly-number/", difficulty: "medium", isStandard: false, companies: ["Google"] },
        { id: "hp-merge-sorted-arrays", title: "Merge Sorted Array", platform: "leetcode", url: "https://leetcode.com/problems/merge-sorted-array/", difficulty: "easy", isStandard: true, companies: ["Amazon", "Facebook", "Microsoft"] },
        { id: "hp-kth-smallest-mult", title: "Kth Smallest Number in Multiplication Table", platform: "leetcode", url: "https://leetcode.com/problems/kth-smallest-number-in-multiplication-table/", difficulty: "hard", isStandard: false, companies: ["Google"] }
      ]
    },
    {
      id: "two-heap-median",
      title: "Two-Heap Pattern (Median)",
      tagline: "Use two heaps to efficiently track the median of a data stream",
      recognitionTips: ["Need to find the median dynamically as elements are added", "Problem involves maintaining the middle element(s) of a dataset", "Phrases like 'find median from data stream', 'sliding window median'", "Need O(log n) insertion and O(1) median retrieval"],
      proTips: ["Max-heap for the lower half, min-heap for the upper half", "Balance the heaps so their sizes differ by at most 1", "Median is either the top of the larger heap, or average of both tops"],
      approach: "Maintain a max-heap (lower half) and min-heap (upper half). On insert: add to max-heap, then move max-heap's top to min-heap to maintain order. Rebalance if sizes differ by more than 1. Median comes from the top(s) of the heaps.",
      templateCode: `// Find Median from Data Stream
class MedianFinder {
    PriorityQueue<Integer> maxHeap; // Why: lower half — largest of small numbers on top
    PriorityQueue<Integer> minHeap; // Why: upper half — smallest of large numbers on top
    
    public MedianFinder() {
        maxHeap = new PriorityQueue<>(Collections.reverseOrder());
        minHeap = new PriorityQueue<>();
    }
    
    public void addNum(int num) {
        maxHeap.offer(num);
        minHeap.offer(maxHeap.poll()); // Why: ensure max-heap top <= min-heap top
        // Why: rebalance — max-heap should be same size or 1 larger
        if (minHeap.size() > maxHeap.size())
            maxHeap.offer(minHeap.poll());
    }
    
    public double findMedian() {
        if (maxHeap.size() > minHeap.size())
            return maxHeap.peek();
        return (maxHeap.peek() + minHeap.peek()) / 2.0;
    }
}`,
      cppTemplate: `// Find Median from Data Stream
class MedianFinder {
public:
    priority_queue<int> maxHeap; // Why: lower half — largest of small numbers on top
    priority_queue<int, vector<int>, greater<int>> minHeap; // Why: upper half — smallest of large numbers on top
    
    MedianFinder() {}
    
    void addNum(int num) {
        maxHeap.push(num);
        minHeap.push(maxHeap.top()); // Why: ensure max-heap top <= min-heap top
        maxHeap.pop();
        // Why: rebalance — max-heap should be same size or 1 larger
        if (minHeap.size() > maxHeap.size()) {
            maxHeap.push(minHeap.top());
            minHeap.pop();
        }
    }
    
    double findMedian() {
        if (maxHeap.size() > minHeap.size())
            return maxHeap.top();
        return (maxHeap.top() + minHeap.top()) / 2.0;
    }
}`,
      timeComplexity: "O(log n) insert, O(1) median",
      spaceComplexity: "O(n)",
      problems: [
        { id: "hp-find-median", title: "Find Median from Data Stream", platform: "leetcode", url: "https://leetcode.com/problems/find-median-from-data-stream/", difficulty: "hard", isStandard: true, companies: ["Amazon", "Google", "Facebook", "Microsoft", "Apple"] },
        { id: "hp-sliding-median", title: "Sliding Window Median", platform: "leetcode", url: "https://leetcode.com/problems/sliding-window-median/", difficulty: "hard", isStandard: true, companies: ["Google", "Facebook", "Amazon"] },
        { id: "hp-ipo", title: "IPO", platform: "leetcode", url: "https://leetcode.com/problems/ipo/", difficulty: "hard", isStandard: true, companies: ["Amazon", "Goldman Sachs"] },
        { id: "hp-max-perf-team", title: "Maximum Performance of a Team", platform: "leetcode", url: "https://leetcode.com/problems/maximum-performance-of-a-team/", difficulty: "hard", isStandard: false, companies: ["Amazon"] },
        { id: "hp-min-cost-hire", title: "Minimum Cost to Hire K Workers", platform: "leetcode", url: "https://leetcode.com/problems/minimum-cost-to-hire-k-workers/", difficulty: "hard", isStandard: true, companies: ["Google", "Amazon"] },
        { id: "hp-furthest-building", title: "Furthest Building You Can Reach", platform: "leetcode", url: "https://leetcode.com/problems/furthest-building-you-can-reach/", difficulty: "medium", isStandard: false, companies: ["Google"] },
        { id: "hp-meeting-rooms-ii", title: "Meeting Rooms II", platform: "leetcode", url: "https://leetcode.com/problems/meeting-rooms-ii/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Facebook", "Google", "Microsoft"] },
        { id: "hp-trapping-rain-3d", title: "Trapping Rain Water II", platform: "leetcode", url: "https://leetcode.com/problems/trapping-rain-water-ii/", difficulty: "hard", isStandard: false, companies: ["Google"] }
      ]
    },
    {
      id: "scheduling-heap",
      title: "Scheduling Problems",
      tagline: "Optimize task scheduling and resource allocation using heaps",
      recognitionTips: ["Problem involves scheduling tasks with cooldowns or deadlines", "Need to minimize number of machines/rooms/intervals", "Phrases like 'task scheduler', 'meeting rooms', 'minimum intervals'", "Greedy scheduling with priority queue optimization"],
      proTips: ["For meeting rooms: sort by start time, use min-heap to track end times", "For task scheduler: process the most frequent task first to minimize idle time", "For interval scheduling with weights, combine DP with sorting"],
      approach: "Sort events by start/arrival time. Use a min-heap to track active resources (end times). When a new event starts, check if any resource is free (heap top ≤ current start). If yes, reuse it (poll + offer). Otherwise, allocate new resource.",
      templateCode: `// Meeting Rooms II — Minimum Rooms Needed
public int minMeetingRooms(int[][] intervals) {
    Arrays.sort(intervals, (a, b) -> a[0] - b[0]); // Why: sort by start time
    PriorityQueue<Integer> endTimes = new PriorityQueue<>();
    for (int[] interval : intervals) {
        // Why: if earliest ending meeting finishes before this one starts, reuse room
        if (!endTimes.isEmpty() && endTimes.peek() <= interval[0]) {
            endTimes.poll();
        }
        endTimes.offer(interval[1]); // Why: add this meeting's end time
    }
    return endTimes.size(); // Why: heap size = number of rooms needed
}`,
      cppTemplate: `// Meeting Rooms II — Minimum Rooms Needed
int minMeetingRooms(vector<vector<int>>& intervals) {
    sort(intervals.begin(), intervals.end()); // Why: sort by start time
    priority_queue<int, vector<int>, greater<int>> endTimes;
    for (vector<int>& interval : intervals) {
        // Why: if earliest ending meeting finishes before this one starts, reuse room
        if (!endTimes.empty() && endTimes.top() <= interval[0]) {
            endTimes.pop();
        }
        endTimes.push(interval[1]); // Why: add this meeting's end time
    }
    return endTimes.size(); // Why: heap size = number of rooms needed
}`,
      timeComplexity: "O(n log n)",
      spaceComplexity: "O(n)",
      problems: [
        { id: "hp-meeting-rooms", title: "Meeting Rooms", platform: "leetcode", url: "https://leetcode.com/problems/meeting-rooms/", difficulty: "easy", isStandard: true, companies: ["Facebook", "Amazon", "Google"] },
        { id: "hp-meeting-rooms-2", title: "Meeting Rooms II", platform: "leetcode", url: "https://leetcode.com/problems/meeting-rooms-ii/", difficulty: "medium", isStandard: true, companies: ["Facebook", "Amazon", "Google", "Microsoft"] },
        { id: "hp-task-scheduler", title: "Task Scheduler", platform: "leetcode", url: "https://leetcode.com/problems/task-scheduler/", difficulty: "medium", isStandard: true, companies: ["Facebook", "Amazon", "Microsoft"] },
        { id: "hp-car-pooling", title: "Car Pooling", platform: "leetcode", url: "https://leetcode.com/problems/car-pooling/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Google"] },
        { id: "hp-course-schedule-iii", title: "Course Schedule III", platform: "leetcode", url: "https://leetcode.com/problems/course-schedule-iii/", difficulty: "hard", isStandard: true, companies: ["Google", "Amazon"] },
        { id: "hp-process-tasks", title: "Process Tasks Using Servers", platform: "leetcode", url: "https://leetcode.com/problems/process-tasks-using-servers/", difficulty: "medium", isStandard: false, companies: ["Amazon"] },
        { id: "hp-single-threaded-cpu", title: "Single-Threaded CPU", platform: "leetcode", url: "https://leetcode.com/problems/single-threaded-cpu/", difficulty: "medium", isStandard: false, companies: ["Amazon", "Google"] },
        { id: "hp-min-interval", title: "Minimum Interval to Include Each Query", platform: "leetcode", url: "https://leetcode.com/problems/minimum-interval-to-include-each-query/", difficulty: "hard", isStandard: false, companies: ["Google"] }
      ]
    }
  ]
};

heaps.totalProblems = heaps.patterns.reduce((sum, p) => sum + p.problems.length, 0);
