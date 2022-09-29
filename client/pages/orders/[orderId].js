import Timer from "../../components/timer";
import { useEffect, useState } from "react";
import Router from 'next/router';
import Stripecheckout from 'react-stripe-checkout';
import useRequest from '../../hooks/use-request';
const OrderShow = ({ order, currentUser }) => {
    const [timeLeft, setTimeLeft] = useState(0);
    const { doRequest, errors } = useRequest({
        url: '/api/payments',
        method: 'post',
        body: {
            orderId: order.id
        },
        onSuccess: (payment) => Router.push('/orders/[orderId]',`/orders/${order.id}`)
    });

 
    

    useEffect(() => {
        
       const findTimeleft = ( )=> {
        const msLeft = new Date(order.expiresAt) - new Date();
        setTimeLeft(Math.round(msLeft / 1000));

         }
         findTimeleft();
            const timerId = setInterval(findTimeleft, 1000);
            return () => {
                clearInterval(timerId);
            }
    }, []);
        
    if (timeLeft < 0) {
        return <div>Order Expired</div>;
    }
    return <div>
        <h1>Purchasing {order.ticket.title}</h1>
        <h4>Price: {order.ticket.price}</h4>
        <p>Time left to pay: {timeLeft} seconds</p>

        <div className="mt-2">
        <Stripecheckout 
        token={({id}) => doRequest({token:id})}
        stripeKey='pk_test_51LmbSCAND2NCtvU1XskD9dkPAo773G5Z6veJNwCAq8dYkz1k4kvgVRpPeCVtvgo8KlTsXfQT9uSyzGJU1ZWzjFsj00pZNR4uMu'
        amount={order.ticket.price * 100}
        email={currentUser.email}

        />
        </div>
       


    </div>;
};

  
OrderShow.getInitialProps = async (context, client) => {
    const { orderId } = context.query;
    const { data } = await client.get(`/api/orders/${orderId}`);

    return { order: data };
}

export default OrderShow;