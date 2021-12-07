import React, { useState } from 'react';
import axios from 'axios';

import AddOrder from './AddOrder';
import OrderList from './OrderList';


const OrderProduct = ({ products, setProducts }) => {

  const [orderProducts, setOrderProducts] = useState([])
  const [ user, setUser ] = useState('')

  const submitOrder = async (event) => {
    event.preventDefault()
    const location = event.target[1].value

    if (user === '' || location === '') {
      window.alert('fill all fields')
      return;
    }

    const order = {
      user: user,
      location: location,
      items: orderProducts
    }

    try {
      const res = await axios.post(`${process.env.REACT_APP_ORDER_SERVICE_URL}/api/order`, order)
      console.log(res.status, res.data);
      const res_pords = await axios.get(`${process.env.REACT_APP_INVENTORY_SERVICE_URL}/api/products/`)
      setProducts(res_pords.data)
      setOrderProducts([])
    } catch (error) {
      const msg = error.response.data.message ? error.response.data.message : ''
      window.alert(`Error happened, ${msg}\n click ok to continue`)
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
          />
        </div>
        <div>
          <label>Location: </label>
          <select >
            <option value=''></option>
            {products[0].locations.map(l => 
              <option key={l.location} value={l.location}>{l.location}</option>  
            )}
          </select>
        </div>
        <button type='submit' className='green-btn'>Order products</button>
      </form>
      <AddOrder products={products} 
        setOrderProducts={setOrderProducts} 
        orderProducts={orderProducts}
      />
      <OrderList orderProducts={orderProducts} setOrderProducts={setOrderProducts}/>
    </div>
  )
}

export default OrderProduct;