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

app.post('/api/order', (request, response) => {
  axios.post('/api/inventory/items', {
    params: {
      items: request.params.items
    }
  }).then( items => {
    if(items.length < request.params.items.length) {
      response.send(false)
    }
    //Save order to order db
    response.send(true)
  }).catch( () => response.send(false))
})

const PORT = 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})