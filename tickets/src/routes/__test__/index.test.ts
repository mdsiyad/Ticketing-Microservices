import request from 'supertest'
import app from '../../app'
import {Ticket} from '../../models/ticket'
jest.mock('../../nats-wrapper');

const createTicket = () => {
    return  request(app).post('/api/tickets')
    .set('Cookie',global.signin())
     .send({
         title:'alomodome',
         price:200
     })
     .expect(201)
}

// it('returns a list of tickets', async () => {

//   await createTicket();
//   await createTicket();
//   await createTicket();

//   const response = await  request(app).get('/api/tickets')
//   .set('Cookie',global.signin())
//    .send()
//    .expect(200)


//    expect(response.body.length).toEqual(3)
// })