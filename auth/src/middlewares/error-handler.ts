import { Request, Response, NextFunction } from "express";
import { RequestValidationError } from "../errors/request-validation-error";
import { DatabaseConnectionError } from "../errors/database-error";
import { CustomError } from "../errors/custom-error";
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("wrong : ", err);

  if (err instanceof CustomError) {
    console.log("-> ERRR : ", err.statusCode, err.serializeErrors())
    return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  }

  res.status(400).send({ errors: [{ message: "err.message" }] });
};
