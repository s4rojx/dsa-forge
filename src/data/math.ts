import { Topic } from "@/types";

export const math: Topic = {
  slug: "math",
  title: "Math & Number Theory",
  description: "GCD, primes, modular arithmetic, combinatorics, and mathematical patterns",
  icon: "Calculator",
  totalProblems: 0,
  patterns: [
    {
      id: "gcd-lcm",
      title: "GCD, LCM & Euclidean",
      tagline: "Greatest Common Divisor and Least Common Multiple using Euclid's algorithm",
      recognitionTips: ["Need GCD or LCM of numbers", "Reducing fractions to lowest terms", "Phrases like 'greatest common divisor', 'water jug problem'", "Problems involving divisibility of multiple numbers"],
      proTips: ["Euclidean algorithm: gcd(a,b) = gcd(b, a%b), base case gcd(a,0) = a", "LCM(a,b) = a * b / GCD(a,b)", "Extended Euclidean gives x,y such that ax + by = gcd(a,b)"],
      approach: "Use Euclidean algorithm for GCD in O(log(min(a,b))). Derive LCM from GCD. For problems involving multiple numbers, apply GCD/LCM iteratively.",
      templateCode: `// GCD and LCM
public int gcd(int a, int b) {
    while (b != 0) { int temp = b; b = a % b; a = temp; }
    return a;
}
public int lcm(int a, int b) {
    return a / gcd(a, b) * b; // Why: divide first to prevent overflow
}`,
      cppTemplate: `// GCD and LCM
int gcd(int a, int b) {
    while (b != 0) { int temp = b; b = a % b; a = temp; }
    return a;
}
int lcm(int a, int b) {
    return a / gcd(a, b) * b; // Why: divide first to prevent overflow
}`,
      timeComplexity: "O(log(min(a,b)))",
      spaceComplexity: "O(1)",
      problems: [
        { id: "mt-gcd-string", title: "Greatest Common Divisor of Strings", platform: "leetcode", url: "https://leetcode.com/problems/greatest-common-divisor-of-strings/", difficulty: "easy", isStandard: true, companies: ["Amazon", "Google"] },
        { id: "mt-water-jug", title: "Water and Jug Problem", platform: "leetcode", url: "https://leetcode.com/problems/water-and-jug-problem/", difficulty: "medium", isStandard: false, companies: ["Amazon", "Microsoft"] },
        { id: "mt-fraction-addition", title: "Fraction Addition and Subtraction", platform: "leetcode", url: "https://leetcode.com/problems/fraction-addition-and-subtraction/", difficulty: "medium", isStandard: false, companies: ["Amazon"] },
        { id: "mt-gcd-array-gfg", title: "GCD of Array", platform: "gfg", url: "https://www.geeksforgeeks.org/gcd-two-array-numbers/", difficulty: "easy", isStandard: true, companies: ["Amazon", "Microsoft"] },
        { id: "mt-lcm-array-gfg", title: "LCM of Array", platform: "gfg", url: "https://www.geeksforgeeks.org/lcm-of-given-array-elements/", difficulty: "easy", isStandard: true, companies: ["Amazon"] },
        { id: "mt-ugly-number", title: "Ugly Number", platform: "leetcode", url: "https://leetcode.com/problems/ugly-number/", difficulty: "easy", isStandard: true, companies: ["Amazon"] },
        { id: "mt-ugly-number-ii", title: "Ugly Number II", platform: "leetcode", url: "https://leetcode.com/problems/ugly-number-ii/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Google"] },
        { id: "mt-nth-magical", title: "Nth Magical Number", platform: "leetcode", url: "https://leetcode.com/problems/nth-magical-number/", difficulty: "hard", isStandard: false, companies: ["Google"] }
      ]
    },
    {
      id: "prime-sieve",
      title: "Primes & Sieve of Eratosthenes",
      tagline: "Efficient prime generation and primality testing",
      recognitionTips: ["Need all primes up to N", "Primality testing for large numbers", "Phrases like 'count primes', 'prime factorization'", "Problems involving divisors or prime factors"],
      proTips: ["Sieve of Eratosthenes: O(n log log n) to find all primes up to n", "For single primality test: check divisibility up to √n", "Every number > 1 has a unique prime factorization"],
      approach: "Create a boolean array of size n+1 (initially all true). Starting from 2, mark all multiples as composite. Remaining true values are primes.",
      templateCode: `// Sieve of Eratosthenes — Count Primes
public int countPrimes(int n) {
    if (n <= 2) return 0;
    boolean[] isComposite = new boolean[n];
    int count = 0;
    for (int i = 2; i < n; i++) {
        if (!isComposite[i]) {
            count++;
            // Why: mark all multiples of i as composite, starting from i*i
            for (long j = (long) i * i; j < n; j += i)
                isComposite[(int) j] = true;
        }
    }
    return count;
}`,
      cppTemplate: `// Sieve of Eratosthenes — Count Primes
int countPrimes(int n) {
    if (n <= 2) return 0;
    vector<bool> isComposite(n, false);
    int count = 0;
    for (int i = 2; i < n; i++) {
        if (!isComposite[i]) {
            count++;
            // Why: mark all multiples of i as composite, starting from i*i
            for (long j = (long) i * i; j < n; j += i)
                isComposite[(int) j] = true;
        }
    }
    return count;
}`,
      timeComplexity: "O(n log log n)",
      spaceComplexity: "O(n)",
      problems: [
        { id: "mt-count-primes", title: "Count Primes", platform: "leetcode", url: "https://leetcode.com/problems/count-primes/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Microsoft", "Apple"] },
        { id: "mt-prime-factors-gfg", title: "Prime Factorization", platform: "gfg", url: "https://www.geeksforgeeks.org/print-all-prime-factors-of-a-given-number/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Microsoft"] },
        { id: "mt-four-divisors", title: "Four Divisors", platform: "leetcode", url: "https://leetcode.com/problems/four-divisors/", difficulty: "medium", isStandard: false, companies: ["Amazon"] },
        { id: "mt-closest-prime", title: "Closest Prime Numbers in Range", platform: "leetcode", url: "https://leetcode.com/problems/closest-prime-numbers-in-range/", difficulty: "medium", isStandard: false, companies: ["Amazon"] },
        { id: "mt-prime-palindrome", title: "Prime Palindrome", platform: "leetcode", url: "https://leetcode.com/problems/prime-palindrome/", difficulty: "medium", isStandard: false, companies: ["Amazon"] },
        { id: "mt-sieve-segmented-gfg", title: "Segmented Sieve", platform: "gfg", url: "https://www.geeksforgeeks.org/segmented-sieve/", difficulty: "hard", isStandard: false, companies: ["Amazon"] },
        { id: "mt-prime-in-diagonal", title: "Prime In Diagonal", platform: "leetcode", url: "https://leetcode.com/problems/prime-in-diagonal/", difficulty: "easy", isStandard: false, companies: ["Amazon"] },
        { id: "mt-kth-factor", title: "The kth Factor of n", platform: "leetcode", url: "https://leetcode.com/problems/the-kth-factor-of-n/", difficulty: "medium", isStandard: false, companies: ["Amazon"] }
      ]
    },
    {
      id: "modular-arithmetic",
      title: "Modular Arithmetic",
      tagline: "Fast exponentiation and modular operations for large number problems",
      recognitionTips: ["Answer must be returned modulo 10^9+7", "Need to compute large powers efficiently", "Phrases like 'mod 10^9+7', 'power mod', 'modular inverse'"],
      proTips: ["Binary exponentiation: compute a^n mod m in O(log n)", "Modular inverse of a mod p (p prime) = a^(p-2) mod p (Fermat's little theorem)", "Always mod after every multiplication to prevent overflow"],
      approach: "Break the exponent into binary. If the current bit is set, multiply result by base. Square the base each iteration. Take mod at every step.",
      templateCode: `// Binary Exponentiation — Fast Power
public long power(long base, long exp, long mod) {
    long result = 1;
    base %= mod;
    while (exp > 0) {
        if ((exp & 1) == 1)
            result = result * base % mod; // Why: odd exponent → multiply
        exp >>= 1;
        base = base * base % mod; // Why: square the base
    }
    return result;
}
// Modular Inverse (when mod is prime)
public long modInverse(long a, long mod) {
    return power(a, mod - 2, mod); // Why: Fermat's little theorem
}`,
      cppTemplate: `// Binary Exponentiation — Fast Power
long long power(long base, long exp, long mod) {
    long result = 1;
    base %= mod;
    while (exp > 0) {
        if ((exp & 1) == 1)
            result = result * base % mod; // Why: odd exponent → multiply
        exp >>= 1;
        base = base * base % mod; // Why: square the base
    }
    return result;
}
// Modular Inverse (when mod is prime)
long long modInverse(long a, long mod) {
    return power(a, mod - 2, mod); // Why: Fermat's little theorem
}`,
      timeComplexity: "O(log n)",
      spaceComplexity: "O(1)",
      problems: [
        { id: "mt-pow-x-n", title: "Pow(x, n)", platform: "leetcode", url: "https://leetcode.com/problems/powx-n/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Facebook", "Google"] },
        { id: "mt-super-pow", title: "Super Pow", platform: "leetcode", url: "https://leetcode.com/problems/super-pow/", difficulty: "medium", isStandard: false, companies: ["Amazon"] },
        { id: "mt-count-good-numbers", title: "Count Good Numbers", platform: "leetcode", url: "https://leetcode.com/problems/count-good-numbers/", difficulty: "medium", isStandard: false, companies: ["Amazon"] },
        { id: "mt-mod-exp-gfg", title: "Modular Exponentiation", platform: "gfg", url: "https://www.geeksforgeeks.org/modular-exponentiation-power-in-modular-arithmetic/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Microsoft"] },
        { id: "mt-large-factorial-gfg", title: "Factorial of Large Numbers", platform: "gfg", url: "https://www.geeksforgeeks.org/factorial-large-number/", difficulty: "medium", isStandard: true, companies: ["Amazon"] },
        { id: "mt-string-to-int", title: "String to Integer (atoi)", platform: "leetcode", url: "https://leetcode.com/problems/string-to-integer-atoi/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Microsoft", "Facebook"] },
        { id: "mt-add-strings", title: "Add Strings", platform: "leetcode", url: "https://leetcode.com/problems/add-strings/", difficulty: "easy", isStandard: true, companies: ["Facebook", "Amazon"] },
        { id: "mt-multiply-strings", title: "Multiply Strings", platform: "leetcode", url: "https://leetcode.com/problems/multiply-strings/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Facebook", "Google"] }
      ]
    },
    {
      id: "combinatorics",
      title: "Combinatorics & Counting",
      tagline: "nCr, Catalan numbers, and counting principles",
      recognitionTips: ["Need to count arrangements, selections, or valid structures", "Phrases like 'unique BSTs', 'catalan number', 'nCr'", "Problems involving parentheses, paths, or tree counting"],
      proTips: ["Catalan(n) = C(2n,n)/(n+1) — counts BSTs, valid parentheses, etc.", "Pascal's triangle: C(n,r) = C(n-1,r-1) + C(n-1,r)", "For large n, precompute factorials and inverse factorials mod p"],
      approach: "Use Pascal's triangle for small n, or precompute factorials with modular inverse for large n. Catalan numbers follow the recurrence C(n) = sum of C(i)*C(n-1-i) for i=0 to n-1.",
      templateCode: `// nCr with Modular Arithmetic
static final long MOD = 1_000_000_007L;
long[] fact, invFact;
void precompute(int n) {
    fact = new long[n + 1];
    invFact = new long[n + 1];
    fact[0] = 1;
    for (int i = 1; i <= n; i++) fact[i] = fact[i-1] * i % MOD;
    invFact[n] = power(fact[n], MOD - 2, MOD);
    for (int i = n - 1; i >= 0; i--) invFact[i] = invFact[i+1] * (i+1) % MOD;
}
long nCr(int n, int r) {
    if (r < 0 || r > n) return 0;
    return fact[n] % MOD * invFact[r] % MOD * invFact[n-r] % MOD;
}`,
      cppTemplate: `// nCr with Modular Arithmetic
const long long MOD = 1_000_000_007L;
vector<long long> fact, invFact;
void precompute(int n) {
    fact = new long[n + 1];
    invFact = new long[n + 1];
    fact[0] = 1;
    for (int i = 1; i <= n; i++) fact[i] = fact[i-1] * i % MOD;
    invFact[n] = power(fact[n], MOD - 2, MOD);
    for (int i = n - 1; i >= 0; i--) invFact[i] = invFact[i+1] * (i+1) % MOD;
}
long nCr(int n, int r) {
    if (r < 0 || r > n) return 0;
    return fact[n] % MOD * invFact[r] % MOD * invFact[n-r] % MOD;
}`,
      timeComplexity: "O(n) precomputation, O(1) per query",
      spaceComplexity: "O(n)",
      problems: [
        { id: "mt-unique-bst-count", title: "Unique Binary Search Trees", platform: "leetcode", url: "https://leetcode.com/problems/unique-binary-search-trees/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Google"] },
        { id: "mt-unique-paths-math", title: "Unique Paths (Math)", platform: "leetcode", url: "https://leetcode.com/problems/unique-paths/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Google"] },
        { id: "mt-pascals-triangle", title: "Pascal's Triangle", platform: "leetcode", url: "https://leetcode.com/problems/pascals-triangle/", difficulty: "easy", isStandard: true, companies: ["Amazon", "Google", "Facebook"] },
        { id: "mt-pascals-triangle-ii", title: "Pascal's Triangle II", platform: "leetcode", url: "https://leetcode.com/problems/pascals-triangle-ii/", difficulty: "easy", isStandard: true, companies: ["Amazon"] },
        { id: "mt-catalan-gfg", title: "Catalan Numbers", platform: "gfg", url: "https://www.geeksforgeeks.org/program-nth-catalan-number/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Google"] },
        { id: "mt-ncr-gfg", title: "nCr Computation", platform: "gfg", url: "https://www.geeksforgeeks.org/binomial-coefficient-dp-9/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Microsoft"] },
        { id: "mt-kth-symbol-grammar", title: "K-th Symbol in Grammar", platform: "leetcode", url: "https://leetcode.com/problems/k-th-symbol-in-grammar/", difficulty: "medium", isStandard: false, companies: ["Amazon"] },
        { id: "mt-num-ways-stay", title: "Number of Ways to Stay in the Same Place After Some Steps", platform: "leetcode", url: "https://leetcode.com/problems/number-of-ways-to-stay-in-the-same-place-after-some-steps/", difficulty: "hard", isStandard: false, companies: ["Google"] }
      ]
    },
    {
      id: "math-patterns",
      title: "Mathematical Patterns",
      tagline: "Detect and exploit mathematical structure — Roman numerals, happy numbers, and more",
      recognitionTips: ["Problem has a mathematical trick or formula", "Detect repeating patterns or cycles", "Phrases like 'happy number', 'roman numeral', 'excel column'"],
      proTips: ["Happy number: use Floyd's cycle detection to detect infinite loops", "Roman numerals: use subtraction rule (IV=4, IX=9, etc.)", "Base conversion: repeatedly divide by base and collect remainders"],
      approach: "Identify the mathematical property or formula underlying the problem. Apply it directly or use simulation with cycle detection for convergence problems.",
      templateCode: `// Happy Number — Floyd's Cycle Detection
public boolean isHappy(int n) {
    int slow = n, fast = n;
    do {
        slow = digitSquareSum(slow);
        fast = digitSquareSum(digitSquareSum(fast));
    } while (slow != fast);
    return slow == 1;
}
int digitSquareSum(int n) {
    int sum = 0;
    while (n > 0) {
        int d = n % 10;
        sum += d * d;
        n /= 10;
    }
    return sum;
}`,
      cppTemplate: `// Happy Number — Floyd's Cycle Detection
bool isHappy(int n) {
    int slow = n, fast = n;
    do {
        slow = digitSquareSum(slow);
        fast = digitSquareSum(digitSquareSum(fast));
    } while (slow != fast);
    return slow == 1;
}
int digitSquareSum(int n) {
    int sum = 0;
    while (n > 0) {
        int d = n % 10;
        sum += d * d;
        n /= 10;
    }
    return sum;
}`,
      timeComplexity: "Varies",
      spaceComplexity: "O(1)",
      problems: [
        { id: "mt-happy-number", title: "Happy Number", platform: "leetcode", url: "https://leetcode.com/problems/happy-number/", difficulty: "easy", isStandard: true, companies: ["Amazon", "Apple"] },
        { id: "mt-roman-to-int", title: "Roman to Integer", platform: "leetcode", url: "https://leetcode.com/problems/roman-to-integer/", difficulty: "easy", isStandard: true, companies: ["Amazon", "Microsoft", "Facebook"] },
        { id: "mt-int-to-roman", title: "Integer to Roman", platform: "leetcode", url: "https://leetcode.com/problems/integer-to-roman/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Microsoft"] },
        { id: "mt-excel-column", title: "Excel Sheet Column Number", platform: "leetcode", url: "https://leetcode.com/problems/excel-sheet-column-number/", difficulty: "easy", isStandard: true, companies: ["Microsoft", "Amazon"] },
        { id: "mt-excel-column-title", title: "Excel Sheet Column Title", platform: "leetcode", url: "https://leetcode.com/problems/excel-sheet-column-title/", difficulty: "easy", isStandard: true, companies: ["Microsoft", "Facebook"] },
        { id: "mt-fizz-buzz", title: "Fizz Buzz", platform: "leetcode", url: "https://leetcode.com/problems/fizz-buzz/", difficulty: "easy", isStandard: true, companies: ["Amazon", "Microsoft"] },
        { id: "mt-palindrome-number", title: "Palindrome Number", platform: "leetcode", url: "https://leetcode.com/problems/palindrome-number/", difficulty: "easy", isStandard: true, companies: ["Amazon"] },
        { id: "mt-reverse-integer", title: "Reverse Integer", platform: "leetcode", url: "https://leetcode.com/problems/reverse-integer/", difficulty: "medium", isStandard: true, companies: ["Amazon", "Apple", "Bloomberg"] }
      ]
    }
  ]
};

math.totalProblems = math.patterns.reduce((sum, p) => sum + p.problems.length, 0);
