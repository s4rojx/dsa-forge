import { Topic } from "@/types";

export const linkedLists: Topic = {
  slug: "linked-lists",
  title: "Linked Lists",
  description: "Pointer manipulation, in-place reversal, and fast-slow techniques",
  icon: "Link",
  totalProblems: 0,
  patterns: [
    {
      id: "fast-slow-pointers",
      title: "Fast & Slow Pointers",
      tagline: "Detect cycles, find midpoints, and identify patterns with two-speed traversal",
      recognitionTips: [
        "Problem involves cycle detection in a linked list",
        "Need to find the middle of a linked list",
        "Phrases like 'happy number', 'circular linked list'",
        "Need to find the start of a cycle"
      ],
      proTips: [
        "Fast moves 2 steps, slow moves 1 step — they meet inside a cycle if one exists",
        "To find cycle start: after detection, reset one pointer to head and move both at speed 1",
        "For finding middle: when fast reaches end, slow is at middle"
      ],
      approach: "Use two pointers moving at different speeds. The fast pointer moves twice as fast as the slow pointer. If there's a cycle, they'll eventually meet. For middle finding, when the fast pointer reaches the end, the slow pointer is at the middle.",
      templateCode: `// Fast & Slow — Detect Cycle and Find Start
public ListNode detectCycle(ListNode head) {
    ListNode slow = head, fast = head;
    
    // Why: detect if a cycle exists
    while (fast != null && fast.next != null) {
        slow = slow.next;
        fast = fast.next.next;
        if (slow == fast) break;
    }
    
    // Why: no cycle found
    if (fast == null || fast.next == null) return null;
    
    // Why: mathematical proof — distance from head to cycle start
    // equals distance from meeting point to cycle start
    slow = head;
    while (slow != fast) {
        slow = slow.next;
        fast = fast.next;
    }
    return slow;
}

// Fast & Slow — Find Middle
public ListNode middleNode(ListNode head) {
    ListNode slow = head, fast = head;
    while (fast != null && fast.next != null) {
        slow = slow.next;
        fast = fast.next.next;
    }
    return slow; // Why: slow is at middle when fast reaches end
}`,
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
      problems: [
        { id: "ll-middle", title: "Middle of the Linked List", platform: "leetcode", url: "https://leetcode.com/problems/middle-of-the-linked-list/", difficulty: "easy", isStandard: true, companies: ["Amazon", "Microsoft"] },
        { id: "ll-has-cycle", title: "Linked List Cycle", platform: "leetcode", url: "https://leetcode.com/problems/linked-list-cycle/", difficulty: "easy", isStandard: true, companies: ["Amazon", "Microsoft", "Goldman Sachs"] },
        { id: "ll-cycle-ii", title: "Linked List Cycle II", platform: "leetcode", url: "https://leetcode.com/problems/linked-list-cycle-ii/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Microsoft", "Google"] },
        { id: "ll-happy-number", title: "Happy Number", platform: "leetcode", url: "https://leetcode.com/problems/happy-number/", difficulty: "easy", isStandard: true, companies: ["Apple", "Amazon"] },
        { id: "ll-palindrome", title: "Palindrome Linked List", platform: "leetcode", url: "https://leetcode.com/problems/palindrome-linked-list/", difficulty: "easy", isStandard: true, companies: ["Amazon", "Facebook", "Microsoft"] },
        { id: "ll-reorder", title: "Reorder List", platform: "leetcode", url: "https://leetcode.com/problems/reorder-list/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Facebook", "Microsoft"] },
        { id: "ll-find-duplicate-fs", title: "Find the Duplicate Number", platform: "leetcode", url: "https://leetcode.com/problems/find-the-duplicate-number/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Google", "Microsoft"] },
        { id: "ll-circular-loop", title: "Circular Array Loop", platform: "leetcode", url: "https://leetcode.com/problems/circular-array-loop/", difficulty: "medium", isStandard: false, companies: ["Amazon"] }
      ]
    },
    {
      id: "in-place-reversal",
      title: "In-Place Reversal",
      tagline: "Reverse portions of a linked list without extra space",
      recognitionTips: [
        "Problem asks to reverse a linked list or a portion of it",
        "Need to reverse between positions m and n",
        "Phrases like 'reverse in groups of k'",
        "Swap pairs/groups of nodes"
      ],
      proTips: [
        "Always save the next pointer before reversing — you'll lose the reference otherwise",
        "For partial reversal, save the node before the reversal start and the node after reversal end to reconnect",
        "Use a dummy head node to simplify edge cases when reversing from position 1"
      ],
      approach: "Keep three pointers: prev, current, and next. At each step, save current.next, point current.next to prev, then advance prev and current. For partial reversal (m to n), first traverse to position m, then reverse n-m+1 nodes, and reconnect.",
      templateCode: `// In-Place Reversal — Reverse Linked List
public ListNode reverseList(ListNode head) {
    ListNode prev = null;
    ListNode current = head;
    
    while (current != null) {
        ListNode nextTemp = current.next; // Why: save next before breaking link
        current.next = prev;              // Why: reverse the pointer
        prev = current;                   // Why: advance prev
        current = nextTemp;               // Why: advance current
    }
    return prev; // Why: prev is the new head
}

// In-Place Reversal — Reverse Between Positions m and n
public ListNode reverseBetween(ListNode head, int left, int right) {
    ListNode dummy = new ListNode(0); // Why: dummy simplifies edge cases
    dummy.next = head;
    ListNode prev = dummy;
    
    // Why: advance to the node just before the reversal start
    for (int i = 0; i < left - 1; i++) {
        prev = prev.next;
    }
    
    ListNode current = prev.next;
    // Why: reverse (right - left) links
    for (int i = 0; i < right - left; i++) {
        ListNode nextNode = current.next;
        current.next = nextNode.next;
        nextNode.next = prev.next;
        prev.next = nextNode;
    }
    return dummy.next;
}`,
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
      problems: [
        { id: "ll-reverse", title: "Reverse Linked List", platform: "leetcode", url: "https://leetcode.com/problems/reverse-linked-list/", difficulty: "easy", isStandard: true, companies: ["Amazon", "Microsoft", "Apple", "Google", "Facebook"] },
        { id: "ll-reverse-ii", title: "Reverse Linked List II", platform: "leetcode", url: "https://leetcode.com/problems/reverse-linked-list-ii/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Facebook", "Microsoft"] },
        { id: "ll-swap-pairs", title: "Swap Nodes in Pairs", platform: "leetcode", url: "https://leetcode.com/problems/swap-nodes-in-pairs/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Microsoft"] },
        { id: "ll-reverse-k-group", title: "Reverse Nodes in k-Group", platform: "leetcode", url: "https://leetcode.com/problems/reverse-nodes-in-k-group/", difficulty: "hard", isStandard: true, companies: ["Amazon", "Microsoft", "Facebook", "Google"] },
        { id: "ll-rotate", title: "Rotate List", platform: "leetcode", url: "https://leetcode.com/problems/rotate-list/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Microsoft"] },
        { id: "ll-swap-kth", title: "Swapping Nodes in a Linked List", platform: "leetcode", url: "https://leetcode.com/problems/swapping-nodes-in-a-linked-list/", difficulty: "medium", isStandard: false, companies: ["Amazon", "Facebook"] },
        { id: "ll-reverse-even-groups", title: "Reverse Nodes in Even Length Groups", platform: "leetcode", url: "https://leetcode.com/problems/reverse-nodes-in-even-length-groups/", difficulty: "medium", isStandard: false, companies: ["Amazon"] },
        { id: "ll-reverse-alternating-k", title: "Reverse Alternate K Nodes", platform: "gfg", url: "https://www.geeksforgeeks.org/reverse-alternate-k-nodes-in-a-singly-linked-list/", difficulty: "hard", isStandard: false, companies: ["Amazon", "Microsoft"] }
      ]
    },
    {
      id: "merge-sort-ll",
      title: "Merge & Sort",
      tagline: "Merge sorted lists and sort linked lists using divide and conquer",
      recognitionTips: [
        "Problem involves merging two or more sorted linked lists",
        "Need to sort a linked list",
        "Phrases like 'merge k sorted lists', 'sort list'",
        "Need to combine multiple ordered sequences"
      ],
      proTips: [
        "For merge sort on linked list, use fast-slow pointers to find the middle",
        "For K sorted lists, use a min-heap of size K for optimal merging",
        "Merge sort is preferred over quicksort for linked lists due to O(1) merge space"
      ],
      approach: "For merging two lists, use a dummy head and compare elements one by one. For sort, split the list at the middle using fast-slow pointers, recursively sort both halves, then merge. For K lists, use a priority queue for O(N log K) complexity.",
      templateCode: `// Merge Two Sorted Lists
public ListNode mergeTwoLists(ListNode l1, ListNode l2) {
    ListNode dummy = new ListNode(0);
    ListNode tail = dummy;
    
    while (l1 != null && l2 != null) {
        if (l1.val <= l2.val) {
            tail.next = l1;
            l1 = l1.next;
        } else {
            tail.next = l2;
            l2 = l2.next;
        }
        tail = tail.next;
    }
    tail.next = (l1 != null) ? l1 : l2; // Why: append remaining nodes
    return dummy.next;
}

// Sort List using Merge Sort
public ListNode sortList(ListNode head) {
    if (head == null || head.next == null) return head;
    
    // Why: find middle using fast-slow pointers
    ListNode slow = head, fast = head.next;
    while (fast != null && fast.next != null) {
        slow = slow.next;
        fast = fast.next.next;
    }
    
    ListNode secondHalf = slow.next;
    slow.next = null; // Why: split the list into two halves
    
    ListNode left = sortList(head);
    ListNode right = sortList(secondHalf);
    return mergeTwoLists(left, right);
}`,
      timeComplexity: "O(n log n) for sort, O(n) for merge",
      spaceComplexity: "O(log n) recursion stack",
      problems: [
        { id: "ll-merge-two", title: "Merge Two Sorted Lists", platform: "leetcode", url: "https://leetcode.com/problems/merge-two-sorted-lists/", difficulty: "easy", isStandard: true, companies: ["Amazon", "Microsoft", "Apple", "Google", "Facebook"] },
        { id: "ll-sort-list", title: "Sort List", platform: "leetcode", url: "https://leetcode.com/problems/sort-list/", difficulty: "medium", isStandard: true, companies: ["Facebook", "Amazon", "Microsoft"] },
        { id: "ll-merge-k", title: "Merge k Sorted Lists", platform: "leetcode", url: "https://leetcode.com/problems/merge-k-sorted-lists/", difficulty: "hard", isStandard: true, companies: ["Amazon", "Facebook", "Google", "Microsoft", "Apple"] },
        { id: "ll-insertion-sort", title: "Insertion Sort List", platform: "leetcode", url: "https://leetcode.com/problems/insertion-sort-list/", difficulty: "medium", isStandard: false, companies: ["Amazon", "Microsoft"] },
        { id: "ll-add-two-nums", title: "Add Two Numbers", platform: "leetcode", url: "https://leetcode.com/problems/add-two-numbers/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Microsoft", "Google", "Facebook"] },
        { id: "ll-add-two-nums-ii", title: "Add Two Numbers II", platform: "leetcode", url: "https://leetcode.com/problems/add-two-numbers-ii/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Microsoft", "Facebook"] },
        { id: "ll-intersection", title: "Intersection of Two Linked Lists", platform: "leetcode", url: "https://leetcode.com/problems/intersection-of-two-linked-lists/", difficulty: "easy", isStandard: true, companies: ["Amazon", "Microsoft", "Facebook"] },
        { id: "ll-partition", title: "Partition List", platform: "leetcode", url: "https://leetcode.com/problems/partition-list/", difficulty: "medium", isStandard: false, companies: ["Amazon"] }
      ]
    },
    {
      id: "skip-jump-pointers",
      title: "Skip/Jump Pointers",
      tagline: "Skip ahead to solve problems involving nth from end, flatten, or multi-level lists",
      recognitionTips: [
        "Problem asks for the nth node from the end",
        "Need to flatten a multi-level linked list",
        "Phrases like 'remove nth from end', 'flatten'",
        "Need to maintain a gap of n between two pointers"
      ],
      proTips: [
        "For nth from end: advance one pointer n steps first, then march both until the first reaches the end",
        "Use a dummy head to handle edge case of removing the first node",
        "For flatten operations, process child/bottom pointers before advancing to next"
      ],
      approach: "Use a gap-based two-pointer technique. Advance the first pointer n steps ahead, then move both pointers at the same speed. When the first pointer reaches the end, the second pointer is at the desired position.",
      templateCode: `// Skip/Jump — Remove Nth Node From End
public ListNode removeNthFromEnd(ListNode head, int n) {
    ListNode dummy = new ListNode(0);
    dummy.next = head;
    ListNode first = dummy, second = dummy;
    
    // Why: create a gap of n+1 between first and second
    for (int i = 0; i <= n; i++) {
        first = first.next;
    }
    
    // Why: when first reaches null, second is just before the target
    while (first != null) {
        first = first.next;
        second = second.next;
    }
    
    second.next = second.next.next; // Why: skip the nth node
    return dummy.next;
}

// Flatten a Multilevel Doubly Linked List
public Node flatten(Node head) {
    if (head == null) return null;
    Node current = head;
    
    while (current != null) {
        if (current.child != null) {
            Node child = current.child;
            Node childTail = child;
            // Why: find the tail of child list to connect to current.next
            while (childTail.next != null) {
                childTail = childTail.next;
            }
            childTail.next = current.next;
            if (current.next != null) current.next.prev = childTail;
            current.next = child;
            child.prev = current;
            current.child = null; // Why: clear the child pointer
        }
        current = current.next;
    }
    return head;
}`,
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
      problems: [
        { id: "ll-remove-nth", title: "Remove Nth Node From End of List", platform: "leetcode", url: "https://leetcode.com/problems/remove-nth-node-from-end-of-list/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Facebook", "Microsoft", "Google"] },
        { id: "ll-flatten-multi", title: "Flatten a Multilevel Doubly Linked List", platform: "leetcode", url: "https://leetcode.com/problems/flatten-a-multilevel-doubly-linked-list/", difficulty: "medium", isStandard: true, companies: ["Facebook", "Microsoft"] },
        { id: "ll-odd-even", title: "Odd Even Linked List", platform: "leetcode", url: "https://leetcode.com/problems/odd-even-linked-list/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Microsoft"] },
        { id: "ll-split-parts", title: "Split Linked List in Parts", platform: "leetcode", url: "https://leetcode.com/problems/split-linked-list-in-parts/", difficulty: "medium", isStandard: false, companies: ["Amazon"] },
        { id: "ll-delete-node", title: "Delete Node in a Linked List", platform: "leetcode", url: "https://leetcode.com/problems/delete-node-in-a-linked-list/", difficulty: "medium", isStandard: true, companies: ["Microsoft", "Apple", "Amazon"] },
        { id: "ll-remove-elements", title: "Remove Linked List Elements", platform: "leetcode", url: "https://leetcode.com/problems/remove-linked-list-elements/", difficulty: "easy", isStandard: false, companies: ["Amazon"] },
        { id: "ll-remove-duplicates", title: "Remove Duplicates from Sorted List", platform: "leetcode", url: "https://leetcode.com/problems/remove-duplicates-from-sorted-list/", difficulty: "easy", isStandard: true, companies: ["Amazon", "Microsoft"] },
        { id: "ll-remove-duplicates-ii", title: "Remove Duplicates from Sorted List II", platform: "leetcode", url: "https://leetcode.com/problems/remove-duplicates-from-sorted-list-ii/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Microsoft", "Facebook"] }
      ]
    },
    {
      id: "clone-random",
      title: "Clone with Random Pointer",
      tagline: "Deep copy linked lists with arbitrary pointers using O(1) space tricks",
      recognitionTips: [
        "Problem involves deep copying a linked list with extra pointers",
        "Nodes have random/arbitrary pointers alongside next",
        "Need to clone a complex data structure",
        "Phrases like 'copy list with random pointer'"
      ],
      proTips: [
        "The O(1) space trick: interleave cloned nodes between originals (A -> A' -> B -> B' ...)",
        "HashMap approach is cleaner but uses O(n) space",
        "Remember to restore the original list after extracting the clone"
      ],
      approach: "Three-pass approach: 1) Create cloned nodes and interleave them (A→A'→B→B'). 2) Set random pointers for cloned nodes using original.random.next. 3) Separate the two interleaved lists. This achieves O(n) time and O(1) extra space.",
      templateCode: `// Clone with Random Pointer — O(1) Space
public Node copyRandomList(Node head) {
    if (head == null) return null;
    
    // Pass 1: interleave cloned nodes
    // Why: A -> A' -> B -> B' allows O(1) random pointer mapping
    Node current = head;
    while (current != null) {
        Node clone = new Node(current.val);
        clone.next = current.next;
        current.next = clone;
        current = clone.next;
    }
    
    // Pass 2: set random pointers for cloned nodes
    current = head;
    while (current != null) {
        if (current.random != null) {
            // Why: current.next is the clone, current.random.next is the clone of random target
            current.next.random = current.random.next;
        }
        current = current.next.next;
    }
    
    // Pass 3: separate the two lists
    Node cloneHead = head.next;
    current = head;
    while (current != null) {
        Node clone = current.next;
        current.next = clone.next;
        clone.next = (clone.next != null) ? clone.next.next : null;
        current = current.next;
    }
    return cloneHead;
}`,
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
      problems: [
        { id: "ll-copy-random", title: "Copy List with Random Pointer", platform: "leetcode", url: "https://leetcode.com/problems/copy-list-with-random-pointer/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Facebook", "Microsoft", "Google"] },
        { id: "ll-clone-graph", title: "Clone Graph", platform: "leetcode", url: "https://leetcode.com/problems/clone-graph/", difficulty: "medium", isStandard: true, companies: ["Facebook", "Amazon", "Google", "Microsoft"] },
        { id: "ll-clone-binary-random", title: "Clone Binary Tree With Random Pointer", platform: "leetcode", url: "https://leetcode.com/problems/clone-binary-tree-with-random-pointer/", difficulty: "medium", isStandard: false, companies: ["Facebook"] },
        { id: "ll-copy-random-gfg", title: "Clone a linked list with random pointer", platform: "gfg", url: "https://www.geeksforgeeks.org/a-linked-list-with-next-and-arbit-pointer/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Microsoft", "Flipkart"] },
        { id: "ll-lru-cache", title: "LRU Cache", platform: "leetcode", url: "https://leetcode.com/problems/lru-cache/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Facebook", "Microsoft", "Google", "Apple"] },
        { id: "ll-lfu-cache", title: "LFU Cache", platform: "leetcode", url: "https://leetcode.com/problems/lfu-cache/", difficulty: "hard", isStandard: true, companies: ["Amazon", "Google", "Microsoft"] },
        { id: "ll-flatten-bst", title: "Flatten Binary Tree to Linked List", platform: "leetcode", url: "https://leetcode.com/problems/flatten-binary-tree-to-linked-list/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Facebook", "Microsoft"] },
        { id: "ll-design-linked-list", title: "Design Linked List", platform: "leetcode", url: "https://leetcode.com/problems/design-linked-list/", difficulty: "medium", isStandard: false, companies: ["Amazon"] }
      ]
    }
  ]
};

linkedLists.totalProblems = linkedLists.patterns.reduce((sum, p) => sum + p.problems.length, 0);
