import * as Assert from "./LabTools/Assert";
import { isNonZero, isOdd, getBit } from "./LabTools/Num";

class Hamming {
    private bits: boolean[];
    private static default: boolean[] = [
        false, false, false, false,
        false, false, false, false,
        false, false, false, false,
        false, false, false, false,
    ];

    /**
     * # Usage
     * Changes bits 0, 1, 2, 4, and 8 to abide by the parity rules.
     * 
     * Namely, manipulates their values to ensure the number of 1's are even in:
     * 
     * - the second and fourth columns (inStripes)
     * - the last two columns (last)
     * - the second and fourth rows (bands)
     * - the two bottom rows (bottom)
    **/
    constructor(from?: number[]) {
        if (!from) {
            this.bits = Hamming.default;
            return;
        }

        let [iC, jC, kC, lC, total] = [0, 0, 0, 0, 0];
        let newFrom: boolean[] = [true];


        //the 0 bit isn't counted by anything (0b0000 won't pass any checks) so don't even loop through it
        for (let i = 0b0001; i <= 0b1111; i++) {
            let isINonZero = isNonZero(from[i]);

            newFrom.push(isINonZero);
            if (isINonZero) {
                total++;

                if (getBit(i, 0) === 1) {
                    iC++;
                }

                if (getBit(i, 1) === 1) {
                    jC++;
                }

                if (getBit(i, 2) === 1) {
                    kC++;
                }

                if (getBit(i, 3) === 1) {
                    lC++;
                }
            }
        }

        //set parity bit to 1 of its sector is odd (ignoring itself)
        //if its sector's parity (ignoring itself) is already odd then set to 0

        //it doesn't matter if we add or subtract to total, as all we care about is if its even or odd
        if (isOdd(iC)) {
            newFrom[0b0001] = !newFrom[0b0001];
            total++;
        }

        if (isOdd(jC)) {
            newFrom[0b0010] = !newFrom[0b0010];
            total++;
        }

        if (isOdd(kC)) {
            newFrom[0b0100] = !newFrom[0b0100];
            total++;
        }

        if (isOdd(kC)) {
            newFrom[0b1000] = !newFrom[0b1000];
            total++;
        }

        newFrom[0b0000] = isOdd(total);

        this.bits = newFrom;
    }

    display() {
        let acc = "";

        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (j === 0) {
                    acc += "[";
                }

                acc += this.bits[(i * 4) + j] === true ? "1" : "0";

                if (j !== 3) {
                    acc += " | ";
                } else {
                    acc += "]\n";
                }
            }
        }

        console.log(acc);
    }

    flip(i: number) {
        try {
            this.bits[i] = !this.bits[i];
        } catch (e) {
            throw Error(`Failed to flip: bit number is ${i} but total bits is  ${this.bits.length}`);
        }
    }

    //all stripes are 0bxxx1
    //all rights are 0bxx1x
    //all bands are 0bx1xx
    //all bottoms are 0b1xxxx
    count(): [stripeCount: number, rightCount: number, bandCount: number, bottomCount: number, totalCount: number] {
        let counts: [number, number, number, number, number] = [0, 0, 0, 0, 0];

        for (let i = 0b0000; i <= 0b1111; i++) {
            if (this.bits[i] === true) {
                counts[4]++;

                if (getBit(i, 0) === 1) {
                    counts[0]++;
                }

                if (getBit(i, 1) === 1) {
                    counts[1]++;
                }

                if (getBit(i, 2) === 1) {
                    counts[2]++;
                }

                if (getBit(i, 3) === 1) {
                    counts[3]++;
                }
            }
        }

        return counts;
    }

fixError(): number | null {
        let [iC, jC, kC, lC, totalC] = this.count();

        let [inStripes, inLast, inBands, inBottom, inAny] = [isOdd(iC), isOdd(jC), isOdd(kC), isOdd(lC), isOdd(totalC)];

        let location = 0b0000;

        if (inStripes) {
            location |= 0b0001;
        }

        if (inLast) {
            location |= 0b0010;
        }

        if (inBands) {
            location |= 0b0100;
        }

        if (inBottom) {
            location |= 0b1000;
        }

        //if an error wasn't detected
        if (location === 0b0000) {
            //make sure the 0 bit is still ok
            if (inAny) {
                this.bits[0b0000] = !this.bits[0b0000];
            }

            return null;
        } else if (!inAny) {
            //if error was detected, but the full parity bit didn't detect anything,
            //something got flipped twice, throw!
            throw Error("Failed to fix: multiple errors detected");
        }

        this.flip(location);

        return location;
    }
}

let hamming = new Hamming([
    0, 1, 1, 1,
    0, 0, 1, 0,
    0, 1, 1, 1,
    0, 0, 0, 0,
]);
//converts to:
/*
[0 | 1 | 0 | 1]
[1 | 0 | 1 | 0]
[1 | 1 | 1 | 1]
[0 | 0 | 0 | 0]
*/

hamming.flip(5);
Assert.eq(5, hamming.fixError());

//Assume no error if 0th bit gets flipped so we can communicate no error state
hamming.flip(0);
Assert.eq(null, hamming.fixError());

//even works with parity bits
hamming.flip(1);
Assert.eq(1, hamming.fixError());

//can detect up to 2 errors, throwing an error if it findsthem
hamming.flip(8);
hamming.flip(2);
Assert.willThrow(() => hamming.fixError());


let hamming2 = new Hamming([
    0, 1, 1, 1,
    0, 0, 0, 0,
    0, 0, 1, 1,
    0, 0, 0, 1,
]);

hamming2.flip(6);
hamming2.flip(4);
hamming2.flip(13);
let result = hamming2.fixError();

//will fail to detect any odd number of errors greater than one (and some even numbers of errors)
//return an arbitrary number that isn't any of the bits you actually flipped
Assert.ne(result, 6);
Assert.ne(result, 13);
Assert.ne(result, 4);

//see?
Assert.eq(result, 15);