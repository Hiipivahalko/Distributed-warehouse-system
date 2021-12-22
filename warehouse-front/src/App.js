import React from 'react';
import {
  Routes,
  Route,
  Link
} from 'react-router-dom'

import Warehouse from './Warehouse';
import OrderHistory from './OrderHistory';
import './styles/App.scss';

// Menu Header
const Header = () => (
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

// Root page/content
const Main = () => (
  <div className='main-container'>
    <Link to='/products-and-orders'>
      <button className='start-btn' >Products & orders</button>
    </Link>
    <Link to='/order-history'>
      <button className='start-btn' >Order-history</button>
    </Link>
  </div>
)

// Application core
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