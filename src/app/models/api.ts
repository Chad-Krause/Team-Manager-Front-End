import { ApiError } from "./api-error";

export class ApiResponse<T> {
    errors?: ApiError[];
    data?: T;
    success?: boolean;
}
