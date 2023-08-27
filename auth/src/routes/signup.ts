import express, { Request, Response, NextFunction } from "express";
import { body } from "express-validator";
import { User } from "../models/user.model";
import { validateRequest, BadRequestError } from "@mychnrdorg/common";

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
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      
      const foundUser = await User.findOne({ email });
      if (foundUser) {
        throw new BadRequestError('email already exists!')
      }
      
      const user = User.build({ email, password });
      await user.save();

      
      res.status(201).send(user);
    } catch (error) {
        next(error)
    }
  }
);

export { router as signupRouter };
