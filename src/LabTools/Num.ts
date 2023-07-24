export function isEven(n: number) {
    //all even numbers are 0bxx...x0
    return (n & 0b1) === 0;
}

export function isOdd(n: number) {
    //all odd numbers are 0bxx...x1
    return (n & 0b1) === 1;
}

export function isZero(n: number) {
    return (n | 0b0) === 0;
}

export function isNonZero(n: number) {
    return (n | 0b0) !== 0;
}

export function getBit(n: number, bit: number): (0 | 1) {
    return ((n & (1 << bit)) === 0) ? 0 : 1;
}