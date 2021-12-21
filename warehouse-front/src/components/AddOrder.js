import React, {useState} from 'react';

const AddOrder = ({ products, setOrderProducts, orderProducts, fecthing }) => {

  const productTypes = [{name: ''}, ...products]
  const [ amount, setAmount ] = useState('')

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
    setAmount('')
  }

  return (
    <>
      <form onSubmit={handleOrderAdd}>
        <h4>Add item to orderlist:</h4>
        <div>
          <label>Product: </label>
          <select >
            {productTypes.map(p => 
              <option key={p.name} value={p.name}>{p.name}</option>  
            )}
          </select>
        </div>
        <div>
          <label>Amount: </label>
          <input id='amount' type='number' min='1' 
            value={amount}
            onChange={e => setAmount(e.target.value)}
          />
        </div>
        <button type='submit' className='yellow-btn' disabled={fecthing}>
          Add order
        </button>
      </form>
    </>
  )
}

export default AddOrder;