import { Schema, model, connect } from 'mongoose';
import {updateIfCurrentPlugin} from 'mongoose-update-if-current';

interface ITicket {
    title: string;
    price: number;
    userId:string;
    version: number;
    orderId?: string;

  }
const ticketSchema = new Schema<ITicket>({
    title: { type: String, required: true },
    price: { type: Number, required: true },
    userId: { type: String, required: true },
    orderId: { type: String },
  },{
    toJSON:{
      transform(doc,ret){
        ret.id = ret._id;
        delete ret._id;
      }
    }
  });

  ticketSchema.set('versionKey','version');
ticketSchema.plugin(updateIfCurrentPlugin);
 


  const Ticket = model<ITicket>('Ticket', ticketSchema);

//   const buildUser = (attrs:IUser) => {
//     return new User(attrs);

//   }

//   const user = new User({
//     name: 'Bill',
//     email: 'bill@initech.com',
//     avatar: 'https://i.imgur.com/dM7Thhn.png'
//   });
//   await user.save();

    export  {Ticket};