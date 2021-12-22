const axios = require('axios')
const cors = require('cors')
const express = require('express')
const morgan = require('morgan')
const middleware = require('./utils/middleware')


const app = express()

app.use(express.static('build'))
app.use(cors())
app.use(express.json())
app.use(morgan(middleware.tinyLogger)) // log api call status and information to console

// all endpoints redirect messages/calls to inventory-workers

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/products', async (request, response) => {
  try {
    const result = await axios.get('http://inventory-worker:4001/api/products')
    console.log("service received request")
    return response.json(result.data)
  } catch( error) {
    console.log('error:', error.message);
    return response.status(403).json({error: "unexpected error happened."})
  }
})

app.post('/api/products', (request, response) => {
  const product = request.body
  axios.post('http://inventory-worker:4001/api/products', product)
  .then(result => {
    console.log("service succeeded in saving product")
    response.status(200).json(product)
  })
  .catch( (err) =>  {
    console.log(err)
    response.status(403).json({
      error: "error when saving product",
      product: request.body
    })
  })
})

app.post('/api/products/init', (request, response) => {
  console.log("service saving intit products to mongoDB")

  axios.post('http://inventory-worker:4001/api/products/init', {})
    .then(result => {
      return response.json(result.data).status(204)
    })
    .catch(error => {
      console.error(error.message)
      return response.status(403).json({error: error.message})
    })
})

app.delete('/api/products/all', async (request, response) => {
  console.log('service deleting all items from mongoDB');
  axios.delete('http://inventory-worker:4001/api/products/all')
    .then(result => {
      return response.json(result.data).status(200)
    })
    .catch(error => {
      return response.status(403).json({error: error.message})
    })
})

app.use(middleware.unkownEndpoint)
app.use(middleware.errorHandler)

const PORT = 4000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
