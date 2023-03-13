import {LOVERS} from "../DB/loverDB";
import {Lover} from "../model/Lover";
import {Action} from "../action/action";
import {GetInput} from "../action/get-input";
import chalk = require("chalk");

const readlineSync = require('readline-sync');

export class Menu {
    static menu: Array<string> = ["Show Lovers", "Find Lover", "Add Lover", "Edit Lover", "Remove Lover"];
    static menuNavigation(): void {
        Action.showMenuName("MANAGE LOVER PROGRAM");
        let index = readlineSync.keyInSelect(Menu.menu, 'What would you like to do? ');
        // console.log(index);
        switch (index) {
            case 0:
                break;
            case 1:
                Menu.searchByName()
                break;
            case 2:
                Menu.addUser();
                break;
            case 3:
                Action.showMenuName("LOVER LIST");
                LOVERS.showAsTable();
                Menu.editUser();
                break;
            case 4:
                Action.showMenuName("LOVER LIST");
                LOVERS.showAsTable();
                Menu.removeUser();
                break;
            case -1:
                // if (GetInput.getConfirmation(Menu.menuNavigation, "you want to exit")) {
                    Action.sayBye();
                // }
                break;
        }
        switch (index) {
            case 0:
            case 2:
            case 3:
            case 4:
                Action.showMenuName("LOVER LIST");
                LOVERS.showAsTable();
                break;
        }
        switch (index) {
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
                Action.pause();
                Menu.menuNavigation();
                break;
        }
    }

    static searchByName():void {
        let name = readlineSync.question("Input name to search: ");
        LOVERS.showAsTable(LOVERS.findByNearestName(name), "NO SUITABLE DATA");
    }
    static addUser(): void {
        Action.showMenuName("ADD LOVER");
        let name: string = GetInput.getString("lover name",Menu.menuNavigation);
        let zodiac: string = GetInput.getZodiac();
        // console.log(zodiac);
        let origin: string = GetInput.getString("origin",Menu.menuNavigation);
        let YOB: number = GetInput.getNumber("YOB", Menu.menuNavigation);
        let hobby: string = GetInput.getString("hobby",Menu.menuNavigation);
        // let password = GetInput.getPasswordToChange("", Menu.menuNavigation);
        // let userID = LOVERS.generateNewID();
        LOVERS.addLover(new Lover(LOVERS.generateNewID(), name, zodiac, origin, YOB, hobby));
        Action.showNotification("Successfully added new user");
    }

    static editUser(): void {
        Action.showMenuName("EDIT LOVER");
        let loverID: number = GetInput.getNumber("lover ID", Menu.menuNavigation);
        if (!LOVERS.checkValidLoverIDInput(loverID)) {
            Action.showNotification("THAT LOVER DOES NOT EXIST")
        } else {
            let index = LOVERS.findIndexByLoverID(loverID);
            let lover = LOVERS.getLoverByIndex(index);
            let name: string = GetInput.getString("lover name", Menu.menuNavigation);
            let zodiac: string = GetInput.getZodiac();
            // console.log(zodiac);
            let origin: string = GetInput.getString("origin", Menu.menuNavigation);
            let YOB: number = GetInput.getNumber("YOB", Menu.menuNavigation);
            let hobby: string = GetInput.getString("hobby", Menu.menuNavigation);
            // let oldUsername = customer.username;
            // let newUsername: string = GetInput.getUsernameToChange(oldUsername, LOVERS, Menu.editUser);
            // let oldPassword = customer.password;
            // let newPassword = GetInput.getPasswordToChange(oldPassword, Menu.editUser);
            let newLover = new Lover(lover.loverID, name, zodiac, origin, YOB, hobby)
            LOVERS.replaceCustomerInfo(lover.loverID, newLover);
            Action.showNotification(`Successfully change user ID ${lover.loverID}`);
        }
    }

    static removeUser(): void {
        Action.showMenuName("REMOVE LOVER");
        let loverID: number = GetInput.getNumber("lover ID", Menu.menuNavigation);
        if (!LOVERS.checkValidLoverIDInput(loverID)) {
            Action.showNotification("THAT LOVER DOES NOT EXIST")
        } else {
            if (GetInput.getConfirmation(Menu.removeUser,`you want to ${chalk.red("DELETE")} lover with ID ${chalk.redBright(loverID)}`)) {
                LOVERS.deleteLover(loverID);
                Action.showNotification(`Successfully remove lover with ID ${loverID}`);
            }
        }

        // let userID: number = GetInput.receiveUserID(LOVERS, Menu.menuNavigation);
        // if (GetInput.getConfirmation(Menu.removeUser,`you want to ${chalk.red("DELETE")} user ID ${chalk.redBright(userID)}`)) {
        //     LOVERS.deleteCustomer(userID);
        //     Action.showNotification(`Successfully remove user ID ${userID}`);
        // }
    }

}