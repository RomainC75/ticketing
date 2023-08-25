import { CustomError, ICustomError } from "./custom-error";

export class NotAuthorized extends CustomError {
  statusCode = 401;

  constructor() {
    super('Not Authorized');
    Object.setPrototypeOf(this, NotAuthorized.prototype);
  }

  serializeErrors(): ICustomError[] {
    return [
      {
        message: "Not authorized",
      },
    ];
  }
}
