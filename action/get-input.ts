import {Action} from "./action";
import {ZODIAC} from "../DB/ZodiacList";
import {LoverManager} from "../model/lover-manager";
// import {ZODIAC} fron "../DB/ZodiacList"
// import {UserDB} from "../model/manager/user-d-b";
// import {StorageDB} from "../model/manager/storage-d-b";
// import {Cart} from "../model/cart";
// import {LoginPanel} from "../menu/login";
// import {LoverManager} from "../model/lover-manager";

const readlineSync = require("readline-sync");

export class GetInput {
    static regString = /(?=.*[a-zA-Z])([a-zA-Z0-9!@#$%^&* ]{1,20})$/;
    static defaultMPCQuestion = "What would you like to do?:";

    static getString(label: string, parentMenu: Function): string {
        let wrongMenu: Array<string> = ["Re-input", "Back to previous menu"];
        let question = `Input ${label}: `;
        let aString = readlineSync.question(question);
        let regExCheck = GetInput.regString.test(aString);
        while (!regExCheck) {
            Action.showNotification("WRONG INPUT, MUST CONTAIN A LETTER")
            let index = readlineSync.keyInSelect(wrongMenu, GetInput.defaultMPCQuestion);
            switch (index) {
                case 0:
                    aString = readlineSync.question(question);
                    regExCheck = GetInput.regString.test(aString);
                    break;
                case 1:
                    parentMenu();
                    break;
                case -1:
                    if (GetInput.getConfirmation(parentMenu, "you want to exit")) {
                        Action.sayBye();
                    }
                    break;
            }
        }
        return aString;
    }

    static getZodiac(): string {
        let menu = ["1. Aries (Ram): March 21-April 19",
                    "2. Taurus (Bull): April 20-May 20",
                    "3. Gemini (Twins): May 21-June 21",
                    "4. Cancer (Crab): June 22-July 22",
                    "5. Leo (Lion): July 23-August 22",
                    "6. Virgo (Virgin): August 23-September 22",
                    "7. Libra (Balance): September 23-October 23",
                    "8. Scorpius (Scorpion): October 24-November 21",
                    "9. Sagittarius (Archer): November 22-December 21",
                    "10. Capricornus (Goat): December 22-January 19",
                    "11. Aquarius (Water Bearer): January 20-February 18",
                    "12. Pisces (Fish): February 19-March 20]"];
        for (let i = 0; i < menu.length; i++) {
            console.log(menu[i]);
        }
        let index: number;
        do {
            index = +readlineSync.question("Which Zodiac sign? ")
        } while (index <1 || index > 12 )
        return ZODIAC[index-1];

    }

    static receiveUserID(DB: LoverManager, parentMenu: Function): number {
        let wrongMenu: Array<string> = ["Re-input", "Back to previous menu"];
        DB.showAsTable();
        let userID: number = +(readlineSync.question("Input user ID of choice: "));
        while (!DB.checkValidLoverIDInput(userID)) {
            Action.showNotification("WRONG ID")
            let index = readlineSync.keyInSelect(wrongMenu, `What would you like to do?:`);
            switch (index) {
                case 0:
                    DB.showAsTable();
                    userID = +(readlineSync.question("Input user ID of choice: "));
                    break;
                case 1:
                    parentMenu();
                    break;
                case -1:
                    if (GetInput.getConfirmation(parentMenu, "you want to exit")) {
                        Action.sayBye();
                    }
                    break;
            }
        }
        return userID;
    }

    static getConfirmation(parentMenu: Function,message: string = "", userID?: number): boolean {
        // let menu: Array<string> = ["YES", "NO"];
        let answer: string = "";
        do {
            answer = readlineSync.question(`Are you sure ${message} [Y/N]?: `).toUpperCase();
            switch (answer) {
                case "Y":
                    return true;
                case "N":
                    parentMenu(userID);
                    break;
            }
        } while (answer != "Y" && answer != "N")
        return false;
    }
    static getNumber(label: string, parentMenu: Function): number {
        let wrongMenu: Array<string> = ["Re-input", "Back to previous menu"];
        let question = `Input ${label}: `;
        let number = +readlineSync.question(question);
        while (isNaN(number) || number === 0) {
            Action.showNotification("WRONG INPUT, MUST BE AN INTEGER > 0")
            let index = readlineSync.keyInSelect(wrongMenu, GetInput.defaultMPCQuestion);
            switch (index) {
                case 0:
                    number = +readlineSync.question(question);
                    break;
                case 1:
                    parentMenu();
                    break;
                case -1:
                    if (GetInput.getConfirmation(parentMenu, "you want to exit")) {
                        Action.sayBye();
                    }
                    break;
            }
        }
        return number;
    }

}