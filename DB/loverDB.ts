import {LoverManager} from "../model/lover-manager";
import {Lover} from "../model/lover";

export const LOVERS: LoverManager = new LoverManager();
//
// let admin1 = new User(ADMINS.generateNewID(),"admin", "admin");
// ADMINS.addCustomer(admin1);

let user1 = new Lover(LOVERS.generateNewID(),"giang","Gemini", "HN",1997, "Music");
LOVERS.addLover(user1);
// LOVERS.setLocked(1);

let user2 = new Lover(LOVERS.generateNewID(),"ning", "Virgo", "HCM",1998, "Dance");
LOVERS.addLover(user2);

let user3 = new Lover(LOVERS.generateNewID(),"link", "Sagittarius", "DN",1995, "Sing");
LOVERS.addLover(user3);

// LOVERS.showDBAsTable()