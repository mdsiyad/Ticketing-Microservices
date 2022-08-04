import express  from "express";
const router = express.Router();

router.get('/api/users/currentUser',(req,res)=>{
    res.status(200).json({
        message:"current user",
        });
    }
    );

    export {router as currentUserRouter};
