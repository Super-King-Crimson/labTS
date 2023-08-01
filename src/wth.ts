class Okay {
    bill: string;
    jerry: number;
    quack: boolean;

    constructor(a: string, b: number, c: boolean) {
        this.bill = a;
        this.jerry = b;
        this.quack = c;
    }
}

let ok = new Okay("Hello", 50149, true);

console.log(ok);