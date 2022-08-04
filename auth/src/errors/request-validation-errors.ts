import { ValidationError } from "express-validator";
import {CustomError} from "./custom-error";

export class RequestValidationError extends  CustomError{
    statusCode : number = 400;
    constructor(public errors:ValidationError[]){
        super('Invalid request parameters');
        //Only because we are extending built in class
        Object.setPrototypeOf(this,RequestValidationError.prototype);
    }

    serializeError(){
        return this.errors.map((error)=>{
            return {
                message:error.msg,
                field:error.param
            }
        });
    }
}