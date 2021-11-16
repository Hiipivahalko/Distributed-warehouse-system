import axios from 'axios'
const express = require('express')
const app = express()


app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
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

const PORT = 5001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})