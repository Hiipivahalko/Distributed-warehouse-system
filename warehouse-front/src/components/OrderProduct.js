import React from 'react';
import axios from 'axios';

const OrderProduct = ({ products, setProducts }) => {

  const submitOrder = async (event) => {
    event.preventDefault()

    const user = event.target[0].value
    const location = event.target[1].value
    const prod_name = event.target[2].value
    const prod = products.find(p => p.name === prod_name)
    const prod_id = prod.id
    const amount = event.target[3].value

    const order = {
      user: user,
      location: location,
      items: [{ id: prod_id, name: prod_name, amount: amount}]
    }

    //console.log('order', order);

    try {
      const res = await axios.post(`${process.env.REACT_APP_ORDER_SERVICE_URL}/api/order`, order)
      console.log(res.status, res.data);
      //const prods_filtered = products.filter(p => p.id !== prod_id)

      /*const location_mod = prod.locations.map(l => l.location === location ?
        {location: l, amount: l.amount - amount} : l)
      const mod_prod = {
        id: prod.id,
        name: prod.name,
        locations: location_mod

      }
      console.log('mod_prod', mod_prod);
      //setProducts([...prods_filtered, {}])
      setProducts(products.map(p => p.id !== prod_id ? p : mod_prod))*/
      const res_pords = await axios.get(`${process.env.REACT_APP_INVENTORY_SERVICE_URL}/api/products/`)
      setProducts(res_pords.data)
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
        <button type='submit'>Order products</button>
      </form>
    </div>
  )
}

export default OrderProduct;