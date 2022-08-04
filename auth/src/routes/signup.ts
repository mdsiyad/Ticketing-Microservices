import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { RequestValidationError } from "../errors/request-validation-errors";
import { DatabaseConnectionError } from "../errors/database-connection-error";
import { User } from "../models/user";
import { BadRequestError } from "../errors/bad-request-error";
import jwt from 'jsonwebtoken'
// var jwt = require('jsonwebtoken');

const router = express.Router();


router.post('/api/users/signup', [body('email').isEmail().withMessage('Email must be valid'),
body('password').trim().isLength({ min: 6, max: 20 }).withMessage('Password must be at least 4 characters')], async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {

        throw new RequestValidationError(errors.array());

    }
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        console.log('User already exists');
        throw new BadRequestError('User already exists');
    } else {


        //save user to database
        console.log('request came')
        const user = new User({ email, password });
        const savedUser = await user.save();
        const userJwt = jwt.sign({
            id: user.id,
            email: user.email
        }, 'secret')

        req.session = {
            jwt:userJwt
        };

        res.status(201).send(savedUser);

    }


});

export { router as signupRouter };

