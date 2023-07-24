class Perhaps<T> {
    #value: T | undefined;

    constructor(value: T | undefined) {
        this.#value = value;
    }

    match(): { match : boolean, value : T | undefined } {
        if (this.#value === undefined) {
            return { match: false, value: undefined };
        } else {
            return { match: true, value: this.#value };
        }
    }

    unwrap(): T | undefined {
        if (!this.#value) {
            throw new Error("Attempted to unwrap null");
        } else {
            return this.#value;
        }
    }
}

let some = new Perhaps([1, 2, 3]);
let none = new Perhaps(undefined);

interface Congo<T> {
    //CONditional
    c?: T;
    //GO (action/expression) function
    g: (val: T) => void;
}

function match<T>(a: T, ...congos: Congo<T>[]) {
    for (const congo of congos) {
        if (!congo.c || a == congo.c) {
            congo.g(a);
            break;
        }
    }
}

let number = -4;

match<number>(number,
    {c: (val) => { return val > 5 },   
        g: (val) => {
            console.log(`${val} is bigger than 5`);
        },
    },

    {c: (val) => { return val < 0 },
        g: (val) => {
            console.log("This number's so small I'll add to it");
            val += 5;
            console.log(`Here now it's ${val}, that might help`);
        }
    },

    {   
        g: (_) => {
            console.log("Who cares about this number");
        }
    },
);