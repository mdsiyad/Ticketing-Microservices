import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'

export const OrdersIndex = ({orders}) => {
  return (
    <div>
        <h1>My Orders</h1>
        <ul>
            {orders.map(order => <li key={order.id}>{order.ticket.title} - {order.status}</li>)}
        </ul>
        

    </div>
  )
}

OrdersIndex.getInitialProps = async (context, client) => {
    const { data } = await client.get('/api/orders');

    return { orders: data };
    };




export default OrdersIndex