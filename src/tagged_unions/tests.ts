import {Foo, Qux, Enum} from "../tagged_unions";
import { eq as assert_eq } from "../LabTools/Assert";

function getRandomFoo(): Foo {
    return new Qux();
}

let rnf = getRandomFoo();
let type: keyof typeof Enum;
if (rnf.matchPattern === Enum.Bar) {
    type = "Bar";
} else if (rnf.matchPattern === Enum.Baz) {
    type = "Baz";
} else {
    type = "Qux";
}

assert_eq(type, "Qux");