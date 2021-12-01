import React, { useState, useEffect } from 'react';
import axios from 'axios';


import './styles/App.scss';

const Products = ({ products }) => {
  console.log('products', products);
  return (
    <div className='products'>
      <h3>Products:</h3>
      <ul>
        {products.map(p => 
          <li key={p._id}>{p.location}</li>  
        )}
      </ul>
    </div>
  )
}

const App = () => {

  const [ products, setProducts ] = useState(null);

  const find_products = async () => {
    try {
      console.log(`here`);
      console.log('ENV HERE: ', process.env.REACT_APP_INVENTORY_SERVICE_URL, process.env.REACT_APP_ORDER_SERVICE_URL)
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
    console.log('button cliked');
    await find_products();
    console.log('data fetched');
  }

  /*
  
  */

  return (
    <div>
      <h1>DisSys Warehouse</h1>
      <button onClick={fectProducts}>Fetch products</button>
      {products ? 
        <Products products={products}/>
        : <p>We dont have products yet</p>
      }
    </div>
  );
}

export default App;
