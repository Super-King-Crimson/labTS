import { default as lerp, lerpN } from "./Lerp";
import { eq as assertEq, close as assertClose } from "../LabTools/Assert";

assertEq(lerpN(0, 10, 0.1, 1), lerp(0, 10, 0.1));
assertClose(
    lerp(
        lerp(
            lerp(0, 10, 0.1), 
        10, 0.1),
    10, 0.1), 
    lerpN(0, 10, 0.1, 3),
    1e-13
);
assertEq(5, lerpN(5, 10, 0.2, 0));

let aOg = 141;
let b = 4102;
let t = 0.4234;
let n = 5;

let a = aOg;
for (let i = 0; i < n; i++) {
    a = lerp(a, b, t);
}

assertEq(a, lerpN(aOg, b, t, n));

