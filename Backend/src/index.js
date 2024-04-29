import dotenv from "dotenv";
dotenv.config({
  path: "./.env",
});
import connectDB from "./DB/connect.js";
import { app } from "./app.js";

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`port is running on ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log("ERROR IS : ", error);
    process.exit(1);
  });










  

/*
import { DB_NAME } from "./constants.js";
import express from 'express'
import mongoose from "mongoose";
const app=express()
const port = process.env.PORT||8000
import 'dotenv/config';

(()=>{
    try {
        mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log("database connected");
        app.on("error",(e)=>{
            console.log("Error is :",e);
        })

        app.listen(port,()=>{
            console.log("app is running on port",port);
        })
    } catch (error) {
        console.log("Error is ");
    }
})()
*/
