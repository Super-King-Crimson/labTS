export default binarySort

const trunc = Math.trunc

function binaryInsert(arr: number[], num: number): number {
    if (arr.length === 0) {
        return 0;
    }

    if (arr.length === 1) {
        return num >= arr[0] ? 1 : 0;
    }

    let midpoint = trunc((arr.length - 1) / 2);
    let mpVal = arr[midpoint];

    if (num === mpVal) {
        return midpoint + 1;
    } else if (num > mpVal) {
        return midpoint + 1 + binaryInsert(arr.slice(midpoint + 1), num);
    } else {
        return binaryInsert(arr.slice(0, midpoint), num);
    }
}

function binarySort(arr: number[]): number[] {
    let sorted: number[] = [];

    for (const v of arr) {
        let pos = binaryInsert(sorted, v);
        if (pos === sorted.length) {
            sorted.push(v);    
        } else {
            sorted.splice(pos, 0, v);
        }
    }

    return sorted;
}