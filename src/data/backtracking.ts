import { Topic } from "@/types";

export const backtracking: Topic = {
  slug: "backtracking",
  title: "Backtracking",
  description: "Systematic exploration of all possibilities — subsets, permutations, and constraint satisfaction",
  icon: "RotateCcw",
  totalProblems: 0,
  patterns: [
    {
      id: "subsets-backtrack",
      title: "Subsets",
      tagline: "Generate all subsets (power set) of a given set",
      recognitionTips: ["Problem asks for all subsets or combinations of elements", "Need to generate the power set", "Phrases like 'all possible subsets', 'subset sum'", "Input has no duplicates (subsets I) or has duplicates (subsets II)"],
      proTips: ["For each element, two choices: include or exclude", "For duplicates, sort first and skip consecutive equal elements at the same level", "Total subsets = 2^n — be aware of exponential output"],
      approach: "At each recursive step, choose to include or exclude the current element. Build subsets incrementally by adding the current subset to results at every recursive call (not just at leaves).",
      templateCode: `// Subsets (no duplicates)
public List<List<Integer>> subsets(int[] nums) {
    List<List<Integer>> result = new ArrayList<>();
    backtrack(nums, 0, new ArrayList<>(), result);
    return result;
}
void backtrack(int[] nums, int start, List<Integer> current, List<List<Integer>> result) {
    result.add(new ArrayList<>(current)); // Why: every partial subset is valid
    for (int i = start; i < nums.length; i++) {
        current.add(nums[i]);
        backtrack(nums, i + 1, current, result); // Why: i+1 avoids reusing same element
        current.remove(current.size() - 1); // Why: backtrack — undo the choice
    }
}`,
      timeComplexity: "O(n * 2^n)",
      spaceComplexity: "O(n) recursion depth",
      problems: [
        { id: "bt-subsets", title: "Subsets", platform: "leetcode", url: "https://leetcode.com/problems/subsets/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Facebook", "Google", "Microsoft"] },
        { id: "bt-subsets-ii", title: "Subsets II", platform: "leetcode", url: "https://leetcode.com/problems/subsets-ii/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Facebook"] },
        { id: "bt-subset-sum-gfg", title: "Subset Sum Problem", platform: "gfg", url: "https://www.geeksforgeeks.org/subset-sum-problem-dp-25/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Microsoft"] },
        { id: "bt-combination-sum", title: "Combination Sum", platform: "leetcode", url: "https://leetcode.com/problems/combination-sum/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Facebook", "Google"] },
        { id: "bt-combination-sum-ii", title: "Combination Sum II", platform: "leetcode", url: "https://leetcode.com/problems/combination-sum-ii/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Facebook"] },
        { id: "bt-combination-sum-iii", title: "Combination Sum III", platform: "leetcode", url: "https://leetcode.com/problems/combination-sum-iii/", difficulty: "medium", isStandard: false, companies: ["Amazon"] },
        { id: "bt-letter-combinations", title: "Letter Combinations of a Phone Number", platform: "leetcode", url: "https://leetcode.com/problems/letter-combinations-of-a-phone-number/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Facebook", "Google", "Microsoft"] },
        { id: "bt-target-sum", title: "Target Sum", platform: "leetcode", url: "https://leetcode.com/problems/target-sum/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Facebook", "Google"] }
      ]
    },
    {
      id: "permutations-backtrack",
      title: "Permutations",
      tagline: "Generate all orderings of a given set of elements",
      recognitionTips: ["Problem asks for all possible orderings/arrangements", "Phrases like 'all permutations', 'rearrange'", "Need every possible way to order n elements", "Input may have duplicates (permutations II)"],
      proTips: ["Use a visited/used boolean array to track which elements are in the current permutation", "For duplicates: sort first and skip if nums[i] == nums[i-1] && !used[i-1]", "Total permutations = n! — grows very fast"],
      approach: "Build permutations element by element. At each step, try every unused element in the next position. When permutation length equals input length, save it. Backtrack by removing the last element and marking it unused.",
      templateCode: `// Permutations
public List<List<Integer>> permute(int[] nums) {
    List<List<Integer>> result = new ArrayList<>();
    boolean[] used = new boolean[nums.length];
    permuteHelper(nums, used, new ArrayList<>(), result);
    return result;
}
void permuteHelper(int[] nums, boolean[] used, List<Integer> current, List<List<Integer>> result) {
    if (current.size() == nums.length) {
        result.add(new ArrayList<>(current)); // Why: found a complete permutation
        return;
    }
    for (int i = 0; i < nums.length; i++) {
        if (used[i]) continue; // Why: skip already used elements
        used[i] = true;
        current.add(nums[i]);
        permuteHelper(nums, used, current, result);
        current.remove(current.size() - 1); // Why: backtrack
        used[i] = false;
    }
}`,
      timeComplexity: "O(n * n!)",
      spaceComplexity: "O(n)",
      problems: [
        { id: "bt-permutations", title: "Permutations", platform: "leetcode", url: "https://leetcode.com/problems/permutations/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Facebook", "Microsoft", "Google"] },
        { id: "bt-permutations-ii", title: "Permutations II", platform: "leetcode", url: "https://leetcode.com/problems/permutations-ii/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Facebook"] },
        { id: "bt-next-permutation", title: "Next Permutation", platform: "leetcode", url: "https://leetcode.com/problems/next-permutation/", difficulty: "medium", isStandard: true, companies: ["Google", "Facebook", "Amazon"] },
        { id: "bt-permutation-sequence", title: "Permutation Sequence", platform: "leetcode", url: "https://leetcode.com/problems/permutation-sequence/", difficulty: "hard", isStandard: true, companies: ["Amazon", "Google"] },
        { id: "bt-string-permutations-gfg", title: "Permutations of a String", platform: "gfg", url: "https://www.geeksforgeeks.org/write-a-c-program-to-print-all-permutations-of-a-given-string/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Microsoft", "Flipkart"] },
        { id: "bt-palindrome-partition", title: "Palindrome Partitioning", platform: "leetcode", url: "https://leetcode.com/problems/palindrome-partitioning/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Google"] },
        { id: "bt-generate-parens", title: "Generate Parentheses", platform: "leetcode", url: "https://leetcode.com/problems/generate-parentheses/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Google", "Facebook", "Microsoft"] },
        { id: "bt-restore-ip", title: "Restore IP Addresses", platform: "leetcode", url: "https://leetcode.com/problems/restore-ip-addresses/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Google"] }
      ]
    },
    {
      id: "combinations-backtrack",
      title: "Combinations",
      tagline: "Generate all k-element combinations from n elements",
      recognitionTips: ["Problem asks for all ways to choose k items from n", "Phrases like 'all combinations of size k', 'choose k from n'", "Order doesn't matter (unlike permutations)", "nCk = n! / (k! * (n-k)!)"],
      proTips: ["Start from index i+1 (not i) to avoid duplicates", "Prune early: if remaining elements < spots left to fill, skip", "For combinations of specific sum, add sum-based pruning"],
      approach: "Similar to subsets, but only collect results when the combination reaches size k. At each step, add current element and recurse with the next index. Backtrack by removing the last element.",
      templateCode: `// Combinations — Choose k from [1, n]
public List<List<Integer>> combine(int n, int k) {
    List<List<Integer>> result = new ArrayList<>();
    combineHelper(n, k, 1, new ArrayList<>(), result);
    return result;
}
void combineHelper(int n, int k, int start, List<Integer> current, List<List<Integer>> result) {
    if (current.size() == k) {
        result.add(new ArrayList<>(current));
        return;
    }
    // Why: n - (k - current.size()) + 1 prunes branches that can't fill remaining slots
    for (int i = start; i <= n - (k - current.size()) + 1; i++) {
        current.add(i);
        combineHelper(n, k, i + 1, current, result);
        current.remove(current.size() - 1);
    }
}`,
      timeComplexity: "O(k * C(n,k))",
      spaceComplexity: "O(k)",
      problems: [
        { id: "bt-combinations", title: "Combinations", platform: "leetcode", url: "https://leetcode.com/problems/combinations/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Microsoft"] },
        { id: "bt-combo-sum", title: "Combination Sum", platform: "leetcode", url: "https://leetcode.com/problems/combination-sum/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Facebook"] },
        { id: "bt-combo-sum-ii", title: "Combination Sum II", platform: "leetcode", url: "https://leetcode.com/problems/combination-sum-ii/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Facebook"] },
        { id: "bt-combo-sum-iii", title: "Combination Sum III", platform: "leetcode", url: "https://leetcode.com/problems/combination-sum-iii/", difficulty: "medium", isStandard: false, companies: ["Amazon"] },
        { id: "bt-factor-combinations", title: "Factor Combinations", platform: "leetcode", url: "https://leetcode.com/problems/factor-combinations/", difficulty: "medium", isStandard: false, companies: ["Google", "Amazon"] },
        { id: "bt-letter-tile", title: "Letter Tile Possibilities", platform: "leetcode", url: "https://leetcode.com/problems/letter-tile-possibilities/", difficulty: "medium", isStandard: false, companies: ["Amazon"] },
        { id: "bt-iter-letter-combos", title: "Iterator for Combination", platform: "leetcode", url: "https://leetcode.com/problems/iterator-for-combination/", difficulty: "medium", isStandard: false, companies: ["Google"] },
        { id: "bt-fair-distribution", title: "Fair Distribution of Cookies", platform: "leetcode", url: "https://leetcode.com/problems/fair-distribution-of-cookies/", difficulty: "medium", isStandard: false, companies: ["Google"] }
      ]
    },
    {
      id: "n-queens-backtrack",
      title: "N-Queens",
      tagline: "Place N queens on an N×N board with no two queens attacking each other",
      recognitionTips: ["Classical constraint satisfaction problem", "Place items on a grid with conflict constraints", "Phrases like 'N-queens', 'non-attacking placement'", "Grid-based placement with row/column/diagonal constraints"],
      proTips: ["Track columns, diagonals (row-col), and anti-diagonals (row+col) in sets", "Place one queen per row — eliminates row conflicts automatically", "For just counting solutions, no need to store board state"],
      approach: "Place queens row by row. For each row, try every column. Check if the column, main diagonal (row-col), and anti-diagonal (row+col) are free. If valid, place and recurse. Backtrack on return.",
      templateCode: `// N-Queens
public List<List<String>> solveNQueens(int n) {
    List<List<String>> result = new ArrayList<>();
    Set<Integer> cols = new HashSet<>(), diags = new HashSet<>(), antiDiags = new HashSet<>();
    char[][] board = new char[n][n];
    for (char[] row : board) Arrays.fill(row, '.');
    placeQueen(0, n, board, cols, diags, antiDiags, result);
    return result;
}
void placeQueen(int row, int n, char[][] board, Set<Integer> cols,
                Set<Integer> diags, Set<Integer> antiDiags, List<List<String>> result) {
    if (row == n) {
        List<String> snapshot = new ArrayList<>();
        for (char[] r : board) snapshot.add(new String(r));
        result.add(snapshot);
        return;
    }
    for (int col = 0; col < n; col++) {
        int diag = row - col, antiDiag = row + col;
        if (cols.contains(col) || diags.contains(diag) || antiDiags.contains(antiDiag)) continue;
        cols.add(col); diags.add(diag); antiDiags.add(antiDiag);
        board[row][col] = 'Q';
        placeQueen(row + 1, n, board, cols, diags, antiDiags, result);
        board[row][col] = '.'; // Why: backtrack
        cols.remove(col); diags.remove(diag); antiDiags.remove(antiDiag);
    }
}`,
      timeComplexity: "O(n!)",
      spaceComplexity: "O(n²)",
      problems: [
        { id: "bt-n-queens", title: "N-Queens", platform: "leetcode", url: "https://leetcode.com/problems/n-queens/", difficulty: "hard", isStandard: true, companies: ["Amazon", "Google", "Facebook", "Microsoft"] },
        { id: "bt-n-queens-ii", title: "N-Queens II", platform: "leetcode", url: "https://leetcode.com/problems/n-queens-ii/", difficulty: "hard", isStandard: true, companies: ["Amazon", "Google"] },
        { id: "bt-valid-sudoku", title: "Valid Sudoku", platform: "leetcode", url: "https://leetcode.com/problems/valid-sudoku/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Microsoft", "Google"] },
        { id: "bt-sudoku-solver", title: "Sudoku Solver", platform: "leetcode", url: "https://leetcode.com/problems/sudoku-solver/", difficulty: "hard", isStandard: true, companies: ["Amazon", "Google", "Microsoft"] },
        { id: "bt-word-search-bt", title: "Word Search", platform: "leetcode", url: "https://leetcode.com/problems/word-search/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Microsoft", "Facebook"] },
        { id: "bt-unique-paths-iii", title: "Unique Paths III", platform: "leetcode", url: "https://leetcode.com/problems/unique-paths-iii/", difficulty: "hard", isStandard: false, companies: ["Google"] },
        { id: "bt-split-string", title: "Splitting a String Into Descending Consecutive Values", platform: "leetcode", url: "https://leetcode.com/problems/splitting-a-string-into-descending-consecutive-values/", difficulty: "medium", isStandard: false, companies: ["Amazon"] },
        { id: "bt-expression-operators", title: "Expression Add Operators", platform: "leetcode", url: "https://leetcode.com/problems/expression-add-operators/", difficulty: "hard", isStandard: true, companies: ["Google", "Facebook", "Amazon"] }
      ]
    },
    {
      id: "sudoku-solver-bt",
      title: "Sudoku Solver",
      tagline: "Fill a 9x9 grid obeying row, column, and box constraints",
      recognitionTips: ["Problem involves filling a constrained grid", "Need to satisfy row, column, and sub-grid constraints simultaneously", "Phrases like 'sudoku solver', 'fill the grid'", "Constraint propagation + backtracking"],
      proTips: ["Use three boolean arrays: rows[9][9], cols[9][9], boxes[9][9] for O(1) validity check", "Box index = (row/3)*3 + col/3", "Process cells left-to-right, top-to-bottom; backtrack when no digit fits"],
      approach: "Try digits 1-9 in each empty cell. Check if the digit is valid in the current row, column, and 3x3 box. If valid, place it and recurse. If no digit works, backtrack by removing the placed digit.",
      templateCode: `// Sudoku Solver
public void solveSudoku(char[][] board) {
    solve(board);
}
boolean solve(char[][] board) {
    for (int i = 0; i < 9; i++) {
        for (int j = 0; j < 9; j++) {
            if (board[i][j] != '.') continue;
            for (char ch = '1'; ch <= '9'; ch++) {
                if (isValid(board, i, j, ch)) {
                    board[i][j] = ch;
                    if (solve(board)) return true;
                    board[i][j] = '.'; // Why: backtrack
                }
            }
            return false; // Why: no valid digit for this cell
        }
    }
    return true; // Why: all cells filled
}
boolean isValid(char[][] board, int row, int col, char ch) {
    int boxRow = 3 * (row / 3), boxCol = 3 * (col / 3);
    for (int i = 0; i < 9; i++) {
        if (board[row][i] == ch) return false;
        if (board[i][col] == ch) return false;
        if (board[boxRow + i/3][boxCol + i%3] == ch) return false;
    }
    return true;
}`,
      timeComplexity: "O(9^(empty cells))",
      spaceComplexity: "O(81) for the board",
      problems: [
        { id: "bt-sudoku", title: "Sudoku Solver", platform: "leetcode", url: "https://leetcode.com/problems/sudoku-solver/", difficulty: "hard", isStandard: true, companies: ["Amazon", "Google", "Microsoft"] },
        { id: "bt-crossword-gfg", title: "Crossword Puzzle", platform: "gfg", url: "https://www.geeksforgeeks.org/solve-crossword-puzzle/", difficulty: "hard", isStandard: false, companies: ["Amazon"] },
        { id: "bt-combination-sum-iv", title: "Combination Sum IV", platform: "leetcode", url: "https://leetcode.com/problems/combination-sum-iv/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Google"] },
        { id: "bt-additive-number", title: "Additive Number", platform: "leetcode", url: "https://leetcode.com/problems/additive-number/", difficulty: "medium", isStandard: false, companies: ["Amazon"] },
        { id: "bt-path-with-max-gold", title: "Path with Maximum Gold", platform: "leetcode", url: "https://leetcode.com/problems/path-with-maximum-gold/", difficulty: "medium", isStandard: false, companies: ["Amazon", "Google"] },
        { id: "bt-max-length-concat", title: "Maximum Length of a Concatenated String with Unique Characters", platform: "leetcode", url: "https://leetcode.com/problems/maximum-length-of-a-concatenated-string-with-unique-characters/", difficulty: "medium", isStandard: false, companies: ["Microsoft"] },
        { id: "bt-partition-k-subsets", title: "Partition to K Equal Sum Subsets", platform: "leetcode", url: "https://leetcode.com/problems/partition-to-k-equal-sum-subsets/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Google", "Facebook"] },
        { id: "bt-beautiful-arrangement", title: "Beautiful Arrangement", platform: "leetcode", url: "https://leetcode.com/problems/beautiful-arrangement/", difficulty: "medium", isStandard: false, companies: ["Amazon"] }
      ]
    },
    {
      id: "word-search-bt",
      title: "Word Search (Backtracking)",
      tagline: "Find words in a grid by exploring all adjacent paths",
      recognitionTips: ["Search for a word character by character in a 2D grid", "May move up/down/left/right to adjacent cells", "Cannot reuse the same cell in a single path", "Phrases like 'word search', 'exist in grid'"],
      proTips: ["Mark cells as visited by temporarily changing their value", "Prune early: if first character doesn't match, skip the DFS", "For multiple words, use Trie + backtracking (Word Search II)"],
      approach: "Start DFS from every cell matching the first character. At each step, check all 4 directions. Mark the current cell as visited during exploration, unmark on backtrack. Return true when all characters are matched.",
      templateCode: `// Word Search — Single Word
public boolean exist(char[][] board, String word) {
    for (int i = 0; i < board.length; i++)
        for (int j = 0; j < board[0].length; j++)
            if (dfs(board, word, i, j, 0)) return true;
    return false;
}
boolean dfs(char[][] board, String word, int r, int c, int idx) {
    if (idx == word.length()) return true; // Why: all characters matched
    if (r < 0 || r >= board.length || c < 0 || c >= board[0].length) return false;
    if (board[r][c] != word.charAt(idx)) return false;
    char temp = board[r][c];
    board[r][c] = '#'; // Why: mark visited
    boolean found = dfs(board, word, r+1, c, idx+1) || dfs(board, word, r-1, c, idx+1)
                 || dfs(board, word, r, c+1, idx+1) || dfs(board, word, r, c-1, idx+1);
    board[r][c] = temp; // Why: backtrack — restore cell
    return found;
}`,
      timeComplexity: "O(M * N * 4^L)",
      spaceComplexity: "O(L) recursion depth",
      problems: [
        { id: "bt-word-search-main", title: "Word Search", platform: "leetcode", url: "https://leetcode.com/problems/word-search/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Microsoft", "Facebook", "Google"] },
        { id: "bt-word-search-ii-bt", title: "Word Search II", platform: "leetcode", url: "https://leetcode.com/problems/word-search-ii/", difficulty: "hard", isStandard: true, companies: ["Amazon", "Google", "Facebook"] },
        { id: "bt-rat-maze-gfg", title: "Rat in a Maze", platform: "gfg", url: "https://www.geeksforgeeks.org/rat-in-a-maze-backtracking-2/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Microsoft", "Flipkart"] },
        { id: "bt-knight-tour-gfg", title: "Knight's Tour Problem", platform: "gfg", url: "https://www.geeksforgeeks.org/the-knights-tour-problem-backtracking-1/", difficulty: "hard", isStandard: false, companies: ["Amazon", "Goldman Sachs"] },
        { id: "bt-matchsticks-square", title: "Matchsticks to Square", platform: "leetcode", url: "https://leetcode.com/problems/matchsticks-to-square/", difficulty: "medium", isStandard: false, companies: ["Amazon"] },
        { id: "bt-android-unlock", title: "Android Unlock Patterns", platform: "leetcode", url: "https://leetcode.com/problems/android-unlock-patterns/", difficulty: "medium", isStandard: false, companies: ["Google"] },
        { id: "bt-letter-case-perm", title: "Letter Case Permutation", platform: "leetcode", url: "https://leetcode.com/problems/letter-case-permutation/", difficulty: "medium", isStandard: false, companies: ["Facebook"] },
        { id: "bt-gray-code", title: "Gray Code", platform: "leetcode", url: "https://leetcode.com/problems/gray-code/", difficulty: "medium", isStandard: false, companies: ["Amazon"] }
      ]
    }
  ]
};

backtracking.totalProblems = backtracking.patterns.reduce((sum, p) => sum + p.problems.length, 0);
