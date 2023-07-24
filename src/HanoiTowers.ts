import assert, * as Assert from "./LabTools/Assert";
//Objective:
//Each Hanoi has [numTowers] poles.
//When initialized, the first pole has [n] rings placed on its first pole.
//Each ring is represented by a number, which is its size, and each pole is represented by an array of rings (numbers).
    //The rings on a pole are stored from biggest to smallest, 
    //which means the pole[0] will return the biggest ring, and pole.pop() will remove the smallest ring, allowing you to move it
//The puzzle is complete when all rings are moved onto the second pole.

//Rules:
//You may only move rings through the move(from, to) function.
    //[move] can only move one ring at a time, and only the top ring of a pole.
    //It will fail if the move would cause a bigger ring to be on top of a smaller ring.
    //If the function was successful, it will return 0, otherwise an integer expressing why it failed:
    /*

    1: [from] has no disks on top to move
    2: the disk on top of [to] is smaller than the disk on top of [from]    

    */

type Tower = number[];

class Hanoi {
    private static numTowers = 3;    

    readonly towers: Tower[];    
    readonly n: number;    

    constructor(n: number) {
        if (!Number.isInteger(n)) {
            throw Error("Cannot have a decimal number of rings on the towers");
        } else if (n < 1) {
            throw Error("Cannot have a negative number rings on the towers");
        }
                
        this.n = n;

        this.towers = Array.from({ length: 3 }, _ => Array());        

        for (let i = 0; i < n; i++) {
            this.towers[0][i] = n - i;
        }            
    }

    move(from: number[], to: number[]) {
        if (from.length === 0) {
            throw Error("Error code 1");
        }
    
        if (to.length > 0 && to[to.length - 1] < from[from.length - 1]) {
            throw Error("Error code 2");
        } else {
            //NOT NULL: we have already verified that from is not empty
            to.push(from.pop()!);            
        }
    }
}

//Ok, let's break this into small subproblems.
/**
 * Moves `n` rings from `start` to `goal`, using `spare` to hold rings during the move.
 * 
 */
function solution(hanoi: Hanoi, n: number, start: Tower, goal: Tower, spare: Tower) {
    //If n === 1, then it's as simple as moving that one ring to the goal pole, so that's our base case (1 step)
    if (n === 1) {
        hanoi.move(start, goal);
    } else {
        //If n === 2, then we use three steps:
            //Recursively solve for n === 1 to move the top disk from start to spare (1 step)
            //Move the bottom disk from start to goal
            //Recursively solve for n === 1 to move the disk to goal (1 step)

        //If n === 3, we can:
            //recursively solve for n === 2 to move the top two disks from start to spare (3 steps)
            //move the bottom disk from start to goal
            //recursively solve for n === 2 to move the disks to goal (3 steps)        

        //We can solve this recursively: solution moves n rings from start to goal,
        
        //so here we move n - 1 rings from start to spare
        solution(hanoi, n-1, start, spare, goal); //start === start, goal === spare, spare === goal
        //move the bottom ring from start to goal
        hanoi.move(start, goal);
        //then move the rest of the rings back onto goal. Problem solved!
        solution(hanoi, n-1, spare, goal, start); //start === spare, goal === goal, spare === start
    }
}

/*
A simple solution for the puzzle is to alternate moves between the smallest piece and a non-smallest piece. 
When moving the smallest piece, always move it to the next position in the same direction 
(to the right if the starting number of pieces is even, to the left if the starting number of pieces is odd). 
If there is no tower position in the chosen direction, move the piece to the opposite end, 
but then continue to move in the correct direction. 
For example, if you started with three pieces, you would move the smallest piece to the opposite end, 
then continue in the left direction after that. When the turn is to move the non-smallest piece, there is only one legal move. 
Doing this will complete the puzzle in the fewest moves.
*/
function solutionIterative(hanoi: Hanoi, n: number, start: Tower, goal: Tower, spare: Tower) {
    if (n === 1) {
        hanoi.move(start, goal);
        return;
    }
    
    let moveReq = (1 << n) - 1;    

/* 
Simpler statement of iterative solution:

For an even number of disks:
Make the legal move between pegs A and B (in either direction),
Make the legal move between pegs A and C (in either direction),
Make the legal move between pegs B and C (in either direction),
Repeat until complete.

For an odd number of disks:
Make the legal move between pegs A and C (in either direction),
Make the legal move between pegs A and B (in either direction),
Make the legal move between pegs B and C (in either direction),
Repeat until complete.
*/

    if (n % 2 === 0) {
        [spare, goal] = [goal, spare];
    }

    for (let i = 1; i <= moveReq; i++) {        
        if (i % 3 === 0) {
            try {
                hanoi.move(spare, goal);
            } catch (_) {
                hanoi.move(goal, spare);
            }
        } else if (i % 3 === 1) {
            try {
                hanoi.move(start, goal);
            } catch (_) {
                hanoi.move(goal, start);
            }
        } else {
            try {
                hanoi.move(start, spare);
            } catch (_) {
                hanoi.move(spare, start);
            }
        }
    }
}

let hanoi = new Hanoi(5);
console.log(hanoi.towers);
solution(hanoi, hanoi.n, hanoi.towers[0], hanoi.towers[1], hanoi.towers[2]);
console.log(hanoi.towers);

console.log();

let hanoi2 = new Hanoi(6);
console.log(hanoi2.towers);
solutionIterative(hanoi2, hanoi2.n, hanoi2.towers[0], hanoi2.towers[1], hanoi2.towers[2]);
console.log(hanoi2.towers);

//#region | TEST: Do JavaScript function aliases contain pointers to the function or the raw data required to call the function?
let someMethod = () => 5;
let otherMethod = someMethod;
Assert.eq(someMethod(), 5);
Assert.eq(otherMethod(), 5);
someMethod = () => 10;
Assert.eq(someMethod(), 10);
Assert.eq(otherMethod(), 5);
//CONCLUSION: The raw data. If it was simply a pointer, then the test directly above this comment would fail, as otherMethod() === 10
//#endregion

//#region | TEST: Does putting a function's definition in the function itself break the function?
let fn = () => 20;
Assert.eq(fn(), 20);

//calling this function leads to a stack overflow
fn = () => fn() + 20;
/* fn(); */

//CONCLUSION: YUP LMAO
//#endregion

//#region | TEST: [REDACTED]
let func = () => 5;

let f = func; //WE NEED A PROXYYYYY TO SAVE IT
let func2 = () => f() + 10;

func = () => 10;
Assert.eq(func2(), 15);

func = () => func2() + 15;
Assert.eq(func(), 30);

func = () => func2() + 100;
Assert.eq(func(), 115);
//CONCLUSION: IT SOOOO WORKS
//#endregion