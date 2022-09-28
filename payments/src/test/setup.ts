import {MongoMemoryServer} from 'mongodb-memory-server'
import mongoose from 'mongoose'
import app from '../app'
import request from 'supertest'
import jwt from 'jsonwebtoken'
import { json } from 'express'

jest.mock('../nats-wrapper')

declare global {
    var signin: (id?:string) => string;
}
let mongo : any;
beforeAll(async () => {
    process.env.JWT_KEY = 'asdf'
     mongo = await MongoMemoryServer.create();
    const mongoUri = mongo.getUri();

    await mongoose.connect(mongoUri, {

    })

})


beforeEach(async() => {
    jest.clearAllMocks();
    const collections = await mongoose.connection.db.collections();

    for(let collection of collections){

        collection.deleteMany({})
    }

})

afterAll(async() => {
    await mongo.stop()
    await mongoose.connection.close();
})



global.signin = () =>{



    // const response = await request(app).post('/api/users/signup').send({
    //     email:"caalamicade@gmail.com",
    //     password:"123456789"
    // }).expect(201)
    // const cookie = response.get('Set-Cookie');

    const payload = {
        id: new mongoose.Types.ObjectId().toHexString(),
        emal:"test@test.com"
    };

    const token = jwt.sign(payload, process.env.JWT_KEY!);
    const session = {jwt:token}
    const sessionJson = JSON.stringify(session);
    const base64 = Buffer.from(sessionJson).toString('base64');

    return `session=${base64}`;

}