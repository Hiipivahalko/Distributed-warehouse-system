import React, { useState, useEffect } from 'react';
import axios from 'axios';


const OrderHistory = () => {

  const [ orders, setOrders ] = useState([])
  

  const find_orders = async () => {
    try {
      const result = await axios.get(`${process.env.REACT_APP_ORDER_SERVICE_URL}/api/order/`);
      console.log('result status', result.status);
      if (result.status >= 400) {
        console.log(result.data);
      } else {  
        console.log('result_data:', result.data)
        setOrders(result.data);
      }
    } catch (err) {
      console.log(err.message);
    }
  }

  useEffect( () => { 
    find_orders();
  }, [])


  const fecthOrders = async (event) => {
    event.preventDefault()
    await find_orders();
    console.log('orders fetched');
  }

  const clearHistory = async (event) => {
    event.preventDefault()
    try {
      await axios.delete(`${process.env.REACT_APP_ORDER_SERVICE_URL}/api/order/clearHistory`);
      setOrders([])
      console.log('history cleared');
    } catch (error) {
      console.log('error when trying to delete order history', error.message );
    }
    
  }

  return (
    <>
      <button onClick={fecthOrders} className='dark-btn'>Fetch orders</button>
      <button onClick={clearHistory} className='dark-btn'>Remove all history</button>
      <div>
      <h3>Order History:</h3>
        { orders.length > 0 ? 
        <ul>
          {orders.map(o => 
            <div className='history-item' key={o.id}>
              <p>"user": {o.user}</p>
              <p>"location": {o.location},</p>
              <p>"time": {o.time},</p>
              <p>items:</p>
              {o.items.map(i => 
                <div key={i.id} className='history-item-product'>
                  <p>id: {i.id}</p>
                  <p>name: {i.name}</p>
                  <p>warehouse location: {i.location}</p>
                  <p>amount: {i.amount}</p>
                </div>
              )}
            </div>
          )}
        </ul>
        : 
        <p>We dont have any orders yet</p>
      }
      </div>

    </>
  )
}

export default OrderHistory;