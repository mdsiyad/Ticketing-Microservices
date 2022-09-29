import request from 'supertest'
import app from '../../app'

it('returns a 201 successful signup', async () => {
    return request(app).post('/api/users/signup').send({
        email:"me@hormuud.com",
        password:"123456789"
    }).expect(201)
})
it('returns a 400 invalid  password', async () => {
    await request(app).post('/api/users/signup').send({
        email:"me@hormuud.com",
        password:"123"
    }).expect(400)
})

// it('returns a 400 invalid  email', async () => {
//     await request(app).post('/api/users/signup').send({
//         email:"caalamicade@gmail.com",
//         password:"123"
//     }).expect(400)
// })

it('returns a 400 missing email or password', async () => {
    await request(app).post('/api/users/signup').send({
        email:"caalamicade@gmail.com",
        password:"123"
    }).expect(400)

    await request(app).post('/api/users/signup').send({
        // email:"",
        // password:""
    }).expect(400)
})


// it('returns duplicate email', async () => {
//     await request(app).post('/api/users/signup').send({
//         email:"caalamicade@gmail.com",
//         password:"123456789"
//     }).expect(201)

//     await request(app).post('/api/users/signup').send({
//         email:"caalamicade@gmail.com",
//         password:"123456789"
//     }).expect(400)
// })


it('sets a cookie after successfully signUp', async () => {
    const response = await request(app).post('/api/users/signup').send({
        email:"me@hormuud.com",
        password:"123456789"
    }).expect(201)

    expect(response.get('Set-Cookie')).toBeDefined();
})