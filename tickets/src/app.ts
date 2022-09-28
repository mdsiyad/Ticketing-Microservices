import express from "express";
import 'express-async-errors';

import { NotFoundError,errorHandler,currentUser } from "@microgittix/common";
import cookieSession from "cookie-session";
import { CreateTicketRouter } from "./routes/new";
import { indexTicketRouter } from "./routes/index";
import { showTicketRouter } from "./routes/show";
import { updateTicketRouter } from "./routes/update";

const app = express();
app.set('trust proxy',true)
app.use(express.json());
app.use(
  cookieSession({
    signed:false,
    secure:process.env.NODE_ENV !== "test"
  })
)
// app.use(express.json({}))

app.use(currentUser)


// app.use(express.urlencoded({ extended: true }));



app.use(updateTicketRouter);
app.use(indexTicketRouter);
app.use(showTicketRouter);
app.use(CreateTicketRouter);

app.all('*', async(req,res,next)=>{
  
  throw new NotFoundError();
})

app.use(errorHandler);

export default app