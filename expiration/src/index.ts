import { OrderCreatedListener } from "./events/listeners/order-created-listener";
import { natsWrapper } from "./nats-wrapper";
//connect to mongoDb
const start = async () => {



  if(!process.env.NATS_CLIENT_ID){
    throw new Error('NATS_CLIENT_ID Must Be Defined')
  }
  if(!process.env.NATS_URL){
    throw new Error('NATS_URL Must Be Defined')
  }
  if(!process.env.NATS_CLUSTER_ID){
    throw new Error('NATS_CLUSTER_ID Must Be Defined')
  }


  try {
    await natsWrapper.connect(
      process.env.NATS_CLUSTER_ID,
      process.env.NATS_CLIENT_ID,
      process.env.NATS_URL

    );


    await natsWrapper.client.on('close',()=>{
        console.log('NATS connection closed!');
        process.exit();
    })
    process.on('SIGINT',()=> natsWrapper.client.close());
    process.on('SIGTERM',()=> natsWrapper.client.close());

    

    new OrderCreatedListener(natsWrapper.client).listen();

  } catch (error) {
    console.error(error)
  }


}

start();


