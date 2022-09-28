import express  from "express";
import jwt from 'jsonwebtoken'
import { currentUser } from "@microgittix/common";
const router = express.Router();


router.get('/api/users/currentUser',currentUser,(req,res)=>{

   res.send({currentUser:req.currentUser || null})
})

    export {router as currentUserRouter};
