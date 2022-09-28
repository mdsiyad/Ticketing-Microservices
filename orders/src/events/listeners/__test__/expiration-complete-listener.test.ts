import { ExpirationCompleteListener } from "../expiration-compelete-listener";
import { natsWrapper } from "../../../nats-wrapper";
import { Order } from "../../../models/order";
import { OrderStatus, ExpirationCompleteEvent } from "@microgittix/common";
import mongoose from "mongoose";
import { Message } from "node-nats-streaming";
import { Ticket } from "../../../models/ticket";

const setup = async () => {
    // Create an instance of the listener
    const listener = new ExpirationCompleteListener(natsWrapper.client);
    
    // Create and save a ticket
    const ticket = Ticket.build({
        id: new mongoose.Types.ObjectId().toHexString(),
        title: "concert",
        price: 20,
    });
    await ticket.save();
    
    // Create and save an order
    const order = Order.build({
        status: OrderStatus.Created,
        userId: "asdf",
        expiresAt: new Date(),
        ticket,
    });
    await order.save();
    
    // Create a fake data event
    const data: ExpirationCompleteEvent["data"] = {
        orderId: order.id,
    };
    
    // Create a fake message object
    // @ts-ignore
    const msg: Message = {
        ack: jest.fn(),
    };
    
    // Return all of this stuff
    return { listener, order, ticket, data, msg };
};

it("updates the order status to cancelled", async () => {
    const { listener, order, ticket, data, msg } = await setup();
    
    await listener.onMessage(data, msg);
    
    const updatedOrder = await Order.findById(order.id);
    
    expect(updatedOrder!.status).toEqual(OrderStatus.Cancelled);
    }
);

it("emits an OrderCancelled event", async () => {
    const { listener, order, ticket, data, msg } = await setup();
    
    await listener.onMessage(data, msg);
    
    expect(natsWrapper.client.publish).toHaveBeenCalled();
    
    const eventData = JSON.parse(
        (natsWrapper.client.publish as jest.Mock).mock.calls[0][1]
    );
    
    expect(eventData.id).toEqual(order.id);
    }
);

it("acks the message", async () => {
    const { listener, order, ticket, data, msg } = await setup();
    
    await listener.onMessage(data, msg);
    
    expect(msg.ack).toHaveBeenCalled();
    }
);


