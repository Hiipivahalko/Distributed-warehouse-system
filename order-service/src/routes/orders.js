const orderRouter = require('express').Router()
const axios = require('axios')
const Orders = require('../models/orders')

const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

orderRouter.get('/', async (req, res) => {
  try {
    const all_orders = await Orders.find( {} )
    return res.json(all_orders)
  } catch (err) {
    console.log(err.message);
    return res.json({error: 'error happened'})
  }
})

orderRouter.post('/', async (request, response) => {
  console.log('sleeping');
  await sleep(2000)
  console.log('wake up');
  const order = request.body
  if (!order.user || !order.location || !order.items) {
    return response.status(400).json({error: 'order miss information'})
  }
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
          return response.status(410).json({message: "One or more products have run out of stock"})
    } else {
      p.locations = p.locations.filter(l => l.location !== location.location)
      location.amount = location.amount - order_product.amount
      p.locations.push(location)
      updated_products.push(p)
      
      order_product.location = location.location
    }
  }

  try {
    const orderToSave = new Orders({
      user: order.user,
      location: order.location,
      time: new Date().toISOString(),
      items: order.items
    })
    const savedOrder = await orderToSave.save()
    
    for (const product of updated_products) {
      await axios.post('http://inventory-service:4000/api/products', product)
    }
    return response.status(201).json(savedOrder)
  } catch (error) {
    console.log(error.message)
    return response.status(500).send({error: `saving order failed in /api/order`})
  }
})

orderRouter.delete('/clearHistory', async (requset, response) => {
  console.log('order service deleting all orders from mongoDB');
  try {
    const delete_res = await Orders.remove({})
    return response.status(200).json({message: 'deleting went fine'})
  } catch (error) {
    return response.status(403).json({err: error.message})
  }
})

module.exports = orderRouter