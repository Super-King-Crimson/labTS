export function explain() {
    console.log("The basic idea behind recursion is that you solve a subproblem related to the original problem, \
then use the solution to that to solve the original problem");

    console.log(`${recursiveFactorial(4)} === 24`);

    //Your calls to the recursive function should eventually reach a base case, which can be solved without recursion
    //Let's walk through how we can solve other problems with recursion

    //palindrome detector
    console.log(`${isPalindrome("hello")} === false`);
    console.log(`${isPalindrome("a")} === true`);
    console.log(`${isPalindrome("")} === true`);
    console.log(`${isPalindrome("amanaplanacanalpanama")} === true`);

    //custom pow
    console.log(`${superPow(3, 10)} === ${Math.pow(3, 10)}`);
    console.log(`${superPow(11, -3)} === ${Math.pow(11, -3)}`);
    console.log(`${superPow(11, -0.25)} === 420`);

    //fibonacci number generator (recursive and iterative)
    console.log(`${fibIter(5)} === ${fibRecur(5)} === 5`);
    console.log(`${fibIter(11)} === ${fibRecur(11)} === 89`);
    console.log(`${fibIter(30)} === ${fibRecur(30)} === 832040`);
    console.log(`${fibIter(0)} === ${fibRecur(0)} === 0`);

    //Creating and using a memo during programming or using a bottom's up algorithm are techniques from dynamic programming
    //They can be used when a problem has optimal substructure (OS) and overlapping subproblems (OS...2?)
        //OS: the optimal solution of a problem can be created with optimal solutions of that problems' subproblems
            //the most efficient solution to fibRecur(10) is the sum of the most efficient solutions of fibRecur(9) and fibRecur(8)
        //OS2: when a subproblem is solved multiple times within a problem
            //calling fibRecur(3) calls fibRecur(2), calling fibRecur(5) also calls fibRecur(2), etc
}

function recursiveFactorial(n: number): number{
    if (n === 0) {
        //Base case: 0
        return 1;
    } else {
        //Recursive case: n * subproblem (solving for factorial of n - 1)
        return n * recursiveFactorial(n - 1);
    }
}

//reads the same forwards and backwards
function isPalindrome(s: string): boolean {
    //Let's start with the base case: the string "a"
    //It is, "a" read backwards is still "a".
    //What about the string ""?
    //Yup, "" read backwards is "".
    if (s.length === 0 || s.length === 1) {
        return true;
    } else {
        //What about 2 or more letters?
        //Well, hmm. Each palindrome starts and ends with the same letter, 
        //so if a word starts and ends with the same letter, that part of the word's a palindrome
        //but we still have to test the rest of the word, so if the word starts and ends with the same letter...
        if (s[0] === s[s.length - 1]) {
            //We'll chop off the parts we KNOW are a palindrome, and check the rest
            return isPalindrome(s.slice(1, -1));
        } else {
            //If a word DOESN'T start and end with the same letter, we know it's NOT a palindrome
            return false;
        }
    }    
    
}

function superPow(x: number, n: number): number {
    if (!Number.isInteger(n)) {
        //not compatible with decimals
        return 420;
    }

    //base case: we know x^0 always equals 1
    if (n === 0) {
        return 1;
    } else if (n > 0) {
        if (n % 2 === 0) {
            //if n is even and positive: x^n/2 * x^n/2
            let y = superPow(x, n/2);
            return y * y;
        } else {
            //if n is odd and positive: x * x^n-1
            return x * superPow(x, n - 1);
        }        
    } else {
        //if n is negative: 1 / x^-n (- * - === +)
        return 1 / superPow(x, -n);
    }
}

//We trade speed for space (we now need to store lotsa values in this memo)
let memo = [0, 1];
function fibRecur(n: number): number {
    if (n === 0 || n === 1) {
        //0th fib number is 0, 1st fib number is 1
        return n;
    } else {
        //fibonacci numbers are just the last two numbers added together
        //add them to a memo so it's easier to get next time
        if (!memo[n]) {
            memo[n] = fibRecur(n - 1) + fibRecur(n - 2);            
        }

        return memo[n];
    }
}

//Way better: we don't need a LUT, just use iterative bottom's up
function fibIter(n: number): number {
    if (n == 0 || n == 1) {
        return n;
    }

    let twoBack = 0; 
    let oneBack = 1;
    let current = 1;

    for (let i = 1; i < n; i++) {
        current = oneBack + twoBack;
        twoBack = oneBack;
        oneBack = current; 
    }
    
    //NOT NULL: current will be assigned to in the loop
    return current!;
}

explain();