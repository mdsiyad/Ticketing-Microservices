import nats,{Message} from 'node-nats-streaming'
import { json } from 'stream/consumers';
import {TicketCreatedPublisher} from './events/ticket-created-publisher'


console.clear();
const stan = nats.connect('ticketing','test',{
    url:"http://localhost:4222"
})

stan.on('connect', async () =>{
    try {
        console.log('publisher connected to nats');
    
   const ticketPublisher = new TicketCreatedPublisher(stan);
    await ticketPublisher.publish({
        id:'123',
        title:"stadium event",
        price:200,
   })
    } catch (error) {
        console.error(error)
    }
    
})