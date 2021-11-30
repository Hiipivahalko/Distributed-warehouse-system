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
    return response.json(result.data)
  } catch( error) {
    console.log('error:', error.message);
    return response.json({error: "unexpected error happened."}).status(404)
  }
})

app.post('/api/inventory/items', (request, response) => {
  axios.post('/api/workers/items', {
    params: {
      items: request.params.items
    }
  })
  .then( items => response.send(items))
  .catch( () => response.send({}))
})

const PORT = 4000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
