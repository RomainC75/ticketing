import { CustomError } from "./custom-error";

export class DatabaseConnectionError extends CustomError {
  statusCode = 400;
  reason = "Error connecting to database";
  constructor() {
    super("Error connecting to database");
    
    // to build a built in class
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
    // this.serializeErrors = this.serializeErrors.bind(this);
    console.log("---> database !", this.serializeErrors())
  }

  public serializeErrors() {
    return [{ message: this.reason }];
  }
}
