const express = require('express')
const axios = require('axios')
const cors = require('cors')
const morgan = require('morgan')
const middleware = require('./utils/middleware')
const Orders = require('./models/orders')

const app = express()

app.use(express.static('build'))
app.use(cors())
app.use(express.json())
app.use(morgan(middleware.tinyLogger))



app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/orders', async (req, res) => {
  try {
    const all_orders = await Orders.find( {} )
    return res.json(all_orders)
  } catch (err) {
    console.log(err.message);
    return res.json({error: 'error happened'})
  }
})

app.post('/api/order', async (request, response) => {

  
  
  return response.status(501).send({error: 'WIP: not fully implemented yet!'})

  // WIP below

  const order = request.body
  const result = await axios.get('http://inventory-service:4000/api/products')
  const all_products = result.data

  for (const product of order.items) {
    if (all_products.filter(p => p.name == product.name)
        .locations.filter(l => l.location == order.location)
        .amount < 0) {
          return response.status(410).json({message: "One or more products have run out of stock"})
    }
  }

  try {
    const orderToSave = new Order({
      user: order.user,
      location: order.location,
      time: new Date().toISOString(),
      items: order.items
    })
    const savedOrder = await orderToSave.save()
    return response.status(201).json(savedOrder)
  } catch (error) {
    console.log(error.message)
    return response.status(500).send({error: `saving order failed in /api/order`})
  }

})

app.use(middleware.unkownEndpoint)
app.use(middleware.errorHandler)

const PORT = 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})