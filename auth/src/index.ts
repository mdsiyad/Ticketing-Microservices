import express from "express";
import mongoose from "mongoose";
import app from "./app";


//connect to mongoDb
const start = async () => {

  console.log("Auth Services Runs ...");
  if(!process.env.MONGO_URI){
    throw new Error('MONGO_URI Must Be Defined')
  }

  try {
    
   await mongoose.connect(process.env.MONGO_URI);
   console.log('MongoDb Connected!')
  } catch (error) {
    console.error(error)
  }
  app.listen(4000, () => {
    console.log("Server started on port 4000");
  });

}

start();


