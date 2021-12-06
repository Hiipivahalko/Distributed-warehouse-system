import React, { useState, useEffect } from 'react';
import axios from 'axios';

import OrderProduct from './components/OrderProduct';
import Products from './components/Products'

import './styles/App.scss';





const App = () => {

  const [ products, setProducts ] = useState(null);

  const find_products = async () => {
    try {
      const result = await axios.get(`${process.env.REACT_APP_INVENTORY_SERVICE_URL}/api/products/`);
      console.log('result status', result.status);
      if (result.status >= 400) {
        console.log(result.data);
      } else {  
        console.log('result_data:', result.data)
        setProducts(result.data);
      }
      
    } catch (err) {
      console.log(err.message);
    }
  }

  useEffect( () => { 
    find_products();
  }, [])

  const fectProducts = async (event) => {
    event.preventDefault()
    await find_products();
    console.log('data fetched');
  }

  return (
    <div>
      <h1>DisSys Warehouse</h1>
      <button onClick={fectProducts}>Fetch products</button>
      <div className='main'>
        <Products products={products}/>
        <OrderProduct products={products} setProducts={setProducts}/>
      </div>
    </div>
  );
}

export default App;
