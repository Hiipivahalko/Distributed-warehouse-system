const axios = require('axios')
const Orders = require('../models/orders')

const processOrder = async (order) => {
  const result = await axios.get('http://inventory-service:4000/api/products')
  const all_products = result.data
  let updated_products = []

  for (const order_product of order.items) {

    let p = all_products.find(p => p.name == order_product.name)

    // try to select the user location, if there is sufficient stock
    let location = p.locations.find(l => 
      (l.location === order.location) && (l.amount >= order_product.amount))

    if (!location) {
      // take item from ANY warehouse that has sufficient stock
      location = p.locations.find(l => (l.amount >= order_product.amount))
    }

    if (!location) {
      // error
      try {
        const failedOrder = new Orders({
          user: order.user,
          location: order.location,
          time: new Date().toISOString(),
          items: order.items,
          status: 'failed'
        })
        await failedOrder.save()

      } catch (error) {
        console.log('error when saving failed order to DATABASE');
        return {message: "error when saving failed order to DATABASE"}
      }
      return {message: "One or more products have run out of stock", savedFailedOrder}
    } else {
      p.locations = p.locations.filter(l => l.location !== location.location)
      location.amount = location.amount - order_product.amount
      p.locations.push(location)
      updated_products.push(p)
      
      order_product.location = location.location
    }
  }
  
  // save product and update product amounts
  try {
    const orderToSave = new Orders({
      user: order.user,
      location: order.location,
      time: new Date().toISOString(),
      items: order.items,
      status: 'Success'
    })
    
    for (const product of updated_products) {
      await axios.post('http://inventory-service:4000/api/products', product)
    }
    const savedOrder = await orderToSave.save()
    return {savedOrder}
  } catch (error) {
    console.error(error.message)
    return {error: `saving order failed in /api/order`}
  }
};

module.exports = {
  processOrder,
};