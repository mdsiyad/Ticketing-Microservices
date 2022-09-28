import { Publisher, Subjects,TicketCreatedEvent,TicketUpdatedEvent } from "@microgittix/common";


class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent>{
    readonly subject = Subjects.TicketUpdated;
}


export {TicketUpdatedPublisher};