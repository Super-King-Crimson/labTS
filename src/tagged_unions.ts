export const Enum = {
    Bar: "Bar",
    Baz: "Baz",
    Qux: "Qux",
} as const;

export class Bar {
    a: number;
    b: string;
    c: boolean;

    readonly matchPattern = Enum.Bar;

    constructor(a: number, b: string, c: boolean) {
        this.a = a;
        this.b = b;
        this.c = c;
    }
}

export class Baz {
    0: boolean;

    readonly matchPattern = Enum.Baz;
    
    constructor(val: boolean) {
        this[0] = val;
    }
}

export class Qux {
    readonly matchPattern = Enum.Qux;

    constructor() { }
}

export type Foo = Bar | Baz | Qux;