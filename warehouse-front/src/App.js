import React, { useState, useEffect } from 'react';
import axios from 'axios';


import './styles/App.css';

const App = () => {

  const [ products, setProducts ] = useState(null);

  const find_products = async () => {
    try {
      console.log(`here`);
      console.log('ENV HERE: ', process.env.REACT_APP_INVENTORY_SERVICE_URL, process.env.REACT_APP_ORDER_SERVICE_URL)
      const result = await axios.get(`${process.env.REACT_APP_INVENTORY_SERVICE_URL}/api/inventory/`);
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
      <button onClick={fectProducts}>Fetch warehouses</button>
      {products ? 
        <>
          <h3>Warehouses:</h3>
          <ul>
            {products.map(p => 
              <li key={p._id}>{p.location}</li>  
            )}
          </ul>
        </>
        : <p>We dont have products yet</p>
      }
    </div>
  );
}

export default App;
