class Okay {
    constructor(a, b, c) {
        this.bill = a;
        this.jerry = b;
        this.quack = c;
    }
}

let ok = new Okay(1, "fourteen", new Okay(true));

console.log(ok);