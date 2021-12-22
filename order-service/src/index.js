const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const middleware = require('./utils/middleware')
const orderRouter = require('./routes/orders')
const mongoose = require('mongoose')


const app = express()
app.use(express.static('build'))
app.use(cors())
app.use(express.json())
app.use(morgan(middleware.tinyLogger)) // log api call status and information to console

const url = process.env.MONGO_URI

mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('mongoURL:', url);
    console.log('error connecting to MongoDB:', error.message)
  })

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.use('/api/order', orderRouter)
app.use(middleware.unkownEndpoint)
app.use(middleware.errorHandler)

const PORT = 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})