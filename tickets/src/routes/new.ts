import express,{Request,Response} from "express";
import { requireAuth,validateRequest } from "@microgittix/common";
import { body } from "express-validator";
import { Ticket } from "../models/ticket";
import { TicketCreatedPublisher } from "../events/publishers/ticket-created-publisher";
import { natsWrapper } from "../nats-wrapper";

const router = express.Router();



router.post('/api/tickets',requireAuth,[
    body('title').not().isEmpty()
    .withMessage('title cannot be empty'),
    body('price')
    .isFloat({gt:0})
    .withMessage('price must be greater than 0')
],validateRequest, async (req:Request,res:Response) => {
    
    const {title,price} = req.body;
    const ticket = new Ticket({title,price,userId:req.currentUser!.id})
    const savedTicket = await ticket.save();
    console.log(savedTicket)
    new TicketCreatedPublisher(natsWrapper.client).publish({
        id:savedTicket.id,
        title:savedTicket.title,
        price:savedTicket.price,
        userId:savedTicket.userId,
        version:savedTicket.version
    });

    res.status(201).send(savedTicket)
    
})

export {router as CreateTicketRouter}