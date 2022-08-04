import { CustomError } from "./custom-error";

export class NotFoundError extends CustomError{
    statusCode : number =  404;
    reason = "Not Found";
    constructor(){
        super('Not Found');
        //Only because we are extending built in class
        Object.setPrototypeOf(this,NotFoundError.prototype);
    }

    serializeError(){
        return [{
            message:this.reason

        }]
    }

}