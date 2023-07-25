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

let fAgain = func;
let func2Again = () => f2() + 10;
//ok something has to stack overflow here test failed
//#endregion
