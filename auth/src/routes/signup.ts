import express, { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";
import { RequestValidationError } from "../errors/request-validation-error";
import { User } from "../models/user.model";
import { BadRequestError } from "../errors/bad-request-error";

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
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        console.log("-> array : ", errors.array())
        throw new RequestValidationError(errors.array())
      }
      const { email, password } = req.body;

      const foundUser = await User.findOne({ email });
      if (foundUser) {
        console.log("email already exists ! ");
        throw new BadRequestError('email already exists!')
      }

      // const user = User.build({email,password});
      const user = new User({ email, password });
      await user.save();

      res.status(201).send(user);
    } catch (error) {
        next(error)
    }
  }
);

export { router as signupRouter };
