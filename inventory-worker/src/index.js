const express = require('express')
const axios = require('axios')
const app = express()


app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/workers/inventory', async (request, response) => {
  try {
    const warehouses = await axios.get(`http://localhost:5000/warehouses`)
    let res = []
    for (let warehouse of warehouses.data) {
      let items = warehouse.items
      for (let item of items) {
        res.push(item)
      }
    }
    console.log(res)
    response.send(res)
  } catch (error) {
    console.log(error.message)
  }
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
