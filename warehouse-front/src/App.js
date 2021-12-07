import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Routes,
  Route,
  Redirect,
  Link
} from 'react-router-dom'

import OrderProduct from './components/OrderProduct';
import Products from './components/Products'
import OrderHistory from './OrderHistory';

import './styles/App.scss';


const Header = () => {
  return (
    <div className='header'>
      <Link to='/'><h1>DisSys Warehouse</h1></Link>
      <Link to='/products-and-orders'>
        <button className='menu-btn' >Products & Order</button>
      </Link>
      <Link to='/order-history'>
        <button className='menu-btn' >Order-history</button>
      </Link>
    </div>
  )
}

const Main = () => {

  
  return (
    <div className='main-container'>
      <Link to='/products-and-orders'>
        <button className='start-btn' >Products&orders</button>
      </Link>
      <Link to='/order-history'>
        <button className='start-btn' >Order-history</button>
      </Link>
    </div>
  )
}

const Warehouse = () => {
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
    <>
      <button onClick={fectProducts} className='dark-btn'>Fetch products</button>
      <button onClick={initProducts} className='dark-btn'>Init products</button>
      <div className='main'>
        <Products products={products}/>
        <OrderProduct products={products} setProducts={setProducts}/>
      </div>
    </>
  );

}


const App = () => {

  return (
    <div className='app'>
      <Header />
      <Routes>
        <Route path='/products-and-orders' element={<Warehouse />} />
        <Route path='/order-history' element={<OrderHistory />}/>
        <Route path='/' element={<Main />}/>  
      </Routes>
    </div>
  );
}

export default App;
