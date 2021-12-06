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

  const init_products = async () => {
    try {
      await axios.delete(`${process.env.REACT_APP_INVENTORY_SERVICE_URL}/api/products/all`)
      await axios.post(`${process.env.REACT_APP_INVENTORY_SERVICE_URL}/api/products/init`)
    } catch (error) {
      console.log(error.message);
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

  const initProducts = async (event) => {
    event.preventDefault()
    await init_products();
    await find_products();
    console.log('data initialized');
  }

  return (
    <div>
      <h1>DisSys Warehouse</h1>
      <button onClick={fectProducts}>Fetch products</button>
      <button onClick={initProducts}>Init products</button>
      <div className='main'>
        <Products products={products}/>
        <OrderProduct products={products} setProducts={setProducts}/>
      </div>
    </div>
  );
}

export default App;
