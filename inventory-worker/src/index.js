const express = require('express')
const app = express()


app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/workers/inventory', (request, response) => {
  //TODO:Get all items from database
  const items
  response.send(items)
})

app.post('/api/workers/items', (request, response) => {
  //TODO:Get items from database
  const items
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
