import axios from 'axios'
const express = require('express')
const app = express()


app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/inventory', (request, response) => {
  axios.get('/api/workers/inventory', {
    params: {
      items: request.params.items
    }
  })
  .then( items => response.send(items))
  .catch( () => response.send({}))
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
