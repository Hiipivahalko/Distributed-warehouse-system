import React from 'react';
//import axios from 'axios';

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

export default AddOrder;