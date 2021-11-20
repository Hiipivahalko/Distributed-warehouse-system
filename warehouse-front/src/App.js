import React, { useState, useEffect } from 'react';
import axios from 'axios';


import './styles/App.css';

const App = () => {

  const [ products, setProducts ] = useState(null);

  useEffect( () => {
    const find_products = async () => {
      try {
        console.log(`here`);
        const result = await axios.get(`${process.env.REACT_APP_ORDER_SERVICE_URL}/warehouses/`);
        const data = result.data[0];
        console.log('headers:', result.headers);
        console.log(`result:`, data);
        console.log(`result: ${JSON.stringify(data)}`);
        //setProducts(result.data);
      } catch (err) {
        console.log(err.message);
      }
    }
    find_products();
  }, [])

  let test = {
    'a': 0,
    'b': 1
  }

  let a ='aa'

  console.log(`test: ${test}`);
  console.log(a)
  console.log(test)

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
