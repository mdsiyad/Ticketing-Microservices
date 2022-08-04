import express  from "express";
const router = express.Router();

router.post('/api/users/signout',(req,res)=>{
    req.session = null
    res.status(200).json({
        message:"User logged out",
        });
    }
    );

    export {router as signoutRouter};
