// import request from 'supertest'
// import app from '../../app'


// it('fails when email doesnot  exists', async () => {
//     await request(app).post('/api/users/signin').send({
//         email:"testtest@gmail.com",
//         password:"123456789"
//     }).expect(400)
// })

// it('fails when incorrect password is supplied', async () => {
//     await request(app).post('/api/users/signin').send({
//         email:"caalamicade@gmail.com",
//         password:"1234"
//     }).expect(201)
// })

// it('sets a cookie after successfully in', async () => {


//     await request(app).post('/api/users/signup').send({
//         email:"caalami@gmail.com",
//         password:"123456789"
//     }).expect(201)


//     const response = await request(app).post('/api/users/signin').send({
//         email:"caalami@gmail.com",
//         password:"123456789"
//     }).expect(200)

//     expect(response.get('Set-Cookie')).toBeDefined();
// })