import {
    PaymentCreatedEvent,
    Subjects,
    Publisher,
    OrderStatus,
  } from '@microgittix/common';

    export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
        subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
        }
//