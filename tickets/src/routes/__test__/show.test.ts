import request from 'supertest'
import app from '../../app'
import {Ticket} from '../../models/ticket'
import mongoose from 'mongoose'
jest.mock('../../nats-wrapper');

it('returns 404 if ticket is not find', async () => {
    const id = new mongoose.Types.ObjectId().toHexString();
    await request(app).get(`/api/tickets/${id}`)
    .send()
    .expect(404)
})

// it('returns ticket if ticket is found', async () => {
//    const response = await request(app).post('/api/tickets')
//    .set('Cookie',global.signin())
//     .send({
//         title:'test',
//         price:20
//     })
//     .expect(201)

//     const ticketResponse = await request(app).get(`/api/tickets/${response.body.id}`)
//     .send()
//     .expect(200)

//     expect(ticketResponse.body.title).toEqual('test')
//     expect(ticketResponse.body.price).toEqual(20)
// })