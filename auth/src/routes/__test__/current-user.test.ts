import request from 'supertest'
import app from '../../app'
import { currentUser } from '@microgittix/common';


it('responds detail about current user', async () => {

   const cookie = await global.signin();

  const userResponse =  await request(app).get('/api/users/currentUser')
  .set('Cookie',cookie)
  .send()
  .expect(200)
  expect(userResponse.body.currentUser.email).toEqual('caalamiyare@gmail.com')

  console.log(userResponse)
})

it('responds with null if not authenticated', async () => {
  const response =  await request(app).get('/api/users/currentUser')
  .send()
  .expect(200)
  
  expect(response.body.currentUser).toEqual(null);
});