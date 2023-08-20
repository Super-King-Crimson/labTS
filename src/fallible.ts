export type MidpointErrorNameEnum = keyof typeof MidpointErrorName
export const MidpointErrorName = {
    EmptyCollection: true,
    EvenNumberOfElements: true,
}

export class MidpointError implements Error {
    name: MidpointErrorNameEnum;
    message: string;

    constructor(name: MidpointErrorNameEnum, message: string) {
        this.name = name;
        this.message = message;
    }
}