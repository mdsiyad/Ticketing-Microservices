import { Publisher,OrderCreatedEvent,Subjects } from "@microgittix/common";
export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent>{
    subject: Subjects.OrderCreated = Subjects.OrderCreated;
}