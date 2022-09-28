import { Publisher, Subjects,TicketCreatedEvent } from "@microgittix/common";


class TicketCreatedPublisher extends Publisher<TicketCreatedEvent>{
    subject:Subjects.TicketCreated=Subjects.TicketCreated;
}


export {TicketCreatedPublisher};