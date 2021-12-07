import React from 'react';

const Order = ({ order }) => {

  return (
    <div className='order'>
      {order.name}: {order.amount}
    </div>
  )
}

const OrderList = ({ orderProducts, setOrderProducts }) => {
  
  return (
    <>
      <h4>Order List:</h4>
      {orderProducts.length > 0 ? 
        <button onClick={() => setOrderProducts([])} className='red-btn'>
          Clear order list
        </button>
        :
        null
      }
      {orderProducts.length > 0 ?
        orderProducts.map(o =>
          <Order key={o.name} order={o}/>  
        ) :
        <p>No order items yet</p>
      }
    </>
  )
}

export default OrderList;