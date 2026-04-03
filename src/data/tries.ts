import { Topic } from "@/types";

export const tries: Topic = {
  slug: "tries",
  title: "Tries",
  description: "Prefix trees for efficient string operations — search, autocomplete, and XOR tricks",
  icon: "Network",
  totalProblems: 0,
  patterns: [
    {
      id: "trie-insert-search",
      title: "Insert / Search / StartsWith",
      tagline: "Core trie operations for prefix-based string lookups",
      recognitionTips: ["Need efficient prefix matching across many strings", "Problem involves autocomplete or dictionary lookup", "Phrases like 'implement trie', 'prefix search', 'magic dictionary'", "Multiple string queries on a fixed dictionary"],
      proTips: ["Each node has up to 26 children (for lowercase English) and an isEnd flag", "Use HashMap children for large alphabets or Unicode", "Trie search is O(L) where L is word length, regardless of dictionary size"],
      approach: "Build a tree where each node represents a character. To insert, traverse/create nodes character by character. To search, traverse nodes — return true only if the last node has isEnd=true. StartsWith is the same but doesn't check isEnd.",
      templateCode: `// Trie — Insert, Search, StartsWith
class Trie {
    private Trie[] children = new Trie[26];
    private boolean isEnd = false;
    
    public void insert(String word) {
        Trie node = this;
        for (char ch : word.toCharArray()) {
            int idx = ch - 'a';
            if (node.children[idx] == null)
                node.children[idx] = new Trie(); // Why: create new node
            node = node.children[idx];
        }
        node.isEnd = true; // Why: mark end of word
    }
    
    public boolean search(String word) {
        Trie node = searchPrefix(word);
        return node != null && node.isEnd; // Why: must be a complete word
    }
    
    public boolean startsWith(String prefix) {
        return searchPrefix(prefix) != null; // Why: just need prefix existence
    }
    
    private Trie searchPrefix(String prefix) {
        Trie node = this;
        for (char ch : prefix.toCharArray()) {
            int idx = ch - 'a';
            if (node.children[idx] == null) return null;
            node = node.children[idx];
        }
        return node;
    }
}`,
      cppTemplate: `// Trie — Insert, Search, StartsWith
class Trie {
public:
    Trie* children[26] = {};
    bool isEnd = false;
    
    void insert(string word) {
        Trie* node = this;
        for (char ch : word) {
            int idx = ch - 'a';
            if (node->children[idx] == nullptr)
                node->children[idx] = new Trie(); // Why: create new node
            node = node->children[idx];
        }
        node->isEnd = true; // Why: mark end of word
    }
    
    bool search(string word) {
        Trie* node = searchPrefix(word);
        return node != nullptr && node->isEnd; // Why: must be a complete word
    }
    
    bool startsWith(string prefix) {
        return searchPrefix(prefix) != nullptr; // Why: just need prefix existence
    }
    
    Trie* searchPrefix(string prefix) {
        Trie* node = this;
        for (char ch : prefix) {
            int idx = ch - 'a';
            if (node->children[idx] == nullptr) return nullptr;
            node = node->children[idx];
        }
        return node;
    }
}`,
      timeComplexity: "O(L) per operation where L = word length",
      spaceComplexity: "O(N * L) for N words",
      problems: [
        { id: "tr-implement-trie", title: "Implement Trie (Prefix Tree)", platform: "leetcode", url: "https://leetcode.com/problems/implement-trie-prefix-tree/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Google", "Microsoft", "Facebook"] },
        { id: "tr-add-search-word", title: "Design Add and Search Words Data Structure", platform: "leetcode", url: "https://leetcode.com/problems/design-add-and-search-words-data-structure/", difficulty: "medium", isStandard: true, companies: ["Facebook", "Amazon", "Google"] },
        { id: "tr-map-sum", title: "Map Sum Pairs", platform: "leetcode", url: "https://leetcode.com/problems/map-sum-pairs/", difficulty: "medium", isStandard: false, companies: ["Amazon"] },
        { id: "tr-replace-words", title: "Replace Words", platform: "leetcode", url: "https://leetcode.com/problems/replace-words/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Uber"] },
        { id: "tr-longest-word-dict", title: "Longest Word in Dictionary", platform: "leetcode", url: "https://leetcode.com/problems/longest-word-in-dictionary/", difficulty: "medium", isStandard: false, companies: ["Amazon", "Google"] },
        { id: "tr-magic-dict", title: "Implement Magic Dictionary", platform: "leetcode", url: "https://leetcode.com/problems/implement-magic-dictionary/", difficulty: "medium", isStandard: false, companies: ["Google"] },
        { id: "tr-longest-common-prefix", title: "Longest Common Prefix", platform: "leetcode", url: "https://leetcode.com/problems/longest-common-prefix/", difficulty: "easy", isStandard: true, companies: ["Amazon", "Google", "Facebook"] },
        { id: "tr-count-prefix-suffix", title: "Count Prefix and Suffix Pairs", platform: "leetcode", url: "https://leetcode.com/problems/count-prefix-and-suffix-pairs-ii/", difficulty: "hard", isStandard: false, companies: ["Google"] }
      ]
    },
    {
      id: "word-search-trie",
      title: "Word Search in Grid",
      tagline: "Combine trie with DFS/backtracking for grid-based word search",
      recognitionTips: ["Search for multiple words in a 2D character grid", "Phrases like 'word search II', 'boggle game'", "Need to find all valid words from a dictionary in a grid", "Single word search can use DFS; multiple words benefit from trie"],
      proTips: ["Build a trie from the word list, then DFS from each cell", "Prune trie nodes after finding a word to avoid duplicate results", "Mark visited cells during DFS, unmark on backtrack"],
      approach: "Build a trie from all words to search. DFS from each cell in the grid, following trie edges. When a word end is reached, add to results. Prune trie branches that are fully matched to optimize.",
      templateCode: `// Word Search II — Trie + DFS Backtracking
class Solution {
    public List<String> findWords(char[][] board, String[] words) {
        TrieNode root = buildTrie(words);
        List<String> result = new ArrayList<>();
        for (int i = 0; i < board.length; i++)
            for (int j = 0; j < board[0].length; j++)
                dfs(board, i, j, root, result);
        return result;
    }
    void dfs(char[][] board, int r, int c, TrieNode node, List<String> result) {
        if (r < 0 || r >= board.length || c < 0 || c >= board[0].length) return;
        char ch = board[r][c];
        if (ch == '#' || node.children[ch - 'a'] == null) return;
        node = node.children[ch - 'a'];
        if (node.word != null) {
            result.add(node.word);
            node.word = null; // Why: avoid duplicate results
        }
        board[r][c] = '#'; // Why: mark visited
        dfs(board, r+1, c, node, result);
        dfs(board, r-1, c, node, result);
        dfs(board, r, c+1, node, result);
        dfs(board, r, c-1, node, result);
        board[r][c] = ch; // Why: backtrack
    }
}`,
      cppTemplate: `// Word Search II — Trie + DFS Backtracking
class Solution {
public:
    vector<string> findWords(vector<vector<char>>& board, vector<string>& words) {
        TrieNode* root = buildTrie(words);
        vector<string> result;
        for (int i = 0; i < board.size(); i++)
            for (int j = 0; j < board[0].size(); j++)
                dfs(board, i, j, root, result);
        return result;
    }
    void dfs(vector<vector<char>>& board, int r, int c, TrieNode* node, vector<string>& result) {
        if (r < 0 || r >= board.size() || c < 0 || c >= board[0].size()) return;
        char ch = board[r][c];
        if (ch == '#' || node->children[ch - 'a'] == nullptr) return;
        node = node->children[ch - 'a'];
        if (!node->word.empty()) {
            result.push_back(node->word);
            node->word.clear(); // Why: avoid duplicate results
        }
        board[r][c] = '#'; // Why: mark visited
        dfs(board, r+1, c, node, result);
        dfs(board, r-1, c, node, result);
        dfs(board, r, c+1, node, result);
        dfs(board, r, c-1, node, result);
        board[r][c] = ch; // Why: backtrack
    }
}`,
      timeComplexity: "O(M * N * 4^L) worst case",
      spaceComplexity: "O(N * L) for trie",
      problems: [
        { id: "tr-word-search", title: "Word Search", platform: "leetcode", url: "https://leetcode.com/problems/word-search/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Microsoft", "Facebook"] },
        { id: "tr-word-search-ii", title: "Word Search II", platform: "leetcode", url: "https://leetcode.com/problems/word-search-ii/", difficulty: "hard", isStandard: true, companies: ["Amazon", "Google", "Microsoft", "Facebook"] },
        { id: "tr-word-break", title: "Word Break", platform: "leetcode", url: "https://leetcode.com/problems/word-break/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Facebook", "Google", "Microsoft"] },
        { id: "tr-word-break-ii", title: "Word Break II", platform: "leetcode", url: "https://leetcode.com/problems/word-break-ii/", difficulty: "hard", isStandard: true, companies: ["Amazon", "Facebook", "Google"] },
        { id: "tr-concat-words", title: "Concatenated Words", platform: "leetcode", url: "https://leetcode.com/problems/concatenated-words/", difficulty: "hard", isStandard: true, companies: ["Amazon", "Google"] },
        { id: "tr-boggle-gfg", title: "Boggle (Word Search in Grid)", platform: "gfg", url: "https://www.geeksforgeeks.org/boggle-find-possible-words-board-characters/", difficulty: "hard", isStandard: true, companies: ["Amazon", "Microsoft", "Google"] },
        { id: "tr-stream-checker", title: "Stream of Characters", platform: "leetcode", url: "https://leetcode.com/problems/stream-of-characters/", difficulty: "hard", isStandard: false, companies: ["Google"] },
        { id: "tr-palindrome-pairs", title: "Palindrome Pairs", platform: "leetcode", url: "https://leetcode.com/problems/palindrome-pairs/", difficulty: "hard", isStandard: true, companies: ["Google", "Amazon"] }
      ]
    },
    {
      id: "autocomplete-trie",
      title: "Auto-complete",
      tagline: "Real-time suggestion systems using tries",
      recognitionTips: ["Need to suggest words based on typed prefix", "Ranking suggestions by frequency or recency", "Phrases like 'autocomplete', 'search suggestions', 'typeahead'", "Design a search autocomplete system"],
      proTips: ["Store frequency/rank at trie nodes for efficient sorting of suggestions", "Limit results to top-K suggestions using a min-heap at leaf collection", "Cache results for already-typed prefixes to avoid re-traversal"],
      approach: "Build a trie from the dictionary. On each character typed, traverse to the matching trie node, then collect all words in that subtree. Sort/rank by frequency and return top-K suggestions.",
      templateCode: `// Autocomplete — Search Suggestions System
public List<List<String>> suggestedProducts(String[] products, String searchWord) {
    Arrays.sort(products); // Why: lexicographic order
    TrieNode root = new TrieNode();
    // Why: build trie and store sorted words at each prefix node
    for (String product : products) {
        TrieNode node = root;
        for (char ch : product.toCharArray()) {
            int idx = ch - 'a';
            if (node.children[idx] == null)
                node.children[idx] = new TrieNode();
            node = node.children[idx];
            if (node.suggestions.size() < 3) // Why: keep only top 3
                node.suggestions.add(product);
        }
    }
    List<List<String>> result = new ArrayList<>();
    TrieNode node = root;
    boolean noMatch = false;
    for (char ch : searchWord.toCharArray()) {
        if (noMatch || node.children[ch - 'a'] == null) {
            noMatch = true;
            result.add(new ArrayList<>());
        } else {
            node = node.children[ch - 'a'];
            result.add(node.suggestions);
        }
    }
    return result;
}`,
      cppTemplate: `// Autocomplete — Search Suggestions System
vector<vector<string>> suggestedProducts(vector<string>& products, string searchWord) {
    sort(products.begin(), products.end()); // Why: lexicographic order
    TrieNode* root = new TrieNode();
    // Why: build trie and store sorted words at each prefix node
    for (string product : products) {
        TrieNode* node = root;
        for (char ch : product) {
            int idx = ch - 'a';
            if (node->children[idx] == nullptr)
                node->children[idx] = new TrieNode();
            node = node->children[idx];
            if (node.suggestions.size() < 3) // Why: keep only top 3
                node.suggestions.push_back(product);
        }
    }
    vector<vector<string>> result;
    TrieNode* node = root;
    bool noMatch = false;
    for (char ch : searchWord) {
        if (noMatch || node->children[ch - 'a'] == nullptr) {
            noMatch = true;
            result.push_back({});
        } else {
            node = node->children[ch - 'a'];
            result.push_back(node.suggestions);
        }
    }
    return result;
}`,
      timeComplexity: "O(N * L + M) for build + query",
      spaceComplexity: "O(N * L)",
      problems: [
        { id: "tr-search-suggestions", title: "Search Suggestions System", platform: "leetcode", url: "https://leetcode.com/problems/search-suggestions-system/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Google", "Facebook"] },
        { id: "tr-auto-complete-sys", title: "Design Search Autocomplete System", platform: "leetcode", url: "https://leetcode.com/problems/design-search-autocomplete-system/", difficulty: "hard", isStandard: true, companies: ["Amazon", "Google", "Facebook", "Microsoft"] },
        { id: "tr-top-k-frequent-words", title: "Top K Frequent Words", platform: "leetcode", url: "https://leetcode.com/problems/top-k-frequent-words/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Google"] },
        { id: "tr-camel-case-match", title: "Camelcase Matching", platform: "leetcode", url: "https://leetcode.com/problems/camelcase-matching/", difficulty: "medium", isStandard: false, companies: ["Google"] },
        { id: "tr-prefix-suffix-search", title: "Prefix and Suffix Search", platform: "leetcode", url: "https://leetcode.com/problems/prefix-and-suffix-search/", difficulty: "hard", isStandard: false, companies: ["Facebook"] },
        { id: "tr-short-encoding", title: "Short Encoding of Words", platform: "leetcode", url: "https://leetcode.com/problems/short-encoding-of-words/", difficulty: "medium", isStandard: false, companies: ["Google"] },
        { id: "tr-index-pairs", title: "Index Pairs of a String", platform: "leetcode", url: "https://leetcode.com/problems/index-pairs-of-a-string/", difficulty: "easy", isStandard: false, companies: ["Amazon"] },
        { id: "tr-search-word-gfg", title: "Auto-complete feature using Trie", platform: "gfg", url: "https://www.geeksforgeeks.org/auto-complete-feature-using-trie/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Google"] }
      ]
    },
    {
      id: "xor-trie",
      title: "XOR Maximization with Trie",
      tagline: "Use a binary trie to find maximum XOR pairs efficiently",
      recognitionTips: ["Problem asks for maximum XOR of two numbers in an array", "Need to find the pair with maximum XOR value", "Bit-level decision tree for XOR optimization", "Phrases like 'maximum XOR', 'XOR queries'"],
      proTips: ["Build a binary trie from the MSB to LSB of each number", "To maximize XOR, greedily choose the opposite bit at each level", "Use 32-bit trie for integers"],
      approach: "Insert each number into a binary trie (bit by bit from MSB). To find max XOR for a number, traverse the trie greedily choosing the opposite bit at each level (1 if current bit is 0, vice versa). This maximizes XOR bit by bit from the most significant.",
      templateCode: `// Maximum XOR — Binary Trie
class XORTrie {
    int[][] children;
    int idx = 0;
    XORTrie(int n) { children = new int[n * 32][2]; Arrays.fill(children[0], -1); }
    
    void insert(int num) {
        int node = 0;
        for (int i = 31; i >= 0; i--) {
            int bit = (num >> i) & 1;
            if (children[node][bit] == -1) {
                children[node][bit] = ++idx;
                Arrays.fill(children[idx], -1);
            }
            node = children[node][bit];
        }
    }
    
    int maxXor(int num) {
        int node = 0, xor = 0;
        for (int i = 31; i >= 0; i--) {
            int bit = (num >> i) & 1;
            int toggle = 1 - bit; // Why: want opposite bit for max XOR
            if (children[node][toggle] != -1) {
                xor |= (1 << i); // Why: this bit contributes to XOR
                node = children[node][toggle];
            } else {
                node = children[node][bit];
            }
        }
        return xor;
    }
}`,
      cppTemplate: `// Maximum XOR — Binary Trie
class XORTrie {
public:
    vector<vector<int>> children;
    int idx = 0;
    XORTrie(int n) : children(n * 32, vector<int>(2, -1)) {}
    
    void insert(int num) {
        int node = 0;
        for (int i = 31; i >= 0; i--) {
            int bit = (num >> i) & 1;
            if (children[node][bit] == -1) {
                children[node][bit] = ++idx;
                fill(children[idx].begin(), children[idx].end(), -1);
            }
            node = children[node][bit];
        }
    }
    
    int maxXor(int num) {
        int node = 0, xor = 0;
        for (int i = 31; i >= 0; i--) {
            int bit = (num >> i) & 1;
            int toggle = 1 - bit; // Why: want opposite bit for max XOR
            if (children[node][toggle] != -1) {
                xor |= (1 << i); // Why: this bit contributes to XOR
                node = children[node][toggle];
            } else {
                node = children[node][bit];
            }
        }
        return xor;
    }
}`,
      timeComplexity: "O(n * 32) = O(n)",
      spaceComplexity: "O(n * 32)",
      problems: [
        { id: "tr-max-xor", title: "Maximum XOR of Two Numbers in an Array", platform: "leetcode", url: "https://leetcode.com/problems/maximum-xor-of-two-numbers-in-an-array/", difficulty: "medium", isStandard: true, companies: ["Google", "Amazon"] },
        { id: "tr-max-xor-query", title: "Maximum XOR With an Element From Array", platform: "leetcode", url: "https://leetcode.com/problems/maximum-xor-with-an-element-from-array/", difficulty: "hard", isStandard: true, companies: ["Google"] },
        { id: "tr-count-pairs-xor", title: "Count Pairs With XOR in a Range", platform: "leetcode", url: "https://leetcode.com/problems/count-pairs-with-xor-in-a-range/", difficulty: "hard", isStandard: false, companies: ["Google"] },
        { id: "tr-max-xor-subarray-gfg", title: "Maximum XOR Subarray", platform: "gfg", url: "https://www.geeksforgeeks.org/find-the-maximum-subarray-xor-in-a-given-array/", difficulty: "hard", isStandard: true, companies: ["Amazon", "Google"] },
        { id: "tr-xor-queries", title: "XOR Queries of a Subarray", platform: "leetcode", url: "https://leetcode.com/problems/xor-queries-of-a-subarray/", difficulty: "medium", isStandard: false, companies: ["Amazon"] },
        { id: "tr-min-xor-sum", title: "Minimum XOR Sum of Two Arrays", platform: "leetcode", url: "https://leetcode.com/problems/minimum-xor-sum-of-two-arrays/", difficulty: "hard", isStandard: false, companies: ["Google"] },
        { id: "tr-max-genetic-diff", title: "Maximum Genetic Difference Query", platform: "leetcode", url: "https://leetcode.com/problems/maximum-genetic-difference-query/", difficulty: "hard", isStandard: false, companies: ["Google"] },
        { id: "tr-count-distinct-xor", title: "Count of Distinct XOR Values", platform: "gfg", url: "https://www.geeksforgeeks.org/count-of-distinct-xor-values-of-subsets-of-given-set/", difficulty: "medium", isStandard: false, companies: ["Amazon"] }
      ]
    }
  ]
};

tries.totalProblems = tries.patterns.reduce((sum, p) => sum + p.problems.length, 0);
