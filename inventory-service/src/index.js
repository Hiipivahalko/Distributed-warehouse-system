const axios = require('axios')
const express = require('express')
const app = express()


app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/inventory', async (request, response) => {
  axios.get('http://localhost:4001/api/workers/inventory')
  .then( items => {
    console.log(items.data)
    response.json(items.data)
  })
  .catch( () => response.json({ error: "unexpected error happened."}).status(400))
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
