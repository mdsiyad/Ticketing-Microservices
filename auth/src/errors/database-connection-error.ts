import { CustomError } from "./custom-error";

export class DatabaseConnectionError extends CustomError{
    reason = "Error connecting to database";
    statusCode : number =  500;
    constructor(){
        super('Error connecting to database');
        //Only because we are extending built in class
        Object.setPrototypeOf(this,DatabaseConnectionError.prototype);
    }

    serializeError(){
        return [{
            message:this.reason

        }]
    }
}