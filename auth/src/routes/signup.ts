import express, { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";
import { RequestValidationError } from "../errors/request-validation-error";
import { User } from "../models/user.model";
import { BadRequestError } from "../errors/bad-request-error";
import jwt from 'jsonwebtoken';
import { validateRequest } from "../middlewares/validate-request.mid";

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
