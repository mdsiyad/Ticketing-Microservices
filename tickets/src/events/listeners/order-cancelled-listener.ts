import { Message } from "node-nats-streaming";
import { Subjects,Listener, OrderCancelledEvent } from "@microgittix/common";
import { QueueGroupName } from "./queue-group-name";
import { Ticket } from "../../models/ticket";
import { TicketUpdatedPublisher } from "../publishers/ticket-updated-publisher";
export class OrderCancelledListener extends Listener<OrderCancelledEvent> {
    subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
    queueGroupName = QueueGroupName;
    
    async onMessage(data: OrderCancelledEvent["data"], msg: Message) {

        //find the ticket that the order is reserving
          const ticket = await Ticket.findById(data.ticket.id);

        //if no ticket, throw error  
        if(!ticket){
            throw new Error('Ticket not found');
        }

        //mark the ticket as being reserved by setting its orderId property
        ticket.set({orderId: undefined});

        //save the ticket
        await ticket.save();
        new TicketUpdatedPublisher(this.client).publish({
            id: ticket.id,
            title: ticket.title,
            price: ticket.price,
            userId: ticket.userId,
            version: ticket.version,
            orderId: ticket.orderId
        });
       
    }
    }