import chalk = require("chalk");

export class Action {
    static sayBye():void {
        // GetInput.getConfirmation()
        console.log(chalk.bold.magentaBright("Bye bye!"));
        // DB.save();
        process.exit();
    }

    static pause(): void {
        const readlineSync = require('readline-sync');
        readlineSync.question(chalk.greenBright("Press Enter to continue..."));
    }

    static showMenuName(name: string): void {
        console.log()
        console.log("=".repeat(5),chalk.cyanBright.bold(name),"=".repeat(5))
    }

    static showNotification(notification: string): void {
        console.log("!".repeat(5),chalk.redBright(notification),"!".repeat(5))
    }
}