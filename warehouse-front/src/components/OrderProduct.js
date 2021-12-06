import React, { useState } from 'react';
import axios from 'axios';

const Order = ({ order }) => {

  return (
    <div className='order'>
      {order.name}: {order.amount}
    </div>
  )
}

const AddOrder = ({ products, setOrderProducts, orderProducts }) => {

  const handleOrderAdd = async (event) => {
    event.preventDefault()
    const product_name = event.target[0].value
    const product_amount = parseInt(event.target[1].value)
    const prod = products.find(p => p.name === product_name)

    if (!prod) {
      console.log('something wnet wrong, could not find product');
      return;
    }

    const order = {
      id: prod.id,
      name: product_name,
      amount: product_amount
    }
    const find_res = orderProducts.find(o => o.name === product_name)
    if (find_res) {
      const new_orders = orderProducts.map(o => o.name === product_name ?
        {...o, amount: o.amount + product_amount} : o)
      setOrderProducts(new_orders)
    } else {
      setOrderProducts([...orderProducts, order])
    }
  }

  return (
    <>
      <form onSubmit={handleOrderAdd}>
        <h4>Add item to orderlist:</h4>
        <div>
          <label>Product: </label>
          <select >
            <option value=''></option>
            {products.map(p => 
              <option key={p.name} value={p.name}>{p.name}</option>  
            )}
          </select>
        </div>
        <div>
          <label>Amount: </label>
          <input id='amount' type='number' min='1'/>
        </div>
        <button type='submit' className='yellow-btn'>Add order</button>
      </form>
    </>
  )
}


const OrderProduct = ({ products, setProducts }) => {

  const [orderProducts, setOrderProducts] = useState([])

  console.log('orderProducts', orderProducts);

  const submitOrder = async (event) => {
    event.preventDefault()

    const user = event.target[0].value
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
          <input id='user' type='text' autoComplete='off'/>
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
      <h4>Order List:</h4>
      {orderProducts.length > 0 ?
        orderProducts.map(o =>
          <Order key={o.name} order={o}/>  
        ) :
        <p>No order items yet</p>
      }
    </div>
  )
}

export default OrderProduct;