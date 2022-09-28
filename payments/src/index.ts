import express from "express";
import mongoose from "mongoose";
import app from "./app";
import { natsWrapper } from "./nats-wrapper";
import { OrderCancelledListener } from "./events/listeners/order-cancelled-listener";
import { OrderCreatedListener } from "./events/listeners/order-created-listener";



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

    new OrderCreatedListener(natsWrapper.client).listen();
    new OrderCancelledListener(natsWrapper.client).listen();

    


   await mongoose.connect(process.env.MONGO_URI,{});
   console.log('MongoDb Connected!')
  } catch (error) {
    console.error(error)
  }
  app.listen(4000, () => {
    console.log("Ticket Server started on port 4000");
  });

}

start();


