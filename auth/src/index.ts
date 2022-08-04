import express from "express";
import 'express-async-errors';
import { currentUserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { signupRouter } from "./routes/signup";
import {errorHandler} from './middlewares/error-handlers'
import { NotFoundError } from "./errors/not-found-error";
import mongoose from "mongoose";
import cookieSession from "cookie-session";

const app = express();
app.set('trust proxy',true)
app.use(express.json());
app.use(
  cookieSession({
    signed:false,
    secure:true
  })
)
// app.use(express.json({}))


app.use(express.urlencoded({ extended: true }));
app.use(currentUserRouter)
app.use(signinRouter)
app.use(signoutRouter)
app.use(signupRouter)
app.all('*', async(req,res,next)=>{
   
    throw new NotFoundError();
})

app.use(errorHandler);

//connect to mongoDb
const start = async () => {
  try {
    
   await mongoose.connect('mongodb://auth-mongo-srv:27017/auth');
   console.log('MongoDb Connected!')
  } catch (error) {
    console.error(error)
  }
  app.listen(4000, () => {
    console.log("Server started on port 4000");
  });

}

start();


