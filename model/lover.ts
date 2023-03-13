export class Lover {
    #loverID: number;
    #loverName: string;
    #zodiacSign: string;
    #origin: string;
    #YOB: number;
    #hobby: string;

    constructor(loverID: number, loverName: string, zodiacSign: string, origin: string, YOB: number, hobby: string) {
        this.#loverID = loverID;
        this.#loverName = loverName;
        this.#zodiacSign = zodiacSign;
        this.#origin = origin;
        this.#YOB = YOB;
        this.#hobby = hobby;
    }

    get loverID(): number {
        return this.#loverID;
    }

    set loverID(value: number) {
        this.#loverID = value;
    }

    get loverName(): string {
        return this.#loverName;
    }

    set loverName(value: string) {
        this.#loverName = value;
    }

    get zodiacSign(): string {
        return this.#zodiacSign;
    }

    set zodiacSign(value: string) {
        this.#zodiacSign = value;
    }

    get origin(): string {
        return this.#origin;
    }

    set origin(value: string) {
        this.#origin = value;
    }

    get YOB(): number {
        return this.#YOB;
    }

    set YOB(value: number) {
        this.#YOB = value;
    }

    get hobby(): string {
        return this.#hobby;
    }

    set hobby(value: string) {
        this.#hobby = value;
    }
}
