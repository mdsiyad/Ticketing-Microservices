import express, { Request, Response } from 'express';
import { NotFoundError, requireAuth,validateRequest } from "@microgittix/common";
import { Ticket } from '../models/ticket';

const router = express.Router();

router.get('/api/tickets/:id', async (req:Request,res:Response) => {
    console.log(req.params.id)
        const ticket = await Ticket.findById(req.params.id);

        if(!ticket){
            throw new NotFoundError()
            // res.status(400).send({message:"failed"})
        } else{
    
            res.send(ticket);
        }
    
   
})



export { router as showTicketRouter };