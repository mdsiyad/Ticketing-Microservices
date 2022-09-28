import { Message } from "node-nats-streaming";
import { Subjects,Listener, TicketUpdatedEvent } from "@microgittix/common";
import { Ticket } from "../../models/ticket";
import { QueueGroupName } from "./queue-group-name";

export class TicketUpdatedListener extends Listener<TicketUpdatedEvent> {
    subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
    queueGroupName = QueueGroupName;
    
    // async onMessage(data: TicketUpdatedEvent["data"], msg: Message) {
    //     console.log("Update Event data!", data);

    //     Ticket.findByIdAndUpdate(data.id, {
    //         title: data.title,
    //         price: data.price,

    //     }, function(err, result) {
    //         if (err) {
    //             throw new Error(err.message);
    //         } else {
    //             console.log(result);
    //         }
    //     });

       
        

      

    //     msg.ack();
        
    // }


    async onMessage(data: TicketUpdatedEvent['data'], msg: Message) {
        console.log('Update Event came!', data);
        const ticket = await Ticket.findByEvent(data);
    
        if (!ticket) {
          throw new Error('Ticket not found');
        }
    
        const { title, price } = data;
        ticket.set({ title, price });
        await ticket.save();
    
        msg.ack();
      }
    }