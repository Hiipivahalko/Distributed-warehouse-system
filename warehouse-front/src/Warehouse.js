import React, { useState, useEffect } from 'react';
import axios from 'axios';

import OrderProduct from './components/OrderProduct';
import Products from './components/Products'

const Warehouse = () => {
  const [ products, setProducts ] = useState(null);
  const [ info, setInfo ] = useState('')
  const [ error, setError ] = useState('')

  const find_products = async (infoMsg, errorMsg) => {
    try {
      const result = await axios.get(`${process.env.REACT_APP_INVENTORY_SERVICE_URL}/api/products/`);
      console.log('result status', result.status);
      
      console.log('result_data:', result.data)
      setProducts(result.data);
      setInfo(infoMsg)
      setTimeout(() => {
        setInfo('')
      }, 5000)
    } catch (err) {
      console.log(err.message);
      setError(`${errorMsg}: ${err.message}`)
      setTimeout(() => {
        setError('')
      }, 5000)
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
    find_products('Products fecthed successfully', 'Could not order products');
  }, [])

  const fectProducts = async (event) => {
    event.preventDefault()
    find_products('Products fetched successfully', 'Could not order products');
    console.log('data fetched');
  }

  const initProducts = async (event) => {
    event.preventDefault()
    await init_products();
    find_products('Products initalized successfully' ,' Could not init products');
    console.log('data initialized');
  }

  return (
    <>
      <div className='main-top'>
        <button onClick={fectProducts} className='dark-btn'>Update products</button>
        <button onClick={initProducts} className='dark-btn'>Init products</button>
        {info !== '' ? <div className='info'>{info}</div>: null}
        {error !== '' ? <div className='error'>{error}</div>: null}
      </div>
      <div className='main'>
        <Products products={products}/>
        <OrderProduct 
          products={products} setProducts={setProducts}
          setInfo={setInfo} setError={setError}
        />
      </div>
    </>
  );
}

export default Warehouse;