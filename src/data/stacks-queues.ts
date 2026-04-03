import { Topic } from "@/types";

export const stacksQueues: Topic = {
  slug: "stacks-queues",
  title: "Stacks & Queues",
  description: "LIFO and FIFO structures for expression parsing, monotonic sequences, and design",
  icon: "Layers",
  totalProblems: 0,
  patterns: [
    {
      id: "monotonic-stack",
      title: "Monotonic Stack",
      tagline: "Maintain a stack of increasing/decreasing elements for next-greater/smaller problems",
      recognitionTips: [
        "Problem asks for the next greater or next smaller element",
        "Need to find the nearest larger/smaller element to the left or right",
        "Histogram or water trapping type problems",
        "Phrases like 'daily temperatures', 'stock span'"
      ],
      proTips: [
        "Decreasing stack for next greater element, increasing stack for next smaller",
        "Process elements right-to-left to find next greater to the right",
        "The stack stores indices (not values) when you need positional information"
      ],
      approach: "Maintain a stack that preserves a monotonic order. When processing a new element, pop all elements from the stack that violate the monotonic property — each popped element has found its answer (the current element). Push the current element onto the stack.",
      templateCode: `// Monotonic Stack — Next Greater Element
public int[] nextGreaterElement(int[] nums) {
    int n = nums.length;
    int[] result = new int[n];
    Arrays.fill(result, -1); // Why: default -1 means no greater element exists
    
    Deque<Integer> stack = new ArrayDeque<>(); // Why: stores indices
    
    for (int i = 0; i < n; i++) {
        // Why: pop elements smaller than current — current is their "next greater"
        while (!stack.isEmpty() && nums[stack.peek()] < nums[i]) {
            result[stack.pop()] = nums[i];
        }
        stack.push(i);
    }
    return result;
}

// Monotonic Stack — Daily Temperatures
public int[] dailyTemperatures(int[] temperatures) {
    int n = temperatures.length;
    int[] answer = new int[n];
    Deque<Integer> stack = new ArrayDeque<>();
    
    for (int i = 0; i < n; i++) {
        while (!stack.isEmpty() && temperatures[stack.peek()] < temperatures[i]) {
            int prevIndex = stack.pop();
            answer[prevIndex] = i - prevIndex; // Why: days until warmer temperature
        }
        stack.push(i);
    }
    return answer;
}`,
      cppTemplate: `// Monotonic Stack — Next Greater Element
vector<int> nextGreaterElement(vector<int>& nums) {
    int n = nums.size();
    vector<int> result(n, -1); // Why: default -1 means no greater element exists
    
    vector<int> stack; // Why: stores indices
    
    for (int i = 0; i < n; i++) {
        // Why: pop elements smaller than current — current is their "next greater"
        while (!stack.empty() && nums[stack.back()] < nums[i]) {
            result[stack.back()] = nums[i];
            stack.pop_back();
        }
        stack.push_back(i);
    }
    return result;
}

// Monotonic Stack — Daily Temperatures
vector<int> dailyTemperatures(vector<int>& temperatures) {
    int n = temperatures.size();
    vector<int> answer(n, 0);
    vector<int> stack;
    
    for (int i = 0; i < n; i++) {
        while (!stack.empty() && temperatures[stack.back()] < temperatures[i]) {
            int prevIndex = stack.back();
            stack.pop_back();
            answer[prevIndex] = i - prevIndex; // Why: days until warmer temperature
        }
        stack.push_back(i);
    }
    return answer;
}`,
      timeComplexity: "O(n)",
      spaceComplexity: "O(n)",
      problems: [
        { id: "sq-daily-temps", title: "Daily Temperatures", platform: "leetcode", url: "https://leetcode.com/problems/daily-temperatures/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Facebook", "Google", "Microsoft"] },
        { id: "sq-nge-i", title: "Next Greater Element I", platform: "leetcode", url: "https://leetcode.com/problems/next-greater-element-i/", difficulty: "easy", isStandard: true, companies: ["Amazon", "Goldman Sachs"] },
        { id: "sq-nge-ii", title: "Next Greater Element II", platform: "leetcode", url: "https://leetcode.com/problems/next-greater-element-ii/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Google"] },
        { id: "sq-stock-span", title: "Online Stock Span", platform: "leetcode", url: "https://leetcode.com/problems/online-stock-span/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Goldman Sachs", "Microsoft"] },
        { id: "sq-largest-rect-hist", title: "Largest Rectangle in Histogram", platform: "leetcode", url: "https://leetcode.com/problems/largest-rectangle-in-histogram/", difficulty: "hard", isStandard: true, companies: ["Amazon", "Google", "Microsoft", "Facebook"] },
        { id: "sq-maximal-rectangle", title: "Maximal Rectangle", platform: "leetcode", url: "https://leetcode.com/problems/maximal-rectangle/", difficulty: "hard", isStandard: true, companies: ["Google", "Amazon", "Facebook"] },
        { id: "sq-trapping-rain", title: "Trapping Rain Water", platform: "leetcode", url: "https://leetcode.com/problems/trapping-rain-water/", difficulty: "hard", isStandard: true, companies: ["Amazon", "Goldman Sachs", "Google", "Facebook"] },
        { id: "sq-remove-k-digits", title: "Remove K Digits", platform: "leetcode", url: "https://leetcode.com/problems/remove-k-digits/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Microsoft"] },
        { id: "sq-asteroid-collision", title: "Asteroid Collision", platform: "leetcode", url: "https://leetcode.com/problems/asteroid-collision/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Google"] }
      ]
    },
    {
      id: "min-stack-design",
      title: "Min Stack Design",
      tagline: "Design stacks with O(1) access to minimum/maximum elements",
      recognitionTips: [
        "Need to retrieve minimum/maximum in O(1) along with push/pop",
        "Design a data structure with enhanced stack operations",
        "Phrases like 'get minimum in constant time'",
        "Stack with additional constraints on retrieval"
      ],
      proTips: [
        "Use two stacks: one for values, one tracking the running minimum",
        "Alternative: encode the min into each stack element as a pair (value, currentMin)",
        "For max stack, use a similar approach with a TreeMap for O(log n) popMax"
      ],
      approach: "Maintain an auxiliary stack that always has the current minimum at the top. On push, push the new min (min of incoming value and current min). On pop, pop from both stacks. getMin() simply peeks the auxiliary stack.",
      templateCode: `// Min Stack — O(1) Push, Pop, GetMin
class MinStack {
    private Deque<Integer> stack;
    private Deque<Integer> minStack;
    
    public MinStack() {
        stack = new ArrayDeque<>();
        minStack = new ArrayDeque<>();
    }
    
    public void push(int val) {
        stack.push(val);
        // Why: track running minimum — push min of val and current min
        int currentMin = minStack.isEmpty() x val : Math.min(val, minStack.peek());
        minStack.push(currentMin);
    }
    
    public void pop() {
        stack.pop();
        minStack.pop(); // Why: keep both stacks in sync
    }
    
    public int top() {
        return stack.peek();
    }
    
    public int getMin() {
        return minStack.peek(); // Why: O(1) access to current minimum
    }
}`,
      cppTemplate: `// Min Stack — O(1) Push, Pop, GetMin
class MinStack {
public:
    vector<int> stack;
    vector<int> minStack;
    
    MinStack() {}
    
    void push(int val) {
        stack.push_back(val);
        // Why: track running minimum — push min of val and current min
        int currentMin = minStack.empty() x val : min(val, minStack.back());
        minStack.push_back(currentMin);
    }
    
    void pop() {
        stack.pop_back();
        minStack.pop_back(); // Why: keep both stacks in sync
    }
    
    int top() {
        return stack.back();
    }
    
    int getMin() {
        return minStack.back(); // Why: O(1) access to current minimum
    }
}`,
      timeComplexity: "O(1) for all operations",
      spaceComplexity: "O(n)",
      problems: [
        { id: "sq-min-stack", title: "Min Stack", platform: "leetcode", url: "https://leetcode.com/problems/min-stack/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Microsoft", "Goldman Sachs", "Google"] },
        { id: "sq-max-stack", title: "Max Stack", platform: "leetcode", url: "https://leetcode.com/problems/max-stack/", difficulty: "hard", isStandard: true, companies: ["Amazon", "Facebook", "Google"] },
        { id: "sq-max-freq-stack", title: "Maximum Frequency Stack", platform: "leetcode", url: "https://leetcode.com/problems/maximum-frequency-stack/", difficulty: "hard", isStandard: true, companies: ["Amazon", "Google"] },
        { id: "sq-valid-parens", title: "Valid Parentheses", platform: "leetcode", url: "https://leetcode.com/problems/valid-parentheses/", difficulty: "easy", isStandard: true, companies: ["Amazon", "Microsoft", "Facebook", "Google", "Apple"] },
        { id: "sq-eval-rpn", title: "Evaluate Reverse Polish Notation", platform: "leetcode", url: "https://leetcode.com/problems/evaluate-reverse-polish-notation/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Microsoft", "Google"] },
        { id: "sq-basic-calc", title: "Basic Calculator", platform: "leetcode", url: "https://leetcode.com/problems/basic-calculator/", difficulty: "hard", isStandard: true, companies: ["Amazon", "Google", "Facebook"] },
        { id: "sq-basic-calc-ii", title: "Basic Calculator II", platform: "leetcode", url: "https://leetcode.com/problems/basic-calculator-ii/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Facebook", "Microsoft"] },
        { id: "sq-decode-string", title: "Decode String", platform: "leetcode", url: "https://leetcode.com/problems/decode-string/", difficulty: "medium", isStandard: true, companies: ["Google", "Amazon", "Microsoft"] }
      ]
    },
    {
      id: "queue-via-stacks",
      title: "Queue via Stacks",
      tagline: "Implement queue behavior using two stacks",
      recognitionTips: [
        "Implement a queue using only stack operations",
        "Design a data structure question combining LIFO and FIFO",
        "Need amortized O(1) dequeue using stacks",
        "System design discussion about message queues and ordering"
      ],
      proTips: [
        "Use two stacks: inbox (for push) and outbox (for pop/peek)",
        "Only transfer inbox to outbox when outbox is empty — this gives amortized O(1)",
        "Each element is moved at most twice, giving O(1) amortized per operation"
      ],
      approach: "Use two stacks: an inbox stack for enqueue operations and an outbox stack for dequeue. When dequeuing, if the outbox is empty, pour all elements from inbox to outbox (reversing the order). Each element moves at most twice across both stacks, yielding amortized O(1) per operation.",
      templateCode: `// Queue using Two Stacks
class MyQueue {
    private Deque<Integer> inbox;
    private Deque<Integer> outbox;
    
    public MyQueue() {
        inbox = new ArrayDeque<>();
        outbox = new ArrayDeque<>();
    }
    
    public void push(int x) {
        inbox.push(x); // Why: always push to inbox
    }
    
    public int pop() {
        transferIfNeeded();
        return outbox.pop();
    }
    
    public int peek() {
        transferIfNeeded();
        return outbox.peek();
    }
    
    public boolean empty() {
        return inbox.isEmpty() && outbox.isEmpty();
    }
    
    private void transferIfNeeded() {
        // Why: only transfer when outbox is empty — maintains correct FIFO order
        // Why: each element is transferred at most once, giving amortized O(1)
        if (outbox.isEmpty()) {
            while (!inbox.isEmpty()) {
                outbox.push(inbox.pop());
            }
        }
    }
}`,
      cppTemplate: `// Queue using Two Stacks
class MyQueue {
public:
    stack<int> inbox;
    stack<int> outbox;
    
    MyQueue() {}
    
    void push(int x) {
        inbox.push(x); // Why: always push to inbox
    }
    
    int pop() {
        transferIfNeeded();
        int front = outbox.top();
        outbox.pop();
        return front;
    }
    
    int peek() {
        transferIfNeeded();
        return outbox.top();
    }
    
    bool empty() {
        return inbox.empty() && outbox.empty();
    }
    
    void transferIfNeeded() {
        // Why: only transfer when outbox is empty — maintains correct FIFO order
        // Why: each element is transferred at most once, giving amortized O(1)
        if (outbox.empty()) {
            while (!inbox.empty()) {
                outbox.push(inbox.top());
                inbox.pop();
            }
        }
    }
}`,
      timeComplexity: "Amortized O(1) per operation",
      spaceComplexity: "O(n)",
      problems: [
        { id: "sq-queue-stacks", title: "Implement Queue using Stacks", platform: "leetcode", url: "https://leetcode.com/problems/implement-queue-using-stacks/", difficulty: "easy", isStandard: true, companies: ["Amazon", "Microsoft", "Goldman Sachs"] },
        { id: "sq-stack-queues", title: "Implement Stack using Queues", platform: "leetcode", url: "https://leetcode.com/problems/implement-stack-using-queues/", difficulty: "easy", isStandard: true, companies: ["Amazon", "Microsoft"] },
        { id: "sq-recent-counter", title: "Number of Recent Calls", platform: "leetcode", url: "https://leetcode.com/problems/number-of-recent-calls/", difficulty: "easy", isStandard: false, companies: ["Amazon"] },
        { id: "sq-moving-avg", title: "Moving Average from Data Stream", platform: "leetcode", url: "https://leetcode.com/problems/moving-average-from-data-stream/", difficulty: "easy", isStandard: true, companies: ["Google", "Facebook"] },
        { id: "sq-hit-counter", title: "Design Hit Counter", platform: "leetcode", url: "https://leetcode.com/problems/design-hit-counter/", difficulty: "medium", isStandard: true, companies: ["Google", "Amazon", "Uber"] },
        { id: "sq-task-scheduler", title: "Task Scheduler", platform: "leetcode", url: "https://leetcode.com/problems/task-scheduler/", difficulty: "medium", isStandard: true, companies: ["Facebook", "Amazon", "Microsoft"] },
        { id: "sq-dota2-senate", title: "Dota2 Senate", platform: "leetcode", url: "https://leetcode.com/problems/dota2-senate/", difficulty: "medium", isStandard: false, companies: ["Amazon"] },
        { id: "sq-first-unique-char-stream", title: "First Unique Character in a String", platform: "leetcode", url: "https://leetcode.com/problems/first-unique-character-in-a-string/", difficulty: "easy", isStandard: true, companies: ["Amazon", "Goldman Sachs", "Microsoft"] }
      ]
    },
    {
      id: "circular-deque",
      title: "Circular Deque",
      tagline: "Design double-ended queues with circular buffer implementation",
      recognitionTips: [
        "Need to insert/delete from both front and rear",
        "Design a circular buffer or ring buffer",
        "Phrases like 'circular deque', 'sliding window maximum'",
        "Fixed-size queue with wrap-around behavior"
      ],
      proTips: [
        "Use modular arithmetic for wrap-around: (index + 1) % capacity",
        "Track size separately to distinguish between full and empty states",
        "Useful as building block for sliding window maximum using deque"
      ],
      approach: "Use a fixed-size array with front and rear pointers. Both pointers wrap around using modular arithmetic. insertFront decrements front, insertRear increments rear. Track size to check full/empty conditions.",
      templateCode: `// Circular Deque Design
class MyCircularDeque {
    private int[] data;
    private int front, rear, size, capacity;
    
    public MyCircularDeque(int k) {
        data = new int[k];
        capacity = k;
        front = 0;
        rear = k - 1;
        size = 0;
    }
    
    public boolean insertFront(int value) {
        if (isFull()) return false;
        front = (front - 1 + capacity) % capacity; // Why: wrap around backwards
        data[front] = value;
        size++;
        return true;
    }
    
    public boolean insertLast(int value) {
        if (isFull()) return false;
        rear = (rear + 1) % capacity; // Why: wrap around forwards
        data[rear] = value;
        size++;
        return true;
    }
    
    public boolean deleteFront() {
        if (isEmpty()) return false;
        front = (front + 1) % capacity;
        size--;
        return true;
    }
    
    public boolean deleteLast() {
        if (isEmpty()) return false;
        rear = (rear - 1 + capacity) % capacity;
        size--;
        return true;
    }
    
    public int getFront() { return isEmpty() x -1 : data[front]; }
    public int getRear() { return isEmpty() x -1 : data[rear]; }
    public boolean isEmpty() { return size == 0; }
    public boolean isFull() { return size == capacity; }
}`,
      cppTemplate: `// Circular Deque Design
class MyCircularDeque {
public:
    vector<int> data;
    int front, rear, size, capacity;
    
    MyCircularDeque(int k) : data(k), front(0), rear(k - 1), size(0), capacity(k) {}
    
    bool insertFront(int value) {
        if (isFull()) return false;
        front = (front - 1 + capacity) % capacity; // Why: wrap around backwards
        data[front] = value;
        size++;
        return true;
    }
    
    bool insertLast(int value) {
        if (isFull()) return false;
        rear = (rear + 1) % capacity; // Why: wrap around forwards
        data[rear] = value;
        size++;
        return true;
    }
    
    bool deleteFront() {
        if (isEmpty()) return false;
        front = (front + 1) % capacity;
        size--;
        return true;
    }
    
    bool deleteLast() {
        if (isEmpty()) return false;
        rear = (rear - 1 + capacity) % capacity;
        size--;
        return true;
    }
    
    int getFront() { return isEmpty() x -1 : data[front]; }
    int getRear() { return isEmpty() x -1 : data[rear]; }
    bool isEmpty() { return size == 0; }
    bool isFull() { return size == capacity; }
}`,
      timeComplexity: "O(1) for all operations",
      spaceComplexity: "O(k)",
      problems: [
        { id: "sq-circular-deque", title: "Design Circular Deque", platform: "leetcode", url: "https://leetcode.com/problems/design-circular-deque/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Google"] },
        { id: "sq-circular-queue", title: "Design Circular Queue", platform: "leetcode", url: "https://leetcode.com/problems/design-circular-queue/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Microsoft"] },
        { id: "sq-sliding-window-max", title: "Sliding Window Maximum", platform: "leetcode", url: "https://leetcode.com/problems/sliding-window-maximum/", difficulty: "hard", isStandard: true, companies: ["Amazon", "Google", "Microsoft", "Facebook"] },
        { id: "sq-shortest-subarray-k", title: "Shortest Subarray with Sum at Least K", platform: "leetcode", url: "https://leetcode.com/problems/shortest-subarray-with-sum-at-least-k/", difficulty: "hard", isStandard: true, companies: ["Google", "Facebook"] },
        { id: "sq-max-sliding-window-gfg", title: "Maximum of all subarrays of size k", platform: "gfg", url: "https://www.geeksforgeeks.org/sliding-window-maximum-maximum-of-all-subarrays-of-size-k/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Flipkart", "Microsoft"] },
        { id: "sq-jump-game-vi", title: "Jump Game VI", platform: "leetcode", url: "https://leetcode.com/problems/jump-game-vi/", difficulty: "medium", isStandard: false, companies: ["Amazon", "Google"] },
        { id: "sq-constrained-subseq-sum", title: "Constrained Subsequence Sum", platform: "leetcode", url: "https://leetcode.com/problems/constrained-subsequence-sum/", difficulty: "hard", isStandard: false, companies: ["Google"] },
        { id: "sq-longest-subarr-limit", title: "Longest Continuous Subarray With Absolute Diff Less Than or Equal to Limit", platform: "leetcode", url: "https://leetcode.com/problems/longest-continuous-subarray-with-absolute-diff-less-than-or-equal-to-limit/", difficulty: "medium", isStandard: false, companies: ["Google", "Amazon"] }
      ]
    },
    {
      id: "next-greater-element",
      title: "Next Greater Element",
      tagline: "Classic monotonic stack application for finding nearest larger elements",
      recognitionTips: [
        "Problem explicitly asks for next greater or next smaller element",
        "Need to find the nearest element satisfying a comparison condition",
        "Involves circular arrays where you wrap around",
        "Temperature, stock price, or height comparison problems"
      ],
      proTips: [
        "For circular arrays, iterate through the array twice (2n iterations) using index % n",
        "Store indices on the stack for positional access, not just values",
        "Direction matters: iterate left-to-right for next greater TO THE RIGHT, right-to-left for previous greater"
      ],
      approach: "Use a decreasing monotonic stack. Iterate through the array and for each element, pop all stack elements smaller than it — each popped element's next greater is the current element. The remaining elements in the stack have no next greater element.",
      templateCode: `// Next Greater Element — Circular Array
public int[] nextGreaterElements(int[] nums) {
    int n = nums.length;
    int[] result = new int[n];
    Arrays.fill(result, -1);
    Deque<Integer> stack = new ArrayDeque<>();
    
    // Why: iterate 2n times to handle circular nature
    for (int i = 0; i < 2 * n; i++) {
        int currentVal = nums[i % n];
        while (!stack.isEmpty() && nums[stack.peek()] < currentVal) {
            result[stack.pop()] = currentVal;
        }
        // Why: only push indices from first pass to avoid duplicate answers
        if (i < n) stack.push(i);
    }
    return result;
}

// Previous Smaller Element
public int[] previousSmaller(int[] nums) {
    int n = nums.length;
    int[] result = new int[n];
    Arrays.fill(result, -1);
    Deque<Integer> stack = new ArrayDeque<>(); // Why: increasing stack
    
    for (int i = 0; i < n; i++) {
        // Why: pop elements >= current; the remaining top is the previous smaller
        while (!stack.isEmpty() && stack.peek() >= nums[i]) {
            stack.pop();
        }
        result[i] = stack.isEmpty() x -1 : stack.peek();
        stack.push(nums[i]);
    }
    return result;
}`,
      cppTemplate: `// Next Greater Element — Circular Array
vector<int> nextGreaterElements(vector<int>& nums) {
    int n = nums.size();
    vector<int> result(n, -1);
    vector<int> stack;
    
    // Why: iterate 2n times to handle circular nature
    for (int i = 0; i < 2 * n; i++) {
        int currentVal = nums[i % n];
        while (!stack.empty() && nums[stack.back()] < currentVal) {
            result[stack.back()] = currentVal;
            stack.pop_back();
        }
        // Why: only push indices from first pass to avoid duplicate answers
        if (i < n) stack.push_back(i);
    }
    return result;
}

// Previous Smaller Element
vector<int> previousSmaller(vector<int>& nums) {
    int n = nums.size();
    vector<int> result(n, -1);
    vector<int> stack; // Why: increasing stack
    
    for (int i = 0; i < n; i++) {
        // Why: pop elements >= current; the remaining top is the previous smaller
        while (!stack.empty() && stack.back() >= nums[i]) {
            stack.pop_back();
        }
        result[i] = stack.empty() x -1 : stack.back();
        stack.push_back(nums[i]);
    }
    return result;
}`,
      timeComplexity: "O(n)",
      spaceComplexity: "O(n)",
      problems: [
        { id: "sq-nge-i-pattern", title: "Next Greater Element I", platform: "leetcode", url: "https://leetcode.com/problems/next-greater-element-i/", difficulty: "easy", isStandard: true, companies: ["Amazon", "Goldman Sachs"] },
        { id: "sq-nge-ii-pattern", title: "Next Greater Element II", platform: "leetcode", url: "https://leetcode.com/problems/next-greater-element-ii/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Google"] },
        { id: "sq-nge-iii", title: "Next Greater Element III", platform: "leetcode", url: "https://leetcode.com/problems/next-greater-element-iii/", difficulty: "medium", isStandard: false, companies: ["Amazon"] },
        { id: "sq-buildings-ocean", title: "Buildings With an Ocean View", platform: "leetcode", url: "https://leetcode.com/problems/buildings-with-an-ocean-view/", difficulty: "medium", isStandard: true, companies: ["Facebook", "Amazon"] },
        { id: "sq-steps-to-warm", title: "Daily Temperatures", platform: "leetcode", url: "https://leetcode.com/problems/daily-temperatures/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Facebook", "Google"] },
        { id: "sq-visible-people", title: "Number of Visible People in a Queue", platform: "leetcode", url: "https://leetcode.com/problems/number-of-visible-people-in-a-queue/", difficulty: "hard", isStandard: false, companies: ["Google"] },
        { id: "sq-sum-subarray-mins", title: "Sum of Subarray Minimums", platform: "leetcode", url: "https://leetcode.com/problems/sum-of-subarray-minimums/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Google"] },
        { id: "sq-sum-subarray-ranges", title: "Sum of Subarray Ranges", platform: "leetcode", url: "https://leetcode.com/problems/sum-of-subarray-ranges/", difficulty: "medium", isStandard: false, companies: ["Amazon"] }
      ]
    }
  ]
};

stacksQueues.totalProblems = stacksQueues.patterns.reduce((sum, p) => sum + p.problems.length, 0);
