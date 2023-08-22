interface ICustomError {
  message: string;
  field?: string;
}

export abstract class CustomError extends Error {
  abstract statusCode: number;

  constructor(mesaage: string) {
    super();
    Object.setPrototypeOf(this, CustomError.prototype);
  }

  abstract serializeErrors(): ICustomError[];
}
