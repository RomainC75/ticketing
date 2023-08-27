import express, { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { User } from "../models/user.model";
import { Password } from "../services/password";
import jwt from "jsonwebtoken";
import { validateRequest, BadRequestError } from "@mychnrdorg/common";

const router = express.Router();

router.post(
  "/api/users/signin",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password").trim().notEmpty().withMessage("You must apply a password"),
  ],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    const foundUser = await User.findOne({ email });
    if (!foundUser) {
      return next(new BadRequestError("Invalid Credentials"));
    }
    const passwordMatch = Password.compare(foundUser.password, password);
    if (!passwordMatch) {
      return next(new BadRequestError("Invalid Credentials"));
    }

    //generat JWT
    const userJwt = jwt.sign(
      {
        id: foundUser.id,
        email: foundUser.email,
        // -! because we do the check in index.ts
      },
      process.env.JWT_KEY!
    );
    //store it on session object
    req.session = {
      jwt: userJwt,
    };
    res.status(200).send(foundUser);
  }
);

export { router as signinRouter };
