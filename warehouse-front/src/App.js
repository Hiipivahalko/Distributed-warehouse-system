import React, { useState, useEffect } from 'react';
import axios from 'axios';


import './App.css';

const App = () => {

  const [ products, setProducts ] = useState(null);

  useEffect( () => {
    const find_products = async () => {
      try {
        const result = await axios.get(`${process.env.REACT_APP_ORDER_SERVICE_URL}/api/products`);
        setProducts(result.data);
      } catch (err) {
        console.log(err.message);
      }
    }
    find_products();
  }, [])

  return (
    <div>
      <h1>DisSys Warehouse</h1>
      {products ? 
        <>
          <h3>Products:</h3>
          <ul>
            {products.map(p => 
              <li key={p}>{p}</li>  
            )}
          </ul>
        </>
        : <p>We dont have products yet</p>
      }
    </div>
  );
}

export default App;
