import { Schema, model, connect } from 'mongoose';

import {Password} from '../services/passord'
interface IUser {
    password: string;
    email: string;

  }
const userSchema = new Schema<IUser>({
    email: { type: String, required: true },
    password: { type: String, required: true },
  },{
    toJSON:{
      transform(doc,ret){
        ret.id = ret._id;
        delete ret.password;
        delete ret._id;
        delete ret.__v
      }
    }
  });


  userSchema.pre('save', async function(done) {

    if(this.isModified('password')){
      const hashed = await Password.toHash(this.get('password'));
      this.set('password', hashed)

    }
    done();
  })


  const User = model<IUser>('User', userSchema);

//   const buildUser = (attrs:IUser) => {
//     return new User(attrs);

//   }

//   const user = new User({
//     name: 'Bill',
//     email: 'bill@initech.com',
//     avatar: 'https://i.imgur.com/dM7Thhn.png'
//   });
//   await user.save();

    export  {User};