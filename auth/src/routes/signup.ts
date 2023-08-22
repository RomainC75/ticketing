import express, { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";
import { RequestValidationError } from "../errors/request-validation-error";
import { DatabaseConnectionError } from "../errors/database-error";

const router = express.Router();

router.post(
  "/api/users/signup",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4 and 20 characters"),
  ],
  (req: Request, res: Response) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        console.log("-> array : ", errors.array())
        throw new RequestValidationError(errors.array())
    }
    const { email, password } = req.body;
    throw new DatabaseConnectionError('db connection problem')

    res.send({})
  }
);

export { router as signupRouter };
