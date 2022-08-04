import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { RequestValidationError } from "../errors/request-validation-errors";
import {validateRequest} from "../middlewares/validate-request"
import { Password } from '../services/passord';
import { BadRequestError } from '../errors/bad-request-error';
import jwt from 'jsonwebtoken'
import { User } from "../models/user";
const router = express.Router();

router.post('/api/users/signin',[
    body('email')
    .isEmail().withMessage('Provide a valid email'),
    body('password').trim().notEmpty().withMessage('Must provide a password')
],validateRequest,async(req:Request,res:Response)=>{

    const { email, password } = req.body;

    
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
        throw new BadRequestError(`Account Doesn't Exists`);
    }

    const passwordsMatch = await Password.compare(
        password,
      existingUser.password
      );
      

    if (!passwordsMatch) {
      throw new BadRequestError('Invalid Credentials');
    }

    // Generate JWT
    const userJwt = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email
      },
      process.env.JWT_KEY!
    );

    // Store it on session object
    req.session = {
      jwt: userJwt
    };

    res.status(200).send(existingUser);

    }
    );

    export {router as signinRouter};
