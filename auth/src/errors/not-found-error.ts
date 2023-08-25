import { CustomError, ICustomError } from "./custom-error";

export class NotFoundError extends  CustomError{
    statusCode = 404;

    constructor(){
        super('Route not found')
        Object.setPrototypeOf(this, NotFoundError.prototype);
    }
    serializeErrors(): ICustomError[] {
        return [{message : 'Not Found'}];
    }
}