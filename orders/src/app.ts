import express from "express";
import 'express-async-errors';

import { NotFoundError,errorHandler,currentUser } from "@microgittix/common";
import cookieSession from "cookie-session";
import { indexOrderRouter } from "./routes";
import { newOrderRouter } from "./routes/new";
import { deleteOrderRouter } from "./routes/delete";
import { showOrderRouter } from "./routes/show";

const app = express();
app.set('trust proxy',true)
app.use(express.json());
app.use(
  cookieSession({
    signed:false,
    secure:process.env.NODE_ENV !== "test"
  })
)
app.use(currentUser);

app.use(indexOrderRouter)
app.use(newOrderRouter)
app.use(deleteOrderRouter)
app.use(showOrderRouter)


// app.use(express.urlencoded({ extended: true }));





app.all('*', async(req,res,next)=>{
  
  throw new NotFoundError();
})

app.use(errorHandler);

export default app