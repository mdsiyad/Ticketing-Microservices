
    // const options =stan.subscriptionOptions().setManualAckMode(true).setDeliverAllAvailable().setDurableName('ticket-service')
    // const subscription = stan.subscribe('ticket:created','listenQueueGroup',options);
    // const subscription = stan.subscribe('ticket:created',options);
    // subscription.on('message',(msg:Message) => {

    //     const data = msg.getData();
    //     if(typeof data === 'string'){
    //         console.log(`Received event: #${msg.getSequence()} , with data: ${data}`)
    //     }
    //     msg.ack();
    // })