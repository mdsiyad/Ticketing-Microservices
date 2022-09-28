import express from "express";
import mongoose from "mongoose";
import app from "./app";
import { natsWrapper } from "./nats-wrapper";
import {TicketCreatedListener} from './events/listeners/ticket-created-listener';
import {TicketUpdatedListener} from './events/listeners/ticket-updated.listener';
import { ExpirationCompleteListener } from "./events/listeners/expiration-compelete-listener";
import { PaymentCreatedListener } from "./events/listeners/payment-created-listener";


//connect to mongoDb
const start = async () => {

  if(!process.env.MONGO_URI){
    throw new Error('MONGO_URI Must Be Defined')
  }

  if(!process.env.JWT_KEY){
    throw new Error('JWT_KEY Must Be Defined')
  }
  if(!process.env.NATS_CLIENT_ID){
    throw new Error('NATS_CLIENT_ID Must Be Defined')
  }
  if(!process.env.NATS_URL){
    throw new Error('NATS_URL Must Be Defined')
  }
  if(!process.env.NATS_CLUSTER_ID){
    throw new Error('NATS_CLUSTER_ID Must Be Defined')
  }


  try {
    await natsWrapper.connect(
      process.env.NATS_CLUSTER_ID,
      process.env.NATS_CLIENT_ID,
      process.env.NATS_URL

    );


    await natsWrapper.client.on('close',()=>{
        console.log('NATS connection closed!');
        process.exit();
    })
    process.on('SIGINT',()=> natsWrapper.client.close());
    process.on('SIGTERM',()=> natsWrapper.client.close());

    new TicketCreatedListener(natsWrapper.client).listen();
    new TicketUpdatedListener(natsWrapper.client).listen();
    new ExpirationCompleteListener(natsWrapper.client).listen();
    new PaymentCreatedListener(natsWrapper.client).listen();


   await mongoose.connect(process.env.MONGO_URI,{});
   console.log('MongoDb Connected!')
  } catch (error) {
    console.error(error)
  }
  app.listen(4000, () => {
    console.log("Order Server started on port 4000");
  });

}

start();


