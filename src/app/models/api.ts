import { ApiError } from "./api-error";

export class API<T> {
    errors?: ApiError[];
    data?: T;
}
