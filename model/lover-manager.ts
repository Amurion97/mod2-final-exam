import {Lover} from "./lover";
import {infinite} from "./generator";
import {Action} from "../action/action";

export class LoverManager {
    #loverList: Array<Lover>;
    #genID: Generator;

    constructor() {
        this.#loverList = [];
        this.#genID = infinite();
    }


    get loverList(): Array<Lover> {
        return this.#loverList;
    }

    set loverList(value: Array<Lover>) {
        this.#loverList = value;
    }


    get genID(): Generator {
        return this.#genID;
    }

    set genID(value: Generator) {
        this.#genID = value;
    }

    findByNearestName(name: string): Array<Lover> {
        let newList: Array<Lover> = [];
        this.loverList.forEach(item => {
            if (item.loverName.toLowerCase().includes(name.toLowerCase())) {
                newList.push(item)
            }
        });
        return newList;
    }

    generateNewID(): number {
        return this.genID.next().value;
    }

    addLover(lover: Lover): void {
        this.loverList.push(lover)
    }

    findIndexByLoverID(id: number): number {
        return this.loverList.findIndex(item => item.loverID === id)
    }

    getLoverByIndex(index: number): Lover {
        return this.loverList[index];
    }

    deleteLover(userID: number): void {
        this.loverList.splice(this.findIndexByLoverID(userID), 1);
    }

    replaceCustomerInfo(userID: number, lover: Lover): void {
        this.loverList[this.findIndexByLoverID(userID)] = lover;
    }

    checkValidLoverIDInput(loverID: number): boolean {
        let index = this.findIndexByLoverID(loverID)
        return index >= 0; //&& index < this.DB.length);
    }
    showAsTable(loverList: Array<Lover> = this.loverList, notFoundMessage: string = "NO DATA"): void {
        let N = loverList.length;
        if (N == 0) {
            Action.showNotification(notFoundMessage);
            return;
        }
        console.log("Lover ID ||       Lover Name       ||  Zodiac Sign  ||   Origin   ||  YOB  ||  Hobby");
        for (let i = 0; i < N; i++) {
            let currentLover = this.loverList[i];
            let blankID = 8 - currentLover.loverID.toString().length;
            let blankName = 22 - currentLover.loverName.length;
            let blankZodiac = 13 - currentLover.zodiacSign.length;
            let blankOrigin = 10 - currentLover.origin.length;
            let blankYOB = 5 - currentLover.YOB.toString().length;
            console.log(`${(" ").repeat(blankID)}${currentLover.loverID} || ${currentLover.loverName}${(" ").repeat(blankName)}`
                +` || ${(currentLover.zodiacSign)}${(" ").repeat(blankZodiac)} || ${currentLover.origin}${(" ").repeat(blankOrigin)}`
                + ` || ${(" ").repeat(blankYOB)}${currentLover.YOB} || ${currentLover.hobby}`);
        }
    }
}