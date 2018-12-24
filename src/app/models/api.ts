import { ApiError } from "./api-error";
import { User } from "./user";
import { Tidbit } from "./tidbit";

export class ApiResponse<T> {
    errors?: ApiError[];
    data?: T;
    success?: boolean;
}

export class AccountDetails {
    user: User;
    tidbits: Tidbit[];
    totalHoursLogged: {
        userid: number, 
        totalTimeLogged: string
    };
}