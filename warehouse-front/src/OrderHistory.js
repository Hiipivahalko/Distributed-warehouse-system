import React, { useState, useEffect } from 'react';
import axios from 'axios';


const OrderHistory = () => {

  const [ orders, setOrders ] = useState([])
  const [ info, setInfo ] = useState('')
  const [ error, setError ] = useState('')
  

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
      console.log('orders fetched');
      setInfo('Order history fetched successfully')
      setTimeout(() => {
        setInfo('')
      }, 5000)
    } catch (err) {
      console.log(err.message);
      setError(`Could not fetch order history: ${err.message}`)
      setTimeout(() => {
        setError('')
      }, 5000)
    }
  }

  useEffect( () => { 
    find_orders();
  }, [])


  const fecthOrders = async (event) => {
    event.preventDefault()
    find_orders();
  }

  const clearHistory = async (event) => {
    event.preventDefault()
    try {
      await axios.delete(`${process.env.REACT_APP_ORDER_SERVICE_URL}/api/order/clearHistory`);
      setOrders([])
      console.log('history cleared');
      setInfo('Order history removed successfully')
      setTimeout(() => {
        setInfo('')
      }, 3000)
    } catch (error) {
      console.log('error when trying to delete order history', error.message );
      setError(`error when trying to delete order history: ${error.message}`)
      setTimeout(() => {
        setError('')
      }, 5000)
    }
    
  }

  return (
    <>
      <div className='main-top'>
        <button onClick={fecthOrders} className='dark-btn'>Fetch orders</button>
        <button onClick={clearHistory} className='dark-btn'>Remove all history</button>
        {info !== '' ? <div className='info'>{info}</div>: null}
        {error !== '' ? <div className='error'>{error}</div>: null}
      </div>
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