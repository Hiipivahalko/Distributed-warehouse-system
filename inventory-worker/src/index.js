const express = require('express')
const cors = require('cors')
const axios = require('axios')
const app = express()
const mongoose = require('mongoose')

app.use(express.static('build'))
app.use(cors())
app.use(express.json())

const Products = require('./models/products')

const url = process.env.MONGO_URI

mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
    
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })


app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/workers/inventory', async (request, response) => {
  try {
    const warehouses = await Products.find( {} )
    console.log(warehouses);
    let res = []
    for (let warehouse of warehouses) {
      let items = warehouse.items
      for (let item of items) {
        res.push(item)
      }
    }
    console.log(res)
    response.send(res)
    return
  } catch (error) {
    console.log(error.message)
  }
  response.send({error: 'some error happened on /api/workers/inventory'})
})

app.post('/api/workers/items', (request, response) => {
  //TODO:Get items from database
  //const items
  if(items.length == request.params.items.length) {
    //TODO:Remove items from database

    response.send(items)
  } else {
    response.send({})
  }
  
})

const PORT = 4001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
