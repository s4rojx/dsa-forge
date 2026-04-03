import { Topic } from "@/types";

export const treesBst: Topic = {
  slug: "trees-bst",
  title: "Trees & BST",
  description: "Hierarchical structures — traversals, path problems, LCA, and balanced BST operations",
  icon: "GitBranch",
  totalProblems: 0,
  patterns: [
    {
      id: "tree-traversals",
      title: "Tree Traversals (BFS/DFS)",
      tagline: "Master inorder, preorder, postorder, and level-order to unlock all tree problems",
      recognitionTips: [
        "Problem asks to visit nodes in a specific order",
        "Need level-by-level processing (BFS) or depth-first exploration (DFS)",
        "Phrases like 'zigzag level order', 'right side view', 'boundary traversal'",
        "Need to collect nodes at specific depths or in specific sequences"
      ],
      proTips: [
        "BFS uses a Queue; DFS uses recursion or an explicit Stack",
        "For zigzag, alternate the direction of insertion at each level",
        "Iterative inorder using a stack is the foundation for BST iterator design"
      ],
      approach: "BFS: Use a queue, process level by level. DFS: Use recursion or stack. Inorder (left-root-right) gives sorted order for BST. Preorder (root-left-right) for tree serialization. Postorder (left-right-root) for deletion and evaluation.",
      templateCode: `// Level Order Traversal (BFS)
public List<List<Integer>> levelOrder(TreeNode root) {
    List<List<Integer>> result = new ArrayList<>();
    if (root == null) return result;
    Queue<TreeNode> queue = new LinkedList<>();
    queue.offer(root);
    while (!queue.isEmpty()) {
        int levelSize = queue.size();
        List<Integer> currentLevel = new ArrayList<>();
        for (int i = 0; i < levelSize; i++) {
            TreeNode node = queue.poll();
            currentLevel.add(node.val);
            if (node.left != null) queue.offer(node.left);
            if (node.right != null) queue.offer(node.right);
        }
        result.add(currentLevel);
    }
    return result;
}`,
      cppTemplate: `// Level Order Traversal (BFS)
vector<vector<int>> levelOrder(TreeNode* root) {
    vector<vector<int>> result;
    if (root == nullptr) return result;
    queue<TreeNode*> queue;
    queue.push(root);
    while (!queue.empty()) {
        int levelSize = queue.size();
        vector<int> currentLevel;
        for (int i = 0; i < levelSize; i++) {
            TreeNode* node = queue.front();
            queue.pop();
            currentLevel.push_back(node->val);
            if (node->left != nullptr) queue.push(node->left);
            if (node->right != nullptr) queue.push(node->right);
        }
        result.push_back(currentLevel);
    }
    return result;
}`,
      timeComplexity: "O(n)",
      spaceComplexity: "O(n)",
      problems: [
        { id: "tb-inorder", title: "Binary Tree Inorder Traversal", platform: "leetcode", url: "https://leetcode.com/problems/binary-tree-inorder-traversal/", difficulty: "easy", isStandard: true, companies: ["Amazon", "Microsoft"] },
        { id: "tb-preorder", title: "Binary Tree Preorder Traversal", platform: "leetcode", url: "https://leetcode.com/problems/binary-tree-preorder-traversal/", difficulty: "easy", isStandard: true, companies: ["Amazon", "Google"] },
        { id: "tb-level-order", title: "Binary Tree Level Order Traversal", platform: "leetcode", url: "https://leetcode.com/problems/binary-tree-level-order-traversal/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Microsoft", "Facebook", "Google"] },
        { id: "tb-zigzag", title: "Binary Tree Zigzag Level Order Traversal", platform: "leetcode", url: "https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Facebook", "Microsoft"] },
        { id: "tb-right-view", title: "Binary Tree Right Side View", platform: "leetcode", url: "https://leetcode.com/problems/binary-tree-right-side-view/", difficulty: "medium", isStandard: true, companies: ["Facebook", "Amazon", "Microsoft"] },
        { id: "tb-max-depth", title: "Maximum Depth of Binary Tree", platform: "leetcode", url: "https://leetcode.com/problems/maximum-depth-of-binary-tree/", difficulty: "easy", isStandard: true, companies: ["Amazon", "Microsoft", "Google"] },
        { id: "tb-same-tree", title: "Same Tree", platform: "leetcode", url: "https://leetcode.com/problems/same-tree/", difficulty: "easy", isStandard: true, companies: ["Amazon", "Microsoft"] },
        { id: "tb-symmetric", title: "Symmetric Tree", platform: "leetcode", url: "https://leetcode.com/problems/symmetric-tree/", difficulty: "easy", isStandard: true, companies: ["Amazon", "Microsoft", "Facebook"] },
        { id: "tb-invert", title: "Invert Binary Tree", platform: "leetcode", url: "https://leetcode.com/problems/invert-binary-tree/", difficulty: "easy", isStandard: true, companies: ["Google", "Amazon"] },
        { id: "tb-boundary", title: "Boundary of Binary Tree", platform: "leetcode", url: "https://leetcode.com/problems/boundary-of-binary-tree/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Facebook"] }
      ]
    },
    {
      id: "path-problems",
      title: "Path Problems",
      tagline: "Find paths with target sums, maximum values, or specific properties in trees",
      recognitionTips: ["Problem asks for root-to-leaf or any-to-any paths with specific sum", "Need to find maximum path sum in a tree", "Phrases like 'path sum', 'all paths', 'longest path'", "Diameter, longest univalue path, or similar distance metrics"],
      proTips: ["For root-to-leaf paths, use backtracking with a running sum", "For any-to-any max path sum, at each node consider: left + node, right + node, left + node + right", "Diameter = max(left_height + right_height) across all nodes"],
      approach: "Use DFS exploring all paths. For sum-based problems, pass the running sum down and check at leaves. For maximum path problems, compute the best path through each node and return the best single-side path upward.",
      templateCode: `// Maximum Path Sum (any-to-any)
int maxPathResult = Integer.MIN_VALUE;
public int maxPathSum(TreeNode root) {
    maxPathResult = Integer.MIN_VALUE;
    maxGain(root);
    return maxPathResult;
}
private int maxGain(TreeNode node) {
    if (node == null) return 0;
    // Why: only take positive contributions from subtrees
    int leftGain = Math.max(0, maxGain(node.left));
    int rightGain = Math.max(0, maxGain(node.right));
    // Why: path through this node using both subtrees
    maxPathResult = Math.max(maxPathResult, node.val + leftGain + rightGain);
    // Why: return best single-side path for parent to use
    return node.val + Math.max(leftGain, rightGain);
}`,
      cppTemplate: `// Maximum Path Sum (any-to-any)
int maxPathResult = INT_MIN;
int maxPathSum(TreeNode* root) {
    maxPathResult = INT_MIN;
    maxGain(root);
    return maxPathResult;
}
int maxGain(TreeNode* node) {
    if (node == nullptr) return 0;
    // Why: only take positive contributions from subtrees
    int leftGain = max(0, maxGain(node->left));
    int rightGain = max(0, maxGain(node->right));
    // Why: path through this node using both subtrees
    maxPathResult = max(maxPathResult, node->val + leftGain + rightGain);
    // Why: return best single-side path for parent to use
    return node->val + max(leftGain, rightGain);
}`,
      timeComplexity: "O(n)",
      spaceComplexity: "O(h) where h = height",
      problems: [
        { id: "tb-path-sum", title: "Path Sum", platform: "leetcode", url: "https://leetcode.com/problems/path-sum/", difficulty: "easy", isStandard: true, companies: ["Amazon", "Microsoft"] },
        { id: "tb-path-sum-ii", title: "Path Sum II", platform: "leetcode", url: "https://leetcode.com/problems/path-sum-ii/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Facebook"] },
        { id: "tb-path-sum-iii", title: "Path Sum III", platform: "leetcode", url: "https://leetcode.com/problems/path-sum-iii/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Facebook", "Microsoft"] },
        { id: "tb-max-path-sum", title: "Binary Tree Maximum Path Sum", platform: "leetcode", url: "https://leetcode.com/problems/binary-tree-maximum-path-sum/", difficulty: "hard", isStandard: true, companies: ["Facebook", "Amazon", "Google", "Microsoft"] },
        { id: "tb-diameter", title: "Diameter of Binary Tree", platform: "leetcode", url: "https://leetcode.com/problems/diameter-of-binary-tree/", difficulty: "easy", isStandard: true, companies: ["Facebook", "Amazon", "Google"] },
        { id: "tb-sum-root-leaf", title: "Sum Root to Leaf Numbers", platform: "leetcode", url: "https://leetcode.com/problems/sum-root-to-leaf-numbers/", difficulty: "medium", isStandard: true, companies: ["Facebook", "Amazon"] },
        { id: "tb-longest-univalue", title: "Longest Univalue Path", platform: "leetcode", url: "https://leetcode.com/problems/longest-univalue-path/", difficulty: "medium", isStandard: false, companies: ["Google"] },
        { id: "tb-count-good-nodes", title: "Count Good Nodes in Binary Tree", platform: "leetcode", url: "https://leetcode.com/problems/count-good-nodes-in-binary-tree/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Microsoft"] }
      ]
    },
    {
      id: "lca-trees",
      title: "Lowest Common Ancestor",
      tagline: "Find the deepest shared ancestor between two nodes",
      recognitionTips: ["Problem asks for the lowest common ancestor of two nodes", "Need to find the meeting point of two node paths", "Distance between two nodes in a tree", "In BST, can leverage sorted property for efficient LCA"],
      proTips: ["For binary trees: if both nodes are in different subtrees, current node is LCA", "For BSTs: if both values < current, go left; both > current, go right; otherwise current is LCA", "For trees with parent pointers, treat it like intersection of two linked lists"],
      approach: "For binary trees: recursively check left and right subtrees. If a node matches p or q, return it. If left and right both return non-null, the current node is the LCA.",
      templateCode: `// LCA of Binary Tree
public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
    if (root == null || root == p || root == q) return root;
    TreeNode left = lowestCommonAncestor(root.left, p, q);
    TreeNode right = lowestCommonAncestor(root.right, p, q);
    // Why: if both subtrees found a target, root is the LCA
    if (left != null && right != null) return root;
    return left != null x left : right;
}
// LCA of BST — O(h) using BST property
public TreeNode lcaBST(TreeNode root, TreeNode p, TreeNode q) {
    TreeNode current = root;
    while (current != null) {
        if (p.val < current.val && q.val < current.val) current = current.left;
        else if (p.val > current.val && q.val > current.val) current = current.right;
        else return current; // Why: split point found
    }
    return null;
}`,
      cppTemplate: `// LCA of Binary Tree
TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {
    if (root == nullptr || root == p || root == q) return root;
    TreeNode* left = lowestCommonAncestor(root->left, p, q);
    TreeNode* right = lowestCommonAncestor(root->right, p, q);
    // Why: if both subtrees found a target, root is the LCA
    if (left != nullptr && right != nullptr) return root;
    return left != nullptr x left : right;
}
// LCA of BST — O(h) using BST property
TreeNode* lcaBST(TreeNode* root, TreeNode* p, TreeNode* q) {
    TreeNode* current = root;
    while (current != nullptr) {
        if (p->val < current->val && q->val < current->val) current = current->left;
        else if (p->val > current->val && q->val > current->val) current = current->right;
        else return current; // Why: split point found
    }
    return nullptr;
}`,
      timeComplexity: "O(n) binary tree, O(h) BST",
      spaceComplexity: "O(h)",
      problems: [
        { id: "tb-lca-bt", title: "Lowest Common Ancestor of a Binary Tree", platform: "leetcode", url: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/", difficulty: "medium", isStandard: true, companies: ["Facebook", "Amazon", "Microsoft", "Google"] },
        { id: "tb-lca-bst", title: "Lowest Common Ancestor of a Binary Search Tree", platform: "leetcode", url: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/", difficulty: "medium", isStandard: true, companies: ["Facebook", "Amazon", "Microsoft"] },
        { id: "tb-lca-iii", title: "Lowest Common Ancestor of a Binary Tree III", platform: "leetcode", url: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree-iii/", difficulty: "medium", isStandard: true, companies: ["Facebook", "Microsoft"] },
        { id: "tb-all-nodes-dist-k", title: "All Nodes Distance K in Binary Tree", platform: "leetcode", url: "https://leetcode.com/problems/all-nodes-distance-k-in-binary-tree/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Facebook", "Google"] },
        { id: "tb-lca-deepest", title: "Lowest Common Ancestor of Deepest Leaves", platform: "leetcode", url: "https://leetcode.com/problems/lowest-common-ancestor-of-deepest-leaves/", difficulty: "medium", isStandard: false, companies: ["Facebook"] },
        { id: "tb-kth-ancestor", title: "Kth Ancestor of a Tree Node", platform: "leetcode", url: "https://leetcode.com/problems/kth-ancestor-of-a-tree-node/", difficulty: "hard", isStandard: false, companies: ["Google"] },
        { id: "tb-max-diff-ancestor", title: "Maximum Difference Between Node and Ancestor", platform: "leetcode", url: "https://leetcode.com/problems/maximum-difference-between-node-and-ancestor/", difficulty: "medium", isStandard: false, companies: ["Amazon"] },
        { id: "tb-dist-bt-gfg", title: "Distance Between Two Nodes", platform: "gfg", url: "https://www.geeksforgeeks.org/find-distance-between-two-nodes-of-a-binary-tree/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Microsoft"] }
      ]
    },
    {
      id: "bst-operations",
      title: "BST Operations",
      tagline: "Insert, delete, search, validate, and convert using BST's sorted property",
      recognitionTips: ["Problem involves operations on a Binary Search Tree", "Need to validate if a tree is BST", "Insert/delete/search in a BST", "Convert sorted data to/from BST, or find kth smallest"],
      proTips: ["Inorder traversal of BST gives sorted order — use this for kth smallest", "For validation, pass min/max bounds down the recursion", "BST deletion: no child, one child, two children (replace with inorder successor)"],
      approach: "Leverage BST property (left < root < right) for efficient O(h) operations. For validation, maintain valid ranges. For kth smallest, perform inorder traversal and count.",
      templateCode: `// Validate BST
public boolean isValidBST(TreeNode root) {
    return validate(root, Long.MIN_VALUE, Long.MAX_VALUE);
}
private boolean validate(TreeNode node, long min, long max) {
    if (node == null) return true;
    if (node.val <= min || node.val >= max) return false;
    return validate(node.left, min, node.val) && validate(node.right, node.val, max);
}
// Kth Smallest in BST
public int kthSmallest(TreeNode root, int k) {
    Deque<TreeNode> stack = new ArrayDeque<>();
    TreeNode current = root;
    int count = 0;
    while (current != null || !stack.isEmpty()) {
        while (current != null) { stack.push(current); current = current.left; }
        current = stack.pop();
        if (++count == k) return current.val;
        current = current.right;
    }
    return -1;
}`,
      cppTemplate: `// Validate BST
bool isValidBST(TreeNode* root) {
    return validate(root, LLONG_MIN, LLONG_MAX);
}
bool validate(TreeNode* node, long long min, long long max) {
    if (node == nullptr) return true;
    if (node->val <= min || node->val >= max) return false;
    return validate(node->left, min, node->val) && validate(node->right, node->val, max);
}
// Kth Smallest in BST
int kthSmallest(TreeNode* root, int k) {
    vector<TreeNode*> stack;
    TreeNode* current = root;
    int count = 0;
    while (current != nullptr || !stack.empty()) {
        while (current != nullptr) { stack.push_back(current); current = current->left; }
        current = stack.back();
        stack.pop_back();
        if (++count == k) return current->val;
        current = current->right;
    }
    return -1;
}`,
      timeComplexity: "O(h) for operations, O(n) for traversal",
      spaceComplexity: "O(h)",
      problems: [
        { id: "tb-validate-bst", title: "Validate Binary Search Tree", platform: "leetcode", url: "https://leetcode.com/problems/validate-binary-search-tree/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Facebook", "Microsoft", "Google"] },
        { id: "tb-kth-smallest", title: "Kth Smallest Element in a BST", platform: "leetcode", url: "https://leetcode.com/problems/kth-smallest-element-in-a-bst/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Facebook", "Google"] },
        { id: "tb-insert-bst", title: "Insert into a Binary Search Tree", platform: "leetcode", url: "https://leetcode.com/problems/insert-into-a-binary-search-tree/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Microsoft"] },
        { id: "tb-delete-bst", title: "Delete Node in a BST", platform: "leetcode", url: "https://leetcode.com/problems/delete-node-in-a-bst/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Microsoft"] },
        { id: "tb-sorted-arr-bst", title: "Convert Sorted Array to Binary Search Tree", platform: "leetcode", url: "https://leetcode.com/problems/convert-sorted-array-to-binary-search-tree/", difficulty: "easy", isStandard: true, companies: ["Amazon", "Microsoft"] },
        { id: "tb-bst-iterator", title: "Binary Search Tree Iterator", platform: "leetcode", url: "https://leetcode.com/problems/binary-search-tree-iterator/", difficulty: "medium", isStandard: true, companies: ["Facebook", "Amazon", "Google", "Microsoft"] },
        { id: "tb-recover-bst", title: "Recover Binary Search Tree", platform: "leetcode", url: "https://leetcode.com/problems/recover-binary-search-tree/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Microsoft"] },
        { id: "tb-balanced-bst", title: "Balance a Binary Search Tree", platform: "leetcode", url: "https://leetcode.com/problems/balance-a-binary-search-tree/", difficulty: "medium", isStandard: false, companies: ["Amazon"] }
      ]
    },
    {
      id: "serialize-deserialize",
      title: "Serialize & Deserialize",
      tagline: "Convert trees to strings and back — essential for storage and transmission",
      recognitionTips: ["Problem asks to encode a tree structure as a string", "Need to reconstruct a tree from a string representation", "Serialize for network or file storage", "Build tree from preorder + inorder or similar dual traversals"],
      proTips: ["Preorder with null markers is the simplest approach", "Use a delimiter (comma) between values and a marker (#) for null nodes", "For preorder + inorder: preorder[0] is root; find in inorder to split subtrees"],
      approach: "Serialize: Preorder DFS, writing value + delimiter. Mark nulls. Deserialize: Read tokens in order, build root, then recursively build left and right subtrees.",
      templateCode: `// Serialize and Deserialize Binary Tree
public String serialize(TreeNode root) {
    StringBuilder sb = new StringBuilder();
    serializeHelper(root, sb);
    return sb.toString();
}
private void serializeHelper(TreeNode node, StringBuilder sb) {
    if (node == null) { sb.append("#,"); return; }
    sb.append(node.val).append(",");
    serializeHelper(node.left, sb);
    serializeHelper(node.right, sb);
}
public TreeNode deserialize(String data) {
    Queue<String> tokens = new LinkedList<>(Arrays.asList(data.split(",")));
    return deserializeHelper(tokens);
}
private TreeNode deserializeHelper(Queue<String> tokens) {
    String token = tokens.poll();
    if (token.equals("#")) return null;
    TreeNode node = new TreeNode(Integer.parseInt(token));
    node.left = deserializeHelper(tokens);
    node.right = deserializeHelper(tokens);
    return node;
}`,
      cppTemplate: `// Serialize and Deserialize Binary Tree
string serialize(TreeNode* root) {
    string out;
    serializeHelper(root, out);
    return out;
}
void serializeHelper(TreeNode* node, string& out) {
    if (node == nullptr) { out += "#,"; return; }
    out += to_string(node->val) + ",";
    serializeHelper(node->left, out);
    serializeHelper(node->right, out);
}
TreeNode* deserialize(string data) {
    queue<string> tokens;
    string token;
    stringstream ss(data);
    while (getline(ss, token, ',')) tokens.push(token);
    return deserializeHelper(tokens);
}
TreeNode* deserializeHelper(queue<string>& tokens) {
    string token = tokens.front();
    tokens.pop();
    if (token == "#") return nullptr;
    TreeNode* node = new TreeNode(stoi(token));
    node->left = deserializeHelper(tokens);
    node->right = deserializeHelper(tokens);
    return node;
}`,
      timeComplexity: "O(n)",
      spaceComplexity: "O(n)",
      problems: [
        { id: "tb-serialize", title: "Serialize and Deserialize Binary Tree", platform: "leetcode", url: "https://leetcode.com/problems/serialize-and-deserialize-binary-tree/", difficulty: "hard", isStandard: true, companies: ["Facebook", "Amazon", "Google", "Microsoft"] },
        { id: "tb-serialize-bst", title: "Serialize and Deserialize BST", platform: "leetcode", url: "https://leetcode.com/problems/serialize-and-deserialize-bst/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Facebook"] },
        { id: "tb-construct-pre-in", title: "Construct Binary Tree from Preorder and Inorder Traversal", platform: "leetcode", url: "https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Microsoft", "Google"] },
        { id: "tb-construct-in-post", title: "Construct Binary Tree from Inorder and Postorder Traversal", platform: "leetcode", url: "https://leetcode.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Microsoft"] },
        { id: "tb-max-width", title: "Maximum Width of Binary Tree", platform: "leetcode", url: "https://leetcode.com/problems/maximum-width-of-binary-tree/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Google"] },
        { id: "tb-flatten-bt", title: "Flatten Binary Tree to Linked List", platform: "leetcode", url: "https://leetcode.com/problems/flatten-binary-tree-to-linked-list/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Facebook", "Microsoft"] },
        { id: "tb-balanced-check", title: "Balanced Binary Tree", platform: "leetcode", url: "https://leetcode.com/problems/balanced-binary-tree/", difficulty: "easy", isStandard: true, companies: ["Amazon", "Microsoft", "Google"] },
        { id: "tb-subtree-check", title: "Subtree of Another Tree", platform: "leetcode", url: "https://leetcode.com/problems/subtree-of-another-tree/", difficulty: "easy", isStandard: true, companies: ["Amazon", "Facebook"] }
      ]
    },
    {
      id: "morris-traversal",
      title: "Morris Traversal",
      tagline: "O(1) space tree traversal using threaded binary trees",
      recognitionTips: ["Need O(1) space inorder/preorder traversal", "Cannot use recursion stack or explicit stack", "Strict space constraint on tree traversal"],
      proTips: ["Morris modifies the tree temporarily — always restore the pointers", "Uses inorder predecessor's right pointer as a thread back to current node", "Two visits to each node: first to create thread, second to remove it"],
      approach: "For each node, find inorder predecessor. If predecessor's right is null, create thread back to current and move left. If thread exists, remove it, visit node, and move right. O(n) time, O(1) space.",
      templateCode: `// Morris Inorder Traversal — O(1) Space
public List<Integer> morrisInorder(TreeNode root) {
    List<Integer> result = new ArrayList<>();
    TreeNode current = root;
    while (current != null) {
        if (current.left == null) {
            result.add(current.val);
            current = current.right;
        } else {
            TreeNode predecessor = current.left;
            while (predecessor.right != null && predecessor.right != current)
                predecessor = predecessor.right;
            if (predecessor.right == null) {
                predecessor.right = current; // Why: create thread
                current = current.left;
            } else {
                predecessor.right = null; // Why: remove thread
                result.add(current.val);
                current = current.right;
            }
        }
    }
    return result;
}`,
      cppTemplate: `// Morris Inorder Traversal — O(1) Space
vector<int> morrisInorder(TreeNode* root) {
    vector<int> result;
    TreeNode* current = root;
    while (current != nullptr) {
        if (current->left == nullptr) {
            result.push_back(current->val);
            current = current->right;
        } else {
            TreeNode* predecessor = current->left;
            while (predecessor->right != nullptr && predecessor->right != current)
                predecessor = predecessor->right;
            if (predecessor->right == nullptr) {
                predecessor->right = current; // Why: create thread
                current = current->left;
            } else {
                predecessor->right = nullptr; // Why: remove thread
                result.push_back(current->val);
                current = current->right;
            }
        }
    }
    return result;
}`,
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
      problems: [
        { id: "tb-morris-inorder", title: "Binary Tree Inorder Traversal (Morris)", platform: "leetcode", url: "https://leetcode.com/problems/binary-tree-inorder-traversal/", difficulty: "easy", isStandard: true, companies: ["Amazon", "Microsoft"] },
        { id: "tb-recover-bst-morris", title: "Recover Binary Search Tree (Morris)", platform: "leetcode", url: "https://leetcode.com/problems/recover-binary-search-tree/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Microsoft"] },
        { id: "tb-bst-to-gst", title: "Binary Search Tree to Greater Sum Tree", platform: "leetcode", url: "https://leetcode.com/problems/binary-search-tree-to-greater-sum-tree/", difficulty: "medium", isStandard: false, companies: ["Amazon"] },
        { id: "tb-count-nodes", title: "Count Complete Tree Nodes", platform: "leetcode", url: "https://leetcode.com/problems/count-complete-tree-nodes/", difficulty: "medium", isStandard: true, companies: ["Microsoft", "Google"] },
        { id: "tb-convert-bst", title: "Convert BST to Greater Tree", platform: "leetcode", url: "https://leetcode.com/problems/convert-bst-to-greater-tree/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Facebook"] },
        { id: "tb-min-abs-diff-bst", title: "Minimum Absolute Difference in BST", platform: "leetcode", url: "https://leetcode.com/problems/minimum-absolute-difference-in-bst/", difficulty: "easy", isStandard: false, companies: ["Amazon"] },
        { id: "tb-two-sum-bst", title: "Two Sum IV - Input is a BST", platform: "leetcode", url: "https://leetcode.com/problems/two-sum-iv-input-is-a-bst/", difficulty: "easy", isStandard: false, companies: ["Amazon", "Facebook"] },
        { id: "tb-trim-bst", title: "Trim a Binary Search Tree", platform: "leetcode", url: "https://leetcode.com/problems/trim-a-binary-search-tree/", difficulty: "medium", isStandard: false, companies: ["Amazon"] }
      ]
    }
  ]
};

treesBst.totalProblems = treesBst.patterns.reduce((sum, p) => sum + p.problems.length, 0);
