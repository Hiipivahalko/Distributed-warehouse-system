const axios = require('axios')
const cors = require('cors')
const express = require('express')
const app = express()


app.use(express.static('build'))
app.use(cors())
app.use(express.json())



app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/inventory', async (request, response) => {
  try {
    const result = await axios.get('http://inventory-worker:4001/api/products')
    console.log("service received request")
    return response.json(result.data)
  } catch( error) {
    console.log('error:', error.message);
    return response.json({error: "unexpected error happened."}).status(404)
  }
})

app.post('/api/inventory', (request, response) => {
  const product = request.body
  console.log("service sending product", product)
  axios.post('http://inventory-worker:4001/api/products', product)
  .then(result => {
    console.log("service succeeded in saving")
    response.status(204).end()
  })
  .catch( (err) =>  {
    console.log(err)
    response.json({
      error: "error when saving product",
      product: request.body
    }).status(403)
  })
})

const PORT = 4000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
