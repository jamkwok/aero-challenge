export const UNAUTHORIZED = "UnauthorizedError";
export const BAD_REQUEST = "BadRequest";

export function UnAuthorizedException (message: any): void {
    const error = new Error(message);
    error.name = UNAUTHORIZED;
    throw error;
}

export function BadRequestException (message: any): void {
    const error = new Error(message);
    error.name = BAD_REQUEST;
    throw error;
}



