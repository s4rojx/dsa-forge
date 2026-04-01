import { Topic } from "@/types";

export const greedy: Topic = {
  slug: "greedy",
  title: "Greedy",
  description: "Make the locally optimal choice at each step to find the global optimum",
  icon: "Zap",
  totalProblems: 0,
  patterns: [
    {
      id: "interval-scheduling",
      title: "Interval Scheduling",
      tagline: "Maximize non-overlapping intervals or merge overlapping ones",
      recognitionTips: ["Problem involves intervals with start and end times", "Need to merge, count, or select non-overlapping intervals", "Phrases like 'merge intervals', 'non-overlapping', 'minimum rooms'", "Sort by start or end time is the key first step"],
      proTips: ["To maximize non-overlapping: sort by end time, greedily pick earliest-ending", "To merge: sort by start time, extend end if overlapping", "To find minimum platforms/rooms: use sweep line or min-heap approach"],
      approach: "Sort intervals by start or end time. Process greedily: for merging, extend current interval if overlapping. For selection, pick intervals that end earliest. For counting overlaps, track active intervals.",
      templateCode: `// Merge Intervals
public int[][] merge(int[][] intervals) {
    Arrays.sort(intervals, (a, b) -> a[0] - b[0]); // Why: sort by start
    List<int[]> merged = new ArrayList<>();
    for (int[] interval : intervals) {
        if (merged.isEmpty() || merged.get(merged.size()-1)[1] < interval[0]) {
            merged.add(interval); // Why: no overlap, add new interval
        } else {
            merged.get(merged.size()-1)[1] = Math.max(merged.get(merged.size()-1)[1], interval[1]);
        }
    }
    return merged.toArray(new int[0][]);
}`,
      timeComplexity: "O(n log n)",
      spaceComplexity: "O(n)",
      problems: [
        { id: "gd-merge-intervals", title: "Merge Intervals", platform: "leetcode", url: "https://leetcode.com/problems/merge-intervals/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Facebook", "Google", "Microsoft"] },
        { id: "gd-insert-interval", title: "Insert Interval", platform: "leetcode", url: "https://leetcode.com/problems/insert-interval/", difficulty: "medium", isStandard: true, companies: ["Google", "Facebook", "Amazon"] },
        { id: "gd-non-overlapping", title: "Non-overlapping Intervals", platform: "leetcode", url: "https://leetcode.com/problems/non-overlapping-intervals/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Facebook", "Google"] },
        { id: "gd-min-arrows", title: "Minimum Number of Arrows to Burst Balloons", platform: "leetcode", url: "https://leetcode.com/problems/minimum-number-of-arrows-to-burst-balloons/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Facebook"] },
        { id: "gd-meeting-rooms", title: "Meeting Rooms", platform: "leetcode", url: "https://leetcode.com/problems/meeting-rooms/", difficulty: "easy", isStandard: true, companies: ["Facebook", "Amazon"] },
        { id: "gd-interval-intersection", title: "Interval List Intersections", platform: "leetcode", url: "https://leetcode.com/problems/interval-list-intersections/", difficulty: "medium", isStandard: true, companies: ["Facebook", "Amazon", "Google"] },
        { id: "gd-remove-covered", title: "Remove Covered Intervals", platform: "leetcode", url: "https://leetcode.com/problems/remove-covered-intervals/", difficulty: "medium", isStandard: false, companies: ["Google"] },
        { id: "gd-min-platforms-gfg", title: "Minimum Platforms", platform: "gfg", url: "https://www.geeksforgeeks.org/minimum-number-platforms-required-railwaybus-station/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Microsoft", "Flipkart"] }
      ]
    },
    {
      id: "activity-selection",
      title: "Activity Selection",
      tagline: "Select maximum number of non-conflicting activities",
      recognitionTips: ["Maximize the number of activities/events that can be performed", "Activities have start and end times, only one can be active at a time", "Classic greedy: always pick the activity that finishes earliest", "Equivalent to maximum independent set on interval graphs"],
      proTips: ["Sort by finish time, greedily select activities that start after previous finishes", "This is provably optimal for the unweighted case", "For weighted version, use DP + binary search instead"],
      approach: "Sort activities by end time. Greedily select the first activity. For each subsequent activity, select it only if its start time >= end time of the last selected activity.",
      templateCode: `// Activity Selection — Maximum Activities
public int maxActivities(int[] start, int[] end) {
    int n = start.length;
    Integer[] indices = new Integer[n];
    for (int i = 0; i < n; i++) indices[i] = i;
    // Why: sort by end time
    Arrays.sort(indices, (a, b) -> end[a] - end[b]);
    int count = 1;
    int lastEnd = end[indices[0]];
    for (int i = 1; i < n; i++) {
        if (start[indices[i]] >= lastEnd) { // Why: non-overlapping
            count++;
            lastEnd = end[indices[i]];
        }
    }
    return count;
}`,
      timeComplexity: "O(n log n)",
      spaceComplexity: "O(n)",
      problems: [
        { id: "gd-max-events", title: "Maximum Number of Events That Can Be Attended", platform: "leetcode", url: "https://leetcode.com/problems/maximum-number-of-events-that-can-be-attended/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Google"] },
        { id: "gd-max-events-ii", title: "Maximum Number of Events That Can Be Attended II", platform: "leetcode", url: "https://leetcode.com/problems/maximum-number-of-events-that-can-be-attended-ii/", difficulty: "hard", isStandard: false, companies: ["Google"] },
        { id: "gd-activity-select-gfg", title: "Activity Selection Problem", platform: "gfg", url: "https://www.geeksforgeeks.org/activity-selection-problem-greedy-algo-1/", difficulty: "easy", isStandard: true, companies: ["Amazon", "Microsoft", "Flipkart"] },
        { id: "gd-job-sequencing-gfg", title: "Job Sequencing Problem", platform: "gfg", url: "https://www.geeksforgeeks.org/job-sequencing-problem/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Microsoft"] },
        { id: "gd-partition-labels", title: "Partition Labels", platform: "leetcode", url: "https://leetcode.com/problems/partition-labels/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Google"] },
        { id: "gd-task-scheduler", title: "Task Scheduler", platform: "leetcode", url: "https://leetcode.com/problems/task-scheduler/", difficulty: "medium", isStandard: true, companies: ["Facebook", "Amazon", "Microsoft"] },
        { id: "gd-video-stitching", title: "Video Stitching", platform: "leetcode", url: "https://leetcode.com/problems/video-stitching/", difficulty: "medium", isStandard: false, companies: ["Google"] },
        { id: "gd-min-meetings", title: "Minimum Number of Arrows to Burst Balloons", platform: "leetcode", url: "https://leetcode.com/problems/minimum-number-of-arrows-to-burst-balloons/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Facebook"] }
      ]
    },
    {
      id: "jump-game-greedy",
      title: "Jump Game",
      tagline: "Determine reachability and minimum jumps using greedy forward tracking",
      recognitionTips: ["Array where each element represents max jump length", "Need to determine if you can reach the end", "Find minimum number of jumps to reach the end", "Greedy: track the farthest reachable position"],
      proTips: ["For reachability: track maxReach — if i > maxReach at any point, unreachable", "For min jumps: use BFS-like level processing with currentEnd and farthest", "Jump Game II can be solved in O(n) with greedy, no need for DP"],
      approach: "Track the farthest reachable index. For reachability, if farthest >= last index, return true. For minimum jumps, use a greedy BFS: maintain the current jump's end and the farthest point reachable from the current range.",
      templateCode: `// Jump Game — Can Reach End?
public boolean canJump(int[] nums) {
    int maxReach = 0;
    for (int i = 0; i < nums.length; i++) {
        if (i > maxReach) return false; // Why: can't reach this index
        maxReach = Math.max(maxReach, i + nums[i]);
    }
    return true;
}
// Jump Game II — Minimum Jumps
public int jump(int[] nums) {
    int jumps = 0, currentEnd = 0, farthest = 0;
    for (int i = 0; i < nums.length - 1; i++) {
        farthest = Math.max(farthest, i + nums[i]);
        if (i == currentEnd) { // Why: must jump now — reached end of current range
            jumps++;
            currentEnd = farthest;
        }
    }
    return jumps;
}`,
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
      problems: [
        { id: "gd-jump-game", title: "Jump Game", platform: "leetcode", url: "https://leetcode.com/problems/jump-game/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Microsoft", "Google", "Facebook"] },
        { id: "gd-jump-game-ii", title: "Jump Game II", platform: "leetcode", url: "https://leetcode.com/problems/jump-game-ii/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Google", "Facebook"] },
        { id: "gd-jump-game-iii", title: "Jump Game III", platform: "leetcode", url: "https://leetcode.com/problems/jump-game-iii/", difficulty: "medium", isStandard: false, companies: ["Amazon"] },
        { id: "gd-jump-game-vii", title: "Jump Game VII", platform: "leetcode", url: "https://leetcode.com/problems/jump-game-vii/", difficulty: "medium", isStandard: false, companies: ["Amazon"] },
        { id: "gd-frog-jump", title: "Frog Jump", platform: "leetcode", url: "https://leetcode.com/problems/frog-jump/", difficulty: "hard", isStandard: true, companies: ["Amazon", "Facebook", "Google"] },
        { id: "gd-min-jumps-gfg", title: "Minimum Number of Jumps", platform: "gfg", url: "https://www.geeksforgeeks.org/minimum-number-of-jumps-to-reach-end-of-a-given-array/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Microsoft"] },
        { id: "gd-boats-to-save", title: "Boats to Save People", platform: "leetcode", url: "https://leetcode.com/problems/boats-to-save-people/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Google"] },
        { id: "gd-bag-of-tokens", title: "Bag of Tokens", platform: "leetcode", url: "https://leetcode.com/problems/bag-of-tokens/", difficulty: "medium", isStandard: false, companies: ["Amazon"] }
      ]
    },
    {
      id: "huffman-greedy",
      title: "Huffman Coding",
      tagline: "Build optimal prefix codes using greedy frequency-based merging",
      recognitionTips: ["Need to minimize total encoding cost based on frequencies", "Build an optimal binary tree from leaf frequencies", "Phrases like 'minimum cost to merge', 'connect ropes'", "Greedy: always merge the two smallest elements first"],
      proTips: ["Use a min-heap to efficiently extract two smallest elements", "Huffman is optimal for prefix-free codes", "Connect ropes/stones problems are Huffman in disguise"],
      approach: "Insert all frequencies into a min-heap. Repeatedly extract two smallest, merge them (sum), and insert back. Each merge adds the sum to total cost. Continue until one element remains.",
      templateCode: `// Huffman / Connect Ropes — Minimum Cost
public int connectRopes(int[] ropes) {
    PriorityQueue<Integer> minHeap = new PriorityQueue<>();
    for (int rope : ropes) minHeap.offer(rope);
    int totalCost = 0;
    while (minHeap.size() > 1) {
        int first = minHeap.poll();
        int second = minHeap.poll();
        int merged = first + second;
        totalCost += merged; // Why: cost of merging these two ropes
        minHeap.offer(merged); // Why: put merged rope back
    }
    return totalCost;
}`,
      timeComplexity: "O(n log n)",
      spaceComplexity: "O(n)",
      problems: [
        { id: "gd-connect-ropes-gfg", title: "Connect Ropes / Minimum Cost", platform: "gfg", url: "https://www.geeksforgeeks.org/connect-n-ropes-minimum-cost/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Microsoft"] },
        { id: "gd-min-cost-sticks", title: "Minimum Cost to Connect Sticks", platform: "leetcode", url: "https://leetcode.com/problems/minimum-cost-to-connect-sticks/", difficulty: "medium", isStandard: true, companies: ["Amazon"] },
        { id: "gd-last-stone-weight", title: "Last Stone Weight", platform: "leetcode", url: "https://leetcode.com/problems/last-stone-weight/", difficulty: "easy", isStandard: true, companies: ["Amazon"] },
        { id: "gd-huffman-gfg", title: "Huffman Encoding", platform: "gfg", url: "https://www.geeksforgeeks.org/huffman-coding-greedy-algo-3/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Microsoft", "Adobe"] },
        { id: "gd-reorganize-str", title: "Reorganize String", platform: "leetcode", url: "https://leetcode.com/problems/reorganize-string/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Google", "Facebook"] },
        { id: "gd-largest-number", title: "Largest Number", platform: "leetcode", url: "https://leetcode.com/problems/largest-number/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Microsoft"] },
        { id: "gd-broken-calc", title: "Broken Calculator", platform: "leetcode", url: "https://leetcode.com/problems/broken-calculator/", difficulty: "medium", isStandard: false, companies: ["Amazon"] },
        { id: "gd-lemonade-change", title: "Lemonade Change", platform: "leetcode", url: "https://leetcode.com/problems/lemonade-change/", difficulty: "easy", isStandard: true, companies: ["Amazon", "Google"] }
      ]
    },
    {
      id: "gas-station",
      title: "Gas Station / Circular",
      tagline: "Solve circular journey problems by tracking cumulative surplus",
      recognitionTips: ["Problem involves a circular route with costs and gains", "Need to find a starting point for a complete circuit", "Net gain/deficit at each station", "Phrases like 'gas station', 'circular route', 'complete the circuit'"],
      proTips: ["If total gas >= total cost, a solution always exists", "Track running deficit — if it goes negative, reset start to next station", "This works because we're looking for the point that minimizes the prefix sum"],
      approach: "If total gas < total cost, impossible. Otherwise, iterate through stations tracking running surplus. When surplus drops below 0, reset start to the next station and reset surplus. The final start position is the answer.",
      templateCode: `// Gas Station — Find Starting Point
public int canCompleteCircuit(int[] gas, int[] cost) {
    int totalSurplus = 0, currentSurplus = 0, start = 0;
    for (int i = 0; i < gas.length; i++) {
        int net = gas[i] - cost[i];
        totalSurplus += net;
        currentSurplus += net;
        if (currentSurplus < 0) {
            start = i + 1; // Why: can't start from any station before i+1
            currentSurplus = 0;
        }
    }
    return totalSurplus >= 0 ? start : -1; // Why: if total >= 0, solution exists at start
}`,
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
      problems: [
        { id: "gd-gas-station", title: "Gas Station", platform: "leetcode", url: "https://leetcode.com/problems/gas-station/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Google", "Facebook"] },
        { id: "gd-candy", title: "Candy", platform: "leetcode", url: "https://leetcode.com/problems/candy/", difficulty: "hard", isStandard: true, companies: ["Amazon", "Google", "Goldman Sachs"] },
        { id: "gd-assign-cookies", title: "Assign Cookies", platform: "leetcode", url: "https://leetcode.com/problems/assign-cookies/", difficulty: "easy", isStandard: true, companies: ["Amazon"] },
        { id: "gd-hand-of-straights", title: "Hand of Straights", platform: "leetcode", url: "https://leetcode.com/problems/hand-of-straights/", difficulty: "medium", isStandard: true, companies: ["Google", "Amazon"] },
        { id: "gd-queue-by-height", title: "Queue Reconstruction by Height", platform: "leetcode", url: "https://leetcode.com/problems/queue-reconstruction-by-height/", difficulty: "medium", isStandard: true, companies: ["Google", "Amazon", "Microsoft"] },
        { id: "gd-min-add-parens", title: "Minimum Add to Make Parentheses Valid", platform: "leetcode", url: "https://leetcode.com/problems/minimum-add-to-make-parentheses-valid/", difficulty: "medium", isStandard: true, companies: ["Facebook", "Amazon"] },
        { id: "gd-gas-station-gfg", title: "Circular Tour (Gas Station)", platform: "gfg", url: "https://www.geeksforgeeks.org/find-a-tour-that-visits-all-stations/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Microsoft", "Flipkart"] },
        { id: "gd-score-parens", title: "Score of Parentheses", platform: "leetcode", url: "https://leetcode.com/problems/score-of-parentheses/", difficulty: "medium", isStandard: false, companies: ["Amazon"] }
      ]
    }
  ]
};

greedy.totalProblems = greedy.patterns.reduce((sum, p) => sum + p.problems.length, 0);
