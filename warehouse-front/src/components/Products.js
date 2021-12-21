import React from 'react';

const Product = ({ product }) => {
  return (
    <div className='item' >
      <h4>{product.name}</h4>
      {product.locations.map(l => 
        <p key={l.location}>{l.location}: {l.amount}</p>  
      )}
    </div>
  )
}

const Products = ({ products }) => {
  return (
    <div className='products'>
      <h3>Products:</h3>
      { products ? 
        <ul>
          {products.map(p => 
            <Product product={p} key={p.id}/>
          )}
        </ul>
        : 
        <p>We dont have products yet</p>
      }
    </div>
  )
}

export default Products;