import { Tidbit } from "./tidbit";
import { TidbitType } from "./tidbit-type";

export class TidbitDialogData {
    userid: number;
    operation: Operations;
    tidbit?: Tidbit;
    userTidbits?: Tidbit[];
    tidbitTypes?: TidbitType[];
}

export enum Operations {
    CREATE = 1,
    READ = 2,
    UPDATE = 3,
    DESTROY = 4
}
