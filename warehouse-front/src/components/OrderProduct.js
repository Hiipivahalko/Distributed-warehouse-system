import React, { useState } from 'react';
import axios from 'axios';

import AddOrder from './AddOrder';
import OrderList from './OrderList';


const OrderProduct = ({ products, setProducts, setInfo, setError }) => {

  const [ orderProducts, setOrderProducts ] = useState([])
  const [ user, setUser ] = useState('')
  const [ fecthing, setFetching ] = useState(false)

  const submitOrder = async (event) => {
    event.preventDefault()
    setFetching(true)
    const location = event.target[1].value

    // user and location fields must have values
    if (user === '' || location === '') {
      window.alert('fill all fields')
      return;
    }

    const order = {
      user: user,
      location: location,
      items: orderProducts
    }

    try { // try to order products -> sending order to job queue
      const res = await axios.post(`${process.env.REACT_APP_ORDER_SERVICE_URL}/api/order`, order)
      console.log(res.status, res.data);
      setOrderProducts([])
      const msg = res.data.msg ? res.data.msg : 'Order under process, Go check http://localhost:3000/order-history your order status'
      setInfo(msg)
      setTimeout(() => {
        setInfo('')
      }, 10000)
    } catch (error) {
      const msg = error.response.data.message ? error.response.data.message : ''
      setError(`ORDER FAILED:\n ${msg}`)
      setTimeout(() => {
        setError('')
      }, 10000)
    } finally {
      setFetching(false)
    }
    setUser('')
    console.log('form submitted');
  }

  if (products === null) {
    return null
  }

  return (
    <div className='order-form'>
      <h3>Order Prodcuts</h3>
      <form onSubmit={submitOrder}>
        <h4>Order information:</h4>
        <div>
          <label>User: </label>
          <input id='user' type='text' autoComplete='off'
            value={user}
            onChange={e => setUser(e.target.value)}
            disabled={fecthing}
          />
        </div>
        <div>
          <label>Location: </label>
          <select disabled={fecthing}>
            <option value=''></option>
            {products.length === 0 ? <option value=''></option> 
            : products[0].locations.map(l => 
              <option key={l.location} value={l.location}>{l.location}</option>  
            )}
          </select>
        </div>
        <button type='submit' className='green-btn'
          disabled={fecthing}
        >
          Order products
        </button>
      </form>
      <AddOrder products={products} 
        setOrderProducts={setOrderProducts} 
        orderProducts={orderProducts}
        fecthing={fecthing}
      />
      <OrderList orderProducts={orderProducts} setOrderProducts={setOrderProducts}/>
    </div>
  )
}

export default OrderProduct;