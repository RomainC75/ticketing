import { CustomError } from "./custom-error";

export class DatabaseConnectionError extends CustomError {
  statusCode = 400;
  reason = "Error connecting to database";
  constructor(private errors: string) {
    super("Error connecting to database");

    // to build a built in class
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  serializeErrors() {
    return [{ message: this.reason }];
  }
}
