import {Publisher} from './base-publisher'
import {Message} from 'node-nats-streaming'
import { TicketCreatedEvent } from './ticket-created-event';
import { Subjects } from './subjects';
export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent>{
   readonly subject = Subjects.TicketCreated;



}

